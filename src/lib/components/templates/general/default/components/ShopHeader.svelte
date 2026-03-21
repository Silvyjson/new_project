<!-- src/lib/components/vendor/ShopHeader.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import type { Product, Shop } from "$lib/types";
    import Button from "$lib/components/common/Button.svelte";
    import ProfileDrawer from "$lib/components/app/common/ProfileDrawer.svelte";
    import Icon from "@iconify/svelte";
    import { formatNaira } from "$lib/utils/format";

    export let shop: Shop | null = null;
    export let product: Product | undefined = undefined;
    export let totalProducts: number = 0;

    const fallbackCategory = (product as any)?.shop?.category ?? "—";
    const fallbackTotalProducts =
        totalProducts ?? (product as any)?.shop?.totalProducts ?? 0;

    let selectedSize = "";
    let quantity = 1;

    /* -----------------------------
       CART + WISHLIST STATE
    ------------------------------*/
    let cartItems: Product[] = [];
    let wishlistItems: Product[] = [];

    let showShopDrawer = false;
    let activeDrawerTab: "cart" | "wishlist" = "cart";

    let showProfileDrawer = false;

    const cartSubtotal = () =>
        cartItems.reduce((total, item) => total + item.price, 0);

    $: currentPath = $page?.url?.pathname ?? "";
    $: isShopProfile = currentPath === `/shop/${shop?.slug}`;
    $: isShopProducts = currentPath === `/shop/${shop?.slug}/product`;
    $: isProductPage =
        product &&
        currentPath === `/shop/${shop?.slug}/product/${product?.code}`;
</script>

<header
    class="sticky top-0 z-50 bg-surface/80 border-b border-gray-100 backdrop-blur-xl transition-all duration-300"
>
    <div class="max-w-7xl mx-auto px-4 py-4">
        <div
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
            <!-- 🔹 Shop Info -->
            <a
                href={`/shop/${shop?.slug}`}
                class="flex items-center gap-3 md:gap-4"
            >
                <img
                    src={shop?.logoUrl}
                    alt={shop?.name}
                    class="w-11 h-11 md:w-12 md:h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                />

                <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                        <h1
                            class="text-lg md:text-xl font-bold text-text-main tracking-tight group-hover:text-primary transition-colors"
                        >
                            {shop?.name}
                        </h1>

                        {#if isShopProducts || isProductPage}
                            {#if shop?.verified}
                                <Icon
                                    icon="mdi:verified"
                                    class="text-primary w-5 h-5"
                                />
                            {/if}
                        {/if}
                    </div>

                    {#if isShopProfile}
                        <p class="text-xs text-text-muted">
                            Verified Shop on VendorHub
                        </p>
                    {:else}
                        <p class="text-xs md:text-sm text-text-muted truncate">
                            {shop?.category ?? fallbackCategory}
                            • {fallbackTotalProducts} Products • <Icon
                                icon="mdi:star"
                                class="inline-block text-yellow-400"
                            />
                            {shop?.rating ?? 0}
                            ({((shop?.reviewCount ?? 0) / 1000).toFixed(1)}k
                            reviews)
                        </p>
                    {/if}
                </div>
            </a>

            <!-- 🔹 Navigation (Visible on Mobile) -->
            {#if isShopProfile}
                <div
                    class="hidden md:flex flex-wrap gap-6 text-sm font-medium border-t border-gray-100 pt-3 md:border-0 md:pt-0"
                >
                <a
                        href={`/shop/${shop?.slug}`}
                        class="text-text-main hover:text-primary transition-colors"
                    >
                        Home
                    </a>

                    <a
                        href={`/shop/${shop?.slug}/product`}
                        class="text-text-main hover:text-primary transition-colors"
                    >
                        Products
                    </a>
                    <a
                        href={`/shop/${shop?.slug}#about`}
                        class="text-text-muted hover:text-primary transition-colors"
                    >
                        About
                    </a>
                    <a
                        href={`/shop/${shop?.slug}#reviews`}
                        class="text-text-muted hover:text-primary transition-colors"
                    >
                        Reviews
                    </a>
                </div>
            {/if}

            <!-- 🔹 Actions -->
            <div
                class="flex items-center justify-between md:justify-end gap-5 border-t border-gray-100 pt-3 md:border-0 md:pt-0"
            >
                <div class="gap-2 {isShopProfile ? 'flex md:hidden' : 'flex'}">
                    <Button variant="outline" size="sm">Follow</Button>
                    <Button variant="primary" size="sm">Message</Button>
                </div>

                <div class="flex items-center gap-2">
                    <!-- Search -->
                    <button
                        class="p-2.5 rounded-xl text-text-muted hover:text-primary hover:bg-primary/5 transition-all"
                        on:click={() => {
                            const slug =
                                shop?.slug ?? (product as any)?.shop?.slug;
                            if (slug)
                                goto(`/shop/${slug}/product?focus=search`);
                        }}
                        aria-label="Search products"
                    >
                        <Icon icon="mdi:magnify" class="w-5.5 h-5.5" />
                    </button>

                    <!-- Wishlist -->
                    <!-- <button
                    class="relative text-text-muted hover:text-primary transition-colors"
                    on:click={() => {
                        activeDrawerTab = "wishlist";
                        showShopDrawer = true;
                    }}
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
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    {#if wishlistItems.length > 0}
                        <span class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                            {wishlistItems.length}
                        </span>
                    {/if}
                </button> -->

                    <!-- Cart -->
                    <button
                        class="relative p-2.5 rounded-xl text-text-muted hover:text-primary hover:bg-primary/5 transition-all"
                        on:click={() => {
                            activeDrawerTab = "cart";
                            showShopDrawer = true;
                        }}
                        aria-label="View cart"
                    >
                        <Icon icon="mdi:cart-outline" class="w-5.5 h-5.5" />
                        {#if cartItems.length > 0}
                            <span
                                class="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-surface"
                            >
                                {cartItems.length}
                            </span>
                        {/if}
                    </button>

                    <!-- Profile -->
                    <button
                        class="text-text-muted hover:text-primary transition-colors"
                        on:click={() => (showProfileDrawer = true)}
                        aria-label="View profile"
                    >
                        <Icon icon="mdi:account-outline" class="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- 🔷 SHARED CART + WISHLIST DRAWER -->
{#if showShopDrawer}
    <div class="fixed inset-0 z-[100]" role="dialog">
        <button
            class="absolute inset-0 bg-dark/50"
            on:click={() => (showShopDrawer = false)}
            aria-label="Close overlay"
        ></button>

        <div
            class="absolute right-0 top-0 h-full w-full max-w-[400px] bg-surface shadow-2xl animate-slide-in-right flex flex-col"
        >
            <!-- Header Tabs -->
            <div
                class="p-4 border-b border-gray-200 flex justify-between items-center"
            >
                <div class="flex gap-6 text-sm font-semibold">
                    <button
                        class={activeDrawerTab === "cart"
                            ? "text-primary border-b-2 border-primary pb-1"
                            : "text-text-muted"}
                        on:click={() => (activeDrawerTab = "cart")}
                    >
                        Cart ({cartItems.length})
                    </button>

                    <button
                        class={activeDrawerTab === "wishlist"
                            ? "text-primary border-b-2 border-primary pb-1"
                            : "text-text-muted"}
                        on:click={() => (activeDrawerTab = "wishlist")}
                    >
                        Wishlist ({wishlistItems.length})
                    </button>
                </div>

                <button
                    on:click={() => (showShopDrawer = false)}
                    aria-label="Close drawer"><Icon icon="mdi:close" /></button
                >
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
                {#if activeDrawerTab === "cart"}
                    {#if cartItems.length > 0}
                        {#each cartItems as item}
                            <div
                                class="flex gap-4 bg-background-light p-3 rounded-xl"
                            >
                                <img
                                    src={item.images?.[0]}
                                    alt={item.name}
                                    class="w-16 h-16 rounded-lg object-cover"
                                />
                                <div class="flex-1">
                                    <h4 class="font-semibold text-sm">
                                        {item.name}
                                    </h4>
                                    <p class="text-primary font-bold text-sm">
                                        {formatNaira(item.price)}
                                    </p>
                                </div>
                            </div>
                        {/each}
                    {:else}
                        <p class="text-center text-text-muted mt-10">
                            Your cart is empty
                        </p>
                    {/if}
                {:else if wishlistItems.length > 0}
                    {#each wishlistItems as item}
                        <div
                            class="flex gap-4 bg-background-light p-3 rounded-xl"
                        >
                            <img
                                src={item.images?.[0]}
                                alt={item.name}
                                class="w-16 h-16 rounded-lg object-cover"
                            />
                            <div class="flex-1">
                                <h4 class="font-semibold text-sm">
                                    {item.name}
                                </h4>
                                <button
                                    class="text-xs text-primary mt-1"
                                    on:click={() => {
                                        cartItems = [...cartItems, item];
                                        wishlistItems = wishlistItems.filter(
                                            (p) => p.code !== item.code,
                                        );
                                        activeDrawerTab = "cart";
                                    }}
                                >
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p class="text-center text-text-muted mt-10">
                        Your wishlist is empty
                    </p>
                {/if}
            </div>

            <!-- Footer -->
            {#if activeDrawerTab === "cart"}
                <div class="p-4 border-t border-gray-200">
                    <div class="flex justify-between mb-4">
                        <span class="text-sm text-text-muted">Subtotal</span>
                        <span class="font-bold">
                            {formatNaira(cartSubtotal())}
                        </span>
                    </div>
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        href="/checkout"
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            {/if}
        </div>
    </div>
{/if}

{#if showProfileDrawer}
    <ProfileDrawer
        {showProfileDrawer}
        on:close={() => (showProfileDrawer = false)}
    />
{/if}
