<!-- src/routes/vendor/[vendorSlug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from "./$types";
  import Card from "$lib/components/ui/Card.svelte";
  import ShopCard from "$lib/components/card/ShopCard.svelte";
  import ReviewCard from "$lib/components/ui/ReviewCard.svelte";
  import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/Button.svelte";

  let { data }: { data: PageData } = $props();
  let vendor = $derived(data.vendor);
  let meta = $derived(data.meta);

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-yellow-500";
    return "text-error";
  };

  const socialIcons: Record<string, string> = {
    instagram: "mdi:instagram",
    whatsapp: "mdi:whatsapp",
    twitter: "simple-icons:x",
    tiktok: "simple-icons:tiktok",
    facebook: "mdi:facebook",
  };

  const copyProfileLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/vendor/${vendor.slug}`,
    );
  };
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.ogImage} />
  <meta property="og:type" content="profile" />
</svelte:head>

<main class="min-h-screen bg-background-light">
  <!-- 🔷 SECTION 1: VENDOR HERO HEADER -->
  <section class="relative bg-background-light">
    <!-- Cover Background -->
    <div class="relative h-[340px] md:h-[420px] w-full overflow-hidden">
      <img
        src={vendor.coverUrl}
        alt="{vendor.name} cover"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background-light"
      ></div>
    </div>

    <!-- Floating Profile Card -->
    <div class="relative -mt-30 md:-mt-45">
      <div class="container max-w-7xl mx-auto px-2 md:px-4">
        <div
          class="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/30"
        >
          <div class="grid md:grid-cols-3 gap-10 items-start">
            <!-- LEFT: Identity -->
            <div class="md:col-span-2">
              <div class="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                <!-- Avatar -->
                <img
                  src={vendor.logoUrl}
                  alt={vendor.name}
                  class="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 {vendor.verified
                    ? 'border-primary'
                    : 'border-gray-200'} shadow-lg"
                />

                <!-- Name + Meta -->
                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="flex items-center gap-3 mb-2">
                        <h1
                          class="text-3xl md:text-4xl font-bold text-text-main"
                        >
                          {vendor.name}
                        </h1>

                        {#if vendor.verified}
                          <TrustBadge size="sm" text="ID Verified" />
                        {/if}
                      </div>

                      <div class="flex flex-wrap gap-6 text-sm text-text-muted">
                        <span class="flex items-center gap-1">
                          <Icon icon="mdi:map-marker-outline" class="w-4 h-4" />
                          {vendor.location}
                        </span>

                        <span class="flex items-center gap-1">
                          <Icon
                            icon="mdi:calendar-month-outline"
                            class="w-4 h-4"
                          />
                          Member since {formatDate(vendor.joinedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Bio -->
                  {#if vendor.bio}
                    <p class="text-text-muted leading-relaxed mt-4 max-w-2xl">
                      {vendor.bio}
                    </p>
                  {/if}

                  <!-- Social Icons -->
                  {#if vendor.socials?.length > 0}
                    <div class="flex items-center gap-4 mt-6">
                      {#each vendor.socials as social}
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition"
                          aria-label={social.platform}
                        >
                          <Icon
                            icon={socialIcons[social.platform]}
                            class="w-5 h-5"
                          />
                        </a>
                      {/each}
                    </div>
                  {/if}

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-4 mt-6">
                    <Button onclick={copyProfileLink} className="transition">
                      Copy Profile Link
                    </Button>
                    <Button
                      onclick={() => goto(`/report?vendor=${vendor.slug}`)}
                      variant="outline"
                      className="bg-gray-100 hover:bg-primary transition"
                    >
                      Report Vendor
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT: Trust Summary -->
            <div
              class="bg-background-light rounded-2xl p-8 text-center border border-gray-200"
            >
              <div
                class="text-5xl font-bold {getTrustScoreColor(
                  vendor.trustScore,
                )} mb-2"
              >
                {vendor.trustScore}%
              </div>

              <div class="text-sm text-text-muted mb-6">
                Overall Trust Score
              </div>

              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-text-muted">Rating</span>
                  <span class="font-semibold">★ {vendor.stats.avgRating}</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-text-muted">Reviews</span>
                  <span class="font-semibold">
                    {vendor.stats.reviewCount.toLocaleString()}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-text-muted">Sales</span>
                  <span class="font-semibold">
                    {vendor.stats.totalSales.toLocaleString()}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-text-muted">Businesses</span>
                  <span class="font-semibold">
                    {vendor.shops.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 2: BUSINESSES BY VENDOR -->
  <section class="py-20 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-text-main">
          Businesses by {vendor.name}
        </h2>
        <p class="text-sm text-text-muted mt-2">
          Verified shops operated by this vendor.
        </p>
      </div>

      <div class="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x">
        {#each vendor.shops as shop, i}
          <div
            class="flex-shrink-0 w-70 h-full animate-fade-in snap-start"
            style="animation-delay: {i * 100}ms"
          >
            <ShopCard {shop} />
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 3: CUSTOMER REVIEWS -->
  {#if vendor.reviews && vendor.reviews.length > 0}
    <section class="py-20 bg-surface">
      <div class="container max-w-7xl mx-auto px-4">
        <div class="mb-12 text-center">
          <h2 class="text-2xl font-semibold text-text-main">
            What Customers Are Saying
          </h2>
        </div>

        <div class="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x">
          {#each vendor.reviews.slice(0, 3) as review, i}
            <div
              class="flex-shrink-0 w-80 h-65 animate-fade-in snap-start"
              style="animation-delay: {i * 100}ms"
            >
              <ReviewCard {review} />
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}
</main>
