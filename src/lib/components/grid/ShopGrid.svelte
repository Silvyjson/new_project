<script lang="ts">
    import ShopCard from "../card/ShopCard.svelte";
    import Pagination from "../ui/Pagination.svelte";
    import Card from "../ui/Card.svelte";
    import Button from "../ui/Button.svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    export let data: any;

    // Support explicit props or the legacy `data` shape
    export let shops: any[] = data?.shops || [];
    export let pagination: any = data?.pagination;
    export let handlePageChange: (e: CustomEvent<{ page: number }>) => void = data?.handlePageChange || ((e) => {});
    export let clearAllFilters: () => void = data?.clearAllFilters || (() => {});
</script>

<section class="py-16 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
        {#if shops.length > 0}
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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
                currentPage={pagination?.page || 1}
                totalPages={pagination?.totalPages || 1}
                on:pageChange={handlePageChange}
            />
        {:else}
            <!-- Empty State -->
            <Card className="py-16 text-center">
                <div class="text-6xl mb-4">
                    <Icon icon="mdi:store-off" class="w-16 h-16" />
                </div>
                <h3 class="text-h3 text-text-main mb-2">No Shops Found</h3>
                <p class="text-body text-text-muted mb-6">
                    Try adjusting your filters or search terms to find what
                    you're looking for.
                </p>
                <Button variant="outline" onclick={() => clearAllFilters()}>
                    Clear All Filters
                </Button>
            </Card>
        {/if}
    </div>
</section>
