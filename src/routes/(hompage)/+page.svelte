<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import TrustBadge from "$lib/components/ui/TrustBadge.svelte";

  const problems = [
    {
      icon: "❌",
      title: "No Website",
      desc: "Sharing products via DMs is slow and unprofessional.",
    },
    {
      icon: "🔒",
      title: "No Trust",
      desc: "Buyers hesitate to pay strangers without verification.",
    },
    {
      icon: "💸",
      title: "Payment Risk",
      desc: "Cash-on-delivery risks lead to lost revenue.",
    },
    {
      icon: "📉",
      title: "Hard to Scale",
      desc: "Manual tracking limits your growth potential.",
    },
  ];

  const features = [
    {
      icon: "🔗",
      title: "Unique Shop Link",
      desc: "Get vendorhub.com/yourname/shopname",
    },
    { icon: "⭐", title: "Trust Score", desc: "Verified badges & reviews" },
    { icon: "🛡️", title: "Escrow Payments", desc: "Funds held until delivery" },
    { icon: "📊", title: "Simple Analytics", desc: "Track views & sales" },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Profile",
      desc: "Sign up free and get verified.",
    },
    {
      step: "02",
      title: "Create Store",
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
      avatar: "👩🏾",
    },
    {
      name: "David O.",
      role: "Electronics",
      text: "Finally a platform that handles payments securely. No more chasing DMs for payment.",
      avatar: "👨🏿",
    },
    {
      name: "Priya M.",
      role: "Handmade Goods",
      text: "The setup was instant. I shared my link on Instagram and started selling immediately.",
      avatar: "👩🏽",
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

  // Mobile Menu State
  let mobileMenuOpen = false;
</script>

<svelte:head>
  <title>VendorHub — Build Your Online Store. Get Verified. Get Paid.</title>
  <meta
    name="description"
    content="The trusted platform for social media vendors. Secure payments, unique shop links, and zero tech skills required."
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="font-sans text-text-main antialiased">
  <!-- 🔷 SECTION 1: NAVIGATION -->
  <nav
    class="fixed w-full z-50 bg-surface/90 backdrop-blur-md border-b border-gray-100 h-20"
  >
    <div
      class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between"
    >
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold"
        >
          V
        </div>
        <span class="text-xl font-bold text-dark">VendorHub</span>
      </a>

      <!-- Desktop Links -->
      <div
        class="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted"
      >
        <a href="#how-it-works" class="hover:text-primary transition-colors"
          >How It Works</a
        >
        <a href="#features" class="hover:text-primary transition-colors"
          >Features</a
        >
        <a href="/vendors" class="hover:text-primary transition-colors"
          >Vendors</a
        >
        <a href="/shops" class="hover:text-primary transition-colors">Shops</a>
      </div>

      <!-- Auth Buttons -->
      <div class="hidden md:flex items-center gap-4">
        <Button href="/auth/login" variant="outline">Login</Button>
        <Button href="/auth/register" size="md">Get Started</Button>
      </div>

      <!-- Mobile Toggle -->
      <button
        class="md:hidden text-dark"
        on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          /></svg
        >
      </button>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
      <div
        class="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-gray-100 p-4 flex flex-col gap-4 shadow-lg"
      >
        <a href="#how-it-works" class="text-text-main font-medium"
          >How It Works</a
        >
        <a href="#features" class="text-text-main font-medium">Features</a>
        <a href="/vendors" class="text-primary font-bold">Vendors</a>
        <a href="/vendors/shops" class="text-primary font-bold">Shops</a>
        <div>
          <Button href="/auth/login" variant="outline">Login</Button>
          <Button href="/auth/register" size="md">Get Started</Button>
        </div>
      </div>
    {/if}
  </nav>

  <!-- 🔷 SECTION 2: HERO SECTION -->
  <section class="pt-32 pb-20 md:pt-40 md:pb-32 bg-surface overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <!-- Left: Copy -->
      <div class="animate-fade-in">
        <h1 class="text-h1 text-dark mb-6">
          Build Your Online Store.<br />
          <span class="text-primary">Get Verified.</span> Get Paid.
        </h1>
        <p class="text-body text-text-muted mb-8 max-w-lg">
          VendorHub gives small vendors a free, professional shop link — with
          secure payments, trust verification, and zero tech skills required.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <Button href="/auth/register" size="lg" className="shadow-glow"
            >Create Free Store</Button
          >
          <Button href="/vendors" variant="outline" size="lg"
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
            <div class="text-success">✓</div>
            <span class="text-sm font-bold text-dark">Verified Vendor</span>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <section class="py-24 bg-dark text-white">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-h2 mb-16">Why Small Vendors Struggle Online</h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each problems as item}
          <Card
            className="bg-dark-card border border-gray-700 p-8 text-left hover:border-primary/50 transition-colors"
          >
            <div class="text-4xl mb-4">{item.icon}</div>
            <h3 class="text-h4 text-white mb-2">{item.title}</h3>
            <p class="text-text-muted">{item.desc}</p>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 4: SOLUTION SECTION -->
  <section id="features" class="py-24 bg-surface">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-h2 text-dark mb-4">VendorHub Solves This</h2>
      <p class="text-body text-text-muted mb-16 max-w-2xl mx-auto">
        Everything you need to sell online, simplified for social media vendors.
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each features as feature}
          <Card
            className="p-8 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 border border-transparent hover:border-primary/20"
          >
            <div
              class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-6 mx-auto"
            >
              {feature.icon}
            </div>
            <h3 class="text-h4 text-dark mb-2">{feature.title}</h3>
            <p class="text-small text-text-muted">{feature.desc}</p>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 5: HOW IT WORKS -->
  <section id="how-it-works" class="py-24 bg-background-light">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-h2 text-dark text-center mb-16">How It Works</h2>

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
            <h3 class="text-h3 text-dark text-center mb-2">{item.title}</h3>
            <p class="text-body text-text-muted text-center">{item.desc}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 6: TRUST & SECURITY -->
  <section class="py-24 bg-surface">
    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <div class="order-2 md:order-1">
        <div
          class="bg-primary/5 rounded-2xl h-full p-8 flex items-center justify-center"
        >
          <span class="text-9xl">🛡️</span>
        </div>
      </div>

      <div class="order-1 md:order-2">
        <h2 class="text-h2 text-dark mb-6">Bank-Grade Security</h2>

        <ul class="space-y-4">
          {#each securityPoints as item}
            <li class="flex items-center gap-3 text-body text-dark">
              <span
                class="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm"
              >
                ✓
              </span>
              {item}
            </li>
          {/each}
        </ul>

        <Button href="/about" variant="outline" className="mt-8">
          Learn More About Us
        </Button>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 7: FAQ -->
  <section id="faq" class="section bg-background-light">
    <div class="container">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-h2 text-text-main mb-4">Frequently Asked Questions</h2>
        <p class="text-body text-text-muted">
          Everything you need to know about selling with VendorHub. Still have
          questions? <a href="/contact" class="text-primary hover:underline"
            >Contact us</a
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
          <a href="/contact" class="btn-outline">Contact Support</a>
          <a href="/trust" class="btn-primary">Learn About Safety</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 8: PRICING PREVIEW -->
  <section id="pricing" class="py-24 bg-surface">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-h2 text-dark mb-4">Simple Pricing</h2>
      <p class="text-body text-text-muted mb-16">
        Start free. Upgrade when you grow.
      </p>

      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Free -->
        <Card className="p-8 border border-gray-200">
          <h3 class="text-h4 text-dark mb-2">Free</h3>
          <div class="text-4xl font-bold text-dark mb-6">$0</div>
          <ul class="space-y-3 text-small text-text-muted mb-8 text-left">
            <li>✓ 20 Products</li>
            <li>✓ Basic Trust Score</li>
            <li>✓ 5% Transaction Fee</li>
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
              <span class="text-success">✓</span> Unlimited Products
            </li>
            <li class="flex gap-2">
              <span class="text-success">✓</span> Priority Verification
            </li>
            <li class="flex gap-2">
              <span class="text-success">✓</span> 3% Transaction Fee
            </li>
          </ul>
          <Button variant="primary" className="w-full">Start Pro Trial</Button>
        </Card>

        <!-- Enterprise -->
        <Card className="p-8 border border-gray-200">
          <h3 class="text-h4 text-dark mb-2">Enterprise</h3>
          <div class="text-4xl font-bold text-dark mb-6">Custom</div>
          <ul class="space-y-3 text-small text-text-muted mb-8 text-left">
            <li>✓ API Access</li>
            <li>✓ Dedicated Manager</li>
            <li>✓ Custom Domain</li>
          </ul>
          <Button variant="outline" className="w-full">Contact Sales</Button>
        </Card>
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 9: SOCIAL PROOF -->
  <section class="py-24 bg-background-light">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-h2 text-dark mb-16">Trusted by Growing Vendors</h2>
      <div class="grid md:grid-cols-3 gap-8">
        {#each testimonials as t}
          <Card className="p-8 text-left bg-white">
            <div class="text-primary text-4xl mb-4">"</div>
            <p class="text-body text-dark mb-6">{t.text}</p>
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl"
              >
                {t.avatar}
              </div>
              <div>
                <div class="font-bold text-dark">{t.name}</div>
                <div class="text-small text-text-muted">{t.role}</div>
              </div>
            </div>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- 🔷 SECTION 10: FINAL CTA -->
  <section
    class="py-24 bg-gradient-to-r from-primary to-primary-hover text-white text-center"
  >
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-h2 mb-6">Start Your Free Vendor Store Today</h2>
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

  <!-- 🔷 SECTION 10: FOOTER -->
  <footer class="bg-dark text-white py-16 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-12">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div
            class="w-6 h-6 bg-primary rounded flex items-center justify-center text-xs font-bold"
          >
            V
          </div>
          <span class="font-bold text-lg">VendorHub</span>
        </div>
        <p class="text-small text-gray-400">
          Empowering small vendors to sell online with trust and security.
        </p>
      </div>

      <div>
        <h4 class="font-bold mb-4">Product</h4>
        <ul class="space-y-2 text-small text-gray-400">
          <li><a href="/about" class="hover:text-white">About Us</a></li>
          <li><a href="/vendors" class="hover:text-white">Vendors</a></li>
          <li><a href="/shops" class="hover:text-white">Shops</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-4">Company</h4>
        <ul class="space-y-2 text-small text-gray-400">
          <li>
            <a href="/dispute" class="hover:text-white">Dispute center</a>
          </li>
          <li><a href="/contact" class="hover:text-white">Contact</a></li>
          <li><a href="/blog" class="hover:text-white">Blog</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-4">Legal</h4>
        <ul class="space-y-2 text-small text-gray-400">
          <li><a href="/privacy" class="hover:text-white">Privacy</a></li>
          <li><a href="/terms" class="hover:text-white">Terms</a></li>
          <li><a href="/security" class="hover:text-white">Security</a></li>
        </ul>
      </div>
    </div>
    <div
      class="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-small text-gray-500"
    >
      © {new Date().getFullYear()} VendorHub. All rights reserved.
    </div>
  </footer>
</div>
