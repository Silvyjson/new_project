<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import TrustBadge from "$lib/components/common/TrustBadge.svelte";
    import BlogGrid from "$lib/components/app/grid/BlogGrid.svelte";
    import AppFilter from "$lib/components/app/common/AppFilter.svelte";
    import Icon from "@iconify/svelte";
    import { auth } from "$lib/state/auth.svelte";
  import { onMount } from "svelte";

    // Data from load function
    export let data: PageData;
    $: ({ posts, categories, vendors, featuredPosts, filters, meta, pagination } = data);

    // Local filter state
    let searchQuery = data.filters.search;
    let selectedCategory = data.filters.category;
    let selectedVendor = data.filters.vendor;
    let sortBy = data.filters.sortBy;

    // Filter chips
    let activeChips: Array<{ type: string; value: string; label: string }> = [];
    $: {
        activeChips = [];
        if (selectedCategory && selectedCategory !== "all") {
            const cat = categories.find((c) => c.id === selectedCategory);
            activeChips.push({
                type: "category",
                value: selectedCategory,
                label: cat?.label || selectedCategory,
            });
        }
        if (selectedVendor) {
            const vendor = vendors.find((v) => v.slug === selectedVendor);
            activeChips.push({
                type: "vendor",
                value: selectedVendor,
                label: vendor?.name || selectedVendor,
            });
        }
    }

    // Debounced search
    let searchTimeout: ReturnType<typeof setTimeout>;

    const handleSearch = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            updateFilters();
        }, 300);
    };

    const handlePageChange = (p: number) => {
        const params = new URLSearchParams($page.url.searchParams);
        params.set("page", p.toString());
        goto(`/blog?${params.toString()}`, { replaceState: true });
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

    const removeChip = (chip: { type: string; value: string }) => {
        if (chip.type === "category") selectedCategory = "all";
        if (chip.type === "vendor") selectedVendor = "";
        updateFilters();
    };

    const clearAllFilters = () => {
        searchQuery = "";
        selectedCategory = "all";
        selectedVendor = "";
        sortBy = "recent";
        updateFilters();
    };

    // Format date
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    let aside = false;

    onMount(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const update = () => {
        aside = media.matches;
    };

    update(); // run once
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
    });
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
</svelte:head>

<main class="max-w-7xl mx-auto min-h-screen bg-soft-background">
    <!-- 🔷 HERO & FILTER SECTION -->
    <section class="bg-surface px-4 py-8 md:py-12">
        {#if auth.isLoggedIn}
            <!-- Standardized Page Header (Logged-in) -->
            <div class="flex items-center gap-4 mb-8" in:fade={{ duration: 400 }}>
                <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon icon="mdi:post-outline" class="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-text-main">Blog & News</h1>
                    <p class="text-body text-text-muted">
                        Discover insights, release updates, and vendor stories from the community.
                    </p>
                </div>
            </div>
        {:else}
            <!-- Hero Section (Public) -->
            <div class="text-center mb-10 animate-fade-in">
                <h1 class="md:text-h1 text-h3  font-bold text-text-main mb-4">
                    Discover <span class="text-primary border-b-4 border-primary/30">insights</span> and ideas
                </h1>
                <p class="text-lg text-text-muted max-w-2xl mx-auto">
                    Discover new releases, vendor updates, and product launches.
                </p>
            </div>
        {/if}
    </section>

    <!-- 🔷 SECTION 2: FEATURED POST -->
    {#if featuredPosts.length > 0}
        <section class="bg-surface px-4">
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
        </section>
    {/if}

    <div class="relative flex w-full flex-col lg:flex-row py-10 gap-10 lg:gap-5">
        <!-- 🔷 SECTION: APP FILTER SNIPPET -->
        <section class="bg-surface px-4 md:w-100 lg:w-[280px] lg:shrink-0 lg:self-start lg:sticky lg:top-20 h-fit">
            <AppFilter
                bind:searchQuery
                placeholder="Search blog articles..."
                onSearchInput={handleSearch}
                {activeChips}
                onRemoveChip={removeChip}
                onClearAll={clearAllFilters}
                {aside}
            >
                {#snippet extraFilters()}
                    <div class="flex flex-wrap w-full lg:flex-col lg:items-center gap-3">
                        <!-- Vendor Filter -->
                        <select
                            class="lg:w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            bind:value={selectedVendor}
                            onchange={updateFilters}
                        >
                            <option value="">All Vendors</option>
                            {#each vendors as vendor}
                                <option value={vendor.slug}>{vendor.name}</option>
                            {/each}
                        </select>

                        <!-- Category Filter -->
                        <select
                            class="lg:w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            bind:value={selectedCategory}
                            onchange={updateFilters}
                        >
                            <option value="">All Categories</option>
                            {#each categories as cat}
                                <option value={cat.id}>{cat.label}</option>
                            {/each}
                        </select>

                        <!-- Sort -->
                        <select
                            class="lg:w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            bind:value={sortBy}
                            onchange={updateFilters}
                        >
                            <option value="recent">Most Recent</option>
                            <option value="popular">Most Read</option>
                            <option value="read-time">Shortest Read</option>
                        </select>
                    </div>
                {/snippet}
            </AppFilter>
        </section>
    
        <!-- 🔷 SECTION 3: BLOG GRID -->
        <BlogGrid
            {posts}
            {pagination}
            onPageChange={handlePageChange}
            {updateFilters}
            {searchQuery}
            {selectedCategory}
            {selectedVendor}
        />
    </div>
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
