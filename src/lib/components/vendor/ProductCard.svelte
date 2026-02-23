<!-- src/lib/components/vendor/ProductCard.svelte -->
<script lang="ts">
  import type { Product } from '$lib/types';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  
  export let product: Product;
  export let vendorSlug: string;
  
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  const stockLabels: Record<Product['stockStatus'], { label: string; variant: any }> = {
    'in-stock': { label: 'In Stock', variant: 'success' },
    'preorder': { label: 'Preorder', variant: 'info' },
    'sold-out': { label: 'Sold Out', variant: 'danger' }
  };
</script>

<a href={`/${vendorSlug}/item/${product.code}`} class="block group" aria-label="View {product.title}">
  <Card hover={true} padding="none" className="overflow-hidden h-full flex flex-col">
    <!-- Product Image -->
    <div class="relative aspect-square bg-gray-100 overflow-hidden">
      {#if product.images?.[0]}
        <img 
          src={product.images[0]} 
          alt={product.title}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      {:else}
        <div class="w-full h-full flex items-center justify-center text-gray-400">
          <span class="text-4xl">📦</span>
        </div>
      {/if}
      
      <!-- Stock Badge -->
      <div class="absolute top-3 left-3">
        <Badge variant={stockLabels[product.stockStatus].variant}>
          {stockLabels[product.stockStatus].label}
        </Badge>
      </div>
      
      <!-- Quick Add (hover) -->
      <div class="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent">
        <Button variant="primary" size="sm" className="w-full" on:click={() => {}}>
          Quick View
        </Button>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-4 flex-1 flex flex-col">
      <h3 class="font-semibold text-dark line-clamp-2 group-hover:text-primary transition-colors">
        {product.title}
      </h3>
      
      <p class="mt-1 text-sm text-gray-muted line-clamp-2 flex-1">
        {product.description}
      </p>
      
      <!-- Price & CTA -->
      <div class="mt-4 flex items-center justify-between">
        <span class="text-lg font-bold text-primary">
          {formatPrice(product.price, product.currency)}
        </span>
        {#if product.stockStatus !== 'sold-out' && product.stockCount !== undefined}
          <span class="text-xs text-gray-muted">{product.stockCount} left</span>
        {/if}
      </div>
    </div>
  </Card>
</a>