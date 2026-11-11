# ADR-0032: Saved drafts on a branch of their own

Date: 11 November 2026
Status: Accepted. Builds on publishing through GitHub ([ADR-0003](0003-publishing-via-github-oauth-and-pages-functions.md)), whose functions write the repo for the signed-in owner, and on the drafts kept in the browser since v0.2. The two-button form was chosen on the «Not Published Yet» canvas on 8 November 2026 (BACKLOG 0.7.35), and the four open questions were answered on 11 November 2026.

## Context

A draft lives only in the browser that made it: another device cannot go on with the work, a browser cleared loses whatever is not published, and Publish sends the whole draft at once, so a part that is not ready holds back everything else. The «Not Published Yet» canvas chose Save beside Publish, each with its own count (Save what only this browser holds, Publish everything not live), the list of changes in bands by where each change stands (in this browser, saved, live), and a sheet whose ticks decide what goes while a part is marked for later.

Every commit to the site's branch is deployed (the repo is the website, [ADR-0004](0004-monorepo-with-template-folder.md)), so a saved draft written there would be served on the live site with the next publish, would stand in History as a publish, and would use one of the host's builds. Cloudflare Pages skips the build of a commit whose message begins with `[CF-Pages-Skip]` (or `[CI Skip]` and its variants), on any branch, and a project builds every branch by default.

## Decision

1. **Saved drafts live on one branch of their own, `urd-drafts`.** It holds an index and one file per part (a page, the site settings, the collections' list, a collection, the templates, the plugins, the redirects), written and read only through a function for the signed-in owner who may publish. Every commit on it begins with the skip marker, so it is never built or deployed, never reaches the live site and never stands in History. The site's branch is never written by a save, and the branch is made the first time something is saved. One branch serves the whole site; a branch per draft, published as a merge, waits for the work after v1.0.
2. **A page that is not live yet, kept back while the site settings go out, goes out hidden.** Its entry in the published site file is marked hidden, so the menu, the sitemap and its address leave it out, as for every hidden page. Publishing a page that is not live ticks the site settings with it, since its entry lives there. A page that is live can be kept back freely: its live version stays. A collection that is not live and the collections' list are tied the same way.
3. **A saved draft meets this browser's drafts part by part, and nothing is merged inside a part.** A part saved elsewhere and not changed here is taken in as the editor loads. Where this browser holds the same part and it differs, this browser's stays, and the part says it was saved on another device, when, with a way to use the saved one. Save asks before it writes over a saved part newer than the one this browser last saw.
4. **Save keeps one saved state of the work, with no names.** The named points the undo list plans are the undo list's own and stay in the browser; several named drafts side by side wait for the branch per draft.

## Consequences

- The branch's index and part files are the editor's own and nothing in `template/` reads them, so they are described in ARCHITECTURE.md, not in the site's data contract. A part file holds the browser's stored draft texts as they are, so a part taken in on another device is written where a reload would read it.
- On a public repo the saved drafts can be read by anyone, as everything in the repo can; the guide says so. A host project that builds preview branches would serve them at a preview address if a commit lacked the marker, so the setup guide also leaves `urd-drafts` out of the project's preview branches.
- The function makes few calls per save (the content travels inside the tree, as the updater's commit does), keeping well within a free host's limit on calls per request; a part too large for that is refused with its reason.
- Publishing takes a set of parts instead of all of them, and builds the site file it publishes from the draft with the kept-back pages that are not live marked hidden.
- A site with no publishing layer (the local server) has nothing to save to, and Save says so, as Publish does.
