// src/routes/shop/[shopSlug]/product/+page.ts
import type { Product } from "$lib/types";
import type { PageLoad } from "./$types";

// Mock shop data
const mockShop = {
  id: "s_001",
  slug: "urban-kicks-store",
  name: "Urban Kicks Store",
  tagline: "Premium Sneakers for the Modern Lifestyle",
  description:
    "Urban Kicks Store is your destination for authentic, high-quality sneakers and footwear. We source directly from verified manufacturers and offer warranty on all products. Based in Lagos, we ship nationwide with secure payment protection through VendorHub.",
  logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=UK",
  bannerUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  category: "Footwear",
  vendorId: "v_001",
  vendorName: "Kicks NG",
  vendorSlug: "tech-deals-ng",
  vendorVerified: true,
  trustScore: 92,
  rating: 4.8,
  reviewCount: 320,
  orderCount: 3200,
  productCount: 124,
  followers: 2300,
  theme: {
    category: "general",
    type: "default",
    template: "default",
  },
  location: "Lagos, Nigeria",
  joinedAt: new Date("2024-03-15"),
  stats: {
    responseTime: "< 2 hours",
    processingTime: "1-2 days",
    returnPolicy: "7-day return policy",
    shippingTime: "2-5 business days",
  },
  socials: [
    {
      platform: "instagram",
      url: "https://instagram.com/urbankicks",
      handle: "@urbankicks",
    },
    {
      platform: "whatsapp",
      url: "https://wa.me/2348012345678",
      handle: "+234 801 234 5678",
    },
  ],
  ratingBreakdown: {
    5: 256,
    4: 48,
    3: 16,
    2: 0,
    1: 0,
  },
};

// Mock products data
// Mock products data
const mockProducts: Product[] = [
  {
    id: "p_001",
    code: "UK-AJ1-001",
    name: "Air Jordan 1 Retro High",
    description: "Classic basketball silhouette with premium leather upper.",
    price: 85000,
    oldPrice: 95000,
    currency: "NGN",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    ],
    category: "Sneakers",
    stockStatus: "in-stock",
    stockCount: 12,
    rating: 4.9,
    new: false,
    sale: true,
    preorder: false,
    vendorId: "v_001",
    createdAt: new Date(),
    reviewCount: 45,
  },
  {
    id: "p_002",
    code: "UK-NB550-002",
    name: "New Balance 550 White",
    description: "Retro basketball shoe with modern comfort technology.",
    price: 72000,
    oldPrice: null,
    currency: "NGN",
    images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"],
    category: "Sneakers",
    stockStatus: "in-stock",
    stockCount: 8,
    rating: 4.7,
    new: true,
    sale: false,
    preorder: false,
    vendorId: "v_001",
    createdAt: new Date(),
    reviewCount: 32,
  },
  {
    id: "p_003",
    code: "UK-ADY90-003",
    name: "Adidas Yeezy Boost 350",
    description: "Iconic silhouette with Primeknit upper and Boost cushioning.",
    price: 120000,
    oldPrice: 140000,
    currency: "NGN",
    images: ["https://images.unsplash.com/photo-1584735175315-9d5df23860e6"],
    category: "Sneakers",
    stockStatus: "preorder",
    stockCount: null,
    preorderNote: "Expected delivery: 14-21 days",
    rating: 4.8,
    new: false,
    sale: true,
    preorder: true,
    vendorId: "v_001",
    createdAt: new Date(),
    reviewCount: 67,
  },
  {
    id: "p_004",
    code: "UK-NKAF1-004",
    name: "Nike Air Force 1 White",
    description: "Timeless classic with premium leather construction.",
    price: 65000,
    oldPrice: null,
    currency: "NGN",
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772"],
    category: "Sneakers",
    stockStatus: "in-stock",
    stockCount: 20,
    rating: 4.6,
    new: false,
    sale: false,
    preorder: false,
    vendorId: "v_001",
    createdAt: new Date(),
    reviewCount: 89,
  },
  {
    id: "p_005",
    code: "UK-CNK700-005",
    name: "Converse Chuck 70 High",
    description: "Vintage basketball shoe with modern comfort upgrades.",
    price: 45000,
    oldPrice: 50000,
    currency: "NGN",
    images: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d"],
    category: "Sneakers",
    stockStatus: "in-stock",
    stockCount: 15,
    rating: 4.5,
    new: false,
    sale: true,
    preorder: false,
    vendorId: "v_001",
    createdAt: new Date(),
    reviewCount: 54,
  },
  {
    id: "p_006",
    code: "UK-VNOLD-006",
    name: "Vans Old Skool Black",
    description: "Classic skate shoe with durable canvas and suede upper.",
    price: 38000,
    oldPrice: null,
    currency: "NGN",
    images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"],
    category: "Sneakers",
    stockStatus: "in-stock",
    stockCount: 25,
    rating: 4.7,
    new: true,
    sale: false,
    preorder: false,
    vendorId: "v_001",
    createdAt: new Date(),
    reviewCount: 76,
  },
  {
    id: "p_007",
    code: "UK-PUMA-007",
    name: "Puma RS-X Toys",
    description: "Bold colorway with running-inspired design.",
    price: 55000,
    oldPrice: null,
    currency: "NGN",
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5"],
    category: "Sneakers",
    stockStatus: "in-stock",
    stockCount: 10,
    rating: 4.4,
    new: false,
    sale: false,
    preorder: false,
    vendorId: "v_001",
    createdAt: new Date(),
    reviewCount: 28,
  },
  {
    id: "p_008",
    code: "UK-RBK-008",
    name: "Reebok Club C 85",
    description: "Minimalist tennis-inspired sneaker with soft leather upper.",
    price: 48000,
    oldPrice: 55000,
    currency: "NGN",
    images: ["https://images.unsplash.com/photo-1584735175315-9d5df23860e6"],
    category: "Sneakers",
    stockStatus: "in-stock",
    stockCount: 18,
    rating: 4.6,
    reviewCount: 41,
    featured: false,
    new: false,
    sale: true,
    preorder: false,
    vendorId: "v_001",
    createdAt: new Date(),
  },
];

export const load: PageLoad = async ({ params, url }) => {
  const shop = mockShop;
  let products = mockProducts;

  // Get query params for filtering
  const search = url.searchParams.get("search") || "";
  const category = url.searchParams.get("category") || "";
  const minPrice = url.searchParams.get("minPrice") || "";
  const maxPrice = url.searchParams.get("maxPrice") || "";
  const minRating = url.searchParams.get("minRating") || "";
  const availability = url.searchParams.get("availability") || "";
  const sortBy = url.searchParams.get("sort") || "newest";
  const viewMode = url.searchParams.get("view") || "grid";

  // Filter products
  products = products.filter((product) => {
    const matchesSearch =
      search === "" ||
      product?.name?.toLowerCase().includes(search.toLowerCase()) ||
      product?.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "" || product.category === category;
    const matchesMinPrice =
      minPrice === "" || product.price >= parseInt(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || product.price <= parseInt(maxPrice);
    const matchesMinRating =
      minRating === "" || product.rating >= parseFloat(minRating);
    const matchesAvailability =
      availability === "" ||
      (availability === "in-stock" && product.stockStatus === "in-stock") ||
      (availability === "preorder" && product.stockStatus === "preorder") ||
      (availability === "sale" && product.sale);
    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinRating &&
      matchesAvailability
    );
  });

  // Sort products
  products.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "popular":
        return b.reviewCount - a.reviewCount;
      case "sale":
        return (b.sale ? 1 : 0) - (a.sale ? 1 : 0);
      default:
        return 0;
    }
  });

  // Get unique categories
  const categories = Array.from(
    new Set(mockProducts.map((p) => p.category)),
  ).sort();

  // Pagination
  const page = parseInt(url.searchParams.get("page") || "1");
  const perPage = 12;
  const totalPages = Math.ceil(products.length / perPage);
  const paginatedProducts = products.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  return {
    shop,
    products: paginatedProducts,
    totalProducts: products.length,
    categories,
    filters: {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      availability,
      sortBy,
      viewMode,
    },
    pagination: { page, perPage, totalPages },
    meta: {
      title: `All Products | ${shop.name}`,
      description: `Browse ${shop.productCount} products from ${shop.name}`,
    },
  };
};
