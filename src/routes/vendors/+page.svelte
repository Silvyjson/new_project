<!-- src/routes/vendors/+page.svelte -->
<script lang="ts">
  import { onMount, tick } from "svelte";
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

  // Sort options
  const sortOptions = [
    { value: "trustScore", label: "Highest Trust Score" },
    { value: "rating", label: "Top Rated" },
    { value: "sales", label: "Most Sales" },
    { value: "newest", label: "Recently Joined" },
  ];

  // Handle filter change
  const handleFilterChange = (e: CustomEvent) => {
    const detail = e.detail;
    searchQuery = detail.searchQuery;
    selectedCategory = detail.selectedCategory;
    minTrustScore = detail.minTrustScore;
    verifiedOnly = detail.verifiedOnly;
    sortBy = detail.sortBy;
    updateFilters();
  };

  const handlePageChange = (e: CustomEvent) => {
    const params = new URLSearchParams($page.url.searchParams);
    params.set("page", e.detail.page.toString());
    goto(`/vendors?${params.toString()}`, { replaceState: true });
  };

  // Get trust score color
  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-primary";
    if (score >= 40) return "bg-yellow-500";
    return "bg-error";
  };

  import Filter from "$lib/components/ui/Filter.svelte";
  import Pagination from "$lib/components/ui/Pagination.svelte";
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

  <!-- 🔷 SECTION 3: STAND IN -->
  <section
    class="py-1 bg-background-light border-b border-gray-200 overflow-x-auto"
  ></section>

  <!-- 🔷 SECTION 4: SEARCH + FILTER BAR (Sticky) -->
  <section
    class="sticky top-20 z-40 bg-surface border-b border-gray-200 py-4 shadow-sm"
  >
    <div class="container max-w-[1200px] mx-auto px-4">
      <Filter
        {searchQuery}
        {selectedCategory}
        {categories}
        {minTrustScore}
        {verifiedOnly}
        {sortBy}
        {sortOptions}
        resultsCount={vendors.length}
        totalCount={totalVendors}
        entityName="vendors"
        on:change={handleFilterChange}
        on:clear={clearAllFilters}
      />
    </div>
  </section>

  <!-- 🔷 SECTION 5: VENDOR GRID -->
  <section class="py-16 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
      <!-- Vendor Cards Grid -->
      {#if vendors.length > 0}
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {#each vendors as vendor, i}
            <div
              in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}
            >
              <VendorCard {vendor} />
            </div>
          {/each}
        </div>

        <!-- Pagination -->
        <Pagination
          currentPage={data.pagination?.page || 1}
          totalPages={data.pagination?.totalPages || 1}
          on:pageChange={handlePageChange}
        />
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

  <!-- 🔷 SECTION 6: CTA SECTION -->
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
          href="/#pricing"
          variant="ghost"
          className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
        >
          Learn About Vendor Plans
        </Button>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 7: FOOTER -->
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
