<!-- src/routes/(app)/settings/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import Card from '$lib/components/ui/Card.svelte';
  
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'Profile', description: 'Update your personal information', icon: '👤', href: '/settings/profile' },
        { id: 'password', label: 'Password', description: 'Change your password', icon: '🔒', href: '/settings/password' },
        { id: 'notifications', label: 'Notifications', description: 'Manage notification preferences', icon: '🔔', href: '/notifications' }
      ]
    },
    {
      title: 'Shopping',
      items: [
        { id: 'addresses', label: 'Addresses', description: 'Manage your shipping addresses', icon: '📍', href: '/settings/addresses' },
        { id: 'payment', label: 'Payment Methods', description: 'Manage saved payment methods', icon: '💳', href: '/settings/payment' },
        { id: 'orders', label: 'Order History', description: 'View all your orders', icon: '📦', href: '/orders' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 'privacy', label: 'Privacy', description: 'Control your privacy settings', icon: '🔐', href: '/settings/privacy' },
        { id: 'language', label: 'Language', description: 'Choose your preferred language', icon: '🌐', href: '/settings/language' }
      ]
    }
  ];
</script>

<svelte:head>
  <title>Settings | VendorHub</title>
</svelte:head>

<div class="max-w-[800px] mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-text-main mb-8">Settings</h1>
  
  <div class="space-y-8">
    {#each settingsSections as section}
      <section>
        <h2 class="text-lg font-bold text-text-main mb-4">{section.title}</h2>
        <div class="space-y-3">
          {#each section.items as item}
            <a href={item.href} class="block">
              <Card class="border border-gray-200 p-4 hover:border-primary hover:shadow-card-hover transition-all cursor-pointer">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-text-main mb-0.5">{item.label}</h3>
                    <p class="text-sm text-text-muted">{item.description}</p>
                  </div>
                  <svg class="w-5 h-5 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </Card>
            </a>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>