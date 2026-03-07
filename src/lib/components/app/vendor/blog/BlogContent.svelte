<!-- src/lib/components/blog/BlogContent.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  
  export let content: string;
  export let linkedProducts: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    shopSlug: string;
  }> = [];
  
  // Sanitize and render content
  // In real app: use DOMPurify or similar for XSS protection
  $: sanitizedContent = content; // TODO: Add sanitization
  
  onMount(() => {
    // Add click handlers for product links
    const productLinks = document.querySelectorAll('a[data-product-id]');
    productLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = (link as HTMLElement).dataset.productId;
        // In real app: open product modal or navigate
        console.log(`Product link clicked: ${productId}`);
      });
    });
    
    // Add lazy loading to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  });
</script>

<article class="prose prose-slate prose-lg max-w-none">
  {@html sanitizedContent}
</article>

<!-- Linked Products Section (if any) -->
{#if linkedProducts?.length}
  <section class="mt-12 pt-8 border-t border-gray-200">
    <h3 class="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
      <Icon icon="mdi:package-variant" class="w-5 h-5 text-primary" />
      Products Mentioned
    </h3>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each linkedProducts as product}
        <a
          href="/shop/{product.shopSlug}/product/{product.id}"
          class="flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-primary hover:shadow-card-hover transition-all group"
          target="_blank"
        >
          <img
            src={product.image}
            alt={product.name}
            class="w-20 h-20 rounded-lg object-cover bg-gray-100 flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-text-main mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h4>
            <p class="text-lg font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </p>
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}

<!-- Share Section -->
<section class="mt-12 pt-8 border-t border-gray-200">
  <h3 class="text-lg font-bold text-text-main mb-4">Share this post</h3>
  <div class="flex items-center gap-3">
    <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors" aria-label="Share on Facebook">
      <Icon icon="mdi:facebook" class="w-5 h-5" />
    </button>
    <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors" aria-label="Share on Twitter">
      <Icon icon="mdi:twitter" class="w-5 h-5" />
    </button>
    <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors" aria-label="Share on Instagram">
      <Icon icon="mdi:instagram" class="w-5 h-5" />
    </button>
    <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors" aria-label="Share on WhatsApp">
      <Icon icon="mdi:whatsapp" class="w-5 h-5" />
    </button>
    <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Copy link">
      <Icon icon="mdi:link-variant" class="w-5 h-5" />
    </button>
  </div>
</section>

<!-- <style>
  /* Prose typography styles for blog content */
  :global(.prose) {
    @apply text-[#64748B] leading-relaxed;
  }

  :global(.prose h2) {
    @apply text-[40px] font-bold text-[#0F172A] mt-12 mb-4;
  }

  :global(.prose h3) {
    @apply text-[28px] font-semibold text-[#0F172A] mt-8 mb-3;
  }

  :global(.prose h4) {
    @apply text-[20px] font-medium text-[#0F172A] mt-6 mb-2;
  }

  :global(.prose p) {
    @apply text-[16px] mb-4;
  }

  :global(.prose ul) {
    @apply list-disc list-inside mb-4 pl-4;
  }

  :global(.prose ol) {
    @apply list-decimal list-inside mb-4 pl-4;
  }

  :global(.prose li) {
    @apply mb-2;
  }

  :global(.prose a) {
    @apply text-[#1D4ED8] hover:underline font-medium;
  }

  :global(.prose blockquote) {
    @apply border-l-4 border-[#1D4ED8] pl-4 italic text-[#64748B] my-6;
  }

  :global(.prose code) {
    @apply bg-[#F1F5F9] px-1.5 py-0.5 rounded text-[14px];
  }

  :global(.prose pre) {
    @apply bg-[#0F172A] text-[#FFFFFF] p-4 rounded-[16px] overflow-x-auto my-6;
  }

  :global(.prose pre code) {
    @apply bg-transparent p-0 text-inherit;
  }

  :global(.prose img) {
    @apply rounded-[16px] my-6 max-w-full h-auto;
  }

  :global(.prose table) {
    @apply w-full border-collapse my-6;
  }

  :global(.prose th) {
    @apply text-left py-3 px-4 bg-[#F1F5F9] font-semibold text-[#0F172A] border-b border-[#E2E8F0];
  }

  :global(.prose td) {
    @apply py-3 px-4 border-b border-[#F1F5F9] text-[#64748B];
  }

  :global(.prose hr) {
    @apply my-8 border-[#E2E8F0];
  }

  /* Responsive typography */
  @media (max-width: 640px) {
    :global(.prose) {
      @apply text-[16px];
    }

    :global(.prose h2) {
      @apply text-[28px];
    }

    :global(.prose h3) {
      @apply text-[20px];
    }
  }
</style> -->