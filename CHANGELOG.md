# Endringslogg

Alle vesentlige endringer i Urd dokumenteres i denne filen.

Formatet følger [Keep a Changelog](https://keepachangelog.com/no/1.1.0/),
og prosjektet følger [semantisk versjonering](https://semver.org/lang/no/).

## [Ulansert]

Arbeidet mot v0.6 pushes nummerert (0.6.1, 0.6.2, …), og fase-slippet
døpes til det siste push-nummeret ved gaten, slik v0.5-fasen endte i
0.5.10. Da stiger numrene alltid. Etterslepp-fikser på v0.5 nummereres
0.5.11 og videre.

### 0.6.8 - backlog-sveip: fire livskvalitetsfikser + blokk-flyt - 19. juli 2026
- Temafølgende utheving og tekstfarge: fargen TEMA-knappene i tekstlinjen skriver byttes nå til var(--urd-color-<token>) i feltet, så uthevinger og temafarget tekst skifter live når temaet endres (før frøs aksentfargen som hex i teksten). Egne farger forblir frikoblet hex, med vilje.
- Ctrl+D (dupliser) virker nå også med fokus i admin-panelene (ny urd-duplicate-melding over broen; i tekstfelt beholder nettleseren snarveien). Duplikatet blir dessuten den MARKERTE blokken, klar for piltaster eller ny Ctrl+D.
- Nye blokker legges alltid ØVERST i lagrekkefølgen: insertBlock (fellestrakten for palett, «+ Ny blokk»-menyen og dupliser) setter z til seksjonens høyeste pluss én, så en ny blokk aldri gjemmer seg bak eksisterende. «+ kort/rad»-elementene fra malene beholder sin bevisste interne lagdeling.
- Etter angre-publisering lastes den gjenopprettede versjonen automatisk: admin poller de serverte innholdsfilene til deployen er ute (opptil 3 min), forkaster utkastene (serveren er fasiten) og laster seg selv på nytt; ved tidsavbrudd består den gamle sperren og omlast-meldingen.
- Admin-venstremenyens aktiv-markering endrer ikke lenger font-vekten (teksten flyttet seg bittelitt); aktiv markeres av bakgrunn + kant, som er stabile.
- Backlog-gjennomgang med kodeverifisering: fem punkter viste seg alt levert (requirePublisher og modalene fra 0.6.2, oppsettsveiviserens site.setup-signal, logo/ikon fra v0.5, og CSP-arven på /admin/* verifisert i produksjon). BACKLOG.md er omstrukturert: forslag og funn sorteres nå rett inn i milepælen/fasen der de tas (M6 fikk hjelpelinjer, seksjonshøyde ovenfra og multimarkering med kopier/lim inn; v0.7 fikk mobil-klyngen samlet som ett arbeid), dokumenterte begrensninger står i egen seksjon, og alt levert i v0.6-syklusen er samlet for opprydding ved fase-slippet.

### 0.6.7 - CodeQL #10: kryptografisk makeId-fallback - 19. juli 2026
- CodeQL #10 (Insecure randomness) lukket: makeId-fallbacken for usikre opprinnelser bruker crypto.getRandomValues (som virker overalt, også http://0.0.0.0) i stedet for Math.random. Begge id-veiene er nå kryptografisk tilfeldige.

### 0.6.6 - M2.6: editorene på topp-nivå (eiers krav: fulle, komplette, moderne) - 19. juli 2026
- Teksteditoren: linjen forankres i selve markeringen med blokk som fallback, en tom/ugyldig rekt flytter den ALDRI (0,0-teleporten er død), og den klemmes under sidens klistrede meny med under-markeringen-fallback. Farger og utheving er samlet i en nedtrekksrad bak palettikonet (temafarger, egen farge, uthev aksent/egen, NY fjern utheving-knapp), så hovedlinjen er smal; verktøyene ligger i grupper som radbrytes samlet. Nytt: gjennomstreking, inline lenkefelt i linjen (forhåndsutfylt, Enter bekrefter, egen fjern-knapp, aktive URL-skjemaer avvises) i stedet for prompt(). Nivåvelgeren virket ikke (linjens mousedown-vern hindret select i å åpne) - unntak for select/input med eksplisitt markering-lagring/gjenoppretting. Linjen lukkes nå ved klikk hvor som helst utenfor feltet (flate-draget sluker museklikk, så feltet mistet aldri fokus selv). Titler i samlinger er rik tekst med full linje (ADR-0007 revidert); liste-ikonene tegnet i lik høyde.
- Bildeeditoren: fokuspunktet er forklart (sikte-ring + hjelpetekst) og suppleres av ZOOM (beskjærer inn mot fokuspunktet; rammen klipper) og FORM (auto/bred/1:1/høy/rund) - ekte utsnitts- og formkontroll for samlingsbilder via additive skjemafelt. Et svakt tredelingsgitter (som i kameraer) legger seg over selve bildet på lerretet mens editoren er åpen og følger rammen live; miniatyren har samme gitter. Native select-nedtrekk erstattet med stylede segmentknapper; glidere med verdivisning, Gråtone-hurtigvalg og Nullstill justeringer; «Alt-tekst» døpt om til «Beskrivelse» med forklarende plassholder (også i Egenskaper for bildeblokker).
- Fargevelgeren: ny felles velger på lerretet (HSV-flate, kulørglider, hex- OG RGB-felt, temafargeprikker, pipette via EyeDropper) med GJENNOMSIKTIGHET (sjakkbrett-glider, #rrggbbaa) og LAGREDE farger (plussknapp lagrer, × fjerner, tak på 12, delt lager med admin-velgeren i tillegg til Nylige). Admin-velgeren løftet til full paritet. Velgeren åpnes over verktøylinjen (dekker ikke teksten som redigeres) og har ingen scroll lenger.
- Strukturgrep-fiks: en blokk som henger utover seksjonskanten kunne stjele grepet på seksjonslinjen (hover-løftet la blokken over håndtakene); seksjonslinje, «+ Ny seksjon» og «+ Ny blokk» ligger nå over blokk-løftet, under klistret meny og editorpaneler.

### 0.6.5 - M2.5: felles editorer for alle flater - 19. juli 2026
- ÉN bildeeditor for alt: nytt engine/image-editor.js med adapter-mønster (bildeblokker via dobbeltklikk/blyant, samlingsbilder via klikk); fokuspunkt-drag, lysstyrke/kontrast/metning, tilpasning, avrunding og beskrivelse, alt ikke-destruktivt. Samlingsinnslag fikk de additive feltene imageAlt og imageStyle som visningene anvender.
- Teksteditoren på alle skriveflater: innslagstekst i samlinger er rik tekst med samme besøkende-vern som tekstblokkene (delt stripper i engine/sanitize.js: event-attributter, script/iframe/object/embed og javascript:-lenker fjernes ved rendering).
- imageTools flyttet fra editoren til motoren (editor importerer derfra), så komprimering og webp-flyt er felles for admin og lerret.

### 0.6.4 - M2: samlinger (datablokk-mønsteret, ADR-0007) - 19. juli 2026
- Samlinger er data i content/: én fil per samling (content/samlinger/<id>.json med schemaVersion/id/name/kind/entries) pluss indeksfil, kontrakt i schema/collection.schema.json med samme stegvise migreringsmønster som resten. Ny motor-modul samlinger.js (sortering med udaterte sist, år-gruppering, dato-badge, utkast-overstyring fra broen).
- Ny kjerneblokk samling med tre visninger: kort (responsivt grid), liste (rader med dato-badge, ApeironLF-stilen) og arkiv (år-gruppert); manglende/tom samling gir rolige tomtilstander i editoren og ingenting hos besøkende, aldri krasj. Blokken auto-vokser med innholdet så malene slipper å gjette høyder.
- Samlinger-panel i admin: opprett/rediger/slett samlinger og innslag (sammenleggbare), utkast per samling, bilder materialiseres ved publisering, forhåndsvisningen leser UTKASTET via broen. In-block-redigering på lerretet: klikk-og-skriv tittel/tekst og bilde-adder rett i visningen.
- Tre nye seksjonsmaler bygget på mønsteret: nyhetsseksjon, oppslagstavle og publikasjonsarkiv. Ny testfil for samlinger, og validate dekker samlingsfilene.

### 0.6.3 - M1-testrunde: live plugins i preview, lokal utvikling, fikser - 19. juli 2026
- Plugins virker nå i forhåndsvisningen FØR publisering: editoren sender utkastets aktive liste (`urd-plugins`), previewen laster pluginene derfra (filene ligger alt i repoet), og av/på gir fersk innlasting. Dette er også arbeidsflyten for LOKAL plugin-utvikling (dokumentert i plugins/README): mappe inn, aktiver i panelet, se blokkene live.
- Plugin-blokker dukker automatisk opp i «+ Ny blokk»-menyen (previewen leser registrene og bygger blokken med pluginens defaults), og eksempel-kalenderen rendrer nå synlige eksempelhendelser med datobrikker i stedet for et tomt skall.
- Plugin-oppdagelsen krever ikke lenger innlogging: offentlige repo leses anonymt, sist kjente funnliste bufres lokalt, og skriv-inn-navn-feltet vises kun når oppdagelsen er helt utilgjengelig.
- KRITISK lokalserver-fiks: `crypto.randomUUID` finnes ikke på usikre opprinnelser (f.eks. http://0.0.0.0), så ALT som lagde nye id-er (seksjoner, blokker, dupliser) døde stille der; samlet i én makeId med fallback. I tillegg fikset DataCloneError i plugin-meldingen ($state-proxy sendt rått) og to kappløp som kunne gi tom plugin-liste ved rask iframe-oppstart.
- Editor-UX fra testrunden: forhåndsvisningens viewport følger nå visningsvalget i topplinjen (et smalt admin-vindu vipper aldri previewen til mobil og gjemmer strukturverktøyene); klikk i admin-panelene lukker menyene i previewen; seksjonsverktøylinjen er klistret i lange seksjoner og nye elementer ruller minimalt, så pluss-knappen alltid er tilgjengelig; nye elementer markeres.
- Ny seksjonsmal: «Funksjonskort uten ikoner» (eiers ønske), med egen pluss-knapp og testdekning.

### 0.6.2 - M1: CSP-behovsmodell + teknisk opprydding - 19. juli 2026
- ADR-0006: plugins deklarerer CSP-behov i manifestet (`csp.connectSrc`/`frameSrc`, additivt skjemafelt); `_headers` forblir Urd-eid og uskrivbar, og Plugins-panelet viser eieren nøyaktig hvilke unntak en plugin trenger.
- requirePublisher-hjelper i functions/_lib: auth-prologen (konfig, CSRF-origin, cookie, brukeroppslag, ALLOWED_LOGINS) er ett sted i stedet for duplisert i commit.js og revert.js.
- Konflikt- og angre-dialogene bruker editorens eget modalsystem i stedet for nettleserens confirm().
- Oppsettsveiviseren utløses av et eksplisitt `site.setup`-felt (settes i malens standardinnhold ved M9-splitten; navnematch som fallback), og fullført veiviser fjerner feltet ved neste publisering.

### 0.6.1 - M1: plugin-lasting for alvor + Plugins-panel - 19. juli 2026
- Ny motor-modul plugins.js: manifest-validering, `requiresEngine` sjekket mot motorversjonen (avhengighetsfri semver-intervallsjekk: >=, <, ^, ~, eksakt), staging/rollback rundt register() (en plugin som feiler halvveis etterlater ingenting, og id-kollisjoner kan aldri overskrive kjernen), og provides-kontroll med logg ved kontraktsbrudd. TODO-en fra v0.1 om requiresEngine er løst.
- Nytt Plugins-panel i admin: viser pluginene med navn/versjon/status og av/på-bryter; endringer går gjennom vanlig utkast- og publiseringsflyt (plugins.json committes, historikken sier «plugins»), og panelet advarer om ugyldige manifester og motorversjonskrav.
- 7 nye kontraktstester (semver-sjekken, manifestvalidering, staging/rollback, provides).

### 0.5.13 - CodeQL-opprydding + CI-herding - 19. juli 2026
- Favicon-vokterne (editor-effekten, favicon-boot.js, motorens applyFavicon) er skrevet om fra startsWith-sjekker til én ankret regex (kun `data:image/<type>;base64,…` eller site-relativ enkelt-skråstrek-sti): innholdsmessig samme vern, men CodeQL gjenkjenner RegExp.test som barriere, så varslene #7-9 lukkes i stedet for å gjenoppstå ved hvert bygg.
- CodeQL-workflowen ekskluderer nå den genererte editor-bundelen (template/admin/assets): kilden i editor/src og hele motoren skannes fortsatt, og funn peker på lesbare kildelinjer i stedet for flyktige bundle-linjer.
- Nytt CI-steg: committet editor-bygg må matche det kilden faktisk produserer (`git diff --exit-code` etter bygg) - fanger både glemt gjenbygging og manipulerte bundler. Var planlagt til v0.6, levert tidlig.

### 0.5.12 - stor feilsveip: 8 gjennomgangsdimensjoner, ~25 fikser - 19. juli 2026
- KRITISK migreringsfiks: v1-sidefiler fikk NaN-posisjoner (innholdet forsvant) fordi grid-konteksten allerede var løftet til kvadratformat; motoren sender nå rå site.json som kontekst, migreringen tåler begge formene, og en regresjonstest låser det. Render-løkka tåler dessuten blokker uten frames og amputert site.json (tom side, aldri krasj).
- Angre-historikken bærer nå pageId og følger over sidebytter: sletting/oppretting av sider og navigering i preview er angrbare (før tømte hvert sidebytte historikken, og «Ctrl+Z angrer» ved sidesletting var falskt). Angre-nøklene er per egenskap, og «legg bakerst» er ett steg.
- Publisering: adressebytte mellom to sider sletter ikke lenger begge rutingskopiene; glapp konfliktgrunnlaget ved innlasting hentes HEAD nå og redaktøren spørres eksplisitt i stedet for stille overskriving; «Forkast utkast» rydder ALLE siders utkast (som knappen lover).
- Besøkende-vern: innlimt rik tekst strippes for event-attributter, script-elementer og javascript:-lenker ved rendering; lenkedialogen avviser aktive URL-skjemaer; origin-sjekk (CSRF-dybdeforsvar) og sha-validering på functions-endepunktene.
- Motor: inngangsanimasjoner på seksjoner høyere enn ~7x viewporten ble aldri synlige (opacity 0 for alltid); Vimeo-privatlenker beholder hashen og YouTube-id-er valideres (ny testfil); eget ikon fikk lastevern og glyf-fallback; glød/korn uten opacity-felt fikk riktige standardverdier; lytter-lekkasje per rerender tettet; død postMessage-kanal fjernet.
- Seksjonsmalene: mobil-stablingen splittet kortene i bånd (alle ikoner, så alle bokser) - nytt additivt `mobileOrder`-felt holder kortene samlet; pluss-knappene bruker ledig-rute-søk så et slettet element i midten fylles igjen i stedet for kollisjon; FAQ-spørsmål legges nå FØR avslutningslinjen (som skyves ned); trange tekstrammer i hero/statistikk utvidet. Testene dekker moves og slette-scenarioet.
- Editor-UI: Ren visning lekker ikke lenger aktiv-seksjonskant/tilsynsomriss/snappelinjer; handlingsknappene («+ Opprett side» m.fl.) er sentrert; aktiv-markørene fikk fet skrift (synlig også i grå/nordlys-temaet); fargevelgeren fikk riktig høydeberegning og begge velgerne lukker ved panelrulling; favicon-effekten nullstiller til Urd-merket når ikonet fjernes; markert blokk ryddes når seksjonen slettes.
- Kontrakter: SKJEMA.md à jour (alle additive felt, migreringene side-v3/site-v2, nav.style/sticky/logo), BRUKERVEILEDNING (nav-utseende, dekor-regelen for ikoner), ARKITEKTUR (hele skriveflaten inkl. rutingskopier); ny test vokter at urd.json-kontrakten og publiseringsvokteren aldri glir fra hverandre. Svakheter som bevisst ikke ble fikset er loggført i BACKLOG med fasekandidat. 36 tester (6 nye).

### 0.5.11 - tegnvelger med eget ikon, favicon-fikser + CodeQL - 18. juli 2026
- Ikon-blokken har fått en tegnvelger i Egenskaper: kategorisert meny med rundt 300 tegn og emojier (Symboler, Piler, Smilefjes, Gester og folk, Natur, Mat og drikke, Aktivitet, Objekter, Hjerter) med «Nylige»-rad, ved siden av fritekstfeltet. Nederst i menyen kan et EGET IKON lastes opp (webp, maks 256px): det vises i tegnstørrelsen i stedet for tegnet, kan fjernes i Egenskaper, og publiseres som media-fil (additivt `image`-felt, ingen migrering).
- Admin-fanen blinket med Urd-merket ved hver innlasting før editoren hadde lest site.json: en liten `admin/favicon-boot.js` bytter nå til nettstedsikonet straks HTML-en parses, lenge før editor-bunten er lastet.
- CodeQL-varslene #1-3 (XSS/redirect-flyt i favicon-settingen) er lukket ved at kun kjente ikonformer slippes gjennom (`data:image/…` eller site-relativ sti, aldri `//`) i alle tre favicon-flytene: editorens effekt, favicon-boot.js og motorens applyFavicon.

## [0.5.10] - 2026-07-18

«Panelene og nettstedet rundt siden»: hele editor-UI-et er lagt om til
panelvelger + sidepanel, og alt rundt selve lerretet er på plass. Levert
og testet fortløpende på urdweb.pages.dev.

Hovedtrekk:
- **Panelene**: Sider, Blokker, Egenskaper, Grid, Tema, Nav, Footer og Historikk i gruppert panelvelger; statusmeldinger som toast; admin med sju valgbare fargetemaer (Nøytral grå som standard), knapper som ser ut som knapper, og tegnede SVG-ikoner overalt (ingen emojier).
- **Redigeringsdybde**: props-editor per blokktype, flytende teksteditor (nivåer, S/M/L/XL, farger koblet til temaet, utheving, lenker), full bakgrunnseditor med lag (farge/gradient/glød/bilde/korn), animasjoner per blokk/seksjon, rotasjon, smarte hjelpelinjer, dupliser, tastatursnarveier, fokuspunkt og bildejusteringer.
- **Nettstedet rundt siden**: nav-editor (logo tekst/bilde/begge, plassering, klistret meny med stilvalg), delt footer, nettstedsikon (favicon), nye blokktyper video og ikon.
- **Seksjonsbiblioteket**: 19 presets i gruppert galleri med beskrivelser, utvidbare seksjoner («+ kort/rad/person»), alle bygget av temafarge-tokens og voktet av kontraktstest + skjemavalidering i CI.
- **Publiseringsløkka**: konfliktvarsel (`latest?base=`), Historikk-panel med angre-publisering, oppsettsveiviser, presise commit-meldinger, per-side `<slug>/index.html`-generering, tosteg-bekreftelse på «Forkast utkast».
- **Kartleggingen «Siste steg»**: ni inspirasjonssider + ApeironLF + nettbutikk-research sortert inn i backlog og veikart (feed-basert kalender-plugin i v0.6, butikk uten betalingsgateway i v0.7).

Arbeidet ble pushet nummerert (0.5.1-0.5.10); push-loggen under er
hele historikken, nyeste først.

### 0.5.10 - testrunde-fikser: symmetriske kortmarger - 18. juli 2026
- Kortpresetene lå med mer luft til venstre enn til høyre (eiers funn: kolonner på 6/39/72 ga 6 % venstremarg og 3 % høyremarg). Alle grid-presetene er rettet til symmetriske marger (tre kolonner 6/37,5/69, team 7,5/39/70,5, sponsorrad 5,5/29/52,5/76 med bredde 18,5), i både seksjonsmalene og «+ element»-fabrikkene.

### 0.5.9.3 - feilsjekk-runde av seksjonsbiblioteket - 18. juli 2026
- Ny kontraktstest (tests/presets.test.mjs): alle presets gir velformede seksjoner med ferske objekter, og hver «+ element»-fabrikk plasserer to runder nye elementer uten overlapp. `npm run validate` validerer nå også alle 19 presets (med item-runder) mot page-skjemaet.
- Tre funn fikset: pluss-knappen deaktiveres til seksjonen er rerendret (dobbeltklikk kunne lagt to element i samme rute), preset-galleriet på nederste seksjonsgrense åpner oppover (ble klippet av iframe-høyden ved sidens slutt), og på en helt tom side åpner det fortsatt nedover.

### 0.5.9.2 - utvidbare seksjoner («+ kort/rad/person») - 18. juli 2026
- Seksjoner laget fra maler med gjentakende elementer har fått en pluss-knapp i seksjonsverktøylinjen som legger til NESTE element (kort, sak, rad, person, spørsmål, steg, produkt, tall, logo, bilde) ferdig plassert i neste ledige rute. Elementet legges som én gruppe blokker i ett angre-steg, og seksjonen vokser automatisk når det trengs.
- Teknisk: preset-definisjoner kan nå ha valgfrie `item`/`itemLabel`-fabrikker (samme mønster som `create`); seksjonene forblir generiske containere, og antall leses robust fra blokkene så knappen virker også etter redigering.

### 0.5.9 - seksjonsbiblioteket + kartleggingen «Siste steg før 0.5.0» - 18. juli 2026
- Kartlegging fullført av eiers ni inspirasjonssider + full funksjonsinventering av ApeironLF (kildekoden) + nettbutikk-research (Squarespace/Wix Commerce, Snipcart, Stripe, Vipps). Funnene er sortert inn i BACKLOG (v0.5/v0.6/v0.7/horisont) og VEIKART: kalender-pluginen (v0.6) blir feed-basert (Google Calendar/iCal) med designkrav fra ApeironLF, og butikk uten betalingsgateway (produktkort med varianter, klient-side handlekurv, bestillingsskjema, Vipps-instruks) er lagt som kjernefunksjon i v0.7.
- Seksjonsbiblioteket utvidet fra 7 til 18 presets, bygget av eksisterende blokktyper med temafarge-tokens: hero sentrert (to knapper), funksjonskort (ikon + kort + hover-løft), nyheter, arrangementer (dato-badge + påmeldingsknapp), steg for steg, hovedoppslag (én stor + to små), produkter/merch (kjøp = ekstern lenke, f.eks. Vipps), CTA-banner, sitat, statistikk, sponsorrad (gråtone) og medlemskap (prisnivåer + Vipps-linje). Team fikk e-postlinje og FAQ fikk «flere spørsmål?»-lenke.
- «+ Ny seksjon» åpner nå et gruppert galleri (Grunnleggende / Kort og lister / Fremheving) med kort beskrivelse per mal og rulling, i stedet for en flat knapperad. Klikk utenfor lukker.

### 0.5.8.10 - bekreftelse på «Forkast utkast» - 18. juli 2026
- «Forkast utkast» krever nå to klikk: første klikk gjør knappen rød med teksten «Sikker?», andre klikk forkaster. Klikk hvor som helst ellers, Escape eller klikk i forhåndsvisningen tar knappen tilbake til vanlig - før slettet ett feilklikk alle utkastene uten spørsmål.

### 0.5.8.9 - skarpere radglyfer - 18. juli 2026
- Pilene og kryssene i radknappene er økt fra 11 til 12px: geometrien var alt perfekt sentrert (målt i nettleseren), men på skjermer med 125 % skalering landet strekene på brøkdels-piksler og så skjeve ut av antialiasing. 12px treffer hele fysiske piksler (12 x 1,25 = 15) og fyller knappen bedre.

### 0.5.8.8 - presise publiseringsmeldinger - 18. juli 2026
- Publiseringer av nettstedsoppsettet sier nå HVA som endret seg i historikken («Oppdater tema via Urd-admin», «Oppdater menyen, nettstedsikonet …») i stedet for det generiske «innstillinger» - endringene diffes mot publisert site.json (tema, menyen, footeren, sideregisteret, gridet, nettstedsikonet, nettstedsinfo).

### 0.5.8.7 - nettstedsikon (favicon) + grå som standardtema - 18. juli 2026
- Nettstedsikon: last opp i Tema-panelet (skaleres til 128px webp, materialiseres som media-fil ved publisering, additivt `site.icon`-felt). Vises i nettleserfaner og bokmerker for besøkende, og admin-fanen følger nettstedsikonet når det finnes. Uten eget ikon brukes et nytt Urd-merke (innebygd SVG) i både malen og admin - før var fanene ikonløse (globus).
- «Nøytral grå» er nå standardtema for admin (tidligere Lilla dybde); valget kan fortsatt endres i velgeren og huskes per nettleser.

### 0.5.8.6 - tre nye admin-temaer + SVG-radglyfer - 18. juli 2026
- Tre nye admin-temaer basert på anerkjente fargepaletter (aksentene mørknet der det trengtes for lesbar hvit knappetekst): Nordlys (Nord: arktisk, lav metning), Skumring (Tokyo Night: neon-natt, blå) og Glo (Gruvbox: varm, glødende oransje). Totalt sju temaer i velgeren.
- Pilene og kryssene i radknappene (Sider, Nav, bakgrunnslag) er nå tegnede SVG-er i stedet for tekstglyfer: tekstglyfer sitter aldri optisk midt i knappen (fontmetrikk), SVG sentrerer piksel-perfekt og matcher resten av ikonene.

### 0.5.8.5 - sidevelgeren erstattet + jevne radknapper - 18. juli 2026
- Sidevelger-nedtrekket i topplinjen er fjernet (overflødig etter Sider-panelet): i stedet viser en knapp gjeldende sidenavn, og klikk åpner Sider-panelet der bytte, omdøping og oppretting bor.
- Radknappene (piler/kryss i Sider, Nav og bakgrunnslagene) har nå fast kvadratisk bredde og sentrert glyf - de arvet ved en feil panellistens venstrestilling, og bredden fulgte tegnet.

### 0.5.8.4 - designrunde for admin - 18. juli 2026
- Temavelger i topplinjen (ved siden av Urd-logoen): fire admin-temaer - Lilla dybde (standard), Nordisk brønn (teal), Norrønt gull (rav) og Nøytral grå. Gjelder KUN editoren (forhåndsvisningen følger brukerens eget tema) og lagres per nettleser.
- Knapper ser nå ut som knapper: fylt flate, tydelig hover og et lite trykk ved klikk - mens felt (input/nedtrekk) forblir flate, så skillet er synlig. Alt knappinnhold er sentrert (listeknapper i panelene er fortsatt venstrestilte).
- Panelvelgeren er sortert etter arbeidsflyt med skillelinjer: Sider/Blokker/Egenskaper/Grid (bygge siden), Tema/Nav/Footer (nettstedet), Historikk (verktøy).
- Gjenværende hardkodede lilla-toner byttet til aksentvariabelen, så alle temaene farger hele admin konsekvent.

### 0.5.8.3 - tomrom øverst i seksjonene + «+ Ny blokk» øverst til høyre - 18. juli 2026
- Alle seksjoner fikk et bakgrunnsløst bånd øverst: «+ Legg til blokk»-pillen lå i flyten med toppmarg, og siden seksjoner ikke har toppkant kollapset margen UT av seksjonen og skjøv den ned. Pillen er nå absolutt posisjonert (deltar aldri i flyten), døpt om til «+ Ny blokk», og flyttet øverst til høyre under seksjonsverktøylinjen; menyen åpner høyrejustert under den.

### 0.5.8.2 - bugsjekk av editor-løftet - 18. juli 2026
- Gjennomgang av 0.5.8: token-fargene er verifisert hele veien (alle motor-konsumenter går via resolveColor, også gradient-stopp og color-mix i menyen), guide-matematikken bruker samme koordinatrom som blokkene, og duplisering bevarer manuell-mobil-invarianten. To småfeil fikset: død hexFor-funksjon fjernet (velgeren løser opp tokens selv), og «Nylige farger» tåler nå korrupt localStorage-innhold.
- To kjente svakheter bokført i backloggen: utheving lagrer fargen som fast verdi (følger ikke senere temabytte), og Ctrl+D krever fokus i forhåndsvisningen.

### 0.5.8 - editor-løft etter research (M8 del 1) - 18. juli 2026
Basert på nettresearch av Squarespace, Wix og Gutenberg (funn og kilder i samtalen/planen):
- Fargevelgeren kobler til temaet: å velge en temaprikk lagrer FARGENAVNET (ikke hex), så innholdet omfarges når temaet endres - mønsteret alle de tre store bruker. Koblede felt vises med ring og «koblet til tema»-tekst; flate/hex gir frikoblet farge som før. Pluss «Nylige»-rad (siste 8 frie farger).
- Tekststørrelse som presets: A (arv) / S / M / L / XL-knapper pluss fritt px-felt (Gutenberg-mønsteret). Utheving (markeringstusj) i formateringslinjen: aksentfargen med ett klikk eller egen farge.
- Smart guides (à la Wix): under dra vises snappelinjer når blokkens kant/senter er innen 5 px av naboblokkers kanter/senter eller seksjonens midtlinje, med snapping (Shift = fritt). Dupliser-knapp på blokkverktøylinjen + Ctrl+D (kopi med liten forskyvning).
- Bildeblokker fikk fokuspunkt (X/Y styrer utsnittet ved beskjæring, som bakgrunnslaget) og ikke-destruktive justeringer: lysstyrke, kontrast og metning som glidere (CSS-filter) med nullstill-knapp. Alt additivt.
- FIKS (eiers funn): «+ Legg til blokk»-pillen lå nederst i seksjonen og havnet under folden i høye seksjoner - den er nå klebrig i synsfeltet (nær toppen i små seksjoner, følger med i høye).

### 0.5.7.13 - moderne fargevelger + angre-fikser - 18. juli 2026
- Ny fargevelger i alle paneler (egen komponent, erstatter nettleserens innebygde): flate for metning/lysstyrke, kulør-glider, hex-felt, forhåndsvisning og temafargene som hurtigvalg-prikker. Brukes i Tema, Nav-utseende, bakgrunnslag (farge/gradient/glød) og oppsettsveiviseren; alle endringer går gjennom vanlig utkast- og angreflyt.
- Ctrl+Z virket ikke etter fargevalg (fokus ble stående i fargefeltet, som slukte snarveien), og panelene viste gamle verdier etter angring (speilene ble ikke resynket) - begge fikset. Ctrl+Y er nå også gjenta, i tillegg til Ctrl+Shift+Z, både i editoren og inne i forhåndsvisningen.

### 0.5.7.12 - bildelasting uten striper, nav-panel-overflyt, øverste seksjon-bar - 18. juli 2026
- «Inntoningen» ved innlasting var IKKE animasjonssystemet, men selve bildelastingen: store bilder dekodes stripevis ovenfra mens de laster, og et halvlastet bilde som henger inn i neste seksjon så «avkuttet» ut. Både bildeblokker og bakgrunnsbildelag holdes nå usynlige til bildet er FERDIG lastet, og vises komplett med en gang (cachede bilder berøres ikke). Ordentlig bildeoptimalisering (responsive størrelser, lazy loading) står fortsatt i v0.7.
- Nav-panelet: gruppene (Utseende m.fl.) nektet å krympe til panelbredden, så fargevelgere og brytere ble kuttet i kanten - gruppene har nå samme bredde-klemme som resten av panelet.
- Den øverste «+ Ny seksjon»-pillen legges under grenselinjen i stedet for oppå, så den ikke gjemmer seg bak den klistrede menyen.
- Alle bryterrader i panelene er lagt om til innstillings-stil: tekst til venstre, bryter ytterst til høyre - konsekvent med resten av radene (etikett venstre, kontroll høyre).

### 0.5.7.11 - blokker bytter seksjon ved dra + innlastningsanimasjon tettet - 18. juli 2026
- Slippes en blokk med senteret over en ANNEN seksjon, flyttes den dit i dataene: grid, tilhørighet og mobil-stabling følger seksjonen den faktisk ligger i, ikke den den kom fra (før forble blokken koblet til gamleseksjonen og hang bare visuelt over den nye). Mobil-framen nullstilles ved flytting (avledes på nytt), og Ctrl+Z angrer hele flyttingen.
- Innlastningsanimasjonen tettet for godt: FØR brukerens første scroll snappes alle inngangsanimasjoner uansett (tidsvinduet alene kunne overskrides på trege innlastinger, som gjorde at Hjem fortsatt animerte ved lasting). Animasjonene spilles kun ved scroll-inn senere. NB: urdweb viser gammel motor til dette er pushet og deployen er ferdig.

### 0.5.7.10 - tegnede SVG-ikoner i stedet for ALL emoji - 18. juli 2026
- Hele editoren er emojifri: desktop/mobil-togglene, tilsyn-chipen, Rediger (blyant), Ren visning (øye), dekor-knappen (telefon/overstrøket telefon), lag-knappene (pil mot strek opp/ned), lenke-ikonet og bildeplassholderen er alle tegnede SVG-ikoner i samme strek-stil (currentColor).
- Alle ikonknapper er loddrett sentrert: blokkverktøylinjens knapper har fått fast høyde med flex-sentrering, og topplinjens ikonknapper linjerer ikon + tekst på midten.
- Brukerveiledningen beskriver ikonene i ord i stedet for emoji.

### 0.5.7.9 - «+ Legg til blokk» i seksjonen - 18. juli 2026
- Hover over en seksjon viser «+ Legg til blokk» nederst i den; klikk åpner en meny med alle blokktypene, og valget legges vannrett sentrert i akkurat den seksjonen. Blokker-panelet består som alternativ.
- Bilde via menyen starter tomt (fildialog kan ikke åpnes derfra) med tydelig plassholder («Velg bilde i Egenskaper») - plassholderen vises nå også for tomme bilderammer fra Bilder-/Team-presetene (før var de usynlige). Besøkende ser aldri plassholderen.

### 0.5.7.8 - «+ Ny seksjon» vises ved hover - 18. juli 2026
- «+ Ny seksjon»-barene er skjult til musepekeren er over en seksjon: da vises baren både over og under den (og holder seg synlig mens du beveger deg over på selve baren). Mindre visuell støy, og den øverste baren krangler ikke lenger med menyen.

### 0.5.7.7 - meny-lag, logo-vekst og nav-utseende - 18. juli 2026
- «+ Ny seksjon»-barene glir nå UNDER den klistrede menyen i stedet for å synes gjennom den (menyens lag ligger over editorbarene).
- Store logobilder vokser ikke lenger hele menylinjen: bildet vokser ut av linjen (inn i luften rundt) mens menyhøyden står fast.
- Nytt «Utseende» i Nav-panelet: bakgrunnsfarge, dekkevne (gjennomsiktighet), uskarphet bak menyen og tekstfarge - pluss menyplassering og klistret-bryteren samlet samme sted. Alt additivt (`nav.style`); Nav-panelet er omorganisert i tre grupper (Logo, Utseende, Menypunkter).
- Bakgrunnsbilde i menyen og menypunkt-design står som egen backlogpost.

### 0.5.7.6 - klistret meny virket aldri + flate-dra på tekstblokker - 18. juli 2026
- GAMMEL FEIL avslørt av den nye toggelen: klistret meny har aldri virket, sticky-CSS-en lå på det indre nav-elementet, som er innesperret i et header-element med nøyaktig samme høyde (et sticky-element kan aldri forlate forelderen sin). Sticky ligger nå på verten, og menyen følger faktisk med når man blar.
- Toggelen heter «Klistrete meny» (flytende meny reserveres som mulig egen stil senere).
- Flate-draget virket ikke på tekstblokker (tekst fyller hele flaten, og all tekst var unntatt): nå er tekst kun unntatt når blokken ALT er valgt. Uvalgt blokk dras fritt også fra teksten; klikk uten dra velger den, klikk igjen redigerer (à la Squarespace).
- Alle avhukingsbokser i admin er nå moderne brytere (pille med knott som glir til høyre, aksentfarget når på).

### 0.5.7.5 - dra fra flaten, tekstlinje-finpuss, meny-sticky - 18. juli 2026
- Blokker kan dras direkte fra flaten (uten ⠿, som består): liten terskel gjør at klikk forblir klikk, redigerbar tekst er unntatt (tekstmarkering virker som før), og i auto-mobil kreves fortsatt et bevisst ⠿-dra for materialisering. Pekeren viser flyttekors over blokker.
- Formateringslinjen legger seg nå over blokkVERKTØYLINJEN i stedet for oppå den (overlappen fra eiers skjermbilde), og liste-/fjern formatering-knappene har fått ordentlige ikoner (tegnet punkt-/nummerliste, T×).
- REVERSERT etter eiers test: Egenskaper åpnes ikke lenger automatisk ved klikk på blokk (kun ved ny seksjon).
- Nav: av/på for flytende meny (`nav.sticky`, additivt) - av betyr at menyen kun ligger øverst og ikke følger scrollingen.

### 0.5.7.4 - Squarespace-aktig tekstlinje og kompakt logo-editor - 18. juli 2026
- Formateringslinjen for tekst er bygget om: den vises nå over blokken SÅ LENGE feltet redigeres (ikke bare ved markering), med tekstnivå-nedtrekk (Avsnitt/H1/H2/H3 som speiler markøren), fet/kursiv/understrek, temafarger + fri fargevelger, lenke (legg til/fjern), venstre/midt/høyre-justering, punkt- og nummerert liste, sitat og fjern formatering. Lister, sitater og lenker har fått innholds-CSS så de ser riktige ut også hos besøkende.
- Logo-editoren i Nav-panelet er komprimert til tekstbehandler-aktige verktøyrader: font + px + F/K-knapper på én linje, og bildevelger + høyde + avrunding på én linje.

### 0.5.7.3 - logostil og tekst per felt - 18. juli 2026
- Logo-delen i Nav-panelet er en sammenleggbar gruppe, og logoteksten har fått full stil: font (velger), tekststørrelse, fet og kursiv. Bildelogoen har fått avrunding i tillegg til høyde. Alt additivt i skjemaet.
- Tekstblokker kan nå ha egen font og grunnstørrelse per felt (Egenskaper; tomt = arv fra tema), i tillegg til den flytende formateringslinjen for markert tekst.

### 0.5.7.2 - z-orden var maskert i editoren - 18. juli 2026
- z-orden VIRKET hele tiden (i dataene og på publisert side), men editoren skjulte den: blokken man peker på eller har markert løftes visuelt øverst for at håndtakene alltid skal kunne nås, og siden blokken man nettopp z-justerte alltid er markert, så det ut som «noe alltid ligger øverst». Løftet gjaldt feilaktig også i Ren visning - nå viser Ren visning nøyaktig den ekte lagrekkefølgen (og markeringsomrisset skjules der).
- ⬆/⬇-knappene og Lag (z)-feltet forklarer nå oppførselen i tooltip.

### 0.5.7 - full nav-editor og delt footer (M7) - 18. juli 2026
- Logoen har nå tre varianter: tekst, bilde eller bilde + tekst, med bildeopplasting (webp-flyt, materialiseres som media-fil ved publisering), bildehøyde og rekkefølge (bilde/tekst først). Logoen er «Hjem»-knappen. Additive skjemafelt; eldre sider rendres uendret.
- Menyplassering: menypunktene kan stå til høyre (som før), midtstilt eller til venstre etter logoen (`nav.layout`, additivt).
- Delt footer: nytt Footer-panel redigerer `site.footer` (vis/skjul, tekstlinjer, justering) ETT sted, og motoren viser den nederst på alle sider. Additivt felt: eldre sider uten footer er uendret; footer-PRESETEN (per-side seksjon) finnes fortsatt. Design-maler kommer i v0.6.
- Ny seksjon markeres nå automatisk og åpner Egenskaper, klar til justering (samme oppførsel som blokkvalg).
- Dropdown-menyer med flere design er flyttet til v0.6 (krever omlagt nav-rendering for besøkende); full videreutvikling av seksjonspresetene ligger i v0.5-listen og venter på eiers inspirasjonsmateriale.

### 0.5.6 - innholdsbredde og finpuss (M6) - 18. juli 2026
- Video-blokk: lim inn en YouTube- eller Vimeo-lenke, så rendres personvennlig innbygging (youtube-nocookie / dnt=1). CSP-en har fått et bevisst frame-src-unntak for akkurat de to vertene. I editoren markerer klikk blokken i stedet for å starte spilleren; ugyldig/tom lenke gir rolig plassholder.
- Ikon-blokk: glyf/emoji med valgfri størrelse og temafarge (starter som dekor, lik formene).
- Fire nye seksjonspresets: Bilder (tre bilderammer), Team/styret (tre medlemmer med portrett), FAQ (spørsmål i tekstbokser) og Kontakt (kontaktkort med e-postknapp). Rene datafabrikker; plassholderbilder byttes i Egenskaper.
- Tastatur på markert blokk i forhåndsvisningen: piltaster flytter ett grid-steg (Shift = 1 px), Delete/Backspace sletter, Esc avmarkerer. En skur av piltastetrykk blir ett angre-steg.
- Rotasjonshåndtak (⟳) på blokker: dra rundt blokkens sentrum, snapper til 15°-steg (Shift = fri vinkel).
- Klikk på knapper og lenker i editoren utløser aldri lenken lenger - klikket markerer blokken (lenker testes via «Se siden»). Eksterne knappelenker åpnet tidligere ny fane midt i redigeringen.
- Innlastning: elementer med inngangsanimasjon som er synlige idet siden lastes (eller ved vindusendring) dukker nå bare opp, uten avspilling - animasjonen spilles kun når innholdet scrolles inn senere. (Eiers observasjon: «alt dukket opp som om det kom til syne» ved lasting.)
- Klikk på et objekt åpner Egenskaper-panelet automatisk.

### 0.5.5 - publiserings-modenhet (M5) - 18. juli 2026
- Konfliktvarsel: editoren husker HEAD fra innlasting, og publisering sjekker `latest?base=`. Har noen andre publisert endringer i de samme filene, må redaktøren aktivt velge «publiser likevel» (eller avbryte og laste på nytt). Endringer i ANDRE filer enn dine stopper ingenting - da flettes de naturlig i git.
- Historikk-panelet: siste 15 publiseringer (melding, hvem, når; øverste rad er dagens tilstand) og «↩ Angre siste publisering».
- `history.js` og `revert.js` er implementert server-side. Angring er en FORWARD-revert (ADR-0003): en ny commit med HEAD som forelder - historikk slettes aldri, angringen kan selv angres, og `expect`-vernet gir 409 hvis noen publiserte i mellomtiden.
- Oppsettsveiviser: første besøk på en fersk klon (malens standardnavn står fortsatt) åpner en velkomstmodal med sidenavn, aksent- og bakgrunnsfarge. Skrives som vanlig site-utkast og peker mot Publiser; «Hopp over» huskes.
- Nav-panelet: mål- og lenkefeltene ligger nå i samme kolonne som navnefeltet (slutter på samme høyrekant, i stedet for å strekke seg ut under ↑/↓/×).
- Jevn vertikal sentrering i hele admin: alle kontroller i panelene (felt, nedtrekk, knapper, grupper, veiviser) deler nå én høyde (2.2rem) og én skriftstørrelse, radknappene følger feltene, og kontrollene arver ikke lenger sidens luftige linjehøyde. Før spriket tre høydemekanismer og to arvede skriftstørrelser om hverandre.
- Fra bug-gjennomgangen før push (åtte granskningsvinkler):
  - KRITISK: historikk og angring gjelder nå NETTSIDEN, ikke repoet. Historikken viser kun commits som rører `content/` under `GITHUB_ROOT_DIR`, og angring bytter bare nettsidens undertre - i Urds monorepo ville den gamle varianten listet utviklingscommits og revertert editor-kildekode.
  - Publisering materialiserer bilder i KLONER: en konflikt-avbrytelse (eller 409) etterlater ikke lenger utkast som peker på media-filer som aldri ble committet. Minnet speiles først når commiten er trygt inne.
  - Konfliktvinduet er tettet server-side: editoren sender `expect` (HEAD-en sjekken så) til commit-endepunktet, som avviser med 409 om noen rakk å publisere i mellomtiden; det samme gjelder non-fast-forward i selve ref-oppdateringen (før: rå 502). Avkortede GitHub-differ (300+ filer) behandles som mulig overlapp i stedet for å slippe gjennom.
  - Etter angring sperres publisering til admin er lastet på nytt: editoren viser fortsatt innholdet fra før angringen, og en publisering derfra ville stille gjeninnført det angrede.
  - Tomt repo gir tom historikk i stedet for feilmelding; robust JSON-lesing i alle nye svarstier; delt `triggerDeploy`-hjelper for commit og revert; manglende konfliktgrunnlag prøves på nytt ved neste publisering.

### 0.5.4.2 - bakgrunnseditor-runde to - 18. juli 2026
- Lagtypen kan byttes etter at laget er lagt til (nedtrekk i laget; innstillingene nullstilles ved bytte).
- Styrke-glider på ALLE lagtyper: farge og gradient har fått additivt `opacity`-felt i motoren, så lag kan blandes fritt (mix and match).
- Gradientvinkelen er glider (0-360°) i stedet for tallfelt, og «Animert» heter nå «Panorer sakte (loop)» med forklaring, så den ikke forveksles med Animasjon-valget (som gjelder innholdet).
- Inngangsanimasjoner spilles nå én gang i forhåndsvisningen hver gang de endres fra panelet (demo-avspilling), i stedet for bare å vise slutt-tilstanden - hos besøkende spilles de fortsatt ved scrolling.
- Bildelaget har fått full editor: fokuspunkt X/Y, uskarphet (0-20 px), gjenta som mønster, styrke.
- Panelet kan ikke lenger få horisontal scrolling fra brede nedtrekk («Tilpasning»-boksene).
- Egen slank, mørk scrollbar i hele admin, og nettsiden selv har fått temafarget slank scrollbar (matcher, og ser bedre ut enn nettleser-standarden på mørke sider).

### 0.5.4 - bakgrunnseditor og animasjoner (M4) - 18. juli 2026
- Bakgrunnseditor i seksjonsegenskapene: lagliste med legg til/fjern/sorter, og per lagtype: farge (velger), gradient (fra/til-farge, vinkel, animert panorering), glød (farge, posisjon, størrelse, styrke), korn (styrke) og NYTT bildelag (opplasting med webp-komprimering, tilpasning, styrke; materialiseres som media-fil ved publisering, samme flyt som bildeblokken).
- Animasjoner i motoren: `Urd.animations`-registeret har fått kjernetypene `fade-in`, `slide-up`, `zoom-in` (spilles ved scroll-inn hos besøkende via IntersectionObserver) og `hover-lift`. Alle følger version+migrate-kontrakten (egen testfil). `prefers-reduced-motion` respekteres; ukjent animasjonstype viser innholdet uanimert.
- Animasjons-UI i Egenskaper-panelet for både blokker og seksjoner: type, varighet og forsinkelse. Editorens forhåndsvisning viser slutt-tilstanden (redigering skal ikke utløse evige avspillinger); selve avspillingen skjer hos besøkende.
- Seksjoner har fått valgfritt `animation`-felt i skjemaet (additivt, ingen migrering nødvendig).

### 0.5.3.3 - panel-finpuss - 18. juli 2026
- Sider-panelet (og alle andre paneler) holder seg nå innenfor panelbredden: radene klemmes i stedet for å gi horisontal scrolling.
- Radknappene i Blokker-panelet (grupper, Knapp, Bilde) deler nå samme høyde og utlegg, så listen ser jevn ut.
- Toasten («Publisert!» m.fl.) har fått luft mot høyrekanten og ligger klar av forhåndsvisningens scrollbar.
- Nav-panelet hadde samme overflyt ett nivå ned (radene er egne grids, og nedtrekk har egenbredde): også de klemmes nå til panelbredden.
- Nedtrekkslistene har fått egen pil med luft mot høyrekanten, og teksten i dem linjerer nå med tekstfeltene (nettleserens innebygde pil og innrykk er skrudd av).

### 0.5.3.2 - dra over seksjonstoppen + knappe-lenke-fiks - 18. juli 2026
- Blokker kan nå dras over toppen av sin egen seksjon (negativ y), symmetrisk med at de alltid har kunnet henge under bunnen. Før satt blokker laget i en seksjon fast ved seksjonens overkant og kunne ikke dras oppover ut av den. Skjemaets y-minimum er fjernet (ren oppmykning, knekker ingen sider).
- Knapp-egenskapene: ekstern lenke starter nå som tomt felt med plassholder i stedet for «#», og bytte side ↔ ekstern lenke mister ikke lenken man hadde skrevet.

### 0.5.3 - Egenskaper-panelet og teksteditor (M3) - 17. juli 2026
- Egenskaper-panelet for valgt blokk: posisjon/størrelse/lag/rotasjon som tallfelt (desktopvisning), 📵-avkrysning med forklaring, og per type: tekst (justering, tekstboks av/på), knapp (tekst, mål: side eller ekstern lenke, stil), bilde (bytt bilde, alt-tekst, tilpasning, avrunding, lenke), form (type, temafarge, tykkelse, fylt).
- Egenskaper-panelet for valgt seksjon: minstehøyde (px eller CSS-verdi) og eget grid (flyttet hit fra Grid-panelet, som nå kun eier sidens grid).
- Flytende formateringslinje over markert tekst i tekstblokker: fet, kursiv, H1/H2/H3/avsnitt og temafarger (tekst/aksent). Lagres gjennom den vanlige utkastflyten.
- Blokkmarkeringen overlever nå rerendringer (endringer fra panelet fjernet tidligere det lilla omrisset).
- Backlog: mobil-tilsyn-varselets tydelighet, 📵 i manuelle seksjoner og «mobil som egen versjon» er logget som egne avklaringer etter eiers testrunde.

### 0.5.2.3 - mobil-synlighetsikon og dra på seksjonsgrensen - 17. juli 2026
- Dekor-knappen viser nå tilstanden med selve ikonet: 📱 = blokken vises på mobil, 📵 = skjult i automatisk mobil-layout (pynt). Erstatter ✦, som krevde at man visste hva fargene betydde (og tooltipen beskrev en grå tilstand som ikke fantes).
- «+ Ny seksjon»-baren kan dras: den ligger på grensen mellom to seksjoner, og dra flytter grensen (høyden på seksjonen over) med samme grid-snapping og Shift-overstyring som seksjonslinjen. Klikk åpner fortsatt preset-menyen.

### 0.5.2.2 - feilretting av ny side-flyten - 17. juli 2026
- KRITISK: site-utkastet nådde aldri forhåndsvisningen etter panelomleggingen (postMessage tåler ikke Svelte-reaktive objekter og kastet DataCloneError). Dette knakk hele ny side-flyten: siden ble registrert, men utkastet ble aldri opprettet, forhåndsvisningen ble stående på forsiden, og nav/tema-endringer vistes ikke live. Alt går nå gjennom et rent snapshot.
- Forhåndsvisningen får alltid sidedata fra editoren for upubliserte sider (serveren kjenner dem ikke og falt tilbake til forsiden).
- Publisering skriver alltid sidefilen for nye sider, også uten utkast - en registrert side uten fil ville gitt besøkende en død adresse.
- Motoren viser en tom side (med varsel i konsollen) i stedet for å krasje om en sidefil mangler.
- Sider- og Nav-panelradene holder seg på én linje (verktøyknappene brøt om).

### 0.5.2 - sider, nav og tema (M2) - 17. juli 2026
- Sider-panelet: opprett nye sider (starter tomme, legges automatisk i menyen), gi sider nytt navn og ny adresse, og slett sider (forsiden er fredet; Ctrl+Z angrer alt frem til publisering).
- Nav-panelet: rediger menyen (tekst, mål: side eller ekstern lenke, rekkefølge, fjern) og logoen (tekst eller bilde-URL). Alt vises live i forhåndsvisningen.
- Tema-panelet: fargevelgere for bakgrunn/flater/tekst/aksent, fontvalg for overskrifter og brødtekst, og avrundingsverdier. Alt vises live.
- Ruting på alle statiske hoster: publisering genererer `<adresse>/index.html` for hver side utenom forsiden (kopi av rot-index.html; motoren ruter på adressen). Slettede og flyttede sider rydder sine filer i samme commit.
- Publiseringslaget kan nå slette filer (tre-innslag med `sha: null`; stier som alt er borte hoppes trygt over), og sti-vernet tillater `<slug>/index.html` for ikke-reserverte slugs (aldri rot-index.html). Nye vern-tester.
- Dekor-knappen (✦) forklarer nå fargene i tooltipen (gul = pynt som skjules i automatisk mobil-layout, grå = innhold som vises), og teksten følger tilstanden.

### 0.5.1.4 - brukerveiledning - 17. juli 2026
- Ny [docs/BRUKERVEILEDNING.md](docs/BRUKERVEILEDNING.md): veiledning for sideeiere (editoren, blokker, dekor-flagget, seksjoner, grid, mobil, publisering). Utvides løpende; full opprydding er planlagt mot v0.9.

### 0.5.1.3 - gruppene som menyknapper - 17. juli 2026
- Gruppene i Blokker-panelet ser ut som blokk-knappene (full bredde, samme ramme) med ▸/▾-pil til høyre; åpnet gruppe viser blokkene som vertikal liste under, lett innrykket.

### 0.5.1.2 - blokkgrupper og tekstboks - 17. juli 2026
- Tekstboks: tekstblokk-variant der innholdet ligger i et kort med temaets flatefarge, kantlinje og avrundede hjørner. Valgfritt additivt `box`-felt på tekstblokkens props; eldre data rendres uendret.
- Blokker-panelet er gruppert: Tekst (Tekst, Tekstboks) og Former (Strek, Pil, Sirkel, Rektangel, Trekant) som grupper, med Knapp og Bilde imellom.

### 0.5.1 - ny editor-layout (M1) - 17. juli 2026
- Smal panelvelger til venstre med tekstknapper (Sider, Blokker, Egenskaper, Tema, Nav, Grid, Historikk) som åpner et panel mellom linjen og forhåndsvisningen. Blokkpaletten bor nå i Blokker-panelet og grid-innstillingene i Grid-panelet (gridet vises så lenge panelet er åpent); Sider/Egenskaper/Tema/Nav/Historikk er skall som fylles utover v0.5. Topplinjen er slanket til sidevelger, 💻/📱, tilsyn-chip og publiseringsknappene.
- Statusmeldinger vises som toast nederst til høyre (med lukkeknapp) i stedet for chip i topplinjen.
- Forhåndsvisningen melder blokkvalg til editoren (`urd-select-block`), så Egenskaper-panelet vet hvilken blokk eller seksjon som er valgt.

## [0.4.0] - 2026-07-17

«Responsivt»: sider bygget på desktop fungerer på mobil uten manuell
inngripen, og håndjusterte mobil-layouts voktes av tilsyn-flagget fra
det opprinnelige designet. Porten bestått på urdweb.pages.dev.

### Lagt til
- **Responsivt:** besøkende på mobil (skjerm smalere enn breakpointet, standard 640px) får automatisk én-kolonne-layout: blokkene stables i leserekkefølge som ekte flyt, tekst får naturlig høyde, og dekor-blokker utelates. Motoren bytter modus live ved vindusendring.
- Mobilvisning i editoren: 💻/📱-toggle smaler forhåndsvisningen til 390px. Mobilvisningen er layoutjustering og tilsyn (palett, strukturverktøy og tekstredigering er reservert desktopvisningen).
- Manuelle mobil-layouts: første dra i mobilvisning setter seksjonen i manuell modus og gir alle blokkene konkrete mobil-frames (lest fra flyt-posisjonene), klare til fri justering. ↺ tilbakestiller til auto.
- Mobil-tilsyn-flagget ende-til-ende: desktop-endringer i en håndjustert seksjon markerer den gult og teller opp i topplinjen («N seksjoner trenger mobil-tilsyn», klikk hopper til mobilvisning); ✓ på seksjonen kvitterer ut. Lagres som data og publiseres (deles mellom redaktører); besøkende påvirkes aldri.
- Dekor-flagg (✦ på blokkverktøylinjen): blokken utelates fra automatisk mobil-layout. Nye former er dekor som standard. Valgfritt additivt skjemafelt (`decor`), ingen migrering nødvendig.
- «Til toppen»-pil på nettsiden: dukker opp nede til høyre etter scrolling (respekterer prefers-reduced-motion). Scrollbaren skjules i editorens mobil-forhåndsvisning.

## [0.3.0] - 2026-07-17

«Lerretet»: fri komposisjon på ordentlig. Alle kjerneblokkene er på plass
(tekst, knapp, bilde med opplasting, fem formtyper), seksjoner opprettes,
flyttes, skaleres og slettes in-place, alt kan angres, og grid-systemet er
lagt om til rene hjelpelinjer som aldri flytter innhold. To skjemamigreringer
(fysiske enheter og kvadratgrid) er gjennomført etter kontrakten og bevist
med tester, og repoet fikk fullt kvalitetsvern (CI, CodeQL, Dependabot).

### Lagt til
- Angre/gjenta i editoren (Ctrl+Z / Ctrl+Shift+Z) for alle handlinger: flytt, resize, blokker og seksjoner inn/ut, seksjonshøyde, grid-endringer og forkast. Fungerer også når fokus står i forhåndsvisningen.
- Bildeblokk med opplasting: «+ Bilde» komprimerer til webp i nettleseren (maks 1600px, med størrelsesvarsel), viser bildet umiddelbart i utkastet, og publiserer det som fil i media/ i samme commit (samme bilde gir alltid samme filnavn). Valgfri lenke gjør blokken brukbar som logo.
- «+ Form»-meny med strek, pil, sirkel, rektangel og trekant.
- z-orden: ⬆/⬇-knapper på blokkverktøylinjen legger blokken helt foran/bak.
- Klikk-markering av blokker: varig omriss og synlige håndtak til man klikker utenfor.
- Målseksjon: paletten legger nye blokker i sist klikkede seksjon (markert med aksentlinje), plassert midt i synsfeltet.
- «Tilpass høyden til innholdet» (⤓) på seksjonsverktøylinjen: setter seksjonshøyden til nederste blokkkant med ett klikk, lagret gjennom vanlig utkastflyt.
- Grid per seksjon («Eget grid i valgt seksjon») og Shift-for-fri-plassering under dra/resize.
- «Ren visning»-knapp som skjuler alle editeringshåndtak og hele topplinjen; flytende Rediger-knapp tar deg tilbake.
- Tekstblokker vokser automatisk med innholdet under skriving.
- Statusmeldinger som fargekodet chip: grønn kvittering «✓ Publisert! Siden bygges på nytt (~1 min)» som rydder seg selv, rød for feil.
- Strammet CSP i `_headers` (script/style/connect kun 'self'); boot-skriptet flyttet til `assets/engine/boot.js`.
- Kvalitetsvern på repoet: CI-workflow (tester, skjemavalidering, editor-bygg), CodeQL, Dependabot (npm + actions) og dependency review. Skjemavalidering er `npm run validate` i editor/.

### Endret
- **Blokkplassering lagres i fysiske enheter** (sidefiler schemaVersion 2: x/w i prosent av seksjonsbredden, y/h i px). Gridet er dermed KUN et snappeverktøy: å endre det flytter aldri innhold. v1-filer løftes automatisk ved lasting (`liftPageFile`), Urds første reelle filmigrering, testet i `tests/page-migration.test.mjs`.
- **Gridet er kvadratisk med én innstilling: rutestørrelse i px** (slider; mindre = tettere). site.json er schemaVersion 2 og sidefiler schemaVersion 3; eldre filer OG gamle localStorage-utkast løftes automatisk (kjedet migrering).
- **Blokker kan bevisst henge over seksjonslinjen:** seksjoner klipper aldri innhold, og seksjonshøyden er nøyaktig den brukeren har satt (motoren tvangs-utvider ikke lenger). Fjernet avviket mellom editor og publisert side; sidescrolling hindres med overflow-x: clip.

### Fikset
- Robusthet mot GitHub-nedetid: 5xx/429 fra GitHub-API-et prøves automatisk på nytt, «GitHub er nede» skilles nå fra «ugyldig innlogging» (en GitHub-hikke så tidligere ut som at man ble logget ut av admin), og feilmeldinger kortes ned i stedet for å vise GitHubs HTML-feilsider.
- «+ Ny seksjon»-barene tok plass i flyten og forskjøv seksjonene i editoren i forhold til hvordan besøkende ser dem; de svever nå oppå selve skillet (null høyde i layouten), så høyde-linje, bar og fargeskift ligger på samme sted.
- Seksjonsverktøylinjen (↑ ↓ ⤓ ×, der × sletter seksjonen) vises kun mens pekeren er i seksjonen, og ligger alltid øverst (kunne før dekkes av løftede blokker).
- Tekstblokker: redigeringshåndtakene lå inne i det redigerbare feltet, slik at ny tekst kunne havne i verktøylinjeraden, håndtak-HTML ble lagret i innholdet (som så «forsvant»/rotet seg ved rerendering), og resize-håndtaket lurte vekstmålingen til å utvide blokken for hvert tastetrykk. Teksten har nå sitt eget indre innholdselement, og gammelt forurenset innhold renses automatisk ved rendering.
- Publisering tar nå med utkast fra ALLE sider, ikke bare siden man står på (endringer på andre sider ble stående upublisert i stillhet). «Upubliserte endringer»-merket teller også alle sider.
- Sidevelger-nedtrekket følger mørkt tema (nettleser-standarden ga hvit liste med uleselige valg).
- Nye blokker plasseres nå midt i synsfeltet (i aktiv seksjon, ellers seksjonen nærmest skjermmidten) i stedet for nederst utenfor syne. Plasseringen beregnes i forhåndsvisningen, som vet hvor brukeren har scrollet.
- Slette-bekreftelsene er fjernet (Ctrl+Z er angrefristen), nedtrekksmenyene lukkes ved klikk utenfor, og Rediger-knappen i ren visning ligger under nettsidens topplinje, klar av scrollbaren, og mer transparent.
- Blokk-håndtakene (flytt/z/slett/resize) kunne dekkes av overlappende blokker og bli uklikkbare: hovret/markert blokk løftes nå visuelt øverst under redigering. «Frem/bak» legger dessuten blokken helt øverst/nederst i seksjonen i stedet for ett hakk (som satt fast når alt lå på samme lag).
- Utkast kunne «forsvinne» ved sidebytte i admin: editoren sendte utkastet før motoren i iframen var klar til å lytte. Motoren melder nå «klar», og editoren venter på signalet.
- Lenker i forhåndsvisningen navigerte iframen ut av redigeringsmodus: interne lenker bytter nå side via editoren (nedtrekket følger med), eksterne åpnes i ny fane.
- Ctrl+Z virket ikke fra tallfeltene i grid-menyen (grid-endringer er del av historikken, men tastetrykket ble slukt av feltet).
- Gridet vises nå i alle seksjoner så lenge grid-menyen er åpen, med forklarende tekst og live rutestørrelse i menyen.
- Grid-innstillinger så ut til å ikke virke på Om oss-siden: eksempelseksjonen hadde et eget grid-overstyr (12 kolonner) som vant over site-gridet. Overstyret er fjernet fra eksempelinnholdet; per-seksjon-grid får eget UI senere.
- Høyde-håndtaket på seksjoner viser nå en presis kantlinje og respekterer snap-innstillingen.
- Seksjonshøyde kan dras: håndtak i underkant av hver seksjon i editoren, snappet til gridets radhøyde.
- Seksjons-CRUD i editoren: «+ Ny seksjon»-barer mellom seksjonene med preset-valg (tom, hero, footer), og verktøylinje per seksjon for å flytte opp/ned og slette. Presets er datafabrikker i motorregisteret (`Urd.sections.define`), samme API som plugins får.

## [0.2.0] - 2026-07-16

«Tynn skive»: Urd fungerer ende-til-ende. Porten bestått: en overskrift redigert
i nettleseren på en deployet side (urdweb.pages.dev) ble publisert med ett klikk
og vist live, uten at en kodefil ble rørt.

### Fikset
- Publisering kan trigge hostens deploy direkte via valgfri `DEPLOY_HOOK_URL` (git-webhooken hos Cloudflare kan glippe; publiseringen er da ikke lenger avhengig av den).
- Publisering skrev til feil sti når nettsiden ligger i en undermappe av repoet (som `template/` i monorepoet): ny valgfri miljøvariabel `GITHUB_ROOT_DIR` prefikser repo-stiene, mens editor og sti-vern fortsatt jobber nettside-relativt.
- Admin krasjet ved oppstart etter grid-arbeidet (structuredClone av Svelte-proxy i utkastlageret).

### Lagt til
- Synlig grid under dra/resize, og grid-kontroller i editoren (kolonner, radhøyde, snap av/på) som redigerer site.json gjennom utkast-og-publiser-flyten. Snap av gir fri plassering i kvarte grid-enheter.
- Lerret-redigering (v0.3-start): dra, resize og slett blokker med grid-snapping direkte i forhåndsvisningen (håndtak på hover), og blokkpalett (+ Tekst / + Knapp / + Form) i editoren. Editeringslaget (`preview-edit.js`) lastes kun i preview-modus og når aldri besøkende.
- Publiseringslaget: GitHub OAuth (login/callback/me) og commit/latest via Git Data API som Cloudflare Pages Functions, med httpOnly-token, ALLOWED_LOGINS og sti-allowlist (enhetstestet). Innloggingsstatus og «Logg inn med GitHub» i editoren. Oppsettguide i `docs/OPPSETT-PUBLISERING.md`.
- Editoren (første versjon): preview-iframe med den ekte siden, klikk-og-skriv på tekstblokker, utkast i localStorage med ærlig «upubliserte endringer»-merke, forkast og publiser (publiseringslaget er fortsatt stubb). Bygges fra `editor/` til `template/admin/assets/`.
- Motoren rendrer sider: `render.js` (grid-til-CSS, migrering, plassholdere), blokkene `text`/`button`/`shape`, bakgrunnslagene `color`/`gradient`/`glow`/`grain`, navigasjon fra sideregisteret, plugin-lasting og preview-modus i `urd.js`. Tester i `tests/render.test.mjs`.
- `CONTRIBUTING.md`: bidragsguide for eksterne bidragsytere (fork/gren/PR-flyt).
- Visjons- og arkitekturdokumenter (`docs/`), datamodell-kontrakt (`docs/SKJEMA.md` + `schema/`).
- Repo-skjelett: `template/` (motor-stubber, eksempelinnhold, functions-stubber) og `editor/` (Svelte-skall).
- `template/assets/engine/migrate.js` - stegvis versjonsløfting (kjerne-invarianten), med tester i `tests/`.
- Utviklerdokumentasjon (`docs/UTVIKLING.md`) og løpende oppgaveliste (`docs/BACKLOG.md`).
