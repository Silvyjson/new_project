<script lang="ts">
  import ProductCard from "./ProductCard.svelte";
  import Icon from "@iconify/svelte";

  export let products: any[] = [];
  export let shop: any;
  export let pagination: any = null;
  export let handlePageChange: (e: any) => void = () => {};
</script>

<div class="container max-w-7xl mx-auto px-4 py-12">
  {#if products && products.length > 0}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-900 border-2 border-slate-900 shadow-xl">
      {#each products as product (product.id)}
        <div class="bg-white">
          <ProductCard {product} shopSlug={shop?.slug} />
        </div>
      {/each}
    </div>

    <!-- Pagination -->
    {#if pagination && pagination.totalPages > 1}
      <div class="mt-16 flex justify-center items-center gap-1">
        <button 
          class="w-12 h-12 border-2 border-slate-900 flex items-center justify-center font-black hover:bg-slate-100 disabled:opacity-20 transition-all"
          disabled={pagination.currentPage === 1}
          on:click={() => handlePageChange({ detail: { page: pagination.currentPage - 1 } })}
        >
          <Icon icon="lucide:arrow-left" class="w-4 h-4" />
        </button>

        {#each Array(pagination.totalPages) as _, i}
          {@const pageNum = i + 1}
          <button 
            class="w-12 h-12 border-2 border-slate-900 font-black text-xs transition-all
            {pagination.currentPage === pageNum ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-100'}"
            on:click={() => handlePageChange({ detail: { page: pageNum } })}
          >
            {pageNum}
          </button>
        {/each}

        <button 
          class="w-12 h-12 border-2 border-slate-900 flex items-center justify-center font-black hover:bg-slate-100 disabled:opacity-20 transition-all"
          disabled={pagination.currentPage === pagination.totalPages}
          on:click={() => handlePageChange({ detail: { page: pagination.currentPage + 1 } })}
        >
          <Icon icon="lucide:arrow-right" class="w-4 h-4" />
        </button>
      </div>
    {/if}
  {:else}
    <div class="py-32 flex flex-col items-center text-center border-4 border-dashed border-slate-200 rounded-3xl">
      <h3 class="text-2xl font-black uppercase text-slate-300 tracking-tighter">NO ITEMS FOUND</h3>
    </div>
  {/if}
</div>
