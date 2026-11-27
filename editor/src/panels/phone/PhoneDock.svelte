<script>
  /* The page's blocks in phone order in a column at the stage's right edge («Order on the right»), folding to a slim tab; the last fold is kept. */
  import { getContext } from 'svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import { dockMotion } from '../../lib/motion.svelte.js';
  import PhoneOutline from './PhoneOutline.svelte';
  const ed = getContext('urd-editor');
</script>

{#if ed.phoneDockOpen}
  <aside class="phone-dock" aria-label={ta('lbl.phoneBlocks')} inert={Boolean(ed.looking)} transition:dockMotion>
    <div class="phone-dock-body">
      <PhoneOutline onfold={() => ed.setPhoneDockOpen(false)} />
    </div>
  </aside>
{:else}
  <button type="button" class="phone-dock-tab" title={ta('phone.dockOpen')} aria-label={ta('phone.dockOpen')} inert={Boolean(ed.looking)} onclick={() => ed.setPhoneDockOpen(true)}>{@html ICONS.foldLeft}</button>
{/if}

<style>
  /* The column on the panel's surface, its edge towards the stage; the body keeps its width while the column slides, so the rows never wrap on the way */
  .phone-dock {
    flex: none;
    overflow: hidden;
    background: var(--urd-color-surface, #151a23);
    border-left: 1px solid rgb(255 255 255 / 8%);
  }

  .phone-dock-body {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 280px;
    height: 100%;
    font-size: 0.88rem;
  }

  /* The folded column: a slim tab at the stage's edge, as the tab layouts fold their panel */
  .phone-dock-tab {
    display: grid;
    flex: none;
    place-items: start center;
    width: 1.6rem;
    padding: 0.9rem 0 0;
    line-height: 0;
    color: inherit;
    cursor: pointer;
    background: var(--urd-color-surface, #151a23);
    border: 0;
    border-left: 1px solid rgb(255 255 255 / 8%);
    opacity: 0.7;
  }

  .phone-dock-tab:hover,
  .phone-dock-tab:focus-visible {
    opacity: 1;
  }
</style>
