<script lang="ts">
  import Icon from "@iconify/svelte";
  import AppTable from "$lib/components/app/common/AppTable.svelte";
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
    followers: Follower[];
  }

  let { followers }: Props = $props();
</script>

<AppTable items={followers}>
  {#snippet header()}
    <th class="px-6 py-4 text-left font-semibold text-text-main">Follower</th>
    <th class="px-6 py-4 text-left font-semibold text-text-main">Status</th>
    <th class="px-6 py-4 text-left font-semibold text-text-main">Joined</th>
    <th class="px-6 py-4 text-left font-semibold text-text-main">Orders</th>
    <th class="px-6 py-4 text-left font-semibold text-text-main">Shops Following</th>
    <!-- <th class="px-6 py-4 text-center font-semibold text-text-main">Actions</th> -->
  {/snippet}

  {#snippet row(follower: Follower)}
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          {#if follower.avatar}
            <img src={follower.avatar} alt={follower.name} class="w-full h-full object-cover" />
          {:else}
            <Icon icon="mdi:account" class="w-5 h-5 text-primary" />
          {/if}
        </div>
        <div>
          <p class="font-medium text-text-main">{follower.name}</p>
          <p class="text-xs text-text-muted">{follower.email}</p>
        </div>
      </div>
    </td>
    <td class="px-6 py-4">
      <Badge variant={follower.orders > 0 ? "success" : "default"} size="sm">
        {follower.orders > 0 ? "Active" : "New"}
      </Badge>
    </td>
    <td class="px-6 py-4">
      <p class="text-sm text-text-main">{formatDate(follower.followedAt)}</p>
    </td>
    <td class="px-6 py-4">
      <p class="font-medium text-text-main">{follower.orders}</p>
    </td>
    <td class="px-6 py-4">
      <div class="flex flex-wrap gap-1">
        {#each follower.shops as shop}
          <Badge variant="info" size="sm" className="text-[10px]">{shop.name}</Badge>
        {/each}
      </div>
    </td>
    <!-- <td class="px-6 py-4 text-center">
      <button class="text-primary hover:text-primary-hover p-2 rounded-md hover:bg-primary/5 transition-colors">
        <Icon icon="mdi:eye-outline" class="w-4 h-4" />
      </button>
    </td> -->
  {/snippet}
</AppTable>
