<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount, tick, onDestroy } from "svelte";
    import Icon from "@iconify/svelte";
    import { fly, fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Components
    import ProductGrid from "../components/ProductGrid.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import Button from "$lib/components/common/Button.svelte";

    // Types
    export let data: any;

    $: ({
        shop = {},
        products = [],
        totalProducts = 0,
        categories = [],
        filters = {},
        pagination = { currentPage: 1, totalPages: 1 },
    } = data || {});

    // Local filter state
    let searchQuery = filters?.search || "";
    let selectedCategory = filters?.category || "";
    let minPrice = filters?.minPrice || "";
    let maxPrice = filters?.maxPrice || "";
    let sortBy = filters?.sortBy || "newest";
    let viewMode = filters?.viewMode || "grid";

    // Mobile filter drawer state
    let showMobileFilters = false;

    // Navigation and Filtering Logic
    const updateFilters = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (selectedCategory) params.set("category", selectedCategory);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (sortBy && sortBy !== "newest") params.set("sort", sortBy);
        if (viewMode && viewMode !== "grid") params.set("view", viewMode);
        
        goto(`/shop/${shop.slug}/product?${params.toString()}`, {
            replaceState: true,
            noScroll: true
        });
    };

    const clearAllFilters = () => {
        searchQuery = "";
        selectedCategory = "";
        minPrice = "";
        maxPrice = "";
        sortBy = "newest";
        updateFilters();
    };

    const handlePageChange = (e: CustomEvent) => {
        const params = new URLSearchParams($page.url.searchParams);
        params.set("page", e.detail.page.toString());
        goto(`/shop/${shop.slug}/product?${params.toString()}`, {
            replaceState: true,
        });
    };

    let searchTimeout: ReturnType<typeof setTimeout>;
    const handleSearchInput = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(updateFilters, 500);
    };

    // Lifecycle
    onMount(() => {
        // Scroll to top on load for the products page
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    onDestroy(() => {
        clearTimeout(searchTimeout);
    });

    const sortOptions = [
        { label: "Newest Arrivals", value: "newest" },
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
        { label: "Most Popular", value: "popular" }
    ];
</script>

<div class="pt-32 pb-20">
    <div class="container max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16" in:fly={{ y: 20, duration: 600 }}>
            <div class="space-y-4">
                <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <a href="/shop/{shop?.slug}" class="hover:text-primary-400">Home</a>
                    <Icon icon="lucide:chevron-right" class="w-2.5 h-2.5" />
                    <span class="text-white">Products</span>
                </nav>
                <h1 class="text-5xl md:text-6xl font-black text-white tracking-tighter">Our Collection</h1>
                <p class="text-slate-400">Showing {products?.length} of {totalProducts} results in this shop.</p>
            </div>

            <!-- Modern Search & Filter Controls -->
            <div class="flex flex-col sm:flex-row items-center gap-4">
                <div class="relative w-full sm:w-72">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        class="w-full bg-slate-900 border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:outline-none focus:border-primary-500/50 transition-all shadow-xl"
                        bind:value={searchQuery}
                        on:input={handleSearchInput}
                    />
                    <Icon icon="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                </div>
                
                <button 
                    on:click={() => (showMobileFilters = true)}
                    class="lg:hidden w-full sm:w-auto px-6 h-14 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                    <Icon icon="lucide:sliders-horizontal" class="w-5 h-5" />
                    Filters
                </button>
            </div>
        </div>

        <div class="flex gap-12">
            <!-- Sidebar Filters (Desktop) -->
            <aside class="hidden lg:block w-72 space-y-12 flex-shrink-0" in:fly={{ x: -20, duration: 800 }}>
                <!-- Categories -->
                <div class="space-y-6">
                    <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Categories</h3>
                    <div class="space-y-2">
                        <button 
                            class="w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm
                            {selectedCategory === '' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-slate-400 hover:text-white'}"
                            on:click={() => { selectedCategory = ''; updateFilters(); }}
                        >
                            All Categories
                        </button>
                        {#each categories as category}
                            <button 
                                class="w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm
                                {selectedCategory === category ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-slate-400 hover:text-white'}"
                                on:click={() => { selectedCategory = category; updateFilters(); }}
                            >
                                {category}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Sort By -->
                <div class="space-y-6">
                    <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Sort By</h3>
                    <div class="relative">
                        <select 
                            class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-slate-400 text-sm focus:outline-none focus:border-primary-500/30 transition-all appearance-none"
                            bind:value={sortBy}
                            on:change={updateFilters}
                        >
                            {#each sortOptions as option}
                                <option value={option.value}>{option.label}</option>
                            {/each}
                        </select>
                        <Icon icon="lucide:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-500" />
                    </div>
                </div>

                <!-- Price Range -->
                <div class="space-y-6">
                    <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Price Range</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <input 
                            type="number" 
                            placeholder="Min" 
                            class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/30 transition-all"
                            bind:value={minPrice}
                            on:change={updateFilters}
                        />
                        <input 
                            type="number" 
                            placeholder="Max" 
                            class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/30 transition-all"
                            bind:value={maxPrice}
                            on:change={updateFilters}
                        />
                    </div>
                </div>

                <!-- Clear Button -->
                {#if searchQuery || selectedCategory || minPrice || maxPrice || sortBy !== 'newest'}
                    <button 
                        class="w-full py-4 text-[10px] font-black text-primary-400 hover:text-primary-300 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                        on:click={clearAllFilters}
                    >
                        <Icon icon="lucide:rotate-ccw" class="w-4 h-4" />
                        Reset All Filters
                    </button>
                {/if}
            </aside>

            <!-- Product Grid Content -->
            <div class="flex-1">
                {#if products && products.length > 0}
                    <div in:fade={{ duration: 400 }}>
                        <ProductGrid
                            {products}
                            {shop}
                            {pagination}
                            {viewMode}
                            {handlePageChange}
                            {clearAllFilters}
                        />
                    </div>
                {:else}
                    <div class="flex flex-col items-center justify-center py-40 text-center" in:scale={{ duration: 400 }}>
                        <div class="w-24 h-24 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-6">
                            <Icon icon="lucide:search-x" class="w-10 h-10 text-slate-700" />
                        </div>
                        <h2 class="text-2xl font-black text-white mb-4 tracking-tight">No products found</h2>
                        <p class="text-slate-500 max-w-xs mb-8">Try adjusting your filters or search terms to find what you're looking for.</p>
                        <Button variant="primary" on:click={clearAllFilters} className="rounded-2xl px-10 h-14 font-bold shadow-2xl shadow-primary-500/20">
                            Clear Filters
                        </Button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<!-- Mobile Filters Drawer -->
{#if showMobileFilters}
    <div class="fixed inset-0 z-[200] lg:hidden" in:fade={{ duration: 200 }}>
        <!-- Overlay -->
        <button 
            type="button" 
            class="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm" 
            on:click={() => (showMobileFilters = false)}
            aria-label="Close"
        ></button>
        
        <!-- Drawer Panel -->
        <div 
            class="absolute right-0 top-0 h-full w-full max-w-sm bg-slate-950 border-l border-white/10 shadow-2xl overflow-y-auto px-6 py-8 flex flex-col"
            in:fly={{ x: 300, duration: 400, easing: cubicOut }}
        >
            <div class="flex items-center justify-between mb-12">
                <h2 class="text-xl font-black text-white tracking-tighter">FILTERS</h2>
                <button 
                    on:click={() => (showMobileFilters = false)}
                    class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                    <Icon icon="lucide:x" class="w-5 h-5" />
                </button>
            </div>

            <!-- Mobile Categories -->
            <div class="space-y-8 flex-1">
                <div class="space-y-6">
                    <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Category</h3>
                    <div class="grid grid-cols-2 gap-2">
                        <button 
                            class="px-4 py-3 rounded-xl text-xs font-bold transition-all
                            {selectedCategory === '' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'bg-white/5 text-slate-400'}"
                            on:click={() => { selectedCategory = ''; updateFilters(); }}
                        >
                            All
                        </button>
                        {#each categories as category}
                            <button 
                                class="px-4 py-3 rounded-xl text-xs font-bold transition-all
                                {selectedCategory === category ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'bg-white/5 text-slate-400'}"
                                on:click={() => { selectedCategory = category; updateFilters(); }}
                            >
                                {category}
                            </button>
                        {/each}
                    </div>
                </div>

                <div class="space-y-6">
                    <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Sort Results</h3>
                    {#each sortOptions as option}
                        <button 
                            class="w-full flex items-center justify-between px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium transition-all
                            {sortBy === option.value ? 'border-primary-500 text-primary-400' : 'text-slate-400'}"
                            on:click={() => { sortBy = option.value; updateFilters(); }}
                        >
                            {option.label}
                            {#if sortBy === option.value}
                                <Icon icon="lucide:check" class="w-4 h-4" />
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="mt-auto pt-10 grid grid-cols-2 gap-4">
                <Button 
                    variant="outline" 
                    className="rounded-2xl h-14 border-white/10 text-white font-black uppercase tracking-widest text-xs"
                    on:click={clearAllFilters}
                >
                    Reset
                </Button>
                <Button 
                    variant="primary" 
                    className="rounded-2xl h-14 font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary-500/20"
                    on:click={() => (showMobileFilters = false)}
                >
                    Apply
                </Button>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Styling for the custom range track or other specifics */
    :global(.animate-fade-in) {
        animation: fade-in 0.6s ease-out forwards;
    }

    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
