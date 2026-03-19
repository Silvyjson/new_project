<script lang="ts">
    import type { PageData } from "./$types";
    import ThemeViewRenderer from "$lib/components/templates/ThemeViewRenderer.svelte";

    export let data: PageData;
</script>

<ThemeViewRenderer viewType="home" {data} />
