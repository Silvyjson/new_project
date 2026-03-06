<!-- src/lib/components/vendor/ShopForm.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import FileUpload from "./FileUpload.svelte";
    import ThemeSelector from "./ThemeSelector.svelte";

    export let shop: {
        id?: string;
        name: string;
        slug: string;
        slogan: string;
        description: string;
        logoUrl: string;
        coverUrl: string;
        theme: string;
        trustScore: number;
        products: number;
        followers: number;
        verified: boolean;
        status: "active" | "paused" | "closed";
        shipping: {
            processingTime: string;
            shippingTime: string;
            regions: string[];
            deliveryMethod: string;
        };
        location: {
            address: string;
            state: string;
            country: string;
        };
        verification: {
            cacNumber: string;
            cacDocument: string;
            status: "not-verified" | "pending" | "verified";
        };
        contact: {
            phone: string;
            email: string;
            instagram: string;
            facebook: string;
            twitter: string;
            whatsapp: string;
            website: string;
        };
        shopInfo: {
            responseTime: string;
            processingTime: string;
            shippingTime: string;
            returns: string;
        };
    };

    export let isEdit: boolean = false;

    // Auto-generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleNameChange = (e: CustomEvent | Event) => {
        const value = (e.target as HTMLInputElement).value;
        shop.name = value;
        if (!isEdit || !shop.slug) {
            shop.slug = generateSlug(value);
        }
    };

    const handleSubmit = (action: "draft" | "publish") => {
        // In real app: submit form
        console.log("Submit", { action, formData: shop });
    };

    const processingOptions = ["Same day", "1–2 days", "3–5 days", "5–7 days"];
    const shippingOptions = [
        "2–5 business days",
        "5–7 business days",
        "7–14 business days",
    ];
    const regionOptions = ["Nigeria", "Africa", "Worldwide"];
    const deliveryOptions = [
        { value: "self", label: "Self Delivery" },
        { value: "courier", label: "Courier" },
        { value: "gig", label: "GIG Logistics" },
    ];
    const responseOptions = [
        "< 1 hour",
        "< 2 hours",
        "< 6 hours",
        "< 24 hours",
    ];
    const returnOptions = [
        "No returns",
        "7-day return policy",
        "14-day return policy",
        "30-day return policy",
    ];
</script>

<div class="space-y-6">
    <!-- Section 1: Shop Info -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
            <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon icon="mdi:store-outline" class="w-5 h-5 text-primary" />
            </div>
            <div>
                <h3 class="font-semibold text-text-main">Shop Info</h3>
                <p class="text-xs text-text-muted">
                    Basic details about your shop
                </p>
            </div>
        </div>

        <div class="space-y-4">
            <Input
                label="Shop Name"
                name="name"
                bind:value={shop.name}
                placeholder="e.g., Urban Kicks"
                required
                on:input={handleNameChange}
            />

            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Shop Slug
                    <span class="text-text-muted font-normal ml-1"
                        >(unique URL)</span
                    >
                </label>
                <div class="flex gap-2">
                    <div class="relative flex-1">
                        <span
                            class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm"
                            >vendorhub.com/shop/</span
                        >
                        <input
                            type="text"
                            class="w-full pl-[180px] pr-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white"
                            placeholder="urban-kicks"
                            bind:value={shop.slug}
                        />
                    </div>
                    <button
                        type="button"
                        class="px-4 py-3 rounded-xl border border-gray-300 text-text-muted hover:border-primary hover:text-primary transition-colors bg-white"
                        title="Edit slug"
                    >
                        <Icon icon="mdi:pencil-outline" class="w-5 h-5" />
                    </button>
                </div>
                <p class="text-xs text-text-muted mt-1">
                    Use letters, numbers, and hyphens only
                </p>
            </div>

            <Input
                label="Slogan"
                name="slogan"
                bind:value={shop.slogan}
                placeholder="e.g., Premium sneakers for everyday style"
                hint="Short tagline that describes your shop (Max 10 words)"
            />

            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Description
                </label>
                <textarea
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body resize-none bg-white font-inherit"
                    rows="3"
                    placeholder="Tell buyers what your shop sells..."
                    bind:value={shop.description}
                    maxlength="300"
                ></textarea>
                <p class="text-xs text-text-muted mt-1 text-right">
                    {shop.description?.length || 0}/300 characters
                </p>
            </div>
        </div>
    </Card>

    <!-- Section 2: Cover Photo -->
    <FileUpload
        label="Cover Photo"
        hint="Upload your shop banner image"
        recommendedSize="1200 × 400px"
        aspectRatio="aspect-[3/1]"
        previewUrl={shop.coverUrl}
        on:upload={(e) => (shop.coverUrl = e.detail.preview)}
    />

    <!-- Section 3: Logo -->
    <FileUpload
        label="Shop Logo"
        hint="Upload your shop logo"
        recommendedSize="500 × 500px (Square)"
        isRound={true}
        previewUrl={shop.logoUrl}
        on:upload={(e) => (shop.logoUrl = e.detail.preview)}
    />

    <!-- Section 4: Theme -->
    <ThemeSelector
        selectedTheme={shop.theme}
        on:select={(e) => (shop.theme = e.detail)}
    />

    <!-- Section 5: Shipping -->
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
                    Delivery settings for your shop
                </p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Processing Time
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white appearance-none"
                    bind:value={shop.shipping.processingTime}
                >
                    {#each processingOptions as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Shipping Time
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white appearance-none"
                    bind:value={shop.shipping.shippingTime}
                >
                    {#each shippingOptions as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Shipping Regions
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white appearance-none"
                    bind:value={shop.shipping.regions[0]}
                >
                    {#each regionOptions as region}
                        <option value={region}>{region}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Delivery Method
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white appearance-none"
                    bind:value={shop.shipping.deliveryMethod}
                >
                    {#each deliveryOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>
            </div>
        </div>
    </Card>

    <!-- Section 6: Business Verification -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
                <div
                    class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                    <Icon
                        icon="mdi:shield-check-outline"
                        class="w-5 h-5 text-primary"
                    />
                </div>
                <div>
                    <h3 class="font-semibold text-text-main">
                        Business Verification
                    </h3>
                    <p class="text-xs text-text-muted">
                        Verify your business to increase trust score
                    </p>
                </div>
            </div>
            {#if shop.verification.status !== "not-verified"}
                <Badge
                    variant={shop.verification.status === "verified"
                        ? "success"
                        : "warning"}
                >
                    <Icon
                        icon="mdi:check-decagram"
                        class="w-3 h-3 inline mr-1"
                    />
                    {shop.verification.status === "verified"
                        ? "Verified"
                        : "Pending"}
                </Badge>
            {/if}
        </div>

        {#if shop.verification.status !== "verified"}
            <div class="space-y-4">
                <Input
                    label="CAC Registration Number"
                    name="cacNumber"
                    bind:value={shop.verification.cacNumber}
                    placeholder="e.g., RC123456"
                    hint="Required for verification"
                />

                <FileUpload
                    label="CAC Document"
                    hint="Upload your CAC certificate"
                    recommendedSize="PDF or image up to 10MB"
                    accept="application/pdf,image/*"
                    previewUrl={shop.verification.cacDocument}
                    on:upload={(e) =>
                        (shop.verification.cacDocument = e.detail.preview)}
                />

                {#if shop.verification.status === "pending"}
                    <div
                        class="p-4 bg-warning/10 border border-warning/30 rounded-xl"
                    >
                        <p class="text-sm text-warning">
                            <Icon
                                icon="mdi:clock-outline"
                                class="w-4 h-4 inline mr-1"
                            />
                            Your documents are under review. This usually takes 1-2
                            business days.
                        </p>
                    </div>
                {/if}
            </div>
        {:else}
            <div class="p-4 bg-success/10 border border-success/30 rounded-xl">
                <p class="text-sm text-success">
                    <Icon icon="mdi:check-circle" class="w-4 h-4 inline mr-1" />
                    Your business is verified. This increases your shop's trust score
                    by +30%.
                </p>
            </div>
        {/if}
    </Card>

    <!-- Section 7: Contact -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
            <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon
                    icon="mdi:account-circle-outline"
                    class="w-5 h-5 text-primary"
                />
            </div>
            <div>
                <h3 class="font-semibold text-text-main">
                    Contact & Social Links
                </h3>
                <p class="text-xs text-text-muted">
                    How customers can reach you
                </p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <Input
                label="Phone"
                name="phone"
                type="tel"
                bind:value={shop.contact.phone}
                placeholder="+234 801 234 5678"
            />
            <Input
                label="Email"
                name="email"
                type="email"
                bind:value={shop.contact.email}
                placeholder="contact@urbankicks.com"
            />
            <Input
                label="Instagram"
                name="instagram"
                bind:value={shop.contact.instagram}
                placeholder="@urbankicks"
            />
            <Input
                label="WhatsApp"
                name="whatsapp"
                type="tel"
                bind:value={shop.contact.whatsapp}
                placeholder="+234 801 234 5678"
            />
            <Input
                label="Website"
                name="website"
                type="url"
                bind:value={shop.contact.website}
                placeholder="https://urbankicks.com"
            />
        </div>
    </Card>

    <!-- Section 8: Shop Information (Public) -->
    <Card className="border border-gray-200 p-6">
        <div class="flex items-center gap-3 mb-6">
            <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
                <Icon
                    icon="mdi:information-outline"
                    class="w-5 h-5 text-primary"
                />
            </div>
            <div>
                <h3 class="font-semibold text-text-main">Shop Information</h3>
                <p class="text-xs text-text-muted">
                    Public info shown to buyers
                </p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Response Time
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white appearance-none"
                    bind:value={shop.shopInfo.responseTime}
                >
                    {#each responseOptions as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Processing Time
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white appearance-none"
                    bind:value={shop.shopInfo.processingTime}
                >
                    {#each processingOptions as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Shipping Time
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white appearance-none"
                    bind:value={shop.shopInfo.shippingTime}
                >
                    {#each shippingOptions as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-text-main mb-1.5">
                    Return Policy
                </label>
                <select
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-body bg-white appearance-none"
                    bind:value={shop.shopInfo.returns}
                >
                    {#each returnOptions as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            </div>
        </div>
    </Card>

    <!-- Edit Only: Shop Status -->
    {#if isEdit}
        <Card className="border border-gray-200 p-6">
            <div class="flex items-center gap-3 mb-6">
                <div
                    class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                    <Icon
                        icon="mdi:toggle-switch-outline"
                        class="w-5 h-5 text-primary"
                    />
                </div>
                <div>
                    <h3 class="font-semibold text-text-main">Shop Status</h3>
                    <p class="text-xs text-text-muted">
                        Control your shop's visibility
                    </p>
                </div>
            </div>

            <div class="flex gap-6">
                {#each ["active", "paused", "closed"] as s}
                    <label class="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="radio"
                            name="status"
                            value={s}
                            bind:group={shop.status}
                            class="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <span
                            class="text-body text-text-main capitalize group-hover:text-primary transition-colors"
                            >{s}</span
                        >
                    </label>
                {/each}
            </div>
        </Card>
    {/if}

    <!-- Submit Actions -->
    <div
        class="flex flex-wrap gap-3 sticky bottom-4 pt-4 bg-surface/90 backdrop-blur-md z-10 border-t border-gray-100 mt-8"
    >
        <Button
            type="button"
            variant="outline"
            size="lg"
            href="/my-shop"
            class="flex-1 sm:flex-none"
        >
            <Icon icon="mdi:close" class="w-5 h-5 mr-2" />
            Cancel
        </Button>
        <Button
            type="button"
            variant="outline"
            size="lg"
            onclick={() => handleSubmit("draft")}
            class="flex-1 sm:flex-none"
        >
            <Icon icon="mdi:content-save-outline" class="w-5 h-5 mr-2" />
            Save Draft
        </Button>
        <Button
            type="button"
            variant="primary"
            size="lg"
            onclick={() => handleSubmit("publish")}
            class="flex-[2] sm:flex-none"
        >
            <Icon icon="mdi:storefront-outline" class="w-5 h-5 mr-2" />
            {isEdit ? "Save Changes" : "Create Shop"}
        </Button>
    </div>
</div>

<style>
    /* Add any custom styles for form elements if needed */
    select {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
        background-position: right 1rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
    }
</style>
