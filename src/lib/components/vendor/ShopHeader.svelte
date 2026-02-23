<!-- src/lib/components/vendor/ShopHeader.svelte -->
<script lang="ts">
  import { browser } from '$app/environment';
  import type { Vendor } from '$lib/types';
  import Button from '$lib/components/ui/Button.svelte';
  import TrustBadge from '$lib/components/ui/TrustBadge.svelte';
  import TrustScore from '$lib/components/ui/TrustScore.svelte';
  
  export let vendor: Vendor;
  export let onCopyLink?: () => void;
  
  const socialIcons: Record<string, { icon: string; label: string }> = {
    instagram: { icon: '📸', label: 'Instagram' },
    whatsapp: { icon: '💬', label: 'WhatsApp' },
    tiktok: { icon: '🎵', label: 'TikTok' },
    facebook: { icon: '📘', label: 'Facebook' },
    twitter: { icon: '🐦', label: 'Twitter' }
  };
  
  const copyShopLink = () => {
    if (!browser) return;
    const url = `${window.location.origin}/${vendor.slug}/shop`;
    navigator.clipboard.writeText(url);
    onCopyLink?.();
  };
</script>

<header
    class="relative bg-gradient-to-r from-primary to-primary-light text-surface"
>
    {#if vendor.coverUrl}
        <img
            src={vendor.coverUrl}
            alt=""
            class="w-full h-32 md:h-48 object-cover opacity-20"
        />
        <div
            class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"
        />
    {/if}

    <div class="relative max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div class="flex flex-col md:flex-row md:items-end gap-5">
            <!-- Logo -->
            <img
                src={vendor.logoUrl}
                alt={vendor.name}
                class="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-surface shadow-lg object-cover"
            />

            <!-- Info -->
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 flex-wrap">
                    <h1 class="text-xl md:text-2xl font-bold truncate">
                        {vendor.name}
                    </h1>
                    {#if vendor.verified}
                        <TrustBadge size="sm" />
                    {/if}
                </div>

                <div class="mt-1.5 flex items-center gap-4 flex-wrap">
                    <TrustScore value={vendor.trustScore} />
                    {#if vendor.location}
                        <span class="text-sm opacity-90"
                            >📍 {vendor.location}</span
                        >
                    {/if}
                </div>

                {#if vendor.bio}
                    <p
                        class="mt-2 text-sm md:text-base opacity-95 line-clamp-2 max-w-xl"
                    >
                        {vendor.bio}
                    </p>
                {/if}
            </div>

            <!-- Actions -->
            <div class="flex gap-2 flex-shrink-0">
                <Button
                    variant="secondary"
                    size="sm"
                    on:click={copyShopLink}
                    title="Copy shop link to clipboard"
                    class="!bg-white/10 !text-white hover:!bg-white/20 border border-white/30"
                >
                    🔗 Copy Link
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    href={`/${vendor.slug}/shop`}
                    class="!bg-white !text-primary hover:!bg-gray-100"
                >
                    Shop Now →
                </Button>
            </div>
        </div>

        <!-- Social Links -->
        {#if vendor.socials?.length}
            <div class="mt-4 flex flex-wrap gap-4">
                {#each vendor.socials as social (social.platform)}
                    <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-1.5 text-sm opacity-90 hover:opacity-100 transition-opacity"
                        aria-label="Visit {vendor.name} on {socialIcons[
                            social.platform
                        ].label}"
                    >
                        <span aria-hidden="true"
                            >{socialIcons[social.platform].icon}</span
                        >
                        <span class="hidden sm:inline">@{social.handle}</span>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</header>
