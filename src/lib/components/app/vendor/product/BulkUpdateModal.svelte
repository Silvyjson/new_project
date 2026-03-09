<!-- src/lib/components/inventory/BulkUpdateModal.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let onClose: () => void;
  export let selectedItems: string[];
  
  let updateType: 'add' | 'set' | 'multiply' = 'add';
  let updateValue: string = '';
  let applyTo: 'selected' | 'filtered' = 'selected';
  
  const handleBulkUpdate = () => {
    // In real app: API call to bulk update stock
    console.log('Bulk update', { updateType, updateValue, applyTo, selectedItems });
    onClose();
  };
</script>

<!-- Modal Overlay -->
<div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-dark/45 backdrop-blur-sm" on:click={onClose}></div>
  
  <!-- Modal Content -->
  <Card className="relative bg-surface p-6 w-full max-w-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:update" class="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-text-main">Bulk Update Stock</h3>
          <p class="text-xs text-text-muted">Update stock for multiple products</p>
        </div>
      </div>
      <button on:click={onClose} class="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Form -->
    <div class="space-y-6">
      <!-- Apply To -->
      <div>
        <label for="" class="block text-sm font-medium text-text-main mb-2">Apply To</label>
        <div class="flex gap-3">
          <label for="" class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="applyTo"
              value="selected"
              bind:group={applyTo}
              class="w-4 h-4 text-primary"
            />
            <span class="text-body text-text-main">Selected ({selectedItems.length})</span>
          </label>
          <label for="" class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="applyTo"
              value="filtered"
              bind:group={applyTo}
              class="w-4 h-4 text-primary"
            />
            <span class="text-body text-text-main">All filtered</span>
          </label>
        </div>
      </div>
      
      <!-- Update Type -->
      <div>
        <label for="" class="block text-sm font-medium text-text-main mb-2">Update Type</label>
        <div class="grid grid-cols-3 gap-3">
          <label for="" class="flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors
                       {updateType === 'add' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
            <input type="radio" name="updateType" value="add" bind:group={updateType} class="w-4 h-4 text-primary" />
            <Icon icon="mdi:plus-circle-outline" class="w-6 h-6 text-text-muted" />
            <span class="text-sm text-text-main">Add</span>
          </label>
          <label for="" class="flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors
                       {updateType === 'set' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
            <input type="radio" name="updateType" value="set" bind:group={updateType} class="w-4 h-4 text-primary" />
            <Icon icon="mdi:equals" class="w-6 h-6 text-text-muted" />
            <span class="text-sm text-text-main">Set To</span>
          </label>
          <label for="" class="flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors
                       {updateType === 'multiply' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
            <input type="radio" name="updateType" value="multiply" bind:group={updateType} class="w-4 h-4 text-primary" />
            <Icon icon="mdi:multiply" class="w-6 h-6 text-text-muted" />
            <span class="text-sm text-text-main">Multiply</span>
          </label>
        </div>
      </div>
      
      <!-- Value -->
      <div>
        <label for="" class="block text-sm font-medium text-text-main mb-1.5">
          {updateType === 'add' ? 'Add Quantity' : updateType === 'set' ? 'Set Stock To' : 'Multiply By'}
        </label>
        <input
          type="number"
          min={updateType === 'multiply' ? 0 : 1}
          placeholder={updateType === 'add' ? 'e.g., 10' : updateType === 'set' ? 'e.g., 50' : 'e.g., 2'}
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
          bind:value={updateValue}
        />
      </div>
      
      <!-- Warning -->
      {#if updateType !== 'add'}
        <div class="p-4 bg-warning/10 border border-warning/30 rounded-xl">
          <p class="text-sm text-warning flex items-center gap-2">
            <Icon icon="mdi:alert-circle-outline" class="w-4 h-4" />
            {updateType === 'set' 
              ? 'This will overwrite current stock values' 
              : 'This will multiply current stock values'}
          </p>
        </div>
      {/if}
    </div>
    
    <!-- Actions -->
    <div class="flex gap-3 mt-8 pt-4 border-t border-gray-200">
      <Button variant="outline" size="lg" class="flex-1" onclick={onClose}>
        Cancel
      </Button>
      <Button 
        variant="primary" 
        size="lg" 
        class="flex-1" 
        onclick={handleBulkUpdate}
        disabled={!updateValue || parseInt(updateValue) < (updateType === 'multiply' ? 0 : 1)}
      >
        <Icon icon="mdi:check-circle-outline" class="w-5 h-5 mr-2" />
        Apply Update
      </Button>
    </div>
  </Card>
</div>