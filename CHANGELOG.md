# Endringslogg

Alle vesentlige endringer i Urd dokumenteres i denne filen.

Formatet følger [Keep a Changelog](https://keepachangelog.com/no/1.1.0/),
og prosjektet følger [semantisk versjonering](https://semver.org/lang/no/).

## [Ulansert]

### Lagt til
- Angre/gjenta i editoren (Ctrl+Z / Ctrl+Shift+Z) for alle handlinger: flytt, resize, blokker og seksjoner inn/ut, seksjonshøyde, grid-endringer og forkast. Fungerer også når fokus står i forhåndsvisningen.
- «+ Form»-meny med strek, pil, sirkel, rektangel og trekant.
- «Ren visning»-knapp som skjuler alle editeringshåndtak og hele topplinjen (siden ses i full høyde); flytende Rediger-knapp tar deg tilbake.
- Klikk-markering av blokker: varig omriss og synlige håndtak til man klikker utenfor.

### Lagt til
- Målseksjon: paletten legger nye blokker i sist klikkede seksjon (markert med aksentlinje), ikke alltid første.
- Grid per seksjon: «Eget grid for valgt seksjon» i grid-menyen (overstyrer nettstedets grid som snappeverktøy i den seksjonen).
- Strammet CSP i `_headers` (script/style/connect kun 'self'); boot-skriptet flyttet til `assets/engine/boot.js`.
- Bildeblokk med opplasting: «+ Bilde» komprimerer til webp i nettleseren (maks 1600px, med størrelsesvarsel), viser bildet umiddelbart i utkastet, og publiserer det som fil i media/ i samme commit (samme bilde gir alltid samme filnavn). Valgfri lenke gjør blokken brukbar som logo.
- z-orden: ⬆/⬇-knapper på blokkverktøylinjen legger blokken foran/bak andre.
- Tekstblokker vokser automatisk med innholdet under skriving; framen (og seksjonen ved behov) utvides så tekst aldri klippes eller overlapper.
- Kvalitetsvern på repoet: CI-workflow (tester, skjemavalidering, editor-bygg), CodeQL, Dependabot (npm + actions) og dependency review. Skjemavalidering er nå `npm run validate` i editor/ (eget ajv-skript, ingen sårbare CLI-avhengigheter).

### Endret
- **Gridet er nå kvadratisk med én innstilling: rutestørrelse i px** (slider i menyen; mindre = tettere). Kolonner/radhøyde og all forklaringstekst er borte. site.json er schemaVersion 2 og sidefiler schemaVersion 3 (seksjonenes grid-overstyr konverteres); eldre filer OG gamle localStorage-utkast løftes automatisk.
- **Sidefiler er nå schemaVersion 2: blokkplassering lagres i fysiske enheter** (x/w i prosent av seksjonsbredden, y/h i px) i stedet for grid-enheter. Gridet er dermed KUN et snappeverktøy: å endre kolonner/radhøyde flytter aldri innhold. v1-filer løftes automatisk ved lasting (`liftPageFile` i migrate.js), Urds første reelle filmigrering, testet i `tests/page-migration.test.mjs`.

### Lagt til
- Shift holdt inne under dra/resize gir midlertidig fri plassering (overstyrer snap).

### Lagt til
- «Tilpass høyden til innholdet» (⤓) på seksjonsverktøylinjen: setter seksjonshøyden til nederste blokkkant med ett klikk, lagret gjennom vanlig utkastflyt. Gir auto-vekst på forespørsel nå som seksjoner aldri vokser av seg selv.

### Endret
- **Blokker kan bevisst henge over seksjonslinjen:** seksjoner klipper aldri innhold (heller ikke for besøkende), og seksjonshøyden er nøyaktig den brukeren har satt (motoren tvangs-utvider ikke lenger). Dette fjernet også avviket mellom editor og publisert side for overhengende blokker. Sidescrolling fra roterte/overhengende blokker hindres med overflow-x: clip.

### Fikset
- Robusthet mot GitHub-nedetid: 5xx/429 fra GitHub-API-et prøves automatisk på nytt, «GitHub er nede» skilles nå fra «ugyldig innlogging» (en GitHub-hikke så tidligere ut som at man ble logget ut av admin), og feilmeldinger kortes ned i stedet for å vise GitHubs HTML-feilsider.
- «+ Ny seksjon»-barene tok plass i flyten og forskjøv seksjonene i editoren i forhold til hvordan besøkende ser dem; de svever nå oppå selve skillet (null høyde i layouten), så høyde-linje, bar og fargeskift ligger på samme sted.
- Seksjonsverktøylinjen (↑ ↓ ×, der × sletter seksjonen) vises nå også når seksjonen er valgt, ikke bare ved hover, og ligger alltid øverst.
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
