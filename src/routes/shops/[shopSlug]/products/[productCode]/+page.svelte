<!-- src/routes/shops/[shopSlug]/products/[productCode]/+page.svelte -->
<script lang="ts">
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
    const { product, meta } = data;

    // Selected variants
    let selectedSize = "";
    let selectedColor = product.variants?.colors?.[0]?.name || "";
    let quantity = 1;

    // Cart state
    let cartItemCount = 0;
    let showCartDrawer = false;

    // Add to cart
    const addToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        cartItemCount += quantity;
        showCartDrawer = true;
    };

    // Buy now
    const buyNow = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        // Navigate to checkout
        window.location.href = "/checkout";
    };

    // Format currency
    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Get stock status color
    const getStockStatusColor = (status: string) => {
        if (status === "in-stock") return "text-success";
        if (status === "preorder") return "text-primary";
        return "text-error";
    };

    // Get stock status text
    const getStockStatusText = (status: string, count?: number) => {
        if (status === "in-stock") {
            if (count && count <= 5) return `Only ${count} left!`;
            return "In Stock";
        }
        if (status === "preorder") return "Pre-Order (14-21 days)";
        return "Sold Out";
    };

    // Active tab for details
    let activeTab = "description";

    // Image gallery
    let mainImage = product.images[0];
    let selectedImageIndex = 0;
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content={meta.ogImage} />
    <meta property="og:type" content="product" />
</svelte:head>

<main class="min-h-screen bg-surface">
    <!-- 🔷 SECTION 1: MINIMAL SHOP HEADER -->
    <nav class="sticky top-0 z-50 bg-surface border-b border-gray-200 h-[70px]">
        <div
            class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between"
        >
            <a
                href="/shops/{product.shop.slug}"
                class="flex items-center gap-3"
            >
                <img
                    src={product.shop.logoUrl}
                    alt={product.shop.name}
                    class="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                    <div class="flex items-center gap-2">
                        <span class="text-lg font-bold text-text-main"
                            >{product.shop.name}</span
                        >
                        {#if product.shop.vendorVerified}
                            <TrustBadge size="sm" showText={false} />
                        {/if}
                    </div>
                    <p class="text-xs text-text-muted">
                        Verified Shop on VendorHub
                    </p>
                </div>
            </a>

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
                    on:click={() => (showCartDrawer = true)}
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
                    {#if cartItemCount > 0}
                        <span
                            class="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center"
                            >{cartItemCount}</span
                        >
                    {/if}
                </button>
            </div>
        </div>
    </nav>

    <!-- 🔷 SECTION 2: PRODUCT MAIN SECTION -->
    <section class="py-8 md:py-12">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                <!-- Left: Image Gallery -->
                <div class="animate-fade-in">
                    <!-- Main Image -->
                    <div
                        class="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4"
                    >
                        <img
                            src={mainImage}
                            alt={product.name}
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        {#if product.stockStatus === "preorder"}
                            <Badge
                                variant="info"
                                className="absolute top-4 left-4"
                                >Pre-Order</Badge
                            >
                        {/if}
                        {#if product.oldPrice}
                            <Badge
                                variant="danger"
                                className="absolute top-4 right-4">Sale</Badge
                            >
                        {/if}
                    </div>

                    <!-- Thumbnails -->
                    <div class="grid grid-cols-4 gap-3">
                        {#each product.images as image, i}
                            <button
                                on:click={() => {
                                    mainImage = image;
                                    selectedImageIndex = i;
                                }}
                                class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 {selectedImageIndex ===
                                i
                                    ? 'border-primary'
                                    : 'border-transparent'} hover:border-primary transition-colors"
                            >
                                <img
                                    src={image}
                                    alt=""
                                    class="w-full h-full object-cover"
                                />
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Right: Product Info -->
                <div class="animate-fade-in" style="transition-delay: 100ms">
                    <!-- Breadcrumb -->
                    <nav class="text-small text-text-muted mb-4">
                        <a
                            href="/shops/{product.shop.slug}"
                            class="hover:text-primary">Shop</a
                        >
                        <span> / </span>
                        <a
                            href="/shops/{product.shop
                                .slug}?category={product.category}"
                            class="hover:text-primary">{product.category}</a
                        >
                        <span> / </span>
                        <span class="text-text-main">{product.name}</span>
                    </nav>

                    <!-- Title & Rating -->
                    <h1
                        class="text-[28px] md:text-[32px] font-bold text-text-main mb-2"
                    >
                        {product.name}
                    </h1>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="flex items-center gap-1">
                            {#each Array(5) as _, i}
                                <span
                                    class={i < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"}>★</span
                                >
                            {/each}
                        </div>
                        <span class="text-body text-text-muted"
                            >{product.rating} ({product.reviewCount} reviews)</span
                        >
                    </div>

                    <!-- Price -->
                    <div class="mb-6">
                        <div class="flex items-center gap-3">
                            <span class="text-[32px] font-bold text-primary"
                                >{formatNaira(product.price)}</span
                            >
                            {#if product.oldPrice}
                                <span
                                    class="text-xl text-text-muted line-through"
                                    >{formatNaira(product.oldPrice)}</span
                                >
                                <Badge variant="danger"
                                    >Save {Math.round(
                                        (1 - product.price / product.oldPrice) *
                                            100,
                                    )}%</Badge
                                >
                            {/if}
                        </div>
                        <p
                            class="text-small {getStockStatusColor(
                                product.stockStatus,
                            )} mt-2 font-medium"
                        >
                            ✓ {getStockStatusText(
                                product.stockStatus,
                                product.stockCount,
                            )}
                        </p>
                    </div>

                    <!-- Variants -->
                    <div class="space-y-4 mb-6">
                        <!-- Color Selector -->
                        {#if product.variants?.colors?.length}
                            <div>
                                <label
                                    class="block text-body font-medium text-text-main mb-2"
                                    >Color: <span
                                        class="font-normal text-text-muted"
                                        >{selectedColor}</span
                                    ></label
                                >
                                <div class="flex gap-3">
                                    {#each product.variants.colors as color}
                                        <button
                                            on:click={() =>
                                                (selectedColor = color.name)}
                                            class="w-10 h-10 rounded-full border-2 {selectedColor ===
                                            color.name
                                                ? 'border-primary'
                                                : 'border-gray-300'} hover:border-primary transition-colors"
                                            style="background-color: {color.value}"
                                            aria-label={color.name}
                                        ></button>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <!-- Size Selector -->
                        {#if product.variants?.sizes?.length}
                            <div>
                                <label
                                    class="block text-body font-medium text-text-main mb-2"
                                    >Size: <span
                                        class="font-normal text-text-muted"
                                        >{selectedSize || "Select"}</span
                                    ></label
                                >
                                <div class="flex flex-wrap gap-2">
                                    {#each product.variants.sizes as size}
                                        <button
                                            on:click={() =>
                                                (selectedSize = size)}
                                            class="px-4 py-2 rounded-btn border-2 {selectedSize ===
                                            size
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-300 text-text-main'} hover:border-primary transition-colors text-body font-medium"
                                        >
                                            {size}
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <!-- Quantity -->
                        <div>
                            <label
                                class="block text-body font-medium text-text-main mb-2"
                                >Quantity</label
                            >
                            <div class="flex items-center gap-3">
                                <button
                                    on:click={() =>
                                        (quantity = Math.max(1, quantity - 1))}
                                    class="w-10 h-10 rounded-btn border border-gray-300 flex items-center justify-center text-xl hover:border-primary transition-colors"
                                >
                                    −
                                </button>
                                <span
                                    class="w-12 text-center text-body font-medium"
                                    >{quantity}</span
                                >
                                <button
                                    on:click={() =>
                                        (quantity = Math.min(
                                            product.stockCount || 10,
                                            quantity + 1,
                                        ))}
                                    class="w-10 h-10 rounded-btn border border-gray-300 flex items-center justify-center text-xl hover:border-primary transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="space-y-3 mb-6">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full h-[48px] text-lg"
                            onclick={() => addToCart}
                        >
                            Add to Cart — {formatNaira(
                                product.price * quantity,
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full h-[48px] text-lg"
                            onclick={() => buyNow}
                        >
                            Buy Now
                        </Button>
                    </div>

                    <!-- Trust Info -->
                    <div
                        class="grid grid-cols-3 gap-4 p-4 bg-background-light rounded-xl mb-6"
                    >
                        <div class="text-center">
                            <div class="text-success text-xl mb-1">✓</div>
                            <div class="text-xs text-text-muted">
                                Secure Payment
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-success text-xl mb-1">✓</div>
                            <div class="text-xs text-text-muted">
                                Verified Shop
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-success text-xl mb-1">✓</div>
                            <div class="text-xs text-text-muted">
                                Dispute Protection
                            </div>
                        </div>
                    </div>

                    <!-- Shipping Info -->
                    <div class="p-4 border border-gray-200 rounded-xl">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-body text-text-muted"
                                >Shipping</span
                            >
                            {#if product.shipping?.freeShipping}
                                <span
                                    class="text-body font-semibold text-success"
                                    >Free</span
                                >
                            {:else}
                                <span
                                    class="text-body font-semibold text-text-main"
                                    >{formatNaira(
                                        product.shipping?.price ?? 0,
                                    )}</span
                                >
                            {/if}
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-body text-text-muted"
                                >Delivery</span
                            >
                            <span class="text-body text-text-main"
                                >{product.shipping?.estimatedDays}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 3: PRODUCT DETAILS TABS -->
    <section class="py-12 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <!-- Tabs -->
                <div class="flex border-b border-gray-200 mb-6">
                    {#each ["description", "shipping", "returns", "trust"] as tab}
                        <button
                            on:click={() => (activeTab = tab)}
                            class="px-6 py-3 text-body font-medium border-b-2 transition-colors capitalize
                     {activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-text-muted hover:text-primary'}"
                        >
                            {tab === "trust" ? "Trust & Safety" : tab}
                        </button>
                    {/each}
                </div>

                <!-- Tab Content -->
                <div class="prose prose-slate max-w-none">
                    {#if activeTab === "description"}
                        {@html product.longDescription}
                    {:else if activeTab === "shipping"}
                        <div class="space-y-4">
                            <p class="text-body text-text-muted">
                                <strong>Free Shipping:</strong> Available on this
                                item
                            </p>
                            <p class="text-body text-text-muted">
                                <strong>Standard Delivery:</strong>
                                {product.shipping?.estimatedDays}
                            </p>
                            <p class="text-body text-text-muted">
                                <strong>Express Delivery:</strong>
                                {product.shipping?.expressDays} ({formatNaira(
                                    product.shipping?.expressPrice ?? 0,
                                )})
                            </p>
                            <p class="text-body text-text-muted">
                                <strong>Tracking:</strong> All orders include tracking
                                number
                            </p>
                        </div>
                    {:else if activeTab === "returns"}
                        <div class="space-y-4">
                            <p class="text-body text-text-muted">
                                <strong>Return Window:</strong>
                                {product.returns?.days} days
                            </p>
                            <p class="text-body text-text-muted">
                                <strong>Conditions:</strong>
                                {product.returns?.conditions}
                            </p>
                            <p class="text-body text-text-muted">
                                <strong>Process:</strong> Contact shop to initiate
                                return. Buyer pays return shipping unless item is
                                defective.
                            </p>
                        </div>
                    {:else if activeTab === "trust"}
                        <div class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center text-xl"
                                >
                                    ✓
                                </div>
                                <div>
                                    <h4
                                        class="text-h4 font-semibold text-text-main"
                                    >
                                        VendorHub Protection
                                    </h4>
                                    <p class="text-body text-text-muted">
                                        Your payment is held securely until you
                                        confirm delivery.
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl"
                                >
                                    ★
                                </div>
                                <div>
                                    <h4
                                        class="text-h4 font-semibold text-text-main"
                                    >
                                        Shop Trust Score: {product.shop
                                            .trustScore}%
                                    </h4>
                                    <p class="text-body text-text-muted">
                                        Based on delivery rate, reviews, and
                                        order completion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 4: REVIEWS SECTION -->
    <section class="py-12 bg-surface">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-h2 text-text-main mb-6">Customer Reviews</h2>

                <!-- Review Summary -->
                <div
                    class="flex items-center gap-6 mb-8 p-6 bg-background-light rounded-xl"
                >
                    <div class="text-center">
                        <div class="text-[48px] font-bold text-text-main">
                            {product.rating}
                        </div>
                        <div
                            class="flex items-center gap-1 justify-center mb-1"
                        >
                            {#each Array(5) as _, i}
                                <span
                                    class={i < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"}>★</span
                                >
                            {/each}
                        </div>
                        <div class="text-small text-text-muted">
                            {product.reviewCount} reviews
                        </div>
                    </div>
                    <div class="flex-1 space-y-2">
                        {#each [5, 4, 3, 2, 1] as stars}
                            <div class="flex items-center gap-3">
                                <span class="text-small text-text-muted w-6"
                                    >{stars}★</span
                                >
                                <div
                                    class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="h-full bg-yellow-400"
                                        style="width: {stars === 5
                                            ? '80'
                                            : stars === 4
                                              ? '15'
                                              : '5'}%"
                                    ></div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Review Cards Placeholder -->
                <div class="space-y-4">
                    <p class="text-body text-text-muted text-center py-8">
                        Reviews loading...
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 5: RELATED PRODUCTS -->
    <section class="py-12 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            <h2 class="text-h2 text-text-main mb-6">Related Products</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each product.relatedProducts as relatedProduct, i}
                    <div
                        in:fly={{
                            y: 20,
                            duration: 400,
                            delay: i * 50,
                            easing: cubicOut,
                        }}
                    >
                        <ProductCard
                            product={relatedProduct}
                            shopSlug={product.shop.slug}
                        />
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 CART DRAWER (Slide from Right) -->
    {#if showCartDrawer}
        <div class="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
            <!-- Overlay -->
            <button
                class="absolute inset-0 bg-dark/50 w-full h-full border-none cursor-default"
                on:click={() => (showCartDrawer = false)}
                aria-label="Close cart"
                type="button"
            ></button>

            <!-- Drawer -->
            <div
                class="absolute right-0 top-0 h-full w-full max-w-[400px] bg-surface shadow-2xl animate-slide-in-right"
            >
                <div class="flex flex-col h-full">
                    <!-- Header -->
                    <div
                        class="flex items-center justify-between p-4 border-b border-gray-200"
                    >
                        <h3 class="text-h3 font-bold text-text-main">
                            Your Cart
                        </h3>
                        <button
                            on:click={() => (showCartDrawer = false)}
                            class="text-text-muted hover:text-text-main"
                        >
                            <svg
                                class="w-6 h-6"
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
                    </div>

                    <!-- Cart Items (Placeholder) -->
                    <div class="flex-1 overflow-y-auto p-4">
                        <div
                            class="flex items-center gap-4 p-4 bg-background-light rounded-xl"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                class="w-20 h-20 rounded-lg object-cover"
                            />
                            <div class="flex-1">
                                <h4
                                    class="font-semibold text-text-main text-sm"
                                >
                                    {product.name}
                                </h4>
                                <p class="text-small text-text-muted">
                                    Size: {selectedSize} | Qty: {quantity}
                                </p>
                                <p class="text-primary font-bold mt-1">
                                    {formatNaira(product.price * quantity)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="p-4 border-t border-gray-200">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-body text-text-muted"
                                >Subtotal</span
                            >
                            <span class="text-body font-bold text-text-main"
                                >{formatNaira(product.price * quantity)}</span
                            >
                        </div>
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full"
                            href="/checkout"
                        >
                            Proceed to Checkout
                        </Button>
                        <p class="text-xs text-text-muted text-center mt-3">
                            🔒 Secure checkout powered by VendorHub
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {/if}
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

    @keyframes slide-in-right {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
        opacity: 0;
    }

    .animate-slide-in-right {
        animation: slide-in-right 0.3s ease-out forwards;
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in,
        .animate-slide-in-right {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>
