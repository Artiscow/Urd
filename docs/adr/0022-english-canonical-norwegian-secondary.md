# ADR-0022: English as the canonical language, Norwegian as secondary

Date: 11 September 2026
Status: Accepted

## Context

Urd started as a Norwegian-language project: documentation, CHANGELOG, commit messages, code comments and the bokmål dictionary as the UI base. ADR-0021 made all code text English. The documentation then followed in the same direction: the ADRs, AGENTS.md, ARCHITECTURE.md and SCHEMA.md were translated on 11 September 2026, while the rule «Norwegian (bokmål) is canonical in docs and user UI» still stood. Two canonical languages in one repo would leave every discrepancy unresolved.

## Decision

English is the canonical language of Urd and Norwegian (bokmål) the secondary; together they are the project's two main languages. Everything developer-facing is English; everything a site owner or visitor may read is available in both.

- Code text (ADR-0021), AGENTS.md, the ADRs and the documents under docs/ are written in English, and so are new entries in CHANGELOG, BACKLOG and TESTRUNDER and all commit messages from this date; older entries stay as written. Where a document exists in both languages, the English text applies on discrepancy.
- Documents not yet translated (VISJON, VEIKART, UTVIKLING, BACKLOG, TESTRUNDER, sammenligning/, CONTRIBUTING) stay in Norwegian until they are translated, one document at a time. Translated documents take an English file name (SKJEMA.md became SCHEMA.md, ARKITEKTUR.md became ARCHITECTURE.md, the ADR slugs became English), and every link is updated in the same commit.
- User-facing text is available in both English and Norwegian: the README, the user guide and the setup guide under docs/languages/, the UI texts and the seed content.
- The UI texts exist in five languages (ADR-0012); the bokmål dictionary stays the base a missing key falls back to, with full parity enforced for en-GB and tr.
- Outward-facing names stay English: the README root files and the GitHub topics `urd-template` and `urd-plugin`.

## Consequences

- New ADRs, new developer documentation, new log entries and commit messages are written in English from the start. A Norwegian sentence in an English document is an error, not a style choice. The CHANGELOG is mixed at the boundary: entries before 11 September 2026 are Norwegian, entries after are English.
- The README document tables (root and the four translations) state the language of each document, and are updated as documents are translated.
- The docs/languages/ pattern flips for the developer documents: the English original will sit in docs/ and the bokmål text under docs/languages/, once VISJON, VEIKART and UTVIKLING are translated; until then the existing en-GB files there are the English text that applies.
- The storage paths in user repos (content/samlinger/, content/maler/, page slugs) are unaffected; they are user data (ADR-0021).
