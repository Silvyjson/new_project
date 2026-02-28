<!-- src/routes/(vendor)/my-shop/[shopId]/+page.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";

    let shopId = "";
    $: if ($page.params.slug) {
        shopId = $page.params.slug;
    }

    // Mock shop data
    let shop = {
        id: "1",
        name: "TechStoreNG",
        description: "Premium electronics and gadgets with warranty.",
        category: "Electronics",
        logo: "🏪",
        banner: "bg-blue-100",
        products: 120,
        followers: 2340,
        active: true,
        trustScore: 94,
        joinedAt: "2025-06-15",
        contact: {
            phone: "+234 801 234 5678",
            whatsapp: "+234 801 234 5678",
            instagram: "@techstoreng",
        },
    };

    const stats = [
        { label: "Total Products", value: shop.products },
        { label: "Followers", value: shop.followers.toLocaleString() },
        { label: "Total Orders", value: "485" },
        { label: "Trust Score", value: `${shop.trustScore}%` },
    ];

    const toggleShopStatus = () => {
        shop.active = !shop.active;
    };
</script>

<svelte:head>
    <title>{shop.name} | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8">
    <div class="mb-6">
        <a
            href="/my-shop"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            Back to My Shops
        </a>
    </div>

    <!-- Shop Header -->
    <Card className="border border-gray-200 overflow-hidden mb-8">
        <div class="h-48 {shop.banner} relative">
            <div class="absolute -bottom-12 left-8">
                <div
                    class="w-24 h-24 rounded-full bg-surface border-4 border-surface flex items-center justify-center text-5xl shadow-card"
                >
                    {shop.logo}
                </div>
            </div>
            <div class="absolute top-4 right-4">
                <Badge variant={shop.active ? "success" : "warning"} size="lg">
                    {shop.active ? "Active" : "Paused"}
                </Badge>
            </div>
        </div>
        <div class="pt-14 pb-6 px-8">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h1 class="text-2xl font-bold text-text-main mb-2">
                        {shop.name}
                    </h1>
                    <p class="text-body text-text-muted max-w-2xl">
                        {shop.description}
                    </p>
                </div>
                <div class="flex gap-2">
                    <Button
                        variant="outline"
                        size="md"
                        onclick={toggleShopStatus}
                    >
                        {shop.active ? "Pause Shop" : "Activate Shop"}
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        href="/my-shop/{shopId}/edit"
                    >
                        Edit Shop
                    </Button>
                </div>
            </div>

            <!-- Stats Grid -->
            <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200"
            >
                {#each stats as stat}
                    <div class="text-center">
                        <div class="text-2xl font-bold text-text-main">
                            {stat.value}
                        </div>
                        <div class="text-sm text-text-muted">{stat.label}</div>
                    </div>
                {/each}
            </div>
        </div>
    </Card>

    <!-- Quick Actions -->
    <div class="grid md:grid-cols-3 gap-6 mb-8">
        <a href="/my-shop/{shopId}/product" class="block">
            <Card
                className="border border-gray-200 p-6 hover:border-primary hover:shadow-card-hover transition-all cursor-pointer"
            >
                <div class="flex items-center gap-4">
                    <div
                        class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl"
                    >
                        📦
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-text-main">
                            Manage Products
                        </h3>
                        <p class="text-sm text-text-muted">
                            Add, edit, or remove products
                        </p>
                    </div>
                </div>
            </Card>
        </a>

        <a href="/my-shop/{shopId}/followers" class="block">
            <Card
                className="border border-gray-200 p-6 hover:border-primary hover:shadow-card-hover transition-all cursor-pointer"
            >
                <div class="flex items-center gap-4">
                    <div
                        class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl"
                    >
                        👥
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-text-main">
                            View Followers
                        </h3>
                        <p class="text-sm text-text-muted">
                            See who follows your shop
                        </p>
                    </div>
                </div>
            </Card>
        </a>

        <a href="/my-shop/{shopId}/analytics" class="block">
            <Card
                className="border border-gray-200 p-6 hover:border-primary hover:shadow-card-hover transition-all cursor-pointer"
            >
                <div class="flex items-center gap-4">
                    <div
                        class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl"
                    >
                        📊
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-text-main">
                            Analytics
                        </h3>
                        <p class="text-sm text-text-muted">
                            Track performance metrics
                        </p>
                    </div>
                </div>
            </Card>
        </a>
    </div>

    <!-- Contact Info -->
    <Card className="border border-gray-200 p-6">
        <h2 class="text-xl font-bold text-text-main mb-6">
            Contact Information
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
            <div>
                <p class="text-sm text-text-muted mb-1">Phone</p>
                <p class="text-body text-text-main">{shop.contact.phone}</p>
            </div>
            <div>
                <p class="text-sm text-text-muted mb-1">WhatsApp</p>
                <p class="text-body text-text-main">{shop.contact.whatsapp}</p>
            </div>
            <div>
                <p class="text-sm text-text-muted mb-1">Instagram</p>
                <p class="text-body text-text-main">{shop.contact.instagram}</p>
            </div>
        </div>
    </Card>
</div>
