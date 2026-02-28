<!-- src/routes/shop/[shopSlug]/product/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount, tick, onDestroy } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
    import ProductCard from "$lib/components/card/ProductCard.svelte";
    import ProductCardList from "$lib/components/card/ProductCardList.svelte";
    import Pagination from "$lib/components/ui/Pagination.svelte";

    // Data from load function
    export let data: PageData;
    const {
        shop,
        products,
        totalProducts,
        categories,
        filters,
        pagination,
        meta,
    } = data;

    // Local filter state
    let searchQuery = filters.search;
    let searchInput: HTMLInputElement;
    let selectedCategory = filters.category;
    let minPrice = filters.minPrice;
    let maxPrice = filters.maxPrice;
    let minRating = filters.minRating;
    let availability = filters.availability;
    let sortBy = filters.sortBy;
    let viewMode = filters.viewMode || "grid";

    // Cart state
    let cartItemCount = 0;
    let showCartNotification = false;

    // Mobile filter drawer state & inactivity timer
    let showMobileFilters = false;
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

    const INACTIVITY_MS = 5000;
    const MOBILE_BREAKPOINT = 768;

    function clearInactivityTimer() {
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
            inactivityTimer = null;
        }
    }

    function startInactivityTimer() {
        clearInactivityTimer();
        inactivityTimer = setTimeout(() => {
            showMobileFilters = false;
        }, INACTIVITY_MS);
    }

    function resetInactivityTimer() {
        if (showMobileFilters) startInactivityTimer();
    }

    function closeFilters() {
        showMobileFilters = false;
        clearInactivityTimer();
    }

    function handleFocusSearchParam() {
        if ($page.url.searchParams.get("focus") === "search") {
            const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

            if (isMobile) {
                // On mobile: open the bottom sheet filter drawer
                showMobileFilters = true;
                startInactivityTimer();
            } else {
                // On desktop: focus the top sticky search input
                searchInput?.focus();
            }
        }
    }

    onMount(async () => {
        await tick();
        handleFocusSearchParam();

        // Re-check focus param and viewport on window resize
        const onResize = () => {
            handleFocusSearchParam();
        };
        window.addEventListener("resize", onResize);

        // Event listeners for mobile filter drawer
        const onFocus = () => resetInactivityTimer();
        const onInput = () => resetInactivityTimer();
        const onBlur = () => closeFilters();
        searchInput?.addEventListener("focus", onFocus);
        searchInput?.addEventListener("input", onInput);
        searchInput?.addEventListener("blur", onBlur);

        // Close on scroll
        const onScroll = () => closeFilters();
        window.addEventListener("scroll", onScroll, { passive: true });

        // cleanup when component destroyed
        onDestroy(() => {
            clearInactivityTimer();
            window.removeEventListener("resize", onResize);
            searchInput?.removeEventListener("focus", onFocus);
            searchInput?.removeEventListener("input", onInput);
            searchInput?.removeEventListener("blur", onBlur);
            window.removeEventListener("scroll", onScroll);
        });
    });

    // Debounced search
    let searchTimeout: ReturnType<typeof setTimeout>;

    const handleSearch = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            updateFilters();
        }, 300);
    };

    // Update URL with filters
    const updateFilters = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (selectedCategory) params.set("category", selectedCategory);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (minRating) params.set("minRating", minRating);
        if (availability) params.set("availability", availability);
        if (sortBy && sortBy !== "newest") params.set("sort", sortBy);
        if (viewMode && viewMode !== "grid") params.set("view", viewMode);
        goto(`/shop/${shop.slug}/product?${params.toString()}`, {
            replaceState: true,
        });
    };

    // Clear all filters
    const clearAllFilters = () => {
        searchQuery = "";
        selectedCategory = "";
        minPrice = "";
        maxPrice = "";
        minRating = "";
        availability = "";
        sortBy = "newest";
        updateFilters();
    };

    // Handle page change
    const handlePageChange = (e: CustomEvent) => {
        const params = new URLSearchParams($page.url.searchParams);
        params.set("page", e.detail.page.toString());
        goto(`/shop/${shop.slug}/product?${params.toString()}`, {
            replaceState: true,
        });
    };

    // Add to cart notification
    const addToCart = (product: any) => {
        cartItemCount++;
        showCartNotification = true;
        setTimeout(() => (showCartNotification = false), 3000);
    };

    // Format currency
    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Get stock status badge
    const getStockBadge = (product: any) => {
        if (product.sale) return { text: "Sale", variant: "danger" as const };
        if (product.preorder)
            return { text: "Pre-Order", variant: "info" as const };
        if (product.new) return { text: "New", variant: "success" as const };
        if (product.freeShipping)
            return { text: "Free Shipping", variant: "default" as const };
        return null;
    };
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
</svelte:head>

<main class="min-h-screen bg-surface">
    <!-- 🔷 SECTION 2: FILTER + SEARCH BAR (Sticky, Desktop Only) -->
    <section
        class="hidden md:block sticky top-20 z-40 bg-surface/95 backdrop-blur-sm border-b border-gray-100"
    >
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div
                class="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
                <!-- Search Bar -->
                <div class="relative w-full md:w-96">
                    <svg
                        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        bind:this={searchInput}
                        type="text"
                        placeholder="Search in this shop..."
                        class="w-full pl-10 pr-4 h-11 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-soft-background"
                        bind:value={searchQuery}
                        on:input={handleSearch}
                    />
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <!-- Category -->
                    <select
                        class="h-9 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-soft-background"
                        bind:value={selectedCategory}
                        on:change={updateFilters}
                    >
                        <option value="">All Categories</option>
                        {#each categories as category}
                            <option value={category}>{category}</option>
                        {/each}
                    </select>

                    <!-- Price -->
                    <select
                        class="h-9 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-soft-background"
                        bind:value={maxPrice}
                        on:change={updateFilters}
                    >
                        <option value="">Any Price</option>
                        <option value="50000">Under ₦50,000</option>
                        <option value="100000">Under ₦100,000</option>
                        <option value="150000">Under ₦150,000</option>
                        <option value="200000">Under ₦200,000</option>
                    </select>

                    <!-- Rating -->
                    <select
                        class="h-9 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-soft-background"
                        bind:value={minRating}
                        on:change={updateFilters}
                    >
                        <option value="">Any Rating</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4.0">4.0+ Stars</option>
                        <option value="3.5">3.5+ Stars</option>
                    </select>

                    <!-- Availability -->
                    <select
                        class="h-9 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-soft-background"
                        bind:value={availability}
                        on:change={updateFilters}
                    >
                        <option value="">All Availability</option>
                        <option value="in-stock">In Stock</option>
                        <option value="preorder">Pre-Order</option>
                        <option value="sale">On Sale</option>
                    </select>

                    <!-- Sort -->
                    <select
                        class="h-9 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-soft-background"
                        bind:value={sortBy}
                        on:change={updateFilters}
                    >
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="popular">Most Popular</option>
                        <option value="sale">On Sale</option>
                    </select>

                    <!-- View Mode Toggle -->
                    <div
                        class="flex items-center border border-gray-200 rounded-lg overflow-hidden"
                    >
                        <button
                            on:click={() => {
                                viewMode = "grid";
                                updateFilters();
                            }}
                            class="p-2 hover:bg-soft-background transition-colors {viewMode ===
                            'grid'
                                ? 'bg-soft-background text-primary'
                                : 'text-text-muted'}"
                            aria-label="Grid view"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                        </button>
                        <button
                            on:click={() => {
                                viewMode = "list";
                                updateFilters();
                            }}
                            class="p-2 hover:bg-soft-background transition-colors {viewMode ===
                            'list'
                                ? 'bg-soft-background text-primary'
                                : 'text-text-muted'}"
                            aria-label="List view"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Active Filters & Results Count -->
            <div class="flex items-center justify-between mt-4">
                <p class="text-sm text-text-muted">
                    Showing <span class="font-semibold text-text-main"
                        >{products.length}</span
                    >
                    of
                    <span class="font-semibold text-text-main"
                        >{totalProducts}</span
                    > products
                </p>
                {#if searchQuery || selectedCategory || minPrice || maxPrice || minRating || availability}
                    <button
                        on:click={clearAllFilters}
                        class="text-sm text-primary hover:underline font-medium"
                    >
                        Clear All Filters
                    </button>
                {/if}
            </div>
        </div>
    </section>

    <!-- Mobile Filter Drawer (opened when ?focus=search or via other triggers, Mobile Only) -->
    {#if showMobileFilters}
        <div class="md:hidden fixed inset-0 z-[90]">
            <button
                type="button"
                class="absolute inset-0 bg-black/40"
                on:click={() => closeFilters()}
                aria-label="Close filters"
            ></button>

            <div
                class="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up"
            >
                <div class="flex items-center justify-between mb-4">
                    <div class="relative flex-1">
                        <svg
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search in this shop..."
                            class="w-full pl-10 pr-4 h-11 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-soft-background"
                            bind:value={searchQuery}
                            on:input={() => {
                                handleSearch();
                                resetInactivityTimer();
                            }}
                        />
                    </div>
                    <button class="ml-4" on:click={() => closeFilters()}
                        >✕</button
                    >
                </div>

                <div class="space-y-4">
                    <!-- Category -->
                    <select
                        class="w-full px-4 py-3 rounded-btn border border-gray-200"
                        bind:value={selectedCategory}
                        on:change={() => {
                            updateFilters();
                            resetInactivityTimer();
                        }}
                    >
                        <option value="">All Categories</option>
                        {#each categories as category}
                            <option value={category}>{category}</option>
                        {/each}
                    </select>

                    <!-- Price -->
                    <select
                        class="w-full px-4 py-3 rounded-btn border border-gray-200"
                        bind:value={maxPrice}
                        on:change={() => {
                            updateFilters();
                            resetInactivityTimer();
                        }}
                    >
                        <option value="">Any Price</option>
                        <option value="50000">Under ₦50,000</option>
                        <option value="100000">Under ₦100,000</option>
                        <option value="150000">Under ₦150,000</option>
                        <option value="200000">Under ₦200,000</option>
                    </select>

                    <!-- Rating -->
                    <select
                        class="w-full px-4 py-3 rounded-btn border border-gray-200"
                        bind:value={minRating}
                        on:change={() => {
                            updateFilters();
                            resetInactivityTimer();
                        }}
                    >
                        <option value="">Any Rating</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4.0">4.0+ Stars</option>
                        <option value="3.5">3.5+ Stars</option>
                    </select>

                    <div class="flex items-center gap-3">
                        <button
                            on:click={() => {
                                viewMode = "grid";
                                updateFilters();
                                resetInactivityTimer();
                            }}
                            class="px-4 py-2 rounded-btn border border-gray-200"
                        >
                            Grid
                        </button>
                        <button
                            on:click={() => {
                                viewMode = "list";
                                updateFilters();
                                resetInactivityTimer();
                            }}
                            class="px-4 py-2 rounded-btn border border-gray-200"
                        >
                            List
                        </button>
                    </div>

                    <button
                        on:click={() => {
                            clearAllFilters();
                            resetInactivityTimer();
                        }}
                        class="w-full mt-4 text-primary underline"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    {/if}

    <!-- 🔷 SECTION 3: PRODUCT GRID -->
    <section class="py-8 bg-soft-background">
        <div class="container max-w-7xl mx-auto px-4">
            {#if products.length > 0}
                <!-- Grid View -->
                {#if viewMode === "grid"}
                    <div
                        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {#each products as product, i}
                            <div
                                in:fly={{
                                    y: 20,
                                    duration: 400,
                                    delay: i * 50,
                                    easing: cubicOut,
                                }}
                            >
                                <ProductCard
                                    {product}
                                    shopSlug={shop.slug}
                                    on:addToCart={() => addToCart(product)}
                                    on:wishlist={(e: CustomEvent) => {
                                        console.log("wishlist:", e.detail);
                                        // TODO: sync with backend or update UI state
                                    }}
                                />
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {#each products as product, i}
                            {@const badge = getStockBadge(product)}
                            <div
                                in:fly={{
                                    y: 20,
                                    duration: 400,
                                    delay: i * 50,
                                    easing: cubicOut,
                                }}
                            >
                                <!-- List View (componentized) -->
                                <ProductCardList
                                    {product}
                                    shopSlug={shop.slug}
                                    {addToCart}
                                    {formatNaira}
                                />
                            </div>
                        {/each}
                    </div>
                {/if}

                <!-- Pagination -->
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    on:pageChange={handlePageChange}
                />
            {:else}
                <!-- Empty State -->
                <Card className="py-16 text-center">
                    <div class="text-6xl mb-4">🔍</div>
                    <h3 class="text-h3 text-text-main mb-2">
                        No Products Found
                    </h3>
                    <p class="text-body text-text-muted mb-6">
                        Try adjusting your filters or search terms.
                    </p>
                    <Button variant="outline" onclick={clearAllFilters}
                        >Clear All Filters</Button
                    >
                </Card>
            {/if}
        </div>
    </section>

    <!-- 🔷 CART NOTIFICATION (Toast) -->
    {#if showCartNotification}
        <div class="fixed bottom-4 right-4 z-[100] animate-fade-in-up">
            <Card className="bg-dark text-white flex items-center gap-3 pr-6">
                <div
                    class="w-10 h-10 rounded-full bg-success/20 text-success flex items-center justify-center"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <div>
                    <p class="font-medium text-sm">Added to Cart</p>
                    <p class="text-xs text-gray-400">
                        {cartItemCount} items in cart
                    </p>
                </div>
            </Card>
        </div>
    {/if}
</main>

<style>
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-up {
        animation: fade-in-up 0.4s ease-out forwards;
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>
