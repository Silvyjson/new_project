<!-- src/routes/(vendor)/analytics/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import RevenueChart from '$lib/components/app/vendor/analytics/RevenueChart.svelte';
  import ConversionFunnel from '$lib/components/app/vendor/analytics/ConversionFunnel.svelte';
  import ProductPerformanceTable from '$lib/components/app/vendor/analytics/ProductPerformanceTable.svelte';
  import TrafficSourcesChart from '$lib/components/app/vendor/analytics/TrafficSourcesChart.svelte';
  import CartInsights from '$lib/components/app/vendor/analytics/CartInsights.svelte';
  import SmartInsights from '$lib/components/app/vendor/analytics/SmartInsights.svelte';
  import MetricRow from '$lib/components/app/grid/MetricRow.svelte';
  
  // Mock data
  let shops = [
    { id: '1', name: 'Urban Kicks', slug: 'urban-kicks' },
    { id: '2', name: 'Bella Beauty', slug: 'bella-beauty' },
    { id: '3', name: 'TechHub Store', slug: 'techhub-store' }
  ];
  
  let selectedShop = '';
  let dateRange = '30days';
  
  // Initialize selectedShop from URL params on mount
  onMount(() => {
    const shopParam = $page.url.searchParams.get('shop');
    if (shopParam) {
      selectedShop = shopParam;
    }
  });

  // Get shop-specific data
  $: currentShop = selectedShop 
    ? shops.find(s => s.slug === selectedShop) 
    : null;
  
  // KPI Data
  const kpis: Array<{
    icon: string;
    label: string;
    value: string;
    trendValue: string;
    trend: 'up' | 'down' | 'neutral';
    color: string;
    subtext?: string;
  }> = [
    { icon: 'mdi:cash-multiple', label: 'Revenue', value: '₦2.45M', trendValue: '+12%', trend: 'up', color: 'success', subtext: 'from last period' },
    { icon: 'mdi:package-variant-closed', label: 'Orders', value: '156', trendValue: '+8%', trend: 'up', color: 'primary' },
    { icon: 'mdi:calculator-variant-outline', label: 'Avg Order Value', value: '₦15,700', trendValue: '+4%', trend: 'up', color: 'warning' },
    { icon: 'mdi:chart-line', label: 'Conversion Rate', value: '3.2%', trendValue: '+0.8%', trend: 'up', color: 'success' },
    { icon: 'mdi:account-group-outline', label: 'Visitors', value: '4,320', trendValue: '+21%', trend: 'up', color: 'primary' },
    { icon: 'mdi:cart-outline', label: 'Cart Items', value: '87', trendValue: '₦520K', trend: 'neutral', color: 'warning', subtext: 'potential revenue' },
    { icon: 'mdi:heart-outline', label: 'Wishlist Adds', value: '241', trendValue: '+15%', trend: 'up', color: 'primary' },
    { icon: 'mdi:account-plus-outline', label: 'Followers', value: '+34', trendValue: '+20%', trend: 'up', color: 'primary', subtext: 'this week' },
  ];
  
  // Revenue Chart Data
  const revenueData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    revenue: Math.floor(Math.random() * 100000) + 50000,
    orders: Math.floor(Math.random() * 20) + 5,
    visitors: Math.floor(Math.random() * 500) + 100
  }));
  
  // Conversion Funnel
  const funnel = [
    { stage: 'Product Views', count: 4300, percentage: 100, icon: 'mdi:eye-outline' },
    { stage: 'Added to Wishlist', count: 241, percentage: 5.6, icon: 'mdi:heart-outline' },
    { stage: 'Added to Cart', count: 150, percentage: 62.2, icon: 'mdi:cart-outline' },
    { stage: 'Checkout Started', count: 98, percentage: 65.3, icon: 'mdi:credit-card-outline' },
    { stage: 'Purchased', count: 67, percentage: 68.4, icon: 'mdi:check-circle-outline' }
  ];
  
  // Top Products
  const topProducts = [
    { id: 'p_001', name: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', views: 420, wishlist: 38, cartAdds: 22, orders: 12, revenue: 240000, conversionRate: 2.8 },
    { id: 'p_002', name: 'Air Jordan Retro', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', views: 380, wishlist: 45, cartAdds: 28, orders: 15, revenue: 450000, conversionRate: 3.9 },
    { id: 'p_003', name: 'Organic Face Cream', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571', views: 290, wishlist: 32, cartAdds: 18, orders: 9, revenue: 135000, conversionRate: 3.1 }
  ];
  
  // Traffic Sources
  const trafficSources = [
    { name: 'VendorHub Search', percentage: 52, visitors: 2246, icon: 'mdi:magnify', color: 'blue' },
    // { name: 'Google', percentage: 23, visitors: 994, icon: 'mdi:google', color: 'green' },
    // { name: 'Social Media', percentage: 15, visitors: 648, icon: 'mdi:share-variant', color: 'pink' },
    { name: 'Direct', percentage: 8, visitors: 346, icon: 'mdi:link-variant', color: 'purple' },
    // { name: 'Referrals', percentage: 2, visitors: 86, icon: 'mdi:arrow-top-right', color: 'orange' }
  ];
  
  // Cart & Wishlist Data
  const cartData = {
    cartAdds: 150,
    purchased: 67,
    abandonmentRate: 55,
    potentialRevenue: 520000
  };
  
  const wishlistData = {
    adds: 241,
    purchased: 29,
    conversionRate: 12
  };
  
  // Smart Insights
  const insights = [
    {
      type: 'warning' as const,
      title: 'High Cart Abandonment',
      message: 'Your cart abandonment rate is 55%, which is higher than average. Consider offering free shipping or checkout incentives.',
      action: 'View Cart Insights'
    },
    {
      type: 'success' as const,
      title: 'Follower Growth',
      message: 'Your followers increased by 20% this week. Post new products to convert them into buyers.',
      action: 'Create Blog Post'
    },
    {
      type: 'info' as const,
      title: 'Product Performance',
      message: 'Wireless Headphones has high wishlist but low purchase rate. Consider reducing price or offering limited-time discount.',
      action: 'Edit Product'
    }
  ];

   const exportData = () => {
    // In real app: generate CSV/PDF export
    alert('Exporting analytics data...');
  };
</script>

<svelte:head>
  <title>Analytics | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <!-- Section 1: Page Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:chart-line" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">
          {#if selectedShop}
            {currentShop?.name} - Analytics
          {:else}
            Analytics
          {/if}
        </h1>
        <p class="text-body text-text-muted">
          {#if selectedShop}
            Performance metrics for {currentShop?.name}
          {:else}
            Track shop performance, sales and customer behavior
          {/if}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <!-- Shop Filter -->
      <div class="relative">
        <select
          class="appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
          value={selectedShop}
          on:change={(e) => {
            selectedShop = (e.target as HTMLSelectElement).value;
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

      <!-- Date Range -->
      <div class="relative">
        <select
          class="appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
          value={dateRange}
          on:change={(e) => {
            dateRange = (e.target as HTMLSelectElement).value;
          }}
        >
          <option value="today">Today</option>
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
        </select>
        <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon icon="mdi:chevron-down" class="w-5 h-5 text-text-muted" />
        </div>
      </div>
        <Button variant="outline" size="md" onclick={exportData}>
          <Icon icon="mdi:download-outline" class="w-4 h-4 mr-2" />
          Export Data
        </Button>
    </div>
  </section>
  
  <!-- Section 2: KPI Cards -->
  <section in:fade={{ duration: 400, delay: 100 }}>
    <MetricRow metrics={kpis.map(kpi => ({...kpi}))} />
  </section>
  
  <!-- Section 3: Revenue Chart -->
  <section class="grid lg:grid-cols-2 gap-6" in:fade={{ duration: 400, delay: 200 }}>
    <RevenueChart data={revenueData} />
    <TrafficSourcesChart sources={trafficSources} />
  </section>
  
  <!-- Section 4: Conversion Funnel + Traffic Sources -->
  <section class="grid lg:grid-cols-2 gap-6" in:fade={{ duration: 400, delay: 300 }}>
    <!-- <ConversionFunnel funnel={funnel} /> -->
    <!-- <TrafficSourcesChart sources={trafficSources} /> -->
  </section>
  
  <!-- Section 5: Product Performance -->
  <section in:fade={{ duration: 400, delay: 400 }}>
    <ProductPerformanceTable products={topProducts} />
  </section>
  
  <!-- Section 6: Cart & Wishlist Insights -->
  <!-- <section in:fade={{ duration: 400, delay: 500 }}>
    <CartInsights cartData={cartData} wishlistData={wishlistData} />
  </section> -->
  
  <!-- Section 7: Smart Insights -->
  <!-- <section in:fade={{ duration: 400, delay: 600 }}>
    <SmartInsights insights={insights} />
  </section> -->
</main>