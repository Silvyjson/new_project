<!-- src/lib/components/vendor/ProductGrid.svelte -->

<script lang="ts">
  import Icon from "@iconify/svelte";
  import Card from "$lib/components/common/Card.svelte";
  import Button from "$lib/components/common/Button.svelte";
  import Badge from "$lib/components/common/Badge.svelte";
  import { formatNaira, formatDate } from "$lib/utils/format";

  export let products :Array<{
    id: string;
    code: string;
    name: string;
    image: string;
    price: number;
    discountPrice?: number | null;
    stock: number;
    orders: number;
    status?: "active" | "draft" | "out-of-stock" | "low-stock";
    category: string;
    lowStockThreshold: number;
    lastUpdated: string;
  }>;

  export let shopSlug: string;

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) {
      return {
        variant: "danger" as const,
        label: "Out of Stock",
        border: "border-red-300",
        color: "text-red-600"
      };
    }

    if (stock <= threshold) {
      return {
        variant: "warning" as const,
        label: "Low Stock",
        border: "border-yellow-300",
        color: "text-yellow-600"
      };
    }

    return {
      variant: "success" as const,
      label: "In Stock",
      border: "border-green-300",
      color: "text-green-600"
    };
  };
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {#each products as product}

    {@const status = getStockStatus(product.stock, product.lowStockThreshold)}

    <Card
      padding="none"
      className={`border rounded-xl overflow-hidden bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${status.border}`}
    >

      <!-- Image -->
      <div class="h-40 bg-gray-100 relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <!-- Stock Status -->
        <div class="absolute top-3 left-3">
          <Badge variant={status.variant} size="sm">
            {status.label}
          </Badge>
        </div>

        <!-- Quick View -->
        <a
          href={`/shop/${shopSlug}/product/${product.code}`}
          class="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
        >
          <Icon icon="mdi:eye-outline" class="w-4 h-4 text-gray-700"/>
        </a>

      </div>

      <!-- Content -->
      <div class="p-4 flex flex-col gap-1">

        <!-- Product Name -->
        <h3 class="font-semibold text-lg text-text-main line-clamp-1">
          {product.name}
        </h3>

        <!-- Price -->
        <div class="flex items-center gap-2">

          {#if product.discountPrice}

            <span class="text-lg font-bold text-primary">
              {formatNaira(product.discountPrice)}
            </span>

            <span class="text-sm text-gray-400 line-through">
              {formatNaira(product.price)}
            </span>

          {:else}

            <span class="text-lg font-bold text-text-main">
              {formatNaira(product.price)}
            </span>

          {/if}

        </div>

        <!-- Metadata -->
        <div class="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 space-y-2">

          <div class="flex justify-between items-center">
            <span class="flex items-center gap-1">
              <Icon icon="mdi:cube-outline" class="w-4 h-4"/>
              Stock
            </span>

            <span class={`font-semibold ${status.color}`}>
              {product.stock}
            </span>
          </div>

          <div class="flex justify-between items-center">
            <span class="flex items-center gap-1">
              <Icon icon="mdi:cart-outline" class="w-4 h-4"/>
              Orders
            </span>

            <span>{product.orders}</span>
          </div>

          <div class="flex justify-between">
            <span>SKU</span>
            <span class="font-mono text-text-main">
              {product.code}
            </span>
          </div>

          <div class="flex justify-between">
            <span>Category</span>
            <span class="text-text-main">
              {product.category}
            </span>
          </div>

          <div class="flex justify-between">
            <span>Updated</span>
            <span class="text-text-main">
              {formatDate(product.lastUpdated)}
            </span>
          </div>

        </div>

        <!-- Actions -->
        <div class="flex gap-2 pt-2">

          <Button
            href={`/my-shop/${shopSlug}/product/${product.code}/edit`}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:pencil-outline" class="w-4 h-4 mr-1"/>
            Edit
          </Button>

          <!-- <Button
            href={`/shop/${shopSlug}/product/${product.code}`}
            variant="ghost"
            size="sm"
            target="_blank"
          >
            <Icon icon="mdi:open-in-new" class="w-4 h-4"/>
          </Button> -->

          <Button
            href={`/my-shop/${shopSlug}/product/${product.code}`}
            variant="primary"
            size="sm"
          >
            <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-1"/>
            View
          </Button>

        </div>

      </div>

    </Card>

  {/each}
</div>