<!-- src/lib/components/vendor/FileUpload.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/common/Card.svelte";

    export let label: string;
    export let hint: string;
    export let accept: string = "image/*";
    export let aspectRatio: string = "";
    export let recommendedSize: string;
    export let previewUrl: string = "";
    export let isRound: boolean = false;

    let file: File | null = null;
    let preview: string = previewUrl || "";
    let error: string = "";

    const handleFile = (selectedFile: File) => {
        // Validate file type
        if (!selectedFile.type.startsWith("image/")) {
            error = "Please upload an image file";
            return;
        }

        // Validate file size (max 10MB)
        if (selectedFile.size > 10 * 1024 * 1024) {
            error = "File must be under 10MB";
            return;
        }

        file = selectedFile;
        preview = URL.createObjectURL(selectedFile);
        error = "";

        // Emit event for parent
        const event = new CustomEvent("upload", { detail: { file, preview } });
        window.dispatchEvent(event);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer?.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const removeFile = () => {
        file = null;
        preview = "";
        error = "";
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
            <h3 class="font-semibold text-text-main">{label}</h3>
            <p class="text-xs text-text-muted">{hint}</p>
            <p class="text-xs text-text-muted mt-1">
                Recommended: {recommendedSize}
            </p>
        </div>
    </div>

    {#if preview}
        <!-- Preview -->
        <div class="relative mb-4">
            <div
                class="{aspectRatio} {isRound
                    ? 'rounded-full'
                    : 'rounded-xl'} overflow-hidden bg-gray-100"
            >
                <img
                    src={preview}
                    alt="Preview"
                    class="w-full h-full object-cover"
                />
            </div>
            <button
                type="button"
                on:click={removeFile}
                class="absolute top-2 right-2 w-8 h-8 rounded-full bg-error text-white flex items-center justify-center hover:bg-error-hover transition-colors"
                aria-label="Remove image"
            >
                <Icon icon="mdi:close" class="w-4 h-4" />
            </button>
        </div>
    {/if}

    {#if error}
        <p class="text-xs text-error font-medium mb-4">{error}</p>
    {/if}

    <!-- Upload Area -->
    <div
        class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors bg-gray-50 cursor-pointer"
        on:dragover={(e) => e.preventDefault()}
        on:drop={handleDrop}
        role="button"
        tabindex="0"
        on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const input = document.getElementById(`file-${label.replace(/\s+/g, '-').toLowerCase()}`) as HTMLInputElement;
                input?.click();
            }
        }}
    >
        <input
            type="file"
            {accept}
            class="hidden"
            id="file-{label.replace(/\s+/g, '-').toLowerCase()}"
            on:change={(e) => {
                const input = e.target as HTMLInputElement;
                if (input.files?.[0]) handleFile(input.files[0]);
            }}
        />
        <label
            for="file-{label.replace(/\s+/g, '-').toLowerCase()}"
            class="cursor-pointer"
        >
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
            <p class="text-xs text-text-muted">PNG, JPG up to 10MB</p>
        </label>
    </div>
</Card>
