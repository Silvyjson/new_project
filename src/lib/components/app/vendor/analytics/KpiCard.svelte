<!-- src/lib/components/analytics/KpiCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let icon: string;
  export let label: string;
  export let value: string;
  export let change: string ="";
  export let trend: 'up' | 'down' | 'neutral' = 'neutral';
  export let subtext: string = "";
  export let color: string = 'primary';
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-start justify-between">
    <div class="flex-1 min-w-0">
      <p class="text-sm text-text-muted mb-1">{label}</p>
      <p class="text-2xl md:text-3xl font-bold text-text-main truncate">{value}</p>
      
      {#if change}
        <div class="flex items-center gap-1 mt-2">
          <span class="text-xs font-medium {trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-muted'}">
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {change}
          </span>
          {#if subtext}
            <span class="text-xs text-text-muted">from last period</span>
          {/if}
        </div>
      {/if}
    </div>
    
    <div class="w-12 h-12 rounded-xl bg-{color}/10 flex items-center justify-center flex-shrink-0 ml-4">
      <Icon icon={icon} class="w-6 h-6 text-{color}" />
    </div>
  </div>
</Card>