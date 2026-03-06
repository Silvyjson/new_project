<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{
        change: {
            searchQuery: string;
            selectedCategory: string;
            minTrustScore: string;
            minRating: string;
            verifiedOnly: boolean;
            sortBy: string;
        };
        clear: void;
    }>();

    export let searchQuery = "";
    export let selectedCategory = "";
    export let categories: string[] = [];
    export let minTrustScore = "";
    export let minRating = "";
    export let verifiedOnly = false;
    export let sortBy = "";
    export let sortOptions: { value: string; label: string }[] = [];
    export let resultsCount = 0;
    export let totalCount = 0;
    export let entityName = "items";

    let showMobileFilters = false;

    function handleChange() {
        dispatch("change", {
            searchQuery,
            selectedCategory,
            minTrustScore,
            minRating,
            verifiedOnly,
            sortBy,
        });
    }

    function clearFilters() {
        searchQuery = "";
        selectedCategory = "";
        minTrustScore = "";
        minRating = "";
        verifiedOnly = false;
        sortBy = "";
        dispatch("clear");
    }

    let activeChips: Array<{ type: string; value: string; label: string }> = [];

    $: {
        activeChips = [];
        if (verifiedOnly)
            activeChips.push({
                type: "verified",
                value: "true",
                label: "Verified Only",
            });
        if (selectedCategory)
            activeChips.push({
                type: "category",
                value: selectedCategory,
                label: selectedCategory,
            });
        if (minTrustScore)
            activeChips.push({
                type: "trust",
                value: minTrustScore,
                label: `${minTrustScore}%+ Trust`,
            });
        if (minRating)
            activeChips.push({
                type: "rating",
                value: minRating,
                label: `${minRating}+ Stars`,
            });
    }

    function removeChip(chip: { type: string }) {
        if (chip.type === "verified") verifiedOnly = false;
        if (chip.type === "category") selectedCategory = "";
        if (chip.type === "trust") minTrustScore = "";
        if (chip.type === "rating") minRating = "";
        handleChange();
    }
</script>

<div class="space-y-4">
    <!-- 🔎 Row 1: Search + Mobile Filters + Desktop Filters -->
    <div
        class="flex items-center justify-between gap-4 flex-col md:flex-row w-full"
    >
        <div class="flex items-center gap-4 w-full md:w-auto justify-between">
            <!-- Search Input -->
            <div class="relative w-full md:w-96">
                <input
                    type="text"
                    placeholder={`Search ${entityName}...`}
                    class="w-full pl-10 pr-10 py-2.5 rounded-btn border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    bind:value={searchQuery}
                    on:input={handleChange}
                />

                <!-- Search Icon -->
                <svg
                    class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                    />
                </svg>

                <!-- Clear Button -->
                {#if searchQuery}
                    <button
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-main"
                        on:click={() => {
                            searchQuery = "";
                            handleChange();
                        }}
                    >
                        ✕
                    </button>
                {/if}
            </div>

            <!-- Mobile Filter Button -->
            <button
                class="md:hidden flex items-center gap-2 px-4 py-2 rounded-btn border border-gray-200 whitespace-nowrap"
                on:click={() => (showMobileFilters = true)}
            >
                Filters
                {#if activeChips.length > 0}
                    <span
                        class="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    >
                        {activeChips.length}
                    </span>
                {/if}
            </button>
        </div>

        <!-- Desktop Filters -->
        <div class="hidden md:flex flex-wrap gap-3 w-full justify-end">
            <select
                class="px-4 py-2.5 rounded-btn border border-gray-200"
                bind:value={selectedCategory}
                on:change={handleChange}
            >
                <option value="">All Categories</option>
                {#each categories as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>

            <select
                class="px-4 py-2.5 rounded-btn border border-gray-200"
                bind:value={minTrustScore}
                on:change={handleChange}
            >
                <option value="">Any Trust Score</option>
                <option value="90">90%+ Excellent</option>
                <option value="80">80%+ Great</option>
                <option value="70">70%+ Good</option>
                <option value="60">60%+ Fair</option>
            </select>

            <select
                class="px-4 py-2.5 rounded-btn border border-gray-200"
                bind:value={minRating}
                on:change={handleChange}
            >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
            </select>

            <label
                class="flex items-center gap-2 px-4 py-2.5 rounded-btn border border-gray-200 cursor-pointer"
            >
                <input
                    type="checkbox"
                    bind:checked={verifiedOnly}
                    on:change={handleChange}
                />
                Verified Only
            </label>

            <!-- <select
                class="px-4 py-2.5 rounded-btn border border-gray-200"
                bind:value={sortBy}
                on:change={handleChange}
            >
                {#each sortOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select> -->
        </div>
    </div>

    <!-- Row 2: Results Count -->
    <div class="text-body text-text-muted">
        Showing
        <span class="font-semibold text-text-main">{resultsCount}</span>
        of
        <span class="font-semibold text-text-main">{totalCount}</span>
        {entityName}
    </div>

    <!-- Filter Chips -->
    {#if activeChips.length > 0}
        <div class="flex flex-wrap items-center gap-2">
            {#each activeChips as chip}
                <span
                    class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-small rounded-btn"
                >
                    {chip.label}
                    <button on:click={() => removeChip(chip)}> ✕ </button>
                </span>
            {/each}
            <button
                on:click={clearFilters}
                class="text-small text-text-muted hover:text-primary underline"
            >
                Clear All
            </button>
        </div>
    {/if}
</div>

<!-- 📱 Mobile Drawer -->
{#if showMobileFilters}
    <div class="fixed inset-0 z-[100]">
        <div
            class="absolute inset-0 bg-black/40"
            on:click={() => (showMobileFilters = false)}
        ></div>

        <div
            class="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up"
        >
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold">Filters</h3>
                <button on:click={() => (showMobileFilters = false)}>
                    ✕
                </button>
            </div>

            <div class="space-y-4">
                <!-- 🔎 Mobile Search -->
                <!-- <input
                    type="text"
                    placeholder={`Search ${entityName}...`}
                    class="w-full px-4 py-3 rounded-btn border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    bind:value={searchQuery}
                    on:input={handleChange}
                /> -->

                <!-- Category -->
                <select
                    class="w-full px-4 py-3 rounded-btn border border-gray-200"
                    bind:value={selectedCategory}
                    on:change={handleChange}
                >
                    <option value="">All Categories</option>
                    {#each categories as category}
                        <option value={category}>{category}</option>
                    {/each}
                </select>

                <!-- Trust Score -->
                <select
                    class="w-full px-4 py-3 rounded-btn border border-gray-200"
                    bind:value={minTrustScore}
                    on:change={handleChange}
                >
                    <option value="">Any Trust Score</option>
                    <option value="90">90%+ Excellent</option>
                    <option value="80">80%+ Great</option>
                    <option value="70">70%+ Good</option>
                    <option value="60">60%+ Fair</option>
                </select>

                <!-- Rating -->
                <select
                    class="w-full px-4 py-3 rounded-btn border border-gray-200"
                    bind:value={minRating}
                    on:change={handleChange}
                >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                </select>

                <!-- Verified -->
                <label class="flex items-center gap-3">
                    <input
                        type="checkbox"
                        bind:checked={verifiedOnly}
                        on:change={handleChange}
                    />
                    Verified Only
                </label>

                <!-- Sort -->
                <!-- <select
                    class="w-full px-4 py-3 rounded-btn border border-gray-200"
                    bind:value={sortBy}
                    on:change={handleChange}
                >
                    {#each sortOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select> -->

                <button
                    on:click={clearFilters}
                    class="w-full mt-4 text-primary underline"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    </div>
{/if}
