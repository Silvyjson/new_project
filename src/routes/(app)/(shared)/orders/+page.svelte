<!-- src/routes/(app)/orders/+page.svelte -->
<script lang="ts">
  import Card from "$lib/components/ui/Card.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";

  // Mock orders data
  let orders = [
    {
      id: "ORD-2026-001",
      date: new Date("2026-01-20"),
      status: "delivered",
      vendor: "TechStoreNG",
      items: [
        {
          name: "Wireless Earbuds",
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
          quantity: 1,
        },
      ],
      total: 25000,
    },
    {
      id: "ORD-2026-002",
      date: new Date("2026-01-18"),
      status: "shipped",
      vendor: "Amina Fashion",
      items: [
        {
          name: "Cotton Dress",
          image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
          quantity: 1,
        },
      ],
      total: 12000,
    },
    {
      id: "ORD-2026-003",
      date: new Date("2026-01-15"),
      status: "pending",
      vendor: "Home Essentials",
      items: [
        {
          name: "Kitchen Set",
          image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
          quantity: 1,
        },
      ],
      total: 18000,
    },
  ];

  // Active tab
  let activeTab = "all";

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
    { id: "returned", label: "Returned" },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { variant: "warning" as const, label: "Pending" },
      shipped: { variant: "info" as const, label: "Shipped" },
      delivered: { variant: "success" as const, label: "Delivered" },
      returned: { variant: "danger" as const, label: "Returned" },
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Filter orders by tab
  $: filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);
</script>

<svelte:head>
  <title>My Orders | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-text-main mb-8">My Orders</h1>

  <!-- Tabs -->
  <div class="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
    {#each tabs as tab}
      <button
        on:click={() => (activeTab = tab.id)}
        class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
               {activeTab === tab.id
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- Orders List -->
  {#if filteredOrders.length === 0}
    <Card className="py-16 text-center">
      <div class="text-6xl mb-4">📦</div>
      <h2 class="text-h2 text-text-main mb-2">No orders found</h2>
      <p class="text-body text-text-muted">
        Try selecting a different tab or start shopping.
      </p>
    </Card>
  {:else}
    <div class="space-y-4">
      {#each filteredOrders as order}
        {@const statusBadge = getStatusBadge(order.status)}
        <Card className="border border-gray-200 p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="font-semibold text-text-main">{order.id}</span>
                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
              </div>
              <p class="text-sm text-text-muted">
                {formatDate(order.date)} • {order.vendor}
              </p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold text-text-main">
                {formatNaira(order.total)}
              </div>
              <p class="text-xs text-text-muted">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <!-- Product Thumbnails -->
          <div class="flex gap-3 mb-4">
            {#each order.items as item}
              <img
                src={item.image}
                alt={item.name}
                class="w-16 h-16 rounded-lg object-cover bg-gray-100"
              />
            {/each}
          </div>

          <div class="flex items-center gap-3">
            <Button variant="outline" size="sm" href="/orders/{order.id}"
              >View Details</Button
            >
            {#if order.status === "delivered"}
              <Button
                variant="outline"
                size="sm"
                href="/shop/{order.vendor.toLowerCase().replace(' ', '-')}"
                >Reorder</Button
              >
            {/if}
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>
