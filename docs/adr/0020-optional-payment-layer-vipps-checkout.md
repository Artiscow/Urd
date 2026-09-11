# ADR-0020: Optional payment layer via Vipps Checkout (hosted redirect)

Date: 25 August 2026
Status: Accepted

## Context

Milestone 0.7.5 promises a real payment checkout as an OPTIONAL layer on top of the order-form checkout; the form checkout remains the default, and the core remains gateway-free. The backlog named two candidates: the Snipcart model (git-owned catalogue + third-party cart/checkout via CSP opt-in) and Vipps Checkout via a Pages Function.

## Decision

The payment layer is built on **Vipps Checkout via a dedicated Pages Function with hosted redirect**:

1. The checkout block gets the additive prop `vippsCheckout` (bool, default false). When set, it shows a «Pay with Vipps» button next to «Send order».
2. The button POSTs the cart lines (id/quantity/variant) and the contact fields to the site's own function `/api/vipps/checkout`. The function ALWAYS recomputes the total from the git-owned catalogue (`content/samlinger/`, kind `products`) - the client's amount is never used. An unknown product id or a manipulated payload is rejected.
3. The function creates a Checkout session at Vipps (checkout/v3) and responds with the session's URL; the client redirects there. The payment happens at Vipps, never on the site.
4. `returnUrl` is the checkout page with `?ordered=1`: the checkout block shows a receipt and empties the cart on return. The callback endpoint `/api/vipps/callback` acknowledges 200 and stores nothing - the orders live in the Vipps portal (the order lines are sent along in the session), the site is static and has no order database.
5. Configuration is Cloudflare secrets, never repo data: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY`, `VIPPS_MSN`, optional `VIPPS_API_BASE` (test: `https://apitest.vipps.no`). Without them the function responds 503 with the code `vippsNotConfigured`, and the button shows a calm unavailable text; the form checkout works unchanged.
6. The member price is a displayed second price on a trust basis (login is outside the core, BACKLOG); the payment layer always charges the regular price.

## Rationale

- **The target audience is Norwegian.** The Vipps-number instruction is already the manual payment route; Vipps Checkout is the same payment relationship with real completion. The site owner only needs their MobilePay/Vipps agreement and to paste four secrets into Cloudflare.
- **The CSP remains untouched.** Hosted redirect means no third-party script, no iframe and no connect-src extension on the site (the ADR-0006 friction is avoided entirely). Sensitive calls happen server-side in the function, which owns the secrets.
- **Snipcart rejected:** injects its own cart and checkout UI that duplicates Urd's cart/checkout (two carts on the same site), requires a CDN script + API host in the CSP, and costs a subscription/transaction fee. The model suits sites WITHOUT their own cart; Urd has one.
- **Prices are validated server-side** because the cart lives with the visitor (localStorage) and anything the client sends may have been tampered with; the catalogue in git is the source of truth.

## Consequences

- `functions/_lib/vipps.js` owns the pure logic (payload validation, conversion to øre, session body) and is tested in node; `functions/api/vipps/checkout.js` and `callback.js` are thin shells.
- The form checkout and the payment button live side by side; no part of the core gains a dependency on Vipps.
- A test payment (the Done-when criterion) requires the site owner's test agreement (the MT environment) on a deployed site; locally the button degrades gracefully.
- If the provider is switched later, the surface is small: one block prop, two functions and one pure module.
