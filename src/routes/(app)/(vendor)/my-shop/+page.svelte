<!-- src/routes/(vendor)/my-shop/+page.svelte -->
<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    import ShopCardVendor from "$lib/components/app/card/ShopCardVendor.svelte";
    import ShopEmptyState from "$lib/components/app/vendor/ShopEmptyState.svelte";
    import Button from "$lib/components/common/Button.svelte";

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
</script>

<svelte:head>
    <title>My Shops | VendorHub</title>
</svelte:head>

<main class="max-w-[1280px] mx-auto px-4 py-6 space-y-8">
    <!-- Page Header -->
    <section class="flex items-center justify-between flex-wrap gap-4" in:fade>
        <div class="flex items-center gap-3">
            <div
                class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon
                    icon="mdi:storefront-outline"
                    class="w-5 h-5 text-primary"
                />
            </div>

            <div>
                <h1 class="text-xl md:text-2xl font-bold text-text-main">
                    My Shops
                </h1>

                <p class="text-sm text-text-muted">
                    Manage and monitor all your stores
                </p>
            </div>
        </div>

        <!-- Create Shop Button -->

        <Button href="/my-shop/create" size="sm" variant="primary">
            <Icon icon="mdi:store-plus-outline" class="w-4 h-4 mr-1" />
            Create Shop
        </Button>
    </section>

    <!-- Shop Stats -->
    {#if shops.length > 0}
        <div class="flex items-center justify-between text-sm text-text-muted">
            <span>
                {shopCount}
                {shopCount === 1 ? "shop" : "shops"}
            </span>
        </div>
    {/if}

    <!-- Shops Grid -->

    {#if shops.length > 0}
        <section>
            <div
                class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
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
                        <ShopCardVendor {shop} />
                    </div>
                {/each}
            </div>
        </section>
    {:else}
        <section in:fade>
            <ShopEmptyState />
        </section>
    {/if}
</main>
