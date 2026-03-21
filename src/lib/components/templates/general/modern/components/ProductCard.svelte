<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import { formatNaira } from "$lib/utils/format";
  import Badge from "$lib/components/common/Badge.svelte";

  export let product: any;
  export let shopSlug: string;

  let isHovered = false;

  const getStockBadge = (p: any) => {
    if (p.sale) return { text: "SALE", variant: "danger" as const };
    if (p.preorder) return { text: "PRE-ORDER", variant: "info" as const };
    if (p.new) return { text: "NEW", variant: "success" as const };
    return null;
  };

  const badge = getStockBadge(product);

  const calculateDiscount = (price: number, oldPrice: number) => {
    return Math.round((1 - price / oldPrice) * 100);
  };
</script>

<div 
  class="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden transition-all duration-700 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 h-full flex flex-col"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
>
  <!-- Image Container -->
  <a href="/shop/{shopSlug}/product/{product.code}" class="relative aspect-square overflow-hidden block">
    <img 
      src={product.images?.[0]} 
      alt={product.name} 
      class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
    />
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60"></div>
    
    <!-- Badge -->
    {#if badge}
      <div class="absolute top-5 left-5 z-10">
        <Badge variant={badge.variant} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-lg">
          {badge.text}
        </Badge>
      </div>
    {/if}

    <!-- Quick Actions Overlay -->
    <div 
      class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    >
      <button 
        class="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl hover:bg-primary-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
        title="Quick View"
      >
        <Icon icon="lucide:eye" class="w-5 h-5" />
      </button>
      <button 
        class="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl hover:bg-primary-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-150"
        title="Add to Wishlist"
      >
        <Icon icon="lucide:heart" class="w-5 h-5" />
      </button>
    </div>
  </a>

  <!-- Content -->
  <div class="p-6 flex flex-col flex-1">
    <div class="flex justify-between items-start mb-3">
      <div class="space-y-1">
        <p class="text-[10px] font-bold text-primary-400 uppercase tracking-widest">{product.category}</p>
        <h3 class="text-base font-bold text-white line-clamp-1 group-hover:text-primary-400 transition-colors">
          <a href="/shop/{shopSlug}/product/{product.code}">{product.name}</a>
        </h3>
      </div>
    </div>

    <!-- Rating -->
    <div class="flex items-center gap-1.5 mb-4">
      <div class="flex text-yellow-500">
        {#each Array(5) as _, i}
          <Icon icon={i < Math.floor(product.rating) ? "ri:star-fill" : "ri:star-line"} class="w-3.5 h-3.5" />
        {/each}
      </div>
      <span class="text-[11px] text-slate-400 font-medium">({product.reviewCount})</span>
    </div>

    <!-- Pricing & Add to Cart -->
    <div class="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-white/5">
      <div class="flex flex-col">
        {#if product.oldPrice && product.oldPrice > product.price}
          <span class="text-xs text-slate-500 line-through mb-0.5">
            {formatNaira(product.oldPrice)}
          </span>
        {/if}
        <span class="text-lg font-black text-white">
          {formatNaira(product.price)}
        </span>
      </div>
      
      <button 
        class="w-11 h-11 rounded-2xl bg-primary-500 text-white flex items-center justify-center hover:bg-primary-400 active:scale-95 transition-all shadow-lg shadow-primary-500/20"
        aria-label="Add to cart"
      >
        <Icon icon="lucide:shopping-cart" class="w-5 h-5" />
      </button>
    </div>
  </div>
</div>
