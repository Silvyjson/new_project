<!-- src/lib/components/analytics/RevenueChart.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let data: Array<{
    date: string;
    revenue: number;
    orders: number;
    visitors: number;
  }>;
  
  let timeScale = 'daily';
  
  const timeScales = ['daily', 'weekly', 'monthly'];
  
  // Calculate max revenue for scaling
  $: maxRevenue = Math.max(...data.map(d => d.revenue));
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:chart-line" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Revenue Over Time</h3>
        <p class="text-xs text-text-muted">Track your sales performance</p>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
      {#each timeScales as scale}
        <button
          on:click={() => timeScale = scale}
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                 {timeScale === scale 
                   ? 'bg-primary text-white' 
                   : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
        >
          {scale.charAt(0).toUpperCase() + scale.slice(1)}
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Simple Bar Chart -->
  <div class="h-64 flex items-end justify-between gap-2">
    {#each data as item, i}
      <div class="flex-1 flex flex-col items-center gap-2 group">
        <div class="w-full relative">
          <div
            class="bg-primary/20 rounded-t transition-all hover:bg-primary/40"
            style="height: {Math.max(20, (item.revenue / maxRevenue) * 200)}px"
          >
            <div
              class="absolute bottom-0 left-0 right-0 bg-primary rounded-t"
              style="height: {Math.max(10, (item.revenue / maxRevenue) * 180)}px"
            ></div>
          </div>
          
          <!-- Tooltip -->
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            ₦{(item.revenue / 1000).toFixed(1)}K
          </div>
        </div>
        <span class="text-xs text-text-muted text-center">
          {timeScale === 'daily' ? item.date.slice(0, 3) : 
           timeScale === 'weekly' ? `W${i + 1}` : 
           item.date.slice(0, 3)}
        </span>
      </div>
    {/each}
  </div>
  
  <!-- Legend -->
  <div class="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded bg-primary"></div>
      <span class="text-xs text-text-muted">Revenue</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded bg-primary/40"></div>
      <span class="text-xs text-text-muted">Orders</span>
    </div>
  </div>
</Card>