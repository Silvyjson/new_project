# VendorHub (working name)

A multi-vendor commerce platform where each vendor gets a shareable storefront link, buyers can browse trusted vendors, and payments are handled centrally by the platform.

## Core idea

- Vendors create a profile and automatically get a public URL:
  - `myapp.com/{vendorSlug}` → vendor profile
  - `myapp.com/{vendorSlug}/shop` → vendor products/shop
- Buyers can discover vendors from a marketplace directory sorted/filterable by trust score.
- Platform verifies vendors and computes trust/reputation.
- Vendors can sell products as:
  - **Instant Buy** (in-stock)
  - **Preorder** (available later)
- Vendor can preview their public pages exactly as buyers see them.

## Stack

- **Backend:** NestJS (REST API first, optional WebSocket later)
- **Frontend:** SvelteKit (web app + vendor/buyer dashboards)
- **PWA:** SvelteKit PWA setup for installable mobile experience
- **Auth/Authorization:** JWT + refresh tokens + role guards (Vendor, Buyer, Admin)

## Repository docs

- `docs/architecture.md` — System architecture, role model, routes, modules, data model.
- `docs/tasks.md` — Detailed implementation backlog by phase.
- `docs/open-questions.md` — Product/technical questions to finalize before build.

## Suggested next step

1. Finalize the open questions in `docs/open-questions.md`.
2. Freeze API contracts for MVP.
3. Implement Phase 1 from `docs/tasks.md`.
