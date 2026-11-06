# ADR-0029: The privacy page follows the site

Date: 6 November 2026
Status: Accepted. Builds on the click-to-load frames of 0.7.24.1 (embed-cover.js) and the privacy page of 0.7.24.2 (`privacy-model.js`, `blocks/privacy.js`); the plugin hosts of [ADR-0006](0006-plugin-csp-needs-model.md) are named on the page with the consent work of 0.7.24.3.

## Context

A site has to tell its visitors who is responsible for their data, what is collected and why, who gets it, how long it is kept and what their rights are (GDPR article 13), and must not keep anything in their browser that the site does not need without asking (ekomloven § 3-15). Urd's site owners are associations without a lawyer, and every Urd release can add a block, a design or a function that keeps something in the browser or reaches another company.

A privacy text written by hand goes wrong the day one of those lands: the owner does not know the engine changed, and the engine does not know the text exists. Since 0.7.24.2 the page is drawn from the site's settings and its pages instead, so it follows what the owner switches on. What it did not follow was the engine itself: a feature that keeps something new in the browser is told on the page only if someone remembers to add it.

## Decision

1. **The privacy page is drawn, never written by hand.** The `privacy` block draws it from site.json and the page files each time it is drawn (`privacy-model.js` holds the facts, `blocks/privacy.js` writes them); the owner changes what it says by changing the site. Its designs lay the same facts out differently: a fact one design tells, every design tells.
2. **What keeps or shares is told in the same commit.** A feature that keeps something in a visitor's browser (local or session storage, IndexedDB, a cookie) or lets a page reach a host other than the site itself (a frame, a script, a beacon, a fetch, a form's endpoint, a payment provider's page) is told on the privacy page in the commit that brings it: the fact in `privacy-model.js` (`BROWSER_KEEPS` for the browser, `privacyNameOfHost` and the covers' providers for the hosts, the facts a page's blocks give), and its words in the site dictionaries in nb, en-GB and tr.
3. **A guard holds it.** `tests/privacy-registry.test.mjs` fails when an engine module uses the browser's storage without standing in `BROWSER_KEEPS` (the editor's and the owner's own storage is named there as exempt, each with its reason), when the CSP in `_headers` lets a page reach a host the privacy page does not name, or when a kind the browser keeps has no words. A form's endpoint and a checkout's providers are read from the blocks themselves, so the owner's own choices need no entry.
4. **How long is said for every kind, and nothing is assumed.** What the association itself keeps (form messages, the newsletter list, orders) is told by the period the owner sets, or plainly as not set where the owner has not decided; what another company gets is told by a link to that company's own privacy terms, since it decides and its terms outlive any figure Urd could copy; what the visitor's browser keeps is told by the period the code keeps it. A legal period is stated only from a primary source, with the law named.

## Consequences

- A new block, design or function that stores or shares cannot pass the tests until the privacy page tells it; the guard reads the engine's code and `_headers`, so it needs no list of features to be kept by hand.
- The owner's own periods, and which bookkeeping case the association is in, are set in a Legal panel of their own (0.7.31, chosen 6 November 2026), beside the contact details and the choice of the privacy and the terms pages. Until then the page gives the criteria it has today for form messages and the newsletter, and names no period for orders, asking the reader to ask.
- The bookkeeping act binds only some associations (the research of 6 November 2026, in BACKLOG 0.7.31.3), so the page never states a legal period for orders without the owner's answer to which case is theirs.
- A plugin that reaches an outside host declares it in its manifest's `csp` (ADR-0006); the privacy page names those hosts with the consent work of 0.7.24.3, and the guard covers the core's own hosts until then.
