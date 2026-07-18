# Endringslogg

Alle vesentlige endringer i Urd dokumenteres i denne filen.

Formatet følger [Keep a Changelog](https://keepachangelog.com/no/1.1.0/),
og prosjektet følger [semantisk versjonering](https://semver.org/lang/no/).

## [Ulansert]

Arbeidet mot 0.5.0 pushes nummerert (0.5.1, 0.5.1.2, 0.5.1.3, …) så
testrundene kan vise til en konkret push. Numrene er arbeidspunkter,
ikke slipp; alt samles i 0.5.0 ved fasegaten.

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
