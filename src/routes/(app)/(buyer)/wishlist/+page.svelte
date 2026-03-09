<!-- src/routes/(app)/wishlist/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import ProductCard from '$lib/components/app/card/ProductCard.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  // Mock wishlist items
  let wishlistItems = [
    {
      id: 'p_001',
      name: 'Wireless Headphones Pro',
      price: 24000,
      oldPrice: 30000,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      shop: { name: 'TechHub', slug: 'techhub' },
      rating: 4.8,
      reviews: 124,
      inStock: true,
      addedAt: '2026-01-20'
    },
    {
      id: 'p_002',
      name: 'Air Jordan Retro High',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      shop: { name: 'Urban Kicks', slug: 'urban-kicks' },
      rating: 4.9,
      reviews: 89,
      inStock: true,
      addedAt: '2026-01-18'
    },
    {
      id: 'p_003',
      name: 'Organic Face Cream',
      price: 12000,
      oldPrice: 15000,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
      shop: { name: 'Bella Beauty', slug: 'bella-beauty' },
      rating: 4.7,
      reviews: 56,
      inStock: false,
      addedAt: '2026-01-15'
    }
  ];
  
  // Filter state
  let shopFilter = 'all';
  let shops = ['all', 'TechHub', 'Urban Kicks', 'Bella Beauty'];
  
  // Filter items
  $: filteredItems = shopFilter === 'all'
    ? wishlistItems
    : wishlistItems.filter(item => item.shop.name === shopFilter);
  
  // Handlers
  const handleAddToCart = (productId: string) => {
    // In real app: API call to add to cart
    alert('Added to cart!');
  };
  
  const handleRemove = (productId: string) => {
    wishlistItems = wishlistItems.filter(item => item.id !== productId);
  };
  
  const handleAddAllToCart = () => {
    filteredItems.forEach(item => handleAddToCart(item.id));
    alert('All items added to cart!');
  };
  
  const handleClearWishlist = () => {
    if (confirm('Clear all items from wishlist?')) {
      wishlistItems = [];
    }
  };
</script>

<svelte:head>
  <title>Wishlist | VendorHub</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <!-- Section 1: Wishlist Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:heart-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Wishlist</h1>
        <p class="text-body text-text-muted">{wishlistItems.length} saved product{wishlistItems.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
    
    <div class="flex gap-3">
      <Button variant="outline" size="md" onclick={handleAddAllToCart} disabled={filteredItems.length === 0}>
        <Icon icon="mdi:cart-arrow-down" class="w-4 h-4 mr-2" />
        Add All to Cart
      </Button>
      <Button variant="ghost" size="md" class="text-error hover:bg-error/5" onclick={handleClearWishlist} disabled={wishlistItems.length === 0}>
        <Icon icon="mdi:broom" class="w-4 h-4 mr-2" />
        Clear
      </Button>
    </div>
  </section>
  
  <!-- Section 2: Shop Filter -->
  <section in:fade={{ duration: 400, delay: 100 }}>
    <Card className="border border-gray-200 p-4">
      <div class="flex items-center gap-2 overflow-x-auto">
        {#each shops as shop}
          <button
            on:click={() => shopFilter = shop}
            class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                   {shopFilter === shop 
                     ? 'bg-primary text-white' 
                     : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
          >
            {shop === 'all' ? 'All Shops' : shop}
          </button>
        {/each}
      </div>
    </Card>
  </section>
  
  <!-- Section 3: Product Grid -->
  <section in:fade={{ duration: 400, delay: 200 }}>
    {#if filteredItems.length === 0}
      <Card className="py-16 text-center border border-gray-200">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon icon="mdi:heart-off-outline" class="w-8 h-8 text-text-muted" />
        </div>
        <h2 class="text-h2 text-text-main mb-2">No items found</h2>
        <p class="text-body text-text-muted mb-6">Try adjusting your filter or discover new products.</p>
        <Button variant="primary" size="lg" href="/shop">
          <Icon icon="mdi:magnify" class="w-5 h-5 mr-2" />
          Discover Products
        </Button>
      </Card>
    {:else}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {#each filteredItems as product, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }} class="relative">
            <!-- Remove Button -->
            <button
              on:click={() => handleRemove(product.id)}
              class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center text-error hover:bg-error hover:text-white transition-colors"
              aria-label="Remove from wishlist"
            >
              <Icon icon="mdi:delete-outline" class="w-4 h-4" />
            </button>
            
            <ProductCard {product} on:add-to-cart={() => handleAddToCart(product.id)} />
          </div>
        {/each}
      </div>
    {/if}
  </section>
</div>

<!-- <style>
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    [in:fly] {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style> -->