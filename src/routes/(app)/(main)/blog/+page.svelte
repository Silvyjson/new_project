<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import TrustBadge from "$lib/components/common/TrustBadge.svelte";
    import BlogGrid from "$lib/components/grid/BlogGrid.svelte";

    // Data from load function
    export let data: PageData;
    const { posts, categories, vendors, featuredPosts, filters, meta } = data;

    // Local filter state
    let searchQuery = filters.search;
    let selectedCategory = filters.category;
    let selectedVendor = filters.vendor;
    let sortBy = filters.sortBy;

    // Debounced search
    let searchTimeout: ReturnType<typeof setTimeout>;

    const handleSearch = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            updateFilters();
        }, 300);
    };

    // Update URL with filters
    const updateFilters = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (selectedCategory && selectedCategory !== "all")
            params.set("category", selectedCategory);
        if (selectedVendor) params.set("vendor", selectedVendor);
        if (sortBy && sortBy !== "recent") params.set("sort", sortBy);
        goto(`/blog?${params.toString()}`, { replaceState: true });
    };

    // Format date
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    // Get category color class
    const getCategoryColorClass = (
        color: string,
    ): "default" | "success" | "warning" | "danger" | "info" => {
        const colors: Record<
            string,
            "default" | "success" | "warning" | "danger" | "info"
        > = {
            indigo: "info",
            purple: "default",
            blue: "info",
            success: "success",
            gray: "default",
        };
        return colors[color] || "default";
    };
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
</svelte:head>

<main class="min-h-screen bg-soft-background">
    <!-- 🔷 SECTION 1: HERO SECTION -->
    <section class="py-16 bg-soft-background">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="text-center mb-10 animate-fade-in">
                <h1 class="md:text-h2 text-h3 font-bold text-text-main mb-4">
                    Discover insights and ideas
                </h1>
                <p class="text-lg text-text-muted max-w-2xl mx-auto">
                    Discover new releases, vendor updates, and product launches.
                </p>
            </div>

            <!-- Search Bar -->
            <div class="relative max-w-2xl mx-auto mb-8">
                <svg
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
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
                <input
                    type="text"
                    placeholder="Search blog articles..."
                    class="w-full pl-12 pr-4 h-[50px] rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-body shadow-sm"
                    bind:value={searchQuery}
                    on:input={handleSearch}
                />
            </div>

            <!-- Category Tabs -->
            <div class="flex flex-wrap justify-center gap-2 mb-8">
                {#each categories as cat}
                    <button
                        on:click={() => {
                            selectedCategory = cat.id;
                            updateFilters();
                        }}
                        class="px-4 py-2 rounded-full text-sm font-medium transition-colors
                   {selectedCategory === cat.id
                            ? 'bg-primary text-white'
                            : 'bg-white border border-gray-200 text-text-muted hover:border-primary hover:text-primary'}"
                    >
                        {cat.label}
                    </button>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 2: FEATURED POST -->
    {#if featuredPosts.length > 0}
        <section class="py-8 bg-surface">
            <div class="container max-w-7xl mx-auto px-4">
                {#each featuredPosts as post}
                    <Card
                        hover={true}
                        padding="none"
                        className="overflow-hidden border border-gray-200"
                    >
                        <div class="grid md:grid-cols-2">
                            <!-- Image -->
                            <div class="relative h-64 md:h-auto">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    class="w-full h-full object-cover"
                                />
                                <Badge
                                    variant="info"
                                    className="absolute top-4 left-4"
                                >
                                    {post.category}
                                </Badge>
                            </div>

                            <!-- Content -->
                            <div
                                class="p-4 md:p-8 flex flex-col justify-center"
                            >
                                <h2
                                    class="text-xl md:text-2xl lg:text-3xl font-bold text-text-main mb-4 hover:text-primary transition-colors"
                                >
                                    <a href="/blog/{post.slug}">{post.title}</a>
                                </h2>
                                <p
                                    class="text-body text-text-muted mb-6 line-clamp-3"
                                >
                                    {post.excerpt}
                                </p>

                                <!-- Author -->
                                <div class="flex items-center gap-3 mb-6">
                                    <img
                                        src={post.author.logo ||
                                            post.author.logo}
                                        alt={post.author.name ||
                                            post.author.name}
                                        class="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <span
                                            class="text-sm font-semibold text-text-main"
                                            >{post.author.name}</span
                                        >
                                        <p class="text-xs text-text-muted">
                                            {formatDate(post.publishedAt)} • {post.readTime}
                                            min read
                                        </p>
                                    </div>
                                </div>

                                <!-- Actions -->
                                <div class="flex gap-3">
                                    <Button
                                        href="/blog/{post.slug}"
                                        variant="primary"
                                        size="md">Read Article</Button
                                    >
                                    {#if post.linkedShop}
                                        <Button
                                            href="/shop/{post.linkedShop.slug}"
                                            variant="outline"
                                            size="md">Visit Shop</Button
                                        >
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </Card>
                {/each}
            </div>
        </section>
    {/if}

    <!-- 🔷 SECTION 3: BLOG GRID + FILTER SIDEBAR -->
    <section class="py-12 bg-soft-background">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="grid lg:grid-cols-4 gap-8">
                <!-- Sidebar Filters (Desktop) -->
                <aside class="hidden lg:block space-y-6">
                    <Card padding="md" className="sticky top-24">
                        <h3 class="text-h4 font-semibold text-text-main mb-4">
                            Filter By
                        </h3>

                        <!-- Vendor Filter -->
                        <div class="mb-6">
                            <label
                                for="vendor-filter"
                                class="block text-sm font-medium text-text-main mb-2"
                                >Vendor</label
                            >
                            <select
                                id="vendor-filter"
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                bind:value={selectedVendor}
                                on:change={updateFilters}
                            >
                                <option value="">All Vendors</option>
                                {#each vendors as vendor}
                                    <option value={vendor.slug}
                                        >{vendor.name}</option
                                    >
                                {/each}
                            </select>
                        </div>

                        <!-- Trust Score Filter -->
                        <div class="mb-6">
                            <label
                                for="trust-filter"
                                class="block text-sm font-medium text-text-main mb-2"
                                >Min Trust Score</label
                            >
                            <select
                                id="trust-filter"
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                on:change={(e) => {
                                    /* Add trust filter logic */
                                }}
                            >
                                <option value="">Any</option>
                                <option value="90">90+ Excellent</option>
                                <option value="80">80+ Great</option>
                                <option value="70">70+ Good</option>
                            </select>
                        </div>

                        <!-- Sort -->
                        <div>
                            <label
                                for="sort-filter"
                                class="block text-sm font-medium text-text-main mb-2"
                                >Sort By</label
                            >
                            <select
                                id="sort-filter"
                                class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                bind:value={sortBy}
                                on:change={updateFilters}
                            >
                                <option value="recent">Most Recent</option>
                                <option value="popular">Most Read</option>
                                <option value="read-time">Shortest Read</option>
                            </select>
                        </div>
                    </Card>
                </aside>

                <!-- Blog Grid -->
                <div class="lg:col-span-3">
                    {#if posts.length > 0}
                        <BlogGrid
                            {posts}
                            {formatDate}
                            {getCategoryColorClass}
                            {updateFilters}
                            {searchQuery}
                            {selectedCategory}
                            {selectedVendor}
                        />
                    {/if}
                </div>
            </div>
        </div>
    </section>
</main>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
        opacity: 0;
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>
