# VendorHub Architecture Blueprint (SvelteKit + NestJS + PWA)

## 1) Product model

VendorHub is a managed multi-vendor marketplace where:

1. Vendors get a branded, shareable storefront without building a standalone website.
2. Buyers can either:
   - Discover vendors from the platform marketplace, or
   - Open a direct vendor URL.
3. Platform enforces trust via verification, ratings/reviews, disputes, and delivery behavior.
4. Platform handles payments and payout lifecycle.

---

## 2) Role model (backend + frontend)

### Roles

- **Buyer**
  - Browse vendors and products
  - Place orders
  - Review vendors
- **Vendor**
  - Manage profile/shop/products/orders
  - Track trust score and verification
  - Preview storefront
- **Admin**
  - Verify vendors/documents
  - Moderate disputes/reviews
  - Manage payouts/trust rules

### Authorization approach

- JWT access token + refresh token rotation.
- Role claims embedded in access token (`roles: ['buyer']`, `['vendor']`, etc.).
- NestJS guards:
  - `AuthGuard` for authenticated endpoints
  - `RolesGuard` for role-specific endpoints
- Frontend route protection:
  - Public routes (marketplace, vendor pages)
  - Buyer routes
  - Vendor routes
  - Admin routes

---

## 3) URL structure (public + app)

### Public URLs

- `/` — marketplace landing + vendor listing
- `/{vendorSlug}` — vendor profile page
- `/{vendorSlug}/shop` — vendor storefront/product grid
- `/{vendorSlug}/product/{productSlug}` — product details

### App URLs

- `/auth/login`
- `/auth/register/buyer`
- `/auth/register/vendor`
- `/app` (role-aware shell)
- `/app/vendor/*`
  - dashboard, products, orders, payouts, trust, settings, preview
- `/app/buyer/*`
  - orders, addresses, payment methods, profile
- `/app/admin/*`
  - verification queue, disputes, trust policies, payouts

### Vendor preview

- Vendor preview mode should render the same storefront components with sandboxed data controls:
  - `/app/vendor/preview/profile`
  - `/app/vendor/preview/shop`
- Optional query toggle for direct preview simulation:
  - `/{vendorSlug}?preview=1`
  - `/{vendorSlug}/shop?preview=1`

---

## 4) Domain modules (NestJS)

Recommended module breakdown:

1. `auth` — login/register/refresh/password reset
2. `users` — buyer/vendor/admin account profile
3. `vendors` — vendor profile, slug management, branding
4. `catalog` — categories, products, images, inventory
5. `orders` — cart snapshot, order lifecycle, fulfillment
6. `payments` — charges, webhooks, ledger entries
7. `payouts` — vendor payout requests/status/history
8. `trust` — trust score computation + events
9. `verification` — KYC/KYB document workflow
10. `reviews` — buyer ratings/comments
11. `notifications` — email/in-app/push
12. `admin` — moderation + policies

---

## 5) Core entities (MVP data model)

- `User`
- `Role`
- `VendorProfile`
- `VendorVerificationDocument`
- `Product`
- `ProductImage`
- `Order`
- `OrderItem`
- `PaymentTransaction`
- `Payout`
- `TrustSnapshot`
- `Review`
- `Dispute`

Key flags:

- Product sale mode:
  - `saleType = INSTANT | PREORDER`
- Product availability:
  - `status = DRAFT | ACTIVE | ARCHIVED`
- Vendor trust:
  - `trustScore` numeric + component breakdown fields

---

## 6) Product behavior: preorder vs instant buy

### Instant buy

- Buyer can purchase immediately.
- Inventory decremented at successful payment.
- Delivery SLA tracked for trust scoring.

### Preorder

- Product page must show estimated fulfillment date window.
- Order states include preorder-specific states (e.g., `PREORDER_CONFIRMED`).
- Trust scoring should not penalize vendor for non-shipment before promised preorder date.

---

## 7) Frontend architecture (SvelteKit)

## App organization

- `src/routes/(public)`
  - marketplace + vendor public pages
- `src/routes/(auth)`
  - login/register/reset
- `src/routes/(buyer)`
  - buyer dashboard
- `src/routes/(vendor)`
  - vendor dashboard + management
- `src/routes/(admin)`
  - admin console

## Shared layers

- `src/lib/components` — reusable UI components
- `src/lib/features` — domain-driven feature folders (orders/products/trust)
- `src/lib/stores` — session/UI stores
- `src/lib/api` — typed API clients
- `src/lib/utils` — helpers/formatters/validators

## Data strategy

- SvelteKit `load` for route-level fetching.
- Mutations via server endpoints or client API calls.
- Strong runtime validation of API responses (e.g., Zod).

---

## 8) PWA plan

- Installable app with manifest + service worker.
- Cache strategy:
  - Static assets: cache-first
  - API requests: network-first with fallback for selected read endpoints
- Offline support (phase-based):
  - MVP: shell + previously visited pages
  - Phase 2: offline draft product edits/sync queue
- Push notifications for order updates and verification status (phase 2).

---

## 9) API design principles

- Versioned REST: `/api/v1/...`
- Role-safe endpoints with consistent error schema.
- Idempotency for payment/order critical writes.
- Webhook verification for payment provider callbacks.
- Pagination standard:
  - `page`, `limit`, `sort`, `filters`
- Structured response metadata for frontend tables.

---

## 10) Trust score framework (initial)

Suggested weighted factors:

- Fulfillment reliability (on-time shipment)
- Order completion rate
- Cancellation rate
- Dispute ratio
- Buyer review rating
- Verification level

Implementation recommendation:

- Event-based recalculation after significant actions.
- Daily snapshot persisted for graphing trend over time.

---

## 11) Security and compliance baseline

- HttpOnly refresh token cookies (preferred)
- Access token short TTL
- CSRF protection where cookie-based flows apply
- Rate limiting for auth/public endpoints
- Signed upload URLs for media
- Audit log for admin actions and verification decisions

---

## 12) Suggested MVP release scope

1. Auth + role-based access.
2. Vendor onboarding with slug creation and storefront generation.
3. Product CRUD with `INSTANT`/`PREORDER` modes.
4. Public vendor profile + shop links.
5. Buyer checkout + order lifecycle basics.
6. Basic trust score + verification status display.
7. Vendor preview pages.
