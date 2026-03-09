<!-- src/lib/components/cart/PaymentSelector.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let paymentMethods: Array<{
    id: string;
    type: 'card' | 'wallet' | 'transfer';
    label: string;
    details: string;
    isDefault: boolean;
    balance?: number;
  }>;
  
  export let selectedMethod: string;
  export let onSelect: (id: string) => void;
  export let onAddCard: () => void;
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-lg font-bold text-text-main">Payment Method</h3>
    <Button variant="ghost" size="sm" onclick={onAddCard}>
      <Icon icon="mdi:credit-card-plus-outline" class="w-4 h-4 mr-1" />
      Add Card
    </Button>
  </div>
  
  <div class="space-y-3">
    {#each paymentMethods as method}
      <label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                   {selectedMethod === method.id 
                     ? 'border-primary bg-primary/5' 
                     : 'border-gray-200 hover:border-gray-300'}">
        <input
          type="radio"
          name="payment"
          value={method.id}
          bind:group={selectedMethod}
          on:change={() => onSelect(method.id)}
          class="w-4 h-4 text-primary"
        />
        <div class="flex items-center gap-3 flex-1">
          <div class="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-xs font-bold uppercase">
            {method.type === 'card' ? 'CARD' : method.type === 'wallet' ? 'WALLET' : 'BANK'}
          </div>
          <div class="flex-1">
            <p class="font-medium text-text-main">{method.label}</p>
            <p class="text-sm text-text-muted">{method.details}</p>
            {#if method.balance !== undefined}
              <p class="text-sm text-success font-medium">Balance: {formatNaira(method.balance)}</p>
            {/if}
          </div>
          {#if method.isDefault}
            <Badge variant="success" size="sm">Default</Badge>
          {/if}
        </div>
      </label>
    {/each}
  </div>
</Card>