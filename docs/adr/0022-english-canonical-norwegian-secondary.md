# ADR-0022: English as the canonical language, Norwegian as secondary

Date: 11 September 2026
Status: accepted; consequence 3 (the placement of the two language versions of the developer documents) amended 11 October 2026, earlier text in [amended/](amended/0022-english-canonical-norwegian-secondary-until-2026-10-11.md).

## Context

Urd started as a Norwegian-language project: documentation, CHANGELOG, commit messages, code comments and the bokmål dictionary as the UI base. ADR-0021 made all code text English, and the developer documents (the ADRs, AGENTS.md, ARCHITECTURE.md and SCHEMA.md) were translated while the rule still named Norwegian canonical in docs and user UI. Two canonical languages in one repo would leave every discrepancy unresolved.

## Decision

English is the canonical language of Urd and Norwegian (bokmål) the secondary; together they are the project's two main languages. Everything developer-facing is English; everything a site owner or visitor may read is available in both.

- Code text (ADR-0021), AGENTS.md, the ADRs and the documents under docs/ are written in English, and so are new entries in CHANGELOG, BACKLOG and TEST-ROUNDS and all commit messages from this date; older entries stay as written. Where a document exists in both languages, the English text applies on discrepancy.
- A document not yet translated stays in Norwegian until its turn, and the English text applies on discrepancy. A translated document takes an English file name. Which documents are in which language is stated in the README document tables.
- User-facing text is available in both English and Norwegian: the README, the user guide and the setup guide under docs/languages/, the UI texts and the seed content.
- The UI texts exist in five languages (ADR-0012); the bokmål dictionary stays the base a missing key falls back to, with full parity enforced for en-GB and tr.
- Outward-facing names stay English: the README root files and the GitHub topics `urd-template` and `urd-plugin`.

## Consequences

- New ADRs, new developer documentation, new log entries and commit messages are written in English from the start. A Norwegian sentence in an English document is an error, not a style choice. The CHANGELOG is mixed at the boundary: entries before 11 September 2026 are Norwegian, entries after are English.
- The README document tables (root and the four translations) state the language of each document, and are updated as documents are translated.
- The vision, the roadmap and the development document have their canonical English text under docs/languages/ (VISION-en-GB, ROADMAP-en-GB, DEVELOPMENT-en-GB) with the Norwegian version beside it in docs/ (VISJON, VEIKART, UTVIKLING), and a change to one is made in both in the same commit.
- The storage paths in user repos (content/samlinger/, content/maler/, page slugs) are unaffected; they are user data (ADR-0021).
