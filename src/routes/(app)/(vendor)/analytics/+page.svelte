<!-- src/routes/(vendor)/analytics/+page.svelte -->
<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";

    // Active tab
    let activeTab = "overview";

    // Mock analytics data
    let metrics = [
        { label: "Total Revenue", value: "₦2.4M", change: "+12%", trend: "up" },
        { label: "Total Orders", value: "245", change: "+8%", trend: "up" },
        {
            label: "Avg Order Value",
            value: "₦9,800",
            change: "+4%",
            trend: "up",
        },
        {
            label: "Conversion Rate",
            value: "3.2%",
            change: "-1%",
            trend: "down",
        },
    ];

    const shops = [
        { name: "TechStoreNG", revenue: 1200000, orders: 120 },
        { name: "Fashion Hub", revenue: 800000, orders: 85 },
        { name: "Home Essentials", revenue: 400000, orders: 40 },
    ];

    const topProducts = [
        { name: "Wireless Earbuds Pro", orders: 85, revenue: 2125000 },
        { name: "USB-C Cable 2m", orders: 120, revenue: 360000 },
        { name: "Phone Case", orders: 95, revenue: 475000 },
        { name: "Screen Protector", orders: 150, revenue: 450000 },
    ];

    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
        }).format(amount);
    };

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "by-shop", label: "By Shop" },
        { id: "by-product", label: "By Product" },
    ];
</script>

<svelte:head>
    <title>Analytics | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-text-main mb-8">Analytics</h1>

    <!-- Tabs -->
    <div class="flex items-center gap-2 mb-8">
        {#each tabs as tab}
            <button
                on:click={() => (activeTab = tab.id)}
                class="px-6 py-3 rounded-xl text-body font-medium transition-colors
               {activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
            >
                {tab.label}
            </button>
        {/each}
    </div>

    <!-- Overview Tab -->
    {#if activeTab === "overview"}
        <div class="space-y-8 animate-fade-in">
            <!-- Metrics Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each metrics as metric, i}
                    <Card className="border border-gray-200 p-6">
                        <p class="text-sm text-text-muted mb-2">
                            {metric.label}
                        </p>
                        <div class="flex items-end justify-between">
                            <span class="text-2xl font-bold text-text-main"
                                >{metric.value}</span
                            >
                            <span
                                class="text-sm font-medium {metric.trend ===
                                'up'
                                    ? 'text-success'
                                    : 'text-danger'}"
                            >
                                {metric.change}
                            </span>
                        </div>
                    </Card>
                {/each}
            </div>

            <!-- Charts Placeholder -->
            <div class="grid md:grid-cols-2 gap-6">
                <Card className="border border-gray-200 p-6">
                    <h2 class="text-lg font-bold text-text-main mb-4">
                        Revenue Trend
                    </h2>
                    <div
                        class="h-64 bg-gray-100 rounded-xl flex items-center justify-center"
                    >
                        <p class="text-text-muted">Chart placeholder</p>
                    </div>
                </Card>
                <Card className="border border-gray-200 p-6">
                    <h2 class="text-lg font-bold text-text-main mb-4">
                        Orders Trend
                    </h2>
                    <div
                        class="h-64 bg-gray-100 rounded-xl flex items-center justify-center"
                    >
                        <p class="text-text-muted">Chart placeholder</p>
                    </div>
                </Card>
            </div>

            <!-- Top Products -->
            <Card className="border border-gray-200 p-6">
                <h2 class="text-lg font-bold text-text-main mb-6">
                    Top Products
                </h2>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th
                                    class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                    >Product</th
                                >
                                <th
                                    class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                    >Orders</th
                                >
                                <th
                                    class="text-right py-3 px-4 text-sm font-semibold text-text-muted"
                                    >Revenue</th
                                >
                            </tr>
                        </thead>
                        <tbody>
                            {#each topProducts as product}
                                <tr class="border-b border-gray-100">
                                    <td
                                        class="py-3 px-4 text-sm font-medium text-text-main"
                                        >{product.name}</td
                                    >
                                    <td
                                        class="py-3 px-4 text-sm text-text-muted"
                                        >{product.orders}</td
                                    >
                                    <td
                                        class="py-3 px-4 text-sm font-semibold text-text-main text-right"
                                    >
                                        {formatNaira(product.revenue)}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    {/if}

    <!-- By Shop Tab -->
    {#if activeTab === "by-shop"}
        <div class="space-y-6 animate-fade-in">
            {#each shops as shop, i}
                <Card className="border border-gray-200 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold text-text-main">
                            {shop.name}
                        </h3>
                        <Button variant="outline" size="sm" href="/my-shop"
                            >View Shop</Button
                        >
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <p class="text-sm text-text-muted mb-1">Revenue</p>
                            <p class="text-2xl font-bold text-text-main">
                                {formatNaira(shop.revenue)}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-text-muted mb-1">Orders</p>
                            <p class="text-2xl font-bold text-text-main">
                                {shop.orders}
                            </p>
                        </div>
                    </div>
                </Card>
            {/each}
        </div>
    {/if}

    <!-- By Product Tab -->
    {#if activeTab === "by-product"}
        <Card className="border border-gray-200 p-6 animate-fade-in">
            <h2 class="text-lg font-bold text-text-main mb-6">
                All Products Performance
            </h2>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-gray-200">
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Product</th
                            >
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Views</th
                            >
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Orders</th
                            >
                            <th
                                class="text-right py-3 px-4 text-sm font-semibold text-text-muted"
                                >Revenue</th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each topProducts as product}
                            <tr class="border-b border-gray-100">
                                <td
                                    class="py-3 px-4 text-sm font-medium text-text-main"
                                    >{product.name}</td
                                >
                                <td class="py-3 px-4 text-sm text-text-muted"
                                    >{product.orders * 15}</td
                                >
                                <td class="py-3 px-4 text-sm text-text-muted"
                                    >{product.orders}</td
                                >
                                <td
                                    class="py-3 px-4 text-sm font-semibold text-text-main text-right"
                                >
                                    {formatNaira(product.revenue)}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </Card>
    {/if}
</div>

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
</style>
