<script lang="ts">
  import Icon from "@iconify/svelte";
  import Button from "$lib/components/common/Button.svelte";
  import ProductCard from "../components/ProductCard.svelte";
  import ReviewCard from "../components/ReviewCard.svelte";

  export let data: any;
  $: ({ shop = {}, products = [], featuredProducts = [], categories = [], reviews = [] } = data || {});
</script>

<div class="space-y-24 pb-24">
  <!-- HERO -->
  <section class="container max-w-7xl mx-auto px-4 mt-12">
    <div class="grid lg:grid-cols-2 bg-slate-900 border-4 border-slate-900 shadow-[16px_16px_0px_0px_rgba(15,23,42,0.1)] overflow-hidden">
      <!-- Image Part -->
      <div class="relative h-[400px] lg:h-auto overflow-hidden">
        <img src={shop?.bannerUrl} alt="" class="w-full h-full object-cover grayscale brightness-125 transition-transform duration-1000 hover:scale-105" />
        <div class="absolute inset-0 bg-slate-900/10 active:bg-transparent"></div>
      </div>
      
      <!-- Text Part -->
      <div class="bg-white p-12 md:p-20 flex flex-col justify-center gap-8">
        <div class="space-y-6">
          <h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
            {shop?.name}
            <span class="inline-block bg-slate-900 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">{shop?.category}</span>
          </h1>
          <p class="text-lg font-bold text-slate-500 uppercase tracking-tight leading-relaxed max-w-lg">
            {shop?.tagline || `Quality first. Est. 2024. Providing the finest ${shop?.category} selection.`}
          </p>
        </div>
        
        <div class="flex gap-4">
          <Button href="/shop/{shop?.slug}/product" variant="primary" className="bg-slate-900 text-white border-2 border-slate-900 rounded-none h-16 px-10 font-black text-sm tracking-widest uppercase hover:bg-white hover:text-slate-900 transition-all">
            SHOP NOW
          </Button>
          <Button variant="outline" className="border-2 border-slate-900 rounded-none h-16 px-10 font-black text-sm tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all">
            CONTACT
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED -->
  <section class="container max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between mb-12 border-b-4 border-slate-900 pb-4">
      <h2 class="text-3xl font-black uppercase tracking-tighter">NEW DROPS</h2>
      <a href="/shop/{shop?.slug}/product" class="text-xs inline-flex items-center gap-2 font-black uppercase tracking-widest hover:text-slate-500 transition-colors">VIEW COLLECTION  <Icon icon="mdi:arrow-right" class="w-4 h-4" /></a>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-900 border-2 border-slate-900">
      {#each featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4) as product}
        <div class="bg-white">
          <ProductCard {product} shopSlug={shop?.slug} />
        </div>
      {/each}
    </div>
  </section>
  
  <!-- ABOUT -->
  <section id="about" class="container max-w-7xl mx-auto px-4">
    <div class="grid lg:grid-cols-2 bg-white border-4 border-slate-900">
      <div class="p-12 md:p-20 border-b-4 lg:border-b-0 lg:border-r-4 border-slate-900">
        <h2 class="text-4xl font-black uppercase tracking-tighter mb-8 italic">OUR STORY /</h2>
        <div class="space-y-6 text-sm font-bold uppercase tracking-tight leading-relaxed text-slate-500 italic">
          <p>
            {shop?.description || `${shop?.name} was founded on the principles of quality, authenticity, and unparalleled style.`}
          </p>
          <p>
            Located in {shop?.location || 'Lagos, Nigeria'}, it reflects our passion for excellence and commitment to the {shop?.category || 'premium'} market.
          </p>
        </div>
      </div>
      <div class="p-12 md:p-20 bg-slate-900 text-white flex flex-col justify-center">
        <h2 class="text-4xl font-black uppercase tracking-tighter mb-8 italic">THE MISSION /</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div class="space-y-2">
            <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Response Time</span>
            <p class="text-lg font-black italic">{shop?.stats?.responseTime || '< 2 HOURS'}</p>
          </div>
          <div class="space-y-2">
            <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Processing Time</span>
            <p class="text-lg font-black italic">{shop?.stats?.processingTime || '1-2 DAYS'}</p>
          </div>
          <div class="space-y-2">
            <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Followers</span>
            <p class="text-lg font-black italic">{shop?.followers?.toLocaleString() || '2.3K+'}</p>
          </div>
          <div class="space-y-2">
            <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Verified</span>
            <p class="text-lg font-black italic">{shop?.vendorVerified ? 'YES' : 'PENDING'}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CATEGORIES -->
  {#if categories?.length}
    <section class="bg-slate-100 py-32 border-y-4 border-slate-900">
      <div class="container max-w-7xl mx-auto px-4">
        <h2 class="text-center text-4xl font-black uppercase tracking-tighter mb-20">BROWSE CATEGORIES</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-2 border-slate-900 bg-slate-900 gap-px">
          {#each categories as category}
            <a 
              href="/shop/{shop?.slug}/product?category={category}" 
              class="aspect-square bg-white flex flex-col items-center justify-center gap-4 transition-all hover:bg-slate-900 hover:text-white group"
            >
              <span class="text-xs font-black uppercase tracking-widest">{category}</span>
              <Icon icon="lucide:arrow-right-circle" class="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- REVIEWS -->
  <section id="reviews" class="container max-w-7xl mx-auto px-4">
    <div class="flex flex-col gap-10">
      <div class="flex flex-col items-center justify-center gap-4">
        <h2 class="text-4xl font-black uppercase tracking-tighter leading-none italic">TRUSTED VOICES</h2>
        <p class="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
           Read what our {shop?.followers?.toLocaleString()} members have to say about the {shop?.name} experience.
        </p>
        <div class="flex items-center gap-6">
           <div class="text-center">
              <p class="text-4xl font-black leading-none">{shop?.rating}</p>
              <p class="text-[9px] font-black uppercase text-slate-400 mt-1 tracking-widest">RATING</p>
           </div>
           <div class="text-center">
              <p class="text-4xl font-black leading-none">{shop?.reviewCount}</p>
              <p class="text-[9px] font-black uppercase text-slate-400 mt-1 tracking-widest">REVIEWS</p>
           </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        {#each reviews.slice(0, 4) as review}
          <ReviewCard {review} />
        {/each}
      </div>
    </div>
  </section>
</div>
