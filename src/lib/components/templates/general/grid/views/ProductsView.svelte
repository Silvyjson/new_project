<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount, tick, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import ProductGrid from "../components/ProductGrid.svelte";
  import Button from "$lib/components/common/Button.svelte";

  export let data: any;

  $: ({
    shop = {},
    products = [],
    totalProducts = 0,
    categories = [],
    filters = {},
    pagination = { currentPage: 1, totalPages: 1 },
  } = data || {});

  let searchQuery = filters?.search || "";
  let selectedCategory = filters?.category || "";
  let sortBy = filters?.sortBy || "newest";

  const updateFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (sortBy && sortBy !== "newest") params.set("sort", sortBy);
    
    goto(`/shop/${shop.slug}/product?${params.toString()}`, {
      replaceState: true,
      noScroll: true
    });
  };

  const clearAllFilters = () => {
    searchQuery = "";
    selectedCategory = "";
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
</script>

<div class="bg-[#f8fafc] min-h-screen pt-12 pb-24">
  <div class="container max-w-7xl mx-auto px-4">
    <!-- Header -->
    <div class="border-4 border-slate-900 bg-white p-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-8 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
      <div class="space-y-4">
        <h1 class="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">DIRECTORY</h1>
        <p class="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Listing {totalProducts} items from {shop?.name}</p>
      </div>
      
      <div class="w-full md:w-auto flex flex-col sm:flex-row gap-4">
        <div class="relative w-full sm:w-64 border-2 border-slate-900">
           <input 
             type="text" 
             placeholder="SEARCH" 
             class="w-full h-12 px-10 text-xs font-black uppercase focus:outline-none"
             bind:value={searchQuery}
             on:input={handleSearchInput}
           />
           <Icon icon="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
        </div>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="border-2 border-slate-900 bg-white p-4 mb-2 flex flex-wrap gap-4 items-center justify-between shadow-md">
      <div class="flex flex-wrap gap-2">
         <button 
           class="px-4 py-2 border-2 border-slate-900 text-[10px] font-black uppercase tracking-widest transition-all
           {selectedCategory === '' ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50 text-slate-900'}"
           on:click={() => { selectedCategory = ''; updateFilters(); }}
         >
           ALL
         </button>
         {#each categories as category}
           <button 
             class="px-4 py-2 border-2 border-slate-900 text-[10px] font-black uppercase tracking-widest transition-all
             {selectedCategory === category ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50 text-slate-900'}"
             on:click={() => { selectedCategory = category; updateFilters(); }}
           >
             {category}
           </button>
         {/each}
      </div>

      <div class="flex items-center gap-4">
         <span class="text-[9px] font-black uppercase text-slate-400">Sort:</span>
         <select 
           class="bg-white text-xs font-black p-2 border-2 border-slate-900 uppercase focus:outline-none"
           bind:value={sortBy}
           on:change={updateFilters}
         >
            <option value="newest">NEWEST</option>
            <option value="price-asc">PRICE: LOW</option>
            <option value="price-desc">PRICE: HIGH</option>
            <option value="popular">POPULAR</option>
         </select>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="bg-[#e2e8f0] p-1 border-2 border-slate-900">
       <ProductGrid 
         {products} 
         {shop} 
         {pagination} 
         {handlePageChange} 
       />
    </div>
  </div>
</div>
