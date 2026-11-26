# form-model.js

The full text of the longer comments in the engine's `form-model.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Pure form logic for the form block (no DOM, no fetch): validation,
honeypot, mailto building and payload shaping. Everything here is
unit-tested in node; blocks/form.js handles rendering and submission.

Visitor input is NEVER treated as HTML: the values are URL-encoded for
mailto and sent as JSON to an optional endpoint. The honeypot is a hidden
field that bots fill in; when it is filled in, the submission is discarded.

## `validate`

Validates the collected values against the field definitions.
A checkbox carries a boolean value (required = it must be ticked); select
and radio fields with `options` accept only values from that list (a guard
against tampered submissions in endpoint mode); a date must be a valid ISO
date.

## `validate › const requiredMsg`

The message templates can be overridden (blocks/form.js passes the
visitor language's texts via t()); the defaults are English, so the
node tests stand on their own.

## `bodyLines`

"Field: value" lines, one per field that has a value (plain text, for the
 email body). A ticked box becomes the yes word (opts.yes); an empty box is
 left out like any other empty field.

## `buildPayload`

Payload for an external endpoint: the field values plus sender context.
The honeypot is deliberately left out (it is a client-side guard only).
Checkbox fields are sent as real booleans, the rest as trimmed strings.
