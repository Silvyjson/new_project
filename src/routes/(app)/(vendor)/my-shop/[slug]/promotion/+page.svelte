<!-- src/routes/(vendor)/my-shop/[slug]/promotion/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import type { Promotion, PromotionStatus } from '$lib/types';
  import PromotionCard from '$lib/components/app/vendor/promotion/PromotionCard.svelte';
  import PromotionForm from '$lib/components/app/vendor/promotion/PromotionForm.svelte';
  import PromotionTable from '$lib/components/app/vendor/promotion/PromotionTable.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import MetricRow from '$lib/components/app/grid/MetricRow.svelte';
  import AppFilter from '$lib/components/app/common/AppFilter.svelte';
  import AppPagination from '$lib/components/app/common/AppPagination.svelte';
  import { formatNaira, formatDate } from '$lib/utils/format';
  
  let shopSlug = $derived($page.params.slug || '');
  
  // Filter and Layout state
  let activeTab = $state('all');
  let typeFilter = $state('all');
  let searchQuery = $state('');
  let layoutView = $state<'grid' | 'table'>('grid');
  let activeSort = $state('');
  
  // Show create modal
  let showCreateModal = $state(false);
  
  // Mock promotions (in real app: fetch from API)
  let promotions = $state<Promotion[]>([
    {
      id: 'promo_001',
      title: 'Black Friday Sale',
      description: '20% off all electronics',
      type: 'product',
      discountType: 'percentage',
      discountValue: 20,
      productCount: 8,
      startDate: '2026-11-25',
      endDate: '2026-11-28',
      status: 'active',
      orders: 42,
      revenue: 280000,
      productsSold: 65
    },
    {
      id: 'promo_002',
      title: 'New Customer Welcome',
      description: '₦500 off first order',
      type: 'coupon',
      discountType: 'fixed',
      discountValue: 500,
      couponCode: 'WELCOME500',
      productCount: 0,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'active',
      orders: 128,
      revenue: 450000,
      productsSold: 203
    },
    {
      id: 'promo_003',
      title: 'Summer Clearance',
      description: 'End of season sale',
      type: 'shop',
      discountType: 'percentage',
      discountValue: 30,
      productCount: 0,
      startDate: '2026-06-01',
      endDate: '2026-06-30',
      status: 'scheduled',
      orders: 0,
      revenue: 0,
      productsSold: 0
    },
    {
      id: 'promo_004',
      title: 'Flash Sale',
      description: 'Limited time offer',
      type: 'product',
      discountType: 'fixed',
      discountValue: 2000,
      productCount: 3,
      startDate: '2026-01-10',
      endDate: '2026-01-12',
      status: 'expired',
      orders: 89,
      revenue: 156000,
      productsSold: 134
    }
  ]);
  
  // Mock products for selector
  let products = [
    { id: 'p_001', name: 'Wireless Headphones Pro', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', price: 24000, category: 'Electronics', inStock: true },
    { id: 'p_002', name: 'USB-C Cable 2m', image: 'https://images.unsplash.com/photo-1609081219090-a66920c72123', price: 3000, category: 'Accessories', inStock: true },
    { id: 'p_003', name: 'Gaming Mouse', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db', price: 8500, category: 'Electronics', inStock: true },
    { id: 'p_004', name: 'Bluetooth Speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1', price: 15000, category: 'Electronics', inStock: true }
  ];
  
  // Filter and Sort promotions
  let filteredPromotions = $derived.by(() => {
    let result = promotions.filter(p => {
      const matchesTab = activeTab === 'all' || p.status === activeTab;
      const matchesType = typeFilter === 'all' || p.type === typeFilter;
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesType && matchesSearch;
    });

    if (activeSort) {
      result = [...result].sort((a, b) => {
        if (activeSort === 'highest-revenue') return b.revenue - a.revenue;
        if (activeSort === 'lowest-revenue') return a.revenue - b.revenue;
        if (activeSort === 'highest-orders') return b.orders - a.orders;
        if (activeSort === 'lowest-orders') return a.orders - b.orders;
        return 0;
      });
    }

    return result;
  });

  
  // Stats
  let stats = $derived({
    activePromotions: promotions.filter(p => p.status === 'active').length,
    totalOrders: promotions.reduce((sum, p) => sum + p.orders, 0),
    totalRevenue: promotions.reduce((sum, p) => sum + p.revenue, 0),
    totalProductsSold: promotions.reduce((sum, p) => sum + p.productsSold, 0)
  });

  const kpis = $derived([
    {
      label: "Active Promotions",
      value: stats.activePromotions,
      icon: "mdi:tag-check-outline",
    },
    {
      label: "Orders from Promotions",
      value: stats.totalOrders,
      icon: "mdi:cart-outline",
      color: "success"
    },
    {
      label: "Revenue Generated",
      value: formatNaira(stats.totalRevenue),
      icon: "mdi:currency-ngn",
    },
    {
      label: "Products Sold",
      value: stats.totalProductsSold,
      icon: "mdi:package-variant",
      color: "success"
    }
  ]);

  
  // Handlers
  const handleCreate = () => {
    showCreateModal = true;
  };
  
  const handleEdit = (id: string) => {
    console.log(`Edit promotion ${id}`);
  };
  
  const handlePause = (id: string) => {
    const index = promotions.findIndex(p => p.id === id);
    if (index !== -1) {
      const p = promotions[index];
      promotions[index] = { ...p, status: p.status === 'paused' ? 'active' : 'paused' };
    }
  };
  
  const handleDuplicate = (id: string) => {
    const original = promotions.find(p => p.id === id);
    if (original) {
      const newPromo: Promotion = {
        ...original,
        id: `promo_${Date.now()}`,
        title: `${original.title} (Copy)`,
        status: 'paused',
        orders: 0,
        revenue: 0,
        productsSold: 0
      };
      promotions.unshift(newPromo);
    }
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this promotion?')) {
      const index = promotions.findIndex(p => p.id === id);
      if (index !== -1) {
        promotions.splice(index, 1);
      }
    }
  };
  
  const handleSavePromotion = (data: any) => {
    console.log('Save promotion', data);
    showCreateModal = false;
    const newPromo: Promotion = {
      id: `promo_${Date.now()}`,
      ...data,
      productCount: data.productIds?.length || 0,
      status: 'scheduled',
      orders: 0,
      revenue: 0,
      productsSold: 0
    };
    promotions.unshift(newPromo);
  };
  
  const handleTabChange = (e: CustomEvent) => {
    activeTab = e.detail;
  };
  
  onMount(() => {
    window.addEventListener('tab-change', handleTabChange as EventListener);
    return () => window.removeEventListener('tab-change', handleTabChange as EventListener);
  });

</script>

<svelte:head>
  <title>Promotions | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  <!-- Back Link -->
    <div in:fade={{ duration: 400 }}>
        <a
            href="/my-shop/{shopSlug}"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Back to Shop
        </a>
    </div>
    
  <!-- Section 1: Page Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:tag-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Promotions</h1>
        <p class="text-sm text-text-muted">Create discounts, coupons, and sales for your shop</p>
      </div>
    </div>
    
    <Button variant="primary" size="sm" onclick={handleCreate}>
      <Icon icon="mdi:plus-circle-outline" class="w-5 h-5 mr-2" />
      Create Promotion
    </Button>
  </section>
  
  <!-- Section 2: Promotion Stats -->
  <section in:fade={{ duration: 400, delay: 100 }}>
    <MetricRow metrics={kpis.map(kpi => ({...kpi}))} />
  </section>
  
  <!-- Section 3: Filters & Search -->
  <AppFilter
    searchQuery={searchQuery}
    {layoutView}
    onSearchInput={(val: string) => searchQuery = val}
    onLayoutChange={(layout: 'grid' | 'table') => layoutView = layout}
    placeholder="Search promotions by title or description..."
  >
    {#snippet extraFilters()}
      <select
        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-surface"
        bind:value={activeTab}
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="scheduled">Scheduled</option>
        <option value="expired">Expired</option>
        <option value="paused">Paused</option>
      </select>

      <select
        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-surface"
        bind:value={typeFilter}
      >
        <option value="all">All Types</option>
        <option value="product">Product</option>
        <option value="shop">Shop</option>
        <option value="coupon">Coupon</option>
      </select>

      <select
        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-surface"
        bind:value={activeSort}
      >
        <option value="">Default Sort</option>
        <option value="highest-revenue">Highest Revenue</option>
        <option value="lowest-revenue">Lowest Revenue</option>
        <option value="highest-orders">Highest Orders</option>
        <option value="lowest-orders">Lowest Orders</option>
      </select>
    {/snippet}
  </AppFilter>
  
  <!-- Section 4: Promotions List -->
  <section in:fade={{ duration: 400, delay: 300 }}>
    {#if filteredPromotions.length === 0}
      <Card className="py-16 text-center border border-gray-200">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon icon="mdi:tag-off-outline" class="w-8 h-8 text-text-muted" />
        </div>
        <h2 class="text-h2 text-text-main mb-2">No promotions found</h2>
        <p class="text-body text-text-muted mb-6">Try adjusting your filters or create your first promotion.</p>
        <Button variant="primary" size="lg" onclick={handleCreate}>
          <Icon icon="mdi:tag-plus-outline" class="w-5 h-5 mr-2" />
          Create Promotion
        </Button>
      </Card>
    {:else}
      {#if layoutView === 'grid'}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each filteredPromotions as promo, i}
            <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
              <PromotionCard
                promotion={promo}
                onEdit={handleEdit}
                onPause={handlePause}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            </div>
          {/each}
        </div>
      {:else}
        <PromotionTable 
          promotions={filteredPromotions}
          onEdit={handleEdit}
          onPause={handlePause}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      {/if}

      <!-- Pagination Section -->
      <AppPagination
        currentPage={1}
        totalItems={filteredPromotions.length}
        itemsPerPage={10}
        onPageChange={(page) => console.log('Page changed:', page)}
        entityName="promotions"
      />
    {/if}
  </section>
</main>

<!-- Create/Edit Modal -->
{#if showCreateModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div 
      class="absolute inset-0 bg-dark/45 backdrop-blur-sm" 
      onclick={() => (showCreateModal = false)}
      onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (showCreateModal = false)}
      role="button"
      tabindex="0"
      aria-label="Close modal"
    ></div>
    <Card className="relative bg-surface p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 class="text-xl font-bold text-text-main">Create Promotion</h3>
        <button onclick={() => (showCreateModal = false)} class="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      <PromotionForm
        products={products}
        onSave={handleSavePromotion}
        onCancel={() => showCreateModal = false}
      />
    </Card>
  </div>
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