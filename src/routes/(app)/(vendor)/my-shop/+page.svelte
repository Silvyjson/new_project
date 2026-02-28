<!-- src/routes/(vendor)/my-shop/+page.svelte -->
<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";

    // Mock shops data
    let shops = [
        {
            id: 1,
            name: "TechStoreNG",
            banner: "bg-blue-100",
            logo: "🏪",
            products: 120,
            followers: 2340,
            active: true,
        },
        {
            id: 2,
            name: "Fashion Hub",
            banner: "bg-pink-100",
            logo: "👗",
            products: 85,
            followers: 1890,
            active: true,
        },
        {
            id: 3,
            name: "Home Essentials",
            banner: "bg-green-100",
            logo: "🏠",
            products: 200,
            followers: 1200,
            active: false,
        },
    ];

    const toggleShopStatus = (id: number) => {
        shops = shops.map((shop) =>
            shop.id === id ? { ...shop, active: !shop.active } : shop,
        );
    };
</script>

<svelte:head>
    <title>My Shops | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-8">
        <div>
            <h1 class="text-3xl font-bold text-text-main mb-2">My Shops</h1>
            <p class="text-body text-text-muted">
                Manage all your shops in one place.
            </p>
        </div>
        <Button href="/my-shop/create" variant="primary" size="lg">
            + Create Shop
        </Button>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each shops as shop, i}
            <div
                in:fly={{
                    y: 20,
                    duration: 400,
                    delay: i * 100,
                    easing: cubicOut,
                }}
            >
                <Card
                    hover={true}
                    padding="none"
                    className="overflow-hidden border border-gray-200"
                >
                    <!-- Banner -->
                    <div class="h-32 {shop.banner} relative">
                        <div class="absolute -bottom-10 left-6">
                            <div
                                class="w-20 h-20 rounded-full bg-surface border-4 border-surface flex items-center justify-center text-4xl shadow-card"
                            >
                                {shop.logo}
                            </div>
                        </div>
                        <div class="absolute top-4 right-4">
                            <Badge
                                variant={shop.active ? "success" : "warning"}
                            >
                                {shop.active ? "Active" : "Paused"}
                            </Badge>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="pt-12 pb-4 px-6">
                        <h3 class="text-lg font-bold text-text-main mb-1">
                            {shop.name}
                        </h3>
                        <div
                            class="flex items-center gap-4 mb-4 text-sm text-text-muted"
                        >
                            <span>{shop.products} Products</span>
                            <span>•</span>
                            <span
                                >{shop.followers.toLocaleString()} Followers</span
                            >
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <Button
                                href="/my-shop/{shop.id}/product"
                                variant="outline"
                                size="sm"
                                class="flex-1"
                            >
                                Manage Products
                            </Button>
                            <Button
                                href="/my-shop/{shop.id}/analytics"
                                variant="outline"
                                size="sm"
                                class="flex-1"
                            >
                                Analytics
                            </Button>
                        </div>

                        <div class="mt-4 pt-4 border-t border-gray-100">
                            <button
                                on:click={() => toggleShopStatus(shop.id)}
                                class="text-sm text-primary font-medium hover:underline"
                            >
                                {shop.active ? "Pause Shop" : "Activate Shop"}
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        {/each}
    </div>
</div>
