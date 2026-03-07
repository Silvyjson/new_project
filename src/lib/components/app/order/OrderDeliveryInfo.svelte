<!-- src/lib/components/orders/OrderDeliveryInfo.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let delivery: {
    method: string;
    trackingNumber?: string;
    estimatedDelivery: string;
    address: {
      name: string;
      phone: string;
      street: string;
      city: string;
      state: string;
    };
    gigTrackingUrl?: string;
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:truck-fast-outline" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="font-semibold text-text-main">Delivery Information</h3>
      <p class="text-xs text-text-muted">{delivery.method}</p>
    </div>
  </div>
  
  <div class="space-y-4">
    {#if delivery.trackingNumber}
      <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-text-main">Tracking Number</span>
          <span class="text-sm font-mono text-text-main">{delivery.trackingNumber}</span>
        </div>
        {#if delivery.gigTrackingUrl}
          <Button variant="outline" size="sm" href={delivery.gigTrackingUrl} target="_blank">
            <Icon icon="mdi:map-marker-outline" class="w-4 h-4 mr-2" />
            Track on GIG
          </Button>
        {/if}
      </div>
    {/if}
    
    <div class="flex items-center gap-2 text-sm text-text-muted">
      <Icon icon="mdi:calendar-outline" class="w-4 h-4" />
      <span>Estimated Delivery: {delivery.estimatedDelivery}</span>
    </div>
    
    <div class="pt-4 border-t border-gray-200">
      <h4 class="font-semibold text-text-main mb-3">Shipping Address</h4>
      <div class="space-y-1 text-sm text-text-muted">
        <p>{delivery.address.name}</p>
        <p>{delivery.address.phone}</p>
        <p>{delivery.address.street}</p>
        <p>{delivery.address.city}, {delivery.address.state}</p>
      </div>
    </div>
  </div>
</Card>