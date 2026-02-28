<script lang="ts">
  import { goto } from "$app/navigation";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Icon from "@iconify/svelte";

  const dispatch = createEventDispatcher();

  export let showProfileDrawer = false;
  export let role = "buyer";

  let user: {
    name: string;
    businessName?: string;
    email: string;
    avatar?: string | null;
    verified?: boolean;
    trustScore?: number;
    memberSince: string;
    totalOrders?: number;
    totalShops?: number;
  };

  if (role === "buyer") {
    user = {
      name: "John Doe",
      email: "john@example.com",
      avatar: null,
      memberSince: "2026",
      totalOrders: 12,
    };
  } else {
    user = {
      name: "Divine",
      businessName: "Divine Stores",
      email: "divine@divinestores.com",
      avatar: null,
      trustScore: 78,
      verified: true,
      memberSince: "2026",
      totalShops: 3,
      totalOrders: 245,
    };
  }

  const close = () => dispatch("close");
  const navigate = (path: string) => {
    goto(path);
    close();
  };

  const handleLogout = async () => {
    goto("/auth/login");
    close();
  };

  onMount(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  });

  /* ---------------------------------- */
  /* Navigation Config */
  /* ---------------------------------- */

  const vendorSections = [
    {
      title: "Business",
      items: [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: "mdi:view-dashboard-outline",
        },
        { label: "My Shops", path: "/my-shop", icon: "mdi:store-outline" },
        { label: "Orders", path: "/orders", icon: "mdi:shopping-outline" },
        { label: "Analytics", path: "/analytics", icon: "mdi:chart-line" },
        { label: "Wallet", path: "/wallet", icon: "mdi:wallet-outline" },
      ],
    },
    {
      title: "Content",
      items: [
        {
          label: "My Blog",
          path: "/my-blog",
          icon: "mdi:file-document-outline",
        },
        {
          label: "Followers",
          path: "/my-shop/followers",
          icon: "mdi:account-group-outline",
        },
      ],
    },
  ];

  const buyerSections = [
    {
      title: "Home",
      items: [{ label: "Home", path: "/home", icon: "mdi:home-outline" }],
    },
    {
      title: "Discover",
      items: [
        { label: "Blog", path: "/blog", icon: "mdi:file-document-outline" },
        {
          label: "Vendors",
          path: "/vendor",
          icon: "mdi:store-search-outline",
        },
        { label: "Shops", path: "/shop", icon: "mdi:storefront-outline" },
      ],
    },
    {
      title: "Shopping",
      items: [
        { label: "Orders", path: "/orders", icon: "mdi:shopping-outline" },
        { label: "Wishlist", path: "/wishlist", icon: "mdi:heart-outline" },
        { label: "Cart", path: "/cart", icon: "mdi:cart-outline" },
        {
          label: "Following",
          path: "/following",
          icon: "mdi:account-group-outline",
        },
      ],
    },
  ];

  const accountSection = {
    title: "Account",
    items: [
      {
        label: "Notifications",
        path: "/notifications",
        icon: "mdi:bell-outline",
      },
      { label: "Settings", path: "/settings", icon: "mdi:cog-outline" },
      { label: "Support", path: "/support", icon: "mdi:lifebuoy" },
    ],
  };

  $: sections =
    role === "vendor"
      ? [...vendorSections, accountSection]
      : [...buyerSections, accountSection];
</script>

{#if showProfileDrawer}
  <div class="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-dark/45 backdrop-blur-sm"
      on:click={close}
      transition:fade={{ duration: 200 }}
    ></div>

    <!-- Drawer -->
    <div
      class="absolute right-0 top-0 h-full w-full max-w-[360px] bg-surface shadow-2xl"
      transition:slide={{ axis: "x", duration: 300 }}
    >
      <div class="flex flex-col h-full">
        <!-- HEADER -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center gap-4 mb-4">
            {#if user.avatar}
              <img
                src={user.avatar}
                alt={user.name}
                class="w-14 h-14 rounded-full object-cover"
              />
            {:else}
              <div
                class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl"
              >
                {(role === "vendor"
                  ? (user.businessName ?? user.name)
                  : user.name
                ).charAt(0)}
              </div>
            {/if}

            <div class="flex-1 min-w-0">
              <p class="text-lg font-semibold text-text-main truncate">
                {role === "vendor"
                  ? (user.businessName ?? user.name)
                  : user.name}

                {#if role === "vendor" && user.verified}
                  <span class="ml-2">
                    <Badge variant="success" size="sm">Verified</Badge>
                  </span>
                {/if}
              </p>
              <p class="text-sm text-text-muted truncate">
                {user.email}
              </p>
            </div>
          </div>

          <!-- Vendor Trust Score -->
          {#if role === "vendor" && user.trustScore}
            <div
              class="flex items-center gap-3 p-3 bg-background-light rounded-xl"
            >
              <div
                class="text-2xl font-bold {user.trustScore >= 80
                  ? 'text-success'
                  : user.trustScore >= 60
                    ? 'text-primary'
                    : 'text-warning'}"
              >
                {user.trustScore}%
              </div>

              <div class="flex-1">
                <p class="text-xs font-medium text-text-muted">Trust Score</p>

                <div
                  class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full {user.trustScore >= 80
                      ? 'bg-success'
                      : user.trustScore >= 60
                        ? 'bg-primary'
                        : 'bg-warning'}"
                    style="width: {user.trustScore}%"
                  ></div>
                </div>
              </div>
            </div>
          {/if}

          <button
            on:click={() => navigate("/settings")}
            class="text-sm text-primary font-medium hover:underline mt-4"
          >
            View Settings →
          </button>
        </div>

        <!-- NAVIGATION -->
        <nav class="flex-1 overflow-y-auto p-4 space-y-6">
          {#each sections as section}
            <div>
              <h4
                class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-3"
              >
                {section.title}
              </h4>

              <div class="space-y-1">
                {#each section.items as item}
                  <button
                    on:click={() => navigate(item.path)}
                    class="w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <!-- You can swap these with your existing SVGs -->
                    <Icon icon={item.icon} class="w-5 h-5 text-text-muted" />

                    <span class="text-text-main">
                      {item.label}
                    </span>
                  </button>
                {/each}
              </div>
            </div>
          {/each}

          <!-- Quick Info -->
          <div class="px-3 py-4 bg-gray-50 rounded-xl">
            <div class="flex justify-between text-xs text-text-muted mb-2">
              <span>Member since</span>
              <span class="font-medium text-text-main">
                {user.memberSince}
              </span>
            </div>

            {#if role === "vendor"}
              <div class="flex justify-between text-xs text-text-muted mb-2">
                <span>Total shops</span>
                <span class="font-medium text-text-main">
                  {user.totalShops}
                </span>
              </div>
            {/if}

            <div class="flex justify-between text-xs text-text-muted">
              <span>Total orders</span>
              <span class="font-medium text-text-main">
                {user.totalOrders}
              </span>
            </div>
          </div>
        </nav>

        <!-- FOOTER -->
        <div class="p-4 border-t border-gray-200">
          <button
            on:click={handleLogout}
            class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-danger font-medium hover:bg-danger/5 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
