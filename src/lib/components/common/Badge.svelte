<!-- src/lib/components/common/Badge.svelte -->
<script lang="ts">
    export let variant: "default" | "success" | "warning" | "danger" | "info" =
        "default";
    export let size: "sm" | "md" = "sm";
    export let className: string = "";

    $: variantClasses = {
        default: "bg-gray-100 text-gray-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        danger: "bg-red-100 text-red-700",
        info: "bg-primary/10 text-primary",
    }[variant];

    $: sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
    }[size];

    $: classes =
        `inline-flex items-center font-medium rounded-full ${variantClasses} ${sizeClasses} ${className}`.trim();
</script>

<span class={classes}>
    <slot />
</span>
