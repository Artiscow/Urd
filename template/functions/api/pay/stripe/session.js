/**
 * Optional payment layer (ADR-0028): whether a Stripe Checkout Session was paid or its payment held.
 * The checkout page asks here on its return from Stripe with the reference and the session's id it kept when it sent the buyer there, and empties the basket only for a confirmed payment; the name, email and phone Stripe collected and the amount come along for the receipt, for the page that started the payment alone (the buyer key, order.js sessionAnswer).
 * The site stores no order; the answer is read from Stripe each time.
 */
import { isReference, hasBuyerKey, sessionAnswer, majorAmount, json } from '../../../_lib/order.js';
import { stripeConfig, isSessionId, sessionSummary } from '../../../_lib/stripe.js';
import { callStripe } from '../../../_lib/stripe-api.js';

export async function onRequestGet({ request, env }) {
  const config = stripeConfig(env);
  if (!config) return json({ error: 'Stripe is not configured', code: 'payNotConfigured', provider: 'Stripe' }, 503);
  const params = new URL(request.url).searchParams;
  const reference = params.get('reference');
  const pid = params.get('pid');
  if (!isReference(reference) || !isSessionId(pid)) return json({ error: 'Invalid reference', code: 'orderInvalid' }, 400);

  const answer = await callStripe(config, `/v1/checkout/sessions/${pid}?expand[]=payment_intent`);
  if (!answer.ok) return json({ error: answer.error, code: answer.code, provider: 'Stripe', status: answer.upstream }, answer.status);
  const summary = sessionSummary(answer.data);
  if (!summary) return json({ error: 'Unexpected response from Stripe', code: 'payUnexpected', provider: 'Stripe' }, 502);
  // The session must be the one this checkout made for the reference, so another session's id confirms nothing.
  if (summary.reference !== reference) return json({ error: 'Invalid reference', code: 'orderInvalid' }, 400);
  const amount = majorAmount(answer.data?.amount_total, answer.data?.currency);
  return json(sessionAnswer({ ...summary, amount }, await hasBuyerKey(request, config.secretKey, reference)));
}

/** The checkout page asks every provider with a POST (PayPal's ask may capture); the answer is the same read. */
export const onRequestPost = onRequestGet;
