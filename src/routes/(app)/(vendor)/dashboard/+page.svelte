<!-- src/routes/(vendor)/dashboard/+page.svelte -->
<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    import ShopCardVendor from "$lib/components/card/ShopCardVendor.svelte";
    import OrderCard from "$lib/components/card/OrderCard.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import KPICard from "$lib/components/app/vendor/KPICard.svelte";
    import ShopEmptyState from "$lib/components/app/vendor/ShopEmptyState.svelte";

    let user = { name: "Silvia" };

    const kpis = [
        { label: "Total Revenue", value: "₦2.4M", change: "+12%", trend: "up" },
        { label: "Total Orders", value: "245", change: "+8%", trend: "up" },
        { label: "Pending Orders", value: "12", change: "-3%", trend: "down" },
        { label: "Followers", value: "1,890", change: "+15%", trend: "up" },
    ] as const;

    let shops = [
        {
            id: "1",
            slug: "urban-kicks",
            name: "Urban Kicks",
            description: "Quality products with guaranteed satisfaction.",
            logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=UK",
            bannerUrl:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            trustScore: 82,
            rating: 4.3,
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
            logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
            bannerUrl:
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
            trustScore: 94,
            rating: 4.7,
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
            logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=FH",
            bannerUrl:
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
            trustScore: 76,
            rating: 4.1,
            followers: 890,
            products: 45,
            active: false,
            verified: false,
        },
    ];
    let recentOrders = [
        {
            id: "ORD-2026-001",
            productId: "p_001",
            productName: "Air Jordan Retro High",
            productImage:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            shopName: "Urban Kicks",
            shopSlug: "urban-kicks",
            price: 120000,
            status: "shipped" as const,
            date: "2026-01-25",
            customerName: "John Doe",
        },
        {
            id: "ORD-2026-002",
            productId: "p_002",
            productName: "Wireless Earbuds Pro",
            productImage:
                "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
            shopName: "TechStoreNG",
            shopSlug: "tech-store",
            price: 25000,
            status: "new" as const,
            date: "2026-01-25",
            customerName: "Amina K.",
        },
        {
            id: "ORD-2026-003",
            productId: "p_003",
            productName: "Organic Cotton Dress",
            productImage:
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
            shopName: "Fashion Hub",
            shopSlug: "fashion-hub",
            price: 12000,
            status: "pending" as const,
            date: "2026-01-24",
            customerName: "Tunde M.",
        },
    ];

    let shopCount = shops.length;
</script>

<svelte:head>
    <title>Dashboard | VendorHub</title>
</svelte:head>

<main class="max-w-[1280px] mx-auto px-4 py-6 space-y-8">
    <!-- Header -->
    <section class="flex items-center justify-between flex-wrap gap-4">
        <div>
            <h1 class="text-xl md:text-2xl font-bold text-text-main">
                Good afternoon {user.name}
            </h1>

            <p class="text-sm text-text-muted">
                {#if shopCount === 0}
                    You haven't created a shop yet
                {:else if shopCount === 1}
                    You manage 1 shop
                {:else}
                    You manage {shopCount} shops
                {/if}
            </p>
        </div>

        <!-- Quick Actions -->
        <div class="flex items-center gap-2">
            <Button href="/my-shop/create" size="sm" variant="primary">
                <Icon icon="mdi:store-plus-outline" class="w-4 h-4 mr-1" />
                Shop
            </Button>

            <Button href="/my-blog/create" size="sm" variant="outline">
                <Icon icon="mdi:pencil-outline" class="w-4 h-4 mr-1" />
                Blog
            </Button>
        </div>
    </section>

    <!-- KPI Section -->
    <section>
        <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-text-main">Overview</h2>
        </div>

        <!-- Mobile Scroll -->
        <div
            class="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2"
        >
            {#each kpis as kpi, i}
                <div class="min-w-[220px] md:min-w-0">
                    <KPICard
                        label={kpi.label}
                        value={kpi.value}
                        change={kpi.change}
                        trend={kpi.trend}
                        delay={i * 50}
                    />
                </div>
            {/each}
        </div>
    </section>

    <!-- Recent Orders -->
    <section>
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-text-main">Recent Orders</h2>

            <Button variant="outline" size="sm" href="/orders">View All</Button>
        </div>

        {#if recentOrders.length > 0}
            <div class="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto pb-2">
                {#each recentOrders as order, i}
                    <div
                        class="w-100"
                        in:fly={{
                            y: 20,
                            duration: 400,
                            delay: i * 50,
                            easing: cubicOut,
                        }}
                    >
                        <OrderCard {order} view="vendor" />
                    </div>
                {/each}
            </div>
        {:else}
            <Card className="py-10 text-center border border-gray-200">
                <Icon
                    icon="mdi:package-variant-closed"
                    class="w-10 h-10 mx-auto mb-3 text-gray-400"
                />
                <p class="text-sm text-text-muted">No orders yet</p>
            </Card>
        {/if}
    </section>

    <!-- Shops -->
    {#if shops.length > 0}
        <section>
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-text-main">Your Shops</h2>

                <Button variant="outline" size="sm" href="/my-shop"
                    >View All</Button
                >
            </div>

            <!-- Mobile scroll -->
            <div
                class="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto pb-2"
            >
                {#each shops as shop, i}
                    <div
                        class="min-w-[260px] md:min-w-0"
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
        <!-- Empty Shops -->
        <section>
            <ShopEmptyState />
        </section>
    {/if}
</main>

<style>
    /* smooth mobile scrolling */
    div::-webkit-scrollbar {
        display: none;
    }

    div {
        scrollbar-width: none;
    }
</style>
