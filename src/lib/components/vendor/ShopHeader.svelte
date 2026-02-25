<!-- src/lib/components/vendor/ShopHeader.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import type { Product, Shop } from "$lib/types";
    import Button from "$lib/components/ui/Button.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";

    export let shop: Shop;
    export let product: Product | undefined = undefined;
    export let totalProducts: number = 0;

    // Selected variants
    let selectedSize = "";
    let quantity = 1;

    // Cart state
    let cartItemCount = 0;
    let showCartDrawer = false;
    let showProfileDrawer = false;

    // Format currency
    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    $: currentPath = $page.url.pathname;

    $: isShopProfile = currentPath === `/shops/${shop?.slug}`;
    $: isShopProducts = currentPath === `/shops/${shop?.slug}/products`;
    $: isProductPage =
        product &&
        currentPath === `/shops/${shop?.slug}/products/${product?.code}`;
</script>

<header class="sticky top-0 z-50 bg-surface border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
            <!-- Left: Shop Info -->
            <a href={`/shops/${shop?.slug}`} class="flex items-center gap-4">
                <img
                    src={shop?.logoUrl}
                    alt={shop?.name}
                    class="w-12 h-12 rounded-xl object-cover border border-gray-200"
                />
                <div>
                    <div class="flex items-center gap-2">
                        <h1 class="text-xl font-semibold text-text-main">
                            {shop?.name}
                        </h1>
                        {#if shop?.verified}
                            <TrustBadge size="sm" showText={false} />
                        {/if}
                    </div>

                    {#if isShopProfile}
                        <p class="text-xs text-text-muted">
                            Verified Shop on VendorHub
                        </p>
                    {:else}
                        <p class="text-sm text-text-muted">
                            {shop?.category} • {totalProducts} Products • ★ {shop?.rating}
                            ({(shop?.reviewCount / 1000).toFixed(1)}k reviews)
                        </p>
                    {/if}
                </div>
            </a>

            {#if isShopProfile}
                <!-- Center: Navigation -->
                <div
                    class="hidden md:flex items-center gap-8 text-sm font-medium"
                >
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
            {/if}

            <!-- Right: Actions -->
            <div class="hidden md:flex items-center gap-3">
                {#if isShopProducts}
                    <Button variant="outline" size="sm">Follow Shop</Button>
                    <Button variant="primary" size="sm">Message Shop</Button>
                {/if}
                <button
                    class="text-text-muted hover:text-primary transition-colors"
                    aria-label="Search"
                    on:click={() =>
                        goto(`/shops/${shop.slug}/products?focus=search`)}
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
                    class="relative text-text-muted hover:text-primary transition-colors"
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
                            class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium"
                            >{cartItemCount}</span
                        >
                    {/if}
                </button>

                <button
                    class="text-text-muted hover:text-primary transition-colors"
                    aria-label="Profile"
                    on:click={() => (showProfileDrawer = true)}
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
    </div>
</header>

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
                    <h3 class="text-h3 font-bold text-text-main">Your Cart</h3>
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

                <!-- Cart Items -->
                <div class="flex-1 overflow-y-auto p-4">
                    {#if product}
                        <div
                            class="flex items-center gap-4 p-4 bg-background-light rounded-xl"
                        >
                            <img
                                src={product.images?.[0]}
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
                    {:else}
                        <div
                            class="h-full flex flex-col items-center justify-center text-center p-8"
                        >
                            <div class="text-4xl mb-4">🛒</div>
                            <p class="text-text-main font-medium">
                                Your cart is empty
                            </p>
                            <p class="text-text-muted text-sm mt-1">
                                Start shopping to add items to your cart
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-6"
                                onclick={() => {
                                    showCartDrawer = false;
                                    goto(`/shops/${shop.slug}/products`);
                                }}
                            >
                                Browse Products
                            </Button>
                        </div>
                    {/if}
                </div>

                <!-- Footer -->
                <div class="p-4 border-t border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-body text-text-muted">Subtotal</span>
                        <span class="text-body font-bold text-text-main"
                            >{formatNaira(
                                product ? product.price * quantity : 0,
                            )}</span
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

{#if showProfileDrawer}
    <div class="fixed inset-0 z-[110]" role="dialog" aria-modal="true">
        <!-- Overlay -->
        <button
            class="absolute inset-0 bg-dark/50 w-full h-full border-none cursor-default"
            on:click={() => (showProfileDrawer = false)}
            aria-label="Close profile"
            type="button"
        ></button>

        <!-- Drawer -->
        <div
            class="absolute right-0 top-0 h-full w-full max-w-[360px] bg-surface shadow-2xl animate-slide-in-right"
        >
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center gap-4">
                        <img
                            src="/avatar-placeholder.png"
                            class="w-14 h-14 rounded-full object-cover"
                            alt="User"
                        />
                        <div>
                            <h3 class="font-semibold text-text-main">
                                John Doe
                            </h3>
                            <p class="text-sm text-text-muted">
                                johndoe@email.com
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Menu -->
                <div class="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
                    <!-- Orders -->
                    <div>
                        <p class="text-xs text-text-muted mb-3 uppercase">
                            Orders
                        </p>
                        <ul class="space-y-3">
                            <li>
                                <a href="/orders" class="hover:text-primary"
                                    >My Orders</a
                                >
                            </li>
                            <li>
                                <a href="/track" class="hover:text-primary"
                                    >Track Order</a
                                >
                            </li>
                            <li>
                                <a href="/returns" class="hover:text-primary"
                                    >Returns</a
                                >
                            </li>
                        </ul>
                    </div>

                    <!-- Shopping -->
                    <div>
                        <p class="text-xs text-text-muted mb-3 uppercase">
                            Shopping
                        </p>
                        <ul class="space-y-3">
                            <li>
                                <a href="/wishlist" class="hover:text-primary"
                                    >Wishlist</a
                                >
                            </li>
                            <li>
                                <a
                                    href="/saved-shops"
                                    class="hover:text-primary">Saved Shops</a
                                >
                            </li>
                        </ul>
                    </div>

                    <!-- Account -->
                    <div>
                        <p class="text-xs text-text-muted mb-3 uppercase">
                            Account
                        </p>
                        <ul class="space-y-3">
                            <li>
                                <a href="/settings" class="hover:text-primary"
                                    >Settings</a
                                >
                            </li>
                            <li>
                                <a
                                    href="/notifications"
                                    class="hover:text-primary">Notifications</a
                                >
                            </li>
                            <li>
                                <a href="/security" class="hover:text-primary"
                                    >Security</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Footer -->
                <div class="p-6 border-t border-gray-200">
                    <button
                        class="w-full text-red-500 hover:text-red-600 font-medium"
                        on:click={() => console.log("logout")}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
