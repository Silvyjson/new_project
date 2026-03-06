<!-- src/lib/components/vendor/ProductCardList.svelte -->
<script lang="ts">
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let product: any = {};
    export let badge: {
        text: string;
        variant: "default" | "success" | "warning" | "danger" | "info";
    } | null = null;
    export let shopSlug: string = "";
    export let addToCart: (product: any) => void = () => {};
    export let formatNaira: (amount: number) => string = (n) => String(n);
    export let wishlisted: boolean = false;

    let isWishlisted = wishlisted;

    const toggleWishlist = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isWishlisted = !isWishlisted;
        dispatch("wishlist", { wishlisted: isWishlisted, product });
    };
</script>

<Card
    hover={true}
    padding="none"
    className="overflow-hidden border border-gray-200 flex flex-col md:flex-row group"
>
    <!-- Image -->
    <div
        class="relative w-full md:w-48 h-48 md:h-36 bg-gray-100 flex-shrink-0 overflow-hidden"
    >
        {#if product.images?.[0]}
            <img
                src={product.images[0]}
                alt={product.name}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        {/if}
        {#if badge}
            <Badge variant={badge.variant} className="absolute top-3 left-3"
                >{badge.text}</Badge
            >
        {/if}
    </div>

    <!-- Content -->
    <div class="flex-1 p-4 flex flex-col justify-between">
        <div>
            <div class="flex items-start justify-between gap-3 mb-1">
                <a
                    href={`/shop/${shopSlug}/product/${product.code}`}
                    class="hover:underline flex-1"
                >
                    <h3
                        class="text-body font-semibold text-text-main line-clamp-1"
                    >
                        {product.name}
                    </h3>
                </a>

                <button
                    on:click={toggleWishlist}
                    class="w-8 h-8 rounded-full flex items-center justify-center transition
                    {isWishlisted
                        ? 'bg-red-50 text-red-500'
                        : 'text-gray-400 hover:text-red-500'}"
                    aria-label="Toggle wishlist"
                >
                    <Icon
                        icon={isWishlisted ? "mdi:heart" : "mdi:heart-outline"}
                        class="w-5 h-5"
                    />
                </button>
            </div>
            <p class="text-small text-text-muted mb-2 line-clamp-1">
                {product.description}
            </p>
            <div class="flex items-center gap-1 mb-2">
                {#each Array(5) as _, index}
                    <Icon
                        icon="mdi:star"
                        class="text-sm {index < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'}"
                    />
                {/each}
                <span class="text-small text-text-muted ml-0.5"
                    >({product.reviewCount})</span
                >
            </div>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-primary"
                    >{formatNaira(product.price)}</span
                >
                {#if product.oldPrice}
                    <span class="text-small text-text-muted line-through"
                        >{formatNaira(product.oldPrice)}</span
                    >
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
