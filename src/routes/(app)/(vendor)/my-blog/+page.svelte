<!-- src/routes/(vendor)/my-blog/+page.svelte -->
<script lang="ts">
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";

    // Active tab
    let activeTab = "published";

    // Mock blog posts
    let posts = [
        {
            id: 1,
            title: "How TechStoreNG Just Launched Their 2026 Collection",
            status: "published",
            views: 2340,
            linkedProducts: 2,
            date: "2026-01-25",
            shop: "TechStoreNG",
        },
        {
            id: 2,
            title: "5 Tips for Safe Pre-Order Shopping",
            status: "published",
            views: 5670,
            linkedProducts: 0,
            date: "2026-01-20",
            shop: "VendorHub",
        },
        {
            id: 3,
            title: "New Arrivals: Spring Collection 2026",
            status: "draft",
            views: 0,
            linkedProducts: 5,
            date: "2026-01-18",
            shop: "Fashion Hub",
        },
    ];

    const tabs = [
        { id: "all", label: "All Posts" },
        { id: "published", label: "Published" },
        { id: "draft", label: "Drafts" },
    ];

    const getStatusBadge = (status: string) => {
        return status === "published"
            ? { variant: "success" as const, label: "Published" }
            : { variant: "warning" as const, label: "Draft" };
    };

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    $: filteredPosts =
        activeTab === "all"
            ? posts
            : posts.filter((post) => post.status === activeTab);
</script>

<svelte:head>
    <title>My Blog | VendorHub</title>
</svelte:head>

<div class="max-w-[1280px] mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-text-main">My Blog</h1>
        <Button href="/my-blog/create" variant="primary" size="lg">
            + New Post
        </Button>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-2 mb-8">
        {#each tabs as tab}
            <button
                on:click={() => (activeTab = tab.id)}
                class="px-6 py-3 rounded-xl text-body font-medium transition-colors
               {activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-muted hover:bg-gray-200'}"
            >
                {tab.label}
            </button>
        {/each}
    </div>

    <!-- Posts Table -->
    {#if filteredPosts.length === 0}
        <Card className="py-16 text-center">
            <div class="text-6xl mb-4">✍️</div>
            <h2 class="text-h2 text-text-main mb-2">No posts found</h2>
            <p class="text-body text-text-muted">
                Create your first blog post to get started.
            </p>
        </Card>
    {:else}
        <Card className="border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-gray-200 bg-gray-50">
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Title</th
                            >
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Shop</th
                            >
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Status</th
                            >
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Views</th
                            >
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Products</th
                            >
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Date</th
                            >
                            <th
                                class="text-left py-3 px-4 text-sm font-semibold text-text-muted"
                                >Actions</th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each filteredPosts as post}
                            {@const badge = getStatusBadge(post.status)}
                            <tr
                                class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <td class="py-3 px-4">
                                    <span
                                        class="text-sm font-medium text-text-main"
                                        >{post.title}</span
                                    >
                                </td>
                                <td class="py-3 px-4 text-sm text-text-muted"
                                    >{post.shop}</td
                                >
                                <td class="py-3 px-4">
                                    <Badge variant={badge.variant}
                                        >{badge.label}</Badge
                                    >
                                </td>
                                <td class="py-3 px-4 text-sm text-text-muted"
                                    >{post.views.toLocaleString()}</td
                                >
                                <td class="py-3 px-4 text-sm text-text-muted"
                                    >{post.linkedProducts}</td
                                >
                                <td class="py-3 px-4 text-sm text-text-muted"
                                    >{formatDate(post.date)}</td
                                >
                                <td class="py-3 px-4">
                                    <div class="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            href="/my-blog/{post.id}/edit"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            class="text-error hover:bg-error/5"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </Card>
    {/if}
</div>
