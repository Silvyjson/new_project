<!-- src/lib/components/vendor/ProductGrid.svelte -->
<script lang="ts">
    import type { Product } from "$lib/types";
    import ProductCard from "../card/ProductCard.svelte";
    import Pagination from "../ui/Pagination.svelte";
    import Card from "../ui/Card.svelte";
    import Button from "../ui/Button.svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import ProductCardList from "../card/ProductCardList.svelte";

    export let data: any;

    let products: Product[] = data.products;
    let shop: string = data.shop;
    let pagination = data.pagination;
    let handlePageChange = data.handlePageChange;
    let clearAllFilters = data.clearAllFilters;
    let viewMode = data.viewMode || "grid";
    let addToCart = data.addToCart;
    let formatNaira = data.formatNaira;
    let getStockBadge = data.getStockBadge;
</script>

<section class="py-8 bg-soft-background">
    <div class="container max-w-7xl mx-auto px-4">
        {#if products.length > 0}
            <!-- Grid View -->
            {#if viewMode === "grid"}
                <div
                    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {#each products as product, i}
                        <div
                            in:fly={{
                                y: 20,
                                duration: 400,
                                delay: i * 50,
                                easing: cubicOut,
                            }}
                        >
                            <ProductCard
                                {product}
                                shopSlug={shop.slug}
                                on:addToCart={() => addToCart(product)}
                                on:wishlist={(e: CustomEvent) => {
                                    console.log("wishlist:", e.detail);
                                    // TODO: sync with backend or update UI state
                                }}
                            />
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each products as product, i}
                        {@const badge = getStockBadge(product)}
                        <div
                            in:fly={{
                                y: 20,
                                duration: 400,
                                delay: i * 50,
                                easing: cubicOut,
                            }}
                        >
                            <!-- List View (componentized) -->
                            <ProductCardList
                                {product}
                                shopSlug={shop.slug}
                                {addToCart}
                                {formatNaira}
                            />
                        </div>
                    {/each}
                </div>
            {/if}

            <!-- Pagination -->
            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                on:pageChange={handlePageChange}
            />
        {:else}
            <!-- Empty State -->
            <Card className="py-16 text-center">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-h3 text-text-main mb-2">No Products Found</h3>
                <p class="text-body text-text-muted mb-6">
                    Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onclick={clearAllFilters}
                    >Clear All Filters</Button
                >
            </Card>
        {/if}
    </div>
</section>
