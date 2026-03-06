<!-- src/lib/components/vendor/ShopPreview.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";

    export let shop: {
        name: string;
        slogan: string;
        description: string;
        logoUrl: string;
        coverUrl: string;
        theme: string;
        trustScore: number;
        products: number;
        followers: number;
        verified: boolean;
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };
</script>

<Card className="border border-gray-200 overflow-hidden sticky top-24">
    <div class="p-6 border-b border-gray-200">
        <h3 class="font-semibold text-text-main flex items-center gap-2">
            <Icon icon="mdi:eye-outline" class="w-5 h-5" />
            Live Preview
        </h3>
        <p class="text-xs text-text-muted mt-1">
            How your shop will appear to buyers
        </p>
    </div>

    <!-- Shop Card Preview -->
    <div class="p-6">
        <!-- Cover -->
        <div class="h-32 rounded-xl relative mb-8 overflow-hidden bg-gray-100">
            {#if shop.coverUrl}
                <img
                    src={shop.coverUrl}
                    alt="Cover"
                    class="w-full h-full object-cover"
                />
            {:else}
                <div
                    class="w-full h-full bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center"
                >
                    <Icon
                        icon="mdi:image-outline"
                        class="w-8 h-8 text-primary/40"
                    />
                </div>
            {/if}
            <!-- Logo -->
            <div class="absolute -bottom-10 left-6">
                <div
                    class="w-20 h-20 rounded-full bg-surface border-4 border-surface flex items-center justify-center text-4xl shadow-card overflow-hidden"
                >
                    {#if shop.logoUrl}
                        <img
                            src={shop.logoUrl}
                            alt="Logo"
                            class="w-full h-full object-cover"
                        />
                    {:else}
                        <div
                            class="w-full h-full bg-gray-100 flex items-center justify-center text-2xl"
                        >
                            🏪
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="pt-12">
            <div class="flex items-center gap-2 mb-2">
                <h4 class="text-lg font-bold text-text-main">
                    {shop.name || "Shop Name"}
                </h4>
                {#if shop.verified}
                    <TrustBadge size="sm" showText={false} />
                {/if}
            </div>

            {#if shop.slogan}
                <p class="text-body text-text-muted mb-3">{shop.slogan}</p>
            {/if}

            {#if shop.description}
                <p class="text-sm text-text-muted mb-4 line-clamp-2">
                    {shop.description}
                </p>
            {/if}

            <!-- Stats -->
            <div
                class="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100 mb-4"
            >
                <div class="text-center">
                    <div class="flex items-center justify-center gap-1 mb-1">
                        <Icon
                            icon="mdi:cube-outline"
                            class="w-4 h-4 text-primary"
                        />
                        <div class="text-lg font-bold text-text-main">
                            {shop.products}
                        </div>
                    </div>
                    <div class="text-xs text-text-muted">Products</div>
                </div>
                <div class="text-center">
                    <div class="flex items-center justify-center gap-1 mb-1">
                        <Icon
                            icon="mdi:account-group-outline"
                            class="w-4 h-4 text-primary"
                        />
                        <div class="text-lg font-bold text-text-main">
                            {formatNumber(shop.followers)}
                        </div>
                    </div>
                    <div class="text-xs text-text-muted">Followers</div>
                </div>
                <div class="text-center">
                    <div class="flex items-center justify-center gap-1 mb-1">
                        <Icon
                            icon="mdi:shield-check-outline"
                            class="w-4 h-4 {shop.trustScore >= 80
                                ? 'text-success'
                                : 'text-primary'}"
                        />
                        <div
                            class="text-lg font-bold {shop.trustScore >= 80
                                ? 'text-success'
                                : 'text-primary'}"
                        >
                            {shop.trustScore}%
                        </div>
                    </div>
                    <div class="text-xs text-text-muted">Trust</div>
                </div>
            </div>

            <!-- Trust Badge -->
            {#if shop.verified}
                <div class="flex items-center justify-center">
                    <Badge variant="success" size="sm">
                        <Icon
                            icon="mdi:check-circle"
                            class="w-3 h-3 inline mr-1"
                        />
                        Verified Shop
                    </Badge>
                </div>
            {/if}
        </div>
    </div>
</Card>
