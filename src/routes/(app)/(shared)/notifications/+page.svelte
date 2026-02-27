<!-- src/routes/(app)/notifications/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  
  // Mock notifications grouped by date
  const notifications = {
    today: [
      { id: 1, type: 'order', message: 'Your order #ORD-2026-001 has been delivered', time: '2 hours ago', unread: true, icon: '📦' },
      { id: 2, type: 'promo', message: 'TechStoreNG just dropped 20% off on all electronics', time: '5 hours ago', unread: true, icon: '🏷️' }
    ],
    thisWeek: [
      { id: 3, type: 'order', message: 'Your order #ORD-2026-002 has been shipped', time: '2 days ago', unread: false, icon: '🚚' },
      { id: 4, type: 'review', message: 'Amina Fashion responded to your review', time: '3 days ago', unread: false, icon: '💬' },
      { id: 5, type: 'follow', message: 'Home Essentials started following you', time: '5 days ago', unread: false, icon: '👤' }
    ],
    earlier: [
      { id: 6, type: 'security', message: 'New login detected from Lagos, Nigeria', time: '1 week ago', unread: false, icon: '🔒' },
      { id: 7, type: 'order', message: 'Your order #ORD-2026-000 has been confirmed', time: '2 weeks ago', unread: false, icon: '✓' }
    ]
  };
  
  const markAsRead = (id: number) => {
    // In real app: API call to mark notification as read
    console.log(`Mark notification ${id} as read`);
  };
  
  const markAllAsRead = () => {
    // In real app: API call to mark all as read
    console.log('Mark all as read');
  };
  
  const getNotificationStyles = (type: string) => {
    const styles = {
      order: 'bg-blue-100 text-blue-700',
      promo: 'bg-purple-100 text-purple-700',
      review: 'bg-green-100 text-green-700',
      follow: 'bg-pink-100 text-pink-700',
      security: 'bg-yellow-100 text-yellow-700'
    };
    return styles[type as keyof typeof styles] || styles.order;
  };
</script>

<svelte:head>
  <title>Notifications | VendorHub</title>
</svelte:head>

<div class="max-w-[800px] mx-auto px-4 py-8">
  <div class="flex items-center justify-between mb-8">
    <h1 class="text-3xl font-bold text-text-main">Notifications</h1>
    <Button variant="outline" size="sm" on:click={markAllAsRead}>
      Mark All as Read
    </Button>
  </div>
  
  <!-- Today -->
  {#if notifications.today.length > 0}
    <section class="mb-8">
      <h2 class="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">Today</h2>
      <div class="space-y-3">
        {#each notifications.today as notification, i}
          <div
            in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}
            class="relative"
          >
            <Card
              class="border border-gray-200 p-4 transition-colors
                     {notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-surface'}"
            >
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full {getNotificationStyles(notification.type)} flex items-center justify-center text-xl flex-shrink-0">
                  {notification.icon}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-body text-text-main">{notification.message}</p>
                  <p class="text-xs text-text-muted mt-1">{notification.time}</p>
                </div>
                {#if notification.unread}
                  <button
                    on:click={() => markAsRead(notification.id)}
                    class="w-3 h-3 rounded-full bg-primary flex-shrink-0"
                    aria-label="Mark as read"
                  ></button>
                {/if}
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </section>
  {/if}
  
  <!-- This Week -->
  {#if notifications.thisWeek.length > 0}
    <section class="mb-8">
      <h2 class="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">This Week</h2>
      <div class="space-y-3">
        {#each notifications.thisWeek as notification, i}
          <div
            in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}
            class="relative"
          >
            <Card
              class="border border-gray-200 p-4 transition-colors
                     {notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-surface'}"
            >
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full {getNotificationStyles(notification.type)} flex items-center justify-center text-xl flex-shrink-0">
                  {notification.icon}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-body text-text-main">{notification.message}</p>
                  <p class="text-xs text-text-muted mt-1">{notification.time}</p>
                </div>
                {#if notification.unread}
                  <button
                    on:click={() => markAsRead(notification.id)}
                    class="w-3 h-3 rounded-full bg-primary flex-shrink-0"
                    aria-label="Mark as read"
                  ></button>
                {/if}
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </section>
  {/if}
  
  <!-- Earlier -->
  {#if notifications.earlier.length > 0}
    <section>
      <h2 class="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">Earlier</h2>
      <div class="space-y-3">
        {#each notifications.earlier as notification, i}
          <div
            in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}
            class="relative"
          >
            <Card
              class="border border-gray-200 p-4 transition-colors
                     {notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-surface'}"
            >
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full {getNotificationStyles(notification.type)} flex items-center justify-center text-xl flex-shrink-0">
                  {notification.icon}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-body text-text-main">{notification.message}</p>
                  <p class="text-xs text-text-muted mt-1">{notification.time}</p>
                </div>
                {#if notification.unread}
                  <button
                    on:click={() => markAsRead(notification.id)}
                    class="w-3 h-3 rounded-full bg-primary flex-shrink-0"
                    aria-label="Mark as read"
                  ></button>
                {/if}
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </section>
  {/if}
  
  <!-- Empty State -->
  {#if notifications.today.length === 0 && notifications.thisWeek.length === 0 && notifications.earlier.length === 0}
    <Card class="py-16 text-center">
      <div class="text-6xl mb-4">🔔</div>
      <h2 class="text-h2 text-text-main mb-2">No notifications</h2>
      <p class="text-body text-text-muted">You're all caught up!</p>
    </Card>
  {/if}
</div>