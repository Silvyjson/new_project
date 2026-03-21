<!-- src/routes/(vendor)/my-shop/[slug]/product/[code]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Card from '$lib/components/common/Card.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  let productCode = '';
  let shopSlug = '';
  $: if ($page.params.code && $page.params.slug) {
    productCode = $page.params.code;
    shopSlug = $page.params.slug;
  }
  
  // Mock product data (in real app: fetch from API)
  let product = {
    id: 'p_001',
    code: productCode,
    name: 'Wireless Headphones Pro',
    description: 'Premium wireless headphones with active noise cancellation.',
    category: 'Electronics',
    price: 24000,
    oldPrice: 30000,
    stock: 45,
    lowStockThreshold: 10,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
    status: 'active' as const,
    createdAt: '2025-06-15',
    updatedAt: '2026-01-20'
  };
  
  // Simple performance metrics
  let metrics = {
    views: 1204,
    orders: 89,
    revenue: 2136000,
    rating: 4.8,
    reviews: 67
  };
  
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };
  
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  
  const getStockStatus = () => {
    if (product.stock === 0) return { variant: 'danger' as const, label: 'Out of Stock', color: 'text-error' };
    if (product.stock <= product.lowStockThreshold) return { variant: 'warning' as const, label: 'Low Stock', color: 'text-warning' };
    return { variant: 'success' as const, label: 'In Stock', color: 'text-success' };
  };
  
  // Stock adjustment
  let adjustingStock = false;
  const handleAdjustStock = async (change: number) => {
    adjustingStock = true;
    // In real app: API call
    product = { ...product, stock: Math.max(0, product.stock + change) };
    adjustingStock = false;
  };
  
  // Actions
  const handleEdit = () => {
    goto(`/my-shop/${shopSlug}/product/${productCode}/edit`);
  };
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      goto(`/my-shop/${shopSlug}/products`);
    }
  };
  
  const handleViewPublic = () => {
    window.open(`/shop/${shopSlug}/product/${productCode}`, '_blank');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/shop/${shopSlug}/product/${productCode}`);
    alert('Product link copied!');
  };

  const stockStatus = getStockStatus();
</script>

<svelte:head>
  <title>{product.name} | VendorHub</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8 space-y-6">
  
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="md" href={`/my-shop/${shopSlug}/product`}>
        <Icon icon="mdi:arrow-left" class="w-5 h-5" />
      </Button>
      <div>
        <h1 class="text-2xl font-bold text-text-main">{product.name}</h1>
        <p class="text-sm text-text-muted font-mono">{product.code}</p>
      </div>
    </div>
    
    <div class="flex gap-2">
      <Button variant="outline" size="md" onclick={handleViewPublic}>
        <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-2" />
        View
      </Button>
      <Button variant="primary" size="md" onclick={handleEdit}>
        <Icon icon="mdi:pencil-outline" class="w-4 h-4 mr-2" />
        Edit
      </Button>
    </div>
  </div>
  
  <!-- Main Content Grid -->
  <div class="grid md:grid-cols-2 gap-6">
    
    <!-- Left: Product Image & Info -->
    <div class="space-y-4">
      <!-- Image -->
      <div class="lg:col-span-1">
            <Card className="border border-gray-200 p-6">
                <div
                    class="h-100 bg-gray-100 rounded-xl overflow-hidden mb-4"
                >
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        class="w-full h-full object-cover"
                    />
                </div>
                <div class="grid grid-cols-4 gap-2">
                    {#each product.images as image, i}
                        <img
                            src={image}
                            alt=""
                            class="w-full h-30 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                    {/each}
                </div>
            </Card>
        </div>
      
      <!-- Basic Info -->
      <Card className="border border-gray-200 p-5">
        <h3 class="font-semibold text-text-main mb-4">Product Details</h3>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-text-muted">Category</span>
            <span class="text-text-main">{product.category}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-text-muted">Status</span>
            <Badge variant={product.status === 'active' ? 'success' : 'warning'} size="sm">
              {product.status}
            </Badge>
          </div>
          <div class="flex justify-between">
            <span class="text-text-muted">Created</span>
            <span class="text-text-main">{formatDate(product.createdAt)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-text-muted">Updated</span>
            <span class="text-text-main">{formatDate(product.updatedAt)}</span>
          </div>
        </div>
      </Card>
    </div>
    
    <!-- Right: Pricing, Stock & Metrics -->
    <div class="space-y-4">
      
      <!-- Pricing -->
      <Card className="border border-gray-200 p-5">
        <h3 class="font-semibold text-text-main mb-4">Pricing</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-text-muted">Current Price</span>
            <span class="text-2xl font-bold text-primary">{formatNaira(product.price)}</span>
          </div>
          {#if product.oldPrice}
            <div class="flex items-center justify-between">
              <span class="text-text-muted">Original Price</span>
              <span class="text-text-muted line-through">{formatNaira(product.oldPrice)}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-text-muted">Discount</span>
              <span class="text-error font-semibold">-{discount}%</span>
            </div>
          {/if}
        </div>
      </Card>
      
      <!-- Stock -->
      <Card className="border border-gray-200 p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-text-main">Stock Level</h3>
          <span class="text-sm font-medium {stockStatus.color}">{stockStatus.label}</span>
        </div>
        
        <div class="flex items-center justify-between mb-4">
          <span class="text-3xl font-bold text-text-main">{product.stock}</span>
          <span class="text-sm text-text-muted">units</span>
        </div>
        
        <!-- Quick Stock Adjustment -->
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onclick={() => handleAdjustStock(-1)}
            disabled={adjustingStock || product.stock <= 0}
          >
            <Icon icon="mdi:minus" class="w-4 h-4" />
          </Button>
          <span class="flex-1 text-center text-body">{product.stock} units</span>
          <Button
            variant="outline"
            size="sm"
            onclick={() => handleAdjustStock(1)}
            disabled={adjustingStock}
          >
            <Icon icon="mdi:plus" class="w-4 h-4" />
          </Button>
        </div>
        
        <p class="text-xs text-text-muted mt-3">
          Low stock threshold: {product.lowStockThreshold} units
        </p>
      </Card>
      
      <!-- Quick Metrics -->
      <Card className="border border-gray-200 p-5">
        <h3 class="font-semibold text-text-main mb-4">Performance</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <Icon icon="mdi:eye-outline" class="w-6 h-6 text-text-muted mx-auto mb-1" />
            <p class="text-lg font-bold text-text-main">{metrics.views}</p>
            <p class="text-xs text-text-muted">Views</p>
          </div>
          <div class="text-center">
            <Icon icon="mdi:cart-outline" class="w-6 h-6 text-text-muted mx-auto mb-1" />
            <p class="text-lg font-bold text-text-main">{metrics.orders}</p>
            <p class="text-xs text-text-muted">Orders</p>
          </div>
          <div class="text-center">
            <Icon icon="mdi:currency-ngn" class="w-6 h-6 text-text-muted mx-auto mb-1" />
            <p class="text-lg font-bold text-text-main">{formatNaira(metrics.revenue)}</p>
            <p class="text-xs text-text-muted">Revenue</p>
          </div>
        </div>
      </Card>
      
      <!-- Quick Actions -->
      <Card className="border border-gray-200 p-5">
        <h3 class="font-semibold text-text-main mb-4">Actions</h3>
        <div class="space-y-2">
          <Button variant="outline" size="sm" class="w-full" onclick={handleCopyLink}>
            <Icon icon="mdi:link-variant" class="w-4 h-4 mr-2" />
            Copy Product Link
          </Button>
          <Button variant="ghost" size="sm" class="w-full text-error hover:bg-error/5" onclick={handleDelete}>
            <Icon icon="mdi:delete-outline" class="w-4 h-4 mr-2" />
            Delete Product
          </Button>
        </div>
      </Card>
    </div>
  </div>
</main>