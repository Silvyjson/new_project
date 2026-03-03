<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
    import type { PageData } from "./$types";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Badge from "$lib/components/ui/Badge.svelte";
    import TrustBadge from "$lib/components/ui/TrustBadge.svelte";
    import ProductCard from "$lib/components/card/ProductCard.svelte";
    import BlogCard from "$lib/components/card/BlogCard.svelte";

    export let data: PageData;
    const { post, relatedPosts, meta } = data;

    const formatDate = (date: Date) => {
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

    <!-- Article Header -->
    <article class="py-12">
        <div class="container max-w-7xl mx-auto px-4">
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
                    src={post.author.logo || post.author.vendorLogo}
                    alt={post.author.name || post.author.vendorName}
                    class="w-14 h-14 rounded-full object-cover"
                />
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        {#if post.author.type === "vendor"}
                            <a
                                href="/vendor/{post.author.vendorSlug}"
                                class="text-body font-semibold text-primary hover:underline"
                            >
                                {post.author.vendorName}
                            </a>
                            {#if post.author.vendorVerified}
                                <TrustBadge size="sm" />
                            {/if}
                        {:else}
                            <span class="text-body font-semibold text-text-main"
                                >{post.author.name}</span
                            >
                        {/if}
                    </div>
                    <p class="text-small text-text-muted">
                        {formatDate(post.publishedAt)} • {post.readTime} min read
                        • {post.views.toLocaleString()} views
                    </p>
                </div>
                {#if post.author.type === "vendor" && post.linkedShop}
                    <Button
                        href="/shop/{post.linkedShop.slug}"
                        variant="outline"
                        size="sm"
                    >
                        Visit Shop
                    </Button>
                {/if}
            </div>

            <!-- Cover Image -->
            <img
                src={post.coverImage}
                alt={post.title}
                class="w-full h-[400px] object-cover rounded-2xl mb-12"
            />

            <!-- Article Content -->
            <div class="prose prose-slate prose-lg max-w-none mx-auto">
                {@html post.content}
            </div>
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

    <!-- 🔷 VENDOR AUTHOR PROFILE -->
    {#if post.author.type === "vendor"}
        <section class="pb-12 bg-soft-background">
            <div class="container max-w-7xl mx-auto px-4">
                <Card className="p-6">
                    <h3 class="text-h3 text-text-main mb-6">
                        About This Vendor
                    </h3>
                    <div class="flex flex-col md:flex-row items-start gap-6">
                        <img
                            src={post.author.vendorLogo}
                            alt={post.author.vendorName}
                            class="w-20 h-20 rounded-2xl object-cover"
                        />
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-3">
                                <h4 class="text-h4 font-bold text-text-main">
                                    {post.author.vendorName}
                                </h4>
                                {#if post.author.vendorVerified}
                                    <TrustBadge />
                                {/if}
                            </div>
                            <p
                                class="text-body text-text-muted mb-4 line-clamp-3"
                            >
                                Trusted vendor on VendorHub specializing in
                                quality products with secure delivery.
                            </p>
                            <div
                                class="flex justify-between items-center gap-6 mb-6 w-full sm:w-[80%] md:w-[40%] text-center"
                            >
                                <div>
                                    <div
                                        class="text-lg font-bold text-text-main"
                                    >
                                        {post.author.trustScore}%
                                    </div>
                                    <div class="text-xs text-text-muted">
                                        Trust Score
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-lg font-bold text-text-main"
                                    >
                                        3
                                    </div>
                                    <div class="text-xs text-text-muted">
                                        Shops
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-lg font-bold text-text-main"
                                    >
                                        250+
                                    </div>
                                    <div class="text-xs text-text-muted">
                                        Products
                                    </div>
                                </div>
                            </div>
                            <Button
                                href="/vendor/{post.author.vendorSlug}"
                                variant="outline"
                                size="md"
                            >
                                View Vendor Profile
                            </Button>
                        </div>
                    </div>
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
                        <BlogCard
                            post={related}
                            {formatDate}
                            {getCategoryColorClass}
                        />
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
