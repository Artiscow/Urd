# ADR-0018: Bundet innholdsbredde

Dato: 10. august 2026. Status: vedtatt (v0.7, milepæl 0.7.2 breddegrepet).

## Kontekst

`frameToCss` i `template/assets/engine/<v>/render.js` plasserer blokker med `left` og `width` i PROSENT av seksjonsbredden, og `top` og `height` i PIKSLER. Seksjonen er alltid full vindusbredde, og det finnes ingen wrapper med maksbredde noe sted i motoren. Eneste breddebegrensning i hele motoren i dag er den rike footeren (`.urd-footer-wrap`, 1080 px).

Den blandingen gir to symptomer med samme rot:

1. **Blokker strekker seg evig med bredden.** Et tekstfelt med `w: 50` er 490 px bredt på en liten bærbar og 1200 px på en ultrabred skjerm. Ingen øvre grense finnes, så en linje tekst kan bli uleselig lang.
2. **Fold-avviket i forhåndsvisningen.** Editoren rendrer iframen ved `window.innerWidth` og skalerer uniformt ned. Siden layouten ikke er breddeinvariant, avhenger pikselposisjonen til alt under en `85vh`-seksjon av admin-vinduets bredde, og folden stemmer ikke med det en besøkende ser.

Med en bundet innholdsbredde blir `x%` av en FAST bredde et fast pikseltall. Da er begge akser effektivt piksler over designbredden, layouten blir breddeinvariant, og ett grep fjerner begge symptomene. Det er Wix-modellen: fullbredde seksjonsbakgrunn, bundet innhold.

Feltstudien støtter formen: fullbredde bakgrunn med bundet innhold er modellen overalt.

**Tallet krever et skille som er lett å bomme på.** «1440» i designveiledning er som regel ARTBOARDET, altså skjermen man designer på, og innholdscontaineren inni den er 1140 til 1200. Målt som ren innholdsbredde er 1200 den mest brukte verdien. Byggerne som har full-bleed seksjoner og bundet innhold, altså samme modell som her, ligger derimot høyere i sin egen tilsvarende innstilling: Squarespaces «Page Width (Max)» anbefales på 1440, og Wix Studio har 1600 som standard. Veiledningen forklarer spriket med sjanger: 960 til 1024 for tekstunge sider, 1280 til 1440 for bilde- og markedsføringsdrevne. Urd bygger foreningssider med helter og bilder, ikke dokumentasjon.

## Beslutning

1. **Innholdet bindes av en ny node per seksjon, `.urd-canvas`, som legges inne i `.urd-section` etter bakgrunnslagene.** Blokkene (eller `.urd-flow` i mobil auto-modus) flytter inn i den. Bredden er `min(100% - 2 * marg, designbredde)` med `margin-inline: auto`.

   `.urd-section` forblir full vindusbredde, og `.urd-bg-layer` forblir `position: absolute; inset: 0`. Fullbredde bakgrunn med bundet innhold koster dermed ingen `100vw`-utbryter, ingen rullefelt-skjevhet og ingen transform.

   Alternativet, å legge `calc()` inn i `frameToCss` og slippe noden, er forkastet: det ville tvunget editoren til å REGNE UT innholdsbredden med samme `min()`-uttrykk som CSS-en i stedet for å MÅLE den, altså bygget drift mellom editor og motor inn i designet. Det ville også knekt `sticky.js` sin `parseFloat(el.style.left)`, som gir NaN på en calc-streng. `frameToCss` er derfor uendret.

2. **Kanvasen er absolutt plassert på skrivebord, og i flyten kun på mobil.** Seksjonens verktøylinje i editoren er `position: sticky`, altså et flyt-element, og var seksjonens ENESTE. Lå kanvasen i flyten ved siden av den, vokste seksjonen med verktøylinjens høyde hver gang pekeren traff den og krympet igjen når den forlot (funnet i testing 10. august 2026). På mobil MÅ kanvasen derimot ligge i flyten, siden auto-layouten er ekte dokumentflyt og seksjonshøyden drives av `.urd-flow` inni.

3. **`.urd-canvas` skal ALDRI ha `transform`, `filter`, `perspective`, `backdrop-filter`, `contain`, `container-type` eller `will-change`.** Alle sju lager en containing block for `position: fixed`-etterkommere og ville drept festede og skjermdokkede blokker (0.7.1). Regelen håndheves av en filinvariant-test som leser base.css, ikke bare av en kommentar.

   Samme funn diskvalifiserer to nærliggende design: en modell der innholdet alltid er designbredden og skaleres ned med `transform` på smalere skjermer, og container queries lagt på lerretsnivå.

4. **Bredden bor to steder, begge additive (ADR-0005).** `site.layout = { contentWidth, gutter }` er nettstedets designkonstant, med `contentWidth` som tall i px eller strengen `"full"`. Tall og ikke CSS-streng, fordi editoren må regne aritmetisk på verdien for forhåndsvisningens målbredde.

   **`gutter` er PROSENT AV VINDUSBREDDEN (vw), ikke piksler** (endret 10. august 2026, schemaVersion 2 → 3). Margen virker kun som et gulv, altså bare på skjermer der `contentWidth` ikke binder ennå, og det båndet ligger mellom mobilbrekkpunktet og cirka 1640 px. Der er en fast marg feil størrelse i begge ender: 24 px er greit på telefon, men lar innholdet nesten klistre seg til kanten på et nettbrett. En relativ marg er passe i hele båndet. Editoren viser den som en skala (Ingen, Liten, Middels, Stor) med det rå vw-tallet under Avansert, siden tallet ikke betyr noe for en sideeier.

   Konsekvens som må stå: med relativ marg er bindingsgrensen ikke `contentWidth + 2 * gutter`, men `contentWidth / (1 - 2 * gutter/100)`, fordi margen vokser med vinduet. Med 1440 og 6 % er den 1637, ikke 1488. Det betyr at standarden binder eksakt på 1920, men ikke lenger på 1536; der er flaten fortsatt bundet og vokser ikke fritt, den når bare ikke helt opp i 1440. Ren funksjon `bindingWidth` i `editor/src/lib/content-width.js`, med test. `section.size.maxWidth` er per-seksjon overstyring og rømningsluke for fullbredde-helter og kant-til-kant skillelinjer. Feltet fantes allerede i `schema/page.schema.json`, ble aldri lest av motoren og var ikke dokumentert; det tas i bruk og dokumenteres i samme commit.

   **Standard er `contentWidth: 1440`, `gutter: 6`.** Den binder eksakt på den vanligste skrivebordsoppløsningen (1920x1080) og svarer til Squarespaces anbefaling for den tilsvarende innstillingen. Verdien var først satt til 1200, som lot 37,5 % av en 1920-skjerm stå tom; den ble korrigert 10. august 2026. Tekstunge nettsteder er bedre tjent med 1080 eller lavere, og det er nettopp derfor bredden er en innstilling og ikke en konstant.

   Bredden er redigerbar i Nettsted-panelet: fire hurtigvalg, fri justering 960 til 1920, egen kontroll for sidemargen, og en levende prøve mot tre ekte skjermbredder som viser hvor bredden binder.

5. **Bindingen gjelder kun over mobilbrekkpunktet.** Under `body.urd-mobile` er margen 0 og kanvasen 100 %, så alle eksisterende `frames.mobile` beholder nøyaktig betydningen sin. Mobilmodellen er milepæl 0.7.3 og røres ikke her.

6. **Ingen grandfather: alt konverteres nå.** Ingen ordentlige sider er bygget med Urd ennå, så pre-v1-klausulen i ADR-0005-addendumet gjelder, og vi slipper å vedlikeholde to layoutmodeller for alltid. `SITE_SCHEMA_VERSION` bumpes, og migreringen fyller inn `layout` eksplisitt på filer som mangler det, slik at feltet alltid er til stede etter lasting og editor og motor aldri kan utlede ulik standard.

## Konsekvenser

- **En klon laget fra v0.6.11 med eget innhold vil reflowe ved oppdatering.** Det er den direkte prisen for punkt 6, og det sies her i klartekst i stedet for å oppdages. Fra v1.0 ville samme grep krevd en ekte migreringsvei med bevart utseende.

- **Grepet gir IKKE breddeinvarians generelt.** I båndet mellom mobilbrekkpunktet (640) og bindingsgrensen (1637 med standardverdiene) er `x`/`w` fortsatt prosent mens `y`/`h` er piksler, altså nøyaktig dagens forvrengning. Grepet AVGRENSER den til et endelig bånd i stedet for et ubegrenset område. Ekte fiks er enten et nettbrett-brekkpunkt (0.7.3) eller Wix Studios modell der begge akser ganges med samme faktor, som forutsetter at typografien skalerer med. ADR-en skal ikke leses som en påstand om invarians under designbredden.

- **Breddeinvarians er ikke innholdsinvarians.** Selv ved eksakt designbredde er `h` fast mens innholdet varierer med skriftlasting, brukerens skriftstørrelse, nettleser-zoom og språk (de fem UI-språkene i ADR-0012; tyrkisk og nordsamisk tekst er lengre enn bokmål). Den innholdsdrevne halvparten av utrenningen løses først av `minmax(høyde, auto)`-radmodellen fra LAERDOMMER 5.1, som er neste steg og krever egen ADR fordi frames da går fra prosent og piksler til grid-koordinater.

- **Tekstblokken må få et render-tids sikkerhetsnett før konverteringen.** `blocks/text.js` vokser i dag kun inne i sin `input`-lytter, altså bare mens noen faktisk skriver, og bare i preview desktop. De seks datablokkene (statistikk, sitat, tidslinje, galleri, faq, samling) måler derimot ved render i en `requestAnimationFrame` og retter seg selv både i preview og hos besøkende. Tekstblokken får samme mønster. Forbehold: nettet hindrer at teksten renner ut av sin egen boks, ikke at boksen overlapper blokken under, siden posisjoneringen er absolutt.

- **Ingen migrering kan redde lagrede høyder.** Et tekstfelt med `w: 50` var 960 px bredt ved 1920 px vindu og blir 588 px ved 1200 px designbredde; teksten brytes mer og trenger mer høyde, men den ombrutte høyden finnes først når noe faktisk rendres i en nettleser. Håndjusterte overlapp, optiske justeringer og roterte blokker endrer dessuten proporsjoner. Demo-innholdet, de 24 seksjonspresetene, de fem startpakkene (som komponerer de samme presetene) og plugin-presetene konverteres derfor for hånd og synses visuelt.

- **Dataene skiller ikke fullbredde-INTENSJON fra kolonnebredde.** `w: 100` kan bety «jeg ville ha hele skjermen» eller «dette er kolonnen», og bare eieren vet hvilken. Rømningsluken er `section.size.maxWidth: "full"` per seksjon. Et per-BLOKK `bleed`-felt er den langsiktige løsningen (Wix har det), men hører ikke til denne milepælen.

- **Forhåndsvisningen pinnes til fire ekte enheter, og fyller alltid panelet.** Fold-avviket har to uavhengige årsaker: at layouten avhenger av admin-vinduets bredde (som denne ADR-en fjerner ved å pinne lerretsbredden), og at lerretet har annet sideforhold enn en ekte nettleser, slik at `100vh` løses mot lerretet. Den andre halvparten ble forsøkt løst ved å pinne også høyden, altså letterboks, og det er **forkastet** (testfunn 10. august 2026): synlige barer rundt siden bryter med at siden skal vises slik den faktisk vises, som er hele poenget med Squarespace-modellen. En omtrentlig fold er en usynlig kostnad; barer er en synlig. 0.6.6.5.9 sitt fyll-valg står altså uendret.

  Skrivebordslerretet er en FAST referanseskjerm på 1920, ikke bindingsbredden. Bindingsbredden ble prøvd og forkastet i samme testrunde: den gjør lerretsbredden avhengig av sidemargen, så å dra i margen endret zoomen og fikk hele siden til å se større eller mindre ut, og den smaleste innstillingen ga mest letterboks. Med en fast referanse blir margen synlig der den faktisk virker, altså på Bærbar og Nettbrett.

- **Container queries lukkes for lerretet, men ikke for blokkene.** `container-type: inline-size` innebærer `contain: layout style inline-size`, og layout-containment gjør elementet til containing block for `position: fixed`. Container queries hører derfor hjemme i blokk-INNMATEN (en `samling` eller et `galleri` som velger kolonnetall fra sin egen bredde), aldri på `.urd-canvas`, og en blokk med `sticky` må aldri få `container-type`. Dette lukker ELEMENTKART 5b.9 med en begrensning i stedet for et åpent ønske; bruksstedet hører til 0.7.4 og 0.7.9.

- **Subgrid er ikke anvendbar.** Kanvasen er absoluttposisjonering, så det finnes ikke noe grid å være sub- av. Subgrid får bruksted først hvis layouten faktisk blir et grid.

- **Editorens målesteder må rebases fra seksjonen til kanvasen.** `preview-edit.js` måler i dag `host.clientWidth` på `.urd-section` omtrent femten steder (dra, resize, piltaster, marquee, gruppedra, grid-overlegg, blokkmeny, materialisering av mobil-frames). `sticky.js` utleder blokkens venstrekant og bredde fra seksjonsrekten, men slippgrensen fra seksjonens topp og bunn; de to må splittes i hver sin variabel. En felles `canvasOf`-hjelper gjør at alle stedene ser like ut, slik at en glemt måling er mekanisk søkbar.

[ADR-0005]: 0005-versjonering-og-migrering.md
[ADR-0011]: 0011-native-css-forst.md
[ADR-0012]: 0012-flerspraak.md
