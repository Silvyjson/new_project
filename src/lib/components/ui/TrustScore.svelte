<!-- src/lib/components/ui/TrustScore.svelte -->
<script lang="ts">
  export let value: number;
  export let size: "sm" | "md" | "lg" = "md";
  export let showLabel: boolean = true;
  export let className: string = "";

  $: colorClass =
    value >= 90
      ? "text-success"
      : value >= 70
        ? "text-primary"
        : value >= 50
          ? "text-yellow-500"
          : "text-error";

  $: bgClass =
    value >= 90
      ? "bg-success"
      : value >= 70
        ? "bg-primary"
        : value >= 50
          ? "bg-yellow-500"
          : "bg-error";

  $: sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }[size];

  $: classes =
    `inline-flex items-center gap-2 ${bgClass}/10 rounded-full ${sizeClasses} ${className}`.trim();
</script>

<div class={classes}>
  <span class="font-bold {colorClass}">{value}%</span>
  {#if showLabel}
    <span class="text-text-muted">Trust Score</span>
  {/if}
</div>
