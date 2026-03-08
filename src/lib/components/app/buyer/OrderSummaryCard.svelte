<!-- src/lib/components/home/OrderSummaryCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let orders: Array<{
    id: string;
    code: string;
    status: string;
    total: number;
    items: number;
    estimatedDelivery?: string;
    shop: {
      name: string;
      slug: string;
    };
  }>;
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const getStatusBadge = (status: string) => {
    const badges = {
      NEW: { variant: 'info' as const, label: 'New', icon: 'mdi:package-variant' },
      PROCESSING: { variant: 'warning' as const, label: 'Processing', icon: 'mdi:progress-clock' },
      READY_FOR_PICKUP: { variant: 'info' as const, label: 'Ready', icon: 'mdi:store-outline' },
      IN_DELIVERY: { variant: 'info' as const, label: 'In Delivery', icon: 'mdi:truck-fast-outline' },
      DELIVERED: { variant: 'success' as const, label: 'Delivered', icon: 'mdi:check-circle-outline' },
      CANCELLED: { variant: 'danger' as const, label: 'Cancelled', icon: 'mdi:close-circle-outline' }
    };
    return badges[status as keyof typeof badges] || badges.NEW;
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:package-variant" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Recent Orders</h3>
        <p class="text-xs text-text-muted">Track your latest orders</p>
      </div>
    </div>
    <Button variant="ghost" size="sm" href="/orders">
      View All
      <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
    </Button>
  </div>
  
  <div class="space-y-4">
    {#each orders.slice(0, 3) as order}
      {@const badge = getStatusBadge(order.status)}
      <a href="/orders/{order.code}" class="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        <div class="flex items-start justify-between mb-2">
          <div>
            <p class="font-medium text-text-main text-sm">Order #{order.code}</p>
            <p class="text-xs text-text-muted">{order.items} item{order.items > 1 ? 's' : ''} • {order.shop.name}</p>
          </div>
          <Badge variant={badge.variant} size="sm">
            <Icon icon={badge.icon} class="w-3 h-3 inline mr-1" />
            {badge.label}
          </Badge>
        </div>
        
        <div class="flex items-center justify-between">
          <p class="text-lg font-bold text-text-main">{formatNaira(order.total)}</p>
          {#if order.estimatedDelivery && order.status === 'IN_DELIVERY'}
            <p class="text-xs text-text-muted flex items-center gap-1">
              <Icon icon="mdi:clock-outline" class="w-3 h-3" />
              ETA: {order.estimatedDelivery}
            </p>
          {/if}
        </div>
      </a>
    {/each}
    
    {#if orders.length === 0}
      <div class="text-center py-8">
        <Icon icon="mdi:package-variant" class="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p class="text-text-muted">No recent orders</p>
        <Button variant="outline" size="sm" href="/shops" class="mt-4">
          Start Shopping
        </Button>
      </div>
    {/if}
  </div>
</Card>