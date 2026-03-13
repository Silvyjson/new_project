<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { Promotion } from "$lib/types";
  import AppTable from "$lib/components/app/common/AppTable.svelte";
  import Badge from "$lib/components/common/Badge.svelte";
  import { formatNaira, formatDate } from "$lib/utils/format";

  interface Props {
    promotions: Promotion[];
    onEdit: (id: string) => void;
    onPause: (id: string) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    className?: string;
  }

  let { 
    promotions, 
    onEdit, 
    onPause, 
    onDuplicate, 
    onDelete,
    className = ""
  }: Props = $props();
</script>

<AppTable items={promotions} {className}>
  {#snippet header()}
    <th class="px-6 py-4 min-w-50 text-left font-semibold text-text-main">Promotion</th>
    <th class="px-6 py-4 min-w-30 text-left font-semibold text-text-main">Type</th>
    <th class="px-6 py-4 min-w-30 text-left font-semibold text-text-main">Discount</th>
    <th class="px-6 py-4 min-w-30 text-left font-semibold text-text-main">Status</th>
    <th class="px-6 py-4 min-w-30 text-left font-semibold text-text-main">Performance</th>
    <th class="px-6 py-4 text-center font-semibold text-text-main">Actions</th>
  {/snippet}

  {#snippet row(promo: Promotion)}
    <td class="px-6 py-4">
      <div>
        <p class="font-bold text-text-main">{promo.title}</p>
        <p class="text-xs text-text-muted line-clamp-1">{promo.description}</p>
        <p class="text-[10px] text-text-muted mt-1">
          {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
        </p>
      </div>
    </td>
    <td class="px-6 py-4">
      <Badge variant="default" className="capitalize">{promo.type}</Badge>
    </td>
    <td class="px-6 py-4">
      <p class="font-medium text-primary">
        {promo.discountType === 'percentage' ? `${promo.discountValue}% Off` : formatNaira(promo.discountValue) + ' Off'}
      </p>
    </td>
    <td class="px-6 py-4">
      <Badge 
        variant={promo.status === 'active' ? 'success' : promo.status === 'scheduled' ? 'info' : 'default'}
        className="capitalize"
      >
        {promo.status}
      </Badge>
    </td>
    <td class="px-6 py-4">
      <div class="space-y-1">
        <p class="text-xs text-text-main font-medium">{promo.orders} orders</p>
        <p class="text-xs text-text-muted">{formatNaira(promo.revenue)}</p>
      </div>
    </td>
    <td class="px-6 py-4 text-center">
      <div class="flex items-center justify-center gap-1">
        <button 
          onclick={() => onEdit(promo.id)}
          class="p-1.5 text-text-muted hover:text-primary transition-colors"
          title="Edit"
        >
          <Icon icon="mdi:pencil-outline" class="w-4 h-4" />
        </button>
        <button 
          onclick={() => onPause(promo.id)}
          class="p-1.5 text-text-muted hover:text-primary transition-colors"
          title={promo.status === 'paused' ? 'Resume' : 'Pause'}
        >
          <Icon icon={promo.status === 'paused' ? 'mdi:play-outline' : 'mdi:pause-outline'} class="w-4 h-4" />
        </button>
        <button 
          onclick={() => onDelete(promo.id)}
          class="p-1.5 text-text-muted hover:text-error transition-colors"
          title="Delete"
        >
          <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
        </button>
      </div>
    </td>
  {/snippet}
</AppTable>
