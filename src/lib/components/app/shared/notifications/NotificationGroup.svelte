<!-- src/lib/components/notifications/NotificationGroup.svelte -->
<script lang="ts">
  import NotificationItem from './NotificationItem.svelte';
  
  export let dateLabel: string;
  export let notifications: Array<{
    id: string;
    type: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    action?: { label: string; url: string; icon: string };
    icon: string;
    link?: string;
  }>;
  
  export let onMarkRead: (id: string) => void;
</script>

<div class="mb-8">
  <!-- Date Label -->
  <h3 class="text-sm font-medium text-text-muted mb-3 sticky top-[72px] bg-background py-2 z-10">
    {dateLabel}
  </h3>
  
  <!-- Notifications List -->
  <div class="flex flex-col gap-3">
    {#each notifications as notification}
      <NotificationItem
        {notification}
        {onMarkRead}
      />
    {/each}
  </div>
</div>