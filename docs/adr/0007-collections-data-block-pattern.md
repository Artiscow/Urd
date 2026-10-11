# ADR-0007: Collections (the data block pattern)

Date: 19 July 2026. Status: accepted (v0.6 M2). The fields are in [SCHEMA.md](../SCHEMA.md#contentsamlingeridjson-collections).

## Context

Association websites consist largely of LISTS of similar entries: news, notices, publications/issues, events (the calendar block) and products (the shop). Static section templates where each card is hand-placed blocks are right for curated front pages, but wrong for ongoing content: adding a news item should be WRITING A NEWS ITEM, not moving frames. The survey of ApeironLF and the association sites (18 July 2026) showed the pattern clearly: entries as data, several views over the same data.

## Decision

1. **Collections are data in content/.** One file per collection, `content/samlinger/<id>.json`: `{ schemaVersion, id, name, kind, entries }`. Entries have shared field names (`id`, `title`, optional `date`, `text`, `image`, `href`; English identifiers like the rest of the data model), so views can be reused across kinds. `kind` (`news`/`notices`/`publications`/`custom`) only controls which fields the editor highlights. The contract lives in `schema/collection.schema.json` and is lifted with the same stepwise migration pattern as page and site files.
2. **Index file, not directory listing.** `content/samlinger.json` lists the collection ids (same precedent as `plugins/plugins.json`): static hosts cannot list directories.
3. **One core block renders collections.** The `samling` block is an ordinary block in an ordinary section, with three built-in views: `cards` (responsive card grid), `list` (rows with a date badge) and `archive` (grouped by year). The INNER layout of the views is flow, not frames per entry: the block is one frame element, and mobile stacking remains trivial.
4. **Title and entry text are rich text.** Both `title` and `text` are safe rich text with EXACTLY the same visitor protection as the text blocks (the shared sanitiser in engine/sanitize.js), and are edited with the shared floating text editor directly in the block.
5. **Never crash.** A missing collection, an empty collection or missing fields give calm empty states (an instruction in the editor preview, nothing for visitors), the same philosophy as the image block's placeholder.
6. **Drafts like everything else.** Collections are edited in a dedicated Collections panel and drafted like everything else, with the preview rendered from the DRAFT via the bridge.

## Consequences

- The calendar block reuses the view forms, but fetches entries from a FEED instead of content/; the pattern is the same (entries → views).
- The shop's product catalogue becomes a collection with more fields (price, variants); the schema is extended additively then.
- «Save as template» and the template split are not affected: collections are user data under content/** which the publishing guard allows.
- Views are delivered by the core; plugin-provided views are a natural later extension of the registry pattern, but are kept out for now.
