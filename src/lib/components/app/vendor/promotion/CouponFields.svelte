<!-- src/lib/components/promotion/CouponFields.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Input from '$lib/components/common/Input.svelte';
  
  export let couponCode: string;
  export let usageLimit: string;
  export let minOrderValue: string;
  export let perCustomer: boolean;
  
  export let onCouponCodeChange: (value: string) => void;
  export let onUsageLimitChange: (value: string) => void;
  export let onMinOrderValueChange: (value: string) => void;
  export let onPerCustomerChange: (value: boolean) => void;
  
  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    onCouponCodeChange(code);
  };
</script>

<div class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-text-main mb-1.5">
      Coupon Code <span class="text-error">*</span>
    </label>
    <div class="flex gap-2">
      <input
        type="text"
        placeholder="e.g., TECH10"
        class="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body uppercase"
        bind:value={couponCode}
        on:input={(e) => onCouponCodeChange((e.target as HTMLInputElement).value.toUpperCase())}
        maxlength="20"
      />
      <button
        type="button"
        on:click={generateCode}
        class="px-4 py-3 rounded-xl border border-gray-300 text-text-muted hover:border-primary hover:text-primary transition-colors"
        title="Generate random code"
      >
        <Icon icon="mdi:refresh" class="w-5 h-5" />
      </button>
    </div>
    <p class="text-xs text-text-muted mt-1">Customers will enter this code at checkout</p>
  </div>
  
  <div class="grid md:grid-cols-2 gap-4">
    <Input
      label="Usage Limit (Optional)"
      name="usageLimit"
      type="number"
      value={usageLimit}
      placeholder="Unlimited"
      hint="Leave empty for unlimited uses"
      on:input={(e) => onUsageLimitChange((e.target as HTMLInputElement).value)}
    />
    <Input
      label="Minimum Order Value (₦)"
      name="minOrderValue"
      type="number"
      value={minOrderValue}
      placeholder="0"
      on:input={(e) => onMinOrderValueChange((e.target as HTMLInputElement).value)}
    />
  </div>
  
  <label class="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
    <input
      type="checkbox"
      class="w-4 h-4 text-primary rounded border-gray-300"
      bind:checked={perCustomer}
      on:change={(e) => onPerCustomerChange((e.target as HTMLInputElement).checked)}
    />
    <div>
      <p class="font-medium text-text-main">Limit to one use per customer</p>
      <p class="text-sm text-text-muted">Each customer can only use this coupon once</p>
    </div>
  </label>
</div>