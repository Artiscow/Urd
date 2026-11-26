# blocks/privacy.js

The full text of the longer comments in the engine's `blocks/privacy.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: privacy (0.7.24.2). The site's privacy page, written from the
site's settings and its pages (privacy-model.js) each time it is drawn, so
it follows what the owner switches on: who is responsible, what each form
sends and to whom, the shop and its payment providers, the measuring, the
videos and maps from other companies, the host, the visitor's rights, and
the visitor's own choices on this site (the providers they have let load
at once, each taken back with one press). Its settings are whether it opens
with the page's heading, its design and its look (doc-look.js); the owner
changes what it says by changing the site.
The page files are read over the network as published; in the editor's
preview the other pages' drafts are not seen until they are published.

## `const OTHER_PARTIES`

The third parties beside the frames' providers (which embed-cover.js names, with their privacy terms): the payment providers and the host, each with its name and its own privacy terms.

## `periodText`

A set period in the browser's own words for the unit («12 months», «12 måneder»), in the language of the sentence it stands in (`key`), so a site whose language lacks the sentence reads it whole in bokmål.

## `keepLine`

How long the association keeps a kind, as a sentence: the period or the criterion the owner chose, or, not decided, that it is not and where to ask (the association's email where it has one).

## `const hostNodes`

The host: what it keeps, where it may process it, and how long (`keep`: where the counting of visits stands, its line has told Cloudflare's terms already, and the ledger's table says it in its own column).

## `embedNodes`

The frames from other companies: behind a cover until a press, or with the page, and how long the companies keep what they learn (`keep`; the ledger's table says that in its own column).

## `ledgerNodes`

The ledgers (the designs that set out what is collected): a row for each thing the site or another party gets, with why, who gets it and how long it is kept (GDPR article 13: the purposes, the recipients and the period).
Rows that differ only in who gets them (the frames' companies) are one row with every company named.
`ledger` draws them as a table of three columns, who gets it under the why; `ledger-cards` as a card each, its lines named.

## `ledgerNodes › const add`

A row's recipients are names, or [id, name] for another company, whose own terms tell how long it keeps it (`keep` null: the row links them, one company to a row).

## `pageParts`

The page's parts, each a key (its heading's and its question's), what it holds, and what stands above it (`lead`).
The ledgers set out what is collected under who is responsible, and the host's row stands among them, so the controller's and the host's parts are left out there.

## `pageParts › const shop`

What the site keeps in the visitor's own browser.
The cart is emptied by an order only through a checkout that sends it itself; one that opens an email draft leaves it, as does a shop without a checkout. A payment's reference is kept only where a provider takes the payment.

## `privacyBlock › render`

`heading`: the block opens with the page's heading in the site's language (additive from 0.7.24.2.2; the template's block carries it); `design` and the look beside it (additive from 0.7.24.2.4, doc-look.js): the layout the page is drawn in and how it is dressed; the words are the site's.

## `privacyBlock › render › host.setAttribute('aria-busy')`

The facts need the pages: drawn once they are read, and with the site alone where none can be.
The counting of visits is told where the site switches it on, and where Cloudflare has put its beacon on the page itself.
Busy while the pages are read, as a collection is: the block holds its reserved height, the editor's fit waits for it, and a visitor's footer joins once it is drawn (urd.js boot).
