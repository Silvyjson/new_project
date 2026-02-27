<!-- src/routes/(app)/settings/addresses/+page.svelte -->
<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  
  // Mock addresses
  let addresses = [
    {
      id: 1,
      label: 'Home',
      name: 'John Doe',
      phone: '+234 801 234 5678',
      address: '123 Main Street, Victoria Island',
      city: 'Lagos',
      state: 'Lagos State',
      default: true
    },
    {
      id: 2,
      label: 'Work',
      name: 'John Doe',
      phone: '+234 801 234 5678',
      address: '456 Business Avenue, Ikeja',
      city: 'Lagos',
      state: 'Lagos State',
      default: false
    }
  ];
  
  let showAddModal = false;
  
  const setDefault = (id: number) => {
    // In real app: API call to set default address
    addresses = addresses.map(addr => ({ ...addr, default: addr.id === id }));
  };
  
  const deleteAddress = (id: number) => {
    // In real app: API call to delete address
    addresses = addresses.filter(addr => addr.id !== id);
  };
</script>

<svelte:head>
  <title>Addresses | VendorHub</title>
</svelte:head>

<div class="max-w-[800px] mx-auto px-4 py-8">
  <div class="flex items-center justify-between mb-8">
    <div>
      <div class="mb-2">
        <a href="/settings" class="text-sm text-primary font-medium hover:underline flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Settings
        </a>
      </div>
      <h1 class="text-3xl font-bold text-text-main">Shipping Addresses</h1>
    </div>
    <Button variant="primary" size="lg" onclick={() => showAddModal = true}>
      + Add New Address
    </Button>
  </div>
  
  {#if addresses.length === 0}
    <Card className="py-16 text-center">
      <div class="text-6xl mb-4">📍</div>
      <h2 class="text-h2 text-text-main mb-2">No addresses yet</h2>
      <p class="text-body text-text-muted mb-6">Add your first shipping address.</p>
      <Button variant="primary" size="lg" onclick={() => showAddModal = true}>
        Add Address
      </Button>
    </Card>
  {:else}
    <div class="grid md:grid-cols-2 gap-6">
      {#each addresses as address}
        <Card className="border border-gray-200 p-6 relative">
          {#if address.default}
            <Badge variant="success" className="absolute top-4 right-4">Default</Badge>
          {/if}
          
          <h3 class="text-lg font-bold text-text-main mb-4">{address.label}</h3>
          
          <div class="space-y-2 text-body text-text-muted mb-6">
            <p>{address.name}</p>
            <p>{address.phone}</p>
            <p>{address.address}</p>
            <p>{address.city}, {address.state}</p>
          </div>
          
          <div class="flex gap-2">
            {#if !address.default}
              <Button variant="outline" size="sm" onclick={() => setDefault(address.id)}>
                Set as Default
              </Button>
            {/if}
            <Button variant="ghost" size="sm" className="text-error hover:bg-error/5" onclick={() => deleteAddress(address.id)}>
              Delete
            </Button>
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>

<!-- Add Address Modal (simplified) -->
{#if showAddModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button type="button" class="absolute inset-0 bg-dark/45" onclick={() => showAddModal = false}></button>
    <Card className="relative bg-surface p-6 w-full max-w-lg">
      <h2 class="text-xl font-bold text-text-main mb-6">Add New Address</h2>
      <form class="space-y-4">
        <Input label="Label" name="label" placeholder="Home, Work, etc." required />
        <Input label="Full Name" name="name" required />
        <Input label="Phone" name="phone" type="tel" required />
        <Input label="Address" name="address" required />
        <div class="grid grid-cols-2 gap-4">
          <Input label="City" name="city" required />
          <Input label="State" name="state" required />
        </div>
        <div class="flex gap-3 pt-4">
          <Button type="submit" variant="primary" size="lg" className="flex-1">Save Address</Button>
          <Button type="button" variant="outline" size="lg" className="flex-1" onclick={() => showAddModal = false}>Cancel</Button>
        </div>
      </form>
    </Card>
  </div>
{/if}