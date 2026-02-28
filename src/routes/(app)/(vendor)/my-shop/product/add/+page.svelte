<!-- src/routes/(vendor)/my-shop/product/add/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import FileUpload from "$lib/components/app/vendor/FileUpload.svelte";

    // Form state
    let selectedShop = "";
    let productName = "";
    let description = "";
    let category = "";
    let price = "";
    let discountPrice = "";
    let stock = "";
    let isPreorder = false;
    let preorderNote = "";
    let deliveryDuration = "";
    let returnAllowed = true;
    let images: File[] = [];
    let loading = false;
    let error = "";

    const shops = [
        { id: "1", name: "TechStoreNG" },
        { id: "2", name: "Fashion Hub" },
        { id: "3", name: "Home Essentials" },
    ];

    const categories = [
        "Electronics",
        "Fashion",
        "Beauty",
        "Home & Living",
        "Sports",
        "Kids & Baby",
        "Food & Drinks",
        "Services",
        "Other",
    ];

    const validate = () => {
        if (!selectedShop) return "Please select a shop";
        if (!productName || productName.length < 3)
            return "Product name must be at least 3 characters";
        if (!description || description.length < 10)
            return "Description must be at least 10 characters";
        if (!category) return "Please select a category";
        if (!price || parseFloat(price) <= 0)
            return "Price must be greater than 0";
        if (!stock || parseInt(stock) < 0) return "Stock must be 0 or greater";
        if (images.length === 0)
            return "Please upload at least one product image";
        return null;
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        error = "";

        const validationError = validate();
        if (validationError) {
            error = validationError;
            return;
        }

        loading = true;

        try {
            // In real app: API call to create product
            const formData = new FormData();
            formData.append("shopId", selectedShop);
            formData.append("name", productName);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("discountPrice", discountPrice || "0");
            formData.append("stock", stock);
            formData.append("isPreorder", isPreorder.toString());
            if (isPreorder) formData.append("preorderNote", preorderNote);
            formData.append("deliveryDuration", deliveryDuration);
            formData.append("returnAllowed", returnAllowed.toString());
            images.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });

            const response = await fetch("/api/vendor/products", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to create product");
            }

            goto("/my-shop/product");
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };

    const handleImageUpload = (files: File[]) => {
        images = [...images, ...files];
    };

    const removeImage = (index: number) => {
        images = images.filter((_, i) => i !== index);
    };
</script>

<svelte:head>
    <title>Add Product | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8">
    <div class="mb-6">
        <a
            href="/my-shop/product"
            class="text-sm text-primary font-medium hover:underline flex items-center gap-2"
        >
            <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            Back to Products
        </a>
    </div>

    <div class="mb-8">
        <h1 class="text-3xl font-bold text-text-main mb-2">Add New Product</h1>
        <p class="text-body text-text-muted">
            Create a new product listing for your shop.
        </p>
    </div>

    <form on:submit={handleSubmit} class="space-y-8">
        <!-- Section 1: Product Info -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">
                Product Information
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <label
                        class="block text-sm font-medium text-text-main mb-1.5"
                    >
                        Shop <span class="text-error">*</span>
                    </label>
                    <select
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
                        bind:value={selectedShop}
                        required
                    >
                        <option value="">Select shop</option>
                        {#each shops as shop}
                            <option value={shop.id}>{shop.name}</option>
                        {/each}
                    </select>
                </div>
                <Input
                    label="Product Name"
                    name="productName"
                    placeholder="e.g., Wireless Earbuds Pro"
                    value={productName}
                    required
                />
                <div>
                    <label
                        class="block text-sm font-medium text-text-main mb-1.5"
                    >
                        Category <span class="text-error">*</span>
                    </label>
                    <select
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
                <div class="md:col-span-2">
                    <label
                        class="block text-sm font-medium text-text-main mb-1.5"
                    >
                        Description <span class="text-error">*</span>
                    </label>
                    <textarea
                        placeholder="Describe your product..."
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
                        rows="4"
                        bind:value={description}
                        required
                    ></textarea>
                </div>
            </div>
        </Card>

        <!-- Section 2: Pricing -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">Pricing</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <Input
                    label="Price (₦)"
                    name="price"
                    type="number"
                    placeholder="0"
                    value={price}
                    required
                />
                <Input
                    label="Discount Price (Optional)"
                    name="discountPrice"
                    type="number"
                    placeholder="0"
                    value={discountPrice}
                    hint="Leave empty if no discount"
                />
            </div>
        </Card>

        <!-- Section 3: Inventory -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">Inventory</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <Input
                    label="Stock Quantity"
                    name="stock"
                    type="number"
                    placeholder="0"
                    value={stock}
                    required
                />
                <div class="flex items-center gap-3 pt-6">
                    <input
                        type="checkbox"
                        id="preorder"
                        class="w-5 h-5 text-primary rounded border-gray-300"
                        bind:checked={isPreorder}
                    />
                    <label for="preorder" class="text-body text-text-main"
                        >This is a pre-order item</label
                    >
                </div>
                {#if isPreorder}
                    <div class="md:col-span-2">
                        <Input
                            label="Pre-order Note"
                            name="preorderNote"
                            placeholder="e.g., Expected delivery: 14-21 days"
                            value={preorderNote}
                        />
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Section 4: Media -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">
                Product Images
            </h2>
            <FileUpload
                label="Upload Images"
                accept="image/*"
                multiple={true}
                hint="Upload up to 10 images (PNG, JPG up to 5MB each)"
                on:upload={(e) => handleImageUpload(e.detail.files)}
            />
            {#if images.length > 0}
                <div class="grid grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                    {#each images as image, i}
                        <div class="relative group">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Product image"
                                class="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                on:click={() => removeImage(i)}
                                class="absolute top-1 right-1 w-6 h-6 rounded-full bg-error text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                ×
                            </button>
                        </div>
                    {/each}
                </div>
            {/if}
        </Card>

        <!-- Section 5: Shipping -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">
                Shipping & Returns
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
                <Input
                    label="Delivery Duration"
                    name="deliveryDuration"
                    placeholder="e.g., 2-5 business days"
                    value={deliveryDuration}
                />
                <div class="flex items-center gap-3 pt-6">
                    <input
                        type="checkbox"
                        id="returnAllowed"
                        class="w-5 h-5 text-primary rounded border-gray-300"
                        bind:checked={returnAllowed}
                    />
                    <label for="returnAllowed" class="text-body text-text-main"
                        >Returns allowed</label
                    >
                </div>
            </div>
        </Card>

        <!-- Error Message -->
        {#if error}
            <div
                class="p-4 bg-error/10 border border-error/30 rounded-xl text-error text-sm"
            >
                {error}
            </div>
        {/if}

        <!-- Submit -->
        <div class="flex gap-3">
            <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
            >
                {loading ? "Creating Product..." : "Publish Product"}
            </Button>
            <Button
                type="button"
                variant="outline"
                size="lg"
                href="/my-shop/product"
            >
                Save as Draft
            </Button>
        </div>
    </form>
</div>
