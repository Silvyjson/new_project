<!-- src/lib/components/blog/BlogEditor.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let title: string;
  export let slug: string;
  export let excerpt: string;
  export let content: string;
  export let coverImage: string;
  
  const emit = (event: string, value: string) => {
    const customEvent = new CustomEvent(event, { detail: value });
    window.dispatchEvent(customEvent);
  };
  
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  const handleTitleChange = (value: string) => {
    emit('title-change', value);
    emit('slug-change', generateSlug(value));
  };
</script>

<Card className="border border-gray-200 p-6">
  <h3 class="text-lg font-bold text-text-main mb-6">Blog Content</h3>
  
  <div class="space-y-6">
    <!-- Title -->
    <Input
      label="Title"
      name="title"
      value={title}
      placeholder="Enter post title..."
      maxlength="80"
      on:input={(e) => handleTitleChange((e.target as HTMLInputElement).value)}
      hint="Maximum 80 characters"
    />
    
    <!-- Slug -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-1.5">
        URL Slug
      </label>
      <div class="flex gap-2">
        <div class="relative flex-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">/blog/</span>
          <input
            type="text"
            value={slug}
            class="w-full pl-[60px] pr-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
            placeholder="how-to-choose-wireless-headphones"
            on:input={(e) => emit('slug-change', (e.target as HTMLInputElement).value)}
          />
        </div>
        <button
          type="button"
          class="px-4 py-3 rounded-xl border border-gray-300 text-text-muted hover:border-primary hover:text-primary transition-colors"
          title="Regenerate from title"
          on:click={() => emit('slug-change', generateSlug(title))}
        >
          <Icon icon="mdi:refresh" class="w-5 h-5" />
        </button>
      </div>
    </div>
    
    <!-- Excerpt -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-1.5">
        Excerpt
      </label>
      <textarea
        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
        rows="3"
        placeholder="Brief summary for search results..."
        maxlength="120"
        bind:value={excerpt}
        on:input={(e) => emit('excerpt-change', (e.target as HTMLTextAreaElement).value)}
      ></textarea>
      <p class="text-xs text-text-muted mt-1 text-right">{excerpt.length}/120 characters</p>
    </div>
    
    <!-- Cover Image -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-1.5">
        Cover Image
      </label>
      <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors bg-gray-50">
        {#if coverImage}
          <img src={coverImage} alt="Cover" class="max-h-48 mx-auto rounded-lg mb-4" />
        {/if}
        <input type="file" accept="image/*" class="hidden" id="cover-upload" />
        <label for="cover-upload" class="cursor-pointer">
          <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:image-outline" class="w-8 h-8 text-primary" />
          </div>
          <p class="text-sm font-medium text-text-main mb-1">
            <span class="text-primary">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-text-muted">Recommended: 1200×600px PNG or JPG</p>
        </label>
      </div>
    </div>
    
    <!-- Content Editor -->
    <div>
      <label for="" class="block text-sm font-medium text-text-main mb-1.5">
        Content
      </label>
      <div class="border border-gray-200 rounded-xl overflow-hidden">
        <!-- Toolbar -->
        <div class="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
          <button type="button" class="p-2 hover:bg-gray-200 rounded" title="Bold">
            <Icon icon="mdi:format-bold" class="w-5 h-5" />
          </button>
          <button type="button" class="p-2 hover:bg-gray-200 rounded" title="Italic">
            <Icon icon="mdi:format-italic" class="w-5 h-5" />
          </button>
          <button type="button" class="p-2 hover:bg-gray-200 rounded" title="Heading">
            <Icon icon="mdi:format-header-pound" class="w-5 h-5" />
          </button>
          <button type="button" class="p-2 hover:bg-gray-200 rounded" title="Link">
            <Icon icon="mdi:link-variant" class="w-5 h-5" />
          </button>
          <button type="button" class="p-2 hover:bg-gray-200 rounded" title="Image">
            <Icon icon="mdi:image-outline" class="w-5 h-5" />
          </button>
          <button type="button" class="p-2 hover:bg-gray-200 rounded" title="Code">
            <Icon icon="mdi:code-tags" class="w-5 h-5" />
          </button>
          <button type="button" class="p-2 hover:bg-gray-200 rounded" title="Bullet List">
            <Icon icon="mdi:format-list-bulleted" class="w-5 h-5" />
          </button>
          <button type="button" class="p-2 hover:bg-gray-200 rounded" title="Link Product">
            <Icon icon="mdi:package-variant" class="w-5 h-5 text-primary" />
          </button>
        </div>
        
        <!-- Editor -->
        <textarea
          class="w-full min-h-[400px] p-4 outline-none resize-none text-body font-mono"
          placeholder="Write your blog post content... (Markdown supported)"
          bind:value={content}
          on:input={(e) => emit('content-change', (e.target as HTMLTextAreaElement).value)}
        ></textarea>
      </div>
      <p class="text-xs text-text-muted mt-2">
        <Icon icon="mdi:lightbulb-outline" class="w-4 h-4 inline mr-1" />
        Use markdown: **bold**, *italic*, # heading, - list
      </p>
    </div>
  </div>
</Card>