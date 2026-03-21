<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    // Components
    import Button from "$lib/components/common/Button.svelte";
    import Card from "$lib/components/common/Card.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import ReviewCard from "../components/ReviewCard.svelte";
    import ProductCard from "../components/ProductCard.svelte";

    // Props
    export let data: any;
    
    // Reactive binding for data updates
    $: ({ shop = {}, products = [], featuredProducts = [], categories = [], reviews = [] } = data || {});

    // Social icons mapping
    const socialIcons: Record<string, string> = {
        instagram: "ri:instagram-line",
        whatsapp: "ri:whatsapp-line",
        twitter: "ri:twitter-x-line",
        tiktok: "ri:tiktok-line",
        facebook: "ri:facebook-box-line",
    };

    const getTrustScoreColor = (score: number) => {
        if (score >= 80) return "text-green-400";
        if (score >= 60) return "text-primary-400";
        if (score >= 40) return "text-yellow-400";
        return "text-red-400";
    };
</script>

<div class="space-y-32 pb-32">
    <!-- 🔷 HERO SECTION: Immersive Brand Experience -->
    <section class="relative min-h-[85vh] flex items-center pt-24 overflow-hidden">
        <!-- Modern Background Elements -->
        <div class="absolute inset-0 z-0">
            <img 
                src={shop?.bannerUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'} 
                alt="" 
                class="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a] to-[#0f172a]"></div>
        </div>

        <div class="container max-w-7xl mx-auto px-4 relative z-10">
            <div class="max-w-3xl space-y-8">
                <div in:fly={{ y: 30, duration: 800, easing: cubicOut }}>
                    <h1 class="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] my-6">
                        {shop?.name}
                        <Badge variant="info" className="bg-primary-500/10 text-primary-400 border border-primary-500/20 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
                            {shop?.category || 'Premium Retailer'}
                        </Badge>
                    </h1>
                    <p class="text-xl text-slate-400 leading-relaxed max-w-2xl">
                        {shop?.tagline || `Discover the future of ${shop?.category} with our curated collection of premium products and exceptional service.`}
                    </p>
                </div>

                <div class="flex flex-wrap gap-4 pt-4" in:fly={{ y: 30, duration: 800, delay: 200, easing: cubicOut }}>
                    <Button href="/shop/{shop?.slug}/product" variant="primary" size="lg" className="rounded-2xl px-10 h-16 text-lg font-bold shadow-2xl shadow-primary-500/30">
                        Explore Shop
                    </Button>
                    <button class="px-10 h-16 rounded-2xl border-2 border-white/10 text-white font-bold hover:bg-white/5 transition-all backdrop-blur-md">
                        Our Story
                    </button>
                </div>

                <!-- Stats / Trust Indicators -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5" in:fly={{ y: 30, duration: 800, delay: 400, easing: cubicOut }}>
                    <div>
                        <p class="text-[32px] font-black text-white leading-none mb-1">{shop?.rating}<span class="text-primary-400">★</span></p>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Rating</p>
                    </div>
                    <div>
                        <p class="text-[32px] font-black text-white leading-none mb-1">{(shop?.reviewCount / 1000).toFixed(1)}k</p>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Reviews</p>
                    </div>
                    <div>
                        <p class="text-[32px] font-black {getTrustScoreColor(shop?.trustScore)} leading-none mb-1">{shop?.trustScore}%</p>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Trust Score</p>
                    </div>
                    <div class="hidden sm:block">
                        <p class="text-[32px] font-black text-white leading-none mb-1">{shop?.followers?.toLocaleString()}</p>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Followers</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <Icon icon="lucide:chevron-down" class="w-6 h-6 text-white" />
        </div>
    </section>

    <!-- 🔷 FEATURED PRODUCTS: Staggered Grid -->
    <section class="container max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div class="space-y-2">
                <span class="text-[10px] font-bold text-primary-400 uppercase tracking-[0.3em]">Curated Picks</span>
                <h2 class="text-4xl md:text-5xl font-black text-white tracking-tighter">Featured Arrivals</h2>
            </div>
            <a href="/shop/{shop?.slug}/product" class="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors font-bold text-sm tracking-widest uppercase">
                View Collection 
                <div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary-500 group-hover:bg-primary-500 transition-all">
                    <Icon icon="lucide:arrow-right" class="w-4 h-4 group-hover:text-white" />
                </div>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4) as product, i}
                <div in:fly={{ y: 30, duration: 800, delay: i * 100, easing: cubicOut }}>
                    <ProductCard {product} shopSlug={shop?.slug} />
                </div>
            {/each}
        </div>
    </section>

    <!-- 🔷 CATEGORIES: Visual Navigation -->
    {#if categories?.length}
        <section class="bg-slate-900/50 py-32 border-y border-white/5">
            <div class="container max-w-7xl mx-auto px-4">
                <h2 class="text-center text-3xl font-black text-white mb-20 tracking-tighter uppercase">Shop by Category</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {#each categories as category}
                        <a 
                            href="/shop/{shop?.slug}/product?category={category}" 
                            class="group relative aspect-square rounded-3xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all duration-500"
                        >
                            <div class="absolute inset-0 bg-slate-950/40 group-hover:bg-primary-500/20 transition-colors z-10"></div>
                            <div class="absolute inset-x-0 bottom-4 text-center z-20 px-2 transition-transform group-hover:-translate-y-2">
                                <span class="text-xs font-black text-white uppercase tracking-widest">{category}</span>
                            </div>
                            <!-- Placeholder icon for categories -->
                            <div class="w-full h-full flex items-center justify-center">
                                <Icon icon="ph:package-bold" class="w-12 h-12 text-slate-800 group-hover:text-primary-400/30 transition-colors" />
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        </section>
    {/if}

    <!-- 🔷 REVIEWS: Social Proof Vertical Layout -->
    <section id="reviews" class="container max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-black tracking-widest uppercase mb-4">
                <Icon icon="ri:star-fill" /> Real Customer Feedback
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-white tracking-tighter">Trusted by Thousands</h2>
            <p class="text-slate-500 italic">Joining over {shop?.followers?.toLocaleString()} happy customers who trust {shop?.name} for their premium {shop?.category} needs.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each reviews.slice(0, 6) as review, i}
                <div in:fly={{ y: 20, duration: 800, delay: i * 150, easing: cubicOut }}>
                    <ReviewCard {review} />
                </div>
            {/each}
        </div>

        <!-- Call to action -->
        <div class="mt-20 text-center">
            <Button variant="outline" className="rounded-2xl px-12 h-14 border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                View All Reviews
            </Button>
        </div>
    </section>

    <!-- 🔷 ABOUT SECTION: Brand Legacy -->
    <section id="about" class="container max-w-7xl mx-auto px-4">
        <div class="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[48px] border border-white/10 overflow-hidden shadow-2xl">
            <div class="grid lg:grid-cols-2 gap-0">
                <div class="p-12 md:p-20 space-y-8">
                    <h2 class="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">Crafting Excellence at {shop?.name}</h2>
                    <p class="text-lg text-slate-400 leading-relaxed italic">
                        "{shop?.description || `We believe in providing the absolute best in ${shop?.category}. Our journey started with a simple idea: to make high-quality products accessible to everyone who values design and durability.`}"
                    </p>
                    
                    <div class="flex flex-wrap gap-4 pt-6">
                        {#if shop?.socials?.length}
                            {#each shop?.socials as social}
                                <a 
                                    href={social.url} 
                                    class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-1"
                                    aria-label="Follow us on {social.platform}"
                                >
                                    <Icon icon={socialIcons[social.platform]} class="w-6 h-6" />
                                </a>
                            {/each}
                        {/if}
                    </div>

                    <div class="pt-8 border-t border-white/5 flex items-center gap-4 text-sm text-slate-500">
                        <Icon icon="ri:map-pin-line" class="text-primary-500 w-5 h-5" /> 
                        <span>Operating safely from <strong class="text-white">{shop?.location}</strong></span>
                    </div>
                </div>
                <div class="relative h-[400px] lg:h-auto">
                    <img 
                        src={shop?.bannerUrl || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e12'} 
                        alt="Shop Workshop" 
                        class="w-full h-full object-cover grayscale brightness-50"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
                    <!-- Modern Floating Badge -->
                    <div class="absolute bottom-10 right-10 bg-white/10 backdrop-blur-3xl border border-white/10 p-6 rounded-3xl animate-pulse">
                        <p class="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-2 text-center">Since</p>
                        <p class="text-4xl font-black text-white leading-none">2023</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
    /* Section stagger animations */
    :global(body) {
        scroll-behavior: smooth;
    }
</style>
