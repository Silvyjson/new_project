<!-- src/lib/components/common/AppPagination.svelte -->
<script lang="ts">
  import Icon from "@iconify/svelte";
  import { fade } from "svelte/transition";

  interface Props {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    entityName?: string;
  }

  let { 
    currentPage = $bindable(), 
    totalItems, 
    itemsPerPage, 
    onPageChange,
    entityName = "products"
  }: Props = $props();

  let totalPages = $derived(Math.ceil(totalItems / itemsPerPage));
  let startItem = $derived((currentPage - 1) * itemsPerPage + 1);
  let endItem = $derived(Math.min(currentPage * itemsPerPage, totalItems));

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  }

  // Calculate visible page numbers
  let visiblePages = $derived.by(() => {
    const pages: (number | string)[] = [];
    const window = 1; // Number of pages around current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - window && i <= currentPage + window)
      ) {
        if (pages.length > 0 && (i as number) - (pages[pages.length - 1] as number) > 1) {
          pages.push("...");
        }
        pages.push(i);
      }
    }
    return pages;
  });
</script>

{#if totalPages > 1}
  <section in:fade={{ duration: 400, delay: 400 }}>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
      <p class="text-sm text-text-muted">
        Showing <span class="font-medium text-text-main">{startItem}</span> to 
        <span class="font-medium text-text-main">{endItem}</span> of 
        <span class="font-medium text-text-main">{totalItems}</span> {entityName}
      </p>
      
      <div class="flex items-center gap-2 justify-end">
        <!-- Previous Button -->
        <button
          onclick={() => handlePageChange(currentPage - 1)}
          class="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <Icon icon="mdi:chevron-left" class="w-5 h-5" />
        </button>

        <!-- Page Numbers -->
        {#each visiblePages as page}
          {#if typeof page === 'number'}
            <button
              onclick={() => handlePageChange(page)}
              class="w-9 h-9 rounded-lg font-medium transition-all {currentPage === page
                ? 'bg-primary text-white shadow-sm'
                : 'border border-gray-300 text-text-main hover:border-primary hover:text-primary'}"
            >
              {page}
            </button>
          {:else}
            <span class="text-text-muted px-1">{page}</span>
          {/if}
        {/each}

        <!-- Next Button -->
        <button
          onclick={() => handlePageChange(currentPage + 1)}
          class="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-text-main hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Next page"
        >
          <Icon icon="mdi:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
{/if}
