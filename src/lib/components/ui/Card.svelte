<!-- src/lib/components/ui/Card.svelte -->
<script lang="ts">
    export let className: string = "";
    export let hover: boolean = true;
    export let padding: "none" | "sm" | "md" | "lg" = "md";

    $: paddingClass = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    }[padding];

    $: hoverClass = hover ? "hover:shadow-card-hover transition-shadow" : "";
    $: classes =
        `bg-surface rounded-card shadow-card ${paddingClass} ${hoverClass} ${className}`.trim();
</script>

<div class={classes}>
    <slot />
</div>
