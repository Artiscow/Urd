# ADR-0006: CSP needs model for plugins

Date: 19 July 2026. Status: accepted (v0.6 M1).

Status 24 September 2026 (milestone 0.7.18): the motivating cases (calendar, map) moved into the core; the rule stays for third-party plugins, and the map's OpenStreetMap host and the analytics hosts are now fixed in `_headers`.

## Context

Urd's CSP in `_headers` is deliberately strict: `connect-src 'self'`, `frame-src` only with the two privacy-friendly video hosts. Several of the v0.6 plugins need external sources: the calendar plugin fetches from `www.googleapis.com` or an iCal URL, the map plugin embeds an OSM host, and future payment plugins will need theirs. At the same time, `_headers` is a Urd-owned file that the publishing guard (guard.js) deliberately refuses to write: if publishing could change headers, a hijacked editor session could remove the entire CSP.

## Decision

1. **The manifest declares the need.** `plugin.json` gets an optional, additive `csp` field: `{ "connectSrc": ["https://…"], "frameSrc": ["https://…"] }`. The values are exact origins (scheme + host), never wildcards.
2. **`_headers` remains Urd-owned and unwritable for publishing.** Opening up CSP changes via the publishing flow is a bigger hole than the friction it saves.
3. **Admin shows the exact action.** The Plugins panel reads the `csp` field and shows which exceptions the plugin needs, with instructions to add them to `_headers` in the repo (a one-off job per plugin, done where the code lives: in git).
4. **The plugin must degrade comprehensibly.** A plugin whose fetch is blocked by CSP must show a calm empty state that explains which line is missing in `_headers`, never a dead block. (The reference plugins in M3/M4 show the pattern.)

## Consequences

- The security model stands: no code path can extend the CSP; only the site owner, in the repo, with the line visible in the diff.
- The friction is deliberate and small: activating a plugin with external needs is two steps (activate in admin, paste the line into _headers), and admin explains both.
- At the template split (M9) the update mechanism must NOT overwrite `_headers` blindly, since the site owner may have added plugin exceptions; this is already captured by the «updater vs. hand-edited files» item (checksum warning).
