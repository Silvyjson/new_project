<script lang="ts">
  import ShopFooter from "../components/ShopFooter.svelte";
  import ShopHeader from "../components/ShopHeader.svelte";

  export let shop: any = null;
  export let totalProducts: number = 0;
  export let product: any = undefined;
</script>

<main>
  <ShopHeader {shop} {totalProducts} {product} />
    <slot />
  <ShopFooter {shop} />
</main>

