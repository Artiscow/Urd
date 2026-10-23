# Oppsett av publisering (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · [🇬🇧 English](SETUP-en-GB.md) · **🇳🇴 Bokmål** · [🇳🇴 Nynorsk](SETUP-nn.md) · [🇹🇷 Türkçe](SETUP-tr.md)

Denne guiden setter opp «Publiser»-knappen: at admin kan committe endringer til GitHub-repoet, som Cloudflare Pages så deployer. Dette er en engangsjobb per nettside og tar rundt ti minutter. (Mønsteret er validert i produksjon i ApeironLF.)

## Forutsetninger

- Nettsidens repo ligger på GitHub (laget fra malen i steg 0, eller for Urd-utvikling: selve Urd-repoet).
- En Cloudflare-konto (gratisnivået holder lenge).

## 0. Lag nettsidens repo

Ny side starter fra malrepoet [urd-template](https://github.com/Artiscow/urd-template): trykk **Use this template** → **Create a new repository** på GitHub, og gi repoet et navn. Repoet du får ER nettsiden; alt videre i guiden gjøres mot det. Senere Urd-versjoner hentes med **Oppdatering**-panelet i admin, som sjekker mot malrepoet, varsler om filer du har håndredigert, og skriver oppdateringen som én commit. (For Urd-utvikling brukes selve Urd-monorepoet i stedet; da er nettsiden undermappen `template`.)

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

8. Type: Text (valgfri - trengs normalt ikke)
   Navn: `URD_TEMPLATE_REPO`
   Verdi: malrepoet Oppdatering-panelet henter nye Urd-versjoner fra.
   Uten denne brukes standarden `Artiscow/urd-template`; sett den kun hvis
   siden skal følge en fork av malen.

9. Type: **Secret** (valgfri - trengs normalt ikke)
   Navn: `DEPLOY_HOOK_URL`
   Verdi: en Deploy Hook-URL (Settings → Deploy Hooks → pluss-tegnet → branch `main`).
   Cloudflare hopper i sjeldne tilfeller over en deploy selv om commiten er riktig;
   med denne satt trigger publiseringen deployen selv. Skru den på først hvis du
   opplever at publiseringer uteblir.

10. Type: **Secret** (valgfri - bare for bilder fra en Google Drive-mappe)
    Navn: `DRIVE_API_KEY`
    Verdi: en API-nøkkel fra Google Cloud med Drive API skrudd på. Bakgrunnslaget
    bildegalleri kan hente bildene sine fra en delt Drive-mappe; mappa leses av nettstedets egen funksjon på tjeneren, så
    nøkkelen når aldri nettleseren eller nettstedets filer. Google Foto-album
    trenger ingen nøkkel.

11. Type: Text (valgfri - bare for bilder fra Nextcloud eller en annen liste)
    Navn: `PHOTO_HOSTS`
    Verdi: vertene nettstedet får hente bilder fra, adskilt med komma.
    F.eks. `sky.example.org`. Trengs for en Nextcloud- eller ownCloud-deling og
    for en bildeliste på en annen adresse; Googles egne verter er innebygd.

12. Type: Text (valgfri - bare for en kalender fra en annen tjeneste enn Google)
    Navn: `ICS_HOSTS`
    Verdi: vertene kalenderblokken får hente kalendere fra, adskilt med komma.
    F.eks. `calendar.proton.me` eller `sky.example.org`. Google Kalender er
    innebygd. Se [Kalenderen](../calendar-guide/CALENDAR-nb.md).

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

## 5. Betalingslaget (valgfritt)

Kasse-blokken kan ta betalingen med Vipps ([ADR-0020](../../adr/0020-optional-payment-layer-vipps-checkout.md)). Det er et valgfritt lag: uten det sender bestillingsskjemaet bestillingen på e-post eller til et endepunkt, som før. Laget trenger en Vipps MobilePay-avtale for betaling på nett (ePayment-API-et) og salgsstedets fire nøkler.

1. I Vipps MobilePay-portalen for bedrifter, under **Utvikler**, åpner du salgsstedet og kopierer `client_id`, `client_secret`, `Ocp-Apim-Subscription-Key` og salgsstedsnummeret (MSN). Testsalgsstedet som følger med produktet har egne nøkler under samme overskrift.
2. Legg dem inn i Cloudflare som i steg 3, alle fire som **Secret**: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY` og `VIPPS_MSN`.
3. Til testbetalingen bruker du testsalgsstedets nøkler og legger til én til, Type: Text, `VIPPS_API_BASE` med verdien `https://apitest.vipps.no`. Installer testappen Vipps MT (TestFlight på iOS, Google Play på Android etter å ha blitt med i Vipps' testgruppe; utviklersidene lenker til begge), og lag en testbruker under **Utvikler** i portalen. Appen logger inn med testbrukerens telefonnummer og fødselsnummer, og bekreftelseskoden er 0000 eller 000000. Din egen Vipps-konto kan ikke betale i testmiljøet.
4. Deploy på nytt (som på slutten av steg 3). Åpne Kasse-blokkens meny i redigeringen, huk av «Betal med Vipps»-knapp, og publiser.
5. Testbetalingen: legg et produkt i handlekurven, åpne kassesiden og trykk «Betal med Vipps». På en telefon åpner testappen seg; på en datamaskin spør Vipps etter testbrukerens nummer og sender forespørselen til appen. Appen ber først kjøperen dele navn, e-post og telefon med butikken, så om å godkjenne betalingen. Tilbake på kassesiden er handlekurven tom og siden takker kjøperen med navn; betalingen ligger i portalen med ordrelinjene i beskrivelsen, og kvitteringen ligger i appen. Når det virker, bytter du til produksjonsnøklene og fjerner `VIPPS_API_BASE`.
6. Pengene er reservert, ikke flyttet. Når varen sendes, henter du betalingen i portalen; Vipps gir 180 dager, og reglene forbyr å hente før varen er klar. Avbryt i portalen frigir reservasjonen; en betaling som aldri hentes, frigir Vipps når fristen går ut.
7. Valgfritt, til bestillingsvarslene butikken i v1.1 sender: registrer en webhook, så Vipps forteller nettstedet om betalingshendelser. Nettstedet lagrer ingenting ennå, men endepunktet `/api/vipps/webhook` er på plass og avviser hver levering som ikke er signert med registreringens hemmelighet. Registrer den med API-et, og legg `secret` fra svaret inn i Cloudflare som **Secret** `VIPPS_WEBHOOK_SECRET`:

```bash
# Tilgangstokenet (gyldig 24 timer i produksjon, 1 time i testmiljøet)
curl -X POST https://api.vipps.no/accesstoken/get \
  -H "client_id: <client_id>" -H "client_secret: <client_secret>" \
  -H "Ocp-Apim-Subscription-Key: <abonnementsnøkkel>" -H "Merchant-Serial-Number: <MSN>"

# Registreringen; secret fra svaret går inn i VIPPS_WEBHOOK_SECRET
curl -X POST https://api.vipps.no/webhooks/v1/webhooks \
  -H "Authorization: Bearer <access_token>" \
  -H "Ocp-Apim-Subscription-Key: <abonnementsnøkkel>" -H "Merchant-Serial-Number: <MSN>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://<nettsted>/api/vipps/webhook","events":["epayments.payment.authorized.v1"]}'
```

## Sikkerhetsmodellen (kort)

- OAuth-tokenet byttes server-side og lagres i en httpOnly-cookie; det når aldri nettleser-JS.
- `ALLOWED_LOGINS` håndheves i alle muterende endepunkter, ikke bare i UI-et.
- Publisering kan kun skrive `content/**`, `media/**` og `plugins/plugins.json`. Kode (`functions/`, `admin/`, `assets/engine/`, `assets/urd/`), workflows og sikkerhetsfiler er blokkert på serversiden, så en kapret redaktørsesjon ikke kan plante noe.
- Se [ADR-0003](../../adr/0003-publishing-via-github-oauth-and-pages-functions.md) for hele begrunnelsen.

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
| «Betaling er ikke satt opp for denne siden ennå» på kassesiden | En av de fire Vipps-hemmelighetene mangler i Cloudflare, eller deployen er eldre enn hemmelighetene (steg 5) |
| Vipps-betalingen feiler før appen åpner seg | `VIPPS_API_BASE` peker på testmiljøet med produksjonsnøkler, eller omvendt; nøklene og basen hører til samme miljø |
| Commiten er riktig, men ingen deploy dukker opp | Git-webhooken glapp hos hosten (skjer av og til). Sett opp `DEPLOY_HOOK_URL` (variabel 9), så trigger publiseringen deployen selv |
