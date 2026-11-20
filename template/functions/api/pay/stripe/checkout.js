/**
 * Optional payment layer (ADR-0028): creates a Stripe Checkout Session for
 * the cart and answers with the address of Stripe's hosted page; the client
 * redirects there and the buyer pays with any method the owner has switched
 * on in the Stripe dashboard. The amount is recomputed from the git-owned
 * catalogue in the site's currency (never the client's numbers), and the
 * secret key lives in the Cloudflare environment. Without it the answer is
 * 503, and the checkout block shows a calm unavailable message.
 */
import { prepareOrder, makeReference, buyerKey, json } from '../../../_lib/order.js';
import { stripeConfig, sessionForm } from '../../../_lib/stripe.js';
import { callStripe } from '../../../_lib/stripe-api.js';

export async function onRequestPost({ request, env }) {
  const config = stripeConfig(env);
  if (!config) return json({ error: 'Stripe is not configured', code: 'payNotConfigured', provider: 'Stripe' }, 503);
  const prepared = await prepareOrder(request, 'stripe');
  if (prepared.error) return prepared.error;
  const { clean, origin, site, catalogs, currency, settings } = prepared;
  // The capture mode is the setting of the checkout block the buyer orders from (prepareOrder); anything but «now» holds the money.
  const capture = settings.capture === 'now' ? 'now' : 'ship';
  const reference = makeReference();
  const form = sessionForm({
    order: clean.order,
    catalogs,
    currency,
    reference,
    contact: clean.contact,
    origin,
    returnPath: clean.returnPath,
    draft: clean.draft,
    capture,
    lang: site?.lang,
  });
  if (!form) return json({ error: 'Unknown product in the order', code: 'orderInvalid' }, 400);
  // The reference doubles as the idempotency key: a retried create of the same session makes no second one.
  const answer = await callStripe(config, '/v1/checkout/sessions', { method: 'POST', form, headers: { 'Idempotency-Key': reference } });
  if (!answer.ok) return json({ error: answer.error, code: answer.code, provider: 'Stripe', status: answer.upstream }, answer.status);
  const { url, id } = answer.data ?? {};
  if (typeof url !== 'string' || !/^https:\/\//.test(url) || typeof id !== 'string') {
    return json({ error: 'Unexpected response from Stripe', code: 'payUnexpected', provider: 'Stripe' }, 502);
  }
  // The reference, the session's id and the buyer key go to the client, which keeps them for the return (blocks/checkout.js).
  return json({ url, reference, pid: id, key: await buyerKey(config.secretKey, reference) });
}

/** Whether the provider is set up, and on its test keys: the editor's checkout block asks on a click, and the published checkout shows a line while test keys are in use. No secret leaves; the answer is never cached. */
export function onRequestGet({ env }) {
  const config = stripeConfig(env);
  return new Response(JSON.stringify({ configured: Boolean(config), test: Boolean(config?.test) }), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}
