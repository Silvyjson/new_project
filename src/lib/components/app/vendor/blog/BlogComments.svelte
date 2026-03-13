<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/common/Button.svelte';
  import { formatDate } from '$lib/utils/format';

  interface Comment {
    id: string;
    author: {
      name: string;
      avatar?: string;
    };
    content: string;
    publishedAt: string;
    likes: number;
    replies?: Comment[];
  }

  interface Props {
    comments: Comment[];
    onAddComment: (content: string) => void;
  }

  let { comments = [], onAddComment }: Props = $props();

  let newComment = $state('');
  let isSubmitting = $state(false);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      onAddComment(newComment);
      newComment = '';
      isSubmitting = false;
    }, 500);
  };
</script>

<div class="space-y-8">
  <div class="flex items-center justify-between border-b border-gray-100 pb-4">
    <h3 class="text-xl font-bold text-text-main">
      Comments ({comments.length})
    </h3>
  </div>

  <!-- Add Comment Form -->
  <div class="flex gap-4">
    <div class="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
      <Icon icon="mdi:account-outline" class="w-6 h-6 text-text-muted" />
    </div>
    <div class="flex-1 space-y-3">
      <textarea
        bind:value={newComment}
        placeholder="Write a comment..."
        class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-sm min-h-[100px]"
      ></textarea>
      <div class="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          onclick={handleSubmit}
          disabled={!newComment.trim() || isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </div>
  </div>

  <!-- Comments List -->
  <div class="space-y-6">
    {#each comments as comment (comment.id)}
      <div class="flex gap-4" in:fade>
        <div class="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {#if comment.author.avatar}
            <img src={comment.author.avatar} alt={comment.author.name} class="w-full h-full object-cover" />
          {:else}
            <span class="text-primary font-bold text-sm">{comment.author.name.charAt(0)}</span>
          {/if}
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex items-center justify-between">
            <p class="font-bold text-text-main text-sm">{comment.author.name}</p>
            <span class="text-xs text-text-muted">{formatDate(comment.publishedAt)}</span>
          </div>
          <p class="text-text-muted text-sm leading-relaxed">
            {comment.content}
          </p>
          <div class="flex items-center gap-4 pt-1">
            <button class="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">
              <Icon icon="mdi:heart-outline" class="w-4 h-4" />
              {comment.likes}
            </button>
            <button class="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">
              <Icon icon="mdi:comment-outline" class="w-4 h-4" />
              Reply
            </button>
          </div>

          <!-- Replies -->
          {#if comment.replies && comment.replies.length > 0}
            <div class="pl-6 border-l-2 border-gray-50 mt-4 space-y-4">
              {#each comment.replies as reply (reply.id)}
                <div class="flex gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <span class="text-text-muted font-bold text-xs">{reply.author.name.charAt(0)}</span>
                  </div>
                  <div class="flex-1 space-y-1">
                    <p class="font-bold text-text-main text-xs">{reply.author.name}</p>
                    <p class="text-text-muted text-xs leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
