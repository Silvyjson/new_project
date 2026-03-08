<!-- src/lib/components/settings/BankAccounts.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import Input from '$lib/components/common/Input.svelte';
  
  export let accounts: Array<{
    id: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    isPrimary: boolean;
    verified: boolean;
  }>;
  
  let showAddForm = false;
  
  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this bank account?')) {
      console.log(`Remove bank account ${id}`);
    }
  };
  
  const handleSetPrimary = (id: string) => {
    console.log(`Set primary account ${id}`);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:bank-outline" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Bank Accounts</h3>
        <p class="text-xs text-text-muted">Manage payout accounts for withdrawals</p>
      </div>
    </div>
    <Button variant="primary" size="md" onclick={() => showAddForm = true}>
      <Icon icon="mdi:bank-plus" class="w-4 h-4 mr-2" />
      Add Bank Account
    </Button>
  </div>
  
  {#if showAddForm}
    <div class="p-6 bg-gray-50 rounded-xl mb-6">
      <h4 class="font-semibold text-text-main mb-4">Add New Bank Account</h4>
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label for="bankName" class="block text-sm font-medium text-text-main mb-1.5">Bank Name</label>
          <select class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body">
            <option>GTBank</option>
            <option>Zenith Bank</option>
            <option>Access Bank</option>
            <option>UBA</option>
            <option>First Bank</option>
          </select>
        </div>
        <Input label="Account Name" name="accountName" required />
        <Input label="Account Number" name="accountNumber" type="text" maxlength="10" class="md:col-span-2" required />
      </div>
      <div class="flex gap-3 mt-6">
        <Button variant="primary" size="md">Add Account</Button>
        <Button variant="outline" size="md" onclick={() => showAddForm = false}>Cancel</Button>
      </div>
    </div>
  {/if}
  
  <div class="space-y-4">
    {#each accounts as account}
      <Card className="border border-gray-200 p-5">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <h4 class="font-semibold text-text-main">{account.bankName}</h4>
              {#if account.isPrimary}
                <Badge variant="success" size="sm">Primary</Badge>
              {/if}
              {#if account.verified}
                <Badge variant="success" size="sm">
                  <Icon icon="mdi:check-circle" class="w-3 h-3 inline mr-1" />
                  Verified
                </Badge>
              {/if}
            </div>
            <div class="text-sm text-text-muted space-y-1">
              <p>Account Name: {account.accountName}</p>
              <p>Account Number: **** {account.accountNumber.slice(-4)}</p>
            </div>
          </div>
          <div class="flex gap-2">
            {#if !account.isPrimary}
              <Button variant="ghost" size="sm" onclick={() => handleSetPrimary(account.id)}>
                Set Primary
              </Button>
            {/if}
            <Button variant="ghost" size="sm" class="text-error hover:bg-error/5" onclick={() => handleRemove(account.id)}>
              <Icon icon="mdi:delete-outline" class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    {/each}
    
    {#if accounts.length === 0}
      <div class="text-center py-8">
        <Icon icon="mdi:bank-off-outline" class="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p class="text-text-muted">No bank accounts added</p>
        <p class="text-sm text-text-muted mb-4">Add a bank account to receive withdrawals</p>
        <Button variant="primary" size="md" onclick={() => showAddForm = true}>
          <Icon icon="mdi:bank-plus" class="w-4 h-4 mr-2" />
          Add Your First Account
        </Button>
      </div>
    {/if}
  </div>
</Card>