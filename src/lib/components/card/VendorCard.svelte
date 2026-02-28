<!-- src/lib/components/vendor/VendorCard.svelte -->
<script lang="ts">
  import type { Vendor } from "$lib/types";
  import Card from "$lib/components/ui/Card.svelte";
  import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Icon from "@iconify/svelte";

  export let vendor: Vendor;

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-yellow-500";
    return "text-error";
  };

  const getTrustScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Great";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };
</script>

<a
  href="/vendor/{vendor.slug}"
  class="block group"
  aria-label="View {vendor.name}'s shops"
>
  <Card
    hover={true}
    padding="none"
    className="relative overflow-hidden border border-gray-200 hover:border-primary/50 h-full flex flex-col"
  >
    <!-- Cover Image -->
    {#if vendor.coverUrl}
      <div
        class="h-32 bg-gradient-to-r from-primary to-primary-light overflow-hidden relative"
      >
        <img
          src={vendor.coverUrl}
          alt=""
          class="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
        />

        <div
          class="flex w-full items-center gap-2 px-2 justify-between absolute top-4 z-20"
        >
          <!-- Floating Multi-Shop Indicator -->
          {#if vendor?.shopCount > 1}
            <div
              class="flex items-center gap-2
                   text-small text-white
                   bg-black/60 backdrop-blur-md
                   px-2 py-1.5 rounded-btn shadow-lg"
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span class="font-medium text-xs">
                {vendor.shopCount} Shops
              </span>
            </div>
          {:else}
            <span></span>
          {/if}

          <!-- Trust Indicator -->
          <div
            class="w-8 h-8 rounded-full bg-surface flex items-center justify-center shadow-card"
          >
            <span
              class="text-xs font-bold {getTrustScoreColor(vendor.trustScore)}"
              >{vendor.trustScore}%</span
            >
          </div>
        </div>
      </div>
    {/if}

    <div class="p-4 flex-1 flex flex-col">
      <!-- Top: Avatar + Name + Verified -->
      <div class="flex flex-col items-start gap-2 mb-2">
        <img
          src={vendor.logoUrl}
          alt="{vendor.name} logo"
          class="w-14 h-14 rounded-xl object-cover border-4 border-surface shadow-md -mt-13 relative z-10"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h3
              class="text-sm md:text-h4 font-bold text-text-main truncate group-hover:text-primary transition-colors"
            >
              {vendor.name}
            </h3>
            {#if vendor.verified}
              <TrustBadge size="sm" showText={false} />
            {/if}
          </div>
          <p class="text-small text-text-muted line-clamp-1">
            {vendor.location}
          </p>
        </div>
      </div>

      <!-- Category Tags -->
      {#if vendor.categories?.length}
        <div class="flex flex-wrap gap-2 mb-2">
          {#each vendor.categories as category}
            <span
              class="px-2.5 py-1 bg-gray-100 text-text-main text-xs rounded-btn"
            >
              {category}
            </span>
          {/each}
        </div>
      {/if}

      <!-- Stats Row -->
      <div class="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
        <div class="text-sm flex items-center gap-2 text-text-main">
          <Icon icon="mdi:star" class="w-4 h-4 text-yellow-400" />
          {vendor.stats.avgRating}
        </div>
        <div class="text-sm flex items-center gap-2 text-text-main">
          <Icon icon="mdi:account-group-outline" class="w-4 h-4" />
          {vendor.stats.followers ?? 200} Followers
        </div>
      </div>

      <!-- Bio Preview -->
      {#if vendor.bio}
        <p class="text-xs text-text-muted line-clamp-2 mb-2 flex-1">
          {vendor.bio}
        </p>
      {/if}

      <!-- CTA Button -->
      <Button
        variant="primary"
        size="md"
        className="w-full group-hover:shadow-card-hover"
      >
        View Shops →
      </Button>
    </div>
  </Card>
</a>
