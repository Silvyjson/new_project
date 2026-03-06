<!-- src/lib/components/vendor/ProductForm.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    export let product:
        | {
              id?: string;
              code?: string;
              name: string;
              description: string;
              category: string;
              brand: string;
              price: number;
              discountPrice?: number | null;
              stock: number;
              sku: string;
              weight?: string;
              dimensions?: string;
              tags: string[];
              status: "active" | "draft";
          }
        | undefined = undefined;

    export let shopSlug: string;
    export let isEdit: boolean = false;

    // Form state
    let name = product?.name || "";
    let description = product?.description || "";
    let category = product?.category || "";
    let brand = product?.brand || "";
    let price = product?.price?.toString() || "";
    let discountPrice = product?.discountPrice?.toString() || "";
    let stock = product?.stock?.toString() || "0";
    let sku = product?.sku || "";
    let weight = product?.weight || "";
    let dimensions = product?.dimensions || "";
    let tags = product?.tags?.join(", ") || "";
    let status = product?.status || "draft";

    const categories = [
        "Electronics",
        "Fashion",
        "Beauty",
        "Home & Living",
        "Sports",
        "Kids & Baby",
        "Food & Drinks",
        "Services",
    ];

    const handleSubmit = (publishStatus: "draft" | "active") => {
        status = publishStatus;
        // In real app: validate and submit form
        console.log("Submitting product:", {
            name,
            description,
            category,
            brand,
            price,
            discountPrice,
            stock,
            sku,
            weight,
            dimensions,
            tags,
            status,
        });
    };
</script>

<div class="space-y-6">
    <!-- Basic Info -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
            <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon icon="mdi:cube-outline" class="w-5 h-5 text-primary" />
            </div>
            <div>
                <h3 class="font-semibold text-text-main">Basic Information</h3>
                <p class="text-xs text-text-muted">
                    Product name, description, and category
                </p>
            </div>
        </div>

        <div class="space-y-4">
            <Input
                label="Product Name"
                name="name"
                bind:value={name}
                placeholder="e.g., Wireless Earbuds Pro"
                required
            />

            <div>
                <label
                    class="block text-sm font-medium text-text-main mb-1.5"
                    for="description"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
                    rows="4"
                    placeholder="Describe your product..."
                    bind:value={description}
                    required
                ></textarea>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <label
                        class="block text-sm font-medium text-text-main mb-1.5"
                        for="category"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
                        bind:value={category}
                        required
                    >
                        <option value="">Select category</option>
                        {#each categories as cat}
                            <option value={cat}>{cat}</option>
                        {/each}
                    </select>
                </div>

                <Input
                    label="Brand"
                    name="brand"
                    bind:value={brand}
                    placeholder="e.g., Nike, Apple"
                />
            </div>
        </div>
    </Card>

    <!-- Pricing -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
            <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon icon="mdi:cash-multiple" class="w-5 h-5 text-primary" />
            </div>
            <div>
                <h3 class="font-semibold text-text-main">Pricing</h3>
                <p class="text-xs text-text-muted">
                    Set your product price and discounts
                </p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <Input
                label="Price (₦)"
                name="price"
                type="number"
                bind:value={price}
                placeholder="0"
                required
            />
            <Input
                label="Discount Price (Optional)"
                name="discountPrice"
                type="number"
                bind:value={discountPrice}
                placeholder="0"
            />
        </div>
    </Card>

    <!-- Inventory -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
            <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon icon="mdi:warehouse" class="w-5 h-5 text-primary" />
            </div>
            <div>
                <h3 class="font-semibold text-text-main">Inventory</h3>
                <p class="text-xs text-text-muted">Manage stock and SKU</p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <Input
                label="Stock Quantity"
                name="stock"
                type="number"
                bind:value={stock}
                placeholder="0"
                required
            />
            <Input
                label="SKU"
                name="sku"
                bind:value={sku}
                placeholder="e.g., NK-AIR-001"
            />
        </div>
    </Card>

    <!-- Shipping -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
            <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon
                    icon="mdi:truck-delivery-outline"
                    class="w-5 h-5 text-primary"
                />
            </div>
            <div>
                <h3 class="font-semibold text-text-main">Shipping</h3>
                <p class="text-xs text-text-muted">
                    Weight and dimensions for delivery
                </p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <Input
                label="Weight (kg)"
                name="weight"
                bind:value={weight}
                placeholder="e.g., 0.5"
            />
            <Input
                label="Dimensions (L×W×H cm)"
                name="dimensions"
                bind:value={dimensions}
                placeholder="e.g., 20×15×10"
            />
        </div>
    </Card>

    <!-- SEO -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
            <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon icon="mdi:magnify" class="w-5 h-5 text-primary" />
            </div>
            <div>
                <h3 class="font-semibold text-text-main">SEO & Discovery</h3>
                <p class="text-xs text-text-muted">
                    Help customers find your product
                </p>
            </div>
        </div>

        <Input
            label="Tags"
            name="tags"
            bind:value={tags}
            placeholder="wireless, earbuds, audio (comma separated)"
        />
    </Card>

    <!-- Submit Actions -->
    <div
        class="flex flex-wrap gap-3 sticky bottom-4 z-10 bg-surface/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-lg"
    >
        <Button variant="outline" size="lg" href="/my-shop/{shopSlug}/product">
            <Icon icon="mdi:close" class="w-5 h-5 mr-2" />
            Cancel
        </Button>
        <Button
            variant="outline"
            size="lg"
            onclick={() => handleSubmit("draft")}
        >
            <Icon icon="mdi:content-save-outline" class="w-5 h-5 mr-2" />
            Save Draft
        </Button>
        <Button
            variant="primary"
            size="lg"
            onclick={() => handleSubmit("active")}
        >
            <Icon icon="mdi:check-circle-outline" class="w-5 h-5 mr-2" />
            {isEdit ? "Update Product" : "Publish Product"}
        </Button>
    </div>
</div>
