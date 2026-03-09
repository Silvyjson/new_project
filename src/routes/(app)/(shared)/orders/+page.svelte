<!-- src/routes/(app)/orders/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import OrderCard from '$lib/components/app/shared/order/OrderCard.svelte';
  import OrderTable from '$lib/components/app/shared/order/OrderTable.svelte';
  import OrderFilters from '$lib/components/app/shared/order/OrderFilters.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  // Role (in real app: from auth store)
  let role = 'vendor' as 'buyer' | 'vendor';
  
  // View mode for vendor (grid or table)
  let layoutView: 'grid' | 'table' = 'grid';
  
  // Mock shops (vendor only)
  let shops = [
    { id: '1', name: 'Urban Kicks', slug: 'urban-kicks' },
    { id: '2', name: 'TechHub Store', slug: 'techhub-store' }
  ];
  
  // Mock orders
  let orders = [
    {
      id: '1',
      code: 'VH-2043',
      date: '2026-01-25',
      items: [
        { id: 'p_001', name: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', quantity: 2, price: 12000 },
        { id: 'p_002', name: 'USB-C Cable', image: 'https://images.unsplash.com/photo-1609081219090-a66920c72123', quantity: 1, price: 3000 }
      ],
      total: 27000,
      status: 'PROCESSING',
      deliveryMethod: 'GIG Logistics - Pickup',
      shop: { name: 'TechHub Store', slug: 'techhub-store' },
      buyer: { name: 'John Ade' },
      canCancel: true,
      canReturn: false
    },
    {
      id: '2',
      code: 'VH-2042',
      date: '2026-01-24',
      items: [
        { id: 'p_003', name: 'Air Jordan Retro', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', quantity: 1, price: 85000 }
      ],
      total: 85000,
      status: 'IN_DELIVERY',
      deliveryMethod: 'GIG Logistics - Drop-off',
      shop: { name: 'Urban Kicks', slug: 'urban-kicks' },
      buyer: { name: 'Amina K.' },
      canCancel: false,
      canReturn: false
    },
    {
      id: '3',
      code: 'VH-2041',
      date: '2026-01-23',
      items: [
        { id: 'p_004', name: 'Organic Face Cream', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571', quantity: 1, price: 18000 }
      ],
      total: 18000,
      status: 'DELIVERED',
      deliveryMethod: 'GIG Logistics - Pickup',
      shop: { name: 'Urban Kicks', slug: 'urban-kicks' },
      buyer: { name: 'Tunde M.' },
      canCancel: false,
      canReturn: true
    }
  ];
  
  // Filter state
  let searchQuery = '';
  let statusFilter = 'all';
  let dateFilter = '30days';
  let shopFilter = '';
  
  // Filter orders
  $: filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesShop = shopFilter === '' || order.shop?.slug === shopFilter;
    return matchesSearch && matchesStatus && matchesShop;
  });

  const exportData = () => {
    // In real app: generate CSV/PDF export
    alert('Exporting analytics data...');
  };
</script>

<svelte:head>
  <title>Orders | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <!-- Section 1: Page Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:package-variant" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Orders</h1>
        <p class="text-body text-text-muted">
          {role === 'vendor' ? 'Track sales, delivery progress and order history' : 'Track purchases, delivery progress and order history'}
        </p>
      </div>
    </div>

    {#if role === 'vendor'}
    <div class="flex items-center gap-2">
      <div class="relative">
        <select
          class="appearance-none px-4 py-2.5 pr-10 rounded-xl border-2 border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
          value={shopFilter}
          on:change={(e) => {
            shopFilter = (e.target as HTMLSelectElement).value;
            searchQuery = '';
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
        <Button variant="outline" size="md" onclick={exportData}>
          <Icon icon="mdi:download-outline" class="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>
    {/if}
  </section>
  
  <!-- Section 2: Filters -->
  <section in:fade={{ duration: 400, delay: 100 }}>
    <OrderFilters
      role={role}
      shops={shops}
      searchQuery={searchQuery}
      statusFilter={statusFilter}
      dateFilter={dateFilter}
      shopFilter={shopFilter}
      bind:layoutView={layoutView}
      on:search-change={(e) => searchQuery = e.detail}
      on:status-change={(e) => statusFilter = e.detail}
      on:date-change={(e) => dateFilter = e.detail}
      on:shop-change={(e) => shopFilter = e.detail}
    />
  </section>
  
  <!-- Section 3: Orders List -->
  <section in:fade={{ duration: 400, delay: 200 }}>
    {#if filteredOrders.length === 0}
      <Card className="py-16 text-center border border-gray-200">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon icon="mdi:package-variant" class="w-8 h-8 text-text-muted" />
        </div>
        <h2 class="text-h2 text-text-main mb-2">No orders found</h2>
        <p class="text-body text-text-muted mb-6">Try adjusting your filters or check back later.</p>
      </Card>
    {:else if role === 'vendor' && layoutView === 'table'}
      <!-- Table View (Vendor) -->
      <div in:fade={{ duration: 300 }}>
        <OrderTable orders={filteredOrders} role={role} />
        
        <!-- Pagination Info -->
        <div class="flex items-center justify-between mt-6">
          <p class="text-sm text-text-muted">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div class="flex items-center gap-2">
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
      </div>
    {:else}
      <!-- Grid View (All roles when applicable) -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredOrders as order, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
            <OrderCard {order} {role} />
          </div>
        {/each}
      </div>
      
      <!-- Pagination -->
      <div class="flex items-center justify-between mt-8">
        <p class="text-sm text-text-muted">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
        <div class="flex items-center gap-2">
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
    {/if}
  </section>
</main>

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