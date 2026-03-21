<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import Button from "$lib/components/common/Button.svelte";

  export let shop: any = null;
  export let totalProducts: number = 0;
  export let product: any = undefined;

  let isScrolled = false;

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 10;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  $: currentPath = $page?.url?.pathname ?? "";

  const navLinks = [
    { name: "SHOP", href: `/shop/${shop?.slug}` },
    { name: "PRODUCTS", href: `/shop/${shop?.slug}/product` },
    { name: "ABOUT", href: `/shop/${shop?.slug}#about` },
    {name: "REVIEWS", href: `/shop/${shop?.slug}#reviews`}
  ];
</script>

<nav 
  class="fixed top-0 left-0 right-0 z-[100] bg-white transition-all duration-300
  {isScrolled ? 'h-16 border-b border-slate-900 shadow-sm' : 'h-20 border-b border-slate-200'}"
>
  <div class="container max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/shop/{shop?.slug}" class="flex items-center gap-4 group">
      <div class="w-10 h-10 border-2 border-slate-900 bg-slate-900 overflow-hidden">
        <img src={shop?.logoUrl} alt={shop?.name} class="w-full h-full object-cover grayscale brightness-150" />
      </div>
      <span class="font-black text-xl tracking-tighter uppercase">{shop?.name}</span>
    </a>

    <!-- Navigation -->
    <div class="hidden md:flex items-center gap-10">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="text-xs font-black tracking-widest transition-colors hover:text-slate-500 {currentPath === link.href ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400'}"
        >
          {link.name}
        </a>
      {/each}
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2">
      <button class="p-2 hover:bg-slate-100 transition-colors">
        <Icon icon="lucide:search" class="w-5 h-5" />
      </button>
      <a href="/cart" class="p-2 hover:bg-slate-100 transition-colors relative">
        <Icon icon="lucide:shopping-bag" class="w-5 h-5" />
        <span class="absolute top-0 right-0 w-4 h-4 bg-slate-900 text-[10px] text-white flex items-center justify-center font-bold">3</span>
      </a>
      <div class="hidden sm:block ml-4">
        <Button variant="outline" className="border-2 border-slate-900 h-10 px-6 rounded-none font-black text-xs hover:bg-slate-900 hover:text-white transition-all">
          FOLLOW
        </Button>
      </div>
    </div>
  </div>
</nav>
