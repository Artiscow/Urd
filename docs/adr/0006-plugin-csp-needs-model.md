# ADR-0006: CSP needs model for plugins

Date: 19 July 2026. Status: accepted (v0.6 M1); the motivating cases (calendar, map) moved into the core in September 2026, and the rule stays for third-party plugins; the consequence on the updater rewritten 27 November 2026 with ADR-0014's decision 5, earlier text in [amended/](amended/0006-plugin-csp-needs-model.md).

## Context

Urd's CSP in `_headers` is deliberately strict: `connect-src 'self'`, `frame-src` only with the two privacy-friendly video hosts. Plugins may need external sources: a calendar fetching from `www.googleapis.com` or an iCal URL, a map embedding an OSM host, a payment plugin its provider. At the same time, `_headers` is a Urd-owned file that the publishing guard (guard.js) deliberately refuses to write: if publishing could change headers, a hijacked editor session could remove the entire CSP.

## Decision

1. **The manifest declares the need.** `plugin.json` gets an optional, additive `csp` field: `{ "connectSrc": ["https://…"], "frameSrc": ["https://…"] }`. The values are exact origins (scheme + host), never wildcards.
2. **`_headers` remains Urd-owned and unwritable for publishing.** Opening up CSP changes via the publishing flow is a bigger hole than the friction it saves.
3. **Admin shows the exact action.** The Plugins panel reads the `csp` field and shows which exceptions the plugin needs, with instructions to add them to `_headers` in the repo (a one-off job per plugin, done where the code lives: in git).
4. **The plugin must degrade comprehensibly.** A plugin whose fetch is blocked by CSP must show a calm empty state that explains which line is missing in `_headers`, never a dead block. The pattern is described in [template/plugins/README.md](../../template/plugins/README.md).

## Consequences

- The security model stands: no code path can extend the CSP; only the site owner, in the repo, with the line visible in the diff.
- The friction is deliberate and small: activating a plugin with external needs is two steps (activate in admin, paste the line into _headers), and admin explains both.
- The updater keeps the exceptions the owner added: it writes a new release's `_headers` with the same hosts in the same directives, and leaves a file edited in any other way to the owner, with the release's text to copy (ADR-0014 decision 5).
- A plugin is trusted code, not sandboxed: it runs as the site's own code on every visitor's page and in the editor, a language pack's dictionaries included, with the owner's rights while the owner is signed in, publishing included. The CSP limits what a page may load and connect to, never a navigation that carries data away nor what a plugin does with the owner's rights; the plugin README and the user guides say so.
