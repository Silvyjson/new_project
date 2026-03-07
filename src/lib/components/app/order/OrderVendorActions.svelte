<!-- src/lib/components/orders/OrderVendorActions.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let status: string;
  export let orderId: string;
  
  const handleAction = (action: string) => {
    // In real app: API call to update order status
    console.log(`Action: ${action} on order ${orderId}`);
  };
</script>

<Card className="border border-gray-200 p-6">
  <h3 class="text-lg font-bold text-text-main mb-6">Vendor Actions</h3>
  
  <div class="space-y-4">
    {#if status === 'NEW'}
      <div class="p-4 bg-warning/10 border border-warning/30 rounded-xl mb-4">
        <p class="text-sm text-warning">
          <Icon icon="mdi:alert-circle" class="w-4 h-4 inline mr-1" />
          New order received. Please review and accept within 24 hours.
        </p>
      </div>
      <div class="flex gap-3">
        <Button variant="primary" size="lg" class="flex-1" onclick={() => handleAction('accept')}>
          <Icon icon="mdi:check-circle-outline" class="w-5 h-5 mr-2" />
          Accept Order
        </Button>
        <Button variant="outline" size="lg" class="flex-1 text-error border-error hover:bg-error/5" onclick={() => handleAction('cancel')}>
          Cancel Order
        </Button>
      </div>
    {/if}
    
    {#if status === 'PROCESSING'}
      <div class="space-y-3">
        <Button variant="primary" size="lg" class="w-full" onclick={() => handleAction('ready')}>
          <Icon icon="mdi:package-variant-closed" class="w-5 h-5 mr-2" />
          Mark Ready for Pickup
        </Button>
        <Button variant="outline" size="lg" class="w-full text-error border-error hover:bg-error/5" onclick={() => handleAction('cancel')}>
          Cancel Order
        </Button>
      </div>
    {/if}
    
    {#if status === 'READY_FOR_PICKUP'}
      <div class="p-4 bg-primary/5 rounded-xl border border-primary/20 mb-4">
        <p class="text-sm text-text-muted mb-2">Choose delivery method:</p>
        <div class="space-y-2">
          <button
            on:click={() => handleAction('gig-pickup')}
            class="w-full p-4 border-2 border-gray-200 rounded-xl text-left hover:border-primary transition-colors"
          >
            <div class="flex items-center gap-3">
              <Icon icon="mdi:truck-fast-outline" class="w-6 h-6 text-primary" />
              <div>
                <p class="font-medium text-text-main">Pickup by GIG Rider</p>
                <p class="text-xs text-text-muted">Rider will collect from your shop</p>
              </div>
            </div>
          </button>
          <button
            on:click={() => handleAction('dropoff')}
            class="w-full p-4 border-2 border-gray-200 rounded-xl text-left hover:border-primary transition-colors"
          >
            <div class="flex items-center gap-3">
              <Icon icon="mdi:warehouse" class="w-6 h-6 text-primary" />
              <div>
                <p class="font-medium text-text-main">Drop at GIG Office</p>
                <p class="text-xs text-text-muted">You deliver to nearest GIG office</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    {/if}
    
    {#if ['PICKUP_PENDING', 'DROPOFF_PENDING', 'IN_DELIVERY'].includes(status)}
      <div class="p-4 bg-gray-50 rounded-xl">
        <p class="text-sm text-text-muted flex items-center gap-2">
          <Icon icon="mdi:progress-clock" class="w-4 h-4" />
          Waiting for GIG Logistics to update status...
        </p>
      </div>
    {/if}
    
    {#if status === 'DELIVERED'}
      <div class="p-4 bg-success/10 border border-success/30 rounded-xl">
        <p class="text-sm text-success">
          <Icon icon="mdi:check-circle" class="w-4 h-4 inline mr-1" />
          Order delivered successfully. Return window: 7 days.
        </p>
      </div>
    {/if}
  </div>
</Card>