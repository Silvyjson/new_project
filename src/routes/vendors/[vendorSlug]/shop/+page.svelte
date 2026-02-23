import ShopHeader from '$lib/components/vendor/ShopHeader.svelte'; import
ProductGrid from '$lib/components/vendor/ProductGrid.svelte';

<ShopHeader {vendor} />
<ProductGrid {products} vendorSlug={vendor.slug} />
