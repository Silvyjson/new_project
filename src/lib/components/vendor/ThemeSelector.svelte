<!-- src/lib/components/vendor/ThemeSelector.svelte -->
<script lang="ts">
    import Icon from "@iconify/svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import { createEventDispatcher } from "svelte";

    export let selectedTheme: string = "";
    const dispatch = createEventDispatcher();

    const themes = [
        {
            id: "classic",
            name: "Classic",
            description: "Clean storefront with large product grid",
            preview: "bg-gradient-to-br from-gray-100 to-gray-200",
            icon: "mdi:storefront-outline",
        },
        {
            id: "minimal",
            name: "Minimal",
            description: "Simple, focused design with whitespace",
            preview: "bg-gradient-to-br from-white to-gray-50",
            icon: "mdi:minus-circle-outline",
        },
        {
            id: "fashion",
            name: "Fashion",
            description: "Elegant layout for clothing & accessories",
            preview: "bg-gradient-to-br from-pink-50 to-purple-50",
            icon: "mdi:shirt-outline",
        },
        {
            id: "electronics",
            name: "Electronics",
            description: "Tech-focused design with specs emphasis",
            preview: "bg-gradient-to-br from-blue-50 to-indigo-50",
            icon: "mdi:chip-outline",
        },
        {
            id: "dark",
            name: "Dark",
            description: "Modern dark theme for premium products",
            preview: "bg-gradient-to-br from-gray-800 to-gray-900",
            icon: "mdi:weather-night",
        },
    ];

    const selectTheme = (id: string) => {
        selectedTheme = id;
        dispatch("select", id);
    };
</script>

<Card className="border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-6">
        <div
            class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
        >
            <Icon icon="mdi:palette-outline" class="w-5 h-5 text-primary" />
        </div>
        <div>
            <h3 class="font-semibold text-text-main">Theme</h3>
            <p class="text-xs text-text-muted">
                Choose your shop's visual style
            </p>
        </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each themes as theme}
            <button
                type="button"
                on:click={() => selectTheme(theme.id)}
                class="text-left p-4 rounded-xl border-2 transition-all {selectedTheme ===
                theme.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'}"
            >
                <div class="flex items-center gap-3 mb-3">
                    <div
                        class="w-10 h-10 rounded-xl {theme.preview} flex items-center justify-center"
                    >
                        <Icon
                            icon={theme.icon}
                            class="w-5 h-5 text-text-main"
                        />
                    </div>
                    <div>
                        <h4 class="font-medium text-text-main">{theme.name}</h4>
                    </div>
                </div>
                <p class="text-xs text-text-muted">{theme.description}</p>
            </button>
        {/each}
    </div>
</Card>
