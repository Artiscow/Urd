# blocks/form.js

The full text of the longer comments in the engine's `blocks/form.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Core block: form. A contact form following the ApeironLF model: by
default it sends through the visitor's email client (mailto, zero setup),
or to an optional endpoint (the owner's Apps Script or Pages Function)
via fetch. A honeypot field guards against bots. The settings (send mode,
recipient, fields, texts) are edited in the Properties panel; the help
chip (ADR-0008) explains the conventions.

Visitor input is NEVER set as HTML (only .value/textContent). Endpoint mode
requires the owner to open connect-src for the endpoint in \_headers; the
tooltip in Properties says so.

## `fieldControl › if (field.type === 'select'`

A visitor-facing dropdown is a NATIVE select with color-scheme (ADR-0009
covers editing UI only); an empty placeholder option is what makes the
required check possible.

## `renderForm › addEventListener('submit') › const done`

Endpoint mode shows the owner's receipt text, or that the message was sent; mailto mode always says that the visitor sends the opened draft, since nothing has been sent yet.
