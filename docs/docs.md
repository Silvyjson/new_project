# Project Documentation

This document provides an overview of the SvelteKit application, including every route currently defined, their purpose, and recent changes to the route structure.

## Table of Contents

1. [Global Structure](#global-structure)
2. [Public / Marketing Routes](#public--marketing-routes)
3. [Authentication](#authentication)
4. [Buyer Application](#buyer-application)
5. [Shared Application Pages](#shared-application-pages)
6. [Main Navigation Area](#main-navigation-area)
7. [Vendor Application](#vendor-application)
8. [Legal Pages](#legal-pages)
9. [Components](#components)
10. [Recent and Upcoming Changes](#recent-and-upcoming-changes)

---

## Global Structure

- `+layout.svelte`: Root layout applied to all pages (common header, footer, global styles).
- `+error.svelte`: Global error page for handling uncaught exceptions.
- Route groups `(...)` are used to organise layout hierarchies without appearing in the URLs.

## Public / Marketing Routes

| URL       | Description                  |
|-----------|------------------------------|
| `/`       | Site landing / homepage.     |
| `/about`  | About page with company info.|

## Authentication

| URL                                         | Description                                         |
|---------------------------------------------|-----------------------------------------------------|
| `/auth/login`                               | Login form.                                        |
| `/auth/register`                            | Registration selection (buyer or vendor).          |
| `/auth/register/buyer`                      | Buyer registration flow.                           |
| `/auth/register/vendor`                     | Vendor registration start.                         |
| `/auth/register/vendor/verify-cac` *(see note)* | CAC verification for vendors (moved).             |
| `/auth/register/vendor/verify-id`           | Vendor ID verification.                            |
| `/auth/forgot-password`                     | Forgot-password request.                           |
| `/auth/reset-password`                      | Password reset form.                               |
| `/auth/verify-email`                        | Email verification landing.                        |

## Buyer Application

Accessible to authenticated buyers under the `(app)/(buyer)` layout:

- `/cart` – Shopping cart contents.
- `/checkout` – Order checkout page.
- `/following` – List of followed shops/products.
- `/home` – Buyer dashboard/home screen.
- `/wishlist` – Saved items.

## Shared Application Pages

Available to both buyers and vendors:

- `/notifications` – User notifications list.
- `/orders` – Order history overview.
  - `/orders/[id]` – Specific order details.
- `/settings` – User settings with nested sections:
  - `/settings/profile` – Personal profile information.
  - `/settings/security` – Security settings (password, 2FA).
  - `/settings/address` – Buyer shipping/billing addresses.
  - `/settings/bank` – Vendor bank account details.

## Main Navigation Area

Paths under `(app)/(main)` providing public content to logged-in users:

- `/blog` – Blog index.
  - `/blog/[slug]` – Individual blog post.
- `/shop` – Shop directory/search.
  - `/shop/[slug]` – Shop profile.
    - `/shop/[slug]/product` – List of products for a shop.
      - `/shop/[slug]/product/add` – Add new product.
      - `/shop/[slug]/product/[code]` – Product detail/edit page.
- `/support` – Support/FAQ page.
- `/vendor` – Vendor directory.
  - `/vendor/[slug]` – Vendor profile page.

## Vendor Application

All vendor‑specific functionality lives under `(app)/(vendor)`:

- `/analytics` – Sales/traffic analytics dashboard.
- `/dashboard` – Vendor dashboard overview.
- `/followers` – Users following this vendor’s shops.
- `/my-blog` – Vendor's own blog section.
  - `/my-blog/create` – Write a blog post.
- `/my-shop` – Vendor shop area and product management.
  - `/my-shop/create` – Create a new shop.
    - `/my-shop/create/verify-cac` – **CAC document verification** (moved from auth).  
  - `/my-shop/[slug]/product` – List products for the vendor’s shops (management view).
    - `/my-shop/[slug]/product/add` – Add a new product across shops.
    - `/my-shop/[slug]/product/[code]` – View/edit a specific product by code.
  - `/my-shop/[slug]` – Manage a specific shop profile and inventory.
- `/wallet` – Vendor wallet and balance.

## Legal Pages

- `/terms` – Terms of service document (to be implemented).
- `/privacy` – Privacy policy (to be implemented).
- `/transactions` – Transaction / legal history page (to be implemented).

## Components

The component library is organised under `src/lib/components`. Below is a breakdown by sub‑folder along with the key Svelte components in each area:

### app/shared
- `AppFooter.svelte` – Global footer used in authenticated app.
- `AppHeader.svelte` – Header/navigation common to buyers and vendors.
- `ProfileDrawer.svelte` – Slide‑out profile/settings menu.
- `SearchBar.svelte` – Site‑wide search input.

### app/vendor
- `FileUpload.svelte` – Generic file upload control.
- `KPICard.svelte` – Card displaying a key performance indicator.
- `OrderTable.svelte` – Table of orders for vendors.
- `ProductTable.svelte` – Table of products for vendors.
- `ShopCard.svelte` – Compact shop preview card.
- `TrustScoreCard.svelte` – Visual display of vendor trust score.

### auth
- `AuthForm.svelte` – Unified login/register form component.
- `AuthLayout.svelte` – Layout wrapper for auth pages.
- `FileUpload.svelte` – Upload control used during registration.
- `PasswordInput.svelte` – Password field with visibility toggle.
- `RoleSelector.svelte` – Buyer/vendor selection control.
- `TrustMeter.svelte` – Visual trust meter used on registration.

### card
- `BlogCard.svelte` – Single blog preview card.
- `ProductCard.svelte` – Product listing card.
- `ProductCardList.svelte` – Grid/list of product cards.
- `ShopCard.svelte` – Shop listing card used on directories.
- `VendorCard.svelte` – Vendor profile card.

### grid
- `BlogGrid.svelte` – Grid layout for blog posts.
- `ProductGrid.svelte` – Grid layout for products.
- `ShopGrid.svelte` – Grid of shops.
- `VendorGrid.svelte` – Grid of vendors.

### homepage
- `Footer.svelte` – Public footer used on marketing pages.
- `Nav.svelte` – Public navigation bar.

### orders
- `OrderCard.svelte` – Compact order preview.
- `OrderDetails.svelte` – Order detail panel/component.
- `OrderStatus.svelte` – Status indicator component for orders.

### shop
- `ShopFooter.svelte` – Footer specific to shop pages.
- `ShopHeader.svelte` – Header used on individual shop views.

### ui
- `Badge.svelte` – Generic badge/label component.
- `Button.svelte` – Stylised button element.
- `Card.svelte` – Generic card container.
- `Filter.svelte` – Filter dropdown/control.
- `Input.svelte` – Styled input field.
- `Pagination.svelte` – Pagination controls.
- `ReviewCard.svelte` – Customer review card.
- `TrustBadge.svelte` – Badge showing trust level.
- `TrustScore.svelte` – Component visualising trust score.


- `/terms` – Terms of service document (to be implemented).
- `/privacy` – Privacy policy (to be implemented).
- `/transactions` – Transaction / legal history page (to be implemented).

## Recent and Upcoming Changes

1. **Route relocation**: the CAC verification step for vendors will be removed from the `auth/register/vendor` path and re‑implemented under `/my-shop/create/verify-cac` as part of the shop creation flow.
2. **New legal pages**: `/terms`, `/privacy`, and `/transactions` are being added for compliance/legality and should be implemented as static or dynamic routes as required.

---

> _Keep this document updated as more routes are added or existing flows change. It’s the canonical reference for front‑end routing._
