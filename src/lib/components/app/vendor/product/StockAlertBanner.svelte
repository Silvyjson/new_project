<!-- src/lib/components/inventory/StockAlertBanner.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let lowStockItems: Array<{
    id: string;
    name: string;
    stockQuantity: number;
    shop: { name: string };
  }>;
  
  export let onViewLowStock: () => void;
</script>

{#if lowStockItems.length > 0}
  <Card className="border border-warning/30 bg-warning/5 p-4">
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
        <Icon icon="mdi:alert-circle-outline" class="w-5 h-5 text-warning" />
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-text-main mb-1">Low Stock Alert</h4>
        <p class="text-sm text-text-muted">
          {lowStockItems.length} product{lowStockItems.length > 1 ? 's' : ''} need attention:
        </p>
        <ul class="text-sm text-text-muted mt-2 space-y-1">
          {#each lowStockItems.slice(0, 3) as item}
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-warning"></span>
              <span class="truncate">{item.name}</span>
              <span class="text-warning font-medium">({item.stockQuantity} left)</span>
            </li>
          {/each}
          {#if lowStockItems.length > 3}
            <li class="text-text-muted">+{lowStockItems.length - 3} more</li>
          {/if}
        </ul>
      </div>
      <button
        on:click={onViewLowStock}
        class="px-4 py-2 rounded-xl border border-warning text-warning font-medium hover:bg-warning/10 transition-colors whitespace-nowrap"
      >
        View All
      </button>
    </div>
  </Card>
{/if}