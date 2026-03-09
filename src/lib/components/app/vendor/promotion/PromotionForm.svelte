<!-- src/lib/components/promotion/PromotionForm.svelte -->
<script lang="ts">
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import ProductSelector from './ProductSelector.svelte';
  import CouponFields from './CouponFields.svelte';
  
  export let promotion: {
    id?: string;
    title: string;
    description: string;
    type: 'product' | 'shop' | 'coupon';
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    couponCode?: string;
    productIds: string[];
    usageLimit?: number;
    minOrderValue?: number;
    perCustomer?: boolean;
    startDate: string;
    endDate: string;
  } = {};
  
  export let products: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    inStock: boolean;
  }>;
  
  export let onSave: ( any) => void;
  export let onCancel: () => void;
  
  // Form state
  let title = promotion?.title || '';
  let description = promotion?.description || '';
  let type: 'product' | 'shop' | 'coupon' = promotion?.type || 'product';
  let discountType: 'percentage' | 'fixed' = promotion?.discountType || 'percentage';
  let discountValue = promotion?.discountValue?.toString() || '';
  let couponCode = promotion?.couponCode || '';
  let productIds = promotion?.productIds || [];
  let usageLimit = promotion?.usageLimit?.toString() || '';
  let minOrderValue = promotion?.minOrderValue?.toString() || '';
  let perCustomer = promotion?.perCustomer || false;
  let startDate = promotion?.startDate || '';
  let endDate = promotion?.endDate || '';
  
  let loading = false;
  let error = '';
  
  const validate = () => {
    if (!title || title.length < 3) return 'Title must be at least 3 characters';
    if (!discountValue || parseFloat(discountValue) <= 0) return 'Discount value must be greater than 0';
    if (discountType === 'percentage' && parseFloat(discountValue) > 100) return 'Percentage cannot exceed 100%';
    if (type === 'product' && productIds.length === 0) return 'Select at least one product';
    if (type === 'coupon' && !couponCode) return 'Coupon code is required';
    if (!startDate || !endDate) return 'Start and end dates are required';
    if (new Date(endDate) < new Date(startDate)) return 'End date must be after start date';
    return null;
  };
  
  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      error = validationError;
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      const data = {
        title,
        description,
        type,
        discountType,
        discountValue: parseFloat(discountValue),
        couponCode: type === 'coupon' ? couponCode : undefined,
        productIds: type === 'product' ? productIds : undefined,
        usageLimit: usageLimit ? parseInt(usageLimit) : undefined,
        minOrderValue: minOrderValue ? parseFloat(minOrderValue) : undefined,
        perCustomer,
        startDate,
        endDate
      };
      
      onSave(data);
    } catch (err: any) {
      error = err.message || 'Failed to save promotion';
    } finally {
      loading = false;
    }
  };
  
  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      productIds = productIds.filter(id => id !== productId);
    } else {
      productIds = [...productIds, productId];
    }
  };
</script>

<div class="space-y-6">
  
  <!-- Section A: Promotion Details -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:tag-outline" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Promotion Details</h3>
        <p class="text-xs text-text-muted">Basic information about your promotion</p>
      </div>
    </div>
    
    <div class="space-y-4">
      <Input
        label="Promotion Title"
        name="title"
        value={title}
        placeholder="e.g., Black Friday Sale"
        required
        on:input={(e) => title = (e.target as HTMLInputElement).value}
      />
      <div>
        <label for="description" class="block text-sm font-medium text-text-main mb-1.5">Description</label>
        <textarea
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
          rows="3"
          placeholder="Describe your promotion..."
          bind:value={description}
        ></textarea>
      </div>
    </div>
  </Card>
  
  <!-- Section B: Promotion Type -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:tag-multiple-outline" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Promotion Type</h3>
        <p class="text-xs text-text-muted">Choose how this promotion applies</p>
      </div>
    </div>
    
    <div class="grid md:grid-cols-3 gap-4">
      <label for="description" class="flex flex-col items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                   {type === 'product' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
        <input type="radio" name="type" value="product" bind:group={type} class="w-4 h-4 text-primary" />
        <Icon icon="mdi:tag-outline" class="w-8 h-8 text-text-muted" />
        <span class="font-medium text-text-main">Product Discount</span>
        <span class="text-xs text-text-muted text-center">Apply to specific products</span>
      </label>
      <label for="description" class="flex flex-col items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                   {type === 'shop' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
        <input type="radio" name="type" value="shop" bind:group={type} class="w-4 h-4 text-primary" />
        <Icon icon="mdi:store-outline" class="w-8 h-8 text-text-muted" />
        <span class="font-medium text-text-main">Shop-wide</span>
        <span class="text-xs text-text-muted text-center">Apply to entire shop</span>
      </label>
      <label for="description" class="flex flex-col items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors
                   {type === 'coupon' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}">
        <input type="radio" name="type" value="coupon" bind:group={type} class="w-4 h-4 text-primary" />
        <Icon icon="mdi:ticket-percent-outline" class="w-8 h-8 text-text-muted" />
        <span class="font-medium text-text-main">Coupon Code</span>
        <span class="text-xs text-text-muted text-center">Customers enter code at checkout</span>
      </label>
    </div>
  </Card>
  
  <!-- Section C: Discount Settings -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:cash-multiple" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Discount Settings</h3>
        <p class="text-xs text-text-muted">Set your discount value</p>
      </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label for="description" class="block text-sm font-medium text-text-main mb-2">Discount Type</label>
        <div class="flex gap-3">
          <label for="description" class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="discountType" value="percentage" bind:group={discountType} class="w-4 h-4 text-primary" />
            <span class="text-body text-text-main flex items-center gap-1">
              <Icon icon="mdi:percent" class="w-4 h-4" />
              Percentage
            </span>
          </label>
          <label for="description" class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="discountType" value="fixed" bind:group={discountType} class="w-4 h-4 text-primary" />
            <span class="text-body text-text-main flex items-center gap-1">
              <Icon icon="mdi:cash" class="w-4 h-4" />
              Fixed Amount
            </span>
          </label>
        </div>
      </div>
      
      <Input
        label={discountType === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount (₦)'}
        name="discountValue"
        type="number"
        value={discountValue}
        placeholder={discountType === 'percentage' ? 'e.g., 20' : 'e.g., 2000'}
        required
        on:input={(e) => discountValue = (e.target as HTMLInputElement).value}
      />
    </div>
  </Card>
  
  <!-- Section D: Product Selector (Product Type Only) -->
  {#if type === 'product'}
    <ProductSelector
      products={products}
      selectedProductIds={productIds}
      onToggle={toggleProduct}
    />
  {/if}
  
  <!-- Section E: Coupon Fields (Coupon Type Only) -->
  {#if type === 'coupon'}
    <CouponFields
      couponCode={couponCode}
      usageLimit={usageLimit}
      minOrderValue={minOrderValue}
      perCustomer={perCustomer}
      onCouponCodeChange={(value) => couponCode = value}
      onUsageLimitChange={(value) => usageLimit = value}
      onMinOrderValueChange={(value) => minOrderValue = value}
      onPerCustomerChange={(value) => perCustomer = value}
    />
  {/if}
  
  <!-- Section F: Schedule -->
  <Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon icon="mdi:calendar-range" class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-text-main">Schedule</h3>
        <p class="text-xs text-text-muted">Set promotion start and end dates</p>
      </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label for="description" class="block text-sm font-medium text-text-main mb-1.5">Start Date</label>
        <input
          type="date"
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
          bind:value={startDate}
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-text-main mb-1.5">End Date</label>
        <input
          type="date"
          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
          bind:value={endDate}
        />
      </div>
    </div>
  </Card>
  
  <!-- Error Message -->
  {#if error}
    <div class="p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm">
      {error}
    </div>
  {/if}
  
  <!-- Submit Actions -->
  <div class="flex gap-3 pt-4 border-t border-gray-200">
    <Button type="button" variant="outline" size="lg" onclick={onCancel}>
      <Icon icon="mdi:close" class="w-5 h-5 mr-2" />
      Cancel
    </Button>
    <Button type="button" variant="primary" size="lg" onclick={handleSubmit} disabled={loading}>
      {loading ? 'Saving...' : (promotion?.id ? 'Update Promotion' : 'Create Promotion')}
    </Button>
  </div>
</div>