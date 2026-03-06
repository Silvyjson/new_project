<!-- src/routes/support/+page.svelte -->
<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Icon from "@iconify/svelte";

    // Types
    import type { PageData } from "./$types";

    // Components
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";

    // Data from load function
    export let data: PageData;
    const { faqs, categories, trustPillars, contact, disputeSteps, meta } =
        data;

    // Search state
    let searchQuery = "";
    let activeCategory = "all";

    // Filtered FAQs
    $: filteredFaqs = faqs.filter((faq) => {
        const matchesSearch =
            searchQuery === "" ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === "all" || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Accordion state
    let openFaqId: string | null = null;

    const toggleFaq = (id: string) => {
        openFaqId = openFaqId === id ? null : id;
    };

    // Format phone number for display
    const formatPhone = (number: string) => {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    };
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
</svelte:head>

<main class="min-h-screen bg-soft-background">
    <!-- 🔷 SECTION 1: HERO - REASSURANCE FIRST -->
    <section id="help" class="py-16 bg-soft-background">
        <div
            class="container max-w-4xl mx-auto px-4 text-center animate-fade-in"
        >
            <h1 class="md:text-h2 text-h3 font-bold text-text-main mb-4">
                Need Help? We've Got You Covered.
            </h1>
            <p class="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
                Your transactions are protected by VendorHub. If anything goes
                wrong, we're here to help.
            </p>

            <!-- Search Bar -->
            <div class="relative max-w-2xl mx-auto mb-8">
                <Icon
                    icon="mdi:magnify"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                />
                <input
                    type="text"
                    placeholder="Search help topics…"
                    class="w-full pl-12 pr-4 h-[50px] rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-body shadow-sm"
                    bind:value={searchQuery}
                />
            </div>

            <!-- Contact Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href={contact.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 px-6 h-[48px] rounded-xl bg-whatsapp text-white font-medium hover:bg-whatsapp-hover transition-colors shadow-sm"
                >
                    <Icon icon="logos:whatsapp-icon" class="w-5 h-5" />
                    <span>Contact via WhatsApp</span>
                </a>
                <a
                    href="mailto:{contact.email.address}"
                    class="inline-flex items-center justify-center gap-2 px-6 h-[48px] rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
                >
                    <Icon icon="mdi:email" class="w-5 h-5" />
                    <span>Send Email</span>
                </a>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 2: QUICK HELP CATEGORIES -->
    <section id="help2" class="py-12 bg-surface">
        <div class="container max-w-7xl mx-auto px-4">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each categories as category}
                    <Card
                        hover={true}
                        padding="lg"
                        className="border border-gray-100 cursor-pointer group"
                        on:click={() => (activeCategory = category.id)}
                    >
                        <div class="flex items-start gap-4">
                            <div
                                class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                            >
                                <Icon icon={category.icon} />
                            </div>
                            <div>
                                <h3
                                    class="text-body font-semibold text-text-main mb-1 group-hover:text-primary transition-colors"
                                >
                                    {category.title}
                                </h3>
                                <p class="text-small text-text-muted">
                                    {category.description}
                                </p>
                            </div>
                        </div>
                    </Card>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 3: HELP CENTER (FAQ ACCORDION) -->
    <section id="faq" class="py-12 bg-soft-background">
        <div class="container max-w-4xl mx-auto px-4">
            <h2 class="md:text-h2 text-h3 text-text-main text-center mb-8">
                Frequently Asked Questions
            </h2>

            <div class="space-y-1">
                {#each filteredFaqs as faq}
                    <div class="border-b border-gray-200 last:border-0">
                        <button
                            on:click={() => toggleFaq(faq.id)}
                            class="w-full flex items-center justify-between p-5 text-left hover:bg-soft-background transition-colors"
                            aria-expanded={openFaqId === faq.id}
                            aria-controls="faq-answer-{faq.id}"
                        >
                            <span
                                class="text-body font-medium text-text-main pr-4"
                                >{faq.question}</span
                            >
                            <span
                                class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-primary transition-transform duration-200"
                                class:rotate-180={openFaqId === faq.id}
                            >
                                <Icon icon="mdi:chevron-down" class="w-5 h-5" />
                            </span>
                        </button>

                        <div
                            id="faq-answer-{faq.id}"
                            role="region"
                            aria-labelledby="faq-question-{faq.id}"
                            class="overflow-hidden transition-all duration-300"
                            style="max-height: {openFaqId === faq.id
                                ? '500px'
                                : '0'}; opacity: {openFaqId === faq.id
                                ? 1
                                : 0};"
                        >
                            <div class="px-5 pb-5 pt-0">
                                <p
                                    class="text-[15px] text-text-muted leading-relaxed"
                                >
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                {/each}

                {#if filteredFaqs.length === 0}
                    <Card className="py-12 text-center">
                        <p class="text-body text-text-muted">
                            No articles found. Try a different search or contact
                            us directly.
                        </p>
                    </Card>
                {/if}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 4: DISPUTE RESOLUTION (Step-by-Step) -->
    <section id="dispute" class="py-16 bg-surface">
        <div class="container max-w-5xl mx-auto px-4">
            <h2 class="md:text-h2 text-h3 text-text-main text-center mb-4">
                How Disputes Work
            </h2>
            <p
                class="text-body text-text-muted text-center mb-12 max-w-2xl mx-auto"
            >
                A clear, fair process to protect both buyers and honest vendors.
            </p>

            <!-- Timeline (Desktop Horizontal / Mobile Vertical) -->
            <div
                class="hidden md:flex items-center justify-between mb-12 relative"
            >
                <!-- Connector Line -->
                <div
                    class="absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10"
                ></div>

                {#each disputeSteps as step, i}
                    <div
                        class="relative flex flex-col items-center text-center max-w-[180px]"
                    >
                        <div
                            class="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-3 border-4 border-surface shadow-sm"
                        >
                            {step.step}
                        </div>
                        <h4 class="text-h4 font-semibold text-text-main mb-1">
                            {step.title}
                        </h4>
                        <p class="text-small text-text-muted">{step.desc}</p>
                    </div>
                {/each}
            </div>

            <!-- Mobile Vertical Timeline -->
            <div class="md:hidden space-y-8 mb-12">
                {#each disputeSteps as step, i}
                    <div class="flex gap-4">
                        <div class="flex flex-col items-center">
                            <div
                                class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0"
                            >
                                {step.step}
                            </div>
                            {#if i < disputeSteps.length - 1}
                                <div
                                    class="w-0.5 h-full bg-gray-200 my-2"
                                ></div>
                            {/if}
                        </div>
                        <div class="flex-1">
                            <h4
                                class="text-h4 font-semibold text-text-main mb-1"
                            >
                                {step.title}
                            </h4>
                            <p class="text-small text-text-muted">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Dispute Box -->
            <Card className="p-6 border border-warning/30 bg-warning/5">
                <div class="flex flex-col md:flex-row items-start gap-4">
                    <div
                        class="w-10 h-10 rounded-full bg-warning/20 text-warning flex items-center justify-center text-xl flex-shrink-0"
                    >
                        <Icon icon="mdi:alert" class="w-6 h-6" />
                    </div>
                    <div class="flex-1">
                        <h3
                            class="md:text-h3 text-h4 font-semibold text-text-main mb-3"
                        >
                            Need to Open a Dispute?
                        </h3>
                        <p class="text-body text-text-muted mb-4">
                            Contact us within 48 hours if you experience:
                        </p>
                        <ul class="grid md:grid-cols-2 gap-2 mb-6">
                            {#each ["Item not delivered", "Wrong item received", "Damaged goods", "Fraud concerns"] as issue}
                                <li
                                    class="flex items-center gap-2 text-small text-text-muted"
                                >
                                    <span class="text-warning">•</span>
                                    <span>{issue}</span>
                                </li>
                            {/each}
                        </ul>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <a
                                href={contact.whatsapp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-whatsapp text-white font-medium hover:bg-whatsapp-hover transition-colors"
                            >
                                <Icon
                                    icon="logos:whatsapp-icon"
                                    class="w-5 h-5"
                                />
                                <span>Start Dispute via WhatsApp</span>
                            </a>
                            <a
                                href="mailto:{contact.email
                                    .address}?subject=Dispute: Order #[ORDER_ID]"
                                class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
                            >
                                <Icon icon="mdi:email" class="w-5 h-5" />
                                <span>Send Dispute Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </section>

    <!-- 🔷 SECTION 5: TRUST & SAFETY PILLARS -->
    <section id="trust" class="py-16 bg-soft-background">
        <div class="container max-w-7xl mx-auto px-4">
            <h2 class="md:text-h2 text-h3 text-text-main text-center mb-4">
                Trust & Safety at VendorHub
            </h2>
            <p
                class="text-body text-text-muted text-center mb-12 max-w-2xl mx-auto"
            >
                Three pillars that protect every transaction.
            </p>

            <div class="grid md:grid-cols-3 gap-8">
                {#each trustPillars as pillar}
                    <Card className="p-6 border border-gray-100 h-full">
                        <!-- Accent Border Top -->
                        <div
                            class="h-1 rounded-t-xl mb-6 {pillar.accent ===
                            'success'
                                ? 'bg-success'
                                : pillar.accent === 'primary'
                                  ? 'bg-primary'
                                  : 'bg-info'}"
                        ></div>

                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-10 h-10 rounded-xl {pillar.accent ===
                                'success'
                                    ? 'bg-success/10 text-success'
                                    : pillar.accent === 'primary'
                                      ? 'bg-primary/10 text-primary'
                                      : 'bg-info/10 text-info'} flex items-center justify-center text-xl"
                            >
                                <Icon icon={pillar.icon} />
                            </div>
                            <h3 class="text-h3 font-semibold text-text-main">
                                {pillar.title}
                            </h3>
                        </div>

                        <p class="text-body text-text-muted mb-4">
                            {pillar.description}
                        </p>

                        <ul class="space-y-2">
                            {#each pillar.features as feature}
                                <li
                                    class="flex items-center gap-2 text-small text-text-muted"
                                >
                                    <span class="text-success">✓</span>
                                    <span>{feature}</span>
                                </li>
                            {/each}
                        </ul>
                    </Card>
                {/each}
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 6: CONTACT METHODS (No Forms) -->
    <section id="contact" class="py-16 bg-surface">
        <div class="container max-w-4xl mx-auto px-4">
            <h2 class="md:text-h2 text-h3 text-text-main text-center mb-12">
                Contact Support
            </h2>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- WhatsApp Card -->
                <Card className="p-6 border border-success/30 bg-success/5">
                    <div class="flex flex-col md:flex-row items-start gap-4">
                        <div
                            class="w-14 h-14 rounded-2xl bg-whatsapp/10 flex items-center justify-center text-3xl flex-shrink-0"
                        >
                            <Icon icon="logos:whatsapp-icon" class="w-8 h-8" />
                        </div>
                        <div class="flex-1">
                            <h3
                                class="text-h3 font-semibold text-text-main mb-2"
                            >
                                WhatsApp Support
                            </h3>
                            <p class="text-body text-text-muted mb-4">
                                Chat with our support team directly. Fast
                                responses during business hours.
                            </p>
                            <div class="space-y-2 mb-6">
                                <p class="text-small text-text-muted">
                                    <span class="font-medium text-text-main"
                                        >Number:</span
                                    >
                                    {contact.whatsapp.number}
                                </p>
                                <p class="text-small text-text-muted">
                                    <span class="font-medium text-text-main"
                                        >Response:</span
                                    >
                                    {contact.whatsapp.responseTime}
                                </p>
                            </div>
                            <a
                                href={contact.whatsapp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-whatsapp text-white font-medium hover:bg-whatsapp-hover transition-colors"
                            >
                                <Icon
                                    icon="logos:whatsapp-icon"
                                    class="w-5 h-5"
                                />
                                <span>Open WhatsApp Chat</span>
                                <Icon icon="mdi:open-in-new" class="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </Card>

                <!-- Email Card -->
                <Card className="p-6 border border-primary/30 bg-primary/5">
                    <div class="flex flex-col md:flex-row items-start gap-4">
                        <div
                            class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0"
                        >
                            <Icon icon="mdi:email" class="w-8 h-8" />
                        </div>
                        <div class="flex-1">
                            <h3
                                class="text-h3 font-semibold text-text-main mb-2"
                            >
                                Email Support
                            </h3>
                            <p class="text-body text-text-muted mb-4">
                                Send detailed inquiries with attachments. We
                                respond to every message.
                            </p>
                            <div class="space-y-2 mb-6">
                                <p class="text-small text-text-muted">
                                    <span class="font-medium text-text-main"
                                        >Email:</span
                                    >
                                    {contact.email.address}
                                </p>
                                <p class="text-small text-text-muted">
                                    <span class="font-medium text-text-main"
                                        >Response:</span
                                    >
                                    {contact.email.responseTime}
                                </p>
                            </div>
                            <a
                                href="mailto:{contact.email.address}"
                                class="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
                            >
                                <Icon icon="mdi:email" class="w-5 h-5" />
                                <span>Send Email</span>
                                <Icon
                                    icon="mdi:email-outline"
                                    class="w-4 h-4"
                                />
                            </a>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </section>

    <!-- 🔷 SECTION 7: FUTURE - WHATSAPP BOT NOTICE -->
    <section class="py-8 bg-soft-background">
        <div class="container max-w-4xl mx-auto px-4">
            <Card
                className="p-6 border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-4"
            >
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <Badge variant="info">Coming Soon</Badge>
                        <span class="text-body font-semibold text-text-main"
                            >VendorHub AI Assistant</span
                        >
                    </div>
                    <p class="text-small text-text-muted">
                        Track orders, check disputes, and verify vendors
                        instantly via WhatsApp. No waiting.
                    </p>
                </div>
                <Button variant="outline" size="sm" disabled>Notify Me</Button>
            </Card>
        </div>
    </section>

    <!-- 🔷 SECTION 8: SECURITY NOTICE -->
    <section class="py-8 bg-danger/5 border-t border-danger/20">
        <div class="container max-w-4xl mx-auto px-4">
            <div
                class="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4"
            >
                <div
                    class="w-10 h-10 rounded-full bg-danger/20 text-danger flex items-center justify-center text-xl flex-shrink-0"
                >
                    <Icon icon="mdi:block" class="w-6 h-6" />
                </div>
                <div>
                    <h3 class="text-h3 font-semibold text-text-main mb-2">
                        Security Notice
                    </h3>
                    <p class="text-body text-danger mb-3">
                        VendorHub will <strong>NEVER</strong>:
                    </p>
                    <ul class="grid md:grid-cols-3 gap-2">
                        {#each ["Ask for passwords", "Request payment outside platform", "Request OTP codes"] as warning}
                            <li
                                class="flex items-center gap-2 text-small text-danger"
                            >
                                <span>✕</span>
                                <span>{warning}</span>
                            </li>
                        {/each}
                    </ul>
                    <p class="text-small text-text-muted mt-4">
                        If someone claims to be from VendorHub and asks for any
                        of these, it's a scam. Report it immediately.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- 🔷 MOBILE: Sticky WhatsApp Button -->
    <div class="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <a
            href={contact.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-whatsapp text-white font-medium shadow-lg hover:bg-whatsapp-hover transition-colors"
        >
            <Icon icon="logos:whatsapp-icon" class="w-6 h-6" />
            <span>Chat with Support</span>
        </a>
    </div>
</main>

<style>
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
    }

    .rotate-180 {
        transform: rotate(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-fade-in,
        .transition-transform {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>
