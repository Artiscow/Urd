# Oppsett av publisering (GitHub + Cloudflare Pages)

Denne guiden setter opp «Publiser»-knappen: at admin kan committe endringer til GitHub-repoet, som Cloudflare Pages så deployer. Dette er en engangsjobb per nettside og tar rundt ti minutter. (Mønsteret er validert i produksjon i ApeironLF.)

## Forutsetninger

- Nettsidens repo ligger på GitHub (for Urd-utvikling: selve Urd-repoet).
- En Cloudflare-konto (gratisnivået holder lenge).

## 1. Koble repoet til Cloudflare Pages

1. Cloudflare-dashbordet → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Velg repoet.
3. Under byggeinnstillinger:
   - **Build command:** (tomt - Urd har ikke byggesteg)
   - **Build output directory:** `/`
   - **Root directory:** `template` (i et rent klonet mal-repo der innholdet ligger i rot: la stå tomt)
4. Deploy. Siden er nå live på `<prosjekt>.pages.dev`, og `functions/`-mappen plukkes opp automatisk.

## 2. Lag en GitHub OAuth-app

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Fyll inn:
   - **Application name:** f.eks. «Urd publisering - Min forening»
   - **Homepage URL:** `https://<prosjekt>.pages.dev`
   - **Authorization callback URL:** `https://<prosjekt>.pages.dev/api/github/callback`
3. Opprett, og noter **Client ID**.
4. **Generate a new client secret**, og noter hemmeligheten (vises bare én gang).

Bruker du eget domene senere, oppdater begge URL-ene i OAuth-appen.

## 3. Sett miljøvariablene i Cloudflare

Pages-prosjektet → **Settings** → **Variables and Secrets** (Production):

| Variabel | Verdi | Type |
|---|---|---|
| `GITHUB_REPO` | `eier/repo`, f.eks. `minforening/nettside` | Tekst |
| `GITHUB_CLIENT_ID` | Fra OAuth-appen | Tekst |
| `GITHUB_CLIENT_SECRET` | Fra OAuth-appen | **Secret** |
| `GITHUB_BRANCH` | `main` (standard hvis utelatt) | Tekst |
| `GITHUB_SCOPE` | `public_repo` for offentlig repo, `repo` for privat | Tekst |
| `ALLOWED_LOGINS` | Kommaseparerte GitHub-brukernavn som får publisere | Tekst |

Redeploy etterpå (Deployments → siste → Retry deployment) så variablene tas i bruk.

## 4. Verifiser

1. Gå til `https://<prosjekt>.pages.dev/admin/` → «Logg inn med GitHub» → autoriser.
2. Brukernavnet ditt vises i topplinjen (⚠ foran betyr at du mangler `ALLOWED_LOGINS`-oppføring).
3. Endre en tekst, trykk **Publiser**. Etter et øyeblikk ligger commiten i repoet, og Cloudflare deployer den (~1 minutt).

## Sikkerhetsmodellen (kort)

- OAuth-tokenet byttes server-side og lagres i en httpOnly-cookie; det når aldri nettleser-JS.
- `ALLOWED_LOGINS` håndheves i alle muterende endepunkter, ikke bare i UI-et.
- Publisering kan kun skrive `content/**`, `media/**` og `plugins/plugins.json`. Kode (`functions/`, `admin/`, `assets/engine/`), workflows og sikkerhetsfiler er blokkert på serversiden, så en kapret redaktørsesjon ikke kan plante noe.
- Se [ADR-0003](adr/0003-publisering-via-github-oauth-og-pages-functions.md) for hele begrunnelsen.

## Lokal testing av publiseringslaget (Urd-utviklere)

```bash
cd template
# legg testverdier i .dev.vars (gitignorert, ALDRI committ ekte hemmeligheter):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=dittbrukernavn
npx wrangler pages dev . --port 8788
```

Da kjører både siden, admin og functions på `http://localhost:8788`. Full OAuth-innlogging krever en ekte OAuth-app med callback mot localhost, men 401/503-flytene og sti-vernet kan testes uten.

## Feilsøking

| Symptom | Sannsynlig årsak |
|---|---|
| «Publisering er ikke konfigurert: miljøvariabelen X mangler» (503) | Variabelen mangler i Cloudflare, eller deployen er eldre enn variabelen |
| «Ugyldig OAuth-state» ved innlogging | Callback-URL i OAuth-appen matcher ikke domenet, eller cookies blokkeres |
| «har ikke publiseringstilgang» (403) | Brukernavnet står ikke i `ALLOWED_LOGINS` (sjekk staving; feltet er case-ufølsomt) |
| «Kunne ikke committe til GitHub» (502) | Tokenet mangler scope (privat repo trenger `repo`), eller grenen har flyttet seg |
