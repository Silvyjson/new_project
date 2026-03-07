<!-- src/lib/components/analytics/AnalyticsFilters.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let shops: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  
  export let selectedShop: string;
  export let dateRange: string;
  
  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom' }
  ];
  
  const exportData = () => {
    // In real app: generate CSV/PDF export
    alert('Exporting analytics data...');
  };
</script>

<Card className="border border-gray-200 p-4">
  <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
    <!-- Shop Filter -->
    <div class="relative w-full md:w-auto">
      <select
        class="appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface w-full"
        bind:value={selectedShop}
      >
        <option value="">All Shops</option>
        {#each shops as shop}
          <option value={shop.slug}>{shop.name}</option>
        {/each}
      </select>
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon icon="mdi:chevron-down" class="w-5 h-5 text-text-muted" />
      </div>
    </div>
    
    <!-- Date Range -->
    <div class="relative w-full md:w-auto">
      <select
        class="appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface w-full"
        bind:value={dateRange}
      >
        {#each dateRanges as range}
          <option value={range.value}>{range.label}</option>
        {/each}
      </select>
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon icon="mdi:calendar-range" class="w-5 h-5 text-text-muted" />
      </div>
    </div>
    
    <!-- Export Button -->
    <Button variant="outline" size="md" onclick={exportData} class="w-full md:w-auto">
      <Icon icon="mdi:download" class="w-4 h-4 mr-2" />
      Export Data
    </Button>
  </div>
</Card>