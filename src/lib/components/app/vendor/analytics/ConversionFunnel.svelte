<!-- src/lib/components/analytics/ConversionFunnel.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let funnel: Array<{
    stage: string;
    count: number;
    percentage: number;
    icon: string;
  }>;
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:funnel" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="font-semibold text-text-main">Conversion Funnel</h3>
      <p class="text-xs text-text-muted">Track drop-off points</p>
    </div>
  </div>
  
  <div class="space-y-4">
    {#each funnel as stage, i}
      <div class="relative">
        <!-- Funnel Bar -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon icon={stage.icon} class="w-5 h-5 text-primary" />
          </div>
          
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-text-main">{stage.stage}</span>
              <span class="text-sm font-bold text-text-main">{stage.count.toLocaleString()}</span>
            </div>
            
            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all"
                style="width: {stage.percentage}%"
              ></div>
            </div>
            
            <p class="text-xs text-text-muted mt-1">
              {stage.percentage}% of previous stage
            </p>
          </div>
        </div>
        
        <!-- Connector Line -->
        {#if i < funnel.length - 1}
          <div class="absolute left-9 top-14 w-0.5 h-6 bg-gray-200"></div>
        {/if}
      </div>
    {/each}
  </div>
  
  <!-- Conversion Rate Summary -->
  <div class="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-text-main">Overall Conversion Rate</span>
      <span class="text-2xl font-bold text-primary">
        {(funnel[funnel.length - 1].percentage / 100 * funnel[0].percentage).toFixed(1)}%
      </span>
    </div>
  </div>
</Card>