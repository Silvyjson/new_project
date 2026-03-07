<!-- src/routes/(app)/orders/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import OrderTimeline from '$lib/components/app/order/OrderTimeline.svelte';
  import OrderItems from '$lib/components/app/order/OrderItems.svelte';
  import OrderDeliveryInfo from '$lib/components/app/order/OrderDeliveryInfo.svelte';
  import OrderVendorActions from '$lib/components/app/order/OrderVendorActions.svelte';
  import OrderBuyerActions from '$lib/components/app/order/OrderBuyerActions.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  let orderId = '';
  $: if ($page.params.id) {
    orderId = $page.params.id;
  }
  
  // Role (in real app: from auth store)
  let role: 'buyer' | 'vendor' = 'vendor';
  
  // Mock order data
  let order = {
    id: orderId,
    code: 'VH-2043',
    date: '2026-01-25T10:30:00Z',
    status: 'READY_FOR_PICKUP',
    items: [
      {
        id: 'p_001',
        name: 'Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        quantity: 2,
        price: 12000,
        shop: { name: 'TechHub Store', slug: 'techhub-store' }
      },
      {
        id: 'p_002',
        name: 'USB-C Cable 2m',
        image: 'https://images.unsplash.com/photo-1609081219090-a66920c72123',
        quantity: 1,
        price: 3000,
        shop: { name: 'TechHub Store', slug: 'techhub-store' }
      }
    ],
    total: 27000,
    subtotal: 24000,
    shipping: 3000,
    serviceFee: 0,
    paymentMethod: 'Card',
    delivery: {
      method: 'GIG Logistics - Pickup',
      trackingNumber: 'GIG-209482',
      estimatedDelivery: '2-3 business days',
      address: {
        name: 'John Ade',
        phone: '+234 801 234 5678',
        street: '123 Main Street, Victoria Island',
        city: 'Lagos',
        state: 'Lagos State'
      },
      gigTrackingUrl: 'https://track.gig.com/GIG-209482'
    },
    buyer: {
      name: 'John Ade',
      phone: '+234 801 234 5678',
      email: 'johnade@email.com'
    },
    shop: {
      name: 'TechHub Store',
      slug: 'techhub-store'
    },
    canCancel: true,
    canReturn: false
  };
  
  // Timeline data
  const timeline = [
    { stage: 'Order Placed', description: 'Payment confirmed', date: '2026-01-25T10:30:00Z', icon: 'mdi:cart-outline', completed: true, current: false },
    { stage: 'Vendor Accepted', description: 'Order confirmed by seller', date: '2026-01-25T11:15:00Z', icon: 'mdi:check-circle-outline', completed: true, current: false },
    { stage: 'Processing', description: 'Preparing your items', date: '2026-01-25T14:20:00Z', icon: 'mdi:package-variant-closed', completed: true, current: false },
    { stage: 'Ready for Pickup', description: 'Items ready for GIG pickup', date: null, icon: 'mdi:truck-fast-outline', completed: false, current: true },
    { stage: 'In Delivery', description: 'On the way to you', date: null, icon: 'mdi:truck-delivery-outline', completed: false, current: false },
    { stage: 'Delivered', description: 'Order delivered successfully', date: null, icon: 'mdi:home-outline', completed: false, current: false }
  ];
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };
  
  const getStatusBadge = (status: string) => {
    const badges = {
      NEW: { variant: 'info' as const, label: 'New' },
      PROCESSING: { variant: 'warning' as const, label: 'Processing' },
      READY_FOR_PICKUP: { variant: 'info' as const, label: 'Ready for Pickup' },
      PICKUP_PENDING: { variant: 'info' as const, label: 'Pickup Pending' },
      DROPOFF_PENDING: { variant: 'warning' as const, label: 'Drop-off Pending' },
      IN_DELIVERY: { variant: 'info' as const, label: 'In Delivery' },
      DELIVERED: { variant: 'success' as const, label: 'Delivered' },
      RETURN_REQUESTED: { variant: 'warning' as const, label: 'Return Requested' },
      RETURN_APPROVED: { variant: 'info' as const, label: 'Return Approved' },
      RETURNED: { variant: 'success' as const, label: 'Returned' },
      CANCELLED: { variant: 'danger' as const, label: 'Cancelled' },
      COMPLETED: { variant: 'success' as const, label: 'Completed' }
    };
    return badges[status as keyof typeof badges] || badges.NEW;
  };

  const badge = getStatusBadge(order.status);
</script>

<svelte:head>
  <title>Order #{order.code} | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <!-- Back Link -->
  <div in:fade={{ duration: 400 }}>
    <a href="/orders" class="text-sm text-primary font-medium hover:underline flex items-center gap-2">
      <Icon icon="mdi:arrow-left" class="w-4 h-4" />
      Back to Orders
    </a>
  </div>
  
  <!-- Section 1: Order Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400, delay: 100 }}>
    <div>
      <div class="flex items-center gap-3 mb-2">
        <h1 class="text-2xl font-bold text-text-main">Order #{order.code}</h1>
        <Badge variant={badge.variant} size="lg">{badge.label}</Badge>
      </div>
      <p class="text-body text-text-muted">Placed {formatDate(order.date)}</p>
    </div>
    <div class="text-right">
      <p class="text-2xl font-bold text-text-main">{formatNaira(order.total)}</p>
      <p class="text-sm text-text-muted">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
    </div>
  </section>
  
  <!-- Section 2: Order Timeline -->
  <section in:fade={{ duration: 400, delay: 200 }}>
    <OrderTimeline status={order.status} timeline={timeline} />
  </section>
  
  <!-- Section 3: Order Items -->
  <section in:fade={{ duration: 400, delay: 300 }}>
    <OrderItems items={order.items} />
  </section>
  
  <!-- Section 4: Delivery Information -->
  <section in:fade={{ duration: 400, delay: 400 }}>
    <OrderDeliveryInfo delivery={order.delivery} />
  </section>
  
  <!-- Section 5: Customer Info (Vendor Only) -->
  {#if role === 'vendor'}
    <section in:fade={{ duration: 400, delay: 500 }}>
      <Card className="border border-gray-200 p-6">
        <h3 class="text-lg font-bold text-text-main mb-6">Customer Information</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-body text-text-main">
            <Icon icon="mdi:account-outline" class="w-5 h-5 text-text-muted" />
            <span>{order.buyer.name}</span>
          </div>
          <div class="flex items-center gap-2 text-body text-text-main">
            <Icon icon="mdi:phone-outline" class="w-5 h-5 text-text-muted" />
            <span>{order.buyer.phone}</span>
          </div>
          <div class="flex items-center gap-2 text-body text-text-main">
            <Icon icon="mdi:email-outline" class="w-5 h-5 text-text-muted" />
            <span>{order.buyer.email}</span>
          </div>
        </div>
      </Card>
    </section>
  {/if}
  
  <!-- Section 6: Actions (Role-Based) -->
  <section class="grid md:grid-cols-2 gap-6" in:fade={{ duration: 400, delay: 600 }}>
    {#if role === 'vendor'}
      <OrderVendorActions status={order.status} orderId={order.id} />
    {/if}
    {#if role === 'buyer'}
      <OrderBuyerActions status={order.status} orderId={order.id} canCancel={order.canCancel} canReturn={order.canReturn} />
    {/if}
    
    <!-- Payment Summary -->
    <Card className="border border-gray-200 p-6">
      <h3 class="text-lg font-bold text-text-main mb-6">Payment Summary</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between text-body">
          <span class="text-text-muted">Items Total</span>
          <span class="text-text-main">{formatNaira(order.subtotal)}</span>
        </div>
        <div class="flex items-center justify-between text-body">
          <span class="text-text-muted">Shipping</span>
          <span class="text-text-main">{formatNaira(order.shipping)}</span>
        </div>
        {#if order.serviceFee > 0}
          <div class="flex items-center justify-between text-body">
            <span class="text-text-muted">Service Fee</span>
            <span class="text-text-main">{formatNaira(order.serviceFee)}</span>
          </div>
        {/if}
        <div class="flex items-center justify-between pt-3 border-t border-gray-200">
          <span class="text-lg font-bold text-text-main">Total Paid</span>
          <span class="text-xl font-bold text-primary">{formatNaira(order.total)}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-text-muted pt-2">
          <Icon icon="mdi:credit-card-outline" class="w-4 h-4" />
          <span>Paid via {order.paymentMethod}</span>
        </div>
      </div>
    </Card>
  </section>
</main>

<!-- <style>
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style> -->