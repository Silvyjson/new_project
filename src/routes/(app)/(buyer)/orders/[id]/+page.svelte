<!-- src/routes/(app)/orders/[orderId]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  
  // Get order ID from URL
  let orderId = '';
  $: if ($page.params.orderId) {
    orderId = $page.params.orderId;
  }
  
  // Mock order details
  let order = {
    id: 'ORD-2026-001',
    date: new Date('2026-01-20'),
    status: 'delivered',
    vendor: 'TechStoreNG',
    vendorSlug: 'techstoreng',
    items: [
      { id: 1, name: 'Wireless Earbuds Pro', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df', price: 25000, quantity: 2, variant: 'Black' }
    ],
    subtotal: 50000,
    shipping: 0,
    tax: 3750,
    total: 53750,
    shippingAddress: {
      name: 'John Doe',
      phone: '+234 801 234 5678',
      address: '123 Main Street, Victoria Island',
      city: 'Lagos',
      state: 'Lagos State'
    },
    tracking: [
      { status: 'Order Placed', date: 'Jan 20, 2026', completed: true },
      { status: 'Confirmed', date: 'Jan 20, 2026', completed: true },
      { status: 'Shipped', date: 'Jan 21, 2026', completed: true },
      { status: 'Out for Delivery', date: 'Jan 23, 2026', completed: true },
      { status: 'Delivered', date: 'Jan 23, 2026', completed: true }
    ]
  };
  
  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { variant: 'warning', label: 'Pending' },
      confirmed: { variant: 'info', label: 'Confirmed' },
      shipped: { variant: 'info', label: 'Shipped' },
      delivered: { variant: 'success', label: 'Delivered' },
      cancelled: { variant: 'danger', label: 'Cancelled' }
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
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
  <title>Order {orderId} | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8">
  <div class="mb-6">
    <a href="/orders" class="text-sm text-primary font-medium hover:underline flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Orders
    </a>
  </div>
  
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold text-text-main mb-2">Order {order.id}</h1>
      <p class="text-body text-text-muted">{formatDate(order.date)} • {order.vendor}</p>
    </div>
    {@const statusBadge = getStatusBadge(order.status)}
    <Badge variant={statusBadge.variant} size="lg">{statusBadge.label}</Badge>
  </div>
  
  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Order Details -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Items -->
      <Card class="border border-gray-200 p-6">
        <h2 class="text-xl font-bold text-text-main mb-6">Order Items</h2>
        <div class="space-y-4">
          {#each order.items as item}
            <div class="flex gap-4">
              <img src={item.image} alt={item.name} class="w-20 h-20 rounded-lg object-cover bg-gray-100" />
              <div class="flex-1">
                <h3 class="font-semibold text-text-main mb-1">{item.name}</h3>
                <p class="text-sm text-text-muted mb-1">Variant: {item.variant}</p>
                <p class="text-sm text-text-muted">Quantity: {item.quantity}</p>
                <p class="font-semibold text-primary mt-2">{formatNaira(item.price * item.quantity)}</p>
              </div>
            </div>
          {/each}
        </div>
      </Card>
      
      <!-- Tracking Timeline -->
      <Card class="border border-gray-200 p-6">
        <h2 class="text-xl font-bold text-text-main mb-6">Order Tracking</h2>
        <div class="space-y-4">
          {#each order.tracking as step, i}
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full {step.completed ? 'bg-primary' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0">
                  {#if step.completed}
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  {:else}
                    <span class="text-xs text-text-muted">{i + 1}</span>
                  {/if}
                </div>
                {#if i < order.tracking.length - 1}
                  <div class="w-0.5 h-12 bg-gray-200 mt-2"></div>
                {/if}
              </div>
              <div class="flex-1 pb-4">
                <h3 class="font-semibold text-text-main mb-1">{step.status}</h3>
                <p class="text-sm text-text-muted">{step.date}</p>
              </div>
            </div>
          {/each}
        </div>
      </Card>
      
      <!-- Shipping Address -->
      <Card class="border border-gray-200 p-6">
        <h2 class="text-xl font-bold text-text-main mb-6">Shipping Address</h2>
        <div class="text-body text-text-muted space-y-1">
          <p class="font-semibold text-text-main">{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.phone}</p>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
        </div>
      </Card>
    </div>
    
    <!-- Order Summary -->
    <div class="lg:col-span-1">
      <Card class="border border-gray-200 p-6 sticky top-24">
        <h2 class="text-xl font-bold text-text-main mb-6">Order Summary</h2>
        
        <div class="space-y-3 mb-6">
          <div class="flex items-center justify-between text-body">
            <span class="text-text-muted">Subtotal</span>
            <span class="font-medium text-text-main">{formatNaira(order.subtotal)}</span>
          </div>
          <div class="flex items-center justify-between text-body">
            <span class="text-text-muted">Shipping</span>
            <span class="font-medium text-success">Free</span>
          </div>
          <div class="flex items-center justify-between text-body">
            <span class="text-text-muted">Tax</span>
            <span class="font-medium text-text-main">{formatNaira(order.tax)}</span>
          </div>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t-2 border-gray-200 mb-6">
          <span class="text-lg font-bold text-text-main">Total</span>
          <span class="text-2xl font-bold text-primary">{formatNaira(order.total)}</span>
        </div>
        
        <div class="space-y-3">
          {#if order.status === 'delivered'}
            <Button href="/shops/{order.vendorSlug}" variant="primary" size="lg" class="w-full">
              Reorder
            </Button>
            <Button variant="outline" size="lg" class="w-full">
              Write Review
            </Button>
          {:else if order.status === 'shipped' || order.status === 'pending'}
            <Button variant="outline" size="lg" class="w-full text-error border-error hover:bg-error/5">
              Request Return
            </Button>
          {/if}
          <Button variant="ghost" size="lg" class="w-full" href="/support">
            Need Help?
          </Button>
        </div>
      </Card>
    </div>
  </div>
</div>