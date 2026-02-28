<!-- src/routes/shop/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import ShopCard from "$lib/components/vendor/ShopCard.svelte";
    import Nav from "$lib/components/homepage/Nav.svelte";
    import Footer from "$lib/components/homepage/Footer.svelte";

    // Data from load function
    export let data: PageData;
    const { shops, totalShops, categories, filters, trendingShops, meta } =
        data;

    // Local filter state
    let searchQuery = filters.search;
    let selectedCategory = filters.category;
    let minTrustScore = filters.minTrustScore;
    let minRating = filters.minRating;
    let verifiedOnly = filters.verifiedOnly;
    let sortBy = filters.sortBy;

    // Filter chips
    let activeChips: Array<{ type: string; value: string; label: string }> = [];

    // Update chips when filters change
    $: {
        activeChips = [];
        if (verifiedOnly)
            activeChips.push({
                type: "verified",
                value: "true",
                label: "Verified Only",
            });
        if (selectedCategory)
            activeChips.push({
                type: "category",
                value: selectedCategory,
                label: selectedCategory,
            });
        if (minTrustScore)
            activeChips.push({
                type: "trust",
                value: minTrustScore,
                label: `${minTrustScore}%+ Trust`,
            });
        if (minRating)
            activeChips.push({
                type: "rating",
                value: minRating,
                label: `${minRating}+ Stars`,
            });
    }

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
        if (minTrustScore) params.set("minTrust", minTrustScore);
        if (minRating) params.set("minRating", minRating);
        if (verifiedOnly) params.set("verified", "true");
        if (sortBy && sortBy !== "trustScore") params.set("sort", sortBy);

        goto(`/shop?${params.toString()}`, { replaceState: true });
    };

    // Remove filter chip
    const removeChip = (chip: { type: string; value: string }) => {
        if (chip.type === "verified") verifiedOnly = false;
        if (chip.type === "category") selectedCategory = "";
        if (chip.type === "trust") minTrustScore = "";
        if (chip.type === "rating") minRating = "";
        updateFilters();
    };

    // Clear all filters
    const clearAllFilters = () => {
        searchQuery = "";
        selectedCategory = "";
        minTrustScore = "";
        minRating = "";
        verifiedOnly = false;
        sortBy = "trustScore";
        updateFilters();
    };

    // Get trust score color
    const getTrustScoreColor = (score: number) => {
        if (score >= 80) return "text-success";
        if (score >= 60) return "text-primary";
        if (score >= 40) return "text-yellow-500";
        return "text-error";
    };

    const getTrustScoreBgColor = (score: number) => {
        if (score >= 80) return "bg-success";
        if (score >= 60) return "bg-primary";
        if (score >= 40) return "bg-yellow-500";
        return "bg-error";
    };

    // Sort options
    const sortOptions = [
        { value: "trustScore", label: "Highest Trust" },
        { value: "rating", label: "Top Rated" },
        { value: "popular", label: "Most Popular" },
        { value: "products", label: "Most Products" },
        { value: "orders", label: "Most Orders" },
        { value: "newest", label: "Newest" },
    ];

    // Handle filter change from component
    const handleFilterChange = (e: CustomEvent) => {
        const detail = e.detail;
        searchQuery = detail.searchQuery;
        selectedCategory = detail.selectedCategory;
        minTrustScore = detail.minTrustScore;
        minRating = detail.minRating;
        verifiedOnly = detail.verifiedOnly;
        sortBy = detail.sortBy;
        updateFilters();
    };

    const handlePageChange = (e: CustomEvent) => {
        const params = new URLSearchParams($page.url.searchParams);
        params.set("page", e.detail.page.toString());
        goto(`/shop?${params.toString()}`, { replaceState: true });
    };

    import Filter from "$lib/components/ui/Filter.svelte";
    import Pagination from "$lib/components/ui/Pagination.svelte";
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:type" content="website" />
</svelte:head>

<main class="min-h-screen bg-background-light">
    <!-- 🔷 SECTION 2: HERO SEARCH SECTION -->
    <section class="py-20 bg-surface text-center animate-fade-in">
        <div class="container max-w-4xl mx-auto px-4">
            <h1
                class="text-[48px] md:text-[56px] font-bold text-text-main leading-tight mb-6"
            >
                Discover <span class="text-primary border-b-4 border-primary/30"
                    >Trusted</span
                > Shops on VendorHub
            </h1>
            <p
                class="text-[18px] text-text-muted max-w-[650px] mx-auto mb-10 leading-relaxed"
            >
                Browse verified shops with transparent trust scores and secure
                checkout protection.
            </p>

            <!-- Large Search Bar -->
            <div class="relative max-w-[600px] mx-auto">
                <svg
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-muted"
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
                    placeholder="Search shops, categories, or products..."
                    class="w-full pl-14 pr-32 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-body shadow-card"
                    bind:value={searchQuery}
                    on:input={handleSearch}
                />
                <button
                    on:click={updateFilters}
                    class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2.5 rounded-btn font-medium hover:bg-primary-hover transition-colors"
                >
                    Search
                </button>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 3: STAND IN -->
    <section
        class="py-1 bg-background-light border-b border-gray-200 overflow-x-auto"
    ></section>

    <!-- 🔷 SECTION 4: ADVANCED FILTER BAR -->
    <section
        class="sticky top-18 z-40 bg-surface border-b border-gray-200 py-4 shadow-sm"
    >
        <div class="container max-w-7xl mx-auto px-4">
            <Filter
                {searchQuery}
                {selectedCategory}
                {categories}
                {minTrustScore}
                {minRating}
                {verifiedOnly}
                {sortBy}
                {sortOptions}
                resultsCount={shops.length}
                totalCount={totalShops}
                entityName="shops"
                on:change={handleFilterChange}
                on:clear={clearAllFilters}
            />
        </div>
    </section>

    <!-- 🔷 SECTION 5: SHOPS GRID -->
    <section class="py-16 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            {#if shops.length > 0}
                <div
                    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                >
                    {#each shops as shop, i}
                        <div
                            in:fly={{
                                y: 20,
                                duration: 400,
                                delay: i * 50,
                                easing: cubicOut,
                            }}
                        >
                            <ShopCard {shop} />
                        </div>
                    {/each}
                </div>

                <!-- Pagination -->
                <Pagination
                    currentPage={data.pagination?.page || 1}
                    totalPages={data.pagination?.totalPages || 1}
                    on:pageChange={handlePageChange}
                />
            {:else}
                <!-- Empty State -->
                <Card className="py-16 text-center">
                    <div class="text-6xl mb-4">🔍</div>
                    <h3 class="text-h3 text-text-main mb-2">No Shops Found</h3>
                    <p class="text-body text-text-muted mb-6">
                        Try adjusting your filters or search terms to find what
                        you're looking for.
                    </p>
                    <Button variant="outline" onclick={clearAllFilters}
                        >Clear All Filters</Button
                    >
                </Card>
            {/if}
        </div>
    </section>

    <!-- 🔷 SECTION 6: CTA SECTION -->
    <section
        class="py-24 bg-gradient-to-r from-primary to-primary-hover text-text-inverse text-center"
    >
        <div class="container max-w-3xl mx-auto px-4">
            <h2 class="text-h2 mb-6">Want to Launch Your Own Shop?</h2>
            <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of trusted vendors building secure online stores
                with VendorHub.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    href="/auth/register"
                    className="text-primary hover:bg-gray-100 shadow-lg px-8 py-4 text-lg font-semibold"
                >
                    Create Your Shop
                </Button>
                <Button
                    href="/#pricing"
                    variant="ghost"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                >
                    View Vendor Plans
                </Button>
            </div>
        </div>
    </section>
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
