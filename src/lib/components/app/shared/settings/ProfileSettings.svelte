<!-- src/lib/components/settings/ProfileSettings.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Input from '$lib/components/common/Input.svelte';
  
  export let profile: {
    avatar?: string;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    bio?: string;
  };
  
  let avatar = profile.avatar;
  let fullName = profile.fullName;
  let username = profile.username;
  let email = profile.email;
  let phone = profile.phone;
  let bio = profile.bio || '';
  
  let loading = false;
  let success = '';
  let error = '';
  
  const handleAvatarUpload = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files?.[0]) {
      avatar = URL.createObjectURL(input.files[0]);
    }
  };
  
  const handleSave = async () => {
    loading = true;
    error = '';
    success = '';
    
    try {
      // In real app: API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      success = 'Profile updated successfully!';
    } catch (err: any) {
      error = err.message || 'Failed to update profile';
    } finally {
      loading = false;
    }
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon icon="mdi:account-outline" class="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 class="font-semibold text-text-main">Profile Settings</h3>
      <p class="text-xs text-text-muted">Manage your personal information</p>
    </div>
  </div>
  
  <div class="space-y-6">
    <!-- Avatar Upload -->
    <div class="flex items-center gap-6">
      {#if avatar}
        <img src={avatar} alt="Profile" class="w-20 h-20 rounded-full object-cover" />
      {:else}
        <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
          {fullName.charAt(0)}
        </div>
      {/if}
      <div>
        <label class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium cursor-pointer hover:bg-primary-hover transition-colors">
          <Icon icon="mdi:camera-outline" class="w-4 h-4" />
          Upload Photo
          <input type="file" accept="image/*" class="hidden" on:change={handleAvatarUpload} />
        </label>
        <p class="text-xs text-text-muted mt-2">JPG, PNG up to 5MB</p>
        {#if avatar}
          <button type="button" class="text-sm text-error hover:underline mt-2" on:click={() => avatar = ''}>
            Remove photo
          </button>
        {/if}
      </div>
    </div>
    
    <!-- Form Fields -->
    <div class="grid md:grid-cols-2 gap-4">
      <Input
        label="Full Name"
        name="fullName"
        value={fullName}
        required
      />
      <Input
        label="Username"
        name="username"
        value={username}
        hint="Cannot be changed after registration"
        disabled
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={email}
        required
        disabled
        hint="Contact support to change email"
      />
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        value={phone}
        required
      />
      <div class="md:col-span-2">
        <label for="bio" class="block text-sm font-medium text-text-main mb-1.5">Bio (Optional)</label>
        <textarea
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
          rows="3"
          placeholder="Tell us about yourself..."
          bind:value={bio}
        ></textarea>
      </div>
    </div>
    
    <!-- Messages -->
    {#if success}
      <div class="p-4 bg-success/10 border border-success/30 rounded-xl text-success text-sm flex items-center gap-2">
        <Icon icon="mdi:check-circle-outline" class="w-5 h-5" />
        {success}
      </div>
    {/if}
    
    {#if error}
      <div class="p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm">
        {error}
      </div>
    {/if}
    
    <!-- Submit -->
    <div class="flex gap-3 pt-4 border-t border-gray-200">
      <Button type="button" variant="primary" size="lg" onclick={handleSave} disabled={loading}>
        <Icon icon="mdi:content-save-outline" class="w-5 h-5 mr-2" />
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
      <Button type="button" variant="outline" size="lg">
        <Icon icon="mdi:close" class="w-5 h-5 mr-2" />
        Cancel
      </Button>
    </div>
  </div>
</Card>