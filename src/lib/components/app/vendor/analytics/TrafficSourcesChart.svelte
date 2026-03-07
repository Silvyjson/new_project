<!-- src/lib/components/analytics/TrafficSourcesChart.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let sources: Array<{
    name: string;
    percentage: number;
    visitors: number;
    icon: string;
    color: string;
  }>;
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:chart-pie" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="font-semibold text-text-main">Traffic Sources</h3>
      <p class="text-xs text-text-muted">Where your buyers come from</p>
    </div>
  </div>
  
  <!-- Simple Pie Chart Visualization -->
  <div class="flex items-center justify-center mb-6">
    <div class="relative w-48 h-48">
      <svg viewBox="0 0 100 100" class="transform -rotate-90">
        {#each sources as source, i}
          {#if i === 0}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              stroke-width="20"
              class="text-{source.color}"
              stroke-dasharray="{source.percentage * 2.51} 251"
            />
          {:else}
            {@const offset = sources.slice(0, i).reduce((sum, s) => sum + s.percentage, 0)}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                stroke-width="20"
                class="text-{source.color}"
                stroke-dasharray="{source.percentage * 2.51} 251"
                stroke-dashoffset={-offset * 2.51}
              />
          {/if}
        {/each}
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <p class="text-2xl font-bold text-text-main">
            {sources.reduce((sum, s) => sum + s.visitors, 0).toLocaleString()}
          </p>
          <p class="text-xs text-text-muted">visitors</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Legend -->
  <div class="space-y-3">
    {#each sources as source}
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-{source.color}"></div>
          <div class="flex items-center gap-2">
            <Icon icon={source.icon} class="w-4 h-4 text-text-muted" />
            <span class="text-sm text-text-main">{source.name}</span>
          </div>
        </div>
        <div class="text-right">
          <span class="text-sm font-semibold text-text-main">{source.percentage}%</span>
          <span class="text-xs text-text-muted ml-2">({source.visitors})</span>
        </div>
      </div>
    {/each}
  </div>
</Card>