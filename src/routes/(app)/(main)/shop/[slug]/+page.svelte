<!-- src/routes/shop/[shopSlug]/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import ReviewCard from "$lib/components/ui/ReviewCard.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
    import ProductCard from "$lib/components/card/ProductCard.svelte";

    // Data from load function
    export let data: PageData;
    const { shop, products, featuredProducts, categories, reviews, meta } =
        data;

    // Active tab for filtering products
    let activeTab = "bestsellers";

    // Follow shop state
    let isFollowing = false;
    const toggleFollow = () => {
        isFollowing = !isFollowing;
    };

    // Copy shop link (subtle)
    const copyShopLink = () => {
        const url = `${window.location.origin}/shop/${shop.slug}`;
        navigator.clipboard.writeText(url);
        // Could add toast here instead of alert
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

    // Navigation tabs (filter products)
    const navTabs = [
        {
            id: "bestsellers",
            label: "Best Sellers",
            filter: (p: any) => p.reviewCount >= 50,
        },
        { id: "featured", label: "Featured", filter: (p: any) => p.featured },
        { id: "new", label: "New Arrivals", filter: (p: any) => p.new },
    ];

    // Filter products by active tab
    $: displayProducts = products.filter((p: any) => {
        const tab = navTabs.find((t) => t.id === activeTab);
        return tab ? tab.filter(p) : true;
    });

    // Social icons mapping
    const socialIcons: Record<string, string> = {
        instagram: "mdi:instagram",
        whatsapp: "simple-icons:whatsapp",
        twitter: "mdi:twitter",
        tiktok: "simple-icons:tiktok",
        facebook: "mdi:facebook",
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
                            class="hidden sm:block w-[100px] h-[100px] rounded-2xl object-cover border-4 border-surface shadow-card"
                        />
                        <div>
                            <div class="inline-flex gap-1 items-center">
                                <h1
                                    class="text-[32px] md:text-[40px] font-bold text-white mb-2"
                                >
                                    {shop.name}
                                </h1>
                                <button
                                    on:click={copyShopLink}
                                    class="p-2 text-white/50 hover:text-primary transition-colors"
                                    title="Copy shop link"
                                    aria-label="Copy shop link"
                                >
                                    <Icon
                                        icon="mdi:content-copy"
                                        class="w-5 h-5"
                                    />
                                </button>
                            </div>
                            <p class="text-lg text-white/90 mb-4">
                                {shop.tagline}
                            </p>

                            <div class="flex flex-wrap gap-2 mb-4">
                                <Badge variant="info">{shop.category}</Badge>
                                {#if shop.vendorVerified}
                                    <Badge variant="success">Verified</Badge>
                                {/if}
                            </div>

                            <!-- Subtle Vendor Link -->
                            <p class="text-xs text-white/60 mb-4">
                                by <span
                                    class="text-white/80 hover:text-white underline decoration-white/30 hover:decoration-white transition-all"
                                    >{shop.vendorName}</span
                                >
                            </p>

                            <!-- Primary Actions -->
                            <div class="flex gap-3">
                                <Button
                                    href="/shop/{shop.slug}/product"
                                    variant="primary"
                                    size="md">Shop Now</Button
                                >
                                <button
                                    on:click={toggleFollow}
                                    class="px-6 py-3 rounded-btn hidden md:flex border-2 border-white text-white font-medium hover:bg-white hover:text-dark transition-colors"
                                >
                                    {isFollowing ? "Following" : "Follow Shop"}
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
                                        <Icon
                                            icon="mdi:star"
                                            class="inline-block mr-1 text-yellow-400"
                                        />
                                        {shop.rating}
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
                                        Orders
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

    <!-- 🔷 SECTION 3: PRODUCT TABS + VIEW ALL CTA -->
    <section class="sticky top-[70px] z-40 bg-surface border-b border-gray-200">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between">
                <!-- Filter Tabs -->
                <div class="flex items-center gap-6 overflow-x-auto py-4">
                    {#each navTabs as tab}
                        <button
                            on:click={() => (activeTab = tab.id)}
                            class="text-body font-medium whitespace-nowrap pb-1 border-b-2 transition-colors
                     {activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-text-muted hover:text-primary'}"
                        >
                            {tab.label}
                            {#if tab.id !== "all"}
                                <span class="ml-1 text-xs text-text-muted"
                                    >({products.filter(tab.filter)
                                        .length})</span
                                >
                            {/if}
                        </button>
                    {/each}
                </div>

                <!-- View All Products CTA -->
                <a
                    href="/shop/{shop.slug}/product"
                    class="hidden md:flex items-center gap-2 text-primary font-medium hover:underline whitespace-nowrap"
                >
                    View All Products
                    <Icon icon="mdi:arrow-right" class="w-4 h-4" />
                </a>
            </div>
        </div>
    </section>

    <!-- Mobile: View All CTA -->
    <div class="md:hidden my-2 text-right px-4">
        <a
            href="/shop/{shop.slug}/product"
            class="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
            View All {products.length} Products →
        </a>
    </div>

    <!-- 🔷 SECTION 4: PRODUCT GRID (Filtered by Tab) -->
    <section id="products" class="py-16 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            {#if displayProducts.length > 0}
                <div class="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x">
                    {#each displayProducts as product, i}
                        <div
                            class="flex-shrink-0 w-70 h-full animate-fade-in snap-start"
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
                    <div class="text-6xl mb-4">
                        <Icon icon="mdi:magnify" class="mx-auto" />
                    </div>
                    <h3 class="text-h3 text-text-main mb-2">
                        No Products in This Category
                    </h3>
                    <p class="text-body text-text-muted mb-6">
                        Try selecting a different tab or view all products.
                    </p>
                    <Button variant="outline" href="/shop/{shop.slug}/product"
                        >View All Products</Button
                    >
                </Card>
            {/if}
        </div>
    </section>

    <!-- 🔷 SECTION 5: ABOUT + POLICIES (Consolidated) -->
    <section id="about" class="py-20 bg-surface">
        <div
            class="container max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12"
        >
            <!-- Left: Shop Story + Socials -->
            <div class="animate-fade-in">
                <h2 class="text-h3 md:text-h2 text-text-main mb-6">
                    About {shop.name}
                </h2>
                <p class="text-body text-text-muted leading-relaxed mb-6">
                    {shop.description}
                </p>

                <!-- Social Links -->
                {#if shop.socials?.length}
                    <div class="flex items-center gap-3 mb-6">
                        {#each shop.socials as social}
                            <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl hover:bg-primary hover:text-white transition-colors"
                                aria-label="Visit {shop.name} on {social.platform}"
                            >
                                <Icon icon={socialIcons[social.platform]} />
                            </a>
                        {/each}
                    </div>
                {/if}

                <!-- Location & Member Since -->
                <div
                    class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-body text-text-muted"
                >
                    <span class="flex items-center gap-2"
                        ><Icon icon="mdi:map-marker" class="w-4 h-4" />
                        {shop.location}</span
                    >
                    <!-- <span class="flex items-center gap-2"
                        ><Icon icon="mdi:calendar" class="w-4 h-4" /> Member since
                        {formatDate(shop.joinedAt)}</span
                    > -->
                </div>

                <div class="flex gap-3 mt-4">
                    <Button
                        href="/messages?shop={shop.slug}"
                        variant="primary"
                        size="lg"
                        className="flex items-center gap-2"
                    >
                        <Icon icon="simple-icons:whatsapp" class="w-6 h-6" /> Message
                    </Button>
                    <Button
                        href="/report?shop={shop.slug}"
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-2 text-error hover:bg-error/5"
                    >
                        <Icon icon="mdi:flag" class="w-6 h-6" /> Report
                    </Button>
                </div>
            </div>

            <!-- Right: Shop Info + Policies -->
            <div class="animate-fade-in" style="transition-delay: 100ms">
                <Card className="p-6 border border-gray-200 h-full">
                    <h3 class="text-h3 text-text-main mb-6">
                        Shop Information
                    </h3>
                    <div class="space-y-4">
                        {#each [{ label: "Response Time", value: shop.stats.responseTime }, { label: "Processing Time", value: shop.stats.processingTime }, { label: "Shipping", value: shop.stats.shippingTime }, { label: "Returns", value: shop.stats.returnPolicy }, { label: "Trust Score", value: `${shop.trustScore}%`, class: getTrustScoreColor(shop.trustScore) }] as item}
                            <div
                                class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                            >
                                <span class="text-body text-text-muted"
                                    >{item.label}</span
                                >
                                <span
                                    class="text-body font-semibold {item.class ||
                                        'text-text-main'}">{item.value}</span
                                >
                            </div>
                        {/each}
                    </div>
                </Card>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 6: REVIEWS -->
    <section id="reviews" class="py-20 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-h3 md:text-h2 text-text-main mb-4">
                    Customer Reviews
                </h2>
                <div class="flex items-center justify-center gap-4 mb-4">
                    <span
                        class="flex items-center gap-2 text-[48px] font-bold text-text-main"
                        ><Icon icon="mdi:star" class="text-yellow-400" />
                        {shop.rating}</span
                    >
                    <div class="text-left">
                        <div class="text-body text-text-muted">
                            Based on {shop.reviewCount} reviews
                        </div>
                        <div class="flex items-center gap-1">
                            {#each Array(5) as _, i}
                                <Icon
                                    icon="mdi:star"
                                    class={i < Math.floor(shop.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"}
                                />
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x max-w-6xl mx-auto"
            >
                {#each reviews as review, i}
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
