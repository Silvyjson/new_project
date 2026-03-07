<!-- src/routes/(vendor)/my-blog/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import BlogHeader from '$lib/components/app/vendor/blog/BlogHeader.svelte';
  import BlogContent from '$lib/components/app/vendor/blog/BlogContent.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  let postId = '';
  $: if ($page.params.id) {
    postId = $page.params.id;
  }
  
  // Mock post data
  let post = {
    id: postId,
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

  const badge = getStatusBadge(post.status)
</script>

<svelte:head>
  <title>{post.title} | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8">
  
  <!-- Back Link -->
  <div class="mb-6" in:fade={{ duration: 400 }}>
    <a href="/my-blog" class="text-sm text-primary font-medium hover:underline flex items-center gap-2">
      <Icon icon="mdi:arrow-left" class="w-4 h-4" />
      Back to My Blog
    </a>
  </div>
  
  <!-- Blog Header -->
  <article in:fade={{ duration: 400, delay: 100 }}>
    <!-- Cover Image -->
    <div class="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-8">
      <img src={post.coverImage} alt={post.title} class="w-full h-full object-cover" />
    </div>
    
    <!-- Header Content -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <Badge variant={badge.variant}>{badge.label}</Badge>
        <span class="text-sm text-text-muted">•</span>
        <span class="text-sm text-text-muted flex items-center gap-1">
          <Icon icon="mdi:calendar-outline" class="w-4 h-4" />
          {formatDate(post.publishedAt)}
        </span>
      </div>
      
      <h1 class="text-3xl md:text-4xl font-bold text-text-main mb-4">{post.title}</h1>
      
      <p class="text-lg text-text-muted mb-6">{post.excerpt}</p>
      
      <!-- Meta -->
      <div class="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
        <span class="flex items-center gap-2">
          <Icon icon="mdi:store-outline" class="w-4 h-4" />
          {post.shop.name}
        </span>
        <span class="flex items-center gap-2">
          <Icon icon="mdi:eye-outline" class="w-4 h-4" />
          {formatNumber(post.views)} views
        </span>
        <span class="flex items-center gap-2">
          <Icon icon="mdi:heart-outline" class="w-4 h-4" />
          {formatNumber(post.likes)} likes
        </span>
      </div>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-8">
        {#each post.tags as tag}
          <span class="px-3 py-1 bg-gray-100 text-text-main text-sm rounded-full">#{tag}</span>
        {/each}
      </div>
      
      <!-- Vendor Actions -->
      <div class="flex gap-3">
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
      </div>
    </div>
    
    <!-- Blog Content -->
    <div class="prose prose-slate prose-lg max-w-none">
      {@html post.content}
    </div>
  </article>
</div>

<style>
  /* Prose styles for blog content */
  :global(.prose) {
    @apply text-body text-text-muted leading-relaxed;
  }
  :global(.prose h2) {
    @apply text-2xl font-bold text-text-main mt-12 mb-4;
  }
  :global(.prose h3) {
    @apply text-xl font-semibold text-text-main mt-8 mb-3;
  }
  :global(.prose p) {
    @apply mb-4;
  }
  :global(.prose ul) {
    @apply list-disc list-inside mb-4 pl-4;
  }
  :global(.prose li) {
    @apply mb-2;
  }
  :global(.prose a) {
    @apply text-primary hover:underline;
  }
  :global(.prose blockquote) {
    @apply border-l-4 border-primary pl-4 italic text-text-muted;
  }
  :global(.prose table) {
    @apply w-full border-collapse my-6;
  }
  :global(.prose th) {
    @apply text-left py-2 px-4 bg-gray-100 font-semibold;
  }
  :global(.prose td) {
    @apply py-2 px-4 border-b border-gray-200;
  }
  
  /* @media (prefers-reduced-motion: reduce) {
    .animate-fade-in {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  } */
</style>