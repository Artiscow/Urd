# footer-cta.js

The full text of the longer comments in the engine's `footer-cta.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure logic for the footer CTA's newsletter submission: email validation,
honeypot check, endpoint payload and mailto fallback. No DOM, no fetch (the
DOM and the fetch itself live in footer.js). The helpers mirror, but do not
import, the form block's form-model.js, so the footer's tests stand on their
own. Covered by tests/footer-cta.test.mjs.

## `buildNewsletterMailto`

Mailto fallback when there is no endpoint. Null when the recipient is missing.
Spaces are encoded as %20 (URLSearchParams gives +), so email clients read the
subject and body correctly - the same trick as the form block's buildMailto.
