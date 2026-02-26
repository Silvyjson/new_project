<!-- src/routes/shops/[shopSlug]/products/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount, tick } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
    import ProductCard from "$lib/components/vendor/ProductCard.svelte";
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

    onMount(async () => {
        if ($page.url.searchParams.get("focus") === "search") {
            await tick();
            searchInput?.focus();
        }
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
        goto(`/shops/${shop.slug}/products?${params.toString()}`, {
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
        goto(`/shops/${shop.slug}/products?${params.toString()}`, {
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
    <!-- 🔷 SECTION 1: SHOP MINI HEADER (Compact Branding) -->
    <header class="sticky top-0 z-50 bg-surface border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Left: Shop Info -->
                <a href={`/shops/${shop.slug}`} class="flex items-center gap-4">
                    <img
                        src={shop.logoUrl}
                        alt={shop.name}
                        class="w-12 h-12 rounded-xl object-cover border border-gray-200"
                    />
                    <div>
                        <div class="flex items-center gap-2">
                            <h1 class="text-xl font-semibold text-text-main">
                                {shop.name}
                            </h1>
                            {#if shop.vendorVerified}
                                <TrustBadge size="sm" showText={false} />
                            {/if}
                        </div>
                        <p class="text-sm text-text-muted">
                            {shop.category} • {totalProducts} Products • ★ {shop.rating}
                            ({(shop.reviewCount / 1000).toFixed(1)}k reviews)
                        </p>
                    </div>
                </a>

                <!-- Right: Actions -->
                <div class="hidden md:flex items-center gap-3">
                    <Button variant="outline" size="sm">Follow Shop</Button>
                    <Button variant="ghost" size="sm">Message Shop</Button>
                    <button
                        class="relative text-text-muted hover:text-primary transition-colors"
                        aria-label="Cart"
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
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        {#if cartItemCount > 0}
                            <span
                                class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium"
                                >{cartItemCount}</span
                            >
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- 🔷 SECTION 2: FILTER + SEARCH BAR (Sticky) -->
    <section
        class="sticky top-20 z-40 bg-surface/95 backdrop-blur-sm border-b border-gray-100"
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
                                />
                            </div>
                        {/each}
                    </div>
                {:else}
                    <!-- List View -->
                    <div class="space-y-4">
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
                                <Card
                                    hover={true}
                                    padding="none"
                                    className="overflow-hidden border border-gray-200 flex flex-col md:flex-row"
                                >
                                    <!-- Image -->
                                    <div
                                        class="relative w-full md:w-48 h-48 md:h-36 bg-gray-100 flex-shrink-0"
                                    >
                                        {#if product.images?.[0]}
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                class="w-full h-full object-cover"
                                            />
                                        {/if}
                                        {#if badge}
                                            <Badge
                                                variant={badge.variant}
                                                className="absolute top-3 left-3"
                                                >{badge.text}</Badge
                                            >
                                        {/if}
                                    </div>

                                    <!-- Content -->
                                    <div
                                        class="flex-1 p-4 flex flex-col justify-between"
                                    >
                                        <div>
                                            <h3
                                                class="text-body font-semibold text-text-main mb-1"
                                            >
                                                {product.name}
                                            </h3>
                                            <p
                                                class="text-small text-text-muted mb-2 line-clamp-2"
                                            >
                                                {product.description}
                                            </p>
                                            <div
                                                class="flex items-center gap-1 mb-2"
                                            >
                                                {#each Array(5) as _, index}
                                                    <span
                                                        class="text-sm {index <
                                                        Math.floor(
                                                            product.rating,
                                                        )
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'}"
                                                        >★</span
                                                    >
                                                {/each}
                                                <span
                                                    class="text-small text-text-muted"
                                                    >({product.reviewCount})</span
                                                >
                                            </div>
                                        </div>
                                        <div
                                            class="flex items-center justify-between"
                                        >
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <span
                                                    class="text-lg font-bold text-primary"
                                                    >{formatNaira(
                                                        product.price,
                                                    )}</span
                                                >
                                                {#if product.oldPrice}
                                                    <span
                                                        class="text-small text-text-muted line-through"
                                                        >{formatNaira(
                                                            product.oldPrice,
                                                        )}</span
                                                    >
                                                {/if}
                                            </div>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onclick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
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
