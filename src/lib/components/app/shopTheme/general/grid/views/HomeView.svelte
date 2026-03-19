<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import ProductCard from "$lib/components/app/shopTheme/general/default/components/ProductCard.svelte";

    export let data: any;
    $: ({ shop, products } = data);
    let isFollowing = false;
</script>

<main class="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 font-sans selection:bg-purple-500 selection:text-white pb-32">
    <!-- Bento Grid Hero -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 opacity-0 animate-fade-in">
        
        <!-- Main Banner Block (Spans 8 cols) -->
        <div class="md:col-span-8 relative rounded-[32px] overflow-hidden min-h-[400px] border border-slate-800 shadow-2xl">
            <img src={shop.bannerUrl} class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt="" />
            <div class="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-950/80"></div>
            
            <div class="absolute bottom-0 left-0 p-8 md:p-12">
                <div class="inline-block px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-700 text-purple-300 font-bold mb-6 truncate uppercase tracking-widest text-xs">
                    {shop.category}
                </div>
                <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    {shop.name}
                </h1>
                <p class="text-slate-300 text-xl font-medium max-w-xl">{shop.tagline}</p>
            </div>
        </div>

        <!-- Identity Block (Spans 4 cols) -->
        <div class="md:col-span-4 flex flex-col gap-6">
            <!-- Logo & Follow -->
            <div class="bg-slate-900 border border-slate-800 rounded-[32px] p-8 flex-1 flex flex-col items-center justify-center text-center shadow-xl hover:border-purple-500/50 transition-colors">
                <img src={shop.logoUrl} class="w-32 h-32 rounded-full mb-6 border-4 border-slate-800 object-cover" alt="Logo" />
                <button on:click={() => isFollowing = !isFollowing} class="w-full py-4 rounded-full font-bold text-lg transition-all {isFollowing ? 'bg-slate-800 text-slate-300' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 active:scale-95'}">
                    {isFollowing ? 'Following' : 'Follow Shop'}
                </button>
            </div>
            <!-- Trust Score Bento -->
            <div class="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-[32px] p-8 flex items-center justify-between shadow-xl">
                <div>
                    <div class="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Trust Score</div>
                    <div class="text-4xl font-black text-indigo-300">{shop.trustScore}%</div>
                </div>
                <div class="h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
                    <Icon icon="mdi:shield-check" class="text-3xl text-indigo-400" />
                </div>
            </div>
        </div>
    </div>

    <!-- Bold Products Grid -->
    <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-10">
            <h2 class="text-3xl font-black tracking-tight text-slate-100">The Drop Zone</h2>
            <div class="text-purple-400 font-bold hover:text-purple-300 cursor-pointer">Explore All →</div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each products as product, i}
                <div class="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.4)] bg-slate-900 rounded-[24px] border border-slate-800 overflow-hidden">
                    <ProductCard {product} shopSlug={shop.slug} />
                </div>
            {/each}
        </div>
    </div>
</main>
<style>
    .animate-fade-in { animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fade-in { from { opacity: 0; transform: translateY(40px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
</style>
