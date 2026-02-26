<!-- src/lib/components/auth/FileUpload.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let label: string;
    export let accept: string = "image/*";
    export let hint: string = "";
    // capture accepts camera direction or boolean per HTML spec
    export let capture: boolean | "user" | "environment" | null = null;
    export let className: string = "";

    // compute stable id for the hidden input so the top label can reference it
    let inputId: string;
    $: inputId = `file-${label?.toString().replace(/\s+/g, "-").toLowerCase()}`;

    const dispatch = createEventDispatcher();

    let file: File | null = null;
    let preview: string = "";
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
        dispatch("upload", { file: selectedFile });
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer?.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };
</script>

<div class="w-full {className}">
    <!-- associate label with hidden input for accessibility -->
    <label for={inputId} class="block text-sm font-medium text-text-main mb-1.5">
        {label}
    </label>

    {#if preview}
        <!-- Preview State -->
        <div class="relative">
            <img
                src={preview}
                alt="Preview"
                class="w-full h-40 object-cover rounded-xl border border-gray-200"
            />
            <button
                type="button"
                on:click={() => {
                    file = null;
                    preview = "";
                    dispatch("upload", { file: null });
                }}
                class="absolute top-2 right-2 w-8 h-8 rounded-full bg-error text-white flex items-center justify-center hover:bg-error-hover transition-colors"
                aria-label="Remove file"
            >
                ×
            </button>
        </div>
    {:else}
        <!-- Upload State -->
        <div
            class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50"
            role="button"
            tabindex="0"
            on:dragover={(e) => e.preventDefault()}
            on:drop={handleDrop}
        >
            {#key label}
            <input
                type="file"
                {accept}
                {capture}
                class="hidden"
                id={inputId}
                on:change={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (input.files?.[0]) handleFile(input.files[0]);
                }}
            />
            {/key}
            <label for="file-{label}" class="cursor-pointer">
                <div
                    class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl mx-auto mb-3"
                >
                    📁
                </div>
                <p class="text-sm font-medium text-text-main mb-1">
                    <span class="text-primary">Click to upload</span> or drag and
                    drop
                </p>
                <p class="text-xs text-text-muted">{hint}</p>
                <p class="text-xs text-text-muted mt-2">PNG, JPG up to 10MB</p>
            </label>
        </div>
    {/if}

    {#if error}
        <p class="mt-2 text-xs text-error font-medium">{error}</p>
    {/if}
</div>
