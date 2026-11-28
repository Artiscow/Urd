# Amendments to ADR-0015: Redirects ownership - generated host file over a host-neutral data layer

The earlier wording of [ADR-0015](../0015-redirects-ownership.md), newest first. Each section names an amendment and holds the wording it replaced: the whole ADR as it stood, for the amendments made until 27 November 2026, and the decisions that changed, for those made since.

## Until 2026-11-03

Decisions 1 to 3 amended and decision 4 added 3 November 2026 (the list is `content/redirects.json`; `_redirects` is a user path publishing writes in a checked shape; the build is milestone 0.7.23 with the redirects offered where an address goes away; a file written by hand is read into the list first).

### ADR-0015: Redirects ownership - generated host file over a host-neutral data layer

Date: 5 August 2026. Status: accepted (the ownership; the build itself belongs to v0.7 with the SEO foundation package C3).

#### Context

301 redirects with a UI are standard across all the major builders (feature map C13), but the file that controls them at the host (`_redirects` on Cloudflare Pages) is host-specific and borders on Urd-owned files. The 0.6.9 gate was to decide ownership and form, without building anything: without a decision the field would either have cemented a lasting gap against the competitors (a purely user-owned file without a UI) or locked the data model to the Cloudflare format.

#### Decision

1. **A generated model with a host-neutral data layer.** The redirect data shall live in the content (site.json or a separate `content/redirects.json`; the form is decided during the build in v0.7: from-path, to-target, permanent/temporary). Publishing generates `_redirects` in the host's format at every publish, in the same way it already writes the `<slug>/index.html` routing copies. Only the generated output file is host-specific; other hosts can get their own generators later.
2. **`_redirects` is publishing-generated, not Urd-owned and not hand-edited.** It therefore appears in neither `ownedPaths` nor `userPaths`, the updater never touches it, and the ADR-0006 conflict (as with `_headers`, which the user hand-edits) does not arise. Until the build, `_redirects` remains in the publishing guard's DENY_EXACT, so nothing can write it in the meantime.
3. **The UI and the generator are built in v0.7 together with the SEO foundation package** (sitemap, robots, 404, canonical): the same genre, files generated at publish.

#### Consequences

- The data model remains host-neutral (the spirit of ADR-0003: an adapter-friendly boundary towards the host).
- When the build comes, `_redirects` must be moved from DENY_EXACT to publishing's write set in the same commit as the generator, and the completeness test in tests/guard.test.mjs will require an ownership class for it.
- Users who need redirects BEFORE v0.7 can add `_redirects` by hand via git; the file survives both publishing and updating untouched.
