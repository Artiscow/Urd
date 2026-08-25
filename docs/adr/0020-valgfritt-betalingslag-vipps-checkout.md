# ADR-0020: Valgfritt betalingslag via Vipps Checkout (hosted redirect)

Dato: 25. august 2026
Status: Vedtatt

## Kontekst

Milepæl 0.7.5 lover en ekte betalings-kasse som VALGFRITT lag oppå bestillingsskjema-kassen; skjema-kassen forblir standard, og kjernen forblir gateway-fri. Backloggen navnga to kandidater: Snipcart-modellen (git-eid katalog + tredjeparts kurv/kasse via CSP-opt-in) og Vipps Checkout via en Pages Function.

## Beslutning

Betalingslaget bygges på **Vipps Checkout via en egen Pages Function med hosted redirect**:

1. Kasse-blokken får det additive propet `vippsCheckout` (bool, standard false). Satt viser den en «Betal med Vipps»-knapp ved siden av «Send bestilling».
2. Knappen POST-er kurvlinjene (id/antall/variant) og kontaktfeltene til sidens egen funksjon `/api/vipps/checkout`. Funksjonen regner ALLTID summen på nytt fra den git-eide katalogen (`content/samlinger/`, kind `products`) - klientens beløp brukes aldri. Ukjent produkt-id eller manipulert payload avvises.
3. Funksjonen oppretter en Checkout-sesjon hos Vipps (checkout/v3) og svarer med sesjonens URL; klienten redirecter dit. Betalingen skjer hos Vipps, aldri på siden.
4. `returnUrl` er kassesiden med `?bestilt=1`: kasse-blokken viser kvittering og tømmer kurven ved retur. Callback-endepunktet `/api/vipps/callback` kvitterer 200 og lagrer ingenting - ordrene bor i Vipps-portalen (ordrelinjene sendes med i sesjonen), siden er statisk og har ingen ordredatabase.
5. Konfigurasjon er Cloudflare-hemmeligheter, aldri repo-data: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY`, `VIPPS_MSN`, valgfri `VIPPS_API_BASE` (test: `https://apitest.vipps.no`). Uten dem svarer funksjonen 503 med koden `vippsNotConfigured`, og knappen viser en rolig utilgjengelig-tekst; skjema-kassen virker uendret.
6. Medlemspris er en vist andrepris på tillitsbasis (innlogging er utenfor kjernen, BACKLOG); betalingslaget belaster alltid ordinær pris.

## Begrunnelse

- **Målgruppen er norsk.** Vipps-nummer-instruksen er allerede den manuelle betalingsveien; Vipps Checkout er samme betalingsrelasjon med ekte gjennomføring. Eieren trenger kun MobilePay/Vipps-avtalen sin og å lime inn fire hemmeligheter i Cloudflare.
- **CSP-en forblir urørt.** Hosted redirect betyr ingen tredjeparts-skript, ingen iframe og ingen connect-src-utvidelse på siden (ADR-0006-friksjonen unngås helt). Sensitive kall skjer server-side i funksjonen, som eier hemmelighetene.
- **Snipcart avvist:** injiserer eget kurv- og kasse-UI som dublerer Urds handlekurv/kasse (to kurver på samme side), krever CDN-script + API-vert i CSP-en, og koster abonnement/transaksjonsgebyr. Modellen passer sider UTEN egen kurv; Urd har en.
- **Prisene valideres server-side** fordi kurven bor hos den besøkende (localStorage) og alt klienten sender kan være tuklet med; katalogen i git er fasit.

## Konsekvenser

- `functions/_lib/vipps.js` eier den rene logikken (payload-validering, omregning til øre, sesjonskropp) og testes i node; `functions/api/vipps/checkout.js` og `callback.js` er tynne skall.
- Skjema-kassen og betalingsknappen lever side om side; ingen del av kjernen får en avhengighet til Vipps.
- En testbetaling (Ferdig når-kriteriet) krever eierens test-avtale (MT-miljøet) på en deployet side; lokalt degraderer knappen pent.
- Byttes leverandør senere, er flaten liten: ett blokk-prop, to funksjoner og en ren modul.
