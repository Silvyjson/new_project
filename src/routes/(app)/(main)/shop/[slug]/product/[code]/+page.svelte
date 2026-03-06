<!-- src/routes/shop/[shopSlug]/product/[productCode]/+page.svelte -->
<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
    import ProductCard from "$lib/components/card/ProductCard.svelte";
    import ReviewCard from "$lib/components/card/ReviewCard.svelte";

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

    // Wishlist state
    let isWishlisted = false;

    const toggleWishlist = () => {
        isWishlisted = !isWishlisted;
    };

    // Go back
    const goBack = () => {
        if (history.length > 1) {
            history.back();
        } else {
            window.location.href = `/shop/${product.shop.slug}/product`;
        }
    };
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
    <!-- 🔷 SECTION 2: PRODUCT MAIN SECTION -->
    <section class="py-8">
        <div class="container max-w-7xl mx-auto px-4">
            <!-- Top Action Row -->
            <div class="flex items-center justify-between mb-4">
                <!-- Back Arrow -->
                <button
                    on:click={goBack}
                    class="flex items-center gap-2 text-text-muted hover:text-primary transition-colors"
                    aria-label="Go back"
                >
                    <Icon icon="mdi:arrow-left" class="w-5 h-5" />
                    <span class="text-sm font-medium">Back</span>
                </button>

                <!-- Wishlist Heart -->
                <button
                    on:click={toggleWishlist}
                    class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all
        {isWishlisted
                        ? 'bg-red-50 border-red-500 text-red-500'
                        : 'text-text-muted hover:text-red-500 hover:border-red-300'}"
                    aria-label="Add to wishlist"
                >
                    <Icon
                        icon={isWishlisted ? "mdi:heart" : "mdi:heart-outline"}
                        class="w-5 h-5"
                    />
                </button>
            </div>

            <div class="grid md:grid-cols-2 gap-8 lg:gap-12 pt-3">
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
                            href="/shop/{product.shop.slug}"
                            class="hover:text-primary">Shop</a
                        >
                        <span> / </span>
                        <a
                            href="/shop/{product.shop
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
                                <Icon
                                    icon="mdi:star"
                                    class={i < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"}
                                />
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
                            <Icon
                                icon="mdi:check-circle"
                                class="inline-block mr-1"
                            />
                            {getStockStatusText(
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
                                <span
                                    class="block text-body font-medium text-text-main mb-2"
                                    >Color: <span
                                        class="font-normal text-text-muted"
                                        >{selectedColor}</span
                                    ></span
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
                                <span
                                    class="block text-body font-medium text-text-main mb-2"
                                    >Size: <span
                                        class="font-normal text-text-muted"
                                        >{selectedSize || "Select"}</span
                                    ></span
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
                            <span
                                class="block text-body font-medium text-text-main mb-2"
                                >Quantity</span
                            >
                            <div class="flex items-center gap-3">
                                <button
                                    on:click={() =>
                                        (quantity = Math.max(1, quantity - 1))}
                                    class="w-10 h-10 rounded-btn border border-gray-300 flex items-center justify-center text-xl hover:border-primary transition-colors"
                                >
                                    <Icon icon="mdi:minus" />
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
                                    <Icon icon="mdi:plus" />
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
                            Add to Cart - {formatNaira(
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
                            <div class="text-success text-xl mb-1">
                                <Icon icon="mdi:shield-check" class="mx-auto" />
                            </div>
                            <div class="text-xs text-text-muted">
                                Secure Payment
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-success text-xl mb-1">
                                <Icon
                                    icon="mdi:check-decagram"
                                    class="mx-auto"
                                />
                            </div>
                            <div class="text-xs text-text-muted">
                                Verified Shop
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-success text-xl mb-1">
                                <Icon
                                    icon="mdi:scale-balance"
                                    class="mx-auto"
                                />
                            </div>
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
                <!-- Responsive Tabs -->
                <div class="border-b border-gray-200 mb-6">
                    <div class="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {#each ["description", "shipping", "returns", "trust"] as tab}
                            <button
                                on:click={() => (activeTab = tab)}
                                class="flex-shrink-0 whitespace-nowrap px-4 md:px-6 py-3
                                   text-sm md:text-body font-medium border-b-2
                                   transition-colors capitalize
                                   {activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-muted hover:text-primary'}"
                            >
                                {tab === "trust" ? "Trust & Safety" : tab}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Tab Content -->
                <div class="max-w-none">
                    <!-- DESCRIPTION -->
                    {#if activeTab === "description"}
                        <div
                            class="prose prose-slate max-w-none text-sm md:text-body"
                        >
                            {@html product.longDescription}
                        </div>

                        <!-- SHIPPING -->
                    {:else if activeTab === "shipping"}
                        <div
                            class="grid sm:grid-cols-2 gap-4 text-sm md:text-body text-text-muted"
                        >
                            <div>
                                <strong>Free Shipping:</strong>
                                <div>Available on this item</div>
                            </div>

                            <div>
                                <strong>Standard Delivery:</strong>
                                <div>{product.shipping?.estimatedDays}</div>
                            </div>

                            <div>
                                <strong>Express Delivery:</strong>
                                <div>
                                    {product.shipping?.expressDays}
                                    ({formatNaira(
                                        product.shipping?.expressPrice ?? 0,
                                    )})
                                </div>
                            </div>

                            <div>
                                <strong>Tracking:</strong>
                                <div>All orders include tracking number</div>
                            </div>
                        </div>

                        <!-- RETURNS -->
                    {:else if activeTab === "returns"}
                        <div
                            class="grid sm:grid-cols-2 gap-4 text-sm md:text-body text-text-muted"
                        >
                            <div>
                                <strong>Return Window:</strong>
                                <div>{product.returns?.days} days</div>
                            </div>

                            <div>
                                <strong>Conditions:</strong>
                                <div>{product.returns?.conditions}</div>
                            </div>

                            <div class="sm:col-span-2">
                                <strong>Process:</strong>
                                <div>
                                    Contact shop to initiate return. Buyer pays
                                    return shipping unless item is defective.
                                </div>
                            </div>
                        </div>

                        <!-- TRUST -->
                    {:else if activeTab === "trust"}
                        <div class="space-y-6">
                            <!-- Protection -->
                            <div
                                class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            >
                                <div
                                    class="w-10 h-10 md:w-12 md:h-12 rounded-full
                                        bg-success/20 text-success
                                        flex items-center justify-center flex-shrink-0"
                                >
                                    <Icon
                                        icon="mdi:shield-check"
                                        class="w-5 h-5 md:w-6 md:h-6"
                                    />
                                </div>

                                <div>
                                    <h4
                                        class="text-base md:text-h4 font-semibold text-text-main"
                                    >
                                        VendorHub Protection
                                    </h4>
                                    <p
                                        class="text-sm md:text-body text-text-muted"
                                    >
                                        Your payment is held securely until you
                                        confirm delivery.
                                    </p>
                                </div>
                            </div>

                            <!-- Trust Score -->
                            <div
                                class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            >
                                <div
                                    class="w-10 h-10 md:w-12 md:h-12 rounded-full
                                        bg-primary/20 text-primary
                                        flex items-center justify-center flex-shrink-0"
                                >
                                    <Icon
                                        icon="mdi:star"
                                        class="w-5 h-5 md:w-6 md:h-6"
                                    />
                                </div>

                                <div>
                                    <h4
                                        class="text-base md:text-h4 font-semibold text-text-main"
                                    >
                                        Shop Trust Score: {product.shop
                                            .trustScore}%
                                    </h4>
                                    <p
                                        class="text-sm md:text-body text-text-muted"
                                    >
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
                <h2 class="md:text-h2 text-h3 text-text-main mb-6">
                    Customer Reviews
                </h2>

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
                                <Icon
                                    icon="mdi:star"
                                    class={i < Math.floor(product.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"}
                                />
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
                                    >{stars}<Icon
                                        icon="mdi:star"
                                        class="inline"
                                    /></span
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

                <!-- Review Cards -->
                <div class="flex gap-4 overflow-x-auto pb-4 snap-x">
                    {#if product.reviews && product.reviews.length > 0}
                        {#each product.reviews as review}
                            <div class="flex-shrink-0 w-80 h-full snap-start">
                                <ReviewCard {review} />
                            </div>
                        {/each}
                    {:else}
                        <p class="text-body text-text-muted text-center py-8">
                            No reviews yet for this product.
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 5: RELATED PRODUCTS -->
    <section class="py-12 bg-background-light">
        <div class="container max-w-7xl mx-auto px-4">
            <h2 class="md:text-h2 text-h3 text-text-main mb-6">
                Related Products
            </h2>
            <div class="flex gap-4 overflow-x-auto pb-4 snap-x">
                {#each product.relatedProducts as relatedProduct, i}
                    <div
                        in:fly={{
                            y: 20,
                            duration: 400,
                            delay: i * 50,
                            easing: cubicOut,
                        }}
                        class="flex-shrink-0 w-70 h-full snap-start"
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
