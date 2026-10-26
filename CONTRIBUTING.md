# Contributing to Urd

Thank you for wanting to contribute! This document is for everyone who wants to send changes to Urd. Setting up the development environment and the technical rules are in [docs/languages/DEVELOPMENT-en-GB.md](docs/languages/DEVELOPMENT-en-GB.md); read it first.

## How to send a contribution

1. **Fork** the repo on GitHub (the button at the top right) and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/Urd.git
   cd Urd
   git remote add upstream https://github.com/<urd-owner>/Urd.git
   ```
2. **Make a branch** from `main` with a descriptive name:
   ```bash
   git switch -c fix/mobile-stacking-decor
   # or: feature/calendar-block, docs/schema-clarification, ...
   ```
3. **Make the change.** Keep it small and focused: one thing per branch and pull request. Follow the rules in [docs/languages/DEVELOPMENT-en-GB.md](docs/languages/DEVELOPMENT-en-GB.md), in particular:
   - If you change the props shape of a block, section, background or animation: bump `version`, write a migration, add a test.
   - Schema changes are made in three places in the same commit (SCHEMA.md, `schema/`, the example data).
   - The engine (`template/assets/engine/`) stays dependency-free, readable vanilla JS.
   - Editor changes: run `npm run build` and commit the updated `template/admin/assets/`.
4. **Run the tests** before you send:
   ```bash
   node --test tests/*.mjs
   ```
5. **Commit** with a short, descriptive message in the imperative («Add calendar block», not «Added…»). Commit messages are written in English (ADR-0022).
6. **Push and open a pull request** against `main` in the main repo:
   ```bash
   git push -u origin fix/mobile-stacking-decor
   ```
   Describe in the pull request **what** changed and **why**. A reference to an issue or an item in [docs/BACKLOG.md](docs/BACKLOG.md) is welcome.
7. **Keep your fork up to date** while you wait for review:
   ```bash
   git fetch upstream && git rebase upstream/main
   ```

## What we look for in review

- Does the change break one of the four promises in [docs/languages/VISION-en-GB.md](docs/languages/VISION-en-GB.md)? Then it has to change, however good it is.
- Are the tests green, and does new functionality have tests where they make sense?
- Is the code in the same style as the rest (English in code and in everything developer-facing, user-facing text in both English and Norwegian, no em dashes in text)?
- Large architecture changes: open an issue and discuss BEFORE you build, preferably with a proposal for a new ADR in `docs/adr/`.

## Contributing languages

Urd is multilingual (see [ADR-0012](docs/adr/0012-multilingual.md)). The translations are plain ES modules, so a language contribution needs **no build** and no knowledge of Svelte:

- `template/assets/engine/<version>/locales/site/<code>.js` holds the texts visitors see (buttons, dates, form messages).
- `template/assets/engine/<version>/locales/admin/<code>.js` holds the editor's texts.
- `template/plugins/<plugin>/locales/<code>.js` holds the plugins' texts.

Norwegian bokmål (`nb.js`) is the base of every set: a key missing in another language falls back to bokmål, never to an empty page.

**How to translate:**

1. Copy `nb.js` in the set you want to translate to the file name for your language.
2. Translate the VALUES. The keys (`'nav.toTop'`) are identifiers and are never changed.
3. Keep the placeholders in the text: `{n}`, `{label}`, `{email}` and so on must stay, or numbers and names go missing from the finished text. They can move to where your sentence needs them.
4. No em dash in the values; use a plain hyphen.
5. Run the language check, Urd's «language file checker», which reports keys that are missing, empty or have the wrong placeholders:
   ```bash
   node --test tests/i18n.test.mjs
   ```

**A new language?** There are two ways, and the first still needs no build:

- **As a language pack** (recommended, and the only way that does not touch Urd's code): a plugin without code, with `languages` in its manifest and the files in `locales/site/<code>.js` and `locales/admin/<code>.js`. It can be put in any Urd repo and switched on in the Plugins panel, without waiting for us. The reference is `template/plugins/lang-sv/`, and the form is described in [template/plugins/README.md](template/plugins/README.md).
- **Built into Urd** (the language comes with every new site): add the code to `SUPPORTED_LANGS` and `matchLang` in `template/assets/engine/<version>/i18n.js`, and to `LANG_OPTIONS` in `editor/src/state/shell.svelte.js` (with the language's OWN name, sorted alphabetically). Then the editor has to be built (`cd editor && npm run build`) and the bundle committed. A built-in language needs a file in every set; the full key set is required only once the language is added to `CORE_LANGS` in `tests/i18n.test.mjs`, and until then a missing key falls back to bokmål.

**Reviewing the existing translations is a contribution too.** The Northern Sámi translation is a machine-written first draft waiting for review by a native speaker; its files are marked as such. Correcting language errors there is as valuable as a new translation.

Document translations (the README, the user guide and the setup guide) live in [docs/languages/](docs/languages/). English is canonical (ADR-0022): on a discrepancy the English text applies, and the Norwegian version is updated afterwards; everything user-facing is available in both languages.

## Bug reports and suggestions

Use GitHub Issues. For a bug: describe what you did, what you expected and what happened, preferably with the browser and operating system. For a suggestion: check [docs/BACKLOG.md](docs/BACKLOG.md) and [docs/languages/ROADMAP-en-GB.md](docs/languages/ROADMAP-en-GB.md) first, so we avoid duplicates.

## Licence

By contributing you agree that your contribution is licensed under the project's [MIT licence](LICENSE).
