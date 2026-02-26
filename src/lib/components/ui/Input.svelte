<!-- src/lib/components/ui/Input.svelte -->
<script lang="ts">
    import { type HTMLInputAttributes } from "svelte/elements";

    export let label: string = "";
    export let name: string = "";
    export let type: string = "text";
    export let placeholder: string = "";
    export let required: boolean = false;
    // match the native input attribute type so we can forward it safely
    export let autocomplete: HTMLInputAttributes['autocomplete'] = "";
    export let hint: string = "";
    export let error: string = "";
    export let disabled: boolean = false;
    // only className prop; rest props will capture any additional attributes
    export let className: string = "";

    // We forward all native input props via {...$$restProps} below
</script>

<div class="w-full {className}">
    {#if label}
        <label
            for={name}
            class="block text-sm font-medium text-text-main mb-1.5"
        >
            {label}
            {#if required}<span class="text-error">*</span>{/if}
        </label>
    {/if}

    <input
        id={name}
        {name}
        {type}
        {placeholder}
        {required}
        {autocomplete}
        {disabled}
        class="w-full px-4 py-3 rounded-xl border border-gray-300
           focus:border-primary focus:ring-2 focus:ring-primary/20
           outline-none transition-all text-dark placeholder-gray-400
           disabled:bg-gray-100 disabled:cursor-not-allowed"
        {...$$restProps}
    />

    {#if hint && !error}
        <p class="mt-1.5 text-xs text-text-muted">{hint}</p>
    {/if}

    {#if error}
        <p class="mt-1.5 text-xs text-error font-medium" role="alert">
            {error}
        </p>
    {/if}
</div>
