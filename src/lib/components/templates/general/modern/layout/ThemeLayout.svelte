<script lang="ts">
  export let shop: any = null;
  export let totalProducts: number = 0;
  export let product: any = undefined;
</script>
<header class="p-4 bg-gray-900 text-white font-bold border-b">GENERAL/MODERN HEADER</header>
<main class="min-h-screen">
  <slot />
</main>
<footer class="p-4 bg-gray-900 text-white text-sm border-t mt-auto">GENERAL/MODERN FOOTER</footer>
