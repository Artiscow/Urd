<script>
  /* What waits to be published, as rows that lead to the change (lib/unpublished.js): a sign for the kind, the part's name, what it is, and a chevron that opens the row.
     Open, a row lists the steps made on the part since the last publish, newest first, from the undo history (stepsForPart), each with its words and how long ago; a part with no step of its own kept (made inside another step, or before the kept steps) says so.
     Drawn in the Publish menu and in History's «Not published yet», from the same parts, so the two never disagree; `onpick(part)` takes the owner to the change.
     With `bands`, where the drafts can be saved (ADR-0032), the rows stand under «In this browser» and «Saved» by where each part stands (lib/saved-model.js standing), and a part saved on another device since this browser last saw it says so under its row, with `onuse(part)` taking the saved one.
     With `ontick(name)`, each row has the tick the Drafts window's rows have (`later`, the parts unticked): ticked, the part goes with the next publish; unticked, it is kept for later, and says so; one unticked that goes anyway with another (`forced`, lib/publish-pick.js) stands ticked and fixed, and names the part it goes with. */
  import { ta, adminLang } from '$engine/i18n.js';
  import { ICONS } from './icons.js';
  import { stepsForPart } from './unpublished.js';
  import { partName } from './saved-model.js';
  import { timeAgo } from './time-ago.js';
  import { rowMotion } from './motion.svelte.js';
  let { parts, steps = [], publishedAt = 0, onpick, bands = false, onuse = null, whenSaved = (iso) => iso, later = [], forced = new Map(), ontick = null } = $props();
  /** The rows in their bands, or one band of them all where the drafts are not saved. */
  const groups = $derived(bands
    ? [['browser', 'saved.band.browser'], ['saved', 'saved.band.saved']].map(([band, word]) => ({ band, word, rows: parts.filter((p) => p.band === band) })).filter((g) => g.rows.length)
    : [{ band: null, word: null, rows: parts }]);

  /** The sign and the words of a part without a name of its own. */
  const KINDS = {
    page: { icon: ICONS.panel_pages, word: 'unpublished.page' },
    site: { icon: ICONS.panel_site, name: 'unpublished.site' },
    collections: { icon: ICONS.panel_collections, name: 'unpublished.collections' },
    collection: { icon: ICONS.panel_collections, word: 'unpublished.collection' },
    templates: { icon: ICONS.panel_blocks, name: 'canvas.tabMyTemplates' },
    plugins: { icon: ICONS.panel_plugins, name: 'panel.plugins' },
    redirects: { icon: ICONS.redirect, name: 'ui.redirects' },
  };
  const keyOf = (part) => `${part.kind}:${part.id ?? ''}`;
  /** Tells this list's step ids from the other list's, since the rows stand in the menu and in History at once. */
  const uid = Math.random().toString(36).slice(2, 7);
  const nameOf = (part) => part.name ?? ta(KINDS[part.kind].name);
  const wordOf = (part) => (KINDS[part.kind].word ? ta(KINDS[part.kind].word) : '');
  const ago = (at) => timeAgo(at, adminLang()) || ta('history.now');

  /** Whether a part goes with the next publish: ticked, or going anyway with another. */
  const goes = (name) => !later.includes(name) || forced.has(name);

  /** A tick pressed: the part kept for later or ticked, and the box drawn as the part stands, since one unticked that goes anyway with another stays ticked. */
  function pressTick(event, name) {
    ontick(name);
    event.currentTarget.checked = goes(name);
  }

  /** What a row says beside its name: the part it goes out with where it goes anyway, that it is kept for later where unticked, else its kind. */
  function stateOf(part) {
    if (ontick && later.includes(part.part)) {
      const by = forced.get(part.part);
      if (by === 'moves') return ta('publish.forced.moves');
      if (by) {
        const with_ = parts.find((p) => p.part === by);
        return ta('publish.forced', { name: with_ ? nameOf(with_) : by });
      }
      return ta('drafts.later');
    }
    return wordOf(part);
  }

  /** The rows that stand open, by the part's key. */
  let open = $state(new Set());
  function toggle(part) {
    const next = new Set(open);
    if (next.has(keyOf(part))) next.delete(keyOf(part));
    else next.add(keyOf(part));
    open = next;
  }
</script>

{#each groups as group (group.band)}
{#if group.word}<span class="mini-label unpub-band" class:saved={group.band === 'saved'}>{ta(group.word)} · {group.rows.length}</span>{/if}
<div class="unpub-rows" role="list">
  {#each group.rows as part (keyOf(part))}
    {@const isOpen = open.has(keyOf(part))}
    {@const kept = Boolean(ontick) && later.includes(part.part) && !forced.has(part.part)}
    {@const fixed = Boolean(ontick) && later.includes(part.part) && forced.has(part.part)}
    {@const state = stateOf(part)}
    <div class="unpub-item" class:later={kept} role="listitem">
      <div class="unpub-row">
        {#if ontick}
          <input type="checkbox" class="tick-box unpub-tick" checked={goes(part.part)} disabled={fixed} aria-label={nameOf(part)} title={fixed ? undefined : ta('tip.drafts.tick')} onchange={(e) => pressTick(e, part.part)} />
        {/if}
        <button type="button" class="unpub-go" title={ta('tip.unpublished.go', { name: nameOf(part) })} onclick={() => onpick(part)}>
          <span class="unpub-sign">{@html KINDS[part.kind].icon}</span>
          <span class="unpub-name">{nameOf(part)}</span>
          {#if state}<span class="unpub-kind">{state}</span>{/if}
        </button>
        <button type="button" class="unpub-chev" class:open={isOpen} aria-expanded={isOpen} aria-controls={`unpub-steps-${uid}-${keyOf(part)}`} aria-label={ta('tip.unpublished.steps', { name: nameOf(part) })} title={ta('tip.unpublished.steps', { name: nameOf(part) })} onclick={() => toggle(part)}>{@html ICONS.chevronDown}</button>
      </div>
      {#if isOpen}
        {@const list = stepsForPart(part, steps, typeof publishedAt === 'function' ? publishedAt(partName(part)) : publishedAt)}
        <div class="unpub-steps" id={`unpub-steps-${uid}-${keyOf(part)}`} transition:rowMotion>
          {#each list as step, i (`${step.at}:${i}`)}
            <div class="unpub-step"><span class="unpub-step-ico">{@html ICONS[step.icon] ?? ICONS.pencil}</span><span class="unpub-step-words">{ta(step.labelKey)}</span><small>{ago(step.at)}</small></div>
          {:else}
            <div class="unpub-step unpub-step-none">{ta('unpublished.noSteps')}</div>
          {/each}
        </div>
      {/if}
      {#if part.elsewhere && onuse}
        <div class="unpub-elsewhere">
          <span>{ta('saved.elsewhere', { when: whenSaved(part.elsewhere.savedAt), who: part.elsewhere.saver ?? '' })}</span>
          <button type="button" class="ghost" title={ta('tip.saved.use')} onclick={() => onuse(part)}>{ta('saved.use')}</button>
        </div>
      {/if}
    </div>
  {/each}
</div>
{/each}

<style>
  .unpub-rows {
    display: grid;
    gap: 2px;
  }

  /* A band's heading: where its parts stand, with a dot in the band's colour */
  .unpub-band {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0.35rem 0 0.1rem;
  }

  .unpub-band::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #e2b84a;
  }

  .unpub-band.saved::before {
    background: var(--urd-color-accent, #7c5cff);
  }

  /* A part saved on another device since: the line under its row, with the way to take the saved one */
  .unpub-elsewhere {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    padding: 0 0.4rem 0.35rem 2.5rem;
    font-size: 0.76rem;
    opacity: 0.85;
  }

  .unpub-elsewhere span {
    flex: 1 1 10rem;
    min-width: 0;
  }

  .unpub-elsewhere .ghost {
    min-height: 1.7rem;
    padding: 0 0.55rem;
    font-size: 0.76rem;
  }

  .unpub-row {
    display: flex;
    align-items: stretch;
    gap: 2px;
    min-width: 0;
  }

  .unpub-go,
  .unpub-chev {
    border: 0;
    border-radius: 7px;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }

  .unpub-go {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    min-height: 2.2rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
    font-size: 0.85rem;
    text-align: left;
  }

  .unpub-go:hover,
  .unpub-go:focus-visible,
  .unpub-chev:hover,
  .unpub-chev:focus-visible {
    background: rgb(255 255 255 / 7%);
  }

  .unpub-go:focus-visible,
  .unpub-chev:focus-visible {
    outline: 2px solid var(--urd-color-accent, #7c5cff);
    outline-offset: -2px;
  }

  .unpub-sign {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 6px;
    background: rgb(255 255 255 / 5%);
    border: 1px solid rgb(255 255 255 / 10%);
    opacity: 0.8;
  }

  .unpub-sign :global(svg) {
    width: 0.85rem;
    height: 0.85rem;
  }

  .unpub-name {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* The kind, or the row's state where it is ticked: as much as the row leaves room for */
  .unpub-kind {
    flex: 0 1 auto;
    max-width: 60%;
    overflow: hidden;
    font-size: 0.74rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 0.6;
  }

  /* The tick before the row, as the Drafts window's rows have it; a part kept for later stands dimmed */
  .unpub-tick:not(:where(.dd *, .cp *, .gp *, .mp *, .dp-overlay *, .choice *)) {
    flex: none;
    align-self: center;
    margin: 0 0.1rem 0 0.35rem;
  }

  /* A part that goes anyway with another: its tick stands fixed, dimmed */
  .unpub-tick:disabled {
    opacity: 0.45;
    cursor: default;
  }

  .later .unpub-go {
    opacity: 0.6;
  }

  /* The chevron opens the row's steps; it turns as the row opens */
  .unpub-chev {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 1.8rem;
    padding: 0;
    opacity: 0.55;
  }

  .unpub-chev :global(svg) {
    width: 0.75rem;
    height: 0.75rem;
    transition: transform 0.15s ease;
  }

  .unpub-chev.open :global(svg) {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .unpub-chev :global(svg) { transition: none; }
  }

  /* The steps under an open row, set in under the sign */
  .unpub-steps {
    display: grid;
    gap: 1px;
    padding: 0 0.4rem 0.4rem 2.5rem;
    overflow: hidden;
  }

  .unpub-step {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 1.6rem;
    font-size: 0.78rem;
    opacity: 0.85;
  }

  .unpub-step-ico {
    display: inline-flex;
    flex: none;
    opacity: 0.7;
  }

  .unpub-step-ico :global(svg) {
    width: 0.75rem;
    height: 0.75rem;
  }

  .unpub-step-words {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .unpub-step small {
    flex: none;
    font-size: 0.7rem;
    opacity: 0.6;
    font-variant-numeric: tabular-nums;
  }

  .unpub-step-none {
    opacity: 0.55;
  }
</style>
