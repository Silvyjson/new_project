<!-- src/routes/vendors/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  // Types
  import type { PageData } from "./$types";

  // Components
  import Button from "$lib/components/ui/Button.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import VendorCard from "$lib/components/vendor/VendorCard.svelte";
  import Nav from "$lib/components/homepage/Nav.svelte";
  import Footer from "$lib/components/homepage/Footer.svelte";

  // Data from load function
  export let data: PageData;
  const { vendors, totalVendors, categories, filters, stats, meta } = data;

  // Local filter state
  let searchQuery = filters.search;
  let selectedCategory = filters.category;
  let minTrustScore = filters.minTrustScore;
  let verifiedOnly = filters.verifiedOnly;
  let sortBy = filters.sortBy;

  // Filter chips
  let activeChips: Array<{ type: string; value: string; label: string }> = [];

  // Update chips when filters change
  $: {
    activeChips = [];
    if (verifiedOnly)
      activeChips.push({
        type: "verified",
        value: "true",
        label: "Verified Only",
      });
    if (selectedCategory)
      activeChips.push({
        type: "category",
        value: selectedCategory,
        label: selectedCategory,
      });
    if (minTrustScore)
      activeChips.push({
        type: "trust",
        value: minTrustScore,
        label: `${minTrustScore}+ Trust`,
      });
  }

  // Debounced search
  let searchTimeout: ReturnType<typeof setTimeout>;

  const handleSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      updateFilters();
    }, 300);
  };

  // Update URL with filters
  const updateFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (minTrustScore) params.set("minTrust", minTrustScore);
    if (verifiedOnly) params.set("verified", "true");
    if (sortBy && sortBy !== "trustScore") params.set("sort", sortBy);

    goto(`/vendors?${params.toString()}`, { replaceState: true });
  };

  // Remove filter chip
  const removeChip = (chip: { type: string; value: string }) => {
    if (chip.type === "verified") verifiedOnly = false;
    if (chip.type === "category") selectedCategory = "";
    if (chip.type === "trust") minTrustScore = "";
    if (chip.type === "search") searchQuery = "";
    updateFilters();
  };

  // Clear all filters
  const clearAllFilters = () => {
    searchQuery = "";
    selectedCategory = "";
    minTrustScore = "";
    verifiedOnly = false;
    sortBy = "trustScore";
    updateFilters();
  };

  // Animated counter state
  let countersVisible = false;
  let statValues = {
    vendors: 0,
    shops: 0,
    successRate: 0,
    secured: 0,
  };

  // Animate stats on scroll
  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      vendors: stats.verifiedVendors * 100, // Scale for demo
      shops: stats.activeShops * 100,
      successRate: stats.successRate,
      secured: 150,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = cubicOut(progress);

      statValues = {
        vendors: Math.floor(targets.vendors * ease),
        shops: Math.floor(targets.shops * ease),
        successRate: Math.floor(targets.successRate * ease),
        secured: Math.floor(targets.secured * ease),
      };

      if (step >= steps) {
        clearInterval(timer);
        statValues = {
          vendors: targets.vendors,
          shops: targets.shops,
          successRate: targets.successRate,
          secured: targets.secured,
        };
      }
    }, interval);
  };

  // Intersection Observer for stats section
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersVisible) {
          countersVisible = true;
          animateStats();
        }
      },
      { threshold: 0.3 },
    );

    const target = document.getElementById("stats-section");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  });

  // Get trust score color
  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-primary";
    if (score >= 40) return "bg-yellow-500";
    return "bg-error";
  };
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:type" content="website" />
</svelte:head>

<main class="min-h-screen bg-background-light">
  <!-- 🔷 SECTION 1: NAVBAR (Sticky) -->
  <Nav />

  <!-- 🔷 SECTION 2: HERO HEADER -->
  <section class="py-20 bg-surface text-center animate-fade-in">
    <div class="container max-w-4xl mx-auto px-4">
      <h1
        class="text-[48px] md:text-[56px] font-bold text-text-main leading-tight mb-6"
      >
        Explore <span class="text-primary border-b-4 border-primary/30"
          >Trusted</span
        > Vendors on VendorHub
      </h1>
      <p
        class="text-[18px] text-text-muted max-w-[650px] mx-auto mb-10 leading-relaxed"
      >
        Find verified sellers with transparent trust scores and secure payments
        — all in one trusted marketplace.
      </p>

      <!-- Large Search Bar -->
      <div class="relative max-w-[600px] mx-auto">
        <svg
          class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search vendors, categories, or products..."
          class="w-full pl-14 pr-32 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-body shadow-card"
          bind:value={searchQuery}
          on:input={handleSearch}
        />
        <button
          on:click={updateFilters}
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2.5 rounded-btn font-medium hover:bg-primary-hover transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 3: LIVE STATS STRIP -->
  <!-- <section
    id="stats-section"
    class="py-10 bg-background-light border-y border-gray-200"
  >
    <div class="container">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center animate-fade-in" style="transition-delay: 0ms">
          <div class="text-[32px] font-bold text-primary mb-1">
            {countersVisible
              ? `${Math.floor(statValues.vendors / 100)}+`
              : "2,500+"}
          </div>
          <div class="text-small text-text-muted">Verified Vendors</div>
        </div>

        <div
          class="text-center animate-fade-in"
          style="transition-delay: 100ms"
        >
          <div class="text-[32px] font-bold text-primary mb-1">
            {countersVisible
              ? `${Math.floor(statValues.shops / 100)}+`
              : "7,800+"}
          </div>
          <div class="text-small text-text-muted">Active Shops</div>
        </div>

        <div
          class="text-center animate-fade-in"
          style="transition-delay: 200ms"
        >
          <div class="text-[32px] font-bold text-primary mb-1">
            {countersVisible ? `${statValues.successRate}%` : "98%"}
          </div>
          <div class="text-small text-text-muted">Successful Deliveries</div>
        </div>

        <div
          class="text-center animate-fade-in"
          style="transition-delay: 300ms"
        >
          <div class="text-[32px] font-bold text-primary mb-1">
            {countersVisible ? `₦${statValues.secured}M+` : "₦150M+"}
          </div>
          <div class="text-small text-text-muted">Secured Transactions</div>
        </div>
      </div>
    </div>
  </section> -->

  <section
    class="py-1 bg-background-light border-b border-gray-200 overflow-x-auto"
  ></section>

  <!-- 🔷 SECTION 4: SEARCH + FILTER BAR (Sticky) -->
  <section
    class="sticky top-20 z-40 bg-surface border-b border-gray-200 py-4 shadow-sm"
  >
    <div class="container max-w-[1200px] mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Results Count -->
        <div class="text-body text-text-muted">
          Showing <span class="font-semibold text-text-main"
            >{vendors.length}</span
          >
          of <span class="font-semibold text-text-main">{totalVendors}</span> vendors
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-3 w-full md:w-auto">
          <!-- Category Dropdown -->
          <select
            class="px-4 py-2.5 rounded-btn border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            bind:value={selectedCategory}
            on:change={updateFilters}
          >
            <option value="">All Categories</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>

          <!-- Trust Score Filter -->
          <select
            class="px-4 py-2.5 rounded-btn border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            bind:value={minTrustScore}
            on:change={updateFilters}
          >
            <option value="">Any Trust Score</option>
            <option value="90">90+ Excellent</option>
            <option value="80">80+ Great</option>
            <option value="70">70+ Good</option>
            <option value="60">60+ Fair</option>
          </select>

          <!-- Verified Only Toggle -->
          <label
            class="flex items-center gap-2 px-4 py-2.5 rounded-btn border border-gray-200 cursor-pointer hover:border-primary transition-colors"
          >
            <input
              type="checkbox"
              class="w-4 h-4 text-primary rounded focus:ring-primary"
              bind:checked={verifiedOnly}
              on:change={updateFilters}
            />
            <span class="text-body text-text-main whitespace-nowrap"
              >Verified Only</span
            >
          </label>

          <!-- Sort Dropdown -->
          <select
            class="px-4 py-2.5 rounded-btn border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
            bind:value={sortBy}
            on:change={updateFilters}
          >
            <option value="trustScore">Highest Trust Score</option>
            <option value="rating">Top Rated</option>
            <option value="sales">Most Sales</option>
            <option value="newest">Recently Joined</option>
          </select>
        </div>
      </div>

      <!-- Filter Chips -->
      {#if activeChips.length > 0}
        <div class="mt-4 flex flex-wrap items-center gap-2">
          {#each activeChips as chip}
            <span
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-small rounded-btn"
            >
              {chip.label}
              <button
                on:click={() => removeChip(chip)}
                class="hover:text-primary-hover transition-colors"
                aria-label="Remove {chip.label} filter"
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
            </span>
          {/each}
          <button
            on:click={clearAllFilters}
            class="text-small text-text-muted hover:text-primary transition-colors underline"
          >
            Clear All
          </button>
        </div>
      {/if}
    </div>
  </section>

  <!-- 🔷 SECTION 5: VENDOR GRID -->
  <section class="py-16 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
      <!-- Vendor Cards Grid -->
      {#if vendors.length > 0}
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {#each vendors as vendor, i}
            <div
              in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}
            >
              <VendorCard {vendor} />
            </div>
          {/each}
        </div>

        <!-- Pagination (Placeholder) -->
        <div class="mt-12 flex justify-center">
          <div class="flex items-center gap-2">
            <button
              class="px-4 py-2 rounded-btn border border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button class="px-4 py-2 rounded-btn bg-primary text-white"
              >1</button
            >
            <button
              class="px-4 py-2 rounded-btn border border-gray-200 text-text-main hover:border-primary transition-colors"
              >2</button
            >
            <button
              class="px-4 py-2 rounded-btn border border-gray-200 text-text-main hover:border-primary transition-colors"
              >3</button
            >
            <span class="text-text-muted">...</span>
            <button
              class="px-4 py-2 rounded-btn border border-gray-200 text-text-main hover:border-primary transition-colors"
              >Next</button
            >
          </div>
        </div>
      {:else}
        <!-- Empty State -->
        <Card className="py-16 text-center">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-h3 text-text-main mb-2">No Vendors Found</h3>
          <p class="text-body text-text-muted mb-6">
            Try adjusting your filters or search terms to find what you're
            looking for.
          </p>
          <Button variant="outline" onclick={clearAllFilters}
            >Clear All Filters</Button
          >
        </Card>
      {/if}
    </div>
  </section>

  <!-- 🔷 SECTION 6: TRUST EXPLANATION -->
  <!-- <section class="py-24 bg-surface">
    <div class="container grid md:grid-cols-2 gap-12 items-center">
      <div class="order-2 md:order-1 animate-fade-in">
        <div
          class="bg-primary/5 rounded-2xl p-8 flex items-center justify-center"
        >
          <svg
            class="w-48 h-48 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
      </div>

      <div
        class="order-1 md:order-2 animate-fade-in"
        style="transition-delay: 100ms"
      >
        <h2 class="text-h2 text-text-main mb-6">
          Why Trust VendorHub Vendors?
        </h2>
        <div class="space-y-4">
          {#each [{ icon: "✓", title: "Identity Verified", desc: "Every vendor undergoes ID verification and manual review before getting verified badge." }, { icon: "✓", title: "Trust Score Calculated Transparently", desc: "Scores based on real performance: delivery rate, reviews, response time, and order completion." }, { icon: "✓", title: "Secure Payment Holding", desc: "Payments held in escrow until you confirm delivery. No risk of scams or lost money." }, { icon: "✓", title: "Dispute Resolution System", desc: "Neutral team reviews evidence and resolves issues fairly within 48 hours." }] as item}
            <div class="flex items-start gap-4">
              <div
                class="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <span class="text-xs font-bold">{item.icon}</span>
              </div>
              <div>
                <h3 class="text-h4 font-semibold text-text-main mb-1">
                  {item.title}
                </h3>
                <p class="text-body text-text-muted">{item.desc}</p>
              </div>
            </div>
          {/each}
        </div>
        <Button href="/trust" variant="outline" className="mt-8"
          >Learn More About Safety</Button
        >
      </div>
    </div>
  </section> -->

  <!-- 🔷 SECTION 7: CTA SECTION -->
  <section
    class="py-24 bg-gradient-to-r from-primary to-primary-hover text-text-inverse text-center"
  >
    <div class="container max-w-3xl mx-auto px-4">
      <h2 class="text-h2 mb-6">Want to Be Listed Here?</h2>
      <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
        Join thousands of trusted vendors building secure online stores with
        VendorHub.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          href="/auth/register"
          className="text-primary hover:bg-gray-100 shadow-lg px-8 py-4 text-lg font-semibold"
        >
          Create Vendor Account
        </Button>
        <Button
          href="/pricing"
          variant="ghost"
          className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
        >
          Learn About Vendor Plans
        </Button>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 8: FOOTER -->
  <Footer />
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
