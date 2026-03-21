<script lang="ts">
  import DefaultHome from "./general/default/views/HomeView.svelte";
  import DefaultProducts from "./general/default/views/ProductsView.svelte";
  import DefaultDetail from "./general/default/views/DetailView.svelte";

  let { viewType, data } = $props();

  // Theme values
  let theme = $derived(data?.shop?.theme?.category || 'general');
  let type = $derived(data?.shop?.theme?.type || 'default');
  let template = $derived(data?.shop?.theme?.template || 'default');

  let ViewComponent = $state<any>(null);

  // Load all views dynamically
  const viewModules = import.meta.glob('./**/views/*View.svelte');

  $effect(() => {
    loadView();
  });

  async function loadView() {
    const basePath = `./${theme}${theme !== 'general' ? '/' + type : ''}/${template}/views`;
    
    const viewMap: Record<string, string> = {
      home: `${basePath}/HomeView.svelte`,
      products: `${basePath}/ProductsView.svelte`,
      detail: `${basePath}/DetailView.svelte`
    };

    const key = viewMap[viewType];
    
    console.log(`[ThemeViewRenderer] Loading: ${viewType} | Theme: ${theme}/${template} | Key: ${key}`);

    if (viewModules[key]) {
      try {
        const module = await viewModules[key]() as { default: any };
        ViewComponent = module.default;
        console.log(`[ThemeViewRenderer] Successfully loaded: ${key}`);
      } catch (e) {
        console.error(`[ThemeViewRenderer] Error loading view ${key}:`, e);
        fallback();
      }
    } else {
      console.warn(`[ThemeViewRenderer] View not found: ${key}. Falling back.`);
      fallback();
    }

    function fallback() {
      if (viewType === 'home') ViewComponent = DefaultHome;
      else if (viewType === 'products') ViewComponent = DefaultProducts;
      else ViewComponent = DefaultDetail;
    }
  }
</script>

{#if ViewComponent}
  {#key theme + template}
    <ViewComponent {data} />
  {/key}
{:else}
  <div class="h-screen flex items-center justify-center bg-slate-950">
    <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
{/if}