<!-- src/lib/components/orders/OrderItems.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  
  export let items: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    shop: {
      name: string;
      slug: string;
    };
  }>;
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
</script>

<Card className="border border-gray-200 p-6">
  <h3 class="text-lg font-bold text-text-main mb-6">Order Items</h3>
  
  <div class="space-y-4">
    {#each items as item}
      <div class="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          class="w-20 h-20 rounded-lg object-cover bg-gray-100"
        />
        <div class="flex-1">
          <h4 class="font-semibold text-text-main mb-1">{item.name}</h4>
          <p class="text-sm text-text-muted mb-2">
            Qty: {item.quantity} × {formatNaira(item.price)}
          </p>
          <a
            href="/shop/{item.shop.slug}"
            class="text-sm text-primary hover:underline flex items-center gap-1"
            target="_blank"
          >
            <Icon icon="mdi:store-outline" class="w-4 h-4" />
            {item.shop.name}
          </a>
        </div>
        <div class="text-right">
          <p class="font-semibold text-text-main">{formatNaira(item.price * item.quantity)}</p>
        </div>
      </div>
    {/each}
  </div>
</Card>