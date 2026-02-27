<!-- src/lib/components/orders/OrderCard.svelte -->
<script lang="ts">
  import type { Order } from '$lib/types';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  
  export let order: Order;
  
  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { variant: 'warning' as const, label: 'Pending' },
      shipped: { variant: 'info' as const, label: 'Shipped' },
      delivered: { variant: 'success' as const, label: 'Delivered' },
      cancelled: { variant: 'danger' as const, label: 'Cancelled' }
    };
    return badges[status as keyof typeof badges];
  };
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  $: badge = getStatusBadge(order.status);
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-start justify-between mb-4">
    <div>
      <div class="flex items-center gap-3 mb-2">
        <span class="font-semibold text-text-main">{order.id}</span>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </div>
      <p class="text-sm text-text-muted">{new Date(order.date).toLocaleDateString()} • {order.vendor}</p>
    </div>
    <div class="text-right">
      <div class="text-lg font-bold text-text-main">{formatNaira(order.total)}</div>
      <p class="text-xs text-text-muted">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
    </div>
  </div>
  
  <div class="flex gap-3 mb-4">
    {#each order.items as item}
      <img src={item.image} alt={item.name} class="w-16 h-16 rounded-lg object-cover bg-gray-100" />
    {/each}
  </div>
  
  <div class="flex items-center gap-3">
    <Button variant="outline" size="sm" href="/orders/{order.id}">View Details</Button>
    {#if order.status === 'delivered'}
      <Button variant="outline" size="sm" href="/shop/{order.vendor.toLowerCase().replace(' ', '-')}">Reorder</Button>
    {/if}
  </div>
</Card>