# Almmuheami heiveheapmi (GitHub + Cloudflare Pages)

**Sámegiella** · [🇬🇧 English](SETUP-en-GB.md) · [🇳🇴 Bokmål](SETUP-nb.md) · [🇳🇴 Nynorsk](SETUP-nn.md) · [🇹🇷 Türkçe](SETUP-tr.md)

SETUP-nb.md jorgalus. Eaŋgalasgiel teaksta (SETUP-en-GB.md) lea kanonalaš ja gusto go leat erohusat.

> FUOMÁŠ: dát lea maskiinjorgaluvvon vuosttašárvalus mii dárbbaša geahčadeami olbmos geas lea davvisámegiella eatnigiellan.

Dát bagadus bidjá du neahttabáikki neahttii ja heiveha «Almmut»-boalu doaimmaheaddjis: doaimmaheaddji vurke du rievdadusaid du GitHub-repoi, ja Cloudflare Pages bidjá daid neahttabáikái. Dan dagat oktii juohke neahttabáikki ovddas, ja dat ádjána sullii logi minuhta.

## Dát dárbbašat

- GitHub-konto.
- Cloudflare-konto (nuvttáplána lea doarvái).

Leat go huksemin ieš Urd? Dalle du neahttabáiki lea `template`-máhppa Urd-repos, nu ahte it dárbbaš lávkki 1, ja geavat Urd-repo. Lávkkit muitalit gos juoga eará lea earálágan.

## 1. Ráhkat neahttabáikki repo

1. Raba [urd-template](https://github.com/Artiscow/urd-template) GitHubas.
2. Deaddil **Use this template** → **Create a new repository**.
3. Atte repoi nama, vállje **Public** dahje **Private**, ja deaddil **Create repository from template**.

Repo maid oaččut, lea du neahttabáiki. Ođđa Urd-veršuvnnat bohtet maŋŋel doaimmaheaddji **Ođasmahttin**-panela bokte.

## 2. Bija neahttabáikki Cloudflare Pagesii

1. Cloudflare-dashbordas mana **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**.
2. Jus Cloudflare ii leat vel čadnon du GitHub-kontui, de dat bivdá sajáiduhttit iežas GitHub-appa: vállje iežat kontu ja deaddil **Install & Authorize**. Vállje repo lávkkis 1, ja deaddil **Begin setup**.
3. **Project name:** vállje dan várrogasat. Dat šaddá neahttabáikki čujuhussan, `<name>.pages.dev`, ja dan ii sáhte rievdadit maŋŋel (dalle fertet sihkkut prošeavtta ja álgit ođđasit). Buot Cloudflare-geavaheaddjit juogadit namaid, nu ahte jus du namma lea juo váldon, de Cloudflare lasiha dasa moadde soaittáhagas válljejuvvon bustáva. Geavat dušše smávva bustávaid, loguid ja gaskastreahkaid.
4. Deavdde huksenheivehusaid:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** guođe gietti guorusin (Urd ii dárbbaš huksenlávkki)
   - **Build output directory:** `/`
   - **Root directory:** guođe gietti guorusin. Ieš Urd-repo várás raba **Root directory (advanced)** ja bija `template` **Path**-gieddái.
5. Deaddil **Save and Deploy**. Go dat lea gárvvis, de neahttabáiki lea neahtas čujuhusas `https://<name>.pages.dev`.

Merke čujuhusa: boahtte lávkkit geavahit dan. Gos bagadus čállá `<name>.pages.dev`, geavat iežat čujuhusa.

## 3. Ráhkat GitHub Appa

Appa bokte sáhtát čálihit sisa doaimmaheaddjái iežat GitHub-kontuin, ja doaimmaheaddji sáhttá vurket neahttabáikki repoi iige maidege eará.

1. GitHubas coahkkal iežat profiilagova (bajimusas olgeš bealde) → **Settings** → **Developer settings** (gurut fálu vuolimusas) → **GitHub Apps** → **New GitHub App**. Jus repo gullá organisašuvdnii, de álgge organisašuvnnas baicca: **Your organizations** → **Settings** dan bálddas → **Developer settings** → **GitHub Apps** → **New GitHub App**.
2. Deavdde:
   - **GitHub App name:** namma maid ii oktage eará GitHubas leat váldán, eanemusat 34 mearkka, omd. «Urd publishing my-site»
   - **Homepage URL:** neahttabáikki čujuhus, `https://<name>.pages.dev` dahje iežat domena
   - **Redirect URI:** `https://<name>.pages.dev/api/github/callback`. Gos čujuhusas lea **Allow wildcard matching**, guođe dan jáddaduvvon, vai GitHub sádde sisačáliheami ruovttoluotta dušše juste dán čujuhussii. Jus neahttabáikkis lea maiddái iežas domena, deaddil **Add redirect URI** ja lasit dan domena seamma láhkai, omd. `https://www.example.org/api/github/callback`: sáhtát čálihit sisa dušše dakkár čujuhusas mas lea iežas **Redirect URI**.
   - Guođe **Expire user authorization tokens** merkejuvvon, nugo GitHub lea dan bidjan. Dalle sisačáliheapmi bistá gávcci diimmu hávális, ja doaimmaheaddji ođasmahttá dan ieš.
   - Ale merke **Request user authorization (OAuth) during installation**.
   - **Webhook** vuolde váldde merkema eret **Active**-ruvttus ja guođe **Webhook URL** guorusin.
   - **Permissions** → **Repository permissions** vuolde: **Contents**-lohpái vállje **Read and write**. Guođe earáid nugo leat.
   - **Where can this GitHub App be installed?** Vállje **Only on this account**.
3. Deaddil **Create GitHub App**.
4. Appa siiddus máŋge **Client ID** ja vurke dan lávkki 4 várás.
5. Vuolleleappos seamma siiddus, **Credentials** → **Client secrets** vuolde, deaddil **New secret** ja máŋge suollemasvuođa. GitHub čájeha dan dušše oktii; jus massát dan, de ráhkat ođđa. Dieđáhus siiddu bajimusas priváhta čoavddaid (private key) birra ii guoskka dutnje: Urd ii geavat priváhta čoavddaid.
6. Sajáiduhte appa neahttabáikki repoi: appa gurut fálus deaddil **Install App**, ja de **Install** iežat kontu bálddas. Vállje **Only select repositories**, vállje repo lávkkis 1, ja deaddil **Install**.

## 4. Atte Cloudflarei čoavddaid

1. Cloudflare-dashbordas mana **Workers & Pages** → iežat prošeakta → **Settings** → **Variables and Secrets**.
2. Juohke vuolábeale variábela várás deaddil **Add**, deavdde **Type**, **Variable name** ja **Value**, ja deaddil **Save**. Jus skovis lea **Encrypt**-boallu šlája sajis, deaddil dan **Secret** várás. **Secret** čihkkojuvvo go dat lea vurkejuvvon; **Text** bissu lohkkehahttin.

Dárbbašuvvojit álo:

| Type | Variable name | Value |
|---|---|---|
| Text | `GITHUB_REPO` | Du repo hámis `owner/name`, omd. `Artiscow/my-site` |
| Text | `GITHUB_CLIENT_ID` | Client ID lávkkis 3 |
| **Secret** | `GITHUB_CLIENT_SECRET` | Suollemasvuohta lávkkis 3 |
| Text | `ALLOWED_LOGINS` | GitHub-geavaheaddjinamat mat besset almmuhit, kommain sirrejuvvon, omd. `Artiscow` |

Dušše dáin dilálašvuođain:

| Type | Variable name | Value | Goas |
|---|---|---|---|
| Text | `GITHUB_BRANCH` | Oaljji namma (ii goassege `urd-drafts`) | Neahttabáiki almmuhuvvo eará oaljji bokte go `main` |
| Text | `GITHUB_ROOT_DIR` | `template` | Neahttabáiki lea ieš Urd-repo |

3. Álggat ođđa deploya, danne go variábelat gustojit boahtte deploya rájes: prošeavttas raba **Deployments**, ja de golbma čuoggá maŋimuš deploya alde → **Retry deployment**.

## 5. Dárkkis ahte dat doaibmá

1. Raba `https://<name>.pages.dev/admin/`, deaddil **Logge sisa GitHubain**, ja de **Authorize** GitHub-siiddus.
2. Du GitHub-geavaheaddjinamma oidno bajimuš holggas. Várrehusmearka dan ovddabealde mearkkaša ahte geavaheaddjinamma ii leat `ALLOWED_LOGINS`-listtus: dárkkis čállinvuogi, ja álggat ođđa deploya.
3. Rievdat teavstta, deaddil **Almmut**, ja de **Publiser nå**. Veaháš maŋŋel lea rievdadus vurkejuvvon du repoi, ja minuhta maŋŋel dat lea neahttabáikkis.

Neahttabáiki lea dál ásahuvvon. Bagadusa eará oasit leat dasa go dárbbašat daid.

## Eaktodáhtolaš heivehusat

Bija dáid seamma láhkai go lávkkis 4, ja álggat ođđa deploya juohke rievdadusa maŋŋel.

| Type | Variable name | Value | Goas |
|---|---|---|---|
| **Secret** | `DEPLOY_HOOK_URL` | Deploy hook-čujuhus: prošeavttas, **Settings** → **Builds** → **Add deploy hook** → `main`-oaljji | Almmuheapmi muhtumin ii goassege olle neahttabáikái, vaikko rievdadus lea repos. Go dát lea biddjon, de almmuheapmi ieš álggaha deploya. |
| **Secret** | `DRIVE_API_KEY` | API-čoavdda Google Cloudas, mas Drive API lea álggahuvvon | Duogáš viežžá govaidis juogaduvvon Google Drive-máhpas. Geahča [Govat juogaduvvon máhpas](../setup-photos/PHOTOS-nb.md) (dárogillii). Google Photos-albumat eai dárbbaš čoavddaid. |
| Text | `PHOTO_HOSTS` | Vertat main govat sáhttet boahtit, kommain sirrejuvvon, omd. `sky.example.org` | Govat bohtet Nextcloud- dahje ownCloud-juogadeamis, dahje govvalisttus eará čujuhusas. Google iežas vertat leat juo mielde. |
| Text | `ICS_HOSTS` | Vertat main kaleandarat sáhttet boahtit, kommain sirrejuvvon, omd. `calendar.proton.me` | Kaleandar boahtá eará bálvalusas go Google Kaleandaris. Geahča [Kaleandar](../calendar-guide/CALENDAR-nb.md) (dárogillii). |
| Text | `URD_TEMPLATE_REPO` | Mállerepo hámis `owner/name` | Neahttabáiki galgá viežžat ođasmahttimiiddis urd-template-máŋgosis `Artiscow/urd-template` sajis. |

## Neahttabáiki mii lea ásahuvvon OAuth Appain

Neahttabáiki mii ásahuvvui OAuth Appain ovdal go dát bagadus geavahii GitHub Appa, doaibmá ain. OAuth Appa sisačáliheapmi olaha goit buot repoid maidda dus lea beassan, nu ahte lea dorvvoleabbo molsut GitHub Appii:

1. Ráhkat GitHub Appa nugo lávkkis 3, neahttabáikki čujuhusain.
2. Cloudflares, **Variables and Secrets** vuolde, bija appa árvvuid `GITHUB_CLIENT_ID`- ja `GITHUB_CLIENT_SECRET`-variábeliidda, ja váldde eret `GITHUB_SCOPE` jus dat gávdno. Álggat ođđa deploya (lávki 4).
3. Doaimmaheaddjis deaddil **Logg ut** iežat geavaheaddjinama bálddas bajimuš holggas, ja čáliht sisa ođđasit.
4. Sihko boares OAuth Appa, earret jus eará neahttabáiki ain geavaha dan: **Settings** → **Developer settings** → **OAuth Apps** → appa namma → **Advanced** (gurut fállu) → **Delete application** → **Delete this OAuth Application**.

Nu guhká go neahttabáiki geavaha OAuth Appa, dárbbaša priváhta repo variábela `GITHUB_SCOPE` árvvuin `repo`.

## Iežat domena

1. Prošeavttas raba **Custom domains** → **Set up a domain**, čále domena, deaddil **Continue**, ja čuovo Cloudflare-lávkkiid.
2. GitHubas raba appa lávkkis 3 (**Settings** → **Developer settings** → **GitHub Apps** → **Edit** appa bálddas). Lasit vel ovtta **Redirect URI** ođđa domenain, omd. `https://www.example.org/api/github/callback`, ja doala dan mas lea `pages.dev`, vai sáhtát čálihit sisa goappašiin čujuhusain. Bija ođđa domena **Homepage URL**-gieddái, ja deaddil **Save changes**.

Cloudflare nuvttáplánas Cloudflare álggaha iežas galledanlohkama (Web Analytics) domenii maid lasihat, ja bidjá iežas skripta du siidduide. Persovdnasuodjalussiidu muitala dalle dan du gallededdjiide, ja Juridisk-panela namuha dan. Ná jáddadat dan: Cloudflare-dashbordas raba domena → **Web Analytics** → **Manage RUM Settings** → **Disable**; Cloudflare ii álggat dan fas. Dárkkis heivehusa Cloudflares baicca go luohttit Juridisk-panelii: panela oaidná dušše ovdasiiddu nugo Cloudflare dan bálvala dutnje, ja Cloudflare ii bija skripta dan siidduide maid dat bálvala gallededdjiide iežas EU- ja Stuorra-Británnia dáhtaguovddážiin.

## Váldit mávssu (eaktodáhtolaš)

Kasse-blohkka sáhttá váldit mávssu Vipps MobilePay, Stripe dahje PayPal bokte. Almmá máksobálvalusa haga diŋgonskovvi sádde diŋgojumi baicca e-poasttain dahje diŋgončujuhussii. Juohke máksobálvalus dárbbaša iežas šiehtadusa ja iežas čoavddaid, ja juohke máksobálvalusa álggahat sierra juohke Kasse-blohkkii, blohka fálus **Betaling** vuolde. Oasti máksá álo máksobálvalusa iežas siiddus, nu ahte neahttabáiki ii goassege oainne koartta.

Bija vuos gávpevaluhta Neahttabáiki-panelas, joavku **Butikk** → **Butikkvaluta** (koda nugo NOK, DKK dahje EUR). Haddit leat dan valuhtas, ja juohke máksobálvalus geassá mávssu dan valuhtas.

Buorre diehtit ovdal go geahččalat:

- Go deaddilat máksoboalu doaimmaheaddjis, de dat muitala leat go máksobálvalusa čoavddat sajis. Doppe ii sáddejuvvo mihkkege.
- Dassážii go čoavddat leat sajis, almmuhuvvon máksoboallu muitala oastái ahte máksu ii leat vel ásahuvvon.
- **Test betalingen**, Kasse-blohka Betaling-joavkkus, rahpá máksosiiddu ođđa fános rievdadusaiguin maid it leat vel almmuhan ja dainna maid leat bidjan gávpevuorjui. Ieš máksu geavaha dan mii lea almmuhuvvon, nu ahte almmut máksosiiddu ja buktagiid vuos. Máksinvuohki dahje buvtta mii ii leat vel almmuhuvvon, hilgojuvvo, ja haddi mii lea rievdaduvvon dušše doaimmaheaddjis, gessojuvvo almmuhuvvon hattiin.
- Dan botta go máksobálvalus geavaha geahččalančoavddaid, almmuhuvvon máksosiidu čájeha linnjá mii muitala ahte mávssut eai gease ruđa. Dat jávká go duohta čoavddat leat sajis.

### Vipps MobilePay

Dárbbašat Vipps MobilePay-šiehtadusa neahttamávssu várás (ePayment-API) ja vuovdinbáikki čoavddaid, oktiibuot njeallje. Dánska dahje suoma MobilePay-vuovdinbáiki čuovvu seamma lávkkiid, gávpevaluhtain DKK dahje EUR; várremat leat oaneheappot doppe (lávki 6). Fáluid ja boaluid namat vuolábealde leat portála eaŋgalasgiel čájeheamis.

1. Vipps MobilePay-fitnodatportálas coahkkal **For developers** bealfálus ja vállje **Production**. Gávnna vuovdinbáikki ja coahkkal **Show keys**. Máŋge `client_id`, `client_secret`, vuosttaš `Ocp-Apim-Subscription-Key` ja vuovdinbáikki nummira (MSN) mii čuožžu vuovdinbáikki bálddas.
2. Bija daid Cloudflarei nugo lávkkis 4, buot njeallje dego **Secret**: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY` ja `VIPPS_MSN`.
3. Jus háliidat geahččalit vuos, de **For developers** vuolde vállje baicca **Test**. Geahččalanvuovdinbáiki čuovvu šiehtadusa, ja **Add test sales unit** ráhkada vel ovtta. Geavat dan čoavddaid (**Show keys**) dain njealji suollemasvuođain, ja lasit vel ovtta: Type Text, `VIPPS_API_BASE`, árvu `https://apitest.vipps.no`.
   - Ráhkat geahččalangeavaheaddji **Test users**-fános **Add a new test user** bokte. Portála addá dasa telefovdnanummira ja riegádannummira.
   - Sajáiduhte geahččalanappa Vipps MT (TestFlight iOS:s; Google Play Androidas, maŋŋel go leat searvan Vipps-geahččalanjovkui; ovddideaddjisiidduin leat liŋkkat goappašiidda). Čáliht sisa geahččalangeavaheaddji telefovdnanummiriin ja riegádannummiriin, ja duođaš kodain 0000 dahje 000000. Du iežat Vipps-konto ii sáhte máksit geahččalanbirrasis.
4. Álggat ođđa deploya (nugo lávkkis 4). Raba Kasse-blohka fálu doaimmaheaddjis, merke **Betaling** → «Betal med Vipps»-knapp, ja almmut.
5. Geahččal dan: go geahččalančoavddat leat sajis, máksosiidu čájeha geahččalanlinnjá skovi bajimusas. Bija buktaga gávpevuorjui, raba máksosiiddu ja deaddil «Betal med Vipps». Telefovnnas rahpasa geahččalanappa; dihtoris Vipps jearrá geahččalangeavaheaddji nummira ja sádde jearaldaga appii. Appa bivdá oasti juogadit nama, e-poastta ja telefovdnanummira gávpáin, ja de dohkkehit mávssu. Go máhcat máksosiidui, de gávpevuorju lea guorus ja siidu giitá oasti namain. Máksu lea portálas diŋgonlinnjáiguin válddahusas, ja kuitta lea appas. Go dat doaibmá, molsso buvttadančoavddaide ja váldde eret `VIPPS_API_BASE`.
6. Ruđat leat várrejuvvon, eai sirdojuvvon. Go gálvu sáddejuvvo, gávnna diŋgojumi portála transakšuvnnaid gaskkas ja coahkkal **Capture** (čále supmi jus háliidat viežžat dušše oasi). Norgga vuovdinbáikkis leat 180 beaivvi viežžat; dánska dahje suoma vuovdinbáikkis leat 14, earret jus Vipps lea dohkkehan maŋit viežžama. Njuolggadusat gildet viežžama ovdal go gálvu lea gárvvis. Jus háliidat gaskkalduhttit diŋgojumi, vállje dan ja coahkkal **Cancel transaction**, mii luoitá várrema dakkaviđe; portála fállá dán dušše norgga vuovdinbáikkiide. Várren mii ii goassege vižžojuvvo, luitojuvvo go áigemearri nohká.
7. Eaktodáhtolaš, diŋgondieđáhusaid várás mat bohtet gávpáin v1.1:s: registrere webhooka, vai Vipps muitala neahttabáikái mávssuid birra. Neahttabáiki ii vurke vel maidege, muhto čujuhus `/api/pay/vipps/webhook` lea sajis ja hilgu juohke dieđáhusa mii ii leat vuolláičállojuvvon registrerema suollemasvuođain. Registrere dan vuolábeale gohččumiiguin, ja bija `secret` vástádusas Cloudflarei dego **Secret** `VIPPS_WEBHOOK_SECRET`:

```bash
# Beassantoken (gustovaš 24 diimmu buvttadanbirrasis, 1 diibmu geahččalanbirrasis).
# Geahččalanbirrasis geavat https://apitest.vipps.no ja geahččalančoavddaid; juohke birrasa registreremis lea iežas suollemasvuohta.
curl -X POST https://api.vipps.no/accesstoken/get \
  -H "client_id: <client_id>" -H "client_secret: <client_secret>" \
  -H "Ocp-Apim-Subscription-Key: <subscription key>" -H "Merchant-Serial-Number: <MSN>"

# Registreren; vástádusa secret manná VIPPS_WEBHOOK_SECRET-variábelii
curl -X POST https://api.vipps.no/webhooks/v1/webhooks \
  -H "Authorization: Bearer <access_token>" \
  -H "Ocp-Apim-Subscription-Key: <subscription key>" -H "Merchant-Serial-Number: <MSN>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://<site>/api/pay/vipps/webhook","events":["epayments.payment.authorized.v1"]}'
```

### Stripe (koarta, Apple Pay, Google Pay, Klarna ja eará)

Stripe-siidu váldá vuostá koarttaid, Apple Pay, Google Pay, Klarna, MobilePay ja eará vugiid maid álggahat Stripe-dashbordas, eanaš valuhtain.

1. Ráhkat Stripe-kontu, ja geahččal vuos sandboxas (**Sandboxes** dashborda kontoválljejeaddjis). **API keys**-siiddus (`dashboard.stripe.com/apikeys`) coahkkal **Create restricted key**, atte **Checkout Sessions**-oassái Write ja **Payment Intents**-oassái Read, ja guođe earáid None-dássái (Stripe ávžžuha dán baicca go ollislaš suollemas čoavdda). Bija dan Cloudflarei dego **Secret** `STRIPE_SECRET_KEY` (čoavdda álgá `rk_test_…`; suollemas čoavdda `sk_test_…` doaibmá maiddái), ja álggat ođđa deploya. Jus geahččalanmáksu filte, de ráddjejuvvon čoavddaid listtus **View request logs** čájeha guhte lohpi váilui.
2. **Settings** → **Payment methods** vuolde álggat vugiid maid háliidat. Apple Pay ja Google Pay čájehuvvojit Stripe-siiddus automáhtalaččat, rusttegiin mat dorjot daid. Guođe jáddaduvvon vugiid main máksu ádjána beivviid ovdal go dat čađahuvvo (SEPA Direct Debit, bánkosirdimat): máksosiidu duođašta dušše dan mii duođaštuvvo dakkaviđe, nu ahte oasti ii livčče oažžun giitosa.
3. Raba Kasse-blohka fálu doaimmaheaddjis, **Betaling** → **Kortbetaling**: Stripe. **Ta pengene** mearrida goas:
   - *Når jeg sender* várre supmi, ja don vieččat dan Stripe-dashbordas go gálvu sáddejuvvo (koarttat várrejuvvojit 7 beaivvi, Klarna 28).
   - *Ved bestillingen* geassá supmi dakkaviđe, dakkár ášši ovddas mii doaimmahuvvo dakkaviđe, nugo miellahttovuohta dahje bileahtta.

   Almmut.
4. Geahččal dan: go geahččalančoavdda lea sajis, máksosiidu čájeha geahččalanlinnjá skovi bajimusas. Bija buktaga gávpevuorjui ja deaddil «Betal med kort». Mávsse Stripe-siiddus koartanummiriin `4242 4242 4242 4242`, ja čále vaikko makkár boahttevaš dáhtona ja vaikko makkár golbma logu. Go máhcat máksosiidui, de gávpevuorju lea guorus ja siidu giitá oasti dan namain maid Stripe čohkkii. Sandboxa mávssuid gaskkas máksu čuožžu dego **Uncaptured** (Når jeg sender: raba dan ja coahkkal **Capture** go gálvu sáddejuvvo) dahje **Succeeded** (Ved bestillingen). Koarta `4000 0000 0000 9995` čájeha hilgojuvvon koartta, ja gávpevuorju bissu.
5. Eaktodáhtolaš, diŋgondieđáhusaid várás mat bohtet gávpáin v1.1:s: **Webhooks**-siiddus Workbenchas (`dashboard.stripe.com/webhooks`) coahkkal **Create an event destination**, vállje **Your account** ja **Snapshot**-sisdoalu, vállje dáhpáhusa `checkout.session.completed`, vállje **Webhook endpoint** ja atte čujuhusa `https://<site>/api/pay/stripe/webhook`. Coahkkal **Reveal secret** ja máŋge vuolláičállinsuollemasvuođa (`whsec_…`) Cloudflarei dego **Secret** `STRIPE_WEBHOOK_SECRET`. Neahttabáiki ii vurke vel maidege, ja hilgu juohke dieđáhusa mii ii leat vuolláičállojuvvon suollemasvuođain dahje mii lea boarráset go vihtta minuhta.
6. Go dat doaibmá, molsso **API keys**-siiddu sandboxas live-dillái ja čađat Stripe go-live-dárkkistanlisttu, mii álggaha kontu. Ráddjejuvvon čoavdda live-dillái ráhkaduvvo seamma láhkai (`rk_live_…`; Stripe čájeha dan dušše oktii). Ráhkat webhooka ođđasit live-dilis, danne go das lea iežas vuolláičállinsuollemasvuohta. Bija goappašagaid Cloudflarei sandboxa árvvuid sadjái.

### PayPal

PayPal-siidu váldá vuostá oasti PayPal-kontu, dahje koartta almmá kontu haga gos PayPal fállá dan, valuhtain maid PayPal váldá vuostá (NOK, DKK, SEK, EUR, GBP, USD ja eará; ii ISK, ja HUF, JPY ja TWD dušše ollesovttadagain). PayPal geassá ruđaid diŋgojumi áigge, danne go várrejuvvon máksu dáhkiduvvo dušše 3 beaivvi, nu ahte diŋgojumi maid it sáhte doaimmahit, máksát ruovttoluotta PayPal-kontus.

1. Čáliht sisa čujuhusas `developer.paypal.com` iežat PayPal Business-kontuin (**Log in to Dashboard**). **Apps & Credentials** vuolde, go molsunboallu lea **Sandbox**-sajis, geavat **Default Application** dahje **Create App**, ja máŋge **Client ID** ja **Secret**. Bija daid Cloudflarei dego **Secret** `PAYPAL_CLIENT_ID` ja `PAYPAL_CLIENT_SECRET`, ja lasit Type Text `PAYPAL_API_BASE` árvvuin `https://api-m.sandbox.paypal.com`. Álggat ođđa deploya.
2. Raba Kasse-blohka fálu doaimmaheaddjis, **Betaling** → merke «Betal med PayPal»-knapp, ja almmut.
3. Geahččal dan: go sandboxačoavddat leat sajis, máksosiidu čájeha geahččalanlinnjá skovi bajimusas. **Testing Tools** → **Sandbox Accounts** vuolde ovddideaddjikontus lea persovnnalaš (oasti-)sandboxakonto; **⋮** → **View/Edit Account** čájeha dan e-poastta ja beassansáni. Bija buktaga gávpevuorjui, deaddil «Betal med PayPal», ja čáliht sisa PayPal-siiddus dainna oastikontuin. Go máhcat máksosiidui, de gávpevuorju lea guorus ja siidu giitá oasti namain; máksu čuožžu čađahuvvon fitnodaga sandboxakontus čujuhusas `sandbox.paypal.com`. Jus deaddilat «Cancel» PayPal-siiddus, de máhcat máksosiidui ja gávpevuorju bissu.
4. Eaktodáhtolaš, diŋgondieđáhusaid várás mat bohtet gávpáin v1.1:s: appa siiddus lasit webhooka čujuhusain `https://<site>/api/pay/paypal/webhook` ja dáhpáhusain `PAYMENT.CAPTURE.COMPLETED`, ja máŋge webhook-ID:a Cloudflarei dego Type Text `PAYPAL_WEBHOOK_ID`. Neahttabáiki ii vurke vel maidege; juohke dieđáhusa ovddas dat jearrá PayPal-bálvalusas lei go PayPal mii sáddii dan, ja hilgu earáid. Sandboxas ja live-appas leat sierra webhook-ID:t.
5. Live-dillái mannan dihte dárbbašat duođaštuvvon PayPal Business- (dahje Premier-)kontu. Molsso **Apps & Credentials**-siiddu **Live**-dillái, ja viečča live-appa **Client ID** ja **Secret** (PayPal sáhttá vuos dárkkistit appa, 24 gitta 72 diimmu siste). Bija daid dan guovtti suollemasvuhtii, váldde eret `PAYPAL_API_BASE` vai live-bálvalus geavahuvvo, ja lasit webhooka ođđasit live-appii jus geavahat dan.

## Vurkejuvvon konseapttat

Doaimmaheaddji Utkast-lássa vurke konseapttaid GitHubii, vai sáhtát viežžat daid eará rusttegis. Dat vurkejuvvojit sierra oaljji ala, `urd-drafts`, maid vuosttaš vurken ráhkada. Ii mihkkege dárbbaš ásahuvvot dan várás, muhto golbma ášši leat buorre diehtit:

- **Vurkemat eai goassege olle neahttabáikái.** Juohke vurken lea merkejuvvon nu ahte Cloudflare ii hukse maidege das: dat ii goassege olle almmuhuvvon neahttabáikái, ii goassege geavat ovttage prošeavtta huksemiin, iige goassege oidno Historihkka-panelas.
- **Doala oaljji olggobealde ovdačájehanhuksemiid.** Cloudflare hukse standárddas ovdačájeheami juohke oaljji ovddas. Sihkkarvuođa dihte doala `urd-drafts` olggobealde: prošeavttas, **Settings** → **Builds** → **Branch control**, ja **Preview branch** vuolde vállje **None**, dahje **Custom branches** nu ahte `*` lea dain mat váldojuvvojit mielde, ja `urd-drafts` dain mat doalahuvvojit olggobealde.
- **Njuolggadusat mat gokčet juohke oaljji, bissehit vurkemiid.** GitHub-njuolggadusjoavku (ruleset) dahje oaljji suodjalannjuolggadus mii gokčá juohke oaljji (ovdamearkka dihte dakkár mii ráddje ođđa oaljji ráhkadeami dahje gáibida pull requesta) bisseha maiddái vurkemiid, ja Utkast dadjá «GitHub hilggui oaljji mas vurkejuvvon konseapttat leat (urd-drafts); geahča ásahanbagadusa». Doala oaljji olggobealde: repos, **Settings** → **Rules** → **Rulesets** → njuolggadusjoavku → **Target branches** → **Add target** → **Exclude by pattern** → `urd-drafts`. Klassalaš suodjalannjuolggadusa ovddas **Settings** → **Branches** vuolde minstariin `*` rievdat minstara nu ahte dat lea `main`.

Almmolaš repos sáhttet buohkat lohkat vurkejuvvon konseapttaid ja daid mearkkašumiid, nugo sii sáhttet lohkat repo eará osiid.

## Mo almmuheapmi doalahuvvo dorvvolažžan

- Du sisačáliheapmi olaha dušše neahttabáikki repo ja bistá gávcci diimmu hávális; doaimmaheaddji ođasmahttá dan ieš. Dat vurkejuvvo diehtočoahkkui maid siiddu iežas skriptat eai sáhte lohkat.
- Dušše `ALLOWED_LOGINS`-listtu geavaheaddjinamat sáhttet almmuhit; neahttabáiki dárkkista dan juohke rievdadusa oktavuođas, ii dušše doaimmaheaddjis.
- Almmuheapmi sáhttá dušše čállit neahttabáikki sisdoalu ja mediafiillaid, plugin-listtu, neahttabáikekártta, `robots.txt`, ođđasitčujuhemiid ja juohke siiddu máŋgosa neahttabáikki iežas `index.html`-fiillas, ja sáhttá sihkkut plugin-máhpa. Neahttabáikki koda ja sihkkarvuođafiillat hilgojuvvojit, nu ahte olmmoš guhte válddii badjelasas doaimmahansešuvnna, ii sáhtášii bidjat koda.
- Konseapttaid vurken čállá dušše `urd-drafts`-oaljji, ii goassege neahttabáikki iežas oaljji.

## Almmuheami geahččaleapmi báikkálaččat (Urd-ovddideaddjit)

```bash
cd template
# Bija geahččalanárvvuid .dev.vars-fiilii (git ii váldde dan vuhtii; ale goassege commite duohta suollemasvuođaid):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=yourusername
npx wrangler pages dev . --port 8788
```

Dalle vudjet neahttabáiki, doaimmaheaddji ja funkšuvnnat čujuhusas `http://localhost:8788`. Olles sisačáliheapmi gáibida duohta GitHub Appa mas lea **Redirect URI** localhost-čujuhussii, `http://localhost:8788/api/github/callback`, muhto meattáhusvástádusaid ja bálgádárkkistemiid sáhttá geahččalit dan haga.

## Meattáhusohcan

| Maid oainnát | Jáhkkimis sivva |
|---|---|
| «Almmuheapmi ii leat heivehuvvon: birasvariábel X váilu» | Variábel váilu Cloudflares, dahje ođđa deploy ii leat dahkkon dan rájes go dat lasihuvvui (lávki 4) |
| GitHub dadjá «The redirect_uri is not associated with this application» go čálihat sisa | Ii oktage GitHub Appa **Redirect URI** leat dat čujuhus mas rahpet doaimmaheaddji; iežat domena dárbbaša iežas (geahča «Iežat domena») |
| «Invalid OAuth state (try signing in again)» sisačáliheamis | Deaddilit Cancel GitHub-siiddus, doppe manai eanet go logi minuhta, dahje fierpmádatlohkki hehtte diehtočoahkuid; čáliht sisa ođđasit |
| GitHub čájeha 404-siiddu go čálihat sisa | Client ID Cloudflares ii leat appa Client ID, dahje ođđa deploy ii leat dahkkon dan rájes go dat lasihuvvui |
| «GitHub hilggui sisačálihemi (boarásmuvvan token?) - čáliht sisa ođđasit» almmuhettiin, dahje «Gustohis dahje boarásmuvvan sisačáliheapmi» Utkast-lásis, Historihkka- dahje Ođasmahttin-panelas | Sisačáliheapmi lea nohkan, dahje dat lea loahpahuvvon GitHub-bealde. Čáliht olggos ja fas sisa |
| «GitHub-geavaheaddjis «X» ii leat almmuhanvuoigatvuohta» | Geavaheaddjinamma ii leat `ALLOWED_LOGINS`-listtus (dárkkis čállinvuogi; stuora ja smávva bustávat eai mearkkaš maidege) |
| «Ii sáhttán committet GitHubii» | GitHub App ii leat sajáiduhttojuvvon neahttabáikki repoi, dahje **Contents**-lohpi ii leat **Read and write**; OAuth Appain repo lea priváhta ja `GITHUB_SCOPE` ii leat `repo`. Sáhttá maiddái leat nu ahte muhtin rievdadii oaljji seamma bottas |
| Almmuheapmi doaibmá, muhto neahttabáiki ii rievdda | `GITHUB_ROOT_DIR` váilu dahje lea boastut, nu ahte rievdadus boahtá neahttabáikki máhpa olggobeallái (dárkkis GitHubas makkár fiillaid rievdadus guoskkahii) |
| «Betaling er ikke satt opp for denne siden ennå» máksosiiddus | Okta njealji Vipps-suollemasvuođas váilu Cloudflares, dahje ođđa deploy ii leat dahkkon dan rájes go dat lasihuvvojedje |
| «Betal med kort» vástida ahte máksu ii leat ásahuvvon | `STRIPE_SECRET_KEY` váilu, lea almmolaš čoavdda (`pk_…`) iige suollemas čoavdda, dahje ođđa deploy ii leat dahkkon dan rájes go dat lasihuvvui |
| «Betal med PayPal» vástida ahte PayPal ii váldde vuostá valuhta | Gávpevaluhtta lea dakkár maid PayPal ii váldde vuostá (ISK), dahje haddis leat desimálat valuhtas HUF, JPY dahje TWD, maid PayPal váldá vuostá dušše ollesovttadagain |
| Vipps-máksu filte ovdal go appa rahpasa | `VIPPS_API_BASE` čujuha geahččalanbirrasii vaikko čoavddat leat buvttadančoavddat, dahje nuppe láhkai |
| Rievdadus lea repos, muhto ii oktage deploy ihte | Cloudflare ii fuomášan rievdadusa (dat dáhpáhuvvá muhtumin). Bija `DEPLOY_HOOK_URL` (geahča Eaktodáhtolaš heivehusat), de almmuheapmi ieš álggaha deploya |
| «GitHub hilggui oaljji mas vurkejuvvon konseapttat leat (urd-drafts)» Utkast-lásis | Njuolggadusjoavku dahje oaljji suodjalannjuolggadus gokčá juohke oaljji; doala `urd-drafts` dan olggobealde (geahča [Vurkejuvvon konseapttat](#vurkejuvvon-konseapttat)) |
