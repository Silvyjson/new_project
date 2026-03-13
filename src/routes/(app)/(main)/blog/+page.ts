// src/routes/blog/+page.ts
import type { PageLoad } from './$types';

// Mock blog posts data
const mockPosts = [
    {
        id: 'post-001',
        slug: 'techstoreng-2026-collection-launch',
        title: 'How TechStoreNG Just Launched Their 2026 Collection',
        excerpt: 'Discover the latest gadgets, exclusive pre-orders, and limited-edition tech drops from one of our top-rated vendors.',
        content: `
      <p>After months of anticipation, TechStoreNG has officially unveiled their 2026 Collection - a curated lineup of premium electronics designed for the modern Nigerian lifestyle.</p>
      
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
    `,
        coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        category: 'New Releases',
        categoryColor: 'indigo',
        author: {
            type: 'vendor',
            name: 'TechStoreNG',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TS',
        },
        publishedAt: new Date('2026-01-25'),
        readTime: 4,
        views: 2340,
        linkedProducts: [
            { id: 'p_001', name: 'Wireless Earbuds Pro', price: 25000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df' },
            { id: 'p_002', name: 'Solar Power Bank 20K', price: 18000, image: 'https://images.unsplash.com/photo-1609081219090-a66920c72123' }
        ],
        linkedShop: { slug: 'techstoreng', name: 'TechStoreNG' },
        tags: ['tech', 'gadgets', 'pre-order', '2026'],
        featured: true,
        likes: 124,
        comments: []
    },
    {
        id: 'post-002',
        slug: '5-tips-for-safe-preorder-shopping',
        title: '5 Tips for Safe Pre-Order Shopping on VendorHub',
        excerpt: 'Pre-orders can be tricky. Here\'s how to shop confidently and protect your money every time.',
        content: '<p>Pre-order shopping offers great deals but requires caution. Follow these 5 tips to stay safe...</p>',
        coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
        category: 'Trust & Safety',
        categoryColor: 'success',
        author: {
            type: 'platform',
            name: 'VendorHub Team',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=VH'
        },
        publishedAt: new Date('2026-01-20'),
        readTime: 5,
        views: 5670,
        linkedProducts: [],
        linkedShop: null,
        tags: ['tips', 'safety', 'pre-order', 'buyer-guide'],
        featured: false,
        likes: 85,
        comments: []
    },
    {
        id: 'post-003',
        slug: 'amina-fashion-spring-collection',
        title: 'Amina Fashion Unveils Spring Collection: Sustainable Styles',
        excerpt: 'Eco-friendly fabrics, timeless designs, and ethical production - discover the new spring lineup.',
        content: '<p>Amina Fashion is leading the sustainable fashion movement in Nigeria...</p>',
        coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        category: 'Vendor Updates',
        categoryColor: 'purple',
        author: {
            type: 'vendor',
            name: 'Amina Fashion',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AF',
        },
        publishedAt: new Date('2026-01-18'),
        readTime: 3,
        views: 1890,
        linkedProducts: [
            { id: 'p_003', name: 'Organic Cotton Dress', price: 12000, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f' }
        ],
        linkedShop: { slug: 'amina-fashion', name: 'Amina Fashion' },
        tags: ['fashion', 'sustainable', 'spring', 'ethical'],
        featured: false,
        likes: 64,
        comments: []
    },
    {
        id: 'post-004',
        slug: 'how-trust-score-works',
        title: 'Understanding Your Trust Score: A Complete Guide',
        excerpt: 'Learn how VendorHub calculates Trust Scores and how vendors can improve their ratings.',
        content: '<p>Trust Score is VendorHub\'s transparent system for measuring vendor reliability...</p>',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        category: 'Tips',
        categoryColor: 'blue',
        author: {
            type: 'platform',
            name: 'VendorHub Team',
            logo: 'https://api.dicebear.com/7.x/initials/svg?seed=VH'
        },
        publishedAt: new Date('2026-01-15'),
        readTime: 6,
        views: 8920,
        linkedProducts: [],
        linkedShop: null,
        tags: ['trust-score', 'vendor-guide', 'transparency', 'algorithm'],
        featured: true,
        likes: 156,
        comments: []
    }
];

// Categories
const categories = [
    { id: 'all', label: 'All', color: 'gray' },
    { id: 'new-releases', label: 'New Releases', color: 'indigo' },
    { id: 'vendor-updates', label: 'Vendor Updates', color: 'purple' },
    { id: 'tips', label: 'Tips', color: 'blue' },
    { id: 'trust-safety', label: 'Trust & Safety', color: 'success' }
];

// Vendors for filter
const vendors = [
    { slug: 'techstoreng', name: 'TechStoreNG', trustScore: 94 },
    { slug: 'amina-fashion', name: 'Amina Fashion', trustScore: 92 },
    { slug: 'beauty-hub-ng', name: 'Beauty Hub NG', trustScore: 89 },
    { slug: 'home-essentials', name: 'Home Essentials', trustScore: 91 }
];

export const load: PageLoad = async ({ url }) => {
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || 'all';
    const vendor = url.searchParams.get('vendor') || '';
    const sortBy = url.searchParams.get('sort') || 'recent';

    // Filter posts
    let posts = mockPosts.filter((post) => {
        const matchesSearch = search === '' ||
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' ||
            post.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === category;
        return matchesSearch && matchesCategory;
    });

    // Sort posts
    posts.sort((a, b) => {
        if (sortBy === 'recent') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        if (sortBy === 'popular') return b.views - a.views;
        if (sortBy === 'read-time') return a.readTime - b.readTime;
        return 0;
    });

    // Featured posts
    const featuredPosts = mockPosts.filter((p) => p.featured).slice(0, 1);

    return {
        posts,
        categories,
        vendors,
        featuredPosts,
        filters: { search, category, vendor, sortBy },
        meta: {
            title: 'VendorHub Blog | Discover New Releases & Vendor Updates',
            description: 'Read the latest from VendorHub vendors: product launches, tips, trust guides, and exclusive updates.'
        }
    };
};