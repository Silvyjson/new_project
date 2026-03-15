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
    import BlogGrid from "$lib/components/app/grid/BlogGrid.svelte";
    import AppFilter from "$lib/components/app/common/AppFilter.svelte";
    import Icon from "@iconify/svelte";
    import { auth } from "$lib/state/auth.svelte";

    // Data from load function
    let { data }: { data: PageData } = $props();

    // Local filter state
    let searchQuery = $state(data.filters.search);
    let selectedCategory = $state(data.filters.category);
    let selectedVendor = $state(data.filters.vendor);
    let sortBy = $state(data.filters.sortBy);

    // Slideshow state
    let currentSlide = $state(0);
    let slideInterval: ReturnType<typeof setInterval>;

    $effect(() => {
        if (data.featuredPosts.length > 1) {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % data.featuredPosts.length;
            }, 30000); // 30 seconds
            return () => clearInterval(slideInterval);
        }
    });

    // Filter chips
    let activeChips = $derived.by(() => {
        const chips: Array<{ type: string; value: string; label: string }> = [];
        if (selectedCategory && selectedCategory !== "all") {
            const cat = data.categories.find((c) => c.id === selectedCategory);
            chips.push({
                type: "category",
                value: selectedCategory,
                label: cat?.label || selectedCategory,
            });
        }
        if (selectedVendor) {
            const vendor = data.vendors.find((v) => v.slug === selectedVendor);
            chips.push({
                type: "vendor",
                value: selectedVendor,
                label: vendor?.name || selectedVendor,
            });
        }
        return chips;
    });

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
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta name="description" content={data.meta.description} />
    <meta property="og:title" content={data.meta.title} />
    <meta property="og:description" content={data.meta.description} />
</svelte:head>

<main class="min-h-screen bg-soft-background">
    <!-- 🔷 SECTION 1: FEATURED POSTS SLIDESHOW -->
    {#if data.featuredPosts.length > 0}
        <section class="bg-surface overflow-hidden relative group">
            <div 
                class="flex transition-transform duration-700 ease-in-out" 
                style="transform: translateX(-{currentSlide * 100}%)"
            >
                {#each data.featuredPosts as post}
                    <div class="w-full flex-shrink-0">
                        <div class="max-w-7xl mx-auto px-4 py-8 md:py-16">
                            <Card
                                padding="none"
                                className="overflow-hidden border border-gray-100 shadow-sm"
                            >
                                <div class="grid md:grid-cols-2">
                                    <div class="relative h-64 md:h-[450px]">
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
                                    <div class="p-8 md:p-12 flex flex-col justify-center">
                                        <h2 class="text-2xl md:text-4xl font-bold text-text-main mb-6 hover:text-primary transition-colors">
                                            <a href="/blog/{post.slug}">{post.title}</a>
                                        </h2>
                                        <p class="text-lg text-text-muted mb-8 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div class="flex items-center gap-4 mb-8">
                                            <img
                                                src={post.author.logo}
                                                alt={post.author.name}
                                                class="w-12 h-12 rounded-full object-cover shadow-sm"
                                            />
                                            <div>
                                                <span class="font-semibold text-text-main">{post.author.name}</span>
                                                <p class="text-sm text-text-muted">
                                                    {formatDate(post.publishedAt)} • {post.readTime} min read
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex gap-4">
                                            <Button href="/blog/{post.slug}" variant="primary" size="lg">Read Article</Button>
                                            {#if post.linkedShop}
                                                <Button href="/shop/{post.linkedShop.slug}" variant="outline" size="lg">Visit Shop</Button>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Slideshow Dots -->
            {#if data.featuredPosts.length > 1}
                <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {#each data.featuredPosts as _, i}
                        <button 
                            onclick={() => currentSlide = i}
                            class="w-2.5 h-2.5 rounded-full transition-all {currentSlide === i ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'}"
                            aria-label="Go to slide {i + 1}"
                        ></button>
                    {/each}
                </div>
            {/if}
        </section>
    {/if}

    <!-- 🔷 SECTION 2: DISCOVERY AREA (Hero & Filter) -->
    <section class="bg-surface border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 py-8 md:py-12">
            {#if auth.isLoggedIn}
                <!-- Standardized Page Header (Logged-in) -->
                <div class="flex items-center gap-4 mb-8" in:fade={{ duration: 400 }}>
                    <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon icon="mdi:post-outline" class="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-text-main">Blog & News</h1>
                        <p class="text-body text-text-muted">
                            Discover insights, updates, and community stories.
                        </p>
                    </div>
                </div>
            {:else}
                <!-- Hero Section (Public) -->
                <div class="text-center mb-10 animate-fade-in">
                    <h1 class="text-3xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">
                        Insights and Ideas
                    </h1>
                    <p class="text-xl text-text-muted max-w-2xl mx-auto mb-10">
                        New releases, updates, and expert vendor insights.
                    </p>
                </div>
            {/if}

            {#snippet extraFilters()}
                <div class="flex flex-wrap items-center gap-3">
                    <!-- Vendor Filter -->
                    <select
                        class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        bind:value={selectedVendor}
                        onchange={updateFilters}
                    >
                        <option value="">All Vendors</option>
                        {#each data.vendors as vendor}
                            <option value={vendor.slug}>{vendor.name}</option>
                        {/each}
                    </select>

                    <!-- Sort -->
                    <select
                        class="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                        bind:value={sortBy}
                        onchange={updateFilters}
                    >
                        <option value="recent">Most Recent</option>
                        <option value="popular">Most Read</option>
                        <option value="read-time">Shortest Read</option>
                    </select>
                </div>
            {/snippet}

            {#snippet categoryTabs()}
                <div class="flex flex-wrap items-center gap-2 {auth.isLoggedIn ? '' : 'justify-center'}">
                    <button
                        onclick={() => { selectedCategory = "all"; updateFilters(); }}
                        class="px-4 py-2 rounded-full text-sm font-medium transition-colors
                        {selectedCategory === 'all' || !selectedCategory ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-text-muted hover:border-primary hover:text-primary'}"
                    >All</button>
                    {#each data.categories as cat}
                        <button
                            onclick={() => { selectedCategory = cat.id; updateFilters(); }}
                            class="px-4 py-2 rounded-full text-sm font-medium transition-colors
                            {selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-text-muted hover:border-primary hover:text-primary'}"
                        >{cat.label}</button>
                    {/each}
                </div>
            {/snippet}

            <div class="max-w-4xl {auth.isLoggedIn ? '' : 'mx-auto'}">
                <AppFilter
                    bind:searchQuery
                    placeholder="Search blog articles..."
                    onSearchInput={handleSearch}
                    {extraFilters}
                    {activeChips}
                    onRemoveChip={removeChip}
                    onClearAll={clearAllFilters}
                    categories={categoryTabs}
                />
            </div>
        </div>
    </section>
 
    <!-- 🔷 SECTION 3: BLOG GRID -->
    <section class="py-12 bg-soft-background">
        <div class="container max-w-7xl mx-auto px-4">
            {#if data.posts.length > 0}
                <BlogGrid
                    posts={data.posts}
                    {updateFilters}
                    {searchQuery}
                    {selectedCategory}
                    {selectedVendor}
                />
            {:else}
                <div class="text-center py-20">
                    <Icon icon="mdi:post-outline" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 class="text-xl font-semibold text-text-main">No articles found</h3>
                    <p class="text-text-muted mt-2">Try adjusting your filters or search query.</p>
                    <Button variant="outline" className="mt-6" onclick={clearAllFilters}>Clear all filters</Button>
                </div>
            {/if}
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
