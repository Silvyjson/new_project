<!-- src/lib/components/auth/PasswordInput.svelte -->
<script lang="ts">
    import { type HTMLInputAttributes } from "svelte/elements";

    export let label: string = "Password";
    export let name: string = "password";
    export let required: boolean = true;
    export let placeholder: string = "Enter your password";
    export let hint: string = "";
    export let error: string = "";
    export let className: string = "";

    let showPassword = false;
    // native input attributes (e.g. aria-*, disabled) are forwarded via {...$$restProps} automatically
</script>

<div class="w-full {className}">
    <label for={name} class="block text-sm font-medium text-text-main mb-1.5">
        {label}
        {#if required}<span class="text-error">*</span>{/if}
    </label>

    <div class="relative">
        <input
            id={name}
            {name}
            type={showPassword ? "text" : "password"}
            {placeholder}
            {required}
            class="w-full px-4 py-3 rounded-xl border border-gray-300
             focus:border-primary focus:ring-2 focus:ring-primary/20
             outline-none transition-all text-dark placeholder-gray-400
             disabled:bg-gray-100 disabled:cursor-not-allowed pr-12"
            {...$$restProps}
        />

        <button
            type="button"
            on:click={() => (showPassword = !showPassword)}
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-main transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
        >
            {#if showPassword}
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                </svg>
            {:else}
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
            {/if}
        </button>
    </div>

    {#if hint && !error}
        <p class="mt-1.5 text-xs text-text-muted">{hint}</p>
    {/if}

    {#if error}
        <p class="mt-1.5 text-xs text-error font-medium" role="alert">
            {error}
        </p>
    {/if}
</div>
