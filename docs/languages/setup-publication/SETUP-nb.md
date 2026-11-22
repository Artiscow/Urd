# Oppsett av publisering (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · [🇬🇧 English](SETUP-en-GB.md) · **🇳🇴 Bokmål** · [🇳🇴 Nynorsk](SETUP-nn.md) · [🇹🇷 Türkçe](SETUP-tr.md)

Denne guiden legger nettstedet ditt på nett og setter opp «Publiser»-knappen i redigereren: redigereren lagrer endringene dine i GitHub-repoet ditt, og Cloudflare Pages legger dem ut på nettstedet. Du gjør det én gang per nettsted, og det tar rundt ti minutter.

## Dette trenger du

- En GitHub-konto.
- En Cloudflare-konto (gratisplanen holder).

Bygger du selve Urd? Da er nettstedet ditt mappen `template` i Urd-repoet, så hopp over steg 1 og bruk Urd-repoet. Stegene sier fra der noe annet er ulikt.

## 1. Lag nettstedets repo

1. Åpne [urd-template](https://github.com/Artiscow/urd-template) på GitHub.
2. Trykk **Use this template** → **Create a new repository**.
3. Gi repoet et navn, velg **Public** eller **Private**, og trykk **Create repository**.

Repoet du får, er nettstedet ditt. Nye versjoner av Urd kommer senere inn gjennom **Oppdatering**-panelet i redigereren.

## 2. Legg nettstedet på Cloudflare Pages

1. I Cloudflare-dashbordet går du til **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Velg **GitHub**, og logg inn hvis du blir spurt. Velg repoet fra steg 1, trykk **Install & Authorize**, og så **Begin setup**.
3. **Project name:** velg det med omhu. Det blir adressen til nettstedet, `<navn>.pages.dev`, og det kan ikke endres senere (da må du slette prosjektet og begynne på nytt). Navnene deles av alle på Cloudflare, så er ditt tatt, legger Cloudflare til noen tilfeldige bokstaver. Bruk bare små bokstaver, tall og bindestrek.
4. Fyll inn byggeinnstillingene:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** la feltet stå tomt (Urd har ikke noe byggesteg)
   - **Build output directory:** `/`
   - **Root directory:** la feltet stå tomt. For selve Urd-repoet åpner du **Root directory (advanced)** og setter **Path** til `template`.
5. Trykk **Save and Deploy**. Når det er ferdig, er nettstedet live på `https://<navn>.pages.dev`.

Noter adressen: de neste stegene bruker den. Der guiden skriver `<navn>.pages.dev`, bruker du din egen.

## 3. Lag GitHub-appen

Appen lar deg logge inn i redigereren med GitHub-kontoen din, og lar redigereren lagre i nettstedets repo og ingenting annet.

1. På GitHub klikker du profilbildet ditt (øverst til høyre) → **Settings** → **Developer settings** (nederst i menyen til venstre) → **GitHub Apps** → **New GitHub App**. Hører repoet til en organisasjon, starter du fra organisasjonen i stedet: **Your organizations** → **Settings** ved siden av den → **Developer settings** → **GitHub Apps** → **New GitHub App**.
2. Fyll inn:
   - **GitHub App name:** et navn ingen andre på GitHub har tatt, høyst 34 tegn, f.eks. «Urd publisering mitt-nettsted»
   - **Homepage URL:** `https://<navn>.pages.dev`
   - **Callback URL:** `https://<navn>.pages.dev/api/github/callback`
   - La **Expire user authorization tokens** stå huket av. Innloggingen varer da åtte timer om gangen, og redigereren fornyer den selv.
   - La **Request user authorization (OAuth) during installation** stå uten hake.
   - Under **Webhook** fjerner du haken ved **Active**.
   - Under **Permissions** → **Repository permissions** setter du **Contents** til **Read and write**. La de andre stå som de er.
   - **Where can this GitHub App be installed?** Velg **Only on this account**.
3. Trykk **Create GitHub App**.
4. På appens side kopierer du **Client ID** og tar vare på den til steg 4.
5. Trykk **Generate a new client secret** og kopier hemmeligheten. GitHub viser den bare én gang; mister du den, lager du en ny. Appen trenger ingen privat nøkkel (private key), så la den delen av siden være.
6. Installer appen på nettstedets repo: i appens meny til venstre trykker du **Install App**, og så **Install** ved kontoen din. Velg **Only select repositories**, velg repoet fra steg 1, og trykk **Install**.

## 4. Gi Cloudflare nøklene

1. I Cloudflare-dashbordet går du til **Workers & Pages** → prosjektet ditt → **Settings** → **Variables and Secrets**.
2. For hver variabel under trykker du **Add**, fyller inn **Type**, **Variable name** og **Value**, og trykker **Save**. En **Secret** skjules når den er lagret; en **Text** forblir lesbar.

Trengs alltid:

| Type | Variable name | Value |
|---|---|---|
| Text | `GITHUB_REPO` | Repoet ditt som `eier/navn`, f.eks. `Artiscow/mitt-nettsted` |
| Text | `GITHUB_CLIENT_ID` | Client ID fra steg 3 |
| **Secret** | `GITHUB_CLIENT_SECRET` | Hemmeligheten fra steg 3 |
| Text | `ALLOWED_LOGINS` | GitHub-brukernavnene som får publisere, adskilt med komma, f.eks. `Artiscow` |

Bare i disse tilfellene:

| Type | Variable name | Value | Når |
|---|---|---|---|
| Text | `GITHUB_BRANCH` | Navnet på grenen (aldri `urd-drafts`) | Nettstedet publiseres fra en annen gren enn `main` |
| Text | `GITHUB_ROOT_DIR` | `template` | Nettstedet er selve Urd-repoet |

3. Deploy på nytt, siden variablene gjelder fra neste deploy: i prosjektet åpner du **Deployments**, og så **⋯**-menyen på den siste deployen → **Retry deployment**.

## 5. Sjekk at det virker

1. Åpne `https://<navn>.pages.dev/admin/`, trykk **Logg inn med GitHub**, og så **Authorize** på GitHubs side.
2. GitHub-brukernavnet ditt vises i topplinjen. Et varseltegn foran det betyr at brukernavnet ikke står i `ALLOWED_LOGINS`: sjekk stavingen, og deploy på nytt.
3. Endre en tekst, trykk **Publiser**, og så **Publiser nå**. Etter et øyeblikk er endringen lagret i repoet ditt, og et minutt senere er den på nettstedet.

Nettstedet er satt opp. Resten av guiden er til når du trenger det.

## Valgfrie innstillinger

Sett disse på samme måte som i steg 4, og deploy på nytt etter hver endring.

| Type | Variable name | Value | Når |
|---|---|---|---|
| **Secret** | `DEPLOY_HOOK_URL` | En deploy hook-adresse: i prosjektet, **Settings** → **Deploy Hooks** → pluss-tegnet → grenen `main` | En publisering når av og til aldri nettstedet, selv om endringen ligger i repoet. Med denne satt starter publiseringen deployen selv. |
| **Secret** | `DRIVE_API_KEY` | En API-nøkkel fra Google Cloud med Drive API slått på | En bakgrunn henter bildene sine fra en delt Google Drive-mappe. Se [Bilder fra en delt mappe](../setup-photos/PHOTOS-nb.md). Google Foto-album trenger ingen nøkkel. |
| Text | `PHOTO_HOSTS` | Vertene bildene kan komme fra, adskilt med komma, f.eks. `sky.example.org` | Bildene kommer fra en Nextcloud- eller ownCloud-deling, eller fra en bildeliste på en annen adresse. Googles egne verter er innebygd. |
| Text | `ICS_HOSTS` | Vertene kalendere kan komme fra, adskilt med komma, f.eks. `calendar.proton.me` | En kalender kommer fra en annen tjeneste enn Google Kalender. Se [Kalenderen](../calendar-guide/CALENDAR-nb.md). |
| Text | `URD_TEMPLATE_REPO` | Et malrepo som `eier/navn` | Nettstedet skal hente oppdateringene sine fra en kopi av urd-template i stedet for `Artiscow/urd-template`. |

## Et nettsted satt opp med en OAuth-app

Et nettsted som ble satt opp med en OAuth-app, før denne guiden brukte en GitHub-app, virker fortsatt. En OAuth-apps innlogging når likevel alle repoer du har tilgang til, så det er tryggere å gå over til en GitHub-app:

1. Lag en GitHub-app som i steg 3, med nettstedets adresse.
2. I Cloudflare, under **Variables and Secrets**, gir du `GITHUB_CLIENT_ID` og `GITHUB_CLIENT_SECRET` appens verdier, og fjerner `GITHUB_SCOPE` hvis den finnes. Deploy på nytt (steg 4).
3. I redigereren trykker du **Logg ut** ved brukernavnet ditt i topplinjen, og logger inn igjen.
4. Slett den gamle OAuth-appen: **Settings** → **Developer settings** → **OAuth Apps** → appen → **Delete application**.

Så lenge et nettsted bruker en OAuth-app, trenger et privat repo variabelen `GITHUB_SCOPE` med verdien `repo`.

## Eget domene

1. I prosjektet åpner du **Custom domains** → **Set up a custom domain**, og følger Cloudflares steg.
2. På GitHub åpner du appen fra steg 3 (**Settings** → **Developer settings** → **GitHub Apps** → **Edit** ved appen), endrer **Homepage URL** og **Callback URL** til det nye domenet, og trykker **Save changes**.

På Cloudflares gratisplan slår Cloudflare på sin egen besøkstelling (Web Analytics) for et domene du legger til, og legger skriptet sitt på sidene dine. Personvernsiden forteller da de besøkende det, og Juridisk-panelet nevner det. Slik slår du det av: i Cloudflare-dashbordet åpner du domenet → **Web Analytics** → **Manage RUM Settings** → **Disable**; Cloudflare slår det ikke på igjen. Sjekk innstillingen i Cloudflare framfor å stole på Juridisk-panelet: panelet ser bare forsiden slik Cloudflare leverer den til deg, og Cloudflare utelater skriptet for besøkende som betjenes fra datasentrene i EU og Storbritannia.

## Ta betalt (valgfritt)

Kasse-blokken kan ta betalingen gjennom Vipps MobilePay, Stripe eller PayPal. Uten en leverandør sender bestillingsskjemaet bestillingen på e-post eller til en bestillingsadresse i stedet. Hver leverandør trenger sin egen avtale og sine egne nøkler, og du slår hver av dem på per Kasse-blokk under **Betaling** i blokkens meny. Kjøperen betaler alltid på leverandørens egen side, så nettstedet ser aldri et kort.

Sett først butikkens valuta i Nettsted-panelet, gruppen **Butikk** → **Butikkvaluta** (en kode som NOK, DKK eller EUR). Prisene står i den valutaen, og hver leverandør belaster i den.

Greit å vite før du tester:

- I redigereren forteller et trykk på en betalingsknapp om leverandørens nøkler er på plass. Ingenting sendes derfra.
- Til nøklene er på plass, sier den publiserte betalingsknappen til kjøperen at betaling ikke er satt opp ennå.
- **Test betalingen**, i Kasse-blokkens Betaling-gruppe, åpner kassesiden i en ny fane med de upubliserte endringene dine og handlekurven din. Selve betalingen bruker det som er publisert, så publiser kassesiden og produktene først. En betalingsmåte eller et produkt som ikke er publisert ennå avvises, og en pris som bare er endret i redigereren, trekkes til den publiserte prisen.
- Mens en leverandør bruker testnøkler, viser den publiserte kassen en linje om at betalinger ikke trekker penger. Den forsvinner når de ekte nøklene er på plass.

### Vipps MobilePay

Du trenger en Vipps MobilePay-avtale for betaling på nett (ePayment-API-et) og salgsstedets fire nøkler. Et dansk eller finsk MobilePay-salgssted følger de samme stegene, med butikkvalutaen DKK eller EUR; reservasjonene er kortere der (steg 6). Navnene på menyene og knappene under er fra portalens engelske visning.

1. I Vipps MobilePay-portalen for bedrifter klikker du **For developers** i sidemenyen og velger **Production**. Finn salgsstedet og klikk **Show keys**. Kopier `client_id`, `client_secret`, den primære `Ocp-Apim-Subscription-Key`, og salgsstedsnummeret (MSN) som står ved salgsstedet.
2. Legg dem inn i Cloudflare som i steg 4, alle fire som **Secret**: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY` og `VIPPS_MSN`.
3. For å teste først velger du **Test** under **For developers** i stedet. Et testsalgssted følger med avtalen, og **Add test sales unit** lager et til. Bruk nøklene dets (**Show keys**) i de fire hemmelighetene, og legg til én til: Type Text, `VIPPS_API_BASE`, verdi `https://apitest.vipps.no`.
   - Lag en testbruker på fanen **Test users** med **Add a new test user**. Portalen gir den et telefonnummer og et fødselsnummer.
   - Installer testappen Vipps MT (TestFlight på iOS; Google Play på Android etter å ha blitt med i Vipps' testgruppe; utviklersidene lenker til begge). Logg inn med testbrukerens telefonnummer og fødselsnummer, og bekreft med koden 0000 eller 000000. Din egen Vipps-konto kan ikke betale i testmiljøet.
4. Deploy på nytt (som i steg 4). Åpne Kasse-blokkens meny i redigereren, huk av **Betaling** → «Betal med Vipps»-knapp, og publiser.
5. Test det: med testnøklene inne viser kassesiden testlinjen øverst i skjemaet. Legg et produkt i handlekurven, åpne kassesiden og trykk «Betal med Vipps». På en telefon åpner testappen seg; på en datamaskin spør Vipps etter testbrukerens nummer og sender forespørselen til appen. Appen ber kjøperen dele navn, e-post og telefon med butikken, og så godkjenne betalingen. Tilbake på kassesiden er handlekurven tom og siden takker kjøperen med navn. Betalingen ligger i portalen med ordrelinjene i beskrivelsen, og kvitteringen ligger i appen. Når det virker, bytter du til produksjonsnøklene og fjerner `VIPPS_API_BASE`.
6. Pengene er reservert, ikke flyttet. Når varen sendes, finner du ordren blant transaksjonene i portalen og klikker **Capture** (skriv et beløp for å hente bare en del). Et norsk salgssted har 180 dager på å hente; et dansk eller finsk har 14, med mindre Vipps har godkjent sen henting. Reglene forbyr å hente før varen er klar. For å avlyse en ordre velger du den og klikker **Cancel transaction**, som frigir reservasjonen med en gang; portalen tilbyr dette bare for norske salgssteder. En reservasjon som aldri hentes, frigis når fristen går ut.
7. Valgfritt, til bestillingsvarslene som kommer med butikken i v1.1: registrer en webhook, så Vipps forteller nettstedet om betalinger. Nettstedet lagrer ingenting ennå, men adressen `/api/pay/vipps/webhook` er på plass og avviser hver levering som ikke er signert med registreringens hemmelighet. Registrer den med kommandoene under, og legg `secret` fra svaret inn i Cloudflare som **Secret** `VIPPS_WEBHOOK_SECRET`:

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

Stripes side tar kort, Apple Pay, Google Pay, Klarna, MobilePay og de andre metodene du slår på i Stripe-dashbordet, i de fleste valutaer.

1. Lag en Stripe-konto, og test i en sandkasse først (**Sandboxes** i kontovelgeren i dashbordet). På siden **API keys** (`dashboard.stripe.com/apikeys`) klikker du **Create restricted key**, gir **Checkout Sessions** Write og **Payment Intents** Read, og lar resten stå på None (Stripe anbefaler dette framfor den fulle hemmelige nøkkelen). Legg nøkkelen (`rk_test_…`; en hemmelig nøkkel `sk_test_…` virker også) inn i Cloudflare som **Secret** `STRIPE_SECRET_KEY`, og deploy på nytt. Feiler en testbetaling, viser nøkkelens **View request logs** hvilken tillatelse som manglet.
2. Under **Settings** → **Payment methods** slår du på metodene du vil ha. Apple Pay og Google Pay vises på Stripes side av seg selv, på enhetene som støtter dem. La metodene som bruker dager på å gjøres opp (SEPA Direct Debit, bankoverføringer) være av: kassesiden bekrefter bare det som bekreftes med en gang, så kjøperen ville ikke blitt takket.
3. Åpne Kasse-blokkens meny i redigereren, **Betaling** → **Kortbetaling**: Stripe. **Ta pengene** sier når:
   - *Når jeg sender* holder av beløpet, og du henter det i Stripe-dashbordet når varen sendes (kort holdes av i 7 dager, Klarna 28).
   - *Ved bestillingen* trekker det med en gang, for det som leveres med en gang, som et medlemskap eller en billett.

   Publiser.
4. Test det: med testnøkkelen inne viser kassesiden testlinjen øverst i skjemaet. Legg et produkt i handlekurven og trykk «Betal med kort». Betal på Stripes side med kortnummeret `4242 4242 4242 4242`, en hvilken som helst framtidig dato og tre vilkårlige sifre. Tilbake på kassesiden er handlekurven tom og siden takker kjøperen med navnet Stripe samlet inn. Blant sandkassens betalinger står betalingen som **Uncaptured** (Når jeg sender: åpne den og klikk **Capture** når varen sendes) eller **Succeeded** (Ved bestillingen). Kortet `4000 0000 0000 9995` viser et avvist kort, og handlekurven blir stående.
5. Valgfritt, til bestillingsvarslene som kommer med butikken i v1.1: på siden **Webhooks** i Workbench (`dashboard.stripe.com/webhooks`) klikker du **Create an event destination**, velger **Your account** og nyttelasten **Snapshot**, velger hendelsen `checkout.session.completed`, velger **Webhook endpoint** og gir adressen `https://<nettsted>/api/pay/stripe/webhook`. Klikk **Reveal secret** og kopier signeringshemmeligheten (`whsec_…`) inn i Cloudflare som **Secret** `STRIPE_WEBHOOK_SECRET`. Nettstedet lagrer ingenting ennå, og avviser hver levering som ikke er signert med hemmeligheten eller er eldre enn fem minutter.
6. Når det virker, bytter du siden **API keys** fra sandkasse til live-modus og fullfører Stripes go-live-sjekkliste, som aktiverer kontoen. Lag en levende begrenset nøkkel på samme måte (`rk_live_…`; Stripe viser den bare én gang). Lag webhooken på nytt i live-modus, siden den har sin egen signeringshemmelighet. Legg begge inn i Cloudflare i stedet for sandkassens verdier.

### PayPal

PayPals side tar kjøperens PayPal-konto, eller kort uten konto der PayPal tilbyr det, i valutaene PayPal tar (NOK, DKK, SEK, EUR, GBP, USD og flere; ikke ISK, og HUF, JPY og TWD bare i hele enheter). PayPal trekker pengene ved bestillingen, siden en reservert betaling bare garanteres i 3 dager, så en bestilling du ikke kan levere, refunderer du i PayPal-kontoen.

1. Logg inn på `developer.paypal.com` med PayPal Business-kontoen din (**Log in to Dashboard**). Under **Apps & Credentials**, med bryteren på **Sandbox**, bruker du **Default Application** eller **Create App**, og kopierer **Client ID** og **Secret**. Legg dem inn i Cloudflare som **Secret** `PAYPAL_CLIENT_ID` og `PAYPAL_CLIENT_SECRET`, og legg til Type Text `PAYPAL_API_BASE` med verdien `https://api-m.sandbox.paypal.com`. Deploy på nytt.
2. Åpne Kasse-blokkens meny i redigereren, **Betaling** → huk av «Betal med PayPal»-knapp, og publiser.
3. Test det: med sandkassenøklene inne viser kassesiden testlinjen øverst i skjemaet. Under **Testing Tools** → **Sandbox Accounts** har utviklerkontoen en personlig (kjøper-)sandkassekonto; **⋮** → **View/Edit Account** viser e-posten og passordet. Legg et produkt i handlekurven, trykk «Betal med PayPal», og logg inn på PayPals side med kjøperkontoen. Tilbake på kassesiden er handlekurven tom og siden takker kjøperen med navn; betalingen står som fullført i bedriftens sandkassekonto på `sandbox.paypal.com`. Trykker du «Cancel» på PayPals side, kommer du tilbake til kassen med handlekurven i behold.
4. Valgfritt, til bestillingsvarslene som kommer med butikken i v1.1: på appens side legger du til en webhook med adressen `https://<nettsted>/api/pay/paypal/webhook` og hendelsen `PAYMENT.CAPTURE.COMPLETED`, og kopierer webhookens ID inn i Cloudflare som Type Text `PAYPAL_WEBHOOK_ID`. Nettstedet lagrer ingenting ennå; for hver levering spør det PayPal om det var PayPal som sendte den, og avviser resten. Sandkassen og den levende appen har hver sin webhook-ID.
5. For å gå live trenger du en verifisert PayPal Business- (eller Premier-)konto. Bytt **Apps & Credentials** til **Live**, og hent den levende appens **Client ID** og **Secret** (PayPal kan gå gjennom appen først, innen 24 til 72 timer). Legg dem inn i de to hemmelighetene, fjern `PAYPAL_API_BASE` så den levende tjenesten brukes, og legg til webhooken på nytt for den levende appen hvis du bruker den.

## Lagrede utkast

Utkast-vinduet i redigereren lagrer utkast på GitHub, så du kan hente dem fram på en annen enhet. De havner i en egen gren, `urd-drafts`, som den første lagringen lager. Ingenting må settes opp for det, men tre ting er greie å vite:

- **Lagringer når aldri nettstedet.** Hver lagring er merket slik at Cloudflare ikke bygger noe fra den: den når aldri det publiserte nettstedet, bruker aldri et av prosjektets bygg og vises aldri i Historikk.
- **Hold grenen utenfor forhåndsvisningsbyggene.** Cloudflare bygger en forhåndsvisning av hver gren som standard. For sikkerhets skyld holder du `urd-drafts` utenfor: i prosjektet, **Settings** → **Builds & deployments** → **Preview branch control** (i nyere dashbord **Build** → **Branch control**), og velg **None**, eller **Custom branches** med `*` under Include og `urd-drafts` under Exclude.
- **Regler på alle grener stopper lagringene.** Et GitHub-regelsett (ruleset) eller en grenbeskyttelse som dekker alle grener (en som begrenser å lage grener eller krever en pull request, for eksempel) stopper også lagringene, og Utkast sier «GitHub nektet grenen de lagrede utkastene ligger på (urd-drafts); se oppsettsguiden». Hold grenen utenfor: i repoet, **Settings** → **Rules** → **Rulesets** → regelsettet → **Target branches** → **Add target** → **Exclude by pattern** → `urd-drafts`. For en klassisk beskyttelsesregel under **Settings** → **Branches** med mønsteret `*` endrer du mønsteret til `main`.

I et offentlig repo kan alle lese de lagrede utkastene og notatene på dem, slik de kan lese resten av repoet.

## Slik holdes publiseringen trygg

- Innloggingen din når bare nettstedets repo og varer åtte timer om gangen; redigereren fornyer den selv. Den ligger i en informasjonskapsel sidens egne skript ikke kan lese.
- Bare brukernavnene i `ALLOWED_LOGINS` kan publisere; nettstedet sjekker det ved hver endring, ikke bare i redigereren.
- Publisering kan bare skrive nettstedets innhold og medier, pluginlista, nettstedskartet, `robots.txt`, omdirigeringene og hver sides kopi av nettstedets egen `index.html`, og kan slette en plugins mappe. Nettstedets kode og sikkerhetsfiler avvises, så den som tok over en redigeringsøkt, kunne ikke plante kode.
- Lagring av utkast skriver bare grenen `urd-drafts`, aldri nettstedets egen gren.

## Teste publiseringen lokalt (Urd-utviklere)

```bash
cd template
# Legg testverdier i .dev.vars (ignorert av git; aldri commit ekte hemmeligheter):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=dittbrukernavn
npx wrangler pages dev . --port 8788
```

Da kjører nettstedet, redigereren og funksjonene på `http://localhost:8788`. En full innlogging krever en ekte GitHub-app med callback mot localhost, men feilsvarene og stisjekkene kan testes uten.

## Feilsøking

| Det du ser | Sannsynlig årsak |
|---|---|
| «Publisering er ikke konfigurert: miljøvariabelen X mangler» | Variabelen mangler i Cloudflare, eller nettstedet er ikke deployet siden den ble lagt til (steg 4) |
| «Invalid OAuth state (try signing in again)» ved innlogging | **Callback URL** i GitHub-appen stemmer ikke med nettstedets adresse, eller nettleseren blokkerer informasjonskapsler |
| GitHub viser en 404-side når du logger inn | Client ID i Cloudflare er ikke appens, eller nettstedet er ikke deployet siden den ble lagt til |
| «GitHub avviste innloggingen (utløpt token?) - logg inn på nytt» ved publisering, eller «Ugyldig eller utløpt innlogging» i Utkast, Historikk eller Oppdatering | Innloggingen har gått ut, eller den ble avsluttet hos GitHub. Logg ut og inn igjen |
| «GitHub-brukeren «X» har ikke publiseringstilgang» | Brukernavnet står ikke i `ALLOWED_LOGINS` (sjekk stavingen; store og små bokstaver spiller ingen rolle) |
| «Kunne ikke committe til GitHub» | GitHub-appen er ikke installert på nettstedets repo, eller tillatelsen **Contents** er ikke **Read and write**; med en OAuth-app er repoet privat og `GITHUB_SCOPE` ikke `repo`. Det kan også være at noen endret grenen i samme øyeblikk |
| Publiseringen virker, men nettstedet endres ikke | `GITHUB_ROOT_DIR` mangler eller er feil, så endringen havner utenfor nettstedets mappe (sjekk hvilke filer endringen rørte på GitHub) |
| «Betaling er ikke satt opp for denne siden ennå» på kassesiden | En av de fire Vipps-hemmelighetene mangler i Cloudflare, eller nettstedet er ikke deployet siden de ble lagt til |
| «Betal med kort» svarer at betaling ikke er satt opp | `STRIPE_SECRET_KEY` mangler, er den publiserbare nøkkelen (`pk_…`) i stedet for den hemmelige, eller nettstedet er ikke deployet siden den ble lagt til |
| «Betal med PayPal» svarer at PayPal ikke tar valutaen | Butikkvalutaen er en PayPal ikke tar (ISK), eller en pris har desimaler i HUF, JPY eller TWD, som PayPal bare tar i hele enheter |
| Vipps-betalingen feiler før appen åpner seg | `VIPPS_API_BASE` peker på testmiljøet mens nøklene er produksjonsnøkler, eller omvendt |
| Endringen ligger i repoet, men ingen deploy dukker opp | Cloudflare gikk glipp av endringen (det skjer av og til). Sett `DEPLOY_HOOK_URL` (se Valgfrie innstillinger), så starter publiseringen deployen selv |
| «GitHub nektet grenen de lagrede utkastene ligger på (urd-drafts)» i Utkast | Et regelsett eller en grenbeskyttelse dekker alle grener; hold `urd-drafts` utenfor (se [Lagrede utkast](#lagrede-utkast)) |
