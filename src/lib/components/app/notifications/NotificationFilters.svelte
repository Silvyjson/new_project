<!-- src/lib/components/notifications/NotificationFilters.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let activeFilter: string;
  export let showUnreadOnly: boolean;
  
  const filters = [
    { id: 'all', label: 'All', icon: 'mdi:bell-outline' },
    { id: 'orders', label: 'Orders', icon: 'mdi:package-variant' },
    { id: 'shops', label: 'Shops', icon: 'mdi:store-outline' },
    { id: 'followers', label: 'Followers', icon: 'mdi:account-heart-outline' },
    { id: 'payments', label: 'Payments', icon: 'mdi:wallet-outline' },
    { id: 'system', label: 'System', icon: 'mdi:cog-outline' }
  ];
  
  const emit = (event: string, value: string | boolean) => {
    const customEvent = new CustomEvent(event, { detail: value });
    window.dispatchEvent(customEvent);
  };
</script>

<Card className="border border-gray-200 p-4">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <!-- Filter Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
      {#each filters as filter}
        <button
          on:click={() => emit('filter-change', filter.id)}
          class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                 {activeFilter === filter.id 
                   ? 'bg-primary text-white' 
                   : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
        >
          <Icon icon={filter.icon} class="w-4 h-4" />
          {filter.label}
        </button>
      {/each}
    </div>
    
    <!-- Unread Toggle -->
    <div class="flex items-center gap-3">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          class="w-4 h-4 text-primary rounded border-gray-300"
          bind:checked={showUnreadOnly}
          on:change={(e) => emit('unread-toggle', (e.target as HTMLInputElement).checked)}
        />
        <span class="text-sm text-text-muted">Unread only</span>
      </label>
      
      <button
        class="p-2 text-text-muted hover:text-primary transition-colors"
        title="Filter options"
      >
        <Icon icon="mdi:filter-outline" class="w-5 h-5" />
      </button>
    </div>
  </div>
</Card>