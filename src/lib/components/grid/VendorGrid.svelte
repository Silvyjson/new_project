<script lang="ts">
    import VendorCard from "$lib/components/card/VendorCard.svelte";
    import Pagination from "$lib/components/ui/Pagination.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    export let data;
    let vendors = data.vendors;
    let pagination = data.pagination;
    let handlePageChange = data.handlePageChange;
    let clearAllFilters = data.clearAllFilters;
</script>

<section class="py-12 bg-background-light">
    <div class="container max-w-7xl mx-auto px-4">
        {#if vendors.length > 0}
            <div
                class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
                {#each vendors as vendor, i}
                    <div
                        in:fly={{
                            y: 16,
                            duration: 350,
                            delay: i * 40,
                            easing: cubicOut,
                        }}
                    >
                        <VendorCard {vendor} />
                    </div>
                {/each}
            </div>

            <div class="mt-12">
                <Pagination
                    currentPage={pagination?.page || 1}
                    totalPages={pagination?.totalPages || 1}
                    on:pageChange={handlePageChange}
                />
            </div>
        {:else}
            <Card className="py-12 text-center">
                <div class="text-5xl mb-4">🔍</div>
                <h3 class="text-lg font-semibold text-text-main mb-2">
                    No Vendors Found
                </h3>
                <p class="text-sm text-text-muted mb-6">
                    Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onclick={clearAllFilters}>
                    Clear Filters
                </Button>
            </Card>
        {/if}
    </div>
</section>
