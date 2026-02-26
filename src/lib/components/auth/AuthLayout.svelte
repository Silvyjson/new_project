<script lang="ts">
    export let title: string = "";
    export let subtitle: string = "";
    export let showBrandPanel: boolean = true;

    const brandContent = {
        title: "Build Trust. Sell Securely.",
        description:
            "Join thousands of verified vendors building successful businesses on VendorHub.",
        features: [
            { icon: "✓", text: "Secure escrow payments" },
            { icon: "✓", text: "Transparent trust scores" },
            { icon: "✓", text: "Dispute resolution support" },
        ],
        illustration: "/auth-illustration.svg",
    };
</script>

<div class="min-h-screen bg-soft-background flex">
    <!-- Left: Form Section -->
    <main
        class="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto"
        class:lg:mr-[50%]={showBrandPanel}
    >
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
                <div class="mb-6">
                    <h1 class="text-2xl md:text-3xl font-bold text-text-main mb-2">
                        {title}
                    </h1>
                    {#if subtitle}
                        <p class="text-body text-text-muted">{subtitle}</p>
                    {/if}
                </div>
            {/if}

            <slot />
        </div>
    </main>

    <!-- Right: Brand Panel -->
    {#if showBrandPanel}
        <aside
            class="hidden lg:flex fixed top-0 right-0 h-screen w-[50%]
                   bg-gradient-to-br from-primary/95 to-primary-hover/95
                   text-white p-16 flex-col justify-between overflow-hidden"
        >
            <!-- Background Glow -->
            <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]"></div>

            <div class="relative z-10">
                <!-- Logo -->
                <div class="flex items-center gap-3 mb-8">
                    <div
                        class="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center font-bold text-lg"
                    >
                        V
                    </div>
                    <span class="text-2xl font-bold tracking-tight">
                        VendorHub
                    </span>
                </div>

                <!-- Hero Text -->
                <h2 class="text-4xl font-bold leading-tight mb-3">
                    {brandContent.title}
                </h2>

                <p class="text-lg text-white/80 max-w-md mb-3">
                    {brandContent.description}
                </p>

                <!-- Feature Card -->
                <div class="flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <ul class="space-y-4 flex-1">
                        {#each brandContent.features as feature}
                            <li class="flex items-center gap-4">
                                <span
                                    class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold"
                                >
                                    {feature.icon}
                                </span>
                                <span class="text-white/90">
                                    {feature.text}
                                </span>
                            </li>
                        {/each}
                    </ul>

                    <!-- Illustration -->
                    <img
                        src={brandContent.illustration}
                        alt=""
                        class="max-w-full w-60 h-60 opacity-90 drop-shadow-xl"
                    />
                </div>
            </div>
        </aside>
    {/if}
</div>