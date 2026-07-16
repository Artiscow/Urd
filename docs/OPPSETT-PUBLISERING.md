# Oppsett av publisering (GitHub + Cloudflare Pages)

Denne guiden setter opp «Publiser»-knappen: at admin kan committe endringer til GitHub-repoet, som Cloudflare Pages så deployer. Dette er en engangsjobb per nettside og tar rundt ti minutter. (Mønsteret er validert i produksjon i ApeironLF.)

## Forutsetninger

- Nettsidens repo ligger på GitHub (for Urd-utvikling: selve Urd-repoet).
- En Cloudflare-konto (gratisnivået holder lenge).

## 1. Koble repoet til Cloudflare Pages

1. Cloudflare-dashbordet → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Velg repoet, og velg **prosjektnavn med omhu**: navnet blir adressen
   (`<navn>.pages.dev`), det deles globalt med alle Cloudflare-kunder (er navnet tatt,
   får du et tilfeldig suffiks), og det KAN IKKE endres senere - da må prosjektet
   slettes og opprettes på nytt. Kun små bokstaver, tall og bindestrek.
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

Gå til prosjektet → **Settings** → **Variables and Secrets** → **Add**.

Skjemaet har tre felter: **Type**, **Variable name** og **Value**.
Fyll inn nøyaktig som under. Lagre, og gjenta for alle seks:

1. Type: Text
   Navn: `GITHUB_REPO`
   Verdi: repoet det skal publiseres til. For denne siden: `Artiscow/Urd`

2. Type: Text
   Navn: `GITHUB_CLIENT_ID`
   Verdi: Client ID fra OAuth-appen (steg 2)

3. Type: **Secret**
   Navn: `GITHUB_CLIENT_SECRET`
   Verdi: hemmeligheten fra OAuth-appen (steg 2)

4. Type: Text
   Navn: `GITHUB_BRANCH`
   Verdi: `main`

5. Type: Text
   Navn: `GITHUB_SCOPE`
   Verdi: `public_repo` (offentlig repo) eller `repo` (privat repo)

6. Type: Text
   Navn: `ALLOWED_LOGINS`
   Verdi: GitHub-brukernavnene som får publisere, adskilt med komma. F.eks. `Artiscow`

7. Type: Text
   Navn: `GITHUB_ROOT_DIR`
   Verdi: undermappen i repoet som er nettsidens rot, altså samme verdi som
   «Root directory» i steg 1. For Urd-monorepoet: `template`.
   (Ligger nettsiden i repo-roten, som i et klonet mal-repo: dropp denne helt.)

Til slutt må det deployes på nytt (variablene gjelder først fra neste deploy).
Enkleste måte er en tom commit:

```bash
git commit --allow-empty -m "Redeploy for miljøvariabler"
git push
```

(Alternativt i dashbordet: **Deployments** → ⋯-menyen på siste deploy → **Retry deployment**.)

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
| Publisering lykkes, men siden endres ikke | `GITHUB_ROOT_DIR` mangler/feil: commiten havner utenfor nettsidens rotmappe (sjekk hvilke stier commiten endret på GitHub) |
