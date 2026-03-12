<!-- src/lib/components/promotion/PromotionCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  import type { Promotion } from '$lib/types';
  
  export let promotion: Promotion;
  
  export let onEdit: (id: string) => void;
  export let onPause: (id: string) => void;
  export let onDuplicate: (id: string) => void;
  export let onDelete: (id: string) => void;
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(amount);
  };
  
  const getDiscountBadge = () => {
    if (promotion.discountType === 'percentage') {
      return { icon: 'mdi:percent', label: `${promotion.discountValue}% OFF`, color: 'bg-primary/10 text-primary' };
    }
    return { icon: 'mdi:cash-minus', label: `${formatNaira(promotion.discountValue)} OFF`, color: 'bg-success/10 text-success' };
  };
  
  const getStatusBadge = () => {
    const badges = {
      active: { variant: 'success' as const, label: 'Active', icon: 'mdi:check-circle' },
      scheduled: { variant: 'info' as const, label: 'Scheduled', icon: 'mdi:clock-outline' },
      expired: { variant: 'warning' as const, label: 'Expired', icon: 'mdi:calendar-remove' },
      paused: { variant: 'warning' as const, label: 'Paused', icon: 'mdi:pause-circle' }
    };
    return badges[promotion.status as keyof typeof badges];
  };

  const status = getStatusBadge()
</script>

<Card className="border border-gray-200 p-5 hover:shadow-card-hover transition-shadow">
  <!-- Header -->
  <div class="flex items-start justify-between mb-4">
    <div>
      <h3 class="font-semibold text-h4 text-text-main mb-1">{promotion.title}</h3>
      {#if promotion.description}
        <p class="text-xs text-text-muted line-clamp-1">{promotion.description}</p>
      {/if}
    </div>
    <Badge variant={status.variant} size="sm">
      <Icon icon={status.icon} class="w-3 h-3 inline mr-1" />
      {status.label}
    </Badge>
  </div>
  
  <!-- Discount Badge -->
  {@const discount = getDiscountBadge()}
  <div class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold {discount.color} mb-4">
    <Icon icon={discount.icon} class="w-4 h-4" />
    {discount.label}
  </div>
  
  <!-- Details Grid -->
  <div class="grid grid-cols-2 gap-4 mb-4 text-xs">
    <div>
      <p class="text-text-muted text-sm mb-1">Applies To</p>
      <p class="font-medium text-text-main text-sm">
        {promotion.type === 'shop' 
          ? 'Entire Shop' 
          : `${promotion.productCount} product${promotion.productCount > 1 ? 's' : ''}`}
      </p>
      {#if promotion.couponCode}
        <p class="text-sm text-text-muted mt-1">Code: <span class="font-mono">{promotion.couponCode}</span></p>
      {/if}
    </div>
    <div>
      <p class="text-text-muted text-sm mb-1">Date Range</p>
      <p class="font-medium text-text-main text-sm">
        {formatDate(promotion.startDate)} → {formatDate(promotion.endDate)}
      </p>
    </div>
  </div>
  
  <!-- Performance Metrics (if active) -->
  {#if promotion.status === 'active' && promotion.orders > 0}
    <div class="p-3 bg-primary/5 rounded-xl mb-4">
      <div class="grid grid-cols-3 gap-2 text-center">
        <div>
          <p class="text-sm font-bold text-text-main">{promotion.orders}</p>
          <p class="text-xs text-text-muted">Orders</p>
        </div>
        <div>
          <p class="text-sm font-bold text-text-main">{formatNaira(promotion.revenue)}</p>
          <p class="text-xs text-text-muted">Revenue</p>
        </div>
        <div>
          <p class="text-sm font-bold text-text-main">{promotion.productsSold}</p>
          <p class="text-xs text-text-muted">Sold</p>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Actions -->
  <div class="flex items-center justify-between pt-4 border-t border-gray-100">
    <div class="flex gap-2">
      <Button variant="ghost" size="sm" onclick={() => onEdit(promotion.id)} title="Edit">
        <Icon icon="mdi:pencil-outline" class="w-4 h-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onclick={() => onPause(promotion.id)} 
        title={promotion.status === 'paused' ? 'Resume' : 'Pause'}
        class={promotion.status === 'paused' ? 'text-success hover:bg-success/5' : ''}
      >
        <Icon icon={promotion.status === 'paused' ? 'mdi:play-circle-outline' : 'mdi:pause-circle-outline'} class="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onclick={() => onDuplicate(promotion.id)} title="Duplicate">
        <Icon icon="mdi:content-copy" class="w-4 h-4" />
      </Button>
    </div>
    <Button variant="ghost" size="sm" class="text-error hover:bg-error/5" onclick={() => onDelete(promotion.id)} title="Delete">
      <Icon icon="mdi:delete-outline" class="w-4 h-4" />
    </Button>
  </div>
</Card>