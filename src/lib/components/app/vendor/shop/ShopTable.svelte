<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import Card from "$lib/components/common/Card.svelte";
  import Badge from "$lib/components/common/Badge.svelte";

  interface Shop {
    id: string;
    slug: string;
    name: string;
    description: string;
    logoUrl: string;
    bannerUrl: string;
    trustScore: number;
    rating: number;
    followers: number;
    products: number;
    active: boolean;
    verified: boolean;
  }

  export let filteredShops: Shop[] = [];
</script>

<Card className="border border-gray-200 overflow-hidden">
    <div
        class="overflow-x-auto rounded-xl border border-gray-200"
        in:fade={{ duration: 300 }}
    >
        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                    <th
                        class="px-6 py-4 text-left font-semibold text-text-main"
                    >
                        Shop Name
                    </th>
                    <th
                        class="px-6 py-4 text-left font-semibold text-text-main"
                    >
                        Status
                    </th>
                    <th
                        class="px-6 py-4 text-left font-semibold text-text-main"
                    >
                        Rating
                    </th>
                    <th
                        class="px-6 py-4 text-left font-semibold text-text-main"
                    >
                        Followers
                    </th>
                    <th
                        class="px-6 py-4 text-left font-semibold text-text-main"
                    >
                        Products
                    </th>
                    <th
                        class="px-6 py-4 text-left font-semibold text-text-main"
                    >
                        Trust Score
                    </th>
                    <th
                        class="px-6 py-4 text-left font-semibold text-text-main"
                    >
                        Verified
                    </th>
                    <th
                        class="px-6 py-4 text-center font-semibold text-text-main"
                    >
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each filteredShops as shop, i}
                    <tr
                        class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        in:fly={{
                            y: 10,
                            duration: 300,
                            delay: i * 30,
                            easing: cubicOut,
                        }}
                    >
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl"
                                >
                                    {shop.logoUrl}
                                </div>
                                <div>
                                    <p
                                        class="font-medium text-text-main"
                                    >
                                        {shop.name}
                                    </p>
                                    <p
                                        class="text-xs text-text-muted"
                                    >
                                        {shop.slug}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <Badge
                                variant={shop.active
                                    ? "success"
                                    : "danger"}
                                size="sm"
                            >
                                {shop.active
                                    ? "Active"
                                    : "Inactive"}
                            </Badge>
                        </td>
                        <td class="px-6 py-4">
                            <div
                                class="flex items-center gap-1"
                            >
                                <Icon
                                    icon="mdi:star"
                                    class="w-4 h-4 text-yellow-500"
                                />
                                <span
                                    class="text-text-main font-medium"
                                >
                                    {shop.rating}
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <p class="text-text-main font-medium">
                                {shop.followers.toLocaleString()}
                            </p>
                        </td>
                        <td class="px-6 py-4">
                            <p class="text-text-main font-medium">
                                {shop.products}
                            </p>
                        </td>
                        <td class="px-6 py-4">
                            <div
                                class="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100"
                            >
                                <span
                                    class="text-blue-700 font-medium text-xs"
                                >
                                    {shop.trustScore}%
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            {#if shop.verified}
                                <div class="flex items-center gap-1">
                                    <Icon
                                        icon="mdi:check-circle"
                                        class="w-4 h-4 text-success"
                                    />
                                    <span
                                        class="text-success text-xs font-medium"
                                    >
                                        Verified
                                    </span>
                                </div>
                            {:else}
                                <div class="flex items-center gap-1">
                                    <Icon
                                        icon="mdi:clock-outline"
                                        class="w-4 h-4 text-text-muted"
                                    />
                                    <span
                                        class="text-text-muted text-xs"
                                    >
                                        Pending
                                    </span>
                                </div>
                            {/if}
                        </td>
                        <td class="px-6 py-4">
                            <div
                                class="flex items-center justify-center gap-2"
                            >
                                <a
                                    href="/my-shop/{shop.slug}"
                                    class="text-primary hover:text-primary-hover transition-colors p-1.5 rounded-md hover:bg-primary/10"
                                    title="View shop"
                                >
                                    <Icon
                                        icon="mdi:eye-outline"
                                        class="w-4 h-4"
                                    />
                                </a>
                                <a
                                    href="/my-shop/{shop.slug}/edit"
                                    class="text-primary hover:text-primary-hover transition-colors p-1.5 rounded-md hover:bg-primary/10"
                                    title="Edit shop"
                                >
                                    <Icon
                                        icon="mdi:pencil-outline"
                                        class="w-4 h-4"
                                    />
                                </a>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</Card>