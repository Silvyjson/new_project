<!-- src/lib/components/vendor/VendorCard.svelte -->
<script lang="ts">
  import type { Vendor } from "$lib/types";
  import Card from "$lib/components/ui/Card.svelte";
  import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
  import TrustScore from "$lib/components/ui/TrustScore.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  export let vendor: Vendor;
  export let showBio: boolean = true;
  export let compact: boolean = false;

  const socialIcons: Record<string, string> = {
    instagram: "📸",
    whatsapp: "💬",
    tiktok: "🎵",
    facebook: "📘",
    twitter: "🐦",
  };
</script>

<a
  href="/{vendor.slug}"
  class="block group"
  aria-label="View {vendor.name}'s shop"
>
  <Card
    hover={true}
    padding="none"
    className="overflow-hidden border border-transparent group-hover:border-primary-light transition-colors"
  >
    <!-- Cover/Header -->
    {#if !compact && vendor.coverUrl}
      <div class="h-24 bg-gradient-to-r from-primary to-primary-light"></div>
    {/if}

    <div class="p-5">
      <div class="flex items-start gap-4">
        <!-- Logo -->
        <img
          src={vendor.logoUrl}
          alt="{vendor.name} logo"
          class="w-16 h-16 rounded-xl object-cover border-2 border-surface shadow-md -mt-8"
        />

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-bold text-dark text-lg truncate">{vendor.name}</h3>
            {#if vendor.verified}
              <TrustBadge size="sm" showText={false} />
            {/if}
          </div>

          <div class="mt-1 flex items-center gap-3">
            <TrustScore value={vendor.trustScore} />
            {#if vendor.location}
              <span class="text-xs text-gray-muted">📍 {vendor.location}</span>
            {/if}
          </div>

          {#if showBio && vendor.bio}
            <p class="mt-2 text-sm text-gray-muted line-clamp-2">
              {vendor.bio}
            </p>
          {/if}
        </div>
      </div>

      <!-- Social Links -->
      {#if vendor.socials?.length}
        <div class="mt-4 flex items-center gap-3 pt-4 border-t border-gray-100">
          {#each vendor.socials as social (social.platform)}
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-muted hover:text-primary transition-colors text-sm"
              aria-label="Visit {vendor.name} on {social.platform}"
              on:click|stopPropagation
            >
              <span aria-hidden="true">{socialIcons[social.platform]}</span>
            </a>
          {/each}
        </div>
      {/if}

      <!-- Action -->
      <div class="mt-4">
        <Button
          variant="outline"
          size="sm"
          href={`/${vendor.slug}/shop`}
          className="w-full"
        >
          Visit Shop
        </Button>
      </div>
    </div>
  </Card>
</a>
