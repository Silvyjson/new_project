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
    title: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    stockStatus: StockStatus;
    stockCount?: number; // Optional: show "X left" for in-stock items
    preorderNote?: string;
    category: string;
    createdAt: Date;
}

export interface Vendor {
    id: string;
    slug: string;
    name: string;
    bio: string;
    description: string;
    stats: {
        totalProducts: number;
        totalSales: number;
        products: number;
        followers: number;
        rating: number;
        avgRating: number;
        responseTimeHours: number;
        
    };
    logoUrl: string;
    coverUrl?: string;
    location?: string;
    trustScore: number;
    verified: boolean;
    socials?: { platform: string; handle: string; url: string }[];
    createdAt: Date;
}