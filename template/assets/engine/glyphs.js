/**
 * Delt tegndata: kategoriene i tegn-/emojivelgeren og logikken for
 * «Nylige»-listen. Brukes av både admin-panelets GlyphPicker og
 * teksteditor-linjens tegnmeny (preview-edit.js), så de to alltid
 * viser samme utvalg og deler nylig-historikk (samme localStorage-
 * nøkkel, samme opprinnelse).
 */

export const GLYPH_RECENT_KEY = 'urd-recent-glyphs';

export const GLYPH_RECENT_MAX = 16;

/** @type {Array<[string, string]>} Kategorinavn + mellomrom-separerte tegn. */
export const GLYPH_CATEGORIES = [
  ['Symboler', '★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂'],
  ['Piler', '→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›'],
  ['Smilefjes', '😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶'],
  ['Gester og folk', '👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑'],
  ['Natur', '🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕'],
  ['Mat og drikke', '☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫'],
  ['Aktivitet', '⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘'],
  ['Objekter', '💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼'],
  ['Hjerter', '❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟'],
];

/**
 * Legger et valgt tegn fremst i nylig-listen: uten duplikater, med tak.
 * Ren funksjon (listelogikken testes uten localStorage).
 * @param {string[]} recent
 * @param {string} glyph
 * @returns {string[]}
 */
export function pushRecentGlyph(recent, glyph) {
  const list = Array.isArray(recent) ? recent : [];
  return [glyph, ...list.filter((g) => g !== glyph)].slice(0, GLYPH_RECENT_MAX);
}

/** Leser nylig-listen fra localStorage; ødelagt innhold gir tom liste. */
export function readRecentGlyphs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(GLYPH_RECENT_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Lagrer et valgt tegn i nylig-listen og returnerer den nye listen. */
export function saveRecentGlyph(glyph) {
  const next = pushRecentGlyph(readRecentGlyphs(), glyph);
  try {
    localStorage.setItem(GLYPH_RECENT_KEY, JSON.stringify(next));
  } catch { /* full/utilgjengelig lagring skal aldri velte redigeringen */ }
  return next;
}
