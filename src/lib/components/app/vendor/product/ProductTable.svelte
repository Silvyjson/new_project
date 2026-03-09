<!-- src/lib/components/vendor/ProductTable.svelte -->
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
        status: "active" | "draft" | "out-of-stock" | "low-stock";
        category: string;
        lowStockThreshold: number;
        lastUpdated: string;
    }>;

    export let shopSlug: string;

    const getStatusBadge = (status: string) => {
        const badges = {
            active: { variant: "success" as const, label: "Active" },
            draft: { variant: "info" as const, label: "Draft" },
            "out-of-stock": {
                variant: "danger" as const,
                label: "Out of Stock",
            },
            "low-stock": {
                variant: "warning" as const,
                label: "Low Stock",
            },
        };
        return (
            badges[status as keyof typeof badges] || {
                variant: "neutral" as const,
                label: status,
            }
        );
    };

    const handleDelete = (productId: string, productName: string) => {
        if (confirm(`Are you sure you want to delete "${productName}"?`)) {
            // In real app: emit an event or call an API
            console.log("Deleting product:", productId);
        }
    };
</script>

<Card className="border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                    <th
                        class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                        >Product</th
                    >
                    <th
                        class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                        >SKU</th
                    >
                    <th
                        class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                        >Price</th
                    >
                    <th
                        class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                        >Stock</th
                    >
                    <th
                        class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                        >Orders</th
                    >
                    <th
                        class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                        >Status</th
                    >
                    <th
                        class="text-right py-3 px-4 text-sm font-semibold text-text-muted"
                        >Actions</th
                    >
                </tr>
            </thead>
            <tbody>
                {#each products as product}
                    {@const badge = getStatusBadge(product.status)}
                    <tr
                        class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                        <td class="py-3 px-4">
                            <div class="flex items-center gap-3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    class="w-12 h-12 rounded-lg object-cover bg-gray-100"
                                />
                                <div>
                                    <p
                                        class="text-sm font-medium text-text-main"
                                    >
                                        {product.name}
                                    </p>
                                    <p class="text-xs text-text-muted">
                                        {product.category}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="py-3 px-4 text-sm text-text-muted">
                            {product.code}
                        </td>
                        <td class="py-3 px-4">
                            <div class="flex flex-col">
                                {#if product.discountPrice}
                                    <span
                                        class="text-sm font-semibold text-primary"
                                        >{formatNaira(
                                            product.discountPrice,
                                        )}</span
                                    >
                                    <span
                                        class="text-xs text-text-muted line-through"
                                        >{formatNaira(product.price)}</span
                                    >
                                {:else}
                                    <span
                                        class="text-sm font-semibold text-text-main"
                                        >{formatNaira(product.price)}</span
                                    >
                                {/if}
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            <span
                                class="text-sm {product.stock === 0
                                    ? 'text-error'
                                    : 'text-text-main'}"
                            >
                                {product.stock === 0
                                    ? "Out of Stock"
                                    : product.stock}
                            </span>
                        </td>
                        <td class="py-3 px-4 text-sm text-text-muted">
                            {product.orders}
                        </td>
                        <td class="py-3 px-4">
                            <Badge variant={badge.variant}>{badge.label}</Badge>
                        </td>
                        <td class="py-3 px-4">
                            <div class="flex items-center justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    href="/my-shop/{shopSlug}/product/{product.code}"
                                >
                                    <Icon
                                        icon="mdi:eye-outline"
                                        class="w-4 h-4"
                                    />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    href="/my-shop/{shopSlug}/product/{product.code}/edit"
                                >
                                    <Icon
                                        icon="mdi:pencil-outline"
                                        class="w-4 h-4"
                                    />
                                </Button>
                                <button
                                    on:click={() =>
                                        handleDelete(product.id, product.name)}
                                    class="p-2 text-error hover:bg-error/5 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Icon
                                        icon="mdi:trash-can-outline"
                                        class="w-4 h-4"
                                    />
                                </button>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</Card>
