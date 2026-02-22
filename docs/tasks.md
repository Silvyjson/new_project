# Detailed Task Plan (MVP → Scale)

## Phase 0 — Product finalization

- Confirm MVP roles and permissions matrix.
- Lock URL strategy for vendor links and slug rules.
- Finalize preorder business rules and SLA messaging.
- Choose payment provider(s) and payout schedule model.
- Define legal docs: terms, refund, dispute policy.

## Phase 1 — Platform foundation

### Backend (NestJS)

- Initialize monolith with modular boundaries.
- Add auth (register/login/refresh/logout/reset).
- Add role-based guards/decorators.
- Add vendor profile + slug uniqueness service.
- Add buyer profile basics.
- Add shared validation/error format.

### Frontend (SvelteKit)

- Initialize app with route groups.
- Build auth screens (buyer/vendor).
- Build role-aware app shell/navigation.
- Build session management and protected routes.
- Add UI design tokens (colors/typography/spacing).

### DevOps

- CI for lint/test/build.
- Environment config templates.
- Database migration workflow.

## Phase 2 — Vendor storefront + catalog

### Backend

- Product CRUD endpoints.
- Image upload support (object storage).
- Sale type support (`INSTANT`, `PREORDER`).
- Public vendor page endpoints.
- Public shop listing/filter endpoints.

### Frontend

- Vendor dashboard: KPI cards.
- Product management table + add/edit flows.
- Public vendor profile page.
- Public vendor shop page.
- Vendor live preview pages.

## Phase 3 — Orders, payments, trust

### Backend

- Checkout + order creation.
- Payment integration + webhook processing.
- Order status transitions + tracking info.
- Trust score calculator + snapshots.
- Reviews and disputes core endpoints.

### Frontend

- Buyer checkout + order history.
- Vendor orders management board.
- Earnings/payouts view.
- Trust breakdown page + trend chart.

## Phase 4 — Verification + admin controls

### Backend

- Vendor document upload + verification statuses.
- Admin queues for approval/rejection.
- Policy/rules management for trust factors.

### Frontend

- Vendor verification upload/status page.
- Admin verification console.
- Admin dispute moderation screens.

## Phase 5 — PWA and growth features

- Add manifest/service worker and install prompt.
- Add notifications center.
- Add optional websocket real-time updates.
- Add export/reporting.
- Add localization + dark mode.

## Done criteria for MVP

- Vendor can onboard, publish products, share link, receive orders.
- Buyer can discover vendor, buy product, and track order state.
- Trust score and verification status visible in vendor-facing and buyer-facing contexts.
- Roles enforced consistently in frontend and backend.
