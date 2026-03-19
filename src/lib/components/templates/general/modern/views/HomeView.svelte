<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    import ProductCard from "$lib/components/app/shopTheme/general/default/components/ProductCard.svelte";

    export let data: any;
    
    $: ({ shop, products } = data);

    let activeCategory = "All";
    let isFollowing = false;
    const toggleFollow = () => isFollowing = !isFollowing;

    $: displayProducts = activeCategory === "All" 
        ? products 
        : products.filter((p: any) => p.category === activeCategory);
</script>

<main class="min-h-screen bg-neutral-50 font-sans text-neutral-900 pb-20">
    <!-- Elevated Hero -->
    <section class="max-w-7xl mx-auto px-4 pt-12 pb-24">
        <div class="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
             <img src={shop.bannerUrl} alt="" class="absolute inset-0 w-full h-full object-cover" />
             <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
             
             <!-- Glassmorphism Content -->
             <div class="absolute bottom-8 left-8 right-8">
                <div class="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.3)]">
                    <div class="flex items-center gap-6">
                        <img src={shop.logoUrl} class="w-24 h-24 rounded-full border-2 border-white/30 shadow-lg object-cover" alt="logo" />
                        <div>
                            <h1 class="text-4xl font-light tracking-tight mb-1">{shop.name}</h1>
                            <p class="text-white/70 font-light mb-4">{shop.tagline}</p>
                            <div class="flex gap-4 text-sm font-medium">
                                <span class="bg-white/20 px-3 py-1 rounded-full"><Icon icon="mdi:star" class="inline text-yellow-300"/> {shop.rating}</span>
                                <span class="bg-white/20 px-3 py-1 rounded-full">{shop.followers} Followers</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button on:click={toggleFollow} class="px-8 py-3 rounded-full bg-white text-neutral-900 font-semibold hover:bg-neutral-100 transition shadow-lg shrink-0">
                            {isFollowing ? 'Following' : '+ Follow'}
                        </button>
                    </div>
                </div>
             </div>
        </div>
    </section>

    <!-- Minimal Category Filter -->
    <section class="max-w-7xl mx-auto px-4 mb-16 relative z-10">
        <div class="flex items-center justify-center gap-8 border-b border-neutral-200 pb-2 overflow-x-auto">
            {#each ["All", "Featured", "New Arrivals"] as cat}
                <button
                    on:click={() => (activeCategory = cat)}
                    class="text-lg font-light transition-all pb-4 border-b-2 {activeCategory === cat ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'}"
                >
                    {cat}
                </button>
            {/each}
        </div>
    </section>

    <!-- Elegant Product Grid -->
    <section class="max-w-7xl mx-auto px-4 mb-32">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {#each displayProducts as product, i}
                <div in:fly={{ y: 30, duration: 600, delay: i * 100, easing: cubicOut }} class="group">
                    <ProductCard {product} shopSlug={shop.slug} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Refined About Section -->
    <section class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-light mb-8">About the Brand</h2>
        <p class="text-neutral-500 text-lg leading-relaxed mb-12 font-light">{shop.description}</p>
        <div class="grid grid-cols-3 gap-8 py-12 border-t border-b border-neutral-200 mb-12">
            <div>
                <div class="text-4xl font-light mb-2">{shop.orderCount}+</div>
                <div class="text-neutral-400 text-sm uppercase tracking-widest">Orders Delivered</div>
            </div>
            <div>
                <div class="text-4xl font-light mb-2">{shop.trustScore}%</div>
                <div class="text-neutral-400 text-sm uppercase tracking-widest">Trust Score</div>
            </div>
            <div>
                <div class="text-4xl font-light mb-2">{shop.stats?.responseTime || '2h'}</div>
                <div class="text-neutral-400 text-sm uppercase tracking-widest">Response Time</div>
            </div>
        </div>
    </section>
</main>
<style>
    .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
