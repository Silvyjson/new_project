<!-- src/lib/components/orders/OrderCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let order: {
    id: string;
    code: string;
    date: string;
    items: Array<{
      id: string;
      name: string;
      image: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    status: string;
    deliveryMethod: string;
    shop?: {
      name: string;
      slug: string;
    };
    buyer?: {
      name: string;
    };
    canCancel: boolean;
    canReturn: boolean;
  };
  
  export let role: 'buyer' | 'vendor' = 'buyer';
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
  
  const getDeliveryIcon = (method: string) => {
    if (method.includes('GIG')) return 'mdi:truck-fast-outline';
    if (method.includes('Pickup')) return 'mdi:store-outline';
    return 'mdi:truck-delivery-outline';
  };

  const badge = getStatusBadge(order.status);
</script>

<a href="/orders/{order.code}" class="block">
  <Card className="border border-gray-200 p-6 hover:shadow-card-hover transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="font-semibold text-text-main">Order #{order.code}</span>
          <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
        </div>
        <p class="text-sm text-text-muted">{formatDate(order.date)}</p>
      </div>
      <div class="text-right">
        <p class="text-lg font-bold text-text-main">{formatNaira(order.total)}</p>
        <p class="text-xs text-text-muted">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
      </div>
    </div>
    
    <!-- Items Preview -->
    <div class="flex gap-3 mb-4">
      {#each order.items.slice(0, 3) as item}
        <img
          src={item.image}
          alt={item.name}
          class="w-14 h-14 rounded-lg object-cover bg-gray-100"
        />
      {/each}
      {#if order.items.length > 3}
        <div class="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-text-muted">
          +{order.items.length - 3}
        </div>
      {/if}
    </div>
    
    <!-- Order Details -->
    <div class="space-y-2 mb-4">
      {#if role === 'vendor' && order.buyer}
        <div class="flex items-center gap-2 text-sm text-text-muted">
          <Icon icon="mdi:account-outline" class="w-4 h-4" />
          <span>{order.buyer.name}</span>
        </div>
      {/if}
      {#if order.shop}
        <div class="flex items-center gap-2 text-sm text-text-muted">
          <Icon icon="mdi:store-outline" class="w-4 h-4" />
          <span>{order.shop.name}</span>
        </div>
      {/if}
      <div class="flex items-center gap-2 text-sm text-text-muted">
        <Icon icon={getDeliveryIcon(order.deliveryMethod)} class="w-4 h-4" />
        <span>{order.deliveryMethod}</span>
      </div>
    </div>
    
    <!-- Actions -->
    <div class="flex gap-2 pt-4 border-t border-gray-100">
      <Button variant="outline" size="sm" href="/orders/{order.code}">
        View Details
      </Button>
      {#if order.canCancel && role === 'buyer'}
        <Button variant="ghost" size="sm" class="text-error hover:bg-error/5">
          Cancel
        </Button>
      {/if}
      {#if order.canReturn && role === 'buyer'}
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:restore" class="w-4 h-4 mr-1" />
          Return
        </Button>
      {/if}
    </div>
  </Card>
</a>