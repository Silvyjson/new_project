<!-- src/lib/components/vendor/VendorCard.svelte -->
<script lang="ts">
  import type { Vendor } from "$lib/types";
  import Card from "$lib/components/ui/Card.svelte";
  import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  export let vendor: Vendor;

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-primary";
    if (score >= 40) return "bg-yellow-500";
    return "bg-error";
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

        <!-- Floating Multi-Shop Indicator -->
        {#if vendor?.shopCount > 1}
          <div
            class="absolute top-4 right-4 z-20
                   flex items-center gap-2
                   text-small text-white
                   bg-black/60 backdrop-blur-md
                   px-3 py-1.5 rounded-btn shadow-lg"
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
            <span class="font-medium">
              {vendor.shopCount} Shops
            </span>
          </div>
        {/if}
      </div>
    {/if}

    <div class="p-6 flex-1 flex flex-col">
      <!-- Top: Avatar + Name + Verified -->
      <div class="flex flex-col items-start gap-4 mb-4">
        <img
          src={vendor.logoUrl}
          alt="{vendor.name} logo"
          class="w-20 h-20 rounded-xl object-cover border-4 border-surface shadow-md -mt-18 relative z-10"
        />
        <div class="flex-1 min-w-0 pt-2">
          <div class="flex items-center gap-2 flex-wrap">
            <h3
              class="text-h4 font-bold text-text-main truncate group-hover:text-primary transition-colors"
            >
              {vendor.name}
            </h3>
            {#if vendor.verified}
              <TrustBadge size="sm" showText={false} />
            {/if}
          </div>
          <p class="text-small text-text-muted mt-1 line-clamp-1">
            {vendor.location}
          </p>
        </div>
      </div>

      <!-- Trust Score Progress Bar -->
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-small font-medium text-text-main">
            Trust Score
          </span>
          <span
            class="text-small font-bold {vendor.trustScore >= 80
              ? 'text-success'
              : 'text-primary'}"
          >
            {vendor.trustScore}% • {getTrustScoreLabel(vendor.trustScore)}
          </span>
        </div>

        <div class="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full {getTrustScoreColor(
              vendor.trustScore,
            )} transition-all duration-500 ease-out"
            style="width: {vendor.trustScore}%"
          ></div>
        </div>
      </div>

      <!-- Category Tags -->
      {#if vendor.categories?.length}
        <div class="flex flex-wrap gap-2 mb-4">
          {#each vendor.categories as category}
            <span
              class="px-2.5 py-1 bg-gray-100 text-text-main text-xs rounded-btn font-medium"
            >
              {category}
            </span>
          {/each}
        </div>
      {/if}

      <!-- Stats Row -->
      <div class="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-100">
        <div class="text-center">
          <div class="text-lg font-bold text-text-main">
            {vendor.stats.avgRating}
          </div>
          <div class="text-xs text-text-muted">Rating</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-text-main">
            {vendor.stats.reviewCount}
          </div>
          <div class="text-xs text-text-muted">Reviews</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-text-main">
            {vendor.stats.responseTimeHours}h
          </div>
          <div class="text-xs text-text-muted">Response</div>
        </div>
      </div>

      <!-- Bio Preview -->
      {#if vendor.bio}
        <p class="text-small text-text-muted line-clamp-2 mb-4 flex-1">
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
