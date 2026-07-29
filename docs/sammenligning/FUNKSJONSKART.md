# Funksjonskart: Urd mot de andre nettsidebyggerne

Helhetlig funksjonssammenligning gjort 22.-23. juli 2026 (midt i v0.6 «Økosystem»): hva har de andre byggerne, hva bor inni funksjonene deres, og hva bør Urd ha? Fakta om de andre byggerne er hentet via kildebelagt web-research (leverandørdokumentasjon der mulig, kryssverifisert med tre uavhengige kontrollører per påstand); Urd-siden er inventaret fra samme dato. Kartet er et øyeblikksbilde: leveringsstatus for anbefalingene eies av [BACKLOG.md](../BACKLOG.md), og «levert»-merkene er lagt til i ettertid (siste gjennomgang 29. juli 2026, med milepæl-referansene oversatt til dagens backlog-numre).

**Byggere i sammenligningen:** Squarespace, Wix (inkl. Wix Studio), Webflow, Framer, Carrd, Google Sites, Shopify (butikk-referanse), WordPress/Gutenberg (+ Elementor), Publii, Ghost, Blogger, GrapesJS/Silex.

**Kildemerking:** «verifisert» = kryssverifisert mot leverandørdok (3-0 stemmer); «kilde: dok/blogg» = kildefestet men ikke kryssverifisert; «generell kunnskap» = velkjent produktfakta uten fersk kildekontroll (gjelder særlig WordPress/Gutenberg, Ghost, Carrd, Google Sites, Blogger og Shopify, der researchen ga tynnest dekning).

**Klassifisering per funn:**
- **A - Urd har** (paritet eller bedre)
- **B - Planlagt** (med milepæl: 0.6.6-0.6.9 i v0.6, v0.7-v0.9, etter v1.0)
- **C - Mangler, bør vurderes** (anbefalingene, samlet og prioritert nederst)
- **D - Bevisst utenfor scope** (krever server/avhengigheter; Urd er statisk og avhengighetsfri)

---

## 1. Teksteditor

**De andre byggerne:** Squarespace/Wix/Gutenberg gir per-markering fontvalg, størrelse og farge i verktøylinjen; Gutenberg har i tillegg linjeavstand, bokstavavstand, kapitéler og «drop cap» per blokk (generell kunnskap). Framers typografi er bygget på globale tekststil-tokens: én navngitt stil samler font/størrelse/vekt/linjeavstand/farge, kan overstyre størrelse, linjeavstand, bokstavavstand og avsnittsavstand PER BREAKPOINT, og endringer forplanter seg til alt som bruker stilen (verifisert). Ghost/Blogger er markdown-/flyt-orienterte med enklere verktøylinjer (generell kunnskap).

**Urd i dag (A):** flytende verktøylinje på markeringen: avsnitt/overskrifter, fet/kursiv/understrek/gjennomstreking, temafarger + egendefinert farge med pipette, utheving, lenke (ekstern/intern/mailto), justering, punkt-/nummerliste, sitatblokk, fjern formatering. Font og grunnstørrelse per felt i Egenskaper (7 fontstabler, S/M/L/XL + fritt px). Sanert HTML-delmengde.

**Gap:** linjeavstand og bokstavavstand (**C1**, levert 0.6.6.2). Framers responsive tekststiler er i praksis Urds temafonter + per-felt-størrelse; en lettvekts mellomting kan vurderes ved 0.6.6-seksjonstemaene (notat, ikke eget punkt). Dynamisk tekst (CMS-flettefelt) hører til samlingsvisningene og dekkes der (A).

## 2. Elementbiblioteket

**De andre byggerne:** Squarespace har 35-45 blokktyper: tekst/markdown/sitat/linje, bilde/video/lyd/galleri, skjema/knapp/søk/kalender/diagram, produkt/donasjon/meny/reservasjon, Instagram/Flickr/SoundCloud/embed/delingslenker/RSS, kart/arkiv/sammendrag/emneord/nyhetsbrev/form (kilde: dok; eksakt antall ikke verifisert). Galleri- og sammendragsblokkene har fire visninger hver (karusell/rutenett/lysbilde/stabel hhv. karusell/rutenett/liste/vegg) - karusell er altså en VISNING, ikke eget element (kilde: dok). Kode-/embed-blokker er betalingsgatet hos Squarespace (kilde: dok). Wix/Elementor har tilsvarende brede biblioteker med accordion, tabs, nedtellere og sosiale feeds (generell kunnskap). Squarespace anbefaler maks 60 blokker per side (kilde: dok).

**Urd i dag (A):** tekst, tekstboks, knapp, bilde, ikon, form (linje/pil/sirkel/rektangel/trekant), video (YouTube/Vimeo personvern), samling (kort/liste/arkiv) + plugin-blokkene kalender/skjema/kart. 23 seksjonspresets.

**Gap:** galleri med flere visninger (**C2**, levert 0.6.6.1), tabell (**C8**), delingsknapper (**C9**), nedteller (**C9**), lyd/audio (**C10**), FAQ-akkordeon (levert 0.6.6.4). Sosiale feeds og søk krever tredjepart/server (D). Embed/kodeblokk: sanitizeren stripper aktivt innhold med vilje; mønsteret er plugin + CSP-opt-in (D som kjerneblokk, A som plugin-mulighet).

## 3. Design- og layoutverktøy

**De andre byggerne:** Webflow er målestokken: Style-panelet eksponerer ni CSS-seksjoner (Layout/Spacing/Size/Position/Typography/Backgrounds/Borders/Effects/Custom properties) med full display- og posisjonsmodell, stiler per tilstand (hover/fokus), auto-opprettede gjenbrukbare klasser med kombo-arv, og synlig kaskade (arvemeny + fargekodede kilder) (verifisert). Sju faste breakpoints med toveis kaskade fra desktop; kun stiler er per-breakpoint, aldri elementrekkefølge (verifisert). Wix Studio har lag-panel og en innebygd skanner som finner responsive designfeil (kilde: dok); sidestiler per breakpoint og variable fonter er ÅPNE ønsker der, ikke levert (kilde: dok). Squarespace er grid-låst (elementer snapper til rutenettet) og fikk «Mobile Overrides» (uavhengig mobiljustering) først i mai 2026 (kilde: blogg) - Urds auto/manuell mobil-modell er altså foran. GrapesJS (rammeverket bak Silex) har blokk-/stil-/lag-/asset-managere og enhetsforhåndsvisning i kjernen (kilde: dok).

**Urd i dag (A):** seksjoner + fri plassering på snap-grid med lag og rotasjon, smart-guides, tastaturflytting, dupliser, full angre, per-seksjon grid, desktop + mobil med auto-stabling, manuell overstyring og mobil-tilsyn (Urds svar på Wix Studios responsive-skanner).

**Planlagt (B):** multimarkering med kopier/lim og align/distribute, hjelpelinjer, sticky blokker, «+ ny blokk» der man klikker, seksjonshøyde ovenfra, boks-/kortstiler, seksjonstemaer, gradient-editor (0.6.6, siden levert i 0.6.6.3/0.6.6.4); lagpanel (0.6.6-strekk); mobil-revurdering (v0.7). Nettbrett-breakpoint er bevisst utsatt (VEIKART) - Webflows sju-breakpoint-modell er motsatsen, men Urds to + auto-stabling er et bevisst enkelhet-valg (D/besluttet).

**Gap:** gjenbrukbare komponenter/symboler (Webflow symbols, Framer components) - nærmeste planlagte er «Lagre som mal» (0.6.7); et lettere «lagre blokkgruppe som gjenbrukbar» kan vurderes der (notat under C12).

## 4. Media

**De andre byggerne:** galleriene (se kategori 2) med lightbox er standard overalt; video-BAKGRUNNER finnes hos Wix/Squarespace (kilde: blogg/generell kunnskap); mediebibliotek-paneler med filoversikt er standard hos alle store; Silex/11ty krever manuell plugin-konfig for responsive bilder (kilde: dok); Webflow CMS-bilder maks 4MB, kun ekstern video-URL (verifisert).

**Urd i dag (A):** delt bildeeditor (fokus/zoom/form/filtre/gitter), webp-komprimering automatisk, git-eid media med innholdshash, fem bakgrunnslag-typer inkl. bilde med blur/mønster, ikon-editor.

**Planlagt (B):** lightbox og hero-galleri (0.6.6, siden levert i 0.6.6.1), duotone/palett-fra-bilde (0.6.6-strekk), srcset/AVIF/lazy (v0.8), R2-lagring (etter v1.0).

**Gap:** video-bakgrunnslag (**C6**), galleri-blokk (**C2**, levert 0.6.6.1), mediebibliotek-panel med oversikt over media/ og ubrukte filer (**C11**).

## 5. Nav, header og footer

**De andre byggerne:** megamenyer (flerkolonne-dropdown) hos Squarespace (premium) og Wix (generell kunnskap); scroll-adferd (krympende/skjulende header, transparent som blir solid ved scroll) er standard hos Squarespace/Webflow/Framer (generell kunnskap). Lys/mørk-bryter på publisert side er et ÅPENT ønske hos Wix Studio (kilde: dok) - Urd leverte det 22. juli 2026.

**Urd i dag (A):** fire varianter (stripe, flytende pille med glød/luft-valg, sidestilt venstre/høyre), dropdown-undermenyer (ARIA disclosure), mobilmeny, lys/mørk-bryter (foran Wix Studio her), logo tekst/bilde/begge, bakgrunnsfarge/-bilde med styrke/utsnitt, fire hover-stiler, sticky, transparent over hero.

**Planlagt (B):** footer med kolonner og sosiale lenker (0.6.6, siden levert i 0.6.33 + 0.6.6.5.2).

**Gap:** scroll-adferd for nav (**C7**); megameny (notat - vurderes først hvis reelle sider trenger det).

## 6. SEO og metadata

**De andre byggerne:** dette er standardpakken ALLE de store har: per-side tittel/beskrivelse, og:image/Twitter-kort, automatisk sitemap.xml, robots-kontroll, canonical, 301-redirects med UI (Webflow/Wix/Squarespace: kilde dok/blogg; verifisert for Webflow-feltbinding: CMS-felt kan bindes rett inn i per-side SEO/OG/RSS-innstillinger). Wix har SEO-veiviser; Webflow genererer sitemap automatisk og har redirect-håndtering (kilde: blogg). Publii (statisk, som Urd) leverer også full SEO-pakke (generell kunnskap).

**Urd i dag:** dokumenttittel per side, html-lang, admin-noindex, streng CSP - og ellers ingenting. Dette er Urds klart største hull målt mot ALLE de andre byggerne, også de statiske.

**Planlagt (B):** bakt HTML ved publisering (v0.8) - som gjør meta-taggene fullverdige for alle crawlere.

**Gap: SEO-grunnpakken (C3, høyeste prioritet):** per-side beskrivelse + og-felter i Sider-panelet, generert sitemap.xml + robots.txt ved publisering, 404-side, canonical. Redirects-håndtering som eget oppfølgingspunkt (**C13**, hostspesifikk fil).

## 7. Skjemaer og data

**De andre byggerne:** feltbiblioteker med nedtrekk, avkryssing, radio, dato og filopplasting; innsendinger lagres i byggerens dashbord med e-postvarsling (alle store; generell kunnskap).

**Urd i dag (A):** skjema-plugin med redigerbare felt (tekst/e-post/melding, påkrevd-flagg), validering, honeypot, mailto eller eksternt endepunkt.

**Gap:** flere felttyper: nedtrekk, avkryssing, radio, dato (**C5** - kassen i v0.7-butikken gjenbruker dem). Innsendingslagring og filopplasting krever server (**D**; eksternt endepunkt er broen).

## 8. Blogg, CMS og samlinger

**De andre byggerne:** Webflow CMS: 16 felttyper inkl. referanse/multireferanse (ekte relasjoner), auto-genererte innslagssider (én URL per innslag fra én mal), felt bundet inn i SEO/OG/RSS per side (verifisert); grenser i praksis: 10 000 innslag per side-abonnement, 5 elementer per nøstet liste (kilde: forum). Wix CMS: 30+ felttyper, dynamiske liste-/innslagssider med felt-variabler i URL-slugs, dataset-binding, utkast/publisert-status MED TIDSPLANLAGT statusbytte, CSV-import/-eksport, rollebaserte samlingstillatelser (verifisert/kilde: dok). Framer CMS: markdown inn/ut, redigering direkte på publisert side, besøkende-filtre (ni kontrolltyper), betingede detaljsider (verifisert). Ghost: publiseringsflyt med planlagt publisering, RSS, medlemskap/nyhetsbrev (generell kunnskap).

**Urd i dag (A):** samlinger med fire typer og tre visninger, rike felt, inline-redigering, git-eid data, utkast på tvers av sider, historikk/angre, konfliktvarsel. Ingen kunstige tak (git er grensen).

**Planlagt (B):** flerspråklig innhold (etter v1.0).

**Gap:** RSS-feed generert ved publisering (**C4** - statisk XML, billig og standard overalt); innslagssider/permalenker per innslag (**C4b** - hører naturlig sammen med v0.8-bakingen, à la Webflows mal-genererte sider); CSV-import/-eksport for samlinger (**C12** - Wix-paritet, nyttig for butikk-katalogen i v0.7); planlagt publisering (notat: statisk vert kan ikke tidsstyre; nærmeste er publiser-ved-dato-filter i visningene - lav prioritet).

## 9. Butikk

**De andre byggerne:** Shopify er målestokken (full varelager/frakt/skatt/gateway; generell kunnskap). Wix: varelager, produktvalg, digitale varer, abonnement, forlatt-kurv-e-post, 0 % transaksjonsgebyr (kilde: blogg). Webflow: produkt-/kategorisider, kurv, kasse, Stripe/PayPal, 2 % gebyr på laveste plan (kilde: blogg). Framer: INGEN innebygd butikk - tredjeparts embed er eneste vei (kilde: blogg). Squarespace: ubegrensede produkter, forlatt kurv, 2 %/0 % etter plan (kilde: blogg).

**Urd (B, v0.7):** produktkort med varianter, kurv, kasse-som-bestillingsskjema, Vipps-instruks - bevisst uten gateway (ApeironLF-modellen). Ekte betalingskasse: etter v1.0 ved behov (B/D). Framer-funnet viser at «ingen butikk» er vanlig selv hos store; Urds skjema-kasse er allerede mer enn Framer har.

## 10. Animasjoner og effekter

**De andre byggerne:** Webflow Interactions (tidslinjebaserte, scroll-scrub, mus-følging) er toppen; Wix har parallax og video-bakgrunner som designeffekter (kilde: blogg); Squarespace gater blokk-animasjoner bak Fluid Engine (verifisert); Framer har innebygde effekter/spring-animasjoner (generell kunnskap).

**Urd i dag (A):** inngangsanimasjoner (ton inn/gli opp/zoom inn med varighet/forsinkelse), hover-løft, animert gradient, reduced-motion, plugin-utvidbart.

**Gap:** parallax-bakgrunnslag og stagger/forsinkelsesrekke for kortgrupper (**C7b**, levert 0.6.6.4 del 2); scroll-scrub à la Webflow er overkill for målgruppen (D/notat).

## 11. Maler

**De andre byggerne:** Squarespace ~200 maler (kilde: blogg), alle store har malbytte og galleri; Publii har innebygd temabibliotek (kilde: dok); GrapesJS/Silex leverer maler via plugin-økosystem (kilde: dok).

**Urd i dag (A):** 23 seksjonspresets i velger; malen-repoet er utgangspunktet.

**Planlagt (B):** «Lagre som mal», maler som plugins, søk i blokkvelgeren (0.6.7; GitHub-topics hører til 0.6.9-splitten); preset-miniatyrer (0.6.6, siden levert i 0.6.6.1); galleri-nettsted (etter v1.0). Dekket - ingen C.

## 12. Diverse: flerspråk, tilgjengelighet, analytics m.m.

**De andre byggerne:** analytics innebygd hos alle store (generell kunnskap); passordvern/medlemsområder hos Squarespace/Wix/Ghost (generell kunnskap); kodeinjisering gatet bak betalte planer hos Squarespace (kilde: dok); Wix Studio uten lys/mørk-støtte (kilde: dok).

**Urd i dag (A):** ARIA-korrekt nav, fokushåndtering, reduced-motion, personvern som standard (ingen sporing = ingen cookie-banner nødvendig - en FORDEL mot alle de store).

**Planlagt (B):** admin/besøkende-i18n nb+en (0.6.8).

**Utenfor scope (D):** innlogging/medlemsområde, fulltekstsøk, sanntid (dokumentert); kodeinjisering i kjernen (sanitizer-vernet; plugins er veien).

**Gap:** personvennlig analytics-oppskrift eller referanse-plugin (**C14** - Cloudflare Web Analytics/Plausible via CSP-opt-in, helt i Urds ånd); kontrast-varsel i Tema-panelet (**C15** - bygget og bevisst fjernet i 0.6.6.5.4: den levende forhåndsvisningen dekker lesbarheten). Passordvern: dokumenteres som verts-funksjon (Cloudflare Access), ikke bygges (D).

---

## Anbefalingene (C-funnene, prioritert)

| # | Anbefaling | Foreslått plassering | Begrunnelse |
|---|---|---|---|
| C3 | **SEO-grunnpakke**: per-side beskrivelse/og-felter i Sider-panelet, sitemap.xml + robots.txt generert ved publisering, 404-side, canonical | v0.7 (felt + filer nå; full crawler-effekt ved v0.8-bakingen) | Urds største hull; ALLE de andre byggerne har det, også statiske Publii. Foreninger vil finnes på Google |
| C2 | **Galleri-blokk** med rutenett/karusell/lysbilde-visning + lightbox | Levert 0.6.6.1 (galleri-blokk + lightbox + hero-galleri) | Galleriet er standardelementet hos alle; Squarespace-modellen (visning per blokk) passer Urds variants-mønster |
| C4 | **RSS-feed for samlinger** (statisk XML ved publisering) | v0.7 | Billig, statisk-vennlig, standard overalt; nyhetssamlingene fortjener abonnenter |
| C5 | **Flere skjema-felttyper** (nedtrekk, avkryssing, radio, dato) | v0.7 (før butikk-kassen, som gjenbruker dem) | Feltbiblioteket er tynt mot alle; ren utvidelse av eksisterende plugin |
| C1 | **Linjeavstand (+ evt. bokstavavstand)** per tekstfelt | Levert 0.6.6.2 | Eneste reelle hull i teksteditoren mot Squarespace/Gutenberg |
| C7 | **Nav scroll-adferd** (krymp/skjul ved scroll ned, vis ved scroll opp) | 0.6.6.5 (nav-design videre) | Standard hos alle store; naturlig fortsettelse av M5 |
| C7b | **Parallax-bakgrunnslag + stagger-animasjon** for kortgrupper | Levert 0.6.6.4 del 2 | Mest designverdi per innsats i animasjonskategorien |
| C6 | **Video-bakgrunnslag** (selvhostet mp4/webm-loop) | v0.7 | Wix/Squarespace-paritet; personvennlig når filen er git-eid (størrelsesgrense må settes) |
| C12 | **CSV-import/-eksport for samlinger** | v0.7 (sammen med butikk-katalogen) | Wix-paritet; senker terskelen for å flytte inn medlemslister/produkter |
| C4b | **Innslagssider** (permalenke-side per samlingsinnslag, generert ved publisering) | v0.8 (sammen med bakingen) | Webflow/Wix-modellen; forutsetter bakt HTML for å gi mening |
| C8 | **Tabell-blokk** | v0.7 | Vanlig element (åpningstider, prislister); ren blokk |
| C9 | **Delingsknapper + nedteller** (småblokker) | 0.6.6-strekk eller v0.7 | Billige, statisk-vennlige, ofte etterspurt av foreninger (arrangementer) |
| C14 | **Personvennlig analytics** (oppskrift eller referanse-plugin med CSP-opt-in) | v0.7 (flyttet dit sammen med SEO-punktet) | Alle store har analytics; Urds svar bør være personvennlig og valgfritt |
| C11 | **Mediebibliotek-panel** (oversikt over media/, ubrukte filer) | v0.8 (bildearbeidet) | Filhåndtering er usynlig i dag; hører til ytelsesfasen |
| C15 | **Kontrast-varsel i Tema-panelet** | Avvist: bygget og fjernet i 0.6.6.5.4 (forhåndsvisningen dekker lesbarheten) | Tilgjengelighet ved fargevalg; bygger rett på accent-text |
| C10 | **Audio-blokk** (HTML5, git-eid fil) | Forslag og Ideer | Nisje, men billig og statisk-vennlig |
| C13 | **Redirects-håndtering** (generert hostfil) | Må avklares (0.6.9-gaten: hostspesifikk, grenser mot Urd-eide filer) | Standard hos alle store, men rører _headers/vertsmodellen |

**Notater (ikke egne punkter):** komponent-/symbolgjenbruk vurderes under 0.6.7 «Lagre som mal»; megameny og scroll-scrub kun ved dokumentert behov; planlagt publisering begrenses av statisk vert (publiser-ved-dato-filter er nærmeste); nettbrett-breakpoint forblir bevisst utsatt.

**Styrker bekreftet av kartet (verd å si høyt):** mobil-tilsynet matcher Wix Studios responsive-skanner; lys/mørk-bryteren er foran Wix Studio; personvern-som-standard fjerner cookie-banner-behovet alle de store sliter med; git-eide data uten kunstige tak står seg mot Webflows 10 000-innslagsgrense og 4MB-bildegrense; migreringskontrakten (aldri knuse en side) har ingen motsvarighet hos noen av dem.
