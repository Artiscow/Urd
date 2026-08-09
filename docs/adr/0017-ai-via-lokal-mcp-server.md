# ADR-0017: Valgfri AI-integrasjon via lokal MCP-server

Dato: 10. august 2026. Status: vedtatt (v0.7; lesedelen bygges i v0.8, skrivedelen i v0.9).

## Kontekst

«Ekstern AI-tjeneste» har til nå stått ett sted i prosjektet: i [ELEMENTKART.md](../sammenligning/ELEMENTKART.md) del 7, som en avvist kjerneavhengighet, med AI-veiviseren som laveste prioritet i del 5a med begrunnelsen «krever ekstern tjeneste, mot avhengighetsfri». Feltet har flyttet seg siden kartet ble skrevet 27. juli 2026. I 2026 sendte Sanity, Contentful, Storyblok, Strapi og Payload alle MCP-servere, og en MCP-server er blitt bordet-innsats for et CMS: den lar eierens egen agentklient (Claude Code, VS Code, Cursor) lese og redigere innhold direkte.

Det endrer premisset for avvisningen. Innvendingen gjaldt en ekstern TJENESTE som Urd avhenger av. En MCP-server er ikke det: den er en lokal prosess i eierens eget klonede repo, som ikke ringer noe sted, ikke lagrer noen nøkkel og ikke er del av den bygde siden. Modellen er eierens egen, valgt av eieren, kjørt av eierens egen klient. Urd blir aldri et mellomledd.

Urd er dessuten uvanlig godt posisjonert for dette. Det klonede repoet ER nettsiden (ADR-0004), innholdet er JSON med skjemaer i `schema/`, seksjonene bygges av navngitte presets, og publiseringsvokteren i `template/functions/_lib/guard.js` er allerede nøyaktig den tillatelsesmodellen en agent skal ha: innhold, aldri kode. Mesteparten av en MCP-server for Urd er et tynt lag over ting som finnes fra før.

To alternative veier ble vurdert og valgt bort for nå. En AI-assistent inne i `/admin` mot et brukerkonfigurert endepunkt forutsetter et utvidelsespunkt admin ikke har (`provides` i plugin-manifestet leverer blokker, presets, bakgrunner og maler til SIDEN, ikke paneler til admin) og reiser nøkkelforvaltning som egen sikkerhetsanalyse. Nettleserens innebygde AI (Chromes lokale modell) er billig og personvernvennlig, men Chromium-only, og de mest fristende API-ene (Writer, Rewriter, Proofreader) er i origin trial og dermed ikke stabile.

## Beslutning

1. **AI er alltid valgfritt og alltid utenfor kjernen.** Ingen Urd-funksjon, ingen bygget side, ingen publisering, ingen test og ingen editor-flate skal avhenge av en LLM. Slettes `mcp/`-mappa, virker Urd bit for bit uendret. Invarianten gjøres maskinelt sjekkbar: ingenting utenfor `mcp/` og dens egne tester importerer fra `mcp/`, og CI kjører aldri serveren som del av bygg eller publisering. Den reelle faren er ikke en `import`, men gradvis lening, så oppsettsguiden plasserer kapitlet under «valgfritt» og aldri i hovedflyten.

2. **Primærveien er en lokal MCP-server i `template/mcp/`, avhengighetsfri, rå JSON-RPC over stdio uten SDK.** Vi implementerer den minste overflaten som finnes: `initialize`, `tools/list` og `tools/call`. Serveren gjør ALDRI nettverkskall og ALDRI git-operasjoner; den skriver filer, og eieren committer og publiserer selv. Deprekerte kapabiliteter (roots, sampling, logging) implementeres aldri. Protokollversjonen er én pinnet konstant med egen test og datert kommentar.

   Begrunnelsen for å droppe SDK-en: over stdio er MCP linjedelte JSON-RPC 2.0-meldinger, i størrelsesorden 120 linjer å håndtere. Alt annet SDK-en gir (HTTP-transport, sesjoner, header-basert ruting, autorisasjon) bruker vi ikke, og statsløs-kjerne-endringene i spesifikasjonen 2026-07-28 gjelder HTTP-transporten, ikke stdio. En npm-avhengighet ville altså kostet Urds sentrale løfte for null funksjonell gevinst. `editor/` forblir det eneste stedet i repoet med npm.

3. **Skriveretten er `guard.js`, ikke en ny modell.** Serveren gjenbruker `isAllowedPath` fra [template/functions/_lib/guard.js](../../template/functions/_lib/guard.js) og innskrenker den ytterligere, så den effektive skriveflaten blir kun `content/**.json` og `content/theme.css`. MCP-laget nekter i tillegg `media/**` (binærfiler gir ingen mening for en agent) og `plugins/plugins.json` (å slå på en plugin er en beslutning om å kjøre kode, og hører hjemme i admin). Vi bygger aldri en andre tillatelsesmodell for AI.

4. **Modellen former aldri data.** Det finnes ikke noe `urd_page_write(json)`. All struktur bygges av motorens egne fabrikker: `create()` og `item()` i `sections/presets.js`, `defaults()` per blokktype, `buildPagePreset` i `page-presets.js`. Modellen velger HVILKET preset, ikke hvordan en seksjon ser ut. Alt som ikke kommer fra en fabrikk valideres felt for felt (kjent nøkkel, riktig type, tall innenfor grid-grensene), hver mutasjon passerer en avhengighetsfri strukturkontroll før den treffer disk, og `apply` er opt-in: uten den returneres kun et diff-sammendrag.

5. **Versjonskoblingen er strukturell, ikke vedlikeholdt.** Serveren finner siderota med `new URL('..', import.meta.url)` (som treffer `template/` i monorepoet og klonrota i en klon), leser `urd.json.engine` og importerer motoren fra den versjonerte mappa, akkurat som `tests/_engine.mjs` og `editor/scripts/validate.mjs` gjør (ADR-0013). Verktøylistene avledes fra motorens egne registre, aldri fra kopierte lister, så en ny blokktype dukker opp i `urd_block_types` uten at noen redigerer noe. `mcp/**` er `ownedPaths`, så oppdatereren holder serveren i takt med motoren i samme commit.

## Konsekvenser

- **Plassering i `template/` er et bevisst valg.** Etter «Use this template» er klonens rot lik `template/`, så `mcp/server.mjs` og `.mcp.json` havner i rota av eierens repo og blir funnet av agentklienten uten installasjon. Lå serveren utenfor `template/`, ville den aldri nådd en eneste klonet side og vært et Urd-utviklerverktøy i stedet for en produktfunksjon.
- **Eierskap:** `urd.json.ownedPaths` får `mcp/**`, speilet i `OWNED_PATTERNS` i `guard.js` (kontraktstesten krever identiske lister). `.mcp.json` klassifiseres EKSPLISITT som eksakt sti: fullstendighetstesten filtrerer bort dotfiler, så en uklassifisert `.mcp.json` gir et hull ingen test roper om. `isAllowedPath` avviser begge allerede uten endring, så publisering kan aldri skrive MCP-serveren.
- **Én kildekonsolidering kreves:** `RESERVED_SLUGS` er i dag modul-privat i `guard.js` og duplisert i editoren. En tredje kopi er uakseptabel, så konstanten eksporteres fra `guard.js` og importeres av MCP-serveren.
- **Eieren må ha `node` installert** for å kjøre serveren. Løftet «klonede sider trenger aldri npm» står, men dette er stedet Urd er nærmest linja, og det skal stå eksplisitt i oppsettsguiden.
- **Personvern:** serveren sender sidens innhold til hvilken som helst LLM-tjeneste eierens klient bruker. Urd kan ikke kontrollere det, bare være tydelig: det står med rene ord i oppsettsguiden og i serverens egen startmelding. Teknisk motvekt er stivakten, som hindrer at serveren kan lese `.dev.vars`, `.env` eller noe utenfor siderota, testet eksplisitt mot `..`, absolutte stier og dotfiler.
- **`mcp/`-filene serveres offentlig** av Cloudflare Pages som inert kildekode uten hemmeligheter. `/mcp/*  X-Robots-Tag: noindex` legges i `_headers` på linje med `/admin/*`, men `_headers` er permanent unntatt oppdatereren (ADR-0014), så eksisterende sider får linja kun via diff-instruks.
- **Sanitiseringen dupliseres,** og det er designets tydeligste driftpunkt. `stripActiveContent` i `engine/sanitize.js` er DOM-basert og kan ikke kjøre i Node, så MCP-siden trenger en tekstmodus-motpart. De to må ha korpus-basert paritetstest fra dag én, ikke som opprydding etterpå.
- **Restrisikoen er gyldig men stygt innhold** (overlappende blokker, tekst utenfor rammen), ikke ugyldig JSON: skjemaet dekker formen, og `migrate.js` gjør ukjente typer til nøytrale plassholdere med data i behold i stedet for å krasje. Verktøybeskrivelsene instruerer derfor agenten om å be eieren se på siden i `/admin` etterpå.
- **Testing** ligger i `tests/mcp-*.test.mjs`: dispatcheren som ren funksjon mot fixture-meldinger, verktøyene mot en midlertidig siderot under `os.tmpdir()` (aldri mot ekte innhold), invariant-testene (ingen npm-import, ingen `fetch`/`node:http`/`node:child_process`, ingen import av `mcp/` utenfra, blokktypene avledet fra `blocks/`-mappa lik `define`-kallene i `urd.js`), pluss én integrasjonstest som spawner serveren og gjør `initialize` og `tools/list` over rør. Skjema-pariteten mot `schema/` hører derimot i `editor/scripts/validate.mjs`, siden ajv bor i `editor/node_modules`; CI kjører alt `npm run validate`, så drift fanges automatisk.
- **De to andre veiene er ikke avvist for godt.** En admin-assistent krever egen ADR for utvidelsespunktet og nøkkelforvaltningen (der ruting gjennom en Pages Function med nøkkelen som Cloudflare-hemmelighet er langt sterkere enn localStorage, siden CSP-en da forblir `'self'`), og den SKAL i så fall dele skrivelag med MCP-serveren. Nettleserens innebygde AI kan komme som et lite, feature-detektert tillegg når de aktuelle API-ene er stabile.

[ADR-0003]: 0003-publisering-via-github-oauth-og-pages-functions.md
[ADR-0004]: 0004-monorepo-med-template-mappe.md
[ADR-0006]: 0006-plugin-csp-behovsmodell.md
[ADR-0013]: 0013-immutable-motorversjonering.md
[ADR-0014]: 0014-oppdaterermodellen.md
