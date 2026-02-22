# Open Questions to Finalize Before Development

## A) Product and UX

1. Should vendor profile (`/{slug}`) and vendor shop (`/{slug}/shop`) have separate customizable themes, or one unified branding?
2. Do vendors get subdomain support later (e.g., `vendor.myapp.com`) or only path-based links initially?
3. Should buyers be able to follow/favorite vendors?
4. Do you want vendor badges (e.g., "Top Trusted", "Fast Shipping") at MVP?
5. Should preorder items be mixed with instant-buy items in one list or separated by tabs?
6. Should buyers be forced to create accounts before checkout, or allow guest checkout first?

## B) Trust, verification, and moderation

7. What exact trust formula should be shown publicly vs kept internal?
8. Do you want trust score hidden for new vendors until minimum order count?
9. What documents are mandatory per country for vendor verification?
10. How many rejection attempts before manual escalation?
11. Should buyer reviews require verified purchase only?
12. What is the dispute resolution SLA and who can override outcomes?

## C) Orders, shipping, and preorder logic

13. For preorder, do you collect full payment immediately or only deposit?
14. Can vendors define preorder lead times per product?
15. Should late preorder fulfillment auto-impact trust score after grace period?
16. Are partial shipments allowed?
17. Do we support digital products later, or physical only?

## D) Payments and payouts

18. Which payment provider(s) and countries at launch?
19. Platform fee model: fixed, percentage, or hybrid?
20. Payout schedule: manual request, weekly auto, or threshold-based?
21. Refund flow ownership: vendor-initiated, platform-initiated, or both?
22. Multi-currency needed at MVP?

## E) Roles and permissions

23. Should a user be both buyer and vendor with one account?
24. Will vendor teams exist (owner/staff roles) or single vendor user at MVP?
25. What admin permission tiers are required (support vs compliance vs super admin)?

## F) Technical and operations

26. Preferred database and hosting setup?
27. Target launch traffic (vendors + daily active buyers)?
28. Required observability stack (logs, metrics, tracing)?
29. Do you need event-driven architecture now, or modular monolith first?
30. Any compliance needs (GDPR, PCI scope expectations, local regulations)?

## G) PWA scope

31. Is offline browsing required for buyers at MVP?
32. Is offline product editing required for vendors?
33. Should push notifications be web-only first or include native wrappers later?

## H) Analytics and reporting

34. Which KPI definitions are final (GMV, net earnings, completion rate)?
35. Should vendors download CSV reports at MVP?
36. Do you need cohort/retention analytics now or post-MVP?

---

## Proposed working assumptions (if you want us to proceed immediately)

- Path-based vendor URLs at MVP (`/{slug}` and `/{slug}/shop`).
- One account can hold both buyer and vendor roles.
- Full payment captured for both instant and preorder (with clear fulfillment date messaging).
- Verified-purchase-only reviews.
- Modular monolith NestJS first; event-driven split later.
