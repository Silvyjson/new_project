<!-- src/lib/components/vendor/KPICard.svelte -->
<script lang="ts">
    import Card from "$lib/components/common/Card.svelte";

    export let label: string;
    export let value: string;
    export let change: string;
    export let trend: "up" | "down" | "neutral";
    const delay: number = 0;
</script>

<Card
    className="border border-gray-200 p-6 hover:shadow-card-hover transition-shadow"
>
    <p class="text-sm text-text-muted mb-2">{label}</p>
    <div class="flex items-end justify-between">
        <span class="text-2xl font-bold text-text-main">{value}</span>
        <span
            class="text-sm font-medium {trend === 'up'
                ? 'text-success'
                : trend === 'down'
                  ? 'text-danger'
                  : 'text-text-muted'}"
        >
            {change}
        </span>
    </div>
</Card>
