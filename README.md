<p align="center">
  <img src="docs/brand/urd-logo-turkis.svg" alt="Urd" width="200">
</p>

<p align="center">
  <a href="docs/languages/README/README-se.md">Sámegiella</a> ·
  <strong>🇬🇧 English</strong> ·
  <a href="docs/languages/README/README-nb.md">🇳🇴 Bokmål</a> ·
  <a href="docs/languages/README/README-nn.md">🇳🇴 Nynorsk</a> ·
  <a href="docs/languages/README/README-tr.md">🇹🇷 Türkçe</a>
</p>

<p align="center">
  <a href="https://github.com/Artiscow/Urd/actions/workflows/tests.yml"><img src="https://github.com/Artiscow/Urd/actions/workflows/tests.yml/badge.svg" alt="Tests"></a>
  <a href="https://github.com/Artiscow/Urd/releases"><img src="https://img.shields.io/github/v/release/Artiscow/Urd?label=release&color=15b39a" alt="Release"></a>
</p>

<p align="center">
  <a href="docs/languages/setup-publication/SETUP-en-GB.md"><strong>Get started</strong></a> ·
  <a href="docs/languages/user-guide/GUIDE-en-GB.md"><strong>User guide</strong></a> ·
  <a href="docs/languages/ROADMAP-en-GB.md"><strong>Roadmap</strong></a>
</p>

> Urd is said to be the eldest of the three norns in Norse mythology who sit at the foot of Yggdrasil and decide the fates of the gods. Together the norns sit and spin threads of fate, or carve fate into pieces of wood.
> Urd is the tool for spinning and carving your own website out from the root of the tree.

**Pronounciation:** *Urd* is pronounced roughly **oord** (Norwegian [ʉːɖ]). The vowel is close to the "oo" in *food*, but with the lips more rounded and pushed forward, and the "rd" melts into a single sound made with the tip of the tongue curled back. English speakers already know a relative of the word: *weird* comes from Old English *wyrd*, fate, the same root as the Old Norse *Urðr*.

**Status: under development - not ready for use yet.** See [the roadmap](docs/VEIKART.md) for how far we have come.

## What is Urd?

Urd is an open source website builder where **the repo you clone IS your website** - and the website is its own builder. A free, static, git-owned alternative to Squarespace, Wix and Publii.

No server. No database. No subscription. No build process. Just a git repo with readable files that you own yourself, and that can be served by any static host (Cloudflare Pages, GitHub Pages, …).

## How it works

1. **Create your repo** from the [urd-template](https://github.com/Artiscow/urd-template) («Use this template» on GitHub) and connect it to a static host: the [publishing setup guide](docs/languages/setup-publication/SETUP-en-GB.md) walks through every step.
2. **Set up** your site through the setup wizard - name, colours, logo.
3. **Edit** by going to `yoursite.org/admin` and logging in with GitHub. The whole builder is there: click and type directly on the page, drag blocks freely on a grid, add sections, edit backgrounds, colours and navigation.
4. **Publish** - one click makes one git commit with your changes, and the host serves the new page in under a minute.
5. **Update** - the Updates panel in admin fetches new Urd versions from the template repo as one commit, and warns about files you have hand-edited.

After the first setup, the admin page is the control centre for your website. Everything you see on the page can be edited from there.

Urd can be extended with **plugins** that live in your repo and are switched on in admin. Three are included as references: calendar (subscribable feed with four views), contact form (mailto or your own endpoint) and map (privacy-friendly OpenStreetMap). See [template/plugins/README.md](template/plugins/README.md) to build your own.

## The four promises

1. **You own everything.** Your site is a git repo with readable files. No lock-in.
2. **An update never breaks a built site.** All content has `version` + migrations that carry old data safely forward.
3. **The website needs no build process.** What is in the repo is exactly what the browser loads.
4. **WYSIWYG without compromise.** Admin shows the real page - same engine, same files.

## Languages

The editor and the engine texts your visitors see are available in Northern Sámi, British English, Norwegian (bokmål and nynorsk) and Turkish. The admin language follows your device by default and is remembered per browser; the site language is chosen in the Site panel. Adding or improving a translation is a plain file change with no build step - see [CONTRIBUTING.md](CONTRIBUTING.md). A language Urd does not ship with can be added as a language pack: a plugin that is only translation files, switched on in the Plugins panel.

## Documentation

The project documents are written in Norwegian; the descriptions below are translated.

| Document | Contents |
|---|---|
| [Vision](docs/languages/VISION-en-GB.md) | What Urd is, who it is for, and the promises that govern every decision |
| [docs/ARKITEKTUR.md](docs/ARKITEKTUR.md) | System overview: the engine, the editor, the publishing flow (in Norwegian) |
| [docs/SKJEMA.md](docs/SKJEMA.md) | The data model - the contract everything builds on (in Norwegian) |
| [Roadmap](docs/languages/ROADMAP-en-GB.md) | Phases from skeleton to v1.0 |
| [User guide](docs/languages/user-guide/GUIDE-en-GB.md) | For site owners: how the editor is used, without code |
| [Development](docs/languages/DEVELOPMENT-en-GB.md) | For those of us developing Urd: setup, rules, common tasks |
| [Publishing setup](docs/languages/setup-publication/SETUP-en-GB.md) | One-time publishing setup: GitHub OAuth app + Cloudflare |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Running task list: to-dos, bugs and suggestions (in Norwegian) |
| [docs/TESTRUNDER.md](docs/TESTRUNDER.md) | Checklist for manual testing: delivered work waiting to be tested (in Norwegian) |
| [docs/languages/](docs/languages/) | All translated documents (the user guide in five languages; the rest in English) |
| [docs/sammenligning/FUNKSJONSKART.md](docs/sammenligning/FUNKSJONSKART.md) | Feature comparison against other website builders with a gap analysis (in Norwegian) |
| [docs/sammenligning/LAERDOMMER.md](docs/sammenligning/LAERDOMMER.md) | How other website builders are built, and what we can take from them (in Norwegian) |
| [docs/sammenligning/ELEMENTKART.md](docs/sammenligning/ELEMENTKART.md) | Elements and features: how they are offered to the user and how they are built (in Norwegian) |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Change log per push (in Norwegian) |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute: fork, branch, tests, pull request (in Norwegian) |
| [docs/adr/](docs/adr/) | Architecture decisions with reasoning (in Norwegian) |

## Licence

[MIT](LICENSE)
