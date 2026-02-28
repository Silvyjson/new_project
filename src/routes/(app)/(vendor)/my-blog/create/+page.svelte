<!-- src/routes/(vendor)/my-blog/create/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import FileUpload from "$lib/components/app/vendor/FileUpload.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";

    // Form state
    let title = "";
    let selectedShop = "";
    let coverImage: File | null = null;
    let content = "";
    let linkedProducts: string[] = [];
    let tags = "";
    let loading = false;
    let error = "";

    const shops = [
        { id: "1", name: "TechStoreNG" },
        { id: "2", name: "Fashion Hub" },
        { id: "3", name: "Home Essentials" },
    ];

    const products = [
        { id: "p_001", name: "Wireless Earbuds Pro", shop: "TechStoreNG" },
        { id: "p_002", name: "USB-C Cable 2m", shop: "TechStoreNG" },
        { id: "p_003", name: "Organic Cotton Dress", shop: "Fashion Hub" },
    ];

    const validate = () => {
        if (!title || title.length < 5)
            return "Title must be at least 5 characters";
        if (!content || content.length < 50)
            return "Content must be at least 50 characters";
        return null;
    };

    const handleSubmit = async (e: Event, status: "draft" | "published") => {
        e.preventDefault();
        error = "";

        const validationError = validate();
        if (validationError) {
            error = validationError;
            return;
        }

        loading = true;

        try {
            // In real app: API call to create blog post
            const response = await fetch("/api/vendor/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    shopId: selectedShop,
                    content,
                    linkedProducts,
                    tags: tags.split(",").map((t) => t.trim()),
                    status,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to create post");
            }

            goto("/my-blog");
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };

    const toggleProduct = (productId: string) => {
        if (linkedProducts.includes(productId)) {
            linkedProducts = linkedProducts.filter((id) => id !== productId);
        } else {
            linkedProducts = [...linkedProducts, productId];
        }
    };
</script>

<svelte:head>
    <title>Create Blog Post | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8">
    <div class="mb-6">
        <a
            href="/my-blog"
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
            Back to Blog
        </a>
    </div>

    <div class="mb-8">
        <h1 class="text-3xl font-bold text-text-main mb-2">Create Blog Post</h1>
        <p class="text-body text-text-muted">
            Share updates, tips, and product launches with your customers.
        </p>
    </div>

    <form class="space-y-8">
        <!-- Title & Shop -->
        <Card className="border border-gray-200 p-6">
            <div class="grid md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                    <Input
                        label="Post Title"
                        name="title"
                        placeholder="Enter an engaging title..."
                        value={title}
                        required
                    />
                </div>
                <div>
                    <label
                        class="block text-sm font-medium text-text-main mb-1.5"
                    >
                        Shop
                    </label>
                    <select
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body"
                        bind:value={selectedShop}
                    >
                        <option value="">Select shop (optional)</option>
                        {#each shops as shop}
                            <option value={shop.id}>{shop.name}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </Card>

        <!-- Cover Image -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">Cover Image</h2>
            <FileUpload
                label="Upload Cover Image"
                accept="image/*"
                hint="Recommended: 1200x630px PNG or JPG"
                on:upload={(e) => (coverImage = e.detail.file)}
            />
        </Card>

        <!-- Content -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">Content</h2>
            <div class="border border-gray-200 rounded-xl overflow-hidden">
                <!-- Toolbar -->
                <div
                    class="flex items-center gap-2 p-3 border-b border-gray-200 bg-gray-50"
                >
                    <button
                        type="button"
                        class="p-2 hover:bg-gray-200 rounded"
                        title="Bold"><strong>B</strong></button
                    >
                    <button
                        type="button"
                        class="p-2 hover:bg-gray-200 rounded"
                        title="Italic"><em>I</em></button
                    >
                    <button
                        type="button"
                        class="p-2 hover:bg-gray-200 rounded"
                        title="Heading">H2</button
                    >
                    <button
                        type="button"
                        class="p-2 hover:bg-gray-200 rounded"
                        title="Bullet List">•</button
                    >
                    <button
                        type="button"
                        class="p-2 hover:bg-gray-200 rounded"
                        title="Link">🔗</button
                    >
                </div>
                <textarea
                    placeholder="Write your blog post content..."
                    class="w-full min-h-[400px] p-4 outline-none resize-none text-body"
                    bind:value={content}
                    required
                ></textarea>
            </div>
        </Card>

        <!-- Link Products -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">Link Products</h2>
            <p class="text-small text-text-muted mb-4">
                Select products mentioned in this post to drive conversions.
            </p>
            <div class="space-y-3">
                {#each products as product}
                    <label
                        class="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary cursor-pointer transition-colors"
                    >
                        <input
                            type="checkbox"
                            class="w-4 h-4 text-primary rounded"
                            on:change={() => toggleProduct(product.id)}
                        />
                        <div class="flex-1">
                            <p class="font-medium text-text-main">
                                {product.name}
                            </p>
                            <p class="text-small text-text-muted">
                                {product.shop}
                            </p>
                        </div>
                        {#if linkedProducts.includes(product.id)}
                            <Badge variant="success">Linked</Badge>
                        {/if}
                    </label>
                {/each}
            </div>
        </Card>

        <!-- Tags -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">Tags</h2>
            <Input
                label="Tags"
                name="tags"
                placeholder="tech, gadgets, pre-order (comma separated)"
                value={tags}
                hint="Separate tags with commas"
            />
        </Card>

        <!-- Error -->
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
                type="button"
                variant="primary"
                size="lg"
                onclick={(e) => handleSubmit(e, "published")}
                disabled={loading}
            >
                {loading ? "Publishing..." : "Publish"}
            </Button>
            <Button
                type="button"
                variant="outline"
                size="lg"
                onclick={(e) => handleSubmit(e, "draft")}
                disabled={loading}
            >
                Save Draft
            </Button>
        </div>
    </form>
</div>
