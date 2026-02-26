<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{
        pageChange: { page: number };
    }>();

    export let currentPage = 1;
    export let totalPages = 1;

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            dispatch("pageChange", { page });
        }
    }

    $: pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    $: visiblePages = pages.filter(
        (p) =>
            p === 1 ||
            p === totalPages ||
            (p >= currentPage - 1 && p <= currentPage + 1),
    );
</script>

<div class="mt-12 flex justify-center">
    <div class="flex items-center gap-2">
        <!-- Previous -->
        <button
            on:click={() => goToPage(currentPage - 1)}
            class="px-4 py-2 rounded-btn border border-gray-200 text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
            disabled={currentPage === 1}
        >
            Previous
        </button>

        <!-- Page Numbers -->
        {#each pages as p, i}
            {#if visiblePages.includes(p)}
                <button
                    on:click={() => goToPage(p)}
                    class="px-4 py-2 rounded-btn transition-colors
                    {currentPage === p
                        ? 'bg-primary text-white'
                        : 'border border-gray-200 text-text-main hover:border-primary'}"
                >
                    {p}
                </button>
            {:else if (i > 0 && visiblePages.includes(pages[i - 1])) || (i < pages.length - 1 && visiblePages.includes(pages[i + 1]))}
                <span class="px-2 text-text-muted">...</span>
            {/if}
        {/each}

        <!-- Next -->
        <button
            on:click={() => goToPage(currentPage + 1)}
            class="px-4 py-2 rounded-btn border border-gray-200 text-text-main hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
</div>
