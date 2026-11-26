# blocks/checkout.js

The full text of the longer comments in the engine's `blocks/checkout.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: checkout (the shop).
The order summary is read from the basket (shop.js), the contact fields (name, email, phone, comment) are validated, and the order is sent as an email draft (mailto, zero setup), as JSON to an optional endpoint, or to the optional payment layer (ADR-0020, ADR-0028: Vipps, a card at Vipps or Stripe, PayPal).
The order lines and the total are repeated right above the order buttons, and the buttons' texts say that ordering is a purchase or a payment: angrerettloven § 16 asks for both, and without the wording the buyer is not bound.
The buttons are described by the summary, so a screen reader that tabs to them hears the order and the total.
Under the buttons the seller is named from the Legal panel's contact details (angrerettloven § 8 d), unless the block leaves it out (`seller: false`).
After an order, by any path, the page shows a printable confirmation with the order lines, the total, the buyer, how it is paid, the seller with the organisation number, and the standard withdrawal form (angrerettloven § 18 and § 20); it is kept in this tab's sessionStorage, so a refresh keeps it.
The honeypot field stops simple bots (filled in = discarded silently).
Payment instructions (a Vipps number, a bank account, pay at pickup) are shown in the form above the order summary: one as a line, two or more as a choice the buyer makes before ordering, and the chosen one is named in the order and repeated after it is sent.
An external endpoint requires connect-src in \_headers (ADR-0006).

## `buildConfirmation`

The printable confirmation of an order: a heading with the date and the
reference, the lines and the total, the buyer, how it is paid, the seller
(angrerettloven § 8 d, ehandelsloven § 8), the right of withdrawal and the
standard withdrawal form with the seller filled in (directive 2011/83/EU
annex I B, forskrift 2014-06-20-777 § 1), and a Print button. Printing
shows this section alone (base.css).

## `checkoutBlock › migrations › 1`

1 -> 2: the Vipps button flag and the Vipps number became the payments
settings (ADR-0028): the flag is the Vipps provider, the number the
first payment instruction.

## `checkoutBlock › render › const methods`

The payment instructions above the order summary: one stands as a line; two or more are a radio group, as the form block draws one, and the buyer chooses before ordering.

## `checkoutBlock › render › const providerName`

The optional payment layer (ADR-0020, ADR-0028): a button per provider
sends the basket to the site's own function, which recomputes the total
from the catalogue and answers with the address at the provider; the
payment happens there, and the contact fields may stay empty, since
the provider's page asks for them.

## `checkoutBlock › render › payButton › addEventListener('click') › try { sessionStorage.setItem('urd-pay-re`

The provider, the payment's reference, the provider's own id and the buyer key are kept for the return, which asks whether this payment went through; neither the id nor the key comes from the address, so a shared link confirms nothing and names no buyer.

## `checkoutBlock › render › payButton › addEventListener('click') › setStatus`

503: the provider is not set up; 404: the site has no functions, so the payment is not set up either; 400: this provider cannot take the order (the currency, a product); else a failure that may pass.

## `checkoutBlock › render › const params`

Return from payment (?ordered=\<reference>&via=\<provider>): the basket is emptied and the buyer thanked only when the reference is the one this browser started and the provider's session endpoint says the payment went through, so neither a shared address nor a cancelled payment empties a basket.
The parameters are cleaned away once the payment is settled, so a refresh does not ask again; while the answer is still open they stay, so a refresh asks once more.

## `checkoutBlock › render › const ask`

The provider may send the buyer back before the payment is settled, and the site's function may not answer at the first try, so the page asks a few times while the answer is open.

## `checkoutBlock › render › ask › const data`

A POST, since PayPal's endpoint captures the approved order on this ask.
The buyer key, kept from the start of the payment, lets this page alone read the buyer's details and the amount confirmed.
