<!-- src/lib/components/ui/ReviewCard.svelte -->
<script lang="ts">
    import Card from "./Card.svelte";
    import Icon from "@iconify/svelte";

    export let review: {
        userName: string;
        userAvatar?: string;
        rating: number;
        date: string;
        content: string;
        images?: string[];
        verifiedMatch?: boolean;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
</script>

<Card
    padding="md"
    className="border border-gray-100 shadow-sm animate-fade-in h-full flex flex-col"
>
    <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
            <div
                class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0"
            >
                {#if review.userAvatar}
                    <img
                        src={review.userAvatar}
                        alt={review.userName}
                        class="w-full h-full object-cover"
                    />
                {:else}
                    <div
                        class="w-full h-full flex items-center justify-center text-text-muted font-bold"
                    >
                        {review.userName.charAt(0)}
                    </div>
                {/if}
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-text-main"
                        >{review.userName}</span
                    >
                    {#if review.verifiedMatch}
                        <span
                            class="text-[10px] bg-success/10 text-success px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                            >Verified Purchase</span
                        >
                    {/if}
                </div>
                <div class="flex items-center gap-1">
                    {#each Array(5) as _, i}
                        <Icon
                            icon="mdi:star"
                            class="text-small {i < Math.floor(review.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-200'}"
                        />
                    {/each}
                    <span class="text-xs text-text-muted ml-2"
                        >{formatDate(review.date)}</span
                    >
                </div>
            </div>
        </div>
    </div>

    <p class="text-body text-text-muted leading-relaxed mb-4">
        {review.content}
    </p>

    {#if review.images && review.images.length > 0}
        <div class="flex flex-wrap gap-2">
            {#each review.images as img}
                <img
                    src={img}
                    alt="Review attachment"
                    class="w-20 h-20 rounded-lg object-cover border border-gray-100"
                />
            {/each}
        </div>
    {/if}
</Card>
