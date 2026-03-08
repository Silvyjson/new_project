<!-- src/lib/components/settings/NotificationSettings.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let preferences: {
    orders: { email: boolean; push: boolean; inApp: boolean };
    delivery: { email: boolean; push: boolean; inApp: boolean };
    followers: { email: boolean; push: boolean; inApp: boolean };
    messages: { email: boolean; push: boolean; inApp: boolean };
    payments: { email: boolean; push: boolean; inApp: boolean };
    blog: { email: boolean; push: boolean; inApp: boolean };
    system: { email: boolean; push: boolean; inApp: boolean };
  };
  
  const notificationTypes = [
    { key: 'orders', label: 'Orders', icon: 'mdi:package-variant', desc: 'New orders, status updates' },
    { key: 'delivery', label: 'Delivery Updates', icon: 'mdi:truck-fast-outline', desc: 'Shipping and tracking info' },
    { key: 'followers', label: 'Followers', icon: 'mdi:account-heart-outline', desc: 'New followers and activity' },
    { key: 'messages', label: 'Messages', icon: 'mdi:message-outline', desc: 'Direct messages from buyers' },
    { key: 'payments', label: 'Payments', icon: 'mdi:wallet-outline', desc: 'Payment confirmations and refunds' },
    { key: 'blog', label: 'Blog Activity', icon: 'mdi:comment-outline', desc: 'Comments on your posts' },
    { key: 'system', label: 'System Alerts', icon: 'mdi:bell-outline', desc: 'Account and platform updates' }
  ];
  
  const updatePreference = (type: string, channel: 'email' | 'push' | 'inApp', value: boolean) => {
    console.log(`Update ${type}.${channel} = ${value}`);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:bell-outline" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="font-semibold text-text-main">Notification Preferences</h3>
      <p class="text-xs text-text-muted">Control how you receive updates</p>
    </div>
  </div>
  
  <!-- Channel Headers -->
  <div class="grid grid-cols-4 gap-4 mb-4 px-4 text-sm font-medium text-text-muted">
    <span>Notification Type</span>
    <span class="text-center flex items-center justify-center gap-1">
      <Icon icon="mdi:email-outline" class="w-4 h-4" /> Email
    </span>
    <span class="text-center flex items-center justify-center gap-1">
      <Icon icon="mdi:cellphone" class="w-4 h-4" /> Push
    </span>
    <span class="text-center flex items-center justify-center gap-1">
      <Icon icon="mdi:bell-ring-outline" class="w-4 h-4" /> In-App
    </span>
  </div>
  
  <!-- Notification Types -->
  <div class="space-y-4">
    {#each notificationTypes as type}
      <div class="grid grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-xl">
        <div class="flex items-center gap-3">
          <Icon icon={type.icon} class="w-5 h-5 text-text-muted" />
          <div>
            <p class="font-medium text-text-main">{type.label}</p>
            <p class="text-xs text-text-muted">{type.desc}</p>
          </div>
        </div>
        
        {#each ['email', 'push', 'inApp'] as channel}
          <label class="flex justify-center">
            <input
              type="checkbox"
              class="w-5 h-5 text-primary rounded border-gray-300"
              checked={preferences[type.key as keyof typeof preferences][channel as keyof typeof preferences.email]}
              on:change={(e) => updatePreference(type.key, channel as 'email' | 'push' | 'inApp', (e.target as HTMLInputElement).checked)}
            />
          </label>
        {/each}
      </div>
    {/each}
  </div>
  
  <p class="text-xs text-text-muted mt-6">
    <Icon icon="mdi:information-outline" class="w-4 h-4 inline mr-1" />
    Critical account notifications cannot be disabled.
  </p>
</Card>