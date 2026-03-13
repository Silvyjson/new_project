<!-- src/routes/(vendor)/my-blog/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import BlogCard from '$lib/components/app/vendor/blog/BlogCard.svelte';
  import BlogTable from '$lib/components/app/vendor/blog/BlogTable.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import AppFilter from '$lib/components/app/common/AppFilter.svelte';
  import AppPagination from '$lib/components/app/common/AppPagination.svelte';
  
  // View mode
  let layoutView = $state<'grid' | 'table'>('grid');
  
  // Filter state
  let searchQuery = $state('');
  let statusFilter = $state('all');
  let sortBy = $state('newest');
  
  // Mock posts
  let posts = [
    {
      id: '1',
      title: 'How to Choose the Best Wireless Headphones',
      excerpt: 'A comprehensive guide to finding the perfect wireless headphones for your needs...',
      coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      shop: { name: 'TechHub', slug: 'techhub' },
      status: 'published' as const,
      views: 1204,
      likes: 52,
      publishedAt: '2026-01-08',
      slug: 'how-to-choose-wireless-headphones',
      comments: []
    },
    {
      id: '2',
      title: '5 Sneaker Trends for 2026',
      excerpt: 'Stay ahead of the curve with these upcoming sneaker trends...',
      coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      shop: { name: 'Urban Kicks', slug: 'urban-kicks' },
      status: 'published' as const,
      views: 892,
      likes: 38,
      publishedAt: '2026-01-05',
      slug: 'sneaker-trends-2026',
      comments: []
    },
    {
      id: '3',
      title: 'Winter Skincare Routine Guide',
      excerpt: 'Keep your skin healthy and glowing through the cold months...',
      coverImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
      shop: { name: 'Bella Beauty', slug: 'bella-beauty' },
      status: 'draft' as const,
      views: 0,
      likes: 0,
      slug: 'winter-skincare-routine',
      comments: []
    }
  ];
  
  // Filter and Sort posts
  let sortedPosts = $derived.by(() => {
    let result = posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
      if (sortBy === 'oldest') return new Date(a.publishedAt || 0).getTime() - new Date(b.publishedAt || 0).getTime();
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    });
  });
</script>

<svelte:head>
  <title>My Blog | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
  
  <!-- Section 1: Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:pencil-outline" class="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-text-main">My Blog</h1>
        <p class="text-body text-text-muted">Create and manage blog posts for your shops</p>
      </div>
    </div>
    
    <Button href="/my-blog/create" variant="primary" size="sm">
      <Icon icon="mdi:plus-circle-outline" class="w-5 h-5 mr-2" />
      Create Post
    </Button>
  </section>
  
  <!-- Section 2: Filters & Controls -->
  <AppFilter
    searchQuery={searchQuery}
    layoutView={layoutView}
    onSearchInput={(val) => searchQuery = val}
    onLayoutChange={(layout) => layoutView = layout}
    placeholder="Search by title..."
  >
    {#snippet extraFilters()}
      <select
        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-surface"
        bind:value={statusFilter}
      >
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="archived">Archived</option>
      </select>
      
      <select
        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-surface"
        bind:value={sortBy}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="views">Most Views</option>
      </select>
    {/snippet}
  </AppFilter>
  
  <!-- Section 3: Blog Posts -->
  <section in:fade={{ duration: 400, delay: 200 }}>
    {#if sortedPosts.length === 0}
      <Card className="py-16 text-center border border-gray-200">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon icon="mdi:pencil-outline" class="w-8 h-8 text-text-muted" />
        </div>
        <h2 class="text-h2 text-text-main mb-2">No posts found</h2>
        <p class="text-body text-text-muted mb-6">Try adjusting your filters or create your first blog post.</p>
        <Button href="/my-blog/create" variant="primary" size="lg">
          <Icon icon="mdi:plus-circle-outline" class="w-5 h-5 mr-2" />
          Create Post
        </Button>
      </Card>
    {:else if layoutView === 'grid'}
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each sortedPosts as post, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
            <BlogCard {post} />
          </div>
        {/each}
      </div>
    {:else}
      <BlogTable posts={sortedPosts} />
    {/if}
  </section>
  
  <!-- Pagination -->
  {#if sortedPosts.length > 0}
    <section in:fade={{ duration: 400, delay: 300 }}>
      <AppPagination
        currentPage={1}
        totalItems={sortedPosts.length}
        itemsPerPage={10}
        onPageChange={(page) => console.log('Page changed:', page)}
        entityName="posts"
      />
    </section>
  {/if}
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