<!-- src/routes/(vendor)/my-shop/product/[productId]/+page.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import { formatNaira } from "$lib/utils/format";
    import Icon from "@iconify/svelte";

    let productId = "";
    $: if ($page.params.code) {
        productId = $page.params.code;
    }

    // Mock product data
    let product = {
        id: "p_001",
        name: "Wireless Earbuds Pro",
        description:
            "Premium wireless earbuds with 48-hour battery life and active noise cancellation.",
        category: "Electronics",
        shop: "TechStoreNG",
        price: 25000,
        discountPrice: 22000,
        stock: 45,
        isPreorder: false,
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
            "https://images.unsplash.com/photo-1609081219090-a66920c72123",
        ],
        deliveryDuration: "2-5 business days",
        returnAllowed: true,
        active: true,
        performance: {
            views: 1240,
            orders: 85,
            wishlistAdds: 156,
        },
    };

    const toggleProductStatus = () => {
        product.active = !product.active;
    };
</script>

<svelte:head>
    <title>{product.name} | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-6">
        <a
            href="/my-shop/{$page.params.slug}/product"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Back to Products
        </a>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
        <!-- Left: Image Gallery -->
        <div class="lg:col-span-1">
            <Card className="border border-gray-200 p-6">
                <div
                    class="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4"
                >
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        class="w-full h-full object-cover"
                    />
                </div>
                <div class="grid grid-cols-4 gap-2">
                    {#each product.images as image, i}
                        <img
                            src={image}
                            alt=""
                            class="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                    {/each}
                </div>
            </Card>
        </div>

        <!-- Right: Product Info -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Header -->
            <Card className="border border-gray-200 p-6">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h1 class="text-2xl font-bold text-text-main mb-2">
                            {product.name}
                        </h1>
                        <p class="text-body text-text-muted">
                            {product.shop} • {product.category}
                        </p>
                    </div>
                    <Badge variant={product.active ? "success" : "warning"}>
                        {product.active ? "Active" : "Inactive"}
                    </Badge>
                </div>

                <div class="flex items-center gap-4 mb-6">
                    <span class="text-3xl font-bold text-primary">
                        {product.discountPrice
                            ? formatNaira(product.discountPrice)
                            : formatNaira(product.price)}
                    </span>
                    {#if product.discountPrice}
                        <span class="text-xl text-text-muted line-through"
                            >{formatNaira(product.price)}</span
                        >
                    {/if}
                </div>

                <div class="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="md"
                        href="/my-shop/product/{product.id}/edit"
                    >
                        Edit Product
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        onclick={toggleProductStatus}
                    >
                        {product.active ? "Pause" : "Activate"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="md"
                        class="text-error hover:bg-error/5"
                    >
                        Delete
                    </Button>
                </div>
            </Card>

            <!-- Performance Metrics -->
            <Card className="border border-gray-200 p-6">
                <h2 class="text-xl font-bold text-text-main mb-6">
                    Performance
                </h2>
                <div class="grid grid-cols-3 gap-6">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-text-main">
                            {product.performance.views.toLocaleString()}
                        </div>
                        <div class="text-sm text-text-muted">Views</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-text-main">
                            {product.performance.orders}
                        </div>
                        <div class="text-sm text-text-muted">Orders</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-text-main">
                            {product.performance.wishlistAdds}
                        </div>
                        <div class="text-sm text-text-muted">Wishlist Adds</div>
                    </div>
                </div>
            </Card>

            <!-- Details -->
            <Card className="border border-gray-200 p-6">
                <h2 class="text-xl font-bold text-text-main mb-6">
                    Product Details
                </h2>
                <div class="space-y-4">
                    <div>
                        <p class="text-sm text-text-muted mb-1">Description</p>
                        <p class="text-body text-text-main">
                            {product.description}
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <p class="text-sm text-text-muted mb-1">Stock</p>
                            <p class="text-body text-text-main">
                                {product.stock} units
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-text-muted mb-1">
                                Pre-order
                            </p>
                            <p class="text-body text-text-main">
                                {product.isPreorder ? "Yes" : "No"}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-text-muted mb-1">Delivery</p>
                            <p class="text-body text-text-main">
                                {product.deliveryDuration}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-text-muted mb-1">Returns</p>
                            <p class="text-body text-text-main">
                                {product.returnAllowed
                                    ? "Allowed"
                                    : "Not Allowed"}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</main>
