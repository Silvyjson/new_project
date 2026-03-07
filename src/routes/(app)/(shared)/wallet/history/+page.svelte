<!-- src/routes/(app)/wallet/history/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import TransactionDetailModal from '$lib/components/app/wallet/TransactionDetailModal.svelte';
  import AdvancedFilters from '$lib/components/app/wallet/AdvancedFilters.svelte';
  import ExportOptions from '$lib/components/app/wallet/ExportOptions.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import { onMount } from 'svelte';
  
  // Role (in real app: from auth store)
  let role: 'buyer' | 'vendor' = 'vendor';
  
  // Filter state
  let searchQuery = '';
  let typeFilter = 'all';
  let statusFilter = 'all';
  let dateFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  let dateTo = new Date().toISOString().split('T')[0];
  let minAmount = '';
  let maxAmount = '';
  let showFilters = false;
  
  // Selected transaction for detail modal
  let selectedTransaction: any = null;
  
  // Mock transactions (in real app: fetch from API with filters)
  let allTransactions = [
    {
      id: 't_001',
      date: '2026-01-25T14:30:00Z',
      type: 'sale' as const,
      reference: '#VH-2043',
      amount: 27000,
      status: 'completed' as const,
      description: 'Order payment for Wireless Headphones + USB-C Cable',
      method: 'Card',
      orderCode: 'VH-2043',
      shop: { name: 'TechHub Store', slug: 'techhub-store' },
      buyer: { name: 'John Ade', email: 'johnade@email.com' },
      metadata: { items: '2', paymentGateway: 'Paystack' }
    },
    {
      id: 't_002',
      date: '2026-01-24T10:15:00Z',
      type: 'withdrawal' as const,
      reference: '#WD-3391',
      amount: -20000,
      status: 'processing' as const,
      description: 'Withdrawal to GTBank ****3491',
      method: 'Bank Transfer',
      metadata: { bank: 'GTBank', account: '****3491', processingTime: '1-2 business days' }
    },
    {
      id: 't_003',
      date: '2026-01-23T16:45:00Z',
      type: 'sale' as const,
      reference: '#VH-2042',
      amount: 85000,
      status: 'completed' as const,
      description: 'Order payment for Air Jordan Retro',
      method: 'Card',
      orderCode: 'VH-2042',
      shop: { name: 'Urban Kicks', slug: 'urban-kicks' },
      buyer: { name: 'Amina K.', email: 'amina.k@email.com' }
    },
    {
      id: 't_004',
      date: '2026-01-22T09:20:00Z',
      type: 'refund' as const,
      reference: '#RF-1002',
      amount: 5000,
      status: 'completed' as const,
      description: 'Refund for cancelled order #VH-2040',
      method: 'Original Payment Method',
      orderCode: 'VH-2040',
      metadata: { reason: 'Customer request', processedBy: 'System' }
    },
    {
      id: 't_005',
      date: '2026-01-21T11:00:00Z',
      type: 'sale' as const,
      reference: '#VH-2041',
      amount: 18000,
      status: 'pending' as const,
      description: 'Order payment for Organic Face Cream',
      method: 'Transfer',
      orderCode: 'VH-2041',
      shop: { name: 'Urban Kicks', slug: 'urban-kicks' },
      buyer: { name: 'Tunde M.', email: 'tunde.m@email.com' }
    },
    {
      id: 't_006',
      date: '2026-01-20T13:30:00Z',
      type: 'fee' as const,
      reference: '#FEE-8821',
      amount: -450,
      status: 'completed' as const,
      description: 'Platform service fee (2.5%)',
      metadata: { feeType: 'Transaction', rate: '2.5%' }
    }
  ];
  
  // Filter transactions
  $: filteredTransactions = allTransactions.filter(t => {
    // Search
    const matchesSearch = searchQuery === '' || 
      t.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderCode?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    
    // Status
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    
    // Date
    const txDate = new Date(t.date);
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo + 'T23:59:59') : null;
    const matchesDate = (!from || txDate >= from) && (!to || txDate <= to);
    
    // Amount
    const matchesMin = minAmount === '' || t.amount >= parseFloat(minAmount);
    const matchesMax = maxAmount === '' || t.amount <= parseFloat(maxAmount);
    
    return matchesSearch && matchesType && matchesStatus && matchesDate && matchesMin && matchesMax;
  });
  
  // Pagination
  let currentPage = 1;
  const perPage = 10;
  $: totalPages = Math.ceil(filteredTransactions.length / perPage);
  $: paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  
  // Format helpers
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };
  
  const getStatusBadge = (status: string) => {
    const badges = {
      completed: { variant: 'success' as const, label: 'Completed' },
      pending: { variant: 'warning' as const, label: 'Pending' },
      processing: { variant: 'info' as const, label: 'Processing' },
      failed: { variant: 'danger' as const, label: 'Failed' }
    };
    return badges[status as keyof typeof badges];
  };
  
  const getTypeIcon = (type: string) => {
    const icons = {
      payment: 'mdi:cart-outline',
      sale: 'mdi:store-outline',
      withdrawal: 'mdi:bank-transfer-out',
      refund: 'mdi:restore',
      topup: 'mdi:plus-circle-outline',
      fee: 'mdi:credit-card-outline'
    };
    return icons[type as keyof typeof icons];
  };
  
  const getTypeLabel = (type: string) => {
    const labels = {
      payment: 'Payment',
      sale: 'Sale',
      withdrawal: 'Withdrawal',
      refund: 'Refund',
      topup: 'Top-up',
      fee: 'Fee'
    };
    return labels[type as keyof typeof labels];
  };
  
  // Handle filter apply event
  const handleApplyFilters = (e: CustomEvent) => {
    const filters = e.detail;
    searchQuery = filters.searchQuery;
    typeFilter = filters.typeFilter;
    statusFilter = filters.statusFilter;
    dateFrom = filters.dateFrom;
    dateTo = filters.dateTo;
    minAmount = filters.minAmount;
    maxAmount = filters.maxAmount;
    currentPage = 1;
  };
  
  // Listen for filter events
  onMount(() => {
    const handler = (e: Event) => handleApplyFilters(e as CustomEvent);
    window.addEventListener('apply-filters', handler as EventListener);
    return () => window.removeEventListener('apply-filters', handler as EventListener);
  });
</script>

<svelte:head>
  <title>Transaction History | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8 space-y-8">
  
  <!-- Page Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:history" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Transaction History</h1>
        <p class="text-body text-text-muted">View and manage all your transactions</p>
      </div>
    </div>
    
    <div class="flex gap-3">
      <Button variant="outline" size="md" onclick={() => showFilters = !showFilters}>
        <Icon icon="mdi:filter-outline" class="w-4 h-4 mr-2" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>
      <Button variant="primary" size="md" href="/wallet">
        <Icon icon="mdi:arrow-left" class="w-4 h-4 mr-2" />
        Back to Wallet
      </Button>
    </div>
  </section>
  
  <!-- Advanced Filters (Collapsible) -->
  {#if showFilters}
    <section in:fade={{ duration: 400 }}>
      <AdvancedFilters
        role={role}
        searchQuery={searchQuery}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        dateFrom={dateFrom}
        dateTo={dateTo}
        minAmount={minAmount}
        maxAmount={maxAmount}
        on:apply-filters={handleApplyFilters}
      />
    </section>
  {/if}
  
  <!-- Quick Stats -->
  <section class="grid md:grid-cols-4 gap-4" in:fade={{ duration: 400, delay: 100 }}>
    <Card className="border border-gray-200 p-4">
      <p class="text-sm text-text-muted">Total Transactions</p>
      <p class="text-2xl font-bold text-text-main">{filteredTransactions.length}</p>
    </Card>
    <Card className="border border-gray-200 p-4">
      <p class="text-sm text-text-muted">Total Inflow</p>
      <p class="text-2xl font-bold text-success">
        {formatNaira(filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0))}
      </p>
    </Card>
    <Card className="border border-gray-200 p-4">
      <p class="text-sm text-text-muted">Total Outflow</p>
      <p class="text-2xl font-bold text-error">
        {formatNaira(filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))}
      </p>
    </Card>
    <Card className="border border-gray-200 p-4">
      <p class="text-sm text-text-muted">Net Balance</p>
      <p class="text-2xl font-bold {filteredTransactions.reduce((sum, t) => sum + t.amount, 0) >= 0 ? 'text-success' : 'text-error'}">
        {formatNaira(filteredTransactions.reduce((sum, t) => sum + t.amount, 0))}
      </p>
    </Card>
  </section>
  
  <!-- Export Options -->
  <section in:fade={{ duration: 400, delay: 200 }}>
    <ExportOptions
      dateFrom={dateFrom}
      dateTo={dateTo}
      totalTransactions={filteredTransactions.length}
    />
  </section>
  
  <!-- Transaction Table -->
  <section in:fade={{ duration: 400, delay: 300 }}>
    <Card className="border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Date</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Type</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Reference</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Description</th>
              <th class="text-right py-3 px-4 text-sm font-semibold text-text-muted">Amount</th>
              <th class="text-right py-3 px-4 text-sm font-semibold text-text-muted">Status</th>
              <th class="text-center py-3 px-4 text-sm font-semibold text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each paginatedTransactions as transaction}
              {@const badge = getStatusBadge(transaction.status)}
              <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" on:click={() => selectedTransaction = transaction}>
                <td class="py-3 px-4 text-sm text-text-main">{formatDate(transaction.date)}</td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <Icon icon={getTypeIcon(transaction.type)} class="w-4 h-4 text-text-muted" />
                    <span class="text-sm text-text-main">{getTypeLabel(transaction.type)}</span>
                  </div>
                </td>
                <td class="py-3 px-4 text-sm font-mono text-text-muted">{transaction.reference}</td>
                <td class="py-3 px-4 text-sm text-text-muted max-w-xs truncate">{transaction.description}</td>
                <td class="py-3 px-4 text-right">
                  <span class="text-sm font-semibold {transaction.amount > 0 ? 'text-success' : 'text-error'}">
                    {transaction.amount > 0 ? '+' : ''}{formatNaira(transaction.amount)}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
                </td>
                <td class="py-3 px-4 text-center">
                  <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View details">
                    <Icon icon="mdi:eye-outline" class="w-4 h-4 text-text-muted" />
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      {#if paginatedTransactions.length === 0}
        <div class="py-16 text-center">
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:history" class="w-8 h-8 text-text-muted" />
          </div>
          <h3 class="text-h3 text-text-main mb-2">No transactions found</h3>
          <p class="text-body text-text-muted mb-6">Try adjusting your filters or date range.</p>
          <Button variant="outline" onclick={() => {
            searchQuery = '';
            typeFilter = 'all';
            statusFilter = 'all';
            minAmount = '';
            maxAmount = '';
            const now = new Date();
            dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            dateTo = now.toISOString().split('T')[0];
          }}>
            Reset Filters
          </Button>
        </div>
      {/if}
    </Card>
    
    <!-- Pagination -->
    {#if totalPages > 1}
      <div class="flex items-center justify-between mt-6">
        <p class="text-sm text-text-muted">
          Showing {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filteredTransactions.length)} of {filteredTransactions.length}
        </p>
        <div class="flex items-center gap-2">
          <button
            on:click={() => currentPage = Math.max(1, currentPage - 1)}
            disabled={currentPage === 1}
            class="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon icon="mdi:chevron-left" class="w-5 h-5" />
          </button>
          {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
            {#if page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)}
              <button
                on:click={() => currentPage = page}
                class="w-9 h-9 rounded-lg {currentPage === page ? 'bg-primary text-white' : 'border border-gray-300 text-text-main hover:border-primary'} transition-colors font-medium"
              >
                {page}
              </button>
            {:else if page === currentPage - 2 || page === currentPage + 2}
              <span class="text-text-muted">...</span>
            {/if}
          {/each}
          <button
            on:click={() => currentPage = Math.min(totalPages, currentPage + 1)}
            disabled={currentPage === totalPages}
            class="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon icon="mdi:chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>
    {/if}
  </section>
</div>

<!-- Transaction Detail Modal -->
{#if selectedTransaction}
  <TransactionDetailModal
    transaction={selectedTransaction}
    role={role}
    onClose={() => selectedTransaction = null}
  />
{/if}

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