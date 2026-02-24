// src/routes/shops/+page.ts
import type { PageLoad } from './$types';

// Mock shop data - Replace with real API call
const mockShops = [
    {
        id: 's_001',
        slug: 'urban-kicks-store',
        name: 'Urban Kicks Store',
        description: 'Premium sneakers and footwear for the modern lifestyle.',
        category: 'Footwear',
        vendorId: 'v_001',
        vendorName: 'Kicks NG',
        vendorVerified: true,
        bannerUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=UK',
        trustScore: 92,
        rating: 4.8,
        productCount: 250,
        orderCount: 1200,
        followers: 2300,
        location: 'Lagos, Nigeria',
        verified: true,
        lastUpdated: new Date('2025-06-15')
    },
    {
        id: 's_002',
        slug: 'glam-beauty-hub',
        name: 'Glam Beauty Hub',
        description: 'Organic skincare and makeup products for all skin types.',
        category: 'Beauty',
        vendorId: 'v_002',
        vendorName: 'Beauty Co',
        vendorVerified: true,
        bannerUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GB',
        trustScore: 96,
        rating: 4.9,
        productCount: 180,
        orderCount: 2100,
        followers: 3400,
        location: 'Abuja, Nigeria',
        verified: true,
        lastUpdated: new Date('2025-06-14')
    },
    {
        id: 's_003',
        slug: 'tech-gadgets-pro',
        name: 'Tech Gadgets Pro',
        description: 'Authentic electronics and gadgets with warranty.',
        category: 'Electronics',
        vendorId: 'v_003',
        vendorName: 'Tech Hub NG',
        vendorVerified: true,
        bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TG',
        trustScore: 89,
        rating: 4.7,
        productCount: 320,
        orderCount: 890,
        followers: 1800,
        location: 'Port Harcourt, Nigeria',
        verified: true,
        lastUpdated: new Date('2025-06-13')
    },
    {
        id: 's_004',
        slug: 'fashion-forward-ng',
        name: 'Fashion Forward NG',
        description: 'Trendy clothing and accessories for men and women.',
        category: 'Fashion',
        vendorId: 'v_004',
        vendorName: 'Fashion Hub',
        vendorVerified: false,
        bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=FF',
        trustScore: 78,
        rating: 4.5,
        productCount: 420,
        orderCount: 650,
        followers: 1200,
        location: 'Kano, Nigeria',
        verified: false,
        lastUpdated: new Date('2025-06-12')
    },
    {
        id: 's_005',
        slug: 'home-essentials-store',
        name: 'Home Essentials Store',
        description: 'Quality home decor and kitchen items for modern living.',
        category: 'Home',
        vendorId: 'v_005',
        vendorName: 'Home Co',
        vendorVerified: true,
        bannerUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HE',
        trustScore: 94,
        rating: 4.8,
        productCount: 280,
        orderCount: 1100,
        followers: 2100,
        location: 'Ibadan, Nigeria',
        verified: true,
        lastUpdated: new Date('2025-06-11')
    },
    {
        id: 's_006',
        slug: 'luxury-collection-ng',
        name: 'Luxury Collection NG',
        description: 'Exclusive designer items and premium fashion pieces.',
        category: 'Luxury',
        vendorId: 'v_006',
        vendorName: 'Luxury Brands',
        vendorVerified: true,
        bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=LC',
        trustScore: 97,
        rating: 4.9,
        productCount: 95,
        orderCount: 560,
        followers: 4200,
        location: 'Lagos, Nigeria',
        verified: true,
        lastUpdated: new Date('2025-06-10')
    },
    {
        id: 's_007',
        slug: 'kids-world-store',
        name: 'Kids World Store',
        description: 'Toys, clothing and accessories for children of all ages.',
        category: 'Kids',
        vendorId: 'v_007',
        vendorName: 'Kids Co',
        vendorVerified: true,
        bannerUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=KW',
        trustScore: 91,
        rating: 4.7,
        productCount: 340,
        orderCount: 980,
        followers: 1900,
        location: 'Enugu, Nigeria',
        verified: true,
        lastUpdated: new Date('2025-06-09')
    },
    {
        id: 's_008',
        slug: 'accessories-plus',
        name: 'Accessories Plus',
        description: 'Bags, jewelry, belts and fashion accessories.',
        category: 'Accessories',
        vendorId: 'v_008',
        vendorName: 'Accessories Hub',
        vendorVerified: false,
        bannerUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AP',
        trustScore: 82,
        rating: 4.6,
        productCount: 210,
        orderCount: 720,
        followers: 1500,
        location: 'Lagos, Nigeria',
        verified: false,
        lastUpdated: new Date('2025-06-08')
    }
];

export const load: PageLoad = async ({ url }) => {
    // Get query params for filtering
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';
    const minTrustScore = url.searchParams.get('minTrust') || '';
    const minRating = url.searchParams.get('minRating') || '';
    const verifiedOnly = url.searchParams.get('verified') === 'true';
    const sortBy = url.searchParams.get('sort') || 'trustScore';

    // Filter shops based on params
    let filteredShops = mockShops.filter((shop) => {
        const matchesSearch =
            shop.name.toLowerCase().includes(search.toLowerCase()) ||
            shop.description.toLowerCase().includes(search.toLowerCase()) ||
            shop.category.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category ? shop.category === category : true;
        const matchesTrustScore = minTrustScore ? shop.trustScore >= parseInt(minTrustScore) : true;
        const matchesRating = minRating ? shop.rating >= parseFloat(minRating) : true;
        const matchesVerified = verifiedOnly ? shop.verified : true;

        return matchesSearch && matchesCategory && matchesTrustScore && matchesRating && matchesVerified;
    });

    // Sort shops
    filteredShops.sort((a, b) => {
        switch (sortBy) {
            case 'trustScore':
                return b.trustScore - a.trustScore;
            case 'rating':
                return b.rating - a.rating;
            case 'products':
                return b.productCount - a.productCount;
            case 'popular':
                return b.followers - a.followers;
            case 'orders':
                return b.orderCount - a.orderCount;
            case 'newest':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            default:
                return 0;
        }
    });

    // Get unique categories for filter dropdown
    const categories = Array.from(
        new Set(mockShops.map((s) => s.category))
    ).sort();

    return {
        shops: filteredShops,
        totalShops: mockShops.length,
        categories,
        filters: {
            search,
            category,
            minTrustScore,
            minRating,
            verifiedOnly,
            sortBy
        },
        trendingShops: mockShops.slice(0, 4), // Top 4 for trending section
        meta: {
            title: 'Discover Trusted Shops | VendorHub',
            description: 'Browse verified shops with transparent trust scores and secure checkout protection.'
        }
    };
};