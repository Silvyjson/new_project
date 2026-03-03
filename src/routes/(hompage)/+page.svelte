<!-- src/routes/+page.svelte -->
<script lang="ts">
  import Button from "$lib/components/ui/Button.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import Icon from "@iconify/svelte";

  const problems = [
    {
      icon: "mdi:close-circle-outline",
      title: "No Website",
      desc: "Sharing products via DMs is slow and unprofessional.",
    },
    {
      icon: "mdi:lock-outline",
      title: "No Trust",
      desc: "Buyers hesitate to pay strangers without verification.",
    },
    {
      icon: "mdi:cash",
      title: "Payment Risk",
      desc: "Cash-on-delivery risks lead to lost revenue.",
    },
    {
      icon: "mdi:trending-down",
      title: "Hard to Scale",
      desc: "Manual tracking limits your growth potential.",
    },
  ];

  const features = [
    {
      icon: "mdi:link-variant",
      title: "Unique Shop Link",
      desc: "Get vendorhub.com/yourname/shopname",
    },
    {
      icon: "mdi:star",
      title: "Trust Score",
      desc: "Verified badges & reviews",
    },
    {
      icon: "mdi:shield-check",
      title: "Escrow Payments",
      desc: "Funds held until delivery",
    },
    {
      icon: "mdi:chart-box",
      title: "Simple Analytics",
      desc: "Track views & sales",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Profile",
      desc: "Sign up free and get verified.",
    },
    {
      step: "02",
      title: "Create Shop",
      desc: "Create a shop and get your unique link.",
    },
    {
      step: "03",
      title: "Share Link",
      desc: "Post on Instagram, WhatsApp, TikTok.",
    },
    {
      step: "04",
      title: "Get Paid",
      desc: "Secure escrow payments released to you.",
    },
  ];

  const securityPoints = [
    "Verified vendors only",
    "Secure escrow payments",
    "Dispute protection team",
    "Transparent trust scores",
  ];

  // Mock Data for Social Proof
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Fashion Vendor",
      text: "VendorHub doubled my sales in 30 days. The trust badge makes buyers confident.",
      avatar: "mdi:account",
    },
    {
      name: "David O.",
      role: "Electronics",
      text: "Finally a platform that handles payments securely. No more chasing DMs for payment.",
      avatar: "mdi:account",
    },
    {
      name: "Priya M.",
      role: "Handmade Goods",
      text: "The setup was instant. I shared my link on Instagram and started selling immediately.",
      avatar: "mdi:account",
    },
  ];

  const faqs = [
    {
      question: "What is VendorHub?",
      answer:
        "VendorHub is a free platform that gives small vendors a professional online shop link. Share your unique URL (vendorhub.com/yourname/shopname) on Instagram, WhatsApp, or TikTok to start selling instantly — no website needed.",
    },
    {
      question: "Is VendorHub really free?",
      answer:
        "Yes! The Free plan includes your shop link, up to 20 products, secure payments, and basic trust verification. Upgrade to Pro ($5/mo) for unlimited products, advanced analytics, and lower transaction fees.",
    },
    {
      question: "How do payments work?",
      answer:
        "We use secure escrow: when a buyer pays, funds are held safely by VendorHub. Once the buyer confirms delivery, the money is released to your account. This protects both buyers and honest vendors.",
    },
    {
      question: "How does the Trust Score work?",
      answer:
        "Your Trust Score (0-100) is calculated from: verification status, order completion rate, buyer reviews, and response time. Higher scores = more buyer confidence = more sales.",
    },
    {
      question: "What if there's a dispute?",
      answer:
        "Our neutral dispute team reviews evidence from both parties (photos, messages, tracking) and resolves issues within 48 hours. We protect honest vendors and fair buyers.",
    },
    {
      question: "Do I need technical skills?",
      answer:
        "Not at all. If you can post on social media, you can use VendorHub. Add products, manage orders, and track sales from a simple, mobile-friendly dashboard.",
    },
    {
      question: "Which countries do you support?",
      answer:
        "VendorHub works globally. We support multiple currencies and payment methods including cards, mobile money (M-Pesa, MTN, Airtel), and bank transfers in 50+ countries.",
    },
  ];

  // Accordion state
  let openIndex: number | null = 0; // Open first by default

  const toggle = (index: number) => {
    openIndex = openIndex === index ? null : index;
  };
</script>

<svelte:head>
  <title>VendorHub — Build Your Online Shop. Get Verified. Get Paid.</title>
  <meta
    name="description"
    content="The trusted platform for social media vendors. Secure payments, unique shop links, and zero tech skills required."
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="font-sans text-text-main antialiased">
  <!-- 🔷 SECTION 2: HERO SECTION -->
  <section class="section bg-surface overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <!-- Left: Copy -->
      <div class="animate-fade-in">
        <h1 class="md:text-h1 text-h2 text-dark mb-6">
          Build Your Online Shop.<br />
          <span class="text-primary">Get Verified.</span> Get Paid.
        </h1>
        <p class="text-body text-text-muted mb-8 max-w-lg">
          VendorHub gives small vendors a free, professional shop link — with
          secure payments, trust verification, and zero tech skills required.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <Button href="/auth/register" size="lg" className="shadow-glow"
            >Create Free Shop</Button
          >
          <Button href="/vendor" variant="outline" size="lg"
            >Explore Vendors</Button
          >
        </div>
        <div class="mt-8 flex items-center gap-4 text-sm text-text-muted">
          <div class="flex -space-x-2">
            <div
              class="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
            ></div>
            <div
              class="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
            ></div>
            <div
              class="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"
            ></div>
          </div>
          <span>Trusted by 500+ vendors</span>
        </div>
      </div>

      <!-- Right: Mockup -->
      <div class="relative animate-float">
        <div class="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl"></div>
        <Card
          className="relative bg-surface border border-gray-100 overflow-hidden"
        >
          <img alt="Dashboard Preview" class="w-full h-[350px] opacity-90" />
          <!-- Floating Badge -->
          <div
            class="absolute top-10 right-10 bg-white p-3 rounded-xl shadow-card-hover flex items-center gap-2 animate-bounce"
          >
            <Icon
              icon="mdi:check"
              width="16"
              height="16"
              class="text-success"
            />
            <span class="text-sm font-bold text-dark">Verified Vendor</span>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 3: PROBLEMS SECTION -->
  <section
    class="relative section bg-gradient-to-b from-dark to-[#0f172a] text-white overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-6 text-center">
      <h2 class="text-4xl md:text-5xl font-semibold mb-4">
        Why Small Vendors Struggle Online
      </h2>

      <p class="text-text-muted max-w-2xl mx-auto mb-20 text-lg">
        Going digital sounds simple — but small vendors face real challenges
        that make it harder to compete in today’s online marketplace.
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each problems as item}
          <Card
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
          >
            <div
              class="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-2xl mb-6 group-hover:bg-primary/20 transition-colors"
            >
              <Icon icon={item.icon} width="28" height="28" />
            </div>

            <h3 class="text-xl font-semibold mb-3">
              {item.title}
            </h3>

            <p class="text-text-muted leading-relaxed text-sm">
              {item.desc}
            </p>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 4: SOLUTION SECTION -->
  <section id="features" class="section bg-surface">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="md:text-h2 text-h3 text-dark mb-4">VendorHub Solves This</h2>
      <p class="text-body text-text-muted mb-16 max-w-2xl mx-auto">
        Everything you need to sell online, simplified for social media vendors.
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each features as feature}
          <div
            class="bg-primary/7 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 border border-transparent hover:border-primary/20"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto"
            >
              <Icon icon={feature.icon} width="22" height="22" />
            </div>
            <h3 class="text-h4 text-dark mb-2">{feature.title}</h3>
            <p class="text-small text-text-muted">{feature.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 5: HOW IT WORKS -->
  <section id="how-it-works" class="section bg-background-light">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="md:text-h2 text-h3 text-dark text-center mb-16">
        How It Works
      </h2>

      <div class="grid md:grid-cols-4 gap-8 relative">
        <!-- Connecting Line (Desktop) -->
        <div
          class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"
        ></div>

        {#each steps as item}
          <div class="relative bg-background-light pt-4">
            <div
              class="w-24 h-24 bg-white border-4 border-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-6 shadow-lg"
            >
              {item.step}
            </div>
            <h3 class="md:text-h3 text-h4 text-dark text-center mb-2">
              {item.title}
            </h3>
            <p class="text-body text-text-muted text-center">{item.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 6: TRUST & SECURITY -->
  <section
    class="relative section bg-gradient-to-b from-surface to-surface/60 overflow-hidden"
  >
    <!-- Subtle background glow -->
    <div
      class="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
    ></div>

    <div
      class="container relative z-10 grid lg:grid-cols-2 gap-16 items-center"
    >
      <!-- LEFT: Premium Visual Card -->
      <div class="animate-fade-in">
        <div
          class="relative bg-dark rounded-3xl px-4 py-6 md:px-6 md:py-8 lg:p-12 text-center shadow-2xl"
        >
          <span
            class="absolute right-3 top-4 bg-success/10 text-success px-4 py-1 rounded-full text-sm font-medium mb-6"
          >
            Bank-Grade Security
          </span>
          <!-- Glow ring -->
          <div class="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>

          <Icon icon="noto:shield" class="w-30 h-30 text-center mx-auto mb-4" />

          <p class="text-white/70 text-sm mb-5 max-w-sm mx-auto">
            Every transaction is secured with escrow protection and real vendor
            verification.
          </p>

          <div class="grid grid-cols-3 gap-6 text-white">
            <div class="flex flex-col gap-2 items-center justify-center">
              <div class="text-3xl">
                <Icon icon="mdi:lock-outline" width="28" height="28" />
              </div>
              <p class="text-sm text-white/70">Funds Secured</p>
            </div>
            <div class="flex flex-col gap-2 items-center justify-center">
              <div class="text-3xl">
                <Icon icon="mdi:scale-balance" width="28" height="28" />
              </div>
              <p class="text-sm text-white/70">Disputes Resolved</p>
            </div>
            <div class="flex flex-col gap-2 items-center justify-center">
              <div class="text-3xl">
                <Icon
                  icon="mdi:check"
                  width="24"
                  height="24"
                  class="text-white"
                />
              </div>
              <p class="text-sm text-white/70">Verified Vendors</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Trust Breakdown -->
      <div class="animate-fade-in" style="transition-delay: 100ms">
        <h2 class="md:text-h3 text-h4 text-text-main mb-8 leading-tight">
          Why Buyers Trust VendorHub
        </h2>

        <div class="space-y-6">
          {#each [{ title: "Identity Verified Vendors", desc: "Every vendor undergoes ID verification and manual approval before receiving a verified badge." }, { title: "Transparent Trust Score", desc: "Scores calculated from delivery rate, response time, reviews, and order completion." }, { title: "Secure Escrow Payments", desc: "Funds are safely held until you confirm delivery — eliminating scam risks." }, { title: "Fast Dispute Resolution", desc: "Our neutral resolution team reviews evidence and settles disputes within 48 hours." }] as item}
            <div class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-full bg-success/15 text-success flex items-center justify-center flex-shrink-0 mt-1"
              >
                <Icon
                  icon="mdi:check"
                  width="16"
                  height="16"
                  class="text-success"
                />
              </div>
              <div>
                <h3 class="font-semibold text-sm mb-1">
                  {item.title}
                </h3>
                <p class="text-text-muted text-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          {/each}
        </div>

        <Button href="/support#trust" variant="outline" className="mt-10">
          Learn More About Safety
        </Button>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 7: FAQ -->
  <section id="faq" class="section bg-background-light">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="md:text-h2 text-h3 text-text-main mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-body text-text-muted">
          Everything you need to know about selling with VendorHub. Still have
          questions? <a
            href="/support#contact"
            class="text-primary hover:underline">Contact us</a
          >.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-4xl mx-auto space-y-4">
        {#each faqs as faq, i}
          <Card
            hover={false}
            padding="none"
            className="border border-gray-200 overflow-hidden"
          >
            <button
              class="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-expanded={openIndex === i}
              aria-controls="faq-panel-{i}"
              on:click={() => toggle(i)}
            >
              <span class="text-h4 font-semibold text-text-main pr-4">
                {faq.question}
              </span>
              <!-- Chevron Icon -->
              <span
                class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-primary transition-transform duration-200"
                class:rotate-180={openIndex === i}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>

            <!-- Answer Panel with Animation -->
            <div
              id="faq-panel-{i}"
              role="region"
              aria-labelledby="faq-question-{i}"
              class="overflow-hidden transition-all duration-300 ease-in-out"
              style="max-height: {openIndex === i
                ? '500px'
                : '0'}; opacity: {openIndex === i ? 1 : 0};"
            >
              <div class="px-6 pb-6 pt-0">
                <p class="text-body text-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </Card>
        {/each}
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-12">
        <p class="text-body text-text-muted mb-4">
          Still can't find what you're looking for?
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/support#contact" class="btn-outline">Contact Support</a>
          <a href="/support#faq" class="btn-primary">Learn More</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 8: PRICING PREVIEW -->
  <section id="pricing" class="section bg-surface">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="md:text-h2 text-h3 text-dark mb-4">Simple Pricing</h2>
      <p class="text-body text-text-muted mb-16">
        Start free. Upgrade when you grow.
      </p>

      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Free -->
        <Card className="p-8 border border-gray-200">
          <h3 class="text-h4 text-dark mb-2">Free</h3>
          <div class="text-4xl font-bold text-dark mb-6">$0</div>
          <ul class="space-y-3 text-small text-text-muted mb-8 text-left">
            <li>
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success inline-block mr-2"
              />30 Products
            </li>
            <li>
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success inline-block mr-2"
              />1 Shop
            </li>
            <li>
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success inline-block mr-2"
              />5% Transaction Fee
            </li>
          </ul>
          <Button variant="outline" className="w-full">Get Started</Button>
        </Card>

        <!-- Pro (Highlighted) -->
        <Card
          className="p-8 border-2 border-primary relative shadow-card-hover transform md:-translate-y-4"
        >
          <div
            class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full"
          >
            MOST POPULAR
          </div>
          <h3 class="text-h4 text-dark mb-2">Pro</h3>
          <div class="text-4xl font-bold text-dark mb-6">
            $5<span class="text-lg text-text-muted font-normal">/mo</span>
          </div>
          <ul class="space-y-3 text-small text-dark mb-8 text-left">
            <li class="flex gap-2">
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success mt-0.5"
              /> Unlimited Products
            </li>
            <li class="flex gap-2">
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success mt-0.5"
              /> 5 Shops
            </li>
            <li class="flex gap-2">
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success mt-0.5"
              /> 5% Transaction Fee
            </li>
          </ul>
          <Button variant="primary" className="w-full">Start Pro Trial</Button>
        </Card>

        <!-- Enterprise -->
        <Card className="p-8 border border-gray-200">
          <h3 class="text-h4 text-dark mb-2">Enterprise</h3>
          <div class="text-4xl font-bold text-dark mb-6">Custom</div>
          <ul class="space-y-3 text-small text-text-muted mb-8 text-left">
            <li>
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success inline-block mr-2"
              />API Access
            </li>
            <li>
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success inline-block mr-2"
              />Dedicated Manager
            </li>
            <li>
              <Icon
                icon="mdi:check"
                width="16"
                height="16"
                class="text-success inline-block mr-2"
              />Custom Domain
            </li>
          </ul>
          <Button variant="outline" className="w-full">Contact Sales</Button>
        </Card>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 9: SOCIAL PROOF -->
  <section class="section bg-background-light">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="md:text-h2 text-h3 text-dark mb-16">
        Trusted by Growing Vendors
      </h2>
      <div class="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x">
        {#each testimonials as t}
          <div class="flex-shrink-0 w-80 snap-start">
            <Card className="p-4 text-left h-65 bg-white">
              <div class="text-primary text-4xl mb-2">"</div>
              <p class="text-body text-dark mb-4">{t.text}</p>
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl"
                >
                  <Icon icon={t.avatar} width="20" height="20" />
                </div>
                <div>
                  <div class="font-bold text-dark">{t.name}</div>
                  <div class="text-small text-text-muted">{t.role}</div>
                </div>
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 10: FINAL CTA -->
  <section
    class="section bg-gradient-to-r from-primary to-primary-hover text-white text-center"
  >
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="md:text-h2 text-h3 mb-6">Start Your Free Vendor Shop Today</h2>
      <p class="text-lg opacity-90 mb-8">
        No credit card. No tech skills. Launch in 3 minutes.
      </p>
      <Button
        href="/auth/register"
        className="text-primary hover:bg-gray-100 shadow-lg px-8 py-4 text-lg"
        >Claim Your Shop Link →</Button
      >
    </div>
  </section>
</main>
