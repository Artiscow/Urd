# ADR-0021: English code text and contract identifiers

Date: 30 August 2026
Status: Accepted

## Context

The codebase was Norwegian-language in every layer: ~5,450 Norwegian comment lines, ~380 Norwegian string lines outside the dictionaries, 477 Norwegian test descriptions, and a mixed flora of identifiers where 11 block types, the background layer `bildegalleri` and 26 section preset ids were Norwegian values persisted in user data. The project's own line (English identifiers in data contracts, cf. the `V1_REASONS` migration and the icons.js contract) was unevenly applied. Before v1 is the last chance to correct the contract values with baked-in migrations (ADR-0005 addendum); after v1 every name would have been frozen.

## Decision

All text in code is written in English: comments, strings, error and console messages, test names, identifiers and data contract values. The rule is in AGENTS.md (Writing style). Norwegian remains only in the language dictionaries (locales), the documentation (docs/, CHANGELOG, commit messages), site content (content/, seed texts, the 404 page and the noscript lines as page text in the template's language) and test data that is deliberately Norwegian content.

### The name map

- Block types (migrated): samling->collection, galleri->gallery, tidslinje->timeline, sitat->quote, statistikk->stats, tabell->table, deling->share, nedteller->countdown, produkt->product, handlekurv->cart, kasse->checkout. Background layer: bildegalleri->slideshow.
- Section roles (migrated, found during the implementation): flate->surface, aksent->accent, invers->inverse, dus->soft, dempet->muted, dyp->deep, uthevet->highlighted.
- The site themes' preset ids in the editor (never persisted; the active preset is derived from tokens): bronn->well, stein->stone, plomme->plum, hav->ocean, natt->night, with the themePreset.* keys renamed in all five dictionaries.
- The admin themes' ids (persisted only in the browser's localStorage under `urd-admin-theme`, never in the repo): lilla->purple, bronn->well, gull->gold, graa->grey, nordlys->aurora, skumring->dusk, glo->ember, with migrate-on-read in the editor as for the draft keys. Found in the final audit; the site themes store tokens, not preset ids, and need no migration.
- Norwegian prop enum values (migrated via the definitions' own migrations, ADR-0005): timeline.variant venstre->left/veksler->alternating, timeline.marker fylt->filled, quote.variant stor->large/kort->short, and the background layer image.fit vanlig->plain/flislegg->tile/egen->custom. The original scan covered only the block definitions and overlooked the background layers; the fit values were found in the final audit and are migrated by imageLayer 1 -> 2.
- Preset ids (migrated): tom->blank, bilder->images, galleri->gallery, kontakt->contact, hero-sentrert->hero-centered, funksjonskort->feature-cards, funksjonskort-enkel->feature-cards-simple, nyheter->news, nyheter-samling->news-collection, oppslagstavle->noticeboard, publikasjonsarkiv->publication-archive, arrangementer->events, tidslinje->timeline, steg->steps, hovedoppslag->lead-story, produkter->products, butikk->shop, butikk-hero->shop-hero, butikk-kategorier->shop-categories, butikk-tillit->shop-trust, butikk-utstilling->shop-showcase, kasse->checkout, sitat->quote, statistikk->stats, sponsorer->sponsors, medlemskap->membership.
- Plugin-owned tokens (aliases, never migrated): the blocks kalender->calendar, kart->map, skjema->form; the presets hva-skjer->whats-on, finn-oss->find-us, kontaktskjema->contact-form; the plugin ids kalender->calendar, kart->map, skjema->form, sprak-svensk->lang-sv. The manifest field provides.maler->provides.templates and the API object Urd.maler->Urd.templates, both with permanent backwards compatibility.
- Engine file names, test file names, JS identifiers, i18n key names and CSS classes are renamed correspondingly (coordinated changes, no migration).

### The migration model

- Core tokens are lifted with two stepwise page migrations following the `V1_REASONS` precedent: `pageMigrations[2]` (block types and layer types, PAGE_SCHEMA_VERSION 3) and `pageMigrations[3]` (preset ids, PAGE_SCHEMA_VERSION 4). The migrations are baked in pre-v1 (ADR-0005 addendum). Template payloads are lifted on insertion via the same path as the mobile lifting.
- Plugin-owned tokens are NEVER migrated in page data: `plugins/**` is userPaths, so old plugin folders in user repos register old ids forever, and migrated data would lose the match. Instead the registries (registry.js) get alias support: the engine registers old->new, so old data matches the new plugin via the alias, while the old plugin still matches directly.
- localStorage draft keys with Norwegian segments are migrated on read (read the old key when the new one is missing, write the new, delete the old), so no browser draft is lost.

### Deliberate limits

- Storage paths in user repos are kept: `content/samlinger/`, `content/samlinger.json`, `content/maler/`, `content/maler.json`, the wrapper keys `index.samlinger`/`index.maler` and page slugs. The files are user data (userPaths) that the updater never touches, the RSS addresses `content/samlinger/<id>.xml` already sit in subscribers' readers, and deployed Vipps functions read the old path and key. A dual-read fallback would have cost a permanent extra 404 probe per visit with no user-visible gain. To be reconsidered at the v0.8 baking, where the publishing output is regenerated anyway.
- The CSS classes are runtime-generated and never persisted, so they are renamed without migration. Custom CSS targeting old class names (urd-handlekurv-*, urd-produkt-* etc.) must be updated by the site owner; the breakage is recorded in CHANGELOG.

## Consequences

- Migration and alias tests guard the contract: full lifting of all old tokens, idempotence, and the plugin matrix (old data against old and new plugin).
- i18n key renames must hit all five admin dictionaries and the site dictionaries in the same commit as the consumers (the parity test rejects unknown keys).
- The completion criterion is observable: a repo-wide Norwegian audit (æøå grep plus stop-word list) is clean outside the four permitted places. The audit MUST be run in three layers, since the æøå grep alone has proved insufficient: (1) æøå, (2) Norwegian stop words without æøå, (3) ASCII-fied Norwegian (sok, naar, paa, forst, rekkefolge). Layer 2 uncovered blocks/shape.js, which was Norwegian in its entirety without a single æøå and therefore invisible in every file count along the way.
- Deliberate æøå remainders in code after the audit, all verified: the language names «bokmål»/«Bokmål» as a technical term in English comments (i18n.js, App.svelte) and the endonym 'Norsk bokmål' in the language list; the currency unit «øre» in vipps.js (the unit the Vipps API actually takes); the slugify literals and the deliberate æøå example in imageTools.js; the V1_REASONS key 'seksjonshøyde' in migrate.js (migration data); the regex matching Norwegian sign-up words in the calendar plugin's ics.js (it reads Norwegian user content); and the Norwegian `names` values in the lang-sv manifest (translation data). In addition the currency default `'kr'` in the shop blocks and the presets: it is user data (the site owner sets the currency), the default reflects the product's Norwegian origin and does not follow the admin language; and the example string «om 3 døgn» in the relativeDays comment in i18n.js. The plugin manifests' `name` field is the fallback and was made English, while `names.nb` carries the Norwegian text.
- Future code is written in English from the start; a Norwegian literal in code is a bug, not a matter of style.
- Addendum 16 September 2026: plugin folders copied from the 0.6.11 template keep running against later engines, so the aliases here are one part of a wider compatibility surface (the section's plain inline min-height, content geometry, the old config panel classes), documented in SCHEMA.md under «The compatibility surface for plugin copies» and pinned by tests/plugin-compat.test.mjs.
