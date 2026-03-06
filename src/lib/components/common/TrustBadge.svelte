<!-- src/lib/components/common/TrustBadge.svelte -->
<script lang="ts">
    export let verified: boolean = true;
    export let size: "xs" | "sm" | "md" | "lg" = "md";
    export let showText: boolean = true;
    export let text: string = "Verified";
    export let className: string = "";

    $: sizeClasses = {
        xs: "text-xs px-2.5 py-0.5",
        sm: "text-xs px-2.5 py-0.5",
        md: "text-sm px-3.5 py-1",
        lg: "text-base px-4 py-1.5",
    }[size];

    $: iconSize = {
        xs: "w-3 h-3",
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    }[size];

    $: classes =
        `relative inline-flex items-center shadow-md rounded-full text-white font-semibold bg-gradient-to-r from-primary to-primary-light ${showText ? "gap-2" : ""}
         ${sizeClasses} ${className}`.trim();
</script>

{#if verified}
    <span class={classes} role="status" aria-label="Verified vendor">
        <!-- Subtle Glow Ring -->
        <span
            class="absolute inset-0 rounded-full bg-primary opacity-20 blur-md"
            aria-hidden="true"
        ></span>

        <!-- Icon Wrapper -->
        <span
            class="relative flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
            class:px-1={size !== "sm"}
        >
            <svg
                class={iconSize}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        </span>

        {#if showText}
            <span class="relative tracking-wide"> {text} </span>
        {/if}

        <!-- Shine Effect -->
        <span
            class="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
        >
            <span
                class="absolute -left-1/3 top-0 h-full w-1/3 bg-white/20 skew-x-[-20deg] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            ></span>
        </span>
    </span>
{/if}
