<script lang="ts">
  import Icon from "@iconify/svelte";
  import { formatNaira } from "$lib/utils/format";

  export let review: {
    userName: string;
    userAvatar?: string;
    rating: number;
    date: string;
    content: string;
    images?: string[];
    verifiedMatch?: boolean;
    productName?: string;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
</script>

<div class="bg-white/5 border border-white/10 rounded-3xl p-6 h-full flex flex-col transition-all hover:border-white/20">
  <div class="flex items-start justify-between mb-6">
    <div class="flex items-center gap-4">
      <div class="relative">
        {#if review.userAvatar}
          <img 
            src={review.userAvatar} 
            alt={review.userName} 
            class="w-12 h-12 rounded-2xl object-cover border border-white/10"
          />
        {:else}
          <div class="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-primary-400 font-black text-xl border border-white/10">
            {review.userName.charAt(0)}
          </div>
        {/if}
        {#if review.verifiedMatch}
          <div 
            class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-[#0f172a]"
            title="Verified Purchase"
          >
            <Icon icon="ri:checkbox-circle-fill" class="w-3 h-3" />
          </div>
        {/if}
      </div>
      <div>
        <h4 class="text-sm font-bold text-white mb-0.5">{review.userName}</h4>
        <p class="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{formatDate(review.date)}</p>
      </div>
    </div>

    <div class="flex gap-0.5">
      {#each Array(5) as _, i}
        <Icon 
          icon="ri:star-fill" 
          class="w-3 h-3 {i < Math.floor(review.rating) ? 'text-yellow-500' : 'text-slate-800'}" 
        />
      {/each}
    </div>
  </div>

  {#if review.productName}
    <p class="text-[10px] text-primary-400 font-bold uppercase tracking-wider mb-2">Purchased: {review.productName}</p>
  {/if}

  <p class="text-sm text-slate-400 leading-relaxed italic mb-6">
    "{review.content}"
  </p>

  {#if review.images && review.images.length > 0}
    <div class="mt-auto flex gap-2 overflow-x-auto pb-2">
      {#each review.images as img}
        <img 
          src={img} 
          alt="Review attached" 
          class="w-16 h-16 rounded-xl object-cover border border-white/10 hover:border-white/30 transition-colors pointer-events-none"
        />
      {/each}
    </div>
  {/if}
</div>
