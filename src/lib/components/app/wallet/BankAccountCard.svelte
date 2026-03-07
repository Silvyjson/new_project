<!-- src/lib/components/wallet/BankAccountCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let account: {
    id: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    isPrimary: boolean;
    verified: boolean;
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-start justify-between mb-4">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:bank-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">{account.bankName}</h3>
        <p class="text-sm text-text-muted">**** {account.accountNumber.slice(-4)}</p>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
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
  </div>
  
  <p class="text-body text-text-main mb-6">{account.accountName}</p>
  
  <div class="flex gap-2">
    {#if !account.isPrimary}
      <Button variant="outline" size="sm">
        Set as Primary
      </Button>
    {/if}
    <Button variant="ghost" size="sm">
      <Icon icon="mdi:pencil-outline" class="w-4 h-4 mr-1" />
      Edit
    </Button>
    <Button variant="ghost" size="sm" class="text-error hover:bg-error/5">
      <Icon icon="mdi:delete-outline" class="w-4 h-4" />
    </Button>
  </div>
</Card>