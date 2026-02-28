<script lang="ts">
    import ShopCard from "../card/ShopCard.svelte";
    import Pagination from "../ui/Pagination.svelte";
    import Card from "../ui/Card.svelte";
    import Button from "../ui/Button.svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    export let data;
    let shops = data.shops;
    let pagination = data.pagination;
    let handlePageChange = data.handlePageChange;
    let clearAllFilters = data.clearAllFilters;
</script>

<section class="py-16 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
        {#if shops.length > 0}
            <div
                class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
                {#each shops as shop, i}
                    <div
                        in:fly={{
                            y: 20,
                            duration: 400,
                            delay: i * 50,
                            easing: cubicOut,
                        }}
                    >
                        <ShopCard {shop} />
                    </div>
                {/each}
            </div>

            <!-- Pagination -->
            <Pagination
                currentPage={data.pagination?.page || 1}
                totalPages={data.pagination?.totalPages || 1}
                on:pageChange={handlePageChange}
            />
        {:else}
            <!-- Empty State -->
            <Card className="py-16 text-center">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-h3 text-text-main mb-2">No Shops Found</h3>
                <p class="text-body text-text-muted mb-6">
                    Try adjusting your filters or search terms to find what
                    you're looking for.
                </p>
                <Button variant="outline" onclick={clearAllFilters}
                    >Clear All Filters</Button
                >
            </Card>
        {/if}
    </div>
</section>
