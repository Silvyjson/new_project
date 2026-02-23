<!-- src/routes/vendors/[vendorSlug]/+page.svelte -->
<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { Vendor, Product } from '$lib/types';
  
  import Button from '$lib/components/ui/Button.svelte';
  import TrustScore from '$lib/components/ui/TrustScore.svelte';
  import TrustBadge from '$lib/components/ui/TrustBadge.svelte';
  import ProductGrid from '$lib/components/vendor/ProductGrid.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  
  export let data: {
    vendor: Vendor;
    products: Product[];
  };

  const { vendor, products } = data;
  
  // Copy shop link to clipboard
  const copyShopLink = () => {
    if (!browser) return;
    const url = `${window.location.origin}/${vendor.slug}/shop`;
    navigator.clipboard.writeText(url);
    // Could add toast notification here
  };
  
  // Social icon mapping
  const socialIcons: Record<string, string> = {
    instagram: '📸',
    whatsapp: '💬',
    tiktok: '🎵',
    facebook: '📘',
    twitter: '🐦'
  };
</script>

<svelte:head>
  <title>{vendor.name} | VendorHub</title>
  <meta name="description" content={vendor.bio} />
  <meta property="og:title" content={vendor.name} />
  <meta property="og:image" content={vendor.logoUrl} />
</svelte:head>

<main class="min-h-screen bg-surface">
  <!-- Vendor Header -->
  <header
    class="relative bg-gradient-to-r from-primary to-primary-light text-surface"
  >
      {#if vendor.coverUrl}
      <img
        src={vendor.coverUrl}
        alt=""
        class="w-full h-48 md:h-64 object-cover opacity-20"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
    {/if}

    <div class="relative max-w-7xl mx-auto px-4 pt-8 pb-6">
      <div class="flex flex-col md:flex-row md:items-end gap-6">
        <img
          src={vendor.logoUrl}
          alt={vendor.name}
          class="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-surface shadow-lg object-cover"
        />
        <div class="flex-1">
          <div class="flex items-center gap-3 flex-wrap">
            <h1 class="text-2xl md:text-3xl font-bold">{vendor.name}</h1>
            {#if vendor.verified}
              <TrustBadge size="lg" />
            {/if}
          </div>
          <div class="mt-2 flex items-center gap-4 flex-wrap">
            <TrustScore value={vendor.trustScore} />
            <span class="text-sm opacity-90"
              >📍 {vendor.location || "Online"}</span
            >
          </div>
          <p class="mt-3 text-lg opacity-95 max-w-2xl">{vendor.bio}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <Button
            variant="secondary"
            size="md"
            on:click={copyShopLink}
            title="Copy shop link"
          >
            🔗 Copy Shop Link
          </Button>
          <Button variant="primary" size="md" href={`/${vendor.slug}/shop`}>
            Visit Shop →
          </Button>
        </div>
      </div>

      <!-- Social Links -->
      <div class="mt-6 flex gap-4">
        {#each vendor.socials as social}
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-opacity"
          >
            <span aria-hidden="true">{socialIcons[social.platform]}</span>
            <span>@{social.handle}</span>
          </a>
        {/each}
      </div>
    </div>
  </header>

  <!-- Quick Stats -->
  <section class="border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex flex-wrap gap-6 text-sm">
        <div>
          <span class="font-bold text-dark">{vendor.stats.totalProducts}</span>
          <span class="text-gray-muted ml-1">Products</span>
        </div>
        <div>
          <span class="font-bold text-dark">{vendor.stats.totalSales}</span>
          <span class="text-gray-muted ml-1">Sales</span>
        </div>
        <div>
          <span class="font-bold text-dark"
            >★ {vendor.stats.avgRating.toFixed(1)}</span
          >
          <span class="text-gray-muted ml-1">Rating</span>
        </div>
        <div>
          <span class="font-bold text-dark"
            >{vendor.stats.responseTimeHours}h</span
          >
          <span class="text-gray-muted ml-1">Avg. Response</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Products Preview -->
  <section class="py-12 px-4 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-dark">Featured Products</h2>
      <Button variant="outline" href={`/${vendor.slug}/shop`}>
        View All →
      </Button>
    </div>

    {#if products.length > 0}
      <ProductGrid {products}  limit={4} />
    {:else}
      <Card className="p-8 text-center text-gray-muted">
        <p>No products yet. Check back soon!</p>
      </Card>
    {/if}
  </section>

  <!-- Trust & Safety Reminder -->
  <section class="py-8 px-4 bg-gray-light">
    <div class="max-w-7xl mx-auto">
      <Card className="p-6 flex flex-col md:flex-row items-center gap-4">
        <div class="text-3xl">🛡️</div>
        <div class="flex-1 text-center md:text-left">
          <h3 class="font-bold text-dark">Shop with Confidence</h3>
          <p class="text-sm text-gray-muted">
            All payments are protected by VendorHub escrow. Funds release only
            after you confirm delivery.
          </p>
        </div>
        <Button variant="outline" size="sm" href="/trust">Learn More</Button>
      </Card>
    </div>
  </section>
</main>
