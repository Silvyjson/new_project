<script lang="ts">
  import Icon from "@iconify/svelte";
  import Card from "$lib/components/common/Card.svelte";
  import Badge from "$lib/components/common/Badge.svelte";
  import { formatDate } from "$lib/utils/format";

  interface FollowerShop {
    id: string;
    name: string;
    slug: string;
  }

  interface Follower {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    followedAt: string;
    shops: FollowerShop[];
    orders: number;
    lastActive: string;
  }

  interface Props {
    follower: Follower;
  }

  let { follower }: Props = $props();
</script>

<Card className="border border-gray-200 p-6 hover:shadow-card-hover transition-shadow h-full">
  <div class="flex items-start gap-4">
    <!-- Avatar -->
    <div class="flex-shrink-0">
      {#if follower.avatar}
        <img
          src={follower.avatar}
          alt={follower.name}
          class="w-14 h-14 rounded-full object-cover"
        />
      {:else}
        <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon icon="mdi:account-circle" class="w-8 h-8 text-primary" />
        </div>
      {/if}
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <h3 class="font-semibold text-text-main truncate">{follower.name}</h3>
          <div class="flex items-center gap-1 text-sm text-text-muted mt-0.5">
            <Icon icon="mdi:email-outline" class="w-4 h-4" />
            <span class="truncate">{follower.email}</span>
          </div>
        </div>
        {#if follower.orders > 0}
          <Badge variant="success" size="sm">
            <Icon icon="mdi:shopping-outline" class="w-3 h-3 inline mr-1" />
            {follower.orders} orders
          </Badge>
        {/if}
      </div>

      <!-- Following Info -->
      <div class="mt-4 space-y-2">
        <div class="flex items-center gap-2 text-sm text-text-muted">
          <Icon icon="mdi:calendar-outline" class="w-4 h-4" />
          <span>Following since {formatDate(follower.followedAt)}</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-text-muted">
          <Icon icon="mdi:store-outline" class="w-4 h-4" />
          <span>Following:</span>
          <div class="flex flex-wrap gap-1">
            {#each follower.shops.slice(0, 2) as shop}
              <a
                href="/shop/{shop.slug}"
                class="text-primary hover:underline text-xs"
                target="_blank"
              >
                {shop.name}
              </a>
            {/each}
            {#if follower.shops.length > 2}
              <span class="text-xs text-text-muted">+{follower.shops.length - 2} more</span>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</Card>
