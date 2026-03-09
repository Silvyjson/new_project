<!-- src/routes/(app)/cart/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import CartItemCard from '$lib/components/app/buyer/CartItemCard.svelte';
  import CartSummary from '$lib/components/app/buyer/CartSummary.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  // Shop filter from URL
  let shopSlug = '';
  $: if ($page.url.searchParams.has('shop')) {
    shopSlug = $page.url.searchParams.get('shop') || '';
  }
  
  // Mock cart items (in real app: fetch from API)
  let cartItems = [
    {
      id: 'ci_001',
      productId: 'p_001',
      name: 'Wireless Headphones Pro',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      price: 24000,
      oldPrice: 30000,
      quantity: 2,
      shop: { id: '1', name: 'TechHub', slug: 'techhub' },
      variant: 'Black',
      inStock: true
    },
    {
      id: 'ci_002',
      productId: 'p_002',
      name: 'USB-C Cable 2m',
      image: 'https://images.unsplash.com/photo-1609081219090-a66920c72123',
      price: 3000,
      quantity: 1,
      shop: { id: '1', name: 'TechHub', slug: 'techhub' },
      inStock: true
    },
    {
      id: 'ci_003',
      productId: 'p_003',
      name: 'Air Jordan Retro High',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      price: 85000,
      quantity: 1,
      shop: { id: '2', name: 'Urban Kicks', slug: 'urban-kicks' },
      inStock: true
    }
  ];
  
  // Filter by shop if query param exists
  $: filteredItems = shopSlug 
    ? cartItems.filter(item => item.shop.slug === shopSlug)
    : cartItems;
  
  // Group items by shop
  $: groupedItems = filteredItems.reduce((groups, item) => {
    const shopId = item.shop.id;
    if (!groups[shopId]) groups[shopId] = [];
    groups[shopId].push(item);
    return groups;
  }, {} as Record<string, typeof filteredItems>);
  
  // Calculate totals
  $: subtotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  $: shipping = filteredItems.length > 0 ? 5000 : 0;
  $: serviceFee = Math.round(subtotal * 0.015); // 1.5%
  $: discount = 0; // From coupon
  $: total = subtotal + shipping + serviceFee - discount;
  
  // Handlers
  const handleUpdateQuantity = (id: string, quantity: number) => {
    cartItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
  };
  
  const handleRemove = (id: string) => {
    cartItems = cartItems.filter(item => item.id !== id);
  };
  
  const handleMoveToWishlist = (id: string) => {
    // In real app: API call to move to wishlist
    handleRemove(id);
    alert('Item moved to wishlist!');
  };
  
  const handleCheckout = () => {
    // Build checkout URL with shop filter if applicable
    const params = new URLSearchParams();
    if (shopSlug) params.set('shop', shopSlug);
    goto(`/checkout${params.toString() ? '?' + params.toString() : ''}`);
  };
  
  const shopName = shopSlug 
    ? filteredItems[0]?.shop.name 
    : undefined;
</script>

<svelte:head>
  <title>Shopping Cart | VendorHub</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
  
  <!-- Section 1: Cart Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" in:fade={{ duration: 400 }}>
    <div>
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:cart-outline" class="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-text-main">
            Shopping Cart
            {#if shopName}
              <span class="text-text-muted">— {shopName}</span>
            {/if}
          </h1>
          <p class="text-body text-text-muted mt-1">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} in cart
          </p>
        </div>
      </div>
    </div>
    
    <Button variant="outline" size="md" href="/shop">
      <Icon icon="mdi:arrow-left" class="w-4 h-4 mr-2" />
      Continue Shopping
    </Button>
  </section>
  
  {#if filteredItems.length === 0}
    <!-- Empty Cart State -->
    <section in:fade={{ duration: 400, delay: 100 }}>
      <Card className="py-16 text-center border border-gray-200">
        <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <Icon icon="mdi:cart-outline" class="w-10 h-10 text-text-muted" />
        </div>
        <h2 class="text-h2 text-text-main mb-2">Your cart is empty</h2>
        <p class="text-body text-text-muted mb-8 max-w-md mx-auto">
          Looks like you haven't added any items yet. Start shopping to fill your cart!
        </p>
        <Button variant="primary" size="lg" href="/shop">
          <Icon icon="mdi:store-search-outline" class="w-5 h-5 mr-2" />
          Discover Shops
        </Button>
      </Card>
    </section>
  {:else}
    <!-- Cart Content -->
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
      
      <!-- Left: Cart Items -->
      <div class="space-y-6" in:fade={{ duration: 400, delay: 100 }}>
        {#each Object.entries(groupedItems) as [shopId, items]}
          {@const shop = items[0].shop}
          
          <!-- Shop Group Header -->
          <div class="flex items-center justify-between py-4 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:storefront-outline" class="w-5 h-5 text-primary" />
              <div>
                <h3 class="font-semibold text-text-main">{shop.name}</h3>
                <p class="text-sm text-text-muted">{items.length} item{items.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" href="/shop/{shop.slug}">
              View Shop
            </Button>
          </div>
          
          <!-- Shop Items -->
          <div class="space-y-4">
            {#each items as item}
              <CartItemCard
                {item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
                onMoveToWishlist={handleMoveToWishlist}
              />
            {/each}
          </div>
        {/each}
      </div>
      
      <!-- Right: Order Summary -->
      <div in:fade={{ duration: 400, delay: 200 }}>
        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          serviceFee={serviceFee}
          discount={discount}
          total={total}
          shopName={shopName}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  {/if}
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