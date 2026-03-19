<script lang="ts">
    export let shop: any = null;
    export let totalProducts: number = 0;
    export let product: any = undefined;

    import RestaurantLayout from "./business/restaurant/template_1/layout/ThemeLayout.svelte";
    import ClothingLayout from "./business/clothing/template_1/layout/ThemeLayout.svelte";
    import ElectronicsLayout from "./business/electronics/template_1/layout/ThemeLayout.svelte";
    import BakeryLayout from "./business/bakery/template_1/layout/ThemeLayout.svelte";
    import DefaultLayout from "./general/default/layout/ThemeLayout.svelte";
    import ModernLayout from "./general/modern/layout/ThemeLayout.svelte";
    import GridLayout from "./general/grid/layout/ThemeLayout.svelte";

    $: theme = shop?.theme || 'general/default';
</script>

{#if theme === 'business/restaurant/template_1'}
    <RestaurantLayout {shop} {totalProducts} {product}><slot/></RestaurantLayout>
{:else if theme === 'business/clothing/template_1'}
    <ClothingLayout {shop} {totalProducts} {product}><slot/></ClothingLayout>
{:else if theme === 'business/electronics/template_1'}
    <ElectronicsLayout {shop} {totalProducts} {product}><slot/></ElectronicsLayout>
{:else if theme === 'business/bakery/template_1'}
    <BakeryLayout {shop} {totalProducts} {product}><slot/></BakeryLayout>
{:else if theme === 'general/modern'}
    <ModernLayout {shop} {totalProducts} {product}><slot/></ModernLayout>
{:else if theme === 'general/grid'}
    <GridLayout {shop} {totalProducts} {product}><slot/></GridLayout>
{:else}
    <DefaultLayout {shop} {totalProducts} {product}><slot/></DefaultLayout>
{/if}
