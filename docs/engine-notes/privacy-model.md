# privacy-model.js

The full text of the longer comments in the engine's `privacy-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

The facts the privacy page is written from (0.7.24.2): who is responsible
for the site, what each form sends and to whom, what the checkout does and
through which payment providers, whether visitors are measured, which
third parties' frames the pages hold, and who hosts the site. Read from
site.json and the page files, so the page follows the settings; pure, so
blocks/privacy.js only writes it out (tests/privacy-model.test.mjs).

## `export { CALENDAR_FEED_MINUTES,`

How long a calendar block keeps a feed's events and a page fetched ahead of a press on its link is kept in the browser, as the modules that keep them read it (keep-minutes.js).

## `const BROWSER_KEEPS`

What the site keeps in the visitor's own browser (ADR-0029 decision 4), each with the engine modules that keep it and how long (`until`): the privacy page names every one that applies, in its words `privacy.browser.<id>`, with the period's words `privacy.browser.until.<until>` after them.
The periods: `tab` while the tab is open (sessionStorage), `changed` until the visitor changes it, `taken` until the visitor takes the choice back, `renewed` until the owner changes the announcement, `ordered` until the order is placed or the cart is emptied (`emptied` where no checkout empties it: none, or one that opens an email draft), `paid` while a payment is under way, `minutes` for the minutes in `minutes`, never past the tab's closing.
A module that stores something in a visitor's browser stands here, or the guard in tests/privacy-registry.test.mjs fails, as it does for a kind without its period or its words.

## `const KEEP_TERMS`

Where each company the privacy page names says how long it keeps what it gets (ADR-0029 decision 4): the most precise part of its own terms it publishes, by the section's name as published, read on `checked`.
A company the page names stands here, or tests/privacy-registry.test.mjs fails; a link is checked again when the company's terms move.

## `const KEEP_SOURCES`

Where the «how long» of every kind the privacy page tells comes from: `owner` for what the owner sets in the Legal panel (RETENTION\_KINDS), `code` for what the visitor's browser keeps (BROWSER\_KEEPS), `terms` for what another company keeps (KEEP\_TERMS). The guard holds every kind to one of them.

## `cloudflareBeacon`

Whether one of a page's scripts is Cloudflare Web Analytics' beacon: added by Urd with a token (seo.js mountAnalytics), or by Cloudflare itself, which turns its visit counting on for a domain on its free plan unless the owner turns it off there.
Each address is parsed and its host compared exactly.

## `privacyNameOfHost`

What the privacy page names an outside host by (ADR-0029): the counting of visits, a frame's provider by the covers' list, or null for a host the page does not name.
Every host the site's CSP lets a page reach must have a name here (tests/privacy-registry.test.mjs).

## `paymentProviders`

The providers a checkout's `payments` names: Vipps MobilePay also where the card button goes through Vipps, Stripe where it goes through Stripe, PayPal, and the manual ways (an invoice, a transfer).

## `const RETENTION_KINDS`

The kinds the association keeps whose period the owner sets in the Legal panel (`site.retention`, 0.7.31.2, ADR-0029 decision 4), each with the choices it takes beside a set period; a kind left out is not decided.
Orders (0.7.31.3) take the duty the association is under: `bookkeeping` (bokføringsloven § 13, five years after the end of the financial year, the sales record kept apart), `nif` (a sports club under NIFs lov § 2-11, the same five years) or a period of the owner's own where no act asks for the order to be kept.

## `const ORDER_LAW_COUNTRIES`

The countries whose bookkeeping duties the orders' choices name (researched 6 November 2026, Lovdata); elsewhere an order is kept for the owner's own period or the kind is not decided.

## `retentionOf`

A kind's period as stored, read safely: `{until: 'period', count, unit}`, `{until: 'closed'}` (form messages), `{until: 'unsubscribe'}` (the newsletter) or `{until: 'bookkeeping'}` and `{until: 'nif'}` (orders); null for not decided, which a stored value that is none of these reads as too.

## `privacyModel`

What it returns: `retention` is how long the association keeps the form messages, the newsletter list and the orders (retentionOf), null where it is not decided; `embeds` are the third parties whose frames the pages hold, `atOnce` those of them some page loads with the page (`askFirst: false`) rather than behind the cover; `browser` says what the site keeps in the visitor's own browser beside the embed choice: the light or dark choice where the theme has both, the cart with the last order where a page sells, a calendar's events and height where a page has one, and the closing of the announcement strip where there is one (BROWSER\_KEEPS); `forms` hold the footer's newsletter sign-up first (`footer: true`), then every page's forms.
