<!-- src/routes/(vendor)/my-shop/+page.svelte -->
<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";
    import ShopCard from "$lib/components/app/vendor/shop/ShopCard.svelte";
    import ShopEmptyState from "$lib/components/app/vendor/shop/ShopEmptyState.svelte";
    import ShopTable from "$lib/components/app/vendor/shop/ShopTable.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import AppFilter from "$lib/components/app/common/AppFilter.svelte";
    import AppPagination from "$lib/components/app/common/AppPagination.svelte";

    let shops = [
        {
            id: "1",
            slug: "urban-kicks",
            name: "Urban Kicks",
            description: "Quality products with guaranteed satisfaction.",
            logoUrl: "👟",
            bannerUrl: "bg-gradient-to-r from-blue-400 to-blue-600",
            trustScore: 82,
            rating: 3.5,
            followers: 1240,
            products: 32,
            active: true,
            verified: true,
        },
        {
            id: "2",
            slug: "tech-store",
            name: "TechStoreNG",
            description: "Quality products with guaranteed satisfaction.",
            logoUrl: "📱",
            bannerUrl: "bg-gradient-to-r from-purple-400 to-purple-600",
            trustScore: 94,
            rating: 4.4,
            followers: 2340,
            products: 120,
            active: true,
            verified: true,
        },
        {
            id: "3",
            slug: "fashion-hub",
            name: "Fashion Hub",
            description: "Quality products with guaranteed satisfaction.",
            logoUrl: "👗",
            bannerUrl: "bg-gradient-to-r from-pink-400 to-pink-600",
            trustScore: 76,
            rating: 4.1,
            followers: 890,
            products: 45,
            active: false,
            verified: false,
        },
    ];

    let shopCount = shops.length;

    // Search and filter state
    let searchQuery = "";
    let layoutView: "grid" | "table" = "grid";
    let filterStatus = "all"; // all, active, inactive
    let filterVerified = "all"; // all, verified, unverified

    // Filtered shops
    $: filteredShops = shops.filter((shop) => {
        const matchesSearch =
            searchQuery === "" ||
            shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        const matchesStatus =
            filterStatus === "all" ||
            (filterStatus === "active" && shop.active) ||
            (filterStatus === "inactive" && !shop.active);

        const matchesVerified =
            filterVerified === "all" ||
            (filterVerified === "verified" && shop.verified) ||
            (filterVerified === "unverified" && !shop.verified);

        return matchesSearch && matchesStatus && matchesVerified;
    });
</script>

<svelte:head>
    <title>My Shops | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
    <!-- Section 1: Page Header -->
    <section class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" in:fade={{ duration: 400 }}>
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon icon="mdi:storefront-outline" class="w-6 h-6 text-primary" />
            </div>

            <div>
                <h1 class="text-2xl font-bold text-text-main">
                    My Shops
                </h1>

                <p class="text-body text-text-muted">
                    Manage and monitor all your stores
                </p>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="flex gap-3 items-center">
            <Button href="/my-shop/create" size="md" variant="primary">
                <Icon icon="mdi:store-plus-outline" class="w-4 h-4 mr-2" />
                Create Shop
            </Button>
        </div>
    </section>

    {#if shops.length > 0}
        <AppFilter
            searchQuery={searchQuery}
            layoutView={layoutView}
            onSearchInput={(val) => searchQuery = val}
            onLayoutChange={(layout) => layoutView = layout}
            placeholder="Search shops by name or description..."
        >
            {#snippet extraFilters()}
                <div class="relative">
                    <select
                        class="px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white"
                        bind:value={filterStatus}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div class="relative">
                    <select
                        class="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white"
                        bind:value={filterVerified}
                    >
                        <option value="all">All Verification</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                    </select>
                </div>
            {/snippet}
        </AppFilter>
    {/if}

    <!-- Shops Display -->
    {#if shops.length > 0}
        <section>
            {#if filteredShops.length === 0}
                <!-- No Results -->
                <Card className="py-16 text-center border border-gray-200">
                    <div
                        class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"
                    >
                        <Icon
                            icon="mdi:magnify-off"
                            class="w-8 h-8 text-text-muted"
                        />
                    </div>
                    <h2 class="text-lg font-semibold text-text-main mb-2">
                        No shops found
                    </h2>
                    <p class="text-sm text-text-muted mb-6 max-w-md mx-auto">
                        Try adjusting your search or filters to find your shops.
                    </p>
                    <Button
                        onclick={() => {
                            searchQuery = "";
                            filterStatus = "all";
                            filterVerified = "all";
                        }}
                        variant="outline"
                        size="md"
                    >
                        <Icon
                            icon="mdi:refresh"
                            class="w-4 h-4 mr-1"
                        />
                        Clear Filters
                    </Button>
                </Card>
            {:else if layoutView === "grid"}
                <!-- Grid View -->
                <div
                    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                    in:fade={{ duration: 300 }}
                >
                    {#each filteredShops as shop, i}
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
            {:else}
                <!-- Table View -->
                <ShopTable {filteredShops} />
            {/if}
        </section>

        <!-- Section 4: Pagination -->
        {#if filteredShops.length > 0}
            <AppPagination
                currentPage={1}
                totalItems={filteredShops.length}
                itemsPerPage={10}
                onPageChange={(page) => console.log('Page changed to:', page)}
                entityName="shops"
            />
        {/if}
    {:else}
        <section in:fade>
            <ShopEmptyState />
        </section>
    {/if}
</main>
