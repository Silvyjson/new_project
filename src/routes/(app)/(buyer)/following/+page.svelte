<!-- src/routes/(app)/following/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  
  // Active tab
  let activeTab = 'shops';
  
  // Mock data
  const followedShops = [
    { id: 1, name: 'TechStoreNG', logo: '🏪', banner: 'bg-blue-100', vendor: 'Kicks NG', followers: 2340, trustScore: 94, verified: true },
    { id: 2, name: 'Amina Fashion', logo: '👗', banner: 'bg-pink-100', vendor: 'Amina Fashion', followers: 1890, trustScore: 92, verified: true },
    { id: 3, name: 'Home Essentials', logo: '🏠', banner: 'bg-green-100', vendor: 'Home Co', followers: 1200, trustScore: 89, verified: false },
    { id: 4, name: 'Beauty Hub', logo: '💄', banner: 'bg-purple-100', vendor: 'Beauty Co', followers: 3400, trustScore: 96, verified: true }
  ];
  
  const followedVendors = [
    { id: 1, name: 'Kicks NG', avatar: '👟', trustScore: 94, shops: 3, verified: true },
    { id: 2, name: 'Amina Fashion', avatar: '👗', trustScore: 92, shops: 2, verified: true },
    { id: 3, name: 'Tech Hub NG', avatar: '📱', trustScore: 89, shops: 1, verified: false }
  ];
  
  const handleUnfollow = (type: 'shop' | 'vendor', id: number) => {
    // In real app: API call to unfollow
    console.log(`Unfollow ${type} ${id}`);
  };
</script>

<svelte:head>
  <title>Following | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-text-main mb-8">Following</h1>
  
  <!-- Tabs -->
  <div class="flex items-center gap-2 mb-8">
    <button
      on:click={() => activeTab = 'shops'}
      class="px-6 py-3 rounded-xl text-body font-medium transition-colors
             {activeTab === 'shops' 
               ? 'bg-primary text-white' 
               : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
    >
      Shops ({followedShops.length})
    </button>
    <button
      on:click={() => activeTab = 'vendors'}
      class="px-6 py-3 rounded-xl text-body font-medium transition-colors
             {activeTab === 'vendors' 
               ? 'bg-primary text-white' 
               : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
    >
      Vendors ({followedVendors.length})
    </button>
  </div>
  
  <!-- Shops Tab -->
  {#if activeTab === 'shops'}
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each followedShops as shop, i}
        <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <Card hover={true} padding="none" className="overflow-hidden border border-gray-200">
            <div class="h-32 {shop.banner} relative">
              <div class="absolute -bottom-10 left-6">
                <div class="w-20 h-20 rounded-full bg-surface border-4 border-surface flex items-center justify-center text-4xl shadow-card">
                  {shop.logo}
                </div>
              </div>
              {#if shop.verified}
                <Badge variant="success" className="absolute top-4 right-4">Verified</Badge>
              {/if}
            </div>
            <div class="pt-12 pb-4 px-6">
              <h3 class="text-lg font-bold text-text-main mb-1">{shop.name}</h3>
              <p class="text-sm text-text-muted mb-3">by {shop.vendor}</p>
              
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-text-muted">
                  <span class="font-semibold text-text-main">{shop.followers.toLocaleString()}</span> followers
                </span>
                <span class="text-sm text-success font-medium">★ {shop.trustScore}%</span>
              </div>
              
              <div class="flex gap-2">
                <Button href="/shop/{shop.name.toLowerCase().replace(' ', '-')}" variant="primary" size="sm" className="flex-1">
                  Visit Shop
                </Button>
                <Button variant="outline" size="sm" onclick={() => handleUnfollow('shop', shop.id)}>
                  Unfollow
                </Button>
              </div>
            </div>
          </Card>
        </div>
      {/each}
    </div>
  {/if}
  
  <!-- Vendors Tab -->
  {#if activeTab === 'vendors'}
    <div class="space-y-4">
      {#each followedVendors as vendor, i}
        <div in:fly={{ y: 20, duration: 400, delay: i * 50, easing: cubicOut }}>
          <Card className="border border-gray-200 p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                  {vendor.avatar}
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="text-lg font-bold text-text-main">{vendor.name}</h3>
                    {#if vendor.verified}
                      <Badge variant="success" size="sm">Verified</Badge>
                    {/if}
                  </div>
                  <p class="text-sm text-text-muted">
                    {vendor.shops} {vendor.shops === 1 ? 'Shop' : 'Shops'} • ★ {vendor.trustScore}% Trust
                  </p>
                </div>
              </div>
              <div class="flex gap-2">
                <Button href="/vendor/{vendor.name.toLowerCase().replace(' ', '-')}" variant="outline" size="sm">
                  View Profile
                </Button>
                <Button variant="ghost" size="sm" className="text-error hover:bg-error/5" onclick={() => handleUnfollow('vendor', vendor.id)}>
                  Unfollow
                </Button>
              </div>
            </div>
          </Card>
        </div>
      {/each}
    </div>
  {/if}
</div>