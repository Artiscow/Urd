/**
 * Optional payment layer (ADR-0020): whether a Vipps Checkout session was paid.
 * The checkout page asks here on its return from Vipps, with the reference
 * the return address carries, and empties the basket only on a paid session.
 * The site stores no order; the answer is read from Vipps each time.
 */
import { vippsConfig, isReference } from '../../_lib/vipps.js';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

export async function onRequestGet({ request, env }) {
  const config = vippsConfig(env);
  if (!config) return json({ error: 'Payment is not configured', code: 'vippsNotConfigured' }, 503);
  const reference = new URL(request.url).searchParams.get('reference');
  if (!isReference(reference)) return json({ error: 'Invalid reference', code: 'orderInvalid' }, 400);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  let upstream;
  try {
    upstream = await fetch(`${config.apiBase}/checkout/v3/session/${reference}`, {
      signal: controller.signal,
      headers: {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        'Ocp-Apim-Subscription-Key': config.subscriptionKey,
        'Merchant-Serial-Number': config.msn,
        'Vipps-System-Name': 'urd',
      },
    });
  } catch {
    clearTimeout(timer);
    return json({ error: 'Could not reach Vipps', code: 'vippsUnreachable' }, 502);
  }
  clearTimeout(timer);
  if (!upstream.ok) {
    return json({ error: `Vipps responded ${upstream.status}`, code: 'vippsUpstreamStatus', status: upstream.status }, 502);
  }
  let session = null;
  try {
    session = await upstream.json();
  } catch {
    return json({ error: 'Unexpected response from Vipps', code: 'vippsUnexpected' }, 502);
  }
  const state = typeof session?.sessionState === 'string' ? session.sessionState : '';
  if (!state) return json({ error: 'Unexpected response from Vipps', code: 'vippsUnexpected' }, 502);
  return json({ paid: state === 'PaymentSuccessful', state });
}
