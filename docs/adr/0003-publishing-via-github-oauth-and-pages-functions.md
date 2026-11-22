# ADR-0003: Publishing via GitHub OAuth and Cloudflare Pages Functions

**Status:** accepted (July 2026); the protection decision amended 18 October 2026 (publishing may delete a plugin's whole folder, never write in it), earlier text in [amended/](amended/0003-publishing-via-github-oauth-and-pages-functions-until-2026-10-18.md); the OAuth, protection and conflict decisions amended 20 November 2026 (signing out revokes the token, a page's copy is the repository's own index.html, and the undo of a publish sets back only what that publish changed), earlier text in [amended/](amended/0003-publishing-via-github-oauth-and-pages-functions-until-2026-11-20.md); the OAuth decision amended 23 November 2026 (a GitHub App per site, its sign-in renewed through the sign-in status), earlier text in [amended/](amended/0003-publishing-via-github-oauth-and-pages-functions-until-2026-11-23.md)

## Context

«Publish» is to be a single button in admin that turns the changes into a git commit - without the user having git installed, and without Urd operating a server. The pattern is validated in production in [ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF).

An OAuth App's `repo` and `public_repo` scopes cannot be narrowed to one repository: a sign-in reaches every repository the owner can, and an OAuth App without «Expire user access tokens» gives a token that lasts until it is revoked (the audit of 20 November 2026, S9). A GitHub App's sign-in reaches only the repositories it is installed on, with only the permissions it asks for, and lasts eight hours; the editors built on git that sign in with GitHub (Keystatic, TinaCloud, Pages CMS, Sveltia CMS) use one, Decap CMS an OAuth App.

## Decision

Small serverless functions (`template/functions/api/github/`) ship with the repo and are run by the host (Cloudflare Pages Functions):

- **Sign-in:** each site has a GitHub App of its own, installed on the site's repository alone and asking for its contents only. The login flow exchanges the GitHub code for a token *server-side*; the token is stored in an httpOnly Secure cookie and never reaches browser JS. The sign-in lasts eight hours and is renewed with the refresh token GitHub gives beside it, kept the same way and sent to the site's functions alone, never to its pages. Only the sign-in status renews it, once it falls due, and the editor asks for the status at that moment, before its other calls when it opens late and a little early before a publish or a save, one tab at a time: a renewal ends the old sign-in at GitHub, so several calls renewing at once would end each other's. An OAuth App goes through the same flow and stays for sites set up with one; one whose tokens expire is renewed the same way. Signing out expires the cookies and revokes the sign-in at GitHub, a renewable one renewed once and the new token revoked, so a copy of the cookies stops working too.
- **Commit:** one publish is ONE commit, created through the GitHub Git Data API.
- **Protection:** the `ALLOWED_LOGINS` allowlist is enforced in all mutating endpoints, and a **path allowlist** limits publishing to user data (content, media and the plugin index): Urd-owned code, configuration and headers are never written through publishing. A plugin's folder is the owner's code: publishing may delete it whole, so a plugin removed in the editor leaves the repo, and never writes in it, since a deletion cannot plant code. A page's routing copy (`<slug>/index.html`) is written from the `index.html` the repository holds, never from what the request sends, so a request cannot plant other HTML there. The allowlist lives in `functions/_lib/guard.js`; `_redirects` is governed by ADR-0015.
- **Conflict:** the editor can ask whether other people have published since load; `revert` does a forward revert of the last publish: a new commit that sets each file that publish changed back to how it stood before, and leaves every other file as it stands, so an Urd update or a change made by hand since is kept. History is never deleted.
- **No admin password:** editing locally is harmless (draft in localStorage); the gate is GitHub login + allowlist at commit.

## Consequences

- Zero operations, zero cost, and the security model is git ownership - the same one that governs the repo otherwise.
- A sign-in that leaks reaches the site's repository alone, for at most eight hours unless its refresh token leaks with it; an OAuth App's still reaches every repository the owner can.
- Setting up a site takes one step more than with an OAuth App: the app is installed on the repository after it is created.
- A hijacked editor session cannot plant code (path allowlist); at most it can delete a plugin, which the history restores.
- The coupling is GitHub + Cloudflare specific; the `functions/_lib/` boundary is kept adapter-friendly so that GitLab/Gitea can be supported after v1.
