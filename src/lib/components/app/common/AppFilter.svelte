<!-- src/lib/components/common/AppFilter.svelte -->
<script lang="ts">
  import Icon from "@iconify/svelte";
  import Card from "../../common/Card.svelte";
  import Input from "../../common/Input.svelte";
  import { fade } from "svelte/transition";
  import type { Snippet } from "svelte";

  export interface FilterChip {
    type: string;
    value: string;
    label: string;
  }

  interface Props {
    searchQuery: string;
    layoutView?: "grid" | "table";
    onSearchInput?: (value: string) => void;
    onLayoutChange?: (layout: "grid" | "table") => void;
    placeholder?: string;
    extraFilters?: Snippet;
    activeChips?: FilterChip[];
    onRemoveChip?: (chip: FilterChip) => void;
    onClearAll?: () => void;
  }

  let {
    searchQuery = $bindable(),
    layoutView = "grid",
    onSearchInput,
    onLayoutChange,
    placeholder = "Search...",
    extraFilters,
    activeChips = [],
    onRemoveChip,
    onClearAll
  }: Props = $props();
</script>

<section in:fade={{ duration: 400, delay: 200 }}>
  <Card className="border border-gray-200 p-4">
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      
      <!-- Search Bar -->
      <div class="w-full md:w-96">
        <Input
          label=""
          name="search"
          {placeholder}
          value={searchQuery}
          oninput={(e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            searchQuery = value;
            onSearchInput?.(value);
          }}
        />
      </div>

      <!-- Filters & Layout Toggle -->
      <div class="flex flex-wrap items-stretch md:items-center gap-3 justify-between">
        
        <!-- Custom Filters Slot -->
        {#if extraFilters}
          <div class="flex flex-wrap gap-3">
            {@render extraFilters()}
          </div>
        {/if}

        <!-- Layout Toggle (Optional) -->
        {#if onLayoutChange}
          <div class="w-full md:w-fit flex justify-end">
            <div class="flex gap-2 w-fit border border-gray-300 rounded-lg p-1">
              <button
                class="px-3 py-2 rounded-md text-sm font-medium transition-all {layoutView === 'grid'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text-main'}"
                onclick={() => onLayoutChange("grid")}
                title="Grid view"
              >
                <Icon icon="mdi:view-grid" class="w-4 h-4" />
              </button>
              <button
                class="px-3 py-2 rounded-md text-sm font-medium transition-all {layoutView === 'table'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-text-main'}"
                onclick={() => onLayoutChange("table")}
                title="Table view"
              >
                <Icon icon="mdi:table" class="w-4 h-4" />
              </button>
            </div>
          </div>
        {/if}

      </div>
    </div>

    <!-- Active Filter Chips -->
    {#if activeChips.length > 0}
      <div class="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100" in:fade={{ duration: 300 }}>
        {#each activeChips as chip}
          <span class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {chip.label}
            <button 
              class="hover:text-primary-hover transition-colors" 
              onclick={() => onRemoveChip?.(chip)}
              title="Remove filter"
            >
              <Icon icon="mdi:close" class="w-3 h-3" />
            </button>
          </span>
        {/each}
        
        {#if onClearAll}
          <button
            class="text-xs text-text-muted hover:text-primary transition-colors underline font-medium ml-2"
            onclick={onClearAll}
          >
            Clear All
          </button>
        {/if}
      </div>
    {/if}
  </Card>
</section>
