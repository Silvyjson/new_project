<!-- src/lib/components/orders/OrderFilters.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Input from '$lib/components/common/Input.svelte';

  const dispatch = createEventDispatcher();
  
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
          oninput={(e: Event) => dispatch('search-change', (e.target as HTMLInputElement).value)}
        />
      </div>
      
      <!-- Filters -->
      <div class="flex flex-wrap gap-3 w-full md:w-auto">
        <select
          class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
          value={statusFilter}
          onchange={(e) => dispatch('status-change', e.currentTarget.value)}
        >
          {#each statuses as status}
            <option value={status.id}>{status.label}</option>
          {/each}
        </select>
        
        <select
          class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
          value={dateFilter}
          onchange={(e) => dispatch('date-change', e.currentTarget.value)}
        >
          {#each dateRanges as range}
            <option value={range.id}>{range.label}</option>
          {/each}
        </select>
        
        {#if role === 'vendor' && shops}
          <select
            class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            value={shopFilter}
            onchange={(e) => dispatch('shop-change', e.currentTarget.value)}
          >
            <option value="">All Shops</option>
            {#each shops as shop}
              <option value={shop.slug}>{shop.name}</option>
            {/each}
          </select>
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
    <div class="flex flex-col gap-6">
      <!-- Search and Shop Filters for Buyer -->
      <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
        <!-- Search -->
        <div class="w-full md:w-80">
          <Input
            label=""
            name="search"
            placeholder="Search order or product..."
            value={searchQuery}
            oninput={(e: Event) => dispatch('search-change', (e.target as HTMLInputElement).value)}
          />
        </div>

        <!-- Shop Filter -->
        <div class="flex gap-3 w-full md:w-auto">
          <select
            class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            value={shopFilter}
            onchange={(e) => dispatch('shop-change', e.currentTarget.value)}
          >
            <option value="">All Shops</option>
            {#each shops as shop}
              <option value={shop.slug}>{shop.name}</option>
            {/each}
          </select>

          <select
            class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            value={dateFilter}
            onchange={(e) => dispatch('date-change', e.currentTarget.value)}
          >
            {#each dateRanges as range}
              <option value={range.id}>{range.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Tabs (Status) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {#each statuses as tab}
          <button
            onclick={() => dispatch('status-change', tab.id)}
            class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              {statusFilter === tab.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
          >
            {tab.label}
          </button>
        {/each}
      </div>
    </div>
    {/if}
</Card>