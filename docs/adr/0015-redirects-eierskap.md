# ADR-0015: Redirects-eierskap - generert hostfil over host-nøytralt datalag

Dato: 5. august 2026. Status: vedtatt (eierskapet; selve byggingen hører til v0.7 med SEO-grunnpakken C3).

## Kontekst

301-redirects med UI er standard hos alle de store byggerne (funksjonskartet C13), men filen som styrer dem hos hosten (`_redirects` på Cloudflare Pages) er hostspesifikk og grenser mot Urd-eide filer. 0.6.9-gaten skulle avgjøre eierskap og form, uten å bygge noe: uten en avgjørelse ville feltet enten sementert et varig gap mot konkurrentene (rent brukereid fil uten UI) eller låst datamodellen til Cloudflare-formatet.

## Beslutning

1. **Generert modell med host-nøytralt datalag.** Redirect-dataene skal bo i innholdet (site.json eller en egen `content/redirects.json`; formen avgjøres ved byggingen i v0.7: fra-sti, til-mål, permanent/midlertidig). Publiseringen genererer `_redirects` i hostens format ved hver publisering, på samme måte som den alt skriver `<slug>/index.html`-rutingskopiene. Kun den genererte utdatafilen er hostspesifikk; andre hoster kan få egne generatorer senere.
2. **`_redirects` er publiserings-generert, ikke Urd-eid og ikke håndredigert.** Den står derfor verken i `ownedPaths` eller `userPaths`, oppdatereren rører den aldri, og ADR-0006-konflikten (à la `_headers`, som brukeren håndredigerer) oppstår ikke. Frem til byggingen forblir `_redirects` i publiserings-vokterens DENY_EXACT, så ingenting kan skrive den i mellomtiden.
3. **UI-et og generatoren bygges i v0.7 sammen med SEO-grunnpakken** (sitemap, robots, 404, canonical): samme sjanger, filer generert ved publisering.

## Konsekvenser

- Datamodellen forblir host-nøytral (ADR-0003-ånden: adapter-vennlig grense mot hosten).
- Når byggingen kommer, må `_redirects` flyttes fra DENY_EXACT til publiseringens skrivesett i samme commit som generatoren, og fullstendighets-testen i tests/guard.test.mjs vil kreve en eierskapsklasse for den (samme mekanisme som fanget speculation-rules.json og malens README-filer).
- Brukere som trenger redirects FØR v0.7, kan legge inn `_redirects` for hånd via git; filen overlever både publisering og oppdatering urørt.
