<!-- src/routes/(vendor)/my-blog/[id]/edit/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import BlogEditor from '$lib/components/app/vendor/blog/BlogEditor.svelte';
  import BlogSettings from '$lib/components/app/vendor/blog/BlogSettings.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  let postId = '';
  $: if ($page.params.id) {
    postId = $page.params.id;
  }
  
  // Mock shops
  let shops = [
    { id: '1', name: 'TechHub', slug: 'techhub' },
    { id: '2', name: 'Urban Kicks', slug: 'urban-kicks' },
    { id: '3', name: 'Bella Beauty', slug: 'bella-beauty' }
  ];
  
  // Mock post data (in real app: fetch from API)
  let post = {
    id: postId,
    title: 'How to Choose the Best Wireless Headphones',
    slug: 'how-to-choose-wireless-headphones',
    excerpt: 'A comprehensive guide to finding the perfect wireless headphones for your needs...',
    content: '# How to Choose...\n\nWireless headphones have revolutionized...',
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    shopId: '1',
    status: 'published' as const,
    tags: 'tech, headphones, buying-guide, audio',
    seoTitle: '',
    seoDescription: ''
  };
  
  // Form state (pre-filled from post)
  let title = post.title;
  let slug = post.slug;
  let excerpt = post.excerpt;
  let content = post.content;
  let coverImage = post.coverImage;
  let selectedShop = post.shopId;
  let status: 'draft' | 'published' = post.status;
  let tags = post.tags;
  let seoTitle = post.seoTitle;
  let seoDescription = post.seoDescription;
  
  // Auto-save timer
  let autoSaveTimer: ReturnType<typeof setTimeout>;
  
  const handleUpdate = (publishStatus: 'draft' | 'published') => {
    status = publishStatus;
    // In real app: API call to update post
    console.log('Updating post', { id: postId, title, status });
  };
  
  const handlePreview = () => {
    alert('Preview mode coming soon!');
  };
  
  // Auto-save every 10 seconds
  onMount(() => {
    autoSaveTimer = setInterval(() => {
      if (title !== post.title || content !== post.content) {
        console.log('Auto-saving draft...');
        // In real app: API call to auto-save
      }
    }, 10000);
    
    return () => clearInterval(autoSaveTimer);
  });
  
  // Warn on page leave with unsaved changes
  onMount(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (title !== post.title || content !== post.content) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });
</script>

<svelte:head>
  <title>Edit {post.title} | VendorHub</title>
</svelte:head>

<main class="max-w-[1400px] mx-auto px-4 py-8">
  
  <!-- Page Header -->
  <div class="mb-8" in:fade={{ duration: 400 }}>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:pencil-outline" class="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-text-main">Edit Blog Post</h1>
          <p class="text-body text-text-muted">{post.title}</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Two Column Layout -->
  <div class="grid lg:grid-cols-3 gap-8">
    <!-- Left: Editor -->
    <div class="lg:col-span-2 space-y-6" in:fade={{ duration: 400, delay: 100 }}>
      <BlogEditor
        title={title}
        slug={slug}
        excerpt={excerpt}
        content={content}
        coverImage={coverImage}
        isEdit={true}
        on:title-change={(e) => title = e.detail}
        on:slug-change={(e) => slug = e.detail}
        on:excerpt-change={(e) => excerpt = e.detail}
        on:content-change={(e) => content = e.detail}
      />
    </div>
    
    <!-- Right: Settings -->
    <div class="lg:col-span-1" in:fade={{ duration: 400, delay: 200 }}>
      <BlogSettings
        shops={shops}
        selectedShop={selectedShop}
        status={status}
        tags={tags}
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        on:shop-change={(e) => selectedShop = e.detail}
        on:status-change={(e) => status = e.detail as 'draft' | 'published'}
        on:tags-change={(e) => tags = e.detail}
        on:seo-title-change={(e) => seoTitle = e.detail}
        on:seo-description-change={(e) => seoDescription = e.detail}
      />
      
      <!-- Update Controls -->
      <div class="mt-6 space-y-3">
        <Button
          variant="primary"
          size="lg"
          class="w-full"
          onclick={() => handleUpdate('published')}
        >
          <Icon icon="mdi:update" class="w-5 h-5 mr-2" />
          Update Post
        </Button>
        <Button
          variant="outline"
          size="lg"
          class="w-full"
          onclick={() => handleUpdate('draft')}
        >
          <Icon icon="mdi:content-save-outline" class="w-5 h-5 mr-2" />
          Save Draft
        </Button>
        <Button
          variant="ghost"
          size="lg"
          class="w-full"
          onclick={handlePreview}
        >
          <Icon icon="mdi:eye-outline" class="w-5 h-5 mr-2" />
          Preview
        </Button>
      </div>
      
      <p class="text-xs text-text-muted text-center mt-4">
        <Icon icon="mdi:clock-outline" class="w-4 h-4 inline mr-1" />
        Auto-saving every 10 seconds
      </p>
    </div>
  </div>
</main>

<!-- <style>
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style> -->