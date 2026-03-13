<!-- src/lib/components/settings/ProfileSettings.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Input from '$lib/components/common/Input.svelte';
  
  interface Profile {
    avatar?: string;
    fullName: string;
    businessName?: string;
    username: string;
    email: string;
    phone: string;
    bio?: string;
    verificationStatus?: 'NOT_VERIFIED' | 'PENDING' | 'VERIFIED';
  }

  interface Props {
    role?: 'buyer' | 'vendor';
    profile: Profile;
  }

  let { role = 'buyer', profile }: Props = $props();
  
  let avatar = $state(profile.avatar);
  let fullName = $state(profile.fullName);
  let businessName = $state(profile.businessName || '');
  let username = $state(profile.username);
  let email = $state(profile.email);
  let phone = $state(profile.phone);
  let bio = $state(profile.bio || '');
  let verificationStatus = $state(profile.verificationStatus || 'NOT_VERIFIED');
  
  let loading = $state(false);
  let success = $state('');
  let error = $state('');
  
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
          <input type="file" accept="image/*" class="hidden" onchange={handleAvatarUpload} />
        </label>
        <p class="text-xs text-text-muted mt-2">JPG, PNG up to 5MB</p>
        {#if avatar}
          <button type="button" class="text-sm text-error hover:underline mt-2" onclick={() => avatar = ''}>
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
        bind:value={fullName}
        required
      />
      {#if role === 'vendor'}
        <Input
          label="Business Name"
          name="businessName"
          bind:value={businessName}
          required
        />
      {/if}
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
        bind:value={phone}
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

    <!-- ID Verification (Vendor Only) -->
    {#if role === 'vendor'}
      <div class="pt-6 border-t border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:badge-account-outline" class="w-5 h-5 text-primary" />
            <h4 class="font-semibold text-text-main">ID Verification</h4>
          </div>
          <div class="flex items-center gap-2">
            {#if verificationStatus === 'VERIFIED'}
              <span class="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-bold flex items-center gap-1">
                <Icon icon="mdi:check-decagram" class="w-3.5 h-3.5" />
                VERIFIED
              </span>
            {:else if verificationStatus === 'PENDING'}
              <span class="px-2.5 py-1 rounded-full bg-warning/10 text-warning text-xs font-bold flex items-center gap-1">
                <Icon icon="mdi:clock-outline" class="w-3.5 h-3.5" />
                PENDING REVIEW
              </span>
            {:else}
              <span class="px-2.5 py-1 rounded-full bg-gray-100 text-text-muted text-xs font-bold">
                NOT VERIFIED
              </span>
            {/if}
          </div>
        </div>

        <div class="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-300">
          {#if verificationStatus === 'NOT_VERIFIED'}
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon icon="mdi:upload-outline" class="w-6 h-6 text-primary" />
              </div>
              <h5 class="font-medium text-text-main mb-1">Upload Identity Document</h5>
              <p class="text-xs text-text-muted mb-4 max-w-sm mx-auto">
                Please upload a clear photo of your Government Issued ID (National ID, International Passport, or Driver's License)
              </p>
              <Button variant="outline" size="sm" onclick={() => verificationStatus = 'PENDING'}>
                Start Verification
              </Button>
            </div>
          {:else if verificationStatus === 'PENDING'}
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
                <Icon icon="mdi:file-document-outline" class="w-5 h-5 text-warning" />
              </div>
              <div>
                <h5 class="font-medium text-text-main mb-1">Documents Under Review</h5>
                <p class="text-xs text-text-muted">
                  Your identity documents have been submitted and are currently being reviewed by our compliance team. This usually takes 24-48 hours.
                </p>
              </div>
            </div>
          {:else}
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                <Icon icon="mdi:shield-check-outline" class="w-5 h-5 text-success" />
              </div>
              <div>
                <h5 class="font-medium text-text-main mb-1">Verification Complete</h5>
                <p class="text-xs text-text-muted">
                  Your identity has been successfully verified. You now have full access to all vendor features.
                </p>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
    
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