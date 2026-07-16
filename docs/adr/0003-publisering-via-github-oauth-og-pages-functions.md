# ADR-0003: Publisering via GitHub OAuth og Cloudflare Pages Functions

**Status:** vedtatt (juli 2026)

## Kontekst

«Publiser» skal være én knapp i admin som gjør endringene til en git-commit - uten at brukeren har git installert, og uten at Urd drifter en server. Mønsteret er validert i produksjon i [ApeironLF](https://github.com/Apeiron-Linjeforening/ApeironLF).

## Beslutning

Små serverless-funksjoner (`template/functions/api/github/`) følger med repoet og kjøres av hosten (Cloudflare Pages Functions):

- **OAuth:** `login` → GitHub → `callback` bytter kode mot token *server-side*; tokenet lagres i en httpOnly Secure-cookie og når aldri nettleser-JS.
- **Commit:** `commit` tar `{message, files:[{path,content,encoding}]}` og lager ÉN commit via GitHub Git Data API (blobs → tre → commit → ref).
- **Vern:** `ALLOWED_LOGINS`-allowlist håndheves i alle muterende endepunkter; **sti-allowlist** gjør at publisering kun kan skrive `content/**`, `media/**`, `plugins/plugins.json` - aldri `functions/**`, `admin/**`, `assets/engine/**`, `.github/**`, `_headers`, `urd.json`.
- **Konflikt:** `latest?base=<sha>` avslører andres publiseringer siden innlasting; `revert` gjør forward-revert (ny commit med forrige tre - historikk slettes aldri).
- **Ingen admin-passord:** å redigere lokalt er ufarlig (utkast i localStorage); porten er GitHub-innlogging + allowlist ved commit.

## Konsekvenser

- Null drift, null kostnad, og sikkerhetsmodellen er git-eierskap - den samme som styrer repoet ellers.
- En kapret redaktørsesjon kan ikke plante kode (sti-allowlist).
- Koblingen er GitHub + Cloudflare-spesifikk; `functions/_lib/`-grensen holdes adapter-vennlig slik at GitLab/Gitea kan støttes etter v1.
