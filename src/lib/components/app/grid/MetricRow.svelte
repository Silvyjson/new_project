<script lang="ts">
  import MetricCard from '../card/MetricCard.svelte';

  export let metrics: Array<{
    label: string;
    value: string | number;
    icon?: string;
    trendValue?: string;
    trend?: 'up' | 'down' | 'neutral';
    valueClass?: string;
    color?: string;
  }> = [];
</script>

<div class="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 scrollbar-none">
  {#each metrics as metric}
    <div class="min-w-65 md:min-w-0">
      <MetricCard {...metric} />
    </div>
  {/each}
</div>

<style>
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
</style>
