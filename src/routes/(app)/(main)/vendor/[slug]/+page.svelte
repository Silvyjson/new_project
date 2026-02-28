<!-- src/routes/vendor/[vendorSlug]/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  // Types
  import type { PageData } from "./$types";

  // Components
  import Button from "$lib/components/ui/Button.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
  import Nav from "$lib/components/homepage/Nav.svelte";
  import Footer from "$lib/components/homepage/Footer.svelte";
  import ShopCard from "$lib/components/card/ShopCard.svelte";
  import Pagination from "$lib/components/ui/Pagination.svelte";
  import ReviewCard from "$lib/components/ui/ReviewCard.svelte";

  // Data from load function
  let { data }: { data: PageData } = $props();
  let vendor = $derived(data.vendor);
  let meta = $derived(data.meta);

  // Local settings
  const itemsPerPage = 8;
  let searchTerm = $state("");
  let selectedCategory = $state("all");
  let currentPage = $state(1);

  // Categories for filter
  let categories = $derived(
    Array.from(
      new Set(
        vendor.shops.flatMap((shop) => (shop.category ? [shop.category] : [])),
      ),
    ),
  );

  // Trust score color logic
  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-yellow-500";
    return "text-error";
  };

  const getTrustScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-primary";
    if (score >= 40) return "bg-yellow-500";
    return "bg-error";
  };

  // Social icons mapping
  const socialIcons: Record<string, string> = {
    instagram: "📸",
    whatsapp: "💬",
    twitter: "🐦",
    tiktok: "🎵",
    facebook: "📘",
  };

  // Format date helper
  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  // Filtered shops
  const filteredShops = $derived(
    vendor.shops.filter((shop) => {
      const matchesSearch = shop.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || shop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }),
  );

  // Paginated shops
  const paginatedShops = $derived.by(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredShops.slice(start, start + itemsPerPage);
  });

  // Total pages
  const totalPages = $derived(Math.ceil(filteredShops.length / itemsPerPage));

  function handlePageChange(event: CustomEvent<{ page: number }>) {
    currentPage = event.detail.page;
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  let isFollowing = $state(false);
  function toggleFollow() {
    isFollowing = !isFollowing;
  }
  function contactVendor() {
    console.log("Contact vendor");
  }
  const copyProfileLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/vendor/${vendor.slug}`,
    );
    alert("Profile link copied!");
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
  <!-- 🔷 SECTION 2: VENDOR HERO HEADER -->
  <section class="py-15 bg-surface">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- LEFT: Vendor Identity Block -->
        <div class="md:col-span-2 animate-fade-in">
          <!-- Cover Photo -->
          <div class="relative mb-16">
            <img
              src={vendor.coverUrl}
              alt="{vendor.name} cover"
              class="w-full h-[220px] md:h-[260px] object-cover rounded-2xl"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"
            ></div>

            <!-- Avatar (overlapping) -->
            <div class="absolute -bottom-12 left-8">
              <img
                src={vendor.logoUrl}
                alt={vendor.name}
                class="w-[120px] h-[120px] rounded-full object-cover border-4 {vendor.verified
                  ? 'border-primary'
                  : 'border-white'} shadow-xl bg-white"
              />
            </div>
          </div>

          <!-- Info Section -->
          <div
            class="flex flex-col md:flex-row md:items-start md:justify-between gap-8 px-4 md:px-8"
          >
            <!-- LEFT SIDE -->
            <div class="flex-1 pt-4 md:pt-0 md:ml-[140px]">
              <!-- Name + Badges -->
              <div class="flex items-center gap-3 flex-wrap mb-2">
                <h1 class="text-[36px] font-bold text-text-main">
                  {vendor.name}
                </h1>
                {#if vendor.verified}
                  <TrustBadge size="md" />
                {/if}
                {#if vendor.eliteVendor}
                  <span
                    class="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full font-medium"
                  >
                    ⭐ Top 1% Vendor
                  </span>
                {/if}
              </div>

              <!-- Meta Info -->
              <div class="flex flex-wrap gap-4 text-body text-text-muted mb-4">
                <span class="flex items-center gap-1.5"
                  >📍 {vendor.location}</span
                >
                <span class="flex items-center gap-1.5"
                  >🗓 Member since {formatDate(vendor.joinedAt)}</span
                >
                <span class="flex items-center gap-1.5"
                  >🏬 {vendor.shopCount} Active Shops</span
                >
                <span class="flex items-center gap-1.5"
                  >📦 {vendor.totalOrders.toLocaleString()}+ Orders</span
                >
              </div>

              <!-- Categories -->
              <div class="flex flex-wrap gap-2 mb-4">
                {#each vendor.categories as category}
                  <span
                    class="px-3 py-1.5 bg-gray-100 text-text-main text-sm rounded-btn font-medium"
                  >
                    {category}
                  </span>
                {/each}
              </div>

              <!-- Socials (Moved from Section 7) -->
              <div class="flex items-center gap-3">
                {#each vendor.socials as social}
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl hover:bg-primary hover:text-white transition-colors"
                  >
                    {socialIcons[social.platform]}
                  </a>
                {/each}
              </div>

              <!-- RIGHT SIDE (ACTIONS - Consolidated) -->
              <div
                class="flex flex-col md:flex-row mt-4 gap-3 w-full md:w-auto"
              >
                <Button
                  onclick={toggleFollow}
                  variant={isFollowing ? "outline" : "primary"}
                  size="lg"
                  className="w-full"
                >
                  {isFollowing ? "✓ Following" : "Follow Vendor"}
                </Button>
                <Button
                  href="/messages?vendor={vendor.slug}"
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  💬 Contact Vendor
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Trust Card (Removed duplicate breakdown - links to Section 3) -->
        <div class="animate-fade-in" style="transition-delay: 100ms">
          <Card className="bg-background-light border border-gray-200 h-full">
            <div class="text-center mb-6">
              <div
                class="text-[48px] font-bold {getTrustScoreColor(
                  vendor.trustScore,
                )} mb-2"
              >
                {vendor.trustScore}%
              </div>
              <div class="text-body font-medium text-text-main">
                Trust Score
              </div>
              <div class="text-small text-text-muted mt-1">
                {vendor.trustScore >= 80
                  ? "Excellent"
                  : vendor.trustScore >= 60
                    ? "Great"
                    : "Good"}
              </div>
            </div>

            <!-- Simplified Trust Summary (Removed duplicate progress bars) -->
            <div
              class="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200"
            >
              <div class="text-center">
                <div class="text-2xl font-bold text-text-main">
                  ★ {vendor.stats.avgRating}
                </div>
                <div class="text-xs text-text-muted">
                  {vendor.stats.reviewCount}
                  Reviews
                </div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-text-main">
                  {vendor.stats.followersCount}
                </div>
                <div class="text-xs text-text-muted">Followers</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-text-main">
                  {vendor.stats.responseTimeHours}h
                </div>
                <div class="text-xs text-text-muted">Response</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-text-main">
                  {vendor.stats.totalSales.toLocaleString()}
                </div>
                <div class="text-xs text-text-muted">Sales</div>
              </div>
            </div>

            <!-- Primary CTA -->
            <div class="flex flex-col gap-3">
              <Button
                href="/vendor/{vendor.slug}#shops"
                variant="primary"
                size="lg"
                className="w-full"
              >
                View All Shops →
              </Button>

              <Button
                onclick={copyProfileLink}
                variant="outline"
                size="lg"
                className="w-full"
              >
                🔗 Copy Profile Link
              </Button>

              <Button
                href="/report?vendor={vendor.slug}"
                variant="outline"
                size="lg"
                className="w-full"
              >
                ⚠ Report Vendor
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 3: TRUST SCORE BREAKDOWN (Kept - This is the detailed view) -->
  <section class="py-20 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-h2 text-text-main mb-4">
          How This Vendor Earned Their Trust Score
        </h2>
        <p class="text-body text-text-muted max-w-2xl mx-auto">
          Our transparent algorithm calculates trust based on real performance
          metrics.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each [{ icon: "📦", title: "Delivery Reliability", score: vendor.stats.deliverySuccessRate, desc: "Based on successful deliveries vs failed orders." }, { icon: "⏰", title: "On-Time Fulfillment", score: vendor.stats.onTimeFulfillment, desc: "Percentage of orders shipped within promised timeframe." }, { icon: "⭐", title: "Customer Reviews", score: vendor.stats.avgRating * 20, desc: "Average rating from verified buyer reviews." }, { icon: "⚖️", title: "Dispute Resolution", score: vendor.stats.disputesResolved, desc: "Percentage of disputes resolved in buyer favor." }] as metric}
          <Card className="p-6 border border-gray-200 text-center">
            <div class="text-4xl mb-4">{metric.icon}</div>
            <h3 class="text-h4 font-semibold text-text-main mb-2">
              {metric.title}
            </h3>
            <div
              class="text-[32px] font-bold {getTrustScoreColor(
                metric.score,
              )} mb-2"
            >
              {metric.score}%
            </div>
            <p class="text-small text-text-muted">{metric.desc}</p>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 4: VENDOR OVERVIEW -->
  <section class="py-20 bg-surface">
    <div class="container max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
      <!-- Left: About Vendor -->
      <div class="animate-fade-in">
        <h2 class="text-h2 text-text-main mb-6">About {vendor.name}</h2>
        <p class="text-body text-text-muted leading-relaxed mb-6">
          {vendor.bio}
        </p>

        <!-- Verification Badges -->
        <div class="space-y-3">
          {#if vendor.verificationBadges.idVerified}
            <div class="flex items-center gap-3 text-body text-text-main">
              <span
                class="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center"
                >✓</span
              >
              <span>Verified ID</span>
            </div>
          {/if}
          {#if vendor.verificationBadges.bankVerified}
            <div class="flex items-center gap-3 text-body text-text-main">
              <span
                class="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center"
                >✓</span
              >
              <span>Bank Account Verified</span>
            </div>
          {/if}
          {#if vendor.verificationBadges.businessDocument}
            <div class="flex items-center gap-3 text-body text-text-main">
              <span
                class="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center"
                >✓</span
              >
              <span>Business Document Verified</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Right: Quick Facts Card -->
      <div class="animate-fade-in" style="transition-delay: 100ms">
        <Card className="p-6 border border-gray-200 h-full">
          <h3 class="text-h3 text-text-main mb-6">Quick Facts</h3>
          <div class="space-y-4">
            {#each [{ label: "Response Time", value: `< ${vendor.stats.responseTimeHours} hours` }, { label: "Processing Time", value: `${vendor.stats.processingTimeDays} days` }, { label: "Return Policy", value: vendor.stats.returnPolicy }, { label: "Total Products", value: vendor.stats.totalProducts }, { label: "Total Sales", value: `${vendor.stats.totalSales.toLocaleString()}+` }, { label: "Member Since", value: formatDate(vendor.joinedAt) }] as fact}
              <div
                class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <span class="text-body text-text-muted">{fact.label}</span>
                <span class="text-body font-semibold text-text-main"
                  >{fact.value}</span
                >
              </div>
            {/each}
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 5: ACTIVE SHOPS (Multi-Shop Feature) -->
  <section id="shops" class="py-20 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="mb-8">
        <h2 class="text-h2 text-text-main">
          Active Shops ({vendor.shops.length})
        </h2>

        <!-- Search and Filter -->
        <div class="flex flex-wrap justify-between items-center gap-3 mt-8">
          <input
            type="text"
            placeholder="Search shops..."
            class="px-4 py-2 border border-gray-300 rounded-btn text-sm w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-primary"
            bind:value={searchTerm}
            oninput={() => (currentPage = 1)}
            aria-label="Search shops"
          />
          <select
            class="px-3 py-2 border border-gray-300 rounded-btn text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            bind:value={selectedCategory}
            onchange={() => (currentPage = 1)}
            aria-label="Filter shops by category"
          >
            <option value="all">All Categories</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Shops Grid -->
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#if paginatedShops.length === 0}
          <p class="col-span-full text-center text-text-muted py-8">
            No shops found matching your criteria.
          </p>
        {:else}
          {#each paginatedShops as shop}
            <ShopCard {shop} />
          {/each}
        {/if}
      </div>

      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="mt-8 flex justify-center">
          <Pagination
            {currentPage}
            {totalPages}
            on:pageChange={handlePageChange}
          />
        </div>
      {/if}
    </div>
  </section>

  <!-- 🔷 SECTION 6: REVIEWS -->
  <section class="py-20 bg-surface">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-h2 text-text-main mb-2">Customer Reviews</h2>
        <p class="text-body text-text-muted">
          ★ {vendor.stats.avgRating} Average Rating • Based on {vendor.stats
            .reviewCount} reviews
        </p>
      </div>

      <div class="flex gap-6 overflow-x-auto pb-4 snap-x">
        {#each vendor.reviews as review, i}
          <div
            class="flex-shrink-0 w-80 h-full animate-fade-in snap-start"
            style="animation-delay: {i * 100}ms"
          >
            <ReviewCard {review} />
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>

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
