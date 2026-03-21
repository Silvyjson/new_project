<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import AppHeader from "$lib/components/app/common/AppHeader.svelte";
  import AppFooter from "$lib/components/app/common/AppFooter.svelte";

  import Nav from "$lib/components/homepage/Nav.svelte";
  import Footer from "$lib/components/homepage/Footer.svelte";

  import { auth } from "$lib/state/auth.svelte";
  import ProfileDrawer from "$lib/components/app/common/ProfileDrawer.svelte";

  let showProfileDrawer = false;

  const openProfileDrawer = () => {
    showProfileDrawer = true;
    document.body.style.overflow = "hidden";
  };

  const closeProfileDrawer = () => {
    showProfileDrawer = false;
    document.body.style.overflow = "";
  };

  onMount(() => {
    const handleOpenDrawer = () => openProfileDrawer();
    window.addEventListener("open-profile-drawer", handleOpenDrawer);
    return () =>
      window.removeEventListener("open-profile-drawer", handleOpenDrawer);
  });

  $: currentPath = $page.url.pathname;
  
  $: isBlog = currentPath.startsWith("/blog");
  $: isVendor = currentPath.startsWith("/vendor");
  $: isSupport = currentPath === "/support";
  $: isShopsRoot = currentPath === "/shop";
  $: isShopsNested =
    currentPath.startsWith("/shop/") && currentPath !== "/shop";

  $: useHomepageLayout =
    !auth.isLoggedIn && (isBlog || isVendor || isSupport || isShopsRoot);

  $: hideLayout = isShopsNested;
</script>

<div class="min-h-screen bg-background flex flex-col">

  {#if !hideLayout}
    {#if useHomepageLayout}
      <Nav />
    {:else}
      <AppHeader on:openProfileDrawer={openProfileDrawer} role={auth.role} />
    {/if}
  {/if}


  <main class="flex-1">
    <slot />
  </main>

  {#if !hideLayout}
    {#if useHomepageLayout}
      <Footer />
    {:else}
      <AppFooter role={auth.role} />
    {/if}
  {/if}

  {#if showProfileDrawer && !useHomepageLayout && !hideLayout}
    <!-- {#if auth.isLoggedIn} -->
      <ProfileDrawer {showProfileDrawer} on:close={closeProfileDrawer} role={auth.role} />
    <!-- {/if} -->
  {/if}
</div>
