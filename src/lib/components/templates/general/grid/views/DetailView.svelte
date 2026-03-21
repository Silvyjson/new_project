<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { formatNaira } from "$lib/utils/format";
  
  // Components
  import Button from "$lib/components/common/Button.svelte";
  import ReviewCard from "../components/ReviewCard.svelte";
  import ProductCard from "../components/ProductCard.svelte";

  export let data: any;
  $: ({ product = {}, shop = {}, relatedProducts = [] } = data || {});

  let selectedImage = 0;
  let quantity = 1;
  let activeTab = "description";

  onMount(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const nextImage = () => {
    selectedImage = (selectedImage + 1) % (product.images?.length || 1);
  };

  const prevImage = () => {
    selectedImage = (selectedImage - 1 + (product.images?.length || 1)) % (product.images?.length || 1);
  };
</script>

<div class="bg-white min-h-screen pt-12 pb-24">
  <div class="container max-w-7xl mx-auto px-4">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12">
      <a href="/shop/{shop?.slug}" class="hover:text-slate-900">HOME</a>
      <span>/</span>
      <a href="/shop/{shop?.slug}/product" class="hover:text-slate-900">PRODUCTS</a>
      <span>/</span>
      <span class="text-slate-900">{product.name}</span>
    </div>

    <!-- Product Split Section -->
    <div class="grid lg:grid-cols-2 bg-slate-900 border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden mb-24">
      <!-- Image Gallery -->
      <div class="bg-[#f1f5f9] relative aspect-square border-r-2 border-slate-900">
        <img 
          src={product.images?.[selectedImage]} 
          alt={product.name} 
          class="w-full h-full object-cover mix-blend-multiply" 
        />
        
        {#if product.images?.length > 1}
           <div class="absolute bottom-6 right-6 flex gap-2">
              <button on:click={prevImage} class="w-10 h-10 bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all">
                <Icon icon="lucide:chevron-left" class="w-5 h-5" />
              </button>
              <button on:click={nextImage} class="w-10 h-10 bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all">
                <Icon icon="lucide:chevron-right" class="w-5 h-5" />
              </button>
           </div>
        {/if}
      </div>

      <!-- Info Section -->
      <div class="bg-white p-12 md:p-16 flex flex-col justify-center">
        <div class="space-y-6 mb-12">
          <span class="inline-block bg-slate-100 text-slate-900 px-3 py-1 text-[9px] font-black uppercase tracking-widest border border-slate-900">{product.category}</span>
          <h1 class="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none italic">{product.name}</h1>
          <div class="flex items-center gap-4">
             <div class="flex gap-0.5">
                {#each Array(5) as _, i}
                  <Icon icon="ri:star-fill" class="w-4 h-4 {i < Math.floor(product.rating) ? 'text-slate-900' : 'text-slate-100'}" />
                {/each}
             </div>
             <span class="text-xs font-black text-slate-400 uppercase tracking-widest">({product.reviewCount} Reviews)</span>
          </div>
        </div>

        <div class="space-y-2 mb-12 pb-12 border-b-2 border-slate-100">
           {#if product.oldPrice}
             <p class="text-base text-slate-400 line-through font-black italic">{formatNaira(product.oldPrice)}</p>
           {/if}
           <p class="text-5xl font-black text-slate-900 tracking-tighter">{formatNaira(product.price)}</p>
        </div>

        <p class="text-sm font-bold text-slate-500 uppercase tracking-tight leading-relaxed mb-12 italic">
           "{product.description || 'Superior quality and iconic design meet in this latest addition to our catalog. Built for reliability and performance.'}"
        </p>

        <!-- Actions -->
        <div class="space-y-4">
          <div class="flex items-center gap-6 mb-4">
             <span class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Quantity</span>
             <div class="flex items-center border-2 border-slate-900 h-12">
                <button class="w-12 h-full flex items-center justify-center hover:bg-slate-100 transition-all font-black" on:click={() => quantity = Math.max(1, quantity - 1)}>-</button>
                <span class="w-12 text-center font-black">{quantity}</span>
                <button class="w-12 h-full flex items-center justify-center hover:bg-slate-100 transition-all font-black" on:click={() => quantity = quantity + 1}>+</button>
             </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Button variant="primary" className="bg-slate-900 text-white border-2 border-slate-900 rounded-none h-16 font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                ADD TO CART
             </Button>
             <Button variant="outline" className="border-2 border-slate-900 rounded-none h-16 font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                WISHLIST
             </Button>
          </div>
        </div>
      </div>
    </div>

  <!-- PRODUCT DETAILS TABS -->
  <section class="container max-w-7xl mx-auto px-4 mb-32">
    <div class="border-4 border-slate-900 bg-white">
      <div class="flex border-b-4 border-slate-900 overflow-x-auto no-scrollbar">
        {#each ["description", "shipping", "returns", "trust"] as tab}
          <button
            on:click={() => (activeTab = tab)}
            class="flex-shrink-0 px-8 py-4 text-xs font-black uppercase tracking-widest border-r-4 border-slate-900 last:border-r-0
            {activeTab === tab ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'}"
          >
            {tab === "trust" ? "Trust & Safety" : tab}
          </button>
        {/each}
      </div>

      <div class="p-10 md:p-16">
        {#if activeTab === "description"}
          <div class="prose prose-slate max-w-none text-sm font-bold uppercase tracking-tight leading-relaxed italic">
            {@html product.longDescription || product.description}
          </div>
        {:else if activeTab === "shipping"}
          <div class="grid md:grid-cols-2 gap-12">
            <div class="space-y-2 border-l-4 border-slate-900 pl-6">
              <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Standard Delivery</span>
              <p class="text-lg font-black italic">{product.shipping?.estimatedDays || '3-5 Business Days'}</p>
            </div>
            <div class="space-y-2 border-l-4 border-slate-900 pl-6">
              <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Shipping Cost</span>
              <p class="text-lg font-black italic">{product.shipping?.freeShipping ? 'FREE' : formatNaira(product.shipping?.price || 0)}</p>
            </div>
          </div>
        {:else if activeTab === "returns"}
          <div class="space-y-8">
            <div class="space-y-2 border-l-4 border-slate-900 pl-6">
              <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Return Window</span>
              <p class="text-lg font-black italic">{product.returns?.days || 7} DAYS</p>
            </div>
            <div class="space-y-2 border-l-4 border-slate-900 pl-6">
              <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">Conditions</span>
              <p class="text-lg font-black italic">{product.returns?.conditions || 'Original packaging and unworn'}</p>
            </div>
          </div>
        {:else if activeTab === "trust"}
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-slate-100 p-8 border-2 border-slate-900">
               <Icon icon="mdi:shield-check" class="w-8 h-8 mb-4" />
               <h4 class="font-black uppercase tracking-tighter mb-2 italic">Secured</h4>
               <p class="text-[10px] font-bold text-slate-500 uppercase">Payment held in escrow until delivery confirmed.</p>
            </div>
            <div class="bg-slate-100 p-8 border-2 border-slate-900">
               <Icon icon="mdi:star" class="w-8 h-8 mb-4" />
               <h4 class="font-black uppercase tracking-tighter mb-2 italic">Rated</h4>
               <p class="text-[10px] font-bold text-slate-500 uppercase">Shop Trust Score: {shop.trustScore || 85}%.</p>
            </div>
            <div class="bg-slate-100 p-8 border-2 border-slate-900">
               <Icon icon="mdi:check-decagram" class="w-8 h-8 mb-4" />
               <h4 class="font-black uppercase tracking-tighter mb-2 italic">Verified</h4>
               <p class="text-[10px] font-bold text-slate-500 uppercase">Identity and location verified by VendorHub.</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </section>

    <!-- REVIEWS -->
    <section class="mb-32">
       <div class="flex items-center justify-between mb-12 border-b-4 border-slate-900 pb-8">
          <h2 class="text-3xl font-black uppercase tracking-tighter italic">REVIEWS /</h2>
       </div>
       <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-900 border-2 border-slate-900">
          {#each product.reviews?.slice(0, 3) || [] as review}
            <div class="bg-white">
              <ReviewCard {review} />
            </div>
          {/each}
       </div>
    </section>

    <!-- RELATED -->
    {#if relatedProducts?.length > 0}
      <section>
        <div class="flex items-center justify-between mb-12 border-b-4 border-slate-900 pb-8">
           <h2 class="text-3xl font-black uppercase tracking-tighter italic">SEE ALSO /</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-900 border-2 border-slate-900">
           {#each relatedProducts as related}
             <div class="bg-white">
               <ProductCard product={related} shopSlug={shop?.slug} />
             </div>
           {/each}
        </div>
      </section>
    {/if}
  </div>
</div>
