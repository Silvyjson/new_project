<!-- src/lib/components/ui/TrustScore.svelte -->
<script lang="ts">
    export let value: number; // 0-100

    // Color logic based on score
    $: colorClass =
        value >= 90
            ? "text-green-600"
            : value >= 70
              ? "text-primary"
              : value >= 50
                ? "text-yellow-600"
                : "text-red-600";

    $: bgClass =
        value >= 90
            ? "bg-green-100"
            : value >= 70
              ? "bg-primary/10"
              : value >= 50
                ? "bg-yellow-100"
                : "bg-red-100";
</script>

<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full {bgClass}">
    <span class="font-bold {colorClass}">{value}</span>
    <span class="text-xs text-gray-muted">Trust Score</span>
</div>
