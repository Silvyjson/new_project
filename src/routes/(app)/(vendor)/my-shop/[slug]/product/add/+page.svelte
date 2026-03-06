<!-- src/routes/(app)/(vendor)/my-shop/[slug]/product/add/+page.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import ProductForm from "$lib/components/app/vendor/ProductForm.svelte";
    import ProductImages from "$lib/components/app/vendor/ProductImages.svelte";

    let shopSlug = "";
    let shopName = "";
    $: if ($page.params.slug) {
        shopSlug = $page.params.slug;
        shopName = shopSlug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }

    let images: File[] = [];
    let previews: string[] = [];
</script>

<svelte:head>
    <title>Add Product - {shopName} | VendorHub</title>
</svelte:head>

<main class="max-w-[1000px] mx-auto px-4 py-8 space-y-8">
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
                        icon="mdi:plus-box-outline"
                        class="w-6 h-6 text-primary"
                    />
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-text-main">
                        Add New Product
                    </h1>
                    <p class="text-body text-text-muted">{shopName}</p>
                </div>
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
        <ProductForm {shopSlug} isEdit={false} />
    </section>
</main>

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
