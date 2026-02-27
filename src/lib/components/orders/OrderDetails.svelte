<!-- src/lib/components/orders/OrderDetails.svelte -->
<script lang="ts">
  import type { Order } from '$lib/types';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  
  export let order: Order;
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
</script>

<Card class="border border-gray-200 p-6">
  <h3 class="text-lg font-bold text-text-main mb-4">Order Details</h3>
  
  <div class="space-y-4">
    {#each order.items as item}
      <div class="flex gap-4">
        <img src={item.image} alt={item.name} class="w-16 h-16 rounded-lg object-cover bg-gray-100" />
        <div class="flex-1">
          <h4 class="font-semibold text-text-main mb-1">{item.name}</h4>
          <p class="text-sm text-text-muted">Qty: {item.quantity}</p>
          <p class="font-semibold text-primary">{formatNaira(item.price * item.quantity)}</p>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="mt-6 pt-6 border-t border-gray-200">
    <div class="flex items-center justify-between text-lg font-bold">
      <span class="text-text-main">Total</span>
      <span class="text-primary">{formatNaira(order.total)}</span>
    </div>
  </div>
</Card>