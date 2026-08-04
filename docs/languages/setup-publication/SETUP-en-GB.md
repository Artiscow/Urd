# Publishing setup (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · **🇬🇧 English** · [🇳🇴 Bokmål](../../OPPSETT-PUBLISERING.md) · [🇳🇴 Nynorsk](SETUP-nn.md) · [🇹🇷 Türkçe](SETUP-tr.md)

Translation of docs/OPPSETT-PUBLISERING.md. Norwegian (bokmål) is canonical and prevails in case of discrepancies.

This guide sets up the «Publish» button: letting admin commit changes to the GitHub repo, which Cloudflare Pages then deploys. This is a one-time job per website and takes about ten minutes. (The pattern is validated in production in ApeironLF.)

## Prerequisites

- The website repo is on GitHub (for Urd development: the Urd repo itself).
- A Cloudflare account (the free tier goes a long way).

## 1. Connect the repo to Cloudflare Pages

1. The Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Choose the repo, and choose the **project name with care**: the name becomes the address
   (`<name>.pages.dev`), it is shared globally with all Cloudflare customers (if the name is
   taken, you get a random suffix), and it CANNOT be changed later - then the project must be
   deleted and created anew. Lowercase letters, digits and hyphens only.
3. Under the build settings:
   - **Build command:** (empty - Urd has no build step)
   - **Build output directory:** `/`
   - **Root directory:** `template` (in a clean cloned template repo where the content is at the root: leave empty)
4. Deploy. The site is now live at `<project>.pages.dev`, and the `functions/` folder is picked up automatically.

## 2. Create a GitHub OAuth app

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Fill in:
   - **Application name:** e.g. «Urd publishing - My club»
   - **Homepage URL:** `https://<project>.pages.dev`
   - **Authorization callback URL:** `https://<project>.pages.dev/api/github/callback`
3. Create it, and note the **Client ID**.
4. **Generate a new client secret**, and note the secret (it is shown only once).

If you use your own domain later, update both URLs in the OAuth app.

## 3. Set the environment variables in Cloudflare

Go to the project → **Settings** → **Variables and Secrets** → **Add**.

The form has three fields: **Type**, **Variable name** and **Value**.
Fill them in exactly as below. Save, and repeat for all six:

1. Type: Text
   Name: `GITHUB_REPO`
   Value: the repo to publish to. For this site: `Artiscow/Urd`

2. Type: Text
   Name: `GITHUB_CLIENT_ID`
   Value: the Client ID from the OAuth app (step 2)

3. Type: **Secret**
   Name: `GITHUB_CLIENT_SECRET`
   Value: the secret from the OAuth app (step 2)

4. Type: Text
   Name: `GITHUB_BRANCH`
   Value: `main`

5. Type: Text
   Name: `GITHUB_SCOPE`
   Value: `public_repo` (public repo) or `repo` (private repo)

6. Type: Text
   Name: `ALLOWED_LOGINS`
   Value: the GitHub usernames allowed to publish, separated by commas. E.g. `Artiscow`

7. Type: Text
   Name: `GITHUB_ROOT_DIR`
   Value: the subfolder in the repo that is the website root, that is the same value as
   «Root directory» in step 1. For the Urd monorepo: `template`.
   (If the website is at the repo root, as in a cloned template repo: drop this entirely.)

8. Type: **Secret** (optional - normally not needed)
   Name: `DEPLOY_HOOK_URL`
   Value: a Deploy Hook URL (Settings → Deploy Hooks → the plus sign → branch `main`).
   In rare cases Cloudflare skips a deploy even though the commit is correct;
   with this set, publishing triggers the deploy itself. Turn it on only if you
   experience publishes not appearing.

Finally a new deploy is needed (the variables only take effect from the next deploy).
The simplest way is an empty commit:

```bash
git commit --allow-empty -m "Redeploy for miljøvariabler"
git push
```

(Alternatively in the dashboard: **Deployments** → the ⋯ menu on the latest deploy → **Retry deployment**.)

## 4. Verify

1. Go to `https://<project>.pages.dev/admin/` → «Log in with GitHub» → authorise.
2. Your username appears in the top bar (a ⚠ in front means you are missing an `ALLOWED_LOGINS` entry).
3. Change a text and press **Publish**. After a moment the commit is in the repo, and Cloudflare deploys it (~1 minute).

## The security model (in brief)

- The OAuth token is exchanged server-side and stored in an httpOnly cookie; it never reaches browser JS.
- `ALLOWED_LOGINS` is enforced in all mutating endpoints, not only in the UI.
- Publishing can only write `content/**`, `media/**` and `plugins/plugins.json`. Code (`functions/`, `admin/`, `assets/engine/`), workflows and security files are blocked server-side, so a hijacked editor session cannot plant anything.
- See [ADR-0003](../../adr/0003-publisering-via-github-oauth-og-pages-functions.md) for the full reasoning (in Norwegian).

## Local testing of the publishing layer (Urd developers)

```bash
cd template
# legg testverdier i .dev.vars (gitignorert, ALDRI committ ekte hemmeligheter):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=dittbrukernavn
npx wrangler pages dev . --port 8788
```

Then the site, admin and functions all run on `http://localhost:8788`. Full OAuth login requires a real OAuth app with a callback to localhost, but the 401/503 flows and the path guard can be tested without it.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| «Publisering er ikke konfigurert: miljøvariabelen X mangler» (503) | The variable is missing in Cloudflare, or the deploy is older than the variable |
| «Ugyldig OAuth-state» when logging in | The callback URL in the OAuth app does not match the domain, or cookies are blocked |
| «har ikke publiseringstilgang» (403) | The username is not in `ALLOWED_LOGINS` (check the spelling; the field is case-insensitive) |
| «Kunne ikke committe til GitHub» (502) | The token lacks scope (a private repo needs `repo`), or the branch has moved |
| Publishing succeeds, but the site does not change | `GITHUB_ROOT_DIR` is missing/wrong: the commit lands outside the website root folder (check which paths the commit changed on GitHub) |
| The commit is correct, but no deploy appears | The git webhook was missed by the host (happens now and then). Set up `DEPLOY_HOOK_URL` (variable 8), and publishing triggers the deploy itself |
