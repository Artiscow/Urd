# ADR-0003: Publishing via GitHub OAuth and Cloudflare Pages Functions

**Status:** accepted (July 2026); the protection decision amended 18 October 2026 (publishing may delete a plugin's whole folder, never write in it), earlier text in [amended/](amended/0003-publishing-via-github-oauth-and-pages-functions-until-2026-10-18.md)

## Context

«Publish» is to be a single button in admin that turns the changes into a git commit - without the user having git installed, and without Urd operating a server. The pattern is validated in production in [ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF).

## Decision

Small serverless functions (`template/functions/api/github/`) ship with the repo and are run by the host (Cloudflare Pages Functions):

- **OAuth:** the login flow exchanges the GitHub code for a token *server-side*; the token is stored in an httpOnly Secure cookie and never reaches browser JS.
- **Commit:** one publish is ONE commit, created through the GitHub Git Data API.
- **Protection:** the `ALLOWED_LOGINS` allowlist is enforced in all mutating endpoints, and a **path allowlist** limits publishing to user data (content, media and the plugin index): Urd-owned code, configuration and headers are never written through publishing. A plugin's folder is the owner's code: publishing may delete it whole, so a plugin removed in the editor leaves the repo, and never writes in it, since a deletion cannot plant code. The allowlist lives in `functions/_lib/guard.js`; `_redirects` is governed by ADR-0015.
- **Conflict:** the editor can ask whether other people have published since load; `revert` does a forward revert (a new commit with the previous tree - history is never deleted).
- **No admin password:** editing locally is harmless (draft in localStorage); the gate is GitHub login + allowlist at commit.

## Consequences

- Zero operations, zero cost, and the security model is git ownership - the same one that governs the repo otherwise.
- A hijacked editor session cannot plant code (path allowlist); at most it can delete a plugin, which the history restores.
- The coupling is GitHub + Cloudflare specific; the `functions/_lib/` boundary is kept adapter-friendly so that GitLab/Gitea can be supported after v1.
