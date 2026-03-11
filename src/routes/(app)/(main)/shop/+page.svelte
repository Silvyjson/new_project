<!-- src/routes/shop/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Button from "$lib/components/common/Button.svelte";
    import Filter from "$lib/components/common/Filter.svelte";
    import ShopGrid from "$lib/components/app/grid/ShopGrid.svelte";

    // Data from load function
    export let data: PageData;
    $: ({ shops, totalShops, categories, filters, trendingShops, meta } = data);

    // Local filter state
    let searchQuery = data.filters.search;
    let selectedCategory = data.filters.category;
    let minTrustScore = data.filters.minTrustScore;
    let minRating = data.filters.minRating;
    let verifiedOnly = data.filters.verifiedOnly;
    let sortBy = data.filters.sortBy;

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
    <section class="section bg-surface text-center animate-fade-in">
        <div class="container max-w-4xl mx-auto px-4">
            <h1
                class="md:text-h1 text-h3 font-bold text-text-main leading-tight"
            >
                Discover <span class="text-primary border-b-4 border-primary/30"
                    >Trusted</span
                > Shops on VendorHub
            </h1>
            <p
                class="text-[18px] text-text-muted max-w-[650px] mx-auto leading-relaxed"
            >
                Browse verified shops with transparent trust scores and secure
                checkout protection.
            </p>
        </div>
    </section>

    <!-- 🔷 SECTION 3: STAND IN -->
    <section
        class="py-1 bg-background-light border-b border-gray-200 overflow-x-auto"
    ></section>

    <!-- 🔷 SECTION 4: ADVANCED FILTER BAR -->
    <section
        class="sticky top-18 z-40 md:top-auto md:static bg-surface border-b border-gray-200 py-4 shadow-sm"
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
    <ShopGrid
        {shops}
        pagination={data.pagination}
        {handlePageChange}
        {clearAllFilters}
    />

    <!-- 🔷 SECTION 6: CTA SECTION -->
    <section
        class="section bg-gradient-to-r from-primary to-primary-hover text-text-inverse text-center"
    >
        <div class="container max-w-3xl mx-auto px-4">
            <h2 class="md:text-h2 text-h3 mb-6">
                Want to Launch Your Own Shop?
            </h2>
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
