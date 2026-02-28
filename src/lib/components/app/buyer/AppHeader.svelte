<!-- src/lib/components/app/AppHeader.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { createEventDispatcher } from "svelte";
  import SearchBar from "./SearchBar.svelte";
  // import NotificationBell from './NotificationBell.svelte';
  // import CartIcon from './CartIcon.svelte';

  const dispatch = createEventDispatcher();

  // User data (from auth store)
  let user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
  };

  const openProfile = () => {
    dispatch("openProfileDrawer");
  };

  // Mock notification count
  let unreadCount = 3;

  // Mock cart count
  let cartCount = 5;

  $: currentPath = $page.url.pathname;
  $: isHome = currentPath === "/home";
</script>

<header
  class="sticky top-0 z-50 bg-surface border-b border-gray-200 h-20 shadow-sm"
>
  <div
    class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4"
  >
    <!-- Left: Logo -->
    <a href="/home" class="flex items-center gap-2 flex-shrink-0">
      <div
        class="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg"
      >
        V
      </div>
      <span class="hidden md:block text-xl font-bold text-text-main"
        >VendorHub</span
      >
    </a>

    {#if isHome}
      <!-- Center: Search Bar -->
      <div class="flex-1 max-w-[480px] hidden md:block">
        <SearchBar />
      </div>
    {/if}

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <!-- Mobile Search Toggle -->
      <button
        class="md:hidden p-2 text-text-muted hover:text-primary transition-colors"
        aria-label="Search"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <!-- Notifications -->
      <button
        on:click={() => {
          goto("/notifications");
        }}
        class="relative p-2 text-text-muted hover:text-primary transition-colors"
        aria-label="Notifications"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {#if unreadCount > 0}
          <span
            class="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        {/if}
      </button>

      <!-- Cart -->
      <button
        on:click={() => {
          goto("/cart");
        }}
        class="relative p-2 text-text-muted hover:text-primary transition-colors"
        aria-label="Cart"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>

        {#if cartCount > 0}
          <span
            class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        {/if}
      </button>

      <!-- Profile Avatar -->
      <button
        on:click={openProfile}
        class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Open profile"
      >
        {#if user.avatar}
          <img
            src={user.avatar}
            alt={user.name}
            class="w-8 h-8 rounded-full object-cover"
          />
        {:else}
          <div
            class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm"
          >
            {user.name.charAt(0)}
          </div>
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Search Bar (shown on mobile only) -->
  <div class="md:hidden px-4 pb-3">
    <SearchBar />
  </div>
</header>
