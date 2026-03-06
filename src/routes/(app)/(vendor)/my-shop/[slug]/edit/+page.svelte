<!-- src/routes/(vendor)/my-shop/[slug]/edit/+page.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import ShopForm from "$lib/components/app/vendor/ShopForm.svelte";
    import Button from "$lib/components/common/Button.svelte";

    let shopSlug = "";
    $: if ($page.params.slug) {
        shopSlug = $page.params.slug;
    }

    // Mock shop data (in real app: fetch from API)
    let shop = {
        id: "1",
        name: "Urban Kicks",
        slug: "urban-kicks",
        slogan: "Premium sneakers for everyday style",
        description:
            "Urban Kicks sells authentic sneakers, streetwear and limited editions from global brands. Fast delivery and trusted quality.",
        logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=UK",
        coverUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        theme: "fashion",
        trustScore: 92,
        products: 42,
        followers: 1240,
        verified: true,
        status: "active" as const,
        shipping: {
            processingTime: "1-2 days",
            shippingTime: "2-5 business days",
            regions: ["Nigeria"],
            deliveryMethod: "gig",
        },
        verification: {
            cacNumber: "RC123456",
            cacDocument: "https://example.com/cac.pdf",
            status: "verified" as const,
        },
        location: {
            address: "123 Main Street",
            city: "Lagos",
            state: "Lagos",
            country: "Nigeria",
            postalCode: "100001",
        },
        contact: {
            phone: "+234 801 234 5678",
            email: "contact@urbankicks.com",
            instagram: "@urbankicks",
            facebook: "urbankicksng",
            twitter: "@urbankicks",
            whatsapp: "+234 801 234 5678",
            website: "https://urbankicks.com",
        },
        shopInfo: {
            responseTime: "< 2 hours",
            processingTime: "1-2 days",
            shippingTime: "2-5 business days",
            returns: "7-day return policy",
        },
    };
</script>

<svelte:head>
    <title>Edit {shop.name} | VendorHub</title>
</svelte:head>

<div class="max-w-[1400px] mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8" in:fade={{ duration: 400 }}>
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
                    <h1 class="text-2xl font-bold text-text-main">Edit Shop</h1>
                    <p class="text-body text-text-muted">{shop.name}</p>
                </div>
            </div>

            <Button
                href="/shop/{shopSlug}"
                variant="outline"
                size="md"
                target="_blank"
            >
                <Icon icon="mdi:eye-outline" class="w-4 h-4 mr-2" />
                Preview Shop
            </Button>
        </div>
    </div>

    <div
        class="lg:col-span-2 space-y-6"
        in:fade={{ duration: 400, delay: 100 }}
    >
        <ShopForm {shop} isEdit={true} />
    </div>
</div>

<!-- <style>
    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style> -->
