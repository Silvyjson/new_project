<script lang="ts">
  export let viewType: 'home' | 'products' | 'detail';
  export let data: any;

  // Theme values
  $: theme = data?.shop?.theme?.category || 'general';
  $: type = data?.shop?.theme?.type || 'default';
  $: template = data?.shop?.theme?.template || 'default';

  // Default fallback views
  import DefaultHome from "./general/default/views/HomeView.svelte";
  import DefaultProducts from "./general/default/views/ProductsView.svelte";
  import DefaultDetail from "./general/default/views/DetailView.svelte";

  let ViewComponent: any = DefaultHome;

  // Load all views dynamically
  const viewModules = import.meta.glob('./**/views/*View.svelte');

  $: loadView();

  async function loadView() {
    const basePath = `./${theme}${theme !== 'general' ? '/' + type : ''}/${template}/views`;

    const viewMap: Record<string, string> = {
      home: `${basePath}/HomeView.svelte`,
      products: `${basePath}/ProductsView.svelte`,
      detail: `${basePath}/DetailView.svelte`
    };

    const key = viewMap[viewType];

    if (viewModules[key]) {
      const module = await viewModules[key]() as { default: any };
      ViewComponent = module.default;
    } else {
      // fallback to default views
      console.warn(`View not found: ${key}, using default`);

      if (viewType === 'home') ViewComponent = DefaultHome;
      else if (viewType === 'products') ViewComponent = DefaultProducts;
      else ViewComponent = DefaultDetail;
    }
  }
</script>

<svelte:component this={ViewComponent} {data} />