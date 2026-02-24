<script>
    import Footer from "$lib/components/homepage/Footer.svelte";
    import Nav from "$lib/components/homepage/Nav.svelte";
</script>

<main>
    <Nav />
    <slot />
    <Footer />
</main>
