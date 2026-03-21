<script lang="ts">
  import ShopHeader from "../components/ShopHeader.svelte";
  import ShopFooter from "../components/ShopFooter.svelte";

  export let shop: any = null;
  export let totalProducts: number = 0;
  export let product: any = undefined;
</script>

<div class="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
  <!-- Grid Sticky Header -->
  <ShopHeader {shop} {totalProducts} {product} />

  <main class="relative z-10 pt-20">
    <slot />
  </main>

  <ShopFooter {shop} />
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
  }
  
  /* Structured Scrollbar */
  :global(::-webkit-scrollbar) {
    width: 12px;
  }
  :global(::-webkit-scrollbar-track) {
    background: #f1f5f9;
  }
  :global(::-webkit-scrollbar-thumb) {
    background: #cbd5e1;
    border: 3px solid #f1f5f9;
    border-radius: 10px;
  }
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #94a3b8;
  }
</style>
