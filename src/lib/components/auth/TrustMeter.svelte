<!-- src/lib/components/auth/TrustMeter.svelte -->
<script lang="ts">
    export let steps: Array<{
        label: string;
        points: number;
        completed: boolean;
    }>;
    export let className: string = "";

    const totalPoints = steps.reduce((sum, s) => sum + s.points, 0);
    const completedPoints = steps
        .filter((s) => s.completed)
        .reduce((sum, s) => sum + s.points, 0);
    const progress = Math.round((completedPoints / totalPoints) * 100);

    const getProgressColor = (p: number) => {
        if (p >= 80) return "bg-success";
        if (p >= 50) return "bg-primary";
        if (p >= 25) return "bg-yellow-500";
        return "bg-gray-400";
    };
</script>

<div class="p-4 bg-background-light rounded-xl border border-gray-200 {className}">
    <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-medium text-text-main"
            >Trust Score Preview</span
        >
        <span class="text-sm font-bold {getProgressColor(progress)}"
            >{progress}%</span
        >
    </div>

    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
            class="h-full {getProgressColor(
                progress,
            )} transition-all duration-500"
            style="width: {progress}%"
        ></div>
    </div>

    <ul class="space-y-2">
        {#each steps as step}
            <li class="flex items-center justify-between text-sm">
                <span class="flex items-center gap-2 text-text-muted">
                    {#if step.completed}
                        <span class="text-success">✓</span>
                    {:else}
                        <span
                            class="w-4 h-4 rounded-full border-2 border-gray-300"
                        ></span>
                    {/if}
                    {step.label}
                </span>
                <span class="text-text-muted">+{step.points}%</span>
            </li>
        {/each}
    </ul>
</div>
