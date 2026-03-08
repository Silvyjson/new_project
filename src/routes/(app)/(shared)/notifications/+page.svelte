<!-- src/routes/(app)/notifications/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import NotificationItem from '$lib/components/app/shared/notifications/NotificationItem.svelte';
  import NotificationFilters from '$lib/components/app/shared/notifications/NotificationFilters.svelte';
  import NotificationGroup from '$lib/components/app/shared/notifications/NotificationGroup.svelte';
  // import NotificationSettingsModal from '$lib/components/app/notifications/NotificationSettingsModal.svelte';
  import EmptyNotifications from '$lib/components/app/shared/notifications/EmptyNotifications.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  // Role (in real app: from auth store)
  let role: 'buyer' | 'vendor' = 'buyer';
  
  // Filter state
  let activeFilter = 'all';
  let showUnreadOnly = false;
  let showSettingsModal = false;
  
  // Mock notifications (in real app: fetch from API with filters)
  let allNotifications = [
    // Today
    {
      id: 'n_001',
      type: 'order' as const,
      title: 'New Order Received',
      message: 'Order #VH-2043 has been placed in TechHub for ₦45,000',
      time: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      read: false,
      action: { label: 'View Order', url: '/orders/VH-2043', icon: 'mdi:eye-outline' },
      icon: 'mdi:package-variant',
      link: '/orders/VH-2043'
    },
    {
      id: 'n_002',
      type: 'delivery' as const,
      title: 'Order Shipped',
      message: 'Your order #VH-2042 is now on delivery with GIG Logistics',
      time: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      read: false,
      action: { label: 'Track Delivery', url: '/orders/VH-2042', icon: 'mdi:truck-fast-outline' },
      icon: 'mdi:truck-fast-outline',
      link: '/orders/VH-2042'
    },
    {
      id: 'n_003',
      type: 'follower' as const,
      title: 'New Follower',
      message: 'Sarah started following Urban Kicks',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
      action: { label: 'View Profile', url: '/dashboard?follower=sarah', icon: 'mdi:account-eye-outline' },
      icon: 'mdi:account-plus-outline',
      link: '/dashboard?follower=sarah'
    },
    
    // Yesterday
    {
      id: 'n_004',
      type: 'payment' as const,
      title: 'Payment Received',
      message: '₦45,000 has been credited to your wallet',
      time: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      read: true,
      action: { label: 'View Wallet', url: '/wallet', icon: 'mdi:wallet-outline' },
      icon: 'mdi:cash',
      link: '/wallet'
    },
    {
      id: 'n_005',
      type: 'wishlist' as const,
      title: 'Product Added to Wishlist',
      message: 'Your product "Wireless Headphones" was added to wishlist by 3 users',
      time: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      read: true,
      icon: 'mdi:heart-outline',
      link: '/my-shop/techhub/product/p_001'
    },
    
    // Earlier
    {
      id: 'n_006',
      type: 'blog' as const,
      title: 'New Blog Comment',
      message: 'Someone commented on your blog post "How to Choose Wireless Headphones"',
      time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      action: { label: 'View Comment', url: '/my-blog/1', icon: 'mdi:comment-outline' },
      icon: 'mdi:comment-outline',
      link: '/my-blog/1'
    },
    {
      id: 'n_007',
      type: 'system' as const,
      title: 'Verification Approved',
      message: 'Your shop business verification was approved. Trust score increased by +30%',
      time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      action: { label: 'View Shop', url: '/my-shop/techhub', icon: 'mdi:store-outline' },
      icon: 'mdi:shield-check-outline',
      link: '/my-shop/techhub'
    }
  ];
  
  // Group notifications by date
  const groupByDate = (notifications: typeof allNotifications) => {
    const groups: Record<string, typeof allNotifications> = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    notifications.forEach(notification => {
      const notificationDate = new Date(notification.time);
      let label = 'Earlier';
      
      if (notificationDate.toDateString() === today.toDateString()) {
        label = 'Today';
      } else if (notificationDate.toDateString() === yesterday.toDateString()) {
        label = 'Yesterday';
      }
      
      if (!groups[label]) groups[label] = [];
      groups[label].push(notification);
    });
    
    return groups;
  };
  
  // Filter notifications
  $: filteredNotifications = allNotifications.filter(n => {
    const matchesFilter = activeFilter === 'all' || n.type === activeFilter;
    const matchesUnread = !showUnreadOnly || !n.read;
    return matchesFilter && matchesUnread;
  });
  
  $: groupedNotifications = groupByDate(filteredNotifications);
  
  // Mark as read
  const markAsRead = (id: string) => {
    allNotifications = allNotifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    // In real app: API call to mark as read
  };
  
  const markAllAsRead = () => {
    allNotifications = allNotifications.map(n => ({ ...n, read: true }));
    // In real app: API call to mark all as read
  };
  
  const deleteAllRead = () => {
    allNotifications = allNotifications.filter(n => !n.read);
    // In real app: API call to delete read notifications
  };
  
  // Listen for filter events
  onMount(() => {
    const handleFilterChange = (e: CustomEvent) => activeFilter = e.detail;
    const handleUnreadToggle = (e: CustomEvent) => showUnreadOnly = e.detail;
    
    window.addEventListener('filter-change', handleFilterChange as EventListener);
    window.addEventListener('unread-toggle', handleUnreadToggle as EventListener);
    
    return () => {
      window.removeEventListener('filter-change', handleFilterChange as EventListener);
      window.removeEventListener('unread-toggle', handleUnreadToggle as EventListener);
    };
  });
</script>

<svelte:head>
  <title>Notifications | VendorHub</title>
</svelte:head>

<main class="max-w-[1000px] mx-auto px-4 py-8 space-y-8">
  
  <!-- Section 1: Page Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:bell-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Notifications</h1>
        <p class="text-body text-text-muted">Stay updated on orders, shop activity and account alerts</p>
      </div>
    </div>
    
    <div class="flex gap-3">
      <Button variant="outline" size="sm" onclick={markAllAsRead}>
        <Icon icon="mdi:check-all" class="w-4 h-4 mr-2" />
        Mark all as read
      </Button>
      <Button variant="ghost" size="md" onclick={() => showSettingsModal = true}>
        <Icon icon="mdi:cog-outline" class="w-5 h-5" />
      </Button>
    </div>
  </section>
  
  <!-- Section 2: Filters -->
  <section in:fade={{ duration: 400, delay: 100 }}>
    <NotificationFilters
      activeFilter={activeFilter}
      showUnreadOnly={showUnreadOnly}
      role={role}
    />
  </section>
  
  <!-- Section 3: Bulk Actions (if notifications exist) -->
  {#if filteredNotifications.length > 0}
    <section class="flex items-center justify-between" in:fade={{ duration: 400, delay: 200 }}>
      <p class="text-sm text-text-muted">
        {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
        {showUnreadOnly && ` (unread)`}
      </p>
      <Button variant="ghost" size="sm" class="text-error hover:bg-error/5" onclick={deleteAllRead}>
        <Icon icon="mdi:delete-outline" class="w-4 h-4 mr-1" />
        Delete all read
      </Button>
    </section>
  {/if}
  
  <!-- Section 4: Notification List -->
  <section in:fade={{ duration: 400, delay: 300 }}>
    {#if filteredNotifications.length === 0}
      <EmptyNotifications />
    {:else}
      {#each Object.entries(groupedNotifications) as [dateLabel, notifications]}
        <NotificationGroup
          {dateLabel}
          {notifications}
          onMarkRead={markAsRead}
        />
      {/each}
    {/if}
  </section>
  
  <!-- Load More / Pagination -->
  {#if filteredNotifications.length >= 10}
    <section class="text-center" in:fade={{ duration: 400, delay: 400 }}>
      <Button variant="outline" size="lg">
        Load More Notifications
      </Button>
    </section>
  {/if}
</main>

<!-- Settings Modal -->
<!-- {#if showSettingsModal}
  <NotificationSettingsModal onClose={() => showSettingsModal = false} />
{/if} -->

<!-- <style>
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    [in:fly] {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style> -->