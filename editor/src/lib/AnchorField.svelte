<script>
  /* The name a section or block carries for links (anchor-model.js): typed, or taken from a suggestion drawn from its own words, and checked against the page as it is typed.
     The typed words are written as a name (Priser becomes priser), and a name another spot holds or words with no letters or digits are refused with a note.
     An emptied field removes the name; the spot's own id still takes links.
     «Copy link» copies the address within the site that lands on the spot (/kaker#priser), by its name, or else by its id.
     Under the field stand the links that point at the spot from this page, the menu and the footer (spotLinks); pressing one selects its block or opens its panel. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ANCHOR_MAX, anchorError, suggestAnchor, spotLinks } from '$engine/anchor-model.js';
  import { slugText } from '$engine/imageTools.js';
  import { ICONS } from './icons.js';
  const ed = getContext('urd-editor');
  /** value: the stored name ('' = none); own: the spot's id; taken: () => the ids in use on the page apart from this spot; words: what the suggestion is made from; path: the page's address. */
  let { value = '', own, taken, words = '', path = '/', onchange } = $props();
  const uid = Math.random().toString(36).slice(2, 8);
  /** What each reason anchorError gives says to the owner. */
  const ERROR_KEYS = { form: 'error.anchorForm', reserved: 'error.anchorReserved', taken: 'error.anchorTaken' };

  /** What the owner is typing; null while the field shows the stored name. */
  let typed = $state(null);
  const wanted = $derived(typed === null ? value : slugText(typed).slice(0, ANCHOR_MAX).replace(/-+$/, ''));
  const error = $derived.by(() => {
    if (typed === null) return null;
    // Words with no letters or digits give no name: refused, so the name the spot has is never lost to them.
    if (!wanted) return typed.trim() ? 'form' : null;
    return wanted === value ? null : anchorError(wanted, taken());
  });
  const suggestion = $derived(value || typed ? '' : suggestAnchor(words, taken()));

  function commit() {
    if (typed === null || error) return;
    if (wanted !== value) onchange(wanted);
    typed = null;
  }

  function useSuggestion() {
    typed = null;
    onchange(suggestion);
  }

  // The page's own data is not reactive: the count of saved changes makes the list follow every change on the page.
  const uses = $derived.by(() => {
    void ed.edits;
    return spotLinks({ id: own, name: value }, { page: ed.store?.data, pageId: ed.pageId, path, site: ed.siteDraft });
  });

  /** A link's place in words: the block with its type and words, or the menu or footer item after its panel's name. */
  function useText(use) {
    if (use.area === 'page') return use.words ? ta('link.useBlock', { type: ed.blockLabel(use.type), words: use.words }) : ed.blockLabel(use.type);
    const area = ta(use.area === 'menu' ? 'panel.nav' : 'panel.footer');
    return use.words ? `${area} › ${use.words}` : area;
  }

  function goToUse(use) {
    if (use.area === 'page') ed.bridge?.sendSelect(use.blockId);
    else ed.openPanel(use.area === 'menu' ? 'nav' : 'footer');
  }

  function copyLink() {
    const link = `${path}#${value || own}`;
    // Without a clipboard (an address that is not secure) the toast gives the link to copy by hand.
    const fail = () => ed.setStatus(ta('status.linkCopyFailed', { url: link }), 'info');
    if (!navigator.clipboard) {
      fail();
      return;
    }
    navigator.clipboard.writeText(link).then(() => ed.setStatus(ta('status.linkCopied', { url: link }), 'ok'), fail);
  }
</script>

<div class="anchor-row">
  <label class="field-stack" title={ta('tip.anchorName')}>{ta('lbl.anchorName')}
    <input value={typed ?? value} spellcheck="false" autocomplete="off" placeholder={suggestion}
      class:anchor-error={error} aria-invalid={Boolean(error)} aria-describedby={error ? `anchor-note-${uid}` : undefined}
      oninput={(e) => (typed = e.target.value)} onchange={commit}
      onkeydown={(e) => {
        if (e.key === 'Escape' && typed !== null) {
          e.stopPropagation();
          typed = null;
        }
      }} /></label>
  <button type="button" class="ghost row-tool" title={ta('tip.copyLink')} aria-label={ta('tip.copyLink')} onclick={copyLink}>{@html ICONS.copy}</button>
</div>
{#if suggestion}
  <button type="button" class="linkish anchor-suggest" title={ta('tip.anchorSuggest')} onclick={useSuggestion}>{ta('ui.useName', { name: suggestion })}</button>
{/if}
{#if error}
  <p id="anchor-note-{uid}" class="panel-hint place-error" aria-live="polite">{ta(ERROR_KEYS[error])}</p>
{/if}
{#if uses.length}
  <div class="anchor-uses">
    <span class="mini-label">{ta('link.usedBy')}</span>
    {#each uses as use, i (i)}
      <button type="button" class="linkish anchor-use" title={ta('tip.link.use')} onclick={() => goToUse(use)}>{useText(use)}</button>
    {/each}
  </div>
{/if}

<style>
  .anchor-row {
    display: flex;
    gap: 6px;
    align-items: flex-end;
  }

  .anchor-row label {
    flex: 1;
    min-width: 0;
  }

  .anchor-suggest {
    justify-self: start;
    text-align: left;
  }

  .anchor-uses {
    display: grid;
    justify-items: start;
    gap: 2px;
    min-width: 0;
  }

  .anchor-use {
    max-width: 100%;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .anchor-error {
    border-color: #e05252;
  }
</style>
