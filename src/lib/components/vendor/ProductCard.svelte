<!-- src/lib/components/shop/ProductCard.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import type { Product } from "$lib/types";
  import Card from "$lib/components/ui/Card.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  const dispatch = createEventDispatcher<{
    wishlist: { wishlisted: boolean; product: Product };
  }>();

  export let product: Product;
  export let shopSlug: string;
  export let compact: boolean = false;
  export let className: string = "";
  // allow parent to initialize
  export let wishlisted: boolean = false;

  // local state
  let isWishlisted = wishlisted;

  const toggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isWishlisted = !isWishlisted;
    dispatch("wishlist", { wishlisted: isWishlisted, product });
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockStatusColor = (status: string) => {
    if (status === "in-stock") return "bg-success/10 text-success";
    if (status === "preorder") return "bg-primary/10 text-primary";
    return "bg-error/10 text-error";
  };

  const getStockStatusLabel = (status: string) => {
    if (status === "in-stock") return "In Stock";
    if (status === "preorder") return "Pre-Order";
    return "Sold Out";
  };
</script>

<!-- card wrapper without link; navigation happens via Quick View button -->
<Card
  hover={true}
  padding="none"
  className="overflow-hidden border border-gray-200 h-full flex flex-col {className}"
>
  <!-- Product Image -->
  <div class="relative aspect-square bg-gray-100 overflow-hidden">
    {#if product.images?.[0]}
      <img
        src={product.images[0]}
        alt={product.name}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    {/if}

    <!-- Badges -->
    <div class="absolute top-3 left-3 flex flex-col gap-2">
      {#if product.preorder}
        <Badge variant="info">Pre-Order</Badge>
      {/if}
      {#if product.sale}
        <Badge variant="danger">Sale</Badge>
      {/if}
      {#if product.new}
        <Badge variant="success">New</Badge>
      {/if}
    </div>

    <!-- Stock Status -->
    <div class="absolute top-3 right-3">
      <span
        class="px-2 py-1 rounded-btn text-xs font-medium {getStockStatusColor(
          product.stockStatus,
        )}"
      >
        {getStockStatusLabel(product.stockStatus)}
      </span>
    </div>

    <!-- Hover Overlay (quick actions) -->
    <div
      class="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 relative"
    >
      <Button
        variant="primary"
        size="sm"
        onclick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          goto(`/shops/${shopSlug}/products/${product.code}`);
        }}
      >
        Quick View
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onclick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Handle add to cart logic here
        }}
      >
        Add to Cart
      </Button>
    </div>
  </div>

  <!-- Content -->
  <div class="p-4 flex-1 flex flex-col">
    <div class="flex items-center justify-between gap-4 mb-1">
      <!-- Product Name -->
      <h3
        class="text-body font-semibold text-text-main line-clamp-2 group-hover:text-primary transition-colors"
      >
        {product.name}
      </h3>

      <!-- wishlist inside overlay to avoid conflict with badges -->
      <button
        on:click={toggleWishlist}
        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${isWishlisted
          ? 'bg-red-50 text-red-500'
          : 'text-white hover:text-red-500'}"
        aria-label="Toggle wishlist"
      >
        <svg
          class="w-5 h-5"
          fill={isWishlisted ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>

    {#if !compact}
      <p class="text-small text-text-muted mb-3 line-clamp-1">
        {product.description}
      </p>
    {/if}

    <!-- Rating -->
    <div class="flex items-center gap-1 mb-3">
      {#each Array(5) as _, index}
        <span
          class="text-sm {index < Math.floor(product.rating)
            ? 'text-yellow-400'
            : 'text-gray-300'}">★</span
        >
      {/each}
      <span class="text-small text-text-muted ml-1"
        >({product.reviewCount})</span
      >
    </div>

    <!-- Price -->
    <div class="mt-auto flex items-center gap-2">
      <span class="text-lg font-bold text-primary"
        >{formatNaira(product.price)}</span
      >
      {#if product.oldPrice}
        <span class="text-small text-text-muted line-through"
          >{formatNaira(product.oldPrice)}</span
        >
      {/if}
    </div>

    {#if product.stockStatus === "in-stock" && product.stockCount !== undefined}
      <p class="text-xs text-text-muted mt-2">
        {product.stockCount} left in stock
      </p>
    {/if}

    {#if product.preorder && product.preorderNote}
      <p class="text-xs text-primary mt-2">{product.preorderNote}</p>
    {/if}
  </div>
</Card>
