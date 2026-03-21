<script lang="ts">
    import { fade } from "svelte/transition";
    import ShopHeader from "../components/ShopHeader.svelte";
    import ShopFooter from "../components/ShopFooter.svelte";

    export let shop: any = null;
    export let totalProducts: number = 0;
    export let product: any = undefined;
</script>

<div class="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-primary-500/30 font-sans">
    <!-- Modern Sticky Header with Glassmorphism -->
    <ShopHeader {shop} {totalProducts} {product} />

    <main class="relative z-10" in:fade={{ duration: 400 }}>
        <!-- Background Gradient Glows -->
        <div class="fixed inset-0 pointer-events-none overflow-hidden">
            <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full"></div>
            <div class="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div class="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] bg-purple-500/5 blur-[120px] rounded-full"></div>
        </div>

        <slot />
    </main>

    <ShopFooter {shop} />
</div>

<style>
    :global(body) {
        background-color: #0f172a;
    }
    
    /* Custom Scrollbar for Modern Feel */
    :global(::-webkit-scrollbar) {
        width: 8px;
    }
    :global(::-webkit-scrollbar-track) {
        background: #0f172a;
    }
    :global(::-webkit-scrollbar-thumb) {
        background: #1e293b;
        border-radius: 10px;
    }
    :global(::-webkit-scrollbar-thumb:hover) {
        background: #334155;
    }
</style>
