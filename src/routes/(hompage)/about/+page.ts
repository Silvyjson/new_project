// src/routes/about/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    return {
        meta: {
            title: 'About VendorHub — Empowering Vendors, Building Trust',
            description: 'VendorHub is a secure digital home for social media vendors — giving them trusted storefronts, verified identities, and safe payment systems.',
            ogImage: '/images/about-og.jpg'
        },
        stats: {
            vendors: '10,000+',
            customers: '100,000+',
            secured: '₦500M+'
        }
    };
};