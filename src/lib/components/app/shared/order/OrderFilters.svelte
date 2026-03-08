<!-- src/lib/components/orders/OrderFilters.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Input from '$lib/components/common/Input.svelte';
  
  export let role: 'buyer' | 'vendor' = 'buyer';
  export let shops: Array<{ id: string; name: string; slug: string }> = [];
  
  export let searchQuery: string;
  export let statusFilter: string;
  export let dateFilter: string;
  export let shopFilter: string;
  export let layoutView: 'grid' | 'table' = 'grid'; 
  
  const statuses = [
    { id: 'all', label: 'All Orders' },
    { id: 'NEW', label: 'New' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'READY_FOR_PICKUP', label: 'Ready for Pickup' },
    { id: 'IN_DELIVERY', label: 'In Delivery' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'CANCELLED', label: 'Cancelled' },
    { id: 'RETURNED', label: 'Returned' }
  ];
  
  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: '7days', label: 'Last 7 days' },
    { id: '30days', label: 'Last 30 days' },
    { id: 'custom', label: 'Custom' }
  ];
</script>

<Card padding={role === 'buyer' ? 'none' : 'md'} className="border border-gray-200 p-4">
  {#if role === 'vendor'}
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <!-- Search -->
      <div class="w-full md:w-80">
        <Input
          label=""
          name="search"
          placeholder={role === 'vendor' ? 'Search order, product, or customer...' : 'Search order or product...'}
          value={searchQuery}
        />
      </div>
      
      <!-- Filters -->
      <div class="flex flex-wrap gap-3 w-full md:w-auto">
        <select
          class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
          bind:value={statusFilter}
        >
          {#each statuses as status}
            <option value={status.id}>{status.label}</option>
          {/each}
        </select>
        
        <select
          class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
          bind:value={dateFilter}
        >
          {#each dateRanges as range}
            <option value={range.id}>{range.label}</option>
          {/each}
        </select>
        
        {#if role === 'vendor' && shops}
          <!-- <select
            class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            bind:value={shopFilter}
          >
            <option value="">All Shops</option>
            {#each shops as shop}
              <option value={shop.slug}>{shop.name}</option>
            {/each}
          </select> -->
          <!-- Layout Toggle -->
          <div class="flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                  class="px-3 py-2 rounded-md text-sm font-medium transition-all {layoutView ===
                  'grid'
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-text-main'}"
                  onclick={() => (layoutView = "grid")}
                  title="Grid view"
              >
                  <Icon icon="mdi:view-grid" class="w-4 h-4" />
              </button>
              <button
                  class="px-3 py-2 rounded-md text-sm font-medium transition-all {layoutView ===
                  'table'
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-text-main'}"
                  onclick={() => (layoutView = "table")}
                  title="Table view"
              >
                  <Icon icon="mdi:table" class="w-4 h-4" />
              </button>
          </div>
        {/if}
      </div>
    </div>
    {:else if role === 'buyer'}
      <!-- Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2">
      {#each statuses as tab}
        <button
          onclick={() => (statusFilter = tab.id)}
          class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            {statusFilter === tab.id
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
        >
          {tab.label}
        </button>
      {/each}
    </div>
    {/if}
</Card>