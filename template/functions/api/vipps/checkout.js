/**
 * Optional payment layer (ADR-0020): creates a payment on the Vipps MobilePay
 * ePayment API for the cart and answers with the address the buyer is sent
 * to; the client redirects there, and the money is reserved until the seller
 * captures it in the Vipps portal when the goods ship. The amount is
 * recomputed from the git-owned catalogue (never the client's numbers), and
 * the secrets live in the Cloudflare environment. Without configuration the
 * answer is 503, and the checkout block shows a calm unavailable message
 * (the form checkout works unchanged).
 */
import { vippsConfig, validOrderPayload, orderAmountOre, validVariants, makeReference, receiptLines, buildPayment } from '../../_lib/vipps.js';
import { callVipps } from '../../_lib/vipps-api.js';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/** A JSON file from our own deploy, or null. */
async function ownJson(origin, path) {
  try {
    const res = await fetch(`${origin}${path}`);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function onRequestPost({ request, env }) {
  const config = vippsConfig(env);
  if (!config) return json({ error: 'Payment is not configured', code: 'vippsNotConfigured' }, 503);

  let payload = null;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request body', code: 'orderInvalid' }, 400);
  }
  const clean = validOrderPayload(payload);
  if (!clean) return json({ error: 'Invalid order', code: 'orderInvalid' }, 400);

  // The catalogues come from our own deploy (same origin): git is the source of truth for prices.
  const origin = new URL(request.url).origin;
  const index = await ownJson(origin, '/content/samlinger.json');
  if (!index) return json({ error: 'Could not read the catalogue', code: 'catalogUnreachable' }, 502);
  const catalogs = (await Promise.all((index.samlinger ?? []).slice(0, 50).map((id) => ownJson(origin, `/content/samlinger/${encodeURIComponent(id)}.json`)))).filter(Boolean);
  const amountOre = orderAmountOre(clean.order, catalogs);
  if (amountOre == null || amountOre <= 0) {
    return json({ error: 'Unknown product in the order', code: 'orderInvalid' }, 400);
  }
  // The variant text goes on the receipt, so it must be a choice the product has.
  if (!validVariants(clean.order, catalogs)) {
    return json({ error: 'Unknown variant in the order', code: 'orderInvalid' }, 400);
  }
  // The receipt in the buyer's app carries the lines without tax, so only a seller outside the VAT register sends one (the VAT lines come with the shop of v1.1, ADR-0027).
  const site = await ownJson(origin, '/content/site.json');
  const receipt = site?.contact?.vat?.registered === true ? null : receiptLines(clean.order, catalogs);

  const reference = makeReference();
  const body = buildPayment({
    amountOre,
    reference,
    order: clean.order,
    contact: clean.contact,
    origin,
    returnPath: clean.returnPath,
    receipt,
  });
  // The reference doubles as the idempotency key: a retried create of the same payment makes no second one.
  const answer = await callVipps(config, '/epayment/v1/payments', { method: 'POST', body, headers: { 'Idempotency-Key': reference } });
  if (!answer.ok) return json({ error: answer.error, code: answer.code, status: answer.upstream }, answer.status);
  if (typeof answer.data?.redirectUrl !== 'string' || !/^https:\/\//.test(answer.data.redirectUrl)) {
    return json({ error: 'Unexpected response from Vipps', code: 'vippsUnexpected' }, 502);
  }
  // The reference goes to the client too, which keeps it for the return (blocks/checkout.js).
  return json({ url: answer.data.redirectUrl, reference });
}
