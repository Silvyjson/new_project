<!-- src/lib/components/vendor/ShopCard.svelte -->
<script lang="ts">
    import type { Shop } from "$lib/types";
    import Card from "$lib/components/common/Card.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Icon from "@iconify/svelte";

    export let shop: Shop;
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

<a href="/shop/{shop.slug}" class="block group {className}">
    <Card
        hover={true}
        padding="none"
        className="overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full flex flex-col bg-white"
    >
        <!-- Banner Image -->
        <div class="relative h-36 sm:h-40 overflow-hidden bg-gray-100">
            {#if shop.bannerUrl}
                <img
                    src={shop.bannerUrl}
                    alt={shop.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            {/if}

            <div
                class="flex items-center justify-between px-3 py-3 absolute top-0 w-full"
            >
                <!-- Category -->
                <span
                    class="text-xs font-medium bg-black/20 text-white backdrop-blur px-2.5 py-1 rounded-md border border-gray-200"
                >
                    {shop.category}
                </span>

                <!-- Trust Score -->
                <div
                    class="bg-white rounded-full px-1 py-0.5 border border-gray-200 shadow-sm"
                >
                    <span
                        class="text-xs font-semibold {getTrustScoreColor(
                            shop.trustScore,
                        )}"
                    >
                        {shop.trustScore}%
                    </span>
                </div>
            </div>
        </div>

        <!-- Shop Logo Overlay -->
        <div class="relative px-4 -mt-10 z-10">
            <div
                class="w-16 h-16 rounded-xl border-4 border-white overflow-hidden bg-white shadow-sm"
            >
                {#if shop.logoUrl}
                    <img
                        src={shop.logoUrl}
                        alt={shop.name}
                        class="w-full h-full object-cover"
                    />
                {:else}
                    <div
                        class="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl"
                    >
                        {shop.name.charAt(0)}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Content -->
        <div class="px-4 pb-4 pt-2 flex-1 flex flex-col">
            <!-- Name -->
            <h3
                class="text-base sm:text-lg font-semibold text-text-main mb-1 group-hover:text-primary transition-colors flex items-center gap-1"
            >
                {shop.name}
                {#if shop.verified}
                    <Icon icon="mdi:verified" class="text-primary w-5 h-5" />
                {/if}
            </h3>

            <!-- Description -->
            <p class="text-sm text-text-muted mb-4 line-clamp-2 flex-1">
                {shop.description ||
                    "Quality products with guaranteed satisfaction."}
            </p>

            <!-- Metrics -->
            <div class="flex flex-col justify-between mb-4 gap-2 text-sm">
                <!-- 5-Star Rating -->
                <div class="flex items-center gap-2">
                    <div class="flex items-center">
                        {#each Array(5) as _, i}
                            <Icon
                                icon="mdi:star"
                                class={`w-4 h-4 ${
                                    i < Math.round(shop.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        {/each}
                    </div>
                    <span class="text-xs text-text-muted">
                        {shop.rating.toFixed(1)}
                    </span>
                </div>

                <!-- Followers -->
                <div class="flex items-center gap-1 text-text-muted text-xs">
                    <Icon icon="mdi:account-group-outline" class="w-4 h-4" />
                    <span>{shop?.customers?.toLocaleString()}</span>
                </div>
            </div>

            <!-- CTA -->
            <div class="hidden md:flex">
                <Button
                    variant="primary"
                    size="md"
                    className="w-full font-medium"
                >
                    Visit Shop
                </Button>
            </div>
        </div>
    </Card>
</a>
