<!-- src/routes/(app)/(vendor)/my-shop/create/+page.svelte -->
<script lang="ts">
    import { fade } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import ShopForm from "$lib/components/app/vendor/shop/ShopForm.svelte";

    // Empty shop data for create
    let shop = {
        name: "",
        slug: "",
        slogan: "",
        description: "",
        logoUrl: "",
        coverUrl: "",
        theme: "classic",
        trustScore: 0,
        products: 0,
        followers: 0,
        verified: false,
        status: "active" as const,
        shipping: {
            processingTime: "1-2 days",
            shippingTime: "2-5 business days",
            regions: ["Nigeria"],
            deliveryMethod: "self",
        },
        verification: {
            cacNumber: "",
            cacDocument: "",
            status: "not-verified" as const,
        },
        location: {
            address: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
        },
        contact: {
            phone: "",
            email: "",
            instagram: "",
            facebook: "",
            twitter: "",
            whatsapp: "",
            website: "",
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
    <title>Create Shop | VendorHub</title>
</svelte:head>

<main class="max-w-[1000px] mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8" in:fade={{ duration: 400 }}>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div
                    class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                    <Icon
                        icon="mdi:storefront-outline"
                        class="w-6 h-6 text-primary"
                    />
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-text-main">
                        Create a New Shop
                    </h1>
                    <p class="text-body text-text-muted">
                        Start selling by creating your shop profile.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div
        class="lg:col-span-2 space-y-6"
        in:fade={{ duration: 400, delay: 100 }}
    >
        <ShopForm bind:shop isEdit={false} />
    </div>
</main>

<style>
    @media (prefers-reduced-motion: reduce) {
        :global(.fade-transition) {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>
