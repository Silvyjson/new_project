<script lang="ts">
  import Icon from '@iconify/svelte';
  import AppTable from '$lib/components/app/common/AppTable.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  
  interface Post {
    id: string;
    title: string;
    shop: { name: string; slug: string };
    status: 'draft' | 'published' | 'archived';
    views: number;
    publishedAt?: string;
    slug: string;
  }

  interface Props {
    posts: Post[];
  }

  let { posts }: Props = $props();
  
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };
  
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { variant: 'warning' as const, label: 'Draft' },
      published: { variant: 'success' as const, label: 'Published' },
      archived: { variant: 'info' as const, label: 'Archived' }
    };
    return badges[status as keyof typeof badges];
  };
</script>

<AppTable items={posts}>
  {#snippet header()}
    <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Title</th>
    <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Shop</th>
    <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Status</th>
    <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Views</th>
    <th class="text-left py-3 px-4 text-sm font-semibold text-text-muted">Published</th>
    <th class="text-right py-3 px-4 text-sm font-semibold text-text-muted">Actions</th>
  {/snippet}

  {#snippet row(post: Post)}
    {@const badge = getStatusBadge(post.status)}
    <td class="py-3 px-4">
      <span class="text-sm font-medium text-text-main line-clamp-1">{post.title}</span>
    </td>
    <td class="py-3 px-4 text-sm text-text-muted">{post.shop.name}</td>
    <td class="py-3 px-4">
      <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
    </td>
    <td class="py-3 px-4 text-sm text-text-muted">{formatNumber(post.views)}</td>
    <td class="py-3 px-4 text-sm text-text-muted">
      {post.publishedAt ? formatDate(post.publishedAt) : '—'}
    </td>
    <td class="py-3 px-4">
      <div class="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" href="/my-blog/{post.slug}" title="View">
          <Icon icon="mdi:eye-outline" class="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" href="/my-blog/{post.id}/edit" title="Edit">
          <Icon icon="mdi:pencil-outline" class="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" class="text-error hover:bg-error/5" title="Delete">
          <Icon icon="mdi:delete-outline" class="w-4 h-4" />
        </Button>
      </div>
    </td>
  {/snippet}
</AppTable>
