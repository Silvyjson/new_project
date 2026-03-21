<script lang="ts">
  import Icon from "@iconify/svelte";

  export let review: {
    userName: string;
    rating: number;
    date: string;
    content: string;
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

<div class="bg-white border-2 border-slate-900 p-8 flex flex-col h-full hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all">
  <div class="flex justify-between items-start mb-6">
    <div class="flex gap-1">
      {#each Array(5) as _, i}
        <Icon 
          icon="ri:star-fill" 
          class="w-4 h-4 {i < Math.floor(review.rating) ? 'text-slate-900' : 'text-slate-100'}" 
        />
      {/each}
    </div>
    <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">{formatDate(review.date)}</span>
  </div>

  <p class="text-sm font-bold text-slate-900 leading-relaxed mb-8 italic flex-1">
    "{review.content}"
  </p>

  <div class="pt-6 border-t-2 border-slate-900 flex items-center gap-4">
    <div class="w-10 h-10 bg-slate-100 border-2 border-slate-900 flex items-center justify-center font-black text-slate-900">
      {review.userName.charAt(0)}
    </div>
    <div>
      <h4 class="text-xs font-black uppercase tracking-tight text-slate-900">{review.userName}</h4>
      {#if review.productName}
        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{review.productName}</p>
      {/if}
    </div>
  </div>
</div>
