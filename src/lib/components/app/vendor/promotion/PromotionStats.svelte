<!-- src/lib/components/promotion/promotiontats.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let stats: {
    activePromotions: number;
    totalOrders: number;
    totalRevenue: number;
    totalProductsSold: number;
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

<div class="grid md:grid-cols-4 gap-4">
  <Card className="border border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-text-muted">Active Promotions</p>
        <p class="text-2xl font-bold text-text-main">{stats.activePromotions}</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
        <Icon icon="mdi:tag-check-outline" class="w-5 h-5 text-success" />
      </div>
    </div>
  </Card>
  
  <Card className="border border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-text-muted">Orders from Promotions</p>
        <p class="text-2xl font-bold text-text-main">{stats.totalOrders}</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:cart-outline" class="w-5 h-5 text-primary" />
      </div>
    </div>
  </Card>
  
  <Card className="border border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-text-muted">Revenue Generated</p>
        <p class="text-2xl font-bold text-text-main">{formatNaira(stats.totalRevenue)}</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
        <Icon icon="mdi:currency-ngn" class="w-5 h-5 text-success" />
      </div>
    </div>
  </Card>
  
  <Card className="border border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-text-muted">Products Sold</p>
        <p class="text-2xl font-bold text-text-main">{stats.totalProductsSold}</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:package-variant" class="w-5 h-5 text-primary" />
      </div>
    </div>
  </Card>
</div>