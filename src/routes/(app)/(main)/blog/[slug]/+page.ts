import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Product, StockStatus } from '$lib/types';

// Mock blog posts database (replace with real API call)
const mockPosts = [
    {
        id: 'post-001',
        slug: 'techstoreng-2026-collection-launch',
        title: 'How TechStoreNG Just Launched Their 2026 Collection',
        excerpt: 'Discover the latest gadgets, exclusive pre-orders, and limited-edition tech drops from one of our top-rated vendors.',
        content: `
      <p>After months of anticipation, TechStoreNG has officially unveiled their 2026 Collection — a curated lineup of premium electronics designed for the modern Nigerian lifestyle.</p>
      
      <h2>What's New</h2>
      <p>This year's collection features:</p>
      <ul>
        <li>Wireless earbuds with 48-hour battery life</li>
        <li>Fast-charging power banks with solar option</li>
        <li>Smart home devices compatible with local networks</li>
        <li>Exclusive colorways available only on VendorHub</li>
      </ul>
      
      <h2>Pre-Order Now</h2>
      <p>Early birds get 15% off + free shipping. All pre-orders are protected by VendorHub's secure escrow system.</p>
      
      <h2>Why Trust TechStoreNG?</h2>
      <p>With a 94% Trust Score and over 3,200 successful orders, TechStoreNG has proven their reliability. Every product comes with warranty and secure delivery tracking.</p>
      
      <blockquote>"We believe technology should be accessible, reliable, and exciting. Our 2026 Collection reflects that mission."</blockquote>
      
      <p>Ready to upgrade your tech? <a href="/shop/techstoreng">Visit TechStoreNG</a> to explore the full collection.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        category: 'New Releases',
        categoryColor: 'indigo',
        author: {
            type: 'vendor',
            vendorSlug: 'techstoreng',
            vendorName: 'TechStoreNG',
            vendorLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=TS',
            vendorVerified: true,
            trustScore: 94,
            vendorBio: 'TechStoreNG is a leading electronics vendor on VendorHub, specializing in authentic gadgets with warranty and secure delivery across Nigeria.'
        },
        publishedAt: new Date('2026-01-25T10:00:00Z'),
        updatedAt: new Date('2026-01-25T10:00:00Z'),
        readTime: 4,
        views: 2340,
        linkedProducts: [
            {
                id: 'p_001',
                code: 'TS-EB-001',
                vendorId: 'v_001',
                name: 'Wireless Earbuds Pro',
                description: 'Premium wireless earbuds with noise cancellation.',
                price: 25000,
                oldPrice: 30000,
                currency: 'NGN',
                images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df'],
                preorder: false,
                sale: true,
                new: false,
                rating: 4.8,
                reviewCount: 124,
                stockStatus: 'in-stock' as StockStatus,
                category: 'Electronics',
                createdAt: new Date()
            },
            {
                id: 'p_002',
                code: 'TS-PB-002',
                vendorId: 'v_001',
                name: 'Solar Power Bank 20K',
                description: 'High-capacity solar power bank for outdoor use.',
                price: 18000,
                oldPrice: null,
                currency: 'NGN',
                images: ['https://images.unsplash.com/photo-1609081219090-a66920c72123'],
                preorder: false,
                sale: false,
                new: true,
                rating: 4.7,
                reviewCount: 89,
                stockStatus: 'in-stock' as StockStatus,
                category: 'Electronics',
                createdAt: new Date()
            }
        ],
        linkedShop: {
            slug: 'techstoreng',
            name: 'TechStoreNG',
            logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TS',
            trustScore: 94
        },
        tags: ['tech', 'gadgets', 'pre-order', '2026', 'electronics'],
        featured: true,
        status: 'published'
    },
    {
        id: 'post-002',
        slug: '5-tips-for-safe-preorder-shopping',
        title: '5 Tips for Safe Pre-Order Shopping on VendorHub',
        excerpt: 'Pre-orders can be tricky. Here\'s how to shop confidently and protect your money every time.',
        content: `
      <p>Pre-order shopping offers great deals but requires caution. Follow these 5 tips to stay safe:</p>
      
      <h2>1. Check the Vendor's Trust Score</h2>
      <p>Only order from vendors with a Trust Score of 80% or higher. This indicates reliable delivery history and positive customer feedback.</p>
      
      <h2>2. Read the Pre-Order Terms</h2>
      <p>Every pre-order has an estimated delivery window. Make sure you're comfortable with the timeline before paying.</p>
      
      <h2>3. Use VendorHub Escrow</h2>
      <p>Never pay outside the platform. VendorHub holds your payment securely until you confirm delivery.</p>
      
      <h2>4. Save Communication Records</h2>
      <p>Keep screenshots of product descriptions, delivery promises, and vendor messages. This helps if you need to open a dispute.</p>
      
      <h2>5. Know Your Dispute Window</h2>
      <p>You have 48 hours after the expected delivery date to open a dispute if your item doesn't arrive or doesn't match the description.</p>
      
      <blockquote>"Pre-orders are a great way to get exclusive items early — just shop smart."</blockquote>
      
      <p>Ready to shop with confidence? <a href="/shop">Browse verified vendors</a> on VendorHub today.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
        category: 'Trust & Safety',
        categoryColor: 'success',
        author: {
            type: 'platform',
            name: 'VendorHub Team',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=VH',
            bio: 'The VendorHub editorial team shares tips, guides, and updates to help you shop and sell with confidence.'
        },
        publishedAt: new Date('2026-01-20T14:30:00Z'),
        updatedAt: new Date('2026-01-20T14:30:00Z'),
        readTime: 5,
        views: 5670,
        linkedProducts: [],
        linkedShop: null,
        tags: ['tips', 'safety', 'pre-order', 'buyer-guide', 'escrow'],
        featured: false,
        status: 'published'
    },
    {
        id: 'post-003',
        slug: 'amina-fashion-spring-collection',
        title: 'Amina Fashion Unveils Spring Collection: Sustainable Styles',
        excerpt: 'Eco-friendly fabrics, timeless designs, and ethical production — discover the new spring lineup.',
        content: `
      <p>Amina Fashion is leading the sustainable fashion movement in Nigeria with their new Spring 2026 Collection.</p>
      
      <h2>Eco-Friendly Materials</h2>
      <p>Every piece in this collection uses organic cotton, recycled polyester, or locally-sourced fabrics. No harmful dyes, no waste.</p>
      
      <h2>Timeless Designs</h2>
      <p>Instead of fast fashion trends, Amina focuses on versatile pieces that last seasons — not just weeks.</p>
      
      <h2>Ethical Production</h2>
      <p>Every garment is made by skilled artisans in Lagos, paid fair wages in safe working conditions.</p>
      
      <h2>Pre-Order Exclusive</h2>
      <p>Spring pieces are available for pre-order now with 10% off for early supporters. Expected delivery: March 2026.</p>
      
      <blockquote>"Fashion should look good, feel good, and do good. That's the Amina promise."</blockquote>
      
      <p>Explore the collection at <a href="/shop/amina-fashion">Amina Fashion</a> on VendorHub.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        category: 'Vendor Updates',
        categoryColor: 'purple',
        author: {
            type: 'vendor',
            vendorSlug: 'amina-fashion',
            vendorName: 'Amina Fashion',
            vendorLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=AF',
            vendorVerified: true,
            trustScore: 92,
            vendorBio: 'Amina Fashion creates sustainable, ethically-made clothing for the modern Nigerian woman. Based in Lagos, shipping nationwide.'
        },
        publishedAt: new Date('2026-01-18T09:00:00Z'),
        updatedAt: new Date('2026-01-18T09:00:00Z'),
        readTime: 3,
        views: 1890,
        linkedProducts: [
            {
                id: 'p_003',
                code: 'AF-DR-001',
                vendorId: 'v_003',
                name: 'Organic Cotton Dress',
                description: 'Elegant and sustainable organic cotton dress.',
                price: 12000,
                oldPrice: null,
                currency: 'NGN',
                images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f'],
                preorder: true,
                sale: false,
                new: true,
                rating: 4.9,
                reviewCount: 67,
                stockStatus: 'preorder' as StockStatus,
                preorderNote: 'Expected delivery: March 2026',
                category: 'Fashion',
                createdAt: new Date()
            }
        ],
        linkedShop: {
            slug: 'amina-fashion',
            name: 'Amina Fashion',
            logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AF',
            trustScore: 92
        },
        tags: ['fashion', 'sustainable', 'spring', 'ethical', 'pre-order'],
        featured: false,
        status: 'published'
    },
    {
        id: 'post-004',
        slug: 'how-trust-score-works',
        title: 'Understanding Your Trust Score: A Complete Guide',
        excerpt: 'Learn how VendorHub calculates Trust Scores and how vendors can improve their ratings.',
        content: `
      <p>Trust Score is VendorHub's transparent system for measuring vendor reliability. Here's exactly how it works.</p>
      
      <h2>How Trust Score Is Calculated</h2>
      <p>Your Trust Score (0-100) is a weighted average of five key metrics:</p>
      
      <ul>
        <li><strong>Delivery Success Rate (30%)</strong> — Percentage of orders delivered on time without issues</li>
        <li><strong>Customer Reviews (25%)</strong> — Average rating from verified buyer feedback</li>
        <li><strong>Order Completion Rate (20%)</strong> — Percentage of orders that aren't cancelled</li>
        <li><strong>Response Time (15%)</strong> — How quickly you reply to customer messages</li>
        <li><strong>Dispute History (10%)</strong> — Number and outcome of disputes involving your shop</li>
      </ul>
      
      <h2>What Each Score Range Means</h2>
      <ul>
        <li><strong>90-100 (Excellent)</strong> — Top-tier vendor with exceptional reliability</li>
        <li><strong>80-89 (Great)</strong> — Reliable vendor with minor room for improvement</li>
        <li><strong>70-79 (Good)</strong> — Decent vendor; monitor metrics to improve</li>
        <li><strong>60-69 (Fair)</strong> — Needs attention; focus on delivery and communication</li>
        <li><strong>Below 60 (Needs Improvement)</strong> — High risk; address issues promptly</li>
      </ul>
      
      <h2>How to Improve Your Trust Score</h2>
      <ol>
        <li>Ship orders on time and upload tracking info promptly</li>
        <li>Respond to customer messages within 24 hours</li>
        <li>Resolve issues proactively before they become disputes</li>
        <li>Encourage satisfied customers to leave reviews</li>
        <li>Keep product descriptions accurate to avoid returns</li>
      </ol>
      
      <blockquote>"Trust isn't given — it's earned. Every order is a chance to build yours."</blockquote>
      
      <p>Check your Trust Score anytime in your <a href="/dashboard">Vendor Dashboard</a>.</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        category: 'Tips',
        categoryColor: 'blue',
        author: {
            type: 'platform',
            name: 'VendorHub Team',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=VH',
            bio: 'The VendorHub editorial team shares tips, guides, and updates to help you shop and sell with confidence.'
        },
        publishedAt: new Date('2026-01-15T11:00:00Z'),
        updatedAt: new Date('2026-01-15T11:00:00Z'),
        readTime: 6,
        views: 8920,
        linkedProducts: [],
        linkedShop: null,
        tags: ['trust-score', 'vendor-guide', 'transparency', 'algorithm', 'tips'],
        featured: true,
        status: 'published'
    }
];

// Helper: Get related posts based on category and tags
function getRelatedPosts(currentPost: any, limit: number = 3) {
    return mockPosts
        .filter((post) => {
            // Exclude current post
            if (post.id === currentPost.id) return false;
            // Must be published
            if (post.status !== 'published') return false;
            // Match category OR at least one tag
            const sameCategory = post.category === currentPost.category;
            const matchingTags = currentPost.tags?.some((tag: string) =>
                post.tags?.includes(tag)
            );
            return sameCategory || matchingTags;
        })
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
}

// Helper: Format date for SEO
function formatISODate(date: Date) {
    return date.toISOString().split('T')[0];
}

// Helper: Generate SEO metadata
function generateSEO(post: any) {
    const siteName = 'VendorHub';
    const siteUrl = 'https://vendorhub.com';

    return {
        title: `${post.title} | ${siteName} Blog`,
        description: post.excerpt,
        canonical: `${siteUrl}/blog/${post.slug}`,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            url: `${siteUrl}/blog/${post.slug}`,
            image: post.coverImage,
            siteName,
            article: {
                publishedTime: post.publishedAt.toISOString(),
                modifiedTime: post.updatedAt.toISOString(),
                author: post.author.type === 'vendor'
                    ? `${post.author.vendorName} (Vendor)`
                    : post.author.name,
                section: post.category,
                tags: post.tags
            }
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            image: post.coverImage,
            creator: '@vendorhub'
        },
        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage,
            datePublished: formatISODate(post.publishedAt),
            dateModified: formatISODate(post.updatedAt),
            author: {
                '@type': post.author.type === 'vendor' ? 'Organization' : 'Person',
                name: post.author.type === 'vendor' ? post.author.vendorName : post.author.name,
                url: post.author.type === 'vendor'
                    ? `${siteUrl}/vendor/${post.author.vendorSlug}`
                    : undefined
            },
            publisher: {
                '@type': 'Organization',
                name: siteName,
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/logo.png`
                }
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${siteUrl}/blog/${post.slug}`
            }
        }
    };
}

export const load: PageLoad = async ({ params, url }) => {
    const { slug } = params;

    // Find the post by slug
    const post = mockPosts.find((p) => p.slug === slug);

    // Handle 404
    if (!post || post.status !== 'published') {
        // Check if it's a draft/post that exists but isn't published
        const draftPost = mockPosts.find((p) => p.slug === slug);
        if (draftPost && draftPost.status !== 'published') {
            throw error(404, 'This article is not yet published');
        }
        throw error(404, 'Article not found');
    }

    // Increment view count (in real app: API call)
    // post.views += 1;

    // Get related posts
    const relatedPosts = getRelatedPosts(post, 3);

    // Generate SEO metadata
    const seo = generateSEO(post);

    return {
        post: {
            ...post,
            // Sanitize content if needed (remove scripts, etc.)
            content: post.content // In real app: use DOMPurify or similar
        },
        relatedPosts,
        meta: {
            title: seo.title,
            description: seo.description,
            excerpt: post.excerpt,
            ogImage: post.coverImage,
            canonical: seo.canonical,
            structuredData: seo.structuredData
        },
        // For breadcrumbs
        breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.category, href: `/blog?category=${post.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}` },
            { label: post.title, href: `/blog/${post.slug}`, current: true }
        ]
    };
};