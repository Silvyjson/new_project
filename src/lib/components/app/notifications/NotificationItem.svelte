<!-- src/lib/components/notifications/NotificationItem.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let notification: {
    id: string;
    type: 'order' | 'delivery' | 'follower' | 'wishlist' | 'payment' | 'blog' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
    action?: {
      label: string;
      url: string;
      icon: string;
    };
    icon: string;
    link?: string;
  };
  
  export let onMarkRead: (id: string) => void;
  
  const formatTime = (time: string) => {
    const now = new Date();
    const notificationTime = new Date(time);
    const diffMs = now.getTime() - notificationTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(notificationTime);
  };
  
  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification.id);
    }
    if (notification.link) {
      window.location.href = notification.link;
    }
  };
</script>

<Card
  className="border border-gray-200 p-4 cursor-pointer transition-all
         {notification.read 
           ? 'bg-surface hover:bg-gray-50' 
           : 'bg-primary/5 border-l-4 border-primary hover:bg-primary/10'}"
  on:click={handleClick}
>
  <div class="flex items-start gap-4">
    <!-- Icon -->
    <div class="flex-shrink-0">
      <div class="w-10 h-10 rounded-xl {notification.read ? 'bg-gray-100' : 'bg-primary/20'} flex items-center justify-center">
        <Icon icon={notification.icon} class="w-5 h-5 {notification.read ? 'text-text-muted' : 'text-primary'}" />
      </div>
    </div>
    
    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <h4 class="font-semibold text-text-main text-sm mb-1">{notification.title}</h4>
          <p class="text-sm text-text-muted line-clamp-2">{notification.message}</p>
          <p class="text-xs text-text-muted mt-2">{formatTime(notification.time)}</p>
        </div>
        
        <!-- Unread Indicator -->
        {#if !notification.read}
          <span class="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></span>
        {/if}
      </div>
      
      <!-- Action Button -->
      {#if notification.action}
        <div class="mt-3">
          <Button
            variant="outline"
            size="sm"
            href={notification.action.url}
            onclick={(e) => {
              e.stopPropagation();
              if (!notification.read) onMarkRead(notification.id);
            }}
            class="pointer-events-auto"
          >
            <Icon icon={notification.action.icon} class="w-4 h-4 mr-1" />
            {notification.action.label}
          </Button>
        </div>
      {/if}
    </div>
  </div>
</Card>