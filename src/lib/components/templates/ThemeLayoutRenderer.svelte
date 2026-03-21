<script lang="ts">
  import DefaultLayout from './general/default/layout/ThemeLayout.svelte';

  let { shop = null, totalProducts = 0, product = undefined, children } = $props();

  // Theme values
  let theme = $derived(shop?.theme?.category || 'general');
  let type = $derived(shop?.theme?.type || 'default');
  let template = $derived(shop?.theme?.template || 'default');

  let Layout = $state<any>(null);

  const layouts = import.meta.glob('./**/layout/ThemeLayout.svelte');

  $effect(() => {
    loadLayout();
  });

  async function loadLayout() {
    const key = `./${theme}${theme !== 'general' ? '/' + type : ''}/${template}/layout/ThemeLayout.svelte`;
    console.log(`[ThemeLayoutRenderer] Loading theme layout: ${key}`);

    if (layouts[key]) {
      try {
        const module = await layouts[key]() as { default: any };
        Layout = module.default;
        console.log(`[ThemeLayoutRenderer] Successfully loaded layout: ${key}`);
      } catch (e) {
        console.error(`[ThemeLayoutRenderer] Error loading layout ${key}:`, e);
        Layout = DefaultLayout;
      }
    } else {
      console.warn(`[ThemeLayoutRenderer] Layout not found: ${key}. Falling back to default.`);
      Layout = DefaultLayout;
    }
  }
</script>

{#if Layout}
  {#key theme + template}
    <Layout {shop} {totalProducts} {product}>
      {@render children?.()}
    </Layout>
  {/key}
{:else}
  {@render children?.()}
{/if}