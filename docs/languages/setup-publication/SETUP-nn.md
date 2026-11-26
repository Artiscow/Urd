# Oppsett av publisering (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · [🇬🇧 English](SETUP-en-GB.md) · [🇳🇴 Bokmål](SETUP-nb.md) · **🇳🇴 Nynorsk** · [🇹🇷 Türkçe](SETUP-tr.md)

Omsetjing av SETUP-nb.md. Den engelske teksten (SETUP-en-GB.md) er kanonisk og gjeld ved avvik.

Denne rettleiinga legg nettstaden din ut på nettet og set opp «Publiser»-knappen i editoren: editoren lagrar endringane dine i GitHub-repoet ditt, og Cloudflare Pages legg dei ut på nettstaden. Du gjer det éin gong per nettstad, og det tek rundt ti minutt.

## Dette treng du

- Ein GitHub-konto.
- Ein Cloudflare-konto (gratisplanen er nok).

Byggjer du sjølve Urd? Då er nettstaden din mappa `template` i Urd-repoet, så hopp over steg 1 og bruk Urd-repoet. Stega seier frå der noko anna er ulikt.

## 1. Lag repoet til nettstaden

1. Opne [urd-template](https://github.com/Artiscow/urd-template) på GitHub.
2. Trykk **Use this template** → **Create a new repository**.
3. Gi repoet eit namn, vel **Public** eller **Private**, og trykk **Create repository from template**.

Repoet du får, er nettstaden din. Nye versjonar av Urd kjem seinare inn gjennom **Oppdatering**-panelet i editoren.

## 2. Legg nettstaden på Cloudflare Pages

1. I Cloudflare-dashbordet går du til **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**.
2. Er ikkje Cloudflare kopla til GitHub-kontoen din enno, ber Cloudflare om å få installere GitHub-appen sin: vel kontoen din og trykk **Install & Authorize**. Vel repoet frå steg 1, og trykk **Begin setup**.
3. **Project name:** vel det med omhug. Det blir adressa til nettstaden, `<namn>.pages.dev`, og det kan ikkje endrast seinare (då må du slette prosjektet og byrje på nytt). Namna blir delte av alle på Cloudflare, så er ditt teke, legg Cloudflare til nokre tilfeldige bokstavar. Bruk berre små bokstavar, tal og bindestrek.
4. Fyll inn byggjeinnstillingane:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** la feltet stå tomt (Urd har ikkje noko byggjesteg)
   - **Build output directory:** `/`
   - **Root directory:** la feltet stå tomt. For sjølve Urd-repoet opnar du **Root directory (advanced)** og set **Path** til `template`.
5. Trykk **Save and Deploy**. Når det er ferdig, er nettstaden live på `https://<namn>.pages.dev`.

Noter adressa: dei neste stega brukar ho. Der rettleiinga skriv `<namn>.pages.dev`, brukar du di eiga.

## 3. Lag GitHub-appen

Appen lèt deg logge inn i editoren med GitHub-kontoen din, og lèt editoren lagre i repoet til nettstaden og ingenting anna.

1. På GitHub klikkar du på profilbiletet ditt (øvst til høgre) → **Settings** → **Developer settings** (nedst i menyen til venstre) → **GitHub Apps** → **New GitHub App**. Høyrer repoet til ein organisasjon, startar du frå organisasjonen i staden: **Your organizations** → **Settings** ved sida av organisasjonen → **Developer settings** → **GitHub Apps** → **New GitHub App**.
2. Fyll inn:
   - **GitHub App name:** eit namn ingen andre på GitHub har teke, høgst 34 teikn, t.d. «Urd publisering min-nettstad»
   - **Homepage URL:** adressa til nettstaden, `https://<namn>.pages.dev` eller ditt eige domene
   - **Redirect URI:** `https://<namn>.pages.dev/api/github/callback`. Der adressa har **Allow wildcard matching**, lèt du det valet vere av, så GitHub sender innlogginga tilbake til akkurat denne adressa og inga anna. Har nettstaden òg eit eige domene, trykkjer du **Add redirect URI** og legg til det domenet på same måten, t.d. `https://www.example.org/api/github/callback`: du kan berre logge inn på ei adresse som har ein.
   - La det stå hake ved **Expire user authorization tokens**, slik GitHub har det. Innlogginga varer då åtte timar om gongen, og editoren fornyar ho sjølv.
   - La **Request user authorization (OAuth) during installation** stå utan hake.
   - Under **Webhook** tek du bort haken ved **Active** og lèt **Webhook URL** stå tom.
   - Under **Permissions** → **Repository permissions** set du **Contents** til **Read and write**. La dei andre stå som dei er.
   - **Where can this GitHub App be installed?** Vel **Only on this account**.
3. Trykk **Create GitHub App**.
4. På sida til appen kopierer du **Client ID** og tek vare på ID-en til steg 4.
5. Lenger ned på same sida, under **Credentials** → **Client secrets**, trykkjer du **New secret** og kopierer løyndomen. GitHub viser han berre éin gong; mistar du han, lagar du ein ny. Meldinga øvst på sida om ein privat nøkkel (private key) kan du sjå bort frå: Urd brukar ingen privat nøkkel.
6. Installer appen på repoet til nettstaden: i appmenyen til venstre trykkjer du **Install App**, og så **Install** ved kontoen din. Vel **Only select repositories**, vel repoet frå steg 1, og trykk **Install**.

## 4. Gi Cloudflare nøklane

1. I Cloudflare-dashbordet går du til **Workers & Pages** → prosjektet ditt → **Settings** → **Variables and Secrets**.
2. For kvar variabel under trykkjer du **Add**, fyller inn **Type**, **Variable name** og **Value**, og trykkjer **Save**. Har skjemaet ein **Encrypt**-knapp i staden for typen, trykkjer du på han for å få ein **Secret**. Ein **Secret** blir gøymd når han er lagra; ein **Text** er framleis lesbar.

Trengst alltid:

| Type | Variable name | Value |
|---|---|---|
| Text | `GITHUB_REPO` | Repoet ditt som `eigar/namn`, t.d. `Artiscow/min-nettstad` |
| Text | `GITHUB_CLIENT_ID` | Client ID frå steg 3 |
| **Secret** | `GITHUB_CLIENT_SECRET` | Løyndomen frå steg 3 |
| Text | `ALLOWED_LOGINS` | GitHub-brukarnamna som får publisere, skilde med komma, t.d. `Artiscow` |

Berre i desse tilfella:

| Type | Variable name | Value | Når |
|---|---|---|---|
| Text | `GITHUB_BRANCH` | Namnet på greina (aldri `urd-drafts`) | Nettstaden blir publisert frå ei anna grein enn `main` |
| Text | `GITHUB_ROOT_DIR` | `template` | Nettstaden er sjølve Urd-repoet |

3. Deploy på nytt, sidan variablane gjeld frå neste deploy: i prosjektet opnar du **Deployments**, og så dei tre prikkane på den siste deployen → **Retry deployment**.

## 5. Sjekk at det verkar

1. Opne `https://<namn>.pages.dev/admin/`, trykk **Logg inn med GitHub**, og så **Authorize** på sida til GitHub.
2. GitHub-brukarnamnet ditt blir vist i topplinja. Eit varselteikn framfor det tyder at brukarnamnet ikkje står i `ALLOWED_LOGINS`: sjekk stavinga, og deploy på nytt.
3. Endre ein tekst, trykk **Publiser**, og så **Publiser nå**. Etter eit augeblink er endringa lagra i repoet ditt, og eit minutt seinare er ho på nettstaden.

Nettstaden er sett opp. Resten av rettleiinga er til når du treng ho.

## Valfrie innstillingar

Set desse på same måten som i steg 4, og deploy på nytt etter kvar endring.

| Type | Variable name | Value | Når |
|---|---|---|---|
| **Secret** | `DEPLOY_HOOK_URL` | Ei deploy hook-adresse: i prosjektet, **Settings** → **Builds** → **Add deploy hook** → greina `main` | Ei publisering kjem av og til aldri fram til nettstaden, sjølv om endringa ligg i repoet. Med denne sett startar publiseringa deployen sjølv. |
| **Secret** | `DRIVE_API_KEY` | Ein API-nøkkel frå Google Cloud med Drive API slått på | Ein bakgrunn hentar bileta sine frå ei delt Google Drive-mappe. Sjå [Bilete frå ei delt mappe](../setup-photos/PHOTOS-nb.md). Google Foto-album treng ingen nøkkel. |
| Text | `PHOTO_HOSTS` | Vertane bileta kan kome frå, skilde med komma, t.d. `sky.example.org` | Bileta kjem frå ei Nextcloud- eller ownCloud-deling, eller frå ei biletliste på ei anna adresse. Vertane til Google sjølv er innebygde. |
| Text | `ICS_HOSTS` | Vertane kalendrar kan kome frå, skilde med komma, t.d. `calendar.proton.me` | Ein kalender kjem frå ei anna teneste enn Google Kalender. Sjå [Kalenderen](../calendar-guide/CALENDAR-nb.md). |
| Text | `URD_TEMPLATE_REPO` | Eit malrepo som `eigar/namn` | Nettstaden skal hente oppdateringane sine frå ein kopi av urd-template i staden for `Artiscow/urd-template`. |

## Ein nettstad sett opp med ein OAuth-app

Ein nettstad som blei sett opp med ein OAuth-app, før denne rettleiinga brukte ein GitHub-app, verkar framleis. Innlogginga til ein OAuth-app når likevel alle repoa du har tilgang til, så det er tryggare å gå over til ein GitHub-app:

1. Lag ein GitHub-app som i steg 3, med adressa til nettstaden.
2. I Cloudflare, under **Variables and Secrets**, gir du `GITHUB_CLIENT_ID` og `GITHUB_CLIENT_SECRET` verdiane til appen, og fjernar `GITHUB_SCOPE` viss variabelen finst. Deploy på nytt (steg 4).
3. I editoren trykkjer du **Logg ut** ved brukarnamnet ditt i topplinja, og loggar inn igjen.
4. Slett den gamle OAuth-appen, så sant ikkje ein annan nettstad framleis brukar han: **Settings** → **Developer settings** → **OAuth Apps** → appen → **Advanced** (menyen til venstre) → **Delete application** → **Delete this OAuth Application**.

Så lenge ein nettstad brukar ein OAuth-app, treng eit privat repo variabelen `GITHUB_SCOPE` med verdien `repo`.

## Eige domene

1. I prosjektet opnar du **Custom domains** → **Set up a domain**, skriv domenet, trykkjer **Continue**, og følgjer stega til Cloudflare.
2. På GitHub opnar du appen frå steg 3 (**Settings** → **Developer settings** → **GitHub Apps** → **Edit** ved appen). Legg til ein **Redirect URI** til med det nye domenet, t.d. `https://www.example.org/api/github/callback`, og behald den med `pages.dev`, så du kan logge inn på begge adressene. Set **Homepage URL** til det nye domenet, og trykk **Save changes**.

På gratisplanen til Cloudflare slår Cloudflare på si eiga besøksteljing (Web Analytics) for eit domene du legg til, og legg skriptet sitt på sidene dine. Personvernsida fortel då dei besøkjande om det, og Juridisk-panelet nemner det. Slik slår du det av: i Cloudflare-dashbordet opnar du domenet → **Web Analytics** → **Manage RUM Settings** → **Disable**; Cloudflare slår det ikkje på igjen. Sjekk innstillinga i Cloudflare framfor å stole på Juridisk-panelet: panelet ser berre framsida slik Cloudflare leverer ho til deg, og Cloudflare tek ikkje med skriptet for besøkjande som får sidene frå datasentera i EU og Storbritannia.

## Ta betalt (valfritt)

Kasse-blokka kan ta betalinga gjennom Vipps MobilePay, Stripe eller PayPal. Utan ein leverandør sender bestillingsskjemaet bestillinga på e-post eller til ei bestillingsadresse i staden. Kvar leverandør treng sin eigen avtale og sine eigne nøklar, og du slår kvar av dei på per Kasse-blokk under **Betaling** i menyen til blokka. Kjøparen betaler alltid på leverandøren si eiga side, så nettstaden ser aldri eit kort.

Set først valutaen til butikken i Nettstad-panelet, gruppa **Butikk** → **Butikkvaluta** (ein kode som NOK, DKK eller EUR). Prisane står i den valutaen, og kvar leverandør tek betalt i han.

Greitt å vite før du testar:

- I editoren fortel eit trykk på ein betalingsknapp om nøklane til leverandøren er på plass. Ingenting blir sendt derifrå.
- Til nøklane er på plass, seier den publiserte betalingsknappen til kjøparen at betaling ikkje er sett opp enno.
- **Test betalingen**, i Betaling-gruppa til Kasse-blokka, opnar kassesida i ei ny fane med dei upubliserte endringane dine og handlekorga di. Sjølve betalinga brukar det som er publisert, så publiser kassesida og produkta først. Ein betalingsmåte eller eit produkt som ikkje er publisert enno, blir avvist, og for ein pris som berre er endra i editoren, blir den publiserte prisen trekt.
- Medan ein leverandør brukar testnøklar, viser den publiserte kassa ei linje om at betalingar ikkje trekkjer pengar. Linja forsvinn når dei ekte nøklane er på plass.

### Vipps MobilePay

Du treng ein Vipps MobilePay-avtale for betaling på nettet (ePayment-API-et) og dei fire nøklane til salsstaden. Ein dansk eller finsk MobilePay-salsstad følgjer dei same stega, med butikkvalutaen DKK eller EUR; reservasjonane er kortare der (steg 6). Namna på menyane og knappane under er frå den engelske visinga i portalen.

1. I Vipps MobilePay-portalen for bedrifter klikkar du **For developers** i sidemenyen og vel **Production**. Finn salsstaden og klikk **Show keys**. Kopier `client_id`, `client_secret`, den primære `Ocp-Apim-Subscription-Key`, og salsstadnummeret (MSN) som står ved salsstaden.
2. Legg dei inn i Cloudflare som i steg 4, alle fire som **Secret**: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY` og `VIPPS_MSN`.
3. For å teste først vel du **Test** under **For developers** i staden. Ein testsalsstad følgjer med avtalen, og **Add test sales unit** lagar ein til. Bruk nøklane til testsalsstaden (**Show keys**) i dei fire løyndomane, og legg til éin til: Type Text, `VIPPS_API_BASE`, verdi `https://apitest.vipps.no`.
   - Lag ein testbrukar på fana **Test users** med **Add a new test user**. Portalen gir testbrukaren eit telefonnummer og eit fødselsnummer.
   - Installer testappen Vipps MT (TestFlight på iOS; Google Play på Android etter at du har blitt med i testgruppa til Vipps; utviklarsidene lenkjer til begge). Logg inn med telefonnummeret og fødselsnummeret til testbrukaren, og stadfest med koden 0000 eller 000000. Din eigen Vipps-konto kan ikkje betale i testmiljøet.
4. Deploy på nytt (som i steg 4). Opne menyen til Kasse-blokka i editoren, kryss av for **Betaling** → «Betal med Vipps»-knapp, og publiser.
5. Test det: med testnøklane inne viser kassesida testlinja øvst i skjemaet. Legg eit produkt i handlekorga, opne kassesida og trykk «Betal med Vipps». På ein telefon opnar testappen seg; på ei datamaskin spør Vipps etter nummeret til testbrukaren og sender førespurnaden til appen. Appen ber kjøparen dele namn, e-post og telefon med butikken, og så godkjenne betalinga. Tilbake på kassesida er handlekorga tom, og sida takkar kjøparen med namn. Betalinga ligg i portalen med ordrelinjene i skildringa, og kvitteringa ligg i appen. Når det verkar, byter du til produksjonsnøklane og fjernar `VIPPS_API_BASE`.
6. Pengane er reserverte, ikkje flytta. Når du sender vara, finn du ordren blant transaksjonane i portalen og klikkar **Capture** (skriv eit beløp for å hente berre ein del). Ein norsk salsstad har 180 dagar på å hente; ein dansk eller finsk har 14, med mindre Vipps har godkjent sein henting. Reglane forbyr å hente før vara er klar. For å avlyse ein ordre vel du han og klikkar **Cancel transaction**, som frigjer reservasjonen med ein gong; portalen tilbyr dette berre for norske salsstader. Ein reservasjon som aldri blir henta, blir frigjord når fristen går ut.
7. Valfritt, til bestillingsvarsla som kjem med butikken i v1.1: registrer ein webhook, så Vipps fortel nettstaden om betalingar. Nettstaden lagrar ingenting enno, men adressa `/api/pay/vipps/webhook` er på plass og avviser kvar levering som ikkje er signert med løyndomen til registreringa. Registrer webhooken med kommandoane under, og legg `secret` frå svaret inn i Cloudflare som **Secret** `VIPPS_WEBHOOK_SECRET`:

```bash
# Tilgangstokenet (gyldig 24 timar i produksjon, 1 time i testmiljøet).
# I testmiljøet brukar du https://apitest.vipps.no og testnøklane; registreringa i kvart miljø har sin eigen løyndom.
curl -X POST https://api.vipps.no/accesstoken/get \
  -H "client_id: <client_id>" -H "client_secret: <client_secret>" \
  -H "Ocp-Apim-Subscription-Key: <abonnementsnøkkel>" -H "Merchant-Serial-Number: <MSN>"

# Registreringa; secret frå svaret går inn i VIPPS_WEBHOOK_SECRET
curl -X POST https://api.vipps.no/webhooks/v1/webhooks \
  -H "Authorization: Bearer <access_token>" \
  -H "Ocp-Apim-Subscription-Key: <abonnementsnøkkel>" -H "Merchant-Serial-Number: <MSN>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://<nettstad>/api/pay/vipps/webhook","events":["epayments.payment.authorized.v1"]}'
```

### Stripe (kort, Apple Pay, Google Pay, Klarna og meir)

Sida til Stripe tek kort, Apple Pay, Google Pay, Klarna, MobilePay og dei andre metodane du slår på i Stripe-dashbordet, i dei fleste valutaer.

1. Lag ein Stripe-konto, og test i ei sandkasse først (**Sandboxes** i kontoveljaren i dashbordet). På sida **API keys** (`dashboard.stripe.com/apikeys`) klikkar du **Create restricted key**, gir **Checkout Sessions** Write og **Payment Intents** Read, og lèt resten stå på None (Stripe tilrår dette framfor den fulle hemmelege nøkkelen). Legg nøkkelen (`rk_test_…`; ein hemmeleg nøkkel `sk_test_…` verkar òg) inn i Cloudflare som **Secret** `STRIPE_SECRET_KEY`, og deploy på nytt. Feilar ei testbetaling, viser **View request logs** for nøkkelen kva løyve som mangla.
2. Under **Settings** → **Payment methods** slår du på metodane du vil ha. Apple Pay og Google Pay dukkar opp på sida til Stripe av seg sjølve, på einingane som støttar dei. La metodane som brukar dagar på å bli gjorde opp (SEPA Direct Debit, bankoverføringar) vere av: kassesida stadfestar berre det som blir stadfesta med ein gong, så kjøparen ville ikkje ha blitt takka.
3. Opne menyen til Kasse-blokka i editoren, **Betaling** → **Kortbetaling**: Stripe. **Ta pengene** seier når:
   - *Når jeg sender* held av beløpet, og du hentar det i Stripe-dashbordet når du sender vara (for kort blir beløpet halde av i 7 dagar, for Klarna i 28).
   - *Ved bestillingen* trekkjer beløpet med ein gong, for det som blir levert med ein gong, som eit medlemskap eller ein billett.

   Publiser.
4. Test det: med testnøkkelen inne viser kassesida testlinja øvst i skjemaet. Legg eit produkt i handlekorga og trykk «Betal med kort». Betal på sida til Stripe med kortnummeret `4242 4242 4242 4242`, kva framtidig dato som helst og tre vilkårlege siffer. Tilbake på kassesida er handlekorga tom, og sida takkar kjøparen med namnet Stripe samla inn. Blant betalingane i sandkassa står betalinga som **Uncaptured** (Når jeg sender: opne ho og klikk **Capture** når du sender vara) eller **Succeeded** (Ved bestillingen). Kortet `4000 0000 0000 9995` viser eit avvist kort, og handlekorga blir ståande.
5. Valfritt, til bestillingsvarsla som kjem med butikken i v1.1: på sida **Webhooks** i Workbench (`dashboard.stripe.com/webhooks`) klikkar du **Create an event destination**, vel **Your account** og **Snapshot** som nyttelast, vel hendinga `checkout.session.completed`, vel **Webhook endpoint** og gir adressa `https://<nettstad>/api/pay/stripe/webhook`. Klikk **Reveal secret** og kopier signeringsløyndomen (`whsec_…`) inn i Cloudflare som **Secret** `STRIPE_WEBHOOK_SECRET`. Nettstaden lagrar ingenting enno, og avviser kvar levering som ikkje er signert med løyndomen eller er eldre enn fem minutt.
6. Når det verkar, byter du sida **API keys** frå sandkasse til live-modus og fullfører go-live-sjekklista til Stripe, som aktiverer kontoen. Lag ein avgrensa nøkkel for live-modus på same måten (`rk_live_…`; Stripe viser han berre éin gong). Lag webhooken på nytt i live-modus, sidan han har sin eigen signeringsløyndom. Legg begge inn i Cloudflare i staden for verdiane frå sandkassa.

### PayPal

Sida til PayPal tek PayPal-kontoen til kjøparen, eller kort utan konto der PayPal tilbyr det, i valutaene PayPal tek (NOK, DKK, SEK, EUR, GBP, USD og fleire; ikkje ISK, og HUF, JPY og TWD berre i heile einingar). PayPal trekkjer pengane ved bestillinga, sidan PayPal berre garanterer ei reservert betaling i 3 dagar, så ei bestilling du ikkje kan levere, refunderer du i PayPal-kontoen.

1. Logg inn på `developer.paypal.com` med PayPal Business-kontoen din (**Log in to Dashboard**). Under **Apps & Credentials**, med brytaren på **Sandbox**, brukar du **Default Application** eller **Create App**, og kopierer **Client ID** og **Secret**. Legg dei inn i Cloudflare som **Secret** `PAYPAL_CLIENT_ID` og `PAYPAL_CLIENT_SECRET`, og legg til Type Text `PAYPAL_API_BASE` med verdien `https://api-m.sandbox.paypal.com`. Deploy på nytt.
2. Opne menyen til Kasse-blokka i editoren, **Betaling** → kryss av for «Betal med PayPal»-knapp, og publiser.
3. Test det: med sandkassenøklane inne viser kassesida testlinja øvst i skjemaet. Under **Testing Tools** → **Sandbox Accounts** har utviklarkontoen ein personleg (kjøpar-)sandkassekonto; **⋮** → **View/Edit Account** viser e-posten og passordet. Legg eit produkt i handlekorga, trykk «Betal med PayPal», og logg inn på sida til PayPal med kjøparkontoen. Tilbake på kassesida er handlekorga tom, og sida takkar kjøparen med namn; betalinga står som fullført i sandkassekontoen til bedrifta på `sandbox.paypal.com`. Trykkjer du «Cancel» på sida til PayPal, kjem du tilbake til kassa med handlekorga i behald.
4. Valfritt, til bestillingsvarsla som kjem med butikken i v1.1: på sida til appen legg du til ein webhook med adressa `https://<nettstad>/api/pay/paypal/webhook` og hendinga `PAYMENT.CAPTURE.COMPLETED`, og kopierer ID-en til webhooken inn i Cloudflare som Type Text `PAYPAL_WEBHOOK_ID`. Nettstaden lagrar ingenting enno; for kvar levering spør nettstaden PayPal om det var PayPal som sende ho, og avviser resten. Sandkassa og live-appen har kvar sin webhook-ID.
5. For å gå live treng du ein verifisert PayPal Business- (eller Premier-)konto. Byt **Apps & Credentials** til **Live**, og hent **Client ID** og **Secret** for live-appen (PayPal kan gå gjennom appen først, innan 24 til 72 timar). Legg dei inn i dei to løyndomane, fjern `PAYPAL_API_BASE` så live-tenesta blir brukt, og legg til webhooken på nytt for live-appen viss du brukar han.

## Lagra utkast

Utkast-vindauget i editoren lagrar utkast på GitHub, så du kan hente dei fram på ei anna eining. Dei hamnar i ei eiga grein, `urd-drafts`, som den første lagringa lagar. Ingenting må setjast opp for det, men tre ting er greie å vite:

- **Lagringar når aldri nettstaden.** Kvar lagring er merkt slik at Cloudflare ikkje byggjer noko frå lagringa: ho når aldri den publiserte nettstaden, brukar aldri eitt av bygga til prosjektet og blir aldri vist i Historikk.
- **Hald greina utanfor førehandsvisingsbygga.** Cloudflare byggjer ei førehandsvising av kvar grein som standard. For å vere på den sikre sida held du `urd-drafts` utanfor: i prosjektet, **Settings** → **Builds** → **Branch control**, og under **Preview branch** vel du **None**, eller **Custom branches** med `*` blant greinene som blir tekne med og `urd-drafts` blant dei som blir haldne utanfor.
- **Reglar på alle greiner stoppar lagringane.** Eit GitHub-regelsett (ruleset) eller eit greinvern som dekkjer alle greiner (eit som avgrensar å lage greiner eller krev ein pull request, til dømes) stoppar òg lagringane, og Utkast seier «GitHub nekta greina dei lagra utkasta ligg på (urd-drafts); sjå oppsettsrettleiinga». Hald greina utanfor: i repoet, **Settings** → **Rules** → **Rulesets** → regelsettet → **Target branches** → **Add target** → **Exclude by pattern** → `urd-drafts`. For ein klassisk vernregel under **Settings** → **Branches** med mønsteret `*` endrar du mønsteret til `main`.

I eit offentleg repo kan alle lese dei lagra utkasta og notata på dei, slik dei kan lese resten av repoet.

## Slik blir publiseringa halden trygg

- Innlogginga di når berre repoet til nettstaden og varer åtte timar om gongen; editoren fornyar ho sjølv. Ho ligg i ein informasjonskapsel som sida sine eigne skript ikkje kan lese.
- Berre brukarnamna i `ALLOWED_LOGINS` kan publisere; nettstaden sjekkar det ved kvar endring, ikkje berre i editoren.
- Publisering kan berre skrive innhaldet og media til nettstaden, pluginlista, nettstadkartet, `robots.txt`, omdirigeringane og kopien kvar side har av `index.html`-fila til nettstaden, og kan slette mappa til ein plugin. Koden og tryggingsfilene til nettstaden blir avviste, så den som tok over ei redigeringsøkt, kunne ikkje plante kode.
- Lagring av utkast skriv berre greina `urd-drafts`, aldri greina til sjølve nettstaden.

## Teste publiseringa lokalt (Urd-utviklarar)

```bash
cd template
# Legg testverdiar i .dev.vars (ignorert av git; aldri commit ekte løyndomar):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=dittbrukarnamn
npx wrangler pages dev . --port 8788
```

Då køyrer nettstaden, editoren og funksjonane på `http://localhost:8788`. Ei full innlogging krev ein ekte GitHub-app med ein **Redirect URI** mot localhost, `http://localhost:8788/api/github/callback`, men feilsvara og stisjekkane kan testast utan.

## Feilsøking

| Det du ser | Sannsynleg årsak |
|---|---|
| «Publisering er ikkje konfigurert: miljøvariabelen X manglar» | Variabelen manglar i Cloudflare, eller nettstaden er ikkje deploya sidan variabelen blei lagd til (steg 4) |
| GitHub seier «The redirect_uri is not associated with this application» når du loggar inn | Ingen **Redirect URI** i GitHub-appen har adressa du opna editoren på; eit eige domene treng sin eigen (sjå «Eige domene») |
| «Invalid OAuth state (try signing in again)» ved innlogging | Du trykte Cancel på sida til GitHub, det gjekk meir enn ti minutt der, eller nettlesaren blokkerer informasjonskapslar; logg inn igjen |
| GitHub viser ei 404-side når du loggar inn | Client ID i Cloudflare er ikkje den til appen, eller nettstaden er ikkje deploya sidan ID-en blei lagd til |
| «GitHub avviste innlogginga (utgått token?) - logg inn på nytt» ved publisering, eller «Ugyldig eller utgått innlogging» i Utkast, Historikk eller Oppdatering | Innlogginga har gått ut, eller ho blei avslutta hos GitHub. Logg ut og inn igjen |
| «GitHub-brukaren «X» har ikkje publiseringstilgang» | Brukarnamnet står ikkje i `ALLOWED_LOGINS` (sjekk stavinga; store og små bokstavar spelar inga rolle) |
| «Kunne ikkje committe til GitHub» | GitHub-appen er ikkje installert på repoet til nettstaden, eller løyvet **Contents** er ikkje **Read and write**; med ein OAuth-app er repoet privat og `GITHUB_SCOPE` ikkje `repo`. Det kan òg vere at nokon endra greina i same augeblinken |
| Publiseringa verkar, men nettstaden endrar seg ikkje | `GITHUB_ROOT_DIR` manglar eller er feil, så endringa hamnar utanfor mappa til nettstaden (sjekk kva filer endringa rørte på GitHub) |
| «Betaling er ikke satt opp for denne siden ennå» på kassesida | Ein av dei fire Vipps-løyndomane manglar i Cloudflare, eller nettstaden er ikkje deploya sidan dei blei lagde til |
| «Betal med kort» svarar at betaling ikkje er sett opp | `STRIPE_SECRET_KEY` manglar, er den publiserbare nøkkelen (`pk_…`) i staden for den hemmelege, eller nettstaden er ikkje deploya sidan nøkkelen blei lagd til |
| «Betal med PayPal» svarar at PayPal ikkje tek valutaen | Butikkvalutaen er ein PayPal ikkje tek (ISK), eller ein pris har desimalar i HUF, JPY eller TWD, som PayPal berre tek i heile einingar |
| Vipps-betalinga feilar før appen opnar seg | `VIPPS_API_BASE` peikar på testmiljøet medan nøklane er produksjonsnøklar, eller omvendt |
| Endringa ligg i repoet, men ingen deploy dukkar opp | Cloudflare gjekk glipp av endringa (det skjer av og til). Set `DEPLOY_HOOK_URL` (sjå Valfrie innstillingar), så startar publiseringa deployen sjølv |
| «GitHub nekta greina dei lagra utkasta ligg på (urd-drafts)» i Utkast | Eit regelsett eller eit greinvern dekkjer alle greiner; hald `urd-drafts` utanfor (sjå [Lagra utkast](#lagra-utkast)) |
