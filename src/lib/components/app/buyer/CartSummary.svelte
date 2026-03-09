<!-- src/lib/components/cart/CartSummary.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Input from '$lib/components/common/Input.svelte';
  
  export let subtotal: number;
  export let shipping: number;
  export let serviceFee: number;
  export let discount: number;
  export let total: number;
  export let shopName: string = "";
  export let onCheckout: () => void;
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  let couponCode = '';
  let applyingCoupon = false;
  
  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    applyingCoupon = true;
    // In real app: API call to validate coupon
    await new Promise(resolve => setTimeout(resolve, 1000));
    applyingCoupon = false;
    alert('Coupon applied!');
  };
</script>

<Card className="border border-gray-200 p-6 sticky top-24">
  <h3 class="text-lg font-bold text-text-main mb-6">Order Summary</h3>
  
  <!-- Shop Indicator -->
  {#if shopName}
    <div class="flex items-center gap-2 p-3 bg-primary/5 rounded-xl mb-4">
      <Icon icon="mdi:store-outline" class="w-5 h-5 text-primary" />
      <span class="text-sm text-text-main">Ordering from <strong>{shopName}</strong></span>
    </div>
  {/if}
  
  <!-- Coupon Code -->
  <div class="mb-6">
    <label class="block text-sm font-medium text-text-main mb-2">
      <Icon icon="mdi:tag-outline" class="w-4 h-4 inline mr-1" />
      Apply Coupon
    </label>
    <div class="flex gap-2">
      <Input
        label=""
        name="coupon"
        placeholder="Enter code"
        value={couponCode}
        class="flex-1"
      />
      <Button variant="outline" size="md" onclick={applyCoupon} disabled={applyingCoupon}>
        {applyingCoupon ? 'Applying...' : 'Apply'}
      </Button>
    </div>
  </div>
  
  <!-- Price Breakdown -->
  <div class="space-y-3 mb-6">
    <div class="flex items-center justify-between text-body">
      <span class="text-text-muted">Subtotal</span>
      <span class="text-text-main">{formatNaira(subtotal)}</span>
    </div>
    <div class="flex items-center justify-between text-body">
      <span class="text-text-muted">Shipping</span>
      <span class="text-text-main">{formatNaira(shipping)}</span>
    </div>
    <div class="flex items-center justify-between text-body">
      <span class="text-text-muted">Service Fee</span>
      <span class="text-text-main">{formatNaira(serviceFee)}</span>
    </div>
    {#if discount > 0}
      <div class="flex items-center justify-between text-body">
        <span class="text-success">Discount</span>
        <span class="text-success">-{formatNaira(discount)}</span>
      </div>
    {/if}
  </div>
  
  <!-- Total -->
  <div class="flex items-center justify-between pt-4 border-t border-gray-200 mb-6">
    <span class="text-lg font-bold text-text-main">Total</span>
    <span class="text-2xl font-bold text-primary">{formatNaira(total)}</span>
  </div>
  
  <!-- Checkout Button -->
  <Button variant="primary" size="lg" class="w-full mb-3" onclick={onCheckout}>
    <Icon icon="mdi:lock-outline" class="w-5 h-5 mr-2" />
    Proceed to Checkout
  </Button>
  
  <!-- Security Badge -->
  <div class="flex items-center justify-center gap-2 text-xs text-text-muted">
    <Icon icon="mdi:shield-check-outline" class="w-4 h-4 text-success" />
    <span>Secure checkout • Escrow protected</span>
  </div>
</Card>