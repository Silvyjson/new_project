<!-- src/lib/components/settings/AccountManagement.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  let showDeleteConfirm = false;
  let deleteConfirmation = '';
  
  const handleDownloadData = () => {
    alert('Preparing your account data for download...');
  };
  
  const handleDeactivate = () => {
    if (confirm('Are you sure you want to deactivate your account?')) {
      console.log('Deactivate account');
    }
  };
  
  const handleDelete = () => {
    if (deleteConfirmation === 'DELETE') {
      console.log('Delete account');
    }
  };
</script>

<div class="space-y-6">
  
  <!-- Download Account Data -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:download" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Download Account Data</h3>
        <p class="text-xs text-text-muted">Get a copy of your personal data</p>
      </div>
    </div>
    <p class="text-sm text-text-muted mb-4">
      Request a download of all your personal data, including orders and profile information.
    </p>
    <Button variant="outline" size="md" onclick={handleDownloadData}>
      <Icon icon="mdi:download" class="w-4 h-4 mr-2" />
      Request Data Download
    </Button>
  </Card>
  
  <!-- Deactivate Account -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
        <Icon icon="mdi:account-off-outline" class="w-5 h-5 text-warning" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Deactivate Account</h3>
        <p class="text-xs text-text-muted">Temporarily disable your account</p>
      </div>
    </div>
    <p class="text-sm text-text-muted mb-4">
      Your profile will be hidden, but you can reactivate anytime. Your data will be preserved.
    </p>
    <Button variant="outline" size="md" class="text-warning border-warning hover:bg-warning/5" onclick={handleDeactivate}>
      Deactivate Account
    </Button>
  </Card>
  
  <!-- Delete Account (Danger Zone) -->
  <Card className="border border-error p-6 bg-error/5">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-error/20 flex items-center justify-center">
        <Icon icon="mdi:delete-alert-outline" class="w-5 h-5 text-error" />
      </div>
      <div>
        <h3 class="font-semibold text-error">Delete Account</h3>
        <p class="text-xs text-text-muted">Permanently delete your account and all data</p>
      </div>
    </div>
    
    {#if !showDeleteConfirm}
      <p class="text-sm text-text-muted mb-4">
        This action cannot be undone. All your data, orders, and shops will be permanently deleted.
      </p>
      <Button variant="outline" size="md" class="text-error border-error hover:bg-error/10" onclick={() => showDeleteConfirm = true}>
        <Icon icon="mdi:delete-alert-outline" class="w-4 h-4 mr-2" />
        Delete Account
      </Button>
    {:else}
      <div class="space-y-4">
        <div class="p-4 bg-error/10 border border-error/30 rounded-xl">
          <p class="text-sm text-error font-medium mb-2">⚠️ This action cannot be undone</p>
          <p class="text-sm text-text-muted">
            Type <strong>DELETE</strong> in the box below to confirm account deletion.
          </p>
        </div>
        
        <input
          type="text"
          placeholder="Type DELETE to confirm"
          class="w-full px-4 py-3 rounded-xl border border-error focus:border-error focus:ring-2 focus:ring-error/20 outline-none transition-all text-body font-mono"
          bind:value={deleteConfirmation}
        />
        
        <div class="flex gap-3">
          <Button variant="primary" size="md" class="bg-error hover:bg-error-hover" onclick={handleDelete} disabled={deleteConfirmation !== 'DELETE'}>
            Confirm Delete
          </Button>
          <Button variant="outline" size="md" onclick={() => { showDeleteConfirm = false; deleteConfirmation = ''; }}>
            Cancel
          </Button>
        </div>
      </div>
    {/if}
  </Card>
</div>