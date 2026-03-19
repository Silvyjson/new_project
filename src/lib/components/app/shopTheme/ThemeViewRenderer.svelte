<script lang="ts">
    export let viewType: 'home' | 'products' | 'detail';
    export let data: any;

    // Restaurant
    import RestaurantHome from "./business/restaurant/views/HomeView.svelte";
    import RestaurantProducts from "./business/restaurant/views/ProductsView.svelte";
    import RestaurantDetail from "./business/restaurant/views/DetailView.svelte";
    
    // Clothing
    import ClothingHome from "./business/clothing/views/HomeView.svelte";
    import ClothingProducts from "./business/clothing/views/ProductsView.svelte";
    import ClothingDetail from "./business/clothing/views/DetailView.svelte";

    // Electronics
    import ElectronicsHome from "./business/electronics/views/HomeView.svelte";
    import ElectronicsProducts from "./business/electronics/views/ProductsView.svelte";
    import ElectronicsDetail from "./business/electronics/views/DetailView.svelte";

    // Bakery
    import BakeryHome from "./business/bakery/views/HomeView.svelte";
    import BakeryProducts from "./business/bakery/views/ProductsView.svelte";
    import BakeryDetail from "./business/bakery/views/DetailView.svelte";

    // Default
    import DefaultHome from "./general/default/views/HomeView.svelte";
    import DefaultProducts from "./general/default/views/ProductsView.svelte";
    import DefaultDetail from "./general/default/views/DetailView.svelte";

    // Modern
    import ModernHome from "./general/modern/views/HomeView.svelte";
    import ModernProducts from "./general/modern/views/ProductsView.svelte";
    import ModernDetail from "./general/modern/views/DetailView.svelte";

    // Grid
    import GridHome from "./general/grid/views/HomeView.svelte";
    import GridProducts from "./general/grid/views/ProductsView.svelte";
    import GridDetail from "./general/grid/views/DetailView.svelte";

    $: theme = data?.shop?.theme || 'general/default';
</script>

{#if theme === 'business/restaurant'}
    {#if viewType === 'home'}<RestaurantHome {data} />{/if}
    {#if viewType === 'products'}<RestaurantProducts {data} />{/if}
    {#if viewType === 'detail'}<RestaurantDetail {data} />{/if}
{:else if theme === 'business/clothing'}
    {#if viewType === 'home'}<ClothingHome {data} />{/if}
    {#if viewType === 'products'}<ClothingProducts {data} />{/if}
    {#if viewType === 'detail'}<ClothingDetail {data} />{/if}
{:else if theme === 'business/electronics'}
    {#if viewType === 'home'}<ElectronicsHome {data} />{/if}
    {#if viewType === 'products'}<ElectronicsProducts {data} />{/if}
    {#if viewType === 'detail'}<ElectronicsDetail {data} />{/if}
{:else if theme === 'business/bakery'}
    {#if viewType === 'home'}<BakeryHome {data} />{/if}
    {#if viewType === 'products'}<BakeryProducts {data} />{/if}
    {#if viewType === 'detail'}<BakeryDetail {data} />{/if}
{:else if theme === 'general/modern'}
    {#if viewType === 'home'}<ModernHome {data} />{/if}
    {#if viewType === 'products'}<ModernProducts {data} />{/if}
    {#if viewType === 'detail'}<ModernDetail {data} />{/if}
{:else if theme === 'general/grid'}
    {#if viewType === 'home'}<GridHome {data} />{/if}
    {#if viewType === 'products'}<GridProducts {data} />{/if}
    {#if viewType === 'detail'}<GridDetail {data} />{/if}
{:else}
    {#if viewType === 'home'}<DefaultHome {data} />{/if}
    {#if viewType === 'products'}<DefaultProducts {data} />{/if}
    {#if viewType === 'detail'}<DefaultDetail {data} />{/if}
{/if}
