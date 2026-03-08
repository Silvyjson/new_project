<!-- src/lib/components/home/ShopActivityCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let activity: {
    id: string;
    type: 'new_product' | 'new_blog' | 'promotion' | 'new_shop';
    shop: {
      name: string;
      slug: string;
      logo?: string;
    };
    title: string;
    description: string;
    time: string;
    product?: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    blog?: {
      id: string;
      title: string;
      excerpt: string;
    };
  };
  
  const formatTime = (time: string) => {
    const now = new Date();
    const activityTime = new Date(time);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(activityTime);
  };
  
  const getTypeIcon = (type: string) => {
    const icons = {
      new_product: 'mdi:package-variant',
      new_blog: 'mdi:post-outline',
      promotion: 'mdi:tag-outline',
      new_shop: 'mdi:store-outline'
    };
    return icons[type as keyof typeof icons];
  };
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
</script>

<Card className="border border-gray-200 p-5 hover:shadow-card-hover transition-shadow">
  <!-- Header -->
  <div class="flex items-start gap-3 mb-4">
    {#if activity.shop.logo}
      <img src={activity.shop.logo} alt={activity.shop.name} class="w-10 h-10 rounded-full object-cover" />
    {:else}
      <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
        {activity.shop.name.charAt(0)}
      </div>
    {/if}
    
    <div class="flex-1 min-w-0">
      <a href="/shop/{activity.shop.slug}" class="font-semibold text-text-main hover:text-primary transition-colors">
        {activity.shop.name}
      </a>
      <p class="text-xs text-text-muted flex items-center gap-1 mt-0.5">
        <Icon icon={getTypeIcon(activity.type)} class="w-3 h-3" />
        {activity.title}
        <span class="text-text-muted">•</span>
        <span>{formatTime(activity.time)}</span>
      </p>
    </div>
  </div>
  
  <!-- Content -->
  <p class="text-sm text-text-muted mb-4">{activity.description}</p>
  
  {#if activity.product}
    <!-- Product Preview -->
    <div class="flex gap-3 p-3 bg-gray-50 rounded-xl">
      <img
        src={activity.product.image}
        alt={activity.product.name}
        class="w-16 h-16 rounded-lg object-cover bg-gray-100"
      />
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-text-main text-sm line-clamp-2 mb-1">
          {activity.product.name}
        </h4>
        <p class="text-primary font-bold text-sm">{formatNaira(activity.product.price)}</p>
      </div>
    </div>
    
    <div class="flex gap-2 mt-4">
      <Button variant="outline" size="sm" href="/shop/{activity.shop.slug}/product/{activity.product.id}" class="flex-1">
        View Product
      </Button>
      <Button variant="ghost" size="sm">
        <Icon icon="mdi:heart-outline" class="w-4 h-4" />
      </Button>
    </div>
  {/if}
  
  {#if activity.blog}
    <!-- Blog Preview -->
    <div class="p-3 bg-gray-50 rounded-xl">
      <h4 class="font-medium text-text-main text-sm mb-1">{activity.blog.title}</h4>
      <p class="text-xs text-text-muted line-clamp-2">{activity.blog.excerpt}</p>
    </div>
    
    <Button variant="outline" size="sm" href="/blog/{activity.blog.id}" class="w-full mt-4">
      Read Article
    </Button>
  {/if}
  
  {#if activity.type === 'promotion'}
    <Button variant="primary" size="sm" href="/shop/{activity.shop.slug}" class="w-full">
      <Icon icon="mdi:tag-outline" class="w-4 h-4 mr-2" />
      View Offers
    </Button>
  {/if}
</Card>