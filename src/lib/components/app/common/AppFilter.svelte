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
    aside?: boolean;
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
    onClearAll,
    aside = false
  }: Props = $props();
</script>

<section in:fade={{ duration: 400, delay: 200 }}>
  <Card className={`border border-gray-200 p-4 ${aside ? "h-fit" : ""}`}>

    <!-- Main Layout -->
    <div
      class={`flex gap-4 ${
        aside
          ? "flex-col items-stretch"
          : "flex-col md:flex-row md:items-center justify-between"
      }`}
    >
      
      <!-- Search -->
      <div class={`${aside ? "w-full" : "w-full md:w-96"}`}>
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

      <!-- Filters + Layout -->
      <div
        class={`flex gap-3 ${
          aside
            ? "flex-col items-stretch"
            : "flex-wrap items-center justify-between"
        }`}
      >

        <!-- Extra Filters -->
        {#if extraFilters}
          <div
            class={`flex gap-3 ${
              aside ? "flex-col" : "flex-wrap"
            }`}
          >
            {@render extraFilters()}
          </div>
        {/if}

        <!-- Layout Toggle -->
        {#if onLayoutChange && !aside}
          <div class="flex gap-2 border border-gray-300 rounded-lg p-1 w-fit">
            <button
              class={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                layoutView === "grid"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-main"
              }`}
              onclick={() => onLayoutChange("grid")}
              title="Grid view"
            >
              <Icon icon="mdi:view-grid" class="w-4 h-4" />
            </button>

            <button
              class={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                layoutView === "table"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text-main"
              }`}
              onclick={() => onLayoutChange("table")}
              title="Table view"
            >
              <Icon icon="mdi:table" class="w-4 h-4" />
            </button>
          </div>
        {/if}

      </div>
    </div>

    <!-- Active Chips -->
    {#if activeChips.length > 0}
      <div
        class={`flex flex-wrap items-center gap-2 ${
          aside ? "mt-4 pt-3 border-t border-gray-100" : "mt-4 pt-4 border-t border-gray-100"
        }`}
        in:fade={{ duration: 300 }}
      >
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