<!-- src/routes/(app)/settings/profile/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  
  // Form state
  let profile = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    avatar: null
  };
  
  let loading = false;
  let success = '';
  let error = '';
  
  const handleUpdate = async (e: Event) => {
    e.preventDefault();
    loading = true;
    error = '';
    success = '';
    
    // In real app: API call to update profile
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    success = 'Profile updated successfully!';
    loading = false;
  };
  
  const handleAvatarUpload = (e: Event) => {
    // In real app: Handle file upload
    console.log('Avatar upload', e);
  };
</script>

<svelte:head>
  <title>Profile Settings | VendorHub</title>
</svelte:head>

<div class="max-w-[600px] mx-auto px-4 py-8">
  <div class="mb-6">
    <a href="/settings" class="text-sm text-primary font-medium hover:underline flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to Settings
    </a>
  </div>
  
  <h1 class="text-3xl font-bold text-text-main mb-8">Profile Settings</h1>
  
  <Card className="border border-gray-200 p-6">
    <form on:submit={handleUpdate} class="space-y-6">
      <!-- Avatar Upload -->
      <div class="flex items-center gap-6">
        {#if profile.avatar}
          <img src={profile.avatar} alt="Profile" class="w-24 h-24 rounded-full object-cover" />
        {:else}
          <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
            {profile.name.charAt(0)}
          </div>
        {/if}
        <div>
          <label class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium cursor-pointer hover:bg-primary-hover transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            Upload Photo
            <input type="file" accept="image/*" class="hidden" on:change={handleAvatarUpload} />
          </label>
          <p class="text-xs text-text-muted mt-2">JPG, PNG up to 5MB</p>
        </div>
      </div>
      
      <!-- Form Fields -->
      <Input
        label="Full Name"
        name="name"
        value={profile.name}
        required
      />
      
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={profile.email}
        required
        disabled
        hint="Contact support to change email"
      />
      
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        value={profile.phone}
        required
      />
      
      <!-- Messages -->
      {#if success}
        <div class="p-4 bg-success/10 border border-success/30 rounded-xl text-success text-sm">
          {success}
        </div>
      {/if}
      
      {#if error}
        <div class="p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm">
          {error}
        </div>
      {/if}
      
      <!-- Submit -->
      <div class="flex gap-3 pt-4">
        <Button type="submit" variant="primary" size="lg" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button type="button" variant="outline" size="lg" href="/settings">
          Cancel
        </Button>
      </div>
    </form>
  </Card>
</div>