# ADR-0003: Publishing via GitHub OAuth and Cloudflare Pages Functions

**Status:** accepted (July 2026)

## Context

«Publish» is to be a single button in admin that turns the changes into a git commit - without the user having git installed, and without Urd operating a server. The pattern is validated in production in [ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF).

## Decision

Small serverless functions (`template/functions/api/github/`) ship with the repo and are run by the host (Cloudflare Pages Functions):

- **OAuth:** `login` → GitHub → `callback` exchanges the code for a token *server-side*; the token is stored in an httpOnly Secure cookie and never reaches browser JS.
- **Commit:** `commit` takes `{message, files:[{path,content,encoding}]}` and creates ONE commit via the GitHub Git Data API (blobs → tree → commit → ref).
- **Protection:** the `ALLOWED_LOGINS` allowlist is enforced in all mutating endpoints; the **path allowlist** means publishing can only write `content/**`, `media/**`, `plugins/plugins.json` - never `functions/**`, `admin/**`, `assets/engine/**`, `.github/**`, `_headers`, `urd.json`.
- **Conflict:** `latest?base=<sha>` reveals other people's publishes since load; `revert` does a forward revert (a new commit with the previous tree - history is never deleted).
- **No admin password:** editing locally is harmless (draft in localStorage); the gate is GitHub login + allowlist at commit.

## Consequences

- Zero operations, zero cost, and the security model is git ownership - the same one that governs the repo otherwise.
- A hijacked editor session cannot plant code (path allowlist).
- The coupling is GitHub + Cloudflare specific; the `functions/_lib/` boundary is kept adapter-friendly so that GitLab/Gitea can be supported after v1.
