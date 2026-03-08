<!-- src/routes/(app)/home/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import ShopActivityCard from '$lib/components/app/buyer/ShopActivityCard.svelte';
  // import OrderSummaryCard from '$lib/components/app/buyer/OrderSummaryCard.svelte';
  import CategoryCard from '$lib/components/app/buyer/CategoryCard.svelte';
  import ShopCard from '$lib/components/app/card/ShopCard.svelte';
  import ProductCard from '$lib/components/app/card/ProductCard.svelte';
  import BlogCard from '$lib/components/app/card/BlogCard.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  // Mock user
  let user = { name: 'John' };
  
  // Mock recent orders
  let recentOrders = [
    {
      id: '1',
      code: 'VH-2043',
      status: 'IN_DELIVERY',
      total: 45000,
      items: 2,
      estimatedDelivery: 'Tomorrow',
      shop: { name: 'TechHub', slug: 'techhub' }
    },
    {
      id: '2',
      code: 'VH-2039',
      status: 'DELIVERED',
      total: 28000,
      items: 1,
      shop: { name: 'Urban Kicks', slug: 'urban-kicks' }
    }
  ];
  
  // Mock followed shops
  let followedShops = [
    {
      id: '1',
      name: 'TechHub',
      slug: 'techhub',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TH',
      banner: 'bg-gradient-to-r from-blue-400 to-blue-600',
      followers: 2340,
      products: 120,
      verified: true,
      active: true
    },
    {
      id: '2',
      name: 'Urban Kicks',
      slug: 'urban-kicks',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=UK',
      banner: 'bg-gradient-to-r from-purple-400 to-purple-600',
      followers: 1890,
      products: 85,
      verified: true,
      active: true
    },
    {
      id: '3',
      name: 'Bella Beauty',
      slug: 'bella-beauty',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BB',
      banner: 'bg-gradient-to-r from-pink-400 to-pink-600',
      followers: 1200,
      products: 200,
      verified: false,
      active: true
    }
  ];
  
  // Mock recommended shops
  let recommendedShops = [
    {
      id: '4',
      name: 'Home Essentials',
      slug: 'home-essentials',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HE',
      banner: 'bg-gradient-to-r from-green-400 to-green-600',
      followers: 890,
      products: 150,
      verified: true,
      active: true
    },
    {
      id: '5',
      name: 'Gadget Pro',
      slug: 'gadget-pro',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GP',
      banner: 'bg-gradient-to-r from-orange-400 to-orange-600',
      followers: 1560,
      products: 95,
      verified: true,
      active: true
    }
  ];
  
  // Mock trending products
  let trendingProducts = [
    {
      id: 'p_001',
      name: 'Wireless Headphones Pro',
      price: 24000,
      oldPrice: 30000,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      shop: { name: 'TechHub', slug: 'techhub' },
      rating: 4.8,
      reviews: 124,
      inStock: true
    },
    {
      id: 'p_002',
      name: 'Air Jordan Retro High',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      shop: { name: 'Urban Kicks', slug: 'urban-kicks' },
      rating: 4.9,
      reviews: 89,
      inStock: true
    },
    {
      id: 'p_003',
      name: 'Organic Face Cream',
      price: 12000,
      oldPrice: 15000,
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
      shop: { name: 'Bella Beauty', slug: 'bella-beauty' },
      rating: 4.7,
      reviews: 56,
      inStock: true
    },
    {
      id: 'p_004',
      name: 'Smart Watch Series 5',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      shop: { name: 'Gadget Pro', slug: 'gadget-pro' },
      rating: 4.6,
      reviews: 203,
      inStock: true
    },
    {
      id: 'p_005',
      name: 'Minimalist Desk Lamp',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1507473888900-52fe75fa453e',
      shop: { name: 'Home Essentials', slug: 'home-essentials' },
      rating: 4.5,
      reviews: 78,
      inStock: true
    }
  ];
  
  // Mock shop activities
  let shopActivities = [
    {
      id: 'a_001',
      type: 'new_product' as const,
      shop: { name: 'TechHub', slug: 'techhub', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TH' },
      title: 'added a new product',
      description: 'Check out their latest wireless headphones with noise cancellation',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      product: {
        id: 'p_001',
        name: 'Wireless Headphones Pro',
        price: 24000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
      }
    },
    {
      id: 'a_002',
      type: 'new_blog' as const,
      shop: { name: 'Urban Kicks', slug: 'urban-kicks', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=UK' },
      title: 'posted a new article',
      description: '5 Sneaker Trends for 2026',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      blog: {
        id: 'b_001',
        title: '5 Sneaker Trends for 2026',
        excerpt: 'Stay ahead of the curve with these upcoming sneaker trends...'
      }
    },
    {
      id: 'a_003',
      type: 'promotion' as const,
      shop: { name: 'Bella Beauty', slug: 'bella-beauty', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BB' },
      title: 'is running a promotion',
      description: 'Get 20% off on all skincare products this week',
      time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  // Mock categories
  let categories = [
    { id: '1', name: 'Electronics', slug: 'electronics', icon: 'mdi:headphones', count: 234, color: 'blue' },
    { id: '2', name: 'Fashion', slug: 'fashion', icon: 'mdi:tshirt-crew', count: 189, color: 'pink' },
    { id: '3', name: 'Beauty', slug: 'beauty', icon: 'mdi:lipstick', count: 156, color: 'purple' },
    { id: '4', name: 'Home', slug: 'home', icon: 'mdi:sofa', count: 142, color: 'green' },
    { id: '5', name: 'Sports', slug: 'sports', icon: 'mdi:soccer', count: 98, color: 'orange' },
    { id: '6', name: 'Accessories', slug: 'accessories', icon: 'mdi:watch', count: 176, color: 'yellow' }
  ];
  
  // Mock recently viewed
  let recentlyViewed = trendingProducts.slice(0, 4);
</script>

<svelte:head>
  <title>Home | VendorHub</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8 space-y-10">
  
  <!-- Section 1: Welcome Header -->
  <section class="flex flex-col md:flex-row md:items-center justify-between gap-4" in:fade={{ duration: 400 }}>
    <div>
      <h1 class="text-3xl font-bold text-text-main mb-2">
        Welcome back, {user.name} 👋
      </h1>
      <p class="text-body text-text-muted">Discover shops and products tailored for you</p>
    </div>
    
    <div class="flex gap-3">
      <Button variant="outline" size="sm" href="/orders">
        <Icon icon="mdi:package-variant" class="w-4 h-4 mr-2" />
        My Orders
      </Button>
      <Button variant="outline" size="sm" href="/wishlist">
        <Icon icon="mdi:heart-outline" class="w-4 h-4 mr-2" />
        Saved
      </Button>
    </div>
  </section>
  
  <!-- Section 2: Quick Order Status -->
  <!-- <section in:fade={{ duration: 400, delay: 100 }}>
    <OrderSummaryCard orders={recentOrders} />
  </section> -->
  
  <!-- Section 3: Shops You Follow -->
  {#if followedShops.length > 0}
    <section in:fade={{ duration: 400, delay: 200 }}>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-text-main">Shops You Follow</h2>
        <Button variant="ghost" size="sm" href="/following">
          See All
          <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each followedShops.slice(0, 4) as shop, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
            <ShopCard {shop} />
          </div>
        {/each}
      </div>
    </section>
  {/if}
  
  <!-- Section 4: Recommended Shops -->
  <section in:fade={{ duration: 400, delay: 300 }}>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-text-main">Recommended Shops</h2>
        <p class="text-sm text-text-muted">Based on your activity and interests</p>
      </div>
      <Button variant="ghost" size="sm" href="/shops">
        Browse All
        <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
      </Button>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each recommendedShops as shop, i}
        <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <ShopCard {shop} />
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Section 5: Trending Products -->
  <section in:fade={{ duration: 400, delay: 400 }}>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-text-main">Trending Products</h2>
        <p class="text-sm text-text-muted">Popular items this week</p>
      </div>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {#each trendingProducts as product, i}
        <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <ProductCard {product} />
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Section 6: Updates From Shops You Follow -->
  {#if shopActivities.length > 0}
    <section in:fade={{ duration: 400, delay: 500 }}>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-text-main">Updates From Shops You Follow</h2>
      <Button variant="ghost" size="sm" href="/blog">
        See All
        <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
      </Button>
    </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each shopActivities as activity, i}
          <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
            <!-- <ShopActivityCard {activity} /> -->
            <BlogCard post={activity} />
          </div>
        {/each}
      </div>
    </section>
  {/if}
  
  <!-- Section 7: Recently Viewed -->
  <section in:fade={{ duration: 400, delay: 600 }}>
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <Icon icon="mdi:history" class="w-5 h-5 text-text-muted" />
        <h2 class="text-xl font-bold text-text-main">Recently Viewed</h2>
      </div>
    </div>
    
    <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
      {#each recentlyViewed as product, i}
        <div class="flex-shrink-0 w-64" in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <ProductCard {product} />
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Section 8: Categories -->
  <section in:fade={{ duration: 400, delay: 700 }}>
    <h2 class="text-xl font-bold text-text-main mb-6">Browse Categories</h2>
    
    <div class="grid grid-cols-4 md:grid-cols-6 gap-4">
      {#each categories as category, i}
        <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <CategoryCard {category} />
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* @media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    [in:fly] {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  } */
</style>