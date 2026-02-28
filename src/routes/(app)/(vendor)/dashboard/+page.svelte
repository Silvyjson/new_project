<!-- src/routes/(vendor)/dashboard/+page.svelte -->
<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import TrustScoreCard from "$lib/components/app/vendor/TrustScoreCard.svelte";
    import KPICard from "$lib/components/app/vendor/KPICard.svelte";
    import OrderTable from "$lib/components/app/vendor/OrderTable.svelte";

    // Mock data
    let user = { name: "Divine" };
    let trustScore = 78;

    const kpis = [
        { label: "Total Revenue", value: "₦2.4M", change: "+12%", trend: "up" },
        { label: "Total Orders", value: "245", change: "+8%", trend: "up" },
        { label: "Pending Orders", value: "12", change: "-3%", trend: "down" },
        { label: "Followers", value: "1,890", change: "+15%", trend: "up" },
    ];

    const recentOrders = [
        {
            id: "ORD-2026-001",
            customer: "John D.",
            shop: "TechStore",
            amount: 25000,
            status: "new",
        },
        {
            id: "ORD-2026-002",
            customer: "Amina K.",
            shop: "Fashion Hub",
            amount: 12000,
            status: "pending",
        },
        {
            id: "ORD-2026-003",
            customer: "Tunde M.",
            shop: "TechStore",
            amount: 45000,
            status: "shipped",
        },
        {
            id: "ORD-2026-004",
            customer: "Blessing O.",
            shop: "Beauty Co",
            amount: 18000,
            status: "delivered",
        },
    ];

    const quickActions = [
        { label: "Add Product", icon: "📦", href: "/my-shop/product/add" },
        { label: "Create Shop", icon: "🏪", href: "/my-shop/create" },
        { label: "Write Blog", icon: "✍️", href: "/my-blog/create" },
    ];

    const getStatusBadge = (status: string) => {
        const badges = {
            new: { variant: "info" as const, label: "New" },
            pending: { variant: "warning" as const, label: "Pending" },
            shipped: { variant: "info" as const, label: "Shipped" },
            delivered: { variant: "success" as const, label: "Delivered" },
            cancelled: { variant: "danger" as const, label: "Cancelled" },
            returned: { variant: "warning" as const, label: "Returned" },
        };
        return badges[status as keyof typeof badges];
    };

    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
        }).format(amount);
    };
</script>

<svelte:head>
    <title>Dashboard | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8">
    <!-- Section 1: Welcome + Trust Score -->
    <section
        class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in"
    >
        <div>
            <h1 class="text-3xl font-bold text-text-main mb-2">
                Welcome back, {user.name} 👋
            </h1>
            <p class="text-body text-text-muted">
                Here's what's happening with your business today.
            </p>
        </div>
        <TrustScoreCard score={trustScore} />
    </section>

    <!-- Section 2: KPI Grid -->
    <section class="mb-10 animate-fade-in" style="transition-delay: 100ms">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each kpis as kpi, i}
                <KPICard
                    label={kpi.label}
                    value={kpi.value}
                    change={kpi.change}
                    trend={kpi.trend}
                    delay={i * 50}
                />
            {/each}
        </div>
    </section>

    <!-- Section 3: Recent Orders -->
    <section class="mb-10 animate-fade-in" style="transition-delay: 200ms">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-text-main">Recent Orders</h2>
            <Button variant="outline" size="sm" href="/orders"
                >View All →</Button
            >
        </div>
        <OrderTable orders={recentOrders} />
    </section>

    <!-- Section 4: Quick Actions -->
    <section class="animate-fade-in" style="transition-delay: 300ms">
        <h2 class="text-xl font-bold text-text-main mb-6">Quick Actions</h2>
        <div class="grid md:grid-cols-3 gap-6">
            {#each quickActions as action, i}
                <a href={action.href} class="block group">
                    <Card
                        className="border border-gray-200 p-6 hover:border-primary hover:shadow-card-hover transition-all cursor-pointer"
                    >
                        <div class="flex items-center gap-4">
                            <div
                                class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform"
                            >
                                {action.icon}
                            </div>
                            <div>
                                <h3
                                    class="text-lg font-semibold text-text-main group-hover:text-primary transition-colors"
                                >
                                    {action.label}
                                </h3>
                                <p class="text-sm text-text-muted">
                                    Create new {action.label.toLowerCase()}
                                </p>
                            </div>
                        </div>
                    </Card>
                </a>
            {/each}
        </div>
    </section>
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

    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>
