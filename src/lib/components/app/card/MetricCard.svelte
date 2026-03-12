<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';

  export let label: string;
  export let value: string | number;
  export let icon: string | undefined = undefined;
  export let trendValue: string | undefined = undefined;
  export let trend: 'up' | 'down' | 'neutral' | undefined = undefined;
  export let valueClass: string = "text-text-main";
  export let color: string = "primary";

  $: trendColor = trend === 'up' 
    ? 'text-success' 
    : trend === 'down' 
      ? 'text-danger' 
      : 'text-text-muted';
</script>

<Card className="border border-gray-200 p-6 hover:shadow-card-hover transition-all duration-300">
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <p class="text-sm font-medium text-text-muted">{label}</p>
      <div class="flex items-baseline gap-2">
        <h3 class="text-2xl font-bold {valueClass}">{value}</h3>
        {#if trendValue}
          <span class="text-xs font-medium {trendColor} flex items-center gap-0.5">
            {#if trend === 'up'}
              <Icon icon="mdi:trending-up" class="w-3 h-3" />
            {:else if trend === 'down'}
              <Icon icon="mdi:trending-down" class="w-3 h-3" />
            {/if}
            {trendValue}
          </span>
        {/if}
      </div>
    </div>

    {#if icon}
      <div class="w-12 h-12 rounded-2xl bg-{color}/5 text-{color} flex items-center justify-center transition-transform group-hover:scale-110">
        <Icon icon={icon} class="w-6 h-6" />
      </div>
    {/if}
  </div>
</Card>