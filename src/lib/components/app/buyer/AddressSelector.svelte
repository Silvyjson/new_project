<!-- src/lib/components/cart/AddressSelector.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let addresses: Array<{
    id: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
  
  export let selectedAddress: string;
  export let onSelect: (id: string) => void;
  export let onAddNew: () => void;
  
  const formatAddress = (addr: typeof addresses[0]) => {
    return `${addr.street}, ${addr.city}, ${addr.state}`;
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-bold text-text-main">Delivery Address</h3>
    <Button variant="ghost" size="sm" onclick={onAddNew}>
      <Icon icon="mdi:plus" class="w-4 h-4 mr-1" />
      Add New
    </Button>
  </div>
  
  <div class="space-y-3">
    {#each addresses as address}
      <label class="flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                   {selectedAddress === address.id 
                     ? 'border-primary bg-primary/5' 
                     : 'border-gray-200 hover:border-gray-300'}">
        <input
          type="radio"
          name="address"
          value={address.id}
          bind:group={selectedAddress}
          on:change={() => onSelect(address.id)}
          class="w-4 h-4 mt-1 text-primary"
        />
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-semibold text-text-main">{address.name}</span>
            {#if address.isDefault}
              <Badge variant="success" size="sm">Default</Badge>
            {/if}
          </div>
          <p class="text-sm text-text-muted">{formatAddress(address)}</p>
          <p class="text-sm text-text-muted mt-1">📞 {address.phone}</p>
        </div>
      </label>
    {/each}
    
    {#if addresses.length === 0}
      <div class="text-center py-8">
        <Icon icon="mdi:map-marker-off-outline" class="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p class="text-text-muted mb-4">No addresses saved</p>
        <Button variant="primary" size="md" onclick={onAddNew}>
          <Icon icon="mdi:map-marker-plus-outline" class="w-4 h-4 mr-2" />
          Add Your First Address
        </Button>
      </div>
    {/if}
  </div>
</Card>