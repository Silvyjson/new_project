<!-- src/lib/components/auth/RoleSelector.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    $: currentRole = $page.url.pathname.includes("/buyer") ? "buyer" : "vendor";

    const handleRoleSwitch = (role: "buyer" | "vendor") => {
        if (role !== currentRole) {
            goto(`/auth/register/${role}`);
        }
    };
</script>

<div class="mb-6 p-4 bg-gradient-to-r from-primary/5 to-transparent border border-primary/20 rounded-xl">
    <p class="text-xs text-text-muted mb-3 uppercase font-medium tracking-wide">
        Change Registration Type
    </p>

    <div class="grid grid-cols-2 gap-3">
        <!-- Buyer Option -->
        <button
            on:click={() => handleRoleSwitch("buyer")}
            class="p-3 rounded-lg border-2 transition-all {currentRole === 'buyer'
                ? 'border-primary bg-primary/10 text-primary font-medium'
                : 'border-gray-200 bg-white text-text-muted hover:border-primary/50 hover:bg-gray-50'}"
        >
            <div class="text-lg mb-1">🛍️</div>
            <div class="text-sm font-medium">Buy Products</div>
            <div class="text-xs opacity-75">Shop with confidence</div>
        </button>

        <!-- Vendor Option -->
        <button
            on:click={() => handleRoleSwitch("vendor")}
            class="p-3 rounded-lg border-2 transition-all {currentRole === 'vendor'
                ? 'border-primary bg-primary/10 text-primary font-medium'
                : 'border-gray-200 bg-white text-text-muted hover:border-primary/50 hover:bg-gray-50'}"
        >
            <div class="text-lg mb-1">🏪</div>
            <div class="text-sm font-medium">Sell on Hub</div>
            <div class="text-xs opacity-75">Grow your business</div>
        </button>
    </div>
</div>
