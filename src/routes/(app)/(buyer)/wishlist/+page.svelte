<!-- src/routes/(app)/wishlist/+page.svelte -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Card from "$lib/components/common/Card.svelte";
  import Button from "$lib/components/common/Button.svelte";
  import ProductCard from "$lib/components/app/shopTheme/default/components/ProductCard.svelte";

  // Active tab
  let activeTab = "products";

  // Mock data
  const wishlistProducts: any = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Wishlist Product ${i + 1}`,
    price: (i + 1) * 8000,
    oldPrice: (i + 1) * 10000,
    image: `https://images.unsplash.com/photo-${1500000000000 + i}`,
    shop: `Shop ${i + 1}`,
    shopSlug: `shop-${i + 1}`,
    rating: 4.0 + (i % 10) / 10,
    reviewCount: 50 + i * 10,
    inStock: i % 3 !== 0,
  }));

  const wishlistShops = [
    {
      id: 1,
      name: "TechStoreNG",
      logo: "🏪",
      banner: "bg-blue-100",
      products: 120,
      trustScore: 94,
    },
    {
      id: 2,
      name: "Amina Fashion",
      logo: "👗",
      banner: "bg-pink-100",
      products: 85,
      trustScore: 92,
    },
    {
      id: 3,
      name: "Home Essentials",
      logo: "🏠",
      banner: "bg-green-100",
      products: 200,
      trustScore: 89,
    },
  ];

  const removeFromWishlist = (type: "product" | "shop", id: number) => {
    // In real app: API call to remove from wishlist
    console.log(`Remove ${type} ${id} from wishlist`);
  };
</script>

<svelte:head>
  <title>Wishlist | VendorHub</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-text-main mb-8">My Wishlist</h1>

  <!-- Tabs -->
  <div class="flex items-center gap-2 mb-8">
    <button
      on:click={() => (activeTab = "products")}
      class="px-6 py-3 rounded-xl text-body font-medium transition-colors
             {activeTab === 'products'
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
    >
      Products ({wishlistProducts.length})
    </button>
    <button
      on:click={() => (activeTab = "shops")}
      class="px-6 py-3 rounded-xl text-body font-medium transition-colors
             {activeTab === 'shops'
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
    >
      Shops ({wishlistShops.length})
    </button>
  </div>

  <!-- Products Tab -->
  {#if activeTab === "products"}
    {#if wishlistProducts.length === 0}
      <Card className="py-16 text-center">
        <div class="text-6xl mb-4">❤️</div>
        <h2 class="text-h2 text-text-main mb-2">Your wishlist is empty</h2>
        <p class="text-body text-text-muted mb-6">
          Start saving products you love.
        </p>
        <Button href="/shop" variant="primary" size="lg">Browse Products</Button
        >
      </Card>
    {:else}
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each wishlistProducts as product, i}
          <div
            in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}
            class="relative"
          >
            <button
              on:click={() => removeFromWishlist("product", product.id)}
              class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center text-error hover:bg-error hover:text-white transition-colors"
              aria-label="Remove from wishlist"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ProductCard {product} shopSlug={product.shopSlug} />
          </div>
        {/each}
      </div>
    {/if}
  {/if}

  <!-- Shops Tab -->
  {#if activeTab === "shops"}
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each wishlistShops as shop, i}
        <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <Card
            hover={true}
            padding="none"
            className="overflow-hidden border border-gray-200"
          >
            <div class="h-32 {shop.banner} relative">
              <div class="absolute -bottom-10 left-6">
                <div
                  class="w-20 h-20 rounded-full bg-surface border-4 border-surface flex items-center justify-center text-4xl shadow-card"
                >
                  {shop.logo}
                </div>
              </div>
              <button
                on:click={() => removeFromWishlist("shop", shop.id)}
                class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center text-error hover:bg-error hover:text-white transition-colors"
                aria-label="Remove from wishlist"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="pt-12 pb-4 px-6">
              <h3 class="text-lg font-bold text-text-main mb-1">{shop.name}</h3>
              <p class="text-sm text-text-muted mb-3">
                {shop.products} products • ★ {shop.trustScore}%
              </p>
              <Button
                href="/shop/{shop.name.toLowerCase().replace(' ', '-')}"
                variant="primary"
                size="sm"
                class="w-full"
              >
                Visit Shop
              </Button>
            </div>
          </Card>
        </div>
      {/each}
    </div>
  {/if}
</div>
