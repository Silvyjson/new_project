<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let category: {
    id: string;
    name: string;
    slug: string;
    icon: string;
    count: number;
    color: string;
  };
</script>

<a href="/shop?category={category.slug}" class="block group">
  <Button size="sm" variant="outline" className="border p-3 hover:shadow-md transition-all">
    
    <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
      <Icon icon={category.icon} class="w-5 h-5 text-blue-600" />
    </div>

    <div class="flex flex-col items-start ml-2">
      <h3 class="text-sm font-semibold">{category.name}</h3>
      <p class="text-xs">{category.count} shops</p>
    </div>

  </Button>
</a>