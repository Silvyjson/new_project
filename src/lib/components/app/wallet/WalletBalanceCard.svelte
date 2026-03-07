<!-- src/lib/components/wallet/WalletBalanceCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let role: 'buyer' | 'vendor' = 'vendor';
  export let balance: {
    available: number;
    pending: number;
    withdrawable: number;
  };
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  let showWithdrawModal = false;
</script>

<Card className="border border-gray-200 p-6 md:p-8 bg-gradient-to-br from-primary to-primary-hover text-white">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
        <Icon icon="mdi:wallet-outline" class="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 class="text-lg font-semibold">Wallet Balance</h2>
        <p class="text-sm text-white/80">
          {role === 'vendor' ? 'Manage your earnings' : 'Manage your funds'}
        </p>
      </div>
    </div>
    
    <!-- {#if role === 'vendor'}
      <Button variant="ghost" size="sm" class="text-white hover:bg-white/10" onclick={() => showWithdrawModal = true}>
        <Icon icon="mdi:bank-transfer-out" class="w-4 h-4 mr-2" />
        Withdraw
      </Button>
    {/if} -->
  </div>
  
  <!-- Balance Display -->
  <div class="mb-6">
    <p class="text-sm text-white/80 mb-2">Available Balance</p>
    <p class="text-4xl md:text-5xl font-bold">{formatNaira(balance.available)}</p>
  </div>
  
  <!-- Balance Details -->
  <div class="grid grid-cols-2 gap-4 mb-6">
    <div class="p-3 bg-white/10 rounded-xl">
      <p class="text-xs text-white/80 mb-1">
        {role === 'vendor' ? 'Pending Balance' : 'Refund Credits'}
      </p>
      <p class="text-lg font-semibold">{formatNaira(balance.pending)}</p>
    </div>
    <div class="p-3 bg-white/10 rounded-xl">
      <p class="text-xs text-white/80 mb-1">
        {role === 'vendor' ? 'Withdrawable' : 'Total Spent'}
      </p>
      <p class="text-lg font-semibold">{formatNaira(balance.withdrawable)}</p>
    </div>
  </div>
  
  <!-- Quick Actions -->
  <div class="flex flex-wrap gap-3">
    {#if role === 'buyer'}
      <Button variant="secondary" size="md" class="text-primary hover:bg-gray-100">
        <Icon icon="mdi:plus-circle-outline" class="w-4 h-4 mr-2" />
        Add Funds
      </Button>
    {:else if role === 'vendor'}
      <Button variant="secondary" size="md" class="text-primary hover:bg-gray-100" onclick={() => showWithdrawModal = true}>
        <Icon icon="mdi:bank-transfer-out" class="w-4 h-4 mr-2" />
        Withdraw
      </Button>
    {/if}
    <Button variant="secondary" size="md" class="text-primary hover:bg-gray-100" href="/wallet/history">
      <Icon icon="mdi:history" class="w-4 h-4 mr-2" />
      Transaction History
    </Button>
  </div>
</Card>

<!-- Withdraw Modal (Vendor Only) -->
{#if role === 'vendor' && showWithdrawModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-dark/45" on:click={() => showWithdrawModal = false}></div>
    <Card className="relative bg-surface p-6 w-full max-w-lg">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-text-main">Withdraw Funds</h3>
        <button on:click={() => showWithdrawModal = false} class="p-2 hover:bg-gray-100 rounded-lg">
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      
      <div class="space-y-4">
        <div class="p-4 bg-primary/5 rounded-xl">
          <p class="text-sm text-text-muted mb-1">Available Balance</p>
          <p class="text-2xl font-bold text-primary">{formatNaira(balance.available)}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-text-main mb-1.5">Withdrawal Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-text-main mb-1.5">Payout Method</label>
          <select class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body">
            <option>Bank Transfer</option>
          </select>
        </div>
        
        <Button variant="primary" size="lg" class="w-full">
          <Icon icon="mdi:cash-fast" class="w-5 h-5 mr-2" />
          Request Withdrawal
        </Button>
        
        <p class="text-xs text-text-muted text-center">
          Withdrawals are processed within 1-2 business days
        </p>
      </div>
    </Card>
  </div>
{/if}