<!-- src/routes/(vendor)/my-blog/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import BlogCard from '$lib/components/app/vendor/blog/BlogCard.svelte';
  import BlogTable from '$lib/components/app/vendor/blog/BlogTable.svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  // View mode
  let viewMode = 'grid';
  
  // Filter state
  let searchQuery = '';
  let statusFilter = 'all';
  let sortBy = 'newest';
  
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
      slug: 'how-to-choose-wireless-headphones'
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
      slug: 'sneaker-trends-2026'
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
      slug: 'winter-skincare-routine'
    }
  ];
  
  // Filter posts
  $: filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Sort posts
  $: sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
    if (sortBy === 'oldest') return new Date(a.publishedAt || 0).getTime() - new Date(b.publishedAt || 0).getTime();
    if (sortBy === 'views') return b.views - a.views;
    return 0;
  });
</script>

<svelte:head>
  <title>My Blog | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8 space-y-8">
  
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
  <section in:fade={{ duration: 400, delay: 100 }}>
    <Card className="border border-gray-200 p-4">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search -->
        <div class="w-full md:w-80">
          <div class="relative">
            <input
              type="text"
              placeholder="Search by title..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
              bind:value={searchQuery}
            />
            <Icon icon="mdi:magnify" class="w-5 h-5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <!-- Controls -->
        <div class="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            bind:value={statusFilter}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            bind:value={sortBy}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="views">Most Views</option>
          </select>
          
          <!-- View Toggle -->
          <div class="flex items-center border border-gray-300 rounded-xl overflow-hidden">
            <button
              on:click={() => viewMode = 'grid'}
              class="px-3 py-2.5 hover:bg-gray-50 transition-colors {viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-text-muted'}"
              title="Grid View"
            >
              <Icon icon="mdi:view-grid-outline" class="w-5 h-5" />
            </button>
            <button
              on:click={() => viewMode = 'table'}
              class="px-3 py-2.5 hover:bg-gray-50 transition-colors {viewMode === 'table' ? 'bg-primary/10 text-primary' : 'text-text-muted'}"
              title="Table View"
            >
              <Icon icon="mdi:view-list-outline" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  </section>
  
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
    {:else if viewMode === 'grid'}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div class="flex items-center justify-between">
        <p class="text-sm text-text-muted">
          Showing {sortedPosts.length} post{sortedPosts.length !== 1 ? 's' : ''}
        </p>
        <div class="flex items-center gap-2">
          <button class="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50" disabled>
            <Icon icon="mdi:chevron-left" class="w-5 h-5" />
          </button>
          <button class="w-9 h-9 rounded-lg bg-primary text-white font-medium">1</button>
          <button class="w-9 h-9 rounded-lg border border-gray-300 text-text-main hover:border-primary transition-colors">2</button>
          <span class="text-text-muted">...</span>
          <button class="w-9 h-9 rounded-lg border border-gray-300 text-text-main hover:border-primary transition-colors">
            <Icon icon="mdi:chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  {/if}
</div>

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