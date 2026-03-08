<!-- src/routes/(app)/wallet/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import WalletBalanceCard from '$lib/components/app/shared/wallet/WalletBalanceCard.svelte';
  import WalletInsights from '$lib/components/app/shared/wallet/WalletInsights.svelte';
  import TransactionTable from '$lib/components/app/shared/wallet/TransactionTable.svelte';
  import BankAccountCard from '$lib/components/app/shared/wallet/BankAccountCard.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  // Role (in real app: from auth store)
  let role: 'buyer' | 'vendor' = 'vendor';
  
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
    <WalletInsights role={role} insights={insights} />
  </section>
  
  <!-- Section 4: Transaction History -->
  <section in:fade={{ duration: 400, delay: 300 }}>
    <TransactionTable role={role} transactions={transactions} />
  </section>
  
  <!-- Section 5: Vendor-Only Sections -->
  {#if role === 'vendor'}
    <!-- Bank Accounts -->
    <section in:fade={{ duration: 400, delay: 400 }}>
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
    </section>
    
    <!-- Payout Status -->
    <!-- <section in:fade={{ duration: 400, delay: 500 }}>
      <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon icon="mdi:progress-clock" class="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 class="font-semibold text-text-main">Recent Withdrawal</h3>
            <p class="text-xs text-text-muted">Track your payout status</p>
          </div>
        </div>
        
        <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm text-text-muted">Withdrawal Request</p>
              <p class="text-2xl font-bold text-primary">₦20,000</p>
            </div>
            <Badge variant="info" size="lg">Processing</Badge>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-muted">Requested</span>
              <span class="text-text-main">Jun 7, 2026</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-muted">Status</span>
              <span class="text-text-main">Processing</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-muted">Expected</span>
              <span class="text-text-main">1-2 business days</span>
            </div>
          </div>
        </div>
      </Card>
    </section> -->
    
    <!-- Security Section -->
    <!-- <section in:fade={{ duration: 400, delay: 600 }}>
      <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon icon="mdi:shield-check-outline" class="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 class="font-semibold text-text-main">Security</h3>
            <p class="text-xs text-text-muted">Protect your account</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-success/5 rounded-xl">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-success" />
              <div>
                <p class="font-medium text-text-main">Identity Verified</p>
                <p class="text-xs text-text-muted">Your business is verified</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:two-factor-authentication" class="w-5 h-5 text-text-muted" />
              <div>
                <p class="font-medium text-text-main">Two-Factor Authentication</p>
                <p class="text-xs text-text-muted">Add an extra layer of security</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </div>
      </Card>
    </section> -->
  {/if}
  
  <!-- Section 6: Buyer-Only Sections -->
  {#if role === 'buyer'}
    <!-- Payment Methods -->
    <section in:fade={{ duration: 400, delay: 400 }}>
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
    </section>
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