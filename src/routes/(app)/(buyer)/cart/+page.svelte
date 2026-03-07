<!-- src/routes/(app)/cart/+page.svelte -->
<script lang="ts">
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import { formatNaira } from '$lib/utils/format';
  
  // Mock cart data grouped by vendor
  let cartByVendor = [
    {
      vendorId: 'v_001',
      vendorName: 'TechStoreNG',
      vendorSlug: 'techstoreng',
      trustScore: 94,
      items: [
        {
          id: 'p_001',
          name: 'Wireless Earbuds Pro',
          image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
          price: 25000,
          quantity: 2,
          variant: 'Black'
        },
        {
          id: 'p_002',
          name: 'USB-C Cable 2m',
          image: 'https://images.unsplash.com/photo-1609081219090-a66920c72123',
          price: 3000,
          quantity: 1,
          variant: 'White'
        }
      ],
      subtotal: 53000
    },
    {
      vendorId: 'v_002',
      vendorName: 'Amina Fashion',
      vendorSlug: 'amina-fashion',
      trustScore: 92,
      items: [
        {
          id: 'p_003',
          name: 'Organic Cotton Dress',
          image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
          price: 12000,
          quantity: 1,
          variant: 'Size M'
        }
      ],
      subtotal: 12000
    }
  ];
  
  const totalAmount = cartByVendor.reduce((sum, v) => sum + v.subtotal, 0);
  
  const updateQuantity = (vendorId: string, itemId: string, delta: number) => {
    // In real app: API call to update cart
    const vendor = cartByVendor.find(v => v.vendorId === vendorId);
    if (!vendor) return;
    
    const item = vendor.items.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity = Math.max(1, item.quantity + delta);
    vendor.subtotal = vendor.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  };
  
  const removeItem = (vendorId: string, itemId: string) => {
    // In real app: API call to remove item
    const vendor = cartByVendor.find(v => v.vendorId === vendorId);
    if (!vendor) return;
    
    vendor.items = vendor.items.filter(i => i.id !== itemId);
    vendor.subtotal = vendor.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    
    // Remove vendor if no items
    if (vendor.items.length === 0) {
      cartByVendor = cartByVendor.filter(v => v.vendorId !== vendorId);
    }
  };
</script>

<svelte:head>
  <title>Shopping Cart | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-text-main mb-8">Shopping Cart ({cartByVendor.reduce((sum, v) => sum + v.items.length, 0)} items)</h1>
  
  {#if cartByVendor.length === 0}
    <Card className="py-16 text-center">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-h2 text-text-main mb-2">Your cart is empty</h2>
      <p class="text-body text-text-muted mb-6">Start shopping to add items to your cart.</p>
      <Button href="/shop" variant="primary" size="lg">Browse Shops</Button>
    </Card>
  {:else}
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-6">
        {#each cartByVendor as vendor}
          <Card className="border border-gray-200 overflow-hidden">
            <!-- Vendor Header -->
            <div class="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {vendor.vendorName.charAt(0)}
                </div>
                <div>
                  <h3 class="font-semibold text-text-main">{vendor.vendorName}</h3>
                  <span class="text-xs text-success font-medium">★ {vendor.trustScore}% Trust</span>
                </div>
              </div>
              <a href="/shop/{vendor.vendorSlug}" class="text-sm text-primary font-medium hover:underline">
                Visit Shop →
              </a>
            </div>
            
            <!-- Items -->
            <div class="divide-y divide-gray-100">
              {#each vendor.items as item}
                <div class="p-4 flex gap-4">
                  <img src={item.image} alt={item.name} class="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-text-main mb-1 truncate">{item.name}</h4>
                    <p class="text-sm text-text-muted mb-2">Variant: {item.variant}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <button
                          on:click={() => updateQuantity(vendor.vendorId, item.id, -1)}
                          class="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary transition-colors"
                        >
                          −
                        </button>
                        <span class="w-8 text-center text-body font-medium">{item.quantity}</span>
                        <button
                          on:click={() => updateQuantity(vendor.vendorId, item.id, 1)}
                          class="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div class="flex items-center gap-4">
                        <span class="font-semibold text-primary">{formatNaira(item.price * item.quantity)}</span>
                        <button
                          on:click={() => removeItem(vendor.vendorId, item.id)}
                          class="text-sm text-error hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
            
            <!-- Vendor Subtotal -->
            <div class="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span class="text-body text-text-muted">Subtotal</span>
              <span class="text-lg font-bold text-text-main">{formatNaira(vendor.subtotal)}</span>
            </div>
          </Card>
        {/each}
      </div>
      
      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <Card className="border border-gray-200 sticky top-24">
          <h3 class="text-h3 text-text-main mb-6">Order Summary</h3>
          
          <div class="space-y-4 mb-6">
            <div class="flex items-center justify-between text-body">
              <span class="text-text-muted">Subtotal ({cartByVendor.reduce((sum, v) => sum + v.items.length, 0)} items)</span>
              <span class="font-medium text-text-main">{formatNaira(totalAmount)}</span>
            </div>
            <div class="flex items-center justify-between text-body">
              <span class="text-text-muted">Shipping</span>
              <span class="font-medium text-success">Free</span>
            </div>
            <div class="flex items-center justify-between text-body">
              <span class="text-text-muted">Tax</span>
              <span class="font-medium text-text-main">{formatNaira(totalAmount * 0.075)}</span>
            </div>
          </div>
          
          <div class="border-t border-gray-200 pt-4 mb-6">
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-text-main">Total</span>
              <span class="text-2xl font-bold text-primary">{formatNaira(totalAmount * 1.075)}</span>
            </div>
          </div>
          
          <Button href="/checkout" variant="primary" size="lg" class="w-full mb-3">
            Proceed to Checkout
          </Button>
          <Button href="/shop" variant="outline" size="lg" class="w-full">
            Continue Shopping
          </Button>
          
          <div class="mt-6 flex items-center gap-2 text-xs text-text-muted">
            <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span>Secure checkout powered by VendorHub</span>
          </div>
        </Card>
      </div>
    </div>
  {/if}
</div>