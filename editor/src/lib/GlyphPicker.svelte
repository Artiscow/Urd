<script>
  /**
   * Tegn-/emojivelger: knapp som viser gjeldende tegn og åpner en omfattende, kategorisert meny med nylige tegn øverst.
   * Kan i tillegg ta imot et eget opplastet ikon-bilde (webp-komprimert) når onimage er satt.
   * Popoveren er position: fixed (panelene klipper absolute innhold) og lukkes ved klikk utenfor eller Escape, samme mønster som ColorPicker.
   */
  import { compressToWebp } from './imageTools.js';

  let { value = '★', label = 'Velg tegn', onpick, onimage } = $props();

  const RECENT_KEY = 'urd-recent-glyphs';

  const CATEGORIES = [
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

  let recent = $state([]);
  let rootEl = $state(null);
  let fileEl = $state(null);
  let open = $state(false);
  let pos = $state({ top: 0, left: 0 });

  function openPicker() {
    try {
      const parsed = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]');
      recent = Array.isArray(parsed) ? parsed : [];
    } catch {
      recent = [];
    }
    const r = rootEl.getBoundingClientRect();
    const W = 292;
    const H = 380;
    const left = Math.max(8, Math.min(r.right - W, window.innerWidth - W - 8));
    const top = r.bottom + H + 8 > window.innerHeight ? Math.max(8, r.top - H - 8) : r.bottom + 6;
    pos = { top, left };
    open = true;
  }

  function pick(glyph) {
    const next = [glyph, ...recent.filter((g) => g !== glyph)].slice(0, 16);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    onpick?.(glyph);
    open = false;
  }

  async function uploadOwn(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const img = await compressToWebp(file, 256);
    onimage?.(img.dataUrl);
    open = false;
  }

  // Lukk ved klikk utenfor eller Escape (kun mens åpen)
  $effect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootEl && !rootEl.contains(e.target)) open = false;
    };
    const onKey = (e) => {
      if (e.key === 'Escape') open = false;
    };
    const onScroll = (e) => {
      if (rootEl && e.target instanceof Node && !rootEl.contains(e.target)) open = false;
    };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('scroll', onScroll, true);
    };
  });
</script>

<span class="gp" bind:this={rootEl}>
  <button type="button" class="gp-swatch" title={label} aria-label={label}
    onclick={() => (open ? (open = false) : openPicker())}>{value || '★'}</button>
  {#if open}
    <div class="gp-pop" style="top: {pos.top}px; left: {pos.left}px">
      {#if recent.length}
        <div class="gp-group">Nylige</div>
        <div class="gp-grid">
          {#each recent as glyph (glyph)}
            <button type="button" class="gp-cell" onclick={() => pick(glyph)}>{glyph}</button>
          {/each}
        </div>
      {/if}
      {#each CATEGORIES as [name, glyphs] (name)}
        <div class="gp-group">{name}</div>
        <div class="gp-grid">
          {#each glyphs.split(' ') as glyph (glyph)}
            <button type="button" class="gp-cell" class:active={glyph === value}
              onclick={() => pick(glyph)}>{glyph}</button>
          {/each}
        </div>
      {/each}
      {#if onimage}
        <div class="gp-group">Eget ikon</div>
        <button type="button" class="ghost gp-upload" onclick={() => fileEl.click()}>Last opp bilde …</button>
        <input type="file" accept="image/*" hidden bind:this={fileEl} onchange={uploadOwn} />
        <p class="gp-hint">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>
      {/if}
    </div>
  {/if}
</span>

<style>
  .gp {
    position: relative;
    display: inline-flex;
  }

  .gp-swatch {
    width: 2.2rem;
    height: 2.2rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    border: 1px solid rgb(255 255 255 / 25%);
    border-radius: 6px;
    background: rgb(255 255 255 / 7%);
    cursor: pointer;
  }

  .gp-pop {
    position: fixed;
    z-index: 500;
    width: 292px;
    max-height: 380px;
    overflow-y: auto;
    background: var(--urd-color-surface, #151a23);
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 10px;
    box-shadow: 0 12px 32px rgb(0 0 0 / 45%);
    padding: 8px;
  }

  .gp-group {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.6;
    padding: 8px 2px 4px;
  }

  .gp-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2px;
  }

  .gp-cell {
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    font-size: 17px;
    line-height: 1;
    padding: 5px 0;
    cursor: pointer;
    text-align: center;
  }

  .gp-cell:hover {
    background: rgb(255 255 255 / 10%);
  }

  .gp-cell.active {
    border-color: var(--urd-color-accent, #7c5cff);
    background: color-mix(in srgb, var(--urd-color-accent, #7c5cff) 16%, transparent);
  }

  .gp-upload {
    width: 100%;
    justify-content: center;
  }

  .gp-hint {
    margin: 6px 2px 0;
    font-size: 11px;
    opacity: 0.6;
  }
</style>
