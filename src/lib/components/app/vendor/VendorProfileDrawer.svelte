<!-- src/lib/components/vendor/VendorProfileDrawer.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { createEventDispatcher } from "svelte";
    import { fade, slide } from "svelte/transition";
    import Badge from "$lib/components/ui/Badge.svelte";

    const dispatch = createEventDispatcher();

    export let showProfileDrawer = false;

    // Vendor data
    let vendor = {
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

    const close = () => {
        dispatch("close");
    };

    const navigate = (path: string) => {
        goto(path);
        close();
    };

    const handleLogout = async () => {
        goto("/auth/login");
        close();
    };
</script>

{#if showProfileDrawer}
    <div class="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
        <!-- Overlay -->
        <div
            class="absolute inset-0 bg-dark/45 backdrop-blur-sm"
            on:click={close}
            transition:fade={{ duration: 200 }}
        ></div>

        <!-- Drawer Panel -->
        <div
            class="absolute right-0 top-0 h-full w-full max-w-[360px] bg-surface shadow-2xl"
            transition:slide={{ axis: "x", duration: 300 }}
        >
            <div class="flex flex-col h-full">
                <!-- Top: Vendor Card -->
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center gap-4 mb-4">
                        {#if vendor.avatar}
                            <img
                                src={vendor.avatar}
                                alt={vendor.businessName}
                                class="w-14 h-14 rounded-full object-cover"
                            />
                        {:else}
                            <div
                                class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl"
                            >
                                {vendor.businessName.charAt(0)}
                            </div>
                        {/if}
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-lg font-semibold text-text-main truncate"
                            >
                                {vendor.businessName}
                            </h3>
                            <p class="text-sm text-text-muted truncate">
                                {vendor.email}
                            </p>
                            {#if vendor.verified}
                                <Badge
                                    variant="success"
                                    size="sm"
                                    className="mt-1">Verified Vendor</Badge
                                >
                            {/if}
                        </div>
                    </div>

                    <!-- Trust Score Preview -->
                    <div
                        class="flex items-center gap-3 p-3 bg-background-light rounded-xl"
                    >
                        <div
                            class="text-2xl font-bold {vendor.trustScore >= 80
                                ? 'text-success'
                                : vendor.trustScore >= 60
                                  ? 'text-primary'
                                  : 'text-warning'}"
                        >
                            {vendor.trustScore}%
                        </div>
                        <div class="flex-1">
                            <p class="text-xs font-medium text-text-muted">
                                Trust Score
                            </p>
                            <div
                                class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"
                            >
                                <div
                                    class="h-full {vendor.trustScore >= 80
                                        ? 'bg-success'
                                        : vendor.trustScore >= 60
                                          ? 'bg-primary'
                                          : 'bg-warning'}"
                                    style="width: {vendor.trustScore}%"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <button
                        on:click={() => navigate("/settings")}
                        class="text-sm text-primary font-medium hover:underline mt-4"
                    >
                        View Settings →
                    </button>
                </div>

                <!-- Middle: Navigation -->
                <nav class="flex-1 overflow-y-auto p-4 space-y-6">
                    <!-- Section 1: Business -->
                    <div>
                        <h4
                            class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-3"
                        >
                            Business
                        </h4>
                        <div class="space-y-1">
                            <button
                                on:click={() => navigate("/dashboard")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >Dashboard</span
                                >
                            </button>
                            <button
                                on:click={() => navigate("/my-shop")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >My Shops</span
                                >
                            </button>
                            <button
                                on:click={() => navigate("/orders")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >Orders</span
                                >
                            </button>
                            <button
                                on:click={() => navigate("/analytics")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >Analytics</span
                                >
                            </button>
                            <button
                                on:click={() => navigate("/wallet")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >Wallet</span
                                >
                            </button>
                        </div>
                    </div>

                    <!-- Section 2: Content -->
                    <div>
                        <h4
                            class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-3"
                        >
                            Content
                        </h4>
                        <div class="space-y-1">
                            <button
                                on:click={() => navigate("/my-blog")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >My Blog</span
                                >
                            </button>
                            <button
                                on:click={() => navigate("/my-shop/followers")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >Followers</span
                                >
                            </button>
                        </div>
                    </div>

                    <!-- Section 3: Account -->
                    <div>
                        <h4
                            class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-3"
                        >
                            Account
                        </h4>
                        <div class="space-y-1">
                            <button
                                on:click={() => navigate("/notifications")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
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
                                <span class="text-body text-text-main"
                                    >Notifications</span
                                >
                            </button>
                            <button
                                on:click={() => navigate("/settings")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >Settings</span
                                >
                            </button>
                            <button
                                on:click={() => navigate("/support")}
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <svg
                                    class="w-5 h-5 text-text-muted"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                <span class="text-body text-text-main"
                                    >Support</span
                                >
                            </button>
                        </div>
                    </div>

                    <!-- Quick Info -->
                    <div class="px-3 py-4 bg-gray-50 rounded-xl">
                        <div
                            class="flex items-center justify-between text-xs text-text-muted mb-2"
                        >
                            <span>Member since</span>
                            <span class="font-medium text-text-main"
                                >{vendor.memberSince}</span
                            >
                        </div>
                        <div
                            class="flex items-center justify-between text-xs text-text-muted"
                        >
                            <span>Total shops</span>
                            <span class="font-medium text-text-main"
                                >{vendor.totalShops}</span
                            >
                        </div>
                        <div
                            class="flex items-center justify-between text-xs text-text-muted"
                        >
                            <span>Total orders</span>
                            <span class="font-medium text-text-main"
                                >{vendor.totalOrders}</span
                            >
                        </div>
                    </div>
                </nav>

                <!-- Footer: Logout -->
                <div class="p-4 border-t border-gray-200">
                    <button
                        on:click={handleLogout}
                        class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-danger font-medium hover:bg-danger/5 transition-colors"
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
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
