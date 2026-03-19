<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
    import type { PageData } from "./$types";
    import Card from "$lib/components/common/Card.svelte";
    import Button from "$lib/components/common/Button.svelte";
    import Badge from "$lib/components/common/Badge.svelte";
    import Icon from "@iconify/svelte";
    import ProductCard from "$lib/components/app/shopTheme/general/default/components/ProductCard.svelte";
    import BlogCard from "$lib/components/app/card/BlogCard.svelte";
    import BlogComments from "$lib/components/app/vendor/blog/BlogComments.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    const { post, relatedPosts, meta } = data;

    // Like State
    let isLiked = $state(false);
    let likesCount = $state((post as any).likes || 42);

    // Comments State
    let comments = $state([
        {
            id: '1',
            author: { name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex' },
            content: 'This was such a helpful guide! I learned a lot about what to look for in wireless headphones.',
            publishedAt: '2026-02-15T10:30:00Z',
            likes: 5,
            replies: [
                {
                    id: '1-1',
                    author: { name: 'TechHub', avatar: post.author.logo },
                    content: 'Glad you found it helpful, Alex! Let us know if you have any questions.',
                    publishedAt: '2026-02-15T11:45:00Z',
                    likes: 2
                }
            ]
        },
        {
            id: '2',
            author: { name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah' },
            content: 'Great breakdown. I particularly enjoyed the section on frequency response.',
            publishedAt: '2026-02-14T09:15:00Z',
            likes: 3
        }
    ]);

    const toggleLike = () => {
        isLiked = !isLiked;
        likesCount += isLiked ? 1 : -1;
    };

    const handleAddComment = (content: string) => {
        const newComment = {
            id: Math.random().toString(36).substr(2, 9),
            author: { name: 'Guest User' },
            content,
            publishedAt: new Date().toISOString(),
            likes: 0
        };
        // @ts-ignore - Handle missing avatar gracefully in component
        comments = [newComment, ...comments];
    };

    const formatDate = (date: Date | string) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    const getCategoryColorClass = (
        color: string,
    ): "default" | "success" | "warning" | "danger" | "info" => {
        const colors: Record<
            string,
            "default" | "success" | "warning" | "danger" | "info"
        > = {
            indigo: "info",
            purple: "info",
            blue: "info",
            success: "success",
            gray: "default",
        };
        return colors[color] || "default";
    };
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.excerpt} />
    <meta property="og:image" content={post.coverImage} />
    <meta property="og:type" content="article" />
</svelte:head>

<main class="min-h-screen bg-surface">
    <!-- Breadcrumb -->
    <nav class="py-4 border-b border-gray-200">
        <div class="container max-w-7xl mx-auto px-4">
            <ol class="flex items-center gap-2 text-sm text-text-muted">
                <li><a href="/" class="hover:text-primary">Home</a></li>
                <li>/</li>
                <li><a href="/blog" class="hover:text-primary">Blog</a></li>
                <li>/</li>
                <li class="text-text-main">{post.title}</li>
            </ol>
        </div>
    </nav>

    <!-- Article Detail -->
    <article class="py-12">
        <div class="container max-w-4xl mx-auto px-4">
            <!-- Category Tag -->
            <Badge
                variant={getCategoryColorClass(post.categoryColor)}
                className="mb-4"
            >
                {post.category}
            </Badge>

            <!-- Title -->
            <h1
                class="md:text-h2 text-h3 font-bold text-text-main mb-6 leading-tight"
            >
                {post.title}
            </h1>

            <!-- Author Section -->
            <div
                class="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200"
            >
                <img
                    src={post.author.logo}
                    alt={post.author.name}
                    class="w-14 h-14 rounded-full object-cover"
                />
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="text-body font-semibold text-text-main"
                            >{post.author.name}</span
                        >
                    </div>
                    <p class="text-small text-text-muted">
                        {formatDate(post.publishedAt)} • {post.readTime} min read
                        • {post.views.toLocaleString()} views
                    </p>
                </div>
                
                <div class="flex items-center gap-3">
                    <button 
                        class="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all {isLiked ? 'text-error bg-error/5 border-error/20' : 'text-text-muted'}"
                        onclick={toggleLike}
                    >
                        <Icon icon={isLiked ? "mdi:heart" : "mdi:heart-outline"} class="w-5 h-5" />
                        <span class="font-medium">{likesCount}</span>
                    </button>

                    {#if post.author.type === "vendor" && post.linkedShop}
                        <Button
                            href="/shop/{post.linkedShop.slug}"
                            variant="outline"
                            size="md"
                        >
                            Visit Shop
                        </Button>
                    {/if}
                </div>
            </div>

            <!-- Cover Image -->
            <img
                src={post.coverImage}
                alt={post.title}
                class="w-full h-[400px] object-cover rounded-2xl mb-12"
            />

            <!-- Article Content -->
            <div class="prose prose-slate prose-lg max-w-none mb-16">
                {@html post.content}
            </div>

            <!-- Interaction Bar -->
            <div class="flex items-center justify-between py-6 border-y border-gray-100 mb-12">
                <div class="flex items-center gap-6">
                    <button 
                        class="flex items-center gap-2 text-text-muted hover:text-primary transition-colors"
                        onclick={toggleLike}
                    >
                        <Icon icon={isLiked ? "mdi:heart" : "mdi:heart-outline"} class="w-6 h-6 {isLiked ? 'text-error' : ''}" />
                        <span class="font-medium">{likesCount} Likes</span>
                    </button>
                    <button class="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                        <Icon icon="mdi:share-variant-outline" class="w-6 h-6" />
                        <span class="font-medium">Share</span>
                    </button>
                </div>
            </div>

            <!-- Comments Section -->
            <section id="comments" class="mb-20">
                <BlogComments
                    comments={comments}
                    onAddComment={handleAddComment}
                />
            </section>
        </div>
    </article>

    <!-- 🔷 LINKED PRODUCTS SECTION -->
    {#if post.linkedProducts?.length}
        <section class="pb-12 bg-soft-background">
            <div class="container max-w-7xl mx-auto px-4">
                <h2 class="md:text-h2 text-h3 text-text-main mb-6">
                    Products Mentioned in This Post
                </h2>
                <div class="flex gap-6 overflow-x-auto pb-4 snap-x">
                    {#each post.linkedProducts as product}
                        <div class="flex-shrink-0 w-72 snap-start">
                            <ProductCard
                                {product}
                                shopSlug={post.linkedShop?.slug || ""}
                                compact={true}
                            />
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    {/if}

    <!-- 🔷 VISIT SHOP CTA -->
    {#if post.linkedShop}
        <section class="pb-12 bg-surface">
            <div class="container max-w-7xl mx-auto px-4">
                <Card
                    className="p-8 text-center bg-primary/5 border-primary/20 shadow-md"
                >
                    <h3 class="text-h3 text-text-main mb-4">
                        Explore More from {post.linkedShop.name}
                    </h3>
                    <p class="text-body text-text-muted mb-6">
                        Discover their full collection of products, all
                        protected by VendorHub's secure checkout.
                    </p>
                    <Button
                        href="/shop/{post.linkedShop.slug}"
                        variant="primary"
                        size="lg"
                    >
                        Visit {post.linkedShop.name} →
                    </Button>
                </Card>
            </div>
        </section>
    {/if}

    <!-- 🔷 RELATED POSTS -->
    {#if relatedPosts?.length}
        <section class="pb-12 bg-surface">
            <div class="container max-w-7xl mx-auto px-4">
                <h2 class="md:text-h2 text-h3 text-text-main mb-6">
                    Read More
                </h2>
                <div
                    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {#each relatedPosts as related, i}
                        <BlogCard post={related} />
                    {/each}
                </div>
            </div>
        </section>
    {/if}
</main>

<style>
    /* Prose styles for article content */
    :global(.prose) {
        color: var(--color-text-muted);
        line-height: 1.625;
    }
    :global(.prose h2) {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-text-main);
        margin-top: 3rem;
        margin-bottom: 1rem;
    }
    :global(.prose p) {
        margin-bottom: 1rem;
    }
    :global(.prose ul) {
        list-style-type: disc;
        list-style-position: inside;
        margin-bottom: 1rem;
        padding-left: 1rem;
    }
    :global(.prose li) {
        margin-bottom: 0.5rem;
    }
    :global(.prose a) {
        color: var(--color-primary);
    }
    :global(.prose a:hover) {
        text-decoration: underline;
    }
    :global(.prose img) {
        border-radius: 0.75rem;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
</style>
