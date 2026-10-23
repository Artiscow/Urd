/**
 * The one network primitive the payment layer's helpers share: fetch with a
 * timeout, so a provider that does not answer never holds a function open
 * past the platform's limit.
 */

/** A provider answers within this, or the call is given up. */
export const TIMEOUT_MS = 10000;

/** fetch with a timeout; a network failure or a timeout gives null. */
export async function fetchWithin(url, init = {}, ms = TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
