<!-- src/lib/components/common/Button.svelte -->
<script lang="ts">
    interface Props {
        variant?:
            | "primary"
            | "secondary"
            | "outline"
            | "ghost"
            | "white"
            | "black"
            | "danger"
            | "ivory";
        size?: "sm" | "md" | "lg" | "xl";
        href?: string | null;
        type?: "button" | "submit" | "reset";
        disabled?: boolean;
        target?: string;
        className?: string;
        class?: string;
        title?: string;
        onclick?: (e: MouseEvent) => void;
        children?: any;
        loading?: boolean;
    }

    let {
        variant = "primary",
        size = "md",
        href = null,
        type = "button",
        disabled = false,
        className = "",
        class: classProp = "",
        title = "",
        target = "_self",
        onclick = () => {},
        children,
        loading = false,
    }: Props = $props();

    // Class composition
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-btn transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = $derived(
        {
            white: "bg-white text-black hover:bg-white-hover shadow-card hover:shadow-card-hover",
            black: "bg-black text-white hover:bg-black-hover shadow-card hover:shadow-card-hover",
            primary:
                "bg-primary text-white hover:bg-primary-hover shadow-card hover:shadow-card-hover",
            secondary: "bg-dark text-white hover:bg-gray-800",
            outline: "border-2 border-primary text-primary hover:bg-primary/5",
            ghost: "text-primary hover:bg-primary/5",
            danger: "bg-red-500 text-white hover:bg-red-600",
            ivory: "bg-primary/5 text-primary hover:bg-primary/5",
        }[variant],
    );

    const sizeClasses = $derived(
        {
            sm: "px-3 py-1.5 text-sm",
            md: "px-5 py-2.5 text-base",
            lg: "px-6 py-3 text-lg",
            xl: "px-8 py-4 text-xl",
        }[size],
    );

    const classes = $derived(
        `${baseClasses} ${variantClasses} ${sizeClasses} ${className} ${classProp}`.trim(),
    );
</script>

{#if href}
    <a {href} {target} class={classes} role="button">
        {@render children?.()}
    </a>
{:else}
    <button {type} class={classes} disabled={disabled || loading} {title} {onclick}>
        {#if loading}
            <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
        {/if}
        {@render children?.()}
    </button>
{/if}
