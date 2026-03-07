<!-- src/routes/(app)/home/+page.svelte -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Card from "$lib/components/common/Card.svelte";
  import Button from "$lib/components/common/Button.svelte";
  import ProductCard from "$lib/components/app/shopTheme/default/components/ProductCard.svelte";

  // Mock data
  let user = { name: "John" };

  const followedShops = [
    {
      id: 1,
      name: "TechStoreNG",
      logo: "🏪",
      banner: "bg-blue-100",
      newProducts: 12,
      trustScore: 94,
    },
    {
      id: 2,
      name: "Amina Fashion",
      logo: "👗",
      banner: "bg-pink-100",
      newProducts: 8,
      trustScore: 92,
    },
    {
      id: 3,
      name: "Home Essentials",
      logo: "🏠",
      banner: "bg-green-100",
      newProducts: 5,
      trustScore: 89,
    },
  ];

  const recentVendors = [
    { id: 1, name: "Kicks NG", logo: "👟", lastOrder: "2 days ago" },
    { id: 2, name: "Beauty Hub", logo: "💄", lastOrder: "1 week ago" },
    { id: 3, name: "Gadget Pro", logo: "📱", lastOrder: "2 weeks ago" },
  ];

  const recommendedProducts = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    code: `PROD-${i + 1}`,
    vendorId: String(i + 1),
    name: `Product ${i + 1}`,
    price: (i + 1) * 5000,
    currency: 'NGN',
    images: [`https://images.unsplash.com/photo-${1500000000000 + i}`],
    preorder: false,
    sale: false,
    new: false,
    rating: 4.0 + (i % 10) / 10,
    reviewCount: Math.floor(Math.random() * 100),
    stockStatus: 'in-stock' as const,
    category: 'Electronics',
    createdAt: new Date(),
  }));
</script>

<svelte:head>
  <title>Home | VendorHub</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
  <!-- Section 1: Welcome Header -->
  <section class="mb-10 animate-fade-in">
    <h1 class="text-3xl font-bold text-text-main mb-2">
      Welcome back, {user.name} 👋
    </h1>
    <p class="text-body text-text-muted">
      Here's what's happening with your shops.
    </p>
  </section>

  <!-- Section 2: From Shops You Follow -->
  <section class="mb-12 animate-fade-in" style="transition-delay: 100ms">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-text-main">From Shops You Follow</h2>
      <a
        href="/following"
        class="text-sm font-medium text-primary hover:underline">View All →</a
      >
    </div>

    <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
      {#each followedShops as shop, i}
        <div
          in:fly={{ y: 20, duration: 400, delay: i * 100, easing: cubicOut }}
          class="flex-shrink-0 w-64"
        >
          <Card
            hover={true}
            padding="none"
            className="overflow-hidden border border-gray-200"
          >
            <div class="h-24 {shop.banner} relative">
              <div class="absolute -bottom-8 left-4">
                <div
                  class="w-16 h-16 rounded-full bg-surface border-4 border-surface flex items-center justify-center text-3xl shadow-card"
                >
                  {shop.logo}
                </div>
              </div>
              {#if shop.newProducts > 0}
                <span
                  class="absolute top-3 right-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded-full"
                >
                  {shop.newProducts} New
                </span>
              {/if}
            </div>
            <div class="pt-10 pb-4 px-4">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="font-semibold text-text-main">{shop.name}</h3>
                <span class="text-xs text-success font-medium"
                  >★ {shop.trustScore}%</span
                >
              </div>
              <Button
                variant="outline"
                size="sm"
                href="/shop/{shop.name.toLowerCase().replace(' ', '-')}"
                class="w-full"
              >
                Visit Shop
              </Button>
            </div>
          </Card>
        </div>
      {/each}
    </div>
  </section>

  <!-- Section 3: Recently Purchased From -->
  <section class="mb-12 animate-fade-in" style="transition-delay: 200ms">
    <h2 class="text-xl font-bold text-text-main mb-6">
      Recently Purchased From
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {#each recentVendors as vendor, i}
        <Card
          hover={true}
          padding="md"
          className="text-center border border-gray-200"
        >
          <div class="text-4xl mb-3">{vendor.logo}</div>
          <h3 class="font-medium text-text-main text-sm mb-1">{vendor.name}</h3>
          <p class="text-xs text-text-muted mb-3">{vendor.lastOrder}</p>
          <Button variant="outline" size="sm" class="w-full text-xs"
            >Order Again</Button
          >
        </Card>
      {/each}
    </div>
  </section>

  <!-- Section 4: Recommended For You -->
  <section class="animate-fade-in" style="transition-delay: 300ms">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-text-main">Recommended For You</h2>
      <a href="/shop" class="text-sm font-medium text-primary hover:underline"
        >Browse All →</a
      >
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each recommendedProducts as product, i}
        <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <ProductCard {product} shopSlug="demo-shop" />
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
