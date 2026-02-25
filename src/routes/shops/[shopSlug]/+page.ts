// src/routes/shops/[shopSlug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Product } from '$lib/types';

// Mock shop data - Replace with real API
const mockShop = {
    id: 's_001',
    slug: 'urban-kicks-store',
    name: 'Urban Kicks Store',
    tagline: 'Premium Sneakers for the Modern Lifestyle',
    description: 'Urban Kicks Store is your destination for authentic, high-quality sneakers and footwear. We source directly from verified manufacturers and offer warranty on all products. Based in Lagos, we ship nationwide with secure payment protection through VendorHub.',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=UK',
    bannerUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Footwear',
    vendorId: 'v_001',
    vendorName: 'Kicks NG',
    vendorSlug: 'tech-deals-ng',
    vendorVerified: true,
    trustScore: 92,
    rating: 4.8,
    reviewCount: 320,
    orderCount: 3200,
    followers: 2300,
    location: 'Lagos, Nigeria',
    joinedAt: new Date('2024-03-15'),
    stats: {
        responseTime: '< 2 hours',
        processingTime: '1-2 days',
        returnPolicy: '7-day return policy',
        shippingTime: '2-5 business days'
    },
    socials: [
        { platform: 'instagram', url: 'https://instagram.com/urbankicks', handle: '@urbankicks' },
        { platform: 'whatsapp', url: 'https://wa.me/2348012345678', handle: '+234 801 234 5678' }
    ],
    ratingBreakdown: {
        5: 256,
        4: 48,
        3: 16,
        2: 0,
        1: 0
    }
};

// Mock products data
const mockProducts: Product[] = [
    {
        id: 'p_001',
        code: 'UK-AJ1-001',
        name: 'Air Jordan 1 Retro High',
        description: 'Classic basketball silhouette with premium leather upper.',
        price: 85000,
        oldPrice: 95000,
        currency: 'NGN',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
            'https://images.unsplash.com/photo-1549298916-b41d501d3772'
        ],
        category: 'Sneakers',
        stockStatus: 'in-stock',
        stockCount: 12,
        rating: 4.9,
        new: false,
        sale: true,
        preorder: false,
        vendorId: 'v_001',
        createdAt: new Date(),
        reviewCount: 45
    },
    {
        id: 'p_002',
        code: 'UK-NB550-002',
        name: 'New Balance 550 White',
        description: 'Retro basketball shoe with modern comfort technology.',
        price: 72000,
        oldPrice: null,
        currency: 'NGN',
        images: [
            'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2'
        ],
        category: 'Sneakers',
        stockStatus: 'in-stock',
        stockCount: 8,
        rating: 4.7,
        new: true,
        sale: false,
        preorder: false,
        vendorId: 'v_001',
        createdAt: new Date(),
        reviewCount: 32
    },
    {
        id: 'p_003',
        code: 'UK-ADY90-003',
        name: 'Adidas Yeezy Boost 350',
        description: 'Iconic silhouette with Primeknit upper and Boost cushioning.',
        price: 120000,
        oldPrice: 140000,
        currency: 'NGN',
        images: [
            'https://images.unsplash.com/photo-1584735175315-9d5df23860e6'
        ],
        category: 'Sneakers',
        stockStatus: 'preorder',
        stockCount: null,
        preorderNote: 'Expected delivery: 14-21 days',
        rating: 4.8,
        new: false,
        sale: true,
        preorder: true,
        vendorId: 'v_001',
        createdAt: new Date(),
        reviewCount: 67
    },
    {
        id: 'p_004',
        code: 'UK-NKAF1-004',
        name: 'Nike Air Force 1 White',
        description: 'Timeless classic with premium leather construction.',
        price: 65000,
        oldPrice: null,
        currency: 'NGN',
        images: [
            'https://images.unsplash.com/photo-1549298916-b41d501d3772'
        ],
        category: 'Sneakers',
        stockStatus: 'in-stock',
        stockCount: 20,
        rating: 4.6,
        new: false,
        sale: false,
        preorder: false,
        vendorId: 'v_001',
        createdAt: new Date(),
        reviewCount: 89
    },
    {
        id: 'p_005',
        code: 'UK-CNK700-005',
        name: 'Converse Chuck 70 High',
        description: 'Vintage basketball shoe with modern comfort upgrades.',
        price: 45000,
        oldPrice: 50000,
        currency: 'NGN',
        images: [
            'https://images.unsplash.com/photo-1491553895911-0055eca6402d'
        ],
        category: 'Sneakers',
        stockStatus: 'in-stock',
        stockCount: 15,
        rating: 4.5,
        new: false,
        sale: true,
        preorder: false,
        vendorId: 'v_001',
        createdAt: new Date(),
        reviewCount: 54
    },
    {
        id: 'p_006',
        code: 'UK-VNOLD-006',
        name: 'Vans Old Skool Black',
        description: 'Classic skate shoe with durable canvas and suede upper.',
        price: 38000,
        oldPrice: null,
        currency: 'NGN',
        images: [
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77'
        ],
        category: 'Sneakers',
        stockStatus: 'in-stock',
        stockCount: 25,
        rating: 4.7,
        new: true,
        sale: false,
        preorder: false,
        vendorId: 'v_001',
        createdAt: new Date(),
        reviewCount: 76
    },
    {
        id: 'p_007',
        code: 'UK-PUMA-007',
        name: 'Puma RS-X Toys',
        description: 'Bold colorway with running-inspired design.',
        price: 55000,
        oldPrice: null,
        currency: 'NGN',
        images: [
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5'
        ],
        category: 'Sneakers',
        stockStatus: 'in-stock',
        stockCount: 10,
        rating: 4.4,
        new: false,
        sale: false,
        preorder: false,
        vendorId: 'v_001',
        createdAt: new Date(),
        reviewCount: 28
    },
    {
        id: 'p_008',
        code: 'UK-RBK-008',
        name: 'Reebok Club C 85',
        description: 'Minimalist tennis-inspired sneaker with soft leather upper.',
        price: 48000,
        oldPrice: 55000,
        currency: 'NGN',
        images: [
            'https://images.unsplash.com/photo-1584735175315-9d5df23860e6'
        ],
        category: 'Sneakers',
        stockStatus: 'in-stock',
        stockCount: 18,
        rating: 4.6,
        vendorId: 'v_001',
        createdAt: new Date(),
        reviewCount: 41,
        featured: false,
        new: false,
        sale: true,
        preorder: false
    }
];

// Mock reviews data
const mockReviews = [
    {
        id: 'r_001',
        customerName: 'Chidi O.',
        customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CO',
        rating: 5,
        text: 'Amazing quality! The sneakers arrived exactly as pictured. Delivery was fast and the packaging was secure. Will definitely order again.',
        date: new Date('2025-06-10'),
        verified: true,
        productPurchased: 'Air Jordan 1 Retro High',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff']
    },
    {
        id: 'r_002',
        customerName: 'Amina K.',
        customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AK',
        rating: 5,
        text: 'Best sneaker shop on VendorHub! Authentic products and great customer service. Highly recommend.',
        date: new Date('2025-06-08'),
        verified: true,
        productPurchased: 'New Balance 550 White',
        images: []
    },
    {
        id: 'r_003',
        customerName: 'Tunde M.',
        customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TM',
        rating: 4,
        text: 'Good quality but delivery took a bit longer than expected. Overall satisfied with my purchase.',
        date: new Date('2025-06-05'),
        verified: true,
        productPurchased: 'Nike Air Force 1 White',
        images: []
    }
];

export const load: PageLoad = async ({ params, url }) => {
    const shop = mockShop;

    if (!shop) {
        throw error(404, 'Shop not found');
    }

    // Get query params for filtering
    const category = url.searchParams.get('category') || '';
    const minPrice = url.searchParams.get('minPrice') || '';
    const maxPrice = url.searchParams.get('maxPrice') || '';
    const availability = url.searchParams.get('availability') || '';
    const sortBy = url.searchParams.get('sort') || 'newest';

    // Filter products
    let products = mockProducts.filter((product) => {
        const matchesCategory = category ? product.category === category : true;
        const matchesMinPrice = minPrice ? product.price >= parseInt(minPrice) : true;
        const matchesMaxPrice = maxPrice ? product.price <= parseInt(maxPrice) : true;
        const matchesAvailability = availability === 'in-stock' ? product.stockStatus === 'in-stock' :
            availability === 'preorder' ? product.stockStatus === 'preorder' : true;
        return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesAvailability;
    });

    // Sort products
    products.sort((a, b) => {
        switch (sortBy) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            case 'newest': return new Date(b.id).getTime() - new Date(a.id).getTime();
            default: return 0;
        }
    });

    // Get featured products
    const featuredProducts = mockProducts.filter((p) => p.featured).slice(0, 6);

    // Get unique categories
    const categories = Array.from(
        new Set(mockProducts.map((p) => p.category))
    );

    return {
        shop,
        products,
        totalProducts: products.length,
        featuredProducts,
        categories,
        reviews: mockReviews,
        filters: { category, minPrice, maxPrice, availability, sortBy },
        meta: {
            title: `${shop.name} | VendorHub`,
            description: shop.description,
            ogImage: shop.bannerUrl
        }
    };
};