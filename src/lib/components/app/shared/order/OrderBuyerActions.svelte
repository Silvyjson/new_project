<!-- src/lib/components/orders/OrderBuyerActions.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let status: string;
  export let orderId: string;
  export let canCancel: boolean;
  export let canReturn: boolean;
  
  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this order?')) {
      // In real app: API call to cancel order
      console.log(`Cancel order ${orderId}`);
    }
  };
</script>

<Card className="border border-gray-200 p-6">
  <h3 class="text-lg font-bold text-text-main mb-6">Your Actions</h3>
  
  <div class="space-y-4">
    {#if canCancel}
      <div class="p-4 bg-warning/10 border border-warning/30 rounded-xl mb-4">
        <p class="text-sm text-warning">
          <Icon icon="mdi:alert-circle" class="w-4 h-4 inline mr-1" />
          You can cancel this order before GIG pickup is confirmed.
        </p>
      </div>
      <Button variant="outline" size="lg" class="w-full text-error border-error hover:bg-error/5" onclick={handleCancel}>
        Cancel Order
      </Button>
    {/if}
    
    {#if status === 'DELIVERED' && canReturn}
      <div class="space-y-3">
        <Button variant="primary" size="lg" class="w-full">
          <Icon icon="mdi:restore" class="w-5 h-5 mr-2" />
          Request Return
        </Button>
        <Button variant="outline" size="lg" class="w-full">
          <Icon icon="mdi:repeat" class="w-5 h-5 mr-2" />
          Reorder Items
        </Button>
        <Button variant="outline" size="lg" class="w-full">
          <Icon icon="mdi:star-outline" class="w-5 h-5 mr-2" />
          Leave Review
        </Button>
      </div>
    {/if}
    
    {#if status === 'IN_DELIVERY'}
      <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p class="text-sm text-text-muted mb-3">Your order is on the way!</p>
        <Button variant="outline" size="md" class="w-full">
          <Icon icon="mdi:map-marker-outline" class="w-4 h-4 mr-2" />
          Track Delivery
        </Button>
      </div>
    {/if}
    
    {#if status === 'COMPLETED'}
      <div class="p-4 bg-success/10 border border-success/30 rounded-xl">
        <p class="text-sm text-success">
          <Icon icon="mdi:check-circle" class="w-4 h-4 inline mr-1" />
          Order completed. Thank you for shopping with us!
        </p>
      </div>
    {/if}
  </div>
</Card>