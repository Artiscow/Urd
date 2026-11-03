# ADR-0015: Redirects ownership - generated host file over a host-neutral data layer

Date: 5 August 2026. Status: accepted; decisions 1 to 3 amended and decision 4 added 3 November 2026 (the list is `content/redirects.json`; `_redirects` is a user path publishing writes in a checked shape; the build is milestone 0.7.23 with the redirects offered where an address goes away; a file written by hand is read into the list first), earlier text in [amended/](amended/0015-redirects-ownership-until-2026-11-03.md). How it is built is described in [SCHEMA.md](../SCHEMA.md#contentredirectsjson-redirects) and [ARCHITECTURE.md](../ARCHITECTURE.md).

## Context

301 redirects with a UI are standard across all the major builders (feature map C13), but the file that controls them at the host (`_redirects` on Cloudflare Pages) is host-specific and borders on Urd-owned files. The 0.6.9 gate was to decide ownership and form, without building anything: without a decision the field would either have cemented a lasting gap against the competitors (a purely user-owned file without a UI) or locked the data model to the Cloudflare format.

## Decision

1. **A generated model with a host-neutral data layer.** The redirect data lives in the content as `content/redirects.json`, a file of its own so visitors never load it: each rule an old address, a target (a path on the site or a web address) and its kind, permanent (301) or temporary (302). Publishing writes `_redirects` in the host's format from it whenever the list changes, in the same way it writes the `<slug>/index.html` routing copies. Only the generated file is host-specific; other hosts can get their own writers later.
2. **`_redirects` is written by publishing, never by hand and never by the updater.** It is a user path in `urd.json`, beside `sitemap.xml` and `robots.txt`, the other files publishing writes for the site, so the updater never touches it and the ADR-0006 conflict (as with `_headers`, which the user hand-edits) does not arise. Since the file is configuration for the host, the publishing guard lets it through only in the shape Urd writes it: comment lines, and lines of an old address, a path or http(s) target and 301 or 302, none from Urd's own addresses; no proxy (200) and no other status.
3. **The UI and the writer are built in v0.7 (milestone 0.7.23).** The list is the admin's (the Pages panel's Redirects dialog), and a redirect is offered where an address goes away: a published page's changed address keeps the old one working by default, and deleting or hiding a published page asks where its visitors go.
4. **A `_redirects` written by hand is read into the list before publishing first writes the file.** A site without `content/redirects.json` reads the repository's `_redirects` through the publishing layer and takes its rules as the list's starting point; where the file cannot be read, the list waits as a draft, so no rule the list can hold is lost, and the lines it cannot hold (a proxy, a placeholder) are named before publishing writes over them.

## Consequences

- The data model remains host-neutral (the spirit of ADR-0003: an adapter-friendly boundary towards the host).
- `_redirects` left the guard's deny list in the same commit as the writer, with its content checked, and the completeness test in tests/guard.test.mjs classes it as a user path.
- A site that added `_redirects` by hand before the build keeps its rules: they are read into the list, and written back in Urd's form at the first publish that changes the redirects; lines Urd cannot hold (a proxy, a placeholder) are left out.
- The host follows a redirect even where a page stands, so a rule from a shown page's address hides the page: the editor marks such a rule, and publishing asks before it goes out.
