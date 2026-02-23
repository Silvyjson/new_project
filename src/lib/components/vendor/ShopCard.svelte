<!-- src/lib/components/vendor/ShopCard.svelte -->
<script lang="ts">
    import type { Shop } from "$lib/types";
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";

    export let shop: Shop;
    export let vendorSlug: string;
    export let className: string = "";

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
</script>

<a
    href="/vendors/{vendorSlug}/shop/{shop.slug}"
    class="block group {className}"
>
    <Card
        hover={true}
        padding="none"
        className="overflow-hidden border border-gray-200 hover:border-primary/50 h-full flex flex-col"
    >
        <!-- Banner Image -->
        <div
            class="relative h-40 bg-gradient-to-r from-primary to-primary-light overflow-hidden"
        >
            {#if shop.bannerUrl}
                <img
                    src={shop.bannerUrl}
                    alt={shop.name}
                    class="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                />
            {/if}

            <!-- Category Tag -->
            <div class="absolute top-3 left-3">
                <Badge variant="info">{shop.category}</Badge>
            </div>

            <!-- Trust Indicator -->
            <div class="absolute top-3 right-3">
                <div
                    class="w-8 h-8 rounded-full bg-surface flex items-center justify-center shadow-card"
                >
                    <span
                        class="text-xs font-bold {getTrustScoreColor(
                            shop.trustScore,
                        )}">{shop.trustScore}%</span
                    >
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="p-6 flex-1 flex flex-col">
            <!-- Shop Name & Description -->
            <h3
                class="text-h4 font-bold text-text-main mb-2 group-hover:text-primary transition-colors"
            >
                {shop.name}
            </h3>
            <p class="text-small text-text-muted mb-4 line-clamp-2 flex-1">
                {shop.description ||
                    "Quality products with guaranteed satisfaction."}
            </p>

            <!-- Metrics Row -->
            <div
                class="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100"
            >
                <div class="flex items-center gap-2 text-small text-text-muted">
                    <span>⭐</span>
                    <span>{shop.rating}/5</span>
                </div>
                <div class="flex items-center gap-2 text-small text-text-muted">
                    <span>📦</span>
                    <span>{shop.productCount} Products</span>
                </div>
                <div class="flex items-center gap-2 text-small text-text-muted">
                    <span>🛒</span>
                    <span>{shop.orderCount.toLocaleString()} Orders</span>
                </div>
                <div class="flex items-center gap-2 text-small text-text-muted">
                    <span>👥</span>
                    <span>{shop?.customers?.toLocaleString()} Customers</span>
                </div>
            </div>

            <!-- Trust Score Bar -->
            <div class="mb-4">
                <div
                    class="flex items-center justify-between text-small mb-1.5"
                >
                    <span class="text-text-muted">Shop Trust Score</span>
                    <span
                        class="font-semibold {getTrustScoreColor(
                            shop.trustScore,
                        )}">{shop.trustScore}%</span
                    >
                </div>
                <div
                    class="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                    <div
                        class="h-full {getTrustScoreBgColor(
                            shop.trustScore,
                        )} transition-all duration-500"
                        style="width: {shop.trustScore}%"
                    ></div>
                </div>
            </div>

            <!-- CTA Buttons -->
            <div class="space-y-2">
                <Button variant="primary" size="md" className="w-full">
                    Visit Shop →
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    href="/vendors/{vendorSlug}/shop/{shop.slug}/products"
                    className="w-full"
                >
                    View Products
                </Button>
            </div>
        </div>
    </Card>
</a>
