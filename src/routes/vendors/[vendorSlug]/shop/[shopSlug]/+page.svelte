<!-- src/routes/shops/[shopSlug]/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
    import ProductCard from "$lib/components/vendor/ProductCard.svelte";

    // Data from load function
    export let data: PageData;
    const {
        shop,
        products,
        featuredProducts,
        categories,
        reviews,
        filters,
        meta,
    } = data;

    // Local filter state
    let selectedCategory = filters.category;
    let minPrice = filters.minPrice;
    let maxPrice = filters.maxPrice;
    let availability = filters.availability;
    let sortBy = filters.sortBy;

    // Active tab for navigation
    let activeTab = "all";

    // Update URL with filters
    const updateFilters = () => {
        const params = new URLSearchParams();
        if (selectedCategory) params.set("category", selectedCategory);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (availability) params.set("availability", availability);
        if (sortBy && sortBy !== "newest") params.set("sort", sortBy);
        goto(`/shops/${shop.slug}?${params.toString()}`, {
            replaceState: true,
        });
    };

    // Clear all filters
    const clearAllFilters = () => {
        selectedCategory = "";
        minPrice = "";
        maxPrice = "";
        availability = "";
        sortBy = "newest";
        updateFilters();
    };

    // Format currency
    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Format date
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    };

    // Get trust score color
    const getTrustScoreColor = (score: number) => {
        if (score >= 80) return "text-success";
        if (score >= 60) return "text-primary";
        if (score >= 40) return "text-yellow-500";
        return "text-error";
    };

    // Navigation tabs
    const navTabs = [
        { id: "all", label: "All Products" },
        { id: "featured", label: "Featured" },
        { id: "new", label: "New Arrivals" },
        { id: "bestsellers", label: "Best Sellers" },
        { id: "sale", label: "Sale" },
    ];

    // Filter products by tab
    const getFilteredProducts = () => {
        switch (activeTab) {
            case "featured":
                return products.filter((p) => p.featured);
            case "new":
                return products.filter((p) => p.new);
            case "bestsellers":
                return products.sort((a, b) => b.reviewCount - a.reviewCount);
            case "sale":
                return products.filter((p) => p.sale);
            default:
                return products;
        }
    };

    const displayProducts = getFilteredProducts();

    // Follow shop state
    let isFollowing = false;

    const toggleFollow = () => {
        isFollowing = !isFollowing;
        // In real app: API call to follow/unfollow
    };
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content={meta.ogImage} />
    <meta property="og:type" content="website" />
</svelte:head>

<main class="min-h-screen bg-surface">
    <!-- 🔷 SECTION 1: MINIMAL NAVBAR (Shop-Focused) -->
    <nav class="sticky top-0 z-50 bg-surface border-b border-gray-200 h-[70px]">
        <div
            class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between"
        >
            <!-- Left: Shop Logo & Name -->
            <a href="/shops/{shop.slug}" class="flex items-center gap-3">
                <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    class="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                    <div class="flex items-center gap-2">
                        <span class="text-lg font-bold text-text-main"
                            >{shop.name}</span
                        >
                        {#if shop.vendorVerified}
                            <TrustBadge size="sm" showText={false} />
                        {/if}
                    </div>
                    <p class="text-xs text-text-muted">
                        Verified Shop on VendorHub ✓
                    </p>
                </div>
            </a>

            <!-- Center: Navigation -->
            <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                <a
                    href="#products"
                    class="text-text-main hover:text-primary transition-colors"
                    >Products</a
                >
                <a
                    href="#reviews"
                    class="text-text-muted hover:text-primary transition-colors"
                    >Reviews</a
                >
                <a
                    href="#about"
                    class="text-text-muted hover:text-primary transition-colors"
                    >About</a
                >
                <a
                    href="#contact"
                    class="text-text-muted hover:text-primary transition-colors"
                    >Contact</a
                >
            </div>

            <!-- Right: Actions -->
            <div class="flex items-center gap-4">
                <button
                    class="text-text-muted hover:text-primary transition-colors"
                    aria-label="Search"
                >
                    <svg
                        class="w-5 h-5"
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
                </button>
                <button
                    class="text-text-muted hover:text-primary transition-colors relative"
                    aria-label="Cart"
                >
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <span
                        class="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center"
                        >0</span
                    >
                </button>
                <button
                    class="text-text-muted hover:text-primary transition-colors"
                    aria-label="Profile"
                >
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- 🔷 SECTION 2: SHOP HERO (Brand Identity) -->
    <section class="relative h-[320px] md:h-[400px]">
        <!-- Banner Image -->
        <img src={shop.bannerUrl} alt="" class="w-full h-full object-cover" />
        <div
            class="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/40"
        ></div>

        <!-- Content Overlay -->
        <div class="absolute inset-0 flex items-center">
            <div class="container max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <!-- Left: Shop Info -->
                    <div class="flex items-start gap-6 animate-fade-in">
                        <img
                            src={shop.logoUrl}
                            alt={shop.name}
                            class="w-[100px] h-[100px] rounded-2xl object-cover border-4 border-surface shadow-card"
                        />
                        <div>
                            <h1
                                class="text-[32px] md:text-[40px] font-bold text-white mb-2"
                            >
                                {shop.name}
                            </h1>
                            <p class="text-lg text-white/90 mb-4">
                                {shop.tagline}
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <Badge variant="info">{shop.category}</Badge>
                                {#if shop.vendorVerified}
                                    <Badge variant="success"
                                        >Verified Vendor</Badge
                                    >
                                {/if}
                            </div>
                            <div class="flex gap-3">
                                <Button
                                    href="#products"
                                    variant="primary"
                                    size="md">Shop Now</Button
                                >
                                <button
                                    on:click={toggleFollow}
                                    class="px-6 py-3 rounded-btn border-2 border-white text-white font-medium hover:bg-white hover:text-dark transition-colors"
                                >
                                    {isFollowing
                                        ? "✓ Following"
                                        : "Follow Shop"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Trust Metrics -->
                    <div
                        class="hidden md:block animate-fade-in"
                        style="transition-delay: 100ms"
                    >
                        <Card
                            className="bg-surface/95 backdrop-blur-sm p-6 max-w-md ml-auto"
                        >
                            <div class="grid grid-cols-2 gap-4">
                                <div class="text-center">
                                    <div
                                        class="text-[32px] font-bold {getTrustScoreColor(
                                            shop.trustScore,
                                        )}"
                                    >
                                        {shop.trustScore}%
                                    </div>
                                    <div class="text-small text-text-muted">
                                        Trust Score
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div
                                        class="text-[32px] font-bold text-text-main"
                                    >
                                        ★ {shop.rating}
                                    </div>
                                    <div class="text-small text-text-muted">
                                        {shop.reviewCount} Reviews
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div
                                        class="text-[32px] font-bold text-text-main"
                                    >
                                        {shop.orderCount.toLocaleString()}
                                    </div>
                                    <div class="text-small text-text-muted">
                                        Orders Completed
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div
                                        class="text-[32px] font-bold text-text-main"
                                    >
                                        {shop.followers.toLocaleString()}
                                    </div>
                                    <div class="text-small text-text-muted">
                                        Followers
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 3: SHOP NAVIGATION TABS (Sticky) -->
    <section class="sticky top-[70px] z-40 bg-surface border-b border-gray-200">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="flex items-center gap-8 overflow-x-auto py-4">
                {#each navTabs as tab}
                    <button
                        on:click={() => (activeTab = tab.id)}
                        class="text-body font-medium whitespace-nowrap pb-1 border-b-2 transition-colors
                   {activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-text-muted hover:text-primary'}"
                    >
                        {tab.label}
                    </button>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 4: FEATURED PRODUCTS (Carousel) -->
    {#if featuredProducts.length > 0 && activeTab === "all"}
        <section class="py-16 bg-surface">
            <div class="container max-w-7xl mx-auto px-4">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-h2 text-text-main">Featured Products</h2>
                    <a
                        href="#products"
                        class="text-primary font-medium hover:underline"
                        >View All →</a
                    >
                </div>

                <div
                    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {#each featuredProducts as product, i}
                        <div
                            in:fly={{
                                y: 20,
                                duration: 400,
                                delay: i * 50,
                                easing: cubicOut,
                            }}
                        >
                            <ProductCard
                                {product}
                                shopSlug={shop.slug}
                                compact={true}
                            />
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    {/if}

    <!-- 🔷 SECTION 5: ALL PRODUCTS GRID (Core Section) -->
    <section id="products" class="py-16 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            <!-- Filter & Sort Bar -->
            <div
                class="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
            >
                <div class="flex flex-wrap gap-3">
                    <!-- Category Filter -->
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

                    <!-- Availability Filter -->
                    <select
                        class="px-4 py-2.5 rounded-btn border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
                        bind:value={availability}
                        on:change={updateFilters}
                    >
                        <option value="">All Availability</option>
                        <option value="in-stock">In Stock</option>
                        <option value="preorder">Pre-Order</option>
                    </select>

                    <!-- Sort Dropdown -->
                    <select
                        class="px-4 py-2.5 rounded-btn border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
                        bind:value={sortBy}
                        on:change={updateFilters}
                    >
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>

                <div class="text-body text-text-muted">
                    Showing <span class="font-semibold text-text-main"
                        >{displayProducts.length}</span
                    > products
                </div>
            </div>

            <!-- Products Grid -->
            {#if displayProducts.length > 0}
                <div
                    class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {#each displayProducts as product, i}
                        <div
                            in:fly={{
                                y: 20,
                                duration: 400,
                                delay: i * 50,
                                easing: cubicOut,
                            }}
                        >
                            <ProductCard {product} shopSlug={shop.slug} />
                        </div>
                    {/each}
                </div>
            {:else}
                <Card className="py-16 text-center">
                    <div class="text-6xl mb-4">📦</div>
                    <h3 class="text-h3 text-text-main mb-2">
                        No Products Found
                    </h3>
                    <p class="text-body text-text-muted mb-6">
                        Try adjusting your filters to find what you're looking
                        for.
                    </p>
                    <Button variant="outline" on:click={clearAllFilters}
                        >Clear All Filters</Button
                    >
                </Card>
            {/if}
        </div>
    </section>

    <!-- 🔷 SECTION 6: ABOUT THIS SHOP -->
    <section id="about" class="py-24 bg-surface">
        <div
            class="container max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12"
        >
            <!-- Left: Shop Story -->
            <div class="animate-fade-in">
                <h2 class="text-h2 text-text-main mb-6">About {shop.name}</h2>
                <p class="text-body text-text-muted leading-relaxed mb-6">
                    {shop.description}
                </p>

                <!-- Social Links -->
                <div class="flex items-center gap-4 mb-6">
                    {#each shop.socials as social}
                        <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl hover:bg-primary hover:text-white transition-colors"
                        >
                            {social.platform === "instagram" ? "📸" : "💬"}
                        </a>
                    {/each}
                </div>

                <!-- Location & Member Since -->
                <div class="flex items-center gap-6 text-body text-text-muted">
                    <span class="flex items-center gap-2">
                        <span>📍</span>
                        <span>{shop.location}</span>
                    </span>
                    <span class="flex items-center gap-2">
                        <span>🗓</span>
                        <span>Member since {formatDate(shop.joinedAt)}</span>
                    </span>
                </div>
            </div>

            <!-- Right: Shop Metrics Card -->
            <div class="animate-fade-in" style="transition-delay: 100ms">
                <Card className="p-6 border border-gray-200 h-full">
                    <h3 class="text-h3 text-text-main mb-6">
                        Shop Information
                    </h3>
                    <div class="space-y-4">
                        <div
                            class="flex items-center justify-between py-3 border-b border-gray-100"
                        >
                            <span class="text-body text-text-muted"
                                >Response Time</span
                            >
                            <span class="text-body font-semibold text-text-main"
                                >{shop.stats.responseTime}</span
                            >
                        </div>
                        <div
                            class="flex items-center justify-between py-3 border-b border-gray-100"
                        >
                            <span class="text-body text-text-muted"
                                >Processing Time</span
                            >
                            <span class="text-body font-semibold text-text-main"
                                >{shop.stats.processingTime}</span
                            >
                        </div>
                        <div
                            class="flex items-center justify-between py-3 border-b border-gray-100"
                        >
                            <span class="text-body text-text-muted"
                                >Return Policy</span
                            >
                            <span class="text-body font-semibold text-text-main"
                                >{shop.stats.returnPolicy}</span
                            >
                        </div>
                        <div
                            class="flex items-center justify-between py-3 border-b border-gray-100"
                        >
                            <span class="text-body text-text-muted"
                                >Shipping Time</span
                            >
                            <span class="text-body font-semibold text-text-main"
                                >{shop.stats.shippingTime}</span
                            >
                        </div>
                        <div class="flex items-center justify-between py-3">
                            <span class="text-body text-text-muted"
                                >Trust Score</span
                            >
                            <span
                                class="text-body font-semibold {getTrustScoreColor(
                                    shop.trustScore,
                                )}">{shop.trustScore}%</span
                            >
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 7: REVIEWS SECTION -->
    <section id="reviews" class="py-24 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-h2 text-text-main mb-4">Customer Reviews</h2>
                <div class="flex items-center justify-center gap-4 mb-4">
                    <span class="text-[48px] font-bold text-text-main"
                        >★ {shop.rating}</span
                    >
                    <div class="text-left">
                        <div class="text-body text-text-muted">
                            Based on {shop.reviewCount} reviews
                        </div>
                        <div class="flex items-center gap-1">
                            {#each Array(5) as _, i}
                                <span
                                    class={i < Math.floor(shop.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"}>★</span
                                >
                            {/each}
                        </div>
                    </div>
                </div>

                <!-- Rating Breakdown -->
                <div class="max-w-md mx-auto space-y-2">
                    {#each [5, 4, 3, 2, 1] as stars}
                        <div class="flex items-center gap-3">
                            <span class="text-small text-text-muted w-8"
                                >{stars}★</span
                            >
                            <div
                                class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
                            >
                                <div
                                    class="h-full bg-yellow-400"
                                    style="width: {(shop.ratingBreakdown[
                                        stars
                                    ] /
                                        shop.reviewCount) *
                                        100}%"
                                ></div>
                            </div>
                            <span
                                class="text-small text-text-muted w-12 text-right"
                                >{shop.ratingBreakdown[stars]}</span
                            >
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Review Cards -->
            <div
                class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
                {#each reviews as review, i}
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
                                        <Badge variant="success"
                                            >Verified Purchase</Badge
                                        >
                                    {/if}
                                </div>
                                <div class="text-small text-text-muted">
                                    {formatDate(review.date)}
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-1 mb-3">
                            {#each Array(5) as _, index}
                                <span
                                    class={index < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"}>★</span
                                >
                            {/each}
                        </div>

                        <p class="text-body text-text-muted mb-4">
                            {review.text}
                        </p>

                        {#if review.productPurchased}
                            <p class="text-small text-text-muted mb-3">
                                Purchased: {review.productPurchased}
                            </p>
                        {/if}

                        {#if review.images?.length}
                            <div class="flex gap-2">
                                {#each review.images as image}
                                    <img
                                        src={image}
                                        alt="Review"
                                        class="w-16 h-16 rounded-lg object-cover"
                                    />
                                {/each}
                            </div>
                        {/if}
                    </Card>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 8: CONTACT & POLICIES -->
    <section id="contact" class="py-24 bg-surface">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Contact -->
                <div>
                    <h2 class="text-h2 text-text-main mb-6">Contact Us</h2>
                    <p class="text-body text-text-muted mb-6">
                        Have questions? Reach out to us directly.
                    </p>
                    <div class="space-y-3">
                        <Button
                            href="/messages?shop={shop.slug}"
                            variant="primary"
                            size="lg"
                            className="w-full"
                        >
                            💬 Message Shop
                        </Button>
                        <Button
                            href="/report?shop={shop.slug}"
                            variant="outline"
                            size="lg"
                            className="w-full border-error text-error hover:bg-error/5"
                        >
                            🚩 Report Shop
                        </Button>
                    </div>
                </div>

                <!-- Policies Tabs -->
                <div>
                    <h2 class="text-h2 text-text-main mb-6">Shop Policies</h2>
                    <Card className="p-6 border border-gray-200">
                        <div class="space-y-4">
                            <div>
                                <h3 class="font-semibold text-text-main mb-2">
                                    Shipping Policy
                                </h3>
                                <p class="text-body text-text-muted">
                                    We ship nationwide within 2-5 business days.
                                    Express shipping available for Lagos
                                    deliveries.
                                </p>
                            </div>
                            <div>
                                <h3 class="font-semibold text-text-main mb-2">
                                    Return Policy
                                </h3>
                                <p class="text-body text-text-muted">
                                    7-day return policy for unworn items with
                                    original packaging. Buyer pays return
                                    shipping.
                                </p>
                            </div>
                            <div>
                                <h3 class="font-semibold text-text-main mb-2">
                                    FAQ
                                </h3>
                                <p class="text-body text-text-muted">
                                    Check our FAQ section for common questions
                                    about sizing, authenticity, and more.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 9: VENDORHUB TRUST STRIP (Subtle Platform Reinforcement) -->
    <section class="py-12 bg-dark text-text-inverse">
        <div class="container max-w-4xl mx-auto px-4 text-center">
            <p class="text-lg font-medium mb-6">
                This shop is verified and secured by VendorHub
            </p>
            <div class="grid md:grid-cols-3 gap-6">
                {#each [{ icon: "🔒", title: "Secure Payments", desc: "Funds held until delivery" }, { icon: "✓", title: "Trust Score", desc: "Transparent performance metrics" }, { icon: "⚖️", title: "Dispute Protection", desc: "Fair resolution guaranteed" }] as item}
                    <div class="flex flex-col items-center">
                        <div class="text-3xl mb-2">{item.icon}</div>
                        <h3 class="font-semibold mb-1">{item.title}</h3>
                        <p class="text-small opacity-80">{item.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 10: MINIMAL POWERED BY FOOTER -->
    <footer class="bg-surface border-t border-gray-200 py-8">
        <div class="container max-w-7xl mx-auto px-4 text-center">
            <p class="text-small text-text-muted">
                Powered by <a
                    href="/"
                    class="text-primary font-medium hover:underline"
                    >VendorHub</a
                >
            </p>
            <p class="text-small text-text-muted mt-2">
                Build your own trusted shop today →
            </p>
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
