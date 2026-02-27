<!-- src/lib/components/vendor/ProductCardList.svelte -->
<script lang="ts">
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    export let product: any = {};
    export let badge: {
        text: string;
        variant: "default" | "success" | "warning" | "danger" | "info";
    } | null = null;
    export let shopSlug: string = "";
    export let addToCart: (product: any) => void = () => {};
    export let formatNaira: (amount: number) => string = (n) => String(n);
</script>

<Card
    hover={true}
    padding="none"
    className="overflow-hidden border border-gray-200 flex flex-col md:flex-row"
>
    <!-- Image -->
    <div class="relative w-full md:w-48 h-48 md:h-36 bg-gray-100 flex-shrink-0">
        {#if product.images?.[0]}
            <img src={product.images[0]} alt={product.name} class="w-full h-full object-cover" />
        {/if}
        {#if badge}
            <Badge variant={badge.variant} className="absolute top-3 left-3">{badge.text}</Badge>
        {/if}
    </div>

    <!-- Content -->
    <div class="flex-1 p-4 flex flex-col justify-between">
        <div>
            <a
                href={`/shop/${shopSlug}/product/${product.code}`}
                class="hover:underline flex-1"
            >
                <h3 class="text-body font-semibold text-text-main mb-1">{product.name}</h3>
            </a>
            <p class="text-small text-text-muted mb-2 line-clamp-2">{product.description}</p>
            <div class="flex items-center gap-1 mb-2">
                {#each Array(5) as _, index}
                    <span class="text-sm {index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}">★</span>
                {/each}
                <span class="text-small text-text-muted">({product.reviewCount})</span>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-primary">{formatNaira(product.price)}</span>
                {#if product.oldPrice}
                    <span class="text-small text-text-muted line-through">{formatNaira(product.oldPrice)}</span>
                {/if}
            </div>
            <Button
                variant="primary"
                size="sm"
                onclick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                }}
            >
                Add to Cart
            </Button>
        </div>
    </div>
</Card>