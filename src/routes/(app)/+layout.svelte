<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import AppHeader from "$lib/components/app/shared/AppHeader.svelte";
  import AppFooter from "$lib/components/app/shared/AppFooter.svelte";

  import Nav from "$lib/components/homepage/Nav.svelte";
  import Footer from "$lib/components/homepage/Footer.svelte";

  import { isAuthenticated } from "$lib/stores/auth";
  import ProfileDrawer from "$lib/components/app/shared/ProfileDrawer.svelte";

  let showProfileDrawer = false;
  let role = "vendor";

  // --- TEMP: simulate logged in state ---
  let simulateLoggedIn = false; // toggle to true to see AppHeader

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
  // override auth store for testing
  $: loggedIn = simulateLoggedIn ? true : $isAuthenticated;

  $: isBlog = currentPath.startsWith("/blog");
  $: isVendor = currentPath.startsWith("/vendor");
  $: isSupport = currentPath === "/support";
  $: isShopsRoot = currentPath === "/shop";
  $: isShopsNested =
    currentPath.startsWith("/shop/") && currentPath !== "/shop";

  $: useHomepageLayout =
    !loggedIn && (isBlog || isVendor || isSupport || isShopsRoot);

  $: hideLayout = isShopsNested;
</script>

<div class="min-h-screen bg-background flex flex-col">
  <!-- TEMP: toggle login for testing -->
  <button
    class="fixed top-4 right-4 p-2 bg-blue-500 text-white rounded"
    on:click={() => (simulateLoggedIn = !simulateLoggedIn)}
  >
    {simulateLoggedIn ? "Simulate Logout" : "Simulate Login"}
  </button>

  {#if !hideLayout}
    {#if useHomepageLayout}
      <Nav />
    {:else if role}
      <AppHeader on:openProfileDrawer={openProfileDrawer} {role} />
    {/if}
  {/if}

  <main class="flex-1">
    <slot />
  </main>

  {#if !hideLayout}
    {#if useHomepageLayout}
      <Footer />
    {:else if role}
      <AppFooter {role} />
    {/if}
  {/if}

  {#if showProfileDrawer && !useHomepageLayout && !hideLayout}
    {#if role}
      <ProfileDrawer {showProfileDrawer} on:close={closeProfileDrawer} {role} />
    {/if}
  {/if}
</div>
