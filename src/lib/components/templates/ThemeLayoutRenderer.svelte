<script lang="ts">
  import DefaultLayout from './general/default/layout/ThemeLayout.svelte';

  export let shop: any = null;
  export let totalProducts: number = 0;
  export let product: any = undefined;

  // Theme values
  $: theme = shop?.theme?.category || 'general';
  $: type = shop?.theme?.type || 'default';
  $: template = shop?.theme?.template || 'default';

  let Layout: any = DefaultLayout;

  const layouts = import.meta.glob('./**/layout/ThemeLayout.svelte');

  $: loadLayout();

  async function loadLayout() {
    const key = `./${theme}${theme !== 'general' ? '/' + type : ''}/${template}/layout/ThemeLayout.svelte`;

    if (layouts[key]) {
      const module = await layouts[key]() as { default: any };
      Layout = module.default;
    } else {
      Layout = DefaultLayout;
      console.warn(`Layout not found: ${key}`);
    }
  }
</script>

<svelte:component this={Layout} {shop} {totalProducts} {product}>
  <slot />
</svelte:component>