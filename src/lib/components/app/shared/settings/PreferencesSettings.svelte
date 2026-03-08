<!-- src/lib/components/settings/PreferencesSettings.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let preferences: {
    language: string;
    currency: string;
    timezone: string;
    theme: 'system' | 'light' | 'dark';
  };
  
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
    { value: 'pt', label: 'Portuguese' }
  ];
  
  const currencies = [
    { value: 'NGN', label: 'Nigerian Naira (₦)' },
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' }
  ];
  
  const timezones = [
    { value: 'Africa/Lagos', label: 'West Africa Time (WAT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' }
  ];
  
  const themes = [
    { value: 'system', label: 'System Default' },
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' }
  ];
  
  const handleSave = () => {
    console.log('Save preferences', preferences);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:tune-variant" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="font-semibold text-text-main">Preferences</h3>
      <p class="text-xs text-text-muted">Customize your app experience</p>
    </div>
  </div>
  
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-text-main mb-2">
        <Icon icon="mdi:translate" class="w-4 h-4 inline mr-2" />
        Language
      </label>
      <select
        class="w-full md:w-64 px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
        bind:value={preferences.language}
      >
        {#each languages as lang}
          <option value={lang.value}>{lang.label}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-text-main mb-2">
        <Icon icon="mdi:currency-ngn" class="w-4 h-4 inline mr-2" />
        Currency
      </label>
      <select
        class="w-full md:w-64 px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
        bind:value={preferences.currency}
      >
        {#each currencies as curr}
          <option value={curr.value}>{curr.label}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-text-main mb-2">
        <Icon icon="mdi:clock-outline" class="w-4 h-4 inline mr-2" />
        Timezone
      </label>
      <select
        class="w-full md:w-64 px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
        bind:value={preferences.timezone}
      >
        {#each timezones as tz}
          <option value={tz.value}>{tz.label}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-text-main mb-2">
        <Icon icon="mdi:theme-light-dark" class="w-4 h-4 inline mr-2" />
        Theme Mode
      </label>
      <div class="flex flex-wrap gap-3">
        {#each themes as theme}
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value={theme.value}
              bind:group={preferences.theme}
              class="w-4 h-4 text-primary"
            />
            <span class="text-body text-text-main">{theme.label}</span>
          </label>
        {/each}
      </div>
    </div>
    
    <div class="pt-4 border-t border-gray-200">
      <Button variant="primary" size="md" onclick={handleSave}>
        <Icon icon="mdi:content-save-outline" class="w-5 h-5 mr-2" />
        Save Preferences
      </Button>
    </div>
  </div>
</Card>