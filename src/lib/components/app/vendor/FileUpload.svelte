<!-- src/lib/components/vendor/FileUpload.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let label: string;
    export let accept: string = "image/*";
    export let hint: string = "";
    export let multiple: boolean = false;
    export let className: string = "";

    const dispatch = createEventDispatcher();

    let files: File[] = [];
    let previews: string[] = [];
    let error: string = "";

    const handleFiles = (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;

        error = "";
        const newFiles: File[] = [];
        const newPreviews: string[] = [];

        Array.from(selectedFiles).forEach((file) => {
            // Validate file type
            if (
                !file.type.startsWith("image/") &&
                !file.type.startsWith("application/pdf")
            ) {
                error = "Please upload image or PDF files only";
                return;
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                error = "File must be under 10MB";
                return;
            }

            newFiles.push(file);
            newPreviews.push(URL.createObjectURL(file));
        });

        if (error) return;

        if (multiple) {
            files = [...files, ...newFiles];
            previews = [...previews, ...newPreviews];
        } else {
            files = newFiles;
            previews = newPreviews;
        }

        // Emit event for parent
        if (multiple) {
            dispatch("upload", { files });
        } else if (files.length > 0) {
            dispatch("upload", { file: files[0] });
        }
    };

    const removeFile = (index: number) => {
        files = files.filter((_, i) => i !== index);
        previews = previews.filter((_, i) => i !== index);
        dispatch("upload", { files });
    };
</script>

<div class="w-full {className}">
    <label class="block text-sm font-medium text-text-main mb-1.5">
        {label}
    </label>

    {#if previews.length > 0}
        <!-- Preview Grid -->
        <div class="grid grid-cols-4 gap-4 mb-4">
            {#each previews as preview, i}
                <div class="relative group">
                    {#if preview.endsWith(".pdf")}
                        <div
                            class="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-3xl"
                        >
                            📄
                        </div>
                    {:else}
                        <img
                            src={preview}
                            alt="Preview"
                            class="w-full h-24 object-cover rounded-lg"
                        />
                    {/if}
                    <button
                        type="button"
                        on:click={() => removeFile(i)}
                        class="absolute top-1 right-1 w-6 h-6 rounded-full bg-error text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        ×
                    </button>
                </div>
            {/each}
        </div>
    {/if}

    <!-- Upload Area -->
    <div
        class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors bg-gray-50"
    >
        <input
            type="file"
            {accept}
            {multiple}
            class="hidden"
            id="file-{label.replace(/\s+/g, '-').toLowerCase()}"
            on:change={(e) => handleFiles((e.target as HTMLInputElement).files)}
        />
        <label
            for="file-{label.replace(/\s+/g, '-').toLowerCase()}"
            class="cursor-pointer"
        >
            <div
                class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl mx-auto mb-3"
            >
                📁
            </div>
            <p class="text-sm font-medium text-text-main mb-1">
                <span class="text-primary">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-text-muted">{hint}</p>
        </label>
    </div>

    {#if error}
        <p class="mt-2 text-xs text-error font-medium">{error}</p>
    {/if}
</div>
