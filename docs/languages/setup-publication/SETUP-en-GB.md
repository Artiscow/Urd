# Publishing setup (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · **🇬🇧 English** · [🇳🇴 Bokmål](SETUP-nb.md) · [🇳🇴 Nynorsk](SETUP-nn.md) · [🇹🇷 Türkçe](SETUP-tr.md)

The canonical text (ADR-0022): on a discrepancy this English text applies. The Norwegian (bokmål) version is [SETUP-nb.md](SETUP-nb.md).

This guide sets up the «Publish» button: letting admin commit changes to the GitHub repo, which Cloudflare Pages then deploys. This is a one-time job per website and takes about ten minutes. (The pattern is validated in production in ApeironLF.)

## Prerequisites

- The website repo is on GitHub (for Urd development: the Urd repo itself).
- A Cloudflare account (the free tier goes a long way).

## 0. Create the website repo

A new site starts from the template repository [urd-template](https://github.com/Artiscow/urd-template): press **Use this template** → **Create a new repository** on GitHub and name your repo. The repo you get IS the website; everything else in this guide is done against it. Later Urd versions are fetched with the **Updates** panel in the admin, which checks against the template repository, warns about files you have hand-edited, and writes the update as one commit. (For Urd development, the Urd monorepo itself is used instead; the website is then the `template` subfolder.)

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

8. Type: Text (optional - normally not needed)
   Name: `URD_TEMPLATE_REPO`
   Value: the template repository the Updates panel fetches new Urd versions
   from. Without it the default `Artiscow/urd-template` is used; set it only
   if the site should follow a fork of the template.

9. Type: **Secret** (optional - normally not needed)
   Name: `DEPLOY_HOOK_URL`
   Value: a Deploy Hook URL (Settings → Deploy Hooks → the plus sign → branch `main`).
   In rare cases Cloudflare skips a deploy even though the commit is correct;
   with this set, publishing triggers the deploy itself. Turn it on only if you
   experience publishes not appearing.

10. Type: **Secret** (optional - only for pictures from a Google Drive folder)
    Name: `DRIVE_API_KEY`
    Value: an API key from Google Cloud with the Drive API enabled. The image
    gallery background layer can take its pictures from a shared Drive folder; the folder is read by the site's own function on the
    server, so the key never reaches the browser or the site's files. Google
    Photos albums need no key.

11. Type: Text (optional - only for pictures from Nextcloud or another list)
    Name: `PHOTO_HOSTS`
    Value: the hosts the site may fetch pictures from, separated by commas.
    E.g. `sky.example.org`. Needed for a Nextcloud or ownCloud share and for
    a picture list at another address; Google's own hosts are built in.

12. Type: Text (optional - only for a calendar from another service than Google)
    Name: `ICS_HOSTS`
    Value: the hosts the calendar block may fetch calendars from, separated by
    commas. E.g. `calendar.proton.me` or `sky.example.org`. Google Calendar is
    built in. See [The calendar](../calendar-guide/CALENDAR-en-GB.md).

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

## 5. The payment layer (optional)

The Checkout block can take the payment through a provider ([ADR-0020](../../adr/0020-optional-payment-layer-vipps-checkout.md), [ADR-0028](../../adr/0028-payment-providers-in-the-optional-layer.md)). It is an optional layer: without it the order form sends the order by email or to an endpoint, as before. Each provider needs its own agreement and keys, and each is switched on per Checkout block under **Payment** in the block's menu. The buyer always pays on the provider's own page, so the site never sees a card.

First set the shop's currency in the Site panel (**Shop currency**, an ISO code such as NOK, DKK or EUR); the catalogue's prices are in that currency, and every provider charges in it.

### Vipps MobilePay

The layer needs a Vipps MobilePay agreement for payment on the web (the ePayment API) and the four keys of the sales unit. A Danish or Finnish MobilePay sales unit follows the same steps against the same servers, with the shop currency DKK or EUR; its reservations are shorter (step 6).

1. In the Vipps MobilePay business portal, click **For developers** in the side menu and choose **Production**. Find the sales unit and click **Show keys**, then copy `client_id`, `client_secret` and the primary `Ocp-Apim-Subscription-Key`, and the Merchant Serial Number (MSN) shown with the sales unit.
2. Add them in Cloudflare as in step 3, all four as **Secret**: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY` and `VIPPS_MSN`.
3. For the test payment, choose **Test** under **For developers** instead: a test sales unit comes with the product, and **Add test sales unit** makes another. Use its keys (**Show keys**) in the four secrets, and add one more, Type: Text, `VIPPS_API_BASE` with the value `https://apitest.vipps.no`. Make a test user on the **Test users** tab with **Add a new test user**; the portal gives it a phone number and an identity number. Install the Vipps MT test app (TestFlight on iOS, Google Play on Android after joining Vipps's test group; the developer pages link both), sign in with the test user's phone number and identity number, and confirm with the code 0000 or 000000. Your own Vipps account cannot pay in the test environment.
4. Redeploy (as at the end of step 3). In the editor, open the Checkout block's menu, tick **Payment** → «Pay with Vipps» button, and publish.
5. The test payment: put a product in the basket, open the checkout page and press «Pay with Vipps». On a phone the test app opens; on a desktop Vipps asks for the test user's number and sends the request to the app. The app first asks the buyer to share the name, email and phone with the shop, then to approve the payment. Back on the checkout page the basket is empty and the page thanks the buyer by name; the payment is in the portal with the order lines in its description, and the receipt is in the app. When it works, swap in the production keys and remove `VIPPS_API_BASE`.
6. The money is reserved, not moved. When the goods ship, find the reserved order among the portal's transactions and click **Capture** (enter an amount to capture only a part). A Norwegian sales unit has 180 days to capture; a Danish or Finnish one has 14, unless Vipps has approved late capture. The rules forbid a capture before the goods are ready. To call an order off, select it and click **Cancel transaction**, which releases the reservation at once; the portal offers this for Norwegian sales units only. A reservation never captured is released when the window ends.
7. Optional, for the order notices the shop of v1.1 sends: register a webhook, so Vipps tells the site about payment events. The site stores nothing yet, but the endpoint `/api/pay/vipps/webhook` is in place and refuses every delivery that is not signed with the registration's secret. Register it with the API, and put the `secret` the answer returns in Cloudflare as **Secret** `VIPPS_WEBHOOK_SECRET`:

```bash
# The access token (valid 24 hours in production, 1 hour in the test environment).
# In the test environment use https://apitest.vipps.no and the test keys; each environment's registration has its own secret.
curl -X POST https://api.vipps.no/accesstoken/get \
  -H "client_id: <client_id>" -H "client_secret: <client_secret>" \
  -H "Ocp-Apim-Subscription-Key: <subscription key>" -H "Merchant-Serial-Number: <MSN>"

# The registration; the answer's secret goes into VIPPS_WEBHOOK_SECRET
curl -X POST https://api.vipps.no/webhooks/v1/webhooks \
  -H "Authorization: Bearer <access_token>" \
  -H "Ocp-Apim-Subscription-Key: <subscription key>" -H "Merchant-Serial-Number: <MSN>" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://<site>/api/pay/vipps/webhook","events":["epayments.payment.authorized.v1"]}'
```

### Stripe (card, Apple Pay, Google Pay, Klarna and more)

Stripe's hosted page takes card, Apple Pay, Google Pay, Klarna, MobilePay and the other methods you switch on in the Stripe dashboard, in most currencies.

1. Create a Stripe account, and test in a sandbox first (**Sandboxes** in the Dashboard's account picker). On the **API keys** page (`dashboard.stripe.com/apikeys`) Stripe recommends a restricted key over the full secret key: click **Create restricted key**, give **Checkout Sessions** Write and **Payment Intents** Read, and leave the rest at None. Add the key (`rk_test_…`; a secret key `sk_test_…` also works) in Cloudflare as **Secret** `STRIPE_SECRET_KEY`, and redeploy. If a test payment fails, the key's **View request logs** names the permission it lacked.
2. Under **Settings** → **Payment methods**, switch on the methods you want. Apple Pay and Google Pay show on Stripe's page without anything more, on the devices that support them. Leave off the methods that settle over days (SEPA Direct Debit, bank transfers): the checkout page confirms only what is confirmed at once, so the buyer would not be thanked.
3. In the editor, open the Checkout block's menu, **Payment** → **Card payment**: Stripe. **Take the money** says when: *When I ship* holds the amount and you capture it in the Stripe dashboard when the goods ship (cards are held 7 days, Klarna 28); *At the order* takes it at once, for what is delivered at once, such as a membership or a ticket. Publish.
4. The test payment: put a product in the basket and press «Pay with card». On Stripe's page pay with the card number `4242 4242 4242 4242`, any future date and any three digits. Back on the checkout page the basket is empty and the page thanks the buyer by the name Stripe collected. In the sandbox's payments the payment stands as **Uncaptured** (When I ship; open it and click **Capture** when the goods ship) or **Succeeded** (At the order); `4000 0000 0000 9995` shows a declined card, and the basket stays.
5. Optional, for the order notices the shop of v1.1 sends: on the **Webhooks** page in Workbench (`dashboard.stripe.com/webhooks`) click **Create an event destination**, choose **Your account** and the **Snapshot** payload, select the event `checkout.session.completed`, choose **Webhook endpoint**, and give the address `https://<site>/api/pay/stripe/webhook`. Click **Reveal secret** and copy the signing secret (`whsec_…`) into Cloudflare as **Secret** `STRIPE_WEBHOOK_SECRET`. The endpoint stores nothing yet, and refuses every delivery that is not signed with the secret or is older than five minutes. With the destination in place, Stripe waits up to ten seconds for the site's answer before it sends the buyer back; the endpoint answers at once.
6. When it works, switch the **API keys** page from sandbox to live mode and complete Stripe's go-live checklist, which activates the account. Make a live restricted key the same way (`rk_live_…`; Stripe shows it only once), create the webhook destination again in live mode, since it has its own signing secret, and put both in Cloudflare instead of the sandbox values.

### PayPal

PayPal's own page takes the buyer's PayPal account, or a card without an account where PayPal offers that, in the currencies PayPal takes (NOK, DKK, SEK, EUR, GBP, USD and others; not ISK, and HUF, JPY and TWD in whole units only). PayPal takes the money at the order: it guarantees a held payment for 3 days only, which is shorter than most shipping, so an order you cannot fill is refunded in the PayPal account.

1. Log in at `developer.paypal.com` with the association's PayPal Business account (**Log in to Dashboard**). Under **Apps & Credentials**, with the **Sandbox** toggle on, use the **Default Application** or **Create App**, and copy its **Client ID** and **Secret**. Add them in Cloudflare as **Secret** `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`, and add Type: Text `PAYPAL_API_BASE` with the value `https://api-m.sandbox.paypal.com`. Redeploy.
2. In the editor, open the Checkout block's menu, **Payment** → tick «Pay with PayPal» button, and publish.
3. The test payment: under **Testing Tools** → **Sandbox Accounts** the developer account has a personal (buyer) sandbox account; **⋮** → **View/Edit Account** shows its email and password. Put a product in the basket, press «Pay with PayPal» and log in on PayPal's page with that buyer account. Back on the checkout page the basket is empty and the page thanks the buyer by name; the payment stands completed in the business sandbox account at `sandbox.paypal.com`. Pressing «Cancel» on PayPal's page returns to the checkout with the basket kept.
4. Optional, for the order notices the shop of v1.1 sends: on the app's page, add a webhook with the address `https://<site>/api/pay/paypal/webhook` and the event `PAYMENT.CAPTURE.COMPLETED`, and copy the webhook's ID into Cloudflare as Type: Text `PAYPAL_WEBHOOK_ID`. The endpoint stores nothing yet; for each delivery it asks PayPal whether PayPal signed it for that webhook, and refuses the rest. The sandbox and the live app have separate webhook IDs.
5. Going live needs a verified PayPal Business (or Premier) account. Switch **Apps & Credentials** to **Live**, take the live app's **Client ID** and **Secret** (PayPal may review the app first, within 24 to 72 hours), put them in the two secrets, remove `PAYPAL_API_BASE` so the live API `https://api-m.paypal.com` is used, and add the webhook again for the live app if you use it.

## The security model (in brief)

- The OAuth token is exchanged server-side and stored in an httpOnly cookie; it never reaches browser JS.
- `ALLOWED_LOGINS` is enforced in all mutating endpoints, not only in the UI.
- Publishing can only write `content/**`, `media/**` and `plugins/plugins.json`. Code (`functions/`, `admin/`, `assets/engine/`), workflows and security files are blocked server-side, so a hijacked editor session cannot plant anything.
- See [ADR-0003](../../adr/0003-publishing-via-github-oauth-and-pages-functions.md) for the full reasoning (in Norwegian).

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
| «Payment is not set up for this site yet» on the checkout page | One of the four Vipps secrets is missing in Cloudflare, or the deploy is older than the secrets (step 5) |
| «Pay with card» at Stripe answers that payment is not set up | `STRIPE_SECRET_KEY` is missing, is the publishable key (`pk_…`) instead of the secret one, or the deploy is older than the key |
| «Pay with PayPal» answers that PayPal does not take the currency | The shop currency is one PayPal lacks (ISK), or a price has øre or cents in HUF, JPY or TWD, which PayPal takes in whole units only |
| The Vipps payment fails before the app opens | `VIPPS_API_BASE` points at the test environment with production keys, or the other way round; the keys and the base belong to the same environment |
| The commit is correct, but no deploy appears | The git webhook was missed by the host (happens now and then). Set up `DEPLOY_HOOK_URL` (variable 9), and publishing triggers the deploy itself |
