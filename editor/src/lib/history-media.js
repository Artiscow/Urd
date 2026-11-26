/**
 * The drafts' pictures and films, kept once for the undo steps: a step holds a token made from a data address's content, and the table holds the address.
 */

/** What a token starts with. */
export const MEDIA_TOKEN = 'urd-kept-media:';

/** The shortest data address kept apart: anything shorter stays in the state as it is. */
const MIN_LENGTH = 2048;

/** Two 32-bit hashes of a text, with its length: the token's name for it. */
function nameOf(text) {
  let a = 5381;
  let b = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    a = ((a << 5) + a + c) >>> 0;
    b = (c + (b << 6) + (b << 16) - b) >>> 0;
  }
  return `${a.toString(16).padStart(8, '0')}${b.toString(16).padStart(8, '0')}.${text.length}`;
}

/** Whether a value is a data address long enough to keep apart. */
const isMedia = (value) => typeof value === 'string' && value.length >= MIN_LENGTH && value.startsWith('data:');

/**
 * A table of the pictures the steps hold, and the two ways through it.
 * @returns {{stringify: (value: any) => string, parse: (text: string) => any, get: (token: string) => string|undefined, set: (token: string, address: string) => void, tokensIn: (text: string) => string[], keepOnly: (tokens: Set<string>) => void, size: () => number}}
 */
export function createMediaTable() {
  /** The token of each address, by the address (a text is hashed once). */
  const byAddress = new Map();
  /** The address of each token. */
  const byToken = new Map();
  const tokenOf = (address) => {
    let token = byAddress.get(address);
    if (!token) {
      token = MEDIA_TOKEN + nameOf(address);
      byAddress.set(address, token);
      byToken.set(token, address);
    }
    return token;
  };
  return {
    /** The state as text, each long data address a token. */
    stringify(value) {
      return JSON.stringify(value, (key, v) => (isMedia(v) ? tokenOf(v) : v));
    },
    /** The state from its text, each token its data address again; a token the table does not hold stays as it is. */
    parse(text) {
      return JSON.parse(text, (key, v) => (typeof v === 'string' && v.startsWith(MEDIA_TOKEN) ? byToken.get(v) ?? v : v));
    },
    get: (token) => byToken.get(token),
    /** Takes in an address kept from another session under its token. */
    set(token, address) {
      byToken.set(token, address);
      byAddress.set(address, token);
    },
    /** The tokens a state's text holds. */
    tokensIn(text) {
      return text.includes(MEDIA_TOKEN) ? [...new Set(text.match(/urd-kept-media:[0-9a-f]{16}\.\d+/g) ?? [])] : [];
    },
    /** Lets go of every address no step holds any longer. */
    keepOnly(tokens) {
      for (const [token, address] of byToken) {
        if (tokens.has(token)) continue;
        byToken.delete(token);
        byAddress.delete(address);
      }
    },
    size: () => byToken.size,
  };
}
