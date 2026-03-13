<!-- src/lib/components/common/AppTable.svelte -->
<script lang="ts" generics="T">
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import type { Snippet } from "svelte";
  import Card from "../../common/Card.svelte";

  interface Props {
    items: T[];
    header?: Snippet;
    row: Snippet<[T, number]>;
    className?: string;
  }

  let { items, header, row, className = "" }: Props = $props();
</script>

<Card className="border border-gray-200 overflow-hidden {className}">
  <div
    class="overflow-x-auto"
    in:fade={{ duration: 300 }}
  >
    <table class="w-full text-sm">
      {#if header}
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50">
            {@render header()}
          </tr>
        </thead>
      {/if}
      <tbody>
        {#each items as item, i}
          <tr
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            in:fly={{
              y: 10,
              duration: 300,
              delay: i * 30,
              easing: cubicOut,
            }}
          >
            {@render row(item, i)}
          </tr>
        {:else}
          <tr>
            <td colspan={100} class="px-6 py-12 text-center text-text-muted">
              No data available
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Card>
