<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { formatNaira } from "$lib/utils/format";
  import Badge from "$lib/components/common/Badge.svelte";

  export let product: any;
  export let shopSlug: string;

  const getBadge = (p: any) => {
    if (p.sale) return "SALE";
    if (p.preorder) return "PRE-ORDER";
    if (p.new) return "NEW";
    return "";
  };

  const badgeText = getBadge(product);
</script>

<div class="bg-white border-2 border-slate-900 group relative flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
  <!-- Asset -->
  <a href="/shop/{shopSlug}/product/{product.code}" class="relative h-40 overflow-hidden border-b-2 border-slate-900 block group-hover:bg-slate-50 transition-colors">
    <img 
      src={product.images?.[0]} 
      alt={product.name} 
      class="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
    />
    
    {#if badgeText}
      <div class="absolute top-0 right-0 p-2">
        <span class="bg-slate-900 text-white text-[10px] font-black px-3 py-1 uppercase tracking-tighter">
          {badgeText}
        </span>
      </div>
    {/if}

    <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </a>

  <!-- Details -->
  <div class="p-4 flex-1 flex flex-col">
    <div class="mb-4">
      <span class="text-[8px] font-black tracking-widest text-slate-400 uppercase">{product.category}</span>
      <h3 class="text-sm font-black text-slate-900 uppercase tracking-tighter line-clamp-2 mt-1">
        <a href="/shop/{shopSlug}/product/{product.code}">{product.name}</a>
      </h3>
    </div>

    <div class="mt-auto space-y-2 pt-2 border-t border-slate-100">
      <div class="flex items-center justify-between">
        <p class="text-lg font-black text-slate-900">{formatNaira(product.price)}</p>
        <div class="flex gap-0.5">
          {#each Array(5) as _, i}
            <Icon icon="ri:star-fill" class="w-3 h-3 {i < Math.floor(product.rating) ? 'text-slate-900' : 'text-slate-200'}" />
          {/each}
        </div>
      </div>

      <button
        class="w-full py-4 bg-white border-2 border-slate-900 text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
      >
        ADD TO CART
      </button>
    </div>
  </div>
</div>
