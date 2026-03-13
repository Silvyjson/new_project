<!-- src/routes/(vendor)/my-blog/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import BlogComments from '$lib/components/app/vendor/blog/BlogComments.svelte';
  
  let postId = $derived($page.params.id);
  
  // Mock post data (using $state to make it reactive for likes/comments)
  let post = $state({
    id: '1',
    title: 'How to Choose the Best Wireless Headphones',
    excerpt: 'A comprehensive guide to finding the perfect wireless headphones for your needs...',
    content: `
# How to Choose the Best Wireless Headphones

Wireless headphones have revolutionized how we listen to music, take calls, and consume media. But with so many options available, choosing the right pair can be overwhelming.

## Key Factors to Consider

### 1. Sound Quality
- **Driver size**: Larger drivers (40mm+) generally produce better bass
- **Frequency response**: Look for 20Hz-20kHz for full range
- **Codec support**: aptX, AAC, or LDAC for high-quality streaming

### 2. Battery Life
- Minimum 20 hours for daily use
- Quick charge feature (15 min = 3 hours)
- USB-C charging preferred

### 3. Comfort & Fit
- Memory foam ear cushions
- Adjustable headband
- Weight under 300g for extended wear

### 4. Connectivity
- Bluetooth 5.0+ for stable connection
- Multi-point pairing for multiple devices
- Low latency mode for gaming/video

## Top Recommendations

| Model | Battery | Price | Best For |
|-------|---------|-------|----------|
| Sony WH-1000XM5 | 30h | ₦180K | Noise cancellation |
| Bose QC45 | 24h | ₦165K | Comfort |
| Sennheiser Momentum 4 | 60h | ₦195K | Sound quality |

## Final Tips

> "The best headphones are the ones you'll actually wear."

Consider your primary use case:
- Commuting → Noise cancellation
- Gaming → Low latency
- Travel → Long battery life
- Office → Comfort for all-day wear

[Shop our wireless headphones collection →](/shop/techhub)
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    shop: { name: 'TechHub', slug: 'techhub' },
    author: 'TechHub Team',
    publishedAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-08T10:00:00Z',
    status: 'published' as const,
    views: 1204,
    likes: 52,
    tags: ['tech', 'headphones', 'buying-guide', 'audio'],
    slug: 'how-to-choose-wireless-headphones'
  });

  // Like State
  let isLiked = $state(false);
  let likesCount = $derived(post.likes + (isLiked ? 1 : 0));

  // Comments State
  let comments = $state([
    {
      id: '1',
      author: { name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex' },
      content: 'This was such a helpful guide! I learned a lot about what to look for in wireless headphones.',
      publishedAt: '2026-02-15T10:30:00Z',
      likes: 5,
      replies: []
    }
  ]);

  const toggleLike = () => {
    isLiked = !isLiked;
  };

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      author: { name: 'Vendor Admin (You)', avatar: '' },
      content,
      publishedAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    comments = [newComment, ...comments];
  };
  
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

  const badge = $derived(getStatusBadge(post.status));
</script>

<svelte:head>
  <title>{post.title} | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8">
  <!-- Back Link -->
  <div class="mb-6" in:fade={{ duration: 400 }}>
    <a href="/my-blog" class="text-sm text-primary font-medium hover:underline flex items-center gap-2">
      <Icon icon="mdi:arrow-left" class="w-4 h-4" />
      Back to My Blog
    </a>
  </div>
  
  <article in:fade={{ duration: 400, delay: 100 }}>
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Cover Image -->
        <div class="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <img src={post.coverImage} alt={post.title} class="w-full h-full object-cover" />
        </div>

        <!-- content header -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <Badge variant={badge.variant}>{badge.label}</Badge>
            <span class="text-sm text-text-muted">•</span>
            <span class="text-sm text-text-muted flex items-center gap-1">
              <Icon icon="mdi:calendar-outline" class="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold text-text-main mb-6">{post.title}</h1>
          
          <!-- Blog Content -->
          <div class="prose prose-slate prose-lg max-w-none border-b border-gray-100 pb-12 mb-12">
            {@html post.content}
          </div>

          <!-- Interaction Stats -->
          <div class="flex items-center gap-6 py-6 border-y border-gray-50 mb-12">
            <button 
              class="flex items-center gap-2 text-text-muted hover:text-primary transition-colors"
              onclick={toggleLike}
            >
              <Icon icon={isLiked ? "mdi:heart" : "mdi:heart-outline"} class="w-6 h-6 {isLiked ? 'text-error' : ''}" />
              <span class="font-medium">{formatNumber(likesCount)} Likes</span>
            </button>
            <div class="flex items-center gap-2 text-text-muted">
              <Icon icon="mdi:eye-outline" class="w-6 h-6" />
              <span class="font-medium">{formatNumber(post.views)} Views</span>
            </div>
            <div class="flex items-center gap-2 text-text-muted">
              <Icon icon="mdi:comment-outline" class="w-6 h-6" />
              <span class="font-medium">{comments.length} Comments</span>
            </div>
          </div>

          <!-- Comments -->
          <BlogComments 
            comments={comments}
            onAddComment={handleAddComment}
          />
        </div>
      </div>

      <!-- Sidebar / Actions -->
      <div class="lg:col-span-1 space-y-6">
        <div class="sticky top-24 p-6 rounded-2xl border border-gray-100 bg-surface shadow-sm space-y-6">
          <h3 class="font-bold text-text-main">Post Management</h3>
          
          <div class="space-y-3">
            <Button variant="primary" className="w-full justify-center" href="/my-blog/{post.id}/edit">
              <Icon icon="mdi:pencil-outline" class="w-4 h-4 mr-2" />
              Edit Post
            </Button>
            <Button variant="outline" className="w-full justify-center" href="/blog/{post.slug}" target="_blank">
              <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-2" />
              View Public
            </Button>
            <Button variant="ghost" size="md" class="w-full justify-center text-error hover:bg-error/5">
              <Icon icon="mdi:delete-outline" class="w-4 h-4 mr-2" />
              Delete Post
            </Button>
          </div>

          <div class="pt-6 border-t border-gray-100">
            <h4 class="text-sm font-semibold text-text-main mb-3">Tags</h4>
            <div class="flex flex-wrap gap-2">
              {#each post.tags as tag}
                <span class="px-3 py-1 bg-gray-50 text-text-muted text-xs rounded-full border border-gray-100">#{tag}</span>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</main>

<style>
  /* Prose styles for blog content */
  :global(.prose) {
    color: var(--color-text-muted);
    line-height: 1.8;
  }

  :global(.prose h2) {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-main);
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  :global(.prose h3) {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-main);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  :global(.prose p) {
    margin-bottom: 1rem;
  }

  :global(.prose ul) {
    list-style-type: disc;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  :global(.prose li) {
    margin-bottom: 0.5rem;
  }

  :global(.prose a) {
    color: var(--color-primary);
  }

  :global(.prose a:hover) {
    text-decoration: underline;
  }

  :global(.prose blockquote) {
    border-left: 4px solid var(--color-primary);
    padding-left: 1rem;
    font-style: italic;
    color: var(--color-text-muted);
    margin: 1.5rem 0;
  }

  :global(.prose table) {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
  }

  :global(.prose th) {
    text-align: left;
    padding: 0.75rem 1rem;
    background: #f8fafc;
    font-weight: 600;
    font-size: 0.875rem;
  }

  :global(.prose td) {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.875rem;
  }
</style>
 -->