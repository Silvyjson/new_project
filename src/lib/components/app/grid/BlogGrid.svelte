<script lang="ts">
  import BlogCard from "$lib/components/app/card/BlogCard.svelte";
  import Pagination from "$lib/components/common/Pagination.svelte";
  import Card from "$lib/components/common/Card.svelte";
  import Button from "$lib/components/common/Button.svelte";

  export let posts: any[] = [];
  export let pagination: any = undefined;
  // default to a no-op handler so Pagination always receives a function
  export let handlePageChange: (e: CustomEvent<{ page: number }>) => void = (
    e,
  ) => {};

  export let updateFilters: () => void;
  export let searchQuery: string;
  export let selectedCategory: string;
  export let selectedVendor: string;
</script>



<section class="pb-10 bg-soft-background">
  <div class="container max-w-7xl mx-auto px-4">
    {#if posts && posts.length > 0}
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each posts as post, i}
          <BlogCard {post} />
        {/each}
      </div>

      {#if pagination}
        <div class="mt-12 flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            on:pageChange={handlePageChange}
          />
        </div>
      {/if}
    {:else}
      <Card className="py-16 text-center">
        <div class="text-6xl mb-4">📰</div>
        <h3 class="text-h3 text-text-main mb-2">No Articles Found</h3>
        <p class="text-body text-text-muted mb-6">
          Try adjusting your filters or search terms.
        </p>
        <Button
          variant="outline"
          onclick={() => {
            selectedCategory = "all";
            selectedVendor = "";
            searchQuery = "";
            updateFilters();
          }}
        >
          Clear All Filters
        </Button>
      </Card>
    {/if}
  </div>
</section>
