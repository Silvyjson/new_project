<!-- src/lib/components/promotion/promotiontatusTabs.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  
  export let activeTab: string;
  
  const tabs = [
    { id: 'all', label: 'All', icon: 'mdi:tag-outline' },
    { id: 'active', label: 'Active', icon: 'mdi:check-circle-outline' },
    { id: 'scheduled', label: 'Scheduled', icon: 'mdi:clock-outline' },
    { id: 'expired', label: 'Expired', icon: 'mdi:calendar-remove-outline' },
    { id: 'paused', label: 'Paused', icon: 'mdi:pause-circle-outline' }
  ];
  
  const emit = (event: string, value: string) => {
    const customEvent = new CustomEvent(event, { detail: value });
    window.dispatchEvent(customEvent);
  };
</script>

<div class="flex items-center gap-2 overflow-x-auto pb-2">
  {#each tabs as tab}
    <button
      on:click={() => emit('tab-change', tab.id)}
      class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
             {activeTab === tab.id 
               ? 'bg-primary text-white' 
               : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
    >
      <Icon icon={tab.icon} class="w-4 h-4" />
      {tab.label}
    </button>
  {/each}
</div>