<!-- src/lib/components/shop/ProductCard.svelte -->
<script lang="ts">
  import type { Product } from "$lib/types";
  import Card from "$lib/components/ui/Card.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  export let product: Product;
  export let shopSlug: string;
  export let compact: boolean = false;
  export let className: string = "";

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

<a
  href="/shops/{shopSlug}/products/{product.code}"
  class="block group {className}"
>
  <Card
    hover={true}
    padding="none"
    className="overflow-hidden border border-gray-200 h-full flex flex-col"
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

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
      >
        <Button
          variant="primary"
          size="sm"
          onclick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle quick view logic here
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
      <!-- Product Name -->
      <h3
        class="text-body font-semibold text-text-main mb-1 line-clamp-2 group-hover:text-primary transition-colors"
      >
        {product.name}
      </h3>

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
</a>
