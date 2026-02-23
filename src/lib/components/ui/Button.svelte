<!-- src/lib/components/ui/Button.svelte -->
<script lang="ts">
    export let variant: "primary" | "secondary" | "outline" | "ghost" =
        "primary";
    export let size: "sm" | "md" | "lg" | "xl" = "md";
    export let href: string | null = null;
    export let type: "button" | "submit" | "reset" = "button";
    export let disabled = false;
    export let className: string = "";

    // Class composition
    $: baseClasses =
        "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    $: variantClasses = {
        primary:
            "bg-primary text-white hover:bg-primary-hover shadow-card hover:shadow-card-hover",
        secondary: "bg-dark text-white hover:bg-gray-800",
        outline: "border-2 border-primary text-primary hover:bg-primary/5",
        ghost: "text-primary hover:bg-primary/5",
    }[variant];

    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-xl",
    }[size];

    $: classes =
        `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();
</script>

{#if href}
    <a {href} class={classes} role="button">
        <slot />
    </a>
{:else}
    <button {type} class={classes} {disabled}>
        <slot />
    </button>
{/if}
