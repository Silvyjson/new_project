// src/routes/vendors/+page.ts
import type { PageLoad } from './$types';

// Mock vendor data - Replace with real API call
const mockVendors = [
    {
        id: 'v_001',
        slug: 'amina-fashion',
        name: 'Amina Fashion',
        bio: 'Premium handmade clothing & accessories. Lagos-based, shipping worldwide.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AF',
        coverUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        verified: true,
        trustScore: 94,
        location: 'Lagos, Nigeria',
        joinedAt: new Date('2023-06-15'),
        categories: ['Fashion', 'Accessories'],
        shopCount: 3,
        stats: {
            totalProducts: 156,
            totalSales: 2340,
            avgRating: 4.8,
            reviewCount: 312,
            responseTimeHours: 2
        }
    },
    {
        id: 'v_002',
        slug: 'tech-deals-ng',
        name: 'Tech Deals NG',
        bio: 'Authentic gadgets & electronics. Warranty included on all items.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TD',
        coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        verified: true,
        trustScore: 89,
        location: 'Abuja, Nigeria',
        joinedAt: new Date('2023-08-20'),
        categories: ['Electronics', 'Gadgets'],
        shopCount: 2,
        stats: {
            totalProducts: 89,
            totalSales: 1560,
            avgRating: 4.6,
            reviewCount: 203,
            responseTimeHours: 4
        }
    },
    {
        id: 'v_003',
        slug: 'beauty-box',
        name: 'Beauty Box',
        bio: 'Organic skincare & makeup. Cruelty-free products only.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=BB',
        coverUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348',
        verified: true,
        trustScore: 96,
        location: 'Port Harcourt, Nigeria',
        joinedAt: new Date('2023-04-10'),
        categories: ['Beauty', 'Skincare'],
        shopCount: 1,
        stats: {
            totalProducts: 67,
            totalSales: 3100,
            avgRating: 4.9,
            reviewCount: 445,
            responseTimeHours: 1
        }
    },
    {
        id: 'v_004',
        slug: 'home-essentials',
        name: 'Home Essentials',
        bio: 'Quality home decor & kitchen items. Making homes beautiful.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HE',
        coverUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
        verified: false,
        trustScore: 72,
        location: 'Kano, Nigeria',
        joinedAt: new Date('2024-01-05'),
        categories: ['Home', 'Decor'],
        shopCount: 1,
        stats: {
            totalProducts: 45,
            totalSales: 230,
            avgRating: 4.3,
            reviewCount: 67,
            responseTimeHours: 8
        }
    },
    {
        id: 'v_005',
        slug: 'fit-life-store',
        name: 'Fit Life Store',
        bio: 'Sports equipment, supplements & activewear. Live healthier.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=FL',
        coverUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        verified: true,
        trustScore: 87,
        location: 'Lagos, Nigeria',
        joinedAt: new Date('2023-09-12'),
        categories: ['Sports', 'Health'],
        shopCount: 2,
        stats: {
            totalProducts: 112,
            totalSales: 890,
            avgRating: 4.5,
            reviewCount: 156,
            responseTimeHours: 3
        }
    },
    {
        id: 'v_006',
        slug: 'kids-corner',
        name: 'Kids Corner',
        bio: 'Toys, clothing & accessories for children. Safe & fun products.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=KC',
        coverUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
        verified: true,
        trustScore: 91,
        location: 'Ibadan, Nigeria',
        joinedAt: new Date('2023-07-22'),
        categories: ['Kids', 'Toys'],
        shopCount: 1,
        stats: {
            totalProducts: 78,
            totalSales: 1200,
            avgRating: 4.7,
            reviewCount: 189,
            responseTimeHours: 2
        }
    }
];

export const load: PageLoad = async ({ url }) => {
    // Get query params for filtering
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';
    const minTrustScore = url.searchParams.get('minTrust') || '';
    const verifiedOnly = url.searchParams.get('verified') === 'true';
    const sortBy = url.searchParams.get('sort') || 'trustScore';

    // Filter vendors based on params
    let filteredVendors = mockVendors.filter((vendor) => {
        const matchesSearch =
            vendor.name.toLowerCase().includes(search.toLowerCase()) ||
            vendor.bio.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category ? vendor.categories.includes(category) : true;
        const matchesTrustScore = minTrustScore ? vendor.trustScore >= parseInt(minTrustScore) : true;
        const matchesVerified = verifiedOnly ? vendor.verified : true;

        return matchesSearch && matchesCategory && matchesTrustScore && matchesVerified;
    });

    // Sort vendors
    filteredVendors.sort((a, b) => {
        switch (sortBy) {
            case 'trustScore':
                return b.trustScore - a.trustScore;
            case 'rating':
                return b.stats.avgRating - a.stats.avgRating;
            case 'sales':
                return b.stats.totalSales - a.stats.totalSales;
            case 'newest':
                return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
            default:
                return 0;
        }
    });

    // Get unique categories for filter dropdown
    const categories = Array.from(
        new Set(mockVendors.flatMap((v) => v.categories))
    ).sort();

    return {
        vendors: filteredVendors,
        totalVendors: mockVendors.length,
        categories,
        filters: {
            search,
            category,
            minTrustScore,
            verifiedOnly,
            sortBy
        },
        stats: {
            verifiedVendors: mockVendors.filter((v) => v.verified).length,
            activeShops: mockVendors.reduce((acc, v) => acc + v.shopCount, 0),
            successRate: 98,
            securedAmount: '₦150M+'
        },
        meta: {
            title: 'Explore Trusted Vendors | VendorHub',
            description: 'Find verified sellers with transparent trust scores and secure payments — all in one trusted marketplace.'
        }
    };
};