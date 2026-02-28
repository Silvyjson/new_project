<!-- src/routes/(vendor)/my-shop/create/+page.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import FileUpload from "$lib/components/app/vendor/FileUpload.svelte";

    // Form state
    let shopName = "";
    let description = "";
    let category = "";
    let logo: File | null = null;
    let banner: File | null = null;
    let phone = "";
    let whatsapp = "";
    let instagram = "";
    let loading = false;
    let error = "";

    const categories = [
        "Fashion",
        "Electronics",
        "Beauty",
        "Home & Living",
        "Sports",
        "Kids & Baby",
        "Food & Drinks",
        "Services",
        "Other",
    ];

    const validate = () => {
        if (!shopName || shopName.length < 3)
            return "Shop name must be at least 3 characters";
        if (!description || description.length < 10)
            return "Description must be at least 10 characters";
        if (!category) return "Please select a category";
        if (!logo) return "Please upload a shop logo";
        if (!banner) return "Please upload a shop banner";
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
            // In real app: API call to create shop
            const formData = new FormData();
            formData.append("name", shopName);
            formData.append("description", description);
            formData.append("category", category);
            if (logo) formData.append("logo", logo);
            if (banner) formData.append("banner", banner);
            formData.append("phone", phone);
            formData.append("whatsapp", whatsapp);
            formData.append("instagram", instagram);

            const response = await fetch("/api/vendor/shops", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to create shop");
            }

            // Redirect to shops list
            goto("/my-shop");
        } catch (err: any) {
            error = err.message || "An error occurred. Please try again.";
        } finally {
            loading = false;
        }
    };

    const handleFileUpload = (file: File, type: "logo" | "banner") => {
        if (type === "logo") logo = file;
        if (type === "banner") banner = file;
    };
</script>

<svelte:head>
    <title>Create Shop | VendorHub</title>
</svelte:head>

<div class="max-w-[1000px] mx-auto px-4 py-8">
    <div class="mb-6">
        <a
            href="/my-shop"
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
            Back to My Shops
        </a>
    </div>

    <div class="mb-8">
        <h1 class="text-3xl font-bold text-text-main mb-2">Create New Shop</h1>
        <p class="text-body text-text-muted">
            Set up your new shop and start selling.
        </p>
    </div>

    <form on:submit={handleSubmit} class="space-y-8">
        <!-- Section 1: Basic Info -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">
                Basic Information
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
                <Input
                    label="Shop Name"
                    name="shopName"
                    placeholder="e.g., TechStore NG"
                    value={shopName}
                    required
                    hint="Choose a memorable name for your shop"
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
                        placeholder="Describe what you sell..."
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none"
                        rows="4"
                        bind:value={description}
                        required
                    ></textarea>
                </div>
            </div>
        </Card>

        <!-- Section 2: Branding -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">Branding</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <FileUpload
                    label="Shop Logo"
                    accept="image/*"
                    hint="Recommended: 500x500px PNG or JPG"
                    on:upload={(e: any) =>
                        handleFileUpload(e.detail.file, "logo")}
                />
                <FileUpload
                    label="Shop Banner"
                    accept="image/*"
                    hint="Recommended: 1200x300px PNG or JPG"
                    on:upload={(e: any) =>
                        handleFileUpload(e.detail.file, "banner")}
                />
            </div>
        </Card>

        <!-- Section 3: Contact Info -->
        <Card className="border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-text-main mb-6">
                Contact Information
            </h2>
            <div class="grid md:grid-cols-3 gap-6">
                <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+234 801 234 5678"
                    value={phone}
                />
                <Input
                    label="WhatsApp"
                    name="whatsapp"
                    type="tel"
                    placeholder="+234 801 234 5678"
                    value={whatsapp}
                />
                <Input
                    label="Instagram"
                    name="instagram"
                    placeholder="@yourshop"
                    value={instagram}
                />
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
                {loading ? "Creating Shop..." : "Create Shop"}
            </Button>
            <Button type="button" variant="outline" size="lg" href="/my-shop">
                Cancel
            </Button>
        </div>
    </form>
</div>
