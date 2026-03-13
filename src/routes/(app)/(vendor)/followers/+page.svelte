<!-- src/routes/(vendor)/followers/+page.svelte  -->
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import { formatDate } from '$lib/utils/format';
  import MetricRow from '$lib/components/app/grid/MetricRow.svelte';
  import AppFilter from '$lib/components/app/common/AppFilter.svelte';
  import AppPagination from '$lib/components/app/common/AppPagination.svelte';
  import AppTable from '$lib/components/app/common/AppTable.svelte';
  import FollowerCard from '$lib/components/app/vendor/follower/FollowerCard.svelte';
  import FollowerTable from '$lib/components/app/vendor/follower/FollowerTable.svelte';
  import BroadcastForm from '$lib/components/app/vendor/follower/BroadcastForm.svelte';
  
  // Mock data
  let stats = $state({
    totalFollowers: 1284,
    newFollowers: 84,
    activeShops: 3
  });
  
  let shops = [
    { id: '1', name: 'Urban Kicks', slug: 'urban-kicks', followers: 742 },
    { id: '2', name: 'Bella Beauty', slug: 'bella-beauty', followers: 328 },
    { id: '3', name: 'TechHub Store', slug: 'techhub-store', followers: 214 }
  ];
  
  let followers = [
    {
      id: 'f_001',
      name: 'John Ade',
      email: 'johnade@email.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JA',
      followedAt: '2025-01-15',
      shops: [
        { id: '1', name: 'Urban Kicks', slug: 'urban-kicks' },
        { id: '2', name: 'Bella Beauty', slug: 'bella-beauty' }
      ],
      orders: 3,
      lastActive: '2026-01-20'
    },
    {
      id: 'f_002',
      name: 'Amina K.',
      email: 'amina.k@email.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AK',
      followedAt: '2025-03-22',
      shops: [
        { id: '1', name: 'Urban Kicks', slug: 'urban-kicks' }
      ],
      orders: 1,
      lastActive: '2026-01-18'
    },
    {
      id: 'f_003',
      name: 'Tunde M.',
      email: 'tunde.m@email.com',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TM',
      followedAt: '2025-06-10',
      shops: [
        { id: '1', name: 'Urban Kicks', slug: 'urban-kicks' },
        { id: '3', name: 'TechHub Store', slug: 'techhub-store' }
      ],
      orders: 5,
      lastActive: '2026-01-22'
    },
    {
      id: 'f_004',
      name: 'Blessing O.',
      email: 'blessing.o@email.com',
      followedAt: '2025-08-05',
      shops: [
        { id: '2', name: 'Bella Beauty', slug: 'bella-beauty' }
      ],
      orders: 0,
      lastActive: '2026-01-15'
    }
  ];

  let kpis = $derived([
    {
      label: "Total Followers",
      value: stats.totalFollowers.toLocaleString(),
      icon: "mdi:account-multiple-outline",
      color: "primary",
      trendValue: undefined,
      trend: undefined
    },
    {
      label: "New Followers",
      value: `+${stats.newFollowers}`,
      icon: "mdi:account-plus-outline",
      valueClass: "text-success",
      color: "success",
      trendValue: "+7d",
      trend: "up" as const
    },
    {
      label: "Shops With Followers",
      value: stats.activeShops,
      icon: "mdi:store-outline",
      color: "primary",
      trendValue: undefined,
      trend: undefined
    }
  ]);
  
  let topShop = shops[0];
  
  let growthData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    count: Math.floor(Math.random() * 20) + 5
  }));
  
  // Broadcast state
  let showBroadcastModal = $state(false);
  let isSending = $state(false);
  
  // Filter state
  let selectedShop = $state('');
  let searchQuery = $state('');
  let layoutView = $state<'grid' | 'table'>('grid');
  let sortBy = $state('newest');
  let filterEngagement = $state('all');

  // Initialize selectedShop from URL params on mount
  onMount(() => {
    const shopParam = $page.url.searchParams.get('shop');
    if (shopParam) {
      selectedShop = shopParam;
    }
  });

  // Get shop-specific metrics
  let currentShop = $derived(selectedShop 
    ? shops.find(s => s.slug === selectedShop) 
    : null);

  let shopSpecificFollowers = $derived(selectedShop
    ? followers.filter(f => f.shops.some(s => s.slug === selectedShop))
    : followers);

  let shopMetrics = $derived(currentShop ? {
    totalFollowers: currentShop.followers,
    newFollowers: Math.floor(Math.random() * 20) + 5,
    activeShops: 1
  } : stats);

  
  // Filter followers
  let filteredFollowers = $derived(shopSpecificFollowers.filter(follower => {
    const matchesSearch = searchQuery === '' || 
      follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEngagement = filterEngagement === 'all' || 
      (filterEngagement === 'active' && follower.orders > 0) ||
      (filterEngagement === 'inactive' && follower.orders === 0);

    return matchesSearch && matchesEngagement;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.followedAt).getTime() - new Date(a.followedAt).getTime();
    if (sortBy === 'orders') return b.orders - a.orders;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  }));

  let shopKpis = $derived([
    {
      label: "Shop Followers",
      value: shopMetrics.totalFollowers.toLocaleString(),
      icon: "mdi:account-multiple-outline",
      color: "primary",
      trendValue: undefined,
      trend: undefined
    },
    {
      label: "New Followers",
      value: `+${shopMetrics.newFollowers}`,
      icon: "mdi:account-plus-outline",
      valueClass: "text-success",
      color: "success",
      trendValue: "Last 7 days",
      trend: "up" as const
    },
    {
      label: "Engagement Rate",
      value: `${Math.round(
        (filteredFollowers.filter(f => f.orders > 0).length / (filteredFollowers.length || 1)) * 100
      )}%`,
      icon: "mdi:percent",
      color: "primary",
      trendValue: "Followers with orders",
      trend: "neutral" as const
    }
  ]);
  
  // Export followers
  const exportFollowers = () => {
    // In real app: generate CSV and download
    alert('Exporting followers...');
  };

  const handleBroadcastSubmit = (data: any) => {
    isSending = true;
    setTimeout(() => {
      const targetText = filteredFollowers.length + " followers";
      const scheduleText = data.isScheduled 
        ? ` scheduled for ${data.scheduledDate} at ${data.scheduledTime}` 
        : "";
      alert(`Broadcast "${data.subject}" sent to ${targetText}${scheduleText}!`);
      isSending = false;
      showBroadcastModal = false;
    }, 1500);
  };
</script>

<svelte:head>
  <title>Followers | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <!-- Section 1: Page Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:account-group-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">
          {#if selectedShop}
            {currentShop?.name} - Followers
          {:else}
            Followers
          {/if}
        </h1>
        <p class="text-body text-text-muted">
          {#if selectedShop}
            People following {currentShop?.name}
          {:else}
            People following your shops
          {/if}
        </p>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
    <div class="relative">
      <select
        class="appearance-none px-4 py-2.5 pr-10 rounded-xl border-2 border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
        value={selectedShop}
        onchange={(e) => {
          selectedShop = (e.target as HTMLSelectElement).value;
          searchQuery = '';
        }}
      >
        <option value="">All Shops</option>
        {#each shops as shop}
          <option value={shop.slug}>
            {shop.name} ({shop.followers})
          </option>
        {/each}
      </select>
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon icon="mdi:chevron-down" class="w-5 h-5 text-text-muted" />
      </div>
    </div>
      <Button variant="outline" size="md" onclick={exportFollowers}>
        <Icon icon="mdi:download-outline" class="w-4 h-4 mr-2" />
        Export Followers
      </Button>
    </div>
  </section>
  
  <!-- Section 2: Followers Overview (All Shops) -->
  {#if !selectedShop}
    <section in:fade={{ duration: 400, delay: 100 }}>
      <MetricRow metrics={kpis.map(kpi => ({...kpi}))} />
    </section>
  {:else}
    <!-- Section 2: Shop-Specific Metrics -->
    <section in:fade={{ duration: 400, delay: 100 }}>
      <MetricRow metrics={shopKpis.map(kpi => ({...kpi}))} />
    </section>
  {/if}

   <!-- Section 5: Follower Insights -->
  {#if filteredFollowers.length > 0}
    <section in:fade={{ duration: 400, delay: 400 }}>
      <div class="grid md:grid-cols-2 gap-6">
  <!-- Top Shop or Shop Details -->
  {#if !selectedShop}
    <Card className="border border-gray-200 p-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:crown-outline" class="w-5 h-5 text-primary" />
        </div>
        <h3 class="font-semibold text-text-main">Top Shop By Followers</h3>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-2xl font-bold">
          {topShop.name.charAt(0)}
        </div>
        <div>
          <h4 class="text-lg font-bold text-text-main">{topShop.name}</h4>
          <p class="text-2xl font-bold text-primary">{topShop.followers.toLocaleString()}</p>
          <p class="text-sm text-text-muted">followers</p>
        </div>
      </div>
      
      <a
        href="/analytics?shop={topShop.slug}"
        class="inline-flex items-center text-primary text-sm font-medium mt-4 hover:underline"
      >
        View Shop Analytics
        <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
      </a>
    </Card>
  {:else}
    <!-- Shop Engagement Stats -->
    <Card className="border border-gray-200 p-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:analytics-outline" class="w-5 h-5 text-primary" />
        </div>
        <h3 class="font-semibold text-text-main">Shop Details</h3>
      </div>
      
      <div class="space-y-4">
        <div class="pb-4 border-b border-gray-100">
          <h4 class="text-lg font-bold text-text-main">{currentShop?.name}</h4>
          <p class="text-sm text-text-muted mt-1">Shop Statistics</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-text-muted mb-1">Total Followers</p>
            <p class="text-2xl font-bold text-primary">{currentShop?.followers.toLocaleString()}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted mb-1">Active Followers</p>
            <p class="text-2xl font-bold text-text-main">{filteredFollowers.length.toLocaleString()}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted mb-1">Total Orders</p>
            <p class="text-2xl font-bold text-text-main">{filteredFollowers.reduce((sum, f) => sum + f.orders, 0)}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted mb-1">Conversion Rate</p>
            <p class="text-2xl font-bold text-success">
              {filteredFollowers.length > 0 
                ? Math.round((filteredFollowers.filter(f => f.orders > 0).length / filteredFollowers.length) * 100) 
                : 0}%
            </p>
          </div>
        </div>
      </div>
      
      <a
        href="/analytics?shop={currentShop?.slug}"
        class="inline-flex items-center text-primary text-sm font-medium mt-4 hover:underline"
      >
        View Shop Analytics
        <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
      </a>
    </Card>
  {/if}
  
  <!-- Follower Growth -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:chart-line" class="w-5 h-5 text-primary" />
      </div>
      <h3 class="font-semibold text-text-main">
        {#if selectedShop}
          {currentShop?.name} - Growth
        {:else}
          Follower Growth
        {/if}
      </h3>
    </div>
    
    <!-- Simple Chart Placeholder -->
    <div class="h-40 bg-gray-50 rounded-xl flex items-end justify-between p-4 gap-2">
      {#each growthData as item, i}
        <div
          class="w-full bg-primary/20 rounded-t transition-all hover:bg-primary/40"
          style="height: {Math.min(100, item.count * 2)}%"
          title="{item.date}: {item.count} followers"
        ></div>
      {/each}
    </div>
    
    <p class="text-xs text-text-muted text-center mt-2">Last 30 days</p>
  </Card>
</div>
    </section>
  {/if}
  
  <!-- Section 3: Shop Filter + Search -->
  <AppFilter
    searchQuery={searchQuery}
    {layoutView}
    onSearchInput={(val) => searchQuery = val}
    onLayoutChange={(layout) => layoutView = layout}
    placeholder="Search followers by name or email"
  >
    {#snippet extraFilters()}
      <select
        class="appearance-none px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
        bind:value={sortBy}
      >
        <option value="newest">Newest First</option>
        <option value="orders">Most Orders</option>
        <option value="name">Name (A-Z)</option>
      </select>

      <select
        class="appearance-none px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
        bind:value={filterEngagement}
      >
        <option value="all">Any Engagement</option>
        <option value="active">Active (with orders)</option>
        <option value="inactive">Inactive (no orders)</option>
      </select>

      <Button variant="primary" size="md" onclick={() => showBroadcastModal = true}>
        <Icon icon="mdi:bullhorn-outline" class="w-4 h-4 mr-2" />
        Broadcast
      </Button>
    {/snippet}
  </AppFilter>
  
  <!-- Section 4: Followers List -->
  <section in:fade={{ duration: 400, delay: 300 }}>
    {#if filteredFollowers.length === 0}
      <!-- Empty State -->
      <Card className="py-16 text-center border border-gray-200">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon icon="mdi:account-off-outline" class="w-8 h-8 text-text-muted" />
        </div>
        <h2 class="text-h2 text-text-main mb-2">No followers yet</h2>
        <p class="text-body text-text-muted mb-6 max-w-md mx-auto">
          Followers will appear here when buyers follow your shops.
        </p>
        <Button href="/my-blog/create" variant="primary" size="lg">
          <Icon icon="mdi:post-outline" class="w-5 h-5 mr-2" />
          Create a Blog Post
        </Button>
        <p class="text-xs text-text-muted mt-4">
          Blog posts help attract followers to your shops
        </p>
      </Card>
    {:else}
      <!-- Followers List -->
      {#if layoutView === 'grid'}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each filteredFollowers as follower, i}
            <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
              <FollowerCard {follower} />
            </div>
          {/each}
        </div>
      {:else}
        <FollowerTable followers={filteredFollowers} />
      {/if}
      
      <!-- Pagination -->
      <AppPagination
        currentPage={1}
        totalItems={followers.length}
        itemsPerPage={10}
        onPageChange={(page) => console.log('Page changed to:', page)}
        entityName="followers"
      />
    {/if}
  </section>
</main>

<!-- Broadcast Modal -->
{#if showBroadcastModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div 
      class="absolute inset-0 bg-dark/45 backdrop-blur-sm" 
      onclick={() => !isSending && (showBroadcastModal = false)}
      onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && !isSending && (showBroadcastModal = false)}
      role="button"
      tabindex="0"
      aria-label="Close modal"
    ></div>
    <Card className="relative bg-surface p-6 w-full max-w-xl shadow-2xl h-130 overflow-y-auto">
      <BroadcastForm
        targetCount={filteredFollowers.length}
        targetDescription={selectedShop ? 'followers of ' + currentShop?.name : 'followers across all shops'}
        onSubmit={handleBroadcastSubmit}
        onCancel={() => !isSending && (showBroadcastModal = false)}
        loading={isSending}
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