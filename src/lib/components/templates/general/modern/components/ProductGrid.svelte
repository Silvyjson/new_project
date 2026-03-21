<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import ProductCard from "./ProductCard.svelte";
  import Button from "$lib/components/common/Button.svelte";
  import Icon from "@iconify/svelte";

  export let products: any[] = [];
  export let shop: any;
  export let pagination: any = null;
  export let handlePageChange: (e: any) => void = () => {};
  export let clearAllFilters: () => void = () => {};
</script>

<div class="container max-w-7xl mx-auto px-4 py-12">
  {#if products && products.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {#each products as product, i (product.id)}
        <div 
          in:fly={{ y: 30, duration: 800, delay: i * 50, easing: cubicOut }}
          class="h-full"
        >
          <ProductCard {product} shopSlug={shop?.slug} />
        </div>
      {/each}
    </div>

    <!-- Modern Pagination -->
    {#if pagination && pagination.totalPages > 1}
      <div class="mt-20 flex justify-center items-center gap-3">
        <button 
          class="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-slate-400 hover:border-primary-500 hover:text-white disabled:opacity-30 disabled:hover:border-white/10 transition-all"
          disabled={pagination.currentPage === 1}
          on:click={() => handlePageChange({ detail: { page: pagination.currentPage - 1 } })}
        >
          <Icon icon="lucide:chevron-left" class="w-5 h-5" />
        </button>

        <div class="flex gap-2">
          {#each Array(pagination.totalPages) as _, i}
            {@const pageNum = i + 1}
            <button 
              class="w-12 h-12 rounded-2xl font-bold transition-all border
              {pagination.currentPage === pageNum 
                ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/20' 
                : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}"
              on:click={() => handlePageChange({ detail: { page: pageNum } })}
            >
              {pageNum}
            </button>
          {/each}
        </div>

        <button 
          class="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-slate-400 hover:border-primary-500 hover:text-white disabled:opacity-30 disabled:hover:border-white/10 transition-all"
          disabled={pagination.currentPage === pagination.totalPages}
          on:click={() => handlePageChange({ detail: { page: pagination.currentPage + 1 } })}
        >
          <Icon icon="lucide:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    {/if}
  {:else}
    <!-- Empty State -->
    <div 
      class="py-32 flex flex-col items-center text-center animate-fade-in"
      in:fly={{ y: 20, duration: 600 }}
    >
      <div class="w-24 h-24 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-6 shadow-2xl">
        <Icon icon="lucide:search-x" class="w-10 h-10 text-slate-600" />
      </div>
      <h3 class="text-2xl font-bold text-white mb-2">No matching products</h3>
      <p class="text-slate-500 max-w-sm mx-auto mb-8">
        We couldn't find anything matching your current filters. Try adjusting your search or clearing filters.
      </p>
      <Button variant="primary" on:click={clearAllFilters} className="rounded-xl px-8 h-12 shadow-lg shadow-primary-500/20">
        Clear All Filters
      </Button>
    </div>
  {/if}
</div>
