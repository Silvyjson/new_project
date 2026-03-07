<!-- src/lib/components/vendor/ProductImages.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/common/Card.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let images: File[] = [];
    export let previews: string[] = [];

    const handleFileSelect = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (!input.files) return;

        const files = Array.from(input.files);
        images = [...images, ...files];

        // Generate previews
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                previews = [...previews, e.target?.result as string];
                dispatch("images-change", { images, previews });
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        previews = previews.filter((_, i) => i !== index);
        images = images.filter((_, i) => i !== index);
        dispatch("images-change", { images, previews });
    };
</script>

<Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-4">
        <div
            class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
        >
            <Icon icon="mdi:image-outline" class="w-5 h-5 text-primary" />
        </div>
        <div>
            <h3 class="font-semibold text-text-main">Product Images</h3>
            <p class="text-xs text-text-muted">
                Upload up to 10 images (PNG, JPG up to 5MB each)
            </p>
        </div>
    </div>

    {#if previews.length > 0}
        <!-- Preview Grid -->
        <div class="grid grid-cols-4 md:grid-cols-6 gap-4 mb-4">
            {#each previews as preview, i}
                <div class="relative group aspect-square">
                    <img
                        src={preview}
                        alt="Product preview"
                        class="w-full h-full object-cover rounded-lg overflow-hidden border border-gray-100"
                    />
                    <button
                        type="button"
                        on:click={() => removeImage(i)}
                        class="absolute top-1 right-1 w-6 h-6 rounded-full bg-error text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                        <Icon icon="mdi:close" class="w-4 h-4" />
                    </button>
                </div>
            {/each}
        </div>
    {/if}

    <!-- Upload Area -->
    <div
        class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors bg-gray-50 cursor-pointer"
    >
        <input
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            id="product-images"
            on:change={handleFileSelect}
        />
        <label for="product-images" class="cursor-pointer">
            <div
                class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
            >
                <Icon
                    icon="mdi:cloud-upload-outline"
                    class="w-8 h-8 text-primary"
                />
            </div>
            <p class="text-sm font-medium text-text-main mb-1">
                <span class="text-primary">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-text-muted">PNG, JPG up to 5MB each</p>
        </label>
    </div>
</Card>
