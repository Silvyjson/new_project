<!-- src/lib/components/vendor/TrustScoreCard.svelte -->
<script lang="ts">
    import Card from "$lib/components/ui/Card.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";

    export let score: number;
    export let size: "sm" | "md" | "lg" = "md";

    const getScoreColor = (s: number) => {
        if (s >= 80) return "text-success";
        if (s >= 60) return "text-primary";
        if (s >= 40) return "text-warning";
        return "text-danger";
    };

    const getScoreBg = (s: number) => {
        if (s >= 80) return "bg-success";
        if (s >= 60) return "bg-primary";
        if (s >= 40) return "bg-warning";
        return "bg-danger";
    };

    const getScoreLabel = (s: number) => {
        if (s >= 80) return "Excellent";
        if (s >= 60) return "Great";
        if (s >= 40) return "Fair";
        return "Needs Improvement";
    };

    const breakdown = [
        { label: "ID Verification", points: 30, earned: true },
        { label: "CAC Verification", points: 30, earned: false },
        { label: "Reviews & Delivery", points: 40, earned: score >= 70 },
    ];
</script>

<Card className="border border-gray-200 p-6 min-w-[280px]">
    <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-text-main">Trust Score</h3>
        <a
            href="/settings/verification"
            class="text-sm text-primary font-medium hover:underline"
        >
            Improve →
        </a>
    </div>

    <div class="flex items-center gap-4">
        <!-- Circular Progress -->
        <div class="relative w-20 h-20">
            <svg class="w-20 h-20 transform -rotate-90">
                <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#E5E7EB"
                    stroke-width="6"
                    fill="none"
                />
                <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="currentColor"
                    stroke-width="6"
                    fill="none"
                    class={getScoreColor(score)}
                    stroke-dasharray={2 * Math.PI * 32}
                    stroke-dashoffset={2 * Math.PI * 32 * (1 - score / 100)}
                    stroke-linecap="round"
                />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xl font-bold {getScoreColor(score)}"
                    >{score}%</span
                >
            </div>
        </div>

        <!-- Breakdown -->
        <div class="flex-1 space-y-2">
            {#each breakdown as item}
                <div class="flex items-center gap-2">
                    <span
                        class="w-4 h-4 rounded-full {item.earned
                            ? getScoreBg(score)
                            : 'bg-gray-200'} flex items-center justify-center"
                    >
                        {#if item.earned}
                            <svg
                                class="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        {/if}
                    </span>
                    <span class="text-xs text-text-muted">{item.label}</span>
                    <span class="text-xs font-medium text-text-main ml-auto"
                        >+{item.points}%</span
                    >
                </div>
            {/each}
        </div>
    </div>
</Card>
