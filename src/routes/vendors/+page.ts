// src/routes/vendors/[vendorSlug]/+page.js
export async function load({ params, fetch }) {
    const res = await fetch(`/api/vendors/${params.vendorSlug}`);
    const vendor = await res.json();

    if (!vendor) throw error(404, 'Vendor not found');

    return { vendor };
}