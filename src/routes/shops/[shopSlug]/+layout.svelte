<script lang="ts">
    import { page } from "$app/stores";
    import ShopFooter from "$lib/components/vendor/ShopFooter.svelte";
    import ShopHeader from "$lib/components/vendor/ShopHeader.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    // Use reactive destructuring for layout data
    $: ({ shop, products, totalProducts } = data);
    // Get product from child page data
    $: product = $page.data.product;
</script>

<main>
    <!-- <ShopHeader {shop} {totalProducts} {product} /> -->
    <slot />
    <ShopFooter />
</main>
