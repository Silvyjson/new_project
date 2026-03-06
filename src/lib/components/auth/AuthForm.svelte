<!-- src/lib/components/auth/AuthForm.svelte -->
<script lang="ts">
    import Card from "$lib/components/common/Card.svelte";

    export let className: string = "";
    export let loading: boolean = false;
    export let error: string = "";
    export let success: string = "";
</script>

<Card padding="lg" className="border border-gray-200 {className}">
    {#if error}
        <div
            class="mb-6 p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm flex items-start gap-3"
        >
            <span class="text-lg">⚠️</span>
            <span>{error}</span>
        </div>
    {/if}

    {#if success}
        <div
            class="mb-6 p-4 bg-success/10 border border-success/30 rounded-xl text-success text-sm flex items-start gap-3"
        >
            <span class="text-lg">✓</span>
            <span>{success}</span>
        </div>
    {/if}

    <slot />

    {#if $$slots.footer}
        <div class="mt-6 pt-6 border-t border-gray-200">
            <slot name="footer" />
        </div>
    {/if}

    {#if loading}
        <p class="text-center text-sm text-text-muted mt-4">Please wait...</p>
    {/if}
</Card>
