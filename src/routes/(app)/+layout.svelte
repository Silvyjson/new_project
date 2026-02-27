<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { fade, slide } from 'svelte/transition';

  // Default App Layout
  import AppHeader from '$lib/components/app/AppHeader.svelte';
  import AppFooter from '$lib/components/app/AppFooter.svelte';

  // Homepage Layout
  import Nav from "$lib/components/homepage/Nav.svelte";
  import Footer from "$lib/components/homepage/Footer.svelte";

  // Auth store
  import { isAuthenticated } from '$lib/stores/auth';

  // Profile drawer state
  let showProfileDrawer = false;

  const openProfileDrawer = () => {
    showProfileDrawer = true;
    document.body.style.overflow = 'hidden';
  };

  const closeProfileDrawer = () => {
    showProfileDrawer = false;
    document.body.style.overflow = '';
  };

  // Listen for custom events
  onMount(() => {
    const handleOpenDrawer = () => openProfileDrawer();
    window.addEventListener('open-profile-drawer', handleOpenDrawer);
    return () => window.removeEventListener('open-profile-drawer', handleOpenDrawer);
  });

  // Route + auth logic
  $: currentPath = $page.url.pathname;
  $: loggedIn = $isAuthenticated;

  // Routes that should use homepage layout
  $: isBlog = currentPath.startsWith('/blog');
  $: isVendor = currentPath.startsWith('/vendors');
  $: isSupport = currentPath === '/support';
  $: isShop = currentPath === '/shops';

  $: useHomepageLayout =
    !loggedIn &&
    (isBlog || isVendor || isSupport || isShop);
</script>

<div class="min-h-screen bg-background flex flex-col">

  {#if useHomepageLayout}
    <!-- Homepage Nav -->
    <Nav />
  {:else}
    <!-- App Header -->
    <AppHeader on:openProfileDrawer={openProfileDrawer} />
  {/if}

  <!-- Main Content -->
  <main class="flex-1">
    <slot />
  </main>

  {#if useHomepageLayout}
    <!-- Homepage Footer -->
    <Footer />
  {:else}
    <!-- App Footer -->
    <AppFooter />
  {/if}

  <!-- Profile Drawer -->
  {#if showProfileDrawer && !useHomepageLayout}
    <!-- <ProfileDrawer {showProfileDrawer} on:close={closeProfileDrawer} /> -->
  {/if}

</div>