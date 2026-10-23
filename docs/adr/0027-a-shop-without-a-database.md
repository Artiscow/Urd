# ADR-0027: A shop without a database: variants, published stock, shipping tables, discount codes and MVA on the payment layer

Date: 19 October 2026. Status: accepted (phase v1.1). Builds on [ADR-0020](0020-optional-payment-layer-vipps-checkout.md) and amends its decision 6 (a members' code makes the member price chargeable); the survey behind it is [What a shop needs](../comparison/SURVEYS.md#what-a-shop-needs-how-the-builders-sell-19-october-2026) in SURVEYS.md.

## Context

The v0.7 shop (milestone 0.7.5) is a catalogue in git (a collection of kind `products`), a cart in the visitor's browser, an order form that sends the order by email or to an endpoint, and the optional payment layer of ADR-0020: a function recomputes the total from the catalogue, the payment happens at the provider, and nothing is stored. The member price is shown, never charged.

The survey of 19 October 2026 found that the entry plans of the builders that sell (Shopify, Squarespace, Wix, Webflow, Big Cartel, Ecwid and others) share one baseline: variants with their own price and stock, stock that stops a sale, shipping rules with pickup, discount codes, a tax display, a notice to the owner and a confirmation to the buyer. Urd has the first half of a shop and none of the second.

Four limits frame the answer:
- The vision: no server, no database, no subscription, no app platform; and the comparison's rule that member and buyer data never goes in git (GDPR).
- ADR-0020: no order database, a hosted payment step, the site's CSP untouched.
- The host's free plan: 500 builds a month, and a Pages Function cannot send email itself.
- Norwegian law: prices include every charge and shipping is shown before the order (prisopplysningsforskriften § 3), the paying button must read as an order with an obligation to pay and a confirmation on a durable medium is owed (angrerettloven §§ 16 and 18), the provider's information including the organisation number (ehandelsloven § 8), a seller not registered for MVA may not write «inkl. mva» (merverdiavgiftsloven § 15-11), and a reduced price shows the lowest price of the previous 30 days (prisopplysningsforskriften § 9a).

The payment layer moved from Vipps Checkout, which ends on 30 April 2027, to the Vipps MobilePay ePayment API on 23 October 2026 ([ADR-0020](0020-optional-payment-layer-vipps-checkout.md)). This ADR names what the shop needs from the payment layer, not which provider gives it.

## Decision

1. **The phase.** The shop is phase v1.1, after v1.0. It starts only once the payment layer has left Vipps Checkout. The shape of a variant is decided now, so the product pages of v0.8 bake the right shape.
2. **The catalogue is the only truth.** Everything a price depends on (the variant's price, the shipping rule, the code, the MVA setting) is published content. The function recomputes the total from it and rejects anything else. There is no order store: the provider's portal is the order list (ADR-0020 decision 4 holds).
3. **Variants.** A product may list variants, each with its option values, price, sale price, SKU, weight, available count and image. The fields are added beside today's sizes and colours: a product without variants renders and charges as it does today, and no migration is needed.
4. **Stock is published availability.** The owner publishes a count per variant, or marks it untracked. The cart and the function refuse lines beyond the count, a count at 0 shows «sold out» and cannot be ordered, and a threshold may show «few left». The payment is reserved when the order is placed and captured only when the owner ships; an order that cannot be filled is cancelled, which releases the reservation with nothing charged. The count is lowered by the owner when publishing, never by the function.
   - Rejected: a commit to git per sale. It needs a write credential in a callback nobody signs in to, two orders race, and each sale costs a build against the monthly quota.
   - Rejected: the host's key-value store, SQL database or durable objects. They are a database, against the vision, and an eventually consistent store can oversell anyway.
5. **Shipping tables.** The shop settings hold static rules: a flat rate, weight bands, free shipping over an amount, and pickup points. The function recomputes the shipping cost, and the cost is shown before the order button. Where the provider takes a fixed list of shipping options in its own flow, the same table feeds it. Live carrier rates and label purchase are not taken: they need a carrier contract and a server.
6. **Discount codes.** A code gives a percentage, a fixed amount or free shipping, with a validity window and an optional set of products. It is published as an HMAC of the code under a secret pepper held in the host's secrets, so the public repo never shows a code in clear; an admin function behind the publishing sign-in computes the HMAC when the owner creates the code. The checkout asks the shop function whether a code holds and what it gives, and the function compares the code's HMAC with the published ones; a short code can be guessed, so the admin asks for a minimum length. The code is applied before the payment is created. A limit on uses is not taken: it needs state. A members' code may make the member price chargeable; the member price shown without a code stays display only (ADR-0020 decision 6, amended the same day).
7. **MVA.** Catalogue prices are the final prices to the consumer. A seller setting says whether the association is registered for MVA, off by default; it is the VAT status of the site settings (decision 8). Only when it is on does the site write «inkl. mva», show MVA lines and «MVA» after the organisation number, and send a tax rate on the provider's receipt lines. Tax per region or country is not taken.
8. **The information the law asks for lives in the settings.** The site settings of 0.7.24.5 hold the organisation number, the contact details and the VAT status; the shop settings add the shipping costs, the withdrawal right with the standard form and the return costs, and the exceptions (personalised goods, event tickets). The terms and withdrawal page is generated from them, in place of the hand-filled template of 0.7.24.2. The paying button reads as an order with an obligation to pay, with the total, the shipping and the main characteristics right before it. The model leaves room for an online withdrawal function when the amendment LOV-2026-06-19-34 takes effect.
9. **Notices and confirmations.** The provider's webhook reaches the function, which checks the signature and stores nothing. Where the owner sets up the optional email Worker (a second small function beside the site, possible only with the domain's DNS at the host), the function forwards a notice through it to the owner's verified address; otherwise the owner reads the orders in the provider's portal. The buyer's confirmation comes from the provider's receipt, and whether that counts as a durable medium is checked when the provider is chosen; the shop template adds a printable order confirmation with the withdrawal form for the parcel. Functions never log personal data.
10. **The before price.** A product marked as reduced shows the lowest price of the previous 30 days, computed at publishing from the catalogue's git history.
11. **Not taken, each for its reason:**
    - customer accounts: login and buyer data outside git;
    - subscriptions and recurring payments: provider agreements and state;
    - gift cards and store credit: balances are state;
    - several currencies and markets: one price list in NOK for a Norwegian audience;
    - point of sale: hardware, and a till falls under kassasystemlova;
    - abandoned-cart emails: stored carts and email to the buyer;
    - product reviews: storage and moderation;
    - B2B catalogues: accounts;
    - digital downloads: a public repo holds no private files;
    - refunds through Urd: the provider's portal handles them.

## Consequences

- The pure logic (variants and stock, the shipping cost, the code check, the MVA lines, the before price) is one module under `functions/_lib/`, tested in node like the payment module of ADR-0020; the provider adapter stays a thin shell for whichever provider the URGENT item chooses. How it is built goes to ARCHITECTURE.md, and the fields to SCHEMA.md.
- Overselling becomes a cancelled reservation, never a charge for goods that do not exist; the stock figure is as fresh as the last publish.
- Every stock update is a publish, so a busy shop meets the build quota sooner; the shop template advises updating stock in batches.
- The email Worker is optional and set up from the setup guide; a site on the host's default domain, or with its DNS elsewhere, gets no email notice, and the guide points to the provider's portal.
- In the comparison, the price and stock per variant of C67 (shop extensions) are taken into v1.1, codes and the VAT display leave C68 (commerce at gateway scale) for v1.1, and the rest of C68 stays not taken with the reasons of decision 11.
