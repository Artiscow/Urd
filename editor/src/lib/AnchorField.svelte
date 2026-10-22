<script>
  /* The name a section or block carries for links (anchor-model.js): typed, or taken from a suggestion drawn from its own words, and checked against the page as it is typed.
     The typed words are written as a name (Priser becomes priser), and a name another spot holds or words with no letters or digits are refused with a note.
     An emptied field removes the name; the spot's own id still takes links.
     «Copy link» copies the address within the site that lands on the spot (/kaker#priser), by its name, or else by its id. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ANCHOR_MAX, anchorError, suggestAnchor } from '$engine/anchor-model.js';
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
  <button type="button" class="ghost action" title={ta('tip.anchorSuggest')} onclick={useSuggestion}>{ta('ui.useName', { name: suggestion })}</button>
{/if}
{#if error}
  <p id="anchor-note-{uid}" class="panel-hint place-error" aria-live="polite">{ta(ERROR_KEYS[error])}</p>
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

  .anchor-error {
    border-color: #e05252;
  }
</style>
