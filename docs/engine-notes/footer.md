# footer.js

The full text of the longer comments in the engine's `footer.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Shared footer: edited in ONE place (site.footer) and shown, while footer.show is on, at the bottom of
every page that footer.hideOn does not list. Additive field since v0.5. Two shapes: the simple one (text
lines only) and the rich one (brand, columns, social links, call to action,
doormat link row, baseline with links), each drawn on its background layers where they are set. Pure logic lives in footer-model.js
and footer-cta.js.
Both shapes show the site's contact details and the legal line (contact-model.js) once they are filled, unless the footer leaves them out (`footer.contact: false`, `footer.legal: false`), and the privacy page's link once one is chosen.

## `mountFooterBg`

Full layered background (additive since v0.6, shared with sections and nav):
a backdrop behind the footer content with the same layer stack as sections.
Prepended into the footer's inner .urd-footer element so it sits behind the content (the simple shape's lines, the rich shape's wrap and baseline).
Returns true when layers were drawn, in which case the rich shape skips the
plain footer.bg color.

## `buildNewsletterForm`

The newsletter form: email field + hidden honeypot + button, submitted with
fetch to a configured endpoint (inline confirmation, no page load). Without
an endpoint it falls back to mailto. Mirrors the form block's submission
on the pure footer-cta.js. In preview nothing is sent, only the
confirmation is shown.

## `buildContactAddress`

The contact details as an \<address>: the address, then the phone and the email, each a link when it is usable.
In a column the address keeps its lines together in one item; inline (the plain and the big call-to-action builds) it is one line, «Street 1, 7030 Town».

## `renderFooter › if (!rich && !baseline.length &&`

On, but with no content: a visible footer, COMPLETELY empty but for its background layers. No text,
no placeholder, no page title; it fills up once the Footer panel gives it
content or a privacy link, or the Legal panel contact details or a legal line. (show off gives no footer at all, handled above.)
