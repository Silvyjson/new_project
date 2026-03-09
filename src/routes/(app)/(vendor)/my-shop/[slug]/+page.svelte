<!-- src/routes/(vendor)/my-shop/[slug]/+page.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";
    import OrderCard from "$lib/components/app/card/OrderCard.svelte";
    import ReviewCard from "$lib/components/app/card/ReviewCard.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import TrustBadge from "$lib/components/common/TrustBadge.svelte";
    import { formatNumber } from "$lib/utils/format";

    let shopId = "3";
    let shopSlug = "3";
    $: if ($page.params.slug) {
        shopSlug = $page.params.slug;
        shopId = shopSlug; // In real app: fetch shop ID from slug
    }

    // Mock shop data
    let shop = {
        id: shopId,
        slug: shopSlug,
        name: "Urban Kicks Store",
        description:
            "Urban Kicks Store is your destination for authentic, high-quality sneakers and footwear. We source directly from verified manufacturers and offer warranty on all products. Based in Lagos, we ship nationwide with secure payment protection through VendorHub.",
        logo: "👟",
        banner: "bg-gradient-to-r from-blue-400 to-blue-600",
        category: "Fashion • Sneakers",
        trustScore: 92,
        followers: 1240,
        products: 32,
        active: true,
        verified: true,
        location: "Lagos, Nigeria",
        rating: 4.8,
        reviewCount: 124,
        socials: {
            instagram: "@urbankicks_store",
            whatsapp: "+2348012345678",
            twitter: "@urbankicks",
            website: "https://urbankicks.shop",
        },
    };

    // KPI Data
    const kpis = [
        {
            icon: "mdi:shopping-outline",
            label: "Total Orders",
            value: "485",
            change: "+12%",
            trend: "up",
            color: "green",
        },
        {
            icon: "mdi:cash-multiple",
            label: "Revenue",
            value: "₦2.4M",
            change: "+8%",
            trend: "up",
            color: "blue",
        },
        {
            icon: "mdi:account-multiple-outline",
            label: "Followers",
            value: "1,240",
            change: "+15%",
            trend: "up",
            color: "purple",
        },
        {
            icon: "mdi:cube-outline",
            label: "Products",
            value: "32",
            change: "+4",
            trend: "up",
            color: "orange",
        },
    ];

    // Shop Info
    const shopInfo = {
        responseTime: "< 2 hours",
        processingTime: "1-2 days",
        shipping: "2-5 business days",
        returns: "7-day return policy",
        trustScore: 92,
    };

    let score: number = shop.trustScore;

    const breakdown = [
        { label: "Business Verified", points: 20, earned: true },
        { label: "Customer Reviews", points: 30, earned: true },
        { label: "Order Completion", points: 25, earned: true },
        { label: "Account Age", points: 7, earned: true },
        { label: "Response Time", points: 10, earned: false },
    ];

    const total = breakdown.reduce(
        (sum, item) => (item.earned ? sum + item.points : sum),
        0,
    );

    const getScoreColor = (s: number) => {
        if (s >= 80) return "text-success";
        if (s >= 60) return "text-primary";
        if (s >= 40) return "text-warning";
        return "text-error";
    };

    // Recent Orders
    const recentOrders = [
        {
            id: "ORD-2026-001",
            productId: "p_001",
            productName: "Air Jordan Retro High",
            productImage:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            shopName: shop.name,
            shopSlug: shop.slug,
            price: 120000,
            status: "shipped",
            date: "2026-01-25",
            customerName: "John D.",
        },
        {
            id: "ORD-2026-002",
            productId: "p_002",
            productName: "Nike Air Force 1",
            productImage:
                "https://images.unsplash.com/photo-1549298916-b41d501d3772",
            shopName: shop.name,
            shopSlug: shop.slug,
            price: 85000,
            status: "pending",
            date: "2026-01-24",
            customerName: "Ada O.",
        },
        {
            id: "ORD-2026-003",
            productId: "p_003",
            productName: "Adidas Yeezy Boost",
            productImage:
                "https://images.unsplash.com/photo-1584735175315-9d5df23860e6",
            shopName: shop.name,
            shopSlug: shop.slug,
            price: 150000,
            status: "delivered",
            date: "2026-01-23",
            customerName: "Tunde M.",
        },
    ] as const;

    // Customer Reviews
    const reviews = [
        {
            id: 1,
            userName: "Chioma O.",
            rating: 5,
            content:
                "Amazing quality! Delivery was fast and the sneakers are authentic.",
            date: "2026-01-20",
            verifiedMatch: true,
        },
        {
            id: 2,
            userName: "Ahmed K.",
            rating: 5,
            content: "Best sneaker shop on VendorHub! Highly recommend.",
            date: "2026-01-18",
            verifiedMatch: true,
        },
        {
            id: 3,
            userName: "Blessing M.",
            rating: 4,
            content:
                "Good quality but delivery took a bit longer than expected.",
            date: "2026-01-15",
            verifiedMatch: false,
        },
    ];
</script>

<svelte:head>
    <title>{shop.name} | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-10">
    <!-- Back Link -->
    <div in:fade={{ duration: 400 }}>
        <a
            href="/my-shop"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Back to My Shops
        </a>
    </div>

  <!-- Section 1: Shop Hero -->
  <section in:fade={{ duration: 400, delay: 100 }}>
    <Card className="border border-gray-200 overflow-hidden">
      <!-- Cover Image -->
      <div class="h-48 md:h-64 {shop.banner} relative">

        <!-- Shop Status -->
        <div class="absolute top-4 left-4">
          <Badge variant={shop.active ? "success" : "warning"} size="md">
            <Icon
              icon={shop.active ? "mdi:check-circle" : "mdi:pause-circle"}
              class="w-4 h-4 inline mr-1"
            />
            {shop.active ? "Active" : "Paused"}
          </Badge>
        </div>

        <!-- Pause / Resume Button -->
        <div class="absolute top-4 right-4">
          <Button
            variant={shop.active ? "ghost" : "primary"}
            size="sm"
            class={shop.active ? "bg-white/90 text-warning hover:bg-white" : ""}
          >
            <Icon
              icon={shop.active
                ? "mdi:pause-circle-outline"
                : "mdi:play-circle-outline"}
              class="w-4 h-4 mr-1"
            />
            {shop.active ? "Pause Shop" : "Resume Shop"}
          </Button>
        </div>

        <!-- Logo -->
        <div class="absolute -bottom-12 left-6 md:left-8">
          <div
            class="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-surface border-4 border-surface flex items-center justify-center text-5xl md:text-6xl shadow-card"
          >
            {shop.logo}
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="pt-14 pb-6 px-6 md:px-8">

        <!-- Shop Name + Primary Actions -->
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">

          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2 flex-wrap">
              <h1 class="text-2xl md:text-3xl font-bold text-text-main">
                {shop.name}
              </h1>

              {#if shop.verified}
                <TrustBadge size="md" />
              {/if}
            </div>

            <div class="flex items-center gap-2 mb-3 flex-wrap">
              <span class="text-body text-text-muted">{shop.category}</span>
              <span class="text-text-muted">•</span>
              <span class="flex items-center gap-1 text-body text-text-muted">
                <Icon icon="mdi:map-marker-outline" class="w-4 h-4" />
                {shop.location}
              </span>
            </div>

            <p class="text-body text-text-muted max-w-3xl leading-relaxed mb-4">
              {shop.description}
            </p>

            <!-- Social -->
            <div class="flex items-center gap-4">
              {#if shop.socials.instagram}
                <a
                  href="https://instagram.com/{shop.socials.instagram.replace('@','')}"
                  target="_blank"
                  class="text-text-muted hover:text-primary transition-colors"
                >
                  <Icon icon="mdi:instagram" class="w-5 h-5" />
                </a>
              {/if}

              {#if shop.socials.whatsapp}
                <a
                  href="https://wa.me/{shop.socials.whatsapp.replace('+','')}"
                  target="_blank"
                  class="text-text-muted hover:text-primary transition-colors"
                >
                  <Icon icon="mdi:whatsapp" class="w-5 h-5" />
                </a>
              {/if}

              {#if shop.socials.twitter}
                <a
                  href="https://twitter.com/{shop.socials.twitter.replace('@','')}"
                  target="_blank"
                  class="text-text-muted hover:text-primary transition-colors"
                >
                  <Icon icon="mdi:twitter" class="w-5 h-5" />
                </a>
              {/if}

              {#if shop.socials.website}
                <a
                  href={shop.socials.website}
                  target="_blank"
                  class="text-text-muted hover:text-primary transition-colors"
                >
                  <Icon icon="mdi:web" class="w-5 h-5" />
                </a>
              {/if}
            </div>
          </div>

          <!-- Primary Actions -->
          <div class="flex gap-2">
            <Button
              href="/my-shop/{shop.id}/edit"
              variant="outline"
              size="sm"
            >
              <Icon icon="mdi:pencil-outline" class="w-4 h-4 mr-1" />
              Edit Shop
            </Button>

            <Button
              href="/shop/{shop.slug}"
              variant="primary"
              size="sm"
              target="_blank"
            >
              <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-1" />
              View Shop
            </Button>
          </div>

        </div>

        <!-- Management Tools -->
        <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-200">

          <Button
            href={`/my-shop/${shop.slug}/product`}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:cube-outline" class="w-4 h-4 mr-1" />
            Products
          </Button>

          <Button
            href={`/my-shop/${shop.slug}/promotion`}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:sale-outline" class="w-4 h-4 mr-1" />
            Promotions
          </Button>

          <Button
            href={`/wallet?shop=${shop.slug}`}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:wallet-outline" class="w-4 h-4 mr-1" />
            Wallet
          </Button>

          <Button
            href={`/orders?shop=${shop.slug}`}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:shopping-outline" class="w-4 h-4 mr-1" />
            Orders
          </Button>

          <Button
            href={`/analytics?shop=${shop.slug}`}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:chart-line" class="w-4 h-4 mr-1" />
            Analytics
          </Button>

          <Button
            href={`/followers?shop=${shop.slug}`}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:crown-outline" class="w-4 h-4 mr-1" />
            Followers
          </Button>

        </div>

        <!-- Quick Stats -->
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-4 mt-6 border-t border-gray-200"
        >

          <div class="text-center">
            <div class="flex items-center justify-center gap-2 mb-1">
              <Icon icon="mdi:star" class="w-5 h-5 text-yellow-400" />
              <div class="text-2xl font-bold text-text-main">
                {shop.rating}
              </div>
            </div>
            <div class="text-sm text-text-muted">
              {shop.reviewCount} Reviews
            </div>
          </div>

          <div class="text-center">
            <div class="flex items-center justify-center gap-2 mb-1">
              <Icon icon="mdi:cube-outline" class="w-5 h-5 text-primary" />
              <div class="text-2xl font-bold text-text-main">
                {shop.products}
              </div>
            </div>
            <div class="text-sm text-text-muted">Products</div>
          </div>

          <div class="text-center">
            <div class="flex items-center justify-center gap-2 mb-1">
              <Icon icon="mdi:account-group-outline" class="w-5 h-5 text-primary" />
              <div class="text-2xl font-bold text-text-main">
                {formatNumber(shop.followers)}
              </div>
            </div>
            <div class="text-sm text-text-muted">Followers</div>
          </div>

          <div class="text-center">
            <div class="flex items-center justify-center gap-2 mb-1">
              <Icon
                icon="mdi:shield-check-outline"
                class="w-5 h-5 {shop.trustScore >= 80
                  ? 'text-success'
                  : shop.trustScore >= 60
                  ? 'text-primary'
                  : 'text-warning'}"
              />
              <div
                class="text-2xl font-bold {shop.trustScore >= 80
                  ? 'text-success'
                  : shop.trustScore >= 60
                  ? 'text-primary'
                  : 'text-warning'}"
              >
                {shop.trustScore}%
              </div>
            </div>
            <div class="text-sm text-text-muted">Trust Score</div>
          </div>

        </div>

      </div>
    </Card>
  </section>

    <!-- Section 2: Performance Metrics -->
    <section in:fade={{ duration: 400, delay: 200 }}>
        <h2 class="text-xl font-bold text-text-main mb-6">
            Performance Overview
        </h2>
        <div
            class="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 no-scrollbar"
        >
            {#each kpis as kpi, i}
                <div
                    class="flex-shrink-0 w-[240px] md:w-auto"
                    in:fly={{
                        y: 20,
                        duration: 400,
                        delay: i * 50,
                        easing: cubicOut,
                    }}
                >
                    <Card className="border border-gray-200 p-6">
                        <div class="flex items-start justify-between">
                            <div>
                                <p class="text-sm text-text-muted mb-1">
                                    {kpi.label}
                                </p>
                                <p class="text-2xl font-bold text-text-main">
                                    {kpi.value}
                                </p>
                                {#if kpi.change}
                                    <p
                                        class="text-xs font-medium mt-1 {kpi.trend ===
                                        'up'
                                            ? 'text-success'
                                            : kpi.trend === 'down'
                                              ? 'text-error'
                                              : 'text-text-muted'}"
                                    >
                                        {kpi.trend === "up"
                                            ? "↑"
                                            : kpi.trend === "down"
                                              ? "↓"
                                              : "→"}
                                        {kpi.change}
                                    </p>
                                {/if}
                            </div>
                            <div
                                class="w-12 h-12 rounded-xl bg-{kpi.color}/10 flex items-center justify-center flex-shrink-0"
                            >
                                <Icon
                                    icon={kpi.icon}
                                    class="w-6 h-6 text-{kpi.color}"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            {/each}
        </div>
    </section>

    <!-- Section 3: Recent Orders -->
    <section in:fade={{ duration: 400, delay: 600 }}>
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-text-main">Recent Orders</h2>
            <Button variant="outline" size="sm" href="/orders?shop={shop.slug}">
                View All Orders
                <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
            </Button>
        </div>

        {#if recentOrders.length > 0}
            <div class="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto pb-2">
                {#each recentOrders as order, i}
                    <div
                        class="w-100"
                        in:fly={{
                            y: 20,
                            duration: 400,
                            delay: i * 50,
                            easing: cubicOut,
                        }}
                    >
                        <OrderCard {order} view="vendor" />
                    </div>
                {/each}
            </div>
        {:else}
            <Card className="py-10 text-center border border-gray-200">
                <Icon
                    icon="mdi:package-variant-closed"
                    class="w-10 h-10 mx-auto mb-3 text-gray-400"
                />
                <p class="text-sm text-text-muted">No orders yet</p>
            </Card>
        {/if}
    </section>

    <!-- Section 4: Shop Info + Trust Score -->
    <section in:fade={{ duration: 400, delay: 400 }}>
        <div class="grid lg:grid-cols-2 gap-6">
            <Card className="border border-gray-200 p-6">
                <h3 class="text-lg font-bold text-text-main mb-6">
                    Shop Information
                </h3>

                <div class="space-y-4">
                    <div
                        class="flex items-center justify-between py-3 border-b border-gray-100"
                    >
                        <div class="flex items-center gap-3">
                            <Icon
                                icon="mdi:clock-outline"
                                class="w-5 h-5 text-text-muted"
                            />
                            <span class="text-body text-text-muted"
                                >Response Time</span
                            >
                        </div>
                        <span class="text-body font-semibold text-text-main"
                            >{shopInfo.responseTime}</span
                        >
                    </div>

                    <div
                        class="flex items-center justify-between py-3 border-b border-gray-100"
                    >
                        <div class="flex items-center gap-3">
                            <Icon
                                icon="mdi:package-variant-closed"
                                class="w-5 h-5 text-text-muted"
                            />
                            <span class="text-body text-text-muted"
                                >Processing Time</span
                            >
                        </div>
                        <span class="text-body font-semibold text-text-main"
                            >{shopInfo.processingTime}</span
                        >
                    </div>

                    <div
                        class="flex items-center justify-between py-3 border-b border-gray-100"
                    >
                        <div class="flex items-center gap-3">
                            <Icon
                                icon="mdi:truck-delivery-outline"
                                class="w-5 h-5 text-text-muted"
                            />
                            <span class="text-body text-text-muted"
                                >Shipping</span
                            >
                        </div>
                        <span class="text-body font-semibold text-text-main"
                            >{shopInfo.shipping}</span
                        >
                    </div>

                    <div
                        class="flex items-center justify-between py-3 border-b border-gray-100"
                    >
                        <div class="flex items-center gap-3">
                            <Icon
                                icon="mdi:return"
                                class="w-5 h-5 text-text-muted"
                            />
                            <span class="text-body text-text-muted"
                                >Returns</span
                            >
                        </div>
                        <span class="text-body font-semibold text-text-main"
                            >{shopInfo.returns}</span
                        >
                    </div>

                    <div class="flex items-center justify-between py-3">
                        <div class="flex items-center gap-3">
                            <Icon
                                icon="mdi:shield-check-outline"
                                class="w-5 h-5 {shopInfo.trustScore >= 80
                                    ? 'text-success'
                                    : shopInfo.trustScore >= 60
                                      ? 'text-primary'
                                      : 'text-warning'}"
                            />
                            <span class="text-body text-text-muted"
                                >Trust Score</span
                            >
                        </div>
                        <span
                            class="text-body font-bold {shopInfo.trustScore >=
                            80
                                ? 'text-success'
                                : shopInfo.trustScore >= 60
                                  ? 'text-primary'
                                  : 'text-warning'}"
                        >
                            {shopInfo.trustScore}%
                        </span>
                    </div>
                </div>
            </Card>
            <Card className="border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold text-text-main">
                        Trust Score
                    </h3>
                    <a
                        href="/settings/verification"
                        class="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                    >
                        Improve
                        <Icon icon="mdi:arrow-right" class="w-4 h-4" />
                    </a>
                </div>

                <!-- Score Display -->
                <div class="flex items-center gap-6 mb-6">
                    <!-- Circular Progress -->
                    <div class="relative w-24 h-24 flex-shrink-0">
                        <svg class="w-24 h-24 transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#E5E7EB"
                                stroke-width="8"
                                fill="none"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                stroke-width="8"
                                fill="none"
                                class={getScoreColor(score)}
                                stroke-dasharray={2 * Math.PI * 40}
                                stroke-dashoffset={2 *
                                    Math.PI *
                                    40 *
                                    (1 - score / 100)}
                                stroke-linecap="round"
                            />
                        </svg>
                        <div
                            class="absolute inset-0 flex items-center justify-center"
                        >
                            <span
                                class="text-2xl font-bold {getScoreColor(
                                    score,
                                )}">{score}</span
                            >
                        </div>
                    </div>

                    <!-- Breakdown -->
                    <div class="flex-1 space-y-2">
                        {#each breakdown as item}
                            <div class="flex items-center gap-2">
                                <span
                                    class="w-5 h-5 rounded-full {item.earned
                                        ? 'bg-success/20 text-success'
                                        : 'bg-gray-200 text-gray-400'} flex items-center justify-center flex-shrink-0"
                                >
                                    {#if item.earned}
                                        <Icon
                                            icon="mdi:check"
                                            class="w-3 h-3"
                                        />
                                    {/if}
                                </span>
                                <span class="text-sm text-text-muted flex-1"
                                    >{item.label}</span
                                >
                                <span class="text-sm font-medium text-text-main"
                                    >+{item.points}</span
                                >
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Tips -->
                <div
                    class="p-4 bg-primary/5 rounded-xl border border-primary/20"
                >
                    <div class="flex items-start gap-3">
                        <Icon
                            icon="mdi:lightbulb-outline"
                            class="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                        />
                        <div>
                            <p class="text-sm font-medium text-text-main mb-1">
                                Improve Your Score
                            </p>
                            <p class="text-xs text-text-muted">
                                Respond to messages faster to earn +10 points
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </section>

    <!-- Section 5: Customer Reviews -->
    <section in:fade={{ duration: 400, delay: 700 }}>
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-text-main">Customer Reviews</h2>
            <span class="text-sm text-text-muted">
                ★ 4.8 Average ({reviews.length} reviews)
            </span>
        </div>

        <div class="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x">
            {#each reviews as review, i}
                <div
                    class="flex-shrink-0 w-80 h-full animate-fade-in snap-start"
                    in:fly={{
                        y: 20,
                        duration: 400,
                        delay: i * 50,
                        easing: cubicOut,
                    }}
                >
                    <ReviewCard {review} />
                </div>
            {/each}
        </div>
    </section>
</main>

<!-- <style>
    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in,
        [in:fly] {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style> -->

<style>
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
