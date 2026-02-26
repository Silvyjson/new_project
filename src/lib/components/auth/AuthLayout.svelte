<!-- src/lib/components/auth/AuthLayout.svelte -->
<script lang="ts">
    export let title: string = "";
    export let subtitle: string = "";
    export let showBrandPanel: boolean = true;

    // Brand panel content
    const brandContent = {
        title: "Build Trust. Sell Securely.",
        description:
            "Join thousands of verified vendors building successful businesses on VendorHub.",
        features: [
            { icon: "✓", text: "Secure escrow payments" },
            { icon: "✓", text: "Transparent trust scores" },
            { icon: "✓", text: "Dispute resolution support" },
        ],
        illustration: "/images/auth-illustration.svg",
    };
</script>

<div class="min-h-screen bg-soft-background flex">
    <!-- Left: Form Section -->
    <main class="flex-1 flex items-center justify-center p-6 md:p-12">
        <div class="w-full max-w-[480px]">
            <!-- Logo (Mobile) -->
            <div class="md:hidden flex items-center gap-2 mb-8">
                <div
                    class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold"
                >
                    V
                </div>
                <span class="text-xl font-bold text-text-main">VendorHub</span>
            </div>

            <!-- Header -->
            {#if title}
                <div class="mb-8">
                    <h1
                        class="text-2xl md:text-3xl font-bold text-text-main mb-2"
                    >
                        {title}
                    </h1>
                    {#if subtitle}
                        <p class="text-body text-text-muted">{subtitle}</p>
                    {/if}
                </div>
            {/if}

            <!-- Form Slot -->
            <slot />

            <!-- Footer Links -->
            <!-- <div class="mt-8 text-center text-sm text-text-muted">
                <p>
                    By continuing, you agree to our
                    <a href="/terms" class="text-primary hover:underline"
                        >Terms</a
                    >
                    and
                    <a href="/privacy" class="text-primary hover:underline"
                        >Privacy Policy</a
                    >.
                </p>
            </div> -->
        </div>
    </main>

    <!-- Right: Brand Panel (Desktop Only) -->
    {#if showBrandPanel}
        <aside
            class="hidden lg:flex w-[50%] bg-gradient-to-br from-primary to-primary-hover text-white p-12 flex-col justify-between"
        >
            <div>
                <div class="flex items-center gap-3 mb-8">
                    <div
                        class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-lg"
                    >
                        V
                    </div>
                    <span class="text-2xl font-bold">VendorHub</span>
                </div>

                <h2 class="text-3xl font-bold mb-4">{brandContent.title}</h2>
                <p class="text-lg text-white/90 mb-8">
                    {brandContent.description}
                </p>

                <ul class="space-y-4">
                    {#each brandContent.features as feature}
                        <li class="flex items-center gap-3">
                            <span
                                class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm"
                            >
                                {feature.icon}
                            </span>
                            <span class="text-white/90">{feature.text}</span>
                        </li>
                    {/each}
                </ul>
            </div>

            <div class="mt-12">
                <img
                    src={brandContent.illustration}
                    alt=""
                    class="max-w-full h-auto opacity-90"
                />
            </div>
        </aside>
    {/if}
</div>
