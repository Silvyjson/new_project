<!-- src/lib/components/dashboard/ShopCardVendor.svelte -->

<script lang="ts">
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import Icon from "@iconify/svelte";

    export let shop: {
        id: string;
        slug: string;
        name: string;
        logoUrl?: string;
        bannerUrl: string;
        trustScore: number;
        followers: number;
        products: number;
        rating: number;
        active: boolean;
        verified: boolean;
    };

    const getTrustColor = (score: number) => {
        if (score >= 80) return "text-success";
        if (score >= 60) return "text-primary";
        if (score >= 40) return "text-yellow-500";
        return "text-error";
    };
</script>

<a href="/my-shop/{shop.id}" class="block group">
    <Card
        hover
        padding="none"
        className="overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 bg-white flex flex-col"
    >
        <!-- Banner -->
        <div class="relative h-32 overflow-hidden bg-gray-100">
            <div class="w-full h-full {shop.bannerUrl}"></div>

            <!-- Status -->
            <div class="absolute top-3 right-3">
                <Badge variant={shop.active ? "success" : "warning"} size="sm">
                    {shop.active ? "Active" : "Paused"}
                </Badge>
            </div>
        </div>

        <!-- Logo -->
        <div class="relative px-5 -mt-10 z-10">
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
        <div class="px-5 pb-5 pt-3 flex flex-col flex-1">
            <!-- Name -->
            <div class="flex items-center gap-2 mb-2">
                <h3
                    class="text-lg font-semibold text-text-main group-hover:text-primary transition-colors"
                >
                    {shop.name}
                </h3>

                {#if shop.verified}
                    <Icon icon="mdi:verified" class="text-primary w-5 h-5" />
                {/if}
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-2 text-sm mb-5">
                <!-- Rating -->
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

                <!-- Trust -->
                <div class="flex items-center gap-2 text-sm">
                    <Icon
                        icon="mdi:shield-check-outline"
                        class="w-4 h-4 text-gray-400"
                    />
                    <span
                        class={`font-semibold ${getTrustColor(shop.trustScore)}`}
                    >
                        {shop.trustScore}%
                    </span>
                    <!-- <span class="text-xs text-text-muted">Trust Score</span> -->
                </div>

                <div class="flex items-center gap-1 text-text-muted">
                    <Icon icon="mdi:cube-outline" class="w-4 h-4" />
                    <span class="font-medium text-text-main">
                        {shop.products}
                    </span>
                    <span class="text-xs">Products</span>
                </div>

                <div class="flex items-center gap-1 text-text-muted">
                    <Icon icon="mdi:account-group-outline" class="w-4 h-4" />
                    <span class="font-medium text-text-main">
                        {shop.followers.toLocaleString()}
                    </span>
                    <span class="text-xs">Followers</span>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 mt-auto">
                <Button variant="primary" size="sm" className="flex-1">
                    Manage
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    href="/shop/{shop.slug}"
                    target="_blank"
                >
                    View
                </Button>
            </div>
        </div>
    </Card>
</a>
