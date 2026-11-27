<script>
  /* The site's security headers in plain words: what an update changes and keeps, or the edits to make by hand, and the file as written behind a button. */
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import ReadingWindow from '../../lib/ReadingWindow.svelte';
  import { headerChanges, keptWords, policyTable, otherRules, handEdits } from '../../lib/headers-words.js';
  import { say, changeText, keptText } from '../../lib/headers-text.js';

  /** `headers` is the update check's; `primary` the action that writes it, `{ label, run, disabled, title }`, or none where it is changed by hand. */
  let { headers, primary = null, onclose } = $props();

  const byHand = $derived(headers.state === 'edited');
  /** The site has no file at all, which the check says with a null. */
  const missing = $derived(byHand && headers.site === null);
  /** The check sent the site's file and the release it came from, so the file reads in words; an updater without them shows the file alone. */
  const worded = $derived(typeof headers.site === 'string' && typeof headers.from === 'string');
  const changes = $derived(!worded ? [] : byHand ? headerChanges(headers.from, headers.text) : headerChanges(headers.site, headers.text));
  const yours = $derived(worded && byHand ? headerChanges(headers.from, headers.site) : []);
  const kept = $derived(worded && !byHand ? keptWords(headers.added) : []);
  const table = $derived(policyTable(headers.text, byHand ? [] : headers.added));
  const others = $derived(otherRules(headers.text));
  const edits = $derived(worded && byHand ? handEdits(headers.from, headers.text, headers.site) : []);
  /** The file's page on GitHub, where it is edited: an address on github.com alone. */
  const editUrl = $derived.by(() => {
    try {
      const url = new URL(headers.edit ?? '');
      return url.protocol === 'https:' && url.host === 'github.com' ? url.href : null;
    } catch {
      return null;
    }
  });
  /** The file as written, shown in the words' place. */
  let asWritten = $state(false);
  /** The text copied last, by its place, which says so for a moment; and the one that could not be copied. */
  let copied = $state(-1);
  let failed = $state(-1);
  let copiedTimer = 0;

  const ADDS = new Set(['added', 'sourcesAdded', 'kindNew']);
  const TAKES = new Set(['removed', 'sourcesRemoved', 'kindGone']);

  function stepText(edit) {
    const vars = { path: edit.path, name: edit.name ?? '', directive: edit.directive ?? '', sources: edit.sources ?? '' };
    return ta(`hdr.step.${edit.step}`, vars);
  }

  async function copy(text, index) {
    clearTimeout(copiedTimer);
    try {
      await navigator.clipboard.writeText(text);
      [copied, failed] = [index, -1];
      copiedTimer = setTimeout(() => { copied = -1; }, 2000);
    } catch {
      [copied, failed] = [-1, index];
    }
  }
</script>

<!-- A change with its mark: a release's new rule in the accent with its badge, the owner's own with the check of what stays -->
{#snippet changeRow(change, own)}
  <li class="hw-item">
    <span class="hw-mark" class:hw-add={!own && ADDS.has(change.kind)} class:hw-kept={own && ADDS.has(change.kind)} class:hw-take={TAKES.has(change.kind)} aria-hidden="true">{@html own && ADDS.has(change.kind) ? ICONS.check : ADDS.has(change.kind) ? ICONS.plus : TAKES.has(change.kind) ? ICONS.minus : ICONS.pencil}</span>
    <span>{changeText(change)}{#if !own && change.kind === 'added'}<span class="hw-badge">{ta('hdr.new')}</span>{/if}</span>
  </li>
{/snippet}

<!-- A text to copy with its button, which says when it is copied, and when it could not be -->
{#snippet copyBox(text, index)}
  <span class="hw-copy">
    <code>{text.trim()}</code>
    <button type="button" class="ghost hw-button" onclick={() => copy(text, index)}>{@html copied === index ? ICONS.check : ICONS.copy}{ta(copied === index ? 'hdr.copied' : 'hdr.copy')}</button>
    {#if failed === index}<span class="hw-failed">{ta('hdr.copyFailed')}</span>{/if}
  </span>
{/snippet}

<ReadingWindow title={ta('update.headersTitle')} {onclose}>
  {#snippet lead()}<span>{ta('hdr.lead')}</span>{/snippet}
  <p class="hw-live" role="status">{copied >= 0 ? ta('hdr.copied') : failed >= 0 ? ta('hdr.copyFailed') : ''}</p>
  {#if !worded}
    <!-- No words to read the file by: a site without the file, or an updater that sends the file alone -->
    <div class="hw-words">
      {#if byHand}
        <p class="hw-warn"><span aria-hidden="true">{@html ICONS.warn}</span><span>{ta(missing ? 'hdr.missing.lead' : 'update.headersByHandShort')}</span></p>
        <button type="button" class="ghost hw-button" onclick={() => copy(headers.text, 0)}>{@html copied === 0 ? ICONS.check : ICONS.copy}{ta(copied === 0 ? 'hdr.copied' : 'hdr.copy')}</button>
        {#if failed === 0}<span class="hw-failed">{ta('hdr.copyFailed')}</span>{/if}
      {/if}
      <pre class="hw-file">{headers.text}</pre>
    </div>
  {:else if asWritten}
    <pre class="hw-file">{headers.text}</pre>
  {:else}
    <div class="hw-words">
      {#if byHand}
        <p class="hw-warn"><span aria-hidden="true">{@html ICONS.warn}</span><span>{ta('hdr.byHand.lead')}</span></p>
      {/if}
      {#if changes.length}
        <section>
          <h3>{ta(byHand ? 'hdr.brings' : 'hdr.changes')}</h3>
          <ul class="hw-list">{#each changes as change, i (i)}{@render changeRow(change, false)}{/each}</ul>
        </section>
      {/if}
      {#if yours.length}
        <section>
          <h3>{ta('hdr.yours')}</h3>
          <ul class="hw-list">{#each yours as change, i (i)}{@render changeRow(change, true)}{/each}</ul>
        </section>
      {/if}
      {#if kept.length}
        <section>
          <h3>{ta('update.headersKept')}</h3>
          <ul class="hw-list">
            {#each kept as item, i (i)}
              <li class="hw-item"><span class="hw-mark hw-kept" aria-hidden="true">{@html ICONS.check}</span><span>{keptText(item)}</span></li>
            {/each}
          </ul>
        </section>
      {/if}
      {#if byHand}
        <section>
          <h3>{ta('hdr.steps')}</h3>
          <ol class="hw-steps">
            <li><div class="hw-step">
              <span>{ta('hdr.step.open')}</span>
              {#if editUrl}<a class="ghost hw-button" href={editUrl} target="_blank" rel="noopener noreferrer">{ta('hdr.openGitHub')}{@html ICONS.external}</a>{/if}
            </div></li>
            {#if edits.length}
              <li><div class="hw-step">
                <span>{ta('hdr.step.change')}</span>
                <ul class="hw-edits">
                  {#each edits as edit, i (i)}
                    <li>
                      <span>{stepText(edit)}</span>
                      {#if edit.copy}{@render copyBox(edit.copy, i)}{/if}
                    </li>
                  {/each}
                </ul>
              </div></li>
            {/if}
            <li><div class="hw-step"><span>{ta('hdr.step.commit')}</span></div></li>
          </ol>
        </section>
      {:else}
        {#if table.length}
          <section>
            <h3>{ta('hdr.loads')}</h3>
            <dl class="hw-table">
              {#each table as row, i (i)}
                <dt>{say(row.kind)}</dt>
                <dd>{#each row.sources as source, j (j)}<span class="hw-chip" class:hw-yours={source.yours}>{say(source.words)}{#if source.yours}<span class="hw-tag">{` · ${ta('hdr.yoursTag')}`}</span>{/if}</span>{/each}</dd>
              {/each}
            </dl>
          </section>
        {/if}
        {#if others.length}
          <section>
            <h3>{ta('hdr.other')}</h3>
            <ul class="hw-plain">{#each others as words, i (i)}<li>{say(words)}</li>{/each}</ul>
          </section>
        {/if}
      {/if}
    </div>
  {/if}
  {#snippet foot(close)}
    {#if worded}<button type="button" class="hw-switch" onclick={() => (asWritten = !asWritten)}>{ta(asWritten ? 'hdr.inWords' : byHand ? 'hdr.wholeFile' : 'hdr.asWritten')}</button>{/if}
    <span class="hw-gap"></span>
    <button type="button" class="ghost" onclick={() => close()}>{ta('ui.close')}</button>
    {#if primary}<button type="button" class="primary" disabled={primary.disabled} title={primary.title} onclick={() => close(primary.run)}>{primary.label}</button>{/if}
  {/snippet}
</ReadingWindow>

<style>
  .hw-words {
    display: grid;
    gap: 1.2rem;
  }

  section {
    display: grid;
    gap: 0.55rem;
  }

  h3 {
    margin: 0;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  .hw-warn {
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    margin: 0;
    padding: 0.7rem 0.85rem;
    background: rgb(224 176 74 / 10%);
    border: 1px solid rgb(224 176 74 / 45%);
    border-radius: 10px;
  }

  .hw-warn > span:first-child {
    display: inline-flex;
    flex: none;
    margin-top: 0.2rem;
    color: #e0b04a;
  }

  .hw-list,
  .hw-plain,
  .hw-edits {
    display: grid;
    gap: 0.45rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .hw-plain {
    padding-left: 1.1rem;
    list-style: disc;
  }

  .hw-item {
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
  }

  /* A change's mark: a plus in the accent, a minus, a pencil, or the check of what is kept */
  .hw-mark {
    display: inline-grid;
    flex: none;
    place-items: center;
    width: 1.35rem;
    height: 1.35rem;
    margin-top: 0.1rem;
    border: 1.5px solid rgb(255 255 255 / 35%);
    border-radius: 999px;
  }

  .hw-add {
    color: var(--urd-color-accent-text, #000);
    background: var(--urd-color-accent, #7c5cff);
    border-color: transparent;
  }

  .hw-kept {
    color: var(--urd-color-accent, #7c5cff);
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .hw-take {
    opacity: 0.8;
  }

  .hw-badge {
    margin-left: 0.3rem;
    padding: 0.05em 0.5em;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid var(--urd-color-accent, #7c5cff);
    border-radius: 999px;
  }

  /* What the pages may load: a kind of content beside its sources, which wrap */
  .hw-table {
    display: grid;
    grid-template-columns: minmax(8rem, max-content) minmax(0, 1fr);
    gap: 0.5rem 1rem;
    align-items: baseline;
    margin: 0;
  }

  .hw-table dt {
    opacity: 0.75;
  }

  .hw-table dd {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: 0;
  }

  .hw-chip {
    padding: 0.1em 0.65em;
    font-size: 0.88rem;
    background: rgb(255 255 255 / 9%);
    border: 1px solid transparent;
    border-radius: 999px;
    overflow-wrap: anywhere;
  }

  .hw-yours {
    border-color: var(--urd-color-accent, #7c5cff);
  }

  .hw-tag {
    opacity: 0.75;
  }

  .hw-steps {
    display: grid;
    gap: 0.9rem;
    margin: 0;
    padding-left: 1.4rem;
  }

  .hw-steps > li::marker {
    font-weight: 700;
  }

  .hw-step {
    display: grid;
    gap: 0.5rem;
    justify-items: start;
  }

  .hw-edits > li {
    display: grid;
    gap: 0.35rem;
  }

  .hw-copy {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  /* The exact text to paste, in its own lines, with the button that copies it */
  .hw-copy code {
    padding: 0.35rem 0.65rem;
    font-size: 0.85rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    background: rgb(255 255 255 / 8%);
    border-radius: 8px;
  }

  .hw-words > .hw-button {
    justify-self: start;
  }

  .hw-button {
    display: inline-flex;
    gap: 0.4rem;
    align-items: center;
    text-decoration: none;
  }

  .hw-file {
    margin: 0;
    font-size: 0.8rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .hw-failed {
    flex-basis: 100%;
    font-size: 0.85rem;
    color: #e0b04a;
  }

  /* What a copy did, said to a screen reader alone */
  .hw-live {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .hw-switch {
    padding: 0.3rem 0.1rem;
    color: var(--urd-color-accent, #7c5cff);
    font: inherit;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
    background: none;
    border: 0;
  }

  .hw-gap {
    flex: 1;
  }
</style>
