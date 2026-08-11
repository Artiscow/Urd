# Testrunder (sjekkliste for manuell testing)

Nytt som er levert og venter på manuell testing i produksjon/lokalt. **Punkter strykes kun av den som tester**; assistenten legger til nye punkter når noe leveres, men fjerner aldri noe her. Nye leveranser får en egen «Testrunde-batch»-seksjon øverst (nyeste først); punkter uten batch ligger i restlisten nederst. [BACKLOG.md](BACKLOG.md) eier oppgavene; denne listen eier testingen av det som alt er levert. Om noe er fjernet betyr det at det er sjekket og løst eller oppført som en kjent bug.

### Testrunde-batch (0.7.2): Breddegrepet, bundet innholdsbredde

Layouten er lagt om, så denne batchen er bredere enn vanlig. Det viktigste er de to første punktene: ser presetene riktige ut, og virker lerretet fortsatt som før.

- [ ] VISUELT, det eneste ingen test kan avgjøre: sett inn ALLE 24 seksjonspresetene på en tom side og se over hver enkelt ved 1440 px. Se særlig etter tekst som ligger for trangt, kort som er blitt smalere enn innholdet, og elementer som var ment å gå kant til kant
- [ ] De fem startpakkene (Ny side-galleriet) ser riktige ut; de komponerer de samme presetene, så feil her skal være arvet ovenfra
- [ ] De fire demosidene (Hjem, Om oss, Kaker, Kontakt) ser riktige ut i Ren visning på en bred skjerm: innholdet står i en sentrert kolonne, mens seksjonsbakgrunnene fortsatt går HELT ut til kantene
- [ ] Lerretet: dra en blokk, endre størrelse fra nedre høyre hjørne, flytt med piltaster (også med Shift), dra et flerutvalg, og dra i seksjonens topp- og bunnkant. Alt skal treffe der pekeren er, uten forskyvning mot venstre eller høyre
- [ ] Marquee (dra et utvalgsrektangel i tom seksjonsflate): rektangelet følger pekeren, og blokkene det dekker blir markert (ikke naboene ved siden av)
- [ ] Rutenettet (Vis grid) og de smarte hjelpelinjene ligger på innholdsflaten, ikke forskjøvet ut i margen; midtlinja treffer midten av innholdet
- [ ] Fest ved scrolling: en festet blokk beholder sin bredde og venstrekant i det den fester seg (skal IKKE hoppe mot venstre skjermkant). Test både vanlig festing, gruppefesting og «Til skjermen»-dokking
- [ ] Folden: lag en seksjon med minstehøyde `85vh` og en seksjon under. Seksjonen under skal IKKE være synlig før du scroller, og det skal stemme med hva en ekte nettleser viser ved 1488 px bredde
- [x] Sett `"maxWidth": "full"` på én seksjon i en sidefil (håndredigert) og se at kun den seksjonen går kant til kant
- [ ] Tekstblokker: åpne en side med mye tekst i en smal blokk og se at rammen vokser av seg selv ved rendring, ikke bare når du skriver. Rammen skal ALDRI krympe av seg selv
- [ ] Mobilvisning er uendret: auto-stabling ser ut som før, og en seksjon satt til manuell mobil-layout beholder plasseringene sine
- [ ] Publiser og sjekk den deployede siden: samme utseende som i Ren visning, og `site.json` har fått `schemaVersion: 2` med `layout`-feltet

### Testrunde-batch (0.7.2.5): Topplinja folder seg, og bekreftelsen flyttet ut av knappen

Forkast-knappen oppfører seg annerledes enn i 0.7.2.4-batchen under: den vokser ikke lenger når den væpnes, og andre klikk skjer på en egen pille. De tre punktene om væpning og andre klikk der er erstattet av punktene her.

- [ ] TOPPLINJA HOLDER ÉN HØYDE: dra admin-vinduet sakte fra bredt til smalt og se at linja aldri brytes til to rader. Merk at nettleserzoom teller: på 125 % er et 1920 px vindu 1536 px for foldingen
- [ ] Trinnene kommer i denne rekkefølgen når vinduet smalner: «Forkast utkast» mister teksten og blir sirkelen, ENHET/ZOOM/VIS forsvinner, «Ren visning» og «Se siden» blir rene ikoner og GitHub-brukeren viker, Vis-klyngen blir meny, Enhet-klyngen blir meny og «Upublisert» blir «!», Zoom-klyngen blir meny
- [ ] Ingenting overlapper på noen bredde. Sjekk særlig at «!» og forkast-sirkelen ikke legger seg oppå verktøyknappene, og at «Publiser» aldri havner utenfor vinduskanten
- [ ] En foldet klynge viser sin egen verdi på knappen: enhetsikonet for valgt enhet, zoom-prosenten som tall, og rutenett-ikonet markert når rutenett eller hjelpelinjer står på
- [ ] Menyene åpnes og lukkes med klikk utenfor og med Escape. Zoom-menyen skal bli stående åpen mens du klikker minus og pluss flere ganger
- [ ] Zoom-knappen endrer ikke bredde når tallet går fra to til tre sifre (20 % til 100 %), så naboknappene står stille
- [ ] Gjør vinduet bredt igjen og se at klyngene folder seg ut i motsatt rekkefølge, og at en åpen meny ikke blir hengende
- [ ] FORKAST, FØRSTE KLIKK: knappen skifter til fylt rød, men endrer IKKE bredde. En pille med «Sikker?» dukker opp rett under topplinja, sentrert under knappen, med frostet bakgrunn
- [ ] FORKAST, ANDRE KLIKK: ett klikk på «Sikker?»-pilla skal forkaste. Den skal ALDRI kreve to klikk
- [ ] «Sikker?»-pilla er dempet med rød kant og rød tekst i hvile, og blir tydelig fylt rød med hvit tekst når pekeren er over den
- [ ] Den runde forkast-knappen skal også skifte farge under pekeren, både i hvile og når den er væpnet
- [ ] Klikk et annet sted eller trykk Escape mens pilla er framme: den skal forsvinne uten å forkaste noe. Test begge
- [ ] Gjør vinduet så smalt det går og gjenta hele forkast-flyten: pilla skal fortsatt være synlig og klikkbar, og «Publiser» skal stå i ro
- [ ] «Se siden» har fått et pil-ut-av-ramme-ikon og teksten er uten ↗-tegnet. Sjekk at knappen ikke blir tom når den folder til rent ikon
- [ ] Bytt admin-språk til engelsk og tyrkisk og sjekk menyradene i de tre foldede klyngene, samt at foldingen skjer tidsnok på tyrkisk (som har de lengste tekstene)

### Testrunde-batch (0.7.2.4): Opprydding i topplinja og sideskinnen

- [ ] Urd-merket er borte fra topplinja og står nederst i sideskinnen, til venstre for tannhjulet, med en skillelinje over
- [ ] Verktøyene står i tre merkede klynger: ENHET (fire enheter), ZOOM (minus, prosent, pluss, tilpass) og VIS (rutenett, hjelpelinjer). Hver klynge har en lett ramme, og knappene inni har ikke lenger egen kant
- [ ] Aktiv knapp inne i en klynge markeres fortsatt tydelig (valgt enhet, Tilpass, rutenett på)
- [ ] «Publiser» klistrer seg ikke lenger til vinduskanten
- [ ] Utkast-statusen er en dempet gul pille med kant, ikke en fylt aksentflate. «Publiser» skal være den ENESTE fylte knappen i hele topplinja
- [ ] Forkast er en liten rød sirkel med gjenopprett-ikon (pil med urviser). Hjelpeteksten forklarer hva den gjør
- [ ] FØRSTE KLIKK VÆPNER: sirkelen blir fylt rød og utvider seg til «Sikker?». Knappene til høyre (Ren visning, Se siden, Publiser) skal IKKE flytte seg når den vokser
- [ ] Andre klikk forkaster. Klikk et annet sted, eller Escape, avvæpner uten å forkaste. Test begge; avvæpningen var koblet til den gamle knappeklassen og måtte rettes
- [ ] Sideskinnen har versal-etikettene DENNE SIDEN, NETTSTEDET og SYSTEM over hver gruppe, og de gamle skillestrekene er borte
- [ ] Skinnen er strammet til: smalere (9,5rem), monospace, mindre skrift og ingen mellomrom mellom punktene. Med tolv punkter skal den ikke lenger fylle nesten hele lerretshøyden
- [ ] Aktivt panel markeres med farget tekst og en strek i venstrekanten, ikke lenger med en fylt pille. Sjekk at det er tydelig hvilket panel som er åpent
- [ ] Utkast-pilla er like stor som knappene rundt seg, ikke halvparten. Teksten er kortet til «Upublisert»
- [ ] Bytt admin-språk til engelsk og tyrkisk og sjekk alle seks nye etikettene

### Testrunde-batch (0.7.2.3): Rutenett, hjelpelinjer og størrelsen på redigeringshåndtakene

- [ ] HÅNDTAKENE ER STORE FRA START: last admin på nytt og se at «+ Ny seksjon», «+ Ny blokk», seksjonsverktøylinja og blokkhåndtakene har admin-størrelse MED EN GANG, uten at du først må røre zoomen. Dette var feilen: zoomen ble ikke meldt inn ved lasting
- [ ] Seksjonsgalleriet («+ Ny seksjon» klikket) er nå i admin-størrelse og ikke krympet med lerretet. Sjekk på 50 % og 150 %
- [ ] Drastrimlene i seksjonens topp- og bunnkant er like lette å treffe uansett zoom
- [ ] OMRISSET LIGGER PÅ RUTENE: slå på rutenettet, dra en blokk så den snapper, og se at den blå rammen rundt blokken følger rutelinjene. Den lå før 2 px utenfor og kunne derfor aldri treffe
- [ ] Rutenettets linjer er skarpe og synlige på alle zoomnivåer, ikke bleke og uskarpe. Selve rutestørrelsen skal fortsatt følge zoomen, altså bli mindre når du zoomer ut
- [ ] Hjelpelinjene er tydeligere enn før og synlige mot både lyse og mørke seksjoner
- [ ] NY BRYTER FOR RUTENETTET i verktøylinja ved siden av hjelpelinje-knappen. Rutenettet skal nå kunne stå på uten at Grid-panelet er åpent, valget skal huskes ved omlasting, og det skal ikke slås av når du bytter panel eller setter inn en ny seksjon
- [ ] Bytt admin-språk til engelsk og tyrkisk og sjekk hjelpeteksten på den nye rutenett-knappen
- [ ] De to knappene har nå ULIKE ikoner: rutenett er et nett, hjelpelinjer er en boks med krysset stiplet innretting. De var før nesten identiske
- [ ] Hjelpelinjene er magenta og tydelig synlige mot alle seksjonsfarger. Fargen er bevisst fast og følger ikke admin-temaet, så den skiller seg fra rutenettet
- [ ] «+ Ny blokk» og seksjonens verktøylinje overlapper ikke lenger i øvre høyre hjørne. Sjekk på 50 %, 74 % og 150 % zoom, siden det var avstanden som ikke skalerte med

### Testrunde-batch (0.7.2.2): Innholdsbredde-innstillingen og enhetsbryteren

Standarden ble korrigert fra 1200 til 1440 etter ny research, sidemargen byttet fra piksler til prosent av vindusbredden, og de to punktene om lerretsmodus i 0.7.2-batchen over er erstattet av enhetsbryteren her. Letterboksen er fjernet igjen: siden skal vises slik den faktisk vises.

- [ ] Nettsted-panelet: Innholdsbredde har en levende prøve med tre striper (1920, 1536, 1366). Endre bredden og se at stripene og margtallene følger med med én gang
- [ ] Prøven forteller sannheten: ved 1440 skal 1920 og 1536 vise en tydelig stripe med marg, mens 1366 vises DEMPET (bredden binder ikke der). Ved 1600 skal 1536 bli dempet
- [ ] Hurtigvalgene Kompakt, Standard, Bred og Full markerer riktig knapp, og Standard er valgt fra start på et nytt nettsted
- [ ] Skyveknappen for bredde går 960 til 1920 i trinn på 20, og forsvinner når Full er valgt (den har ingen effekt der)
- [ ] Sidemargen vises som fire trinn (Ingen, Liten, Middels, Stor) med Middels valgt fra start; Ingen gir innhold helt ut til kanten på smale skjermer
- [ ] Under Avansert ligger det rå vw-tallet med skyveknapp 0 til 12. Hjelpeteksten forklarer hva vw betyr med konkrete tall
- [ ] Marg-kolonnen viser tall der bredden binder og bindestrek der den ikke gjør det
- [ ] MARGEN FØLGER SKJERMEN: gjør nettleservinduet smalere i Ren visning og se at luften i kantene krymper proporsjonalt, ikke står fast. Over cirka 1640 px skal margen derimot vokse, fordi det da er innholdsbredden som bestemmer
- [ ] «Skjerm»-lerretet er 1920 px, altså en fast referanseskjerm. Dra i sidemarg-skyveknappen og se at zoom-prosenten IKKE endrer seg og at siden ikke blir større eller mindre; kun Bærbar og Nettbrett skal vise margendringen, siden margen ikke har effekt på 1920
- [ ] INGEN BARER: lerretet fyller panelet i alle fire enheter og i Ren visning, uten striper på sidene. Sjekk særlig med sidemarg satt til Ingen, som var verst før
- [ ] HERO VOKSER IKKE PÅ HOVER: før vokste seksjonen med verktøylinjens høyde når pekeren traff den, og krympet igjen når den forlot. Beveg pekeren inn og ut av toppseksjonen på Hjem og se at ingenting flytter seg
- [ ] Under prøven står «Bredden slår inn fra N px vindusbredde». Sjekk at tallet endrer seg både når du endrer bredden og når du endrer margen (1440 med Middels skal gi 1637)
- [ ] HÅNDTAKENE HOLDER ADMIN-STØRRELSE: zoom inn og ut med minus og pluss, og se at «+ Ny seksjon», «+ Ny blokk», seksjonsverktøylinja, blokkens resize- og roterhåndtak, tekst-verktøylinja og flerutvalgs-linja beholder samme størrelse som knappene i admin-panelene. Sjekk på 30 %, 100 % og 300 %
- [ ] Håndtakene sitter der de skal ved alle zoomnivåer: resize-håndtaket i nedre høyre hjørne av blokken, roter-håndtaket i øvre høyre, «+ Ny blokk» øverst til høyre i seksjonen. De skal ikke drive vekk fra ankeret sitt når du zoomer
- [ ] Rutenettet, marquee-rektangelet og de smarte hjelpelinjene skal derimot IKKE holde konstant størrelse: de måler sidens egen geometri og skal følge zoomen som resten av siden
- [ ] INGEN SCROLLBAR I FORHÅNDSVISNINGEN i det hele tatt: verken en strek inntil sidens innhold eller en langs kanten av flaten. Scrolling skal likevel virke som før med hjul og touch, både i redigering og Ren visning
- [ ] «Se siden» og den publiserte siden skal derimot ha helt vanlig scrollbar: skjulingen gjelder KUN forhåndsvisningen
- [ ] INGEN PUMPING: åpne og lukk admin-panelene og dra vindusstørrelsen sakte fram og tilbake. Siden skal ikke veksle mellom to størrelser eller blafre; den skal skalere jevnt
- [ ] Zoom manuelt til 200 eller 300 % med pluss-knappen: DA skal du kunne dra lerretet sidelengs for å nå resten. Trykk Tilpass, og panoreringen skal forsvinne igjen
- [ ] Enhetsbryteren i verktøylinja har fire knapper: Skjerm, Bærbar, Nettbrett, Telefon. Hver skal gi riktig lerretsstørrelse, og hjelpeteksten skal vise målene
- [ ] Skjerm-knappen følger designbredden: endrer du innholdsbredden i Nettsted-panelet, endres lerretets bredde tilsvarende
- [ ] Nettbrett og Bærbar skal fortsatt være SKRIVEBORDSvisning i motoren: blokkene ligger absolutt plassert, Egenskaper viser plasseringsfeltene, og Fest ved scrolling kan settes. Kun Telefon skal gi mobilvisning
- [ ] Mobil-tilsyn-merket øverst hopper fortsatt til telefonvisning når du klikker det
- [ ] Zoom-kontrollen (Tilpass, minus, prosent, pluss) virker uendret i alle fire enheter
- [ ] Bytt språk i admin til engelsk og tyrkisk og sjekk de nye tekstene: Innholdsbredde, hurtigvalgene, Bredde, Sidemarg, Skjerm/Marg-etikettene under prøven, og hjelpeteksten på hver av de fire enhetsknappene

### Testrunde-batch (0.7.1): Oppryddingsrunden og sticky-utvidelsene

- [ ] Sticky: sett «Fest ved scrolling» på en blokk i en seksjon som er høyere enn blokken, og se i Ren visning at blokken fester seg SYNLIG under den klistrede menyen (før la den seg bak menyen); demoen er «Les mer»-knappen på Om oss
- [ ] Sticky med krympende meny (Nav-panelet, «Ved scrolling» = krymp): stopp scrollingen midt i krympingen og se at avstanden justerer seg når menyen er ferdig krympet, ikke først ved neste scroll
- [ ] Sticky med sidestilt meny og med «Ved scrolling» = skjul: avstanden er uendret i begge (kolonnen tar ikke plass i toppen; en utglidd meny beholder avstanden med vilje)
- [ ] Hjelpetekstene på Fest ved scrolling og avstanden nevner at seksjonen må være høyere enn blokken, og at menyhøyden legges til automatisk (nb, engelsk, tyrkisk, nynorsk)
- [ ] Bekreftelsesdialogen (f.eks. «Lagre som mal» eller «Slett mal»): Escape avbryter, klikk på det mørke bakteppet avbryter, og klikket treffer ikke knapper i panelet under; Enter i navnefeltet lagrer fortsatt; marker tekst i navnefeltet og slipp musa utenfor dialogen (skal IKKE lukke)
- [ ] Escape med både dialog og blokkmeny åpen lukker kun dialogen
- [ ] Publisering, angre-publisering og Oppdatering-panelets sjekk fungerer som før (CSRF-vernet er lagt om til Sec-Fetch-Site); test i minst to nettlesere, gjerne en personvern-orientert
- [ ] Innlogging: logg inn og ut som vanlig; en feilet innlogging skal gi «GitHub avviste innloggingen», aldri en rå serverfeil
- [ ] Kalender-pluginen henter feeden som før (proxyen leser nå strømmen med bytegrense)
- [ ] Nav-logo, footer-logo, ikonblokk med eget bilde, bildelag og bildegalleri-lag viser bildene som før, både i editor og publisert
- [ ] Seksjon med glød-lag som ble laget før radius/plassering fantes: laget vises (var usynlig)
- [ ] Festing virker nå i vanlig redigeringsvisning: sett «Fest ved scrolling» på en blokk og scroll i editoren; blokken fester seg uten at du må bytte til Ren visning
- [ ] Blokker med festing har en nål i hjørnet i redigering, med hjelpetekst ved peker; nålen er borte i Ren visning og på publisert side
- [ ] Ta tak i en festet blokk: den faller tilbake til sin ekte plass mens du drar, og fester seg igjen når du slipper
- [ ] Flytt en festet blokk med piltastene, og med juster/fordel fra flerutvalgs-linja: blokken skal IKKE hoppe tilbake til den gamle plassen ved neste scroll
- [ ] Dra et flerutvalg med festede blokker fra håndtaket i flerutvalgs-linja: ingen hopp, og festingen tas opp igjen ved slipp
- [ ] Marker to eller flere blokker og trykk «Fest gruppen»: de festes samlet og beholder avstanden seg imellom i stedet for å legge seg oppå hverandre; demoen er intro-teksten og «Les mer» på Om oss
- [ ] Gruppen slipper samlet ved seksjonens slutt, og blokker som med vilje overlapper beholder rekkefølgen sin foran/bak mens gruppen er festet
- [ ] Trykk «Fest gruppen» igjen: festingen fjernes fra alle de valgte blokkene, og ett angre-steg gjenoppretter den
- [ ] Fest til skjermen: sett Festemåte til «Til skjermen» på en blokk, velg plassering og se at den står i det punktet hele siden gjennom; demoen er «Til toppen»-knappen på Om oss
- [ ] Ved «Til skjermen» vises Plassering i vinduet i stedet for Slipp taket; velger du «Midt i vinduet» skjules avstandsfeltet (det har ingen effekt der)
- [ ] Publisert side: både gruppefestingen og den skjermdokkede knappen oppfører seg som i Ren visning; mobilvisningen har ingen festing i det hele tatt
- [ ] Gjør en side med festede blokker mindre i vindusbredden: festede blokker og grupper følger seksjonsbredden, og dokkede blokker holder seg innenfor vinduet

### Testrunde-batch (0.6.6.4.6): Nye rollesett og stagger-finpussen

- [ ] Seksjonstema i Egenskaper er et prøve-rutenett med åtte kort tegnet i sidens egne temafarger; prøvene endres når temaet endres; valgt kort markeres og Standard nullstiller
- [ ] De fire nye rollesettene (Dus, Dempet, Dyp, Uthevede kort) ser riktige ut i både lys og mørk modus, med lesbar tekst og synlige kort; aksentknapper beholder originalfargen
- [ ] Stagger: korteffekten (ton inn/gli opp/zoom) kan velges og demo-spilles i previewen ved hver endring (effekt, trinn, mønster, forsinkelse)
- [ ] Mønstrene Kolonnevis/Radvis klynger kort som er nesten på linje; Fra midten bølger utover fra midtkortet; dekor-blokker står stille
- [ ] Blokkens Animasjon inn-nedtrekk tilbyr ikke Stagger (kun seksjonens)
- [ ] Publisert side: stagger spiller ved første entré, står stille ved prefers-reduced-motion

### Testrunde-batch (0.6.7.13): Nytt + Ny seksjon-galleri (G2 + F2)

- [ ] Galleriet åpnes med kategorifelt (Alle, Grunnleggende, Kort og lister, Fremheving, Plugins, Mine maler) og søkefeltet fokusert; nederste seksjonsgrense åpner fortsatt oppover
- [ ] Kategoriene: Alle viser gruppene med klistrede overskrifter; et kategorivalg viser kun sine kort uten overskrift; valget huskes til neste åpning i samme økt; Plugins-kategorien finnes kun med aktive plugin-presets/-maler
- [ ] Søket treffer på tvers av presets, plugin-presets og egne maler uansett valgt kategori; Enter setter inn første treff; Escape lukker; tomtreff-linjen vises
- [ ] Fargene: hver kategori har sin egen tone (prikk, overskrift, kortkant, aktivt valg, søketreffenes kort); bytt admin-tema og se at hele paletten følger med; grå-temaet gir dempede men skilbare toner
- [ ] Hint vises som tooltip ved pek på kortene; Mine maler har tomtilstand, kryss-sletting og re-id-innsetting som før
- [ ] Ingen chip-stil (stiplet ellipse/forskyvning) på noen knapp i galleriet
- [ ] Markøren langs venstre kant av valgt seksjon er borte; palett-innsetting havner fortsatt i sist klikkede seksjon, og Ren visning er uendret

### Testrunde-batch (0.6.7.12): Innebygde side-maler (startpakkene)

- [ ] «Ny side fra mal»-rutenettet viser Innebygde-gruppen (Tom side + fem startpakker med miniatyrer) også uten egne side-maler; Mine maler-gruppen kommer under når egne maler finnes (merk: rutenettet forsvinner ikke lenger når siste egne mal slettes, det var 0.6.7.10-atferden)
- [ ] Opprett en side fra hver startpakke: riktige seksjoner i riktig rekkefølge, redigerbar som vanlig, og Om oss inneholder tidslinje-blokken
- [ ] Tidslinje-presetet ligger i + Ny seksjon under Kort og lister
- [ ] Statistikk-presetet gir tre statistikk-blokker (tell-opp hos besøkende); «+ tall» legger til en fjerde
- [ ] To sider fra samme startpakke deler ingen id-er (rediger den ene, den andre står urørt)

### Testrunde-batch (0.6.7.11): Tidslinje-, sitat- og statistikk-blokkene

- [ ] De tre blokkene kan settes inn fra Blokker-panelet, panelsøket OG lerret-menyen (+ Ny blokk/dobbeltklikk/slash); FAQ står i hovedlisten i lerret-menyen, ikke under Plugin-blokker
- [ ] Tidslinjen: klikk-og-skriv på år/tittel/tekst; hendelser kan legges til/flyttes/fjernes i Egenskaper; variantene venstre/veksler og markørene fylt/ring; aksentfargen følger valgt farge
- [ ] Sitatet: variantene stor/kort; portrettvalg (og fjern-knapp) vises kun for kort-varianten; portrettet publiseres som media/-fil
- [ ] Statistikken: tell-opp hos besøkende (publisert side) ved første entré, med bevart tallform (mellomrom/desimal); står stille ved prefers-reduced-motion og i editoren; hjelpechipen forklarer
- [ ] Faq- og sitat-presetene i + Ny seksjon gir blokkene (ikke tekstbokser); eldre sider med den gamle faq-preset-formen rendres uendret
- [ ] Bytt oppsett behandler de nye blokkene som tekst (splitt-variantene legger dem i tekstkolonnen)
- [ ] Mobil: alle tre vokser naturlig i stablingen (ingen klipt tekst ved mer innhold enn desktophøyden)

### Testrunde-batch (0.6.7.10): Side-maler

- [ ] Kebab-menyen på en side-rad: «Lagre som mal» og «Slett siden» (forsiden mangler slett); lukkes ved klikk utenfor og Escape
- [ ] Lagre en side som mal (både den aktive og en annen side): navnedialog, statusmelding, og rutenettet «Ny side fra mal» dukker opp under + Opprett side
- [ ] Rutenettet: Tom side + malene med miniatyrer som ligner sidene; valgt kort huskes til neste opprettelse; kryss sletter malen (med bekreftelse) og rutenettet forsvinner når siste mal er borte
- [ ] Opprett side fra mal: nytt navn/slug, alle seksjoner og blokker med, redigerbar som vanlig; å sette inn fra samme mal to ganger gir ingen id-kollisjoner (rediger den ene, den andre står urørt)
- [ ] Ctrl+Z etter mal-lagring og etter side-opprettelse ruller tilbake som ett steg per handling
- [ ] Publisering av en side-mal (mot urd-web): filen har kind page, bilder i sidens seksjoner materialiseres til media/

### Testrunde-batch (0.6.7.9): Bytt oppsett og Urd.maler-fundamentet

- [ ] Layout-knappen vises i seksjonsverktøylinjen kun for seksjoner med minst to bevegelige blokker (ikke for tomme/en-blokks seksjoner eller rene dekor-seksjoner)
- [ ] Stripen: klistret rett under verktøylinjen gjennom hele seksjonen, ligger over den flytende nav-en, viser riktige varianter (splitt/hero kun med tekst OG media) med miniatyrer som ligner seksjonen
- [ ] Bytte flytter blokkene uten å endre innhold/høyder; dekor og former står urørt; ETT Ctrl+Z ruller hele byttet tilbake; alt er redigerbart etterpå
- [ ] Bytte på en seksjon med manuell mobil-layout flagger mobil-tilsynet (gult merke)
- [ ] Urd-innstillingene (tannhjulet): «Bytt oppsett-velgeren» bytter til galleri-meny-formen uten omlasting; menyen har tittel, lukkeknapp og samme kort; valget huskes per nettleser
- [ ] Velgeren lukkes ved valg, nytt knappeklikk, klikk utenfor og Escape (begge formene)

### Testrunde-batch (0.6.7.8): Oppsetts-modellen (ren logikk, ingen UI ennå)

- [ ] Kun automatisk dekning i denne runden (tests/section-layouts.test.mjs); den manuelle testingen av bytt oppsett kommer med UI-et i 0.6.7.9-batchen

### Testrunde-batch (0.6.7.5): Blokkgruppe som gjenbrukbar

- [ ] Publisering av en blokkgruppe-mal (mot urd-web): filen har kind blocks, bilder i gruppen materialiseres til media/

### Testrunde-batch (0.6.7.4): Publisering av maler (mot urd-web)

- [ ] Lagre en mal og publiser: commiten inneholder content/maler/<id>.json og oppdatert content/maler.json; «Upubliserte endringer»-merket forsvinner, og malen består i Mine maler etter reload
- [ ] En mal med opplastet bilde publiseres med bildet som media/-fil (ingen base64 i malfilen); miniatyren i Mine maler virker etter reload fra publisert fil
- [ ] Slett en publisert mal og publiser: filen slettes fra repoet, indeksen krymper; en ny mal med samme navn i samme publisering overlever (create-vernet)
- [ ] Ctrl+Z rett etter publisering ruller mal-endringen tilbake som utkast mot NY publisert baseline (angre gjenskaper det publiserte innholdet, ikke gammel tilstand)


### Testrunde-batch (0.6.7.1): Middels-reviewrunden

- [ ] Mobilvisning: en side med faq/galleri/samling/kalender/skjema/kart med MER innhold enn desktophøyden viser alt uten at innholdet flyter over blokken under (naturlig høyde i stabling)


### Testrunde-batch (0.6.6.6.4): Sider/Samlinger/Plugins-prosa og undermeny-fiksene

- [ ] Panel-titlene Sider, Samlinger og Plugins viser intro-forklaringen som tooltip ved hover på tittelen; ingen prosaavsnitt øverst i de tre panelene
- [ ] Opprett side-knappen forklarer auto-meny-adferden i tooltip; «Funnet i repoets plugins/-mappe:» står som fet etikett over funn-listen
- [ ] Plugins-panelets tomtilstander og varsler er uendret (ingen plugins, ingen nye funnet, ødelagt plugin, motorkrav, CSP)
- [ ] Undermenyen følger barens tone når nav-en har lag-bakgrunn (fargelag flates til slør); med kun bilde-/gradientlag gjelder standard-sløret som før
- [ ] Nedtrekket har ingen lys glorie i mørkt tema (kort, piller, utfall og mobilpanel); i lyst tema ser skyggene ut som før
- [ ] Innstillinger-panelet ser uendret ut (kun revidert)

### Testrunde-batch (0.6.6.6.3): Nav/Footer-prosa og uskarphet-fiksen

- [ ] Nav-panelet: tooltips på Logo-gruppens summary (Hjem-knapp-forklaringen) og Meny-punkter-summaryen (undermeny-forklaringen); ingen prosaavsnitt igjen i panelet, og tallfeltene for logobilde (høyde/avrunding) forklarer seg selv via egne tooltips
- [ ] Footer-panelet ser og virker uendret ut (ingen endringer gjort)
- [ ] Uskarphet bak menyen virker igjen i alle nav-varianter (bar, flytende, flytende firkant/tab, sidestilt) og i undermeny/mobilpanel; av/på-bryteren i Nav-panelet har umiddelbar effekt begge veier
- [ ] Sideoverganger på publisert side (Chromium-familien): fortsatt myk krysstoning med nav og footer i ro, nå som navnene settes i pageswap/pagereveal i stedet for statisk CSS
- [ ] Etter neste oppdatering av urd-web: uskarpheten virker også der (fiksen ligger i base.css + urd.js, begge i motor-atomgruppen)

### Testrunde-batch (0.6.6.6.1-2): panel-språkets fundament og Innhold/Stil-fanene

- [ ] Tema-panelet ser uendret ut etter klasse-konsolideringen: Standard-chipene (aksent når valgt, dempet ellers, klikk bytter standard-skjema), LYS/MØRK-etikettene, palett-radene, typografi- og hjørneprøvene på sample-flatene
- [ ] Oppdatering-panelet ser uendret ut: «slettes»-chipene og «Behold min»-kolonneetiketten (nå delte klasser) står som før
- [ ] Egenskaper: Innhold/Stil-fanene vises øverst for alle blokktyper; hver innstilling ligger på riktig fane (innhold vs. utseende), og fanevalget huskes når du bytter blokk
- [ ] Blokkmenyen (tannhjulet på blokkens verktøylinje) viser de samme fanene og oppfører seg likt som panelet
- [ ] Tekstblokkens Innhold-fane viser tomtilstanden som peker til tekstlinjen; Stil-fanen har justering/tekstboks/kortstil
- [ ] Bildeblokk: lightbox står under Innhold og forsvinner når lenke fylles inn; galleriets lightbox står under Stil
- [ ] Tooltips i stedet for prosa: min-høyde (seksjon), videolenke, ikonfarge, eget ikonbilde, samlingsvelger og maks antall (to ulike tips), galleri-miniatyrene, «Plassering, lag og rotasjon»-summaryen og plugin-«Innstillinger …»-knappen viser forklaringen ved hover; ingen prosaavsnitt igjen i Egenskaper utenom tomtilstander og place-søkestatus
- [ ] Kjernespråk: admin på nynorsk/nordsamisk viser fanene og tomtilstanden på bokmål; samling-tooltipene er oversatt i alle fem språk

### Testrunde-batch (0.6.0.13): panel-design, kjernespråk og bug-runden

- [ ] Oppdatering-panelets nye design (mot urd-web med ny versjon tilgjengelig): versjonskort med installert versjon, pil og mål-badge pluss oppsummeringslinjen; motorgruppen som fold med antall (og atomforklaring i tooltip); valgfrie filer med «Behold min» som kolonneoverskrift, slettes-chip og switcher; «Sikkerhetsheadere»-folden viser _headers-instruksen ved avvik
- [ ] Utgivelsesnotatene: neste release med notater i monorepoet gir en release med samme notater på malrepoet (Action-steget), og panelet viser dem i «Om {target}»-folden; en eldre målversjon uten notater viser ingen fold
- [ ] Plugin-blokker kan settes inn igjen: kalender (alle fire visningene via foldemenyen), skjema og kart fra «+ Ny blokk» og Blokker-panelet lander på lerretet
- [ ] Slett utvalget: dra-marker flere blokker; slett-knappen i multiverktøylinjen og Delete/Backspace fjerner alle markerte, og ETT Ctrl+Z bringer alle tilbake
- [ ] CSP-varselet: på deployet side vises INGEN advarsel for kart (OSM-verten står i _headers); fjernes verten fra _headers midlertidig, vises advarselen for nøyaktig den verten; lokalt (uten CSP-header) vises aldri advarsel
- [ ] Kart-innstillingene i Egenskaper: sted, zoom og høyde rendres direkte når kartblokken er markert (ingen «Innstillinger …»-knapp, tannhjulet på blokken er borte); adressesøk med Søk-knappen virker på publisert side, koordinater («59.913, 10.739») og OSM-lenker virker også lokalt; zoom/høyde klemmes til gyldige verdier
- [ ] Kalender og skjema beholder «Innstillinger …»-knappen i Egenskaper, og den åpner fortsatt config-panelet i forhåndsvisningen
- [ ] Feiltekster utenfor admin er engelske (f.eks. logg ut og kall /api/github/latest direkte: «Not signed in»), mens admin fortsatt viser feil oversatt på admin-språket via api-kodene
- [ ] Kjernespråk-modellen: bytt admin-språk til nynorsk eller nordsamisk; de nye tekstene (place-søket, slett utvalget, oppdateringspanelet) vises på bokmål uten hull eller feil

### Testrunde-batch (0.6.9.x): splitt, oppdaterer og fase-slipp (samlet og slått sammen 5. august 2026)

**README-ene, docs-strukturen og designrunden (0.6.9.10)**

- [ ] Etter neste synk: malrepo-forsiden viser engelsk README med logo, flagg-linje og hurtiglenker; bokmål/tyrkisk i readme/-mappen leses godt med virkende lenker
- [ ] Rot-READMEens badges er levende på GitHub (Tester grønn, release-versjonen vises) på alle fem språk
- [ ] Guidenes innholdsfortegnelse: klikk gjennom ankrene på GitHub i alle fem språk; særlig de tyrkiske «İçeriği düzenleme» og «İlk kez» (İ-slugging med U+0307)
- [ ] Ny side med slug «readme» avvises i editoren med reservert-navn-meldingen (ikke server-feil ved publisering)
- [ ] Oppsettsguidene har Forutsetninger øverst i alle fem språk, og gamle stier (docs/OPPSETT-PUBLISERING.md, docs/BRUKERVEILEDNING.md) er borte uten døde lenker i repoet

- [ ] Lokalt (dev-server.py): alle sider laster uten 404 i konsoll/nettverksfane (motoren fra /assets/engine/0.6.10/), alle fire pluginene virker i preview via /assets/urd/-skallene, admin-språkbytte virker (ordbøkene kjøretids-lastes via skallene), og Oppdatering-panelet degraderer pent til utilgjengelig-melding uten functions
- [ ] Pre-v1-innbakingen: eksempelsidene rendrer identisk som før (gradienter, bilde-bakgrunner med parallaks, kalender-blokken på Hjem) uten plassholder-advarsler i konsollen, og gradient-editoren redigerer farger/andeler/animasjon og publiserer rent
- [ ] Nytt innhold: opprett en side og sett inn en ny kalender-blokk fra velgeren; begge virker, og publisert sidefil har `"schemaVersion": 1`
- [ ] Engangsoppsettet (rekkefølgen i UTVIKLING): opprett offentlig `urd-template`-repo MED «Add a README file» (så main finnes), legg secreten `URD_TEMPLATE_PAT` (fine-grained, contents read/write kun på malrepoet) i MONOREPOET Urd sine Actions-secrets (ikke i malrepoet), kjør første synk, og huk deretter av Settings → General → «Template repository» (da vises «Use this template»-knappen) + sett topic `urd-template`
- [ ] Release-flyten: tagg `v0.6.9` og publiser GitHub-releasen; Action-en kjører grønt (check-release i full modus, tester, synk) og seeder urd-template med ÉN commit «Urd v0.6.9» pluss taggen. En rc-dispatch med prerelease-flagget seeder tilsvarende for oppdaterer-testing, omkjøring er ufarlig (uendret innhold/eksisterende tagg flyttes aldri), og en dispatch mot tagg som ikke matcher urd.json.engine stoppes i versjonskonsistens-steget før noe pushes
- [ ] Deployen av 0.6.9 på urdweb: siden virker som før; undersidene har render-blokkerende tema og blinkefritt lys/mørk-valg ved direkte innlasting; svar-headerne viser `immutable` på en motorfil og på base.css, men IKKE på /assets/urd/i18n.js; en publisering skriver slug-kopier med de versjonerte stiene (vis kildekode på en underside); og Oppdatering-panelet melder «kjører nyeste» mot malrepoet
- [ ] Klon-flyten: følg OPPSETT-PUBLISERING fra «0. Lag nettsidens repo» til deployet side mot en ekte klon, uten monorepo-kunnskap; hvert steg stemmer med det GitHub/Cloudflare faktisk viser
- [ ] Oppsettsveiviseren på fersk klon: vises i admin utløst av setup-signalet alene; fullføring + publisering fjerner `setup`-feltet fra site.json og veiviseren vises aldri igjen; avvisning (lukk uten å fullføre) holder den borte i samme nettleser mens feltet består i repoet til noen fullfører
- [ ] `_headers`-avvik: instruksen med oppstrøms tekst vises i markerbar blokk (i både sjekk-svaret og panelet), filen står ALDRI i endringslisten og er urørt i repoet etter oppdateringen
- [ ] Selve oppdateringen (rc til rc i testklonen): bekreftelsesdialogen viser målversjon, antall og overskrivings-varsel for håndredigerte motorfiler; utføringen gir ÉN commit (ny motormappe inn, gammel ut, slug-kopier byte-like ny rot-index.html, urd.json-engine bumpet); deploy-pollingen laster admin på nytt av seg selv når /urd.json melder ny versjon, upubliserte utkast består, og publisering i deploy-vinduet sperres i samme fane
- [ ] Feilveiene: utdatert expect (push noe annet først) gir updateRace uten at noe skrives; klon uten baseline-tagg får updateNoBaseline oversatt på admin-språket; utilgjengelig malrepo gir oversatt feil med fungerende «Prøv igjen»; og uten publiseringstilgang (utenfor ALLOWED_LOGINS) er Oppdater-knappen deaktivert med forklarende tooltip

### Testrunde-batch (0.6.0.10): API-feil på admin-språket, motor-stempel og CSS-rydding

- [ ] API-feil oversettes: sett admin-språket til English (UK), logg ut i en annen fane og prøv å publisere - feilmeldingen kommer på engelsk (kode-oppslag), ikke som norsk backend-tekst
- [ ] Utløpt innlogging: med utløpt/ugyldig token gir publisering «sign in again»-varianten (koden `loginExpired`), ikke den generiske «must sign in»-meldingen med rå årsak
- [ ] Kart-søket i preview: søk på tøys (under 3 tegn og et sted som ikke finnes) med admin på et annet språk - «skriv en adresse»- og «fant ikke stedet»-meldingene følger admin-språket
- [ ] Kalender-feed-feil: pek en kalenderkilde på en ikke-godkjent vert - feilen i blokken viser vertsnavnet interpolert, på admin-språket
- [ ] Panelene etter CSS-ryddingen: klikk gjennom alle paneler (særlig Tema, Nettsted, oppsettskortet og verktøyradene) og se at ingenting har mistet stil
- [ ] Motor-stempelet: alle fire pluginene laster fortsatt (ingen «krever motor»-advarsler i konsollen), og plugin-panelet viser ingen versjonsadvarsel med engine 0.6.8 mot kravet >=0.6.8

### Testrunde-batch (0.6.8.10): språkpakke-plugins

- [ ] Aktivering: åpne Plugins-panelet - «Svensk språkpakke» står der (deaktivert), viser «Språkpakke: Svenska» og ingen versjonsadvarsel. Slå den på og publiser
- [ ] Besøkende-språket: Nettsted > Språk viser nå Svenska alfabetisk mellom Norsk nynorsk og Türkçe. Velg det, og se i forhåndsvisningen at meny, «Till toppen», lysboks, galleri og nyhetsbrev-skjemaet er svenske MENS admin fortsatt er på ditt eget språk
- [ ] Publisert side: last den ekte siden med site.lang = sv - samme svenske chrome, og `<html lang="sv">` i kilden. Datobadger og kalender-månedsnavn er svenske via Intl (ikke oversatt i pakken)
- [ ] Delvis dekning: pakken dekker KUN besøkende-siden, så admin-språkvelgeren skal IKKE tilby Svenska. Sjekk at den ikke dukker opp der
- [ ] Deaktivering: slå pakken av igjen mens site.lang fortsatt er sv - siden faller til bokmål uten å kræsje, og velgeren beholder «sv» som eget alternativ så verdien ikke går tapt
- [ ] Utkast vs. publisert: slå pakken på UTEN å publisere - språket skal være valgbart i Nettsted-panelet og virke i forhåndsvisningen (utkastlista), men admin-språkvelgeren venter til det er publisert
- [ ] Lag din egen: følg «Språkpakker»-avsnittet i template/plugins/README.md og lag en pakke for et språk med admin-dekning (kopier locales/admin/nb.js, oversett noen nøkler) - de uoversatte nøklene skal vises på bokmål, ikke som nøkkelnavn
- [ ] Ingen ekstra last for innebygde språk: med site.lang = nb/en-GB skal nettverksfanen ikke vise language-packs.js i det hele tatt

### Testrunde-batch (0.6.8.9): dokumentasjonen på fem språk

- [ ] GitHub-visningen: åpne repoet på github.com - READMEen vises på engelsk med logo, språklinje og uttale-avsnittet; klikk gjennom alle fire språklenker og tilbake igjen (GitHub gjengir relative lenker riktig)
- [ ] Lenkelinjene: fra hvert dokument, klikk hvert språk - ingen 404, og gjeldende språk er uthevet uten lenke. Sjekk også de to-språks-linjene (utvikling, veikart, visjon)
- [ ] Brukerveiledningen mot ekte admin: sett admin til English (UK) og følg den engelske veiledningen - knappe- og panelnavnene i teksten skal matche det som faktisk står på skjermen. Gjenta stikkprøve på tyrkisk
- [ ] Oppsettsguiden: følg den engelske utgaven mot et ekte Cloudflare/GitHub-oppsett - menyvalgene står på engelsk (som i dashbordet), og feilsøkingstabellens symptomer matcher Urds faktiske meldinger
- [ ] Uttale-avsnittet: leser det naturlig for en engelsktalende, og stemmer *weird*-etymologien? (Samme på tyrkisk)
- [ ] Samisk gjennomgang: be gjerne en med nordsamisk som morsmål se over README-se.md, GUIDE-se.md og SETUP-se.md (alle er merket som maskinutkast)
- [ ] CONTRIBUTING: følg «Bidra med språk»-oppskriften som om du var en ny bidragsyter - er stegene nok til å legge inn en rettelse og verifisere den med paritetstesten?

### Testrunde-batch (0.6.8.8): plugin-locales (kalender, skjema, kart)

- [ ] Besøkende-språket: sett site.lang til en-GB og se på en side med kalender/skjema/kart - «Next event»-panelet, nedtellingen (Today!/Tomorrow/In {n} days), Abonner-knappene, skjemaets valideringsmeldinger og «Send», kartets «View larger map» følger språket; månedsnavn/ukedager i kalenderen likeså
- [ ] Nedtelling på samisk/tyrkisk: stikkprøv at «I dag/I morgen/Om N dager»-tekstene er ekte språk (egne nøkler, ikke rå tall); samisk er maskinutkast (funn meldes)
- [ ] Config-panelene i preview (Kilder/Skjema/Sted) og hjelpechipene følger ADMIN-språket, uavhengig av site-språket
- [ ] Plugin-navnene: Blokker-panelets «Fra plugins»-seksjon og Plugins-panelet viser names på admin-språket (Calendar/Takvim …); blokk- og variant-etiketter likeså
- [ ] Språkbytte i preview: bytt Nettsted > Språk - plugin-tekstene hos besøkende i previewen bytter MED (applyPluginSiteLocales), ingen norske rester
- [ ] Skjema-seed: sett inn Kontaktskjema-preset med admin på engelsk - feltene heter Name/Email/Message (seed); publisert skjema validerer og sender som før
- [ ] A11y: kalenderens ‹/›-månedsknapper annonserer Forrige/Neste måned på sidens språk
- [ ] Gamle manifester: en plugin UTEN locales/names-feltene lastes som før (bakoverkompatibelt)

### Testrunde-batch (0.6.8.7): seed-innhold på admin-språket

- [ ] Engelsk seed: med admin på English (UK), sett inn en Hero-, kort- og team-preset pluss tekst/knapp/FAQ-blokker - alt innsatt INNHOLD (overskrifter, brødtekst, «Read more»-knappen, FAQ-spørsmålene) er engelsk, og preset-galleriets etiketter/grupper/hint følger språket
- [ ] Footer-maler: velg «Newsletter»- og «Big CTA»-malen på engelsk - kolonnetitler, taglines, «Privacy», CTA-feltene og «Made with Urd» settes inn på engelsk
- [ ] Innsatt innhold FRYSES: bytt admin-språk etter innsetting - det alt innsatte innholdet beholder språket sitt (det er brukerdata nå), kun chromen bytter
- [ ] Norsk uendret: på bokmål settes alt inn ordrett som før
- [ ] Publisert side: seedene vises hos besøkende nøyaktig som de ble satt inn (ingen nøkler, ingen oversettelse ved rendering)
- [ ] Gruppering intakt: preset-galleriet har samme grupper og rekkefølge som før, plugin-presets samlet sist

### Testrunde-batch (0.6.8.6): canvas-chromen (verktøylinjer, hjelpekort, bildeeditor)

- [ ] Engelsk canvas-runde: med admin på English (UK), åpne preview-chromen - blokkpaletten (+ Ny blokk), preset-galleriet (+ Ny seksjon), tekst-verktøylinjens titler (pek på knappene; B/I-bokstavene), seksjonshøyde-håndtakene, multimarkeringslinjen («2 selected»), blokk-verktøylinjen og dobbeltklikk-menyen skal være engelske
- [ ] Hjelpechipene: åpne «?» på FAQ-, galleri- og samlingsblokken - kortets tittel («Slik virker …»-mønsteret) og innholdslinjene følger admin-språket; ved FØRSTE sidelast skal chipene aldri vise rå nøkler (adminLocaleReady-vinduet)
- [ ] Bildeeditoren: alle etiketter og segmentvalg følger språket; «Bytt bilde»/«Velg bilde»-ternæren riktig
- [ ] Delte kart: font-navnene, seksjonstema-valgene (Flate/Aksent/Invers), ikon-/tegnkategoriene i velgerne, bakgrunnslag-typene og animasjonsvalgene følger admin-språket i BÅDE panelene og canvas-menyene
- [ ] Besøkende upåvirket: hos besøkende (og i Ren visning uten chrome) finnes ingen spor av admin-språket; footer-sosiallenkenes aria-labels er fortsatt merkenavn 
- [ ] Norsk uendret: hele canvas-chromen ordrett som før på bokmål

### Testrunde-batch (0.6.8.5): admin-strenger B (tooltips, placeholders, panel-tekster)

- [ ] Full engelsk-runde: bytt admin-språk til English (UK) og gå gjennom ALLE paneler - gruppetitler, knapper, hint-avsnitt, placeholders og tooltips (hold pekeren over «?»-felter og knapper) skal være engelske; norsk skal ikke skinne gjennom noe sted i chromen
- [ ] Norsk uendret: med bokmål skal hele admin se ordrett ut som før
- [ ] Fargevelgeren: «koblet til temafargen»-tittelen (pek på en swatch koblet til token) interpolerer riktig på valgt språk; Fjern fargen-knappen likeså
- [ ] Bildeeditoren og tegnvelgeren: etiketter (Zoom/Lysstyrke/Kontrast/Metning, Nullstill/Bruk) følger språket
- [ ] Fet/kursiv-knappene i logo-innstillingene viser B/I på engelsk, K/I på tyrkisk, F/K på norsk
- [ ] Innhold forblir innhold: nye blokker settes fortsatt inn med norsk seed-tekst uansett admin-språk (oversettes først i 0.6.8.7), og publiserings-commitmeldingen i historikken er norsk (bevisst: delt git-historikk)

### Testrunde-batch (0.6.8.4): admin-strenger A (meldinger, dialoger, nedtrekk)

- [ ] Bytt admin-språk til English (UK): statuslinja (Angret/Undone, Publiserer…/Publishing…), publiseringsdialogene (konflikt/angre), alle nedtrekksvalg (nav-varianter, hover-stiler, galleri-visninger, footer-maler, temaforslag) og Egenskapers «Text block»-overskrift følger språket
- [ ] Norsk uendret: med bokmål skal alt se ordrett ut som før (nb-basen speiler de gamle tekstene)
- [ ] Parameteriserte meldinger: last opp et stort bilde ({kb}-melding) og en bunke der noen feiler ({n}-meldinger) - tallene settes inn riktig på alle språk
- [ ] Angre-dialogen: commit-meldingen («…») vises fortsatt ordrett i dialogen (brukerdata oversettes aldri)
- [ ] Stikkprøve nynorsk/samisk/tyrkisk: panelnavn + noen nedtrekk; samisk er maskinutkast (innholdsfeil meldes som funn, ikke stryk)

### Testrunde-batch (0.6.8.2-3): panel-refaktoren og språkvelgerne

- [ ] Panelene virker som før: klikk gjennom alle 11 (Sider, Blokker, Egenskaper, Grid, Nettsted, Tema, Nav, Footer, Samlinger, Plugins, Historikk) - åpne/lukke, Grid-overlegg følger Grid-panelet, Historikk laster, blokk-klikk åpner Egenskaper
- [ ] Auto-språk: uten lagret valg skal admin følge nettleser-/OS-språket (norsk maskin = bokmål; sett nettleseren til et ustøttet språk, f.eks. tysk = engelsk)
- [ ] Språkvelgeren i topbaren: velg hvert av de fem språkene - admin laster på nytt og panelnavnene skifter språk (resten av UI-et er fortsatt norsk til batchene 4-6); «Automatisk» går tilbake til enhetsspråket; valget overlever ny fane/omstart i samme nettleser
- [ ] Nettsted > Språk på nettsiden: bytt til f.eks. English (UK) - previewen bytter besøkende-chrome UMIDDELBART (footer-knapper, til-toppen) uten omlasting; «Upubliserte endringer» vises; publiser og sjekk at den publiserte siden følger valget
- [ ] Håndredigert lang-verdi utenfor lista (f.eks. «de» i site.json): panelet viser den som eget alternativ øverst og ødelegger ingenting
- [ ] Historikk-datoene formateres etter admin-språket

### Testrunde-batch (0.6.8.1): flerspråk-kjernen og besøkende-tekstene

- [ ] Standard uendret: en side med `"lang": "no"` (demoen) skal se HELT ut som før på bokmål - nav-tooltips, til-toppen, footer, galleri, datobadger
- [ ] Språkbytte: sett `site.lang` til `nn`, `en-GB`, `se` og `tr` (håndredigert site.json, publiser eller lokal server) - motor-chromen bytter språk (temabryterens skjermleser-tekst, burger, til-toppen, lysboksens knapper, galleri-pilene, video-tomtilstander), og `<html lang>` følger med (sjekk i devtools)
- [ ] Datoer: samlings-datobadgen viser månedsnavn på sidens språk (f.eks. «njukčamánnu» for mars på nordsamisk, «Mar» på tyrkisk)
- [ ] Nyhetsbrev-CTA: med TOM knappetekst vises språkets standard («Meld på»/«Sign up»/…); egen tekst overstyrer som før; valideringsmelding og bekreftelse følger språket; mailto-fallbackens emne/kropp likeså
- [ ] Skjermleser/a11y: footer-sosiallenkene annonserer «Facebook»/«Instagram» (ikke rå id), galleri-prikkene «Bilde 1/2/3» på sidens språk
- [ ] Lokal utvikling: `python3 dev-server.py` + site.lang satt til `en-GB` - språkfilen dynamisk-lastes uten feil i konsollen
- [ ] Ukjent språk: `"lang": "de"` gir bokmål (fallback), ingen feil
- [ ] Samisk innhold: be gjerne en med nordsamisk som morsmål se over `locales/site/se.js` (flagget i filen)

### Testrunde-batch (0.6.6.5.12): lenker til seksjon/anker og nav scroll-adferd

- [ ] Anker på tvers av sider: demo-footerens «Kakevideoen» (Utforsk-kolonnen) skal fra en annen side gå til Kaker og rulle mykt ned til videoseksjonen
- [ ] Anker på samme side: lag en knapp/footer-lenke med `#seksjons-id` fra samme side - siden ruller mykt dit uten omlasting; med redusert bevegelse hopper den direkte
- [ ] Kopier-knappen: seksjonens Egenskaper viser «Anker #id» - kopier, lim inn i et lenkefelt, og lenken virker
- [ ] Vokteren står: `javascript:alert(1)` og `//ond.no` i lenkefeltet gir fortsatt død lenke (`#`); eksterne https-lenker åpner som før med noopener
- [ ] Nav krymp: sett Meny > «Ved scrolling» til Krymp - i Ren visning og publisert blir menyen kompakt etter et stykke scrolling og normal igjen øverst; prøv også med flytende pille og størrelse Stor (skaleringene skal komponere)
- [ ] Nav skjul: «Skjul, vis ved scroll opp» - menyen glir ut ved scrolling ned, inn igjen ved scrolling opp, alltid synlig øverst; småbevegelser får den ikke til å flimre
- [ ] Mobil: med mobilmenyen åpen skal menyen aldri forsvinne; lukket oppfører den seg som på desktop
- [ ] Gating: valget «Ved scrolling» vises ikke for sidestilt variant eller når «Klistrete meny» er av; i redigeringsmodus (chrome på) står menyen alltid i ro
- [ ] Redusert bevegelse: krymp/skjul skjer som klipp uten overgang

### Testrunde-batch (0.6.0.6): gradient pan/orbit på kompositoren (transform-løpere)

- [ ] Pan (lineær gradient, «Panorer»): sett animasjonen på et gradientlag - glidningen skal se identisk ut som før (diagonal drift frem og tilbake over 18 s), uten hakking, og gradienten skal fylle seksjonen uten synlige kanter eller hvite striper i noen vindusstørrelse
- [ ] Orbit (radiell gradient, «Bane»): sentrum skal stå der det er satt (Sentrum X/Y) og banen svinge rundt det som før (26 s); prøv også et sentrum utenfor midten (f.eks. X 70 %, Y 20 %)
- [ ] Redusert bevegelse: pan viser stille utsnitt som før; orbit skal nå vise det KORREKTE forankrede sentrumet (før viste den feil hjørne av lerretet)
- [ ] Pulse/Rotate/Panorer én vei: uendret adferd (kun pan/orbit er bygget om)
- [ ] I editor-preview: gradientlag med pan/orbit redigeres og forhåndsvises som før (bytt animasjon frem og tilbake, ingen etterlatte løpere eller doble lag)

### Testrunde-batch (0.6.0.5): View Transitions mellom sider, native scrollås og myk ankerscroll

- [ ] Sidebytte-krysstoning: naviger mellom sider på den publiserte siden i Chromium - myk krysstoning der nav og footer står i ro mens innholdet toner; frem/tilbake-knappene gir samme overgang. I Firefox (uten støtte): vanlig, umiddelbar navigasjon uten feil
- [ ] Redusert bevegelse: med OS-innstillingen på skal sidebyttet være et rent klipp (ingen toning), og ankerlenker/«Til toppen» hoppe direkte
- [ ] Preview i admin: sidebytter i editoren skal være som før (ingen overgang, ingen visuelle artefakter fra view-transition-navnene)
- [ ] Scrollås: åpne lysboksen (bilde/galleri) - bakgrunnen kan ikke scrolles; lukk (Esc, kryss, bakgrunnsklikk) - scrollen er fri igjen med bevart posisjon. Prøv også re-åpning rett etter lukking
- [ ] Myk ankerscroll: en blokk-lenke til `#anker` og «Til toppen»-pilen ruller mykt hos besøkende
- [ ] Seksjonsdrag i admin: dra en seksjons topphåndtak (høyde ovenfra) - innholdet under skal stå visuelt stille som før, ingen myk/drivende scroll-kompensasjon

### Testrunde-batch (0.6.35): Høy-fiksene fra kodegjennomgangen (browser-røyk; maskinen manglet headless Chromium)

- [ ] Blokk-lenker: sett en `javascript:alert(1)`-href på knapp, bilde, samlingsinnslag og galleri-bilde (håndredigert utkast/JSON) - hos besøkende skal knappen være død ('#'), bildet uten lenke-innpakning, samlingstittelen uten lenke og galleri-flisen uten lenke (lightbox tar over der den er på); trygge https-/mailto-lenker OG interne stier/anker (`/om-oss`, `#kontakt`) virker som før
- [ ] Angre samlinger: rediger et innslag (både i panelet og klikk-og-skriv i preview) - Ctrl+Z angrer selve samlingsendringen, aldri en urelatert side-/site-endring; slett en samling og Ctrl+Z bringer den tilbake med innholdet; opprett en samling og Ctrl+Z fjerner den igjen
- [ ] Angre plugins: skru en plugin av/på og Ctrl+Z - previewen laster på nytt med forrige liste; vanlig angring av sideinnhold skal ALDRI utløse preview-reload
- [ ] Kvotevarsel: fyll utkastet med store bilder til localStorage sprenges (eller senk kvoten midlertidig i devtools) - rød feilmelding i statuslinja i stedet for stille tap; publisering frigjør plassen
- [ ] Publisering etter vokter-tilstrammingen: vanlig publisering (sider, samlinger, plugins, bilder/SVG-logo, sletting av side/samling) går gjennom uten avvisning

### Testrunde-batch (0.6.6.5.11): tema uten FOUC (light-dark()), SVG auto-trim, nav-variant «Flytende (tab)»

Bygg om på en ekte side og sjekk hos besøkende/publisert der det står:

- [ ] Ingen tema-flimmer: last (og hard-reload) den publiserte siden i lys og i mørk OS-modus - siden skal males med riktig tema fra første frame, ingen mørk-til-lys (eller omvendt) blink. Prøv også med treg tilkobling (DevTools «Slow 3G»)
- [ ] Lys/mørk-bryteren: klikk bryteren i menyen - farger OG nettleser-chrome (scrollbar/formfelt) bytter umiddelbart; reload beholder valget uten flimmer (manuelt valg skal vinne over OS)
- [ ] Følg system: uten et manuelt valg skal siden følge OS-temaet og bytte når du bytter OS-tema
- [ ] Preview i admin: endre temafarger i Tema-panelet - previewen oppdaterer live til utkastets farger, og tema-bryteren i previewen virker
- [ ] SVG auto-trim: last opp en SVG med luft rundt motivet som nav-logo, bilde-blokk og bakgrunn - logoen/bildet skal fylle plassen tett (ingen død marg rundt). Favicon: last opp en SVG - fanen skal vise et tett beskåret ikon
- [ ] Nav-variant «Flytende (tab)»: velg den i Meny > Utseende - menyen henger ned fra toppen med firkant topp og avrundet bunn. Med «Luft over menyen» av blir den en nedhengende header. Glød/luft-tilvalgene skal virke som for de andre flytende

### Testrunde-batch (0.6.6.5.9): redigerings-lerretet skalert til fullvindus-preview (identisk med publisert)

Sammenlign redigerings-visningen mot den publiserte siden («Se siden» / egen fane):

- [ ] Identisk render: det du ser i admin-lerretet skal se likt ut som den publiserte siden (samme plassering, brytning, avstand) - kun visningsstørrelsen (zoom) kan skille. Prøv på flere sider, også en uten parallaks
- [ ] Ingen topp/bunn-barer: lerretet skal fylle flaten uten svarte striper over/under, både på vanlig og svært bred skjerm
- [ ] Zoom: «Tilpass» skalerer siden til å passe vinduet (%-avlesningen viser gjeldende); «100%» viser ekte 1:1 (kan gi scroll); «Ren visning» er også 1:1 fullvindu
- [ ] Zoom følger panelene: åpne/lukk et panel (f.eks. Tema) - siden skal ombryte IDENTISK (samme render-bredde), kun zoom-prosenten endrer seg
- [ ] Redigering under skalering: blokkmeny (klikk en blokk), dra/endre størrelse, tekst-skriving og markering skal treffe riktig sted også når lerretet er skalert ned
- [ ] Mobilvisning: bytt til mobil (390px) - telefonen står sentrert på mørk flate og skaleres til å passe høyden

### Testrunde-batch (0.6.6.5.8): Nettsted-panel - navngi siden, beskrivelse, favicon

- [-] Beskrivelse: skriv en kort beskrivelse; den skal overleve publisering (brukes av søkemotorer/deling)
- [ ] Angre: etter å ha endret navn/beskrivelse skal Ctrl+Z reversere endringen

### Testrunde-batch (0.6.6.5.7): moderniser til native/CSS - parallaks scroll-drevet, faq som `<details>`, lightbox som `<dialog>`

Bygg om på en ekte side og sjekk hos besøkende/publisert der det står:

- [ ] Parallaks (scroll-drevet): legg et Bilde-bakgrunnslag med «Parallakse» på. På publisert/ren visning skal bildet henge etter ved scroll som før (samme retning og styrke), uten zoom. På mobil og ved redusert bevegelse står det stille. Skal se likt ut som før omleggingen
- [ ] FAQ (native `<details>`): sett inn en FAQ-blokk. Besøkende: klikk hvor som helst på spørsmålsraden folder ut; kun ett svar åpent av gangen (åpne et nytt lukker forrige). Ctrl/Cmd+F og søk etter tekst inne i et lukket svar skal åpne svaret automatisk. Tastatur: Tab til et spørsmål, Enter/Mellomrom folder ut
- [ ] FAQ i editor: klikk rett i et spørsmål eller svar for å skrive (skal IKKE folde ut ved skriving, mellomrom skrives normalt); pil-ikonet folder ut og inn; «flere åpne samtidig» i Egenskaper lar flere stå åpne. Blokken skal ikke hoppe/teleportere ved utfolding
- [ ] Lightbox (native `<dialog>`): klikk et bilde med lightbox på (bildeblokk eller galleri). Fullvisning åpner over ALT innhold; Esc lukker; piltastene blar; klikk på den mørke bakgrunnen lukker; fokus går tilbake til bildet du klikket fra. Tab skal holde seg inne i lightboxen (ikke havne bak den)

### Testrunde-batch (0.6.6.5.5): bakgrunnsbilde omdesignet - fri plassering, kraftig parallaks, Flislegg, SVG auto-trim, bleed

Legg et Bilde-bakgrunnslag på en seksjon (Egenskaper → Bakgrunn → Nytt lag = Bilde), og last opp en logo/et bilde:

- [ ] Størrelse: stepperen (10-400 %) og +/- krymper/forstørrer bildet. «Dekk» fyller seksjonen (beskjærer), «Vis hele» viser hele bildet - begge regner seg fram fra bilde- og seksjonsmål

### Testrunde-batch (0.6.6.5.4): seksjonstemaer, parallax, stagger, admin-kontrast, ferdige temaer + oppusset Tema-panel

- [-] Stagger: sett «Animasjon inn» = Stagger på en seksjon med flere kort; kortene skal slippes inn forskjøvet fra én trigger. Prøv begge mønstre («En etter en» og «Kolonnevis») og trinn-tiden
- [-] Ferdige temaer: Tema-panelet har seks forslag (Brønn/Stein/Plomme/Rose/Hav/Natt); klikk ett og hele temaet + lys/mørk fylles, så kan du finjustere fritt

### Testrunde-batch (0.6.6.5.2): footer-overhaling, delt bakgrunnslag for nav, Urd-logo

Footer-overhalingen (26. juli). Bygg footeren i admin (Footer-panelet) og sjekk på siden:
- [ ] Handlingsoppfordring (CTA): knapp-varianten lenker til side/URL/mailto og virker uten server; nyhetsbrev-varianten validerer e-post og viser inline bekreftelse (mot et ekte endepunkt) eller åpner mailto som fallback uten endepunkt; en stor sentrert CTA-variant finnes. NB: nyhetsbrev mot ekstern vert krever `connect-src` i `_headers`

### Testrunde-batch (0.6.31): teksteditoren «Office-linjen» (to faste rader, størrelse på markering)

Bugfikser (del 5, 24. juli):
- [ ] «Temaets (tynn)» kantlinje kan nå farges: Kantfarge-velgeren vises også for den (før kun for «Egen farge»); velger du en farge blir den en egen fargbar kantlinje

### Testrunde-batch (0.6.26): sticky blokker, klikkplassering, hjelpelinjer, toppkant-høyde (M6 batch C del 1)

- [-] Sticky: «Fest ved scrolling» på en blokk (Egenskaper/blokkmenyen, kun desktop-visning); i Ren visning fester blokken seg ved vindustoppen med valgt avstand og slipper når egen seksjon er forbi; publiser og sjekk samme adferd som besøkende (demoen: «Møt gjengen»-knappen på Om oss-siden har festing på)
- [-] Sticky med «Slipp taket» satt til en senere seksjon: blokken følger med forbi egen seksjon og slipper først der; nedtrekket viser kun seksjoner LENGER NED enn blokkens egen
- [-] Sticky i vanlig redigering (chrome på): blokken står helt stille og kan dras/redigeres som før; mobilvisningen og auto-mobil hos besøkende påvirkes aldri

### Testrunde-batch (0.6.22): sidestilt-oppfølging

- [-] Menyplassering i sidestilt (Øverst/Midt på/Nederst) virker og påvirker IKKE topplinje-plasseringen (bytt tilbake til stripe og sjekk at punktene står der de sto)

### Testrunde-batch (0.6.21): nav-testrundens fikser og nav-utseende

- [ ] Bildeutsnitt (bredde) på nav-bakgrunnsbildet: virker i sidestilt kolonne (der høyde-slideren naturlig ikke monner); begge sliderne vises for alle varianter

### Testrunde-batch (0.6.17): flytende over hero, glød-tilvalg, lys/mørk-bryter

- [ ] Bryteren på mobil: vises ved siden av burgeren; menylisten står fortsatt riktig plassert på desktop (høyre/midtstilt/venstre) med og uten bryter

### Testrunde-batch (0.6.15): dropdown-menyer og mobilmeny


- [ ] Mobilmeny: bytt preview til mobil (og test på den publiserte siden i smalt vindu/telefon) - burger vises, panelet åpner under menyen, undermenyer er trekkspill, Escape/klikk utenfor lukker
- [ ] Slett en side som ligger i en undermeny og bekreft at undermenypunktet forsvinner (en åpner som mister alle barna fjernes helt). Slett en side som et punkt MED undermeny peker på: punktet består som ren åpner og barna beholdes (buggjakt-fiks 22. juli 2026)

### Testrunde-batch (0.6.14): kart-forbedringer

- [ ] Kart adressesøk: skriv en vanlig adresse (f.eks. «Storgata 1, Oslo») i «⚙ Sted» og klikk «Bruk» - stedet slås opp og vises (krever den PUBLISERTE siden; koordinater og OSM-lenker virker også lokalt)
- [ ] Kartet vises nå ut av boksen på den publiserte siden (OSM er lagt i Urds _headers frame-src); ingen manuell CSP-jobb lenger. Bekreft at kartet faktisk viser etter publisering + deploy
- [ ] CSP-vokter-fiks: hvis kartet likevel blokkeres (annen host) får besøkende en «Åpne kartet på OpenStreetMap»-lenke i stedet for et brukket bilde; editoren får instruksen. (Rettet også en variabel-skygging fra 0.6.12 som ville kastet feil her)

## Eldre punkter uten batch

- [ ] Fargevelger-fiksen (0.6.10): klikk inne i fargevelgeren (fargeruten, feltene, prikkene) lukker den IKKE lenger; den lukkes kun ved klikk utenfor, Escape eller ved å klikke fargeruten igjen. Gjelder Tema, Nav, bakgrunnslag og oppsett
- [ ] M4 Skjema: «Kontaktskjema»-mal, sett mottaker i «⚙ Skjema», test mailto-innsending på den PUBLISERTE siden (preview validerer bare); test feltredigering (legg til/fjern/type/påkrevd), e-postvalidering og honeypot; test eksternt endepunkt om du har et
- [ ] M4 Kart: «Finn oss»-mal, lim inn koordinater i «⚙ Sted»; bekreft CSP-blokkert-melding FØR du legger `frame-src https://www.openstreetmap.org` i `template/_headers`, og at kartet vises ETTER at linjen er lagt inn og publisert
- [ ] M3 Kalender: feed-henting i produksjon med en ekte Google-kalender-id (fungerte i preview med eksempeldata; produksjon krever functions, og andre verter enn Google krever ICS_HOSTS)