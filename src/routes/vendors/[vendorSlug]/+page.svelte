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
  const copyShopLink = () => {
    const url = `${window.location.origin}/vendors/${vendor.slug}/shop`;
    navigator.clipboard.writeText(url);
    alert("Shop link copied to clipboard!");
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
  <!-- 🔷 SECTION 1: STICKY NAVBAR -->
  <nav
    class="sticky top-0 z-50 bg-surface border-b border-gray-200 h-20 shadow-sm"
  >
    <div
      class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between"
    >
      <a href="/" class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold"
        >
          V
        </div>
        <span class="text-xl font-bold text-text-main">VendorHub</span>
      </a>

      <div class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a
          href="/#how-it-works"
          class="text-text-muted hover:text-primary transition-colors"
          >How it Works</a
        >
        <a
          href="/vendors"
          class="text-text-muted hover:text-primary transition-colors"
          >Vendors</a
        >
        <a
          href="/shops"
          class="text-text-muted hover:text-primary transition-colors">Shops</a
        >
        <a
          href="/pricing"
          class="text-text-muted hover:text-primary transition-colors"
          >Pricing</a
        >
      </div>

      <div class="flex items-center gap-4">
        <a
          href="/auth/login"
          class="text-sm font-medium text-text-main hover:text-primary">Login</a
        >
        <Button href="/auth/register" size="md">Become a Vendor</Button>
      </div>
    </div>
  </nav>

  <!-- 🔷 SECTION 2: VENDOR HERO HEADER -->
  <section class="pt-16 pb-12 bg-surface">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- LEFT: Vendor Identity Block -->
        <div class="md:col-span-2 animate-fade-in">
          <div class="flex items-start gap-6">
            <!-- Avatar -->
            <img
              src={vendor.logoUrl}
              alt={vendor.name}
              class="w-[120px] h-[120px] rounded-full object-cover border-4 {vendor.verified
                ? 'border-primary'
                : 'border-gray-200'} shadow-card"
            />

            <!-- Info -->
            <div class="flex-1 pt-2">
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
                    <span>⭐</span>
                    <span>Top 1% Vendor</span>
                  </span>
                {/if}
              </div>

              <!-- Meta Information -->
              <div class="flex flex-wrap gap-4 text-body text-text-muted mb-4">
                <span class="flex items-center gap-1.5">
                  <span>📍</span>
                  <span>{vendor.location}</span>
                </span>
                <span class="flex items-center gap-1.5">
                  <span>🗓</span>
                  <span>Member since {formatDate(vendor.joinedAt)}</span>
                </span>
                <span class="flex items-center gap-1.5">
                  <span>🏬</span>
                  <span>{vendor.shopCount} Active Shops</span>
                </span>
                <span class="flex items-center gap-1.5">
                  <span>📦</span>
                  <span
                    >{vendor.totalOrders.toLocaleString()}+ Orders Completed</span
                  >
                </span>
              </div>

              <!-- Category Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                {#each vendor.categories as category}
                  <span
                    class="px-3 py-1.5 bg-gray-100 text-text-main text-sm rounded-btn font-medium"
                  >
                    {category}
                  </span>
                {/each}
              </div>

              <!-- Social Links -->
              <div class="flex items-center gap-3">
                {#each vendor.socials as social}
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl hover:bg-primary hover:text-white transition-colors"
                    aria-label="Visit {vendor.name} on {social.platform}"
                  >
                    {socialIcons[social.platform]}
                  </a>
                {/each}
              </div>
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
                href="/vendors/{vendor.slug}/shop"
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
  <section class="py-24 bg-background-light">
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
  <section class="py-24 bg-surface">
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
  <section class="py-24 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-h2 text-text-main">
          Active Shops ({vendor.shops.length})
        </h2>
        <Button variant="outline" href="/vendors/{vendor.slug}/shop"
          >View All Shops →</Button
        >
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each vendor.shops as shop, i}
          <Card
            className="overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-card-hover transition-all group animate-fade-in transition-delay: {i *
              100}ms"
          >
            <!-- Shop Banner -->
            <div
              class="h-40 bg-gradient-to-r from-primary to-primary-light overflow-hidden"
            >
              <img
                src={shop.bannerUrl}
                alt={shop.name}
                class="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-h4 font-bold text-text-main">{shop.name}</h3>
                <span
                  class="text-small font-medium {getTrustScoreColor(
                    shop.trustScore,
                  )}">{shop.trustScore}%</span
                >
              </div>

              <p class="text-small text-text-muted mb-4">{shop.category}</p>

              <div
                class="flex items-center justify-between mb-4 text-small text-text-muted"
              >
                <span>{shop.productCount} Products</span>
                <span>{shop.customers.toLocaleString()} Customers</span>
              </div>

              <Button
                href="/vendors/{vendor.slug}/shop/{shop.slug}"
                variant="primary"
                size="md"
                className="w-full"
              >
                Visit Shop →
              </Button>
            </div>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 6: REVIEWS -->
  <section class="py-24 bg-surface">
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
                    alt="Review image"
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
  <section class="py-24 bg-background-light">
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
              on:click={copyShopLink}
              class="w-full px-6 py-4 rounded-btn border border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors text-body font-medium"
            >
              🔗 Copy Shop Link
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
    class="py-24 bg-gradient-to-r from-primary to-primary-hover text-text-inverse text-center"
  >
    <div class="container max-w-3xl mx-auto px-4">
      <h2 class="text-h2 mb-6">Ready to Shop with Confidence?</h2>
      <p class="text-lg opacity-90 mb-8">
        Browse {vendor.name}'s complete collection and make secure purchases
        today.
      </p>
      <Button
        href="/vendors/{vendor.slug}/shop"
        className="bg-white text-primary hover:bg-gray-100 shadow-lg px-8 py-4 text-lg font-semibold"
      >
        Explore Vendor Shops →
      </Button>
    </div>
  </section>

  <!-- 🔷 SECTION 10: FOOTER -->
  <footer class="bg-dark text-text-inverse py-16 border-t border-gray-800">
    <div class="container">
      <div class="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 class="font-bold mb-4">Product</h4>
          <ul class="space-y-2 text-small text-gray-400">
            <li>
              <a href="/features" class="hover:text-white transition-colors"
                >Features</a
              >
            </li>
            <li>
              <a href="/pricing" class="hover:text-white transition-colors"
                >Pricing</a
              >
            </li>
            <li>
              <a href="/vendors" class="hover:text-white transition-colors"
                >Vendor Directory</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">For Vendors</h4>
          <ul class="space-y-2 text-small text-gray-400">
            <li>
              <a
                href="/auth/register"
                class="hover:text-white transition-colors">Become a Vendor</a
              >
            </li>
            <li>
              <a href="/dashboard" class="hover:text-white transition-colors"
                >Dashboard</a
              >
            </li>
            <li>
              <a href="/resources" class="hover:text-white transition-colors"
                >Resources</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Company</h4>
          <ul class="space-y-2 text-small text-gray-400">
            <li>
              <a href="/about" class="hover:text-white transition-colors"
                >About Us</a
              >
            </li>
            <li>
              <a href="/contact" class="hover:text-white transition-colors"
                >Contact</a
              >
            </li>
            <li>
              <a href="/blog" class="hover:text-white transition-colors">Blog</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Legal</h4>
          <ul class="space-y-2 text-small text-gray-400">
            <li>
              <a href="/privacy" class="hover:text-white transition-colors"
                >Privacy</a
              >
            </li>
            <li>
              <a href="/terms" class="hover:text-white transition-colors"
                >Terms</a
              >
            </li>
            <li>
              <a href="/refund" class="hover:text-white transition-colors"
                >Refund Policy</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-6 h-6 bg-primary rounded flex items-center justify-center text-xs font-bold"
          >
            V
          </div>
          <span class="font-bold">VendorHub</span>
        </div>
        <p class="text-small text-gray-500">
          © {new Date().getFullYear()} VendorHub. All rights reserved.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-gray-400 hover:text-white transition-colors"
            >𝕏</a
          >
          <a href="#" class="text-gray-400 hover:text-white transition-colors"
            >📸</a
          >
          <a href="#" class="text-gray-400 hover:text-white transition-colors"
            >in</a
          >
        </div>
      </div>
    </div>
  </footer>
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
