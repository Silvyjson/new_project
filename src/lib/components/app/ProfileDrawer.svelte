<script lang="ts">
  import { goto } from '$app/navigation';
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  
  export let showProfileDrawer = false;
  
  // User data
  let user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    memberSince: '2026',
    totalOrders: 12
  };
  
  const close = () => dispatch('close');
  const navigate = (path: string) => { goto(path); close(); };
  const handleLogout = async () => { 
    // API call to logout
    goto('/auth/login');
    close();
  };

  // Close on escape key
  onMount(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  });
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
      transition:slide={{ axis: 'x', duration: 300 }}
    >
      <div class="flex flex-col h-full">
        
        <!-- Top: User Card -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center gap-4 mb-4">
            {#if user.avatar}
              <img src={user.avatar} alt={user.name} class="w-14 h-14 rounded-full object-cover" />
            {:else}
              <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                {user.name.charAt(0)}
              </div>
            {/if}
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-text-main truncate">{user.name}</h3>
              <p class="text-sm text-text-muted truncate">{user.email}</p>
            </div>
          </div>
          <button on:click={() => navigate('/settings')} class="text-sm text-primary font-medium hover:underline">
            View Settings →
          </button>
        </div>
        
        <!-- Middle: Navigation -->
        <nav class="flex-1 overflow-y-auto p-4 space-y-6">

          <!-- Section 0: Home -->
          <div>
            <h4 class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-3">Home</h4>
            <div class="space-y-1">
              <button on:click={() => navigate('/')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 0v8m0 0H5a2 2 0 01-2-2v-6m12 8v-8m0 0l7-7m0 0l2 2m-9 5v8m0 0h4a2 2 0 002-2v-6"/>
                </svg>
                <span class="text-body text-text-main">Home</span>
              </button>
            </div>
          </div>

          <!-- Section 1: Discover -->
          <div>
            <h4 class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-3">Discover</h4>
            <div class="space-y-1">
              <button on:click={() => navigate('/blog')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9M12 4h9M12 12h9M3 6h.01M3 12h.01M3 18h.01"/>
                </svg>
                <span class="text-body text-text-main">Blog</span>
              </button>
              <button on:click={() => navigate('/vendor')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z"/>
                </svg>
                <span class="text-body text-text-main">Vendor</span>
              </button>
              <button on:click={() => navigate('/shop')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18v11H3V10zm2-6h14v4H5V4z"/>
                </svg>
                <span class="text-body text-text-main">Shop</span>
              </button>
            </div>
          </div>

          <!-- Section 2: Shopping -->
          <div>
            <h4 class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-3">Shopping</h4>
            <div class="space-y-1">
              <button on:click={() => navigate('/orders')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <span class="text-body text-text-main">Orders</span>
              </button>
              <button on:click={() => navigate('/wishlist')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span class="text-body text-text-main">Wishlist</span>
              </button>
              <button on:click={() => navigate('/following')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span class="text-body text-text-main">Following</span>
              </button>
            </div>
          </div>

          <!-- Section 3: Account -->
          <div>
            <h4 class="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3 px-3">Account</h4>
            <div class="space-y-1">
              <button on:click={() => navigate('/notifications')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                <span class="text-body text-text-main">Notifications</span>
              </button>
              <button on:click={() => navigate('/settings')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-body text-text-main">Settings</span>
              </button>
              <button on:click={() => navigate('/support')} class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <span class="text-body text-text-main">Support</span>
              </button>
            </div>
          </div>

          <!-- Section 4: Quick Info -->
          <div class="px-3 py-4 bg-gray-50 rounded-xl">
            <div class="flex items-center justify-between text-xs text-text-muted mb-2">
              <span>Member since</span>
              <span class="font-medium text-text-main">{user.memberSince}</span>
            </div>
            <div class="flex items-center justify-between text-xs text-text-muted">
              <span>Total orders</span>
              <span class="font-medium text-text-main">{user.totalOrders}</span>
            </div>
          </div>

        </nav>
        
        <!-- Footer: Logout -->
        <div class="p-4 border-t border-gray-200">
          <button
            on:click={handleLogout}
            class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-danger font-medium hover:bg-danger/5 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Log Out
          </button>
        </div>

      </div>
    </div>
  </div>
{/if}