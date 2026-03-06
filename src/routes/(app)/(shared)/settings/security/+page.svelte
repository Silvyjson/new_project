<!-- src/routes/(app)/settings/password/+page.svelte -->
<script lang="ts">
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import PasswordInput from '$lib/components/auth/PasswordInput.svelte';
  
  // Form state
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let loading = false;
  let success = '';
  let error = '';
  
  const validate = () => {
    if (!currentPassword) return 'Current password is required';
    if (!newPassword || newPassword.length < 8) return 'New password must be at least 8 characters';
    if (newPassword !== confirmPassword) return 'Passwords do not match';
    return null;
  };
  
  const handleChange = async (e: Event) => {
    e.preventDefault();
    error = '';
    success = '';
    
    const validationError = validate();
    if (validationError) {
      error = validationError;
      return;
    }
    
    loading = true;
    
    // In real app: API call to change password
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    success = 'Password updated successfully!';
    currentPassword = '';
    newPassword = '';
    confirmPassword = '';
    loading = false;
  };
</script>

<svelte:head>
  <title>Password Settings | VendorHub</title>
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
  
  <h1 class="text-3xl font-bold text-text-main mb-8">Change Password</h1>
  
  <Card className="border border-gray-200 p-6">
    <form on:submit={handleChange} class="space-y-6">
      <PasswordInput
        label="Current Password"
        name="currentPassword"
        placeholder="Enter current password"
        required
        bind:value={currentPassword}
      />
      
      <PasswordInput
        label="New Password"
        name="newPassword"
        placeholder="Create a strong password"
        required
        hint="Use 8+ characters with letters, numbers & symbols"
        bind:value={newPassword}
      />
      
      <PasswordInput
        label="Confirm New Password"
        name="confirmPassword"
        placeholder="Confirm your new password"
        required
        bind:value={confirmPassword}
      />
      
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
      
      <div class="flex gap-3 pt-4">
        <Button type="submit" variant="primary" size="lg" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
        <Button type="button" variant="outline" size="lg" href="/settings">
          Cancel
        </Button>
      </div>
    </form>
  </Card>
</div>