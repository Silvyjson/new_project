// Add these exports if not already present
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type StockStatus = 'in-stock' | 'preorder' | 'sold-out';

// Update Product interface with stockCount
export interface Product {
    id: string;
    code: string;
    vendorId: string;
    name?: string;
    title?: string;
    description?: string;
    price: number;
    currency: string;
    images: string[];
    preorder: boolean;
    sale: boolean;
    new: boolean;
    rating: number;
    reviewCount: number;
    oldPrice?: number | null;
    featured?: boolean;
    stockStatus: StockStatus;
    stockCount?: number | null; // Optional: show "X left" for in-stock items
    preorderNote?: string;
    category: string;
    shipping?: {
        price?: number;
        freeShipping?: boolean;
        estimatedDays?: string;
        expressAvailable?: boolean;
        expressDays?: string;
        expressPrice?: number;
    };
    trending?: boolean;
    returns?: {
        allowed?: boolean;
        days?: number;
        conditions?: string;
    };
    createdAt: Date;
}

export interface Vendor {
    id: string;
    slug: string;
    name: string;
    bio?: string;
    description?: string;
    stats: {
        totalProducts?: number;
        totalSales?: number;
        products?: number;
        followers?: number;
        rating?: number;
        avgRating?: number;
        responseTimeHours?: number;
        reviewCount?: number;
    };
    logoUrl?: string;
    coverUrl?: string;
    location?: string;
    trustScore: number;
    verified: boolean;
    socials?: { platform: string; handle: string; url: string }[];
    shopCount: number;
    categories?: string[];
    createdAt?: Date;
}

export interface Shop {
    id: string;
    vendorId?: string;
    vendorSlug?: string;
    slug?: string;
    name: string;
    description?: string;
    category: string;
    bannerUrl?: string;
    logoUrl?: string;
    rating: number;
    reviewCount?: number;
    productCount: number;
    orderCount: number;
    customers?: number;
    trustScore: number;
    verified?: boolean;
    location?: string;
    createdAt?: Date;
}
