<!-- src/lib/components/wallet/TransactionDetailModal.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let transaction: {
    id: string;
    date: string;
    type: 'payment' | 'sale' | 'withdrawal' | 'refund' | 'topup' | 'fee';
    reference: string;
    amount: number;
    status: 'completed' | 'pending' | 'processing' | 'failed';
    description: string;
    method?: string;
    orderCode?: string;
    shop?: {
      name: string;
      slug: string;
    };
    buyer?: {
      name: string;
      email: string;
    };
    metadata?: Record<string, string>;
  };
  
  export let role: 'buyer' | 'vendor' = 'vendor';
  export let onClose: () => void;
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      payment: 'Order Payment',
      sale: 'Shop Sale',
      withdrawal: 'Withdrawal',
      refund: 'Refund',
      topup: 'Wallet Top-up',
      fee: 'Service Fee'
    };
    return labels[type as keyof typeof labels];
  };

  const badge = getStatusBadge(transaction.status)
</script>

<!-- Modal Overlay -->
<div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-dark/45 backdrop-blur-sm" onclick={onClose}></div>
  
  <!-- Modal Content -->
  <Card className="relative bg-surface p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon={getTypeIcon(transaction.type)} class="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-text-main">{getTypeLabel(transaction.type)}</h3>
          <p class="text-sm text-text-muted">{transaction.reference}</p>
        </div>
      </div>
      <button onclick={onClose} class="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Transaction Details -->
    <div class="space-y-6">
      <!-- Amount & Status -->
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p class="text-sm text-text-muted mb-1">Amount</p>
          <p class="text-3xl font-bold {transaction.amount > 0 ? 'text-success' : 'text-error'}">
            {transaction.amount > 0 ? '+' : ''}{formatNaira(transaction.amount)}
          </p>
        </div>
        <Badge variant={badge.variant} size="lg">{badge.label}</Badge>
      </div>
      
      <!-- Date & Time -->
      <div class="flex items-center gap-3 text-sm">
        <Icon icon="mdi:calendar-clock-outline" class="w-5 h-5 text-text-muted" />
        <span class="text-text-main">{formatDate(transaction.date)}</span>
      </div>
      
      <!-- Description -->
      <div>
        <p class="text-sm font-medium text-text-main mb-2">Description</p>
        <p class="text-body text-text-muted">{transaction.description}</p>
      </div>
      
      <!-- Order Reference (if applicable) -->
      {#if transaction.orderCode}
        <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
          <p class="text-sm font-medium text-text-main mb-2">Related Order</p>
          <a
            href="/orders/{transaction.orderCode}"
            class="text-primary font-medium hover:underline flex items-center gap-2"
            target="_blank"
          >
            <Icon icon="mdi:package-variant" class="w-4 h-4" />
            Order #{transaction.orderCode}
          </a>
        </div>
      {/if}
      
      <!-- Shop Reference (Vendor View) -->
      {#if role === 'vendor' && transaction.shop}
        <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
          <p class="text-sm font-medium text-text-main mb-2">Shop</p>
          <a
            href="/my-shop/{transaction.shop.slug}"
            class="text-primary font-medium hover:underline flex items-center gap-2"
          >
            <Icon icon="mdi:store-outline" class="w-4 h-4" />
            {transaction.shop.name}
          </a>
        </div>
      {/if}
      
      <!-- Buyer Reference (Vendor View) -->
      {#if role === 'vendor' && transaction.buyer}
        <div class="p-4 bg-gray-50 rounded-xl">
          <p class="text-sm font-medium text-text-main mb-2">Customer</p>
          <div class="space-y-1">
            <p class="text-body text-text-main">{transaction.buyer.name}</p>
            <p class="text-sm text-text-muted">{transaction.buyer.email}</p>
          </div>
        </div>
      {/if}
      
      <!-- Payment Method -->
      {#if transaction.method}
        <div class="flex items-center gap-3 text-sm">
          <Icon icon="mdi:credit-card-outline" class="w-5 h-5 text-text-muted" />
          <span class="text-text-main">Paid via {transaction.method}</span>
        </div>
      {/if}
      
      <!-- Additional Metadata -->
      {#if transaction.metadata}
        <div class="p-4 bg-gray-50 rounded-xl">
          <p class="text-sm font-medium text-text-main mb-3">Additional Details</p>
          <div class="space-y-2">
            {#each Object.entries(transaction.metadata) as [key, value]}
              <div class="flex items-center justify-between text-sm">
                <span class="text-text-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span class="text-text-main font-medium">{value}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
      
      <!-- Actions -->
      <div class="flex gap-3 pt-4 border-t border-gray-200">
        <Button variant="outline" size="md" onclick={onClose}>
          Close
        </Button>
        {#if transaction.status === 'completed'}
          <Button variant="primary" size="md">
            <Icon icon="mdi:download" class="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
        {/if}
      </div>
    </div>
  </Card>
</div>