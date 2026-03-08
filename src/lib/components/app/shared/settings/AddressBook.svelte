<!-- src/lib/components/settings/AddressBook.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import Input from '$lib/components/common/Input.svelte';
  
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
  
  let showAddForm = false;
  let editingAddress: typeof addresses[0] | null = null;
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      console.log(`Delete address ${id}`);
    }
  };
  
  const handleSetDefault = (id: string) => {
    console.log(`Set default address ${id}`);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:map-marker-outline" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Address Book</h3>
        <p class="text-xs text-text-muted">Manage your delivery addresses</p>
      </div>
    </div>
    <Button variant="primary" size="md" onclick={() => { showAddForm = true; editingAddress = null; }}>
      <Icon icon="mdi:map-marker-plus-outline" class="w-4 h-4 mr-2" />
      Add New Address
    </Button>
  </div>
  
  {#if showAddForm || editingAddress}
    <div class="p-6 bg-gray-50 rounded-xl mb-6">
      <h4 class="font-semibold text-text-main mb-4">{editingAddress ? 'Edit Address' : 'Add New Address'}</h4>
      <div class="grid md:grid-cols-2 gap-4">
        <Input label="Full Name" name="name" required />
        <Input label="Phone" name="phone" type="tel" required />
        <Input label="Address Line" name="street" class="md:col-span-2" required />
        <Input label="City" name="city" required />
        <Input label="State" name="state" required />
        <Input label="Postal Code" name="postalCode" />
        <Input label="Country" name="country" value="Nigeria" required />
      </div>
      <div class="flex gap-3 mt-6">
        <Button variant="primary" size="md">Save Address</Button>
        <Button variant="outline" size="md" onclick={() => { showAddForm = false; editingAddress = null; }}>Cancel</Button>
      </div>
    </div>
  {/if}
  
  <div class="space-y-4">
    {#each addresses as address}
      <Card className="border border-gray-200 p-5">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <h4 class="font-semibold text-text-main">{address.name}</h4>
              {#if address.isDefault}
                <Badge variant="success" size="sm">
                  <Icon icon="mdi:star" class="w-3 h-3 inline mr-1" />
                  Default
                </Badge>
              {/if}
            </div>
            <div class="text-sm text-text-muted space-y-1">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.postalCode}</p>
              <p>{address.country}</p>
              <p class="mt-2">📞 {address.phone}</p>
            </div>
          </div>
          <div class="flex gap-2">
            {#if !address.isDefault}
              <Button variant="ghost" size="sm" onclick={() => handleSetDefault(address.id)}>
                <Icon icon="mdi:star-outline" class="w-4 h-4" />
              </Button>
            {/if}
            <Button variant="ghost" size="sm" onclick={() => { showAddForm = true; editingAddress = address; }}>
              <Icon icon="mdi:pencil-outline" class="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" class="text-error hover:bg-error/5" onclick={() => handleDelete(address.id)}>
              <Icon icon="mdi:delete-outline" class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    {/each}
    
    {#if addresses.length === 0}
      <div class="text-center py-8">
        <Icon icon="mdi:map-marker-off-outline" class="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p class="text-text-muted">No addresses saved yet</p>
      </div>
    {/if}
  </div>
</Card>