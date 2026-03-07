<!-- src/lib/components/dashboard/OrderCard.svelte -->
<script lang="ts">
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
  import { formatNaira } from "$lib/utils/format";

    export let order: {
        id: string;
        productId: string;
        productName: string;
        productImage: string;
        shopName: string;
        shopSlug: string;
        price: number;
        status:
            | "new"
            | "pending"
            | "shipped"
            | "delivered"
            | "cancelled"
            | "returned";
        date: string;
        customerName?: string; // For vendor view
    };

    export let view: "buyer" | "vendor" = "buyer";

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

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
        }).format(new Date(date));
    };
</script>

<Card
    className="border border-gray-200 p-4 hover:shadow-card-hover transition-shadow"
>
    <div class="flex items-start gap-4">
        <!-- Product Image -->
        <img
            src={order.productImage}
            alt={order.productName}
            class="w-20 h-20 rounded-lg object-cover bg-gray-100 flex-shrink-0"
        />

        <!-- Order Info -->
        <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4 mb-2">
                <div class="min-w-0">
                    <h4 class="font-semibold text-text-main text-sm truncate">
                        {order.productName}
                    </h4>
                    <p class="text-xs text-text-muted mt-0.5">
                        {#if view === "vendor"}
                            Customer: {order.customerName}
                        {:else}
                            Shop: {order.shopName}
                        {/if}
                    </p>
                </div>
                {#snippet statusBadge()}
                    {@const badge = getStatusBadge(order.status)}
                    <Badge variant={badge.variant} size="sm"
                        >{badge.label}</Badge
                    >
                {/snippet}
                {@render statusBadge()}
            </div>

            <div class="flex items-center justify-between mt-3">
                <div>
                    <p class="text-lg font-bold text-primary">
                        {formatNaira(order.price)}
                    </p>
                    <p class="text-xs text-text-muted">
                        {formatDate(order.date)}
                    </p>
                </div>
                <Button variant="outline" size="sm" href="/orders/{order.id}">
                    View Details
                </Button>
            </div>
        </div>
    </div>
</Card>
