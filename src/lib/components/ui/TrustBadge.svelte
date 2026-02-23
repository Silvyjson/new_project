<!-- src/lib/components/ui/TrustBadge.svelte -->
<script lang="ts">
    export let verified: boolean = true;
    export let size: "sm" | "md" | "lg" = "md";
    export let showText: boolean = true;
    export let className: string = "";

    $: sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
    }[size];

    $: classes =
        `inline-flex items-center gap-1.5 bg-primary text-white font-medium rounded-full ${sizeClasses} ${className}`.trim();
</script>

{#if verified}
    <span class={classes} role="status" aria-label="Verified vendor">
        <svg
            class="w-3.5 h-3.5 md:w-4 md:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M5 13l4 4L19 7"
            />
        </svg>
        {#if showText}
            <span>Verified</span>
        {/if}
    </span>
{/if}
