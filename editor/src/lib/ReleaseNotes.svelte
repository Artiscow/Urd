<script>
  /* A release's notes in the Updates panel: Markdown read into blocks (release-notes.js) and drawn with the panel's own elements, never as HTML. */
  import { ta } from '$engine/i18n.js';
  import { parseNotes, plainText } from './release-notes.js';
  import Fold from './rows/Fold.svelte';

  let { text = '' } = $props();
  const blocks = $derived(parseNotes(text));
</script>

{#snippet inline(nodes)}{#each nodes as n, i (i)}{#if n.kind === 'text'}{n.text}{:else if n.kind === 'strong'}<strong>{@render inline(n.children)}</strong>{:else if n.kind === 'em'}<em>{@render inline(n.children)}</em>{:else if n.kind === 'code'}<code>{n.text}</code>{:else if n.kind === 'br'}<br />{:else if n.kind === 'link'}<a href={n.href} target="_blank" rel="noopener noreferrer">{@render inline(n.children)}</a>{/if}{/each}{/snippet}

{#snippet list(items, place)}
  {#each items as item, i (i)}
    <li>{@render body(item, `${place}-${i}`)}</li>
  {/each}
{/snippet}

{#snippet body(nodes, place = 'rn')}
  {#each nodes as b, i (i)}
    {#if b.kind === 'heading'}
      <!-- The notes' headings stand under the panel's own: # as h3, ## as h4, and so on to h6 -->
      {#if b.level <= 1}<h3 class="rn-h rn-h1">{@render inline(b.inline)}</h3>
      {:else if b.level === 2}<h4 class="rn-h rn-h2">{@render inline(b.inline)}</h4>
      {:else if b.level === 3}<h5 class="rn-h rn-h3">{@render inline(b.inline)}</h5>
      {:else}<h6 class="rn-h rn-h4">{@render inline(b.inline)}</h6>{/if}
    {:else if b.kind === 'para'}
      <p>{@render inline(b.inline)}</p>
    {:else if b.kind === 'list'}
      {#if b.ordered}<ol>{@render list(b.items, `${place}-${i}`)}</ol>{:else}<ul>{@render list(b.items, `${place}-${i}`)}</ul>{/if}
    {:else if b.kind === 'code'}
      <pre><code>{b.text}</code></pre>
    {:else if b.kind === 'rule'}
      <hr />
    {:else if b.kind === 'quote'}
      <blockquote class:rn-alert={b.alert}>
        {#if b.alert}<strong class="rn-alert-name">{ta(`update.notes.alert.${b.alert}`)}</strong>{/if}
        {@render body(b.blocks, `${place}-${i}`)}
      </blockquote>
    {:else if b.kind === 'fold'}
      <Fold id={`${place}-${i}`} surface="update" title={plainText(b.summary) || ta('update.notes.details')} defaultOpen={b.open}>{@render body(b.blocks, `${place}-${i}`)}</Fold>
    {/if}
  {/each}
{/snippet}

<div class="release-notes">{@render body(blocks)}</div>

<style>
  .release-notes {
    display: grid;
    gap: 0.45rem;
    font-size: 0.78rem;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  .release-notes :global(:is(p, ul, ol, pre, hr, h3, h4, h5, h6, blockquote)) {
    margin: 0;
  }

  .release-notes :global(.rn-h) {
    line-height: 1.25;
    font-weight: 650;
    text-wrap: balance;
  }

  .release-notes :global(.rn-h1) {
    font-size: 0.95rem;
  }

  .release-notes :global(.rn-h2) {
    margin-top: 0.3rem;
    font-size: 0.86rem;
  }

  .release-notes :global(:is(.rn-h3, .rn-h4)) {
    font-size: 0.8rem;
  }

  .release-notes :global(:is(ul, ol)) {
    display: grid;
    gap: 0.3rem;
    padding-left: 1rem;
  }

  /* An item keeps its marker (a list item's own display), its paragraphs and lists spaced under its first words */
  .release-notes :global(li > * + *) {
    margin-top: 0.25rem;
  }

  .release-notes :global(li::marker) {
    color: var(--urd-color-accent, #7c5cff);
  }

  .release-notes :global(code) {
    padding: 0.05em 0.3em;
    border-radius: 4px;
    background: rgb(255 255 255 / 8%);
    font: 0.92em ui-monospace, monospace;
  }

  .release-notes :global(pre) {
    padding: 0.5rem 0.6rem;
    overflow-x: auto;
    border-radius: 6px;
    background: rgb(0 0 0 / 25%);
  }

  .release-notes :global(pre code) {
    padding: 0;
    background: none;
  }

  .release-notes :global(a) {
    color: var(--urd-color-accent, #7c5cff);
    text-underline-offset: 2px;
  }

  .release-notes :global(blockquote) {
    display: grid;
    gap: 0.3rem;
    margin: 0;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    background: rgb(255 255 255 / 5%);
  }

  .release-notes :global(.rn-alert-name) {
    color: var(--urd-color-accent, #7c5cff);
  }

  .release-notes :global(hr) {
    border: 0;
    border-top: 1px solid rgb(255 255 255 / 14%);
  }

</style>
