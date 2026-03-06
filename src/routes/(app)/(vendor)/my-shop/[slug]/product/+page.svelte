<!-- src/routes/(app)/(vendor)/my-shop/[slug]/product/+page.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";
    import ProductTable from "$lib/components/vendor/ProductTable.svelte";
    import ProductGrid from "$lib/components/vendor/ProductGrid.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import Input from "$lib/components/ui/Input.svelte";

    let shopSlug = "";
    let shopName = "";
    $: if ($page.params.slug) {
        shopSlug = $page.params.slug;
        shopName = shopSlug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }

    // Mock products
    let products = [
        {
            id: "p_001",
            code: "UK-AJ1-001",
            name: "Air Jordan Retro High",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            price: 120000,
            discountPrice: null,
            stock: 23,
            orders: 41,
            status: "active" as const,
            category: "Sneakers",
        },
        {
            id: "p_002",
            code: "UK-NB550-002",
            name: "New Balance 550 White",
            image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
            price: 72000,
            discountPrice: 65000,
            stock: 15,
            orders: 32,
            status: "active" as const,
            category: "Sneakers",
        },
        {
            id: "p_003",
            code: "UK-AF1-003",
            name: "Nike Air Force 1",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
            price: 85000,
            discountPrice: null,
            stock: 0,
            orders: 67,
            status: "out-of-stock" as const,
            category: "Sneakers",
        },
        {
            id: "p_004",
            code: "UK-YZY-004",
            name: "Adidas Yeezy Boost",
            image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6",
            price: 150000,
            discountPrice: null,
            stock: 8,
            orders: 28,
            status: "active" as const,
            category: "Sneakers",
        },
        {
            id: "p_005",
            code: "UK-CK70-005",
            name: "Converse Chuck 70",
            image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
            price: 45000,
            discountPrice: null,
            stock: 42,
            orders: 55,
            status: "draft" as const,
            category: "Sneakers",
        },
    ];

    // View mode
    let viewMode: "table" | "grid" = "table";

    // Filters
    let searchQuery = "";
    let categoryFilter = "all";
    let statusFilter = "all";
    let sortBy = "newest";

    const categories = ["All", "Sneakers", "Boots", "Accessories"];
    const statuses = ["All", "Active", "Draft", "Out of Stock"];

    // Filter products
    $: filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" ||
            product.category.toLowerCase() === categoryFilter.toLowerCase();
        const matchesStatus =
            statusFilter === "all" ||
            product.status === statusFilter.toLowerCase().replace(/\s+/g, "-");
        return matchesSearch && matchesCategory && matchesStatus;
    });
</script>

<svelte:head>
    <title>Products - {shopName} | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8 space-y-8">
    <!-- Back Link -->
    <div in:fade={{ duration: 400 }}>
        <a
            href="/my-shop/{shopSlug}"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Back to Shop
        </a>
    </div>

    <!-- Section 1: Shop Context Header -->
    <section in:fade={{ duration: 400, delay: 100 }}>
        <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
            <div class="flex items-center gap-4">
                <div
                    class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                    <Icon
                        icon="mdi:cube-outline"
                        class="w-6 h-6 text-primary"
                    />
                </div>
                <div>
                    <div class="flex items-center gap-3 mb-1">
                        <h1 class="text-2xl font-bold text-text-main">
                            {shopName}
                        </h1>
                        <Badge variant="info" size="sm">
                            <Icon
                                icon="mdi:shape-outline"
                                class="w-3 h-3 inline mr-1"
                            />
                            Sneakers • Fashion
                        </Badge>
                    </div>
                    <p class="text-body text-text-muted">
                        {products.length} Products
                    </p>
                </div>
            </div>

            <div class="flex flex-wrap gap-2">
                <Button
                    href="/shop/{shopSlug}"
                    variant="outline"
                    size="md"
                    target="_blank"
                >
                    <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-2" />
                    View Shop
                </Button>
                <Button
                    href="/my-shop/{shopSlug}/product/add"
                    variant="primary"
                    size="md"
                >
                    <Icon icon="mdi:plus-box-outline" class="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>
        </div>
    </section>

    <!-- Section 2: Product Toolbar -->
    <section in:fade={{ duration: 400, delay: 200 }}>
        <Card className="border border-gray-200 p-4">
            <div
                class="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
                <!-- Search -->
                <div class="w-full md:w-96">
                    <Input
                        label=""
                        name="search"
                        placeholder="Search products..."
                        bind:value={searchQuery}
                    />
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap gap-3 w-full md:w-auto">
                    <select
                        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
                        bind:value={categoryFilter}
                    >
                        {#each categories as cat}
                            <option value={cat.toLowerCase()}>{cat}</option>
                        {/each}
                    </select>

                    <select
                        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
                        bind:value={statusFilter}
                    >
                        {#each statuses as status}
                            <option value={status.toLowerCase()}
                                >{status}</option
                            >
                        {/each}
                    </select>

                    <select
                        class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
                        bind:value={sortBy}
                    >
                        <option value="newest">Newest</option>
                        <option value="best-selling">Best Selling</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>

                    <!-- View Toggle -->
                    <div
                        class="flex items-center border border-gray-300 rounded-xl overflow-hidden"
                    >
                        <button
                            on:click={() => (viewMode = "table")}
                            class="px-3 py-2.5 hover:bg-gray-50 transition-colors {viewMode ===
                            'table'
                                ? 'bg-primary/10 text-primary'
                                : 'text-text-muted'}"
                            title="Table View"
                        >
                            <Icon icon="mdi:view-list" class="w-5 h-5" />
                        </button>
                        <button
                            on:click={() => (viewMode = "grid")}
                            class="px-3 py-2.5 hover:bg-gray-50 transition-colors {viewMode ===
                            'grid'
                                ? 'bg-primary/10 text-primary'
                                : 'text-text-muted'}"
                            title="Grid View"
                        >
                            <Icon
                                icon="mdi:view-grid-outline"
                                class="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    </section>

    <!-- Section 3: Product List -->
    <section in:fade={{ duration: 400, delay: 300 }}>
        {#if filteredProducts.length === 0}
            <Card className="py-16 text-center border border-gray-200">
                <div
                    class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"
                >
                    <Icon
                        icon="mdi:cube-outline"
                        class="w-8 h-8 text-text-muted"
                    />
                </div>
                <h2 class="text-2xl font-bold text-text-main mb-2">
                    No products found
                </h2>
                <p class="text-body text-text-muted mb-6">
                    Try adjusting your filters or add a new product.
                </p>
                <div class="flex justify-center">
                    <Button
                        href="/my-shop/{shopSlug}/product/add"
                        variant="primary"
                        size="lg"
                    >
                        <Icon
                            icon="mdi:plus-box-outline"
                            class="w-5 h-5 mr-2"
                        />
                        Add Product
                    </Button>
                </div>
            </Card>
        {:else if viewMode === "table"}
            <ProductTable products={filteredProducts} {shopSlug} />
        {:else}
            <ProductGrid products={filteredProducts} {shopSlug} />
        {/if}
    </section>

    <!-- Section 4: Pagination -->
    {#if filteredProducts.length > 0}
        <section in:fade={{ duration: 400, delay: 400 }}>
            <div
                class="flex flex-col md:flex-row items-center justify-between gap-4"
            >
                <p class="text-sm text-text-muted">
                    Showing {filteredProducts.length} of {products.length} products
                </p>
                <div class="flex items-center gap-2">
                    <button
                        class="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                        disabled
                    >
                        <Icon icon="mdi:chevron-left" class="w-5 h-5" />
                    </button>
                    <button
                        class="w-9 h-9 rounded-lg bg-primary text-white font-medium"
                        >1</button
                    >
                    <button
                        class="w-9 h-9 rounded-lg border border-gray-300 text-text-main hover:border-primary transition-colors"
                        >2</button
                    >
                    <button
                        class="w-9 h-9 rounded-lg border border-gray-300 text-text-main hover:border-primary transition-colors"
                        >3</button
                    >
                    <span class="text-text-muted">...</span>
                    <button
                        class="w-9 h-9 rounded-lg border border-gray-300 text-text-main hover:border-primary transition-colors"
                    >
                        <Icon icon="mdi:chevron-right" class="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    {/if}
</div>

<!-- <style>
    @media (prefers-reduced-motion: reduce) {
        [in:fade],
        [in:fly] {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style> -->
