<!-- src/routes/auth/register/+page.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
  import Card from "$lib/components/common/Card.svelte";
  import Button from "$lib/components/common/Button.svelte";

  const roles = [
    {
      id: "buyer",
      icon: "🛍️",
      title: "Buy Products",
      description:
        "Discover trusted vendors and shops. Shop with secure payments and buyer protection.",
      cta: "Continue as Buyer",
      href: "/auth/register/buyer",
    },
    {
      id: "vendor",
      icon: "🏪",
      title: "Sell on VendorHub",
      description:
        "Create shops, build your trust score, and grow your business with secure tools.",
      cta: "Continue as Vendor",
      href: "/auth/register/vendor",
    },
  ];
</script>

<AuthLayout
  title=""
  subtitle=""
>
  <div class="space-y-4">
    {#each roles as role}
      <Card
        hover={true}
        padding="lg"
        className="border border-gray-200 cursor-pointer group hover:border-primary/50 transition-all"
        on:click={() => goto(role.href)}
      >
        <div class="flex items-start gap-4">
          <div
            class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform"
          >
            {role.icon}
          </div>
          <div class="flex-1">
            <h3
              class="text-lg font-semibold text-text-main mb-1 group-hover:text-primary transition-colors"
            >
              {role.title}
            </h3>
            <p class="text-body text-text-muted mb-4">{role.description}</p>
            <Button variant="outline" size="md" className="w-full sm:w-auto" onclick={() => goto(role.href)}>
              {role.cta}
            </Button>
          </div>
        </div>
      </Card>
    {/each}
  </div>

  <p class="mt-6 text-center text-sm text-text-muted">
    Already have an account?
    <a href="/auth/login" class="text-primary font-medium hover:underline"
      >Sign in</a
    >
  </p>
</AuthLayout>
