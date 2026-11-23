# Publishing setup (GitHub + Cloudflare Pages)

[Sámegiella](SETUP-se.md) · **🇬🇧 English** · [🇳🇴 Bokmål](SETUP-nb.md) · [🇳🇴 Nynorsk](SETUP-nn.md) · [🇹🇷 Türkçe](SETUP-tr.md)

The canonical text: on a discrepancy this English text applies. The Norwegian (bokmål) version is [SETUP-nb.md](SETUP-nb.md).

This guide puts your site online and sets up the «Publish» button in the editor: the editor saves your changes to your GitHub repo, and Cloudflare Pages puts them on the site. You do it once per website, and it takes about ten minutes.

## What you need

- A GitHub account.
- A Cloudflare account (the free plan is enough).

Building Urd itself? Your website is the `template` folder in the Urd repo, so skip step 1 and use the Urd repo. The steps say where anything else differs.

## 1. Create the website repo

1. Open [urd-template](https://github.com/Artiscow/urd-template) on GitHub.
2. Press **Use this template** → **Create a new repository**.
3. Give the repo a name, choose **Public** or **Private**, and press **Create repository from template**.

The repo you get is your website. New versions of Urd come in later through the **Updates** panel in the editor.

## 2. Put the site on Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository**.
2. If Cloudflare is not connected to your GitHub account yet, it asks to install its GitHub app: choose your account and press **Install & Authorize**. Choose the repo from step 1, and press **Begin setup**.
3. **Project name:** choose it with care. It becomes the site's address, `<name>.pages.dev`, and it cannot be changed later (you would have to delete the project and start again). Names are shared by everyone on Cloudflare, so if yours is taken, Cloudflare adds a few random letters to it. Use lowercase letters, digits and hyphens only.
4. Fill in the build settings:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** leave it empty (Urd has no build step)
   - **Build output directory:** `/`
   - **Root directory:** leave it empty. For the Urd repo itself, open **Root directory (advanced)** and set **Path** to `template`.
5. Press **Save and Deploy**. When it is done, the site is live at `https://<name>.pages.dev`.

Note the address: the next steps use it. Where this guide writes `<name>.pages.dev`, use your own.

## 3. Create the GitHub App

The app lets you log in to the editor with your GitHub account, and lets the editor save to the site's repo and nothing else.

1. On GitHub, click your profile picture (top right) → **Settings** → **Developer settings** (at the bottom of the left menu) → **GitHub Apps** → **New GitHub App**. If the repo belongs to an organisation, start from the organisation instead: **Your organizations** → **Settings** next to it → **Developer settings** → **GitHub Apps** → **New GitHub App**.
2. Fill in:
   - **GitHub App name:** a name nobody else on GitHub has taken, at most 34 characters, e.g. «Urd publishing my-site»
   - **Homepage URL:** the site's address, `https://<name>.pages.dev` or your own domain
   - **Redirect URI:** `https://<name>.pages.dev/api/github/callback`. Where the address has **Allow wildcard matching**, leave it off, so GitHub sends the login back to this exact address alone. If the site has its own domain too, press **Add redirect URI** and add that domain the same way, e.g. `https://www.example.org/api/github/callback`: you can log in only at an address that has one.
   - Leave **Expire user authorization tokens** ticked, as GitHub has it. Your login then lasts eight hours at a time, and the editor renews it by itself.
   - Leave **Request user authorization (OAuth) during installation** unticked.
   - Under **Webhook**, untick **Active** and leave **Webhook URL** empty.
   - Under **Permissions** → **Repository permissions**, set **Contents** to **Read and write**. Leave the others as they are.
   - **Where can this GitHub App be installed?** Choose **Only on this account**.
3. Press **Create GitHub App**.
4. On the app's page, copy the **Client ID** and keep it for step 4.
5. Further down the same page, under **Credentials** → **Client secrets**, press **New secret** and copy the secret. GitHub shows it only once; if you lose it, make a new one. The message at the top of the page about a private key can be left: Urd uses no private key.
6. Install the app on the site's repo: in the app's menu on the left, press **Install App**, then **Install** next to your account. Choose **Only select repositories**, pick the repo from step 1, and press **Install**.

## 4. Give Cloudflare the keys

1. In the Cloudflare dashboard, go to **Workers & Pages** → your project → **Settings** → **Variables and Secrets**.
2. For each variable below, press **Add**, fill in **Type**, **Variable name** and **Value**, and press **Save**. Where the form has an **Encrypt** button in place of the type, press it for a **Secret**. A **Secret** is hidden once saved; a **Text** stays readable.

Always needed:

| Type | Variable name | Value |
|---|---|---|
| Text | `GITHUB_REPO` | Your repo as `owner/name`, e.g. `Artiscow/my-site` |
| Text | `GITHUB_CLIENT_ID` | The Client ID from step 3 |
| **Secret** | `GITHUB_CLIENT_SECRET` | The secret from step 3 |
| Text | `ALLOWED_LOGINS` | The GitHub usernames allowed to publish, separated by commas, e.g. `Artiscow` |

Only in these cases:

| Type | Variable name | Value | When |
|---|---|---|---|
| Text | `GITHUB_BRANCH` | The branch name (never `urd-drafts`) | The site is published from a branch other than `main` |
| Text | `GITHUB_ROOT_DIR` | `template` | The site is the Urd repo itself |

3. Deploy again, since the variables take effect from the next deploy: in the project, open **Deployments**, then the three dots on the latest deployment → **Retry deployment**.

## 5. Check that it works

1. Open `https://<name>.pages.dev/admin/`, press **Log in with GitHub**, and then **Authorize** on GitHub's page.
2. Your GitHub username appears in the top bar. A warning sign in front of it means the username is not in `ALLOWED_LOGINS`: check the spelling, and deploy again.
3. Change a text, press **Publish**, then **Publish now**. After a moment the change is saved in your repo, and about a minute later it is on the site.

The site is set up. The rest of this guide is for when you need it.

## Optional settings

Set these the same way as in step 4, and deploy again after each change.

| Type | Variable name | Value | When |
|---|---|---|---|
| **Secret** | `DEPLOY_HOOK_URL` | A deploy hook address: in the project, **Settings** → **Builds** → **Add deploy hook** → branch `main` | A publish now and then never reaches the site, though the change is in the repo. With this set, publishing starts the deploy itself. |
| **Secret** | `DRIVE_API_KEY` | An API key from Google Cloud with the Drive API turned on | A background takes its pictures from a shared Google Drive folder. See [Pictures from a shared folder](../setup-photos/PHOTOS-en-GB.md). Google Photos albums need no key. |
| Text | `PHOTO_HOSTS` | The hosts pictures may come from, separated by commas, e.g. `sky.example.org` | Pictures come from a Nextcloud or ownCloud share, or from a picture list at another address. Google's own hosts are built in. |
| Text | `ICS_HOSTS` | The hosts calendars may come from, separated by commas, e.g. `calendar.proton.me` | A calendar comes from a service other than Google Calendar. See [The calendar](../calendar-guide/CALENDAR-en-GB.md). |
| Text | `URD_TEMPLATE_REPO` | A template repo as `owner/name` | The site should take its updates from a copy of urd-template instead of `Artiscow/urd-template`. |

## A site set up with an OAuth App

A site set up with an OAuth App, before this guide used a GitHub App, keeps working. An OAuth App's login reaches every repo you can reach, though, so moving to a GitHub App is safer:

1. Create a GitHub App as in step 3, with the site's address.
2. In Cloudflare, under **Variables and Secrets**, give `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` the app's values, and remove `GITHUB_SCOPE` if it is there. Deploy again (step 4).
3. In the editor, press **Log out** beside your username in the top bar, and log in again.
4. Delete the old OAuth App, unless another site still uses it: **Settings** → **Developer settings** → **OAuth Apps** → the app → **Advanced** (left menu) → **Delete application** → **Delete this OAuth Application**.

While a site uses an OAuth App, a private repo needs the variable `GITHUB_SCOPE` with the value `repo`.

## Your own domain

1. In the project, open **Custom domains** → **Set up a domain**, type the domain, press **Continue**, and follow Cloudflare's steps.
2. On GitHub, open the app from step 3 (**Settings** → **Developer settings** → **GitHub Apps** → **Edit** next to the app). Add a second **Redirect URI** with the new domain, e.g. `https://www.example.org/api/github/callback`, and keep the one with `pages.dev`, so you can log in at either address. Set the **Homepage URL** to the new domain, and press **Save changes**.

On Cloudflare's free plan, Cloudflare turns on its own visit counting (Web Analytics) for a domain you add, and puts its script on your pages. The privacy page then tells your visitors so, and the Legal panel names it. To turn it off: in the Cloudflare dashboard, open the domain → **Web Analytics** → **Manage RUM Settings** → **Disable**; Cloudflare does not turn it on again. Check the setting in Cloudflare rather than relying on the Legal panel: the panel only sees the front page as Cloudflare serves it to you, and Cloudflare leaves the script out for visitors served from its EU and UK data centres.

## Taking payments (optional)

The Checkout block can take the payment through Vipps MobilePay, Stripe or PayPal. Without a provider, the order form sends the order by email or to an order address instead. Each provider needs its own agreement and keys, and you switch each one on per Checkout block under **Payment** in the block's menu. The buyer always pays on the provider's own page, so the site never sees a card.

First, set the shop's currency in the Site panel, group **Shop** → **Shop currency** (a code such as NOK, DKK or EUR). The prices are in that currency, and every provider charges in it.

Good to know before you test:

- In the editor, pressing a pay button tells you whether the provider's keys are in place. Nothing is sent from there.
- Until the keys are in place, the published pay button tells the buyer that payment is not set up yet.
- **Test the payment**, in the Checkout block's Payment group, opens the checkout page in a new tab with your unpublished changes and your basket. The payment itself uses what is published, so publish the checkout page and the products first. A way to pay or a product that is not published yet is refused, and a price changed only in the editor is charged at its published price.
- While a provider runs on test keys, the published checkout shows a line saying that payments draw no money. It goes away when the live keys are in.

### Vipps MobilePay

You need a Vipps MobilePay agreement for payment on the web (the ePayment API) and the four keys of your sales unit. A Danish or Finnish MobilePay sales unit follows the same steps, with the shop currency DKK or EUR; its reservations are shorter (step 6).

1. In the Vipps MobilePay business portal, click **For developers** in the side menu and choose **Production**. Find the sales unit and click **Show keys**. Copy `client_id`, `client_secret`, the primary `Ocp-Apim-Subscription-Key`, and the Merchant Serial Number (MSN) shown with the sales unit.
2. Add them in Cloudflare as in step 4, all four as **Secret**: `VIPPS_CLIENT_ID`, `VIPPS_CLIENT_SECRET`, `VIPPS_SUBSCRIPTION_KEY` and `VIPPS_MSN`.
3. To test first, choose **Test** under **For developers** instead. A test sales unit comes with the agreement, and **Add test sales unit** makes another. Use its keys (**Show keys**) in the four secrets, and add one more: Type Text, `VIPPS_API_BASE`, value `https://apitest.vipps.no`.
   - Make a test user on the **Test users** tab with **Add a new test user**. The portal gives it a phone number and an identity number.
   - Install the Vipps MT test app (TestFlight on iOS; Google Play on Android after joining Vipps's test group; the developer pages link both). Sign in with the test user's phone number and identity number, and confirm with the code 0000 or 000000. Your own Vipps account cannot pay in the test environment.
4. Deploy again (as in step 4). In the editor, open the Checkout block's menu, tick **Payment** → «Pay with Vipps» button, and publish.
5. Test it: with the test keys in, the checkout page shows the test line at the top of its form. Put a product in the basket, open the checkout page and press «Pay with Vipps». On a phone the test app opens; on a computer, Vipps asks for the test user's number and sends the request to the app. The app asks the buyer to share their name, email and phone with the shop, and then to approve the payment. Back on the checkout page, the basket is empty and the page thanks the buyer by name. The payment is in the portal with the order lines in its description, and the receipt is in the app. When it works, swap in the production keys and remove `VIPPS_API_BASE`.
6. The money is reserved, not moved. When the goods ship, find the order among the portal's transactions and click **Capture** (enter an amount to capture only part of it). A Norwegian sales unit has 180 days to capture; a Danish or Finnish one has 14, unless Vipps has approved late capture. The rules forbid capturing before the goods are ready. To call an order off, select it and click **Cancel transaction**, which releases the reservation at once; the portal offers this for Norwegian sales units only. A reservation never captured is released when the time runs out.
7. Optional, for the order notices coming with the shop in v1.1: register a webhook, so Vipps tells the site about payments. The site stores nothing yet, but the address `/api/pay/vipps/webhook` is in place and refuses every delivery not signed with the registration's secret. Register it with the commands below, and put the `secret` from the answer in Cloudflare as **Secret** `VIPPS_WEBHOOK_SECRET`:

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

Stripe's page takes cards, Apple Pay, Google Pay, Klarna, MobilePay and the other methods you switch on in the Stripe dashboard, in most currencies.

1. Create a Stripe account, and test in a sandbox first (**Sandboxes** in the dashboard's account picker). On the **API keys** page (`dashboard.stripe.com/apikeys`), click **Create restricted key**, give **Checkout Sessions** Write and **Payment Intents** Read, and leave the rest at None (Stripe recommends this over the full secret key). Add the key (`rk_test_…`; a secret key `sk_test_…` also works) in Cloudflare as **Secret** `STRIPE_SECRET_KEY`, and deploy again. If a test payment fails, the key's **View request logs** names the permission it lacked.
2. Under **Settings** → **Payment methods**, switch on the methods you want. Apple Pay and Google Pay show on Stripe's page by themselves, on the devices that support them. Leave off the methods that take days to settle (SEPA Direct Debit, bank transfers): the checkout page only confirms what is confirmed at once, so the buyer would not be thanked.
3. In the editor, open the Checkout block's menu, **Payment** → **Card payment**: Stripe. **Take the money** says when:
   - *When I ship* holds the amount, and you capture it in the Stripe dashboard when the goods ship (cards are held 7 days, Klarna 28).
   - *At the order* takes it at once, for what is delivered at once, such as a membership or a ticket.

   Publish.
4. Test it: with the test key in, the checkout page shows the test line at the top of its form. Put a product in the basket and press «Pay with card». On Stripe's page, pay with the card number `4242 4242 4242 4242`, any future date and any three digits. Back on the checkout page, the basket is empty and the page thanks the buyer by the name Stripe collected. Among the sandbox's payments, the payment stands as **Uncaptured** (When I ship: open it and click **Capture** when the goods ship) or **Succeeded** (At the order). The card `4000 0000 0000 9995` shows a declined card, and the basket stays.
5. Optional, for the order notices coming with the shop in v1.1: on the **Webhooks** page in Workbench (`dashboard.stripe.com/webhooks`), click **Create an event destination**, choose **Your account** and the **Snapshot** payload, select the event `checkout.session.completed`, choose **Webhook endpoint**, and give the address `https://<site>/api/pay/stripe/webhook`. Click **Reveal secret** and copy the signing secret (`whsec_…`) into Cloudflare as **Secret** `STRIPE_WEBHOOK_SECRET`. The site stores nothing yet, and refuses every delivery not signed with the secret or older than five minutes.
6. When it works, switch the **API keys** page from sandbox to live mode and complete Stripe's go-live checklist, which activates the account. Make a live restricted key the same way (`rk_live_…`; Stripe shows it only once). Create the webhook destination again in live mode, since it has its own signing secret. Put both in Cloudflare instead of the sandbox values.

### PayPal

PayPal's page takes the buyer's PayPal account, or a card without an account where PayPal offers that, in the currencies PayPal takes (NOK, DKK, SEK, EUR, GBP, USD and others; not ISK, and HUF, JPY and TWD in whole units only). PayPal takes the money at the order, since it guarantees a held payment for 3 days only, so an order you cannot fill is refunded in the PayPal account.

1. Log in at `developer.paypal.com` with your PayPal Business account (**Log in to Dashboard**). Under **Apps & Credentials**, with the **Sandbox** toggle on, use the **Default Application** or **Create App**, and copy its **Client ID** and **Secret**. Add them in Cloudflare as **Secret** `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`, and add Type Text `PAYPAL_API_BASE` with the value `https://api-m.sandbox.paypal.com`. Deploy again.
2. In the editor, open the Checkout block's menu, **Payment** → tick «Pay with PayPal» button, and publish.
3. Test it: with the sandbox keys in, the checkout page shows the test line at the top of its form. Under **Testing Tools** → **Sandbox Accounts**, the developer account has a personal (buyer) sandbox account; **⋮** → **View/Edit Account** shows its email and password. Put a product in the basket, press «Pay with PayPal», and log in on PayPal's page with that buyer account. Back on the checkout page, the basket is empty and the page thanks the buyer by name; the payment stands completed in the business sandbox account at `sandbox.paypal.com`. Pressing «Cancel» on PayPal's page returns to the checkout with the basket kept.
4. Optional, for the order notices coming with the shop in v1.1: on the app's page, add a webhook with the address `https://<site>/api/pay/paypal/webhook` and the event `PAYMENT.CAPTURE.COMPLETED`, and copy the webhook's ID into Cloudflare as Type Text `PAYPAL_WEBHOOK_ID`. The site stores nothing yet; for each delivery it asks PayPal whether PayPal sent it, and refuses the rest. The sandbox and the live app have separate webhook IDs.
5. Going live needs a verified PayPal Business (or Premier) account. Switch **Apps & Credentials** to **Live**, and take the live app's **Client ID** and **Secret** (PayPal may review the app first, within 24 to 72 hours). Put them in the two secrets, remove `PAYPAL_API_BASE` so the live service is used, and add the webhook again for the live app if you use it.

## Saved drafts

The editor's Drafts window saves drafts to GitHub, so you can pick them up on another device. They go on a branch of their own, `urd-drafts`, which the first save creates. Nothing has to be set up for it, but three things are good to know:

- **Saves never reach the site.** Every save is marked so that Cloudflare builds nothing from it: it never reaches the live site, never uses one of the project's builds, and never shows in History.
- **Leave the branch out of preview builds.** Cloudflare builds a preview of every branch by default. To be safe, leave `urd-drafts` out: in the project, **Settings** → **Builds** → **Branch control**, and under **Preview branch** choose **None**, or **Custom branches** with `*` among the branches to include and `urd-drafts` among those to exclude.
- **Rules on every branch block the saves.** A GitHub ruleset or branch protection rule that covers every branch (one that restricts creating branches or requires a pull request, say) also stops the saves, and Drafts says «GitHub refused the branch the saved drafts live on (urd-drafts); see the setup guide». Leave the branch out: in the repo, **Settings** → **Rules** → **Rulesets** → the ruleset → **Target branches** → **Add target** → **Exclude by pattern** → `urd-drafts`. For a classic protection rule under **Settings** → **Branches** with the pattern `*`, change the pattern to `main`.

On a public repo, anyone can read the saved drafts and the notes on them, as they can read the rest of the repo.

## How publishing is kept safe

- Your login reaches the site's repo alone and lasts eight hours at a time; the editor renews it by itself. It is kept in a cookie the page's own scripts cannot read.
- Only the usernames in `ALLOWED_LOGINS` can publish; the site checks this on every change, not only in the editor.
- Publishing can only write the site's content and media, the plugin list, the sitemap, `robots.txt`, the redirects and each page's copy of the site's own `index.html`, and can delete a plugin's folder. The site's code and security files are refused, so someone who took over an editor session could not plant code.
- Saving drafts writes only the `urd-drafts` branch, never the site's own branch.

## Testing the publishing locally (Urd developers)

```bash
cd template
# Put test values in .dev.vars (ignored by git; never commit real secrets):
#   GITHUB_REPO=test/test
#   GITHUB_CLIENT_ID=fake
#   GITHUB_CLIENT_SECRET=fake
#   ALLOWED_LOGINS=yourusername
npx wrangler pages dev . --port 8788
```

The site, the editor and the functions then all run on `http://localhost:8788`. A full login needs a real GitHub App with a **Redirect URI** on localhost, `http://localhost:8788/api/github/callback`, but the error answers and the path checks can be tested without one.

## Troubleshooting

| What you see | Likely cause |
|---|---|
| «Publishing is not configured: the environment variable X is missing» | The variable is missing in Cloudflare, or the site has not been deployed since it was added (step 4) |
| GitHub says «The redirect_uri is not associated with this application» when you log in | No **Redirect URI** in the GitHub App has the address you opened the editor at; your own domain needs one of its own (see «Your own domain») |
| «Invalid OAuth state (try signing in again)» when logging in | You pressed Cancel on GitHub's page, more than ten minutes passed there, or the browser blocks cookies; log in again |
| GitHub shows a 404 page when you log in | The Client ID in Cloudflare is not the app's, or the site has not been deployed since it was added |
| «GitHub rejected the login (expired token?) - sign in again» when publishing, or «Invalid or expired sign-in» in Drafts, History or Updates | The login has run out, or it was ended on GitHub's side. Log out and in again |
| «The GitHub user "X" does not have publishing access» | The username is not in `ALLOWED_LOGINS` (check the spelling; capital letters do not matter) |
| «Could not commit to GitHub» | The GitHub App is not installed on the site's repo, or its **Contents** permission is not **Read and write**; with an OAuth App, the repo is private and `GITHUB_SCOPE` is not `repo`. It can also be someone changing the branch at the same moment |
| Publishing works, but the site does not change | `GITHUB_ROOT_DIR` is missing or wrong, so the change lands outside the website's folder (check which files the change touched on GitHub) |
| «Payment is not set up for this site yet» on the checkout page | One of the four Vipps secrets is missing in Cloudflare, or the site has not been deployed since they were added |
| «Pay with card» answers that payment is not set up | `STRIPE_SECRET_KEY` is missing, is the publishable key (`pk_…`) instead of the secret one, or the site has not been deployed since it was added |
| «Pay with PayPal» answers that PayPal does not take the currency | The shop currency is one PayPal does not take (ISK), or a price has decimals in HUF, JPY or TWD, which PayPal takes in whole units only |
| The Vipps payment fails before the app opens | `VIPPS_API_BASE` points at the test environment while the keys are production keys, or the other way round |
| The change is in the repo, but no deploy appears | Cloudflare missed the change (it happens now and then). Set `DEPLOY_HOOK_URL` (see Optional settings), and publishing starts the deploy itself |
| «GitHub refused the branch the saved drafts live on (urd-drafts)» in Drafts | A ruleset or branch protection rule covers every branch; leave `urd-drafts` out of it (see [Saved drafts](#saved-drafts)) |
