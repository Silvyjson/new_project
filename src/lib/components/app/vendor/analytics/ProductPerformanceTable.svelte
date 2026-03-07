<!-- src/lib/components/analytics/ProductPerformanceTable.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let products: Array<{
    id: string;
    name: string;
    image: string;
    views: number;
    wishlist: number;
    cartAdds: number;
    orders: number;
    revenue: number;
    conversionRate: number;
  }>;
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(amount);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:cube-outline" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Top Performing Products</h3>
        <p class="text-xs text-text-muted">Best sellers by revenue</p>
      </div>
    </div>
    
    <button class="text-sm text-primary font-medium hover:underline">
      View All →
    </button>
  </div>
  
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Product</th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Views</th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Wishlist</th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Cart</th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Orders</th>
          <th class="text-right py-3 px-4 text-sm font-semibold text-text-muted">Revenue</th>
          <th class="text-right py-3 px-4 text-sm font-semibold text-text-muted">Conversion</th>
        </tr>
      </thead>
      <tbody>
        {#each products as product}
          <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  class="w-12 h-12 rounded-lg object-cover bg-gray-100"
                />
                <span class="text-sm font-medium text-text-main">{product.name}</span>
              </div>
            </td>
            <td class="py-3 px-4 text-sm text-text-muted">{product.views.toLocaleString()}</td>
            <td class="py-3 px-4">
              <span class="text-sm text-text-muted">{product.wishlist.toLocaleString()}</span>
            </td>
            <td class="py-3 px-4">
              <span class="text-sm text-text-muted">{product.cartAdds.toLocaleString()}</span>
            </td>
            <td class="py-3 px-4">
              <Badge variant="success" size="sm">{product.orders}</Badge>
            </td>
            <td class="py-3 px-4 text-right">
              <span class="text-sm font-semibold text-text-main">{formatNaira(product.revenue)}</span>
            </td>
            <td class="py-3 px-4 text-right">
              <span class="text-sm font-medium {product.conversionRate >= 3 ? 'text-success' : 'text-warning'}">
                {product.conversionRate}%
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Card>