<!-- src/lib/components/blog/BlogSettings.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let shops: Array<{ id: string; name: string; slug: string }>;
  export let selectedShop: string;
  export let status: 'draft' | 'published';
  export let tags: string;
  export let seoTitle: string;
  export let seoDescription: string;
  
  const emit = (event: string, value: string) => {
    const customEvent = new CustomEvent(event, { detail: value });
    window.dispatchEvent(customEvent);
  };
</script>

<Card className="border border-gray-200 p-6 sticky top-24">
  <h3 class="text-lg font-bold text-text-main mb-6">Post Settings</h3>
  
  <div class="space-y-6">
    <!-- Shop Selector -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-1.5">
        Shop
      </label>
      <select
        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
        bind:value={selectedShop}
        on:change={(e) => emit('shop-change', (e.target as HTMLSelectElement).value)}
      >
        <option value="">Select shop...</option>
        {#each shops as shop}
          <option value={shop.id}>{shop.name}</option>
        {/each}
      </select>
    </div>
    
    <!-- Status -->
    <!-- <div>
      <label for="" class="block text-sm font-medium text-text-main mb-2">Status</label>
      <div class="flex gap-3">
        <label for="" class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value="draft"
            bind:group={status}
            class="w-4 h-4 text-primary"
            on:change={(e) => emit('status-change', (e.target as HTMLInputElement).value)}
          />
          <span class="text-body text-text-main flex items-center gap-1">
            <Icon icon="mdi:file-document-outline" class="w-4 h-4" />
            Draft
          </span>
        </label>
        <label for="" class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value="published"
            bind:group={status}
            class="w-4 h-4 text-primary"
            on:change={(e) => emit('status-change', (e.target as HTMLInputElement).value)}
          />
          <span class="text-body text-text-main flex items-center gap-1">
            <Icon icon="mdi:publish" class="w-4 h-4" />
            Published
          </span>
        </label>
      </div>
    </div> -->
    
    <!-- Tags -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-1.5">
        Tags
      </label>
      <div class="relative">
        <Icon icon="mdi:tag-outline" class="w-5 h-5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="tech, gadgets, tutorial (comma separated)"
          class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
          bind:value={tags}
          on:input={(e) => emit('tags-change', (e.target as HTMLInputElement).value)}
        />
      </div>
      <p class="text-xs text-text-muted mt-1">Separate tags with commas</p>
    </div>
    
    <!-- SEO Title -->
    <Input
      label="SEO Title (Optional)"
      name="seoTitle"
      value={seoTitle}
      placeholder="Overrides page title for search engines"
      on:input={(e) => emit('seo-title-change', (e.target as HTMLInputElement).value)}
    />
    
    <!-- SEO Description -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-1.5">
        SEO Description (Optional)
      </label>
      <textarea
        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
        rows="3"
        placeholder="Meta description for search results..."
        maxlength="160"
        bind:value={seoDescription}
        on:input={(e) => emit('seo-description-change', (e.target as HTMLTextAreaElement).value)}
      ></textarea>
      <p class="text-xs text-text-muted mt-1 text-right">{seoDescription.length}/160 characters</p>
    </div>
    
    <!-- Product Links -->
    <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
      <div class="flex items-center gap-2 mb-3">
        <Icon icon="mdi:package-variant" class="w-5 h-5 text-primary" />
        <span class="text-sm font-medium text-text-main">Link Products</span>
      </div>
      <p class="text-xs text-text-muted mb-3">
        Link products mentioned in this post to drive conversions.
      </p>
      <Button variant="outline" size="sm" class="w-full">
        <Icon icon="mdi:plus-circle-outline" class="w-4 h-4 mr-2" />
        Add Product Link
      </Button>
    </div>
  </div>
</Card>