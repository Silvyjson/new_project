<!-- src/lib/components/vendor/ProductGrid.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import { formatNaira } from "$lib/utils/format";

    export let products: Array<{
        id: string;
        code: string;
        name: string;
        image: string;
        price: number;
        discountPrice?: number | null;
        stock: number;
        orders: number;
        status: "active" | "draft" | "out-of-stock";
    }>;

    export let shopSlug: string;

    const getStatusBadge = (status: string) => {
        const badges = {
            active: { variant: "success" as const, label: "Active" },
            draft: { variant: "warning" as const, label: "Draft" },
            "out-of-stock": {
                variant: "danger" as const,
                label: "Out of Stock",
            },
        };
        return (
            badges[status as keyof typeof badges] || {
                variant: "neutral" as const,
                label: status,
            }
        );
    };
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {#each products as product}
        {@const badge = getStatusBadge(product.status)}
        <Card padding="none" className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <!-- Image -->
            <div class="h-40 bg-gray-100 relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <!-- Badge -->
                <div class="absolute top-3 left-3">
                    <Badge variant={badge.variant} size="sm">
                        {badge.label}
                    </Badge>
                </div>

                <!-- Quick view -->
                <a
                    href="/shop/{shopSlug}/product/{product.code}"
                    target="_blank"
                    class="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                >
                    <Icon icon="mdi:eye-outline" class="w-4 h-4 text-gray-700" />
                </a>
            </div>

            <!-- Content -->
            <div class="p-4 flex flex-col gap-3">

                <!-- Product Name -->
                <h3 class="font-semibold text-lg text-text-main line-clamp-1 leading-snug">
                    {product.name}
                </h3>

                <!-- Price -->
                <div class="flex items-center gap-2">
                    {#if product.discountPrice}
                        <span class="text-lg font-bold text-primary">
                            {formatNaira(product.discountPrice)}
                        </span>

                        <span class="text-sm text-gray-400 line-through">
                            {formatNaira(product.price)}
                        </span>
                    {:else}
                        <span class="text-lg font-bold text-text-main">
                            {formatNaira(product.price)}
                        </span>
                    {/if}
                </div>

                <!-- Stats -->
                <div class="flex items-center justify-between text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                    <span class="flex items-center gap-1">
                        <Icon icon="mdi:cube-outline" class="w-4 h-4" />
                        {product.stock} in stock
                    </span>

                    <span class="flex items-center gap-1">
                        <Icon icon="mdi:cart-outline" class="w-4 h-4" />
                        {product.orders} orders
                    </span>
                </div>

                <!-- Actions -->
                <div class="flex gap-2 pt-1">
                    <Button
                        href="/my-shop/{shopSlug}/product/{product.code}/edit"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        <Icon icon="mdi:pencil-outline" class="w-4 h-4 mr-1" />
                        Edit
                    </Button>

                    <Button
                        href="/shop/{shopSlug}/product/{product.code}"
                        variant="ghost"
                        size="sm"
                        target="_blank"
                    >
                        <Icon icon="mdi:open-in-new" class="w-4 h-4" />
                    </Button>
                </div>

            </div>
        </Card>
    {/each}
</div>
