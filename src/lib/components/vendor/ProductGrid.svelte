<!-- src/lib/components/vendor/ProductGrid.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";

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

    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(amount);
    };

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

<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {#each products as product}
        {@const badge = getStatusBadge(product.status)}
        <Card className="border border-gray-200 overflow-hidden group">
            <!-- Image -->
            <div class="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-3 right-3">
                    <Badge variant={badge.variant} size="sm"
                        >{badge.label}</Badge
                    >
                </div>
            </div>

            <!-- Content -->
            <div class="p-4">
                <h3 class="font-semibold text-text-main mb-2 line-clamp-2">
                    {product.name}
                </h3>

                <div class="flex items-center gap-2 mb-3">
                    {#if product.discountPrice}
                        <span class="text-lg font-bold text-primary"
                            >{formatNaira(product.discountPrice)}</span
                        >
                        <span class="text-sm text-text-muted line-through"
                            >{formatNaira(product.price)}</span
                        >
                    {:else}
                        <span class="text-lg font-bold text-text-main"
                            >{formatNaira(product.price)}</span
                        >
                    {/if}
                </div>

                <div
                    class="flex items-center justify-between text-xs text-text-muted mb-4"
                >
                    <span>Stock: {product.stock}</span>
                    <span>Orders: {product.orders}</span>
                </div>

                <!-- Actions -->
                <div class="flex gap-2">
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
                        <Icon icon="mdi:eye-outline" class="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    {/each}
</div>
