# Comparison: Urd against the other website builders

This folder holds Urd's maps of the field: what the other website builders offer, how they offer and build it, what modern sites look like, and what Urd takes from it. BACKLOG.md asks for the maps to be read before each phase starts («HUSK: Se /comparison før vi starter»); the recommendations here point to the backlog places they were sorted into, and [BACKLOG.md](../BACKLOG.md) owns their delivery status.

The maps replace `docs/sammenligning/` (FUNKSJONSKART, ELEMENTKART and LAERDOMMER, written 22 July to 3 October 2026). They were rewritten in English and refreshed on 11 October 2026 (commit 0.7.0.46).

## The files

| File | Answers | IDs |
|---|---|---|
| [FEATURES.md](FEATURES.md) | What the field offers and what Urd has, in 17 categories (from text editing to privacy, handover, AI and associations), and the full function catalogue: 647 rows of site and business functions at 26 builders and club platforms, and 346 rows of editor and design functions at 24 builders | C1-C139 |
| [ELEMENTS.md](ELEMENTS.md) | How features are offered in the editor (delivery patterns), the keyboard-shortcut sets of 19 builders against Urd's own, and the full element catalogue: 313 elements from 39 builders and the main component libraries, plus 14 found elsewhere or added since, each with its native build and Urd's status | E1-E42 |
| [DESIGN.md](DESIGN.md) | What modern sites look like in 2025-2026 (layout, typography, colour, surfaces, motion, backgrounds, imagery), how each pattern is built natively, what usability research says, and the patterns of association, club and event sites | D1-D64 |
| [CODE.md](CODE.md) | How the builders are built: the editors read from their source code, the published output measured, the web platform as of October 2026 with Baseline dates, publishing and deploy, and what Urd takes and does not take | T1-T116 |
| [SETTINGS.md](SETTINGS.md) | The settings every element offers in eleven open-source builders and block libraries, read from their source code, against Urd's: what every element can carry, and per element what Urd has, what it lacks and where that is placed | - |
| [SURVEYS.md](SURVEYS.md) | The dated surveys the ADRs and milestones cite, kept as decided | - |

## How the maps were made

**On 11 October 2026, nine research passes**, each recorded with its sources and dates:
1. The hosted builders, every feature category, as of October 2026: Framer 3.0, Webflow, Wix, Wix Studio and Wix Harmony, Squarespace with Finish Layer, WordPress 7.0 and 7.1, Elementor 4, Bricks 2, Divi 5, Shopify, Figma Sites, Ghost 6, Duda, Carrd, Tilda, Canva and the vibe-coding tools.
2. The source code of 21 open-source builders and editors, read file by file (the pass reports 22 of 24 requested; Statamic was read from its docs only): Webstudio, Puck, GrapesJS, Gutenberg, Payload, Sanity, Storyblok, TinaCMS, Builder.io, Onlook, Directus, Craft.js, Plasmic, Keystatic, Decap, Pages CMS, Silex, Ghost Koenig, Penpot, tldraw and Excalidraw.
3. The web platform at Chrome 155, Firefox 157 and Safari 27, with Baseline dates for every feature a builder engine touches.
4. The element catalogue across builders and component libraries, and the design patterns of 2025-2026 with usability research.
5. What the builders' published sites ship: 30 live pages from 15 builders measured (HTML, CSS, JavaScript, images, fonts, headers), with Urd's own demo as the baseline; Shopify Horizon and Twenty Twenty-Five read from source.
6. What associations need: the open-source Norwegian student association sites (Abakus, Online, echo, Samfundet, Hackerspace, Nabla), the club platforms (Spond, Rubic, StyreWeb, Checkin, WildApricot), board handover, and the Norwegian rules (universell utforming, GDPR, ekomloven § 3-15, markedsføringsloven § 15, the organisation number, Grasrotandelen).
7. Every element at 39 builders, enumerated from each vendor's own element list.
8. Every site and business function at 26 builders and club platforms, enumerated from plan comparison tables and feature pages.
9. Every editor and design function at 24 builders, with their keyboard-shortcut pages.

**On 19 October 2026, a tenth pass** deepened the function catalogue: the builders whose source lists in FEATURES.md and ELEMENTS.md carry that date were read function by function from their whole help-centre trees, plan tables and release notes, the functions were matched to the catalogue rows, and every row the pass touched, together with every row a delivery since 11 October changed, was recounted from engine 0.7.7. The demo pages of the same builders were measured again in a browser that day (CODE.md Part 3, dated per bullet). Those source lists name what was read.

**On 21 and 22 October 2026, an eleventh pass** read the settings every element offers from the source code of eleven open-source builders and block libraries (Gutenberg, Elementor, Webstudio, GrapesJS, Puck, Builder.io and Plasmic, and the block libraries Kadence Blocks, Spectra, Stackable and GenerateBlocks; Silex and Onlook hold no settings registry) into [SETTINGS.md](SETTINGS.md), with Huginn where an editor's link and anchor handling had to be traced through its bundled code. It then checked 768 rows of the two catalogues option by option against a fresh count of Urd's code and against those settings, the 538 marked Has, Partial or Planned and the 230 Missing rows that name a backlog place: 155 rows marked Has were only Partial, 69 Partial cells were rewritten to name what is missing or changed status, and 283 Where cells changed, with the missing options added to the backlog items they name. A verifier checked a sample of 60 decisions against the code and upheld 52, and the 92 rows in the groups it found weakest were decided again.

**Earlier work kept:** the feature comparison of 22-23 July 2026 and the element and lessons maps of 27 July 2026 (their facts are kept where still true and re-dated where research superseded them), and the surveys of 27 July to 3 October 2026 in [SURVEYS.md](SURVEYS.md).

## Source marks

Every claim about a builder, a library, a law or the platform carries a link and, where known, a date, marked by kind:

| Mark | Meaning |
|---|---|
| (primary) | The vendor's own pages, documentation, changelog or plan table; the law, the regulator or the standards body |
| (secondary) | A blog, a review, a news site or another third party |
| (code) | Read in the source code of the project named |
| (measured) | Measured on a live site on 11 October 2026, or on the date given beside it |
| (earlier survey, verified July 2026, no URL) | A fact the July 2026 map cross-checked against vendor documentation with three independent checkers, whose URL was not recorded |
| (earlier survey, no URL) or «earlier maps» | A fact kept from the maps of July to September 2026 whose source was not checked again; treat it as unverified until it is |
| unverified | A claim a research pass could not confirm, kept only where it matters, and never used to decide anything |

## IDs and status words

Each file has its own ID series: C in FEATURES.md (the old feature-map numbers C1-C26, C4b and C7b keep their meaning; new ones continue from C27), E in ELEMENTS.md, D in DESIGN.md and T in CODE.md. IDs are never renumbered or reused; a new recommendation takes the next free number in its file.

Every recommendation has one status:

| Status | Means |
|---|---|
| Taken | Sorted into the backlog; the backlog place is named (a milestone such as 0.7.23, a v0.8 item such as the Element round and its stage ER-A to ER-H, URGENT or Bugs) |
| Delivered | Built; the milestone or commit number is named, nothing more (CHANGELOG has the story) |
| Watch | Not ready; the gate that would make it ready is named (often a browser engine shipping a feature) |
| Not taken | Deliberately left out; the reason is named (it needs a server, a third party or a runtime library, or it works only on hover) |

A catalogue row's Urd status (FEATURES.md and ELEMENTS.md, Part 2) is «Has» only when every option the row lists, and its builders document, is in Urd as counted that day. Anything less is «Partial:», naming what Urd has and the missing part, and the Where names the place for that part, so the backlog can see it.

The same recommendation can appear in two files, seen from two sides: the command palette is C31 in FEATURES.md and E1 in ELEMENTS.md, the token contract T26 in CODE.md and D34 in DESIGN.md. The backlog points to the most specific one, and the map below names the canonical ID for every old number.

## Former numbers

The maps this folder replaces are cited by number in CHANGELOG, BACKLOG and the ADRs. Each old number maps to one canonical place:

| Old number | Now |
|---|---|
| FUNKSJONSKART C1-C26 (with C4b and C7b) | [FEATURES.md](FEATURES.md#recommendations), the same numbers |
| FUNKSJONSKART categories 1-13 and classes A-D | [FEATURES.md](FEATURES.md#former-numbers) |
| ELEMENTKART part 1 (1.1-1.10) | [ELEMENTS.md](ELEMENTS.md#part-1-delivery-patterns-how-features-are-offered), see its [Former numbers](ELEMENTS.md#former-numbers) |
| ELEMENTKART part 2 (2.1-2.6 and the support tiers) | [CODE.md](CODE.md#native-techniques) and [Ready, gate, watch](CODE.md#ready-gate-watch); see CODE.md's [Former numbers](CODE.md#former-numbers) |
| ELEMENTKART part 3 | [ELEMENTS.md](ELEMENTS.md#part-2-the-element-catalogue) |
| ELEMENTKART part 4 | [CODE.md](CODE.md#part-1-where-urd-already-hits) (the build side) and [ELEMENTS.md](ELEMENTS.md#urd-against-the-delivery-patterns) (the delivery side) |
| ELEMENTKART 5a.1, 5a.2, 5a.3, 5a.4 | E34, E35, E36, E37 |
| ELEMENTKART 5a.5, 5a.6, 5a.7, 5a.8, 5a.9 | E6, E2, E10, E1, E20 |
| ELEMENTKART 5a.10 | E18 and E19 |
| ELEMENTKART 5b.1, 5b.2 | T81 and T82, T83 |
| ELEMENTKART 5b.3, 5b.4 | T84 and T67, T85 and T108 |
| ELEMENTKART 5b.5, 5b.6 | T86, T46 (with T45 and T42) |
| ELEMENTKART 5b.7, 5b.8 | T34, T87 |
| ELEMENTKART 5b.9 | T107 (container queries, subgrid) and T88 (`:has()`) |
| ELEMENTKART part 6 | [CODE.md](CODE.md#old-way-bug-modern-fix) |
| ELEMENTKART part 7 | [CODE.md](CODE.md#not-ready-or-deliberately-not-taken) |
| ELEMENTKART «part 8» (cited by ADR-0011, never existed) | [CODE.md](CODE.md#not-ready-or-deliberately-not-taken) |
| LAERDOMMER part 1 | [CODE.md](CODE.md#part-1-where-urd-already-hits) |
| LAERDOMMER part 2 | The editor mechanisms in [CODE.md](CODE.md#part-2-the-editor-read-from-source-code); the dated surveys («§2») in [SURVEYS.md](SURVEYS.md) |
| LAERDOMMER part 3 | [CODE.md](CODE.md#part-3-the-generated-site-measured) |
| LAERDOMMER part 4 | [CODE.md](CODE.md#part-5-publishing-and-deploy) |
| LAERDOMMER 5.1 | T93, T94 and T95 |
| LAERDOMMER 5.2, 5.3, 5.4 | T4, T26, T97 and T31 |
| LAERDOMMER 5.5, 5.6, 5.7, 5.8 | T79, T53, T96, T33 |
| LAERDOMMER 5.9, 5.10, 5.11 | T54, T55, T106 |
| LAERDOMMER part 6 | [CODE.md](CODE.md#not-taken) |

## Refreshing the maps

1. Run the passes again, dated: the hosted builders, open-source source code, the platform, elements and design, the measured output, the associations and the rules, and the three enumerations.
2. Count «Urd today» again from the engine (`template/assets/engine/<version>/`), never from the earlier maps.
3. Check every Has row the round touches option by option against that count and against the settings in SETTINGS.md; anything short of every option is Partial, with the missing part named and placed.
4. Move what was delivered to the Closed tables with its milestone or commit number, and write nothing more about how it happened.
5. Check every Watch gate; a gate that has passed becomes a backlog item.
6. Sort new findings into BACKLOG, and into the roadmap where they change a phase (ROADMAP-en-GB.md and VEIKART.md in the same commit).
7. Keep every ID; new ones continue each series.
8. Add a new dated survey to SURVEYS.md as a section of its own; earlier surveys are never edited except for broken links.
9. Before the commit: no em dash anywhere, every link and anchor resolves, and every row in a table has a source.
