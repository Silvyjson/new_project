<!-- src/lib/components/settings/SettingsSidebar.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  
  export let role: 'buyer' | 'vendor' = 'buyer';
  export let activeSection: string;
  
  const navItems = [
    { id: 'profile', label: 'Profile', icon: 'mdi:account-outline', roles: ['buyer', 'vendor'] as const },
    { id: 'security', label: 'Security', icon: 'mdi:shield-lock-outline', roles: ['buyer', 'vendor'] as const },
    { id: 'notifications', label: 'Notifications', icon: 'mdi:bell-outline', roles: ['buyer', 'vendor'] as const },
    { id: 'addresses', label: 'Address Book', icon: 'mdi:map-marker-outline', roles: ['buyer'] as const },
    { id: 'payment-methods', label: 'Payment Methods', icon: 'mdi:credit-card-outline', roles: ['buyer'] as const },
    { id: 'bank-accounts', label: 'Bank Accounts', icon: 'mdi:bank-outline', roles: ['vendor'] as const },
    { id: 'preferences', label: 'Preferences', icon: 'mdi:tune-variant', roles: ['buyer', 'vendor'] as const },
    { id: 'account', label: 'Account', icon: 'mdi:account-cog-outline', roles: ['buyer', 'vendor'] as const }
  ];
  
  const visibleItems = navItems.filter(item => item.roles.includes(role));
  
  const emit = (event: string, value: string) => {
    const customEvent = new CustomEvent(event, { detail: value });
    window.dispatchEvent(customEvent);
  };
</script>

<nav class="space-y-1">
  {#each visibleItems as item}
    <button
      on:click={() => emit('section-change', item.id)}
      class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors
             {activeSection === item.id 
               ? 'bg-primary/10 text-primary font-medium' 
               : 'text-text-muted hover:bg-gray-100 hover:text-text-main'}"
    >
      <Icon icon={item.icon} class="w-5 h-5" />
      <span class="text-sm">{item.label}</span>
    </button>
  {/each}
</nav>