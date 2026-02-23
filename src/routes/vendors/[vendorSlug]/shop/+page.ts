// src/routes/vendors/[vendorSlug]/shops/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

// Mock Vendors
const mockVendors = [
  {
    id: 'v_001',
    slug: 'amina-fashion',
    name: 'Amina Fashion',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AF',
    verified: true,
    trustScore: 94,
    avgRating: 4.8,
    shopCount: 3
  },
  {
    id: 'v_002',
    slug: 'tech-deals-ng',
    name: 'Tech Deals NG',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TD',
    verified: true,
    trustScore: 89,
    avgRating: 4.6,
    shopCount: 2
  },
  {
    id: 'v_003',
    slug: 'beauty-box',
    name: 'Beauty Box',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=BB',
    verified: true,
    trustScore: 96,
    avgRating: 4.9,
    shopCount: 1
  },
  {
    id: 'v_004',
    slug: 'home-essentials',
    name: 'Home Essentials',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HE',
    verified: false,
    trustScore: 72,
    avgRating: 4.3,
    shopCount: 1
  },
  {
    id: 'v_005',
    slug: 'fit-life-store',
    name: 'Fit Life Store',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=FL',
    verified: true,
    trustScore: 87,
    avgRating: 4.5,
    shopCount: 2
  },
  {
    id: 'v_006',
    slug: 'kids-corner',
    name: 'Kids Corner',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=KC',
    verified: true,
    trustScore: 91,
    avgRating: 4.7,
    shopCount: 1
  }
];

// Mock Shops per Vendor
const mockShops = {
  'v_001': [
    {
      id: 's_001',
      slug: 'amina-fashion/main',
      name: 'Amina Fashion Main',
      description: 'Our main store with premium handmade clothing & accessories.',
      category: 'Fashion',
      bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      trustScore: 94,
      rating: 4.8,
      productCount: 89,
      orderCount: 320,
      followers: 2340,
      lastUpdated: new Date('2023-06-15')
    },
    {
      id: 's_002',
      slug: 'amina-fashion/accessories',
      name: 'Amina Accessories',
      description: 'Handmade accessories including bags, jewelry, and belts.',
      category: 'Accessories',
      bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      trustScore: 91,
      rating: 4.7,
      productCount: 45,
      orderCount: 150,
      followers: 1200,
      lastUpdated: new Date('2023-06-14')
    },
    {
      id: 's_003',
      slug: 'amina-fashion/handmade',
      name: 'Amina Handmade',
      description: 'Exclusive handmade items with limited edition designs.',
      category: 'Accessories',
      bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      trustScore: 96,
      rating: 4.9,
      productCount: 22,
      orderCount: 120,
      followers: 890,
      lastUpdated: new Date('2023-06-13')
    }
  ],

  'v_002': [
    {
      id: 's_004',
      slug: 'tech-deals-ng/main',
      name: 'Tech Deals Main',
      description: 'Authentic electronics and gadgets with warranty included.',
      category: 'Electronics',
      bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      trustScore: 89,
      rating: 4.6,
      productCount: 50,
      orderCount: 400,
      followers: 1500,
      lastUpdated: new Date('2023-08-20')
    },
    {
      id: 's_005',
      slug: 'tech-deals-ng/gadgets',
      name: 'Tech Gadgets',
      description: 'All kinds of gadgets, from smartphones to accessories.',
      category: 'Gadgets',
      bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      trustScore: 87,
      rating: 4.5,
      productCount: 39,
      orderCount: 350,
      followers: 800,
      lastUpdated: new Date('2023-08-18')
    }
  ],

  'v_003': [
    {
      id: 's_006',
      slug: 'beauty-box/main',
      name: 'Beauty Box Main',
      description: 'Organic skincare & makeup. Cruelty-free products only.',
      category: 'Beauty',
      bannerUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348',
      trustScore: 96,
      rating: 4.9,
      productCount: 67,
      orderCount: 210,
      followers: 2100,
      lastUpdated: new Date('2023-04-10')
    }
  ],

  'v_004': [
    {
      id: 's_007',
      slug: 'home-essentials/main',
      name: 'Home Essentials Main',
      description: 'Quality home decor & kitchen items to make homes beautiful.',
      category: 'Home',
      bannerUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
      trustScore: 72,
      rating: 4.3,
      productCount: 45,
      orderCount: 80,
      followers: 450,
      lastUpdated: new Date('2024-01-05')
    }
  ],

  'v_005': [
    {
      id: 's_008',
      slug: 'fit-life-store/main',
      name: 'Fit Life Main',
      description: 'Sports equipment, supplements & activewear.',
      category: 'Sports',
      bannerUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      trustScore: 87,
      rating: 4.5,
      productCount: 60,
      orderCount: 300,
      followers: 1300,
      lastUpdated: new Date('2023-09-12')
    },
    {
      id: 's_009',
      slug: 'fit-life-store/activewear',
      name: 'Fit Activewear',
      description: 'Activewear and supplements for a healthier lifestyle.',
      category: 'Health',
      bannerUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      trustScore: 85,
      rating: 4.4,
      productCount: 52,
      orderCount: 250,
      followers: 950,
      lastUpdated: new Date('2023-09-10')
    }
  ],

  'v_006': [
    {
      id: 's_010',
      slug: 'kids-corner/main',
      name: 'Kids Corner Main',
      description: 'Toys, clothing & accessories for children. Safe & fun products.',
      category: 'Kids',
      bannerUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
      trustScore: 91,
      rating: 4.7,
      productCount: 78,
      orderCount: 200,
      followers: 1400,
      lastUpdated: new Date('2023-07-22')
    }
  ]
};

export const load: PageLoad = async ({ params, url }) => {
  // ✅ FIX 1: correct param name
  const vendorSlug = params.vendorSlug;

  const vendor = mockVendors.find(v => v.slug === vendorSlug);

  // ✅ FIX 2: proper SvelteKit error handling
  if (!vendor) {
    throw error(404, 'Vendor not found');
  }

  // ✅ Get shops for this vendor
  let shops = mockShops[vendor.id] ?? [];

  // Query params
  const search = url.searchParams.get('search') ?? '';
  const category = url.searchParams.get('category') ?? '';
  const sortBy = url.searchParams.get('sort') ?? 'trustScore';
  const highTrustOnly = url.searchParams.get('highTrust') === 'true';

  // ✅ Filter
  shops = shops.filter((shop: any) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(search.toLowerCase()) ||
      shop.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category ? shop.category === category : true;
    const matchesTrust = highTrustOnly ? shop.trustScore >= 80 : true;

    return matchesSearch && matchesCategory && matchesTrust;
  });

  // ✅ Sort
  shops.sort((a: any, b: any) => {
    switch (sortBy) {
      case 'trustScore':
        return b.trustScore - a.trustScore;
      case 'products':
        return b.productCount - a.productCount;
      case 'popular':
        return b.followers - a.followers;
      case 'updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  // ✅ Categories (from THIS vendor only)
  const categories = Array.from(
    new Set((mockShops[vendor.id] ?? []).map((s: any) => s.category))
  );

  return {
    vendor,
    shops,
    categories,
    filters: { search, category, sortBy, highTrustOnly },
    meta: {
      title: `All Shops by ${vendor.name} | VendorHub`,
      description: `Browse all ${vendor.shopCount} shops operated by ${vendor.name}.`
    }
  };
};