<!-- src/routes/(app)/checkout/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  
  // Mock checkout data
  let checkoutData = {
    items: [
      { id: 1, name: 'Wireless Earbuds Pro', price: 25000, quantity: 2, vendor: 'TechStoreNG' },
      { id: 2, name: 'USB-C Cable 2m', price: 3000, quantity: 1, vendor: 'TechStoreNG' },
      { id: 3, name: 'Organic Cotton Dress', price: 12000, quantity: 1, vendor: 'Amina Fashion' }
    ],
    subtotal: 65000,
    shipping: 0,
    tax: 4875,
    total: 69875
  };
  
  // Form state
  let selectedAddress = 'home';
  let paymentMethod = 'card';
  let loading = false;
  
  // Addresses
  const addresses = [
    { id: 'home', label: 'Home', address: '123 Main Street, Lagos, Nigeria', default: true },
    { id: 'work', label: 'Work', address: '456 Business Ave, Lagos, Nigeria', default: false }
  ];
  
  const handleCheckout = async (e: Event) => {
    e.preventDefault();
    loading = true;
    
    // In real app: API call to create order with Paystack
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to success
    goto('/orders?success=true');
  };
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
</script>

<svelte:head>
  <title>Checkout | VendorHub</title>
</svelte:head>

<div class="max-w-[1200px] mx-auto px-4 py-8">
  <div class="mb-6">
    <a href="/cart" class="text-sm text-primary font-medium hover:underline flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Cart
    </a>
  </div>
  
  <h1 class="text-3xl font-bold text-text-main mb-8">Checkout</h1>
  
  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Checkout Form -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- Shipping Address -->
      <Card class="border border-gray-200 p-6">
        <h2 class="text-xl font-bold text-text-main mb-4">Shipping Address</h2>
        <div class="space-y-3">
          {#each addresses as addr}
            <label class="flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                         {selectedAddress === addr.id 
                           ? 'border-primary bg-primary/5' 
                           : 'border-gray-200 hover:border-gray-300'}">
              <input
                type="radio"
                name="address"
                value={addr.id}
                bind:group={selectedAddress}
                class="w-4 h-4 mt-1 text-primary"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-semibold text-text-main">{addr.label}</span>
                  {#if addr.default}
                    <Badge variant="success" size="sm">Default</Badge>
                  {/if}
                </div>
                <p class="text-sm text-text-muted">{addr.address}</p>
              </div>
            </label>
          {/each}
          <button type="button" class="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-primary font-medium hover:border-primary hover:bg-primary/5 transition-colors">
            + Add New Address
          </button>
        </div>
      </Card>
      
      <!-- Payment Method -->
      <Card class="border border-gray-200 p-6">
        <h2 class="text-xl font-bold text-text-main mb-4">Payment Method</h2>
        <div class="space-y-3">
          <label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                       {paymentMethod === 'card' 
                         ? 'border-primary bg-primary/5' 
                         : 'border-gray-200 hover:border-gray-300'}">
            <input type="radio" name="payment" value="card" bind:group={paymentMethod} class="w-4 h-4 text-primary" />
            <div class="flex-1 flex items-center gap-3">
              <svg class="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              <span class="font-medium text-text-main">Debit/Credit Card</span>
            </div>
          </label>
          <label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                       {paymentMethod === 'transfer' 
                         ? 'border-primary bg-primary/5' 
                         : 'border-gray-200 hover:border-gray-300'}">
            <input type="radio" name="payment" value="transfer" bind:group={paymentMethod} class="w-4 h-4 text-primary" />
            <div class="flex-1 flex items-center gap-3">
              <svg class="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
              <span class="font-medium text-text-main">Bank Transfer</span>
            </div>
          </label>
          <label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                       {paymentMethod === 'wallet' 
                         ? 'border-primary bg-primary/5' 
                         : 'border-gray-200 hover:border-gray-300'}">
            <input type="radio" name="payment" value="wallet" bind:group={paymentMethod} class="w-4 h-4 text-primary" />
            <div class="flex-1 flex items-center gap-3">
              <svg class="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              <span class="font-medium text-text-main">VendorHub Wallet</span>
            </div>
          </label>
        </div>
      </Card>
      
      <!-- Order Notes -->
      <Card class="border border-gray-200 p-6">
        <h2 class="text-xl font-bold text-text-main mb-4">Order Notes (Optional)</h2>
        <textarea
          placeholder="Any special instructions for your order?"
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
          rows="3"
        ></textarea>
      </Card>
    </div>
    
    <!-- Order Summary -->
    <div class="lg:col-span-1">
      <Card class="border border-gray-200 p-6 sticky top-24">
        <h2 class="text-xl font-bold text-text-main mb-6">Order Summary</h2>
        
        <!-- Items -->
        <div class="space-y-4 mb-6 max-h-64 overflow-y-auto">
          {#each checkoutData.items as item}
            <div class="flex gap-3">
              <div class="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-text-main truncate">{item.name}</h4>
                <p class="text-xs text-text-muted">Qty: {item.quantity}</p>
                <p class="text-sm font-semibold text-primary">{formatNaira(item.price * item.quantity)}</p>
              </div>
            </div>
          {/each}
        </div>
        
        <!-- Totals -->
        <div class="space-y-3 pt-4 border-t border-gray-200 mb-6">
          <div class="flex items-center justify-between text-body">
            <span class="text-text-muted">Subtotal</span>
            <span class="font-medium text-text-main">{formatNaira(checkoutData.subtotal)}</span>
          </div>
          <div class="flex items-center justify-between text-body">
            <span class="text-text-muted">Shipping</span>
            <span class="font-medium text-success">Free</span>
          </div>
          <div class="flex items-center justify-between text-body">
            <span class="text-text-muted">Tax (7.5%)</span>
            <span class="font-medium text-text-main">{formatNaira(checkoutData.tax)}</span>
          </div>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t-2 border-gray-200 mb-6">
          <span class="text-lg font-bold text-text-main">Total</span>
          <span class="text-2xl font-bold text-primary">{formatNaira(checkoutData.total)}</span>
        </div>
        
        <form on:submit={handleCheckout}>
          <Button type="submit" variant="primary" size="lg" class="w-full mb-3" disabled={loading}>
            {loading ? 'Processing...' : `Pay ${formatNaira(checkoutData.total)}`}
          </Button>
        </form>
        
        <div class="flex items-center gap-2 text-xs text-text-muted justify-center">
          <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span>Secure checkout • Escrow protected</span>
        </div>
      </Card>
    </div>
  </div>
</div>