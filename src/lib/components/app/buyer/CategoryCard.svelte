<!-- src/lib/components/home/CategoryCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let category: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    count: number;
    color: string;
  };
</script>

<a href="/shops?category={category.slug}" class="block group">
  <Card className="border border-gray-200 p-5 hover:border-primary hover:shadow-card-hover transition-all text-center">
    <div class="w-14 h-14 rounded-2xl bg-{category.color}/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
      <Icon icon={category.icon} class="w-7 h-7 text-{category.color}" />
    </div>
    <h3 class="font-semibold text-text-main mb-1">{category.name}</h3>
    <p class="text-xs text-text-muted">{category.count} shops</p>
  </Card>
</a>