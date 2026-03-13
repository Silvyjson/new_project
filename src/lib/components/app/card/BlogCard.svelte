<script lang="ts">
  import Card from "$lib/components/common/Card.svelte";
  import Badge from "$lib/components/common/Badge.svelte";

  export let post: any;
  
   // Format date
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    // Get category color class
    const getCategoryColorClass = (
        color: string,
    ): "default" | "success" | "warning" | "danger" | "info" => {
        const colors: Record<
            string,
            "default" | "success" | "warning" | "danger" | "info"
        > = {
            indigo: "info",
            purple: "default",
            blue: "info",
            success: "success",
            gray: "default",
        };
        return colors[color] || "default";
    };
</script>

<Card
  hover={true}
  padding="none"
  className="overflow-hidden border border-gray-200 group"
>
  <a
    href={`/blog/${post.slug}`}
    class="block relative aspect-video bg-gray-100 overflow-hidden"
  >
    <img
      src={post.coverImage}
      alt={post.title}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <Badge
      variant={getCategoryColorClass(post.categoryColor)}
      className="absolute top-3 left-3">{post.category}</Badge
    >
  </a>

  <div class="p-4">
    <h3
      class="text-lg font-semibold text-text-main mb-2 line-clamp-2 group-hover:text-primary transition-colors"
    >
      <a href={`/blog/${post.slug}`}>{post.title}</a>
    </h3>
    <p class="text-small text-text-muted mb-4 line-clamp-2">{post.excerpt}</p>

    <div class="flex flex-col gap-2 justify-between">
      <div class="flex items-center gap-2">
        <img
          src={post.author.logo}
          alt=""
          class="w-8 h-8 rounded-full object-cover text-sm"
        />
        <div class="flex flex-col flex-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-text-main">{post.author.name}</span>
            <div class="flex items-center gap-3 text-xs text-text-muted">
              <span class="flex items-center gap-1">
                <Icon icon="mdi:heart-outline" class="w-3.5 h-3.5" />
                {post.likes || 0}
              </span>
              <span class="flex items-center gap-1">
                <Icon icon="mdi:comment-outline" class="w-3.5 h-3.5" />
                {post.comments?.length || 0}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-1">
            {#if post.publishedAt}
              <span class="text-xs text-text-muted">{formatDate(post.publishedAt)}</span>
              <span class="text-xs text-text-muted">•</span>
            {/if}
            <span class="text-xs text-text-muted">{post.readTime} min Read</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</Card>

<script context="module">
  import Icon from "@iconify/svelte";
</script>

<style>
  /* component-local styles (if needed) */
</style>
