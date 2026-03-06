<!-- src/routes/(app)/(vendor)/my-shop/[slug]/product/[code]/edit/+page.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import ProductForm from "$lib/components/vendor/ProductForm.svelte";
    import ProductImages from "$lib/components/vendor/ProductImages.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    let shopSlug = "";
    let productCode = "";
    let shopName = "";

    $: if ($page.params.slug && $page.params.code) {
        shopSlug = $page.params.slug;
        productCode = $page.params.code;
        shopName = shopSlug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }

    // Mock product data (in real app: fetch from API)
    let product = {
        id: "p_001",
        code: productCode,
        name: "Air Jordan Retro High",
        description:
            "Premium basketball sneakers with authentic leather upper and Nike Air cushioning.",
        category: "Sneakers",
        brand: "Jordan",
        price: 120000,
        discountPrice: null,
        stock: 23,
        sku: "UK-AJ1-001",
        weight: "0.8",
        dimensions: "32×20×12",
        tags: ["sneakers", "jordan", "basketball", "nike"],
        status: "active" as const,
    };

    let images: File[] = [];
    let previews: string[] = [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    ];
</script>

<svelte:head>
    <title>Edit {product.name} - {shopName} | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8 space-y-8">
    <!-- Back Link -->
    <div in:fade={{ duration: 400 }}>
        <a
            href="/my-shop/{shopSlug}/product"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Back to Products
        </a>
    </div>

    <!-- Page Header -->
    <div in:fade={{ duration: 400, delay: 100 }}>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div
                    class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                    <Icon
                        icon="mdi:pencil-outline"
                        class="w-6 h-6 text-primary"
                    />
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-text-main">
                        Edit Product
                    </h1>
                    <p class="text-body text-text-muted">
                        {shopName} • {product.name}
                    </p>
                </div>
            </div>

            <div class="flex gap-2">
                <Button
                    href="/shop/{shopSlug}/product/{productCode}"
                    variant="outline"
                    size="md"
                    target="_blank"
                >
                    <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-2" />
                    View Product
                </Button>
            </div>
        </div>
    </div>

    <!-- Product Images -->
    <section in:fade={{ duration: 400, delay: 200 }}>
        <ProductImages
            bind:images
            bind:previews
            on:images-change={(e) => {
                images = e.detail.images;
                previews = e.detail.previews;
            }}
        />
    </section>

    <!-- Product Form -->
    <section in:fade={{ duration: 400, delay: 300 }}>
        <ProductForm {product} {shopSlug} isEdit={true} />
    </section>
</div>

<!-- <style>
    @media (prefers-reduced-motion: reduce) {
        [in:fade] {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style> -->
