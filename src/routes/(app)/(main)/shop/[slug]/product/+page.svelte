<script lang="ts">
    import type { PageData } from "./$types";
    import ThemeViewRenderer from "$lib/components/app/shopTheme/ThemeViewRenderer.svelte";

    export let data: PageData;
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta name="description" content={data.meta.description} />
    <meta property="og:title" content={data.meta.title} />
    <meta property="og:description" content={data.meta.description} />
</svelte:head>

<ThemeViewRenderer viewType="products" {data} />
