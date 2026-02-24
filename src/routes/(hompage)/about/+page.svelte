<!-- src/routes/about/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
    import Nav from "$lib/components/homepage/Nav.svelte";

    // Data from load function
    export let data: PageData;
    const { meta, stats } = data;

    // Animation state for counters
    let countersVisible = false;
    let vendorCount = 0;
    let customerCount = 0;
    let securedAmount = 0;

    // Animate counters on scroll
    const animateCounters = () => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        const vendorTarget = 10000;
        const customerTarget = 100000;
        const securedTarget = 500000000;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const ease = cubicOut(progress);

            vendorCount = Math.floor(vendorTarget * ease);
            customerCount = Math.floor(customerTarget * ease);
            securedAmount = Math.floor(securedTarget * ease);

            if (step >= steps) {
                clearInterval(timer);
                vendorCount = vendorTarget;
                customerCount = customerTarget;
                securedAmount = securedTarget;
            }
        }, interval);
    };

    // Intersection Observer for scroll animations
    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !countersVisible) {
                    countersVisible = true;
                    animateCounters();
                }
            },
            { threshold: 0.3 },
        );

        const target = document.getElementById("impact-section");
        if (target) observer.observe(target);

        return () => observer.disconnect();
    });

    const about = [
        "Sell fashion to one audience, gadgets to another",
        "Keep branding separate for better conversion",
        "Test new product categories without risk",
        "Build multiple revenue streams from one account",
        "Manage everything from a single, simple dashboard",
    ];

    const features = [
        {
            icon: "🔐",
            title: "Vendor Verification",
            desc: "ID checks + manual review for every verified badge",
        },
        {
            icon: "⭐",
            title: "Transparent Trust Score",
            desc: "Algorithm-based scoring from real performance data",
        },
        {
            icon: "🛡️",
            title: "Payment Protection",
            desc: "Escrow holds funds until delivery is confirmed",
        },
        {
            icon: "⚖️",
            title: "Dispute Resolution",
            desc: "Neutral team resolves issues within 48 hours",
        },
    ];

    // Format currency for display
    const formatNaira = (amount: number) => {
        if (amount >= 1000000000)
            return `₦${(amount / 1000000000).toFixed(1)}B`;
        if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
        return `₦${amount.toLocaleString()}`;
    };
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content={meta.ogImage} />
    <meta property="og:type" content="website" />
</svelte:head>

<main class="min-h-screen bg-surface">
    <!-- 🔷 SECTION 2: HERO (Mission-Focused) -->
    <section class="py-20 bg-surface text-center animate-fade-in">
        <div class="container max-w-4xl mx-auto px-4">
            <h1
                class="text-[48px] md:text-[56px] font-bold text-text-main leading-tight mb-6"
            >
                Empowering Vendors.<br />
                <span class="text-primary">Building Trust</span> in Pre-Orders.
            </h1>
            <p
                class="text-[18px] text-text-muted max-w-[650px] mx-auto mb-10 leading-relaxed"
            >
                VendorHub is a secure digital home for social media vendors —
                giving them trusted storefronts, verified identities, and safe
                payment systems that protect both sellers and buyers.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/auth/register" size="lg" className="shadow-glow">
                    Become a Verified Vendor
                </Button>
                <Button href="/vendors" variant="outline" size="lg">
                    Explore Verified Shops
                </Button>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 2: OUR STORY -->
    <section id="what-we-do" class="py-24 bg-background-light">
        <div class="container grid md:grid-cols-2 gap-12 items-center">
            <!-- Left: Visual Mockup -->
            <div class="order-2 md:order-1 relative animate-fade-in">
                <div
                    class="absolute -inset-4 bg-primary/10 rounded-card blur-xl"
                ></div>
                <Card
                    className="relative overflow-hidden border border-gray-200"
                >
                    <!-- Dashboard Mockup Placeholder -->
                    <div
                        class="aspect-video bg-gradient-to-br from-primary/5 to-primary-light/5 flex items-center justify-center"
                    >
                        <div class="text-center p-8">
                            <div class="text-6xl mb-4">📊</div>
                            <p class="text-text-muted font-medium">
                                Vendor Dashboard Preview
                            </p>
                            <div class="mt-4 flex justify-center gap-2">
                                <TrustBadge verified={true} size="sm" />
                                <span class="text-sm text-text-muted"
                                    >Trust Score: 94/100</span
                                >
                            </div>
                        </div>
                    </div>
                    <!-- Floating Elements -->
                    <div
                        class="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-card flex items-center gap-2"
                    >
                        <span class="text-success font-bold">✓</span>
                        <span class="text-sm font-medium text-text-main"
                            >Verified</span
                        >
                    </div>
                </Card>
            </div>

            <!-- Right: Story Content -->
            <div
                class="order-1 md:order-2 animate-fade-in"
                style="transition-delay: 100ms"
            >
                <h2 class="text-h2 text-text-main mb-6 relative inline-block">
                    Why VendorHub Was Created
                    <span
                        class="absolute bottom-0 left-0 w-full h-1 bg-primary/30 rounded-full"
                    ></span>
                </h2>
                <div
                    class="space-y-4 text-body text-text-muted leading-relaxed"
                >
                    <p>
                        We saw a problem: talented vendors across Nigeria were
                        selling on Instagram, WhatsApp, and TikTok — but losing
                        sales because buyers didn't trust them.
                    </p>
                    <p>
                        No website. No verification. No payment protection. Just
                        DMs and hope.
                    </p>
                    <p>
                        VendorHub was built to change that. We give every small
                        vendor a <strong
                            >professional, trusted storefront</strong
                        > — with secure payments, identity verification, and tools
                        to grow — all without needing technical skills or big capital.
                    </p>
                    <p class="font-medium text-text-main">
                        Because every vendor deserves to be trusted. And every
                        buyer deserves to shop with confidence.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 3: MISSION & VISION -->
    <section class="py-24 bg-surface">
        <div class="container max-w-5xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Mission Card -->
                <Card
                    className="p-8 border border-gray-200 hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 group"
                >
                    <div
                        class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    >
                        <svg
                            class="w-7 h-7 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-h3 text-text-main mb-4">Our Mission</h3>
                    <p class="text-body text-text-muted leading-relaxed">
                        To create a trusted digital marketplace where small
                        vendors can grow without fear and customers can shop
                        with confidence.
                    </p>
                </Card>

                <!-- Vision Card -->
                <Card
                    className="p-8 border border-gray-200 hover:border-primary/50 hover:shadow-card-hover transition-all duration-300 group"
                >
                    <div
                        class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    >
                        <svg
                            class="w-7 h-7 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-h3 text-text-main mb-4">Our Vision</h3>
                    <p class="text-body text-text-muted leading-relaxed">
                        To become Nigeria's most trusted pre-order vendor
                        infrastructure — the foundation for safe, scalable
                        social commerce across Africa.
                    </p>
                </Card>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 4: HOW VENDORHUB WORKS (Authority) -->
    <section id="how-it-works" class="py-24 bg-dark text-text-inverse">
        <div class="container">
            <h2 class="text-h2 text-center mb-16">How VendorHub Works</h2>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Verified Vendors -->
                <div
                    class="text-center animate-fade-in"
                    style="transition-delay: 0ms"
                >
                    <div
                        class="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    >
                        <svg
                            class="w-8 h-8 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-h3 mb-4">Verified Vendors</h3>
                    <p class="text-body opacity-90 leading-relaxed">
                        Every vendor undergoes ID verification and manual
                        review. Trust Scores (0-100) reflect real performance —
                        so buyers know who to trust.
                    </p>
                </div>

                <!-- Secure Payments -->
                <div
                    class="text-center animate-fade-in"
                    style="transition-delay: 150ms"
                >
                    <div
                        class="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    >
                        <svg
                            class="w-8 h-8 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-h3 mb-4">Secure Payments</h3>
                    <p class="text-body opacity-90 leading-relaxed">
                        We hold payments in escrow until delivery is confirmed.
                        Buyers are protected from scams. Vendors are protected
                        from chargebacks.
                    </p>
                </div>

                <!-- Multi-Shop Flexibility -->
                <div
                    class="text-center animate-fade-in"
                    style="transition-delay: 300ms"
                >
                    <div
                        class="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    >
                        <svg
                            class="w-8 h-8 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    </div>
                    <h3 class="text-h3 mb-4">Multi-Shop Flexibility</h3>
                    <p class="text-body opacity-90 leading-relaxed mb-4">
                        One account. Multiple independent shops. Perfect for
                        vendors selling in different niches.
                    </p>

                    <!-- Plan Comparison Strip -->
                    <div
                        class="bg-dark-card rounded-xl p-4 text-left space-y-3"
                    >
                        <div class="flex items-center justify-between text-sm">
                            <span>Basic Plan</span>
                            <span class="font-medium">1 Shop</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span>Pro Plan</span>
                            <span class="font-medium text-success"
                                >✓ 3 Shops</span
                            >
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span>Enterprise</span>
                            <span class="font-medium text-success"
                                >✓ Unlimited</span
                            >
                        </div>
                    </div>
                    <p class="text-xs opacity-70 mt-3">
                        Each shop has its own link, catalog, branding & trust
                        score.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 5: WHY MULTIPLE SHOPS MATTER -->
    <section class="py-24 bg-background-light">
        <div class="container grid md:grid-cols-2 gap-12 items-center">
            <!-- Left: Illustration -->
            <div class="order-2 md:order-1 animate-fade-in">
                <Card className="p-6 border border-gray-200">
                    <div class="space-y-4">
                        <!-- Shop 1: Fashion -->
                        <div
                            class="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                        >
                            <div
                                class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-xl"
                            >
                                👗
                            </div>
                            <div>
                                <div class="font-medium text-text-main">
                                    Fashion Hub
                                </div>
                                <div class="text-xs text-text-muted">
                                    vendorhub.com/amina/fashion
                                </div>
                            </div>
                            <TrustBadge
                                verified={true}
                                size="sm"
                                className="ml-auto"
                            />
                        </div>

                        <!-- Shop 2: Gadgets -->
                        <div
                            class="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                        >
                            <div
                                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl"
                            >
                                📱
                            </div>
                            <div>
                                <div class="font-medium text-text-main">
                                    Tech Deals
                                </div>
                                <div class="text-xs text-text-muted">
                                    vendorhub.com/amina/tech
                                </div>
                            </div>
                            <TrustBadge
                                verified={true}
                                size="sm"
                                className="ml-auto"
                            />
                        </div>

                        <!-- Shop 3: Beauty -->
                        <div
                            class="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                        >
                            <div
                                class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-xl"
                            >
                                💄
                            </div>
                            <div>
                                <div class="font-medium text-text-main">
                                    Beauty Box
                                </div>
                                <div class="text-xs text-text-muted">
                                    vendorhub.com/amina/beauty
                                </div>
                            </div>
                            <TrustBadge
                                verified={true}
                                size="sm"
                                className="ml-auto"
                            />
                        </div>
                    </div>
                    <p class="text-center text-xs text-text-muted mt-4">
                        One vendor. Three brands. One dashboard.
                    </p>
                </Card>
            </div>

            <!-- Right: Content -->
            <div
                class="order-1 md:order-2 animate-fade-in"
                style="transition-delay: 100ms"
            >
                <h2 class="text-h2 text-text-main mb-6">
                    Grow Multiple Brands.<br />
                    <span class="text-primary">Under One Account.</span>
                </h2>
                <div
                    class="space-y-4 text-body text-text-muted leading-relaxed"
                >
                    <p>
                        Smart vendors don't limit themselves to one niche. With
                        VendorHub, you can:
                    </p>
                    <ul class="space-y-3">
                        {#each about as item}
                            <li class="flex items-start gap-3">
                                <span class="text-success mt-0.5">✓</span>
                                <span>{item}</span>
                            </li>
                        {/each}
                    </ul>
                    <p class="font-medium text-text-main pt-2">
                        More shops = more opportunities = more growth.
                    </p>
                </div>
                <Button href="/pricing" variant="primary" className="mt-8">
                    Upgrade Your Vendor Plan →
                </Button>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 6: TRUST & SAFETY -->
    <section class="py-24 bg-surface">
        <div class="container max-w-4xl mx-auto text-center">
            <h2 class="text-h2 text-text-main mb-4">Built on Trust</h2>
            <p class="text-body text-text-muted mb-12 max-w-2xl mx-auto">
                Every feature is designed to protect honest vendors and
                confident buyers.
            </p>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each features as item}
                    <Card
                        className="p-6 border border-gray-100 hover:border-primary/30 transition-colors"
                    >
                        <div class="text-3xl mb-4">{item.icon}</div>
                        <h3 class="text-h4 text-text-main mb-2">
                            {item.title}
                        </h3>
                        <p class="text-small text-text-muted">{item.desc}</p>
                    </Card>
                {/each}
            </div>

            <!-- Security Badge -->
            <div
                class="mt-12 flex items-center justify-center gap-3 text-sm text-text-muted"
            >
                <svg
                    class="w-5 h-5 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
                <span
                    >PCI-DSS Compliant • 256-bit SSL Encryption • GDPR Ready</span
                >
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 7: TEAM / CREDIBILITY (Optional) -->
    <section class="py-24 bg-background-light">
        <div class="container max-w-3xl mx-auto text-center">
            <div
                class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
                <span class="text-3xl">🤝</span>
            </div>
            <h2 class="text-h2 text-text-main mb-4">
                Built by People Who Care
            </h2>
            <p class="text-body text-text-muted leading-relaxed">
                VendorHub is backed by local entrepreneurs, tech professionals,
                and e-commerce experts committed to building digital trust in
                Nigeria. We're not just a platform — we're partners in your
                growth.
            </p>

            <!-- Logo Placeholder Strip -->
            <div
                class="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60"
            >
                {#each [1, 2, 3, 4, 5] as i}
                    <div
                        class="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-text-muted"
                    >
                        Partner {i}
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 8: IMPACT (Animated Counters) -->
    <section id="impact-section" class="py-24 bg-surface">
        <div class="container">
            <div class="grid md:grid-cols-3 gap-8 text-center">
                <!-- Vendors Counter -->
                <div class="animate-fade-in" style="transition-delay: 0ms">
                    <div class="text-[48px] font-bold text-primary mb-2">
                        {countersVisible
                            ? `${vendorCount.toLocaleString()}+`
                            : "10,000+"}
                    </div>
                    <div class="text-body text-text-muted">
                        Verified Vendors
                    </div>
                </div>

                <!-- Customers Counter -->
                <div class="animate-fade-in" style="transition-delay: 150ms">
                    <div class="text-[48px] font-bold text-primary mb-2">
                        {countersVisible
                            ? `${customerCount.toLocaleString()}+`
                            : "100,000+"}
                    </div>
                    <div class="text-body text-text-muted">Happy Customers</div>
                </div>

                <!-- Secured Payments Counter -->
                <div class="animate-fade-in" style="transition-delay: 300ms">
                    <div class="text-[48px] font-bold text-primary mb-2">
                        {countersVisible
                            ? formatNaira(securedAmount)
                            : "₦500M+"}
                    </div>
                    <div class="text-body text-text-muted">
                        Secured Payments
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 9: FINAL CTA -->
    <section
        class="py-24 bg-gradient-to-r from-primary to-primary-hover text-text-inverse text-center"
    >
        <div class="container max-w-3xl mx-auto px-4">
            <h2 class="text-h2 mb-6">
                Start Building Your Trusted Store Today
            </h2>
            <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of vendors who trust VendorHub for safe, scalable
                social commerce.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    href="/auth/register"
                    variant="primary"
                    className="text-primary hover:bg-gray-100 shadow-lg px-8 py-4 text-lg font-semibold"
                >
                    Create Free Shop
                </Button>
                <Button
                    href="/vendors"
                    variant="ghost"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                >
                    Explore Vendors
                </Button>
            </div>
        </div>
    </section>
</main>

<style>
    /* Global animations referenced in components */
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
        opacity: 0; /* Start hidden */
    }

    /* Reduce motion preference */
    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in,
        .animate-float {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>
