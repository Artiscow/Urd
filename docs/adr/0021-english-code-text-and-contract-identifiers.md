# ADR-0021: English code text and contract identifiers

Date: 30 August 2026
Status: accepted; text restructured 11 October 2026 (the name map and the audit inventories moved to SCHEMA.md and DEVELOPMENT-en-GB.md, no decision changed), earlier text in [amended/](amended/0021-english-code-text-and-contract-identifiers-until-2026-10-11.md).

## Context

The codebase was Norwegian-language in every layer: ~5,450 Norwegian comment lines, ~380 Norwegian string lines outside the dictionaries, 477 Norwegian test descriptions, and a mixed flora of identifiers where 11 block types, one background layer and 26 section preset ids were Norwegian values persisted in user data. The project's own line (English identifiers in data contracts, cf. the `V1_REASONS` migration and the icons.js contract) was unevenly applied. Before v1 is the last chance to correct the contract values with baked-in migrations (ADR-0005 addendum); after v1 every name would have been frozen.

## Decision

All text in code is written in English: comments, strings, error and console messages, test names, identifiers and data contract values. The rule is in AGENTS.md (Writing style). Norwegian exists only in the language dictionaries (locales), the documents and log entries not yet translated (ADR-0022), site content (content/, seed texts, the 404 page and the noscript lines as page text in the template's language) and test data that is deliberately Norwegian content. A Norwegian word is allowed in code only as a technical term (a language name), as migration data, as translation data, as a match on Norwegian user content, or as a default that is user data (the currency unit).

### The name map

- The persisted contract values (block types, the slideshow background layer, section roles, preset ids and prop enum values) are English, lifted from their Norwegian values by migrations. The map from old to new token is in SCHEMA.md beside the migrations.
- The editor's own ids that are never persisted in the repo (the site theme presets, derived from tokens; the admin theme ids in the browser's localStorage) are English, with migrate-on-read for the localStorage values.
- Plugin-owned tokens (the calendar, map and form blocks and presets, the plugin ids, the manifest field `provides.templates` and the API object `Urd.templates`) keep their old names as aliases with permanent backwards compatibility.
- Engine file names, test file names, JS identifiers, i18n key names and CSS classes are renamed correspondingly (coordinated changes, no migration).

### The migration model

- Core tokens are lifted with two stepwise page migrations following the `V1_REASONS` precedent (block and layer types in the first, preset ids in the second), baked in pre-v1 (ADR-0005 addendum). Template payloads are lifted on insertion.
- Plugin-owned tokens are NEVER migrated in page data: `plugins/**` is userPaths, so old plugin folders in user repos register old ids forever, and migrated data would lose the match. Instead the registries (registry.js) get alias support: the engine registers old->new, so old data matches the new plugin via the alias, while the old plugin still matches directly.
- localStorage draft keys with Norwegian segments are migrated on read, so no browser draft is lost.

### Deliberate limits

- Storage paths in user repos are kept: `content/samlinger/`, `content/samlinger.json`, `content/maler/`, `content/maler.json`, the wrapper keys `index.samlinger`/`index.maler` and page slugs. The files are user data (userPaths) that the updater never touches, the RSS addresses sit in subscribers' readers and deployed functions read the old paths, and a dual-read fallback would cost an extra probe on every visit with no user-visible gain. To be reconsidered at the v0.8 baking, where the publishing output is regenerated anyway.
- The CSS classes are runtime-generated and never persisted, so they are renamed without migration. Custom CSS targeting old class names must be updated by the site owner.

## Consequences

- Migration and alias tests guard the contract: full lifting of all old tokens, idempotence, and the plugin matrix (old data against old and new plugin).
- i18n key renames must hit all five admin dictionaries and the site dictionaries in the same commit as the consumers (the parity test rejects unknown keys).
- The completion criterion is observable: a repo-wide Norwegian audit is clean outside the permitted places. The audit is run in three layers, since an æøå grep alone does not find Norwegian written without æøå; the working rule is in DEVELOPMENT-en-GB.md.
- The æøå remainders that are allowed under the rule above (language names as technical terms, migration data, translation data, matches on user content and user-data defaults) are inventoried in DEVELOPMENT-en-GB.md. The plugin manifests' `name` field is the English fallback, while `names.nb` carries the Norwegian text.
- Future code is written in English from the start; a Norwegian literal in code is a bug, not a matter of style.
- Plugin folders copied from older templates keep running against later engines, so the aliases are one part of a wider compatibility surface, documented in SCHEMA.md under «The compatibility surface for plugin copies».
