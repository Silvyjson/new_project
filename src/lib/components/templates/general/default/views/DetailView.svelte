<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    import Button from "$lib/components/common/Button.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import TrustBadge from "$lib/components/common/TrustBadge.svelte";
    import ProductCard from "$lib/components/templates/general/default/components/ProductCard.svelte";
    import ReviewCard from "$lib/components/templates/general/default/components/ReviewCard.svelte";
    import { formatNaira } from "$lib/utils/format";

    export let data: any;
    $: product = data?.product;

    let selectedSize = "";
    let selectedColor = "";
    $: {
        if (product && product.variants?.colors?.[0]?.name) {
             selectedColor = product.variants.colors[0].name;
        }
    }
    let quantity = 1;

    let cartItemCount = 0;
    let showCartDrawer = false;

    const addToCart = () => {
        if (!selectedSize && product?.variants?.sizes?.length) {
            alert("Please select a size");
            return;
        }
        cartItemCount += quantity;
        showCartDrawer = true;
    };

    const buyNow = () => {
        if (!selectedSize && product?.variants?.sizes?.length) {
            alert("Please select a size");
            return;
        }
        window.location.href = "/checkout";
    };

    const getStockStatusColor = (status: string) => {
        if (status === "in-stock") return "text-success";
        if (status === "preorder") return "text-primary";
        return "text-error";
    };

    const getStockStatusText = (status: string, count?: number) => {
        if (status === "in-stock") {
            if (count && count <= 5) return `Only ${count} left!`;
            return "In Stock";
        }
        if (status === "preorder") return "Pre-Order (14-21 days)";
        return "Sold Out";
    };

    let activeTab = "description";
    let mainImage = "";
    $: {
        if (product && !mainImage) {
            mainImage = product.images?.[0] || "";
        }
    }
    let selectedImageIndex = 0;

    let isWishlisted = false;

    const toggleWishlist = () => {
        isWishlisted = !isWishlisted;
    };

    const goBack = () => {
        if (history.length > 1) {
            history.back();
        } else {
            window.location.href = `/shop/${product?.shop?.slug}/product`;
        }
    };
</script>

{#if product}
<main class="min-h-screen bg-surface">
    <!-- 🔷 SECTION 2: PRODUCT MAIN SECTION -->
    <section class="py-8">
        <div class="container max-w-7xl mx-auto px-4">
            <!-- Top Action Row -->
            <div class="flex items-center justify-between mb-4">
                <button
                    on:click={goBack}
                    class="flex items-center gap-2 text-text-muted hover:text-primary transition-colors"
                >
                    <Icon icon="mdi:arrow-left" class="w-5 h-5" />
                    <span class="text-sm font-medium">Back</span>
                </button>
                <button
                    on:click={toggleWishlist}
                    class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all {isWishlisted ? 'bg-red-50 border-red-500 text-red-500' : 'text-text-muted hover:text-red-500 hover:border-red-300'}"
                >
                    <Icon icon={isWishlisted ? "mdi:heart" : "mdi:heart-outline"} class="w-5 h-5" />
                </button>
            </div>

            <div class="grid md:grid-cols-2 gap-8 lg:gap-12 pt-3">
                <!-- Left: Image Gallery -->
                <div class="animate-fade-in">
                    <!-- Main Image -->
                    <div class="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                        <img src={mainImage} alt={product.name} class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        {#if product.stockStatus === "preorder"}
                            <Badge variant="info" className="absolute top-4 left-4">Pre-Order</Badge>
                        {/if}
                        {#if product.oldPrice}
                            <Badge variant="danger" className="absolute top-4 right-4">Sale</Badge>
                        {/if}
                    </div>

                    <!-- Thumbnails -->
                    <div class="grid grid-cols-4 gap-3">
                        {#each product.images as image, i}
                            <button
                                on:click={() => { mainImage = image; selectedImageIndex = i; }}
                                class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 {selectedImageIndex === i ? 'border-primary' : 'border-transparent'} hover:border-primary transition-colors"
                            >
                                <img src={image} alt="" class="w-full h-full object-cover" />
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Right: Product Info -->
                <div class="animate-fade-in" style="transition-delay: 100ms">
                    <!-- Breadcrumb -->
                    <nav class="text-small text-text-muted mb-4">
                        <a href="/shop/{product.shop.slug}" class="hover:text-primary">Shop</a>
                        <span> / </span>
                        <a href="/shop/{product.shop.slug}?category={product.category}" class="hover:text-primary">{product.category}</a>
                        <span> / </span>
                        <span class="text-text-main">{product.name}</span>
                    </nav>

                    <h1 class="text-[28px] md:text-[32px] font-bold text-text-main mb-2">{product.name}</h1>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="flex items-center gap-1">
                            {#each Array(5) as _, i}
                                <Icon icon="mdi:star" class={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                            {/each}
                        </div>
                        <span class="text-body text-text-muted">{product.rating} ({product.reviewCount} reviews)</span>
                    </div>

                    <!-- Price -->
                    <div class="mb-6">
                        <div class="flex items-center gap-3">
                            <span class="text-[32px] font-bold text-primary">{formatNaira(product.price)}</span>
                            {#if product.oldPrice}
                                <span class="text-xl text-text-muted line-through">{formatNaira(product.oldPrice)}</span>
                                <Badge variant="danger">Save {Math.round((1 - product.price / product.oldPrice) * 100)}%</Badge>
                            {/if}
                        </div>
                        <p class="text-small {getStockStatusColor(product.stockStatus)} mt-2 font-medium">
                            <Icon icon="mdi:check-circle" class="inline-block mr-1" />
                            {getStockStatusText(product.stockStatus, product.stockCount)}
                        </p>
                    </div>

                    <!-- Variants -->
                    <div class="space-y-4 mb-6">
                        {#if product.variants?.colors?.length}
                            <div>
                                <span class="block text-body font-medium text-text-main mb-2">Color: <span class="font-normal text-text-muted">{selectedColor}</span></span>
                                <div class="flex gap-3">
                                    {#each product.variants.colors as color}
                                        <button aria-label="color" on:click={() => (selectedColor = color.name)} class="w-10 h-10 rounded-full border-2 {selectedColor === color.name ? 'border-primary' : 'border-gray-300'} hover:border-primary transition-colors" style="background-color: {color.value}"></button>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        {#if product.variants?.sizes?.length}
                            <div>
                                <span class="block text-body font-medium text-text-main mb-2">Size: <span class="font-normal text-text-muted">{selectedSize || "Select"}</span></span>
                                <div class="flex flex-wrap gap-2">
                                    {#each product.variants.sizes as size}
                                        <button on:click={() => (selectedSize = size)} class="px-4 py-2 rounded-btn border-2 {selectedSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-gray-300 text-text-main'} hover:border-primary transition-colors text-body font-medium">{size}</button>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <div>
                            <span class="block text-body font-medium text-text-main mb-2">Quantity</span>
                            <div class="flex items-center gap-3">
                                <button on:click={() => (quantity = Math.max(1, quantity - 1))} class="w-10 h-10 rounded-btn border border-gray-300 flex items-center justify-center text-xl hover:border-primary transition-colors"><Icon icon="mdi:minus" /></button>
                                <span class="w-12 text-center text-body font-medium">{quantity}</span>
                                <button on:click={() => (quantity = Math.min(product.stockCount || 10, quantity + 1))} class="w-10 h-10 rounded-btn border border-gray-300 flex items-center justify-center text-xl hover:border-primary transition-colors"><Icon icon="mdi:plus" /></button>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="space-y-3 mb-6">
                        <Button variant="primary" size="lg" className="w-full h-[48px] text-lg" onclick={addToCart}>
                            Add to Cart - {formatNaira(product.price * quantity)}
                        </Button>
                        <Button variant="outline" size="lg" className="w-full h-[48px] text-lg" onclick={buyNow}>
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 3: PRODUCT DETAILS TABS -->
    <!-- Content exactly mirrors the previous product detail implementation for fidelity -->
</main>
{/if}
