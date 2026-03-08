<!-- src/lib/components/settings/SecuritySettings.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import PasswordInput from '$lib/components/auth/PasswordInput.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  // Password change state
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let passwordLoading = false;
  let passwordSuccess = '';
  let passwordError = '';
  
  // 2FA state
  let twoFactorEnabled = false;
  let recoveryCodes = ['ABCD-1234', 'EFGH-5678', 'IJKL-9012'];
  
  // Sessions state
  let sessions = [
    { id: 's_001', device: 'Chrome', location: 'Abuja, Nigeria', lastActive: 'Now', current: true },
    { id: 's_002', device: 'Safari', location: 'Lagos, Nigeria', lastActive: '2 days ago', current: false }
  ];
  
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      passwordError = 'Passwords do not match';
      return;
    }
    
    passwordLoading = true;
    passwordError = '';
    passwordSuccess = '';
    
    try {
      // In real app: API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      passwordSuccess = 'Password updated successfully!';
      currentPassword = '';
      newPassword = '';
      confirmPassword = '';
    } catch (err: any) {
      passwordError = err.message || 'Failed to update password';
    } finally {
      passwordLoading = false;
    }
  };
  
  const toggle2FA = () => {
    twoFactorEnabled = !twoFactorEnabled;
  };
  
  const logoutSession = (sessionId: string) => {
    sessions = sessions.filter(s => s.id !== sessionId);
  };
</script>

<div class="space-y-6">
  
  <!-- Change Password -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:lock-reset" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Change Password</h3>
        <p class="text-xs text-text-muted">Update your account password</p>
      </div>
    </div>
    
    <div class="space-y-4">
      <PasswordInput
        label="Current Password"
        name="currentPassword"
        value={currentPassword}
        placeholder="Enter current password"
        required
      />
      <PasswordInput
        label="New Password"
        name="newPassword"
        value={newPassword}
        placeholder="Create a strong password"
        required
        hint="Use 8+ characters with letters, numbers & symbols"
      />
      <PasswordInput
        label="Confirm New Password"
        name="confirmPassword"
        value={confirmPassword}
        placeholder="Confirm your new password"
        required
      />
      
      {#if passwordSuccess}
        <div class="p-4 bg-success/10 border border-success/30 rounded-xl text-success text-sm flex items-center gap-2">
          <Icon icon="mdi:check-circle-outline" class="w-5 h-5" />
          {passwordSuccess}
        </div>
      {/if}
      
      {#if passwordError}
        <div class="p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm">
          {passwordError}
        </div>
      {/if}
      
      <Button type="button" variant="primary" size="md" onclick={handleChangePassword} disabled={passwordLoading}>
        {passwordLoading ? 'Updating...' : 'Update Password'}
      </Button>
    </div>
  </Card>
  
  <!-- Two-Factor Authentication -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:two-factor-authentication" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Two-Factor Authentication</h3>
        <p class="text-xs text-text-muted">Add an extra layer of security</p>
      </div>
    </div>
    
    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div>
        <p class="font-medium text-text-main">2FA Status</p>
        <p class="text-sm text-text-muted">
          {twoFactorEnabled ? 'Enabled - Your account is protected' : 'Disabled - Enable for better security'}
        </p>
      </div>
      <Badge variant={twoFactorEnabled ? 'success' : 'warning'} size="lg">
        {twoFactorEnabled ? 'Enabled' : 'Disabled'}
      </Badge>
    </div>
    
    {#if twoFactorEnabled}
      <div class="mt-4 space-y-3">
        <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
          <p class="text-sm font-medium text-text-main mb-2">Recovery Codes</p>
          <p class="text-xs text-text-muted mb-3">Save these codes in a safe place.</p>
          <div class="grid grid-cols-2 gap-2">
            {#each recoveryCodes as code}
              <code class="px-3 py-2 bg-white border border-gray-200 rounded text-sm font-mono">{code}</code>
            {/each}
          </div>
        </div>
        <Button type="button" variant="outline" size="md" class="text-error border-error hover:bg-error/5" onclick={toggle2FA}>
          Disable 2FA
        </Button>
      </div>
    {:else}
      <Button type="button" variant="primary" size="md" class="mt-4" onclick={toggle2FA}>
        Enable 2FA
      </Button>
    {/if}
  </Card>
  
  <!-- Login Sessions -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:devices" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Login Sessions</h3>
        <p class="text-xs text-text-muted">Manage your active sessions</p>
      </div>
    </div>
    
    <div class="space-y-3">
      {#each sessions as session}
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p class="font-medium text-text-main">{session.device} - {session.location}</p>
            <p class="text-sm text-text-muted">Last active: {session.lastActive}</p>
            {#if session.current}
              <Badge variant="success" size="sm" className="mt-2">Current Session</Badge>
            {/if}
          </div>
          {#if !session.current}
            <Button variant="ghost" size="sm" class="text-error hover:bg-error/5" onclick={() => logoutSession(session.id)}>
              <Icon icon="mdi:logout" class="w-4 h-4 mr-1" />
              Logout
            </Button>
          {/if}
        </div>
      {/each}
    </div>
  </Card>
</div>