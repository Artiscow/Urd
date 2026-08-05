# Almmuheami heiveheapmi (GitHub + Cloudflare Pages)

**Sámegiella** · [🇬🇧 English](SETUP-en-GB.md) · [🇳🇴 Bokmål](../../OPPSETT-PUBLISERING.md) · [🇳🇴 Nynorsk](SETUP-nn.md) · [🇹🇷 Türkçe](SETUP-tr.md)

docs/OPPSETT-PUBLISERING.md jorgalus. Dárogiella (bokmål) lea kanonalaš ja gusto go leat erohusat.

> MERKE: dát lea maskiinjorgaluvvon vuosttašárvalus mii dárbbaša geahčadeami olbmos geas lea davvisámegiella eatnigiellan.

Dát rávvagat heivehit «Almmut»-boalu: ahte admin sáhttá committet rievdadusaid GitHub-repoi, maid Cloudflare Pages de deployere. Dát lea ovttageardánis bargu juohke neahttasiiddu ovddas ja ádjána sullii logi minuhta. (Minsttar lea dárkkistuvvon produkšuvnnas ApeironLF:s.)

## 0. Ráhkat neahttasiiddu repo

Ođđa siidu álgá málle-repos [urd-template](https://github.com/Artiscow/urd-template): coahkkal **Use this template** → **Create a new repository** GitHubas, ja atte repoi nama. Repo maid oaččut LEA neahttasiidu; buot eará dán rávvagis dahkkojuvvo dan vuostá. Maŋit Urd-veršuvnnat vižžojuvvojit **Ođasmahttin**-panelain adminis, mii dárkkista málle-repo vuostá, várre fiillain maid leat gieđain rievdadan, ja čállá ođasmahttima oktan commitin. (Urd-ovddideami várás geavahuvvo ieš Urd-monorepo; dalle neahttasiidu lea vuollemáhppa `template`.)

## Eaktun

- Neahttasiiddu repo lea GitHubas (Urd-ovddideami várás: ieš Urd-repo).
- Cloudflare-konto (nuvttá dássi guhkkás birge).

## 1. Lakto repo Cloudflare Pages:ii

1. Cloudflare-dashbord → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Vállje repo, ja vállje **prošeaktanama várrogasat**: namma šaddá čujuhussan
   (`<namma>.pages.dev`), dat juhkkojuvvo globálalaččat buot Cloudflare-kundiiguin (jus namma
   lea juo válljejuvvon, oaččut sáhtedohko suffiksa), ja dan II SÁHTE rievdadit maŋŋel - de ferte prošeavtta
   sihkkut ja ráhkadit ođđasit. Dušše unna bustávat, logut ja gaskastreahka.
3. Huksenheivehusaid vuolde:
   - **Build command:** (guorus - Urd:s ii leat huksenlávki)
   - **Build output directory:** `/`
   - **Root directory:** `template` (buhtes klonejuvvon málle-repos gos sisdoallu lea ruohttasis: guođe guorusin)
4. Deployere. Siidu lea dál eallimin čujuhusas `<prošeakta>.pages.dev`, ja `functions/`-máhppa váldojuvvo mielde automáhtalaččat.

## 2. Ráhkat GitHub OAuth-app

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Deavdde:
   - **Application name:** omd. «Urd publisering - Mu searvi»
   - **Homepage URL:** `https://<prošeakta>.pages.dev`
   - **Authorization callback URL:** `https://<prošeakta>.pages.dev/api/github/callback`
3. Ráhkat, ja merke **Client ID**.
4. **Generate a new client secret**, ja merke čiegusvuođa (čájehuvvo dušše oktii).

Jus geavahat iežat domena maŋŋel, ođasmahte goappašiid URL:aid OAuth-appas.

## 3. Bija birasvariábeliid Cloudflare:ii

Mana prošektii → **Settings** → **Variables and Secrets** → **Add**.

Skovis leat golbma gietti: **Type**, **Variable name** ja **Value**.
Deavdde juste nugo vuolábealde. Vurke, ja gearddut buot guđa ovddas:

1. Type: Text
   Namma: `GITHUB_REPO`
   Árvu: repo masa galgá almmuhuvvot. Dán siiddu ovddas: `Artiscow/Urd`

2. Type: Text
   Namma: `GITHUB_CLIENT_ID`
   Árvu: Client ID OAuth-appas (lávki 2)

3. Type: **Secret**
   Namma: `GITHUB_CLIENT_SECRET`
   Árvu: čiegusvuohta OAuth-appas (lávki 2)

4. Type: Text
   Namma: `GITHUB_BRANCH`
   Árvu: `main`

5. Type: Text
   Namma: `GITHUB_SCOPE`
   Árvu: `public_repo` (almmolaš repo) dahje `repo` (priváhta repo)

6. Type: Text
   Namma: `ALLOWED_LOGINS`
   Árvu: GitHub-geavaheaddjinamat mat ožžot almmuhit, earuhuvvon komain. Omd. `Artiscow`

7. Type: Text
   Namma: `GITHUB_ROOT_DIR`
   Árvu: vuollemáhppa repos mii lea neahttasiiddu ruohtas, namalassii seamma árvu go
   «Root directory» lávkkis 1. Urd-monorepo ovddas: `template`.
   (Jus neahttasiidu lea repo-ruohttasis, nugo klonejuvvon málle-repos: guođe dán áibbas eret.)

8. Type: Text (eaktodáhtolaš - dábálaččat ii dárbbašuvvo)
   Namma: `URD_TEMPLATE_REPO`
   Árvu: málle-repo mas Ođasmahttin-panela viežžá ođđa Urd-veršuvnnaid.
   Dán haga geavahuvvo standárda `Artiscow/urd-template`; bija dan dušše jus
   siidu galgá čuovvut málle forka.

9. Type: **Secret** (eaktodáhtolaš - dábálaččat ii dárbbašuvvo)
   Namma: `DEPLOY_HOOK_URL`
   Árvu: Deploy Hook-URL (Settings → Deploy Hooks → plus-mearka → branch `main`).
   Cloudflare njuikko hárve dilálašvuođain badjel deploya vaikko commit lea riekta;
   go dát lea biddjojuvvon, almmuheapmi ieš vuolggaha deploya. Rahpa dan easka jus
   vásihat ahte almmuheamit eai boađe.

Loahpas ferte deployerejuvvot ođđasit (variábelat gustogohtet easka boahtte deployas).
Álkimus vuohki lea guorus commit:

```bash
git commit --allow-empty -m "Redeploy for miljøvariabler"
git push
```

(Dahje dashbordas: **Deployments** → ⋯-fállu maŋimuš deploya alde → **Retry deployment**.)

## 4. Dárkkis

1. Mana čujuhussii `https://<prošeakta>.pages.dev/admin/` → «Logge sisa GitHubain» → dohkket.
2. Du geavaheaddjinamma čájehuvvo bajimuš holggas (⚠ ovddabealde mearkkaša ahte dus váilu `ALLOWED_LOGINS`-merkošupmi).
3. Rievdat teavstta, deaddil **Almmut**. Veaháža maŋŋel lea commit repos, ja Cloudflare deployere dan (~1 minuhta).

## Sihkkarvuođamodealla (oanehaččat)

- OAuth-token lonuhuvvo server-bealde ja vurkejuvvo httpOnly-cookiei; dat ii goassege olat fierpmádatlohkki JS:ii.
- `ALLOWED_LOGINS` čađahuvvo buot rievdadeaddji čuoggáin, ii dušše UI:s.
- Almmuheapmi sáhttá dušše čállit `content/**`, `media/**` ja `plugins/plugins.json`. Koda (`functions/`, `admin/`, `assets/engine/`), workflows ja sihkkarvuođafiillat leat caggojuvvon server-bealde, nu ahte suollemasat váldojuvvon doaimmaheaddjisešuvdna ii sáhte bidjat maidege.
- Geahča [ADR-0003](../../adr/0003-publisering-via-github-oauth-og-pages-functions.md) olles ákkastallama várás (dárogillii).

## Almmuhandási báikkálaš geahččaleapmi (Urd-ovddideaddjit)

```bash
cd template
# legg testverdier i .dev.vars (gitignorert, ALDRI committ ekte hemmeligheter):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=dittbrukernavn
npx wrangler pages dev . --port 8788
```

De vujolit sihke siidu, admin ja functions čujuhusas `http://localhost:8788`. Olles OAuth-sisaloggen gáibida duohta OAuth-appa mas lea callback localhost:ii, muhto 401/503-golggut ja bálgásuodjaleapmi sáhttet geahččaluvvot dan haga.

## Meattáhusohcan

| Symptoma | Jáhkkimis sivva |
|---|---|
| «Publisering er ikke konfigurert: miljøvariabelen X mangler» (503) | Variábel váilu Cloudflare:s, dahje deploy lea boarráseabbo go variábel |
| «Ugyldig OAuth-state» sisaloggemis | Callback-URL OAuth-appas ii heive domenii, dahje cookiet leat caggojuvvon |
| «har ikke publiseringstilgang» (403) | Geavaheaddjinamma ii leat `ALLOWED_LOGINS`-listtus (dárkkis čállinvuogi; giedda ii beroš stuora/unna bustávain) |
| «Kunne ikke committe til GitHub» (502) | Token:s váilu scope (priváhta repo dárbbaša `repo`), dahje ossodat lea sirdásan |
| Almmuheapmi lihkostuvvá, muhto siidu ii rievdda | `GITHUB_ROOT_DIR` váilu/lea boastut: commit boahtá olggobeallái neahttasiiddu ruohttasmáhpa (dárkkis makkár bálgáid commit rievdadii GitHubas) |
| Commit lea riekta, muhto ii boađe deploy | Git-webhook filtii hostas (dáhpáhuvvá duollet dálle). Heivet `DEPLOY_HOOK_URL` (variábel 9), de almmuheapmi ieš vuolggaha deploya |
