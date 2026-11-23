# footer-model.js

The full text of the longer comments in the engine's `footer-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure footer logic: brand, columns, social links and baseline are built from
site.footer, site.links and the page registry. No DOM building, and only whenSettled watches the page's elements - the module is importable in node
and covered by tests/footer.test.mjs; the DOM building lives in footer.js.

## `const str`

Safe to string: hand-edited site.json can hold numbers/booleans where the
model expects text. An empty string keeps .trim()/.split() from throwing and
toppling the whole footer render (the page never dies of bad data).

## `footerBrand`

The brand column: explicit title plus optional tagline. No fallback to the
site title - a footer that was just switched on should be empty, not filled
with the site name. Null when there is nothing to show.

## `footerColumns`

The columns with resolved links (page → path, href → external). Links without
a label are skipped, and a column with no valid links is not rendered (a lone
title is not worth a column in the finished footer).

## `footerPrivacyLink`

The link to the site's privacy page (`footer.privacyPage`, a page id, additive from 0.7.24.2.2): drawn with the page's title on every page's footer, so the page is one press away as the privacy rules ask; nothing where no page is chosen or the chosen one is gone or hidden.

## `footerCta`

The call to action (CTA, additive since v0.6): normalized or null.
`kind` is 'button' (button as a link) or 'newsletter' (email field). `big`
gives the large centered variant. A button CTA requires button text; a
newsletter requires a heading or button text - otherwise the CTA is empty (null).

## `footerSocial`

The footer's row of the site's links (site.links, links-model.js; before
0.7.0.52 the footer's own `social`, lifted by the site migration 4 -> 5),
unless the footer leaves them out (`footer.links: false`).

## `footerLegal`

The legal line's parts (the legal name, the organisation numbers, the VAT number or status and the representative), unless the footer leaves them out (`footer.legal: false`).
On by default once filled, since most countries ask for them to be easy to find.

## `footerDesign`

The design (footer.design, additive from v0.7): `chapters` numbers the
link columns and the contact column under a rule each, `split` gives the brand half the width on
a tinted panel. '' for the standard footer and for anything unknown.

## `whenSettled`

Resolves once no element under `root` is busy fetching its content (`aria-busy="true"`, which the collection, product, calendar and privacy blocks set while they load), or after `ms`.
