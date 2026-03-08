<!-- src/lib/components/settings/PaymentMethods.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  export let cards: Array<{
    id: string;
    brand: 'visa' | 'mastercard' | 'amex';
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
  }>;
  
  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this card?')) {
      console.log(`Remove card ${id}`);
    }
  };
  
  const handleSetDefault = (id: string) => {
    console.log(`Set default card ${id}`);
  };
</script>

<Card className="border border-gray-200 p-6">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:credit-card-outline" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Payment Methods</h3>
        <p class="text-xs text-text-muted">Manage your saved payment options</p>
      </div>
    </div>
    <Button variant="primary" size="md">
      <Icon icon="mdi:credit-card-plus-outline" class="w-4 h-4 mr-2" />
      Add New Card
    </Button>
  </div>
  
  <div class="space-y-4">
    {#each cards as card}
      <Card className="border border-gray-200 p-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold uppercase">
              {card.brand}
            </div>
            <div>
              <p class="font-medium text-text-main">•••• •••• •••• {card.last4}</p>
              <p class="text-sm text-text-muted">Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            {#if card.isDefault}
              <Badge variant="success" size="sm">Default</Badge>
            {/if}
            <div class="flex gap-1">
              {#if !card.isDefault}
                <Button variant="ghost" size="sm" onclick={() => handleSetDefault(card.id)} title="Set as default">
                  <Icon icon="mdi:star-outline" class="w-4 h-4" />
                </Button>
              {/if}
              <Button variant="ghost" size="sm" class="text-error hover:bg-error/5" onclick={() => handleRemove(card.id)} title="Remove card">
                <Icon icon="mdi:delete-outline" class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    {/each}
    
    {#if cards.length === 0}
      <div class="text-center py-8">
        <Icon icon="mdi:credit-card-off-outline" class="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p class="text-text-muted">No payment methods saved</p>
        <Button variant="outline" size="sm" class="mt-4">
          <Icon icon="mdi:credit-card-plus-outline" class="w-4 h-4 mr-2" />
          Add Your First Card
        </Button>
      </div>
    {/if}
  </div>
</Card>