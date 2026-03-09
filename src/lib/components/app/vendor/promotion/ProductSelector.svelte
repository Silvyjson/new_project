<!-- src/lib/components/promotion/ProductSelector.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Input from '$lib/components/common/Input.svelte';
  
  export let products: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    inStock: boolean;
  }>;
  
  export let selectedProductIds: string[];
  export let onToggle: (productId: string) => void;
  
  let searchQuery = '';
  let categoryFilter = 'all';
  
  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  $: filteredProducts = products.filter(p => {
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const toggleAll = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      // Deselect all
      filteredProducts.forEach(p => {
        const idx = selectedProductIds.indexOf(p.id);
        if (idx > -1) selectedProductIds.splice(idx, 1);
      });
    } else {
      // Select all
      filteredProducts.forEach(p => {
        if (!selectedProductIds.includes(p.id)) {
          selectedProductIds.push(p.id);
        }
      });
    }
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-4">
    <h3 class="font-semibold text-text-main">Select Products</h3>
    <button
      type="button"
      on:click={toggleAll}
      class="text-sm text-primary font-medium hover:underline"
    >
      {selectedProductIds.length === filteredProducts.length ? 'Deselect All' : 'Select All'}
    </button>
  </div>
  
  <!-- Search & Filter -->
  <div class="flex flex-col md:flex-row gap-3 mb-4">
    <div class="relative flex-1">
      <Input
        label=""
        name="search"
        placeholder="Search products..."
        value={searchQuery}
      />
      <Icon icon="mdi:magnify" class="w-5 h-5 text-text-muted absolute right-3 top-1/2 -translate-y-1/2" />
    </div>
    
    <select
      class="px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-surface"
      bind:value={categoryFilter}
    >
      {#each categories as cat}
        <option value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
      {/each}
    </select>
  </div>
  
  <!-- Product List -->
  <div class="space-y-3 max-h-80 overflow-y-auto">
    {#each filteredProducts as product}
      <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary cursor-pointer transition-colors">
        <input
          type="checkbox"
          class="w-4 h-4 text-primary rounded border-gray-300"
          checked={selectedProductIds.includes(product.id)}
          on:change={() => onToggle(product.id)}
        />
        <img src={product.image} alt={product.name} class="w-12 h-12 rounded-lg object-cover bg-gray-100" />
        <div class="flex-1 min-w-0">
          <p class="font-medium text-text-main text-sm truncate">{product.name}</p>
          <p class="text-xs text-text-muted">{product.category}</p>
        </div>
        <span class="text-sm font-semibold text-primary">₦{product.price.toLocaleString()}</span>
      </label>
    {/each}
    
    {#if filteredProducts.length === 0}
      <div class="text-center py-8">
        <Icon icon="mdi:package-variant" class="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p class="text-text-muted">No products found</p>
      </div>
    {/if}
  </div>
  
  <!-- Selected Count -->
  <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
    <p class="text-sm text-text-muted">
      {selectedProductIds.length} product{selectedProductIds.length !== 1 ? 's' : ''} selected
    </p>
    {#if selectedProductIds.length > 0}
      <button
        type="button"
        on:click={() => selectedProductIds = []}
        class="text-sm text-error hover:underline"
      >
        Clear Selection
      </button>
    {/if}
  </div>
</Card>