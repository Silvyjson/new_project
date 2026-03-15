<!-- src/routes/(app)/following/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import ShopCard from '$lib/components/app/card/ShopCard.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import AppFilter from '$lib/components/app/common/AppFilter.svelte';
  import AppPagination from '$lib/components/app/common/AppPagination.svelte';
  
  // Mock followed shops
  let followedShops = $state([
    {
      id: '1',
      name: 'TechHub',
      slug: 'techhub',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TH',
      bannerUrl: 'bg-gradient-to-r from-blue-400 to-blue-600',
      followers: 2340,
      productCount: 120,
      verified: true,
      active: true,
      lastActive: '2 hours ago',
      recentActivity: 'Added 3 new products',
      category: 'Electronics',
      rating: 4.8,
      reviewCount: 1200,
      orderCount: 5000,
      trustScore: 98
    },
    {
      id: '2',
      name: 'Urban Kicks',
      slug: 'urban-kicks',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=UK',
      bannerUrl: 'bg-gradient-to-r from-purple-400 to-purple-600',
      followers: 1890,
      productCount: 85,
      verified: true,
      active: true,
      lastActive: '5 hours ago',
      recentActivity: 'Posted a blog article',
      category: 'Fashion',
      rating: 4.9,
      reviewCount: 850,
      orderCount: 3200,
      trustScore: 95
    },
    {
      id: '3',
      name: 'Bella Beauty',
      slug: 'bella-beauty',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=BB',
      bannerUrl: 'bg-gradient-to-r from-pink-400 to-pink-600',
      followers: 1200,
      productCount: 200,
      verified: false,
      active: true,
      lastActive: '1 day ago',
      recentActivity: 'Running a promotion',
      category: 'Beauty',
      rating: 4.7,
      reviewCount: 560,
      orderCount: 2100,
      trustScore: 88
    }
  ]);
  
  // Filter state
  let searchQuery = $state('');
  let sortBy = $state('recently-followed');
  
  // Pagination state
  let currentPage = $state(1);
  const itemsPerPage = 12;
  
  // Filter shops
  let filteredShops = $derived(followedShops.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  ));
  
  // Sort shops
  let sortedShops = $derived([...filteredShops].sort((a, b) => {
    if (sortBy === 'recently-followed') return 0; // In real app: sort by follow date
    if (sortBy === 'most-active') return 0; // In real app: sort by activity
    if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
    return 0;
  }));

  // Paginated shops
  let paginatedShops = $derived(sortedShops.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  
  const handleUnfollow = (shopId: string) => {
    if (confirm('Are you sure you want to unfollow this shop?')) {
      followedShops = followedShops.filter(s => s.id !== shopId);
    }
  };
</script>

<svelte:head>
  <title>Following | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <!-- Section 1: Page Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:account-heart-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">Following</h1>
        <p class="text-body text-text-muted">
          {followedShops.length} shop{followedShops.length !== 1 ? 's' : ''} followed
        </p>
      </div>
    </div>
    
    <Button variant="outline" size="md" href="/shop">
      <Icon icon="mdi:store-search-outline" class="w-4 h-4 mr-2" />
      Discover Shops
    </Button>
  </section>
  
  <!-- Section 2: Search & Filters -->
  <AppFilter
    bind:searchQuery={searchQuery}
    placeholder="Search shops..."
  >
    {#snippet extraFilters()}
      <select
        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
        bind:value={sortBy}
      >
        <option value="recently-followed">Recently Followed</option>
        <option value="most-active">Most Active</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    {/snippet}
  </AppFilter>
  
  <!-- Section 3: Followed Shops Grid -->
  <section in:fade={{ duration: 400, delay: 200 }}>
    {#if sortedShops.length === 0}
      <Card className="py-16 text-center border border-gray-200">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon icon="mdi:account-heart-outline" class="w-8 h-8 text-text-muted" />
        </div>
        <h2 class="text-h2 text-text-main mb-2">No shops found</h2>
        <p class="text-body text-text-muted mb-6">Try adjusting your search or discover new shops.</p>
        <Button variant="primary" size="lg" href="/shop">
          <Icon icon="mdi:store-search-outline" class="w-5 h-5 mr-2" />
          Discover Shops
        </Button>
      </Card>
    {:else}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each paginatedShops as shop, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
            <ShopCard {shop} />
          </div>
        {/each}
      </div>

      <!-- Pagination -->
      <AppPagination
        bind:currentPage={currentPage}
        totalItems={sortedShops.length}
        {itemsPerPage}
        onPageChange={(page) => currentPage = page}
        entityName="shops"
      />
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