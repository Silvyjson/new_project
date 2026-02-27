<!-- src/lib/components/app/SearchBar.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  
  let searchQuery = '';
  let showDropdown = false;
  let searchResults = [];
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    goto(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
</script>

<div class="relative">
  <div class="relative">
    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
    <input
      type="text"
      placeholder="Search products, shops, vendors…"
      class="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl border border-transparent 
             focus:bg-surface focus:border-primary focus:ring-3 focus:ring-primary/15 
             outline-none transition-all text-body placeholder-gray-500"
      bind:value={searchQuery}
      on:keydown={handleKeydown}
      on:focus={() => showDropdown = true}
      on:blur={() => setTimeout(() => showDropdown = false, 200)}
    />
  </div>
  
  <!-- Search Dropdown -->
  {#if showDropdown && searchQuery.length > 0}
    <div class="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl shadow-card border border-gray-200 overflow-hidden z-50">
      <div class="p-3 border-b border-gray-100">
        <p class="text-xs font-medium text-text-muted uppercase tracking-wide">Quick Search</p>
      </div>
      <div class="max-h-[300px] overflow-y-auto">
        <!-- Products -->
        <div class="p-2">
          <p class="text-xs font-medium text-text-muted mb-2">Products</p>
          {#each [1, 2, 3] as i}
            <a href="#" class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="w-10 h-10 bg-gray-100 rounded-lg"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-text-main truncate">Product Name {i}</p>
                <p class="text-xs text-text-muted">Shop Name</p>
              </div>
              <span class="text-sm font-semibold text-primary">₦{(i * 10000).toLocaleString()}</span>
            </a>
          {/each}
        </div>
        
        <!-- Shops -->
        <div class="p-2 border-t border-gray-100">
          <p class="text-xs font-medium text-text-muted mb-2">Shops</p>
          {#each [1, 2] as i}
            <a href="#" class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                {String.fromCharCode(64 + i)}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-text-main truncate">Shop Name {i}</p>
                <p class="text-xs text-text-muted">Verified • 4.8★</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
      <div class="p-3 border-t border-gray-100 text-center">
        <button on:click={handleSearch} class="text-sm font-medium text-primary hover:underline">
          View all results →
        </button>
      </div>
    </div>
  {/if}
</div>