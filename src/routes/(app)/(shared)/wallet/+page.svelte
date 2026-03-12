<!-- src/routes/(app)/wallet/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import WalletBalanceCard from '$lib/components/app/shared/wallet/WalletBalanceCard.svelte';
  import TransactionTable from '$lib/components/app/shared/wallet/TransactionTable.svelte';
  import BankAccountCard from '$lib/components/app/shared/wallet/BankAccountCard.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import { formatNaira } from '$lib/utils/format';
  import MetricRow from '$lib/components/app/grid/MetricRow.svelte';
  
  // Role (in real app: from auth store)
  let role = 'vendor' as 'buyer' | 'vendor';
  
  // Mock balance data
  let balance = {
    available: 124500,
    pending: 34200,
    withdrawable: 124500
  };
  
  // Mock insights
  let insights = {
    totalEarned: 2430000,
    totalWithdrawn: 1870000,
    pendingClearance: 34200,
    refundBalance: 12500
  };

    $: kpis = role === 'vendor' ? [
    {
      label: 'Total Earned',
      value: formatNaira(insights.totalEarned || 0),
      icon: 'mdi:cash-multiple'
    },
    {
      label: 'Total Withdrawn',
      value: formatNaira(insights.totalWithdrawn || 0),
      icon: 'mdi:bank-outline'
    },
    {
      label: 'Pending Clearance',
      value: formatNaira(insights.pendingClearance || 0),
      icon: 'mdi:clock-outline',
      valueClass: 'text-warning'
    },
    {
      label: 'This Month',
      value: formatNaira(245000),
      icon: 'mdi:calendar-outline'
    }
  ] : [
    {
      label: 'Total Spent',
      value: formatNaira(124500),
      icon: 'mdi:cart-outline'
    },
    {
      label: 'Refund Balance',
      value: formatNaira(insights.refundBalance || 12500),
      icon: 'mdi:restore',
      valueClass: 'text-success'
    },
    {
      label: 'Saved Cards',
      value: '2',
      icon: 'mdi:credit-card-outline'
    },
    {
      label: 'Active Orders',
      value: '3',
      icon: 'mdi:package-variant-closed'
    }
  ];
  
  // Mock transactions
  let transactions = [
    { id: 't_001', date: '2026-01-25', type: 'sale' as const, reference: '#VH-2043', amount: 45000, status: 'completed' as const, icon: 'mdi:store-outline' },
    { id: 't_002', date: '2026-01-24', type: 'withdrawal' as const, reference: '#WD-3391', amount: -20000, status: 'processing' as const, icon: 'mdi:bank-transfer-out' },
    { id: 't_003', date: '2026-01-23', type: 'sale' as const, reference: '#VH-2042', amount: 32000, status: 'completed' as const, icon: 'mdi:store-outline' },
    { id: 't_004', date: '2026-01-22', type: 'refund' as const, reference: '#RF-1002', amount: 5000, status: 'completed' as const, icon: 'mdi:restore' },
    { id: 't_005', date: '2026-01-21', type: 'sale' as const, reference: '#VH-2041', amount: 18000, status: 'pending' as const, icon: 'mdi:store-outline' }
  ];
  
  // Mock bank accounts
  let bankAccounts = [
    {
      id: 'b_001',
      bankName: 'GTBank',
      accountNumber: '0123456789',
      accountName: 'Divine Stores',
      isPrimary: true,
      verified: true
    }
  ];
</script>

<svelte:head>
  <title>Wallet | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <!-- Section 1: Page Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:wallet-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Wallet</h1>
        <p class="text-body text-text-muted">Manage your balance, payments, and payouts</p>
      </div>
    </div>
  </section>
  
  <!-- Section 2: Balance Card -->
  <section in:fade={{ duration: 400, delay: 100 }}>
    <WalletBalanceCard role={role} balance={balance} />
  </section>
  
  <!-- Section 3: Wallet Insights -->
  <section in:fade={{ duration: 400, delay: 200 }}>
    <MetricRow metrics={kpis.map(kpi => ({...kpi}))} />
  </section>
  
  <!-- Section 4: Transaction History -->
  <section in:fade={{ duration: 400, delay: 300 }}>
    <TransactionTable role={role} transactions={transactions} />
  </section>
  
  <!-- Section 5: Vendor-Only Sections -->
  {#if role === 'vendor'}
    <!-- Bank Accounts -->
    <!-- <section in:fade={{ duration: 400, delay: 400 }}>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-text-main">Bank Accounts</h2>
        <Button variant="outline" size="sm">
          <Icon icon="mdi:bank-plus" class="w-4 h-4 mr-2" />
          Add Bank
        </Button>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        {#each bankAccounts as account}
          <BankAccountCard {account} />
        {/each}
      </div>
    </section> -->
    {/if}
  
  <!-- Section 6: Buyer-Only Sections -->
  {#if role === 'buyer'}
    <!-- Payment Methods -->
    <!-- <section in:fade={{ duration: 400, delay: 400 }}>
      <Card className="border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon icon="mdi:credit-card-outline" class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 class="font-semibold text-text-main">Payment Methods</h3>
              <p class="text-xs text-text-muted">Manage your saved cards</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Icon icon="mdi:credit-card-plus-outline" class="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
        
        <div class="space-y-4">
          <div class="p-4 border border-gray-200 rounded-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                <div>
                  <p class="font-medium text-text-main">**** **** **** 4421</p>
                  <p class="text-xs text-text-muted">Expires 10/27</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <Badge variant="success" size="sm">Default</Badge>
                <Button variant="ghost" size="sm">
                  <Icon icon="mdi:pencil-outline" class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section> -->
  {/if}
</main>

<!-- <style>
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    [in:fly] {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style> -->