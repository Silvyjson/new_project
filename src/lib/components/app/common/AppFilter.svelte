<!-- src/lib/components/common/AppFilter.svelte -->
<script lang="ts">
  import Icon from "@iconify/svelte";
  import Card from "../../common/Card.svelte";
  import Input from "../../common/Input.svelte";
  import { fade } from "svelte/transition";
  import type { Snippet } from "svelte";

  interface Props {
    searchQuery: string;
    layoutView?: "grid" | "table";
    onSearchInput?: (value: string) => void;
    onLayoutChange?: (layout: "grid" | "table") => void;
    placeholder?: string;
    extraFilters?: Snippet;
  }

  let {
    searchQuery = $bindable(),
    layoutView = "grid",
    onSearchInput,
    onLayoutChange,
    placeholder = "Search...",
    extraFilters
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
  </Card>
</section>
