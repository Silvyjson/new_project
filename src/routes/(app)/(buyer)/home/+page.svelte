<!-- src/routes/(app)/home/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import ShopActivityCard from '$lib/components/app/buyer/ShopActivityCard.svelte';
  import CategoryCard from '$lib/components/app/buyer/CategoryCard.svelte';
  import ShopCard from '$lib/components/app/card/ShopCard.svelte';
  import ProductCard from '$lib/components/app/card/ProductCard.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import type { Product, Shop } from '$lib/types';
  
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
  let followedShops: Shop[] = [
    {
      id: '1',
      name: 'TechHub',
      slug: 'techhub',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TH',
      bannerUrl: 'bg-gradient-to-r from-blue-400 to-blue-600',
      followers: 2340,
      productCount: 120,
      verified: true,
      category: 'Electronics',
      rating: 4.8,
      reviewCount: 1200,
      orderCount: 5000,
      trustScore: 98
    },
    {
      id: '2',
      name: 'Urban Kicks',
      slug: 'urban-kicks',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=UK',
      bannerUrl: 'bg-gradient-to-r from-purple-400 to-purple-600',
      followers: 1890,
      productCount: 85,
      verified: true,
      category: 'Fashion',
      rating: 4.9,
      reviewCount: 850,
      orderCount: 3200,
      trustScore: 95
    },
    {
      id: '3',
      name: 'Bella Beauty',
      slug: 'bella-beauty',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=BB',
      bannerUrl: 'bg-gradient-to-r from-pink-400 to-pink-600',
      followers: 1200,
      productCount: 200,
      verified: false,
      category: 'Beauty',
      rating: 4.7,
      reviewCount: 560,
      orderCount: 2100,
      trustScore: 88
    }
  ];
  
  // Mock recommended shops
  let recommendedShops: Shop[] = [
    {
      id: '4',
      name: 'Home Essentials',
      slug: 'home-essentials',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HE',
      bannerUrl: 'bg-gradient-to-r from-green-400 to-green-600',
      followers: 890,
      productCount: 150,
      verified: true,
      category: 'Home',
      rating: 4.5,
      reviewCount: 340,
      orderCount: 1500,
      trustScore: 92
    },
    {
      id: '5',
      name: 'Gadget Pro',
      slug: 'gadget-pro',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GP',
      bannerUrl: 'bg-gradient-to-r from-orange-400 to-orange-600',
      followers: 1560,
      productCount: 95,
      verified: true,
      category: 'Electronics',
      rating: 4.6,
      reviewCount: 920,
      orderCount: 4100,
      trustScore: 96
    }
  ];
  
  // Mock trending products
  let trendingProducts: Product[] = [
    {
      id: 'p_001',
      code: 'PROD-001',
      vendorId: '1',
      name: 'Wireless Headphones Pro',
      price: 24000,
      currency: 'NGN',
      oldPrice: 30000,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
      shop: { name: 'TechHub', slug: 'techhub', category: 'Electronics', rating: 4.8, reviewCount: 1200, orderCount: 5000, trustScore: 98 },
      rating: 4.8,
      reviewCount: 124,
      stockStatus: 'in-stock' as const,
      category: 'Electronics',
      preorder: false,
      sale: true,
      new: false,
      createdAt: new Date()
    },
    {
      id: 'p_002',
      code: 'PROD-002',
      vendorId: '2',
      name: 'Air Jordan Retro High',
      price: 85000,
      currency: 'NGN',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
      shop: { name: 'Urban Kicks', slug: 'urban-kicks', category: 'Fashion', rating: 4.9, reviewCount: 850, orderCount: 3200, trustScore: 95 },
      rating: 4.9,
      reviewCount: 89,
      stockStatus: 'in-stock' as const,
      category: 'Fashion',
      preorder: false,
      sale: false,
      new: true,
      createdAt: new Date()
    },
    {
      id: 'p_003',
      code: 'PROD-003',
      vendorId: '3',
      name: 'Organic Face Cream',
      price: 12000,
      currency: 'NGN',
      oldPrice: 15000,
      images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571'],
      shop: { name: 'Bella Beauty', slug: 'bella-beauty', category: 'Beauty', rating: 4.7, reviewCount: 560, orderCount: 2100, trustScore: 88 },
      rating: 4.7,
      reviewCount: 56,
      stockStatus: 'in-stock' as const,
      category: 'Beauty',
      preorder: false,
      sale: true,
      new: false,
      createdAt: new Date()
    },
    {
      id: 'p_004',
      code: 'PROD-004',
      vendorId: '5',
      name: 'Smart Watch Series 5',
      price: 45000,
      currency: 'NGN',
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
      shop: { name: 'Gadget Pro', slug: 'gadget-pro', category: 'Electronics', rating: 4.6, reviewCount: 920, orderCount: 4100, trustScore: 96 },
      rating: 4.6,
      reviewCount: 203,
      stockStatus: 'in-stock' as const,
      category: 'Electronics',
      preorder: false,
      sale: false,
      new: false,
      createdAt: new Date()
    },
    {
      id: 'p_005',
      code: 'PROD-005',
      vendorId: '4',
      name: 'Minimalist Desk Lamp',
      price: 18000,
      currency: 'NGN',
      images: ['https://images.unsplash.com/photo-1507473888900-52fe75fa453e'],
      shop: { name: 'Home Essentials', slug: 'home-essentials', category: 'Home', rating: 4.5, reviewCount: 340, orderCount: 1500, trustScore: 92 },
      rating: 4.5,
      reviewCount: 78,
      stockStatus: 'in-stock' as const,
      category: 'Home',
      preorder: false,
      sale: false,
      new: true,
      createdAt: new Date()
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
  let recentlyViewed: Product[] = trendingProducts.slice(0, 4);
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
  
  <!-- Section 2: Categories -->
  <section in:fade={{ duration: 400, delay: 700 }}>
    <h2 class="text-xl font-bold text-text-main mb-6">Browse Categories</h2>
    
    <div class="flex gap-3 overflow-x-auto pb-4 snap-x">
      {#each categories as category, i}
        <div class="flex-shrink-0 snap-start" in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <CategoryCard {category} />
        </div>
      {/each}
    </div>
  </section>

  <!-- Section 6: Updates From Shops You Follow -->
  {#if shopActivities.length > 0}
    <section in:fade={{ duration: 400, delay: 500 }}>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-text-main">Updates From Shops You Follow</h2>
      <!-- <Button variant="ghost" size="sm" href="/blog">
        See All
        <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
      </Button> -->
    </div>
      
    <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {#each shopActivities as activity, i}
          <div
            class="flex-shrink-0 snap-start w-80"
            in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}
          >
            <ShopActivityCard {activity} />
          </div>
        {/each}
      </div>
    </section>
  {/if}
  
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
      
    <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {#each followedShops.slice(0, 4) as shop, i}
          <div class="flex-shrink-0 w-64" in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
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
      <Button variant="ghost" size="sm" href="/shop">
        Browse All
        <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
      </Button>
    </div>
    
    <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
      {#each recommendedShops as shop, i}
        <div class="flex-shrink-0 w-64" in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
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
    
    <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
      {#each trendingProducts as product, i}
        <div class="flex-shrink-0 w-64" in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <ProductCard {product} shopSlug={product.shop?.slug || 'unknown'} />
        </div>
      {/each}
    </div>
  </section>
  
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
          <ProductCard {product} shopSlug={product.shop?.slug || 'unknown'} />
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