<script lang="ts">
    import { page } from "$app/stores";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";
    import Button from "$lib/components/common/Button.svelte";
    import ProfileDrawer from "$lib/components/app/common/ProfileDrawer.svelte";

    export let shop: any = null;
    export let totalProducts: number = 0;
    export let product: any = undefined;

    let isScrolled = false;
    let showProfileDrawer = false;
    let searchQuery = "";
    let isSearchOpen = false;

    onMount(() => {
        const handleScroll = () => {
            isScrolled = window.scrollY > 20;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    $: currentPath = $page?.url?.pathname ?? "";
    $: isProductPage = product && currentPath.includes(`/product/${product?.code}`);

    const navLinks = [
        { name: "Home", href: `/shop/${shop?.slug}` },
        { name: "Products", href: `/shop/${shop?.slug}/product` },
        { name: "About", href: `/shop/${shop?.slug}#about` },
        { name: "Reviews", href: `/shop/${shop?.slug}#reviews` }
    ];

    // Mock cart items for the indicator
    let cartItemsCount = 3;
</script>

<nav 
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 {isScrolled ? 'py-3' : 'py-6'}"
>
    <div class="container max-w-7xl mx-auto px-4">
        <div 
            class="relative flex items-center justify-between px-6 py-2 rounded-2xl border border-white/10 transition-all duration-500
            {isScrolled ? 'bg-slate-900/80 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}"
        >
            <!-- Logo & Store Name -->
            <a href="/shop/{shop?.slug}" class="flex items-center gap-3 group">
                <div class="relative">
                    <img 
                        src={shop?.logoUrl} 
                        alt={shop?.name} 
                        class="w-10 h-10 rounded-xl object-cover border border-white/20 group-hover:scale-110 transition-transform duration-500 shadow-lg"
                    />
                    <div class="absolute inset-0 bg-primary-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div class="hidden sm:block">
                    <h1 class="text-lg font-bold text-white tracking-tight leading-none mb-0.5">
                        {shop?.name}
                    </h1>
                    <p class="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                        {shop?.category || 'Retail'}
                    </p>
                </div>
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-8">
                {#each navLinks as link}
                    <a 
                        href={link.href} 
                        class="text-sm font-medium transition-all hover:text-primary-400 {currentPath === link.href ? 'text-primary-400' : 'text-slate-300'}"
                    >
                        {link.name}
                    </a>
                {/each}
            </div>

            <!-- Action Icons -->
            <div class="flex items-center gap-2 sm:gap-4">
                <!-- Search Toggle -->
                <button 
                    on:click={() => (isSearchOpen = !isSearchOpen)}
                    class="p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <Icon icon="lucide:search" class="w-5 h-5" />
                </button>

                <!-- Cart -->
                <a href="/cart" class="relative p-2 text-slate-400 hover:text-white transition-colors group">
                    <Icon icon="lucide:shopping-bag" class="w-5 h-5" />
                    {#if cartItemsCount > 0}
                        <span class="absolute top-1 right-1 w-4 h-4 bg-primary-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-[#0f172a] group-hover:scale-110 transition-transform">
                            {cartItemsCount}
                        </span>
                    {/if}
                </a>

                <!-- Follow Button (Desktop) -->
                <div class="hidden sm:block pl-2 border-l border-white/10 ml-2">
                    <Button variant="primary" size="sm" className="rounded-xl px-5 py-2 font-semibold shadow-lg shadow-primary-500/20">
                        Follow
                    </Button>
                </div>

                <!-- Profile -->
                <button 
                    on:click={() => (showProfileDrawer = true)}
                    class="ml-2 w-10 h-10 rounded-full border-2 border-primary-500/30 overflow-hidden hover:border-primary-500 transition-colors shadow-lg shadow-primary-500/10"
                >
                    <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                        alt="Profile" 
                        class="w-full h-full object-cover"
                    />
                </button>
            </div>

            <!-- Expandable Search Bar -->
            {#if isSearchOpen}
                <div 
                    class="absolute top-full left-0 right-0 mt-4 px-6 py-4 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl"
                    transition:slide={{ axis: 'y' }}
                >
                    <div class="relative">
                        <input 
                            type="text" 
                            placeholder="Search in {shop?.name}..."
                            class="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:outline-none focus:border-primary-500/50 transition-all"
                            bind:value={searchQuery}
                            autoFocus
                        />
                        <Icon icon="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <button 
                            on:click={() => (isSearchOpen = false)}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                        >
                            <Icon icon="lucide:x" class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</nav>

<ProfileDrawer 
    {showProfileDrawer} 
    on:close={() => (showProfileDrawer = false)} 
/>

<style>
    /* For glass effect backdrop on older browsers */
    :global(.backdrop-blur-xl) {
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
    }
</style>
