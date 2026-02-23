<!-- src/lib/components/vendor/ProductGrid.svelte -->
<script lang="ts">
    import type { Product } from "$lib/types";
    import ProductCard from "./ProductCard.svelte";
    import Card from "$lib/components/ui/Card.svelte";

    export let products: Product[];
    export let vendorSlug: string;
    export let limit: number | null = null;
    export let emptyMessage: string = "No products found.";

    $: displayedProducts = limit ? products.slice(0, limit) : products;
</script>

{#if displayedProducts.length > 0}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {#each displayedProducts as product (product.id)}
            <ProductCard {product} {vendorSlug} />
        {/each}
    </div>
{:else}
    <Card padding="lg" className="text-center text-gray-muted">
        <p class="text-lg">📦</p>
        <p class="mt-2">{emptyMessage}</p>
    </Card>
{/if}
