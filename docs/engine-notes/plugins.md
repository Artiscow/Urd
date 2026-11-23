# plugins.js

The full text of the longer comments in the engine's `plugins.js`, in the file's order, under the name each one explains: a declaration by its name, a comment inside a function by the names around it and the code it stands before. The code keeps a short version of each in its place.

## The module

Plugin loading. The contract is described in docs/SCHEMA.md and schema/plugin.schema.json.

The promises here are the same as for everything else in Urd: a failing plugin never stops the site,
and a plugin written for a different engine version is rejected BEFORE it gets to define anything.
register(Urd) runs against a staging layer: the definitions are adopted only if all of register() completes,
so a plugin that throws halfway never leaves half-finished registrations behind.

## `parseEngineVersion`

Parses an engine version into its numbers: three or more (0.7.7, 0.7.7.1, 0.7.7.0.2), none with a leading zero, and a last number after the third that is not 0.
Two different versions thus never rank equal.

## `satisfiesEngine`

Minimal, dependency-free semver range check for requiresEngine, where a version may carry more than three numbers.
Supports space-separated requirements that must ALL hold: >=x.y.z, >x.y.z, \<=x.y.z, \<x.y.z,
\=x.y.z / x.y.z (exact), ^x.y.z (same major; for 0.y: same minor) and ~x.y.z (same major.minor).
Unknown/unparseable requirements yield false: a plugin with an unintelligible requirement must not be loaded blindly.

## `createStagedUrd`

Staging layer around the Urd registries: register(Urd) defines against
this, and commit() adopts the definitions only once all of register() has
completed, all but an id the engine holds as its own or one already
defined, each skipped with a warning. pluginName, when given, marks the
definitions (def.fromPlugin), so the menus can show plugin content in
their own from-plugins sections.

## `checkProvides`

Compares what the manifest PROMISES (provides) with what register() actually defined.
A mismatch is never fatal (the plugin works), but it is logged so the plugin author sees the contract breach.

## `pluginBlockDesigns`

A plugin block's designs, for the editor's design picker (the design contract, additive): `designs: { prop, items: [{ id, label | labelKey, about | aboutKey, picture? }] }` on the block's def, `prop` naming the prop the block keeps its design in.
The labels and descriptions are resolved with `translate` (the preview's ta, where the plugin's dictionary lives); an item is kept only when its id is a short word, unseen before, and keeps its picture only when it is a picture file on the site itself.
Fewer than two such designs is no choice, and gives null, as do a `prop` that is not a short name and `items` that is not a list.

## `const io`

Network seam: everything the loader fetches or imports goes through here,
so the loading contract (parallel fetch, ordered registration) is
testable in node without a browser.

## `loadPluginLocale`

Loads one plugin dictionary: the nb base at the bottom, the chosen
language on top (a missing language file falls silently back to nb, the
same model as the admin dictionary).

## `loadPluginLocales`

Loads the plugin's strings for the registries: the SITE language for the
 visitor registry, and in the preview ALSO the ADMIN language for the
 admin registry (the canvas chrome). Loading and applying are separate
 steps, so the dictionaries are applied in plugin list order even though
 the files arrive in download order.

## `applyPluginSiteLocales`

Re-adds the plugin strings to the visitor registry. Called after
initSiteLocale on a language switch in the preview: initSiteLocale builds
the dictionary from the engine's nb base, so the plugin keys must be
layered on top again.

## `preparePlugin`

Fetches everything ONE plugin needs: manifest fetch → validation →
requiresEngine check → dictionary, pack languages and entry module in
parallel. Nothing is defined in the registries here, so any number of
plugins can be prepared concurrently.
A failure at any step yields null with a clear log line; the site always
lives on.
A language pack's languages are registered for the editor and its preview alone (`packs`): a visitor's page reads its site language's words through initSiteLocale, so a site in one of the engine's own languages never loads the pack module.

## `preparePlugin › const [locales, , mod]`

The dictionary, the language-pack module and the entry module depend
only on the manifest, so they are fetched in one wave. The dictionary
is applied at commit, BEFORE register()/render, so the plugin's
t()/ta() lookups hit from the first rendering. Visitors: loadPlugins
runs after initSiteLocale in boot. Preview: the urd-plugins message
arrives after initAdminLocale, so both registries are ready.

## `preparePlugin › all › packs && manifest.languages?.length`

The language pack's languages are registered as the plugin is
prepared, before the drawing that follows the plugins' load, so the
preview knows a draft-enabled pack language without re-reading the
manifests. The pack module is fetched only here, never for a plugin
without languages.

## `commitPlugin`

Registers ONE prepared plugin: dictionary → register(staging) → commit →
provides check; a plugin without an entry module (a pure language pack)
stops after its dictionary. Runs in list order, so id collisions between
plugins resolve the same way regardless of which download finished first.

## `loadPluginList`

Loads a list of plugin ids (the enabled list for visitors, the editor's
draft in the preview): every plugin is fetched in parallel, then
registered one by one in list order. An id already loaded is never
fetched again; a list asked for while another loads waits for it
(listQueue), so an id that list loads is not fetched twice.

## `pageTypes`

The block, background and animation types a page and the site's nav and footer use, read from anywhere they stand: a `blocks` list's types, a `layers` list's types, and the type of an `animation`, a `hover` and a section's `blocksHover`.
The boot loads the modules of those that are the engine's own as the page asks for them (loadCoreTypes), and waits for the plugins only when one is not the engine's own (needsPlugins).

## `needsPlugins`

Whether a page needs a plugin to be drawn: a type it uses that is neither defined nor held by the engine as its own (a core type whose module is loaded as a page asks for it, core-types.js).
A type the engine knows only by an alias counts as not defined, since a plugin that still defines that old id wins for its own data (ADR-0021).

## `engineVersionOf`

The engine version a module's address names, from the folder it is served from (`/assets/engine/<version>/`, which ADR-0013 holds equal to urd.json's `engine`), or null where the address names none.
