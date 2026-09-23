# ADR-0026: Map, form, calendar and analytics move from reference plugins into the core

Date: 23 September 2026. Status: accepted (v0.7, milestone 0.7.18).

## Context

Since v0.6 the calendar, form and map blocks and the analytics hook have shipped as reference plugins under `template/plugins/` (ADR-0006, ADR-0007, the plugin README), next to the Swedish language pack `lang-sv`. They demonstrated the plugin contract: a manifest with `provides`, a block with `version` and `migrations`, a section preset, one injected style tag, imports only from `/assets/urd/`, dictionaries per language, a help chip, and pure logic with tests. None of them has an external dependency: the map embeds OpenStreetMap's own iframe, the calendar fetches through the site's `/api/ics` proxy, the form posts by `mailto:` or to the owner's endpoint, and analytics injects Cloudflare's beacon script.

In use they are not optional extras but what every site built with Urd needs: an association site has a calendar, a contact form and a map, and the owner wants visitor numbers. As plugins they sat in a separate «Plugins» group in the Blocks panel and the section gallery, their editing lived in gears inside the preview instead of the Properties panel, their settings could not be published from admin (`plugins/**` is a user path the publishing guard does not write, so the analytics token had to be hand-edited in git), and their CSP hosts had to be pasted into `_headers` by hand from the Plugins panel's instruction.

## Decision

1. **The map, form and calendar blocks and their presets become core blocks.** `blocks/map.js`, `blocks/form.js` and `blocks/calendar.js` in the engine, registered like the other blocks, with their pure modules beside them (`osm.js`, `form-model.js`, `ics.js`) and their CSS in base.css. The block ids `map`, `form`, `calendar`, the preset ids `find-us`, `contact-form`, `whats-on` and the legacy aliases (`kart`, `skjema`, `kalender` and the Norwegian preset ids) are unchanged, so existing pages render identically and no migration is needed. The dictionaries are split by register: visitor strings into `locales/site/*`, editing strings (`*.edit.*`, the help chips) into `locales/admin/*`, with full parity for nb, en-GB and tr (ADR-0012).
2. **The ics parser stays outside the static import closure.** The block definitions must be in the closure (the palette and the registry need them at boot), so they take three modulepreload links; the calendar's parser is loaded dynamically on the first render of a calendar block, as the lightbox and the image editor are.
3. **Analytics is a site setting, not a plugin.** `site.analytics { token }` in site.json (additive, schema in three places), edited in the admin settings pop behind the gear, published with the site, and read by the engine at boot: with a token and outside the preview, the engine injects Cloudflare's beacon script. The two Cloudflare hosts are fixed in `_headers`, which is Urd-owned, so no paste instruction is needed. The settings pop otherwise holds browser preferences; the analytics field is the one site value there, placed where the owner looks for «Urd's own settings».
4. **The plugin layer stays, with the language pack as the shipped example.** `plugins/**` remains a user path, the loader, the manifest contract, the `assets/urd/` shells and the Plugins panel are unchanged, and third-party plugins keep importing only `/assets/urd/`. `lang-sv` is the one reference plugin in the template; the block-plugin pattern is documented in `template/plugins/README.md` with code snippets, and the last shipped implementations are in the repository history (tag v0.7.3).
5. **The in-preview configuration panels of calendar and form are kept for the move and retired in a later stage** (0.7.18.7), when their settings get Content and Style panels like every other core block (ADR-0016).

## Consequences

- The Blocks panel and the section gallery show no «Plugins» group unless a plugin that provides blocks or presets is enabled; the three blocks sit in the core groups (map under Media, form and calendar under Cards and lists).
- The analytics token can be set and published from admin; the visitor page no longer fetches a manifest to find it.
- ADR-0006 keeps its rule for third-party plugins (a manifest declares its CSP needs, the Plugins panel shows the lines to paste), but its motivating cases are now core; ADR-0007's note that events live in a plugin is superseded.
- `tests/map.test.mjs`, `tests/form.test.mjs` and `tests/calendar.test.mjs` test the engine modules; `tests/plugin-compat.test.mjs` keeps guarding plugin copies of the retired pattern, since sites may have copied them.
- The documents that counted «five reference plugins» (FUNKSJONSKART, the template READMEs, the user guide, VISION, VEIKART) are corrected in stage 0.7.18.6.

[ADR-0006]: 0006-plugin-csp-needs-model.md
[ADR-0007]: 0007-collections-data-block-pattern.md
[ADR-0012]: 0012-multilingual.md
[ADR-0016]: 0016-panel-language.md
