# Brukarrettleiing

[Sámegiella](GUIDE-se.md) · [🇬🇧 English](GUIDE-en-GB.md) · [🇳🇴 Bokmål](../../BRUKERVEILEDNING.md) · **🇳🇴 Nynorsk** · [🇹🇷 Türkçe](GUIDE-tr.md)

Omsetjing av BRUKERVEILEDNING.md. Norsk (bokmål) er kanonisk og gjeld ved avvik. Knappe- og panelnamna under er dei nynorske admin-tekstane; står adminen på eit anna språk, følgjer namna det språket.

For deg som eig eller redigerer ei side bygd med Urd. Ingen kode, ingen
git-kunnskap nødvendig: alt skjer i nettlesaren på di eiga side.

> Urd er under utvikling. Rettleiinga dekkjer det som finst i dag og
> blir utvida etter kvart; ei full opprydding er planlagd mot v0.9.

## Kom i gang

1. Gå til `/admin` på sida di (til dømes `disida.pages.dev/admin`).
2. Logg inn med GitHub-kontoen din (knappen **Logg inn med GitHub** oppe til høgre). Du kan sjå og
   prøve editoren utan innlogging, men ikkje publisere.
3. Alt du endrar blir lagra som **utkast** i nettlesaren din med ein gong.
   Ingenting blir synleg for besøkjande før du trykkjer **Publiser**.

## Editoren

Skjermen har tre delar:

- **Topplinja**: vel side, byt mellom desktop- og mobilvising (skjerm- og telefonikona), og publiser.
- **Panelveljaren til venstre**, gruppert etter arbeidsflyt: Sider,
  Blokker, Eigenskapar og Grid (byggje sida), Tema, Nav og Footer
  (nettstaden), og Historikk. Klikk for å opne eit panel; klikk igjen
  for å lukke.
- **Admin-tema**: nedtrekket ved sida av Urd-logoen byter editoren sitt
  eige fargetema (sju variantar). Det påverkar aldri nettsida di.
- **Førehandsvisinga**: den ekte sida di. Det du ser er det besøkjande får.

**Rein vising** (oppe til høgre) skjuler alle verktøya så du ser sida
heilt utan editor-rammer. Klikk **Rediger**-knappen for å kome tilbake.

## Redigere innhald

- **Skrive tekst**: klikk i ei tekstblokk og skriv rett inn i sida.
- **Flytte ei blokk**: ta tak i ho og dra. Blokka snappar til
  hjelpelinjene (sjå Grid under).
- **Endre storleik**: dra i handtaket i hjørnet av blokka.
- **Verktøylinja over vald blokk**:
  - ⠿ flytt (dra)
  - lag-pilene (pil mot strek, opp/ned) legg blokka heilt framfor eller bakarst (når blokker overlappar).
    NB: medan du redigerer blir blokka du peikar på eller har markert
    alltid vist øvst, så handtaka kan nåast - den EKTE rekkjefølgja ser du
    i Rein vising og på den publiserte sida
  - telefonikonet: mobil-synlegheit (pynt), sjå under
  - × slett blokka
- **Rotere**: dra i den vesle ⟳-sirkelen i det øvre høgre hjørnet av blokka
  (snappar til 15°-steg; hald Shift for fri vinkel). Nøyaktig gradtal
  kan òg setjast i Eigenskapar.
- **Tastatur på markert blokk**: piltastane flyttar eitt grid-steg
  (Shift = 1 px), Delete slettar, Esc avmarkerer, Ctrl+D dupliserer.
- **Snappelinjer**: når du dreg ei blokk nær kanten eller midten av ei
  anna blokk, blir ei linje vist og blokka snappar på plass (hald Shift
  for heilt fri plassering).
- **Angre**: Ctrl+Z (og Ctrl+Shift+Z for å gjenta) verkar på alt: flytting,
  storleik, tekst, sletting, seksjonar og grid.

### Leggje til blokker

Opne **Blokker**-panelet og klikk blokka du vil ha; ho blir lagd midt i
synsfeltet, i seksjonen du sist klikka i. Typane:

- **Tekst**: vanleg tekst rett på sida.
- **Tekstboks**: tekst i eit kort med bakgrunnsfarge og avrunda hjørne,
  fint til hjelpetekstar og informasjonsboksar.
- **Knapp**: lenkje til ei anna side eller ekstern adresse.
- **Bilete**: last opp frå maskina. Biletet blir komprimert automatisk.
- **Video**: lim inn ei YouTube- eller Vimeo-lenkje i Eigenskapar.
  Innbyggjinga er personvennleg, og videoen blir spela på den publiserte
  sida (i editoren markerer klikket berre blokka).
- **Samling**: viser innslaga frå ei samling (sjå Samlingar-panelet)
  som kort, liste eller år-gruppert arkiv.
- **Ikon**: eit teikn eller ein emoji i valfri storleik og temafarge.
  I Eigenskapar opnar teiknknappen ein meny med hundrevis av teikn og
  emojiar (med dei nyleg brukte øvst), og nedst i menyen kan du
  laste opp eit eige ikon-bilete som blir vist i staden for teiknet.
- **Former**: strek, pil, sirkel, rektangel og trekant til dekorasjon.

I editoren blir lenkjer og knappar aldri utløyste når du klikkar på dei -
klikket markerer blokka. Test lenkjene via **Sjå sida ↗**.

### Kva tyder telefonikonet (pynt)?

Knappen viser om blokka blir med til mobil. På mobil blir innhaldet stabla
automatisk i éin kolonne, og der blir pynt hoppa over: ein skrå strek eller pil
som ligg fint bak teksten på desktop blir berre rot midt i ein mobilkolonne.

- Telefon = blokka er innhald og blir vist på mobil.
- Overstrøken telefon (gul knapp) = blokka er pynt (dekor) og blir skjult i
  automatisk mobil-layout.

Klikk for å byte. Nye former og ikon frå Blokker-panelet startar
som pynt (ikon frå seksjonsmalane er innhald og blir viste på mobil). (Har du handjustert
mobil-layouten i seksjonen, plasserer du uansett alt sjølv; da tyder
flagget ingenting der.)

## Eigenskapar-panelet

Klikk på ei blokk og opne **Eigenskapar** for å finjustere ho med tal og
val i staden for dra-og-slepp:

- Alle blokker: nøyaktig posisjon og storleik, lag (kva som ligg
  framfor), rotasjon og mobil-synlegheit (pynt).
- Tekst: justering og tekstboks av/på. Knapp: tekst, kvar han går og stil.
  Bilete: byt bilete, beskriving, tilskjering, avrunding og lenkje.
  Form: type, farge frå temaet, tjukkleik og fylt/kantlinje.
- Klikkar du i ein seksjon (utan blokk vald) viser panelet minstehøgda,
  eige grid, bakgrunn og animasjon til seksjonen.

**Fargar**: fargeveljarane viser temafargane dine som prikkar - vel du
ein av dei, blir feltet KOPLA til temaet og følgjer med når du endrar paletten
i Tema-panelet (kopla felt blir viste med ring). Vel du fritt i flata
eller skriv ein hex- eller RGB-verdi, er fargen frikopla, og du kan
gjere han gjennomsiktig med glidaren under kulørane. Dei siste frie
fargane dine ligg under **Nylege**, og med plussknappen ved **Lagra**
byggjer du din eigen faste palett (opptil 12; × på ein prikk fjernar han).

**Bilete**: i Eigenskapar kan du setje fokuspunkt (kva del av biletet
som blir halde på når det blir skore til) og justere lysstyrke, kontrast og
metting - utan at sjølve biletfila blir endra.

**Nettstadikon**: i Tema-panelet lastar du opp eit bilete og redigerer det
i ikon-editoren: dra biletet for å velje utsnitt, zoom, juster
lysstyrke/kontrast/metting eller gråtone, og **Bruk** lagar eit kvadratisk
128px-ikon som blir vist i nettlesarfana. Blyantknappen opnar editoren på
nytt; kryssknappen fjernar ikonet (da blir Urd-merket brukt).

**Bakgrunnar**: bakgrunnen til ein seksjon er bygd av lag som kan stablast:
farge, gradient (kan animerast), glød, bilete og korn. Legg til, fjern og
sorter lag i Eigenskapar til seksjonen; kvart lag har sine eigne kontrollar.

**Animasjonar**: blokker og seksjonar kan gli eller tone inn når
besøkjande scrollar til dei (og «løft ved peikar» for hover-effekt).
Blir valt i Eigenskapar. Førehandsvisinga i editoren viser slutt-tilstanden;
sjølve animasjonen blir spela på den publiserte sida. Besøkjande som har
skrudd av animasjonar i systemet sitt (redusert rørsle) får innhaldet
utan animasjon.

**Formatere tekst**: klikk i ei tekstblokk (eller i tittel/tekst i eit
samlingsinnslag), så dukkar verktøylinja opp ved markeringa: tekstnivå,
feit, kursiv, understrek, gjennomstreking, fargar og utheving samla bak
palettikonet (temafargar, eigen farge med full fargeveljar og pipette,
uthev med aksent eller eigen farge, og fjern utheving: A-en med raud strek
over), lenkje (eige felt i linja), justering, lister, sitat og fjern
formatering. Font og grunnstorleik for heile feltet blir sett i Eigenskapar.
Linja blir lukka ved klikk kvar som helst utanfor feltet.

**Hjelpechipen «?»**: blokker med spesialfunksjonar (som Samling og
Kalender) viser ein «?» øvst i venstre hjørne når du peikar på dei.
Klikk han for eit hjelpekort som forklarar alle funksjonane; kortet blir
ståande til du klikkar ein annan stad.

**Redigere bilete**: dobbeltklikk eit bilete i ei biletblokk (eller klikk
eit samlingsbilete) for bileteditoren: byt/fjern bilete, dra fokuspunktet
for å styre utsnittet, zoom inn mot fokuspunktet for å skjere til,
vel form på ramma (brei, kvadrat, portrett eller rund), juster
lysstyrke/kontrast/metting (med gråtone-snarval og nullstilling),
tilpassing, avrunding, beskriving (blir lesen av skjermlesarar og vist når
biletet ikkje kan lastast) og lenkje. Medan editoren er open ligg eit svakt
tredelingsgitter over biletet (som i kamera), så du ser midten og
tredjedelane medan du komponerer. Alt er ikkje-destruktivt:
originalbiletet blir aldri rørt.

## Seksjonar

Sida er bygd av seksjonar oppå kvarandre. Peik på grensa mellom to
seksjonar for å få **+ Ny seksjon**: han opnar eit galleri av ferdige
seksjonsmalar, grupperte med ei kort beskriving per mal. Alle malane er
startpunkt: etter innsetjing redigerer du blokkene fritt som elles,
og fargane følgjer temaet ditt.

- **Grunnleggjande**: tom seksjon, hero (venstrestilt eller sentrert med
  to knappar), bilete, kontakt og enkel footer-seksjon.
- **Kort og lister**: funksjonskort med ikon, nyheitskort, arrangement
  med datobrikker og påmeldingsknapp, team/styret, FAQ, steg-for-steg,
  hovudoppslag (éi stor sak + to små) og produkt/merch (peik
  **Kjøp**-knappen på ei betalingslenkje, til dømes Vipps, i Eigenskapar).
- **Framheving**: CTA-banner («Bli medlem»), sitat, statistikk-tal,
  sponsorrad i gråtone og medlemskap med prisnivå.

Verktøylinja oppe til høgre i ein seksjon (blir vist når du peikar på han):

- **+ kort / + rad / + person …**: seksjonar laga frå malar med
  gjentakande element (funksjonskort, nyheiter, arrangement, team,
  FAQ, steg, produkt, statistikk, sponsorar, bilete) har ein eigen
  pluss-knapp som legg til eitt element til, ferdig plassert i neste
  ledige rute. Seksjonen veks ved behov, og Ctrl+Z angrar heile
  elementet under eitt.
- ↑ / ↓ flytt seksjonen opp eller ned på sida
- ⤓ tilpass høgda til innhaldet
- × slett seksjonen

Du kan òg dra i nederkanten av seksjonen for å justere høgda fritt, eller
dra rett i **+ Ny seksjon**-knappen på grensa mellom to seksjonar (klikk
opnar framleis menyen; dra flyttar grensa). Blokker kan medvite henge
utover seksjonskanten; ingenting blir klipt.

## Grid (hjelpelinjer)

**Grid**-panelet styrer rutenettet blokker snappar til når du dreg dei.
Gridet blir vist i førehandsvisinga så lenge panelet er ope.

- **Rutestorleik**: kor tett rutenettet er.
- **Snapp til grid**: skru av for å plassere heilt fritt. Hald Shift medan du
  dreg for å overstyre snappinga mellombels.
- Ein seksjon kan få sitt eige grid, uavhengig av resten av sida.

Gridet er berre eit hjelpemiddel ved redigering: å endre det flyttar aldri
noko innhald, og besøkjande ser det aldri.

## Mobil

Besøkjande på mobil får automatisk innhaldet i éin kolonne, i naturleg
lesarrekkjefølgje. Du treng vanlegvis ikkje gjere noko.

- **Telefonikonet i topplinja** viser sida slik ho blir på mobil.
- Vil du finjustere, dra i blokkene i mobilvisinga: seksjonen går da over
  til **manuell mobil-layout**, der du plasserer alt sjølv. ↺ på seksjonen
  tek han tilbake til automatikken.
- **Mobil-tilsyn**: endrar du noko på desktop i ein seksjon som er
  handjustert for mobil, blir seksjonen markert gul og topplinja seier ifrå
  («1 seksjon treng mobil-tilsyn»). Det tyder berre: ta ein kikk i
  mobilvisinga og sjå at alt framleis ser bra ut, og kvitter med ✓.

## Sider, meny og tema

- **Sider**-panelet: opprett ei ny side (skriv namnet og trykk Enter),
  gi sider nytt namn eller ny adresse, eller slett dei med ×. Framsida
  kan ikkje slettast eller flyttast. Nye sider blir automatisk lagde i menyen
  og blir synlege for besøkjande først når du publiserer.
- **Nav**-panelet: menyen øvst på sida. Endre tekst, vel kva side
  (eller ekstern adresse) kvart punkt går til, flytt med ↑/↓, fjern med ×.
  Logoen kan vere tekst, eit opplasta bilete eller begge delar (med
  storleik og rekkjefølgje), og fungerer alltid som «Heim»-knapp.
  Menypunkta kan stå til høgre, midtstilte eller til venstre.
  Under Utsjånad styrer du bakgrunnsfargen og dekkevna til menyen (0 =
  gjennomsiktig meny over hero-en), tekstfarge og «Klistrete meny»
  (om menyen følgjer med når besøkjande blar nedover).
- **Nettstadikon**: nedst i Tema-panelet lastar du opp ikonet som
  blir vist i nettlesarfana og bokmerke (firkanta bilete er tilrådd).
- **Samlingar**-panelet: lister av innslag (nyheiter, oppslag, publikasjonar)
  som bur som data og blir viste av Samling-blokker. Opprett ei samling, skriv
  innslag (tittel, dato, tekst, bilete, lenkje), og legg ei Samling-blokk på
  sida (eller bruk seksjonsmalane «Nyheiter (samling)», «Oppslagstavle» og
  «Publikasjonsarkiv»). Å leggje til ei nyheit er da å SKRIVE eit innslag -
  alle visingane følgjer med automatisk. Eigenskapane til blokka vel
  samling, vising (kort/liste/arkiv per år), tal og sortering.
- **Plugins**-panelet: utvidingar som gir Urd nye blokker og seksjonsmalar.
  Panelet viser pluginane i plugins/-mappa til repoet; skru av og på med
  brytaren, og publiser som vanleg. Aktive plugins verkar umiddelbart i
  førehandsvisinga (besøkjande får dei etter publisering), og blokkene til
  pluginen dukkar opp i **+ Ny blokk**-menyen i seksjonane.

  Kalender-pluginen følgjer med: legg inn ei Kalender-blokk (eller
  seksjonsmalen «Kva skjer»), klikk «⚙ Kjelder» på blokka og lim inn
  iCal-adressa eller Google-kalender-id-en til kalenderen. Vel vising (Liste,
  Kort, Månad eller «Neste») og tal. Titlar på
  forma «Kategori: Tittel» gir filtrerbare kategori-chips, ei
  påmeldingslenkje i beskrivinga blir ein **Meld deg på**-knapp, og
  **Abonner**-knappen lèt besøkjande følgje kalenderen i sin eigen app.

  Skjema-pluginen gir ei Skjema-blokk (og «Kontaktskjema»-mal): klikk
  «⚙ Skjema» for å stille inn mottakar, felt og sendemåte. Standard er at
  skjemaet opnar e-postklienten til den besøkjande med ein ferdig e-post (ingen
  oppsett). Vil du heller sende til eit eige endepunkt (Apps Script eller
  ein eigen funksjon), vel «Eksternt endepunkt» og lim inn adressa; da må
  du opne connect-src for den verten i _headers (blokka forklarar
  linja). Felta kan leggjast til, endrast og fjernast.

  Kart-pluginen gir ei Kart-blokk (og «Finn oss»-mal): klikk «⚙ Stad» og
  skriv ei adresse (t.d. «Storgata 1, Oslo»), koordinatar (som
  «59.913, 10.739») eller lim inn ei OpenStreetMap-lenkje, og still zoom og
  høgd. Adressesøket slår opp staden via OpenStreetMap når du klikkar
  **Bruk**. Kartet er OpenStreetMaps eiga innbygging utan sporing, og Urds
  standard _headers tillèt det, så det verkar ut av boksen. (På ein annan
  host må «frame-src https://www.openstreetmap.org» liggje i _headers;
  blokka seier frå dersom kartet er blokkert.)
- **Footer**-panelet: bunnteksten som blir vist nedst på alle sider.
  Skru han på, skriv linjene (éi per linje) og vel justering - han
  blir redigert éin stad og gjeld heile nettstaden.
- **Tema**-panelet: fargane og fontane heile sida byggjer på. Endrar du
  aksentfargen, følgjer knappar, lenkjer og markeringar med overalt.

## Utkast og publisering

- Alt du gjer blir lagra som utkast i nettlesaren din, òg på tvers av sider.
  «Upubliserte endringar» i topplinja viser at du har noko upublisert.
- **Publiser** legg alle utkasta ut på sida. Det tek omtrent eitt
  minutt før endringane er synlege for besøkjande.
- **Forkast utkast** slettar utkasta og tek deg tilbake til slik sida
  er publisert. Knappen spør «Sikker?» (raud) før han gjer det; klikk ein
  gong til for å forkaste, eller kvar som helst elles for å avbryte.
- **Sjå sida ↗** opnar den publiserte sida i ny fane.

Publisering krev at GitHub-brukaren din har fått tilgang av
sideeigaren (sjå [OPPSETT-PUBLISERING.md](../setup-publication/SETUP-nn.md)).

Er de fleire som redigerer, seier editoren ifrå dersom nokon andre har
publisert endringar i dei same delane sidan du lasta sida, og lèt deg
velje om du vil publisere likevel eller sjå på endringane først.

## Historikk og angring av publisering

**Historikk**-panelet viser dei siste publiseringane: kva som blei endra,
av kven og når. **↩ Angre siste publisering** rullar sida tilbake til slik
ho var før førre publisering. Angringa er sjølv ei publisering, så
ingenting blir sletta frå historikken, og du kan angre angringa. Etter ei
angring lastar du admin på nytt (etter ~1 minutt) før du redigerer
vidare, editoren seier ifrå.

(Ctrl+Z angrar utkast i nettlesaren FØR du publiserer; Historikk-panelet
angrar det som allereie er publisert.)

## Første gong

Opnar du admin på ei heilt fersk side, får du ein kort vegvisar: namnet på
sida og to fargar. Alt han set kan endrast seinare i Tema- og
Nav-panela.
