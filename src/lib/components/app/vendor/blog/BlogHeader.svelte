<!-- src/lib/components/blog/BlogHeader.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let post: {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    shop: {
      name: string;
      slug: string;
    };
    author?: string;
    status: 'draft' | 'published' | 'archived';
    views: number;
    likes: number;
    publishedAt?: string;
    updatedAt?: string;
    tags: string[];
    slug: string;
  };
  
  export let isVendor: boolean = true;
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };
  
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { variant: 'warning' as const, label: 'Draft' },
      published: { variant: 'success' as const, label: 'Published' },
      archived: { variant: 'info' as const, label: 'Archived' }
    };
    return badges[status as keyof typeof badges];
  };

    const badge = getStatusBadge(post.status)
</script>

<!-- Cover Image -->
<div class="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-8 relative">
  <img src={post.coverImage} alt={post.title} class="w-full h-full object-cover" />
  
  <!-- Status Badge (Overlay) -->
  <div class="absolute top-4 right-4">
    <Badge variant={badge.variant} size="lg">{badge.label}</Badge>
  </div>
</div>

<!-- Header Content -->
<div class="mb-8">
  <!-- Meta Row -->
  <div class="flex flex-wrap items-center gap-3 mb-4">
    <Badge variant={badge.variant}>{badge.label}</Badge>
    
    {#if post.publishedAt}
      <span class="text-sm text-text-muted flex items-center gap-1">
        <Icon icon="mdi:calendar-outline" class="w-4 h-4" />
        Published {formatDate(post.publishedAt)}
      </span>
    {/if}
    
    {#if post.updatedAt && post.updatedAt !== post.publishedAt}
      <span class="text-sm text-text-muted flex items-center gap-1">
        <Icon icon="mdi:clock-edit-outline" class="w-4 h-4" />
        Updated {formatDate(post.updatedAt)}
      </span>
    {/if}
  </div>
  
  <!-- Title -->
  <h1 class="text-3xl md:text-4xl font-bold text-text-main mb-4 leading-tight">
    {post.title}
  </h1>
  
  <!-- Excerpt -->
  <p class="text-lg text-text-muted mb-6 leading-relaxed">{post.excerpt}</p>
  
  <!-- Meta Info -->
  <div class="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
    <!-- Shop -->
    <a
      href="/shop/{post.shop.slug}"
      class="flex items-center gap-2 hover:text-primary transition-colors"
      target="_blank"
    >
      <Icon icon="mdi:store-outline" class="w-4 h-4" />
      <span class="font-medium">{post.shop.name}</span>
    </a>
    
    <!-- Author (if available) -->
    {#if post.author}
      <span class="flex items-center gap-2">
        <Icon icon="mdi:account-outline" class="w-4 h-4" />
        <span>{post.author}</span>
      </span>
    {/if}
    
    <!-- Views -->
    <span class="flex items-center gap-2">
      <Icon icon="mdi:eye-outline" class="w-4 h-4" />
      {formatNumber(post.views)} views
    </span>
    
    <!-- Likes -->
    <span class="flex items-center gap-2">
      <Icon icon="mdi:heart-outline" class="w-4 h-4" />
      {formatNumber(post.likes)} likes
    </span>
  </div>
  
  <!-- Tags -->
  {#if post.tags?.length}
    <div class="flex flex-wrap gap-2 mb-8">
      {#each post.tags as tag}
        <span class="px-3 py-1 bg-gray-100 text-text-main text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
          #{tag}
        </span>
      {/each}
    </div>
  {/if}
  
  <!-- Vendor Actions (Only visible to vendor) -->
  {#if isVendor}
    <div class="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
      <Button variant="outline" size="md" href="/my-blog/{post.id}/edit">
        <Icon icon="mdi:pencil-outline" class="w-4 h-4 mr-2" />
        Edit Post
      </Button>
      <Button variant="ghost" size="md" class="text-error hover:bg-error/5">
        <Icon icon="mdi:delete-outline" class="w-4 h-4 mr-2" />
        Delete
      </Button>
      <Button variant="outline" size="md" href="/blog/{post.slug}" target="_blank">
        <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-2" />
        View Public
      </Button>
      {#if post.status === 'published'}
        <Button variant="ghost" size="md">
          <Icon icon="mdi:link-variant" class="w-4 h-4 mr-2" />
          Copy Link
        </Button>
      {/if}
    </div>
  {/if}
</div>