// src/routes/vendors/[vendorSlug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

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
        eliteVendor: true,
        trustScore: 94,
        location: 'Lagos, Nigeria',
        joinedAt: new Date('2023-06-15'),
        categories: ['Fashion', 'Accessories'],
        shopCount: 3,
        totalOrders: 1200,
        stats: {
            totalProducts: 156,
            totalSales: 2340,
            avgRating: 4.8,
            reviewCount: 312,
            responseTimeHours: 2,
            processingTimeDays: 3,
            deliverySuccessRate: 95,
            onTimeFulfillment: 90,
            disputesResolved: 100,
            returnPolicy: '7-day return'
        },
        socials: [
            { platform: 'instagram', url: 'https://instagram.com/aminafashion', handle: '@aminafashion' },
            { platform: 'whatsapp', url: 'https://wa.me/2348012345678', handle: '+234 801 234 5678' },
            { platform: 'twitter', url: 'https://twitter.com/aminafashion', handle: '@aminafashion' },
            { platform: 'tiktok', url: 'https://tiktok.com/@aminafashion', handle: '@aminafashion' }
        ],
        shops: [
            { id: 's_001', slug: 'amina-fashion-main', name: 'Amina Fashion Main', category: 'Fashion', trustScore: 94, productCount: 89, customers: 2340, orderCount: 1450, rating: 4.8, reviewCount: 450, bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' },
            { id: 's_002', slug: 'amina-fashion-accessories', name: 'Amina Accessories', category: 'Accessories', trustScore: 91, productCount: 45, customers: 1200, orderCount: 4500, rating: 4.7, reviewCount: 380, bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' },
            { id: 's_003', slug: 'amina-fashion-handmade', name: 'Amina Handmade', category: 'Accessories', trustScore: 96, productCount: 22, customers: 890, orderCount: 4520, rating: 4.9, reviewCount: 240, bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8' }
        ],
        reviews: [
            { id: 'r_001', customerName: 'Chioma O.', customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CO', orderCount: 2450, rating: 5, text: 'Absolutely love my purchase! Quality is amazing.', date: new Date('2023-07-10'), verified: true, images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105'] },
            { id: 'r_002', customerName: 'Ahmed K.', customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AK', orderCount: 1450, rating: 5, text: 'Best vendor! Communication was great.', date: new Date('2023-07-08'), verified: true, images: [] }
        ],
        verificationBadges: { idVerified: true, bankVerified: true, businessDocument: true }
    },

    {
        id: 'v_002',
        slug: 'tech-deals-ng',
        name: 'Tech Deals NG',
        bio: 'Authentic gadgets & electronics. Warranty included on all items.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TD',
        coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        verified: true,
        eliteVendor: false,
        trustScore: 89,
        location: 'Abuja, Nigeria',
        joinedAt: new Date('2023-08-20'),
        categories: ['Electronics', 'Gadgets'],
        shopCount: 2,
        totalOrders: 800,
        stats: {
            totalProducts: 89,
            totalSales: 1560,
            avgRating: 4.6,
            reviewCount: 203,
            responseTimeHours: 4,
            processingTimeDays: 5,
            deliverySuccessRate: 92,
            onTimeFulfillment: 85,
            disputesResolved: 90,
            returnPolicy: '14-day return'
        },
        socials: [
            { platform: 'instagram', url: 'https://instagram.com/techdealsng', handle: '@techdealsng' },
            { platform: 'whatsapp', url: 'https://wa.me/2348012345678', handle: '+234 801 234 5678' },
            { platform: 'twitter', url: 'https://twitter.com/techdealsng', handle: '@techdealsng' }
        ],
        shops: [
            { id: 's_004', slug: 'tech-deals-ng-main', name: 'Tech Deals Main', category: 'Electronics', trustScore: 89, productCount: 50, customers: 1500, orderCount: 1150, rating: 4.6, reviewCount: 150, bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' },
            { id: 's_005', slug: 'tech-deals-ng-gadgets', name: 'Tech Gadgets', category: 'Gadgets', trustScore: 87, productCount: 39, customers: 800, orderCount: 2250, rating: 4.5, reviewCount: 120, bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' }
        ],
        reviews: [
            { id: 'r_003', customerName: 'Binta L.', customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BL', orderCount: 2150, rating: 5, text: 'Amazing gadgets! Fast shipping.', date: new Date('2023-09-01'), verified: true, images: [] },
            { id: 'r_004', customerName: 'Emeka A.', customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EA', orderCount: 950, rating: 4, text: 'Good products, slightly delayed delivery.', date: new Date('2023-09-02'), verified: true, images: [] }
        ],
        verificationBadges: { idVerified: true, bankVerified: true, businessDocument: true }
    },

    {
        id: 'v_003',
        slug: 'beauty-box',
        name: 'Beauty Box',
        bio: 'Organic skincare & makeup. Cruelty-free products only.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=BB',
        coverUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348',
        verified: true,
        eliteVendor: true,
        trustScore: 96,
        location: 'Port Harcourt, Nigeria',
        joinedAt: new Date('2023-04-10'),
        categories: ['Beauty', 'Skincare'],
        shopCount: 1,
        totalOrders: 1450,
        stats: {
            totalProducts: 67,
            totalSales: 3100,
            avgRating: 4.9,
            reviewCount: 445,
            responseTimeHours: 1,
            processingTimeDays: 2,
            deliverySuccessRate: 97,
            onTimeFulfillment: 95,
            disputesResolved: 98,
            returnPolicy: '7-day return'
        },
        socials: [
            { platform: 'instagram', url: 'https://instagram.com/beautybox', handle: '@beautybox' },
            { platform: 'whatsapp', url: 'https://wa.me/2348012345678', handle: '+234 801 234 5678' },
            { platform: 'twitter', url: 'https://twitter.com/beautybox', handle: '@beautybox' }
        ],
        shops: [
            { id: 's_006', slug: 'beauty-box-main', name: 'Beauty Box Main', category: 'Beauty', trustScore: 96, productCount: 67, customers: 2100, orderCount: 750, rating: 4.9, reviewCount: 180, bannerUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348' }
        ],
        reviews: [
            { id: 'r_005', customerName: 'Blessing M.', customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BM', orderCount: 1150, rating: 5, text: 'Love the skincare products!', date: new Date('2023-05-01'), verified: true, images: [] }
        ],
        verificationBadges: { idVerified: true, bankVerified: true, businessDocument: true }
    },

    {
        id: 'v_004',
        slug: 'home-essentials',
        name: 'Home Essentials',
        bio: 'Quality home decor & kitchen items. Making homes beautiful.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HE',
        coverUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
        verified: false,
        eliteVendor: false,
        trustScore: 72,
        location: 'Kano, Nigeria',
        joinedAt: new Date('2024-01-05'),
        categories: ['Home', 'Decor'],
        shopCount: 1,
        totalOrders: 250,
        stats: {
            totalProducts: 45,
            totalSales: 230,
            avgRating: 4.3,
            reviewCount: 67,
            responseTimeHours: 8,
            processingTimeDays: 7,
            deliverySuccessRate: 88,
            onTimeFulfillment: 80,
            disputesResolved: 60,
            returnPolicy: '14-day return'
        },
        socials: [
            { platform: 'instagram', url: 'https://instagram.com/homeessentials', handle: '@homeessentials' },
            { platform: 'whatsapp', url: 'https://wa.me/2348012345678', handle: '+234 801 234 5678' }
        ],
        shops: [
            { id: 's_007', slug: 'home-essentials-main', name: 'Home Essentials Main', category: 'Home', trustScore: 72, productCount: 45, customers: 650, orderCount: 450, rating: 4.3, reviewCount: 210, bannerUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba' }
        ],
        reviews: [
            { id: 'r_006', customerName: 'Fatima S.', customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FS', orderCount: 1850, rating: 4, text: 'Good home items, delivery was okay.', date: new Date('2024-01-20'), verified: true, images: [] }
        ],
        verificationBadges: { idVerified: true, bankVerified: false, businessDocument: false }
    },

    {
        id: 'v_005',
        slug: 'fit-life-store',
        name: 'Fit Life Store',
        bio: 'Sports equipment, supplements & activewear. Live healthier.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=FL',
        coverUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        verified: true,
        eliteVendor: true,
        trustScore: 87,
        location: 'Lagos, Nigeria',
        joinedAt: new Date('2023-09-12'),
        categories: ['Sports', 'Health'],
        shopCount: 2,
        totalOrders: 900,
        stats: {
            totalProducts: 112,
            totalSales: 890,
            avgRating: 4.5,
            reviewCount: 156,
            responseTimeHours: 3,
            processingTimeDays: 4,
            deliverySuccessRate: 93,
            onTimeFulfillment: 88,
            disputesResolved: 80,
            returnPolicy: '7-day return'
        },
        socials: [
            { platform: 'instagram', url: 'https://instagram.com/fitlifestore', handle: '@fitlifestore' },
            { platform: 'whatsapp', url: 'https://wa.me/2348012345678', handle: '+234 801 234 5678' },
            { platform: 'twitter', url: 'https://twitter.com/fitlifestore', handle: '@fitlifestore' }
        ],
        shops: [
            { id: 's_008', slug: 'fit-life-store-main', name: 'Fit Life Main', category: 'Sports', trustScore: 87, productCount: 60, customers: 1300, orderCount: 2450, rating: 4.5, reviewCount: 320, bannerUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
            { id: 's_009', slug: 'fit-life-store-activewear', name: 'Fit Activewear', category: 'Health', trustScore: 85, productCount: 52, customers: 950, orderCount: 450, rating: 4.7, reviewCount: 240, bannerUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' }
        ],
        reviews: [
            { id: 'r_007', customerName: 'Emeka T.', customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ET', orderCount: 1250, rating: 5, text: 'Great sports gear!', date: new Date('2023-10-01'), verified: true, images: [] }
        ],
        verificationBadges: { idVerified: true, bankVerified: true, businessDocument: true }
    },

    {
        id: 'v_006',
        slug: 'kids-corner',
        name: 'Kids Corner',
        bio: 'Toys, clothing & accessories for children. Safe & fun products.',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=KC',
        coverUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
        verified: true,
        eliteVendor: false,
        trustScore: 91,
        location: 'Ibadan, Nigeria',
        joinedAt: new Date('2023-07-22'),
        categories: ['Kids', 'Toys'],
        shopCount: 1,
        totalOrders: 650,
        stats: {
            totalProducts: 78,
            totalSales: 1200,
            avgRating: 4.7,
            reviewCount: 189,
            responseTimeHours: 2,
            processingTimeDays: 3,
            deliverySuccessRate: 94,
            onTimeFulfillment: 90,
            disputesResolved: 85,
            returnPolicy: '7-day return'
        },
        socials: [
            { platform: 'instagram', url: 'https://instagram.com/kidscorner', handle: '@kidscorner' },
            { platform: 'whatsapp', url: 'https://wa.me/2348012345678', handle: '+234 801 234 5678' }
        ],
        shops: [
            { id: 's_010', slug: 'kids-corner-main', name: 'Kids Corner Main', category: 'Kids', trustScore: 91, productCount: 78, customers: 1400, orderCount: 1250, rating: 4.7, reviewCount: 150, bannerUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9' }
        ],
        reviews: [
            { id: 'r_008', customerName: 'Adaeze U.', customerAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AU', orderCount: 1450, rating: 5, text: 'Kids love the toys! Excellent service.', date: new Date('2023-08-01'), verified: true, images: [] }
        ],
        verificationBadges: { idVerified: true, bankVerified: true, businessDocument: true }
    }
];

export const load: PageLoad = async ({ params }) => {
    const vendor = mockVendors.find((v) => v.slug === params.vendorSlug);

    if (!vendor) {
        throw error(404, 'Vendor not found');
    }

    return {
        vendor,
        meta: {
            title: `${vendor.name} | VendorHub`,
            description: vendor.bio,
            ogImage: vendor.logoUrl
        }
    };
};