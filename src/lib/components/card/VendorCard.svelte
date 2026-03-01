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
    className="relative overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full flex flex-col bg-white"
  >
    <!-- Cover Image -->
    {#if vendor.coverUrl}
      <div class="h-28 sm:h-32 overflow-hidden relative bg-gray-100">
        <img
          src={vendor.coverUrl}
          alt=""
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <!-- Top Row -->
        <div
          class="flex items-center justify-between px-3 py-3 absolute top-0 w-full"
        >
          <!-- Shop Count -->
          {#if vendor?.shopCount > 1}
            <div
              class="flex items-center gap-1 text-xs font-medium text-white bg-black/70 px-2.5 py-1 rounded-md"
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
              {vendor.shopCount} Shops
            </div>
          {:else}
            <span></span>
          {/if}

          <!-- Trust Indicator -->
          <div class="bg-white rounded-md px-2 py-1 shadow-sm">
            <span
              class="text-xs font-semibold {getTrustScoreColor(
                vendor.trustScore,
              )}"
            >
              {vendor.trustScore}%
            </span>
          </div>
        </div>
      </div>
    {/if}

    <div class="p-4 flex-1 flex flex-col">
      <!-- Identity -->
      <div class="flex flex-col items-start gap-3 mb-3">
        <img
          src={vendor.logoUrl}
          alt="{vendor.name} logo"
          class="w-14 h-14 rounded-xl object-cover border-4 border-surface shadow-md -mt-13 relative z-10"
        />

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <h3
              class="text-sm sm:text-base font-semibold text-text-main truncate group-hover:text-primary transition-colors"
            >
              {vendor.name}
            </h3>

            {#if vendor.verified}
              <TrustBadge size="sm" showText={false} />
            {/if}
          </div>

          <p class="text-xs text-text-muted">
            {vendor.location}
          </p>
        </div>
      </div>

      <!-- Categories -->
      {#if vendor.categories?.length}
        <div class="flex gap-2 mb-3 overflow-x-auto no-scrollbar scroll-smooth">
          {#each vendor.categories as category}
            <span
              class="flex-shrink-0 px-3 py-1 text-xs border border-gray-200 text-text-muted rounded-md whitespace-nowrap"
            >
              {category}
            </span>
          {/each}
        </div>
      {/if}

      <!-- Stats -->
      <div class="flex items-center gap-2 mb-3 text-sm text-text-main">
        <div class="flex items-center">
          {#each Array(5) as _, i}
            <Icon
              icon="mdi:star"
              class={`w-4 h-4 ${
                i < Math.round(vendor?.stats?.avgRating ?? 0)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          {/each}
        </div>

        <span class="text-text-muted text-xs">
          {vendor?.stats?.avgRating?.toFixed(1)}
        </span>
      </div>

      <!-- Bio -->
      {#if vendor.bio}
        <p class="text-xs text-text-muted line-clamp-2 mb-4 flex-1">
          {vendor.bio}
        </p>
      {/if}

      <!-- CTA -->
      <div class="hidden md:flex">
        <Button variant="primary" size="md" className="w-full font-medium">
          View Shops
        </Button>
      </div>
    </div>
  </Card>
</a>
