<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import TrustBadge from '$lib/components/ui/TrustBadge.svelte';
  
  // For demo: mock testimonials
  const testimonials = [
    {
      quote: "I went from DMs to 50 orders/week after getting my VendorHub link.",
      author: "Amina, Fashion Vendor",
      location: "Lagos"
    },
    {
      quote: "The escrow system made buyers trust me instantly. Game changer.",
      author: "Kwame, Electronics",
      location: "Accra"
    }
  ];
  
  const problems = [
    { icon: '❌', title: 'No Website?', desc: 'Sharing products via DMs is slow, unprofessional, and hard to scale.' },
    { icon: '🔒', title: 'No Trust?', desc: 'Buyers hesitate to pay strangers. Without verification, sales drop.' },
    { icon: '💸', title: 'No Payment Security?', desc: 'Cash-on-delivery risks + no escrow = lost revenue and disputes.' }
  ];

  const features = [
    { icon: '🔗', title: 'Unique Shop Link', desc: 'Get vendorhub.com/yourname — share it everywhere.' },
    { icon: '⭐', title: 'Trust Score', desc: 'Verified badges + reviews = more confident buyers.' },
    { icon: '🛡️', title: 'Escrow Payments', desc: 'We hold funds until delivery is confirmed.' },
    { icon: '📦', title: 'Preorder + In-Stock', desc: 'Label items clearly. Buyers know what to expect.' }
  ];
</script>

<svelte:head>
  <title>VendorHub — Build Your Online Shop. Get Trusted. Get Paid.</title>
  <meta name="description" content="Free professional shop links for small vendors. Secure payments, trust verification, zero tech skills needed." />
</svelte:head>

<main class="min-h-screen bg-surface">
  <!-- HERO SECTION -->
  <section class="pt-20 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-4xl md:text-5xl font-bold text-dark leading-tight">
          Build Your Online Shop.<br/>
          <span class="text-primary">Get Trusted. Get Paid.</span><br/>
          Grow Faster.
        </h1>
        <p class="mt-6 text-lg text-gray-text max-w-lg">
          VendorHub gives small vendors a free, professional shop link — with secure payments, trust verification, and zero tech skills required.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg" href="/auth/register">
            Start Your Free Shop
          </Button>
          <Button variant="secondary" size="lg" href="/vendors">
            Explore Vendors
          </Button>
        </div>
        <div class="mt-6 flex items-center gap-4 text-sm text-gray-muted">
          <TrustBadge verified={true} />
          <span>✓ No credit card • ✓ Launch in 3 min</span>
        </div>
      </div>
      
      <!-- Mock Dashboard Preview -->
      <div class="relative">
        <div class="absolute -inset-4 bg-primary-light/10 rounded-2xl blur-xl"></div>
        <Card class="relative bg-surface shadow-card-hover rounded-2xl overflow-hidden">
          <img 
            src="/images/dashboard-preview.png" 
            alt="VendorHub dashboard preview"
            class="w-full h-auto"
          />
        </Card>
      </div>
    </div>
  </section>

  <!-- PROBLEM SECTION -->
  <section class="py-16 px-4 bg-dark text-surface">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">
        Why Small Vendors Struggle Online
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        {#each problems as item}
          <Card class="bg-dark border border-gray-700 p-6 rounded-xl hover:border-primary-light transition-colors">
            <div class="text-3xl mb-4">{item.icon}</div>
            <h3 class="text-xl font-bold mb-2">{item.title}</h3>
            <p class="text-gray-300">{item.desc}</p>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- SOLUTION SECTION -->
  <section class="py-20 px-4 max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-4">
      VendorHub Solves This — <span class="text-primary">In Minutes</span>
    </h2>
    <p class="text-center text-gray-muted mb-12 max-w-2xl mx-auto">
      Everything you need to sell online, simplified for social media vendors.
    </p>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each features as feature}
        <Card class="p-6 hover:shadow-card-hover transition-shadow group">
          <div class="text-3xl mb-4 group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <h3 class="font-bold text-lg mb-2">{feature.title}</h3>
          <p class="text-gray-muted text-sm">{feature.desc}</p>
        </Card>
      {/each}
    </div>
  </section>

  <!-- SOCIAL PROOF -->
  <section class="py-16 px-4 bg-gray-light">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Trusted by 500+ Growing Vendors</h2>
      
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {#each testimonials as t}
          <Card class="p-6 text-left">
            <p class="italic text-gray-text mb-4">"{t.quote}"</p>
            <div class="font-bold text-dark">— {t.author}</div>
            <div class="text-sm text-gray-muted">{t.location}</div>
          </Card>
        {/each}
      </div>
      
      <div class="flex flex-wrap justify-center gap-8 text-center">
        <div>
          <div class="text-3xl font-bold text-primary">98%</div>
          <div class="text-sm text-gray-muted">Buyer Satisfaction</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-primary">24h</div>
          <div class="text-sm text-gray-muted">Avg. Payout Time</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-primary">Zero</div>
          <div class="text-sm text-gray-muted">Setup Fees</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="py-20 px-4 text-center">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">
        Start Your Free Vendor Store Today
      </h2>
      <p class="text-lg text-gray-muted mb-8">
        No credit card. No tech skills. Launch in 3 minutes.
      </p>
      <Button variant="primary" size="xl" href="/auth/register" class="shadow-glow hover:shadow-primary-glow">
        Claim Your Shop Link →
      </Button>
      <p class="mt-4 text-sm text-gray-muted">
        Free forever plan • Upgrade anytime
      </p>
    </div>
  </section>
</main>