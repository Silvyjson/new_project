<script lang="ts">
  import Icon from '@iconify/svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import AppTable from '$lib/components/app/common/AppTable.svelte';
  
  interface OrderItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }

  interface Order {
    id: string;
    code: string;
    date: string;
    items: OrderItem[];
    total: number;
    status: string;
    deliveryMethod: string;
    shop?: {
      name: string;
      slug: string;
    };
    buyer?: {
      name: string;
    };
    canCancel: boolean;
    canReturn: boolean;
    source?: 'INTERNAL' | 'EXTERNAL';
    paymentStatus?: 'PAID' | 'PARTIAL' | 'UNPAID';
    paymentMethod?: string;
  }

  interface Props {
    orders?: Order[];
    role?: 'buyer' | 'vendor';
  }

  let { orders = [], role = 'buyer' }: Props = $props();
  
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
      NEW: { variant: 'info' as const, label: 'New' },
      PROCESSING: { variant: 'warning' as const, label: 'Processing' },
      READY_FOR_PICKUP: { variant: 'info' as const, label: 'Ready for Pickup' },
      PICKUP_PENDING: { variant: 'info' as const, label: 'Pickup Pending' },
      DROPOFF_PENDING: { variant: 'warning' as const, label: 'Drop-off Pending' },
      IN_DELIVERY: { variant: 'info' as const, label: 'In Delivery' },
      DELIVERED: { variant: 'success' as const, label: 'Delivered' },
      RETURN_REQUESTED: { variant: 'warning' as const, label: 'Return Requested' },
      RETURN_APPROVED: { variant: 'info' as const, label: 'Return Approved' },
      RETURNED: { variant: 'success' as const, label: 'Returned' },
      CANCELLED: { variant: 'danger' as const, label: 'Cancelled' },
      COMPLETED: { variant: 'success' as const, label: 'Completed' }
    };
    return badges[status as keyof typeof badges] || badges.NEW;
  };
  
  const getDeliveryIcon = (method: string) => {
    if (method.includes('GIG')) return 'mdi:truck-fast-outline';
    if (method.includes('Pickup')) return 'mdi:store-outline';
    return 'mdi:truck-delivery-outline';
  };
</script>

<AppTable items={orders}>
  {#snippet header()}
    <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Order Code</th>
    <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Date</th>
    {#if role === 'vendor'}
      <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Buyer</th>
    {/if}
    <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Items</th>
    <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Total</th>
    <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Status</th>
    {#if role === 'vendor'}
      <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Payment</th>
      <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Source</th>
    {/if}
    <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Delivery</th>
    <th class="px-6 py-3 text-left text-sm font-semibold text-text-main">Actions</th>
  {/snippet}

  {#snippet row(order: Order)}
    {@const badge = getStatusBadge(order.status)}
    <!-- Order Code -->
    <td class="px-6 py-4 text-sm font-medium text-text-main">
      <a href="/orders/{order.code}" class="hover:text-primary hover:underline">
        #{order.code}
      </a>
    </td>
    
    <!-- Date -->
    <td class="px-6 py-4 text-sm text-text-muted">
      {formatDate(order.date)}
    </td>
    
    <!-- Buyer (vendor only) -->
    {#if role === 'vendor'}
      <td class="px-6 py-4 text-sm text-text-main">
        {order.buyer?.name || 'Unknown'}
      </td>
    {/if}
    
    <!-- Items -->
    <td class="px-6 py-4 text-sm text-text-muted">
      {order.items.length} item{order.items.length > 1 ? 's' : ''}
    </td>
    
    <!-- Total -->
    <td class="px-6 py-4 text-sm font-semibold text-text-main">
      {formatNaira(order.total)}
    </td>
    
    <!-- Status -->
    <td class="px-6 py-4 text-sm">
      <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
    </td>

    {#if role === 'vendor'}
      <!-- Payment -->
      <td class="px-6 py-4 text-sm">
        {#if order.paymentStatus}
          <div class="flex flex-col gap-1">
            <Badge 
              variant={order.paymentStatus === 'PAID' ? 'success' : order.paymentStatus === 'PARTIAL' ? 'warning' : 'danger'} 
              size="sm"
            >
              {order.paymentStatus}
            </Badge>
            {#if order.paymentMethod}
              <span class="text-[10px] text-text-muted uppercase font-bold">{order.paymentMethod}</span>
            {/if}
          </div>
        {:else}
          <span class="text-text-muted">—</span>
        {/if}
      </td>
      
      <!-- Source -->
      <td class="px-6 py-4 text-sm">
        <Badge variant={order.source === 'EXTERNAL' ? 'info' : 'default'} size="sm">
          {order.source || 'INTERNAL'}
        </Badge>
      </td>
    {/if}
    
    <!-- Delivery -->
    <td class="px-6 py-4 text-sm text-text-muted">
      <div class="flex items-center gap-1">
        <Icon icon={getDeliveryIcon(order.deliveryMethod)} class="w-4 h-4" />
        <span class="truncate max-w-[120px]" title={order.deliveryMethod}>
          {order.deliveryMethod.includes('Pickup') ? 'Pickup' : 'Drop-off'}
        </span>
      </div>
    </td>
    
    <!-- Actions -->
    <td class="px-6 py-4 text-sm">
      <Button 
        variant="outline" 
        size="sm" 
        href="/orders/{order.code}"
      >
        View
      </Button>
    </td>
  {/snippet}
</AppTable>
