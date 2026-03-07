<!-- src/lib/components/analytics/CartInsights.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let cartData: {
    cartAdds: number;
    purchased: number;
    abandonmentRate: number;
    potentialRevenue: number;
  };
  
  export let wishlistData: {
    adds: number;
    purchased: number;
    conversionRate: number;
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

<div class="grid md:grid-cols-2 gap-6">
  <!-- Cart Abandonment -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:cart-outline" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Cart Insights</h3>
        <p class="text-xs text-text-muted">Abandonment analysis</p>
      </div>
    </div>
    
    <div class="space-y-4">
      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span class="text-sm text-text-muted">Added to Cart</span>
        <span class="text-lg font-bold text-text-main">{cartData.cartAdds}</span>
      </div>
      
      <div class="flex items-center justify-between p-3 bg-success/5 rounded-lg">
        <span class="text-sm text-text-muted">Purchased</span>
        <span class="text-lg font-bold text-success">{cartData.purchased}</span>
      </div>
      
      <div class="flex items-center justify-between p-3 bg-error/5 rounded-lg">
        <span class="text-sm text-text-muted">Abandonment Rate</span>
        <span class="text-lg font-bold text-error">{cartData.abandonmentRate}%</span>
      </div>
      
      <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p class="text-sm text-text-muted mb-1">Potential Lost Revenue</p>
        <p class="text-2xl font-bold text-primary">{formatNaira(cartData.potentialRevenue)}</p>
      </div>
    </div>
  </Card>
  
  <!-- Wishlist -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:heart-outline" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Wishlist Performance</h3>
        <p class="text-xs text-text-muted">Saved items conversion</p>
      </div>
    </div>
    
    <div class="space-y-4">
      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span class="text-sm text-text-muted">Wishlist Adds</span>
        <span class="text-lg font-bold text-text-main">{wishlistData.adds}</span>
      </div>
      
      <div class="flex items-center justify-between p-3 bg-success/5 rounded-lg">
        <span class="text-sm text-text-muted">Converted to Purchase</span>
        <span class="text-lg font-bold text-success">{wishlistData.purchased}</span>
      </div>
      
      <div class="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
        <span class="text-sm text-text-muted">Conversion Rate</span>
        <span class="text-lg font-bold text-primary">{wishlistData.conversionRate}%</span>
      </div>
      
      <div class="p-4 bg-warning/5 rounded-xl border border-warning/20">
        <p class="text-sm text-warning mb-1">
          <Icon icon="mdi:lightbulb-outline" class="w-4 h-4 inline mr-1" />
          Tip: Send reminders for wishlist items
        </p>
      </div>
    </div>
  </Card>
</div>