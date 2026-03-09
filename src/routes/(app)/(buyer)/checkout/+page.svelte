<!-- src/routes/(app)/checkout/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import CheckoutSteps from '$lib/components/app/buyer/CheckoutSteps.svelte';
  import CartItemCard from '$lib/components/app/buyer/CartItemCard.svelte';
  import CartSummary from '$lib/components/app/buyer/CartSummary.svelte';
  import AddressSelector from '$lib/components/app/buyer/AddressSelector.svelte';
  import PaymentSelector from '$lib/components/app/buyer/PaymentSelector.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  // Shop filter from URL
  let shopSlug = '';
  $: if ($page.url.searchParams.has('shop')) {
    shopSlug = $page.url.searchParams.get('shop') || '';
  }
  
  // Checkout step (1-4)
  let currentStep = 2; // Start at Address step
  
  // Mock data (in real app: fetch from API)
  let addresses = [
    {
      id: 'a_001',
      name: 'John Doe',
      phone: '+234 801 234 5678',
      street: '123 Main Street, Victoria Island',
      city: 'Lagos',
      state: 'Lagos State',
      postalCode: '101241',
      country: 'Nigeria',
      isDefault: true
    }
  ];
  
  let paymentMethods = [
    {
      id: 'pm_001',
      type: 'card' as const,
      label: 'Visa **** 4421',
      details: 'Expires 10/27',
      isDefault: true
    },
    {
      id: 'pm_002',
      type: 'wallet' as const,
      label: 'VendorHub Wallet',
      details: 'Pay with wallet balance',
      balance: 12000,
      isDefault: false
    }
  ];
  
  let cartItems = [
    {
      id: 'ci_001',
      productId: 'p_001',
      name: 'Wireless Headphones Pro',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      price: 24000,
      quantity: 2,
      shop: { id: '1', name: 'TechHub', slug: 'techhub' },
      variant: 'Black',
      inStock: true
    }
  ];
  
  // Filter by shop
  $: filteredItems = shopSlug 
    ? cartItems.filter(item => item.shop.slug === shopSlug)
    : cartItems;
  
  // Form state
  let selectedAddress = addresses[0]?.id || '';
  let selectedPayment = paymentMethods[0]?.id || '';
  let deliveryMethod = 'gig';
  let orderNote = '';
  let placingOrder = false;
  
  // Calculate totals
  $: subtotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  $: shipping = 5000;
  $: serviceFee = Math.round(subtotal * 0.015);
  $: discount = 0;
  $: total = subtotal + shipping + serviceFee - discount;
  
  // Handlers
  const handlePlaceOrder = async () => {
    placingOrder = true;
    
    try {
      // In real app: API call to create order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to order confirmation
      goto('/orders?success=true');
    } catch (err) {
      alert('Failed to place order. Please try again.');
    } finally {
      placingOrder = false;
    }
  };
  
  const shopName = shopSlug ? filteredItems[0]?.shop.name : undefined;
</script>

<svelte:head>
  <title>Checkout | VendorHub</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
  
  <!-- Checkout Steps -->
  <CheckoutSteps currentStep={currentStep} />
  
  <!-- Page Header -->
  <div class="mb-8" in:fade={{ duration: 400 }}>
    <h1 class="text-3xl font-bold text-text-main">Checkout</h1>
    {#if shopName}
      <p class="text-body text-text-muted mt-1">Ordering from <strong>{shopName}</strong></p>
    {/if}
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
    
    <!-- Left: Checkout Form -->
    <div class="space-y-6" in:fade={{ duration: 400, delay: 100 }}>
      
      <!-- Delivery Address -->
      <AddressSelector
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelect={(id) => selectedAddress = id}
        onAddNew={() => {/* Open add address modal */}}
      />
      
      <!-- Delivery Method -->
      <Card className="border border-gray-200 p-6">
        <h3 class="text-lg font-bold text-text-main mb-4">Delivery Method</h3>
        <div class="space-y-3">
          <label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                       {deliveryMethod === 'gig' 
                         ? 'border-primary bg-primary/5' 
                         : 'border-gray-200 hover:border-gray-300'}">
            <input
              type="radio"
              name="delivery"
              value="gig"
              bind:group={deliveryMethod}
              class="w-4 h-4 text-primary"
            />
            <div class="flex items-center gap-3 flex-1">
              <Icon icon="mdi:truck-fast-outline" class="w-6 h-6 text-text-muted" />
              <div>
                <p class="font-medium text-text-main">GIG Logistics</p>
                <p class="text-sm text-text-muted">2–5 business days • ₦5,000</p>
              </div>
            </div>
          </label>
          
          <label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                       {deliveryMethod === 'pickup' 
                         ? 'border-primary bg-primary/5' 
                         : 'border-gray-200 hover:border-gray-300'}">
            <input
              type="radio"
              name="delivery"
              value="pickup"
              bind:group={deliveryMethod}
              class="w-4 h-4 text-primary"
            />
            <div class="flex items-center gap-3 flex-1">
              <Icon icon="mdi:warehouse" class="w-6 h-6 text-text-muted" />
              <div>
                <p class="font-medium text-text-main">Pickup from GIG Office</p>
                <p class="text-sm text-text-muted">Ready in 1–2 days • ₦2,000</p>
              </div>
            </div>
          </label>
        </div>
      </Card>
      
      <!-- Payment Method -->
      <PaymentSelector
        paymentMethods={paymentMethods}
        selectedMethod={selectedPayment}
        onSelect={(id) => selectedPayment = id}
        onAddCard={() => {/* Open add card modal */}}
      />
      
      <!-- Order Items (Compact) -->
      <Card className="border border-gray-200 p-6">
        <h3 class="text-lg font-bold text-text-main mb-4">Order Items</h3>
        <div class="space-y-4">
          {#each filteredItems as item}
            <div class="flex gap-3">
              <img src={item.image} alt={item.name} class="w-16 h-16 rounded-lg object-cover bg-gray-100" />
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-text-main text-sm line-clamp-2">{item.name}</h4>
                <p class="text-xs text-text-muted">Qty: {item.quantity}</p>
                <p class="text-sm font-semibold text-primary mt-1">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </Card>
      
      <!-- Order Notes -->
      <Card className="border border-gray-200 p-6">
        <h3 class="text-lg font-bold text-text-main mb-4">Order Notes (Optional)</h3>
        <textarea
          placeholder="Add a note for the seller..."
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
          rows="3"
          bind:value={orderNote}
        ></textarea>
      </Card>
    </div>
    
    <!-- Right: Order Summary -->
    <div in:fade={{ duration: 400, delay: 200 }}>
      <CartSummary
        subtotal={subtotal}
        shipping={deliveryMethod === 'gig' ? 5000 : 2000}
        serviceFee={serviceFee}
        discount={discount}
        total={total}
        shopName={shopName}
        onCheckout={handlePlaceOrder}
      />
      
      <!-- Security Notice -->
      <div class="mt-4 p-4 bg-success/5 rounded-xl border border-success/20">
        <div class="flex items-center gap-2 text-sm text-success">
          <Icon icon="mdi:shield-check-outline" class="w-5 h-5" />
          <span>Your payment is protected by VendorHub Escrow</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- <style>
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style> -->