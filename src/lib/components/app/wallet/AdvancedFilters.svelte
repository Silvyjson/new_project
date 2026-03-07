<!-- src/lib/components/wallet/AdvancedFilters.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let role: 'buyer' | 'vendor' = 'vendor';
  
  // Filter state
  export let searchQuery: string;
  export let typeFilter: string;
  export let statusFilter: string;
  export let dateFrom: string;
  export let dateTo: string;
  export let minAmount: string;
  export let maxAmount: string;
  
  const transactionTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'payment', label: 'Payments' },
    { id: 'sale', label: 'Sales' },
    { id: 'withdrawal', label: 'Withdrawals' },
    { id: 'refund', label: 'Refunds' },
    { id: 'topup', label: 'Top-ups' },
    { id: 'fee', label: 'Fees' }
  ];
  
  const statuses = [
    { id: 'all', label: 'All Statuses' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'failed', label: 'Failed' }
  ];
  
  const datePresets = [
    { id: 'today', label: 'Today' },
    { id: '7days', label: 'Last 7 days' },
    { id: '30days', label: 'Last 30 days' },
    { id: '90days', label: 'Last 90 days' },
    { id: 'custom', label: 'Custom range' }
  ];
  
  let selectedPreset = '30days';
  
  const applyPreset = (preset: string) => {
    selectedPreset = preset;
    const now = new Date();
    let from = '';
    let to = now.toISOString().split('T')[0];
    
    switch (preset) {
      case 'today':
        from = to;
        break;
      case '7days':
        from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case '30days':
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case '90days':
        from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
    }
    
    dateFrom = from;
    dateTo = to;
  };
  
  const clearFilters = () => {
    searchQuery = '';
    typeFilter = 'all';
    statusFilter = 'all';
    minAmount = '';
    maxAmount = '';
    applyPreset('30days');
  };
  
  const applyFilters = () => {
    // Emit filter event for parent
    const event = new CustomEvent('apply-filters', {
      detail: {
        searchQuery,
        typeFilter,
        statusFilter,
        dateFrom,
        dateTo,
        minAmount,
        maxAmount
      }
    });
    window.dispatchEvent(event);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-bold text-text-main">Advanced Filters</h3>
    <Button variant="ghost" size="sm" onclick={clearFilters}>
      Clear All
    </Button>
  </div>
  
  <div class="space-y-6">
    <!-- Search -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-2">Search</label>
      <div class="relative">
        <Input
          label=""
          name="search"
          placeholder="Search by reference, order ID, or description..."
          value={searchQuery}
        />
        <Icon icon="mdi:magnify" class="w-5 h-5 text-text-muted absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
    
    <!-- Type & Status -->
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label for="" class="block text-sm font-medium text-text-main mb-2">Transaction Type</label>
        <select
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
          bind:value={typeFilter}
        >
          {#each transactionTypes.filter(t => role === 'buyer' && t.id === 'sale' ? false : true) as type}
            <option value={type.id}>{type.label}</option>
          {/each}
        </select>
      </div>
      
      <div>
        <label for="" class="block text-sm font-medium text-text-main mb-2">Status</label>
        <select
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
          bind:value={statusFilter}
        >
          {#each statuses as status}
            <option value={status.id}>{status.label}</option>
          {/each}
        </select>
      </div>
    </div>
    
    <!-- Date Range -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-2">Date Range</label>
      <div class="flex flex-wrap gap-2 mb-3">
        {#each datePresets as preset}
          <button
            type="button"
            on:click={() => applyPreset(preset.id)}
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                   {selectedPreset === preset.id 
                     ? 'bg-primary text-white' 
                     : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
          >
            {preset.label}
          </button>
        {/each}
      </div>
      
      {#if selectedPreset === 'custom'}
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="" class="block text-xs text-text-muted mb-1">From</label>
            <input
              type="date"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
              bind:value={dateFrom}
            />
          </div>
          <div>
            <label for="" class="block text-xs text-text-muted mb-1">To</label>
            <input
              type="date"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
              bind:value={dateTo}
            />
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Amount Range -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-2">Amount Range (₦)</label>
      <div class="grid grid-cols-2 gap-4">
        <Input
          label="Min"
          name="minAmount"
          type="number"
          placeholder="0"
          value={minAmount}
        />
        <Input
          label="Max"
          name="maxAmount"
          type="number"
          placeholder="No limit"
          value={maxAmount}
        />
      </div>
    </div>
    
    <!-- Apply Button -->
    <Button variant="primary" size="lg" class="w-full" onclick={applyFilters}>
      <Icon icon="mdi:filter-check-outline" class="w-5 h-5 mr-2" />
      Apply Filters
    </Button>
  </div>
</Card>