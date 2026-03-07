<!-- src/lib/components/wallet/WalletInsights.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let role: 'buyer' | 'vendor' = 'vendor';
  export let insights: {
    totalEarned?: number;
    totalWithdrawn?: number;
    pendingClearance?: number;
    refundBalance?: number;
  };
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(amount);
  };
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {#if role === 'vendor'}
    <!-- Total Earned -->
    <Card className="border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-text-muted mb-1">Total Earned</p>
          <p class="text-2xl font-bold text-text-main">{formatNaira(insights.totalEarned || 0)}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
          <Icon icon="mdi:cash-multiple" class="w-6 h-6 text-success" />
        </div>
      </div>
    </Card>
    
    <!-- Total Withdrawn -->
    <Card className="border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-text-muted mb-1">Total Withdrawn</p>
          <p class="text-2xl font-bold text-text-main">{formatNaira(insights.totalWithdrawn || 0)}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:bank-outline" class="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
    
    <!-- Pending Clearance -->
    <Card className="border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-text-muted mb-1">Pending Clearance</p>
          <p class="text-2xl font-bold text-warning">{formatNaira(insights.pendingClearance || 0)}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
          <Icon icon="mdi:clock-outline" class="w-6 h-6 text-warning" />
        </div>
      </div>
    </Card>
    
    <!-- Refund Credits (Buyer) -->
    <Card className="border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-text-muted mb-1">
            {role === 'buyer' ? 'Refund Balance' : 'This Month'}
          </p>
          <p class="text-2xl font-bold text-text-main">
            {formatNaira(role === 'buyer' ? (insights.refundBalance || 0) : 245000)}
          </p>
        </div>
        <div class="w-12 h-12 rounded-xl {role === 'buyer' ? 'bg-success/10' : 'bg-primary/10'} flex items-center justify-center">
          <Icon icon={role === 'buyer' ? 'mdi:restore' : 'mdi:calendar-outline'} class="w-6 h-6 {role === 'buyer' ? 'text-success' : 'text-primary'}" />
        </div>
      </div>
    </Card>
  {:else}
    <!-- Buyer Insights -->
    <Card className="border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-text-muted mb-1">Total Spent</p>
          <p class="text-2xl font-bold text-text-main">{formatNaira(124500)}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:cart-outline" class="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
    
    <Card className="border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-text-muted mb-1">Refund Balance</p>
          <p class="text-2xl font-bold text-success">{formatNaira(insights.refundBalance || 12500)}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
          <Icon icon="mdi:restore" class="w-6 h-6 text-success" />
        </div>
      </div>
    </Card>
    
    <Card className="border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-text-muted mb-1">Saved Cards</p>
          <p class="text-2xl font-bold text-text-main">2</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:credit-card-outline" class="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
    
    <Card className="border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-text-muted mb-1">Active Orders</p>
          <p class="text-2xl font-bold text-text-main">3</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:package-variant-closed" class="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  {/if}
</div>