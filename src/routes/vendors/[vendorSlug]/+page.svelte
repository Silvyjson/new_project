<!-- src/routes/vendors/[vendorSlug]/+page.svelte -->
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
  import ShopCard from "$lib/components/vendor/ShopCard.svelte";

  // Data from load function
  export let data: PageData;
  const { vendor, meta } = data;

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

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  // Copy shop link
  const copyProfileLink = () => {
    const url = `${window.location.origin}/vendors/${vendor.slug}`;
    navigator.clipboard.writeText(url);
    alert("Profile link copied to clipboard!");
  };

  import { writable, derived } from "svelte/store";

  // Pagination settings
  const itemsPerPage = 6;

  // Local reactive stores for search and filter
  const searchTerm = writable("");
  const selectedCategory = writable("all");
  const currentPage = writable(1);

  // Extract unique categories from shops for filtering
  const categories = Array.from(
    new Set(
      vendor.shops.flatMap((shop) => (shop.category ? [shop.category] : [])),
    ),
  );

  // Filtered shops based on search term and category
  const filteredShops = derived(
    [searchTerm, selectedCategory],
    ([$searchTerm, $selectedCategory]) => {
      return vendor.shops.filter((shop) => {
        const matchesSearch = shop.name
          .toLowerCase()
          .includes($searchTerm.toLowerCase());

        const matchesCategory =
          $selectedCategory === "all" ||
          (shop.category && shop.category === $selectedCategory);

        return matchesSearch && matchesCategory;
      });
    },
  );

  // Paginated shops slice
  const paginatedShops = derived(
    [filteredShops, currentPage],
    ([$filteredShops, $currentPage]) => {
      const start = ($currentPage - 1) * itemsPerPage;
      return $filteredShops.slice(start, start + itemsPerPage);
    },
  );

  // Total pages based on filtered shops count
  const totalPages = derived(filteredShops, ($filteredShops) =>
    Math.ceil($filteredShops.length / itemsPerPage),
  );

  // Handlers for pagination controls
  function goToPage(page: number) {
    currentPage.set(page);
    // Scroll up a bit when page changes, optional
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let isFollowing = false;

  function toggleFollow() {
    isFollowing = !isFollowing;
  }

  function contactVendor() {
    // open modal OR navigate
    console.log("Open contact modal");
  }
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
  <!-- 🔷 SECTION 1: STICKY NAVBAR -->
  <Nav />

  <!-- 🔷 SECTION 2: VENDOR HERO HEADER -->
  <section class="py-15 bg-surface">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- LEFT: Vendor Identity Block -->
        <div class="md:col-span-2 animate-fade-in">
          <!-- 🔷 COVER PHOTO -->
          <div class="relative mb-16">
            <img
              src={vendor.coverUrl}
              alt="{vendor.name} cover"
              class="w-full h-[220px] md:h-[260px] object-cover rounded-2xl"
            />

            <!-- Overlay gradient (optional premium feel) -->
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

          <!-- 🔷 INFO SECTION -->
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
                <span class="flex items-center gap-1.5">
                  📍 {vendor.location}
                </span>
                <span class="flex items-center gap-1.5">
                  🗓 Member since {formatDate(vendor.joinedAt)}
                </span>
                <span class="flex items-center gap-1.5">
                  🏬 {vendor.shopCount} Active Shops
                </span>
                <span class="flex items-center gap-1.5">
                  📦 {vendor.totalOrders.toLocaleString()}+ Orders Completed
                </span>
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

              <!-- Socials -->
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
            </div>

            <!-- 🔷 RIGHT SIDE (ACTIONS) -->
            <div class="flex flex-col gap-3 w-full md:w-auto">
              <!-- Follow -->
              <button
                class="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition"
                on:click={toggleFollow}
              >
                {isFollowing ? "Following" : "Follow Vendor"}
              </button>

              <!-- View Active Shop -->
              <button
                on:click={() => copyProfileLink()}
                class="px-6 py-3 border border-gray-300 rounded-xl text-center font-medium hover:border-primary hover:text-primary transition"
              >
                Copy Link
              </button>

              <!-- Contact Vendor -->
              <button
                class="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:border-primary hover:text-primary transition"
                on:click={contactVendor}
              >
                Report Vendor
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT: Trust Card -->
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

            <!-- Trust Breakdown -->
            <div class="space-y-4 mb-6">
              <div>
                <div class="flex justify-between text-small mb-1">
                  <span class="text-text-muted">Delivery Success</span>
                  <span class="font-medium text-text-main"
                    >{vendor.stats.deliverySuccessRate}%</span
                  >
                </div>
                <div
                  class="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full {getTrustScoreBgColor(
                      vendor.stats.deliverySuccessRate,
                    )}"
                    style="width: {vendor.stats.deliverySuccessRate}%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-small mb-1">
                  <span class="text-text-muted">On-Time Fulfillment</span>
                  <span class="font-medium text-text-main"
                    >{vendor.stats.onTimeFulfillment}%</span
                  >
                </div>
                <div
                  class="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full {getTrustScoreBgColor(
                      vendor.stats.onTimeFulfillment,
                    )}"
                    style="width: {vendor.stats.onTimeFulfillment}%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-small mb-1">
                  <span class="text-text-muted">Customer Reviews</span>
                  <span class="font-medium text-text-main"
                    >★ {vendor.stats.avgRating}/5</span
                  >
                </div>
                <div
                  class="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full {getTrustScoreBgColor(
                      vendor.stats.avgRating * 20,
                    )}"
                    style="width: {vendor.stats.avgRating * 20}%"
                  ></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-small mb-1">
                  <span class="text-text-muted">Disputes Resolved</span>
                  <span class="font-medium text-text-main"
                    >{vendor.stats.disputesResolved}%</span
                  >
                </div>
                <div
                  class="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full {getTrustScoreBgColor(
                      vendor.stats.disputesResolved,
                    )}"
                    style="width: {vendor.stats.disputesResolved}%"
                  ></div>
                </div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="space-y-3">
              <Button
                href="/vendors/{vendor.slug}#shop"
                variant="primary"
                size="lg"
                className="w-full"
              >
                View Active Shops
              </Button>
              <Button
                href="/contact?vendor={vendor.slug}"
                variant="outline"
                size="lg"
                className="w-full"
              >
                Contact Vendor
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 3: TRUST SCORE BREAKDOWN -->
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
            <div
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <span class="text-body text-text-muted">Response Time</span>
              <span class="text-body font-semibold text-text-main"
                >&lt; {vendor.stats.responseTimeHours} hours</span
              >
            </div>
            <div
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <span class="text-body text-text-muted">Processing Time</span>
              <span class="text-body font-semibold text-text-main"
                >{vendor.stats.processingTimeDays} days</span
              >
            </div>
            <div
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <span class="text-body text-text-muted">Return Policy</span>
              <span class="text-body font-semibold text-text-main"
                >{vendor.stats.returnPolicy}</span
              >
            </div>
            <div
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <span class="text-body text-text-muted">Total Products</span>
              <span class="text-body font-semibold text-text-main"
                >{vendor.stats.totalProducts}</span
              >
            </div>
            <div
              class="flex items-center justify-between py-3 border-b border-gray-100"
            >
              <span class="text-body text-text-muted">Total Sales</span>
              <span class="text-body font-semibold text-text-main"
                >{vendor.stats.totalSales.toLocaleString()}+</span
              >
            </div>
            <div class="flex items-center justify-between py-3">
              <span class="text-body text-text-muted">Member Since</span>
              <span class="text-body font-semibold text-text-main"
                >{formatDate(vendor.joinedAt)}</span
              >
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 5: ACTIVE SHOPS (Multi-Shop Feature) -->
  <section id="shop" class="py-20 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
      <h2 class="text-h2 text-text-main mb-8">
        Active Shops ({vendor.shops.length})
      </h2>

      <!-- Search and filter - subtle and minimal -->
      <div class="flex flex-wrap justify-between gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search shops..."
          class="px-4 py-2 border border-gray-300 rounded-md text-sm w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-primary"
          on:input={(e) => {
            const target = e.target as HTMLInputElement;
            searchTerm.set(target.value);
            currentPage.set(1);
          }}
          aria-label="Search shops"
        />

        <select
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          on:change={(e) => {
            const target = e.target as HTMLSelectElement;
            selectedCategory.set(target.value);
            currentPage.set(1);
          }}
          aria-label="Filter shops by category"
        >
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>

      <!-- Shops grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#if $paginatedShops.length === 0}
          <p class="text-text-muted">No shops found matching your criteria.</p>
        {:else}
          {#each $paginatedShops as shop}
            <ShopCard {shop} />
          {/each}
        {/if}
      </div>

      <!-- Pagination controls -->
      {#if $totalPages > 1}
        <div
          class="flex justify-center mt-10 space-x-3 text-sm text-text-muted select-none"
        >
          <button
            class="px-3 py-1 rounded-md border border-gray-300 hover:border-primary disabled:opacity-50"
            on:click={() => goToPage($currentPage - 1)}
            disabled={$currentPage === 1}
            aria-label="Previous page"
          >
            ← Prev
          </button>

          {#each Array($totalPages) as _, i}
            <button
              class="px-3 py-1 rounded-md border border-gray-300 hover:border-primary disabled:opacity-75"
              class:selected={$currentPage === i + 1}
              on:click={() => goToPage(i + 1)}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </button>
          {/each}

          <button
            class="px-3 py-1 rounded-md border border-gray-300 hover:border-primary disabled:opacity-50"
            on:click={() => goToPage($currentPage + 1)}
            disabled={$currentPage === $totalPages}
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      {/if}
    </div>
  </section>

  <!-- 🔷 SECTION 6: REVIEWS -->
  <section class="py-20 bg-surface">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-h2 text-text-main mb-2">Customer Reviews</h2>
          <p class="text-body text-text-muted">
            ★ {vendor.stats.avgRating} Average Rating • Based on {vendor.stats
              .reviewCount} reviews
          </p>
        </div>

        <!-- Review Filters -->
        <div class="hidden md:flex items-center gap-2">
          <button
            class="px-4 py-2 rounded-btn bg-primary text-white text-small font-medium"
            >All</button
          >
          <button
            class="px-4 py-2 rounded-btn border border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors text-small"
            >5 Star</button
          >
          <button
            class="px-4 py-2 rounded-btn border border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors text-small"
            >4 Star</button
          >
          <button
            class="px-4 py-2 rounded-btn border border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors text-small"
            >With Images</button
          >
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each vendor.reviews as review, i}
          <Card
            className="p-6 border border-gray-200 animate-fade-in transition-delay: {i *
              100}ms"
          >
            <div class="flex items-center gap-3 mb-4">
              <img
                src={review.customerAvatar}
                alt={review.customerName}
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-text-main"
                    >{review.customerName}</span
                  >
                  {#if review.verified}
                    <span class="text-xs text-success flex items-center gap-1">
                      <svg
                        class="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  {/if}
                </div>
                <div class="text-small text-text-muted">
                  {formatDate(review.date)}
                </div>
              </div>
            </div>

            <!-- Star Rating -->
            <div class="flex items-center gap-1 mb-3">
              {#each Array(5) as _, index}
                <span
                  class={index < review.rating
                    ? "text-yellow-400"
                    : "text-gray-300"}>★</span
                >
              {/each}
            </div>

            <p class="text-body text-text-muted mb-4">{review.text}</p>

            <!-- Review Images -->
            {#if review.images?.length}
              <div class="flex gap-2">
                {#each review.images as image}
                  <img
                    src={image}
                    alt="Customer review"
                    class="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                {/each}
              </div>
            {/if}
          </Card>
        {/each}
      </div>

      <div class="text-center mt-8">
        <Button variant="outline" href="/vendors/{vendor.slug}/reviews"
          >View All Reviews →</Button
        >
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 7: SOCIAL & CONTACT -->
  <section class="py-20 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
      <!-- Left: Social Links -->
      <div class="animate-fade-in">
        <h2 class="text-h2 text-text-main mb-6">Connect with {vendor.name}</h2>
        <p class="text-body text-text-muted mb-6">
          Follow us on social media for updates, promotions, and new arrivals.
        </p>

        <div class="flex flex-wrap gap-4">
          {#each vendor.socials as social}
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 px-6 py-4 rounded-xl border border-gray-200 bg-surface hover:border-primary hover:bg-primary/5 transition-colors group"
            >
              <span class="text-2xl group-hover:scale-110 transition-transform"
                >{socialIcons[social.platform]}</span
              >
              <div>
                <div class="font-semibold text-text-main capitalize">
                  {social.platform}
                </div>
                <div class="text-small text-text-muted">@{social.handle}</div>
              </div>
            </a>
          {/each}
        </div>
      </div>

      <!-- Right: Contact Card -->
      <div class="animate-fade-in" style="transition-delay: 100ms">
        <Card className="p-6 border border-gray-200 h-full">
          <h3 class="text-h3 text-text-main mb-6">Contact Options</h3>
          <div class="space-y-4">
            <Button
              href="/messages?vendor={vendor.slug}"
              variant="primary"
              size="lg"
              className="w-full"
            >
              💬 Message Vendor
            </Button>
            <Button
              href="/report?vendor={vendor.slug}"
              variant="outline"
              size="lg"
              className="w-full border-error text-error hover:bg-error/5"
            >
              🚩 Report Vendor
            </Button>
            <button
              on:click={copyProfileLink}
              class="w-full px-6 py-4 rounded-btn border border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors text-body font-medium"
            >
              🔗 Copy Profile Link
            </button>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 8: TRUST & SAFETY REMINDER -->
  <!-- <section class="py-16 bg-dark text-text-inverse">
    <div class="container max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-h2 mb-6">Your Payment is Protected</h2>
      <p class="text-lg opacity-90 mb-8">
        When you purchase through VendorHub, you're protected by our secure
        escrow system.
      </p>

      <div class="grid md:grid-cols-3 gap-6">
        {#each [{ icon: "🔒", title: "Funds Secured", desc: "Payment held until delivery confirmed" }, { icon: "⚖️", title: "Disputes Handled", desc: "Fair resolution within 48 hours" }, { icon: "✓", title: "Vendors Verified", desc: "ID and business verification required" }] as item}
          <div class="flex flex-col items-center">
            <div class="text-4xl mb-3">{item.icon}</div>
            <h3 class="font-semibold mb-2">{item.title}</h3>
            <p class="text-small opacity-80">{item.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section> -->

  <!-- 🔷 SECTION 9: FINAL CTA -->
  <section
    class="py-20 bg-gradient-to-r from-primary to-primary-hover text-text-inverse text-center"
  >
    <div class="container max-w-3xl mx-auto px-4">
      <h2 class="text-h2 mb-6">Ready to Shop with Confidence?</h2>
      <p class="text-lg opacity-90 mb-8">
        Browse {vendor.name}'s complete collection and make secure purchases
        today.
      </p>
      <Button
        href="/vendors/{vendor.slug}/shop"
        className="text-primary hover:bg-gray-100 shadow-lg px-8 py-4 text-lg font-semibold"
      >
        Explore Vendor Shops →
      </Button>
    </div>
  </section>

  <!-- 🔷 SECTION 10: FOOTER -->
  <Footer />
</main>

<style>
  button.selected {
    background-color: var(--color-primary, #2563eb);
    color: white;
    border-color: var(--color-primary, #2563eb);
    cursor: default;
  }

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
