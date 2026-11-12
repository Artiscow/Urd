<script>
  /* The banner over the canvas while a saved draft is looked at (state/preview.svelte.js, the Drafts window's Look): which draft, from which browser and when; with «Look at both», the saved version or this browser's; the screen or the phone; «New tab» for a page; «Back to mine», and «Open here» where this browser does not hold the draft as saved.
     The canvas stands framed in amber under it (app.css `.frame-wrap.looking`), with its editing paused until the look ends. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../lib/icons.js';
  import Choice from '../lib/Choice.svelte';
  const ed = getContext('urd-editor');
  const look = $derived(ed.looking);
  const row = $derived(ed.savedList.find((r) => r.part === look?.part));

  /** «Open here»: the look ends, and the saved draft is opened as one undo step, after a question where this browser holds its own changes. */
  function openHere() {
    const part = look.part;
    ed.endLook();
    void ed.openSaved(part);
  }
</script>

{#if look}
  <div class="look-banner" role="region" aria-label={ta('look.label')}>
    <span class="look-eye" aria-hidden="true">{@html ICONS.eye}</span>
    <span class="look-words"><b>{look.name}</b>{#if look.from || look.when}<small>{[look.from, look.when].filter(Boolean).join(' · ')}</small>{/if}</span>
    {#if look.both}
      <span class="look-choice"><Choice fill label={ta('drafts.lookBoth')} value={look.showing} options={[['saved', ta('look.saved')], ['mine', ta('look.mine')]]} onchange={(v) => ed.showLooked(v)} /></span>
    {/if}
    <span class="look-choice"><Choice fill label={ta('look.view')} value={ed.deviceId === 'mobile' ? 'mobile' : 'desktop'} options={[['desktop', ta('look.screen')], ['mobile', ta('look.phone')]]} onchange={(v) => { ed.deviceId = v; }} /></span>
    {#if look.part.startsWith('page-')}<button type="button" class="ghost look-act" onclick={() => ed.openSavedInTab(look.part)}>{ta('drafts.newTab')}</button>{/if}
    <button type="button" class="ghost look-act" onclick={() => ed.endLook()}>{ta('look.back')}</button>
    {#if row && row.here !== 'same'}<button type="button" class="primary look-act" onclick={openHere}>{ta('saved.open')}</button>{/if}
  </div>
{/if}

<style>
  /* At the canvas's top left, clear of the Drafts window, which opens under or beside its tab */
  .look-banner {
    position: absolute;
    top: 10px;
    left: 12px;
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: max-content;
    max-width: calc(100% - 24px);
    padding: 0.4rem 0.5rem 0.4rem 0.7rem;
    border: 1px solid color-mix(in srgb, #e2b84a 60%, transparent);
    border-radius: 10px;
    background: var(--urd-color-surface, #151a23);
    box-shadow: 0 10px 26px rgb(0 0 0 / 45%);
    color: var(--urd-color-text, #e7e9ee);
    font-size: 0.82rem;
  }

  .look-eye {
    display: inline-flex;
    color: #e2b84a;
  }

  .look-words {
    display: inline-flex;
    align-items: baseline;
    gap: 0.45rem;
    min-width: 0;
  }

  .look-words small {
    opacity: 0.65;
  }

  .look-choice {
    flex: none;
    width: 9.5rem;
  }

  .look-act:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    flex: none;
    min-height: 1.9rem;
    padding: 0 0.7rem;
    font-size: 0.8rem;
  }
</style>
