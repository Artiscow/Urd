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

Kasse-blokken kan ta betalingen gjennom en leverandør ([ADR-0020](../../adr/0020-optional-payment-layer-vipps-checkout.md), [ADR-0028](../../adr/0028-payment-providers-in-the-optional-layer.md)). Det er et valgfritt lag: uten det sender bestillingsskjemaet bestillingen på e-post eller til et endepunkt, som før. Hver leverandør trenger sin egen avtale og sine egne nøkler, og hver slås på per Kasse-blokk under **Betaling** i blokkens meny. Kjøperen betaler alltid på leverandørens egen side, så nettstedet ser aldri et kort.

Sett først butikkens valuta i Nettsted-panelets gruppe **Butikk** (**Butikkvaluta**, en ISO-kode som NOK, DKK eller EUR); katalogprisene står i den valutaen, og hver leverandør belaster i den.

### Vipps MobilePay

Laget trenger en Vipps MobilePay-avtale for betaling på nett (ePayment-API-et) og salgsstedets fire nøkler. Et dansk eller finsk MobilePay-salgssted følger de samme stegene mot de samme serverne, med butikkvalutaen DKK eller EUR; reservasjonene er kortere der (steg 6). Navnene på menyene og knappene under er fra portalens engelske visning.

1. I Vipps MobilePay-portalen for bedrifter klikker du **For developers** i sidemenyen og velger **Production**. Finn salgsstedet og klikk **Show keys**, og kopier `client_id`, `client_secret` og den primære `Ocp-Apim-Subscription-Key`, og salgsstedsnummeret (MSN) som står ved salgsstedet.
2. Legg dem inn i Cloudflare som i steg 3, alle fire som **Secret**: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY` og `VIPPS_MSN`.
3. Til testbetalingen velger du **Test** under **For developers** i stedet: et testsalgssted følger med produktet, og **Add test sales unit** lager et til. Bruk nøklene dets (**Show keys**) i de fire hemmelighetene, og legg til én til, Type: Text, `VIPPS_API_BASE` med verdien `https://apitest.vipps.no`. Lag en testbruker på fanen **Test users** med **Add a new test user**; portalen gir den et telefonnummer og et fødselsnummer. Installer testappen Vipps MT (TestFlight på iOS, Google Play på Android etter å ha blitt med i Vipps' testgruppe; utviklersidene lenker til begge), logg inn med testbrukerens telefonnummer og fødselsnummer, og bekreft med koden 0000 eller 000000. Din egen Vipps-konto kan ikke betale i testmiljøet.
4. Deploy på nytt (som på slutten av steg 3). Åpne Kasse-blokkens meny i redigeringen, huk av **Betaling** → «Betal med Vipps»-knapp, og publiser.
5. Testbetalingen: legg et produkt i handlekurven, åpne kassesiden og trykk «Betal med Vipps». På en telefon åpner testappen seg; på en datamaskin spør Vipps etter testbrukerens nummer og sender forespørselen til appen. Appen ber først kjøperen dele navn, e-post og telefon med butikken, så om å godkjenne betalingen. Tilbake på kassesiden er handlekurven tom og siden takker kjøperen med navn; betalingen ligger i portalen med ordrelinjene i beskrivelsen, og kvitteringen ligger i appen. Når det virker, bytter du til produksjonsnøklene og fjerner `VIPPS_API_BASE`.
6. Pengene er reservert, ikke flyttet. Når varen sendes, finner du den reserverte ordren blant transaksjonene i portalen og klikker **Capture** (skriv et beløp for å hente bare en del). Et norsk salgssted har 180 dager på å hente; et dansk eller finsk har 14, med mindre Vipps har godkjent sen henting. Reglene forbyr å hente før varen er klar. For å avlyse en ordre velger du den og klikker **Cancel transaction**, som frigir reservasjonen med en gang; portalen tilbyr dette bare for norske salgssteder. En reservasjon som aldri hentes, frigis når fristen går ut.
7. Valgfritt, til bestillingsvarslene butikken i v1.1 sender: registrer en webhook, så Vipps forteller nettstedet om betalingshendelser. Nettstedet lagrer ingenting ennå, men endepunktet `/api/pay/vipps/webhook` er på plass og avviser hver levering som ikke er signert med registreringens hemmelighet. Registrer den med API-et, og legg `secret` fra svaret inn i Cloudflare som **Secret** `VIPPS_WEBHOOK_SECRET`:

```bash
# Tilgangstokenet (gyldig 24 timer i produksjon, 1 time i testmiljøet).
# I testmiljøet bruker du https://apitest.vipps.no og testnøklene; registreringen i hvert miljø har sin egen hemmelighet.
curl -X POST https://api.vipps.no/accesstoken/get \
  -H "client_id: <client_id>" -H "client_secret: <client_secret>" \
  -H "Ocp-Apim-Subscription-Key: <abonnementsnøkkel>" -H "Merchant-Serial-Number: <MSN>"

# Registreringen; secret fra svaret går inn i VIPPS_WEBHOOK_SECRET
curl -X POST https://api.vipps.no/webhooks/v1/webhooks \
  -H "Authorization: Bearer <access_token>" \
  -H "Ocp-Apim-Subscription-Key: <abonnementsnøkkel>" -H "Merchant-Serial-Number: <MSN>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://<nettsted>/api/pay/vipps/webhook","events":["epayments.payment.authorized.v1"]}'
```

### Stripe (kort, Apple Pay, Google Pay, Klarna og mer)

Stripes egen side tar kort, Apple Pay, Google Pay, Klarna, MobilePay og de andre metodene du slår på i Stripe-dashbordet, i de fleste valutaer.

1. Lag en Stripe-konto, og test i en sandkasse først (**Sandboxes** i kontovelgeren i dashbordet). På siden **API keys** (`dashboard.stripe.com/apikeys`) anbefaler Stripe en begrenset nøkkel framfor den fulle hemmelige nøkkelen: klikk **Create restricted key**, gi **Checkout Sessions** Write og **Payment Intents** Read, og la resten stå på None. Legg nøkkelen (`rk_test_…`; en hemmelig nøkkel `sk_test_…` virker også) inn i Cloudflare som **Secret** `STRIPE_SECRET_KEY`, og deploy på nytt. Feiler en testbetaling, viser nøkkelens **View request logs** hvilken tillatelse som manglet.
2. Under **Settings** → **Payment methods** slår du på metodene du vil ha. Apple Pay og Google Pay vises på Stripes side uten noe mer, på enhetene som støtter dem. La metodene som gjøres opp over dager (SEPA Direct Debit, bankoverføringer) være av: kassesiden bekrefter bare det som bekreftes med en gang, så kjøperen ville ikke blitt takket.
3. Åpne Kasse-blokkens meny i redigeringen, **Betaling** → **Kortbetaling**: Stripe. **Ta pengene** sier når: *Når jeg sender* holder av beløpet, og du henter det i Stripe-dashbordet når varen sendes (kort holdes av i 7 dager, Klarna 28); *Ved bestillingen* trekker det med en gang, for det som leveres med en gang, som et medlemskap eller en billett. Publiser.
4. Testbetalingen: legg et produkt i handlekurven og trykk «Betal med kort». Betal på Stripes side med kortnummeret `4242 4242 4242 4242`, en hvilken som helst framtidig dato og tre vilkårlige sifre. Tilbake på kassesiden er handlekurven tom og siden takker kjøperen med navnet Stripe samlet inn. Blant sandkassens betalinger står betalingen som **Uncaptured** (Når jeg sender; åpne den og klikk **Capture** når varen sendes) eller **Succeeded** (Ved bestillingen); `4000 0000 0000 9995` viser et avvist kort, og handlekurven blir stående.
5. Valgfritt, til bestillingsvarslene butikken i v1.1 sender: på siden **Webhooks** i Workbench (`dashboard.stripe.com/webhooks`) klikker du **Create an event destination**, velger **Your account** og nyttelasten **Snapshot**, velger hendelsen `checkout.session.completed`, velger **Webhook endpoint** og gir adressen `https://<nettsted>/api/pay/stripe/webhook`. Klikk **Reveal secret** og kopier signeringshemmeligheten (`whsec_…`) inn i Cloudflare som **Secret** `STRIPE_WEBHOOK_SECRET`. Endepunktet lagrer ingenting ennå, og avviser hver levering som ikke er signert med hemmeligheten eller er eldre enn fem minutter. Med webhooken på plass venter Stripe opptil ti sekunder på nettstedets svar før kjøperen sendes tilbake; endepunktet svarer med en gang.
6. Når det virker, bytter du siden **API keys** fra sandkasse til live-modus og fullfører Stripes go-live-sjekkliste, som aktiverer kontoen. Lag en levende begrenset nøkkel på samme måte (`rk_live_…`; Stripe viser den bare én gang), lag webhooken på nytt i live-modus, siden den har sin egen signeringshemmelighet, og legg begge inn i Cloudflare i stedet for sandkassens verdier.

### PayPal

PayPals egen side tar kjøperens PayPal-konto, eller kort uten konto der PayPal tilbyr det, i valutaene PayPal tar (NOK, DKK, SEK, EUR, GBP, USD og flere; ikke ISK, og HUF, JPY og TWD bare i hele enheter). PayPal trekker pengene ved bestillingen: en reservert betaling garanteres bare i 3 dager, som er kortere enn det meste av frakt, så en bestilling du ikke kan levere, refunderer du i PayPal-kontoen.

1. Logg inn på `developer.paypal.com` med foreningens PayPal Business-konto (**Log in to Dashboard**). Under **Apps & Credentials**, med bryteren på **Sandbox**, bruker du **Default Application** eller **Create App**, og kopierer **Client ID** og **Secret**. Legg dem inn i Cloudflare som **Secret** `PAYPAL_CLIENT_ID` og `PAYPAL_CLIENT_SECRET`, og legg til Type: Text `PAYPAL_API_BASE` med verdien `https://api-m.sandbox.paypal.com`. Deploy på nytt.
2. Åpne Kasse-blokkens meny i redigeringen, **Betaling** → huk av «Betal med PayPal»-knapp, og publiser.
3. Testbetalingen: under **Testing Tools** → **Sandbox Accounts** har utviklerkontoen en personlig (kjøper-)sandkassekonto; **⋮** → **View/Edit Account** viser e-posten og passordet. Legg et produkt i handlekurven, trykk «Betal med PayPal» og logg inn på PayPals side med kjøperkontoen. Tilbake på kassesiden er handlekurven tom og siden takker kjøperen med navn; betalingen står som fullført i bedriftens sandkassekonto på `sandbox.paypal.com`. Trykker du «Cancel» på PayPals side, kommer du tilbake til kassen med handlekurven i behold.
4. Valgfritt, til bestillingsvarslene butikken i v1.1 sender: på appens side legger du til en webhook med adressen `https://<nettsted>/api/pay/paypal/webhook` og hendelsen `PAYMENT.CAPTURE.COMPLETED`, og kopierer webhookens ID inn i Cloudflare som Type: Text `PAYPAL_WEBHOOK_ID`. Endepunktet lagrer ingenting ennå; for hver levering spør det PayPal om PayPal signerte den for den webhooken, og avviser resten. Sandkassen og den levende appen har hver sin webhook-ID.
5. For å gå live trenger du en verifisert PayPal Business- (eller Premier-)konto. Bytt **Apps & Credentials** til **Live**, hent den levende appens **Client ID** og **Secret** (PayPal kan gå gjennom appen først, innen 24 til 72 timer), legg dem inn i de to hemmelighetene, fjern `PAYPAL_API_BASE` så det levende API-et `https://api-m.paypal.com` brukes, og legg til webhooken på nytt for den levende appen hvis du bruker den.

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
| «Betal med kort» hos Stripe svarer at betaling ikke er satt opp | `STRIPE_SECRET_KEY` mangler, er den publiserbare nøkkelen (`pk_…`) i stedet for den hemmelige, eller deployen er eldre enn nøkkelen |
| «Betal med PayPal» svarer at PayPal ikke tar valutaen | Butikkvalutaen er en PayPal ikke tar (ISK), eller en pris har desimaler i HUF, JPY eller TWD, som PayPal bare tar i hele enheter |
| Vipps-betalingen feiler før appen åpner seg | `VIPPS_API_BASE` peker på testmiljøet med produksjonsnøkler, eller omvendt; nøklene og basen hører til samme miljø |
| Commiten er riktig, men ingen deploy dukker opp | Git-webhooken glapp hos hosten (skjer av og til). Sett opp `DEPLOY_HOOK_URL` (variabel 9), så trigger publiseringen deployen selv |
