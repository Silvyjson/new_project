import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { StockStatus } from '$lib/types';

// Mock product data
const mockProduct = {
    id: 'p_001',
    code: 'UK-AJ1-001',
    name: 'Air Jordan 1 Retro High',
    description: 'The Air Jordan 1 Retro High brings back the classic basketball silhouette with premium leather upper, Nike Air cushioning, and the iconic Wings logo. This timeless design continues to set the standard for sneaker culture.',
    longDescription: `
    <p>The Air Jordan 1 needs no introduction. Since its debut in 1985, it has remained at the forefront of sneaker culture, transcending basketball to become a global fashion icon.</p>
    <p>This Retro High version stays true to the original with premium leather construction, classic colorway, and all the details that made the AJ1 a legend.</p>
    <ul>
      <li>Premium leather upper</li>
      <li>Nike Air cushioning</li>
      <li>Rubber outsole with pivot circle</li>
      <li>Classic Wings logo</li>
      <li>Padded collar for comfort</li>
    </ul>
  `,
    vendorId: 'v_001',
    price: 85000,
    oldPrice: 95000,
    currency: 'NGN',
    images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772',
        'https://images.unsplash.com/photo-1552346154-21d32810aba3',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a'
    ],
    video: null,
    preorder: false,
    sale: true,
    new: false,
    category: 'Sneakers',
    brand: 'Jordan',
    stockStatus: 'in-stock' as StockStatus,
    stockCount: 12,
    preorderNote: null,
    rating: 4.9,
    reviewCount: 45,
    createdAt: new Date('2023-12-01'),
    shop: {
        id: 's_001',
        slug: 'urban-kicks-store',
        name: 'Urban Kicks Store',
        logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=UK',
        vendorSlug: 'kicks-ng',
        vendorName: 'Kicks NG',
        vendorVerified: true,
        trustScore: 92,
        rating: 4.8
    },
    variants: {
        sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
        colors: [
            { name: 'Chicago Red', value: '#DC2626' },
            { name: 'Black Toe', value: '#1F2937' },
            { name: 'Royal Blue', value: '#1E3A8A' }
        ]
    },
    shipping: {
        price: 1500,
        freeShipping: true,
        estimatedDays: '2-5 business days',
        expressAvailable: true,
        expressDays: '1-2 business days',
        expressPrice: 2000
    },
    returns: {
        allowed: true,
        days: 7,
        conditions: 'Unworn with original packaging'
    },
    relatedProducts: [
        {
            id: 'p_002',
            code: 'UK-NB550-002',
            vendorId: 'v_001',
            name: 'New Balance 550 White',
            description: 'Classic New Balance sneakers in white.',
            price: 72000,
            currency: 'NGN',
            images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2'],
            preorder: false,
            sale: false,
            new: true,
            rating: 4.7,
            reviewCount: 28,
            stockStatus: 'in-stock' as StockStatus,
            category: 'Sneakers',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 'p_003',
            code: 'UK-ADY90-003',
            vendorId: 'v_001',
            name: 'Adidas Yeezy Boost 350',
            description: 'Popular Adidas Yeezy Boost 350 in high demand.',
            price: 120000,
            currency: 'NGN',
            images: ['https://images.unsplash.com/photo-1584735175315-9d5df23860e6'],
            preorder: false,
            sale: true,
            new: false,
            rating: 4.8,
            reviewCount: 56,
            stockStatus: 'in-stock' as StockStatus,
            category: 'Sneakers',
            createdAt: new Date('2023-12-15')
        }
    ]
};

export const load: PageLoad = async ({ params }) => {
    const product = mockProduct;

    if (!product) {
        throw error(404, 'Product not found');
    }

    return {
        product,
        meta: {
            title: `${product.name} | ${product.shop.name}`,
            description: product.description,
            ogImage: product.images[0]
        }
    };
};