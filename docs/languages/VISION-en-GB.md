# Vision

**🇬🇧 English** · [🇳🇴 Bokmål](../VISJON.md)

Translation of VISJON.md. Norwegian (bokmål) is canonical and prevails in case of discrepancies.

## What is Urd?

Urd is an open source website builder that challenges Squarespace, Wix and tools like Publii - with one fundamental difference: **Urd is both the website and the builder.**

You are not cloning a tool that *makes* a website. You clone your website, and it has the builder built in. Go to `yoursite.com/admin` and log in, and you are standing in full WYSIWYG editing of the actual page. Press «Publish», and the changes become a single git commit, and the static host serves the new page in under a minute.

Everything is static and git-owned. The default setup is GitHub + Cloudflare Pages, but any static host will do.

## The four promises

These are contracts, not ambitions. Every design decision in Urd must hold all four.

### 1. You own everything
Your site is a git repo with readable files: content as JSON, engine as handwritten JavaScript, images as files. No database, no service that can be shut down, no export function you have to trust - the repo *is* the export. Move it wherever you want, whenever you want.

### 2. An update never breaks a built site
All content carries a `version` field, and all block, section and background types define stepwise migrations that lift old data forward on load. A site built on Urd v1 survives a v2 block. Unknown content (for example a plugin that is missing) is shown as a neutral placeholder - **data is never dropped**. See [SKJEMA.md](../SKJEMA.md) and [ADR-0005](../adr/0005-versjonering-og-migrering.md).

### 3. The website needs no build process
What lies in the repo is exactly what the browser loads. No npm, no CI build, no «the build failed». Publishing is a commit; serving is file copying. (The Urd *developers* use build tools to make the editor, but the result is shipped prebuilt - see [ADR-0002](../adr/0002-svelte-for-editor-lesbar-js-for-motor.md).)

### 4. WYSIWYG without compromise
Admin shows the real page - the same engine, the same files that visitors load, in an iframe that receives your drafts continuously. The preview cannot drift from production, because it *is* production.

## Who is Urd for?

**Primarily: non-technical editors in small organisations** - student associations, sports clubs, small businesses, congregations. People who today pay for Squarespace or depend on «the one who knows computers». After the initial setup, an editor should be able to build and maintain the entire site from admin, without seeing a line of code.

**Secondarily: developers** who set up the site for someone else, build plugins and templates, or contribute to Urd itself.

The experience behind Urd comes from exactly this: a student association site ([ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF)) with built-in git-based admin, which worked - but which took a long time to build and is hard to repeat for the next association. Urd is the generalisation.

## What Urd is NOT

- **No server.** Urd has no backend to operate. (Publishing uses small serverless functions at the host - they are part of the repo and require zero operation.)
- **No database.** All content is files in git. Your history is the git log.
- **No subscription.** Free forever; the hosts used have generous free tiers.
- **No app platform.** Urd builds content sites, not web applications. Dynamics (calendars, forms) come as plugins with external data sources - not as server code in Urd.

## The editing model in brief

A page is a vertical series of **sections**. Sections can be created from **presets** (hero, image gallery, footer, …) or built from a blank canvas, and can be scaled and moved freely. Inside each section you place **blocks** - text, images, buttons, lines, circles, logos - freely on a snap grid you control yourself, with full control over size, placement and layer. Backgrounds are layer stacks: colour/gradient (also animated), glow, image, grain.

Because the freedom is great, Urd takes responsibility for what the Wix model struggles with: when you change the desktop layout in a section where you have hand-adjusted the mobile layout, Urd flags the section with «mobile needs attention» until you have reviewed it. See [SKJEMA.md](../SKJEMA.md#mobil-tilsyn).

Your own sections can be saved as **templates** and shared as **plugins** - plugins can deliver blocks, section presets, backgrounds, animations and templates, and are subject to the same migration contract as the core.
