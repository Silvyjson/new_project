<!-- src/lib/components/cart/CartItemCard.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  
  export let item: {
    id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    quantity: number;
    shop: {
      name: string;
      slug: string;
      id: string;
    };
    variant?: string;
    inStock: boolean;
  };
  
  export let onUpdateQuantity: (id: string, quantity: number) => void;
  export let onRemove: (id: string) => void;
  export let onMoveToWishlist: (id: string) => void;
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const discount = item.oldPrice 
    ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
    : 0;
</script>

<Card className="border border-gray-200 p-4">
  <div class="flex gap-4">
    <!-- Product Image -->
    <a href="/shop/{item.shop.slug}/product/{item.productId}" class="flex-shrink-0">
      <div class="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          class="w-full h-full object-cover"
        />
        {#if discount > 0}
          <span class="absolute top-2 left-2 px-1.5 py-0.5 bg-error text-white text-xs font-bold rounded">
            -{discount}%
          </span>
        {/if}
      </div>
    </a>
    
    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <a href="/shop/{item.shop.slug}/product/{item.productId}" class="font-semibold text-text-main hover:text-primary transition-colors line-clamp-2">
            {item.name}
          </a>
          <p class="text-sm text-text-muted mt-1">
            Shop: <a href="/shop/{item.shop.slug}" class="text-primary hover:underline">{item.shop.name}</a>
          </p>
          {#if item.variant}
            <p class="text-xs text-text-muted mt-1">Variant: {item.variant}</p>
          {/if}
        </div>
        
        <!-- Price -->
        <div class="text-right flex-shrink-0">
          <p class="text-lg font-bold text-primary">{formatNaira(item.price * item.quantity)}</p>
          {#if item.oldPrice}
            <p class="text-sm text-text-muted line-through">{formatNaira(item.oldPrice)}</p>
          {/if}
        </div>
      </div>
      
      <!-- Quantity & Actions -->
      <div class="flex items-center justify-between mt-4">
        <!-- Quantity Selector -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            on:click={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            class="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary transition-colors disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            <Icon icon="mdi:minus" class="w-4 h-4" />
          </button>
          <span class="w-8 text-center text-body font-medium">{item.quantity}</span>
          <button
            type="button"
            on:click={() => onUpdateQuantity(item.id, item.quantity + 1)}
            class="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary transition-colors disabled:opacity-50"
            disabled={!item.inStock}
          >
            <Icon icon="mdi:plus" class="w-4 h-4" />
          </button>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            on:click={() => onMoveToWishlist(item.id)}
            class="p-2 text-text-muted hover:text-primary transition-colors"
            title="Move to wishlist"
          >
            <Icon icon="mdi:heart-outline" class="w-5 h-5" />
          </button>
          <button
            type="button"
            on:click={() => onRemove(item.id)}
            class="p-2 text-text-muted hover:text-error transition-colors"
            title="Remove item"
          >
            <Icon icon="mdi:delete-outline" class="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <!-- Stock Status -->
      {#if !item.inStock}
        <p class="text-xs text-error mt-2 flex items-center gap-1">
          <Icon icon="mdi:alert-circle-outline" class="w-4 h-4" />
          Only {item.quantity} left in stock
        </p>
      {/if}
    </div>
  </div>
</Card>