<script>
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>VendorHub</title>
  <meta
    name="description"
    content="VendorHub gives vendors shareable storefront links, trust scores, payments, and buyer discovery."
  />
</svelte:head>

<Nav />
<main>
  <slot />
</main>
<Footer />

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    background: #fcfdff;
    color: #0d1b2a;
  }
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 1rem;
  }
</style>
