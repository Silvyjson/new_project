<!-- src/lib/components/wallet/TransactionTable.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  let { 
    transactions, 
    role = 'vendor',
    selectedShop = ''
  } = $props<{
    transactions: Array<{
      id: string;
      date: string;
      type: 'payment' | 'sale' | 'withdrawal' | 'refund';
      reference: string;
      amount: number;
      status: 'completed' | 'pending' | 'processing' | 'failed';
      icon: string;
      shopSlug?: string;
    }>;
    role?: 'buyer' | 'vendor';
    selectedShop?: string;
  }>();
  
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
      refund: 'mdi:restore'
    };
    return icons[type as keyof typeof icons];
  };
  
  // Filter state
  let activeFilter = $state('all');
  let dateRange = $state('30days');
  let searchQuery = $state('');
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'payment', label: 'Payments' },
    { id: 'sale', label: 'Sales' },
    { id: 'withdrawal', label: 'Withdrawals' },
    { id: 'refund', label: 'Refunds' }
  ];
  
  // Filter transactions
  let filteredTransactions = $derived(
    transactions.filter((t: any) => {
      const matchesFilter = activeFilter === 'all' || t.type === activeFilter;
      const matchesSearch = searchQuery === '' || 
        t.reference.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesShop = !selectedShop || t.shopSlug === selectedShop;
      return matchesFilter && matchesSearch && matchesShop;
    })
  );
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:history" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-h4 text-text-main">Transaction History</h3>
        <p class="text-xs text-text-muted">View all your transactions</p>
      </div>
    </div>
    
    {#if role === 'vendor'}
      <!-- Filters -->
      <div class="flex flex-wrap gap-3">
        <div class="relative">
          <input
            type="text"
            placeholder="Search by reference..."
            class="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            bind:value={searchQuery}
          />
          <Icon icon="mdi:magnify" class="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        
        <select
          class="px-4 py-2 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          bind:value={dateRange}
        >
          <option value="today">Today</option>
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="custom">Custom</option>
        </select>
        </div>
    {/if}
  </div>
  
  <!-- Filter Tabs -->
  <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
    {#each filters as filter}
      {#if !(role === 'buyer' && filter.id === 'sale' || role === 'vendor' && filter.id === 'payment')}
        <button
          onclick={() => activeFilter = filter.id}
          class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                 {activeFilter === filter.id 
                   ? 'bg-primary text-white' 
                   : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
        >
          {filter.label}
        </button>
      {/if}
    {/each}
  </div>
  
  <!-- Transaction Table (Hidden on Mobile) -->
  <div class="hidden md:block overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Date</th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Type</th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Reference</th>
          <th class="text-right py-3 px-4 text-sm font-semibold text-text-muted">Amount</th>
          <th class="text-right py-3 px-4 text-sm font-semibold text-text-muted">Status</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredTransactions as transaction}
          {@const badge = getStatusBadge(transaction.status)}
          <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="py-3 px-4 text-sm text-text-main">{formatDate(transaction.date)}</td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-2">
                <Icon icon={getTypeIcon(transaction.type)} class="w-4 h-4 text-text-muted" />
                <span class="text-sm text-text-main capitalize">{transaction.type}</span>
              </div>
            </td>
            <td class="py-3 px-4 text-sm text-text-muted font-mono">{transaction.reference}</td>
            <td class="py-3 px-4 text-right">
              <span class="text-sm font-semibold {transaction.amount > 0 ? 'text-success' : 'text-error'}">
                {transaction.amount > 0 ? '+' : ''}{formatNaira(transaction.amount)}
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Mobile List View (Visible only on Mobile) -->
  <div class="md:hidden space-y-4">
    {#each filteredTransactions as transaction}
      {@const badge = getStatusBadge(transaction.status)}
      <div class="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
              <Icon icon={getTypeIcon(transaction.type)} class="w-5 h-5 text-text-muted" />
            </div>
            <div>
              <p class="text-sm font-semibold text-text-main capitalize">{transaction.type}</p>
              <p class="text-[10px] text-text-muted">{formatDate(transaction.date)}</p>
            </div>
          </div>
          <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
        </div>
        
        <div class="flex items-center justify-between pt-2 border-t border-gray-100/50">
          <div>
            <p class="text-[10px] text-text-muted uppercase tracking-wider">Reference</p>
            <p class="text-xs font-mono text-text-main">{transaction.reference}</p>
          </div>
          <div class="text-right">
            <p class="text-[10px] text-text-muted uppercase tracking-wider">Amount</p>
            <p class="text-sm font-bold {transaction.amount > 0 ? 'text-success' : 'text-error'}">
              {transaction.amount > 0 ? '+' : ''}{formatNaira(transaction.amount)}
            </p>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Pagination -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mt-6 pt-4 border-t border-gray-200">
    <p class="text-sm text-text-muted">
      Showing {filteredTransactions.length} of {transactions.length} transactions
    </p>
    <div class="flex items-center gap-2 justify-end">
      <button class="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50" disabled>
        <Icon icon="mdi:chevron-left" class="w-5 h-5" />
      </button>
      <button class="w-9 h-9 rounded-lg bg-primary text-white font-medium">1</button>
      <button class="w-9 h-9 rounded-lg border border-gray-300 text-text-main hover:border-primary transition-colors">2</button>
      <button class="w-9 h-9 rounded-lg border border-gray-300 text-text-main hover:border-primary transition-colors">3</button>
      <span class="text-text-muted">...</span>
      <button class="w-9 h-9 rounded-lg border border-gray-300 text-text-main hover:border-primary transition-colors">
        <Icon icon="mdi:chevron-right" class="w-5 h-5" />
      </button>
    </div>
  </div>
</Card>