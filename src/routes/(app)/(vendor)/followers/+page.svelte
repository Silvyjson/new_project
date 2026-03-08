<!-- src/routes/(vendor)/followers/+page.svelte -->
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
  
  // Mock data
  let stats = {
    totalFollowers: 1284,
    newFollowers: 84,
    activeShops: 3
  };
  
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
  
  let topShop = shops[0];
  
  let growthData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    count: Math.floor(Math.random() * 20) + 5
  }));
  
  // Filter state
  let selectedShop = '';
  let searchQuery = '';

  // Initialize selectedShop from URL params on mount
  onMount(() => {
    const shopParam = $page.url.searchParams.get('shop');
    if (shopParam) {
      selectedShop = shopParam;
    }
  });

  // Get shop-specific metrics
  $: currentShop = selectedShop 
    ? shops.find(s => s.slug === selectedShop) 
    : null;

  $: shopSpecificFollowers = selectedShop
    ? followers.filter(f => f.shops.some(s => s.slug === selectedShop))
    : followers;

  $: shopMetrics = currentShop ? {
    totalFollowers: currentShop.followers,
    newFollowers: Math.floor(Math.random() * 20) + 5,
    activeShops: 1
  } : stats;
  
  // Filter followers
  $: filteredFollowers = shopSpecificFollowers.filter(follower => {
    const matchesSearch = searchQuery === '' || 
      follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  
  // Export followers
  const exportFollowers = () => {
    // In real app: generate CSV and download
    alert('Exporting followers...');
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
        on:change={(e) => {
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
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Total Followers -->
        <Card className="border border-gray-200 p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-text-muted mb-1">Total Followers</p>
              <p class="text-3xl font-bold text-text-main">{stats.totalFollowers.toLocaleString()}</p>
              <p class="text-xs text-text-muted mt-1">Across all shops</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon icon="mdi:account-multiple-outline" class="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
        
        <!-- New Followers -->
        <Card className="border border-gray-200 p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-text-muted mb-1">New Followers</p>
              <p class="text-3xl font-bold text-success">+{stats.newFollowers}</p>
              <p class="text-xs text-text-muted mt-1">Last 7 days</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon icon="mdi:account-plus-outline" class="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>
        
        <!-- Active Shops -->
        <Card className="border border-gray-200 p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-text-muted mb-1">Shops With Followers</p>
              <p class="text-3xl font-bold text-text-main">{stats.activeShops}</p>
              <p class="text-xs text-text-muted mt-1">Receiving followers</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon icon="mdi:store-outline" class="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  {:else}
    <!-- Section 2: Shop-Specific Metrics -->
    <section in:fade={{ duration: 400, delay: 100 }}>
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Shop Followers -->
        <Card className="border border-gray-200 p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-text-muted mb-1">Shop Followers</p>
              <p class="text-3xl font-bold text-text-main">{shopMetrics.totalFollowers.toLocaleString()}</p>
              <p class="text-xs text-text-muted mt-1">Total followers</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon icon="mdi:account-multiple-outline" class="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
        
        <!-- New Shop Followers -->
        <Card className="border border-gray-200 p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-text-muted mb-1">New Followers</p>
              <p class="text-3xl font-bold text-success">+{shopMetrics.newFollowers}</p>
              <p class="text-xs text-text-muted mt-1">Last 7 days</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon icon="mdi:account-plus-outline" class="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>
        
        <!-- Engagement -->
        <Card className="border border-gray-200 p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-text-muted mb-1">Engagement Rate</p>
              <p class="text-3xl font-bold text-text-main">{Math.round((filteredFollowers.filter(f => f.orders > 0).length / filteredFollowers.length) * 100)}%</p>
              <p class="text-xs text-text-muted mt-1">Followers with orders</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon icon="mdi:percent" class="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>
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
  <section in:fade={{ duration: 400, delay: 200 }}>
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
  <!-- Search -->
  <div class="md:w-100">
    <Input
      label=""
      name="search"
      placeholder="Search followers by name or email"
      value={searchQuery}
      on:input={(e) => {
        searchQuery = (e.target as HTMLInputElement).value;
      }}
    />
  </div>
</div>
  </section>
  
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
      <!-- Followers Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredFollowers as follower, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
           <Card className="border border-gray-200 p-6 hover:shadow-card-hover transition-shadow">
  <div class="flex items-start gap-4">
    <!-- Avatar -->
    <div class="flex-shrink-0">
      {#if follower.avatar}
        <img
          src={follower.avatar}
          alt={follower.name}
          class="w-14 h-14 rounded-full object-cover"
        />
      {:else}
        <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:account-circle" class="w-8 h-8 text-primary" />
        </div>
      {/if}
    </div>
    
    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <h3 class="font-semibold text-text-main truncate">{follower.name}</h3>
          <div class="flex items-center gap-1 text-sm text-text-muted mt-0.5">
            <Icon icon="mdi:email-outline" class="w-4 h-4" />
            <span class="truncate">{follower.email}</span>
          </div>
        </div>
        {#if follower.orders > 0}
          <Badge variant="success" size="sm">
            <Icon icon="mdi:shopping-outline" class="w-3 h-3 inline mr-1" />
            {follower.orders} orders
          </Badge>
        {/if}
      </div>
      
      <!-- Following Info -->
      <div class="mt-4 space-y-2">
        <div class="flex items-center gap-2 text-sm text-text-muted">
          <Icon icon="mdi:calendar-outline" class="w-4 h-4" />
          <span>Following since {formatDate(follower.followedAt)}</span>
        </div>
        
        <div class="flex items-center gap-2 text-sm text-text-muted">
          <Icon icon="mdi:store-outline" class="w-4 h-4" />
          <span>Following:</span>
          <div class="flex flex-wrap gap-1">
            {#each follower.shops.slice(0, 2) as shop}
              <a
                href="/shop/{shop.slug}"
                class="text-primary hover:underline text-xs"
                target="_blank"
              >
                {shop.name}
              </a>
            {/each}
            {#if follower.shops.length > 2}
              <span class="text-xs text-text-muted">+{follower.shops.length - 2} more</span>
            {/if}
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <!-- <div class="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <Button variant="outline" size="sm" href="/dashboard?follower={follower.id}">
          <Icon icon="mdi:account-eye-outline" class="w-4 h-4 mr-1" />
          View Profile
        </Button>
        <Button variant="ghost" size="sm">
          <Icon icon="mdi:message-outline" class="w-4 h-4" />
        </Button>
      </div> -->
    </div>
  </div>
</Card>
          </div>
        {/each}
      </div>
      
      <!-- Pagination -->
      <div class="flex items-center justify-between mt-8">
        <p class="text-sm text-text-muted">
          Showing {filteredFollowers.length} of {followers.length} followers
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