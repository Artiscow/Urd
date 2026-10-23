# Code: how the builders are built, and what Urd can take

This file answers HOW the other builders are built and what Urd can borrow from them: where Urd's architecture already hits, how the editors work when read in their source code, what the published sites actually ship, what the web platform supports in October 2026, how publishing and deploy are done, and finally which techniques Urd takes, has taken, or leaves. What the builders offer (features) is in [FEATURES.md](FEATURES.md), how features are offered and the element catalogue in [ELEMENTS.md](ELEMENTS.md), the look of modern sites in [DESIGN.md](DESIGN.md), and the dated surveys behind ADR-0018, 0019, 0023, 0024 and 0025 in [SURVEYS.md](SURVEYS.md).

Surveyed 11 October 2026: the source code of 21 open-source builders and editors (plus Statamic's docs), the support data for Chrome 155, Firefox 157 and Safari 27, and 30 live pages from 15 builders measured with urdweb.pages.dev as the baseline. Material from the earlier maps (27 July to 3 October 2026) is kept where the research did not supersede it. The ID scheme (T-IDs here), the status words and the source marks, (primary), (secondary), (code) and (measured), are explained in [README.md](README.md). Line numbers in Urd's code refer to engine 0.7.4 as read on 11 October 2026; recommendations carry T-IDs and are collected in [Part 6](#part-6-what-to-take).

---

## Part 1. Where Urd already hits

Urd has by design hit the architecture the field is moving towards. Worth saying out loud before looking at what is missing:

- **Preview is production.** The editor drives the REAL site in an iframe (`?preview=1`) through postMessage, with the same engine and the same render as the published page ([ADR-0001](../adr/0001-hybrid-editor-model.md)). Webflow, Builder.io and Tina work the same way, and Builder.io is practically a reference implementation of what Urd does: the real page in an iframe, a small SDK in the page reporting context, JSON and patches sent down ([How Builder works](https://www.builder.io/c/docs/how-builder-works-technical), primary). Of the open-source editors read in source on 11 October 2026, Payload, Sanity, Storyblok, Tina, Directus and Builder.io drive a real site in an iframe; Puck, GrapesJS and Gutenberg render their own component tree into a same-origin iframe; Decap renders a React template that is not the site at all ([Part 2](#editor-to-canvas-bridge), code). Urd's per-section `urd-preview`, frames-only `urd-frames` and full `urd-preview-full` fallback already behave like Tina's per-island refresh, the best fit for a raw-JS engine.
- **Git as the database, with no hosted service.** Astro closed its hosted database (Studio) for business reasons, not technical ones: no new databases after 1 October 2024, existing ones offline after 1 March 2025 ([Goodbye Studio](https://astro.build/blog/goodbye-astro-studio/), primary). Urd has removed exactly that cost centre and shutdown risk: the cloned repo is the site, Cloudflare Pages serves it, and publishing commits through GitHub OAuth and Pages Functions ([ADR-0003](../adr/0003-publishing-via-github-oauth-and-pages-functions.md)). A selling point, not a gap: there is nothing to shut down. Keystatic, Decap, Pages CMS and Silex take the same git-backed route ([Part 5](#part-5-publishing-and-deploy)).
- **A raw, dependency-free engine.** Hand-written readable JS served raw, no framework, no build step for the engine ([ADR-0002](../adr/0002-svelte-for-editor-readable-js-for-engine.md)). Div soup and heavy runtimes cost measurably: Bricks against Elementor showed about 2.4 times fewer DOM nodes for the same site, a hero of 9 nodes and 1 wrapper against 23 nodes and 4 wrappers ([Bricks vs Elementor performance](https://inspiredmonks.com/bricks-builder-vs-elementor-performance-2026/), secondary, indicative). On 11 October 2026 Webflow still loaded jQuery 3.5.1 on all three sites measured, Wix shipped React 18 UMD with 138 KB of core-js polyfills, and Ghost's Portal alone was 2.51 MB raw ([Part 3](#part-3-the-generated-site-measured), measured).
- **The discipline of the ADRs.** The migration invariant ([ADR-0005](../adr/0005-versioning-and-migration.md)), the help chip ([ADR-0008](../adr/0008-help-chip-rule.md)), the themed UI rule ([ADR-0009](../adr/0009-themed-ui-rule.md)) and «show only relevant controls» are the kind of discipline few builders match. The decisions as they stand:

| ADR | Title |
|---|---|
| [0001](../adr/0001-hybrid-editor-model.md) | Hybrid editor model: sections with a free canvas inside |
| [0002](../adr/0002-svelte-for-editor-readable-js-for-engine.md) | Svelte for the editor, hand-written readable JS for the engine |
| [0003](../adr/0003-publishing-via-github-oauth-and-pages-functions.md) | Publishing via GitHub OAuth and Cloudflare Pages Functions |
| [0004](../adr/0004-monorepo-with-template-folder.md) | Monorepo with a template folder, and a template repo synced from it |
| [0005](../adr/0005-versioning-and-migration.md) | Versioning and migration: the invariant |
| [0006](../adr/0006-plugin-csp-needs-model.md) | CSP needs model for plugins |
| [0007](../adr/0007-collections-data-block-pattern.md) | Collections (the data block pattern) |
| [0008](../adr/0008-help-chip-rule.md) | The help chip rule («?» on everything with special functions) |
| [0009](../adr/0009-themed-ui-rule.md) | The themed UI rule (never native select in editing UI) |
| [0010](../adr/0010-disclosure-navigation.md) | Nav submenus follow the disclosure pattern (never `role="menu"`) |
| [0011](../adr/0011-native-css-first.md) | Build components native/CSS-first |
| [0012](../adr/0012-multilingual.md) | Multilingual via pure ES module locales, two registries and native Intl |
| [0013](../adr/0013-immutable-engine-versioning.md) | Immutable engine versioning and the copy-refresh duty |
| [0014](../adr/0014-updater-model.md) | The updater model v1: blob-SHA checksum against the baseline tag |
| [0015](../adr/0015-redirects-ownership.md) | Redirects ownership: generated host file over a host-neutral data layer |
| [0016](../adr/0016-panel-language.md) | The panel language and the element menu |
| [0017](../adr/0017-ai-via-local-mcp-server.md) | Optional AI integration via a local MCP server |
| [0018](../adr/0018-bound-content-width.md) | Bound content width |
| [0019](../adr/0019-synced-mobile-model.md) | Synced mobile model per block (the row grid) |
| [0020](../adr/0020-optional-payment-layer-vipps-checkout.md) | Optional payment layer via the Vipps MobilePay ePayment API (hosted redirect) |
| [0021](../adr/0021-english-code-text-and-contract-identifiers.md) | English code text and contract identifiers |
| [0022](../adr/0022-english-canonical-norwegian-secondary.md) | English as the canonical language, Norwegian as secondary |
| [0023](../adr/0023-navigation-bar-sizing.md) | Navigation bar sizing |
| [0024](../adr/0024-content-push-on-the-desktop-canvas.md) | Content push on the desktop canvas |
| [0025](../adr/0025-the-sizing-model.md) | The sizing model: the dragged width, and a height that follows the content or is the block's own |

**Measured advantages.** Of the 30 pages from 15 builders measured on 11 October 2026 ([Part 3](#part-3-the-generated-site-measured)), Urd's demo was ahead of every other builder on four counts:

| Advantage | Urd (measured, [urdweb.pages.dev](https://urdweb.pages.dev/)) | The others (measured) |
|---|---|---|
| The strictest script CSP | `script-src 'self'` plus Cloudflare's own analytics host, no `unsafe-inline` | No other builder measured has a script CSP without `unsafe-inline` limited to its own origin. Webflow's is mostly report-only with a large allowlist, Shopify's covers only mixed content and framing, Framer, Wix and Squarespace send none |
| Speculation Rules as an HTTP header | `Speculation-Rules: "/speculation-rules.json"`, prefetch and prerender at moderate eagerness, `/admin/*` and `/api/*` excluded | The only site that sends them as a header. WordPress core and Wix inline them as `<script type="speculationrules">`, which would need a CSP exception |
| Zero font bytes | System font stacks only | framer.com inlines 378 `@font-face` rules; Carrd Pro embeds 208 Google Fonts faces; Figma Sites uses `font-display: block` |
| No third parties by default | The only optional third party is Cloudflare Web Analytics (cookieless), off until a token is set | Wix (Thunderbolt, Sentry), Squarespace (Sentry), Ghost (Portal 2.5 MB, stats), Shopify (perf-kit, Trekkie), Webflow (jQuery from a CDN on every site) |

**Modern CSS already in use.** The measured base.css holds `@container` 12 times, `light-dark()` 5 (14 with `content/theme.css`), `:has()` 26, `@view-transition` 1, `animation-timeline` 2 (parallax under `@supports (animation-timeline: view())`), reduced-motion queries 16, `:focus-visible` 24, `color-mix()` 193, `interpolate-size` 4 and `anchor-name` 2 ([urdweb.pages.dev](https://urdweb.pages.dev/), measured). Only Shopify Horizon used more modern CSS among the sites measured.

**Build-side invariants already coded** (the engine lessons in [AGENTS.md](../../AGENTS.md)):

- Ids from `crypto.getRandomValues`, since `crypto.randomUUID` does not exist on insecure origins.
- Listeners scoped by an AbortController that is aborted on re-render, so nothing stacks.
- Auto-grow changes the display only, never the frame (ADR-0024).
- No native `<select>` in themed UI; hover guarded with `pointerType === 'mouse'` for hybrid devices.
- A `$state.snapshot` before every `postMessage`.
- IntersectionObserver for one-off entrance, deliberately kept (ADR-0011 decision 4).
- The native moves are made: FAQ as `<details name>`, the lightbox, cart drawer and quick view on `<dialog>`, parallax as scroll-driven CSS behind `@supports`, theme without FOUC through `light-dark()` and `color-scheme`, cross-document View Transitions, scroll lock through `body:has(dialog:modal)`, gradient pan and orbit on `transform`, and the five floating menus of editor and engine (`Dropdown.svelte`, `ColorPicker.svelte`, `GlyphPicker.svelte`, `dropdown.js`, `color-picker.js`) on the Popover API with anchor positioning behind the gate in `anchored.js` (see [Closed](#closed)).
- The gradient layer's pan loop runs on a measured runner moved by `transform` (`backgrounds/gradient.js`), so the loop is seamless and never repaints the layer (T89).
- One JS construction is kept on purpose: pinned blocks use `position: fixed` from `sticky.js`, since `position: sticky` can never leave its own container and the «let go» model (pinning past its own section) needs a free hand.

The rest of this file is about the patterns behind the others, and which of them Urd can borrow without giving up the above.

---

## Part 2. The editor, read from source code

How the editors are built, mechanism by mechanism. The code was read on 11 October 2026 from each project's default branch on raw.githubusercontent.com (code): Webstudio, Puck, GrapesJS, Gutenberg, Payload, Sanity, Storyblok, Tina, Builder.io, Onlook, Directus, Craft.js, Plasmic, Keystatic, Decap, Pages CMS, Silex, Ghost Koenig, Penpot, tldraw and Excalidraw; Statamic from its documentation only. Not verified in code: the GrapesJS Studio SDK is commercial and closed (its free plan covers 1,000 sessions a month, [grapesjs.com](https://grapesjs.com/blog/meet-studio-sdk), primary), and Storyblok's bridge itself ships as the npm package `@storyblok/preview-bridge`, with only its loader in the monorepo. Each mechanism ends with «For Urd» and the T-IDs it gives.

### Editor-to-canvas bridge

**Webstudio** (code)
- **Authenticated pubsub.** Builder and canvas are the same app, the canvas an iframe ([`pubsub/create.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/pubsub/create.ts), code). It captures `window.postMessage` and `window.parent.postMessage` when the module loads, «to avoid postMessage interception from the canvas». The builder creates a random 10-byte token on `window.top`; the canvas reads it and clears it; every message is `{action, token}`, a wrong token throws, and messages without a token (browser extensions) are ignored.

  ```ts
  let token = window.self === window.top ? getRandomToken() : window.top?.[apiTokenKey];
  if (window.top) {
    // Initialize token at the Builder, reset it on the Canvas after reading
    window.top[apiTokenKey] = window.self === window.top ? token : undefined;
  }
  ```
- **Batching.** All incoming messages run inside one requestAnimationFrame queue ([`raf-queue.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/pubsub/raf-queue.ts), code).
- **Sync per transaction as immer patches.** 13 server-synced stores (pages, breakpoints, instances, styles and others) go through an `immerhin` store ([`sync-stores.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/sync/sync-stores.ts), code); received patches are `structuredClone`d «to recreate with the current realm's classes» before they are applied ([`sync-client.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/sync-client.ts), code). Interface state (selection, hover outline, text toolbar, drag state, about 30 stores) is synced as whole values.
- **No full re-render.** Canvas styles are diffed by object identity (`computeStylesDiff` to `setDeclaration`/`deleteDeclaration`, then one render in the next frame), which works because immer's structural sharing keeps unchanged declarations as the same objects ([`canvas/shared/styles.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/shared/styles.ts), code).
- **Link capture.** Link clicks and form submits in the canvas become page switches ([`interceptor.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/interceptor.ts), code).

**Puck** (code): a same-origin iframe with no message protocol. React is rendered into the iframe with `createPortal`, parent stylesheets are mirrored into `<style data-puck-style-mirror>` and kept in sync by a MutationObserver, and both sides share one zustand store ([`AutoFrame/index.tsx`](https://github.com/puckeditor/puck/blob/main/packages/core/components/AutoFrame/index.tsx), code). A per-node registry `registerNode(id, {sync, hideOverlay, showOverlay})` re-syncs overlays per id without re-rendering the tree ([`store/slices/nodes.ts`](https://github.com/puckeditor/puck/blob/main/packages/core/store/slices/nodes.ts), code).

**GrapesJS** (code): a same-origin iframe; Backbone views render straight into the frame's document, with no postMessage ([`FrameView.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/canvas/view/FrameView.ts), code).

**Gutenberg** (code): a same-origin iframe built from `srcDoc` plus assets, with the block list rendered into it through `createPortal`. `useBubbleEvents` re-dispatches `keydown`, `keypress` and `dragover` onto the `<iframe>` element and adds the frame's offset to mouse coordinates so draggables do not «jump» ([`iframe/index.jsx`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/iframe/index.jsx), code). WordPress 7.0 iframes the post editor unless a block has apiVersion below 3, and 7.1 always does ([make.wordpress.org](https://make.wordpress.org/core/2026/02/24/iframed-editor-changes-in-wordpress-7-0/), primary).

**Payload** (code): the admin posts the WHOLE document, `{type:'payload-live-preview', data, ...}`, on every form-state change, with the preview URL as the target origin ([`LivePreview/Window/index.tsx`](https://github.com/payloadcms/payload/blob/main/packages/ui/src/elements/LivePreview/Window/index.tsx), code). The site side checks `event.origin === serverURL` ([`isLivePreviewEvent.ts`](https://github.com/payloadcms/payload/blob/main/packages/live-preview/src/isLivePreviewEvent.ts), code), POSTs the draft back to fill in relationships ([`mergeData.ts`](https://github.com/payloadcms/payload/blob/main/packages/live-preview/src/mergeData.ts), code), and caches the previous data so changes compound ([`handleMessage.ts`](https://github.com/payloadcms/payload/blob/main/packages/live-preview/src/handleMessage.ts), code). In server-rendered mode the admin posts an empty event and the page calls `router.refresh()` ([docs](https://payloadcms.com/docs/live-preview/server), primary).

**Sanity** (code): Comlink, a three-way handshake (`syn`, `syn-ack`, `ack`) with `HANDSHAKE_INTERVAL = 500`, `HEARTBEAT_INTERVAL = 1000` and `RESPONSE_TIMEOUT_DEFAULT = 3_000`, plus request/response, channels and origin validation ([`comlink/constants.ts`](https://github.com/sanity-io/comlink/blob/main/packages/comlink/src/constants.ts), [README](https://github.com/sanity-io/comlink), code). DOM nodes are linked to their source with «stega», edit info embedded as invisible characters in strings ([`stegaEncodeSourceMap.ts`](https://github.com/sanity-io/client/blob/main/src/stega/stegaEncodeSourceMap.ts), code), skipping URLs, dates, slugs, ids and SEO paths ([`filterDefault.ts`](https://github.com/sanity-io/client/blob/main/src/stega/filterDefault.ts), code).

**Storyblok** (code): the API's `_editable` is an HTML comment turned into `data-blok-c` and `data-blok-uid` attributes ([`editable.ts`](https://github.com/storyblok/monoblok/blob/main/packages/js/src/editable.ts), code); the bridge is a dynamic import with a callback queue ([`bridge.ts`](https://github.com/storyblok/monoblok/blob/main/packages/js/src/bridge.ts), code), and the `input` event delivers the whole story ([`onStoryblokEditorEvent.ts`](https://github.com/storyblok/monoblok/blob/main/packages/live-preview/src/onStoryblokEditorEvent.ts), code).

**Tina** (code): `useTina` posts `{type:'open', query, variables, data, id}` and receives the whole query result, reporting `field:selected` from `data-tina-field` ([`react.tsx`](https://github.com/tinacms/tinacms/blob/main/packages/tinacms/src/react.tsx), code). The vanilla bridge checks the origin AND the source ([`bridge/src/config.ts`](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/bridge/src/config.ts), code):

```ts
export function isFromAdmin(event: MessageEvent): boolean {
  if (typeof window === 'undefined') return false;
  if (!configuredAdminOrigins.includes(event.origin)) return false;
  return event.source === window.parent;
}
```

Per-island refresh re-fetches every `[data-tina-island]` with the unsaved data POSTed as JSON («POST (vs header) avoids the ~8KB Latin-1 cap»); the first update runs at once and later ones are debounced into one pass ([`island-refresh.ts`](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/bridge/src/island-refresh.ts), code).

**Builder.io** (code): generation 1 sends path patches `{op, path, value}` per content id ([`builder-content.component.tsx`](https://github.com/BuilderIO/builder/blob/main/packages/react/src/components/builder-content.component.tsx), code), applied by `applyPatchWithMinimalMutationChain`, which copies only the objects along the path so unchanged subtrees keep their identity ([`apply-patch-with-mutation.ts`](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/functions/apply-patch-with-mutation.ts), code). Generation 2 merges the whole content ([`enable-editor.lite.tsx`](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/components/content/components/enable-editor.lite.tsx), code). The trust check accepts http/https from a hostname allowlist ([`is-from-trusted-host.ts`](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/functions/is-from-trusted-host.ts), code), and `builder.evaluate` executes code the editor sends, guarded only by that host check ([`init-editing.ts`](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/scripts/init-editing.ts), code).

**Onlook** (code): Penpal RPC over postMessage from a preload script injected into the user's app, with `allowedOrigins: ['*']` and «TODO: Use a proper origin» ([`preload/script/index.ts`](https://github.com/onlook-dev/onlook/blob/main/apps/web/preload/script/index.ts), code).

**Directus** (code): the page sends `connect`, waits for `confirm`, then sends `edit`, `addToContext` and `navigation`; every message is checked with `sameOrigin(event.origin, new URL(url).origin)` ([`directus-frame.ts`](https://github.com/directus/visual-editing/blob/main/src/lib/directus-frame.ts), code).

**Statamic** (primary): drafts are stored server-side under a token and the iframe reloads with `?token=`, or receives `statamic.preview.updated` without a reload ([statamic.dev](https://statamic.dev/live-preview), primary). CVE-2026-33884, fixed in 5.73.16 and 6.7.2, let a live preview token read restricted content it was not meant for ([cvefeed](https://cvefeed.io/vuln/detail/CVE-2026-33884), secondary).

**Decap** (code): the preview is a React template rendered into `react-frame-component`, not the real site ([`EditorPreviewPane.js`](https://github.com/decaporg/decap-cms/blob/main/packages/decap-cms-core/src/components/Editor/EditorPreviewPane/EditorPreviewPane.js), code).

**Hosted builders, from their documentation.** Framer added On-Page Editing in 2025, where content and CMS pages are edited directly on the rendered page ([alternativeto.net](https://alternativeto.net/news/2025/8/framer-introduces-on-page-editing-for-live-content-updates-and-new-cms-page-creation/), secondary). Keystatic installs as a package that injects admin routes into the site itself, with one schema and two runtimes: local mode writes to disk, GitHub mode commits through a GitHub App ([Keystatic with Astro](https://docs.astro.build/en/guides/cms/keystatic/), primary). That mirrors Urd's `/admin` living in the repo, and «one schema, two runtimes» is a good model for local-versus-published parity (`dev-server.py` locally, Pages Functions when deployed).

**Urd's own finding (11 October 2026).** The editor side checks both origin and source (`editor/src/lib/previewBridge.js:73`), but the preview's listener checks only the origin:

```js
// template/assets/engine/0.7.4/urd.js:263-264
window.addEventListener('message', (event) => {
  if (event.origin !== location.origin) return; // only the editor on the same site
```

Plugin JS runs on the same origin as the editor, so any same-origin window can drive the preview.

**For Urd:**
- Add Tina's `event.source === window.parent` next to the origin check (T1). One line.
- Consider Webstudio's per-session token with `postMessage` captured before plugin code runs (T2), and Sanity's handshake and heartbeat to notice a reloaded or crashed preview and resend the draft (T3).
- Urd's per-section `urd-preview`, frames-only `urd-frames` and the full fallback already behave like Tina's island refresh. The next step is finer patches: one block or one attribute instead of a section re-render, path patches with minimal copying so the iframe can diff by identity, and inverse patches so undo re-renders only the section it touches (T4, the Builder.io model); batch all incoming bridge messages into one animation frame (T5).
- Two lessons to keep: scope preview and publish tokens to exactly one entry (Statamic's CVE), and never accept `'*'` origins or execute code the editor sends (Onlook, `builder.evaluate`).

### Selection and overlays

**Webstudio** (code): overlays outside the iframe. Outline components (`selected-instance-outline.tsx`, hovered, collaborative, block) live in the builder ([`canvas-tools/outline/`](https://github.com/webstudio-is/webstudio/tree/main/apps/builder/app/builder/features/workspace/canvas-tools/outline), code), with rectangles measured in the canvas and synced as stores. The selected element is tracked by a ResizeObserver on each selected element, a MutationObserver on its parent (`attributeFilter: ["style","class"]`), a body-style MutationObserver for ephemeral CSS variables, and subscriptions to styles, instances and props; «contentRect has wrong x/y values for absolutely positioned element. getBoundingClientRect is used instead» ([`selected-instance-effects.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/selected-instance-effects.ts), code). The hover outline goes away while scrolling and is re-measured when scrolling ends ([`instance-hovering.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/instance-hovering.ts), code).

**Puck** (code): overlays inside the iframe, portalled into the frame's body ([`DraggableComponent/index.tsx`](https://github.com/puckeditor/puck/blob/main/packages/core/components/DraggableComponent/index.tsx), code). While a component is selected it listens to scroll (capture) and resize and polls at 10 fps (`MEASURE_EVERY_MS = 100`), re-syncing only when x, y, width or height moved by more than 0.5 px: «respond to scroll/resize + track layout shifts without a global rAF loop». An overlay portal stops `mouseover`/`pointerdown` in the capture phase so interactive UI inside a component works ([`overlay-portal/index.tsx`](https://github.com/puckeditor/puck/blob/main/packages/core/lib/overlay-portal/index.tsx), code).

**GrapesJS** (code): highlight, badge, toolbar and offset elements over the frames ([`CanvasView.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/canvas/view/CanvasView.ts), code); «global tools» and «local tools» update separately, scroll is captured and toolbar updates debounced ([`SelectComponent.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/commands/view/SelectComponent.ts), code). Zoom is a `transform: scale() translate()` on the frames area.

**Gutenberg** (code): outlines inside, toolbar outside. Outlines are pure CSS in the iframe, `::after` with `outline` on `.is-selected` and `.is-highlighted`, plus `outline: 2px solid transparent` «in high contrast mode» ([`block-list/content.scss`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/block-list/content.scss), code). The toolbar is a Popover in the parent with a virtual anchor (the union of the first and last selected block's rectangles), recomputed when a MutationObserver sees the block change ([`block-popover/index.jsx`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/block-popover/index.jsx), code), and wheel events pass «through» popovers to the iframe ([`use-popover-scroll.js`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/block-popover/use-popover-scroll.js), code).

**Sanity** (code): overlays inside the page, framework-agnostic. A MutationObserver finds stega or `data-sanity` nodes, a ResizeObserver per element gives its rectangle, and an IntersectionObserver keeps only visible elements active ([`controller.ts`](https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/src/controller.ts), code). Overlays render into a custom element ([`renderVisualEditing.tsx`](https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/src/ui/renderVisualEditing.tsx), code), and labels use CSS anchor positioning as progressive enhancement, gated on `(anchor-name: --sanity-ve-overlay) and (position-try-fallbacks: flip-block)` ([`cssAnchorPositioning.ts`](https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/src/ui/cssAnchorPositioning.ts), code).

**Directus** (code): `@reach/observe-rect` per element, rAF polling of `getBoundingClientRect` ([`editable-element.ts`](https://github.com/directus/visual-editing/blob/main/src/lib/editable-element.ts), code). **Tina** (code): quick-edit is CSS only, a dashed `outline` on `[data-tina-field]`, solid on hover ([`quick-edit-css.ts`](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/bridge/src/quick-edit-css.ts), code). **Onlook** (code): the overlay layer is in the parent, with hover, click, resize, insert, measurement and snap-guideline components ([overlay folder](https://github.com/onlook-dev/onlook/tree/main/apps/web/client/src/app/project/%5Bid%5D/_components/canvas/overlay), code).

**For Urd:** keep the handles inside the same-origin iframe, as Puck and Sanity do (no coordinate translation). Replace the global capture-phase scroll repositioning (`preview-edit.js:2250` for the text toolbar and `preview-edit.js:3094` for the multi-selection toolbar) with one ResizeObserver plus a parent MutationObserver per selected block and Puck's «changed by more than 0.5 px» guard (T7). Weigh CSS-only hover and selection outlines with a transparent outline for forced colours, an IntersectionObserver so only visible blocks are tracked, and anchor positioning for the floating toolbar where supported (T8).

### Drag and drop

**Webstudio** (code): custom primitives `useDrag`, `useDrop`, `useAutoScroll`, `useDragCursor` and `useHold`, with two principles: «You can drop anywhere… There will never be an error state», and edge detection of about 5 px ([dnd README](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/primitives/dnd/README.md), code). `useDrag` can live in the builder and `useDrop` in the iframe, joined by postMessage; placement maths has snapshot tests ([`geometry-utils.ts`](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/primitives/dnd/geometry-utils.ts), [`use-drag-drop.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/shared/use-drag-drop.ts), code).

**Puck** (code): `@dnd-kit` 0.4.0 ([`package.json`](https://github.com/puckeditor/puck/blob/main/packages/core/package.json), code) with custom collision detection, midpoint impact plus movement-interval tracking ([`collision/`](https://github.com/puckeditor/puck/tree/main/packages/core/lib/dnd/collision), code). Sensors: a 200 ms delay with 10 px tolerance plus 5 px distance by default, delay only on touch, none on a handle, and no keyboard sensor ([`use-sensors.ts`](https://github.com/puckeditor/puck/blob/main/packages/core/lib/dnd/use-sensors.ts), code).

**GrapesJS** (code): one sorter serves the canvas, the layers panel and the Style Manager lists ([`utils/sorter/`](https://github.com/GrapesJS/grapesjs/tree/dev/packages/core/src/utils/sorter), code).

**Craft.js** (code): native HTML5 drag and drop with a custom shadow ([`DefaultEventHandlers.ts`](https://github.com/prevwong/craft.js/blob/main/packages/core/src/events/DefaultEventHandlers.ts), code); in-flow children split at their vertical midpoint into before/after ([`findPosition.ts`](https://github.com/prevwong/craft.js/blob/main/packages/core/src/events/findPosition.ts), code).

**Sanity** (code): an insert marker, a drag preview, a group rectangle and a zoomed-out minimap for long drags, plus a `data-sanity-drag-disable` opt-out ([`ui/`](https://github.com/sanity-io/visual-editing/tree/main/packages/visual-editing/src/ui), code).

**tldraw and Excalidraw** (code): free-canvas snapping and nudging, the closest relatives of Urd's absolute frames. The snap threshold is divided by zoom: tldraw `snapThreshold / zoomLevel` ([`SnapManager.ts`](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/SnapManager.ts), code), Excalidraw `SNAP_DISTANCE = 8`, `8/zoom` ([`snapping.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/snapping.ts), code). tldraw offers gap snaps, `gap_center` and `gap_duplicate` ([`BoundsSnaps.ts`](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/BoundsSnaps.ts), code). In Excalidraw, Ctrl/Cmd turns snapping on or off for the current drag whichever way the setting is, and arrow keys move 1 px, or 5 px with Shift (`ELEMENT_TRANSLATE_AMOUNT = 1`, `ELEMENT_SHIFT_TRANSLATE_AMOUNT = 5`, [`constants.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/common/src/constants.ts), code).

**Layout guardrails (Squarespace Fluid Engine).** Free, overlapping placement with railings: a block cannot be shrunk below its content, height changes move neighbours predictably, «row stretch» is removed at drag start so the drag is always against a uniform grid, «G» toggles the grid overlay, and mobile is edited as its own layout kept in sync with desktop ([Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine), primary). Urd has taken all of it in its own form: the mobile row grid with `minmax(8px, auto)` rows and synced per-block overrides ([ADR-0019](../adr/0019-synced-mobile-model.md)), the content push on the desktop canvas after the Wix rules, where `suspendPush`/`resumePush` play the part of «remove row stretch at drag start» ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)), and a block that follows its content cannot be dragged shorter than it ([ADR-0025](../adr/0025-the-sizing-model.md) decision 4).

**«Which layout tool?» as built-in decision help (Wix Studio).** Wix Studio has two layout systems (flexbox stacks and CSS grid) and an explicit, learnable model for when to use which: amount of content, responsive behaviour, dynamic data, alignment ([Wix Studio: flexbox or grid](https://support.wix.com/en/article/studio-editor-choosing-between-flexbox-based-and-grid-based-tools), primary). It fits the help chip rule ([ADR-0008](../adr/0008-help-chip-rule.md)) exactly: deliver the decision help as a «?» chip, not as documentation (T55).

**For Urd:** the absolute frames are tldraw and Excalidraw territory, not flow DnD. Take a snap threshold of 8 px divided by the preview scale with Ctrl/Cmd to toggle snapping (T9), equal-gap snapping (T10), and settle the nudge convention: the field moves 1 px per arrow key and 10 or 5 with Shift, Urd moves by the grid step and 1 px with Shift (T11). Give the drag a keyboard alternative, Alt+Arrow announced to screen readers (T12). For the mobile row grid take Webstudio's «always a valid target, never an error» with a placement line, and Craft's midpoint before/after for section reorder (T13). For long drags and moving sections around, a zoomed-out overview in the way of Sanity's minimap and Gutenberg's 50 % zoom-out mode ([PR #58202](https://github.com/WordPress/gutenberg/pull/58202), code) (T14).

### Undo and redo

**Puck** (code): whole-state snapshots, like Urd. `record` is debounced to 250 ms, `tidyState` clears field focus before going back or forward, and actions can opt out with `recordHistory: false` ([`history.ts`](https://github.com/puckeditor/puck/blob/main/packages/core/store/slices/history.ts), [`reducer/index.ts`](https://github.com/puckeditor/puck/blob/main/packages/core/reducer/index.ts), code).

**Craft.js** (code): immer patches and inverse patches with a timestamp, actions `UNDO, REDO, THROTTLE, IGNORE, MERGE, CLEAR`, and a throttle that merges into the previous entry inside a window ([`History.ts`](https://github.com/prevwong/craft.js/blob/main/packages/utils/src/History.ts), code):

```ts
throttleAdd(patches, inversePatches, throttleRate = 500) {
  const { patches: cur, inversePatches: curInv, timestamp } = this.timeline[this.pointer];
  if (Date.now() - timestamp < throttleRate) {
    this.timeline[this.pointer] = { timestamp,
      patches: [...cur, ...patches], inversePatches: [...inversePatches, ...curInv] };
    return;
  }
  this.add(patches, inversePatches);
}
```

**Webstudio** (code): one mutation over several stores becomes patches that drive both undo/redo and server sync; `revertTransaction` runs when the server rejects ([immerhin](https://github.com/webstudio-is/immerhin), code).

**GrapesJS** (code): `backbone-undo` with custom types (`change`, `add`, `remove`, `reset`), per-model attribute filters, `um.skip(fn)` to run code without recording, grouping of simultaneous operations, and selection tracked in the stack ([`undo_manager/index.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/undo_manager/index.ts), code).

**Gutenberg** (code): records `{id, changes:{key:{from,to}}}`; staged edits merge into one record («If the edit is already in the stack leave the initial 'from' value») and empty records are dropped ([`undo-manager/src/index.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/undo-manager/src/index.ts), code); edits can be transient (`isCached`) or ignored (`undoIgnore`) ([`core-data/src/actions.js`](https://github.com/WordPress/gutenberg/blob/trunk/packages/core-data/src/actions.js), code); `resetEditorBlocks` stores `{blocks, selection}` so undo also restores the caret ([`editor/src/store/actions.js`](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/store/actions.js), code). In real-time mode `Y.UndoManager` with `captureTimeout: 500` undoes only one's own edits ([`sync/src/undo-manager.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/sync/src/undo-manager.ts), code).

**tldraw** (code): a pending diff accumulates until the next mark; undo reverses back to the previous mark and squashes; `bail()` reverts to the mark without creating a redo entry, which is how a gesture is cancelled; ephemeral keys stay out of history ([`HistoryManager.ts`](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/HistoryManager/HistoryManager.ts), code).

**Excalidraw** (code): `CaptureUpdateAction` is `IMMEDIATELY`, `NEVER` (remote updates, scene init) or `EVENTUALLY` (async multi-step operations) ([`store.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/element/src/store.ts), code). History records inverse deltas including selection, clears redo only on element changes («a simple click (unselect) could lead to losing all the redo entries»), and undo keeps popping until it reaches a visible change ([`history.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/history.ts), code).

**Plasmic** (code): `UndoRecord = { changes, view }`, where the view snapshot holds the focused arena, frame and selectable; changes merge into the last record when the view is equivalent ([`undo-log.ts`](https://github.com/plasmicapp/plasmic/blob/master/platform/wab/src/wab/client/undo-log.ts), code). **Onlook** (code): a command pattern with reversible actions bracketed by `startTransaction()`/`commitTransaction()` ([history](https://github.com/onlook-dev/onlook/tree/main/apps/web/client/src/components/store/editor/history), code).

**For Urd:** Urd uses Puck's model, whole-draft snapshots (`editor/src/lib/draftStore.js:74`, `replace(next)`). The cheap wins: put `{sectionId, blockIds, caret}` in each entry and restore it (T15, Gutenberg and Plasmic); coalesce typing, slider and drag changes (T16, Craft); keep redo on selection-only changes and drop no-op entries (T17, Excalidraw); add marks and `bail()` so Escape mid-drag restores the state before the gesture and leaves no redo entry (T18, tldraw). Inverse path patches belong with the patch protocol (T4).

### Collaboration and conflict handling

**Gutenberg** (code): `@wordpress/sync` uses Yjs ([`package.json`](https://github.com/WordPress/gutenberg/blob/trunk/packages/sync/package.json), code) over an HTTP-polling provider: «Since PHP has no native Yjs library, this implementation uses a relay approach where the server stores and forwards messages while clients handle all CRDT operations». Updates are stored in post meta, compacted with `Y.encodeStateAsUpdate`, and the provider can be replaced ([http-polling README](https://github.com/WordPress/gutenberg/blob/trunk/packages/sync/src/providers/http-polling/README.md), code).

**Webstudio** (code): a WebSocket sync emitter with acks carrying `seq` and `version` ([`multiplayer-sync.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/sync/multiplayer-sync.ts), code), and awareness of name, avatar, page, selection and pointer, «projected… into the parent viewport so remote cursors align» ([`awareness.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/awareness.ts), code).

**tldraw** (code): a server-authoritative room with a logical clock and tombstones ([`TLSyncRoom.ts`](https://github.com/tldraw/tldraw/blob/main/packages/sync-core/src/lib/TLSyncRoom.ts), code), one Cloudflare Durable Object per room ([`TldrawDurableObject.ts`](https://github.com/tldraw/tldraw/blob/main/templates/sync-cloudflare/worker/TldrawDurableObject.ts), code).

**Excalidraw** (code): a deterministic merge ([`reconcile.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/data/reconcile.ts), code):

```ts
local.id === localAppState.editingTextElement?.id || local.id === localAppState.resizingElement?.id ||
local.version > remote.version ||
// resolve conflicting edits deterministically by taking the one with the lowest versionNonce
(local.version === remote.version && local.versionNonce <= remote.versionNonce)
```

Puck, Craft.js and GrapesJS have no real-time collaboration in their open-source core (code). The git-backed concurrency of Keystatic, Decap, Pages CMS and Silex is in [Part 5](#part-5-publishing-and-deploy).

**For Urd:** real-time editing is not worth it for associations (T111). Two things are cheap and valuable: Keystatic's `expectedHeadOid` with a per-file comparison and an automatic retry when only other files changed (T19), and an Excalidraw-style `version`/`versionNonce` per block to merge two people's drafts deterministically, if that need ever arises (T20). Should real-time ever be needed, Gutenberg shows Yjs over plain HTTP polling and tldraw one Durable Object per room.

### Data model, ids and migrations

**Webstudio** (code): normalised maps, not a nested tree: `Map<id, {type:'instance', id, component, children:[...]}>`, with props, styles and style sources as separate maps, all validated with zod ([`schema/instances.ts`](https://github.com/webstudio-is/webstudio/blob/main/packages/sdk/src/schema/instances.ts), code).

**Puck** (code): `{root:{props}, content:[{type, props:{id,…}}], zones}` with ids `${type}-${uuid}` ([`generate-id.ts`](https://github.com/puckeditor/puck/blob/main/packages/core/lib/generate-id.ts), code); migrations are an ordered global list ([`migrate.ts`](https://github.com/puckeditor/puck/blob/main/packages/core/lib/migrate.ts), code) plus per-component prop transforms, with no version stored ([`transform-props.ts`](https://github.com/puckeditor/puck/blob/main/packages/core/lib/transform-props.ts), code).

**Gutenberg** (code): version-less trial parsing. «By design, blocks lack any sort of version tracking… the system operates a queue out of all the defined attribute shapes and tries each definition until the input produces a valid result»; validity means the re-serialised `save()` output matches the stored HTML ([`apply-block-deprecated-versions.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/parser/apply-block-deprecated-versions.ts), code).

**Plasmic** (code): a model DSL with variant settings per node ([`model-schema.ts`](https://github.com/plasmicapp/plasmic/blob/master/platform/wab/src/wab/shared/model/model-schema.ts), code) and about 255 numbered bundle migrations ([`bundle-migrations/`](https://github.com/plasmicapp/plasmic/tree/master/platform/wab/src/wab/server/bundle-migrations), code).

**tldraw** (code): `createMigrationSequence({sequenceId:'com.myapp.book', sequence:[{id, scope, up, down, dependsOn}]})`; each namespace is versioned independently ([`store/src/lib/migrate.ts`](https://github.com/tldraw/tldraw/blob/main/packages/store/src/lib/migrate.ts), code).

**Penpot** (code): a file stores the SET of applied migration names, and `need-migration?` is the set difference with the available ones; names look like `"0031-migrate-stroke-width-token-attr"` ([`migrations.cljc`](https://github.com/penpot/penpot/blob/develop/common/src/app/common/files/migrations.cljc), code).

**Ghost Koenig** (code): nodes serialise `{type, version}` with version 1 by default ([`generate-decorator-node.ts`](https://github.com/TryGhost/Koenig/blob/main/packages/kg-default-nodes/src/generate-decorator-node.ts), code), and old formats are upgraded on import ([`visibility.ts`](https://github.com/TryGhost/Koenig/blob/main/packages/kg-default-nodes/src/visibility.ts), code). **Storyblok** (code): repo-wide migration scripts with fixture folders, among them `delete-out-of-schema-fields` ([`migrations/src`](https://github.com/storyblok/monoblok/tree/main/packages/migrations/src), code). **Craft.js** (code): a flat node map ([`interfaces/nodes.ts`](https://github.com/prevwong/craft.js/blob/main/packages/core/src/interfaces/nodes.ts), code).

**Hosted and git CMSs.** Builder.io, Ghost and Plasmic store content as ordered JSON and bake data at publish, and Astro, Keystatic and Decap validate content against a schema before it can break a built site: see [Build patterns behind the output](#build-patterns-behind-the-output).

**For Urd:** the versioned per-block-type migrations already match Koenig and tldraw, and the version-less trial parsing is a model to avoid (T110). Take tldraw's namespaced sequences per plugin (`plugin.org/block/3`, `dependsOn`, optional `down`) so plugins migrate independently (T21), Penpot's applied set so core and plugin migrations never collide on one integer (T22), Gutenberg's rule that every migration ships a fixture (T23), and Storyblok's «delete out-of-schema fields» as a repo maintenance script (T25).

### Styles, tokens and breakpoints

**Webstudio** (code): styles are flat declarations keyed `` `${styleSourceId}:${breakpointId}:${property}:${state}` `` ([`schema/styles.ts`](https://github.com/webstudio-is/webstudio/blob/main/packages/sdk/src/schema/styles.ts), code), with desktop-first breakpoints (Base, 991, 767, 479) ([`breakpoints.ts`](https://github.com/webstudio-is/webstudio/blob/main/packages/sdk/src/schema/breakpoints.ts), code). Every canvas value is wrapped as `var(--<ephemeral>, value)`, so scrubbing a slider changes one custom property on `body` and no rule is rewritten ([`canvas/shared/styles.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/shared/styles.ts), code):

```ts
// wrap normal style value with var(--namespace, value) to support ephemeral styles updates
const toVarValue = (styleDecl, transformValue, fallback?) => ({
  type: "var",
  value: CSS.escape(getEphemeralProperty(styleDecl).slice(2)),
  fallback: toVarFallback(fallback ?? styleDecl.value, transformValue),
});
```

Published CSS can be atomic: breakpoint, selector, property and value hashed into `.c<hash>` classes ([`sdk/src/css.ts`](https://github.com/webstudio-is/webstudio/blob/main/packages/sdk/src/css.ts), [`atomic.ts`](https://github.com/webstudio-is/webstudio/blob/main/packages/css-engine/src/core/atomic.ts), code).

**GrapesJS** (code): `CssRule {selectors, mediaText, state, atRuleType, important}` ([`CssRule.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/css_composer/model/CssRule.ts), code) and editor options such as `avoidInlineStyle` and `protectedCss` ([`config.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/editor/config/config.ts), code); Silex adds CSS variables as a plugin ([`grapesjs-css-variables`](https://github.com/silexlabs/Silex/tree/main/grapesjs-plugins/grapesjs-css-variables), code). GrapesJS, the engine behind [Silex](https://www.silex.me/) (primary), models every element as a real DOM node with a typed model, and its Style Manager exposes CSS as a curated set of visual controls per element type ([GrapesJS](https://github.com/GrapesJS/grapesjs), primary). Component-as-DOM-node is already Urd's render model, and «show only relevant controls» is already a rule in [AGENTS.md](../../AGENTS.md); GrapesJS confirms the pattern.

**Webflow** (primary): every action maps one to one onto a real CSS property: move a box and Webflow writes `margin` or `padding`, and the Style panel shows the box model visually with drag handles ([Webflow canvas overview](https://help.webflow.com/hc/en-us/articles/33961319255059-Webflow-canvas-overview), primary). It teaches by doing and fits «raw files, no magic». A strength to keep: new style controls should show which actual property they control, not hide it behind an abstract name.

**Plasmic** (code): one variant setting per combination of variants, screen variants included, each holding a rule set ([`model-schema.ts`](https://github.com/plasmicapp/plasmic/blob/master/platform/wab/src/wab/shared/model/model-schema.ts), code). **Penpot** (code): token types mapped to DTCG-like names (`borderRadius`, `color`, `dimension`, `fontFamilies`, `spacing`, `typography`) ([`token.cljc`](https://github.com/penpot/penpot/blob/develop/common/src/app/common/types/token.cljc), code), with token sets and themes ([`tokens_lib.cljc`](https://github.com/penpot/penpot/blob/develop/common/src/app/common/types/tokens_lib.cljc), code). **Onlook** (code): live preview edits one injected `<style>` through a css-tree AST, then writes Tailwind classes into the code ([`css-manager.ts`](https://github.com/onlook-dev/onlook/blob/main/apps/web/preload/script/api/style/css-manager.ts), code).

**For Urd:** Urd has two discrete layouts (the desktop canvas and the mobile row grid), not a cascade, so most of this does not apply. Two parts do: Webstudio's `var(--x, value)` wrapper for live slider and colour scrubbing with no section re-render (T6), and token sets as custom properties, formalised as one documented contract in the way of `theme.json` (T26). Webstudio's `source:breakpoint:property:state` key is a good flat format if a tablet layer is ever added (it is not planned: two breakpoints by decision, [ADR-0019](../adr/0019-synced-mobile-model.md)).

### Rich text

**Webstudio** (code): Lexical runs inside the canvas iframe ([`text-editor.tsx`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/features/text-editor/text-editor.tsx), code), but storage is the instance tree, mapped both ways (`bold` to `b`/`strong`) ([`interop.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/features/text-editor/interop.ts), code).

**Puck** (code): TipTap 3 for rich text ([`RichTextMenu/controls/`](https://github.com/puckeditor/puck/tree/main/packages/core/components/RichTextMenu/controls), code); plain inline fields use `contentEditable={isHovering || isFocused ? "plaintext-only" : "false"}` and read `innerText` ([`InlineTextField/index.tsx`](https://github.com/puckeditor/puck/blob/main/packages/core/components/InlineTextField/index.tsx), code).

**GrapesJS** (code): `document.execCommand` for bold, italic, underline and strike, `insertHTML` for links, `queryCommandState` for active states ([`RichTextEditor.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/rich_text_editor/model/RichTextEditor.ts), code).

**Gutenberg** (code): the model is `{text, formats[], replacements[]}` ([`rich-text/src/create.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/rich-text/src/create.ts), code). Paste is a chain of small DOM filters: comment remover, Word list converter, Google Docs id remover, Slack paragraph corrector, non-breaking space corrector, formatting remover, iframe remover, image corrector, list reducer, blockquote and div normalisers, markdown converter, heading transformer ([`paste-handler.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/raw-handling/paste-handler.ts), code). Then `removeInvalidHTML` cleans against a declarative schema: unknown tags unwrapped, attributes not in the allowlist stripped, empty elements removed ([`clean-node-list.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/dom/src/dom/clean-node-list.ts), code). The schema ([`phrasing-content.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/dom/src/phrasing-content.ts), code):

```ts
strong: {}, em: {}, s: {}, del: {}, ins: {},
a: { attributes: [ 'href', 'target', 'rel', 'id' ] },
code: {}, abbr: { attributes: [ 'title' ] }, sub: {}, sup: {}, br: {},
q: { attributes: [ 'cite' ] }, time: { attributes: [ 'datetime' ] },
```

**Ghost Koenig** (code): Lexical; pasted plain text matching `^(https?:\/\/[^\s]+)$` becomes an embed, a bookmark or a link ([`KoenigBehaviourPlugin.tsx`](https://github.com/TryGhost/Koenig/blob/main/packages/koenig-lexical/src/plugins/KoenigBehaviourPlugin.tsx), code); `kg-clean-basic-html` collapses whitespace and removes elements whose text is blank ([`clean-basic-html.ts`](https://github.com/TryGhost/Koenig/blob/main/packages/kg-clean-basic-html/src/clean-basic-html.ts), code).

**Why the document-model editors exist.** Ghost (Lexical), ProseMirror and Slate treat a document model as the truth and `contenteditable` only as an input and render surface, because raw contenteditable gives inconsistent DOM across browsers, broken selection and caret, paste junk and missing undo ([ProseMirror model](https://github.com/ProseMirror/prosemirror-model), code; [CKEditor: ContentEditable](https://ckeditor.com/blog/ContentEditable-The-Good-the-Bad-and-the-Ugly/), secondary).

**Click and edit on the real page.** Tina lets the editor click text on the live page and edit it in a side panel with a real-time preview while the content stays as Markdown in git ([tina.io](https://tina.io/), primary); Ghost inserts typed «cards» into prose with a slash command ([Ghost cards](https://ghost.org/help/cards/), primary). In place beats a detached form. Urd already has in-place click-and-write with the floating text toolbar, and the slash «/» on the canvas opens the block menu.

**Urd today (read 11 October 2026).** Urd has no paste handler for text: a paste into a text block keeps the browser's HTML, and `stripActiveContent` (`engine/sanitize.js:5`) removes event attributes, `javascript:` links and active elements at render, since the owner is trusted for markup. Feed HTML from calendars goes through the allowlist in `safeHtmlFragment` (`sanitize.js:23`).

**For Urd:** keep contenteditable with a sanitised subset; Lexical or TipTap would need a build step and a dependency (T109). Take Gutenberg's declarative schema as the single source for the paste cleaner, the render sanitizer and the description of rich text in [SCHEMA.md](../SCHEMA.md) (T27), Gutenberg's filter chain for Word, Google Docs and Slack, plus markdown to formatting (T28), Koenig's «pasted URL becomes a link» (T29), and Puck's `plaintext-only` for single-line fields (T30).

### Components and reuse

**GrapesJS** (code): symbols. The main component keeps its instances in `__symbols`; each instance has `__symbol` (a reference to the main) and `__symbol_ovrd` (per-property overrides) ([`Component.ts:96-98`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/dom_components/model/Component.ts), code); changes propagate and `detachSymbolInstance` detaches ([`SymbolUtils.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/dom_components/model/SymbolUtils.ts), code).

**Gutenberg** (code): a synced pattern is `core/block` with a `ref` and a `content` object holding overrides ([`block.json`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/block/block.json), code); overrides are keyed by the inner block's `metadata.name`, so only named blocks can be overridden ([`pattern-overrides.js`](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/bindings/pattern-overrides.js), code), and binding sources register through `registerBlockBindingsSource` ([`registration.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/registration.ts), code). Block Bindings connect block attributes to data sources ([Block Bindings in 6.9](https://make.wordpress.org/core/2025/11/12/block-bindings-improvements-in-wordpress-6-9/), primary).

**Webstudio**: a Slot changes all its instances when one is edited, with no documented detach ([docs](https://docs.webstudio.is/university/core-components/slot), primary); children are referenced by id, so one fragment can sit under several slots ([`slot.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/instance-utils/slot.ts), code). **Puck** (code): slots only, no global symbols in the core.

**Patterns, symbols and template parts.** Gutenberg and Webflow split reuse three ways: insertable pre-composed block groups (patterns), a reusable group updated everywhere (symbols), and shared header and footer fragments (template parts) ([Gutenberg patterns and FSE guide](https://wppoland.com/en/gutenberg-blocks-patterns-full-site-editing-guide/), secondary). Urd has delivered the pattern half: section, block-group and page templates, always inserted as independent copies (T97).

**For Urd:** for global blocks (footer extras, a contact card, a sponsor strip) GrapesJS's three keys map cleanly to JSON, `{ref: "globals/x", overrides: {field: value}}` plus a «detach» that copies, and Gutenberg's «only explicitly named fields can be overridden» is a good safety rule (T31). It complements the copy-on-insert templates (`urd-save-template`).

### Editor accessibility

**Gutenberg** (code): List View is a tree grid labelled «Block navigation structure» ([`list-view/index.jsx`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/list-view/index.jsx), code) whose rows carry `level`, `positionInSet` and `setSize` ([`leaf.jsx`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/list-view/leaf.jsx), code), with roving tabindex between rows and cells ([`tree-grid/index.tsx`](https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/tree-grid/index.tsx), code). Alt+F10 focuses the block toolbar and Escape returns to the block ([`navigable-toolbar/index.jsx`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/navigable-toolbar/index.jsx), code), shortcuts live in one registry ([`keyboard-shortcuts/index.js`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/keyboard-shortcuts/index.js), code), and focus-capture elements before and after the iframe let Tab move into and out of the canvas (`iframe/index.jsx`, code).

**Webstudio** (code): the tree handles all four arrow keys with roving tabindex, `aria-selected` and `aria-current` ([`tree.tsx`](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/tree.tsx), code). **Puck** (code): no `role` or `aria-*` in its layer tree and pointer-only canvas dragging, not a model to copy here.

**For Urd:** from Gutenberg take a tree with roving tabindex for the coming layers panel, Alt+F10 into the floating toolbar and Escape back, and focus sentinels around the iframe (T32). Add Alt+Arrow moves announced to screen readers as the drag alternative (T12, with `ariaNotify`, T64) and the 1 px / 5 px nudges (T11).

### Testing practices

- **Gutenberg block fixtures** (code): four files per case, the input `.html`, `.parsed.json` (checked against both the JS and the PHP parser), `.json` and `.serialized.html`. «Every block is required to have at least one such set… each deprecation for a block should also have a fixture», named `core__name__variant` ([fixtures README](https://github.com/WordPress/gutenberg/blob/trunk/test/integration/fixtures/blocks/README.md), code).
- **tldraw fuzz test** (code): a seeded random source, a random number of peers, random operations and random disconnects (1 in 6), checking that all peers converge; failures replay by seed ([`syncFuzz.test.ts`](https://github.com/tldraw/tldraw/blob/main/packages/sync-core/src/test/syncFuzz.test.ts), code).
- **Webstudio** (code): sharded Playwright drag tests (`canvas-drag`, `navigator-drag`, `pages-drag`), browser-mode unit tests, and geometry snapshot tests (`dnd/__snapshots__/geometry-utils.test.ts.snap`).
- **Storyblok** (code): migration tests against a fake `.storyblok/` folder ([`__test__`](https://github.com/storyblok/monoblok/tree/main/packages/migrations/src/__test__), code). **Tina** (code): `island-refresh.test.ts`, `quick-edit-css.test.ts` and type tests.

**For Urd:** a fixture trio per block type and per migration, old JSON to migrated JSON to a rendered HTML snapshot, enforced in CI (T23); a seeded fuzz test over random edits of the push pass and the desktop-mobile sync, with the invariants «no overlaps, everything within bounds, the row grid matches the frames», plus Playwright drag tests (T24).

---

## Part 3. The generated site, measured

What the builders actually ship to visitors. 30 live pages from 15 builders were measured on 11 October 2026, with Urd's demo [urdweb.pages.dev](https://urdweb.pages.dev/) as the baseline, and Shopify Horizon and Twenty Twenty-Five were read in source (code). Every figure below is (measured, 11 October 2026) unless marked otherwise.

**How to read the measurements.** curl 8.21 with a Chrome 141 user agent and `Accept-Encoding: zstd, br, gzip`, plus a Python `html.parser` pass. «HTML raw» is decompressed bytes; «gz» and «br» are gzip -9 and brotli q11 computed locally, not the bytes on the wire, and the encoding actually served is reported from the headers. «Tags» counts opening tags; «Text» counts visible characters outside script, style and template, so 0 means the page is rendered in the browser. JS totals cover only what the initial HTML references (`<script src>`, `modulepreload`, `preload as=script`); dynamic chunks were not followed, so the Framer, Wix, Squarespace and Figma totals are a lower bound. «Hash-like» classes are tokens of 6 or more characters mixing letters and digits. Deductions are marked «inferred».

**The short version.** Static HTML matters most: Astro, the Twenty Twenty-Five demo and Carrd ship content in the HTML with almost no JavaScript, while Framer, Wix and Squarespace ship 0.3 to 1.2 MB of compressed JS and several hundred KB of CSS per page. Urd ships no content in the HTML and about 330 KB of compressed engine and CSS before anything appears, so the v0.8 baking is the right priority. Shopify Horizon is the best model for Urd: vanilla custom elements, per-block module scripts and declarative event attributes. Urd is already ahead on its script CSP, page prefetching, fonts and third parties ([Part 1](#part-1-where-urd-already-hits)), and behind on images and a few headers.

### Table A: payload and DOM

| Builder | URL (measured) | HTML raw / br (KB) | Tags / max depth | Text in HTML | External JS: files, raw / gz (KB) | CSS (KB) | Runtime detected |
|---|---|---|---|---|---|---|---|
| **Urd (today)** | [urdweb.pages.dev](https://urdweb.pages.dev/) | 6.9 / 1.3 | 78 / 4 | **0 (client-rendered)** | 65 (64 modulepreload), 769 / 262 | base.css 354 (72 gz) + theme.css 1 | vanilla ES modules |
| ApeironLF (reference) | [apeironlf.pages.dev](https://apeironlf.pages.dev/) | 27.5 / 7.5 | 289 / 10 | 3.1k | 25 classic, 1,204 / 797 (one content file is 935) | 3 external (107 + 8 + Google Fonts) + 1 inline | vanilla |
| Framer | [www.framer.com](https://www.framer.com/) | **1,909 / 167** | 5,236 / 27 | 9.8k | 96, 4,007 / 1,165 (+183 inline) | 495 inline, 0 external | React, Framer Motion |
| Framer | [www.wisdom.ai](https://www.wisdom.ai/) | 1,442 / 101 | 4,628 / 23 | 16.7k | 30, 2,144 / 546 | 429 inline | React, Motion, HubSpot, Sentry |
| Framer | [red.org](https://red.org/) | 855 / 49 | 3,193 / 21 | 8.4k | 35, 1,962 / 546 | 176 inline | React, Motion, GSAP, Lenis |
| Webflow | [webflow.com](https://webflow.com/) | 528 / 64 | 2,715 / 24 | 17.5k | 20, 1,383 / 408 | 4 external (265) + 76 inline | jQuery 3.5.1, webflow.js, GSAP 3.15, Swiper, three.js |
| Webflow | [www.osmo.supply](https://www.osmo.supply/) | 529 / 68 | 3,133 / 20 | 7.6k | 16, 1,300 / 416 | 5 external (456) | jQuery, GSAP, Lenis, hls.js |
| Webflow | [truus.co](https://truus.co/) | 590 / 128 | 1,666 / 19 | 2.0k | 19, 650 / 222 | 3 external (151) | jQuery twice, GSAP + ScrollTrigger, Flickity |
| Wix Studio | [www.jwaylon.com](https://www.jwaylon.com/) | 682 / 95 | 930 / **31** | 2.8k | 11, 758 / 241 (+209 inline) | 352 inline | Thunderbolt, React 18 UMD, core-js, lodash |
| Wix Studio | [www.wix.com/studio](https://www.wix.com/studio) | **2,143 / 187** | 4,087 / **36** | 20.2k | 13, 1,087 / 342 (+276 inline) | **1,217 inline** + 31 external | same |
| Squarespace 7.1 | [adri-fluid-demo.squarespace.com](https://adri-fluid-demo.squarespace.com/) | 639 / 28 | 779 / 21 | 2.6k | 31, **3,764 / 982** | 9 external (**1,768**) + 72 inline | YUI-era common bundles, Sentry |
| Squarespace 7.1 | [bailard-fluid-demo.squarespace.com](https://bailard-fluid-demo.squarespace.com/) | 167 / 20 | 455 / 20 | 1.2k | 28, 3,776 / 976 | 7 external (1,762) + 38 inline | same |
| Carrd | [johnsmith-demo.carrd.co](https://johnsmith-demo.carrd.co/) | **19.7 / 5.0** | 69 / 10 | 0.2k | 0 (2.7 inline) | 11.5 inline + Google Fonts | none |
| Carrd Pro | [newsletteros.com](https://newsletteros.com/) | 324 / 30 | 563 / 15 | 7.8k | 6, 1,224 / 323 (third-party; +37 inline) | 252 inline | user-added Stripe, GA, Pixel, Hotjar, Clarity |
| Webstudio | [webstudio.is](https://webstudio.is/) | 176 / 24 | 705 / 22 | 3.4k | 17, 989 / 265 | 108 external + 11 inline | React, Remix, PostHog |
| Figma Sites | [simple-grill-28884515.figma.site](https://simple-grill-28884515.figma.site/) | 405 / 22 | 3,723 / 23 | 5.2k | 1, 566 / 184 (+77 inline) | 75 inline | React, motion |
| Figma Sites (Make) | [diary-suite-67314439.figma.site](https://diary-suite-67314439.figma.site/) | 5.0 / 1.5 | 40 / 6 | **0 (client)** | 2, **2,857 / 631** | 92 external | React |
| Hostinger | [millawkids.com](https://millawkids.com/) | 272 / 17 | 145 / 16 | 0.1k | 0 at load (Astro islands) | 251 external | Astro + Vue |
| Hostinger AI | [www.pwood.gr](https://www.pwood.gr/) | 279 / 35 | 283 / 19 | 0.7k | 0 at load | 431 external | Astro + Vue, Hotjar |
| Shopify Horizon | [theme-horizon-demo.myshopify.com](https://theme-horizon-demo.myshopify.com/) | 334 / 33 | 1,212 / 22 | 1.2k | 60 (47 module), **403 / 129** | 4 external (407) + 48 inline | vanilla custom elements |
| Shopify Dawn | [theme-dawn-demo.myshopify.com](https://theme-dawn-demo.myshopify.com/) | 247 / 30 | 1,292 / 24 | 3.6k | 17, 232 / 73 | **42 stylesheet links** + 14 inline | vanilla custom elements |
| WordPress block theme | [wordpress.org/news/](https://wordpress.org/news/) | 156 / 27 | 666 / 17 | 2.5k | 6, **55 / 20** | 5 external (245) + 54 inline | WP Interactivity API |
| WP Twenty Twenty-Five | [wp-themes.com/twentytwentyfive/](https://wp-themes.com/twentytwentyfive/) | 76 / 12 | 293 / 19 | 3.9k | **0** (4.8 inline) | 49 inline only | none (the theme ships no JS) |
| Elementor | [elementor.com](https://elementor.com/) | 577 / 67 | 1,195 / 26 | 16.9k | 25, 1,106 / 337 (+98 inline) | 32 external (415) + 254 inline | jQuery 3.7.1, Swiper 8, Lottie, GSAP helpers |
| Bricks | [bricksbuilder.io](https://bricksbuilder.io/) | 259 / 44 | 962 / 17 | 8.4k | 7, 219 / 57 | 84 inline only (FlyingPress) | bricks.min.js |
| Ghost(Pro) | [www.404media.co](https://www.404media.co/) | 67 / 9 | 510 / 15 | 3.7k | 12, **4,011 / 942** | 8 external (198) | Ghost Portal (React UMD, 2.5 MB), Stripe |
| Ghost | [ghost.org/resources/](https://ghost.org/resources/) | 75 / 10 | 591 / 19 | 4.1k | 9, 3,190 / 738 | 4 external (95) | Portal, jQuery 3.5.1, Alpine |
| Astro | [astro.build](https://astro.build/) | 316 / 67 | 1,837 / 19 | 6.3k | 6, **7.9 / 3.8** | 2 external (116) + 4 inline | Astro, no hydrated islands on this page |

### Table B: technique matrix

Y = present, P = partial, N = absent, all measured on the URLs in Table A unless marked.

| | Static/SSR HTML | srcset | AVIF | width+height | Main image `fetchpriority=high` | `sizes=auto` | Speculation rules | Cross-doc View Transitions | Strict CSP | HSTS | HTML br/zstd | 103 Early Hints | llms.txt | Content-Signal | Markdown alternate | Skip link |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Urd** | N (v0.8) | N (planned) | N (planned; WebP yes) | N | N (all lazy) | N | **Y (header)** | **Y** | **Y (scripts)** | **N** | Y br | N | N | N | N | N (inferred) |
| Framer | Y + hydration | Y | Y (by Accept header) | mostly | Y | N | N | N | N | Y | Y br (JS gzip) | N | framer.com only | framer.com | **Y (`?md`)** | P |
| Webflow | Y | Y (`-p-500`) | if uploaded as AVIF (inferred) | P (`"Auto"`) | N | N | N | N | report-only | Y | **N (gzip)** | **Y** | Y | webflow.com | N | webflow.com only |
| Wix Studio | Y + hydration | N (JS sizes images) | Y (`enc_avif`) | P | Y | N | **Y (eager)** | Y (in-app navigation) | N | Y | Y br | N | **Y (auto + MCP)** | N | N | N in served HTML |
| Squarespace | Y | Y | N (WebP) | Y | Y | **Y** | N | N | N | Y | **N (gzip)** | N | N | N | N | Y |
| Carrd | Y | N | N | N | N | N | N | N | N | N | N (gzip) | N | N | N | N | N |
| Webstudio | Y + hydration | Y | inferred (`format=auto`) | Y | N | N | N | N | N | Y | Y br | **Y** | N | N | N | N |
| Figma Sites | P (Make: N) | Y | N | N | N | N | N | N | N | Y | N (gzip) | N | N | N | N | N |
| Hostinger | Y (islands) | Y | **Y** | P | N | N | N | N | N | Y | **Y zstd** | N | N | N | N | N |
| Shopify Horizon | Y | Y | N (WebP) | Y | Y | N | N in HTML; Y after load (measured 19 Oct 2026) | **Y (`rel=expect`)** | P | Y | Y br | **Y** | **Y (agents)** | N | N | Y |
| WordPress (news/TT5) | Y | Y | N (WebP) | Y | Y | **Y** | **Y** | N | N | short | Y br | N | Y | N | **Y (`?output_format=md`)** | Y |
| Elementor | Y | P (no `sizes`) | `f=auto` | Y | preload | N | Y (WP core) | N | N | Y | Y br | N | Y | N | N | N |
| Bricks | Y | Y | N | Y | **16 preloads** | N | Y (WP core) | N | N | Y | N (gzip) | N | N | N | N | **Y, twice** |
| Ghost | Y | lazysizes (theme) | path option | N | N | N | N | N | N | not recorded | N (gzip) | N | N | N | N | N |
| Astro | Y (static) | N on home | N (WebP) | Y | Y | N | Astro prefetch | N | N | not recorded | N (gzip) | N | N | N | N | Y |

### Per-builder findings

#### Urd baseline

Measured on [urdweb.pages.dev](https://urdweb.pages.dev/) (measured), with the source read for what the HTML does not show.

- **Client-rendered shell.** 6.9 KB of HTML with 78 tags; `<main id="urd-root">` holds only a Norwegian `<noscript>` line (`template/index.html:100`), so there are no headings, title, description or OG tags until JS runs. `seo.js` injects description, canonical, OG, X card and JSON-LD Organization at boot.
- **Delivery.** Cloudflare Pages turns the 64 `<link rel=modulepreload>` into a long `Link:` response header. Brotli over HTTP/3. No 103 Early Hints were seen in two attempts, probably because of the size of that Link set (inferred).
- **Headers.** The CSP is strict for scripts and keeps `style-src 'unsafe-inline'` (the JS-injected `<style id="urd-theme">` that carries the draft's theme in the preview). Speculation rules come by header, prefetch and prerender at moderate eagerness. **No HSTS header.** Engine JS is `no-cache` on this deployment by design: the monorepo's engine files change between releases under the same folder, and the release sync writes the immutable rule into the template's `_headers` (`scripts/release-headers.mjs`, [AGENTS.md](../../AGENTS.md)). `content/theme.css` is `max-age=0`.
- **CSS.** base.css is 354 KB raw / 72 KB gz with no `@layer`; a heuristic selector scan found about 238 of 2,091 rules mentioning edit, preview, selection or panel, so editor styles look like they ship to visitors (inferred).
- **Images** (`blocks/image.js:72-73`): `loading='lazy'` and `decoding='async'` on every image, the hero too; no `width`/`height`, no `srcset`, no `fetchpriority`.
- **Fonts and third parties.** System font stacks only, so 0 font bytes and no third-party requests.
- **Extras.** robots.txt has 4 lines and no AI or Content-Signal lines; the sitemap has 7 `<loc>` entries and 0 `<lastmod>`; there is no llms.txt.
- **Own finding in the source.** The video block creates the YouTube or Vimeo iframe at once, lazily but with no click to load (`blocks/video.js:143`); the privacy side is in [FEATURES.md](FEATURES.md).

```
<script src="/assets/engine/0.7.4/theme-init.js"></script>
<script type="module" src="/assets/engine/0.7.4/boot.js" blocking="render"></script>
<main id="urd-root"><noscript>Denne siden trenger JavaScript for å vises.</noscript></main>
link: </assets/engine/0.7.4/boot.js>; rel="modulepreload", </assets/engine/0.7.4/urd.js>; …
speculation-rules: "/speculation-rules.json"
```

#### ApeironLF

[apeironlf.pages.dev](https://apeironlf.pages.dev/) (measured), the reference site for the v1.0 gate. Static multi-page HTML with real text (3.1k characters, a single h1, h2/h3 in order), full OG and Twitter tags, canonical, JSON-LD `CollegeOrUniversity`, theme-color, and a sitemap with `lastmod` on 15 of 15 entries. Weaknesses: 25 classic scripts with no `defer` or `async`, one of them a 935 KB content file; Google Fonts with 45 `@font-face` rules; `script-src 'unsafe-inline'`. On the same platform as Urd, Cloudflare Pages sent `HTTP/2 103` with a Google Fonts preconnect, which shows Pages does send Early Hints for small preconnect and preload sets. HSTS is set in `_headers`.

#### Framer

[www.framer.com](https://www.framer.com/), [www.wisdom.ai](https://www.wisdom.ai/), [red.org](https://red.org/) (measured).
- Prerendered React with hydration: 1,089 `<!--$-->` Suspense markers and a 10 KB handover blob on framer.com. Each breakpoint's markup ships as an `ssr-variant hidden-xxxx` copy (94 on red.org), which is why wisdom.ai has three identical h1s and red.org two.
- 74 % of class tokens are hash-like (`framer-1lhjg5m`), 2,956 inline `style` attributes carry custom properties, maximum depth 27. All CSS inline (495 KB on framer.com) with 378 `@font-face` rules; no `@container`, `@layer` or `light-dark()`.
- 93 modulepreloaded `.mjs` chunks from CloudFront, immutable, but gzip only even when brotli is offered.
- Images: `srcset` with `?scale-down-to=512|1024`, `sizes` from the breakpoints, `fetchpriority="high"` on the hero; the image CDN negotiates AVIF or WebP by the Accept header.
- Entrance animations: elements are server-rendered at `opacity:0.001` and a 10.9 KB inline animator reveals them before hydration (checking reduced motion), so the hero headline is invisible until JS runs.
- Every Framer site answers `?md` and `Accept: text/markdown` with a Markdown version of the page (measured on two; that it applies to all is inferred); framer.com links a 9.6 KB llms.txt with `rel="describedby"` and has `Content-Signal: ai-train=yes, search=yes, ai-input=yes` in robots.txt. HSTS with preload, no CSP.

```
<div class="framer-1g5b6is" data-framer-appear-id="1g5b6is" … style="opacity:0.001;transform:translateY(31px)">
<div class="ssr-variant hidden-19jqurm">
<link rel="alternate" type="text/markdown" href="?md">
```

#### Webflow

[webflow.com](https://webflow.com/), [truus.co](https://truus.co/), [www.osmo.supply](https://www.osmo.supply/) (measured).
- Static HTML with Webflow's `w-` classes mixed with user naming; few hash-like classes. webflow.com adds tracking attributes to almost every element (about 196 each).
- All three still load jQuery 3.5.1 (89 KB) from a CloudFront host; interactions (IX3) are GSAP 3.15 with ScrollTrigger. CSS hides animated elements until the runtime adds `w-mod-ix3`, and reduced-motion rules are rare (7 on webflow.com, 0 or 1 elsewhere).
- Responsive variants generated at upload (`-p-500`, `-p-800`); `width`/`height` mostly missing (truus 0 of 91), and webflow.com writes invalid `width="Auto" height="Auto"`.
- HTML gzip only on all three; CSS brotli and immutable for a year. truus and osmo sent 103 Early Hints. webflow.com sends two HSTS headers and a partial CSP plus a large report-only policy, Content-Signal in robots.txt and a 13 KB llms.txt, and has a skip link; truus's heading order starts at h4.

#### Wix Studio

[www.jwaylon.com](https://www.jwaylon.com/) (`"isStudio":true`) and [www.wix.com/studio](https://www.wix.com/studio) (measured).
- Server-rendered React (Thunderbolt) with large JSON blobs (52 to 74 KB of viewer model); the deepest DOM measured (31 to 36); six-character hashed classes and thousands of `comp-xxxxxxxx` ids; 1.22 MB of inline CSS in 72 `<style>` blocks on wix.com/studio.
- React 18.3.1 UMD, `core-js-bundle` (138 KB of polyfills), lodash 4.17 and the Thunderbolt bundles.
- Images are custom `<wow-image>` elements without `srcset`: the server renders a blurred AVIF placeholder and the runtime computes the exact-size URL per container, so the real image needs JS.
- Named view-transition groups in the CSS for in-app navigation, not `@view-transition`; eager prefetch of every internal link through inline speculation rules.
- A generic, apparently auto-generated llms.txt advertising a per-site MCP endpoint (`/_api/mcp`). Brotli, HTTP/3, HSTS, no CSP. No skip link in the served HTML; jwaylon has 3 h1s and 22 `<div tabindex>`.

#### Squarespace 7.1 Fluid Engine

[adri-fluid-demo.squarespace.com](https://adri-fluid-demo.squarespace.com/) and [bailard-fluid-demo.squarespace.com](https://bailard-fluid-demo.squarespace.com/) (measured).
- Static HTML; every block is `fe-block` with per-block CSS inlined (102 `<style>` blocks on adri) on top of a 1.27 MB site stylesheet.
- The heaviest JS measured: about 3.8 MB raw / 980 KB gz, including an 858 KB moment.js vendor bundle and YUI-era code.
- Good images: `srcset` from 100w to 2500w, **`sizes="auto, 100vw"`** on lazy images, the hero `loading="eager" fetchpriority="high"`, WebP by negotiation.
- HTML gzip only, HSTS 180 days, a sitemap with `image:image` entries; robots.txt names 29 AI user agents in the same group as `*`, so they are not blocked. A «Skip to Content» link and correct landmarks, but adri's heading order runs 2-4-3-4 with the h1 tenth.
- Measured again in a browser on 19 October 2026 on six pages of the two demos (the homes at desktop and phone width, scheduling, projects, take action, news): a skip link on every page; `srcset` on 1 to 10 elements and `fetchpriority` on 0 to 3 per page; the bailard home starts its headings at h4, the news list has three h1, the scheduling page two and the projects page none; six requests to a third-party consent manager (`consent.trustarc.com`) on every page, and `www.google.com` and `www.gstatic.com` on the pages with a form block; blocks marked by class (`sqs-block-accordion`, `-form`, `-newsletter`), no custom elements.

#### Carrd

[johnsmith-demo.carrd.co](https://johnsmith-demo.carrd.co/) and [newsletteros.com](https://newsletteros.com/) (measured). The leanest builder: the demo is 19.7 KB, 69 tags, a 2.7 KB inline runtime and 11.5 KB of inline CSS. But no landmarks, `user-scalable=no`, no `srcset`, `width`/`height` or JSON-LD, no sitemap on the demo, gzip only, `max-age=0`, and a CSP that sets only `frame-ancestors`. The Pro site stays lean in its own code, but 208 embedded Google Fonts faces and user-added third parties (Stripe 1.1 MB, Meta Pixel, Hotjar, Clarity, GA) dominate.

#### Webstudio

[webstudio.is](https://webstudio.is/) (measured). Remix/React server rendering with 17 modulepreload chunks (989 / 265 KB gz); 89 % hash-like atomic classes. Animations are pure CSS: `data-ws-animate-id` selectors inside `@media (prefers-reduced-motion: no-preference)` using view and scroll timelines. An image endpoint serves every `srcset`; 45 of 45 images have `width`/`height`. 103 Early Hints preloading the logo, font and SVGs; brotli, HTTP/3, HSTS two years with preload, immutable hashed CSS, sitemap `lastmod` on 48 of 126 entries.

#### Figma Sites

[simple-grill-28884515.figma.site](https://simple-grill-28884515.figma.site/) and [diary-suite-67314439.figma.site](https://diary-suite-67314439.figma.site/) (measured). The worst accessibility measured: 3,168 of 3,723 tags are `<div>`, no content headings, 87 `<div tabindex="0" role="link">` instead of `<a>`, 165 of 168 images with empty `alt`, no landmarks. Entrance animations render elements at `opacity:0`, revealed by the motion runtime; fonts use `font-display:block`; `figma.site` subdomains send `noindex`. The Make (code-generated) site is a 5 KB shell whose fallback is «This site requires JavaScript», plus 2.86 MB of JS.

#### Hostinger

[millawkids.com](https://millawkids.com/) and [www.pwood.gr](https://www.pwood.gr/) (measured). Astro with Vue islands, but the whole page is one `<astro-island>` whose props carry the site data (about 270 KB of HTML). millawkids has no headings at all. Cloudflare image resizing (`format=auto`) in `srcset` returned AVIF. Google Fonts proxied through the builder's own host, so no request reaches Google. The only zstd HTML measured; HSTS two years with preload; sitemap `lastmod` on 56 of 56.

#### Shopify Horizon and Dawn

[theme-horizon-demo.myshopify.com](https://theme-horizon-demo.myshopify.com/) and [theme-dawn-demo.myshopify.com](https://theme-dawn-demo.myshopify.com/) (measured).
- Horizon: server-rendered Liquid with vanilla custom elements (`slideshow-component`, `product-card`, `dialog-component` and others), an importmap, 47 module scripts emitted only for blocks on the page, and `modulepreload fetchpriority="low"`. JS is 403 KB raw / 129 KB gz including Shopify's platform scripts: about a third of Squarespace and a ninth of Framer (gz).
- The richest modern CSS measured: `:has()` 334, `@container` 17, `@starting-style` 17, `anchor-name` 11, `view-transition-name` 12, `content-visibility` 14, logical properties 573, reduced-motion 20; no `@layer`.
- `srcset` on 48 of 48 images, all with `width`/`height`, the first slide at `fetchpriority=high`; font preloads at `fetchpriority="low"`.
- Cross-document View Transitions held by `<link rel="expect" … blocking="render">`; 103 Early Hints; an llms.txt served as Markdown with agent instructions (recorded as content only), `rel="ucp"` and `/agents.md`.
- Dawn, the previous generation: custom elements too, but 42 `<link rel=stylesheet>`, one per component with duplicates.
- Measured again in a browser on 19 October 2026 (the homes at desktop and phone width, a product and a collection on each): a skip link on every page, and a second one to the product information or the results on product and collection pages; Horizon marks 71 to 173 elements with `fetchpriority` and lazy-loads 25 to 102, Dawn 0 to 2; Horizon's speculation rules are inserted after load, not served in the HTML; Horizon's pages have no `contentinfo` landmark, its collection jumps from h1 to h4 and its product page opens with an h3 before the h1; Dawn's menu is a `<details>` disclosure with `aria-expanded` and `aria-controls`, and its filters are disclosures with checkboxes in a fieldset; telemetry requests to `otlp-http-production.shopifysvc.com` and `monorail-edge.shopifysvc.com` on every page.

```
<link rel="expect" href="#MainContent" blocking="render" id="view-transition-render-blocker">
<link rel="modulepreload" href="//…/assets/utilities.js?v=…" fetchpriority="low">
<slideshow-component ref="slideshow" style="--slideshow-timeline: --slide-1, --slide-2, …" initial-slide="0" infinite>
```

#### WordPress block themes

[wordpress.org/news/](https://wordpress.org/news/) and [wp-themes.com/twentytwentyfive/](https://wp-themes.com/twentytwentyfive/) (measured).
- wordpress.org/news ships 55 KB raw / 20 KB gz of JS: the Interactivity API (40 KB, Preact signals) through an importmap and modules, with behaviour declared in markup (`data-wp-on--click`, `data-wp-bind--aria-expanded`). Core outputs inline speculation rules with document-source prefetch and exclusions for admin, uploads and query strings.
- `srcset` plus **`sizes="auto, (max-width:1920px) 100vw, 1920px"`** on lazy images, `fetchpriority="high"` on the first, all with `width`/`height`.
- **`<link rel="alternate" type="text/markdown" href="…/?output_format=md">`**, an RSS alternate, a 5.8 KB llms.txt and robots.txt allowing the AI crawlers by name. HSTS only one hour.
- The TT5 demo: 76 KB of HTML with no external JS or CSS, 49 KB of block CSS inlined only for blocks on the page (inferred from WordPress's per-block loading), `font-display: fallback`, skip link, correct landmarks.

#### Elementor

[elementor.com](https://elementor.com/) (measured, Elementor 4.2.3 on WordPress 7.0.7). Atomic markup (`e-atomic-element`) with 264 `data-interaction-id` attributes and malformed attribute junk in the served HTML; 32 stylesheets plus 254 KB inline with 1,845 `!important`; jQuery 3.7.1, Swiper 8.4.5 (144 KB), Lottie (253 KB) and a 74 KB «angie MCP connector». Cloudflare image resizing in `srcset` but no `sizes`, so the browser assumes `100vw`; 30 of 33 images with empty `alt`. A full Yoast JSON-LD graph, 7 hreflang, WordPress core speculation rules, a 15 KB llms.txt.

#### Bricks

[bricksbuilder.io](https://bricksbuilder.io/) (measured). Clean `brxe-*` classes, two skip links, all images with `width`/`height`; bricks.min.js 210 KB. A performance plugin (FlyingPress) inlines all CSS (84 KB, with `@layer`), adds `content-visibility:auto` inline and replaces images with SVG placeholders loaded by JS. Over-preloading: **16 images are `<link rel=preload … fetchpriority="high">`**, competing with each other, and a variable font is preloaded twice.

#### Ghost

[www.404media.co](https://www.404media.co/) and [ghost.org/resources/](https://ghost.org/resources/) (measured, Ghost 6.70). Lean HTML (67 to 75 KB), but Ghost core injects deferred apps on every page: Portal alone is 2.51 MB raw (a React UMD build), for 3.2 to 4.0 MB of JS in all. The 404media theme uses lazysizes with no `width`/`height`; Ghost's image path returned AVIF. 404media's homepage has no h1. `/llms.txt` returns 200 `text/html`, so it is effectively absent.

#### Astro

[astro.build](https://astro.build/) (measured, Astro v7.3.5). Static HTML with about 8 KB raw / 3.8 KB gz of JS in 5 tiny module scripts; `@layer` 5, `@container` 5, `:focus-visible` 79; two self-hosted woff2 preloads; the hero `loading="eager" decoding="sync" fetchpriority="high"`; skip link, one h1, correct heading order. Served gzip, not brotli; hashed assets immutable.

### Shopify Horizon and Twenty Twenty-Five, read from source

**Horizon** ([github.com/Shopify/horizon](https://github.com/Shopify/horizon), main branch, code): 125 assets, 95 blocks, 42 sections and 145 snippets.
- `assets/component.js`: `Component extends DeclarativeShadowElement`, attaching declarative shadow DOM from `<template shadowrootmode="open">`. It builds `this.refs` from descendant `[ref]` attributes and keeps them current with a MutationObserver started in `requestIdleCallback`; a missing required ref throws.
- **Declarative event delegation:** one document-level listener per event type reads attributes such as `on:click="/method"`, `on:click="#id/method"` or `on:change=".selector/method?data"`, resolves the target component with `closest()` and proxies `event.target`. No inline handlers, so it fits a CSP without `unsafe-inline`, and it is exactly what a baked page needs to attach behaviour (inferred).
- `snippets/view-transition-opt-in.liquid` and `assets/view-transitions.js`:

  ```
  @media (prefers-reduced-motion: no-preference) { @view-transition { navigation: auto; } }
  <link rel="expect" href="#MainContent" blocking="render" id="view-transition-render-blocker">
  // JS: remove the blocker when reduced motion, isLowPowerDevice(), first entry of a visit or reload
  //     (navigation.activation.from === null || navigationType === 'reload'); else remove after 1800 ms - performance.now()
  window.addEventListener('pageswap', e => { … viewTransition.types.add(transitionType) …
    ['pointerdown','keydown'] → viewTransition.skipTransition()   // protect INP
  ```

  It also turns cross-document transitions off in in-app WebViews (Facebook, Instagram, TikTok), citing freezes found in «June 2026 testing».
- `snippets/scripts.liquid` holds the importmap, module scripts and low-priority modulepreloads. Section and block CSS lives in `{% stylesheet %}` tags next to the component, but the live store loads it as one `compiled_assets/styles.css` (314 KB), so component CSS sits next to the component in source and ships as a single cacheable file. `assets/base.css` is 45 KB with no `@layer`.
- Each `blocks/*.liquid` ends in `{% schema %}` JSON: settings, translation keys (`t:settings.width`), `"tag": null` (the wrapper element omitted) and nested blocks. `snippets/image.liquid` builds `1x, 2x, 3x` `srcset` for fixed-height images; width-based lists come from the platform.

**Twenty Twenty-Five** ([github.com/WordPress/twentytwentyfive](https://github.com/WordPress/twentytwentyfive), trunk, code).
- The design system is data, not code: `theme.json` version 3 sets `appearanceTools`, content and wide sizes of 645 and 1340 px, `typography.fluid` with per-size `{min, max}` (xx-large 2.15rem to 3rem, WordPress generates the `clamp()`), a spacing scale from `clamp(30px, 5vw, 50px)` to `clamp(70px, 10vw, 140px)`, 8 palette colours, 10 styled elements and 29 styled blocks.
- Self-hosted variable fonts declared in theme.json (Manrope covering weights 200 to 800, Fira Code), with WordPress writing the `@font-face` rules.
- 36 style-variation JSON files, 98 patterns, 8 templates, 7 template parts. The theme ships no JavaScript of its own; interactivity comes from core blocks through the Interactivity API.

### What the open-source builders publish

- **Webstudio** (code): a static export template on vike, Vite and a React canary, with atomic CSS optional ([`templates/ssg`](https://github.com/webstudio-is/webstudio/blob/main/packages/cli/templates/ssg/package.json), code).
- **Gutenberg** (code): the Interactivity API, server-rendered HTML carrying `data-wp-*` directives (`bind`, `class`, `context`, `each`, `on`, `text`, `watch` and others) ([`directives/`](https://github.com/WordPress/gutenberg/tree/trunk/packages/interactivity/src/directives), code) on a Preact and signals runtime ([`package.json`](https://github.com/WordPress/gutenberg/blob/trunk/packages/interactivity/package.json), code), loaded per block through `viewScriptModule`.
- **Ghost** (code): Lexical JSON rendered to HTML on the server ([`kg-lexical-html-renderer`](https://github.com/TryGhost/Koenig/tree/main/packages/kg-lexical-html-renderer), code).
- **Silex** (code): `publish.rs` writes static files and deletes only stale pages an earlier publication wrote; files it never wrote are left alone ([`publish.rs`](https://github.com/silexlabs/Silex/blob/main/server-rust/src/publish.rs), code).
- **Sanity** (code): production builds must avoid stega characters, and the default filter already skips URLs, ids, slugs and SEO paths.

**For Urd:** the useful contrast is Gutenberg and Silex: static HTML plus small declarative runtime hooks (T35). When Urd pre-renders at publish, copy Silex's «delete only what you wrote» (T80). Gutenberg's per-block script modules match Urd's load-on-demand block modules (T34).

### Build patterns behind the output

**Minimal-wrapper HTML and small JS as a measurable advantage (Bricks against Elementor).** Bricks sends semantic HTML with minimal wrappers on CSS Grid and Flex; Elementor historically wrapped every element in several `div`s with generated classes and leaned on jQuery. (The earlier map's figure of a Bricks script of about 48 KB is superseded by the 210 KB bricks.min.js measured on 11 October 2026.) A hero measured 23 nodes and 4 wrapper divs (Elementor) against 9 nodes and 1 wrapper (Bricks), about 2.4 times fewer nodes over a whole site ([inspiredmonks](https://inspiredmonks.com/bricks-builder-vs-elementor-performance-2026/), [Crocoblock](https://crocoblock.com/blog/bricks-builder-vs-elementor/), secondary, indicative). The measurements of 11 October 2026 still point the same way (Elementor 1,845 `!important` and jQuery; Bricks clean `brxe-*` markup). For Urd, «no div soup, no generated classes, small JS» should be treated as a core feature, and made visible (T53).

**Free layout that is pure CSS at runtime (Squarespace Fluid Engine).** Blocks are stored as grid coordinates (start and end x, y, z and vertical alignment), not pixels, and rows are defined with `grid-template-rows: repeat(var(--num-rows), minmax(var(--row-height), auto))`, so rows stretch with content that grows, with no JS repositioning at runtime ([Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine), primary). It is a deliberate choice: a constrained grid instead of absolute positioning, to keep the feel of free placement while still guaranteeing a responsive render with no runtime JS. The technique with the highest fit for Urd: taken for mobile ([ADR-0019](../adr/0019-synced-mobile-model.md): one row grid for all sections, `minmax(8px, auto)` rows, row tracks for pinned blocks; T93). For desktop the model was inventoried and not taken ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md): about twenty files, `sticky.js` reading `style.top`, negative `y` for overhanging blocks, the presets' unaligned frames); there the content is pushed after the Wix rules instead (T94), and the desktop row grid can be reopened at a known price.

**Declarative responsive, variant chosen by name match (Framer).** Framer is desktop-first; components have variants per breakpoint, and a variant named to match a breakpoint is chosen automatically ([Framer breakpoints](https://www.framer.com/blog/responsive-breakpoints/), primary). Effects are built to carry over across breakpoints. Rejected in [ADR-0019](../adr/0019-synced-mobile-model.md): the model solves style per breakpoint, not layout sync, which was Urd's actual problem; «a separate mobile version» was rejected in the same place (T106; Google advises against separate mobile URLs and recommends responsive design). The measurements show the cost: Framer ships each breakpoint's markup as a hidden `ssr-variant` copy, with duplicate h1s as a result.

**theme.json: one token layer for the whole design (Gutenberg).** WordPress centralises colours, typography, spacing and duotone presets in one `theme.json`, and the Interactivity API gives a standard way to declare front-end interactivity, with each block declaring whether it supports it ([Interactivity API discussion](https://github.com/WordPress/gutenberg/discussions/55642), primary). Twenty Twenty-Five above shows it in practice. Urd already has tokens; formalising them as one documented contract (and opening for duotone) is a low-hanging, git-friendly step (T26).

**Content as ordered JSON, data baked in at publish (Builder.io, Ghost, Plasmic).** Builder.io stores content as an ordered `blocks` array rendered by its engine ([How Builder works](https://www.builder.io/c/docs/how-builder-works-technical), primary); Ghost uses a standardised JSON document that separates authoring from rendering ([Ghost's new editor](https://ghost.org/changelog/new-editor/), primary); Plasmic extracts data at build time and bakes it into static HTML, so data-driven pages render without waiting for a call ([Plasmic: data in code components](https://docs.plasmic.app/learn/data-code-components/), [data queries v2](https://plasmic.substack.com/p/data-queries-v2-full-rsc-support), primary). Blocks as JSON is already Urd's model; build-time baking is exactly the pattern behind the planned baked HTML at publish, and Plasmic shows how data can feel dynamic without a runtime backend (T33).

**Schema-validated content in git (Astro Content Collections, Keystatic, Decap).** Astro validates content collections with Zod ([Content Layer](https://astro.build/blog/content-layer-deep-dive/), primary); Keystatic and Decap define collections and fields as schema in TypeScript and config ([Keystatic with Astro](https://docs.astro.build/en/guides/cms/keystatic/), primary). A schema mismatch is caught before it breaks a built site. This is migration protection made systematic, and Urd already has JSON Schema in `schema/` ([SCHEMA.md](../SCHEMA.md)); the lesson is to use the validation actively as the safety net for the contract «never break a built site» ([ADR-0005](../adr/0005-versioning-and-migration.md)).

### What the best output looks like

What good output from a static builder looks like in 2026, item by item, with Urd's status on 11 October 2026 and where the work goes. Evidence is from the measurements above (measured) unless marked.

| # | Good output | Who does it, and who fails | Urd today | Where it goes |
|---|---|---|---|---|
| 1 | Content, metadata and JSON-LD in the served HTML; JS optional | Astro (8 KB JS), TT5 (no external JS), Carrd demo (20 KB page), wordpress.org/news (20 KB gz JS), Horizon. Fails: Figma Make (2.86 MB of JS for a shell) | No text until JS runs; the title, and the description, OG, canonical and JSON-LD from `seo.js`, are set at boot, so non-JS crawlers and link previews see nothing; a Norwegian `<noscript>` literal | T33 (v0.8 baking), T52 (Bugs) |
| 2 | JS per component, only where used | Horizon (47 module scripts only for blocks on the page), WordPress (40 KB runtime), Astro (5 scripts of 0.2 to 2.5 KB). Fails: Squarespace and Framer ship the full runtime everywhere | All 64 modules preloaded on every page, 769 KB raw / 262 KB gz, including `blocks/calendar.js` (100 KB), shop, checkout, cart, map and form | T34 (v0.8 baking) |
| 3 | Behaviour bound declaratively, no inline handlers | Horizon `on:click="/method"` and `ref`; WordPress `data-wp-on--click` | The engine attaches listeners at render (no inline handlers, the CSP forbids them); there is no declarative layer a baked page could use | T35 (v0.8 baking) |
| 4 | One cacheable visitor stylesheet, editor CSS separate, component CSS next to the component in source | Horizon (one compiled file), TT5 (only CSS for blocks used). Anti-patterns: Dawn's 42 `<link>`s, Squarespace's 1.27 MB | base.css 354 KB / 72 KB gz, immutable behind a content hash, about 11 % of its rules editor or preview styles (heuristic); no `@layer` | T39 (v0.8 speed) |
| 5 | Modern CSS with progressive guards | Horizon (`:has()` 334, `@starting-style` 17, anchors), Webstudio (timelines under reduced motion), Wix (named view-transition groups) | Already strong (`@container`, `light-dark()`, `:has()`, `view()`, `interpolate-size`, anchors, `color-mix()` behind gates); missing `@starting-style` (0 rules) and `@layer` | T63 (0.7.0), T39 |
| 6 | Cross-document View Transitions that never cost first paint | Horizon: at-rule under reduced motion, `rel=expect` hold dropped on first entry, reload, low power and after 1.8 s, types in `pageswap`, skip on input, off in in-app WebViews | `@view-transition { navigation: auto }` (the pseudo-element animations are off under reduced motion, the at-rule is not gated), `blocking="render"` on `boot.js` and an arrival hold with a 5 s ceiling | T36 (v0.8 baking) |
| 7 | Speculation rules | WordPress core (document source, exclusions, moderate), Wix (eager), Astro (`data-astro-prefetch`) | Ahead: a response header, prefetch and prerender at moderate, `/admin/*` and `/api/*` excluded | T49 (watch) |
| 8 | Images responsive, modern, sized, main image prioritised | `srcset` + `sizes="auto, …"` (WordPress, Squarespace); AVIF (Framer, Wix, Hostinger); `width`/`height` on all (Horizon, WordPress, Webstudio, Astro); hero eager and `fetchpriority=high` (Horizon, Squarespace, WordPress, Astro). Anti-patterns: Bricks preloads 16 images high, Wix needs JS before the real image, Webflow `width="Auto"`, Elementor `srcset` without `sizes` | Every image lazy, the hero too; no `width`/`height`, no `srcset`; WebP at up to 1600 px only | T44, T45, T46, T47 (v0.8 responsive pictures) |
| 9 | Fonts | Self-hosted variable woff2 with unicode-range subsets (Figma, Wix, Framer); 1 to 2 preloads (Astro, WordPress); low-priority preloads (Horizon); fonts as data (TT5). Anti-patterns: Figma's `font-display:block`, duplicate preloads (Bricks, Elementor), 208 Google faces (Carrd Pro) | 0 font bytes, the best possible score | T48 (if own fonts arrive) |
| 10 | Head metadata | Full sets on Framer, Elementor, Webflow, Wix; theme-color (red.org, Webflow, Astro); `color-scheme` (webflow.com); RSS alternate (WordPress, Ghost, Astro) | Injected at runtime by `seo.js`; no `color-scheme` or theme-color meta, no RSS `<link rel=alternate>` though Urd has RSS | T38, T33 (v0.8 baking) |
| 11 | Machine-readable alternates for AI agents | Framer `?md` and `rel=describedby` llms.txt; WordPress `rel=alternate type=text/markdown`; Wix llms.txt with MCP; Shopify `rel=ucp`, `/agents.md` | None | T50 (v0.8 publish-time files) |
| 12 | robots.txt policy lines | framer.com and webflow.com `Content-Signal`; wordpress.org allows AI agents by name; 404media blocks GPTBot | 4 lines, no AI or Content-Signal lines | T50 |
| 13 | Sitemap with `lastmod` | Webstudio (48 of 126), Hostinger (56 of 56), ApeironLF (15 of 15); Squarespace and Carrd Pro add `image:image` | 7 entries, 0 `lastmod` | T50 |
| 14 | Security headers | No other builder has a script CSP without `unsafe-inline` limited to its own origin; HSTS near-universal (Framer, Hostinger, Webstudio with preload) | Best-in-class script CSP; no HSTS; `style-src 'unsafe-inline'` kept (baked HTML without runtime `style=""` attributes could drop it, inferred) | T40 (v0.8 speed), T33 |
| 15 | Caching and compression | Hashed assets immutable for a year (Webflow CSS, Webstudio, Astro, Framer JS, Shopify); brotli or zstd HTML (Hostinger zstd). Gzip-only HTML: Webflow, Squarespace, Carrd, Ghost, Astro | Brotli and HTTP/3; base.css and media immutable; the engine immutable on released sites (no-cache on the monorepo demo by design); `content/theme.css` at `max-age=0` | T43 (watch) |
| 16 | 103 Early Hints | Webflow (truus, osmo), Webstudio, Shopify, ApeironLF on the same Pages platform | None seen, probably because of the 64-entry `Link:` header (inferred) | T41 (v0.8 speed) |
| 17 | Accessibility basics in the served HTML | Skip link (Squarespace, Horizon, Dawn, WordPress, Bricks, Astro, red.org, webflow.com); one h1 and heading order (Astro, Horizon, WordPress); real `<a>`/`<button>`. Fails: Figma (87 `div role=link`, no headings), Framer and Wix duplicate h1s from breakpoint variants | `lang` and `<header>`/`<main>` shells, `:focus-visible` (24 rules), a single DOM with no duplicated variants; no skip link | T51 (0.7.11); one h1 per baked page (T33) |
| 18 | Entrance and scroll animation that cannot hide content | Best: CSS-only timelines inside `prefers-reduced-motion: no-preference` (Webstudio), `@starting-style` (Horizon). Risky: content rendered invisible until JS (Framer `opacity:0.001`, Figma `opacity:0`, Webflow `visibility:hidden` until `w-mod-ix3`) | Entrance is classes plus IntersectionObserver (`animations/core.js`) with reduced motion respected; parallax pure CSS | T37 (v0.8 baking); `view()` as the default entrance not taken (T108) |
| 19 | Third-party default footprint | Builders that inject their own scripts: Wix (Thunderbolt, Sentry), Squarespace (Sentry), Ghost (Portal 2.5 MB, stats), Shopify (perf-kit, Trekkie), Webflow (jQuery) | Best-in-class: only the optional Cloudflare Web Analytics, allowed by the CSP. The video block's iframe loads without a click (privacy side in [FEATURES.md](FEATURES.md)) | Keep it optional |

**Suggested order for Urd** (inferred from the gaps): (1) v0.8 baking, with per-page module lists, metadata and JSON-LD in the HTML, and `rel=expect` instead of a render-blocking `boot.js` (T33, T34, T36); (2) image dimensions and a high-priority hero, then `srcset` and AVIF (T44, T45, T46); (3) HSTS and a hash for theme.css (T40, T43); (4) the editor CSS split out of base.css (T39); (5) a skip link, and an animation start state that applies only when JS runs (T51, T37); (6) llms.txt, Content-Signal, sitemap `lastmod` and Markdown alternates (T50); (7) a Horizon-style declarative delegation layer as the enhancement runtime after baking (T35).

---

## Part 4. The web platform, October 2026

What the browsers support on 11 October 2026, for every feature a builder engine touches, and what each one would replace or enable in Urd. ADR-0011's rule applies throughout: lead with the native element, gate every enhancement that is not Baseline with `@supports` or a feature check, and fall back to a JS path or to the element in its END state, never hidden ([ADR-0011](../adr/0011-native-css-first.md)). Where the reports disagreed, the platform data below wins on browser support and versions.

### Calibration

| Engine | Current stable | Next | Cadence | Source |
|---|---|---|---|---|
| Chrome / Edge | **155** (6 October 2026); Edge ships the same Chromium a few days later | 156 on 20 October 2026 (in beta, adds `random()`) | Every **two weeks** since Chrome 153 (8 September 2026) | [Chrome two-week release](https://developer.chrome.com/blog/chrome-two-week-release), [chromestatus 155](https://chromestatus.com/release-notes/155) (primary) |
| Firefox | **157** (29 September 2026) | 158 on 13 October 2026 (JPEG XL on by default) | Every **two weeks** since Firefox 155 (1 September 2026) | [Firefox 157](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/157), [Firefox 158](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/158), [Mozilla](https://blog.mozilla.org/sumo/2026/08/19/firefox-new-release-cadence-and-what-to-expect/) (primary) |
| Safari | **27.0** (14 September 2026). The 26.x line: 26.0 (15 September 2025), 26.2 (12 December 2025), 26.3 (11 February 2026), 26.4 (24 March 2026), 26.5 (11 May 2026), 26.6 (27 July 2026). Technology Preview (TP) 254 (8 October 2026) | 27.x | Point releases | [Safari 27](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/), [Safari 26.6](https://webkit.org/blog/18178/webkit-features-for-safari-26-6/), [STP 254](https://webkit.org/blog/18420/release-notes-for-safari-technology-preview-254/) (primary) |

There has never been a «Safari 19»: Apple went from 18 straight to 26 in September 2025.

**Interop 2026** has 20 focus areas, among them anchor positioning, container style queries, dialogs and popovers (`closedby`, `:open`, `popover="hint"`), scroll-driven animations, view transitions (cross-document, `rel="expect"` and `blocking="render"` included), `attr()`, `contrast-color()`, custom highlights, the Navigation API, scoped registries, scroll snap, `shape()` and `zoom`, with JPEG XL as an investigation area. Interop 2025 closed at 99 for Chrome and Firefox and 98 for Edge and Safari ([web.dev](https://web.dev/blog/interop-2026), [Mozilla Hacks](https://hacks.mozilla.org/2026/02/launching-interop-2026/), primary). **State of CSS 2026** (4,902 respondents, May to June 2026): anchor positioning was the favourite new feature and also topped the features held back by browser support; the top incompatibility complaints were anchor positioning, view transitions and scroll-driven animations ([2026.stateofcss.com](https://2026.stateofcss.com/en-US/), secondary). The 2026 State of HTML and State of JS have not been published.

**How to read the tables.** «no» means not supported; «flag» or «pref» means off by default; «TP» means Safari Technology Preview only; «Nightly» means Firefox Nightly only. Baseline dates come from web-features through webstatus.dev unless a row says otherwise; [Where the sources disagree](#where-the-sources-disagree) lists the conflicts. Source abbreviations: «ws» is [webstatus.dev](https://webstatus.dev/), «bcd» is [MDN browser-compat-data](https://github.com/mdn/browser-compat-data); both, the release notes and web.dev are (primary).

### Support tables

#### CSS: components, layout, scrolling

| Feature | Chrome | Firefox | Safari | Baseline | What it replaces or enables in Urd | Source |
|---|---|---|---|---|---|---|
| Customizable select (`appearance: base-select`, `::picker(select)`, `::picker-icon`, `::checkmark`, `<selectedcontent>`) | 135 (listbox mode 145) | Flag only since 149; the parser keeps rich `<option>` content since 153 | **27** (drop-down only) | Limited (2 engines) | The only path that could retire ADR-0009's ban on native `<select>` and both dropdown implementations (`Dropdown.svelte`, `dropdown.js`): T68 | [ws](https://webstatus.dev/features/customizable-select), [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/appearance.json), [FF 153](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/153) (primary) |
| `::scroll-marker`, `scroll-marker-group` | 135 (`links`/`tabs` modes 154) | no | no | Limited | The hand-rolled dots in `blocks/gallery.js`: T67 | [ws](https://webstatus.dev/features/scroll-markers), [Chrome 154](https://developer.chrome.com/release-notes/154) (primary) |
| `::scroll-button()` | 135 | no | no | Limited | The gallery's previous/next arrows: T67 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/selectors/scroll-button.json) (primary) |
| `:target-current` / `:target-before` / `:target-after` | 135 / 142 | no | no | Limited | Active-dot and progress styling | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/selectors/target-current.json), [ws](https://webstatus.dev/features/scroll-marker-targets) (primary) |
| `scroll-target-group` (scroll-spy) | 140 | no | no | Limited | The active entry in the page index (0.7.13.16) without IntersectionObserver | [ws](https://webstatus.dev/features/scroll-target-group) (primary) |
| `scroll-initial-target` | 133 | no | no | Limited | Start a carousel on slide N without scripted scrolling | [ws](https://webstatus.dev/features/scroll-initial-target) (primary) |
| Scroll-snap events (`scrollsnapchange`, `scrollsnapchanging`) | 129 | no | no | Limited | A slide-change hook for the gallery; fall back to `scrollend` (Baseline December 2025) | [ws](https://webstatus.dev/features/scroll-snap-events) (primary) |
| `scroll-state()` container queries (`stuck`, `snapped`, `scrollable`/`scrolled`) | 133 / 144 | no | no | Limited | The nav's scroll classes (compact, hidden, scrolled) in `nav.js`, and IntersectionObserver sentinels: T75 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/container.json), [ws](https://webstatus.dev/features/container-scroll-state-queries) (primary) |
| Anchor positioning core (`anchor-name`, `position-anchor`, `anchor()`, `position-area`, `@position-try`) | 125 (`position-area` 129) | **147** (13 January 2026) | 26 | web.dev called the core Baseline in January 2026; web-features now says «limited» because of 2026 sub-features | In use: the five floating menus of editor and engine take the native branch behind `anchored.js` | [web.dev January 2026](https://web.dev/blog/web-platform-01-2026), [FF 147](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/147), [ws](https://webstatus.dev/features/anchor-positioning) (primary) |
| `position-try-fallbacks` | 128 (`flip-x`/`flip-y` 144) | 147 | 26 (`flip-x`/`flip-y` 26.2) | As above | Urd's gate for the menus (`anchored.js:22`) now passes in all three engines | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/position-try-fallbacks.json) (primary) |
| `position-anchor: normal` (new initial value) | 151 | 151 | 27 | no | Behaviour change: re-test the anchored menus | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/position-anchor.json) (primary) |
| `anchor-size()` | 125 (inset/margin 132) | 147 (not animatable) | 26 | As the core | A menu at least as wide as its trigger | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/types/anchor-size.json) (primary) |
| `@container anchored(fallback)` | 143 | no | no | Limited | Flip a tooltip arrow when a fallback position is used | [ws](https://webstatus.dev/features/container-anchor-position-queries) (primary) |
| `interpolate-size` / `calc-size()` | 129 | no (bug 1945962) | TP 254 | Limited | In use behind `@supports` for the FAQ's height animation (4 rules): T74 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/interpolate-size.json), [STP 254](https://webkit.org/blog/18420/release-notes-for-safari-technology-preview-254/) (primary) |
| `::details-content` | 131 | 143 | 18.4 | **Newly, 16 September 2025** | In use in the FAQ; only the size interpolation still needs a gate | [ws](https://webstatus.dev/features/details-content) (primary) |
| `@starting-style` | 117 | 129 | 17.5 | Newly, 6 August 2024 (widely February 2027) | Entry animations for the cart drawer, dialogs, popovers and new blocks (0 rules today): T63 | [ws](https://webstatus.dev/features/starting-style) (primary) |
| `transition-behavior: allow-discrete` | 117 | 129 | 17.4 | Newly, 6 August 2024 | In use (2 rules); animate `display` (and `overlay`, not in Safari, so a top-layer close snaps there) on close | [ws](https://webstatus.dev/features/transition-behavior) (primary) |
| `field-sizing: content` | 123 | 152 | 26.2 | **Newly, 16 June 2026** | An auto-growing textarea in the form block: T58 | [ws](https://webstatus.dev/features/field-sizing) (primary) |
| `reading-flow` / `reading-order` | 137 | no | no | Limited | Focus order that follows the visual order, for example in the mobile row grid | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/reading-flow.json) (primary) |
| Native masonry `display: grid-lanes` (+ `flow-tolerance`) | Flag (140+) | Nightly pref | **26.4** | Limited (1 engine) | The gallery's mosaic view; the fallback is an ordinary grid: T70 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/display.json), [WebKit](https://webkit.org/blog/17758/when-will-css-grid-lanes-arrive-how-long-until-we-can-use-it/) (primary) |
| `@scope` | 143 | 146 | 26.4 | Newly (web.dev December 2025; web-features 24 March 2026) | Block-scoped CSS without prefixes for plugin blocks; donut scopes for nested blocks | [ws](https://webstatus.dev/features/scope), [web.dev December 2025](https://web.dev/blog/web-platform-12-2025) (primary) |
| CSS nesting | 120 | 117 | 17.2 | **Widely, 11 June 2026** | Safe in raw-served CSS | [ws](https://webstatus.dev/features/nesting) (primary) |
| Size container queries and `cq*` units | 105 | 110 | 16 | Widely (August 2025) | In use inside blocks (12 `@container` rules, the gallery's narrow column count), never on the canvas (ADR-0018) | [ws](https://webstatus.dev/features/container-queries) (primary) |
| Style container queries (custom properties) | 111 | 151 | 18 | **Newly, 19 May 2026** | Block variants through `--variant` instead of piles of classes | [ws](https://webstatus.dev/features/container-style-queries) (primary) |
| Range syntax in style queries and `if()` | 142 | 151 per MDN data (the 151 notes list it as experimental) | no | Limited | `@container style(--cols > 2)` | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/container.json) (primary) |
| Name-only `@container name` | 148 | 149 | 26.4 | Newly, May 2026 | Query «inside a sidebar block» without a size condition | [ws](https://webstatus.dev/features/container-name-queries) (primary) |
| `overscroll-behavior` on non-scroll containers / `chain` | 144 / no | 150 / 157 | no | Limited (the base property is widely available) | Stop scroll chaining out of drawers | [ws](https://webstatus.dev/features/overscroll-behavior), [FF 157](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/157) (primary) |
| `scrollbar-gutter` | 94 | 97 | 18.2 | Newly, December 2024 | In use (1 rule): no layout shift when a modal locks scrolling | [ws](https://webstatus.dev/features/scrollbar-gutter) (primary) |
| `overflow: clip` | 90 | 81 | 16 | Widely | Clipping that does not break `position: sticky` | [ws](https://webstatus.dev/features/overflow-clip) (primary) |
| `overflow-clip-margin` | 90 (partial) | 102 (box keywords 148) | no | Limited | Let shadows bleed out of clipped blocks | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/overflow-clip-margin.json) (primary) |
| CSS `zoom` | 1 (animatable since 150) | 126 | 3.1 (rebuilt in 27) | Newly, 14 May 2024 (widely November 2026); Interop 2026 | In use: editor preview scaling and «fit: shrink» per block (ADR-0024); expect fewer engine bugs | [ws](https://webstatus.dev/features/zoom), [Chrome 150](https://developer.chrome.com/release-notes/150) (primary) |
| `Element.currentCSSZoom` | 128 | 126 | 26.4 | Newly, March 2026 | In use (`render.js:327`, `blocks/text.js:74`) for correct maths in a zoomed block | [caniuse](https://caniuse.com/mdn-api_element_currentcsszoom) (secondary) |
| `overflow-anchor` | 56 | 66 | **27** | **Newly, 14 September 2026** | No jumps when lazy blocks load above the viewport | [ws](https://webstatus.dev/features/overflow-anchor) (primary) |
| `stretch` sizing keyword | 138 | only the `-webkit-fill-available` alias (146) | 27 | Limited | Replaces `calc(100% - margins)` | [ws](https://webstatus.dev/features/stretch) (primary) |

#### CSS: functions and values

| Feature | Chrome | Firefox | Safari | Baseline | What it replaces or enables in Urd | Source |
|---|---|---|---|---|---|---|
| `if()` | 137 (range syntax 142) | no | no | Limited | Inline conditionals on custom properties | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/types/if.json) (primary) |
| `sibling-index()` / `sibling-count()` | 138 | 154 | 26.2 | **Newly, 18 August 2026** | The plain index stagger (`animations/core.js:213` writes `--urd-anim-delay` per card); the column, row and centre waves depend on measured positions and stay: T60 | [ws](https://webstatus.dev/features/sibling-count), [FF 154](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/154) (primary) |
| Typed `attr()` (`attr(data-x type(<length>))`) | 133 | 155 | TP | Limited (2 engines) | Pass block settings from `data-*` into CSS without inline styles, one step towards dropping `style-src 'unsafe-inline'` | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/types/attr.json), [FF 155](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/155) (primary) |
| `@function` | 139 | no | TP | Limited | Design-token helper functions | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/function.json) (primary) |
| `@mixin` / `@apply` | no | no | no | No engine has implemented it | none | [ws](https://webstatus.dev/features/mixin) (primary) |
| `shape()` | 135 | 148 | 18.4 | **Newly, 24 February 2026** | Section dividers as `clip-path` without the SVG path from `divider-model.js`: T61 | [ws](https://webstatus.dev/features/shape-function) (primary) |
| `corner-shape` / `superellipse()` | 139 | Nightly pref (158) | TP | Limited | Squircle, bevel and notch corners for the radius scale (0.7.9); the fallback is plain `border-radius` | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/corner-shape.json), [FF 158](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/158) (primary) |
| `border-shape` | 147 | no | no | Limited | Non-rectangular borders | [Chrome 147](https://developer.chrome.com/release-notes/147) (primary) |
| `light-dark()` for colours | 123 | 120 | 17.5 | Newly, May 2024 (widely 13 November 2026) | In use: the theme | [ws](https://webstatus.dev/features/light-dark) (primary) |
| `light-dark()` for images | 150 | 150 | 27 | **Newly, 14 September 2026** | A logo per colour scheme without media queries: T62 | [ws](https://webstatus.dev/features/light-dark-image) (primary) |
| `contrast-color()` | 147 | 146 | 26 | **Newly, 10 April 2026** | In use: text on accent surfaces (`theme.js:146`), black or white only | [web.dev April 2026](https://web.dev/blog/web-platform-04-2026), [ws](https://webstatus.dev/features/contrast-color) (primary) |
| `color-mix()` | 111 | 113 | 16.2 | Widely (November 2025); more than two colours in Firefox 150 and Safari 27 | In use (193 in base.css) | [ws](https://webstatus.dev/features/color-mix) (primary) |
| Relative colour syntax | 125 | 128 | 18 | Newly, September 2024 | Tints and shades from one brand token (an OKLCH theme from one colour, 0.7.9) | [ws](https://webstatus.dev/features/relative-color) (primary) |
| `alpha()` | 151 to 152 | 155 | 27 | Newly, 14 September 2026 | `alpha(from var(--brand) / .5)` | [ws](https://webstatus.dev/features/alpha) (primary) |
| `progress()` | 138 | 155 | 26 | **Newly, 1 September 2026** | Fluid type and opacity driven by container width (the fluid type scale, 0.7.9) | [ws](https://webstatus.dev/features/progress-function) (primary) |
| `random()` | 156 (stable 20 October 2026) | Nightly | 26.2 (`element-scoped` 26.5) | Limited | Decorative variety without JS | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/types/random.json), [chromestatus](https://chromestatus.com/release-notes) (primary) |
| `round()` / `mod()` / `rem()` | 125 | 118 | 17.2 | Newly, May 2024 | Snap sizes to the grid | [ws](https://webstatus.dev/features/round-mod-rem) (primary) |
| `@property` (with `inherits`) | 85 | 128 | 16.4 | Newly, 9 July 2024 (widely January 2027) | Animatable gradient stops and tokens | [ws](https://webstatus.dev/features/registered-custom-properties) (primary) |
| `@supports at-rule()` | 148 | 157 | no | Limited | Gating `@position-try`, `@scope`, `@function` | [Chrome 148](https://developer.chrome.com/release-notes/148), [FF 157](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/157) (primary) |
| `revert-rule` | 148 | 150 | 27 | Newly, September 2026 | Theme overrides that fall back cleanly | [web.dev September 2026](https://web.dev/blog/web-platform-09-2026) (primary) |

#### Animation and view transitions

| Feature | Chrome | Firefox | Safari | Baseline | What it replaces or enables in Urd | Source |
|---|---|---|---|---|---|---|
| Scroll-driven animations (`animation-timeline: scroll()` / `view()`) | 115 | **Nightly only** (still experimental in 155) | 26 (threaded since 26.4) | Limited; Interop 2026 | In use for parallax behind `@supports`, with the rAF variant as the fallback | [ws](https://webstatus.dev/features/scroll-driven-animations), [Firefox experimental features](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features) (primary) |
| Scroll-triggered animations (`timeline-trigger`, `animation-trigger`) | 146 (play no longer rewinds since 151) | no | no | Limited | One-shot reveal on scroll without IntersectionObserver; one day an answer to ADR-0011 decision 4 | [Chrome 146](https://developer.chrome.com/release-notes/146), [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/animation-trigger.json) (primary) |
| Same-document view transitions | 111 | 144 | 18 | **Newly, 14 October 2025** | Editor and preview state changes | [ws](https://webstatus.dev/features/view-transitions) (primary) |
| `view-transition-class` | 125 | 144 | 18.2 | Newly, 14 October 2025 | One animation class shared by many cards | [ws](https://webstatus.dev/features/view-transition-class) (primary) |
| View transition types, `:active-view-transition`, `document.activeViewTransition` | 125 (`activeViewTransition` 142) | 147 | 18.2 (`activeViewTransition` 26.2) | **Newly, 13 January 2026** | Direction-aware page and slide transitions | [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/ViewTransition.json), [ws](https://webstatus.dev/features/active-view-transition) (primary) |
| Cross-document view transitions (`@view-transition { navigation: auto }`) | 126 | Nightly only | 18.2 | Limited; Interop 2026 | In use; harmless where unsupported | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/view-transition.json) (primary) |
| `blocking="render"` / `<link rel="expect">` | 105 / 124 | no / no | 18.2 / 18.2 | Limited; Interop 2026 | `blocking="render"` is on `boot.js` today; `rel=expect` replaces it once pages are baked: T36 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/link.json) (primary) |
| Nested transition groups (`view-transition-group`) | 140 | no | no | Limited | Clip children inside card transitions | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/view-transition-group.json) (primary) |
| Element-scoped transitions (`element.startViewTransition()`) | 147 | no | no | Limited | Animate one block (cart, gallery) while the page stays interactive | [ws](https://webstatus.dev/features/view-transitions-element-scoped) (primary) |
| `ViewTransition.waitUntil()` | 144 | no | no | Limited | none | [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/ViewTransition.json) (primary) |

#### Typography, print, media queries

| Feature | Chrome | Firefox | Safari | Baseline | What it replaces or enables in Urd | Source |
|---|---|---|---|---|---|---|
| `text-box` / `text-box-trim` / `text-box-edge` | 133 | **154** | 18.2 | **Newly, 18 August 2026** (web.dev; webstatus has not caught up) | Optically centred buttons and badges, tight headings (not used today): T59 | [FF 154](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/154), [web.dev August 2026](https://web.dev/blog/web-platform-08-2026) (primary) |
| `text-wrap: balance` | 114 | 121 | 17.5 | Newly, May 2024 (widely November 2026) | In use for headings (2 rules) | [ws](https://webstatus.dev/features/text-wrap-balance) (primary) |
| `text-wrap: pretty` | 117 | no | 26 | Limited (ignored where unsupported) | Body copy without orphans (0.7.9) | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-wrap.json) (primary) |
| `text-fit` | 150 | no | no | Limited | A headline that fits its container, with no CSS fallback; Urd's «fit: shrink» does it per block today: T77 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-fit.json) (primary) |
| `hanging-punctuation` | no | no | Partial since 10, full in 26.5 | Limited | Optical margins for the quote block | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/hanging-punctuation.json) (primary) |
| `initial-letter` | 110 | no (pref only) | `-webkit-` prefix since 9 | Limited | A drop cap behind a gate (0.7.9) | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/initial-letter.json) (primary) |
| `font-size-adjust` | 127 | 118 | 17 | Newly, July 2024 | Consistent x-height across the system font stacks Urd uses | [ws](https://webstatus.dev/features/font-size-adjust) (primary) |
| `dynamic-range-limit` | 136 | no | 26 (partial) | Limited | Tone down HDR photos in galleries | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/dynamic-range-limit.json) (primary) |
| `@page` `size` and margins | 15 | 95 | 18.2 | Newly, December 2024 | Print styles (0.7.22): T78 | [ws](https://webstatus.dev/features/page-setup) (primary) |
| Page-margin boxes (`@top-center` and friends) | 131 | no | no | Limited | Running headers and footers in print | [bcd](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/page.json) (primary) |
| `break-*` / page breaks | 50 | 65 | 10 | Widely | Print styles: T78 | [ws](https://webstatus.dev/features/page-breaks) (primary) |
| `print-color-adjust` | 136 | 97 | 15.4 | Newly, May 2025 | Keep brand backgrounds when printing: T78 | [ws](https://webstatus.dev/features/print-color-adjust) (primary) |
| `@media (scripting)` | 120 | 113 | 17 | Widely | Styles for the no-JS end state (with T37) | [ws](https://webstatus.dev/features/scripting) (primary) |
| `prefers-reduced-transparency` | 119 | no (pref) | no | Limited | The glass level (0.7.9) | [ws](https://webstatus.dev/features/prefers-reduced-transparency) (primary) |
| `prefers-contrast` / `forced-colors` | 96 / 90 | 101 / 81 | 14.1 / 16 | Widely | Safe; editor outlines that survive forced colours (T8) | [ws](https://webstatus.dev/features/prefers-contrast), [ws](https://webstatus.dev/features/forced-colors) (primary) |

#### HTML

| Feature | Chrome | Firefox | Safari | Baseline | What it replaces or enables in Urd | Source |
|---|---|---|---|---|---|---|
| `<dialog closedby>` | 134 | 141 | **TP only** | Limited; Interop 2026 | Light dismiss for the lightbox, cart and quick view; `lightbox.js` closes on a backdrop click in JS today: T73 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/dialog.json) (primary) |
| `dialog.requestClose()` | 134 | 139 | 18.4 | Newly, 27 May 2025 | Close a dialog but let `cancel` veto it | [ws](https://webstatus.dev/features/requestclose) (primary) |
| Invoker commands (`command` / `commandfor`) | 135 | 144 | 26.2 | **Newly, 12 December 2025** | Open and close the dialogs and popovers without click handlers: T56 | [ws](https://webstatus.dev/features/invoker-commands), [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/HTMLButtonElement.json) (primary) |
| Interest invokers (`interestfor`) | 142 | no | no | Limited | Hover and focus previews without JS | [ws](https://webstatus.dev/features/interest-invokers) (primary) |
| `popover="hint"` | 151 per MDN data (133 with the older behaviour, reworked in 150) | 153 per MDN data (first in 149) | TP | Limited; Interop 2026 | A tooltip that does not close an open menu (the tooltip element, ER-A in [ELEMENTS.md](ELEMENTS.md)) | [FF 149](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/149), [Chrome 150](https://developer.chrome.com/release-notes/150) (primary) |
| Popover API | 114 | 125 | 17 | Newly, 27 January 2025 | In use (the five menus); since Chrome 154 light dismiss fires on `click`, not pointer events | [ws](https://webstatus.dev/features/popover), [Chrome 154](https://developer.chrome.com/release-notes/154) (primary) |
| `:open` / `ToggleEvent.source` | 133 / 140 | 136 / 145 | 26.5 / 26.5 | **Newly, 11 May 2026** | Style open details, dialogs and selects; know which button opened a popover | [ws](https://webstatus.dev/features/open-pseudo), [ws](https://webstatus.dev/features/toggleevent-source) (primary) |
| `hidden="until-found"` + `beforematch` | 102 | 148 | 26.2 (does not scroll to the match) | Limited per web-features, but all 3 engines ship it | Collapsed content and tab panels that find-in-page and `#fragment` links can reveal: T57 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/html/global_attributes.json), [Safari 26.2](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/) (primary) |
| `<details>` opens on find-in-page | 97 | 148 (partial 139 to 147) | 26.2 (partial) | All 3 engines | The FAQ's text is searchable (in use through `<details>`) | [bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/details.json) (primary) |
| `<details name>` | 120 | 130 | 17.2 | Newly, September 2024 | In use: the FAQ | [ws](https://webstatus.dev/features/details-name) (primary) |
| `<search>` | 118 | 118 | 17 | Widely, April 2026 | A search landmark for the calendar's search and filter | [ws](https://webstatus.dev/features/search) (primary) |
| `loading="lazy"` on images and iframes | 77 | 121 | 16.4 | Widely, June 2026 | In use on every image and the video iframe; never on the main image (T44) | [ws](https://webstatus.dev/features/loading-lazy) (primary) |
| `loading="lazy"` on `<video>` / `<audio>` | 148 (web.dev) / 150 (webstatus) | no | no | Limited | Lazy video and audio blocks; elsewhere `preload="none"` | [ws](https://webstatus.dev/features/loading-lazy-media), [Chrome 148](https://developer.chrome.com/release-notes/148) (primary) |
| `fetchpriority` | 101 | 132 | 17.2 | Newly, October 2024 | Prioritise the main (LCP) image: T44 | [ws](https://webstatus.dev/features/fetch-priority) (primary) |
| Speculation Rules (prefetch, prerender, `eagerness`) | 109 (prefetch 110, prerender 105, `eagerness` 121, `tag` 136, eager on mobile 143) | no | 26.2 **behind a pref**: prefetch only, document rules `conservative` only, no prerender | Limited | In use as a header; inert where unsupported. The client-side router's gate: T69 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/script.json), [Chrome 143](https://developer.chrome.com/release-notes/143) (primary) |
| `inert` | 102 | 112 | 15.5 | Widely, October 2025 | Lock the background under a drawer that is not a modal dialog | [ws](https://webstatus.dev/features/inert) (primary) |
| `:user-valid` / `:user-invalid` | 119 | 88 | 16.5 | Widely, May 2026 | Validation styling for the form block with no JS (not used today) | [ws](https://webstatus.dev/features/user-pseudos) (primary) |
| `form.requestSubmit()` | 76 | 75 | 16 | Widely | Submit with validation from JS | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit) (primary) |
| `showPicker()` on `<input>` / `<select>` | 99 / 121 | 101 / 122 | 17.4 / no | Limited | Open the date picker from a custom button | [ws](https://webstatus.dev/features/show-picker-input), [ws](https://webstatus.dev/features/show-picker-select) (primary) |
| Styling `<input type="date">` | only `::-webkit-datetime-edit*` | no | only `::-webkit-datetime-edit*` | No standard | No cross-browser hooks; `base` appearance does not reach date inputs | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date) (primary) |
| `<input type="checkbox" switch>` | no | no | 17.4 | Limited | A native toggle, Safari only | [ws](https://webstatus.dev/features/switch-control) (primary) |
| `<img sizes="auto">` | 126 | 150 | 27 (partial: distorts SVG with `object-fit`) | All 3 engines since 14 September 2026; webstatus not updated | No hand-written `sizes` on lazy images: T46 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/img.json), [web.dev April 2026](https://web.dev/blog/web-platform-04-2026) (primary) |
| `autocorrect` | 153 | 136 | 14.1 | Newly, September 2026 | Autocorrect off in code and reference fields | [ws](https://webstatus.dev/features/autocorrect) (primary) |
| `focusgroup` | 150 | no | no | Limited | Arrow-key roving focus in tabs, menus and the editor's toolbars | [Chrome 150](https://developer.chrome.com/release-notes/150) (primary) |

#### JavaScript language and modules

| Feature | Chrome | Firefox | Safari | Baseline | What it replaces or enables in Urd | Source |
|---|---|---|---|---|---|---|
| `Temporal` | 144 | 139 | **TP only** | Limited | DST-safe recurrence arithmetic in `ics.js`; the fallback must stay Urd's own code: T71 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/javascript/builtins/Temporal.json), [Chrome 144](https://developer.chrome.com/release-notes/144) (primary) |
| `Intl.DurationFormat` | 129 | 136 | 16.4 | Newly, March 2025 | «1 hr 30 min» event durations in the calendar | [ws](https://webstatus.dev/features/intl-duration-format) (primary) |
| `Intl.Locale` info (`getWeekInfo()`, `getHourCycles()`) | 130 (getters became methods around 143) | 153 | 17 | **Newly, 21 July 2026** | In use: the calendar's first weekday (`calendar-format.js:32`) | [ws](https://webstatus.dev/features/intl-locale-info), [FF 153](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/153) (primary) |
| Iterator helpers / `Iterator.concat()` | 122 / 146 | 131 / 147 | 18.4 / 26.4 | Newly, March 2025 / March 2026 | Lazy pipelines over recurrence occurrences | [ws](https://webstatus.dev/features/iterator-methods), [ws](https://webstatus.dev/features/iterator-concat) (primary) |
| Set methods | 122 | 127 | 17 | Newly, June 2024 (widely December 2026) | Tag and filter logic (collection filters, v0.8 AR-3) | [ws](https://webstatus.dev/features/set-methods) (primary) |
| `RegExp.escape()` | 136 | 134 | 18.2 | Newly, May 2025 | Search highlighting in the editor and the calendar search | [ws](https://webstatus.dev/features/regexp-escape) (primary) |
| `Uint8Array` `fromBase64()` / `toHex()` | 140 | 133 | 18.2 | Newly, September 2025 | Asset hashing and data URLs without helper code | [ws](https://webstatus.dev/features/uint8array-base64-hex) (primary) |
| `Math.sumPrecise()` | 147 | 137 | 26.2 | Newly, April 2026 | Cart totals (still integer cents) | [ws](https://webstatus.dev/features/math-sum-precise) (primary) |
| `structuredClone()` | 98 | 94 | 15.4 | Widely | Editor undo snapshots | [ws](https://webstatus.dev/features/structured-clone) (primary) |
| Import maps / multiple import maps | 89 / 133 | 108 / pref | 16.4 / 18.4 | Widely / Limited | An import map must be an inline script, which Urd's CSP forbids; the `/assets/urd/` shells fill the role (ADR-0013) | [ws](https://webstatus.dev/features/import-maps) (primary) |
| `import.meta.resolve()` | 105 | 106 | 16.4 | Widely | Resolve block asset URLs | [bcd](https://github.com/mdn/browser-compat-data/blob/main/javascript/operators/import_meta.json) (primary) |
| JSON modules (`with { type: 'json' }`) | 123 | 138 | 17.2 | Newly, April 2025 | Load schemas without `fetch` | [ws](https://webstatus.dev/features/json-modules) (primary) |
| CSS module scripts (`with { type: 'css' }`) | 123 | 147 | no | Limited | Constructable sheets for editor UI | [ws](https://webstatus.dev/features/css-modules) (primary) |
| Text modules (`with { type: 'text' }`) | 155 | 153 | no | Limited | Load template files | [ws](https://webstatus.dev/features/text-modules) (primary) |
| Top-level await | 89 | 89 | 27 (module loader rewritten) | **Newly, 14 September 2026** | Older Safari had ordering bugs with raw-served modules; fixed in 27 | [ws](https://webstatus.dev/features/top-level-await), [WebKit](https://webkit.org/blog/18227/fixing-top-level-await-in-safari/) (primary) |

#### DOM, editing, media, storage

| Feature | Chrome | Firefox | Safari | Baseline | What it replaces or enables in Urd | Source |
|---|---|---|---|---|---|---|
| Sanitizer API (`Element.setHTML()`, `new Sanitizer()`) | **146** | **148** | no (bug 303808) | Limited | A native layer under `stripActiveContent` and `safeHtmlFragment`; it cannot replace them while Safari lacks it: T72 | [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/Sanitizer.json), [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API) (primary) |
| `setHTMLUnsafe()` / `parseHTMLUnsafe()` | 124 | 128 | 26 | Newly, 15 September 2025 | Declarative Shadow DOM from trusted templates only | [ws](https://webstatus.dev/features/parse-html-unsafe) (primary) |
| Trusted Types | 83 | 148 | 26 | **Newly, 24 February 2026** | A CSP `require-trusted-types-for` policy around Urd's HTML sinks: T66 | [ws](https://webstatus.dev/features/trusted-types) (primary) |
| Navigation API (`navigation.navigate`, `intercept`) | 102 | 147 | 26.2 | **Newly, 13 January 2026** | Editor routing and unsaved-change guards without History API hacks: T65 | [ws](https://webstatus.dev/features/navigation) (primary) |
| `URLPattern` | 95 | 142 | 26 | Newly, 15 September 2025 | Route and slug matching in the engine | [ws](https://webstatus.dev/features/urlpattern) (primary) |
| `scheduler.postTask()` / `scheduler.yield()` | 94 / 129 | 142 / 142 | no | Limited | Break up long editor tasks (fallback `setTimeout`) | [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/Scheduler.json) (primary) |
| `requestIdleCallback()` | 47 | 55 | TP, behind a flag | Limited | Deferred work (fallback `setTimeout`) | [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/Window.json) (primary) |
| `moveBefore()` | 133 | 144 | no | Limited | Reorder blocks in the editor without reloading iframes or videos: T76 | [ws](https://webstatus.dev/features/move-before) (primary) |
| `CloseWatcher` | 126 | 149 | TP | Limited | Escape and Android Back for custom panels | [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/CloseWatcher.json) (primary) |
| `EditContext` | 121 | no | no | Limited | Not viable for an editor that must work everywhere; keep `contenteditable` (T112) | [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/EditContext.json) (primary) |
| `contenteditable="plaintext-only"` | 51 | 136 | 5.1 | Newly, March 2025 | Single-line inline fields: T30 | [ws](https://webstatus.dev/features/contenteditable-plaintextonly) (primary) |
| `Selection.getComposedRanges()` | 137 | 142 | 17 | Newly, August 2025 | Selections across shadow DOM | [ws](https://webstatus.dev/features/composed-ranges) (primary) |
| Custom Highlight API (`::highlight()`) | 105 | 149 per web-features | 17.2 | Newly, March 2026 | Block-search hits without wrapper `<span>`s | [ws](https://webstatus.dev/features/highlight) (primary) |
| `document.caretPositionFromPoint()` | 128 | 20 | 26.2 | Newly, December 2025 | Drop and caret placement | [ws](https://webstatus.dev/features/document-caretpositionfrompoint) (primary) |
| `ResizeObserver` / `IntersectionObserver` | 64 / 58 | 69 / 55 | 13.1 / 12.1 | Widely | In use (entrance, lazy work, measuring) | [ws](https://webstatus.dev/features/intersection-observer) (primary) |
| `content-visibility` / `contentvisibilityautostatechange` | 108 / 108 | 130 / 125 | 26 / 18 | Newly, 15 September 2025 | Used only in the `<details>` transition today; sections below the fold: T42 | [ws](https://webstatus.dev/features/content-visibility), [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/ContentVisibilityAutoStateChangeEvent.json) (primary) |
| `img.decode()` | 64 | 68 | 11.1 | Widely | Swap images without flashes (slideshows) | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode) (primary) |
| WebP / AVIF | 32 / 85 | 65 / 113 | 14 / 16.4 | Widely / Widely (July 2026) | WebP in use (`compressToWebp`); AVIF: T46 | [ws](https://webstatus.dev/features/avif) (primary) |
| **JPEG XL** | **155** (6 October 2026) | **158** (13 October 2026; slipped from 157) | 17 | All 3 engines once Firefox 158 ships (scheduled for 13 October 2026); Interop 2026 investigation | A `<source type="image/jxl">` in `<picture>`: T47 | [chromestatus 155](https://chromestatus.com/release-notes/155), [FF 158](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/158) (primary), [Phoronix](https://www.phoronix.com/news/Firefox-JPEG-XL-2026-Plans) (secondary) |
| Cookie Store API | 87 | 140 | 18.4 (`maxAge` in 27) | Core in all 3; web-features says «limited» | Async consent cookies, if consent is ever needed (0.7.24) | [bcd](https://github.com/mdn/browser-compat-data/blob/main/api/Window.json), [ws](https://webstatus.dev/features/cookie-store) (primary) |
| Web Locks / `BroadcastChannel` | 69 / 54 | 96 / 38 | 15.4 / 15.4 | Widely | Coordinating editor tabs that share the browser's drafts | [ws](https://webstatus.dev/features/web-locks), [ws](https://webstatus.dev/features/broadcast-channel) (primary) |
| Origin private file system | 108 | 111 | 16.4 | Widely | Offline editor drafts | [ws](https://webstatus.dev/features/origin-private-file-system) (primary) |
| File System Access (`showSaveFilePicker`) | 86 | no | no | Limited | Export, Chrome only; fallback `<a download>` | [ws](https://webstatus.dev/features/file-system-access) (primary) |
| `ariaNotify()` | 141 | 150 | 27 | **Newly, 14 September 2026** | Announce «Block moved» without live regions (the calendar and checkout use `aria-live` today): T64 | [ws](https://webstatus.dev/features/arianotify) (primary) |
| Promise-returning scroll methods | 150 | no | no | Limited | `await el.scrollIntoView()` | [ws](https://webstatus.dev/features/scroll-promises) (primary) |
| `CompressionStream` | 80 | 113 (Brotli 147) | 16.4 | Widely | Compress exported site bundles | [ws](https://webstatus.dev/features/compression-streams) (primary) |

#### Other items worth knowing

| Feature | Status | Why it matters to Urd | Source |
|---|---|---|---|
| `scrollend` event | Newly, December 2025 (Safari 26.2) | A carousel «settled» hook without debouncing | [ws](https://webstatus.dev/features/scrollend) (primary) |
| LCP and Event Timing entries | Newly, December 2025 (Safari 26.2) | Core Web Vitals that work in Safari too | [ws](https://webstatus.dev/features/largest-contentful-paint) (primary) |
| Zstandard `Content-Encoding` | Newly, February 2026 | Host configuration for raw assets (Hostinger serves zstd HTML) | [ws](https://webstatus.dev/features/zstd) (primary) |
| `scrollbar-color` | Newly, December 2025 | Themed scrollbars inside blocks | [ws](https://webstatus.dev/features/scrollbar-color) (primary) |
| `text-indent: hanging` / `each-line` | Newly, March 2026 | Lists and poetry in text blocks | [ws](https://webstatus.dev/features/text-indent-hanging) (primary) |
| Scoped custom element registries | Chrome 146, Safari 26.x, Firefox Nightly; Interop 2026 | Third-party embeds inside plugin blocks | [Chrome 146](https://developer.chrome.com/release-notes/146) (primary) |
| `<meta name="text-scale">` | Chrome 146 only | Respect the OS text-size setting | [Chrome 146](https://developer.chrome.com/release-notes/146) (primary) |

### Changes since the earlier watch list

The watch list in BACKLOG (0.7.0) and the support tiers of the earlier map were written in early 2026 and rechecked on 10 August and 23 September 2026. On 11 October 2026:

| Item | Earlier note | Status on 11 October 2026 | Date |
|---|---|---|---|
| `::scroll-marker` / `::scroll-button` | «Chrome 135+, Safari 19+, Firefox behind a flag» | **Still Chrome-only.** There is no Safari 19, and Safari 26.x, 27 and TP have no support; MDN's data shows no Firefox support and it is not on Firefox's experimental-features page. Chrome added `:target-before`/`:target-after` (142), `scroll-target-group` (140) and the `links`/`tabs` marker-group modes (154) | 28 October 2025; 22 September 2026 |
| `appearance: base-select` | Chromium only | **Safari 27 shipped it** (drop-down mode, `<selectedcontent>`, `::picker-icon`, `::checkmark`). Firefox has it behind two prefs since 149 and changed its parser in 153; Chrome added listbox mode in 145. Two engines: the gate is now Firefox stable | 14 September 2026 |
| Native masonry | Flag only, syntax in flux | **Safari 26.4 shipped `display: grid-lanes`**; the syntax was settled on 7 January 2026; Chrome (140+) and Firefox (Nightly) still behind flags | 24 March 2026 |
| `closedby` | Missing in Safari | Still missing in Safari 27 stable; now in Safari TP and part of the Interop 2026 dialogs-and-popovers area | no date |
| Speculation Rules (the router's gate) | Missing in Firefox and Safari | Safari 26.2 has an implementation **behind a pref** (prefetch, `conservative` document rules only, no prerender); Firefox has nothing. Still Chrome-only by default | 12 December 2025 |
| `text-fit` | Chrome 150 only | Unchanged | 30 June 2026 |
| Anchor positioning | «Baseline 2026 (Chrome 125+, Firefox 132+, Safari 18.2+), `@position-try` needs Safari 26+ and Firefox 147+» | **Firefox 147 shipped it** (13 January 2026), so the `position-try-fallbacks` gate in `anchored.js` now passes in all three engines | 13 January 2026 |
| `::details-content` | «Broad, not everywhere» | Baseline since 16 September 2025 | 16 September 2025 |
| `interpolate-size` | «Only the newest» | In Safari TP 254; Firefox has nothing | 8 October 2026 |
| Scroll-driven animations | «Firefox behind a flag» | In Safari 26 (September 2025, threaded since 26.4); Firefox still Nightly only | September 2025 |
| Cross-document view transitions | «Broad, not everywhere» | Still not in Firefox stable | no date |
| `contrast-color()` | Baseline April 2026 | Baseline 10 April 2026; in use for the text on accent surfaces (T90) | 10 April 2026 |
| Invoker commands | not on the list | Baseline 12 December 2025 | 12 December 2025 |
| Sanitizer API | not on the list | Chrome 146 (10 March 2026) and Firefox 148 (24 February 2026) | 10 March 2026 |
| `Temporal` | not on the list | Chrome 144 (13 January 2026); Safari TP only | 13 January 2026 |
| JPEG XL | not on the list | Chrome 155 (6 October 2026), Firefox 158 (scheduled for 13 October 2026), Safari since 17 | 13 October 2026 (scheduled) |

### Ready, gate, watch

**Use directly (long Baseline, no gate):** scroll-snap, `<dialog>` with `showModal()` and `::backdrop`, `position: sticky`, CSS grid, flex `gap`, `clamp()`, `:has()`, `aspect-ratio`, `prefers-reduced-motion`. In use in Urd: scroll-snap (the gallery carousel), `<dialog>` (lightbox, cart drawer, quick view), `:has()` (the scroll lock).

**Ready now (Baseline newly or widely available).**
- **CSS:** `::details-content`, `@starting-style`, `transition-behavior`, `field-sizing`, `text-box`, `sibling-index()`/`sibling-count()`, `shape()`, `contrast-color()`, `light-dark()` including images, `progress()`, `alpha()`, `revert-rule`, relative colour, `@property`, `round()`/`mod()`, `@scope`, nesting, size, style and name-only container queries, `text-wrap: balance`, `zoom` with `currentCSSZoom`, `overflow-anchor`, `scrollbar-gutter`, `overflow: clip`, `font-size-adjust`, `@page` size, `print-color-adjust`, `@media (scripting)`, `prefers-contrast`, `forced-colors`.
- **HTML:** Popover, invoker commands, `dialog.requestClose()`, `:open`, `ToggleEvent.source`, `<details name>`, `<search>`, `inert`, `fetchpriority`, lazy images and iframes, `:user-invalid`, `requestSubmit()`, `autocorrect`.
- **View transitions:** same-document, `view-transition-class`, types.
- **JS:** Navigation API, URLPattern, `setHTMLUnsafe`, Trusted Types, `Intl.DurationFormat`, `Intl.Locale` info, iterator helpers, Set methods, `RegExp.escape`, base64/hex, `Math.sumPrecise`, `structuredClone`, `import.meta.resolve`, JSON modules, top-level await (fixed in Safari 27).
- **Editing:** `plaintext-only`, `getComposedRanges`, Custom Highlights, `caretPositionFromPoint`, `ariaNotify`, `scrollend`, `content-visibility`.
- **Storage and media:** Web Locks, BroadcastChannel, OPFS, CompressionStream, WebP and AVIF.

Shipped in all three engines but with a partial or stale Baseline label, so use with a light check: the anchor positioning core; `hidden="until-found"` and details find-in-page (Safari does not scroll to the match); `sizes="auto"` (a Safari bug with SVG and `object-fit`); Cookie Store; `showPicker()`; JPEG XL from 13 October 2026.

For Urd, the ready list becomes the 0.7.0 sub-item «Baseline 2025-2026 features that can replace engine code», each assessed and built only where it removes code or fixes a bug (ADR-0011): invoker commands (T56), `hidden="until-found"` (T57), `field-sizing` (T58), `text-box` (T59), `sibling-index()` (T60), `shape()` (T61), `light-dark()` images (T62), `@starting-style` (T63), `ariaNotify` (T64), the Navigation API (T65), Trusted Types (T66) and `plaintext-only` (T30). `Intl.Locale` week info is already in use (T92).

**Use behind a gate (two engines).**

| Pair | Features |
|---|---|
| Chrome + Safari | Customizable select; scroll-driven animations; cross-document view transitions with `blocking="render"` and `rel="expect"`; `text-wrap: pretty`; `dynamic-range-limit`; `stretch`; multiple import maps; `initial-letter` (prefixed in Safari) |
| Chrome + Firefox | `closedby`; `popover="hint"`; `CloseWatcher`; Sanitizer `setHTML()`; `Temporal`; `scheduler.yield()`/`postTask()`; `requestIdleCallback`; `moveBefore()`; typed `attr()`; CSS and text module scripts; `overscroll-behavior` on non-scroll containers; style-query range syntax; `@supports at-rule()`; `showPicker()` on `<select>`; `overflow-clip-margin` (partial in Chrome) |
| Safari + Chrome 156 (stable 20 October 2026) | `random()` |

Several Chrome + Firefox features are already in Safari TP and are Interop 2026 targets: `closedby`, `popover="hint"`, `CloseWatcher`, `Temporal`, typed `attr()`.

**Watch (one engine, flags or TP only).**
- **Chrome only:** `::scroll-marker`/`::scroll-button`/`:target-current`, `scroll-target-group`, `scroll-initial-target`, scroll-snap events, `scroll-state()`, `interpolate-size`/`calc-size()` (Safari TP), `if()`, `@function` (Safari TP), `corner-shape` (Firefox and Safari preview builds), `border-shape`, `reading-flow`, `text-fit`, scroll-triggered animations, element-scoped and nested view transitions, `interestfor`, `focusgroup`, lazy `<video>`/`<audio>`, page-margin boxes, `prefers-reduced-transparency`, anchored container queries, scroll promises, `EditContext`, File System Access, Speculation Rules (Safari behind a pref).
- **Safari only:** `display: grid-lanes` (Chrome and Firefox flags), `hanging-punctuation`, `switch`.
- **Not implemented anywhere:** `@mixin`.

**Urd's watch list**, each with its gate (built only when the gate passes, ADR-0011): `::scroll-marker`/`::scroll-button` (T67, Baseline in all three engines), `appearance: base-select` (T68, Firefox stable), the client-side router (T69, built only if Firefox and Safari stable still lack Speculation Rules prefetch and prerender at v1.0), `grid-lanes` for the mosaic view (T70, a second engine), `Temporal` for `ics.js` (T71, Safari stable), the Sanitizer API as a layer under Urd's sanitizer (T72, Safari), `closedby` (T73, Safari stable), `interpolate-size` beyond the FAQ (T74, Firefox and Safari stable), `scroll-state()` for the nav (T75, Firefox and Safari), `moveBefore()` in the editor (T76, Safari) and `text-fit` (T77, a second engine).

### Native techniques

For each building block: the modern native or CSS technique, the old way it replaces, the class of bug it removes, its support today and Urd's use. The core principle for a raw-served engine: **lead with the native element, put CSS enhancements behind `@supports`, and use JavaScript only for what the platform still cannot do declaratively.** For a dependency-free vanilla engine the nasty, unsolvable bugs live in the construction: a carousel, accordion, modal, sticky or parallax built the old way brings traps that native and CSS techniques simply avoid.

#### Carousel

Base: CSS scroll-snap (`scroll-snap-type`, `scroll-snap-align`) gives a dependency-free, compositor-smooth slider that works everywhere. Enhancement: the CSS carousel primitives make real, accessible buttons and markers from the scroller itself, with no markup and no JS ([Chrome: Carousels with CSS](https://developer.chrome.com/blog/carousels-with-css), [MDN ::scroll-marker](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker), primary):

```css
.carousel { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; }
.carousel > li { scroll-snap-align: center; }
@supports selector(::scroll-marker) {
  .carousel { scroll-marker-group: after; }
  .carousel::scroll-button(inline-end) { content: "\2192" / "Next"; }
  .carousel > li::scroll-marker { content: ""; }
  .carousel > li::scroll-marker:target-current { background: var(--accent); }
}
```

Replaces Swiper, Slick or Glide, or an own `translateX()` engine with rAF, pointer listeners and hand-rebuilt dots and ARIA. Removes broken keyboard and screen-reader semantics, jerky snapping, dots that fall out of sync, layout thrash from width measurements in a scroll handler, and bundle weight. Under the hood Elementor moved from Slick to Swiper ([Elementor 2.7](https://developers.elementor.com/elementor-2-7-moving-sliders-from-slick-to-swiper/), [3.26 update](https://developers.elementor.com/elementor-3-26-developers-update/), primary); on 11 October 2026 elementor.com shipped Swiper 8.4.5 at 144 KB ([elementor.com](https://elementor.com/), measured). **Support:** the primitives are Chrome-only. **Urd:** the gallery's carousel view is `.urd-gallery-track` with `scroll-snap-type: x mandatory`; its dots, arrows and slide timer (`setInterval`) are hand-rolled in `blocks/gallery.js` and wait for the primitives (T67).

#### Accordion

Native `<details>`/`<summary>` gives button semantics and keyboard for free; the `name` attribute gives an exclusive (single-open) accordion; `::details-content` animates it, with the size interpolation behind its own gate so a browser without it opens the answer instantly ([Chrome: Styling details](https://developer.chrome.com/blog/styling-details), [MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details), primary):

```html
<details name="faq"><summary>Question 1</summary><p>…</p></details>
<details name="faq"><summary>Question 2</summary><p>…</p></details>
```

```css
@supports (interpolate-size: allow-keywords) {
  .faq { interpolate-size: allow-keywords; }
  .faq details::details-content { block-size: 0; overflow: clip;
    transition: block-size .25s ease, content-visibility .25s allow-discrete; }
  .faq details[open]::details-content { block-size: auto; }
}
```

Replaces a `div` with `aria-expanded` toggled by JS that animates `max-height` towards a guessed number or measures `scrollHeight`. Removes the «height: auto does not animate» hack, `max-height` overshoot, state desync, a missing `aria-expanded`, and a JS-collapsed panel that Ctrl+F cannot open (native `<details>` takes part in find-in-page in all three engines). **Urd:** the FAQ block is built exactly this way (base.css, behind `@supports (interpolate-size: allow-keywords)`, with reduced motion respected) (T83).

#### Tabs

There is no native tabs element, and no pure HTML and CSS combination is fully accessible. Tabs remain the place to implement the ARIA APG pattern with a little JS: `role="tablist"`/`tab`/`tabpanel`, roving `tabindex` (only the active tab has `tabindex="0"`), arrow keys between tabs, inactive panels hidden ([W3C APG: Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), primary). New: hide the inactive panels with `hidden="until-found"` and select the tab on `beforematch`, so find-in-page and `#fragment` links can reveal a panel (all three engines; see [snippet 9](#gated-snippets)). CSS-only tabs (`:checked`, `:target`) do for light, non-critical switches but lack the keyboard and role semantics. `focusgroup` (Chrome 150) will one day give the roving focus natively. **Urd:** no tabs element yet; it is in the v0.8 Element round, stage ER-A ([ELEMENTS.md](ELEMENTS.md)), on T57.

#### Dialog and lightbox

Native `<dialog>` with `showModal()` gives the top layer (no z-index war), a stylable `::backdrop`, a focus trap with focus return, an inert background and Escape to close, all for free. A lightbox is just an image modal; put the scroll-snap gallery inside for previous and next. `closedby="any"` gives declarative light dismiss, and invoker commands open it without a click handler, so no inline `onclick` is needed under a strict CSP ([MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), primary):

```html
<button type="button" commandfor="lb" command="show-modal">Open</button>
<dialog id="lb" closedby="any"><img src="full.jpg" alt="…"></dialog>
```

Replaces a `position: fixed` overlay `div`, a home-made focus trap, a manual `body { overflow: hidden }`, outside-click and Escape listeners and z-index escalation. Removes focus escaping to the background, z-index and stacking wars, scroll leaks and leaked global listeners. **Support:** `<dialog>` everywhere; invoker commands Baseline 12 December 2025; `closedby` missing in Safari stable (TP only), so a four-line fallback closes when the click target is the dialog itself ([snippet 1](#gated-snippets)). **Urd:** the lightbox (`lightbox.js`), the cart drawer and the product quick view are `<dialog>`s; the lightbox closes on a backdrop click in JS and does not set `closedby` (T73); scroll lock is `body:has(dialog:modal)`; invoker commands are T56.

#### Popover and menus

The Popover API: set `popover` on an element and connect a trigger with `popovertarget`. No JS to open and close, the top layer, and light dismiss; `auto` for dropdowns and menus, `manual` for persistent panels, `hint` for tooltips over an open menu ([web.dev: Popover API](https://web.dev/blog/popover-api), primary; [LogRocket: popover vs dialog](https://blog.logrocket.com/comparing-popover-api-dialog-element/), secondary):

```html
<button popovertarget="menu">Menu</button>
<div id="menu" popover><a href="/a">Profile</a><a href="/b">Settings</a></div>
```

Replaces JS dropdown widgets with their own open state, outside-click listener, Escape handling and z-index management. Removes the eternal outside-click trap («the click that opened it closes it at once») and dropdowns clipped by `overflow: hidden`. **Support:** Baseline 27 January 2025; since Chrome 154 light dismiss fires on `click`, not on pointer events. **Urd:** in use for the five floating menus of editor and engine together with the anchoring below (T82); nav submenus stay disclosure buttons ([ADR-0010](../adr/0010-disclosure-navigation.md), never `role="menu"`).

#### Tooltips and anchoring

CSS anchor positioning fixes an element to an anchor and flips it to stay on screen, in pure CSS together with a popover ([web.dev: Anchor positioning](https://web.dev/learn/css/anchor-positioning), primary; [caniuse](https://caniuse.com/css-anchor-positioning), secondary):

```css
.trigger { anchor-name: --btn; }
@supports (position-try-fallbacks: flip-block) {
  .tooltip { position: fixed; position-anchor: --btn; position-area: block-start center;
             position-try-fallbacks: flip-block; }
}
```

Replaces Popper.js or Floating UI, which read `getBoundingClientRect()` on every scroll and resize and write an inline transform every frame. Removes the scroll and resize reflow loop and clipped popovers. **Support:** the core ships in all three engines since Firefox 147 (13 January 2026), and so does `position-try-fallbacks`; use explicit anchor names, since implicit anchoring from the popover's invoker is Chrome-only, and re-test after the initial value of `position-anchor` changed to `normal` (Chrome 151, Firefox 151, Safari 27). **Urd:** the five floating menus (`Dropdown.svelte`, `ColorPicker.svelte`, `GlyphPicker.svelte`, `dropdown.js`, `color-picker.js`) take the native branch only when `anchored.js` finds the Popover API, `anchor-name` AND `position-try-fallbacks`; otherwise the measuring JS branch stands (ADR-0011 decision 2). A tooltip element belongs with `popover="hint"` (Chrome 151, Firefox 153, Safari TP) behind a gate, in ER-A ([ELEMENTS.md](ELEMENTS.md)); `interestfor` hover previews are Chrome-only.

#### Sticky

`position: sticky` with a threshold keeps the element in the flow and pins it while scrolling, with no JS. `scroll-state(stuck)` container queries can restyle a header the moment it sticks (Chrome-only, T75; [Chrome: scroll-state()](https://developer.chrome.com/blog/css-scroll-state-queries), primary). Traps to code around: sticky fails silently if an ancestor between the element and the scroll root has `overflow: hidden|auto|scroll` (use `overflow: clip` to clip only), and it sticks only within its containing block ([Polypane: all the ways position sticky can fail](https://polypane.app/blog/getting-stuck-all-the-ways-position-sticky-can-fail/), secondary). Use `position: fixed` for elements pinned to the viewport, but an ancestor with `transform`, `filter`, `backdrop-filter`, `perspective`, `contain`, `container-type` or `will-change` makes `fixed` relative to that ancestor, a common, subtle bug. **Urd:** pinned blocks use `position: fixed` from `sticky.js` on purpose, since `sticky` can never leave its own container and the «let go» model needs a free hand, and ADR-0018 forbids all seven properties on `.urd-canvas` for this reason ([ADR-0018](../adr/0018-bound-content-width.md)).

#### Layout and responsive

**Rows that grow with their content (the Fluid Engine technique).** A fixed column grid with rows that grow with the content, pure CSS at runtime ([MDN CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout), primary):

```css
.canvas { display: grid; grid-template-columns: repeat(24, 1fr);
          grid-auto-rows: minmax(2.5vw, auto); gap: clamp(8px, 1.5vw, 24px); }
.block { grid-column: 3 / span 8; grid-row: 2 / span 3; }
```

`minmax(min, auto)` reserves a minimum height but lets the row grow instead of overflowing; Squarespace stores blocks as grid coordinates and lets CSS Grid place them, with no JS on resize. It replaces JS layout engines that read `getBoundingClientRect()` and set `position: absolute` in pixels. **Urd:** the mobile row grid is this technique (`minmax(8px, auto)` rows, [ADR-0019](../adr/0019-synced-mobile-model.md)); the desktop canvas stays absolute with a content push ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)).

**Subgrid** (widely available) lets a nested grid inherit its parent's tracks, so card titles, bodies and footers line up without JS «equal height» ([web.dev: subgrid](https://web.dev/articles/css-subgrid), primary); it does not apply while the desktop canvas is absolutely positioned. **Container queries** with `cqi` units style a component by its own container, not the viewport ([MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries), primary); in Urd they belong inside blocks (the gallery's narrow column count), never on the canvas (T107). **`clamp()`** gives fluid type and space without resize JS or stepped media queries. **`:has()`** styles a parent from its state without JS, as in `body:has(dialog:modal) { overflow: hidden }` ([MDN :has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), primary), which is Urd's scroll lock.

**Masonry is one engine away.** Native masonry (`display: grid-lanes`, `flow-tolerance`) shipped in Safari 26.4 and the syntax settled on 7 January 2026, but Chrome and Firefox still have it behind flags ([WebKit: Introducing CSS Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/), primary; [Chrome: masonry update](https://developer.chrome.com/blog/masonry-update), primary). Until a second engine ships it: `columns` only where the visual order may be scrambled, otherwise an ordinary `auto-fill` grid, with native masonry behind `@supports` (T70).

#### Theme without FOUC

Custom properties for the tokens, `@property` to type them so they can animate; `light-dark()`, `color-mix()` and relative colours give tints and shades without a preprocessor; `prefers-color-scheme` with `color-scheme` makes native controls and scrollbars match the theme ([MDN light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark), primary). The point: correct CSS paints the correct colours at FIRST paint, so there is no theme flash without JS. Only a manual override needs a small blocking script that sets an attribute before the body paints.

```css
:root { color-scheme: light dark; --bg: #fff; --bg: light-dark(#fff, #111); }
:root[data-theme="dark"] { color-scheme: dark; --bg: #111; }
```

Rule: put a plain fallback colour BEFORE the `light-dark()` or `oklch()` line, so older engines use the fallback and newer ones override it. **Urd:** `light-dark()` behind `@supports` in base.css and `theme.alt`; the manual override is an external classic `theme-init.js` that only sets `data-urd-theme`, since the CSP has no `unsafe-inline` (T86); `contrast-color()` chooses the text on accent surfaces (T90); `light-dark()` for images (logos per scheme) is T62.

#### Media and performance

Native responsive images, explicit dimensions and native loading hints ([MDN picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture), [web.dev: optimize CLS](https://web.dev/articles/optimize-cls), primary):

```html
<picture>
  <source type="image/avif" srcset="hero-800.avif 800w, hero-1600.avif 1600w" sizes="100vw">
  <source type="image/webp" srcset="hero-800.webp 800w, hero-1600.webp 1600w" sizes="100vw">
  <img src="hero-1600.jpg" width="1600" height="900" fetchpriority="high" decoding="async" alt="…">
</picture>
```

`width`/`height` or `aspect-ratio` reserve the space and kill layout shift. `loading="lazy"` with `decoding="async"` below the fold, and `sizes="auto"` there once `srcset` exists, but never `loading="lazy"` on the main (LCP) image. `content-visibility: auto` skips rendering sections off screen (measure it; a wrong `contain-intrinsic-size` gives a jumping scrollbar). `<picture>` degrades AVIF to WebP to JPEG by itself, and JPEG XL can be added as a first source from 13 October 2026 ([snippet 10](#gated-snippets)). It replaces JS lazy loaders and JS that measured the viewport to choose an image size. **Urd:** every image is lazy, the hero too, with no `width`/`height` or `srcset`; uploads are WebP at up to 1600 px (`compressToWebp` in `imageTools.js`); `aspect-ratio` is used for gallery tiles; `content-visibility` only in the `<details>` transition (T42, T44 to T47).

#### Motion

**Scroll-driven animations** run on the compositor thread with about 0 ms of scripting, instead of a rAF or scroll listener ([MDN scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), [Chrome: performant parallax](https://developer.chrome.com/blog/performant-parallaxing), primary):

```css
@keyframes fade-in { from { opacity: 0; translate: 0 2rem; } }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal { animation: fade-in linear both; animation-timeline: view();
              animation-range: entry 0% cover 30%; }
  }
}
```

Firefox has them in Nightly only, Safari since 26, so gate with `@supports`; the fallback is the element in its end state, never hidden. **`@starting-style` with `transition-behavior: allow-discrete`** animates into and out of `display: none` and the top layer in pure CSS; closing out of the top layer also needs `overlay` in the transition, and Safari lacks `overlay` with `allow-discrete`, so a top-layer close snaps there (earlier maps, unverified). **View Transitions**, above all cross-document (`@view-transition { navigation: auto }`, no JS), suit a static multi-page site ([MDN View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), primary). **`scroll-behavior: smooth`** for anchor links, and **`prefers-reduced-motion`** as the guard over all of it. **Observers are still right for LOGIC, not animation:** IntersectionObserver for impressions, the active section, lazy instantiation and video play/pause; ResizeObserver for canvas sizes and JS charts. **Urd:** parallax runs on `animation-timeline: view()` behind `@supports` with the rAF variant as the fallback (T85); one-off entrance and stagger stay on IntersectionObserver by decision, since a `view()` entrance reverses on scrolling up (ADR-0011 decision 4, T108); cross-document View Transitions with the transition names applied only during the transition and a plain cut under reduced motion (T87); gradient pan and orbit on `transform` (T89); `@starting-style` is not used yet (T63).

#### How the builders construct

- **Squarespace Fluid Engine:** grid coordinates, no JS repositioning ([Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine), primary).
- **Wix Studio:** CSS grid plus docking against the parent's edges ([advanced CSS grid](https://support.wix.com/en/article/studio-editor-working-with-an-advanced-css-grid), [docking](https://support.wix.com/en/article/studio-editor-working-with-docking-margins-and-padding), primary).
- **Bricks against Elementor:** about 9 nodes and 1 wrapper against 23 and 4 for the same hero; div soup costs LCP and memory ([inspiredmonks](https://inspiredmonks.com/bricks-builder-vs-elementor-performance-2026/), secondary; [Lighthouse: excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size), primary).
- **Framer Motion:** detects `ScrollTimeline` and hands the animation to the compositor, uses a pooled IntersectionObserver, and animates only `transform` and `opacity` ([Motion: scroll animations](https://motion.dev/docs/react-scroll-animations), primary).
- **Shopify Horizon:** vanilla custom elements with declarative event delegation and per-block module scripts ([Part 3](#shopify-horizon-and-twenty-twenty-five-read-from-source), code).
- **Webstudio:** CSS-only view and scroll timelines inside `prefers-reduced-motion: no-preference` ([webstudio.is](https://webstudio.is/), measured).
- **Rich text:** Ghost (Lexical), ProseMirror and Slate keep a document model as the truth ([Rich text](#rich-text)).

### Gated snippets

Ten snippets written the Urd way: the native element first, the enhancement gated, and a usable end state if nothing runs.

**1. Dialogs: invoker commands plus `closedby`, with a JS path only where needed.**

```html
<button type="button" commandfor="u-cart" command="show-modal">Cart</button>
<dialog id="u-cart" closedby="any" aria-labelledby="u-cart-h">
  <h2 id="u-cart-h">Cart</h2> …
  <button type="button" commandfor="u-cart" command="close">Close</button>
</dialog>
```
```js
// Native in Chrome 135, Firefox 144 and Safari 26.2; closedby is missing in Safari stable.
if (!('command' in HTMLButtonElement.prototype)) {
  document.addEventListener('click', (e) => {
    const b = e.target.closest('button[commandfor]');
    const t = b && document.getElementById(b.getAttribute('commandfor'));
    if (!t) return;
    const run = { 'show-modal': () => t.showModal(), 'close': () => t.close(),
      'request-close': () => t.requestClose(), 'toggle-popover': () => t.togglePopover(),
      'show-popover': () => t.showPopover(), 'hide-popover': () => t.hidePopover() };
    run[b.getAttribute('command')]?.();
  });
}
if (!('closedBy' in HTMLDialogElement.prototype)) {
  document.addEventListener('click', (e) => {
    const d = e.target;                       // a click on ::backdrop targets the dialog itself
    if (!(d instanceof HTMLDialogElement) || !d.open || d.getAttribute('closedby') !== 'any') return;
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
      d.requestClose ? d.requestClose() : d.close();   // requestClose: Baseline May 2025, fires 'cancel'
  });
}
```

**2. Customizable select (Chrome and Safari 27); the end state is the native select.**

```html
<select class="u-select" name="size">
  <button><selectedcontent></selectedcontent></button>
  <option value="s"><span class="u-swatch" aria-hidden="true"></span>Small</option>
  <option value="m"><span class="u-swatch" aria-hidden="true"></span>Medium</option>
</select>
```
```css
@supports (appearance: base-select) {
  .u-select, .u-select::picker(select) { appearance: base-select; }
  .u-select::picker(select) { border: 1px solid var(--u-line); border-radius: var(--u-radius); padding: .25rem; }
  .u-select option:checked { font-weight: 600; }
  .u-select::picker-icon { transition: rotate .2s; }
  .u-select:open::picker-icon { rotate: .5turn; }
}
```
Keep the visible text inside each `<option>` meaningful: older parsers drop the extra markup (Firefox kept only the text until 153). In Urd the themed UI rule still forbids a native `<select>` in editing UI until the gate passes in Firefox (T68).

**3. Anchor positioning: the gate now passes in all three engines.**

```css
.u-menu[popover] { margin: 0; }                      /* end state: JS places it */
@supports (position-try-fallbacks: flip-block) {
  .u-menu-trigger { anchor-name: var(--u-anchor); }  /* the engine writes a unique --u-anchor: --m12 */
  .u-menu[popover] {
    position-anchor: var(--u-anchor);
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    min-inline-size: anchor-size(inline);
  }
}
```
```js
if (!CSS.supports('position-try-fallbacks', 'flip-block')) placeWithJS(menu, trigger);
```
Use explicit anchor names (implicit anchoring from the invoker is Chrome-only per web-features), and re-test after the `position-anchor: normal` change.

**4. Sanitizer: a native layer under Urd's own sanitizer.**

```js
// Chrome 146 and Firefox 148; Safari keeps the existing path.
const ALLOW = { elements: ['p','br','strong','b','em','i','u','a','ul','ol','li','blockquote'],
                attributes: ['href','title','lang','dir'] };
let native = null;
if (typeof Element.prototype.setHTML === 'function' && typeof Sanitizer === 'function') {
  try { native = new Sanitizer(ALLOW); } catch { native = null; }
}
export function renderRichText(el, html) {
  if (native) { el.setHTML(html, { sanitizer: native }); return; }  // XSS-unsafe nodes go even if allowed
  const t = document.createElement('template');
  t.innerHTML = html;                 // inert: nothing in a template loads or runs
  stripActiveContent(t.content);      // the existing path (sanitize.js)
  el.replaceChildren(t.content);
}
```
Keep Urd's own sanitizer canonical when content is saved, and test both paths against the same allow-list, which T27 makes one shared schema. The browser's default configuration also strips `data-*` attributes and comments (T72).

**5. Temporal for recurring events, plus the week start.**

```js
const T = globalThis.Temporal;                       // Chrome 144, Firefox 139; Safari TP
export function stepOccurrences(dtstart, tzid, rule, n) {
  if (!T) return null;                               // the caller keeps the Date-based path in ics.js
  const unit = { DAILY: 'days', WEEKLY: 'weeks', MONTHLY: 'months', YEARLY: 'years' }[rule.freq];
  const out = [];
  for (let z = T.PlainDateTime.from(dtstart).toZonedDateTime(tzid); out.length < n;
       z = z.add({ [unit]: rule.interval ?? 1 })) out.push(z);   // wall-clock time stays right across DST
  return out;
}
const loc = new Intl.Locale(document.documentElement.lang || navigator.language);
const firstDay = (loc.getWeekInfo?.() ?? loc.weekInfo)?.firstDay ?? 1;   // Baseline July 2026
```
BYDAY, BYSETPOS and the RFC 5545 «skip invalid dates» rule still need Urd's own logic: Temporal's `add()` clamps the day of month (31 January plus one month is 28 February), while RFC 5545 skips months without that day (T71). The week-start lines are what `calendar-format.js:32` already does (T92).

**6. Scroll-driven reveal (Chrome and Safari), with IntersectionObserver as the fallback.**

```css
@keyframes u-reveal { from { opacity: 0; translate: 0 2rem; } }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .u-reveal { animation: u-reveal linear both; animation-timeline: view();
                animation-range: entry 0% entry 60%; }
  }
}
```
```js
if (!CSS.supports('animation-timeline: view()')) initRevealObserver();  // the IntersectionObserver path
```
If neither path runs, the element is simply visible. For Urd this fits parallax and a separately labelled scrubbed entrance only; the default entrance stays on IntersectionObserver (T108).

**7. Carousel markers and buttons (Chrome only); otherwise Urd's JS controls.**

```css
.u-carousel { overflow-x: auto; scroll-snap-type: x mandatory; }
@supports selector(::scroll-marker) {
  .u-carousel { scroll-marker-group: after; }
  .u-carousel > .u-slide::scroll-marker { content: ""; inline-size: .6rem; aspect-ratio: 1;
    border-radius: 50%; background: currentColor; opacity: .4; }
  .u-carousel > .u-slide::scroll-marker:target-current { opacity: 1; }
  .u-carousel::scroll-button(inline-start) { content: "‹" / "Previous slide"; }
  .u-carousel::scroll-button(inline-end)   { content: "›" / "Next slide"; }
}
```
```js
if (!CSS.supports('selector(::scroll-marker)')) mountCarouselControls(el);   // listen for 'scrollend'
```

**8. A sticky header's «stuck» state (Chrome only), with a sentinel fallback.**

```css
.u-header { position: sticky; inset-block-start: 0; }
.u-header.is-stuck > .u-header__bar { background: var(--u-surface); box-shadow: 0 1px 0 var(--u-line); }
@supports (container-type: scroll-state) {
  .u-header { container-type: scroll-state; }        /* the header is itself a block */
  @container scroll-state(stuck: top) {
    .u-header > .u-header__bar { background: var(--u-surface); box-shadow: 0 1px 0 var(--u-line); }
  }
}
```
```js
if (!CSS.supports('container-type: scroll-state')) observeStuck(header);  // an IntersectionObserver sentinel toggles .is-stuck
```
In Urd `container-type` must never go on `.urd-canvas` or on a block with sticky (ADR-0018); the nav header is outside the canvas (T75).

**9. Tabs whose panels find-in-page can reveal (all three engines).**

```html
<section id="t2" role="tabpanel" aria-labelledby="tab2" hidden="until-found">…</section>
```
```js
for (const p of root.querySelectorAll('[role=tabpanel]'))
  p.addEventListener('beforematch', () => selectTab(root, p.id));   // find-in-page or #fragment
// selectTab(): set the other panels back with setAttribute('hidden', 'until-found')
```
Where `until-found` is not supported the attribute behaves as plain `hidden`, so the result is classic tabs (T57).

**10. The ready-now batch (Baseline 2025-2026); each line has an end-state fallback.**

```css
textarea, .u-grow { field-sizing: content; min-block-size: 3lh; max-block-size: 12lh; }  /* June 2026 */
.u-btn, .u-badge, h1, h2 { text-box: trim-both cap alphabetic; }                          /* August 2026 */
.u-logo { background-image: url(logo-dark-ink.svg);
          background-image: light-dark(url(logo-dark-ink.svg), url(logo-light-ink.svg)); } /* September 2026 */
.u-stagger > * { transition-delay: 0s; transition-delay: calc((sibling-index() - 1) * 60ms); } /* August 2026 */
.u-hero h1 { font-size: 2.5rem; font-size: calc(2rem + progress(100cqi, 20rem, 80rem) * 2rem); } /* September 2026 */
```
```html
<picture>
  <source type="image/jxl"  srcset="hero-800.jxl 800w, hero-1600.jxl 1600w">   <!-- all 3 engines from 13 October 2026 -->
  <source type="image/avif" srcset="hero-800.avif 800w, hero-1600.avif 1600w">
  <img src="hero-1600.webp" srcset="hero-800.webp 800w, hero-1600.webp 1600w"
       sizes="auto" loading="lazy" width="1600" height="900" alt="">
</picture>
```
(T58, T59, T62, T60, T46, T47; `sizes="auto"` belongs on lazy images only, so the first image of a page takes `loading="eager"` and `fetchpriority="high"` instead, T44.)

Two engine-side notes. For block reordering in the editor, `try { parent.moveBefore(node, ref); } catch { parent.insertBefore(node, ref); }` keeps iframe and video state in Chrome and Firefox (T76). For cross-document view transitions, `<link rel="expect" href="#main" blocking="render">` is honoured in Chrome and Safari and ignored by Firefox (T36).

### Old way, bug, modern fix

The «Urd» column: «Has» = already coded; «To code» = worth coding or moving, with its T-ID.

| Old way | Bug it gives | Modern fix | Urd |
|---|---|---|---|
| Scroll and resize listeners that do layout; non-passive touch and wheel listeners | Jank, blocked scrolling, hundreds of reflows a second | `{passive: true}`; IntersectionObserver and ResizeObserver; scroll-driven CSS | Has (partial): passive listeners, observers and scroll-driven parallax; `sticky.js` keeps a passive scroll listener on purpose; the editor's toolbars reposition on capture-phase scroll listeners (`preview-edit.js:2250`, `3094`), to code (T7) |
| Absolute positioning and escalating z-index for overlays | z-index wars; overlays trapped in a stacking context | Grid and flex for layout; the top layer through `<dialog>` and Popover | Has (T81, T82) |
| A re-render that tears down `innerHTML` and re-attaches listeners | Stacked listeners, teleporting elements, lost focus and scroll | Reconciliation with stable ids; AbortController; report only the height | Has (partial); finer patches to code (T4) |
| Native `<select>` in themed UI | Unreadable OS chrome, broken dark theme | Popover with anchoring, or `appearance: base-select` | Has (Popover and anchoring); `base-select` on the watch list (T68) |
| `:hover`/`mouseover` for interactive UI | Stuck hover on touch and hybrid devices | `@media (hover: hover)` and `pointerType === 'mouse'` | Has |
| `crypto.randomUUID()` for ids | `undefined` or a throw on insecure origins | `crypto.getRandomValues()` | Has |
| Theme and size set by JS after load; images without dimensions | Theme flash; layout shift | A blocking theme script before paint; `color-scheme`; `aspect-ratio`; `width`/`height` | Has (partial): the theme (T86) and `aspect-ratio` on gallery tiles; `width`/`height` and `srcset` to code (T45, T46) |
| `postMessage` of a proxy or reactive state | DataCloneError | A snapshot to plain data before sending | Has |
| A message listener that trusts the origin alone | Any same-origin window, a plugin included, can drive the receiver | Check `event.source` as well; a per-session token | To code (T1, T2) |
| Div soup (many wrappers, generated classes) | Large DOM, poor LCP and memory | Minimal-wrapper markup and per-page conditional asset loading | Has (partial): minimal wrappers; per-page module lists to code at baking (T34) |
| Preloading every module, or many images at high priority, on every page | Competing downloads; no Early Hints | Per-page module lists, a short `Link` header, one high-priority image | To code (T34, T41, T44) |
| Animating `top`/`left`/`width`/`background-position` | Repaint jank | Animate only `transform` and `opacity` | Has (T89) |
| Content rendered invisible until JS runs (`opacity: 0`, then a reveal) | Content hidden when JS is slow or fails; a late first paint | The hidden state only under a class the engine adds; `@media (scripting)` | To code at baking (T37) |
| Every image lazy, the hero too | A late main image (LCP) | `loading="eager"` and `fetchpriority="high"` on the first image; lazy below the fold | To code (T44) |
| Inline event handlers (`onclick`) and inline scripts | A CSP that needs `unsafe-inline` | Declarative delegation; invoker commands; rule files sent as headers | Has (no inline handlers; Speculation Rules as a header, T91); delegation and invoker commands to code (T35, T56) |
| `max-height` accordions toggled by JS | Overshoot, desync, invisible to find-in-page | `<details name>` and `::details-content` | Has (T83) |
| JS-placed tooltips and menus (Popper) | A reflow loop on every scroll | Anchor positioning | Has (T82) |
| JS autosize for textareas (`scrollHeight` reads) | Jumps and forced layout | `field-sizing: content` | To code (T58; the form block's textarea has no autosize today) |
| Snapshot undo that clears redo on a selection change and records no-ops | Lost redo steps, empty steps, a lost caret | Selection in each entry; redo kept on selection-only changes; no-ops dropped; coalescing | To code (T15 to T18) |
| Raw contenteditable as the truth | Inconsistent DOM, selection, paste and undo | A document model as the truth, the DOM derived | To code (partial): sanitised markup stays the stored form, with one schema for paste and render (T27, T28); a document-model editor is not taken (T109) |

Sources for the table: [Lighthouse: passive listeners](https://developer.chrome.com/docs/lighthouse/best-practices/uses-passive-event-listeners) (primary), [AbortController for listeners](https://css-tricks.com/using-abortcontroller-as-an-alternative-for-removing-event-listeners/) (secondary), [MDN crypto.randomUUID (secure contexts only)](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) (primary), [MDN customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) (primary), [Lighthouse: excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size) (primary), [CKEditor: ContentEditable](https://ckeditor.com/blog/ContentEditable-The-Good-the-Bad-and-the-Ugly/) (secondary); the rest are in the sections above.

### Not ready, or deliberately not taken

**Not ready** (always gated with `@supports` or a feature check, never assumed):
- **`::scroll-marker` / `::scroll-button`:** Chrome only (T67).
- **`appearance: base-select`:** Chrome and Safari 27; the gate is Firefox stable (T68).
- **Speculation Rules in Firefox and Safari:** Safari behind a pref, Firefox nothing; the client-side router waits for them (T69).
- **Native masonry (`grid-lanes`):** Safari 26.4 only (T70).
- **`Temporal` and the Sanitizer API:** Chrome and Firefox, not Safari (T71, T72).
- **`closedby` and `interpolate-size`:** gated; `closedby` is missing in Safari stable, `interpolate-size` in Firefox and Safari stable (Safari Technology Preview 254 only) (T73, T74). `position-try-fallbacks`, the third item of the earlier list, now passes in all three engines and is in use behind its gate.
- **`scroll-state()`, `text-fit`, `moveBefore()`:** one or two engines (T75, T77, T76).
- **`EditContext`:** Chrome only; not viable for an editor that must work everywhere (T112).
- **`@mixin`/`@apply`:** implemented nowhere.

**Deliberately not taken** (reasons in [Not taken](#not-taken)):
- **An external AI service as a core dependency** (T105): against dependency-free and static. The rejection concerns the CORE DEPENDENCY, not AI as such: [ADR-0017](../adr/0017-ai-via-local-mcp-server.md) chooses a local MCP server that calls nothing, stores no keys and is not part of the built site, driven by the site owner's own agent client. A prompt-to-site wizard is not planned.
- **Unbound free positioning** (classic Wix) (T101): responsively fragile. Urd's canvas is absolute positioning, but BOUND: full-width section backgrounds with the content in a set content width ([ADR-0018](../adr/0018-bound-content-width.md)), a content push that moves the blocks below a block that grows, and blocks that shrink one by one to a smallest scale below the design width ([ADR-0024](../adr/0024-content-push-on-the-desktop-canvas.md)), and the row grid on mobile ([ADR-0019](../adr/0019-synced-mobile-model.md)).
- **Class-based cascade styling as the core** (Webflow, Bricks) (T102): a stylesheet-database abstraction against «raw files, no build».
- **Heavy marketplace runtimes** (the Framer and Elementor ecosystems) (T104): Urd's plugin model with CSP opt-in is the way ([ADR-0006](../adr/0006-plugin-csp-needs-model.md)).
- **Container queries on the canvas** (T107): they create a containing block for `position: fixed`; inside blocks only.

### Where the sources disagree

- **Anchor positioning.** web.dev called the core Baseline newly available in January 2026 (Firefox 147). webstatus and the web-features explorer now show «limited», listing only Safari 27, because 2026 sub-features were added to the definition (`position-anchor: normal`, `anchor-valid`/`anchor-visible`); the core properties ship in all three engines ([web-features explorer](https://web-platform-dx.github.io/web-features-explorer/features/anchor-positioning/), primary).
- **`text-box`.** webstatus shows no Firefox support; the Firefox 154 release notes and web.dev (August 2026) show it shipped and Baseline on 18 August 2026.
- **`sizes="auto"`.** webstatus is missing Safari; the Safari 27 release notes and MDN's data list it, with a partial flag.
- **`@scope`.** web.dev declared it Baseline in December 2025; web-features now dates it 24 March 2026, keyed to a Safari 26.4 sub-feature.
- **`popover="hint"`.** MDN's data says Chrome 151 and Firefox 153; the release notes say Chrome 133/150 and Firefox 149. The later versions match the revised spec behaviour.
- **Lazy `<video>`/`<audio>`.** web.dev's monthly post and the Chrome 148 release notes say Chrome 148; webstatus says 150.
- **`contrast-color()` in Firefox.** 146 per the Firefox 146 release notes and web.dev's April 2026 table; webstatus's data appeared to show 137.
- **JPEG XL in Firefox.** Planned for 157, slipped to 158 (13 October 2026).
- **Cookie Store and `hidden="until-found"`.** All three engines ship the core API, but web-features keeps them «limited» because of sub-features or partial support.
- **Method.** The webstatus values came through an API extraction step and the important ones were cross-checked against MDN's data and release notes. Live Interop 2026 per-browser scores could not be read, since the dashboard needs JavaScript.

---

## Part 5. Publishing and deploy

How the git-backed builders publish, and what fits Urd's model: the site owner publishes from `/admin`, which commits through GitHub OAuth and Pages Functions ([ADR-0003](../adr/0003-publishing-via-github-oauth-and-pages-functions.md)); drafts across pages are kept in the browser, a conflict warning guards against a newer published version, and the publish history can undo the last publish.

### PR per draft (Decap)

Decap can run an editorial workflow where every unpublished entry becomes a **pull request**: draft, review, approval; publish is a merge ([Decap: editorial workflows](https://decapcms.org/docs/editorial-workflows/), primary). In code it uses branches with `createPR`/`mergePR` and keeps its metadata under `refs/meta/_decap_cms` ([`backend-github/src/API.ts`](https://github.com/decaporg/decap-cms/blob/main/packages/decap-cms-backend-github/src/API.ts), code). The hosted builders charge for the same: Framer 3.0 has git-style branches where agents work on isolated copies and nothing goes live until a merge, a Pro feature ([Framer: branches](https://www.framer.com/help/articles/how-to-use-branches-in-framer/), [Framer pricing](https://www.framer.com/pricing), primary), and Webflow's page branching, design approvals and branch staging are Enterprise-only ([Webflow help](https://help.webflow.com/hc/en-us/articles/33961355506195), primary).

**For Urd:** it lies naturally on top of the GitHub OAuth publishing: a draft as a branch, publish as a merge, gives review and approval almost for free (T79).

### A preview URL per draft (Decap and Cloudflare Pages)

Decap fetches deploy-preview URLs for unmerged changes through the host's commit statuses ([Decap: deploy preview links](https://decapcms.org/docs/deploy-preview-links/), primary), and Cloudflare Pages makes a preview deployment per branch. **For Urd:** combined with PR per draft, every draft gets a live preview link posted back to the PR (T79).

### Open authoring (Decap)

Outside contributors edit through a fork and a PR, with no write access to the repo ([Decap: open authoring](https://decapcms.org/docs/open-authoring/), primary). **For Urd:** safe editing by several contributors on a static git site, which supports the v1.0 goal that an association can run its site without a developer (T79).

### Git as the sync backbone (Publii)

Publii is the closest philosophical relative: a WordPress-familiar interface that produces static output. Its git sync mode pulls content from the repo, lets local changes override, and commits and pushes ([Publii 0.44](https://getpublii.com/blog/release-044.html), [Publii docs](https://getpublii.com/docs/), primary). **For Urd:** study its conflict and override semantics as a model for git as the database and Urd's conflict guard.

### Optimistic commits and conflicts (Keystatic, Decap, Pages CMS)

- **Keystatic** (code): commits with GraphQL `createCommitOnBranch({expectedHeadOid, fileChanges: {additions, deletions}})`. On `STALE_DATA` it fetches the new head, rebuilds the tree and compares a key over only that entry's directories; if they match it retries against the new head, otherwise it shows «This entry has been updated since it was opened. Create a new branch to save changes.» ([`updating.tsx`](https://github.com/Thinkmill/keystatic/blob/main/packages/keystatic/src/app/updating.tsx), code).
- **Decap** (code): the Git Data API, blobs to trees to commits to `patchRef` ([`API.ts`](https://github.com/decaporg/decap-cms/blob/main/packages/decap-cms-backend-github/src/API.ts), code).
- **Pages CMS** (code): the save route builds a zod schema from the config and sanitises the object; when merging is enabled and a `sha` is present, it merges with the current file so keys the editor does not know survive ([save route](https://github.com/pages-cms/pages-cms/blob/main/app/api/%5Bowner%5D/%5Brepo%5D/%5Bbranch%5D/files/%5Bpath%5D/route.ts), code).

**For Urd:** optimistic commits with `expectedHeadOid`, retried automatically when only other files changed, and a clear message or a branch when the same file changed (T19). Pages CMS's merge shows why the per-file check matters once agents (the MCP write tools, [ADR-0017](../adr/0017-ai-via-local-mcp-server.md)) or hand edits change files between load and publish.

### Publish only what you wrote (Silex)

Silex makes «one commit per save on one branch» through embedded libgit2, with no git process, and `tag()` marks publications ([`history.rs`](https://github.com/silexlabs/Silex/blob/main/server-rust/src/history.rs), code). Its publisher deletes only stale pages that an earlier publication wrote; files it never wrote are left alone ([`publish.rs`](https://github.com/silexlabs/Silex/blob/main/server-rust/src/publish.rs), code). **For Urd:** when publishing starts writing generated files (baked pages in v0.8, `_redirects` in 0.7.23 under [ADR-0015](../adr/0015-redirects-ownership.md)), it removes only files an earlier publish wrote (T80). The same rule describes the fix for «undo the last publish» reverting an Urd update (a v0.9 hardening item in [BACKLOG](../BACKLOG.md)): an undo restores only what the publish wrote.

### Agents write to drafts and branches

The field's answer to AI agents is to keep them off the live site: Framer 3.0's external agents connect over MCP and land their changes on auto-created branches ([creativeainews](https://www.creativeainews.com/articles/framer-3-agents-explained-2026/), secondary), WordPress.com's MCP write access works on drafts by default with an activity log ([TechCrunch](https://www.techcrunch.com/2026/03/20/wordpress-com-now-lets-ai-agents-write-and-publish-posts-and-more/), secondary), and Elementor's agent is reported to save its output as drafts ([theplusaddons](https://theplusaddons.com/blog/what-is-the-elementor-mcp/), secondary, unverified). For Urd's local MCP server the same holds by design: it writes files and does no git operations, so the site owner reviews and publishes what the agent wrote ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md) decision 2); the feature side is in [FEATURES.md](FEATURES.md) C106.

### The strategic lesson: no hosted service (Astro Studio)

Astro Studio, a hosted database launched in early 2024, was shut down: no new databases after 1 October 2024, existing ones offline after 1 March 2025. The reason was the business model, not the technology ([Goodbye Studio](https://astro.build/blog/goodbye-astro-studio/), primary). **For Urd:** this confirms the whole thesis. Git as the database, static output and Cloudflare Pages remove exactly the cost centre that brought Studio down. Say it out loud: «nothing to shut down; your repo is your site» (T100).

---

## Part 6. What to take

Every technique and code recommendation, with its T-ID, ordered by area in the order of the parts above. Status words and backlog places as in [README.md](README.md); the backlog itself is [BACKLOG.md](../BACKLOG.md). LAERDOMMER 5.1-5.11 were ranked by fit times value over effort as of 27 July 2026.

### Open

| ID | What | Who does it (with source) | Fit for Urd | Status |
|---|---|---|---|---|
| T1 | Check `event.source === window.parent` beside the origin check in the preview's message listener (`urd.js:264`) | Tina ([`bridge/src/config.ts`](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/bridge/src/config.ts), code); Urd's own editor side (`previewBridge.js:73`) | Very high: one line, closes a same-origin plugin hole | Taken: Bugs |
| T2 | A per-session bridge token, with `postMessage` captured before plugin code runs | Webstudio ([`pubsub/create.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/pubsub/create.ts), code) | Medium: plugins run on the editor's origin | Watch: weighed in v0.9 hardening once T1 is in |
| T3 | Handshake (syn, syn-ack, ack at 500 ms) and a 1 s heartbeat, to notice a reloaded or crashed preview and resend the draft | Sanity Comlink ([`constants.ts`](https://github.com/sanity-io/comlink/blob/main/packages/comlink/src/constants.ts), code) | Medium | Watch: a preview that loses the draft after a reload |
| T4 | Finer patch protocol: patches for one block or attribute instead of a section re-render; path patches with minimal copying so the iframe diffs by identity; inverse patches so undo re-renders only the touched section | Builder.io ([`apply-patch-with-mutation.ts`](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/functions/apply-patch-with-mutation.ts), code; [How Builder works](https://www.builder.io/c/docs/how-builder-works-technical), primary); Webstudio `computeStylesDiff` ([`styles.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/shared/styles.ts), code) | High, medium effort: already Urd's model, felt most on large pages | Taken: v0.8 patch protocol |
| T5 | Batch all incoming bridge messages into one animation frame | Webstudio ([`raf-queue.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/pubsub/raf-queue.ts), code) | High, low effort | Taken: v0.8 patch protocol |
| T6 | Ephemeral `var(--x, value)` so sliders and colour pickers preview by setting one custom property, with no section re-render | Webstudio ([`styles.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/shared/styles.ts), code) | High | Taken: v0.8 patch protocol |
| T7 | ResizeObserver plus a parent MutationObserver on the selected block, re-measured only on a change above 0.5 px, instead of the capture-phase scroll repositioning (`preview-edit.js:2250`, `3094`) | Webstudio ([`selected-instance-effects.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/selected-instance-effects.ts), code); Puck ([`DraggableComponent`](https://github.com/puckeditor/puck/blob/main/packages/core/components/DraggableComponent/index.tsx), code) | High | Taken: v0.8 patch protocol |
| T8 | CSS-only hover and selection outlines (`::after` outline, transparent fallback for forced colours); IntersectionObserver so only visible blocks are tracked; anchor positioning for the floating toolbar | Gutenberg ([`content.scss`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/block-list/content.scss), code); Tina ([`quick-edit-css.ts`](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/bridge/src/quick-edit-css.ts), code); Sanity ([`controller.ts`](https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/src/controller.ts), [`cssAnchorPositioning.ts`](https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/src/ui/cssAnchorPositioning.ts), code) | Medium-high | Watch: weighed with T7 in the v0.8 patch protocol |
| T9 | A snap threshold of 8 px divided by the preview scale, with Ctrl/Cmd toggling snapping for the current drag | Excalidraw ([`snapping.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/snapping.ts), code); tldraw ([`SnapManager.ts`](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/SnapManager.ts), code) | High: absolute frames are free-canvas territory | Delivered: 0.7.26.3 (`snapTolerance` in snap-model.js) |
| T10 | Equal-gap snapping between frames | tldraw ([`BoundsSnaps.ts`](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/BoundsSnaps.ts), code) | High | Delivered: 0.7.26.3 (`gapSnap` in snap-model.js) |
| T11 | The nudge convention: 1 px per arrow key and 5 px with Shift (Excalidraw), against Urd's grid step and 1 px with Shift | Excalidraw ([`constants.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/common/src/constants.ts), code) | Medium: to be weighed | Taken: 0.7.10 (the nudge convention weighed) |
| T12 | A keyboard alternative to drag (Alt+Arrow moves), announced to screen readers | Gutenberg's keyboard-first editor ([`navigable-toolbar`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/navigable-toolbar/index.jsx), code); Excalidraw nudges ([`constants.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/common/src/constants.ts), code) | High for accessibility | Taken: 0.7.11 Accessibility round |
| T13 | «Always a valid drop target» with about 5 px edge detection and a placement line in the mobile row grid; midpoint before/after for section reorder | Webstudio ([dnd README](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/primitives/dnd/README.md), code); Craft.js ([`findPosition.ts`](https://github.com/prevwong/craft.js/blob/main/packages/core/src/events/findPosition.ts), code) | Medium-high | Taken: 0.7.10 (with the clearer drop target in [ELEMENTS.md](ELEMENTS.md)) |
| T14 | A zoomed-out overview for long drags and for moving sections around | Sanity minimap ([`ui/`](https://github.com/sanity-io/visual-editing/tree/main/packages/visual-editing/src/ui), code); Gutenberg zoom-out ([PR #58202](https://github.com/WordPress/gutenberg/pull/58202), code) | Medium | Taken: 0.7.10 |
| T15 | Selection and caret stored with every undo entry and restored on undo | Gutenberg ([`editor/src/store/actions.js`](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/store/actions.js), code); Plasmic ([`undo-log.ts`](https://github.com/plasmicapp/plasmic/blob/master/platform/wab/src/wab/client/undo-log.ts), code) | Very high | Taken: 0.7.10 (undo quality) |
| T16 | Typing, slider and drag changes coalesced into one entry | Craft.js ([`History.ts`](https://github.com/prevwong/craft.js/blob/main/packages/utils/src/History.ts), code); Puck ([`history.ts`](https://github.com/puckeditor/puck/blob/main/packages/core/store/slices/history.ts), code) | Very high | Taken: 0.7.10 (undo quality) |
| T17 | Redo kept on selection-only changes; no-op entries dropped | Excalidraw ([`history.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/history.ts), code); Gutenberg ([`undo-manager`](https://github.com/WordPress/gutenberg/blob/trunk/packages/undo-manager/src/index.ts), code) | Very high | Taken: 0.7.10 (undo quality) |
| T18 | History marks and `bail()`, so Escape mid-drag restores the state before the gesture and leaves no redo entry | tldraw ([`HistoryManager.ts`](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/HistoryManager/HistoryManager.ts), code) | High | Taken: 0.7.10 (undo quality) |
| T19 | Optimistic commits with `expectedHeadOid`, retried automatically when only other files changed, otherwise a branch or a conflict view | Keystatic ([`updating.tsx`](https://github.com/Thinkmill/keystatic/blob/main/packages/keystatic/src/app/updating.tsx), code) | High: several editors per association | Taken: v0.9 hardening (optimistic commits) |
| T20 | A `version`/`versionNonce` per block for deterministic merges of two drafts | Excalidraw ([`reconcile.ts`](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/data/reconcile.ts), code) | Low today | Watch: two editors' drafts that must merge (the concurrency view after v1.0) |
| T21 | Namespaced migration sequences per plugin (`ns/version`, `dependsOn`, optional `down`) | tldraw ([`migrate.ts`](https://github.com/tldraw/tldraw/blob/main/packages/store/src/lib/migrate.ts), code) | Medium | Watch: the first third-party plugin with migrations of its own |
| T22 | The set of applied migration names recorded instead of one integer | Penpot ([`migrations.cljc`](https://github.com/penpot/penpot/blob/develop/common/src/app/common/files/migrations.cljc), code) | Medium | Watch: as T21 |
| T23 | A fixture trio per block type and per migration (old JSON, migrated JSON, rendered HTML), enforced in CI | Gutenberg ([fixtures README](https://github.com/WordPress/gutenberg/blob/trunk/test/integration/fixtures/blocks/README.md), code); Storyblok ([`__test__`](https://github.com/storyblok/monoblok/tree/main/packages/migrations/src/__test__), code) | Very high: the ADR-0005 invariant made testable | Taken: v0.9 testing (fixtures, fuzz) |
| T24 | A seeded fuzz test of the push pass and the desktop-mobile sync, replayable by seed; Playwright drag tests | tldraw ([`syncFuzz.test.ts`](https://github.com/tldraw/tldraw/blob/main/packages/sync-core/src/test/syncFuzz.test.ts), code); Webstudio's Playwright drag tests and geometry snapshots ([`geometry-utils.ts`](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/primitives/dnd/geometry-utils.ts), code) | High | Taken: v0.9 testing (fixtures, fuzz) |
| T25 | «Delete out-of-schema fields» as a repo maintenance script | Storyblok ([`migrations/src`](https://github.com/storyblok/monoblok/tree/main/packages/migrations/src), code) | Low-medium | Watch: stray fields found in the v0.9 dress rehearsal |
| T26 | One documented token contract (the `theme.json` model): token sets as custom properties, duotone presets alongside | Gutenberg and Twenty Twenty-Five ([theme.json in TT5](https://github.com/WordPress/twentytwentyfive), code); Penpot ([`token.cljc`](https://github.com/penpot/penpot/blob/develop/common/src/app/common/types/token.cljc), code) | High, low-medium effort | Taken: 0.7.9 Design stretch |
| T27 | One declarative allowed-HTML schema shared by the paste cleaner, the render sanitizer and SCHEMA.md | Gutenberg ([`phrasing-content.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/dom/src/phrasing-content.ts), [`clean-node-list.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/dom/src/dom/clean-node-list.ts), code) | High | Taken: 0.7.10 (paste) |
| T28 | A paste filter chain (Word lists, Google Docs ids, Slack paragraphs, non-breaking spaces, empty paragraphs) and pasted markdown turned into formatting | Gutenberg ([`paste-handler.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/raw-handling/paste-handler.ts), code) | High: Urd has no paste handler today | Taken: 0.7.10 (paste) |
| T29 | A pasted bare URL becomes a link | Ghost Koenig ([`KoenigBehaviourPlugin.tsx`](https://github.com/TryGhost/Koenig/blob/main/packages/koenig-lexical/src/plugins/KoenigBehaviourPlugin.tsx), code) | High, low effort | Taken: 0.7.10 (paste) |
| T30 | `contenteditable="plaintext-only"` for single-line fields, only while hovered or focused | Puck ([`InlineTextField`](https://github.com/puckeditor/puck/blob/main/packages/core/components/InlineTextField/index.tsx), code); Baseline March 2025 ([ws](https://webstatus.dev/features/contenteditable-plaintextonly), primary) | High | Taken: 0.7.10 (paste) |
| T31 | Synced global blocks `{ref, overrides}` with a detach that copies; only named fields can be overridden; template parts beyond nav and footer (which live at site level in `site.json`) | GrapesJS symbols ([`SymbolUtils.ts`](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/dom_components/model/SymbolUtils.ts), code); Gutenberg synced patterns ([`pattern-overrides.js`](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/bindings/pattern-overrides.js), code) | High, medium-high effort | Taken: After v1.0 synced global blocks |
| T32 | The layers panel as a roving-tabindex tree, Alt+F10 into the floating toolbar and Escape back, focus sentinels around the iframe | Gutenberg ([`list-view`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/list-view/index.jsx), [`navigable-toolbar`](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/navigable-toolbar/index.jsx), code); Webstudio ([`tree.tsx`](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/tree.tsx), code) | High | Taken: 0.7.11 Accessibility round |
| T33 | Content, title, description, OG, canonical and JSON-LD baked into the HTML at publish, collection data included (build-time bake); one h1 per page | Astro, TT5, Horizon ([Part 3](#part-3-the-generated-site-measured), measured); Plasmic ([data in code components](https://docs.plasmic.app/learn/data-code-components/), primary) | Very high: Urd's HTML holds no text today | Taken: v0.8 baking |
| T34 | Per-page module lists: modulepreload and module scripts only for the block and background types on the page (deferred by ADR-0013 until both the modulepreload test and the copy-refresh duty are solved) | Horizon, WordPress, Astro ([Part 3](#what-the-best-output-looks-like), measured) | Very high: 64 modules (769 KB raw) on every page today | Taken: v0.8 baking (must solve both ADR-0013 conditions, the modulepreload test and the copy-refresh duty, with ADR-0013 rewritten when built) |
| T35 | Declarative event delegation: one listener per event type reading `on:click`-style or `data-urd-*` attributes, no inline handlers | Shopify Horizon ([`component.js`](https://github.com/Shopify/horizon), code); WordPress Interactivity API ([`directives/`](https://github.com/WordPress/gutenberg/tree/trunk/packages/interactivity/src/directives), code) | High: how baked HTML gets behaviour under `script-src 'self'` | Taken: v0.8 baking |
| T36 | `rel=expect` instead of a render-blocking `boot.js`, with Horizon's guards (the at-rule under reduced motion, no hold on first entry, reload or low power, a timeout, skip on input, off in in-app WebViews) | Shopify Horizon ([`view-transitions.js`](https://github.com/Shopify/horizon), code) | High once pages are baked | Taken: v0.8 baking |
| T37 | The animation start state only under a class the engine adds, so no-JS and slow-JS visitors see the content | Webstudio's CSS timelines ([webstudio.is](https://webstudio.is/), measured); the anti-pattern at [Framer](https://www.framer.com/), [Figma Sites](https://simple-grill-28884515.figma.site/) and [Webflow](https://webflow.com/) (measured) | High, low effort | Taken: v0.8 baking |
| T38 | `color-scheme` and `theme-color` meta, an RSS `<link rel=alternate>`, hreflang if per-language pages arrive | Webflow, Astro, WordPress, Ghost ([Part 3](#what-the-best-output-looks-like), measured) | High, small | Taken: v0.8 baking |
| T39 | Editor and preview CSS split out of base.css; `@layer` (reset, base, blocks, theme, utilities) so theme.css wins by layer order | Horizon's single compiled file ([Shopify/horizon](https://github.com/Shopify/horizon), code), TT5 ([wp-themes.com](https://wp-themes.com/twentytwentyfive/), measured); `@layer` at [Astro](https://astro.build/), [Webstudio](https://webstudio.is/), [Bricks](https://bricksbuilder.io/) (measured) | High: about a tenth of base.css's rules are editor styles | Taken: v0.8 speed |
| T40 | HSTS in `_headers` (max-age only) | Near-universal: [Framer](https://www.framer.com/), [Webstudio](https://webstudio.is/), [Hostinger](https://millawkids.com/), [Webflow](https://webflow.com/), [Squarespace](https://adri-fluid-demo.squarespace.com/); [ApeironLF](https://apeironlf.pages.dev/) on the same Pages platform (measured) | High, one line | Taken: 0.7.0 (two measured findings that need no baking) |
| T41 | A short `Link` header (CSS, main image, boot module) so Pages sends 103 Early Hints | [Webflow](https://truus.co/), [Webstudio](https://webstudio.is/), [Shopify](https://theme-horizon-demo.myshopify.com/), [ApeironLF](https://apeironlf.pages.dev/) (measured) | Medium-high, after T34 | Taken: v0.8 speed |
| T42 | `content-visibility: auto` for sections below the fold, measured, not assumed | [Horizon](https://theme-horizon-demo.myshopify.com/) (14 rules), [Bricks](https://bricksbuilder.io/) via FlyingPress (measured) | Medium | Taken: v0.8 speed (the content-visibility item) |
| T43 | `content/theme.css` referenced with a content hash, like base.css | Hashed, immutable assets at [Webflow](https://webflow.com/), [Webstudio](https://webstudio.is/), [Astro](https://astro.build/), [Framer](https://www.framer.com/), [Shopify](https://theme-horizon-demo.myshopify.com/) (measured) | Medium: the shells are Urd-owned and not written by publishing today | Watch: baked pages (v0.8), when publishing writes the HTML |
| T44 | The first image (and a hero background) `loading="eager"` with `fetchpriority="high"`; lazy below the fold | [Horizon](https://theme-horizon-demo.myshopify.com/), [Squarespace](https://bailard-fluid-demo.squarespace.com/), [WordPress](https://wordpress.org/news/), [Astro](https://astro.build/) (measured) | Very high, small | Taken: 0.7.0 (two measured findings that need no baking) |
| T45 | Intrinsic `width`/`height` recorded at upload and written on the image | [Horizon](https://theme-horizon-demo.myshopify.com/), [WordPress](https://wordpress.org/news/), [Webstudio](https://webstudio.is/), [Astro](https://astro.build/) (measured) | Very high | Taken: v0.8 responsive pictures |
| T46 | `srcset` in 2 to 4 widths encoded at upload, AVIF with WebP as the fallback in `<picture>`, `sizes="auto, …"` on lazy images | Framer, Squarespace, WordPress, Hostinger (measured); `sizes=auto` in all three engines ([bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/img.json), primary) | Very high; `imageTools.js` already encodes WebP in the browser through canvas, and canvas encoding of AVIF must be checked per engine before this relies on it | Taken: v0.8 responsive pictures |
| T47 | A JPEG XL `<source>` first in `<picture>` | All three engines once Firefox 158 ships, scheduled for 13 October 2026 ([chromestatus 155](https://chromestatus.com/release-notes/155), [FF 158](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/158), primary) | Low until the browser can encode it at upload | Watch: noted for later in v0.8 responsive pictures |
| T48 | If own fonts arrive: self-hosted variable woff2 with subsets, at most one preload at low priority, `font-src 'self'`; Google Fonts only through a same-origin route | [Figma Sites](https://simple-grill-28884515.figma.site/), [Astro](https://astro.build/), [Horizon](https://theme-horizon-demo.myshopify.com/), [Hostinger's proxy](https://millawkids.com/) (measured); TT5 ([WordPress/twentytwentyfive](https://github.com/WordPress/twentytwentyfive), code) | High: keeps 0 third-party requests | Taken: 0.7.9 Design stretch (own fonts in a folder) |
| T49 | Exclude `[rel~=nofollow]` links from the speculation rules with `selector_matches` | WordPress core ([wordpress.org/news/](https://wordpress.org/news/), measured) | Low, small | Watch: tuned with baking (v0.8), when prerender becomes cheap |
| T50 | Publish-time files: llms.txt, a Markdown twin per page with `rel=alternate`, a Content-Signal line and AI-crawler choice set by the site owner, sitemap `lastmod` and image entries, a Search Console verification field | Framer, WordPress, Wix, Webflow, Webstudio, Hostinger, Squarespace (measured); the feature side in [FEATURES.md](FEATURES.md) | High: cheap static files that fit the repo-is-the-site model | Taken: v0.8 publish-time files |
| T51 | A skip link in the shells | [Squarespace](https://adri-fluid-demo.squarespace.com/), [Horizon](https://theme-horizon-demo.myshopify.com/), [WordPress](https://wp-themes.com/twentytwentyfive/), [Bricks](https://bricksbuilder.io/), [Astro](https://astro.build/) (measured) | Very high, small | Taken: 0.7.11 Accessibility round |
| T52 | The shells' Norwegian `<noscript>` literal (`template/index.html:100`) in English, or the site's language once pages are baked | Urd's own finding (code) | Very high, small | Taken: Bugs |
| T53 | The engine's lightness made visible and measurable (DOM node count, payload) in the editor or at «See the site» | Bricks against Elementor ([inspiredmonks](https://inspiredmonks.com/bricks-builder-vs-elementor-performance-2026/), secondary) | High, low effort: builds trust around an advantage that is invisible today | Taken: v0.8 «show the engine's lightness» |
| T54 | An index or memory layer for admin queries as collections grow, instead of reading the repo on every keystroke | Tina ([tina.io](https://tina.io/), primary) | Medium, medium effort, only at scale | Taken: v0.8 or later (the index layer for admin queries) |
| T55 | «Which layout tool?» decision help as a help chip | Wix Studio ([flexbox or grid](https://support.wix.com/en/article/studio-editor-choosing-between-flexbox-based-and-grid-based-tools), primary) | High (ADR-0008), low effort | Taken: 0.7.10 |
| T56 | Invoker commands (`command`/`commandfor`) for the lightbox, cart drawer and quick view, with a click fallback | Baseline 12 December 2025 ([ws](https://webstatus.dev/features/invoker-commands), primary) | High: removes click handlers | Taken: 0.7.0 (Baseline 2025-2026 sub-item) |
| T57 | `hidden="until-found"` with `beforematch` for collapsed content and tab panels | All three engines ([bcd](https://github.com/mdn/browser-compat-data/blob/main/html/global_attributes.json), primary) | High | Taken: 0.7.0 (Baseline sub-item); tabs in v0.8 Element round, ER-A |
| T58 | `field-sizing: content` on the form block's textarea | Baseline 16 June 2026 ([ws](https://webstatus.dev/features/field-sizing), primary) | Medium | Taken: 0.7.0 (Baseline sub-item) |
| T59 | `text-box` trim on buttons, badges and headings | Baseline 18 August 2026 ([web.dev](https://web.dev/blog/web-platform-08-2026), primary) | Medium | Taken: 0.7.0 (Baseline sub-item) |
| T60 | `sibling-index()` for the plain index stagger | Baseline 18 August 2026 ([ws](https://webstatus.dev/features/sibling-count), primary) | Low-medium: the column, row and centre waves need positions | Taken: 0.7.0 (Baseline sub-item) |
| T61 | `shape()` for the section dividers instead of an SVG path | Baseline 24 February 2026 ([ws](https://webstatus.dev/features/shape-function), primary) | Low-medium: built only if it removes code | Taken: 0.7.0 (Baseline sub-item) |
| T62 | `light-dark()` for images: a logo per colour scheme | Baseline 14 September 2026 ([ws](https://webstatus.dev/features/light-dark-image), primary) | Medium | Taken: 0.7.0 (Baseline sub-item) |
| T63 | `@starting-style` for the cart drawer, dialogs and menus | Horizon (17 rules, measured); Baseline 6 August 2024 ([ws](https://webstatus.dev/features/starting-style), primary) | Medium-high, cheap | Taken: 0.7.0 (Baseline sub-item) |
| T64 | `ariaNotify()` for the editor's announcements | Baseline 14 September 2026 ([ws](https://webstatus.dev/features/arianotify), primary) | High with T12 | Taken: 0.7.0 (Baseline sub-item) |
| T65 | The Navigation API for editor routing and unsaved-change guards | Baseline 13 January 2026 ([ws](https://webstatus.dev/features/navigation), primary) | Medium | Taken: 0.7.0 (Baseline sub-item) |
| T66 | Trusted Types: a `require-trusted-types-for 'script'` policy around Urd's HTML sinks | Baseline 24 February 2026 ([ws](https://webstatus.dev/features/trusted-types), primary) | Medium-high: fits the strict CSP | Taken: 0.7.0 (Baseline sub-item) |
| T67 | `::scroll-marker`/`::scroll-button` for the gallery's dots and arrows | Chrome only ([ws](https://webstatus.dev/features/scroll-markers), primary) | High once ready: removes hand-rolled controls | Watch: Baseline in all three engines |
| T68 | `appearance: base-select` to retire ADR-0009's ban on native `<select>` and both dropdown implementations | Chrome and Safari 27 ([Safari 27](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/), primary) | High once ready | Watch: Firefox stable |
| T69 | A client-side router that swaps `#urd-root` without a reload | WordPress and Astro prefetch (measured); Speculation Rules support ([bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/script.json), primary) | Medium | Watch: built only if Firefox and Safari stable still lack Speculation Rules prefetch and prerender at v1.0 |
| T70 | `display: grid-lanes` for the gallery's mosaic view | Safari 26.4 only ([WebKit](https://webkit.org/blog/17758/when-will-css-grid-lanes-arrive-how-long-until-we-can-use-it/), primary) | Medium | Watch: a second engine |
| T71 | `Temporal` for DST-safe recurrence in `ics.js` | Chrome 144, Firefox 139 ([bcd](https://github.com/mdn/browser-compat-data/blob/main/javascript/builtins/Temporal.json), primary) | Medium: RFC 5545 rules stay Urd's | Watch: Safari stable |
| T72 | The Sanitizer API as a native layer under Urd's own sanitizer | Chrome 146, Firefox 148 ([bcd](https://github.com/mdn/browser-compat-data/blob/main/api/Sanitizer.json), primary) | Medium | Watch: Safari |
| T73 | `closedby="any"` on the lightbox, cart drawer and quick view | Chrome 134, Firefox 141 ([bcd](https://github.com/mdn/browser-compat-data/blob/main/html/elements/dialog.json), primary) | Medium: replaces the JS backdrop click | Watch: Safari stable |
| T74 | `interpolate-size` beyond the FAQ's gate | Chrome 129, Safari TP 254 ([bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/interpolate-size.json), primary) | Low-medium | Watch: Firefox and Safari stable |
| T75 | `scroll-state(stuck)` for the nav's scrolled state instead of JS classes | Chrome only ([ws](https://webstatus.dev/features/container-scroll-state-queries), primary) | Medium | Watch: Firefox and Safari |
| T76 | `moveBefore()` when the editor reorders blocks, keeping iframe and video state | Chrome 133, Firefox 144 ([ws](https://webstatus.dev/features/move-before), primary) | Low-medium; the `insertBefore` fallback works today | Watch: Safari |
| T77 | `text-fit` for headlines that fit their container | Chrome 150 only ([bcd](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-fit.json), primary) | Low: «fit: shrink» does it per block | Watch: a second engine |
| T78 | Print styles: `@page` size and margins, `print-color-adjust`, page breaks | Baseline ([ws](https://webstatus.dev/features/page-setup), [ws](https://webstatus.dev/features/print-color-adjust), primary) | Medium | Taken: 0.7.22 print |
| T79 | PR per draft, a preview URL per draft, open authoring (fork and PR) | Decap ([editorial workflows](https://decapcms.org/docs/editorial-workflows/), [deploy preview links](https://decapcms.org/docs/deploy-preview-links/), [open authoring](https://decapcms.org/docs/open-authoring/), primary); Framer 3.0 branches, a Pro feature ([Framer: branches](https://www.framer.com/help/articles/how-to-use-branches-in-framer/), primary); Webflow, Enterprise only ([Webflow help](https://help.webflow.com/hc/en-us/articles/33961355506195), primary) | High with GitHub OAuth and Pages, medium-high effort | Taken: After v1.0 PR per draft |
| T80 | Publishing deletes only files an earlier publish wrote (baked pages, `_redirects`) | Silex ([`publish.rs`](https://github.com/silexlabs/Silex/blob/main/server-rust/src/publish.rs), code) | High once publishing generates files | Taken: v0.8 baking |
| T114 | A sandboxed frame with a CSP of its own for exported code: `media/embeds/<id>/` shown in `<iframe sandbox="allow-scripts">`, a `_headers` rule after `/*` that detaches the site's policy and sets one with the `sandbox` directive, the block locked until admin has seen the policy live, and click-to-load by default | Wix HTML component ([dev.wix.com](https://dev.wix.com/docs/velo/velo-only-apis/$w/html-component/introduction), primary); Cloudflare's rules engine ([rules-engine.ts](https://github.com/cloudflare/workers-sdk/blob/main/packages/workers-shared/asset-worker/src/utils/rules-engine.ts), code); CSP3 ([w3c.github.io](https://w3c.github.io/webappsec-csp/), primary) | Medium: isolation only, no promise beyond it; Safari 26.5 needs the origin named beside `'self'` | Taken: v0.8 Animation files, the portal |
| T115 | The pointer's position as custom properties on the section (`--urd-pointer-x`, `--urd-pointer-y`), one `pointermove` listener batched by rAF, frozen under reduced motion, so styles, faces and background layers follow the pointer in CSS | csswg-drafts #6733 ([github.com](https://github.com/w3c/csswg-drafts/issues/6733), primary); pointer-animations ([drafts.csswg.org](https://drafts.csswg.org/pointer-animations/), primary) | High: JS only for what CSS cannot read (ADR-0011) | Taken: v0.8 OL-1 the pointer as custom properties |
| T116 | An allowlist sanitiser for inline SVG: elements and attributes per element, `href` only to `#id`, `<animate>` never on `href`, no external `url()`, ids and classes prefixed per instance; run at upload and at render, with an attack corpus in the tests | DOMPurify ([src](https://github.com/cure53/DOMPurify/tree/main/src), code); PortSwigger ([svg-animate-xss-vector](https://portswigger.net/research/svg-animate-xss-vector), secondary); the Sanitizer API ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API/Default_sanitizer_configuration), primary) | High for every inline path; the CSP is the backstop | Taken: v0.8 OL-2 the inline SVG sanitiser |

### Closed

| ID | What | Who does it (with source) | Fit for Urd | Status |
|---|---|---|---|---|
| T81 | The lightbox, cart drawer and product quick view on `<dialog>` with `showModal()` | [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) (primary) | Very high | Delivered 0.6.6.5.7 |
| T82 | The five floating menus of editor and engine on the Popover API with anchor positioning, behind the `position-try-fallbacks` gate | [web.dev: Popover API](https://web.dev/blog/popover-api), [web.dev: Anchor positioning](https://web.dev/learn/css/anchor-positioning) (primary) | Very high | Delivered 0.7.12 |
| T83 | The FAQ as `<details name>` with `::details-content` and the size interpolation behind its gate | [Chrome: Styling details](https://developer.chrome.com/blog/styling-details) (primary) | High | Delivered 0.6.6.5.7 |
| T84 | The gallery's carousel view on CSS scroll-snap | [Chrome: Carousels with CSS](https://developer.chrome.com/blog/carousels-with-css) (primary) | High | Delivered 0.6.20 |
| T85 | Parallax as scroll-driven CSS behind `@supports`, with the rAF variant as the fallback | [Chrome: performant parallax](https://developer.chrome.com/blog/performant-parallaxing) (primary) | High | Delivered 0.6.6.5.7 |
| T86 | Theme without FOUC: `light-dark()` and `color-scheme`, the manual override through an external `theme-init.js` | [MDN light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) (primary) | Medium-high | Delivered 0.6.6.5.11 |
| T87 | Cross-document View Transitions (`@view-transition { navigation: auto }`), names only during the transition, a plain cut under reduced motion | [MDN View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) (primary) | Medium | Delivered 0.6.0.5 |
| T88 | Scroll lock through `body:has(dialog:modal)`, smooth anchor scrolling | [MDN :has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) (primary) | Medium | Delivered 0.6.0.5 |
| T89 | Gradient pan and orbit on `transform` instead of `background-position` | [Motion: scroll animations](https://motion.dev/docs/react-scroll-animations) (primary) | Medium | Delivered 0.6.0.6 |
| T90 | `contrast-color()` for the text on accent surfaces, unless the owner sets `accent-text` | [web.dev April 2026](https://web.dev/blog/web-platform-04-2026) (primary) | High | Delivered 0.7.12 |
| T91 | Speculation Rules as a separate file sent by a header, not an inline script | WordPress and Wix inline them ([Part 3](#part-3-the-generated-site-measured), measured) | High: no CSP exception | Delivered 0.6.32 |
| T92 | The calendar's first weekday from `Intl.Locale` week info, with `weekStart` on the block | [ws](https://webstatus.dev/features/intl-locale-info) (primary) | High | Delivered 0.7.19.10 |
| T93 | Fluid Engine rows that grow with the content, on mobile: the row grid with `minmax(8px, auto)` rows and synced per-block overrides (ADR-0019) | Squarespace ([Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine), primary) | Very high | Delivered 0.7.3 |
| T94 | The desktop half of the Fluid Engine guardrails, answered by the content push after the Wix rules, with `suspendPush`/`resumePush` as «remove row stretch at drag start» (ADR-0024) | Wix ([element size changes and page layout](https://dev.wix.com/docs/develop-websites-sdk/code-your-site/build-a-custom-frontend/page-elements/about-element-size-changes-and-page-layout), primary) | Very high | Delivered 0.7.17 |
| T95 | A block that follows its content cannot be dragged shorter than it (ADR-0025 decision 4) | Squarespace: a block cannot shrink below its content ([Developing Fluid Engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine), primary) | High | Delivered 0.7.21.2 |
| T96 | Slash «/» on the canvas opening the block menu, and saved block groups in the same insert menus (the snippets model); slash inside a text block is deferred ([ELEMENTS.md](ELEMENTS.md)) | Ghost ([cards](https://ghost.org/help/cards/), [snippets](https://ghost.org/help/snippets/), primary) | High | Delivered 0.6.7.7 and 0.6.7.5 |
| T97 | Patterns: section, block-group and page templates, always inserted as independent copies | Gutenberg and Webflow ([patterns and FSE guide](https://wppoland.com/en/gutenberg-blocks-patterns-full-site-editing-guide/), secondary) | High | Delivered 0.6.7.3, 0.6.7.5 and 0.6.7.10 |

### Not taken

| ID | What | Who does it (with source) | Fit for Urd | Status |
|---|---|---|---|---|
| T98 | GSAP and other heavy animation libraries | [Webflow](https://webflow.com/) IX3 on GSAP 3.15, [Framer](https://red.org/) Motion with GSAP, [Elementor](https://elementor.com/) GSAP helpers (measured) | Low | Not taken: a dependency, against ADR-0002; a small vanilla scroll and appear primitive gives enough effect |
| T99 | Runtime SDK delivery and dynamic content (Builder.io and Tina in dynamic mode) | [How Builder works](https://www.builder.io/c/docs/how-builder-works-technical) (primary) | Low | Not taken: breaks static output; Urd is the «bake at publish» half, which is simpler |
| T100 | A hosted database or service | Astro Studio ([Goodbye Studio](https://astro.build/blog/goodbye-astro-studio/), primary) | None | Not taken: exactly the cost and shutdown risk Urd avoids |
| T101 | Unbound free positioning (percent of the whole window with no upper limit) | Classic Wix ([Wix Studio max width](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width), primary) | Low | Not taken: ADR-0018 keeps the bound canvas; free placement inside it stands, with the push rules of ADR-0024 |
| T102 | Class-based cascade styling as the core | Webflow, Bricks ([Webflow canvas overview](https://help.webflow.com/hc/en-us/articles/33961319255059-Webflow-canvas-overview), primary) | Low | Not taken: a stylesheet-database abstraction against «raw files, no build»; weighed, not adopted |
| T103 | React and RSC code components | Plasmic ([data queries v2](https://plasmic.substack.com/p/data-queries-v2-full-rsc-support), primary) | Low | Not taken: take the ideas (build-time bake, provider and consumer data), not the framework |
| T104 | Heavy marketplace runtimes | The Framer and Elementor ecosystems ([www.framer.com](https://www.framer.com/), [elementor.com](https://elementor.com/), measured) | Low | Not taken: Urd's plugin model with CSP opt-in is the way (ADR-0006) |
| T105 | An external AI service as a core dependency, or a prompt-to-site wizard | Prompt-to-site generators at Wix, Framer, Hostinger and others (overview in [FEATURES.md](FEATURES.md)); Framer 3.0's canvas agents ([framer.com/blog](https://www.framer.com/blog/ai-credits-simpler-plans-and-lower-prices/), primary) | Low | Not taken: ADR-0017 chooses a local MCP server driven by the site owner's own agent client |
| T106 | Declarative per-breakpoint variants chosen by name match | Framer ([Framer breakpoints](https://www.framer.com/blog/responsive-breakpoints/), primary) | Low | Not taken: ADR-0019, it solves style per breakpoint, not layout sync; a separate mobile version was rejected in the same place |
| T107 | Container queries on the canvas | The CSS containment model ([MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries), primary) | None on the canvas | Not taken: ADR-0018, `container-type` makes a containing block for `position: fixed`; container queries belong inside blocks (in use there), never on `.urd-canvas` or a block with sticky; subgrid does not apply to the absolute canvas |
| T108 | A scroll-driven `view()` entrance as the default | Webstudio ([webstudio.is](https://webstudio.is/), measured); [snippet 6](#gated-snippets) | Low as the default | Not taken: ADR-0011 decision 4, a `view()` entrance reverses on scrolling up; a scrubbed entrance as its own labelled choice is in BACKLOG's Suggestions |
| T109 | A document-model rich-text editor (Lexical, TipTap, ProseMirror) | Webstudio ([`text-editor.tsx`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/features/text-editor/text-editor.tsx), code), Puck ([`RichTextMenu`](https://github.com/puckeditor/puck/tree/main/packages/core/components/RichTextMenu/controls), code), Ghost ([`KoenigBehaviourPlugin.tsx`](https://github.com/TryGhost/Koenig/blob/main/packages/koenig-lexical/src/plugins/KoenigBehaviourPlugin.tsx), code) | Low | Not taken: a dependency and a build step for the engine (ADR-0002); the shared schema and the paste pipeline take the gains (T27, T28) |
| T110 | Version-less trial parsing of old block shapes | Gutenberg ([`apply-block-deprecated-versions.ts`](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/parser/apply-block-deprecated-versions.ts), code) | None | Not taken: Urd stores a version per block and migrates explicitly (ADR-0005) |
| T111 | Real-time collaboration (Yjs over HTTP polling, a Durable Object per room) | Gutenberg ([http-polling README](https://github.com/WordPress/gutenberg/blob/trunk/packages/sync/src/providers/http-polling/README.md), code), tldraw ([`TldrawDurableObject.ts`](https://github.com/tldraw/tldraw/blob/main/templates/sync-cloudflare/worker/TldrawDurableObject.ts), code), Webstudio ([`multiplayer-sync.ts`](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/sync/multiplayer-sync.ts), code) | Low for associations | Not taken: needs real-time infrastructure beyond static plus functions; the conflict warning covers the most important case, and the concurrency view stays after v1.0 |
| T112 | `EditContext` for the text editor | Chrome only ([bcd](https://github.com/mdn/browser-compat-data/blob/main/api/EditContext.json), primary) | None | Not taken: one engine; keep `contenteditable` |
| T113 | Executing code the editor sends, or accepting `'*'` origins | Builder.io `builder.evaluate` ([`init-editing.ts`](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/scripts/init-editing.ts), code); Onlook ([`preload/script/index.ts`](https://github.com/onlook-dev/onlook/blob/main/apps/web/preload/script/index.ts), code) | None | Not taken: the bridge carries data only, from a checked origin and source (T1) |

### Former numbers

Old numbers from the earlier maps, mapped to the new IDs and sections, so CHANGELOG mentions stay traceable.

| Old number | New |
|---|---|
| LAERDOMMER 5.1 (Fluid Engine guardrails) | T93 (mobile), T94 (desktop push), T95 (no drag below the content) |
| LAERDOMMER 5.2 (finer patch protocol) | T4 |
| LAERDOMMER 5.3 (`theme.json` token model) | T26 |
| LAERDOMMER 5.4 (reuse: patterns, symbols, template parts) | T97 (patterns), T31 (symbols and template parts) |
| LAERDOMMER 5.5 (PR per draft, deploy preview, open authoring) | T79 |
| LAERDOMMER 5.6 (the engine's lightness visible) | T53 |
| LAERDOMMER 5.7 (slash and snippets) | T96 |
| LAERDOMMER 5.8 (build-time data bake) | T33 |
| LAERDOMMER 5.9 (index layer for admin queries) | T54 |
| LAERDOMMER 5.10 («which layout tool?» chip) | T55 |
| LAERDOMMER 5.11 (Framer per-breakpoint variants, rejected in ADR-0019) | T106 |
| ELEMENTKART 5b.1 (native top layer) | T81 (dialogs), T82 (menus) |
| ELEMENTKART 5b.2 (`<details name>`) | T83 |
| ELEMENTKART 5b.3 (scroll-snap and carousel primitives) | T84 (scroll-snap), T67 (primitives) |
| ELEMENTKART 5b.4 (scroll-driven animations) | T85 (parallax), T108 (entrance not taken) |
| ELEMENTKART 5b.5 (`light-dark()` and `color-scheme`) | T86 |
| ELEMENTKART 5b.6 (`aspect-ratio`, `srcset`, `<picture>`, AVIF, `content-visibility`) | T46, T45, T42 |
| ELEMENTKART 5b.7 (minimal wrappers and per-page conditional loading, deferred by ADR-0013) | T34 |
| ELEMENTKART 5b.8 (cross-document View Transitions) | T87 |
| ELEMENTKART 5b.9 (container queries, subgrid, `:has()`) | T107 (container queries, subgrid) and T88 (`:has()`) |
| LAERDOMMER part 1 | [Part 1. Where Urd already hits](#part-1-where-urd-already-hits) |
| LAERDOMMER part 2, the mechanisms (not the surveys) | [Part 2. The editor, read from source code](#part-2-the-editor-read-from-source-code); the dated surveys are in [SURVEYS.md](SURVEYS.md) |
| LAERDOMMER part 3 | [Part 3. The generated site, measured](#part-3-the-generated-site-measured), above all [Build patterns behind the output](#build-patterns-behind-the-output) |
| LAERDOMMER part 4 | [Part 5. Publishing and deploy](#part-5-publishing-and-deploy) |
| LAERDOMMER part 5 | [Part 6. What to take](#part-6-what-to-take) |
| LAERDOMMER part 6 | [Not taken](#not-taken) |
| ELEMENTKART part 2 (modern building blocks, the support tiers) | [Native techniques](#native-techniques) and [Part 4. The web platform, October 2026](#part-4-the-web-platform-october-2026) |
| ELEMENTKART part 4 (Urd today against the techniques) | [Part 1. Where Urd already hits](#part-1-where-urd-already-hits) (the build side; the delivery side is in [ELEMENTS.md](ELEMENTS.md)) |
| ELEMENTKART 2.1 (components) | [Carousel](#carousel), [Accordion](#accordion), [Tabs](#tabs), [Dialog and lightbox](#dialog-and-lightbox), [Popover and menus](#popover-and-menus), [Tooltips and anchoring](#tooltips-and-anchoring), [Sticky](#sticky) |
| ELEMENTKART 2.2 | [Layout and responsive](#layout-and-responsive) |
| ELEMENTKART 2.3 | [Theme without FOUC](#theme-without-fouc) |
| ELEMENTKART 2.4 | [Media and performance](#media-and-performance) |
| ELEMENTKART 2.5 | [Motion](#motion) |
| ELEMENTKART 2.6 | [How the builders construct](#how-the-builders-construct) |
| ELEMENTKART support tiers (the table in part 2) | [Ready, gate, watch](#ready-gate-watch) |
| ELEMENTKART part 6 | [Old way, bug, modern fix](#old-way-bug-modern-fix) |
| ELEMENTKART part 7 | [Not ready, or deliberately not taken](#not-ready-or-deliberately-not-taken) |
| ELEMENTKART «part 8» (cited by ADR-0011, never written) | [Not ready, or deliberately not taken](#not-ready-or-deliberately-not-taken) |

---

## Sources

Source marks as in [README.md](README.md). Everything was read or measured on 11 October 2026, except the items marked «earlier maps», which were read for the earlier maps between 27 July and 23 September 2026 and are kept where the research did not supersede them.

**Measured sites (measured, 11 October 2026).** [urdweb.pages.dev](https://urdweb.pages.dev/), [apeironlf.pages.dev](https://apeironlf.pages.dev/), [www.framer.com](https://www.framer.com/), [www.wisdom.ai](https://www.wisdom.ai/), [red.org](https://red.org/), [webflow.com](https://webflow.com/), [www.osmo.supply](https://www.osmo.supply/), [truus.co](https://truus.co/), [www.jwaylon.com](https://www.jwaylon.com/), [www.wix.com/studio](https://www.wix.com/studio), [adri-fluid-demo.squarespace.com](https://adri-fluid-demo.squarespace.com/), [bailard-fluid-demo.squarespace.com](https://bailard-fluid-demo.squarespace.com/), [johnsmith-demo.carrd.co](https://johnsmith-demo.carrd.co/), [newsletteros.com](https://newsletteros.com/), [webstudio.is](https://webstudio.is/), [simple-grill-28884515.figma.site](https://simple-grill-28884515.figma.site/), [diary-suite-67314439.figma.site](https://diary-suite-67314439.figma.site/), [millawkids.com](https://millawkids.com/), [www.pwood.gr](https://www.pwood.gr/), [theme-horizon-demo.myshopify.com](https://theme-horizon-demo.myshopify.com/), [theme-dawn-demo.myshopify.com](https://theme-dawn-demo.myshopify.com/), [wordpress.org/news](https://wordpress.org/news/), [wp-themes.com/twentytwentyfive](https://wp-themes.com/twentytwentyfive/), [elementor.com](https://elementor.com/), [bricksbuilder.io](https://bricksbuilder.io/), [www.404media.co](https://www.404media.co/), [ghost.org/resources](https://ghost.org/resources/), [astro.build](https://astro.build/).

**The web platform: release notes and announcements.**

- [developer.chrome.com: chrome-two-week-release](https://developer.chrome.com/blog/chrome-two-week-release) (primary)
- [chromestatus 155](https://chromestatus.com/release-notes/155) (primary)
- [Firefox 157](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/157) (primary)
- [Firefox 158](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/158) (primary)
- [blog.mozilla.org: firefox-new-release-cadence-and-what-to-expect](https://blog.mozilla.org/sumo/2026/08/19/firefox-new-release-cadence-and-what-to-expect/) (primary)
- [webkit.org: webkit-features-for-safari-27-0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/) (primary)
- [webkit.org: webkit-features-for-safari-26-6](https://webkit.org/blog/18178/webkit-features-for-safari-26-6/) (primary)
- [webkit.org: release-notes-for-safari-technology-preview-254](https://webkit.org/blog/18420/release-notes-for-safari-technology-preview-254/) (primary)
- [web.dev: interop-2026](https://web.dev/blog/interop-2026) (primary)
- [hacks.mozilla.org: launching-interop-2026](https://hacks.mozilla.org/2026/02/launching-interop-2026/) (primary)
- [Firefox 153](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/153) (primary)
- [Chrome 154](https://developer.chrome.com/release-notes/154) (primary)
- [web.dev: web-platform-01-2026](https://web.dev/blog/web-platform-01-2026) (primary)
- [Firefox 147](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/147) (primary)
- [webkit.org: when-will-css-grid-lanes-arrive-how-long-until-we-can-use-it](https://webkit.org/blog/17758/when-will-css-grid-lanes-arrive-how-long-until-we-can-use-it/) (primary)
- [web.dev: web-platform-12-2025](https://web.dev/blog/web-platform-12-2025) (primary)
- [Chrome 150](https://developer.chrome.com/release-notes/150) (primary)
- [Firefox 154](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/154) (primary)
- [Firefox 155](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/155) (primary)
- [Chrome 147](https://developer.chrome.com/release-notes/147) (primary)
- [web.dev: web-platform-04-2026](https://web.dev/blog/web-platform-04-2026) (primary)
- [chromestatus release notes](https://chromestatus.com/release-notes) (primary)
- [Chrome 148](https://developer.chrome.com/release-notes/148) (primary)
- [web.dev: web-platform-09-2026](https://web.dev/blog/web-platform-09-2026) (primary)
- [developer.mozilla.org: Experimental_features](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features) (primary)
- [Chrome 146](https://developer.chrome.com/release-notes/146) (primary)
- [web.dev: web-platform-08-2026](https://web.dev/blog/web-platform-08-2026) (primary)
- [Firefox 149](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/149) (primary)
- [webkit.org: webkit-features-for-safari-26-2](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/) (primary)
- [Chrome 143](https://developer.chrome.com/release-notes/143) (primary)
- [Chrome 144](https://developer.chrome.com/release-notes/144) (primary)
- [webkit.org: fixing-top-level-await-in-safari](https://webkit.org/blog/18227/fixing-top-level-await-in-safari/) (primary)
- [developer.chrome.com: carousels-with-css](https://developer.chrome.com/blog/carousels-with-css) (primary) (earlier maps)
- [developer.chrome.com: styling-details](https://developer.chrome.com/blog/styling-details) (primary) (earlier maps)
- [web.dev: popover-api](https://web.dev/blog/popover-api) (primary) (earlier maps)
- [web.dev: anchor-positioning](https://web.dev/learn/css/anchor-positioning) (primary) (earlier maps)
- [developer.chrome.com: css-scroll-state-queries](https://developer.chrome.com/blog/css-scroll-state-queries) (primary) (earlier maps)
- [web.dev: css-subgrid](https://web.dev/articles/css-subgrid) (primary) (earlier maps)
- [webkit.org: introducing-css-grid-lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/) (primary) (earlier maps)
- [developer.chrome.com: masonry-update](https://developer.chrome.com/blog/masonry-update) (primary) (earlier maps)
- [web.dev: optimize-cls](https://web.dev/articles/optimize-cls) (primary) (earlier maps)
- [developer.chrome.com: performant-parallaxing](https://developer.chrome.com/blog/performant-parallaxing) (primary) (earlier maps)
- [developer.chrome.com: dom-size](https://developer.chrome.com/docs/lighthouse/performance/dom-size) (primary) (earlier maps)
- [developer.chrome.com: uses-passive-event-listeners](https://developer.chrome.com/docs/lighthouse/best-practices/uses-passive-event-listeners) (primary) (earlier maps)

**The web platform: compatibility data.**

- [webstatus.dev](https://webstatus.dev/) (primary), [MDN browser-compat-data](https://github.com/mdn/browser-compat-data) (primary), [caniuse.com: mdn-api_element_currentcsszoom](https://caniuse.com/mdn-api_element_currentcsszoom) (secondary), [caniuse.com: css-anchor-positioning](https://caniuse.com/css-anchor-positioning) (secondary) (earlier maps), [web-platform-dx.github.io: anchor-positioning](https://web-platform-dx.github.io/web-features-explorer/features/anchor-positioning/) (primary)
- webstatus.dev feature pages (primary): [customizable-select](https://webstatus.dev/features/customizable-select), [scroll-markers](https://webstatus.dev/features/scroll-markers), [scroll-marker-targets](https://webstatus.dev/features/scroll-marker-targets), [scroll-target-group](https://webstatus.dev/features/scroll-target-group), [scroll-initial-target](https://webstatus.dev/features/scroll-initial-target), [scroll-snap-events](https://webstatus.dev/features/scroll-snap-events), [container-scroll-state-queries](https://webstatus.dev/features/container-scroll-state-queries), [anchor-positioning](https://webstatus.dev/features/anchor-positioning), [container-anchor-position-queries](https://webstatus.dev/features/container-anchor-position-queries), [details-content](https://webstatus.dev/features/details-content), [starting-style](https://webstatus.dev/features/starting-style), [transition-behavior](https://webstatus.dev/features/transition-behavior), [field-sizing](https://webstatus.dev/features/field-sizing), [scope](https://webstatus.dev/features/scope), [nesting](https://webstatus.dev/features/nesting), [container-queries](https://webstatus.dev/features/container-queries), [container-style-queries](https://webstatus.dev/features/container-style-queries), [container-name-queries](https://webstatus.dev/features/container-name-queries), [overscroll-behavior](https://webstatus.dev/features/overscroll-behavior), [scrollbar-gutter](https://webstatus.dev/features/scrollbar-gutter), [overflow-clip](https://webstatus.dev/features/overflow-clip), [zoom](https://webstatus.dev/features/zoom), [overflow-anchor](https://webstatus.dev/features/overflow-anchor), [stretch](https://webstatus.dev/features/stretch), [sibling-count](https://webstatus.dev/features/sibling-count), [mixin](https://webstatus.dev/features/mixin), [shape-function](https://webstatus.dev/features/shape-function), [light-dark](https://webstatus.dev/features/light-dark), [light-dark-image](https://webstatus.dev/features/light-dark-image), [contrast-color](https://webstatus.dev/features/contrast-color), [color-mix](https://webstatus.dev/features/color-mix), [relative-color](https://webstatus.dev/features/relative-color), [alpha](https://webstatus.dev/features/alpha), [progress-function](https://webstatus.dev/features/progress-function), [round-mod-rem](https://webstatus.dev/features/round-mod-rem), [registered-custom-properties](https://webstatus.dev/features/registered-custom-properties), [scroll-driven-animations](https://webstatus.dev/features/scroll-driven-animations), [view-transitions](https://webstatus.dev/features/view-transitions), [view-transition-class](https://webstatus.dev/features/view-transition-class), [active-view-transition](https://webstatus.dev/features/active-view-transition), [view-transitions-element-scoped](https://webstatus.dev/features/view-transitions-element-scoped), [text-wrap-balance](https://webstatus.dev/features/text-wrap-balance), [font-size-adjust](https://webstatus.dev/features/font-size-adjust), [page-setup](https://webstatus.dev/features/page-setup), [page-breaks](https://webstatus.dev/features/page-breaks), [print-color-adjust](https://webstatus.dev/features/print-color-adjust), [scripting](https://webstatus.dev/features/scripting), [prefers-reduced-transparency](https://webstatus.dev/features/prefers-reduced-transparency), [prefers-contrast](https://webstatus.dev/features/prefers-contrast), [forced-colors](https://webstatus.dev/features/forced-colors), [requestclose](https://webstatus.dev/features/requestclose), [invoker-commands](https://webstatus.dev/features/invoker-commands), [interest-invokers](https://webstatus.dev/features/interest-invokers), [popover](https://webstatus.dev/features/popover), [open-pseudo](https://webstatus.dev/features/open-pseudo), [toggleevent-source](https://webstatus.dev/features/toggleevent-source), [details-name](https://webstatus.dev/features/details-name), [search](https://webstatus.dev/features/search), [loading-lazy](https://webstatus.dev/features/loading-lazy), [loading-lazy-media](https://webstatus.dev/features/loading-lazy-media), [fetch-priority](https://webstatus.dev/features/fetch-priority), [inert](https://webstatus.dev/features/inert), [user-pseudos](https://webstatus.dev/features/user-pseudos), [show-picker-input](https://webstatus.dev/features/show-picker-input), [show-picker-select](https://webstatus.dev/features/show-picker-select), [switch-control](https://webstatus.dev/features/switch-control), [autocorrect](https://webstatus.dev/features/autocorrect), [intl-duration-format](https://webstatus.dev/features/intl-duration-format), [intl-locale-info](https://webstatus.dev/features/intl-locale-info), [iterator-methods](https://webstatus.dev/features/iterator-methods), [iterator-concat](https://webstatus.dev/features/iterator-concat), [set-methods](https://webstatus.dev/features/set-methods), [regexp-escape](https://webstatus.dev/features/regexp-escape), [uint8array-base64-hex](https://webstatus.dev/features/uint8array-base64-hex), [math-sum-precise](https://webstatus.dev/features/math-sum-precise), [structured-clone](https://webstatus.dev/features/structured-clone), [import-maps](https://webstatus.dev/features/import-maps), [json-modules](https://webstatus.dev/features/json-modules), [css-modules](https://webstatus.dev/features/css-modules), [text-modules](https://webstatus.dev/features/text-modules), [top-level-await](https://webstatus.dev/features/top-level-await), [parse-html-unsafe](https://webstatus.dev/features/parse-html-unsafe), [trusted-types](https://webstatus.dev/features/trusted-types), [navigation](https://webstatus.dev/features/navigation), [urlpattern](https://webstatus.dev/features/urlpattern), [move-before](https://webstatus.dev/features/move-before), [contenteditable-plaintextonly](https://webstatus.dev/features/contenteditable-plaintextonly), [composed-ranges](https://webstatus.dev/features/composed-ranges), [highlight](https://webstatus.dev/features/highlight), [document-caretpositionfrompoint](https://webstatus.dev/features/document-caretpositionfrompoint), [intersection-observer](https://webstatus.dev/features/intersection-observer), [content-visibility](https://webstatus.dev/features/content-visibility), [avif](https://webstatus.dev/features/avif), [cookie-store](https://webstatus.dev/features/cookie-store), [web-locks](https://webstatus.dev/features/web-locks), [broadcast-channel](https://webstatus.dev/features/broadcast-channel), [origin-private-file-system](https://webstatus.dev/features/origin-private-file-system), [file-system-access](https://webstatus.dev/features/file-system-access), [arianotify](https://webstatus.dev/features/arianotify), [scroll-promises](https://webstatus.dev/features/scroll-promises), [compression-streams](https://webstatus.dev/features/compression-streams), [scrollend](https://webstatus.dev/features/scrollend), [largest-contentful-paint](https://webstatus.dev/features/largest-contentful-paint), [zstd](https://webstatus.dev/features/zstd), [scrollbar-color](https://webstatus.dev/features/scrollbar-color), [text-indent-hanging](https://webstatus.dev/features/text-indent-hanging).
- MDN browser-compat-data files (primary): [css/properties/appearance](https://github.com/mdn/browser-compat-data/blob/main/css/properties/appearance.json), [css/selectors/scroll-button](https://github.com/mdn/browser-compat-data/blob/main/css/selectors/scroll-button.json), [css/selectors/target-current](https://github.com/mdn/browser-compat-data/blob/main/css/selectors/target-current.json), [css/at-rules/container](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/container.json), [css/properties/position-try-fallbacks](https://github.com/mdn/browser-compat-data/blob/main/css/properties/position-try-fallbacks.json), [css/properties/position-anchor](https://github.com/mdn/browser-compat-data/blob/main/css/properties/position-anchor.json), [css/types/anchor-size](https://github.com/mdn/browser-compat-data/blob/main/css/types/anchor-size.json), [css/properties/interpolate-size](https://github.com/mdn/browser-compat-data/blob/main/css/properties/interpolate-size.json), [css/properties/reading-flow](https://github.com/mdn/browser-compat-data/blob/main/css/properties/reading-flow.json), [css/properties/display](https://github.com/mdn/browser-compat-data/blob/main/css/properties/display.json), [css/properties/overflow-clip-margin](https://github.com/mdn/browser-compat-data/blob/main/css/properties/overflow-clip-margin.json), [css/types/if](https://github.com/mdn/browser-compat-data/blob/main/css/types/if.json), [css/types/attr](https://github.com/mdn/browser-compat-data/blob/main/css/types/attr.json), [css/at-rules/function](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/function.json), [css/properties/corner-shape](https://github.com/mdn/browser-compat-data/blob/main/css/properties/corner-shape.json), [css/types/random](https://github.com/mdn/browser-compat-data/blob/main/css/types/random.json), [css/properties/animation-trigger](https://github.com/mdn/browser-compat-data/blob/main/css/properties/animation-trigger.json), [api/ViewTransition](https://github.com/mdn/browser-compat-data/blob/main/api/ViewTransition.json), [css/at-rules/view-transition](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/view-transition.json), [html/elements/link](https://github.com/mdn/browser-compat-data/blob/main/html/elements/link.json), [css/properties/view-transition-group](https://github.com/mdn/browser-compat-data/blob/main/css/properties/view-transition-group.json), [css/properties/text-wrap](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-wrap.json), [css/properties/text-fit](https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-fit.json), [css/properties/hanging-punctuation](https://github.com/mdn/browser-compat-data/blob/main/css/properties/hanging-punctuation.json), [css/properties/initial-letter](https://github.com/mdn/browser-compat-data/blob/main/css/properties/initial-letter.json), [css/properties/dynamic-range-limit](https://github.com/mdn/browser-compat-data/blob/main/css/properties/dynamic-range-limit.json), [css/at-rules/page](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/page.json), [html/elements/dialog](https://github.com/mdn/browser-compat-data/blob/main/html/elements/dialog.json), [api/HTMLButtonElement](https://github.com/mdn/browser-compat-data/blob/main/api/HTMLButtonElement.json), [html/global_attributes](https://github.com/mdn/browser-compat-data/blob/main/html/global_attributes.json), [html/elements/details](https://github.com/mdn/browser-compat-data/blob/main/html/elements/details.json), [html/elements/script](https://github.com/mdn/browser-compat-data/blob/main/html/elements/script.json), [html/elements/img](https://github.com/mdn/browser-compat-data/blob/main/html/elements/img.json), [javascript/builtins/Temporal](https://github.com/mdn/browser-compat-data/blob/main/javascript/builtins/Temporal.json), [javascript/operators/import_meta](https://github.com/mdn/browser-compat-data/blob/main/javascript/operators/import_meta.json), [api/Sanitizer](https://github.com/mdn/browser-compat-data/blob/main/api/Sanitizer.json), [api/Scheduler](https://github.com/mdn/browser-compat-data/blob/main/api/Scheduler.json), [api/Window](https://github.com/mdn/browser-compat-data/blob/main/api/Window.json), [api/CloseWatcher](https://github.com/mdn/browser-compat-data/blob/main/api/CloseWatcher.json), [api/EditContext](https://github.com/mdn/browser-compat-data/blob/main/api/EditContext.json), [api/ContentVisibilityAutoStateChangeEvent](https://github.com/mdn/browser-compat-data/blob/main/api/ContentVisibilityAutoStateChangeEvent.json).

**The web platform: references and guides.**

- [ckeditor.com: ContentEditable-The-Good-the-Bad-and-the-Ugly](https://ckeditor.com/blog/ContentEditable-The-Good-the-Bad-and-the-Ugly/) (secondary) (earlier maps)
- [2026.stateofcss.com: en-US](https://2026.stateofcss.com/en-US/) (secondary)
- [developer.mozilla.org: requestSubmit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit) (primary)
- [developer.mozilla.org: date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date) (primary)
- [developer.mozilla.org: HTML_Sanitizer_API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API) (primary)
- [developer.mozilla.org: decode](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode) (primary)
- [phoronix.com: Firefox-JPEG-XL-2026-Plans](https://www.phoronix.com/news/Firefox-JPEG-XL-2026-Plans) (secondary)
- [developer.mozilla.org: ::scroll-marker](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker) (primary) (earlier maps)
- [developer.mozilla.org: details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) (primary) (earlier maps)
- [w3.org: tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) (primary) (earlier maps)
- [developer.mozilla.org: dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) (primary) (earlier maps)
- [blog.logrocket.com: comparing-popover-api-dialog-element](https://blog.logrocket.com/comparing-popover-api-dialog-element/) (secondary) (earlier maps)
- [polypane.app: getting-stuck-all-the-ways-position-sticky-can-fail](https://polypane.app/blog/getting-stuck-all-the-ways-position-sticky-can-fail/) (secondary) (earlier maps)
- [developer.mozilla.org: CSS_grid_layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) (primary) (earlier maps)
- [developer.mozilla.org: Container_queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) (primary) (earlier maps)
- [developer.mozilla.org: :has](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) (primary) (earlier maps)
- [developer.mozilla.org: light-dark](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) (primary) (earlier maps)
- [developer.mozilla.org: picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) (primary) (earlier maps)
- [developer.mozilla.org: Scroll-driven_animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) (primary) (earlier maps)
- [developer.mozilla.org: View_Transition_API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) (primary) (earlier maps)
- [css-tricks.com: using-abortcontroller-as-an-alternative-for-removing-event-listeners](https://css-tricks.com/using-abortcontroller-as-an-alternative-for-removing-event-listeners/) (secondary) (earlier maps)
- [developer.mozilla.org: randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) (primary) (earlier maps)
- [developer.mozilla.org: Customizable_select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) (primary) (earlier maps)

**Source code read (code, 11 October 2026).**

- Webstudio: [pubsub/create.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/pubsub/create.ts), [pubsub/raf-queue.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/pubsub/raf-queue.ts), [sync/sync-stores.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/sync/sync-stores.ts), [shared/sync-client.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/sync-client.ts), [shared/styles.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/shared/styles.ts), [canvas/interceptor.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/interceptor.ts), [canvas-tools/outline](https://github.com/webstudio-is/webstudio/tree/main/apps/builder/app/builder/features/workspace/canvas-tools/outline), [canvas/selected-instance-effects.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/selected-instance-effects.ts), [canvas/instance-hovering.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/instance-hovering.ts), [dnd/README.md](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/primitives/dnd/README.md), [dnd/geometry-utils.ts](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/primitives/dnd/geometry-utils.ts), [shared/use-drag-drop.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/shared/use-drag-drop.ts), [webstudio-is/immerhin](https://github.com/webstudio-is/immerhin), [sync/multiplayer-sync.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/sync/multiplayer-sync.ts), [shared/awareness.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/awareness.ts), [schema/instances.ts](https://github.com/webstudio-is/webstudio/blob/main/packages/sdk/src/schema/instances.ts), [schema/styles.ts](https://github.com/webstudio-is/webstudio/blob/main/packages/sdk/src/schema/styles.ts), [schema/breakpoints.ts](https://github.com/webstudio-is/webstudio/blob/main/packages/sdk/src/schema/breakpoints.ts), [src/css.ts](https://github.com/webstudio-is/webstudio/blob/main/packages/sdk/src/css.ts), [core/atomic.ts](https://github.com/webstudio-is/webstudio/blob/main/packages/css-engine/src/core/atomic.ts), [text-editor/text-editor.tsx](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/features/text-editor/text-editor.tsx), [text-editor/interop.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/canvas/features/text-editor/interop.ts), [instance-utils/slot.ts](https://github.com/webstudio-is/webstudio/blob/main/apps/builder/app/shared/instance-utils/slot.ts), [components/tree.tsx](https://github.com/webstudio-is/webstudio/blob/main/packages/design-system/src/components/tree.tsx), [ssg/package.json](https://github.com/webstudio-is/webstudio/blob/main/packages/cli/templates/ssg/package.json).
- Puck: [AutoFrame/index.tsx](https://github.com/puckeditor/puck/blob/main/packages/core/components/AutoFrame/index.tsx), [slices/nodes.ts](https://github.com/puckeditor/puck/blob/main/packages/core/store/slices/nodes.ts), [DraggableComponent/index.tsx](https://github.com/puckeditor/puck/blob/main/packages/core/components/DraggableComponent/index.tsx), [overlay-portal/index.tsx](https://github.com/puckeditor/puck/blob/main/packages/core/lib/overlay-portal/index.tsx), [core/package.json](https://github.com/puckeditor/puck/blob/main/packages/core/package.json), [dnd/collision](https://github.com/puckeditor/puck/tree/main/packages/core/lib/dnd/collision), [dnd/use-sensors.ts](https://github.com/puckeditor/puck/blob/main/packages/core/lib/dnd/use-sensors.ts), [slices/history.ts](https://github.com/puckeditor/puck/blob/main/packages/core/store/slices/history.ts), [reducer/index.ts](https://github.com/puckeditor/puck/blob/main/packages/core/reducer/index.ts), [lib/generate-id.ts](https://github.com/puckeditor/puck/blob/main/packages/core/lib/generate-id.ts), [lib/migrate.ts](https://github.com/puckeditor/puck/blob/main/packages/core/lib/migrate.ts), [lib/transform-props.ts](https://github.com/puckeditor/puck/blob/main/packages/core/lib/transform-props.ts), [RichTextMenu/controls](https://github.com/puckeditor/puck/tree/main/packages/core/components/RichTextMenu/controls), [InlineTextField/index.tsx](https://github.com/puckeditor/puck/blob/main/packages/core/components/InlineTextField/index.tsx).
- GrapesJS: [view/FrameView.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/canvas/view/FrameView.ts), [view/CanvasView.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/canvas/view/CanvasView.ts), [view/SelectComponent.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/commands/view/SelectComponent.ts), [utils/sorter](https://github.com/GrapesJS/grapesjs/tree/dev/packages/core/src/utils/sorter), [undo_manager/index.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/undo_manager/index.ts), [model/CssRule.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/css_composer/model/CssRule.ts), [config/config.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/editor/config/config.ts), [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs), [model/RichTextEditor.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/rich_text_editor/model/RichTextEditor.ts), [model/Component.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/dom_components/model/Component.ts), [model/SymbolUtils.ts](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/src/dom_components/model/SymbolUtils.ts).
- Gutenberg: [iframe/index.jsx](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/iframe/index.jsx), [block-list/content.scss](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/block-list/content.scss), [block-popover/index.jsx](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/block-popover/index.jsx), [block-popover/use-popover-scroll.js](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/block-popover/use-popover-scroll.js), [gutenberg PR #58202](https://github.com/WordPress/gutenberg/pull/58202), [src/index.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/undo-manager/src/index.ts), [src/actions.js](https://github.com/WordPress/gutenberg/blob/trunk/packages/core-data/src/actions.js), [store/actions.js](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/store/actions.js), [src/undo-manager.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/sync/src/undo-manager.ts), [sync/package.json](https://github.com/WordPress/gutenberg/blob/trunk/packages/sync/package.json), [http-polling/README.md](https://github.com/WordPress/gutenberg/blob/trunk/packages/sync/src/providers/http-polling/README.md), [parser/apply-block-deprecated-versions.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/parser/apply-block-deprecated-versions.ts), [src/create.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/rich-text/src/create.ts), [raw-handling/paste-handler.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/raw-handling/paste-handler.ts), [dom/clean-node-list.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/dom/src/dom/clean-node-list.ts), [src/phrasing-content.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/dom/src/phrasing-content.ts), [block/block.json](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/block/block.json), [bindings/pattern-overrides.js](https://github.com/WordPress/gutenberg/blob/trunk/packages/editor/src/bindings/pattern-overrides.js), [api/registration.ts](https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/registration.ts), [list-view/index.jsx](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/list-view/index.jsx), [list-view/leaf.jsx](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/list-view/leaf.jsx), [tree-grid/index.tsx](https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/tree-grid/index.tsx), [navigable-toolbar/index.jsx](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/navigable-toolbar/index.jsx), [keyboard-shortcuts/index.js](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/keyboard-shortcuts/index.js), [blocks/README.md](https://github.com/WordPress/gutenberg/blob/trunk/test/integration/fixtures/blocks/README.md), [src/directives](https://github.com/WordPress/gutenberg/tree/trunk/packages/interactivity/src/directives), [interactivity/package.json](https://github.com/WordPress/gutenberg/blob/trunk/packages/interactivity/package.json), [gutenberg discussion 55642](https://github.com/WordPress/gutenberg/discussions/55642).
- Payload: [Window/index.tsx](https://github.com/payloadcms/payload/blob/main/packages/ui/src/elements/LivePreview/Window/index.tsx), [src/isLivePreviewEvent.ts](https://github.com/payloadcms/payload/blob/main/packages/live-preview/src/isLivePreviewEvent.ts), [src/mergeData.ts](https://github.com/payloadcms/payload/blob/main/packages/live-preview/src/mergeData.ts), [src/handleMessage.ts](https://github.com/payloadcms/payload/blob/main/packages/live-preview/src/handleMessage.ts).
- Sanity: [src/constants.ts](https://github.com/sanity-io/comlink/blob/main/packages/comlink/src/constants.ts), [sanity-io/comlink](https://github.com/sanity-io/comlink), [stega/stegaEncodeSourceMap.ts](https://github.com/sanity-io/client/blob/main/src/stega/stegaEncodeSourceMap.ts), [stega/filterDefault.ts](https://github.com/sanity-io/client/blob/main/src/stega/filterDefault.ts), [src/controller.ts](https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/src/controller.ts), [ui/renderVisualEditing.tsx](https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/src/ui/renderVisualEditing.tsx), [ui/cssAnchorPositioning.ts](https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/src/ui/cssAnchorPositioning.ts), [src/ui](https://github.com/sanity-io/visual-editing/tree/main/packages/visual-editing/src/ui).
- Storyblok: [src/editable.ts](https://github.com/storyblok/monoblok/blob/main/packages/js/src/editable.ts), [src/bridge.ts](https://github.com/storyblok/monoblok/blob/main/packages/js/src/bridge.ts), [src/onStoryblokEditorEvent.ts](https://github.com/storyblok/monoblok/blob/main/packages/live-preview/src/onStoryblokEditorEvent.ts), [migrations/src](https://github.com/storyblok/monoblok/tree/main/packages/migrations/src), [src/__test__](https://github.com/storyblok/monoblok/tree/main/packages/migrations/src/__test__).
- Tina: [src/react.tsx](https://github.com/tinacms/tinacms/blob/main/packages/tinacms/src/react.tsx), [src/config.ts](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/bridge/src/config.ts), [src/island-refresh.ts](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/bridge/src/island-refresh.ts), [src/quick-edit-css.ts](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/bridge/src/quick-edit-css.ts).
- Builder.io: [components/builder-content.component.tsx](https://github.com/BuilderIO/builder/blob/main/packages/react/src/components/builder-content.component.tsx), [functions/apply-patch-with-mutation.ts](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/functions/apply-patch-with-mutation.ts), [components/enable-editor.lite.tsx](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/components/content/components/enable-editor.lite.tsx), [functions/is-from-trusted-host.ts](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/functions/is-from-trusted-host.ts), [scripts/init-editing.ts](https://github.com/BuilderIO/builder/blob/main/packages/sdks/src/scripts/init-editing.ts).
- Onlook: [script/index.ts](https://github.com/onlook-dev/onlook/blob/main/apps/web/preload/script/index.ts), [canvas/overlay](https://github.com/onlook-dev/onlook/tree/main/apps/web/client/src/app/project/%5Bid%5D/_components/canvas/overlay), [editor/history](https://github.com/onlook-dev/onlook/tree/main/apps/web/client/src/components/store/editor/history), [style/css-manager.ts](https://github.com/onlook-dev/onlook/blob/main/apps/web/preload/script/api/style/css-manager.ts).
- Directus: [lib/directus-frame.ts](https://github.com/directus/visual-editing/blob/main/src/lib/directus-frame.ts), [lib/editable-element.ts](https://github.com/directus/visual-editing/blob/main/src/lib/editable-element.ts).
- Craft.js: [events/DefaultEventHandlers.ts](https://github.com/prevwong/craft.js/blob/main/packages/core/src/events/DefaultEventHandlers.ts), [events/findPosition.ts](https://github.com/prevwong/craft.js/blob/main/packages/core/src/events/findPosition.ts), [src/History.ts](https://github.com/prevwong/craft.js/blob/main/packages/utils/src/History.ts), [interfaces/nodes.ts](https://github.com/prevwong/craft.js/blob/main/packages/core/src/interfaces/nodes.ts).
- Plasmic: [client/undo-log.ts](https://github.com/plasmicapp/plasmic/blob/master/platform/wab/src/wab/client/undo-log.ts), [model/model-schema.ts](https://github.com/plasmicapp/plasmic/blob/master/platform/wab/src/wab/shared/model/model-schema.ts), [server/bundle-migrations](https://github.com/plasmicapp/plasmic/tree/master/platform/wab/src/wab/server/bundle-migrations).
- Keystatic: [app/updating.tsx](https://github.com/Thinkmill/keystatic/blob/main/packages/keystatic/src/app/updating.tsx).
- Decap: [EditorPreviewPane/EditorPreviewPane.js](https://github.com/decaporg/decap-cms/blob/main/packages/decap-cms-core/src/components/Editor/EditorPreviewPane/EditorPreviewPane.js), [src/API.ts](https://github.com/decaporg/decap-cms/blob/main/packages/decap-cms-backend-github/src/API.ts).
- Pages CMS: [\[path\]/route.ts](https://github.com/pages-cms/pages-cms/blob/main/app/api/%5Bowner%5D/%5Brepo%5D/%5Bbranch%5D/files/%5Bpath%5D/route.ts).
- Silex: [grapesjs-plugins/grapesjs-css-variables](https://github.com/silexlabs/Silex/tree/main/grapesjs-plugins/grapesjs-css-variables), [src/publish.rs](https://github.com/silexlabs/Silex/blob/main/server-rust/src/publish.rs), [src/history.rs](https://github.com/silexlabs/Silex/blob/main/server-rust/src/history.rs).
- Ghost Koenig: [src/generate-decorator-node.ts](https://github.com/TryGhost/Koenig/blob/main/packages/kg-default-nodes/src/generate-decorator-node.ts), [src/visibility.ts](https://github.com/TryGhost/Koenig/blob/main/packages/kg-default-nodes/src/visibility.ts), [plugins/KoenigBehaviourPlugin.tsx](https://github.com/TryGhost/Koenig/blob/main/packages/koenig-lexical/src/plugins/KoenigBehaviourPlugin.tsx), [src/clean-basic-html.ts](https://github.com/TryGhost/Koenig/blob/main/packages/kg-clean-basic-html/src/clean-basic-html.ts), [packages/kg-lexical-html-renderer](https://github.com/TryGhost/Koenig/tree/main/packages/kg-lexical-html-renderer).
- Penpot: [files/migrations.cljc](https://github.com/penpot/penpot/blob/develop/common/src/app/common/files/migrations.cljc), [types/token.cljc](https://github.com/penpot/penpot/blob/develop/common/src/app/common/types/token.cljc), [types/tokens_lib.cljc](https://github.com/penpot/penpot/blob/develop/common/src/app/common/types/tokens_lib.cljc).
- tldraw: [SnapManager/SnapManager.ts](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/SnapManager.ts), [SnapManager/BoundsSnaps.ts](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/SnapManager/BoundsSnaps.ts), [HistoryManager/HistoryManager.ts](https://github.com/tldraw/tldraw/blob/main/packages/editor/src/lib/editor/managers/HistoryManager/HistoryManager.ts), [lib/TLSyncRoom.ts](https://github.com/tldraw/tldraw/blob/main/packages/sync-core/src/lib/TLSyncRoom.ts), [worker/TldrawDurableObject.ts](https://github.com/tldraw/tldraw/blob/main/templates/sync-cloudflare/worker/TldrawDurableObject.ts), [lib/migrate.ts](https://github.com/tldraw/tldraw/blob/main/packages/store/src/lib/migrate.ts), [test/syncFuzz.test.ts](https://github.com/tldraw/tldraw/blob/main/packages/sync-core/src/test/syncFuzz.test.ts).
- Excalidraw: [excalidraw/snapping.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/snapping.ts), [src/constants.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/common/src/constants.ts), [src/store.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/element/src/store.ts), [excalidraw/history.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/history.ts), [data/reconcile.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/data/reconcile.ts).
- Shopify Horizon: [Shopify/horizon](https://github.com/Shopify/horizon).
- Twenty Twenty-Five: [WordPress/twentytwentyfive](https://github.com/WordPress/twentytwentyfive).
- ProseMirror: [ProseMirror/prosemirror-model](https://github.com/ProseMirror/prosemirror-model).

**Builders' documentation, engineering posts and articles.**

- [builder.io: how-builder-works-technical](https://www.builder.io/c/docs/how-builder-works-technical) (primary) (earlier maps)
- [astro.build: goodbye-astro-studio](https://astro.build/blog/goodbye-astro-studio/) (primary) (earlier maps)
- [inspiredmonks.com: bricks-builder-vs-elementor-performance-2026](https://inspiredmonks.com/bricks-builder-vs-elementor-performance-2026/) (secondary) (earlier maps)
- [grapesjs.com: meet-studio-sdk](https://grapesjs.com/blog/meet-studio-sdk) (primary)
- [make.wordpress.org: iframed-editor-changes-in-wordpress-7-0](https://make.wordpress.org/core/2026/02/24/iframed-editor-changes-in-wordpress-7-0/) (primary)
- [payloadcms.com: live-preview/server](https://payloadcms.com/docs/live-preview/server) (primary)
- [statamic.dev: live-preview](https://statamic.dev/live-preview) (primary)
- [cvefeed.io: CVE-2026-33884](https://cvefeed.io/vuln/detail/CVE-2026-33884) (secondary)
- [alternativeto.net: framer-introduces-on-page-editing-for-live-content-updates-and-new-cms-page-creation](https://alternativeto.net/news/2025/8/framer-introduces-on-page-editing-for-live-content-updates-and-new-cms-page-creation/) (secondary) (earlier maps)
- [docs.astro.build: keystatic](https://docs.astro.build/en/guides/cms/keystatic/) (primary) (earlier maps)
- [engineering.squarespace.com: developing-fluid-engine](https://engineering.squarespace.com/blog/2022/developing-fluid-engine) (primary) (earlier maps)
- [support.wix.com: studio-editor-choosing-between-flexbox-based-and-grid-based-tools](https://support.wix.com/en/article/studio-editor-choosing-between-flexbox-based-and-grid-based-tools) (primary) (earlier maps)
- [silex.me](https://www.silex.me/) (primary) (earlier maps)
- [github.com: silexlabs/silex-cms](https://github.com/silexlabs/silex-cms) (primary) (earlier maps)
- [help.webflow.com: 33961319255059-Webflow-canvas-overview](https://help.webflow.com/hc/en-us/articles/33961319255059-Webflow-canvas-overview) (primary) (earlier maps)
- [webflow.com: interactions-animations](https://webflow.com/feature/interactions-animations) (primary) (earlier maps)
- [university.webflow.com: cms-and-dynamic-content](https://university.webflow.com/courses/cms-and-dynamic-content) (primary) (earlier maps)
- [tina.io](https://tina.io/) (primary) (earlier maps)
- [tina.io: tinacms-netlifycms-comparison](https://tina.io/tinacms-netlifycms-comparison) (primary) (earlier maps)
- [ghost.org: cards](https://ghost.org/help/cards/) (primary) (earlier maps)
- [make.wordpress.org: block-bindings-improvements-in-wordpress-6-9](https://make.wordpress.org/core/2025/11/12/block-bindings-improvements-in-wordpress-6-9/) (primary) (earlier maps)
- [docs.webstudio.is: slot](https://docs.webstudio.is/university/core-components/slot) (primary)
- [wppoland.com: gutenberg-blocks-patterns-full-site-editing-guide](https://wppoland.com/en/gutenberg-blocks-patterns-full-site-editing-guide/) (secondary) (earlier maps)
- [crocoblock.com: bricks-builder-vs-elementor](https://crocoblock.com/blog/bricks-builder-vs-elementor/) (secondary) (earlier maps)
- [framer.com: responsive-breakpoints](https://www.framer.com/blog/responsive-breakpoints/) (primary) (earlier maps)
- [framer.com: cms-components](https://www.framer.com/updates/cms-components) (primary) (earlier maps)
- [ghost.org: new-editor](https://ghost.org/changelog/new-editor/) (primary) (earlier maps)
- [docs.plasmic.app: data-code-components](https://docs.plasmic.app/learn/data-code-components/) (primary) (earlier maps)
- [plasmic.substack.com: data-queries-v2-full-rsc-support](https://plasmic.substack.com/p/data-queries-v2-full-rsc-support) (primary) (earlier maps)
- [astro.build: content-layer-deep-dive](https://astro.build/blog/content-layer-deep-dive/) (primary) (earlier maps)
- [developers.elementor.com: elementor-2-7-moving-sliders-from-slick-to-swiper](https://developers.elementor.com/elementor-2-7-moving-sliders-from-slick-to-swiper/) (primary) (earlier maps)
- [developers.elementor.com: elementor-3-26-developers-update](https://developers.elementor.com/elementor-3-26-developers-update/) (primary) (earlier maps)
- [support.wix.com: studio-editor-working-with-an-advanced-css-grid](https://support.wix.com/en/article/studio-editor-working-with-an-advanced-css-grid) (primary) (earlier maps)
- [support.wix.com: studio-editor-working-with-docking-margins-and-padding](https://support.wix.com/en/article/studio-editor-working-with-docking-margins-and-padding) (primary) (earlier maps)
- [motion.dev: react-scroll-animations](https://motion.dev/docs/react-scroll-animations) (primary) (earlier maps)
- [decapcms.org: editorial-workflows](https://decapcms.org/docs/editorial-workflows/) (primary) (earlier maps)
- [framer.com: how-to-use-branches-in-framer](https://www.framer.com/help/articles/how-to-use-branches-in-framer/) (primary)
- [framer.com: pricing](https://www.framer.com/pricing) (primary)
- [help.webflow.com: 33961355506195](https://help.webflow.com/hc/en-us/articles/33961355506195) (primary)
- [decapcms.org: deploy-preview-links](https://decapcms.org/docs/deploy-preview-links/) (primary) (earlier maps)
- [decapcms.org: open-authoring](https://decapcms.org/docs/open-authoring/) (primary) (earlier maps)
- [getpublii.com: release-044.html](https://getpublii.com/blog/release-044.html) (primary) (earlier maps)
- [getpublii.com: docs](https://getpublii.com/docs/) (primary) (earlier maps)
- [getpublii.com: the block editor](https://getpublii.com/docs/the-block-editor.html) (primary) (earlier maps)
- [creativeainews.com: framer-3-agents-explained-2026](https://www.creativeainews.com/articles/framer-3-agents-explained-2026/) (secondary)
- [techcrunch.com: wordpress-com-now-lets-ai-agents-write-and-publish-posts-and-more](https://www.techcrunch.com/2026/03/20/wordpress-com-now-lets-ai-agents-write-and-publish-posts-and-more/) (secondary)
- [theplusaddons.com: what-is-the-elementor-mcp](https://theplusaddons.com/blog/what-is-the-elementor-mcp/) (secondary)
- [dev.wix.com: about-element-size-changes-and-page-layout](https://dev.wix.com/docs/develop-websites-sdk/code-your-site/build-a-custom-frontend/page-elements/about-element-size-changes-and-page-layout) (primary) (earlier maps)
- [ghost.org: snippets](https://ghost.org/help/snippets/) (primary) (earlier maps)
- [support.wix.com: studio-editor-setting-the-sites-max-width](https://support.wix.com/en/article/studio-editor-setting-the-sites-max-width) (primary) (earlier maps)
- [framer.com: ai-credits-simpler-plans-and-lower-prices](https://www.framer.com/blog/ai-credits-simpler-plans-and-lower-prices/) (primary)
