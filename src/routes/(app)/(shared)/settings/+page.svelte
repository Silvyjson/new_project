<!-- src/routes/(app)/settings/+page.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import SettingsSidebar from '$lib/components/app/shared/settings/SettingsSidebar.svelte';
  import ProfileSettings from '$lib/components/app/shared/settings/ProfileSettings.svelte';
  import SecuritySettings from '$lib/components/app/shared/settings/SecuritySettings.svelte';
  import NotificationSettings from '$lib/components/app/shared/settings/NotificationSettings.svelte';
  import AddressBook from '$lib/components/app/shared/settings/AddressBook.svelte';
  import PaymentMethods from '$lib/components/app/shared/settings/PaymentMethods.svelte';
  import BankAccounts from '$lib/components/app/shared/settings/BankAccounts.svelte';
  import PreferencesSettings from '$lib/components/app/shared/settings/PreferencesSettings.svelte';
  import AccountManagement from '$lib/components/app/shared/settings/AccountManagement.svelte';
  import InviteStaff from '$lib/components/app/shared/settings/InviteStaff.svelte';
  import { auth } from '$lib/state/auth.svelte';
  
  // Active section based on URL
  let activeSection = $derived($page.url.searchParams.get('tab') || 'profile');
  
  // Mock data (in real app: fetch from API)
  let profile = {
    avatar: '',
    fullName: 'John Ade',
    businessName: 'TechHub Store',
    username: 'johnade',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    bio: 'Vendor on VendorHub since 2025',
    verificationStatus: 'VERIFIED' as const
  };
  
  let notificationPrefs = {
    orders: { email: true, push: true, inApp: true },
    delivery: { email: true, push: true, inApp: true },
    followers: { email: false, push: true, inApp: true },
    messages: { email: true, push: true, inApp: true },
    payments: { email: true, push: false, inApp: true },
    blog: { email: false, push: false, inApp: true },
    promotions: { email: true, push: true, inApp: true },
    system: { email: true, push: true, inApp: true }
  };
  
  let addresses = [
    {
      id: 'a_001',
      name: 'John Doe',
      phone: '+234 801 234 5678',
      street: '123 Main Street, Victoria Island',
      city: 'Lagos',
      state: 'Lagos State',
      postalCode: '101241',
      country: 'Nigeria',
      isDefault: true
    }
  ];
  
  let cards = [
    {
      id: 'c_001',
      brand: 'visa' as const,
      last4: '4421',
      expiryMonth: 10,
      expiryYear: 2027,
      isDefault: true
    }
  ];
  
  let bankAccounts = [
    {
      id: 'b_001',
      bankName: 'GTBank',
      accountName: 'John Doe',
      accountNumber: '0123456789',
      isPrimary: true,
      verified: true
    }
  ];
  
  let appPreferences = {
    language: 'en',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
    theme: 'system' as const
  };
  
  const handleSectionChange = (e: any) => {
    goto(`?tab=${e.detail}`, { replaceState: true, noScroll: true });
  };
  
  onMount(() => {
    window.addEventListener('section-change', handleSectionChange as EventListener);
    return () => window.removeEventListener('section-change', handleSectionChange as EventListener);
  });
</script>

<svelte:head>
  <title>Settings | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8">
  
  <!-- Page Header -->
  <div class="mb-8" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:settings-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Settings</h1>
        <p class="text-body text-text-muted">
          Manage your account preferences and security
        </p>
      </div>
    </div>
  </div>
  
  <!-- Two Column Layout -->
  <div class="grid lg:grid-cols-[260px_1fr] gap-8">
    
    <!-- Sidebar Navigation -->
    <SettingsSidebar
      role={auth.role}
      activeSection={activeSection}
    />
    
    <!-- Settings Content -->
    <main class="space-y-6" in:fade={{ duration: 400, delay: 200 }}>
      
      {#if activeSection === 'profile'}
        <ProfileSettings profile={profile} role={auth.role} />
      {/if}
      
      {#if activeSection === 'security'}
        <SecuritySettings />
      {/if}
      
      {#if activeSection === 'notifications'}
        <NotificationSettings preferences={notificationPrefs} />
      {/if}
      
      {#if activeSection === 'addresses' && auth.role === 'buyer'}
        <AddressBook addresses={addresses} />
      {/if}
      
      {#if activeSection === 'payment-methods' && auth.role === 'buyer'}
        <PaymentMethods cards={cards} />
      {/if}
      
      {#if activeSection === 'bank-accounts' && auth.role === 'vendor'}
        <BankAccounts accounts={bankAccounts} />
      {/if}
      
      {#if activeSection === 'invite-staff' && auth.role === 'vendor'}
        <InviteStaff />
      {/if}
      
      {#if activeSection === 'preferences'}
        <PreferencesSettings preferences={appPreferences} />
      {/if}
      
      {#if activeSection === 'account'}
        <AccountManagement />
      {/if}
      
    </main>
  </div>
</main>

<style>
  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr !important;
    }
  }
</style>