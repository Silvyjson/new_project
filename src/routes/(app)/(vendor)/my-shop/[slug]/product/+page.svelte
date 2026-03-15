<!-- src/routes/(app)/(vendor)/my-shop/[slug]/product/+page.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";
    import ProductTable from "$lib/components/app/vendor/product/ProductTable.svelte";
    import ProductGrid from "$lib/components/app/vendor/product/ProductGrid.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import Input from "$lib/components/common/Input.svelte";
    import BulkUpdateModal from '$lib/components/app/vendor/product/BulkUpdateModal.svelte';
    import StockAlertBanner from '$lib/components/app/vendor/product/StockAlertBanner.svelte';
    import AppPagination from "$lib/components/app/common/AppPagination.svelte";
    import AppFilter from "$lib/components/app/common/AppFilter.svelte";


    let shopSlug = $state("");
    let shopName = $state("");
    
    $effect(() => {
        if ($page.params.slug) {
            shopSlug = $page.params.slug;
            shopName = shopSlug
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");
        }
    });


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
            lowStockThreshold: 10,
            lastUpdated: '2026-01-25'
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
            lowStockThreshold: 10,
            lastUpdated: '2026-01-20'
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
            lowStockThreshold: 10,
            lastUpdated: '2026-01-15'
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
            status: "low-stock" as const,
            category: "Sneakers",
            lowStockThreshold: 10,
            lastUpdated: '2026-01-10'
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
            lowStockThreshold: 10,
            lastUpdated: '2026-01-05'
        },
        {
            id: "p_006",
            code: "UK-VANS-006",
            name: "Vans Old Skool Black",
            image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
            price: 35000,
            discountPrice: null,
            stock: 50,
            orders: 120,
            status: "active" as const,
            category: "Sneakers",
            lowStockThreshold: 10,
            lastUpdated: '2026-02-01'
        },
        {
            id: "p_007",
            code: "UK-DRM-007",
            name: "Dr. Martens 1460",
            image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b7a",
            price: 95000,
            discountPrice: null,
            stock: 12,
            orders: 45,
            status: "active" as const,
            category: "Boots",
            lowStockThreshold: 5,
            lastUpdated: '2026-02-05'
        },
        {
            id: "p_008",
            code: "UK-TH-008",
            name: "Timberland 6-Inch Premium",
            image: "https://images.unsplash.com/photo-1520639889313-7272a74b1c73",
            price: 110000,
            discountPrice: 90000,
            stock: 4,
            orders: 89,
            status: "low-stock" as const,
            category: "Boots",
            lowStockThreshold: 10,
            lastUpdated: '2026-02-10'
        },
        {
            id: "p_009",
            code: "UK-REE-009",
            name: "Reebok Classic Leather",
            image: "https://images.unsplash.com/photo-1539185441755-769473a23570",
            price: 55000,
            discountPrice: null,
            stock: 28,
            orders: 76,
            status: "active" as const,
            category: "Sneakers",
            lowStockThreshold: 10,
            lastUpdated: '2026-02-15'
        },
        {
            id: "p_010",
            code: "UK-PU-010",
            name: "Puma Suede Classic",
            image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
            price: 48000,
            discountPrice: null,
            stock: 18,
            orders: 63,
            status: "active" as const,
            category: "Sneakers",
            lowStockThreshold: 10,
            lastUpdated: '2026-02-20'
        },
        {
            id: "p_011",
            code: "UK-AS-011",
            name: "Asics Gel-Lyte III",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
            price: 82000,
            discountPrice: null,
            stock: 9,
            orders: 34,
            status: "low-stock" as const,
            category: "Sneakers",
            lowStockThreshold: 10,
            lastUpdated: '2026-02-25'
        },
        {
            id: "p_012",
            code: "UK-NIK-012",
            name: "Nike Dunk Low Panda",
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
            price: 130000,
            discountPrice: null,
            stock: 0,
            orders: 200,
            status: "out-of-stock" as const,
            category: "Sneakers",
            lowStockThreshold: 20,
            lastUpdated: '2026-03-01'
        }
    ];

    // View mode
    let viewMode = $state<"table" | "grid">("table");

    // Pagination
    let currentPage = $state(1);
    let itemsPerPage = 10;

    // Filters
    let searchQuery = $state("");
    let categoryFilter = $state("all");
    let statusFilter = $state("all");
    let sortBy = $state("newest");

    const categories = ["All", "Sneakers", "Boots", "Accessories"];
    const statuses = ["All", "Active", "Draft", "Out of Stock", "Low Stock"];

    // Filter products
    let filteredProducts = $derived(
        products.filter((product) => {
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
        })
    );

    // Paginated products
    let paginatedProducts = $derived(
        filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );

    const formattedProducts = products.map((product) => ({
        id: product.id,
        name: product.name,
        stockQuantity: product.stock,
        shop: { name: shopName } // or product.shopName if available
    }));

    let lowStockItems = $derived(formattedProducts.filter(i => i.stockQuantity <= 5 && i.stockQuantity > 0));

    const handleExportCSV = () => {
    // In real app: generate and download CSV
        alert('Exporting inventory to CSV...');
    };

    let showBulkModal = $state(false);
    let selectedItems = $state<string[]>([]);
    
    const handleBulkUpdate = () => {
        showBulkModal = true;
    };

    const handleViewLowStock = () => {
        statusFilter = 'low-stock';
        // Scroll to table
        document.querySelector('table')?.scrollIntoView({ behavior: 'smooth' });
    };
</script>

<svelte:head>
    <title>Inventory - {shopName} | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
    <!-- Back Link -->
    <div in:fade={{ duration: 400 }} class="mb-6">
        <a
            href="/my-shop/{shopSlug}"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Back to Shop
        </a>
    </div>

    <!-- Section 1: Page Header -->
    <section class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" in:fade={{ duration: 400 }}>
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon icon="mdi:cube-outline" class="w-6 h-6 text-primary" />
            </div>
            <div>
                <h1 class="text-2xl font-bold text-text-main">
                    Inventory — {shopName}
                </h1>
                <p class="text-body text-text-muted">
                    Manage and track stock levels for {products.length} products
                </p>
            </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
            <Button
                href="/my-shop/{shopSlug}/product/add"
                variant="primary"
                size="md"
            >
                <Icon icon="mdi:plus-box-outline" class="w-4 h-4 mr-2" />
                Add Product
            </Button>     
            <Button variant="outline" size="md" onclick={handleExportCSV}>
                <Icon icon="mdi:file-export-outline" class="w-4 h-4 mr-2" />
                Export CSV
            </Button>
        </div>
    </section>

      <!-- Section 2: Low Stock Alert -->
    <section in:fade={{ duration: 400, delay: 100 }}>
        <StockAlertBanner
        lowStockItems={lowStockItems}
        onViewLowStock={handleViewLowStock}
        />
    </section>

    <!-- Section 2: Product Toolbar -->
    <section in:fade={{ duration: 400, delay: 200 }}>
        <AppFilter
            bind:searchQuery
            layoutView={viewMode}
            onLayoutChange={(newMode) => viewMode = newMode as "table" | "grid"}
        >
            {#snippet extraFilters()}
                <select
                    class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-surface"
                    bind:value={categoryFilter}
                >
                    {#each categories as cat}
                        <option value={cat.toLowerCase()}>{cat}</option>
                    {/each}
                </select>

                <select
                    class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-surface"
                    bind:value={statusFilter}
                >
                    {#each statuses as status}
                        <option value={status.toLowerCase()}>{status}</option>
                    {/each}
                </select>

                <select
                    class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-surface"
                    bind:value={sortBy}
                >
                    <option value="newest">Newest</option>
                    <option value="best-selling">Best Selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>

                <Button variant="primary" size="sm" onclick={handleBulkUpdate}>
                    <Icon icon="mdi:update" class="w-4 h-4 mr-2" />
                    Bulk Update
                </Button>
            {/snippet}
        </AppFilter>
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
            <ProductTable products={paginatedProducts} {shopSlug} />
        {:else}
            <ProductGrid products={paginatedProducts} {shopSlug} />
        {/if}
    </section>

    <!-- Section 4: Pagination -->
    <AppPagination
        bind:currentPage
        totalItems={filteredProducts.length}
        {itemsPerPage}
        onPageChange={(page) => currentPage = page}
        entityName="products"
    />
</main>

<!-- Bulk Update Modal -->
{#if showBulkModal}
  <BulkUpdateModal
    onClose={() => showBulkModal = false}
    selectedItems={selectedItems}
  />
{/if}

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
 