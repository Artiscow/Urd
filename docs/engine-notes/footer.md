# footer.js

The full text of the longer comments in the engine's `footer.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Shared footer: edited in ONE place (site.footer) and shown at the bottom of
every page. Additive field since v0.5. Two shapes: the simple one (text
lines only) and the rich one (brand, columns, social links, call to action,
baseline with links, background layers). Pure logic lives in footer-model.js
and footer-cta.js.
Both shapes show the site's contact details and the legal line (contact-model.js) once they are filled.

## `mountFooterBg`

Full layered background (additive since v0.6, shared with sections and nav):
a backdrop behind the footer content with the same layer stack as sections.
Prepended into .urd-footer-inner so it sits behind the wrap/baseline.
Returns true when layers were drawn, in which case the rich shape skips the
plain footer.bg color.

## `buildNewsletterForm`

The newsletter form: email field + hidden honeypot + button, submitted with
fetch to a configured endpoint (inline confirmation, no page load). Without
an endpoint it falls back to mailto. Mirrors the form block's submission
on the pure footer-cta.js. In preview nothing is sent, only the
confirmation is shown.

## `legalText`

The legal line as text: «Apeiron Linjeforening · Org.nr. 974 760 673 MVA · Foretaksregisteret», the representative with the visitor language's title; the contact block writes the same.

## `buildContactAddress`

The contact details as an \<address>: the address, then the phone and the email, each a link when it is usable.
In a column the address keeps its lines together in one item; inline (the plain and the big call-to-action builds) it is one line, «Street 1, 7030 Town».

## `renderFooter › if (!rich && !baseline.length &&`

On, but with no content: a visible yet COMPLETELY empty footer. No text,
no placeholder, no page title; it fills up once something is entered in
the Footer panel. (show off gives no footer at all, handled above.)
