# Brukerveiledning

For deg som eier eller redigerer en side bygget med Urd. Ingen kode, ingen
git-kunnskap nødvendig: alt skjer i nettleseren på din egen side.

> Urd er under utvikling. Veiledningen dekker det som finnes i dag og
> utvides etter hvert; en full opprydding er planlagt mot v0.9.

## Kom i gang

1. Gå til `/admin` på siden din (for eksempel `dinside.pages.dev/admin`).
2. Logg inn med GitHub-kontoen din (knappen oppe til høyre). Du kan se og
   prøve editoren uten innlogging, men ikke publisere.
3. Alt du endrer lagres som **utkast** i nettleseren din med en gang.
   Ingenting blir synlig for besøkende før du trykker **Publiser**.

## Editoren

Skjermen har tre deler:

- **Topplinjen**: velg side, bytt mellom desktop- og mobilvisning (skjerm- og telefonikonene), og publiser.
- **Panelvelgeren til venstre**, gruppert etter arbeidsflyt: Sider,
  Blokker, Egenskaper og Grid (bygge siden), Tema, Nav og Footer
  (nettstedet), og Historikk. Klikk for å åpne et panel; klikk igjen
  for å lukke.
- **Admin-tema**: nedtrekket ved siden av Urd-logoen bytter editorens
  eget fargetema (sju varianter). Det påvirker aldri nettsiden din.
- **Forhåndsvisningen**: den ekte siden din. Det du ser er det besøkende får.

**Ren visning** (oppe til høyre) skjuler alle verktøyene så du ser siden
helt uten editor-rammer. Klikk «Rediger»-knappen for å komme tilbake.

## Redigere innhold

- **Skrive tekst**: klikk i en tekstblokk og skriv rett inn i siden.
- **Flytte en blokk**: ta tak i den og dra. Blokken snapper til
  hjelpelinjene (se Grid under).
- **Endre størrelse**: dra i håndtaket i blokkens hjørne.
- **Verktøylinjen over valgt blokk**:
  - ⠿ flytt (dra)
  - lag-pilene (pil mot strek, opp/ned) legger blokken helt foran eller bakerst (når blokker overlapper).
    NB: mens du redigerer vises blokken du peker på eller har markert
    alltid øverst, så håndtakene kan nås - den EKTE rekkefølgen ser du
    i Ren visning og på den publiserte siden
  - telefonikonet: mobil-synlighet (dekor), se under
  - × slett blokken
- **Rotere**: dra i den lille ⟳-sirkelen i blokkens øvre høyre hjørne
  (snapper til 15°-steg; hold Shift for fri vinkel). Nøyaktig gradtall
  kan også settes i Egenskaper.
- **Tastatur på markert blokk**: piltastene flytter ett grid-steg
  (Shift = 1 px), Delete sletter, Esc avmarkerer, Ctrl+D dupliserer.
- **Snappelinjer**: når du drar en blokk nær kanten eller midten av en
  annen blokk, vises en linje og blokken snapper på plass (hold Shift
  for helt fri plassering).
- **Angre**: Ctrl+Z (og Ctrl+Shift+Z for å gjenta) virker på alt: flytting,
  størrelse, tekst, sletting, seksjoner og grid.

### Legge til blokker

Åpne **Blokker**-panelet og klikk blokken du vil ha; den legges midt i
synsfeltet, i seksjonen du sist klikket i. Typene:

- **Tekst**: vanlig tekst rett på siden.
- **Tekstboks**: tekst i et kort med bakgrunnsfarge og avrundede hjørner,
  fint til hjelpetekster og informasjonsbokser.
- **Knapp**: lenke til en annen side eller ekstern adresse.
- **Bilde**: last opp fra maskinen. Bildet komprimeres automatisk.
- **Video**: lim inn en YouTube- eller Vimeo-lenke i Egenskaper.
  Innbyggingen er personvennlig, og videoen spilles på den publiserte
  siden (i editoren markerer klikk bare blokken).
- **Samling**: viser innslagene fra en samling (se Samlinger-panelet)
  som kort, liste eller år-gruppert arkiv.
- **Ikon**: et tegn eller en emoji i valgfri størrelse og temafarge.
  I Egenskaper åpner tegnknappen en meny med hundrevis av tegn og
  emojier (med de nylig brukte øverst), og nederst i menyen kan du
  laste opp et eget ikon-bilde som vises i stedet for tegnet.
- **Former**: strek, pil, sirkel, rektangel og trekant til dekorasjon.

I editoren utløses aldri lenker og knapper når du klikker på dem -
klikket markerer blokken. Test lenkene via «Se siden ↗».

### Hva betyr telefonikonet (dekor)?

Knappen viser om blokken blir med til mobil. På mobil stables innholdet
automatisk i én kolonne, og der hoppes pynt over: en skrå strek eller pil
som ligger fint bak teksten på desktop blir bare rot midt i en mobilkolonne.

- Telefon = blokken er innhold og vises på mobil.
- Overstrøket telefon (gul knapp) = blokken er pynt (dekor) og skjules i
  automatisk mobil-layout.

Klikk for å bytte. Nye former og ikoner fra Blokker-panelet starter
som pynt (ikoner fra seksjonsmalene er innhold og vises på mobil). (Har du håndjustert
mobil-layouten i seksjonen, plasserer du uansett alt selv; da betyr
flagget ingenting der.)

## Egenskaper-panelet

Klikk på en blokk og åpne **Egenskaper** for å finjustere den med tall og
valg i stedet for dra-og-slipp:

- Alle blokker: nøyaktig posisjon og størrelse, lag (hva som ligger
  foran), rotasjon og mobil-synlighet (pynt).
- Tekst: justering og tekstboks av/på. Knapp: tekst, hvor den går og stil.
  Bilde: bytt bilde, beskrivelse, beskjæring, avrunding og lenke.
  Form: type, farge fra temaet, tykkelse og fylt/kantlinje.
- Klikker du i en seksjon (uten blokk valgt) viser panelet seksjonens
  minstehøyde, eget grid, bakgrunn og animasjon.

**Farger**: fargevelgerne viser temafargene dine som prikker - velger du
en av dem, KOBLES feltet til temaet og følger med når du endrer paletten
i Tema-panelet (koblede felt vises med ring). Velger du fritt i flaten
eller skriver en hex- eller RGB-verdi, er fargen frikoblet, og du kan
gjøre den gjennomsiktig med glideren under kulørene. De siste frie
fargene dine ligger under «Nylige», og med plussknappen ved «Lagrede»
bygger du din egen faste palett (opptil 12; × på en prikk fjerner den).

**Bilder**: i Egenskaper kan du sette fokuspunkt (hvilken del av bildet
som beholdes når det beskjæres) og justere lysstyrke, kontrast og
metning - uten at selve bildefilen endres.

**Bakgrunner**: en seksjons bakgrunn er bygget av lag som kan stables:
farge, gradient (kan animeres), glød, bilde og korn. Legg til, fjern og
sorter lag i seksjonens Egenskaper; hvert lag har sine egne kontroller.

**Animasjoner**: blokker og seksjoner kan gli eller tone inn når
besøkende scroller til dem (og «løft ved peker» for hover-effekt).
Velges i Egenskaper. Forhåndsvisningen i editoren viser slutt-tilstanden;
selve animasjonen spilles på den publiserte siden. Besøkende som har
skrudd av animasjoner i systemet sitt (redusert bevegelse) får innholdet
uten animasjon.

**Formatere tekst**: klikk i en tekstblokk (eller i tittel/tekst i et
samlingsinnslag), så dukker verktøylinjen opp ved markeringen: tekstnivå,
fet, kursiv, understrek, gjennomstreking, farger og utheving samlet bak
palettikonet (temafarger, egen farge med full fargevelger og pipette,
uthev med aksent eller egen farge, og fjern utheving: A-en med rød strek
over), lenke (eget felt i linjen), justering, lister, sitat og fjern
formatering. Font og grunnstørrelse for hele feltet settes i Egenskaper.
Linjen lukkes ved klikk hvor som helst utenfor feltet.

**Hjelpechipen «?»**: blokker med spesialfunksjoner (som Samling og
Kalender) viser en «?» øverst i venstre hjørne når du peker på dem.
Klikk den for et hjelpekort som forklarer alle funksjonene; kortet blir
stående til du klikker et annet sted.

**Redigere bilder**: dobbeltklikk et bilde i en bildeblokk (eller klikk
et samlingsbilde) for bildeeditoren: bytt/fjern bilde, dra fokuspunktet
for å styre utsnittet, zoom inn mot fokuspunktet for å beskjære,
velg form på rammen (bred, kvadrat, portrett eller rund), juster
lysstyrke/kontrast/metning (med gråtone-hurtigvalg og nullstilling),
tilpasning, avrunding, beskrivelse (leses av skjermlesere og vises når
bildet ikke kan lastes) og lenke. Mens editoren er åpen ligger et svakt
tredelingsgitter over bildet (som i kameraer), så du ser midten og
tredjedelene mens du komponerer. Alt er ikke-destruktivt:
originalbildet røres aldri.

## Seksjoner

Siden er bygget av seksjoner oppå hverandre. Pek på grensen mellom to
seksjoner for å få **+ Ny seksjon**: den åpner et galleri av ferdige
seksjonsmaler, gruppert med en kort beskrivelse per mal. Alle malene er
startpunkter: etter innsetting redigerer du blokkene fritt som ellers,
og fargene følger temaet ditt.

- **Grunnleggende**: tom seksjon, hero (venstrestilt eller sentrert med
  to knapper), bilder, kontakt og enkel footer-seksjon.
- **Kort og lister**: funksjonskort med ikoner, nyhetskort, arrangementer
  med datobrikker og påmeldingsknapp, team/styret, FAQ, steg-for-steg,
  hovedoppslag (én stor sak + to små) og produkter/merch (pek
  «Kjøp»-knappen på en betalingslenke, for eksempel Vipps, i Egenskaper).
- **Fremheving**: CTA-banner («Bli medlem»), sitat, statistikk-tall,
  sponsorrad i gråtone og medlemskap med prisnivåer.

Verktøylinjen oppe til høyre i en seksjon (vises når du peker på den):

- **+ kort / + rad / + person …**: seksjoner laget fra maler med
  gjentakende elementer (funksjonskort, nyheter, arrangementer, team,
  FAQ, steg, produkter, statistikk, sponsorer, bilder) har en egen
  pluss-knapp som legger til ett element til, ferdig plassert i neste
  ledige rute. Seksjonen vokser ved behov, og Ctrl+Z angrer hele
  elementet under ett.
- ↑ / ↓ flytt seksjonen opp eller ned på siden
- ⤓ tilpass høyden til innholdet
- × slett seksjonen

Du kan også dra i seksjonens nederkant for å justere høyden fritt, eller
dra rett i «+ Ny seksjon»-knappen på grensen mellom to seksjoner (klikk
åpner fortsatt menyen; dra flytter grensen). Blokker kan bevisst henge
utover seksjonskanten; ingenting klippes.

## Grid (hjelpelinjer)

**Grid**-panelet styrer rutenettet blokker snapper til når du drar dem.
Gridet vises i forhåndsvisningen så lenge panelet er åpent.

- **Rutestørrelse**: hvor tett rutenettet er.
- **Snap til grid**: skru av for å plassere helt fritt. Hold Shift mens du
  drar for å overstyre snap midlertidig.
- En seksjon kan få sitt eget grid, uavhengig av resten av siden.

Gridet er kun et hjelpemiddel ved redigering: å endre det flytter aldri
noe innhold, og besøkende ser det aldri.

## Mobil

Besøkende på mobil får automatisk innholdet i én kolonne, i naturlig
leserekkefølge. Du trenger vanligvis ikke gjøre noe.

- **Telefonikonet i topplinjen** viser siden slik den blir på mobil.
- Vil du finjustere, dra i blokkene i mobilvisningen: seksjonen går da over
  til **manuell mobil-layout**, der du plasserer alt selv. ↺ på seksjonen
  tar den tilbake til automatikken.
- **Mobil-tilsyn**: endrer du noe på desktop i en seksjon som er
  håndjustert for mobil, markeres seksjonen gult og topplinjen sier ifra
  («1 seksjon trenger mobil-tilsyn»). Det betyr bare: ta en titt i
  mobilvisningen og se at alt fortsatt ser bra ut, og kvitter med ✓.

## Sider, meny og tema

- **Sider**-panelet: opprett en ny side (skriv navnet og trykk Enter),
  gi sider nytt navn eller ny adresse, eller slett dem med ×. Forsiden
  kan ikke slettes eller flyttes. Nye sider legges automatisk i menyen
  og blir synlige for besøkende først når du publiserer.
- **Nav**-panelet: menyen øverst på siden. Endre tekst, velg hvilken side
  (eller ekstern adresse) hvert punkt går til, flytt med ↑/↓, fjern med ×.
  Logoen kan være tekst, et opplastet bilde eller begge deler (med
  størrelse og rekkefølge), og fungerer alltid som «Hjem»-knapp.
  Menypunktene kan stå til høyre, midtstilt eller til venstre.
  Under Utseende styrer du menyens bakgrunnsfarge og dekkevne (0 =
  gjennomsiktig meny over hero-en), tekstfarge og «Klistret meny»
  (om menyen følger med når besøkende blar nedover).
- **Nettstedsikon**: nederst i Tema-panelet laster du opp ikonet som
  vises i nettleserfanen og bokmerker (firkantet bilde anbefales).
- **Samlinger**-panelet: lister av innslag (nyheter, oppslag, publikasjoner)
  som bor som data og vises av Samling-blokker. Opprett en samling, skriv
  innslag (tittel, dato, tekst, bilde, lenke), og legg en Samling-blokk på
  siden (eller bruk seksjonsmalene «Nyheter (samling)», «Oppslagstavle» og
  «Publikasjonsarkiv»). Å legge til en nyhet er da å SKRIVE et innslag -
  alle visningene følger med automatisk. Blokkens Egenskaper velger
  samling, visning (kort/liste/arkiv per år), antall og sortering.
- **Plugins**-panelet: utvidelser som gir Urd nye blokker og seksjonsmaler.
  Panelet viser pluginene i repoets plugins/-mappe; skru av og på med
  bryteren, og publiser som vanlig. Aktive plugins virker umiddelbart i
  forhåndsvisningen (besøkende får dem etter publisering), og pluginens
  blokker dukker opp i «+ Ny blokk»-menyen i seksjonene.

  Kalender-pluginen følger med: legg inn en Kalender-blokk (eller
  seksjonsmalen «Hva skjer»), klikk «⚙ Kilder» på blokken og lim inn
  kalenderens iCal-adresse eller Google-kalender-id. Velg visning (liste,
  kort, månedskalender eller «neste arrangement») og antall. Titler på
  formen «Kategori: Tittel» gir filtrerbare kategori-chips, en
  påmeldingslenke i beskrivelsen blir en «Meld deg på»-knapp, og
  «Abonner»-knappen lar besøkende følge kalenderen i sin egen app.
- **Footer**-panelet: bunnteksten som vises nederst på alle sider.
  Skru den på, skriv linjene (én per linje) og velg justering - den
  redigeres ett sted og gjelder hele nettstedet.
- **Tema**-panelet: fargene og fontene hele siden bygger på. Endrer du
  aksentfargen, følger knapper, lenker og markeringer med overalt.

## Utkast og publisering

- Alt du gjør lagres som utkast i din nettleser, også på tvers av sider.
  «Upubliserte endringer» i topplinjen viser at du har noe upublisert.
- **Publiser** legger alle utkastene ut på siden. Det tar omtrent ett
  minutt før endringene er synlige for besøkende.
- **Forkast utkast** sletter utkastene og tar deg tilbake til slik siden
  er publisert. Knappen spør «Sikker?» (rød) før den gjør det; klikk en
  gang til for å forkaste, eller hvor som helst ellers for å avbryte.
- **Se siden ↗** åpner den publiserte siden i ny fane.

Publisering krever at GitHub-brukeren din har fått tilgang av
sideeieren (se [OPPSETT-PUBLISERING.md](OPPSETT-PUBLISERING.md)).

Er dere flere som redigerer, sier editoren ifra hvis noen andre har
publisert endringer i de samme delene siden du lastet siden, og lar deg
velge om du vil publisere likevel eller se på endringene først.

## Historikk og angring av publisering

**Historikk**-panelet viser de siste publiseringene: hva som ble endret,
av hvem og når. «↩ Angre siste publisering» ruller siden tilbake til slik
den var før forrige publisering. Angringen er selv en publisering, så
ingenting slettes fra historikken, og du kan angre angringen. Etter en
angring laster du admin på nytt (etter ~1 minutt) før du redigerer
videre, editoren sier ifra.

(Ctrl+Z angrer utkast i nettleseren FØR du publiserer; Historikk-panelet
angrer det som allerede er publisert.)

## Første gang

Åpner du admin på en helt fersk side, får du en kort veiviser: sidens
navn og to farger. Alt den setter kan endres senere i Tema- og
Nav-panelene.
