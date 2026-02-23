<!-- src/routes/vendors/[vendorSlug]/shops/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    import type { PageData } from "./$types";
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
    import TrustScore from "$lib/components/ui/TrustScore.svelte";
    import ShopCard from "$lib/components/vendor/ShopCard.svelte";

    export let data: PageData;
    const { vendor, shops, categories, filters, meta } = data;

    // Local filter state
    let searchQuery = filters?.search;
    let selectedCategory = filters?.category;
    let sortBy = filters?.sortBy;
    let highTrustOnly = filters?.highTrustOnly;

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
        if (sortBy && sortBy !== "trustScore") params.set("sort", sortBy);
        if (highTrustOnly) params.set("highTrust", "true");
        goto(`/vendors/${vendor?.slug}/shops?${params.toString()}`, {
            replaceState: true,
        });
    };

    // Clear all filters
    const clearAllFilters = () => {
        searchQuery = "";
        selectedCategory = "";
        sortBy = "trustScore";
        highTrustOnly = false;
        updateFilters();
    };
</script>

<svelte:head>
    <title>{meta?.title}</title>
    <meta name="description" content={meta?.description} />
    <meta property="og:title" content={meta?.title} />
    <meta property="og:description" content={meta?.description} />
</svelte:head>

<main class="min-h-screen bg-background-light">
    <!-- 🔷 SECTION 1: VENDOR SUMMARY STRIP -->
    <section class="sticky top-0 z-50 bg-surface border-b border-gray-200 py-6">
        <div class="container max-w-7xl mx-auto px-4">
            <div
                class="flex flex-col md:flex-row items-center justify-between gap-4"
            >
                <!-- Left: Vendor Info -->
                <a
                    href="/vendors/{vendor?.slug}"
                    class="flex items-center gap-4 group"
                >
                    <img
                        src={vendor?.logoUrl}
                        alt={vendor?.name}
                        class="w-[60px] h-[60px] rounded-full object-cover border-2 border-primary group-hover:border-primary-hover transition-colors"
                    />
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-h4 font-bold text-text-main"
                                >{vendor?.name}</span
                            >
                            {#if vendor?.verified}
                                <TrustBadge size="sm" />
                            {/if}
                        </div>
                        <div
                            class="flex items-center gap-4 text-small text-text-muted mt-1"
                        >
                            <span class="flex items-center gap-1">
                                <TrustScore
                                    value={vendor.trustScore}
                                    size="sm"
                                    showLabel={false}
                                />
                            </span>
                            <span>🏬 {vendor?.shopCount} Active Shops</span>
                            <span>⭐ {vendor?.avgRating} Rating</span>
                        </div>
                    </div>
                </a>

                <!-- Right: Back Link -->
                <Button
                    variant="outline"
                    size="sm"
                    href="/vendors/{vendor?.slug}"
                >
                    ← Back to Vendor Profile
                </Button>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 2: PAGE HEADER -->
    <section class="py-16 bg-surface">
        <div class="container max-w-7xl mx-auto px-4">
            <h1
                class="text-[36px] md:text-[40px] font-bold text-text-main mb-4"
            >
                All Shops by {vendor?.name}
            </h1>
            <p class="text-body text-text-muted max-w-2xl mb-6">
                This vendor operates multiple specialized shops under one
                verified account.
            </p>

            <!-- Info Strip -->
            <div
                class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-btn text-small font-medium"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span
                    >Each shop has its own products, branding, and performance
                    score.</span
                >
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 3: FILTER & SORT BAR -->
    <section
        class="sticky top-25 z-40 bg-background-light border-b border-gray-200 py-6"
    >
        <div class="container max-w-7xl mx-auto px-4">
            <div
                class="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
                <!-- Search -->
                <div class="relative w-full md:w-[320px]">
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
                        placeholder="Search shops..."
                        class="w-full pl-10 pr-4 py-2.5 rounded-btn border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
                        bind:value={searchQuery}
                        on:input={handleSearch}
                    />
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap gap-3 w-full md:w-auto">
                    <!-- Category -->
                    <select
                        class="px-4 py-2.5 rounded-btn border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
                        bind:value={selectedCategory}
                        on:change={updateFilters}
                    >
                        <option value="">All Categories</option>
                        {#each categories as category}
                            <option value={category}>{category}</option>
                        {/each}
                    </select>

                    <!-- Sort -->
                    <select
                        class="px-4 py-2.5 rounded-btn border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
                        bind:value={sortBy}
                        on:change={updateFilters}
                    >
                        <option value="trustScore">Highest Trust Score</option>
                        <option value="products">Most Products</option>
                        <option value="popular">Most Popular</option>
                        <option value="updated">Recently Updated</option>
                    </select>

                    <!-- High Trust Toggle -->
                    <label
                        class="flex items-center gap-2 px-4 py-2.5 rounded-btn border border-gray-200 cursor-pointer hover:border-primary transition-colors"
                    >
                        <input
                            type="checkbox"
                            class="w-4 h-4 text-primary rounded focus:ring-primary"
                            bind:checked={highTrustOnly}
                            on:change={updateFilters}
                        />
                        <span class="text-body text-text-main whitespace-nowrap"
                            >High-Trust Only</span
                        >
                    </label>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 4: SHOPS GRID -->
    <section class="py-16 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            <!-- Results Count -->
            <div class="flex items-center justify-between mb-8">
                <p class="text-body text-text-muted">
                    Showing <span class="font-semibold text-text-main"
                        >{shops.length}</span
                    >
                    of
                    <span class="font-semibold text-text-main"
                        >{vendor?.shopCount}</span
                    > shops
                </p>
                {#if searchQuery || selectedCategory || highTrustOnly}
                    <button
                        on:click={clearAllFilters}
                        class="text-small text-primary hover:underline"
                    >
                        Clear Filters
                    </button>
                {/if}
            </div>

            <!-- Shop Cards -->
            {#if shops.length > 0}
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {#each shops as shop, i}
                        <div
                            in:fly={{
                                y: 20,
                                duration: 400,
                                delay: i * 100,
                                easing: cubicOut,
                            }}
                        >
                            <ShopCard {shop} vendorSlug={vendor.slug} />
                        </div>
                    {/each}
                </div>
            {:else}
                <Card className="py-16 text-center">
                    <div class="text-6xl mb-4">🏪</div>
                    <h3 class="text-h3 text-text-main mb-2">No Shops Found</h3>
                    <p class="text-body text-text-muted mb-6">
                        Try adjusting your filters to find what you're looking
                        for.
                    </p>
                    <Button variant="outline" onclick={clearAllFilters}
                        >Clear All Filters</Button
                    >
                </Card>
            {/if}
        </div>
    </section>

    <!-- 🔷 SECTION 5: PERFORMANCE OVERVIEW -->
    <section class="py-24 bg-surface">
        <div class="container max-w-7xl mx-auto px-4">
            <h2 class="text-h2 text-text-main text-center mb-4">
                Shop Performance Overview
            </h2>
            <p
                class="text-body text-text-muted text-center mb-12 max-w-2xl mx-auto"
            >
                Transparent metrics for each shop under this vendor?.
            </p>

            <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {#each shops as shop, i}
                    <Card
                        className="p-6 border border-gray-200 animate-fade-in transition-delay: {i *
                            100}ms"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-h4 font-bold text-text-main">
                                {shop.name}
                            </h3>
                            <span class="text-small font-medium text-success"
                                >{shop.trustScore}%</span
                            >
                        </div>

                        <div class="space-y-3">
                            <div>
                                <div
                                    class="flex justify-between text-small mb-1"
                                >
                                    <span class="text-text-muted"
                                        >Trust Score</span
                                    >
                                    <span class="font-medium text-text-main"
                                        >{shop.trustScore}%</span
                                    >
                                </div>
                                <div
                                    class="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="h-full bg-success"
                                        style="width: {shop.trustScore}%"
                                    ></div>
                                </div>
                            </div>

                            <div
                                class="flex items-center justify-between text-small text-text-muted pt-2 border-t border-gray-100"
                            >
                                <span>📦 {shop.productCount} Products</span>
                                <span
                                    >🛒 {shop.orderCount.toLocaleString()} Orders</span
                                >
                            </div>
                        </div>
                    </Card>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 6: TRUST & SAFETY -->
    <section class="py-16 bg-dark text-text-inverse">
        <div class="container max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-h2 mb-6">All Shops Verified Under One Identity</h2>
            <p class="text-lg opacity-90 mb-8">
                Every shop operated by this vendor is monitored individually and
                protected by VendorHub security.
            </p>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each [{ icon: "✓", title: "Vendor Identity Verified", desc: "ID and business documents verified" }, { icon: "✓", title: "Shops Monitored", desc: "Each shop tracked individually" }, { icon: "✓", title: "Secure Payments", desc: "Escrow protection on all purchases" }, { icon: "✓", title: "Dispute Resolution", desc: "Fair handling within 48 hours" }] as item}
                    <div class="flex flex-col items-center">
                        <div
                            class="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center text-xl mb-3"
                        >
                            {item.icon}
                        </div>
                        <h3 class="font-semibold mb-2">{item.title}</h3>
                        <p class="text-small opacity-80">{item.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 7: FINAL CTA -->
    <section
        class="py-24 bg-gradient-to-r from-primary to-primary-hover text-text-inverse text-center"
    >
        <div class="container max-w-3xl mx-auto px-4">
            <h2 class="text-h2 mb-6">Ready to Explore These Shops?</h2>
            <p class="text-lg opacity-90 mb-8">
                Browse products from all {vendor?.shopCount} shops with secure checkout
                and buyer protection.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    href="/vendors/{vendor?.slug}/shop"
                    className="bg-white text-primary hover:bg-gray-100 shadow-lg px-8 py-4 text-lg font-semibold"
                >
                    Start Shopping Securely
                </Button>
                <Button
                    href="/contact?vendor={vendor?.slug}"
                    variant="ghost"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                >
                    Contact Vendor
                </Button>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 8: FOOTER -->
    <footer class="bg-dark text-text-inverse py-16 border-t border-gray-800">
        <div class="container">
            <div class="grid md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h4 class="font-bold mb-4">Product</h4>
                    <ul class="space-y-2 text-small text-gray-400">
                        <li>
                            <a
                                href="/features"
                                class="hover:text-white transition-colors"
                                >Features</a
                            >
                        </li>
                        <li>
                            <a
                                href="/pricing"
                                class="hover:text-white transition-colors"
                                >Pricing</a
                            >
                        </li>
                        <li>
                            <a
                                href="/vendors"
                                class="hover:text-white transition-colors"
                                >Vendors</a
                            >
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4">For Vendors</h4>
                    <ul class="space-y-2 text-small text-gray-400">
                        <li>
                            <a
                                href="/auth/register"
                                class="hover:text-white transition-colors"
                                >Become a Vendor</a
                            >
                        </li>
                        <li>
                            <a
                                href="/dashboard"
                                class="hover:text-white transition-colors"
                                >Dashboard</a
                            >
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4">Company</h4>
                    <ul class="space-y-2 text-small text-gray-400">
                        <li>
                            <a
                                href="/about"
                                class="hover:text-white transition-colors"
                                >About Us</a
                            >
                        </li>
                        <li>
                            <a
                                href="/contact"
                                class="hover:text-white transition-colors"
                                >Contact</a
                            >
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4">Legal</h4>
                    <ul class="space-y-2 text-small text-gray-400">
                        <li>
                            <a
                                href="/privacy"
                                class="hover:text-white transition-colors"
                                >Privacy</a
                            >
                        </li>
                        <li>
                            <a
                                href="/terms"
                                class="hover:text-white transition-colors"
                                >Terms</a
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <div class="flex items-center gap-2">
                    <div
                        class="w-6 h-6 bg-primary rounded flex items-center justify-center text-xs font-bold"
                    >
                        V
                    </div>
                    <span class="font-bold">VendorHub</span>
                </div>
                <p class="text-small text-gray-500">
                    © {new Date().getFullYear()} VendorHub. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</main>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
        opacity: 0;
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>
