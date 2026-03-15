<!-- src/routes/(app)/wallet/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import WalletBalanceCard from '$lib/components/app/shared/wallet/WalletBalanceCard.svelte';
  import TransactionTable from '$lib/components/app/shared/wallet/TransactionTable.svelte';
  import { formatNaira } from '$lib/utils/format';
  import MetricRow from '$lib/components/app/grid/MetricRow.svelte';
  import { auth } from '$lib/state/auth.svelte';
  
  let selectedShop = $state('');
  let searchQuery = $state('');
  
  // Mock balance data
  let baseBalance = {
    available: 124500,
    pending: 34200,
    withdrawable: 124500
  };

  let balance = $derived(!selectedShop 
    ? baseBalance 
    : {
        available: selectedShop === 'urban-kicks' ? 84000 : 40500,
        pending: selectedShop === 'urban-kicks' ? 12000 : 22200,
        withdrawable: selectedShop === 'urban-kicks' ? 84000 : 40500
      }
  );
  
  // Mock insights
  let baseInsights = {
    totalEarned: 2430000,
    totalWithdrawn: 1870000,
    pendingClearance: 34200,
    refundBalance: 12500
  };

  let insights = $derived(!selectedShop
    ? baseInsights
    : {
        totalEarned: selectedShop === 'urban-kicks' ? 1430000 : 1000000,
        totalWithdrawn: selectedShop === 'urban-kicks' ? 1000000 : 870000,
        pendingClearance: selectedShop === 'urban-kicks' ? 12000 : 22200,
        refundBalance: selectedShop === 'urban-kicks' ? 7500 : 5000
      }
  );

  let kpis = $derived(auth.role === 'vendor' ? [
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
  ]);
  
  // Mock transactions
  let transactions = $state([
    { id: 't_001', date: '2026-01-25', type: 'sale' as const, reference: '#VH-2043', amount: 45000, status: 'completed' as const, icon: 'mdi:store-outline' },
    { id: 't_002', date: '2026-01-24', type: 'withdrawal' as const, reference: '#WD-3391', amount: -20000, status: 'processing' as const, icon: 'mdi:bank-transfer-out' },
    { id: 't_003', date: '2026-01-23', type: 'sale' as const, reference: '#VH-2042', amount: 32000, status: 'completed' as const, icon: 'mdi:store-outline' },
    { id: 't_004', date: '2026-01-22', type: 'refund' as const, reference: '#RF-1002', amount: 5000, status: 'completed' as const, icon: 'mdi:restore' },
    { id: 't_005', date: '2026-01-21', type: 'sale' as const, reference: '#VH-2041', amount: 18000, status: 'pending' as const, icon: 'mdi:store-outline' }
  ]);
  
  // Mock shops for filtering
  let shops = $state([
    { id: '1', name: 'Urban Kicks', slug: 'urban-kicks' },
    { id: '2', name: 'Bella Beauty', slug: 'bella-beauty' },
    { id: '3', name: 'TechHub Store', slug: 'techhub-store' }
  ]);

  // Update transactions with shop slugs
  $effect(() => {
    transactions.forEach((t, i) => {
      (t as any).shopSlug = i % 2 === 0 ? 'urban-kicks' : 'bella-beauty';
    });
  });
</script>

<svelte:head>
  <title>Wallet | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:wallet-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Wallet</h1>
        <p class="text-body text-text-muted">Manage your balance, payments, and payouts</p>
      </div>
    </div>

    <div class="relative">
      <select
        class="appearance-none px-4 py-2.5 pr-10 rounded-xl border-2 border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
        value={selectedShop}
        onchange={(e) => {
          selectedShop = (e.currentTarget as HTMLSelectElement).value;
          searchQuery = '';
        }}
      >
        <option value="">All Shops</option>
        {#each shops as shop}
          <option value={shop.slug}>
            {shop.name}
          </option>
        {/each}
      </select>
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon icon="mdi:chevron-down" class="w-5 h-5 text-text-muted" />
      </div>
    </div>
  </section>

  <!-- Section 2: Balance Card -->
  <section in:fade={{ duration: 400, delay: 100 }}>
    <WalletBalanceCard role={auth.role} balance={balance} />
  </section>
  
  <!-- Section 3: Wallet Insights -->
  <section in:fade={{ duration: 400, delay: 200 }}>
    <MetricRow metrics={kpis.map(kpi => ({...kpi}))} />
  </section>
  
  <!-- Section 4: Transaction History -->
  <section id="history" in:fade={{ duration: 400, delay: 300 }}>
    <TransactionTable role={auth.role} transactions={transactions} {selectedShop} />
  </section>
</main>