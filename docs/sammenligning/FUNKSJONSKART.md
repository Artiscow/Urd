# Funksjonskart: Urd mot de andre nettsidebyggerne

Helhetlig funksjonssammenligning gjort 22.-23. juli 2026 (midt i v0.6 «Økosystem»): hva har de andre byggerne, hva bor inni funksjonene deres, og hva bør Urd ha? Fakta om de andre byggerne er hentet via kildebelagt web-research (leverandørdokumentasjon der mulig, kryssverifisert med tre uavhengige kontrollører per påstand); Urd-siden er inventaret fra samme dato. Kartet er et øyeblikksbilde: leveringsstatus for anbefalingene eies av [BACKLOG.md](../BACKLOG.md), og «levert»-merkene er lagt til i ettertid (siste gjennomgang 23. september 2026, med milepæl-referansene oversatt til dagens backlog-numre og tallene i «Urd i dag»-avsnittene talt på nytt mot motoren). Kartet fikk et tillegg 10. august 2026: kategori 13 (AI og agentverktøy) fantes ikke i den opprinnelige sammenligningen, og tilgjengelighetsvurderingen i kategori 12 er korrigert.

**Byggere i sammenligningen:** Squarespace, Wix (inkl. Wix Studio), Webflow, Framer, Carrd, Google Sites, Shopify (butikk-referanse), WordPress/Gutenberg (+ Elementor), Publii, Ghost, Blogger, GrapesJS/Silex.

**Kildemerking:** «verifisert» = kryssverifisert mot leverandørdok (3-0 stemmer); «kilde: dok/blogg» = kildefestet men ikke kryssverifisert; «generell kunnskap» = velkjent produktfakta uten fersk kildekontroll (gjelder særlig WordPress/Gutenberg, Ghost, Carrd, Google Sites, Blogger og Shopify, der researchen ga tynnest dekning).

**Klassifisering per funn:**
- **A - Urd har** (paritet eller bedre)
- **B - Planlagt** (med milepæl: v0.7-v0.9 eller etter v1.0; v0.6 ble sluppet 9. august 2026, så B-merkene med 0.6-numre er historikk og står med levert-merke)
- **C - Mangler, bør vurderes** (anbefalingene, samlet og prioritert nederst)
- **D - Bevisst utenfor scope** (krever server/avhengigheter; Urd er statisk og avhengighetsfri)

---

## 1. Teksteditor

**De andre byggerne:** Squarespace/Wix/Gutenberg gir per-markering fontvalg, størrelse og farge i verktøylinjen; Gutenberg har i tillegg linjeavstand, bokstavavstand, kapitéler og «drop cap» per blokk (generell kunnskap). Framers typografi er bygget på globale tekststil-tokens: én navngitt stil samler font/størrelse/vekt/linjeavstand/farge, kan overstyre størrelse, linjeavstand, bokstavavstand og avsnittsavstand PER BREAKPOINT, og endringer forplanter seg til alt som bruker stilen (verifisert). Ghost/Blogger er markdown-/flyt-orienterte med enklere verktøylinjer (generell kunnskap).

**Urd i dag (A):** flytende verktøylinje på markeringen: avsnitt/overskrifter, fet/kursiv/understrek/gjennomstreking, temafarger + egendefinert farge med pipette, utheving, lenke (ekstern/intern/mailto), justering, punkt-/nummerliste, sitatblokk, fjern formatering. Font og grunnstørrelse per felt i Egenskaper (7 fontstabler, S/M/L/XL + fritt px). Sanert HTML-delmengde.

**Gap:** linjeavstand og bokstavavstand (**C1**, levert 0.6.6.2). Framers responsive tekststiler er i praksis Urds temafonter + per-felt-størrelse; en lettvekts mellomting er fortsatt bare et notat, ikke eget punkt (seksjonstemaene fra 0.6.6 er levert uten den). Tekst kan krympe i stedet for å brekke ved smalere skjerm (`fit: "shrink"` med minste skala, levert 0.7.17.2). Dynamisk tekst (CMS-flettefelt) hører til samlingsvisningene og dekkes der (A).

## 2. Elementbiblioteket

**De andre byggerne:** Squarespace har 35-45 blokktyper: tekst/markdown/sitat/linje, bilde/video/lyd/galleri, skjema/knapp/søk/kalender/diagram, produkt/donasjon/meny/reservasjon, Instagram/Flickr/SoundCloud/embed/delingslenker/RSS, kart/arkiv/sammendrag/emneord/nyhetsbrev/form (kilde: dok; eksakt antall ikke verifisert). Galleri- og sammendragsblokkene har fire visninger hver (karusell/rutenett/lysbilde/stabel hhv. karusell/rutenett/liste/vegg) - karusell er altså en VISNING, ikke eget element (kilde: dok). Kode-/embed-blokker er betalingsgatet hos Squarespace (kilde: dok). Wix/Elementor har tilsvarende brede biblioteker med accordion, tabs, nedtellere og sosiale feeds (generell kunnskap). Squarespace anbefaler maks 60 blokker per side (kilde: dok).

**Urd i dag (A, talt 23. september 2026):** 19 kjerneblokker: tekst (med boks-stil), knapp, bilde, ikon, form (linje/pil/sirkel/rektangel/trekant), video (YouTube/Vimeo personvern), galleri (rutenett/karusell/lysbilder), samling (kort/liste/arkiv), FAQ, tidslinje, sitat, statistikk, tabell, deling, nedteller, lyd, produkt, handlekurv og kasse, pluss plugin-blokkene kalender/skjema/kart. 30 seksjonspresets i kjernen (33 i velgeren med de tre plugin-presetene) og fem referanse-plugins (kalender, skjema, kart, analyse og språkpakken lang-sv).

**Gap:** galleri med flere visninger (**C2**, levert 0.6.6.1), tabell (**C8**, levert 0.7.4), delingsknapper (**C9**, levert 0.7.4), nedteller (**C9**, levert 0.7.4), lyd/audio (**C10**, levert 0.7.4), FAQ-akkordeon (levert 0.6.6.4). Restene fra elementgjennomgangen (bånd/marquee, sideindeks, flere gallerivisninger, stiliserte varianter) eies av 0.7.13, som skriver radene C19-C25 i etappe 0.7.13.2. Sosiale feeds og søk krever tredjepart/server (D). Embed/kodeblokk: sanitizeren stripper aktivt innhold med vilje; mønsteret er plugin + CSP-opt-in (D som kjerneblokk, A som plugin-mulighet).

## 3. Design- og layoutverktøy

**De andre byggerne:** Webflow er målestokken: Style-panelet eksponerer ni CSS-seksjoner (Layout/Spacing/Size/Position/Typography/Backgrounds/Borders/Effects/Custom properties) med full display- og posisjonsmodell, stiler per tilstand (hover/fokus), auto-opprettede gjenbrukbare klasser med kombo-arv, og synlig kaskade (arvemeny + fargekodede kilder) (verifisert). Sju faste breakpoints med toveis kaskade fra desktop; kun stiler er per-breakpoint, aldri elementrekkefølge (verifisert). Wix Studio har lag-panel og en innebygd skanner som finner responsive designfeil (kilde: dok); sidestiler per breakpoint og variable fonter er ÅPNE ønsker der, ikke levert (kilde: dok). Squarespace er grid-låst (elementer snapper til rutenettet) og fikk «Mobile Overrides» (uavhengig mobiljustering) først i mai 2026 (kilde: blogg) - Urds auto/manuell mobil-modell er altså foran. GrapesJS (rammeverket bak Silex) har blokk-/stil-/lag-/asset-managere og enhetsforhåndsvisning i kjernen (kilde: dok).

**Urd i dag (A):** seksjoner + fri plassering på snap-grid med lag og rotasjon, smart-guides, tastaturflytting, dupliser, full angre, per-seksjon grid, innhold bundet av en designbredde (ADR-0018, standard 1440, levert 0.7.2), desktop + mobil i radnettet (ADR-0019, levert 0.7.3: mobilen følger desktop automatisk, en overstyring gjelder per blokk og aldri hele seksjonen, og seksjonsmodusene auto/manuell er pensjonert) og mobil-tilsyn kun for seksjoner med overstyringer (Urds svar på Wix Studios responsive-skanner). Editoren viser fire enheter: Skjerm (eierens eget vindu eller en valgt redigeringsstørrelse, ADR-0018-tillegget 16. september 2026), laptop 1280, nettbrett 810 og mobil 390; Referanse 1920-enheten ble fjernet 23. september 2026.

**Planlagt (B):** multimarkering med kopier/lim og align/distribute, hjelpelinjer, sticky blokker, «+ ny blokk» der man klikker, seksjonshøyde ovenfra, boks-/kortstiler, seksjonstemaer, gradient-editor (0.6.6, siden levert i 0.6.6.3/0.6.6.4); lagpanel (0.7.9, flyttet dit 9. august 2026); mobil-revurdering (0.7.3, levert 13. august 2026 i ADR-0019). Nettbrett-breakpoint er bevisst utsatt (VEIKART) - Webflows sju-breakpoint-modell er motsatsen, men Urds to + radnettet er et bevisst enkelhet-valg (D/besluttet); mellom innholdsbredden og mobil-breakpointet gjelder skaleringsbåndet fra 0.7.17 (ADR-0018-tillegget 23. september 2026), der breddeoppførselen er beskrevet. Scaling below the content width and content push (0.7.17, 23 September 2026): the sections scale proportionally with CSS `zoom` down to a floor (the Tilda, Readymag and Wix Studio model, one mode and one number as the owner's control), and a block whose content grows pushes the blocks below by the Wix Editor's gap rules (**C26**, ADR-0024); a text block can shrink instead of wrapping (`fit: "shrink"`).

**Gap:** gjenbrukbare komponenter/symboler (Webflow symbols, Framer components) - nærmeste er «Lagre som mal» og «blokkgruppe som gjenbrukbar» (levert 0.6.7.3 og 0.6.7.5 etter snippets-modellen: innsatte grupper er uavhengige kopier, aldri synkede symboler); synkede symboler er fortsatt bare et notat, ikke eget punkt.

## 4. Media

**De andre byggerne:** galleriene (se kategori 2) med lightbox er standard overalt; video-BAKGRUNNER finnes hos Wix/Squarespace (kilde: blogg/generell kunnskap); mediebibliotek-paneler med filoversikt er standard hos alle store; Silex/11ty krever manuell plugin-konfig for responsive bilder (kilde: dok); Webflow CMS-bilder maks 4MB, kun ekstern video-URL (verifisert).

**Urd i dag (A):** delt bildeeditor (fokus/zoom/form/filtre/gitter), webp-komprimering automatisk, git-eid media med innholdshash, sju bakgrunnslag-typer (farge, gradient, glød, korn, bilde med blur/mønster, bildegalleri og video, det siste levert 0.7.7), mediegrenser satt i 0.7.7 (bilder og lyd varsler over 400 kB, video varsler ved 4 MB og avvises ved 15 MB), ikon-editor.

**Planlagt (B):** lightbox og hero-galleri (0.6.6, siden levert i 0.6.6.1), duotone/palett-fra-bilde (0.7.9, flyttet dit 9. august 2026), srcset/AVIF/lazy (v0.8, VEIKART), R2-lagring (etter v1.0).

**Gap:** video-bakgrunnslag (**C6**, levert 0.7.7), galleri-blokk (**C2**, levert 0.6.6.1), mediebibliotek-panel med oversikt over media/ og ubrukte filer (**C11**, v0.8).

## 5. Nav, header og footer

**De andre byggerne:** megamenyer (flerkolonne-dropdown) hos Squarespace (premium) og Wix (generell kunnskap); scroll-adferd (krympende/skjulende header, transparent som blir solid ved scroll) er standard hos Squarespace/Webflow/Framer (generell kunnskap). Lys/mørk-bryter på publisert side er et ÅPENT ønske hos Wix Studio (kilde: dok) - Urd leverte det 22. juli 2026.

**Urd i dag (A):** seks varianter (stripe, flytende pille med glød/luft-valg, flytende firkant, flytende fane, sidestilt venstre/høyre), dropdown-undermenyer (ARIA disclosure), mobilmeny, lys/mørk-bryter (foran Wix Studio her), logo tekst/bilde/begge, bakgrunnsfarge/-bilde med styrke/utsnitt, fem hover-stiler (standard, understrek, pille, løft uten og med glød), sticky, transparent over hero. Footeren (levert 0.6.33 og 0.6.6.5.2) har merkevare som tekst/bilde/begge, lenkekolonner, sosiale lenker, baseline og CTA (knapp eller nyhetsbrev, med stor sentrert variant), og åtte ferdige oppsett i malvelgeren (minimal, sentrert, kolonner, sidekart, nyhetsbrev, stor CTA, kontakt og mega). Size controls delivered in 0.7.15 (ADR-0023): thickness and text size (four presets plus free px), side padding, item spacing, align to content width (bar), floating menu width (px or the content width), a column width field for the side variant, shrink factor and logo shrink for the compact state, and mobile thickness, text size and logo size, plus border and shadow presets for the bar (**C18**, the same milestone).

**Planlagt (B):** footer med kolonner og sosiale lenker (0.6.6, siden levert i 0.6.33 + 0.6.6.5.2).

**Gap:** scroll-adferd for nav (**C7**, levert 0.6.6.5.12: `nav.scroll` med krymp/skjul); megameny (notat - vurderes først hvis reelle sider trenger det); border and shadow presets for the bar (**C18**, Squarespace's border S/M/L/custom with position and drop shadow Soft/Strong; delivered 0.7.15, 17 September 2026).

## 6. SEO og metadata

**De andre byggerne:** dette er standardpakken ALLE de store har: per-side tittel/beskrivelse, og:image/Twitter-kort, automatisk sitemap.xml, robots-kontroll, canonical, 301-redirects med UI (Webflow/Wix/Squarespace: kilde dok/blogg; verifisert for Webflow-feltbinding: CMS-felt kan bindes rett inn i per-side SEO/OG/RSS-innstillinger). Wix har SEO-veiviser; Webflow genererer sitemap automatisk og har redirect-håndtering (kilde: blogg). Publii (statisk, som Urd) leverer også full SEO-pakke (generell kunnskap).

**Urd i dag (A, levert 0.7.6 den 29. august 2026):** per-side beskrivelse og og-felter (tittel/beskrivelse/bilde) i Sider-panelets «Søk og deling»-gruppe; `seo.js` setter metabeskrivelse, canonical, og-feltene med fallback-trapp, X-kort og JSON-LD `Organization` hos besøkende; `feeds.js` skriver sitemap.xml og robots.txt ved hver publisering og RSS-feed for daterte samlinger; per-side noindex-flagg («Skjul fra søkemotorer»), varselmarkør for sider uten metabeskrivelse, Urd-eid statisk 404-side, dokumenttittel per side, html-lang, admin-noindex og streng CSP. Hullet fra juli 2026 (den gang bare tittel, lang, noindex og CSP) er tettet; full crawler-effekt kommer med bakt HTML i v0.8.

**Planlagt (B):** bakt HTML ved publisering (v0.8) - som gjør meta-taggene fullverdige for alle crawlere.

**Gap:** SEO-grunnpakken (**C3**: per-side beskrivelse + og-felter, sitemap.xml + robots.txt, 404-side, canonical; levert 0.7.6). Redirects-håndtering er eget oppfølgingspunkt (**C13**: eierskapet er avgjort i ADR-0015 den 5. august 2026 som generert `_redirects` over et host-nøytralt datalag; selve byggingen står igjen i v0.7).

## 7. Skjemaer og data

**De andre byggerne:** feltbiblioteker med nedtrekk, avkryssing, radio, dato og filopplasting; innsendinger lagres i byggerens dashbord med e-postvarsling (alle store; generell kunnskap).

**Urd i dag (A):** skjema-plugin med redigerbare felt (tekst/e-post/telefon/flerlinjes/nedtrekk/avkryssing/radio/dato, påkrevd-flagg), validering, honeypot, mailto eller eksternt endepunkt.

**Gap:** flere felttyper: nedtrekk, avkryssing, radio, dato (**C5**, levert 0.7.4; kassen i 0.7.5 gjenbruker dem). Innsendingslagring og filopplasting krever server (**D**; eksternt endepunkt er broen).

## 8. Blogg, CMS og samlinger

**De andre byggerne:** Webflow CMS: 16 felttyper inkl. referanse/multireferanse (ekte relasjoner), auto-genererte innslagssider (én URL per innslag fra én mal), felt bundet inn i SEO/OG/RSS per side (verifisert); grenser i praksis: 10 000 innslag per side-abonnement, 5 elementer per nøstet liste (kilde: forum). Wix CMS: 30+ felttyper, dynamiske liste-/innslagssider med felt-variabler i URL-slugs, dataset-binding, utkast/publisert-status MED TIDSPLANLAGT statusbytte, CSV-import/-eksport, rollebaserte samlingstillatelser (verifisert/kilde: dok). Framer CMS: markdown inn/ut, redigering direkte på publisert side, besøkende-filtre (ni kontrolltyper), betingede detaljsider (verifisert). Ghost: publiseringsflyt med planlagt publisering, RSS, medlemskap/nyhetsbrev (generell kunnskap).

**Urd i dag (A):** samlinger med fem typer (nyheter, oppslag, publikasjoner, produkter og egendefinert) og tre visninger (kort/liste/arkiv), rike felt, inline-redigering, git-eid data, utkast på tvers av sider, historikk/angre, konfliktvarsel, CSV-import/-eksport (0.7.5.1) og RSS-feed ved publisering for daterte samlinger (0.7.6). Ingen kunstige tak (git er grensen).

**Planlagt (B):** flerspråklig innhold (etter v1.0).

**Gap:** RSS-feed generert ved publisering (**C4**, levert 0.7.6: `content/samlinger/<id>.xml` for daterte samlinger); innslagssider/permalenker per innslag (**C4b** - hører naturlig sammen med v0.8-bakingen, à la Webflows mal-genererte sider); CSV-import/-eksport for samlinger (**C12**, levert 0.7.5.1 sammen med butikk-katalogen); planlagt publisering (notat: statisk vert kan ikke tidsstyre; nærmeste er publiser-ved-dato-filter i visningene - lav prioritet).

## 9. Butikk

**De andre byggerne:** Shopify er målestokken (full varelager/frakt/skatt/gateway; generell kunnskap). Wix: varelager, produktvalg, digitale varer, abonnement, forlatt-kurv-e-post, 0 % transaksjonsgebyr (kilde: blogg). Webflow: produkt-/kategorisider, kurv, kasse, Stripe/PayPal, 2 % gebyr på laveste plan (kilde: blogg). Framer: INGEN innebygd butikk - tredjeparts embed er eneste vei (kilde: blogg). Squarespace: ubegrensede produkter, forlatt kurv, 2 %/0 % etter plan (kilde: blogg).

**Urd i dag (A, levert 0.7.5.1 og 0.7.5.2 den 25. august 2026):** produktkatalog som samling (pris, medlemspris, badge, størrelser og farger med eget bilde), produktkort med variantchips og quick view i native `<dialog>`, handlekurv som blokk og i nav-en, kasse som bestillingsskjema (mailto eller endepunkt) med Vipps-nummer som instruks - uten gateway som kjernefunksjon (ApeironLF-modellen) - og et valgfritt betalingslag med Vipps Checkout gjennom sidens egen Pages-funksjon (ADR-0020). Butikk-gruppen i seksjonsvelgeren og startpakkene Butikk og Kasse. Framer-funnet viser at «ingen butikk» er vanlig selv hos store; Urds skjema-kasse er allerede mer enn Framer har.

## 10. Animasjoner og effekter

**De andre byggerne:** Webflow Interactions (tidslinjebaserte, scroll-scrub, mus-følging) er toppen; Wix har parallax og video-bakgrunner som designeffekter (kilde: blogg); Squarespace gater blokk-animasjoner bak Fluid Engine (verifisert); Framer har innebygde effekter/spring-animasjoner (generell kunnskap).

**Urd i dag (A):** inngangsanimasjoner (ton inn/gli opp/zoom inn med varighet/forsinkelse), hover-løft, animert gradient, parallax på bilde- og videolag, stagger for kortgrupper, reduced-motion, plugin-utvidbart.

**Gap:** parallax-bakgrunnslag og stagger/forsinkelsesrekke for kortgrupper (**C7b**, levert 0.6.6.4 del 2); scroll-scrub à la Webflow er overkill for målgruppen (D/notat).

## 11. Maler

**De andre byggerne:** Squarespace ~200 maler (kilde: blogg), alle store har malbytte og galleri; Publii har innebygd temabibliotek (kilde: dok); GrapesJS/Silex leverer maler via plugin-økosystem (kilde: dok).

**Urd i dag (A):** 30 seksjonspresets i kjernen (33 i velgeren med plugin-presetene) med miniatyrer, åtte innebygde side-startpakker, «Lagre som mal» for seksjoner, blokkgrupper og sider med publisering til content/maler/, og søk i blokkvelgeren (0.6.7); malen-repoet er utgangspunktet.

**Planlagt (B):** «Lagre som mal», maler som plugins og søk i blokkvelgeren (levert 0.6.7; topic-konvensjonen `urd-template`/`urd-plugin` festet 5. august 2026 i 0.6.9); preset-miniatyrer (levert 0.6.6.1); galleri-nettsted (etter v1.0). Dekket - ingen C.

## 12. Diverse: flerspråk, tilgjengelighet, analytics m.m.

**De andre byggerne:** analytics innebygd hos alle store (generell kunnskap); passordvern/medlemsområder hos Squarespace/Wix/Ghost (generell kunnskap); kodeinjisering gatet bak betalte planer hos Squarespace (kilde: dok); Wix Studio uten lys/mørk-støtte (kilde: dok).

**Urd i dag (A på utdata, C på editoren):** ARIA-korrekt nav, fokushåndtering, reduced-motion, personvern som standard (ingen sporing = ingen cookie-banner nødvendig - en FORDEL mot alle de store). KORRIGERT 10. august 2026: A-en gjaldt den PUBLISERTE siden, og der står den. Editoren er ikke i nærheten: `App.svelte` har 253 `<label>`-tagger og null `for`-attributter (talt på nytt 23. september 2026; 197 ved korrigeringen), `:focus-visible` finnes ikke i editor/src, og flere kontroller er knapp-baserte komponenter pakket i en `<label>`, som ikke gir dem noe tilgjengelig navn i det hele tatt. Se **C17** (0.7.11 Tilgjengelighetsrunden, ikke levert).

**Levert (A):** admin og besøkende på fem språk (nb, nn, en-GB, se og tr; 0.6.8, ADR-0012) med bokmål som fallback, og nye språk som språkpakke-plugin uten kode (lang-sv). Flerspråklig INNHOLD står igjen etter v1.0 (kategori 8).

**Utenfor scope (D):** innlogging/medlemsområde, fulltekstsøk, sanntid (dokumentert); kodeinjisering i kjernen (sanitizer-vernet; plugins er veien).

**Gap:** personvennlig analytics-oppskrift eller referanse-plugin (**C14**, levert 0.7.6 som referanse-pluginen `plugins/analytics/`: Cloudflare Web Analytics uten cookies, CSP-behov i manifestet, skipper deaktivert); kontrast-varsel i Tema-panelet (**C15**: varselet ble bygget og fjernet i 0.6.6.5.4, og behovet er løst i 0.7.12 med `contrast-color()` for teksten på aksentflatene og en Auto-chip i Tema-panelet). Passordvern: dokumenteres som verts-funksjon (Cloudflare Access), ikke bygges (D).

## 13. AI og agentverktøy (tillegg 10. august 2026)

Kategorien fantes ikke i sammenligningen 22.-23. juli 2026, fordi feltet så annerledes ut da. Den er lagt til fordi den ble et reelt skille i løpet av 2026.

**De andre byggerne:** to helt ulike former. (1) **Generatorer i nettsidebyggerne:** prompt til generert flersidig start til redigerbart lerret (Wix, Framer, Hostinger, Durable, GoDaddy, B12, Squarespace Blueprint); se ELEMENTKART 1.9 for leveringsmønstrene. (2) **MCP-servere i CMS-ene:** Sanity, Contentful, Storyblok, Strapi og Payload sendte alle MCP-servere i 2026, som lar en agentklient lese og redigere innhold direkte. Form 2 er det som faktisk ble bordet-innsats; form 1 er markedsføring så lenge alt uansett skal redigeres etterpå.

**Urd i dag (C):** ingenting. Null AI-, LLM- eller MCP-kode i repoet.

**Planlagt (B):** lokal, avhengighetsfri MCP-server i det klonede repoet ([ADR-0017](../adr/0017-ai-via-local-mcp-server.md), vedtatt 10. august 2026): lesedel i v0.8, skrivedel i v0.9. Eierens EGEN agentklient kobler seg til; Urd sender aldri noe selv og lagrer ingen nøkkel.

**Utenfor scope (D):** prompt-til-side-generator, og enhver ekstern AI-tjeneste som kjerneavhengighet.

**Gap:** **C16** (MCP-server). Merk at Urd har et strukturelt fortrinn her de fleste av de andre mangler: innholdet ER git-eide JSON-filer med skjema, så en agent trenger verken API-nøkkel, hostet endepunkt eller sesjon for å jobbe med det.

---

## Anbefalingene (C-funnene, prioritert)

| # | Anbefaling | Foreslått plassering | Begrunnelse |
|---|---|---|---|
| C3 | **SEO-grunnpakke**: per-side beskrivelse/og-felter i Sider-panelet, sitemap.xml + robots.txt generert ved publisering, 404-side, canonical | Levert 0.7.6 (felt, `seo.js`, sitemap/robots/404, noindex per side; full crawler-effekt ved v0.8-bakingen) | Urds største hull; ALLE de andre byggerne har det, også statiske Publii. Foreninger vil finnes på Google |
| C2 | **Galleri-blokk** med rutenett/karusell/lysbilde-visning + lightbox | Levert 0.6.6.1 (galleri-blokk + lightbox + hero-galleri) | Galleriet er standardelementet hos alle; Squarespace-modellen (visning per blokk) passer Urds variants-mønster |
| C4 | **RSS-feed for samlinger** (statisk XML ved publisering) | Levert 0.7.6 (`content/samlinger/<id>.xml` for daterte samlinger) | Billig, statisk-vennlig, standard overalt; nyhetssamlingene fortjener abonnenter |
| C5 | **Flere skjema-felttyper** (nedtrekk, avkryssing, radio, dato) | Levert 0.7.4 (kassen i 0.7.5 gjenbruker dem) | Feltbiblioteket er tynt mot alle; ren utvidelse av eksisterende plugin |
| C1 | **Linjeavstand (+ evt. bokstavavstand)** per tekstfelt | Levert 0.6.6.2 | Eneste reelle hull i teksteditoren mot Squarespace/Gutenberg |
| C7 | **Nav scroll-adferd** (krymp/skjul ved scroll ned, vis ved scroll opp) | Levert 0.6.6.5.12 (`nav.scroll`: shrink/hide, ren navScrollState) | Standard hos alle store; naturlig fortsettelse av M5 |
| C7b | **Parallax-bakgrunnslag + stagger-animasjon** for kortgrupper | Levert 0.6.6.4 del 2 | Mest designverdi per innsats i animasjonskategorien |
| C6 | **Video-bakgrunnslag** (selvhostet mp4/webm-loop) | Levert 0.7.7 (`backgrounds/video.js`, observer-styrt avspilling, mediegrensene) | Wix/Squarespace-paritet; personvennlig når filen er git-eid (størrelsesgrense må settes) |
| C12 | **CSV-import/-eksport for samlinger** | Levert 0.7.5.1 (sammen med butikk-katalogen) | Wix-paritet; senker terskelen for å flytte inn medlemslister/produkter |
| C4b | **Innslagssider** (permalenke-side per samlingsinnslag, generert ved publisering) | v0.8 (sammen med bakingen) | Webflow/Wix-modellen; forutsetter bakt HTML for å gi mening |
| C8 | **Tabell-blokk** | Levert 0.7.4 | Vanlig element (åpningstider, prislister); ren blokk |
| C9 | **Delingsknapper + nedteller** (småblokker) | Levert 0.7.4 | Billige, statisk-vennlige, ofte etterspurt av foreninger (arrangementer) |
| C14 | **Personvennlig analytics** (oppskrift eller referanse-plugin med CSP-opt-in) | Levert 0.7.6 (referanse-pluginen `plugins/analytics/`, Cloudflare Web Analytics) | Alle store har analytics; Urds svar bør være personvennlig og valgfritt |
| C11 | **Mediebibliotek-panel** (oversikt over media/, ubrukte filer) | v0.8 (bildearbeidet) | Filhåndtering er usynlig i dag; hører til ytelsesfasen |
| C15 | **Kontrast-varsel i Tema-panelet** | Løst annerledes: varselet ble bygget og fjernet i 0.6.6.5.4; `contrast-color()` på aksentflatene (0.7.12) gjør teksten lesbar uten varsel | Tilgjengelighet ved fargevalg; bygger rett på accent-text |
| C10 | **Audio-blokk** (HTML5, git-eid fil) | Levert 0.7.4 | Nisje, men billig og statisk-vennlig |
| C13 | **Redirects-håndtering** (generert hostfil) | Eierskap avgjort i ADR-0015 (5. august 2026: generert `_redirects` over et host-nøytralt datalag); byggingen står igjen i v0.7 | Standard hos alle store, men rører _headers/vertsmodellen |
| C16 | **MCP-server** (lokal, avhengighetsfri; lar eierens egen agentklient lese og redigere innholdet) | v0.8 lesing, v0.9 skriving (ADR-0017) | Ble bordet-innsats for et CMS i 2026 (Sanity, Contentful, Storyblok, Strapi, Payload); git-eid JSON gjør det billigere for Urd enn for dem |
| C17 | **Tilgjengelighet i editoren** (id/for-kobling, tilgjengelige navn på knapp-baserte kontroller, synlig fokus, tastaturvei) | 0.7.11 Tilgjengelighetsrunden | Utdata er alt sterkt, editoren er ikke; og forskrift om universell utforming av IKT treffer målgruppen direkte |
| C18 | **Border and shadow presets for the nav bar** (border S/M/L or custom thickness with position, drop shadow soft/strong) | Delivered 0.7.15 (17 September 2026) | The one Squarespace header control not covered by 0.7.15's size set; the transparent-to-solid colour on scroll stays under 0.7.13 |
| C26 | **Content that grows must push, and scaling below the content width** (the Wix Editor's push rules on the absolute frames, ADR-0024; proportional `zoom` of the sections down to a floor, ADR-0018 addendum; owner control: mode and smallest scale) | Delivered 0.7.17.2 (the stages 0.7.17.2 and 0.7.17.3, 23 September 2026; the two surveys in LAERDOMMER §2; the test-round follow-up 0.7.17.4 is open) | Text wrapped over the blocks beneath at every width narrower than the design; Squarespace grows grid rows, Wix pushes by gap rules, the stack builders hug; Urd keeps its frames and pushes |

**Notater (ikke egne punkter):** komponent-/symbolgjenbruk: blokkgrupper som uavhengige kopier er levert (0.6.7.5), synkede symboler er fortsatt bare et notat; megameny og scroll-scrub kun ved dokumentert behov; planlagt publisering begrenses av statisk vert (publiser-ved-dato-filter er nærmeste); nettbrett-breakpoint forblir bevisst utsatt: mellom innholdsbredden og mobil-breakpointet skaleres seksjonene proporsjonalt ned til et gulv (0.7.17, ADR-0018-tillegget 23. september 2026), og under gulvet er lerretet flytende igjen med innholdsdyttingen fra ADR-0024, så nettbrett får desktop-oppsettet i mindre skala, ikke et eget breakpoint.

**Styrker bekreftet av kartet (verd å si høyt):** mobil-tilsynet matcher Wix Studios responsive-skanner; lys/mørk-bryteren er foran Wix Studio; personvern-som-standard fjerner cookie-banner-behovet alle de store sliter med; git-eide data uten kunstige tak står seg mot Webflows 10 000-innslagsgrense og 4MB-bildegrense; migreringskontrakten (aldri knuse en side) har ingen motsvarighet hos noen av dem.
