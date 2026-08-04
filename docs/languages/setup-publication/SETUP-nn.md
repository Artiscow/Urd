# Oppsett av publisering (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · [🇬🇧 English](SETUP-en-GB.md) · [🇳🇴 Bokmål](../../OPPSETT-PUBLISERING.md) · **🇳🇴 Nynorsk** · [🇹🇷 Türkçe](SETUP-tr.md)

Omsetjing av docs/OPPSETT-PUBLISERING.md. Norsk (bokmål) er kanonisk og gjeld ved avvik.

Denne guiden set opp «Publiser»-knappen: at admin kan committe endringar til GitHub-repoet, som Cloudflare Pages så deployar. Dette er ein eingongsjobb per nettside og tek rundt ti minutt. (Mønsteret er validert i produksjon i ApeironLF.)

## Føresetnader

- Repoet til nettsida ligg på GitHub (for Urd-utvikling: sjølve Urd-repoet).
- Ein Cloudflare-konto (gratisnivået held lenge).

## 1. Kople repoet til Cloudflare Pages

1. Cloudflare-dashbordet → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Vel repoet, og vel **prosjektnamn med omhug**: namnet blir adressa
   (`<namn>.pages.dev`), det blir delt globalt med alle Cloudflare-kundar (er namnet teke,
   får du eit tilfeldig suffiks), og det KAN IKKJE endrast seinare - da må prosjektet
   slettast og opprettast på nytt. Berre små bokstavar, tal og bindestrek.
3. Under byggjeinnstillingane:
   - **Build command:** (tomt - Urd har ikkje byggjesteg)
   - **Build output directory:** `/`
   - **Root directory:** `template` (i eit reint klona mal-repo der innhaldet ligg i rota: lat stå tomt)
4. Deploy. Sida er no live på `<prosjekt>.pages.dev`, og `functions/`-mappa blir plukka opp automatisk.

## 2. Lag ein GitHub OAuth-app

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Fyll inn:
   - **Application name:** t.d. «Urd publisering - Foreininga mi»
   - **Homepage URL:** `https://<prosjekt>.pages.dev`
   - **Authorization callback URL:** `https://<prosjekt>.pages.dev/api/github/callback`
3. Opprett, og noter **Client ID**.
4. **Generate a new client secret**, og noter løyndomen (blir vist berre éin gong).

Brukar du eige domene seinare, oppdater begge URL-ane i OAuth-appen.

## 3. Set miljøvariablane i Cloudflare

Gå til prosjektet → **Settings** → **Variables and Secrets** → **Add**.

Skjemaet har tre felt: **Type**, **Variable name** og **Value**.
Fyll inn nøyaktig som under. Lagre, og gjenta for alle seks:

1. Type: Text
   Namn: `GITHUB_REPO`
   Verdi: repoet det skal publiserast til. For denne sida: `Artiscow/Urd`

2. Type: Text
   Namn: `GITHUB_CLIENT_ID`
   Verdi: Client ID frå OAuth-appen (steg 2)

3. Type: **Secret**
   Namn: `GITHUB_CLIENT_SECRET`
   Verdi: løyndomen frå OAuth-appen (steg 2)

4. Type: Text
   Namn: `GITHUB_BRANCH`
   Verdi: `main`

5. Type: Text
   Namn: `GITHUB_SCOPE`
   Verdi: `public_repo` (offentleg repo) eller `repo` (privat repo)

6. Type: Text
   Namn: `ALLOWED_LOGINS`
   Verdi: GitHub-brukarnamna som får publisere, skilde med komma. T.d. `Artiscow`

7. Type: Text
   Namn: `GITHUB_ROOT_DIR`
   Verdi: undermappa i repoet som er rota til nettsida, altså same verdi som
   «Root directory» i steg 1. For Urd-monorepoet: `template`.
   (Ligg nettsida i repo-rota, som i eit klona mal-repo: drop denne heilt.)

8. Type: **Secret** (valfri - trengst normalt ikkje)
   Namn: `DEPLOY_HOOK_URL`
   Verdi: ein Deploy Hook-URL (Settings → Deploy Hooks → pluss-teiknet → branch `main`).
   Cloudflare hoppar i sjeldne tilfelle over ein deploy sjølv om commiten er rett;
   med denne sett trigger publiseringa deployen sjølv. Skru han på først dersom du
   opplever at publiseringar uteblir.

Til slutt må det deployast på nytt (variablane gjeld først frå neste deploy).
Enklaste måten er ein tom commit:

```bash
git commit --allow-empty -m "Redeploy for miljøvariabler"
git push
```

(Alternativt i dashbordet: **Deployments** → ⋯-menyen på siste deploy → **Retry deployment**.)

## 4. Verifiser

1. Gå til `https://<prosjekt>.pages.dev/admin/` → «Logg inn med GitHub» → autoriser.
2. Brukarnamnet ditt blir vist i topplinja (⚠ framfor tyder at du manglar `ALLOWED_LOGINS`-oppføring).
3. Endre ein tekst, trykk **Publiser**. Etter eit augeblink ligg commiten i repoet, og Cloudflare deployar han (~1 minutt).

## Tryggingsmodellen (kort)

- OAuth-tokenet blir bytt server-side og lagra i ein httpOnly-cookie; det når aldri nettlesar-JS.
- `ALLOWED_LOGINS` blir handheva i alle muterande endepunkt, ikkje berre i UI-et.
- Publisering kan berre skrive `content/**`, `media/**` og `plugins/plugins.json`. Kode (`functions/`, `admin/`, `assets/engine/`), workflows og tryggingsfiler er blokkerte på serversida, så ein kapra redaktørsesjon ikkje kan plante noko.
- Sjå [ADR-0003](../../adr/0003-publisering-via-github-oauth-og-pages-functions.md) for heile grunngjevinga (på bokmål).

## Lokal testing av publiseringslaget (Urd-utviklarar)

```bash
cd template
# legg testverdier i .dev.vars (gitignorert, ALDRI committ ekte hemmeligheter):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=dittbrukernavn
npx wrangler pages dev . --port 8788
```

Da køyrer både sida, admin og functions på `http://localhost:8788`. Full OAuth-innlogging krev ein ekte OAuth-app med callback mot localhost, men 401/503-flytane og sti-vernet kan testast utan.

## Feilsøking

| Symptom | Sannsynleg årsak |
|---|---|
| «Publisering er ikke konfigurert: miljøvariabelen X mangler» (503) | Variabelen manglar i Cloudflare, eller deployen er eldre enn variabelen |
| «Ugyldig OAuth-state» ved innlogging | Callback-URL i OAuth-appen matchar ikkje domenet, eller cookies blir blokkerte |
| «har ikke publiseringstilgang» (403) | Brukarnamnet står ikkje i `ALLOWED_LOGINS` (sjekk stavinga; feltet er ufølsamt for store/små bokstavar) |
| «Kunne ikke committe til GitHub» (502) | Tokenet manglar scope (privat repo treng `repo`), eller greina har flytta seg |
| Publisering lukkast, men sida endrar seg ikkje | `GITHUB_ROOT_DIR` manglar/er feil: commiten hamnar utanfor rotmappa til nettsida (sjekk kva stiar commiten endra på GitHub) |
| Commiten er rett, men ingen deploy dukkar opp | Git-webhooken glapp hos hosten (skjer av og til). Set opp `DEPLOY_HOOK_URL` (variabel 8), så trigger publiseringa deployen sjølv |
