<!-- src/lib/components/blog/BlogCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  interface Comment {
    id: string;
    author: {
      name: string;
      avatar?: string;
    };
    content: string;
    publishedAt: string;
    likes: number;
  }

  interface Post {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    shop: {
      name: string;
      slug: string;
    };
    status: 'draft' | 'published' | 'archived';
    views: number;
    likes: number;
    comments: Comment[];
    publishedAt?: string;
    slug: string;
  }

  interface Props {
    post: Post;
  }

  let { post }: Props = $props();
  
  // Like State
  let isLiked = $state(false);
  let localLikesDelta = $state(0);
  let likesCount = $derived(post.likes + localLikesDelta);

  const toggleLike = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isLiked = !isLiked;
    localLikesDelta += isLiked ? 1 : -1;
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
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

  const badge = $derived(getStatusBadge(post.status));
</script>

<a href="/my-blog/{post.slug}" class="block group">
  <Card padding="none" className="border border-gray-200 overflow-hidden hover:shadow-card-hover transition-all">
    <!-- Cover Image -->
    <div class="h-40 bg-gray-100 relative">
      <img
        src={post.coverImage}
        alt={post.title}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute top-3 right-3">
        <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
      </div>
      
      <!-- Overlay Heart for Grid view -->
      <button 
        class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-text-muted hover:text-primary hover:scale-110 transition-all shadow-sm z-10"
        onclick={toggleLike}
        title={isLiked ? "Unlike" : "Like"}
      >
        <Icon icon={isLiked ? "mdi:heart" : "mdi:heart-outline"} class="w-5 h-5 {isLiked ? 'text-error' : ''}" />
      </button>
    </div>
    
    <!-- Content -->
    <div class="p-4">
      <h3 class="font-bold text-lg text-text-main mb-2 line-clamp-1 group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      
      <p class="text-sm text-text-muted mb-2 line-clamp-2">{post.excerpt}</p>
      
      <!-- Meta -->
      <div class="flex items-center gap-2 mb-4 text-sm text-text-muted">
        <Icon icon="mdi:store-outline" class="w-4 h-4" />
        <span>{post.shop.name}</span>
      </div>
      
      <!-- Stats -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4 text-sm text-text-muted">
          <span class="flex items-center gap-1">
            <Icon icon="mdi:eye-outline" class="w-4 h-4" />
            {formatNumber(post.views)}
          </span>
          <span class="flex items-center gap-1">
            <Icon icon={isLiked ? "mdi:heart" : "mdi:heart-outline"} class="w-4 h-4 {isLiked ? 'text-error' : ''}" />
            {formatNumber(likesCount)}
          </span>
          <span class="flex items-center gap-1">
            <Icon icon="mdi:comment-outline" class="w-4 h-4" />
            {formatNumber(post?.comments?.length || 0)}
          </span>
        </div>
        {#if post.publishedAt}
          <span class="text-xs text-text-muted">{formatDate(post.publishedAt)}</span>
        {/if}
      </div>
      
      <!-- Actions (Vendor Specific) -->
      <div class="flex gap-2 pt-4 border-t border-gray-100">
        <Button variant="outline" size="sm" href="/my-blog/{post.slug}">
          <Icon icon="mdi:eye-outline" class="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" href="/my-blog/{post.id}/edit">
          <Icon icon="mdi:pencil-outline" class="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" class="text-error hover:bg-error/5">
          <Icon icon="mdi:delete-outline" class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </Card>
</a>