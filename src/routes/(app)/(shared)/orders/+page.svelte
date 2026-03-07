<script lang="ts">
  import { page } from "$app/stores";
  import Card from "$lib/components/common/Card.svelte";
  import Button from "$lib/components/common/Button.svelte";
  import Badge from "$lib/components/common/Badge.svelte";
  import { formatNaira } from "$lib/utils/format";

  // 👇 injected from +layout.svelte
  export let role: "vendor" | "buyer" = "buyer";

  /* --------------------------------------------
   * Active Tab (Vendor reads from URL, Buyer local)
   * -------------------------------------------- */
  let activeTab = "all";

  $: if (role === "vendor" && $page.url.searchParams.has("status")) {
    activeTab = $page.url.searchParams.get("status") || "all";
  }

  /* --------------------------------------------
   * Tabs (Role Based)
   * -------------------------------------------- */
  const tabs =
    role === "vendor"
      ? [
          { id: "all", label: "All" },
          { id: "new", label: "New" },
          { id: "pending", label: "Pending" },
          { id: "shipped", label: "Shipped" },
          { id: "delivered", label: "Delivered" },
          { id: "cancelled", label: "Cancelled" },
          { id: "returned", label: "Returned" },
        ]
      : [
          { id: "all", label: "All" },
          { id: "pending", label: "Pending" },
          { id: "shipped", label: "Shipped" },
          { id: "delivered", label: "Delivered" },
          { id: "returned", label: "Returned" },
          { id: "cancelled", label: "Cancelled" },
        ];

  /* --------------------------------------------
   * Mock Data (Role Based Shape)
   * -------------------------------------------- */
  interface VendorOrder {
    id: string;
    customer: string;
    items: number;
    amount: number;
    status: string;
    date: string;
  }

  interface BuyerOrder {
    id: string;
    date: Date;
    status: string;
    vendor: string;
    items: Array<{ name: string; image: string; quantity: number }>;
    total: number;
  }

  let orders: VendorOrder[] | BuyerOrder[] =
    role === "vendor"
      ? [
          {
            id: "ORD-2026-001",
            customer: "John Doe",
            items: 2,
            amount: 25000,
            status: "new",
            date: "2026-01-25",
          },
          {
            id: "ORD-2026-002",
            customer: "Amina K.",
            items: 1,
            amount: 12000,
            status: "pending",
            date: "2026-01-24",
          },
          {
            id: "ORD-2026-003",
            customer: "Tunde M.",
            items: 3,
            amount: 45000,
            status: "shipped",
            date: "2026-01-23",
          },
        ] as VendorOrder[]
      : [
          {
            id: "ORD-2026-010",
            date: new Date("2026-01-20"),
            status: "delivered",
            vendor: "TechStoreNG",
            items: [
              {
                name: "Wireless Earbuds",
                image:
                  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
                quantity: 1,
              },
            ],
            total: 25000,
          },
          {
            id: "ORD-2026-011",
            date: new Date("2026-01-18"),
            status: "shipped",
            vendor: "Amina Fashion",
            items: [
              {
                name: "Cotton Dress",
                image:
                  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
                quantity: 1,
              },
            ],
            total: 12000,
          },
        ] as BuyerOrder[];

  /* --------------------------------------------
   * Helpers
   * -------------------------------------------- */
  const getStatusBadge = (status: string) => {
    const badges = {
      new: { variant: "info" as const, label: "New" },
      pending: { variant: "warning" as const, label: "Pending" },
      shipped: { variant: "info" as const, label: "Shipped" },
      delivered: { variant: "success" as const, label: "Delivered" },
      cancelled: { variant: "danger" as const, label: "Cancelled" },
      returned: { variant: "warning" as const, label: "Returned" },
    };

    return badges[status as keyof typeof badges];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  /* --------------------------------------------
   * Filtered Orders
   * -------------------------------------------- */
  $: filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);
</script>

<svelte:head>
  <title>{role === "vendor" ? "Orders" : "My Orders"} | VendorHub</title>
</svelte:head>

<div class="max-w-[1100px] mx-auto px-4 py-8">
  <!-- Page Title -->
  <h1 class="text-3xl font-bold text-text-main mb-8">
    {role === "vendor" ? "Orders" : "My Orders"}
  </h1>

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

  <!-- Empty State -->
  {#if filteredOrders.length === 0}
    <Card className="py-16 text-center">
      <div class="text-6xl mb-4">📦</div>
      <h2 class="text-xl font-semibold mb-2">No orders found</h2>
      <p class="text-text-muted">Try selecting a different tab.</p>
    </Card>
  {:else}
    <div class="space-y-4">
      {#each filteredOrders as order}
        {@const badge = getStatusBadge(order.status)}

        <Card className="border border-gray-200 p-6">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="font-semibold">{order.id}</span>
                <Badge variant={badge.variant}>{badge.label}</Badge>
              </div>

              <p class="text-sm text-text-muted">
                {#if role === "vendor"}
                  {(order as VendorOrder).date} • {(order as VendorOrder).customer}
                {:else}
                  {formatDate((order as BuyerOrder).date)} • {(order as BuyerOrder).vendor}
                {/if}
              </p>
            </div>

            <div class="text-right">
              <div class="text-lg font-bold">
                {role === "vendor"
                  ? formatNaira((order as VendorOrder).amount)
                  : formatNaira((order as BuyerOrder).total)}
              </div>

              <p class="text-xs text-text-muted">
                {role === "vendor"
                  ? `${(order as VendorOrder).items} items`
                  : `${(order as BuyerOrder).items.length} item${
                      (order as BuyerOrder).items.length > 1 ? "s" : ""
                    }`}
              </p>
            </div>
          </div>

          <!-- Buyer Thumbnails -->
          {#if role === "buyer"}
            <div class="flex gap-3 mb-4">
              {#each (order as BuyerOrder).items as item}
                <img
                  src={item.image}
                  alt={item.name}
                  class="w-16 h-16 rounded-lg object-cover bg-gray-100"
                />
              {/each}
            </div>
          {/if}

          <!-- Actions -->
          <div class="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">View Details</Button>

            {#if role === "vendor"}
              {#if order.status === "new" || order.status === "pending"}
                <Button variant="primary" size="sm">Mark as Shipped</Button>
              {/if}

              {#if order.status === "shipped"}
                <Button variant="primary" size="sm">Mark as Delivered</Button>
              {/if}
            {:else if order.status === "delivered"}
              <Button variant="outline" size="sm">Reorder</Button>
            {/if}
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>
