# seo.js

The full text of the longer comments in the engine's `seo.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

SEO metadata in the document head (the SEO pack): description, canonical,
og fields (Open Graph) and JSON-LD for the site. The engine sets the tags
when rendering for visitors (the index shell is Urd-owned and static, so
per-page metadata has to be added client side until the v0.8 baking).
The tags are built pure (node-tested); only applyHeadMeta touches the DOM.

## `pageTitle`

The document title of a page, as the browser tab and the search results show it: the page's own part and the site title in the site's format.
A part that is empty is left out with its hyphen, so a site without a title shows the page alone.

## `pageMetaTags`

The meta tags for a page: [{tag, attrs}] in insertion order.
The og fields fall back stepwise: og.title -> search title -> page title, og.description
-> page description -> site description, og.image -> the site icon.
The X/Twitter card needs only the card tag (the rest is read from the og fields).
A hidden page (noindex in the page registry) gets robots-noindex and no
canonical, but keeps the sharing fields (sharing is a deliberate choice).

## `siteJsonLd`

JSON-LD for the site: Organization with the name, the description and the logo, and the legal name, the organisation number, the address, the phone, the email and the contact points by role of the contact details (the fields from the admin's Legal panel, contact-model.js).
Rich search results for the target audience (associations, small businesses) with no dependency.

## `mountAnalytics`

Visitor measurement (site.analytics): Cloudflare Web Analytics, a beacon
script that sets no cookies and takes no fingerprint. Appended once per
page load on the published page when a token is set; the preview never
calls this (editing sessions are not visits). The hosts are open in Urd's
own \_headers.

## `applyHeadMeta`

Writes the meta tags and the JSON-LD into \<head>. Called per page render for
visitors; its own earlier tags are replaced (client-side navigation can call
it again), marked with data-urd-seo.
