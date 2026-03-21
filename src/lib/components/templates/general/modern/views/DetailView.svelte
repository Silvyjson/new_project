<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import { formatNaira } from "$lib/utils/format";
  
  // Components
  import Button from "$lib/components/common/Button.svelte";
  import Badge from "$lib/components/common/Badge.svelte";
  import ReviewCard from "../components/ReviewCard.svelte";
  import ProductCard from "../components/ProductCard.svelte";

  export let data: any;

  $: ({ product = {}, shop = {}, relatedProducts = [] } = data || {});

  let selectedImage = 0;
  let quantity = 1;
  let selectedSize = "";
  let selectedColor = "";
  let activeTab = "description";

  const nextImage = () => {
    selectedImage = (selectedImage + 1) % (product.images?.length || 1);
  };

  const prevImage = () => {
    selectedImage = (selectedImage - 1 + (product.images?.length || 1)) % (product.images?.length || 1);
  };

  onMount(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  $: discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
</script>

<div class="pt-30">
  <div class="container max-w-7xl mx-auto px-4">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-12" in:fly={{ y: 10, duration: 600 }}>
      <a href="/shop/{shop?.slug}" class="hover:text-primary-400">Home</a>
      <Icon icon="lucide:chevron-right" class="w-2.5 h-2.5" />
      <a href="/shop/{shop?.slug}/product" class="hover:text-primary-400">Products</a>
      <Icon icon="lucide:chevron-right" class="w-2.5 h-2.5" />
      <span class="text-white line-clamp-1">{product.name}</span>
    </nav>

    <div class="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
      <!-- 🔷 IMAGE GALLERY: Minimalist & Immersive -->
      <div class="lg:col-span-7 space-y-6" in:fly={{ x: -20, duration: 800 }}>
        <div class="relative aspect-square rounded-[40px] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group">
          {#key selectedImage}
            <img 
              src={product.images?.[selectedImage]} 
              alt={product.name} 
              class="w-full h-full object-cover"
              in:fade={{ duration: 400 }}
            />
          {/key}
          
          <!-- Navigation Arrows -->
          {#if product.images?.length > 1}
            <div class="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                on:click={prevImage}
                class="w-12 h-12 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary-500 transition-all"
              >
                <Icon icon="lucide:chevron-left" class="w-6 h-6" />
              </button>
              <button 
                on:click={nextImage}
                class="w-12 h-12 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary-500 transition-all"
              >
                <Icon icon="lucide:chevron-right" class="w-6 h-6" />
              </button>
            </div>
          {/if}

          <!-- Discount Badge -->
          {#if discount > 0}
            <div class="absolute top-8 right-8">
              <div class="w-16 h-16 rounded-full bg-primary-500 text-white flex flex-col items-center justify-center shadow-xl shadow-primary-500/30">
                <span class="text-xs font-black uppercase tracking-tighter">Save</span>
                <span class="text-lg font-black">{discount}%</span>
              </div>
            </div>
          {/if}
        </div>

        <!-- Thumbnails -->
        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {#each product.images || [] as img, i}
            <button 
              on:click={() => (selectedImage = i)}
              class="w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0
              {selectedImage === i ? 'border-primary-500 scale-95 shadow-lg shadow-primary-500/20' : 'border-white/5 grayscale opacity-50 hover:opacity-100 hover:grayscale-0'}"
            >
              <img src={img} alt="" class="w-full h-full object-cover" />
            </button>
          {/each}
        </div>
      </div>

      <!-- 🔷 PRODUCT INFO: Bold & Clean -->
      <div class="lg:col-span-5 space-y-10" in:fly={{ x: 20, duration: 800 }}>
        <div class="space-y-4">
          <Badge variant="primary" className="bg-primary-500/10 text-primary-400 border border-primary-500/20 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
            {product.category}
          </Badge>
          <h1 class="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9]">
            {product.name}
          </h1>
          <div class="flex items-center gap-4 pt-2">
            <div class="flex text-yellow-500">
              {#each Array(5) as _, i}
                <Icon icon={i < Math.floor(product.rating) ? "ri:star-fill" : "ri:star-line"} class="w-4 h-4" />
              {/each}
            </div>
            <span class="text-sm text-slate-500 font-medium">|</span>
            <span class="text-sm text-slate-400 font-medium">{product.reviewCount} Verified Reviews</span>
          </div>
        </div>

        <div class="space-y-2">
          {#if product.oldPrice}
            <p class="text-lg text-slate-500 line-through font-medium">{formatNaira(product.oldPrice)}</p>
          {/if}
          <div class="flex items-baseline gap-4">
            <p class="text-5xl font-black text-white tracking-tighter">{formatNaira(product.price)}</p>
            {#if product.stockStatus === 'low'}
              <span class="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                Only {product.stockCount} left in stock
              </span>
            {/if}
          </div>
        </div>

        <p class="text-lg text-slate-400 leading-relaxed font-medium italic">
          "{product.description || 'Elevate your style with this premium piece from our latest collection. Crafted for durability and designed for the modern lifestyle.'}"
        </p>

        <!-- Variants & Interaction -->
        <div class="space-y-8 pt-8 border-t border-white/5">
          <!-- Quantity -->
          <div class="flex items-center gap-6">
            <span class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Quantity</span>
            <div class="flex items-center bg-slate-900 border border-white/10 rounded-2xl h-12 overflow-hidden">
              <button 
                class="w-12 h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                on:click={() => quantity = Math.max(1, quantity - 1)}
              >
                <Icon icon="lucide:minus" class="w-4 h-4" />
              </button>
              <span class="w-12 text-center text-white font-black">{quantity}</span>
              <button 
                class="w-12 h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                on:click={() => quantity = quantity + 1}
              >
                <Icon icon="lucide:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="primary" size="lg" className="rounded-2xl h-16 text-lg font-bold shadow-2xl shadow-primary-500/30 w-full">
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl h-16 text-lg border-white/10 text-white font-bold hover:bg-white/5 w-full">
              Add to Wishlist
            </Button>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="grid grid-cols-3 gap-6 pt-12">
            <div class="flex flex-col items-center text-center gap-2">
                <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-400">
                    <Icon icon="lucide:truck" class="w-5 h-5" />
                </div>
                <span class="text-[9px] font-bold uppercase tracking-widest text-slate-500 leading-tight">Fast Delivery</span>
            </div>
            <div class="flex flex-col items-center text-center gap-2">
                <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-400">
                    <Icon icon="lucide:shield-check" class="w-5 h-5" />
                </div>
                <span class="text-[9px] font-bold uppercase tracking-widest text-slate-500 leading-tight">Secure Payment</span>
            </div>
            <div class="flex flex-col items-center text-center gap-2">
                <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-400">
                    <Icon icon="lucide:rotate-ccw" class="w-5 h-5" />
                </div>
                <span class="text-[9px] font-bold uppercase tracking-widest text-slate-500 leading-tight">Easy Returns</span>
            </div>
        </div>
      </div>
    </div>

    <!-- 🔷 PRODUCT DETAILS TABS -->
    <section class="mb-32">
      <div class="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden">
        <!-- Tab Navigation -->
        <div class="flex gap-4 p-4 md:p-6 border-b border-white/10 overflow-x-auto no-scrollbar">
          {#each ["description", "shipping", "returns", "trust"] as tab}
            <button
              on:click={() => (activeTab = tab)}
              class="px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all
              {activeTab === tab ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}"
            >
              {tab === "trust" ? "Trust & Safety" : tab}
            </button>
          {/each}
        </div>

        <!-- Tab Content -->
        <div class="p-8 md:p-16">
          {#if activeTab === "description"}
            <div 
              class="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed font-medium"
              in:fade={{ duration: 400 }}
            >
              {@html product.longDescription || product.description}
            </div>
          {:else if activeTab === "shipping"}
            <div class="grid md:grid-cols-2 gap-12" in:fade={{ duration: 400 }}>
              <div class="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">Standard Delivery</span>
                <p class="text-2xl font-black text-white">{product.shipping?.estimatedDays || '3-5 Business Days'}</p>
                <p class="text-sm text-slate-500 leading-relaxed font-medium">Reliable shipping through our partner network with real-time tracking.</p>
              </div>
              <div class="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">Shipping Cost</span>
                <p class="text-2xl font-black text-white">{product.shipping?.freeShipping ? 'FREE' : formatNaira(product.shipping?.price || 0)}</p>
                <p class="text-sm text-slate-500 leading-relaxed font-medium">Professional packaging included to ensure your items arrive in perfect condition.</p>
              </div>
            </div>
          {:else if activeTab === "returns"}
            <div class="grid md:grid-cols-2 gap-12" in:fade={{ duration: 400 }}>
              <div class="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">Return Window</span>
                <p class="text-2xl font-black text-white">{product.returns?.days || 7} Days</p>
                <p class="text-sm text-slate-500 leading-relaxed font-medium">Easy return process within the specified window if the product doesn't meet expectations.</p>
              </div>
              <div class="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">Conditions</span>
                <p class="text-2xl font-black text-white">Verified Unused</p>
                <p class="text-sm text-slate-500 leading-relaxed font-medium">{product.returns?.conditions || 'Must be in original packaging and unworn to be eligible for return.'}</p>
              </div>
            </div>
          {:else if activeTab === "trust"}
            <div class="grid md:grid-cols-3 gap-8" in:fade={{ duration: 400 }}>
              {#each [
                { icon: 'lucide:shield-check', title: 'Protected', text: 'Secured escrow system holds payment until delivery.' },
                { icon: 'lucide:star', title: 'Curated', text: `Shop Trust Score: ${shop.trustScore || 85}% based on verified sales.` },
                { icon: 'lucide:check-circle', title: 'Authenticated', text: 'Brand and vendor identity verified by VendorHub.' }
              ] as item}
                <div class="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4 hover:bg-white/10 transition-colors">
                  <div class="w-12 h-12 rounded-2xl bg-primary-500/20 text-primary-400 flex items-center justify-center">
                    <Icon icon={item.icon} class="w-6 h-6" />
                  </div>
                  <h4 class="text-xl font-black text-white tracking-tight uppercase">{item.title}</h4>
                  <p class="text-sm text-slate-500 leading-relaxed font-medium">{item.text}</p>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </section>

    <!-- 🔷 REVIEWS SECTION -->
    <section class="border-t border-white/5 pt-32 mb-32" id="reviews">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div class="space-y-4">
                <h2 class="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Customer Voices</h2>
                <div class="flex items-center gap-4">
                    <p class="text-4xl font-black text-white">{product.rating}</p>
                    <div class="flex text-yellow-500 mb-1">
                        {#each Array(5) as _, i}
                            <Icon icon={i < Math.floor(product.rating) ? "ri:star-fill" : "ri:star-line"} class="w-5 h-5" />
                        {/each}
                    </div>
                    <p class="text-slate-500 font-medium">Based on {product.reviewCount} reviews</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each product.reviews?.slice(0, 6) || [] as review}
                <ReviewCard {review} />
            {/each}
        </div>
    </section>

    <!-- 🔷 RELATED PRODUCTS -->
    {#if relatedProducts?.length > 0}
      <section class="border-t border-white/5 pt-32">
        <div class="flex items-center justify-between mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">More to Love</h2>
          <a href="/shop/{shop?.slug}/product" class="text-sm font-bold text-primary-400 hover:text-white uppercase tracking-widest transition-colors">
            View All Collection
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {#each relatedProducts as related}
            <ProductCard product={related} shopSlug={shop?.slug} />
          {/each}
        </div>
      </section>
    {/if}
  </div>
</div>

<style>
  :global(.scrollbar-hide::-webkit-scrollbar) {
    display: none;
  }
  :global(.scrollbar-hide) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
