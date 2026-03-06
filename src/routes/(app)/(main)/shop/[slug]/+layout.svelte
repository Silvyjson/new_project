<script lang="ts">
    import { page } from "$app/stores";
    import ShopFooter from "$lib/components/app/shopTheme/default/components/ShopFooter.svelte";
    import ShopHeader from "$lib/components/app/shopTheme/default/components/ShopHeader.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    // Declare reactive variables and populate with safe fallbacks
    let shop: any = null;
    let products: any[] = [];
    let totalProducts: number = 0;
    let product: any = undefined;

    // prefer layout `data`, then fall back to page data from child routes or from product
    $: product = ($page.data as any)?.product ?? (data as any)?.product;
    $: shop = data?.shop ?? $page.data?.shop ?? product?.shop ?? null;
    $: products = data?.products ?? $page.data?.products ?? [];
    $: totalProducts = data?.totalProducts ?? $page.data?.totalProducts ?? 0;
</script>

<main>
    <ShopHeader {shop} {totalProducts} {product} />
    <slot />
    <ShopFooter />
</main>
