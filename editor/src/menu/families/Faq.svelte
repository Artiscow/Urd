<script>
  /* The FAQ block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Choice from '../../lib/Choice.svelte';
  import BoxStyle from '../BoxStyle.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps } = ed;
  const { groupReset, groupChanged } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const variant = $derived(selectedBlock.props.variant === 'list' ? 'list' : 'cards');

  /** The variants, as the block's own FAQ_VARIANTS lists them: tests/styled-blocks.test.mjs holds the lists equal. */
  const FAQ_VARIANT_IDS = ['cards', 'list'];

  function setFaqItem(i, patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:faq${i}`, (b) => {
      b.props.items[i] = { ...b.props.items[i], ...patch };
    });
  }

  function addFaqItem() {
    mutateBlock('faq-item', (b) => {
      b.props.items ??= []; b.props.items.push({ q: ta('seed.faq.newQ'), a: ta('seed.faq.answer') });
    });
  }

  function removeFaqItem(i) {
    mutateBlock('faq-item', (b) => { b.props.items.splice(i, 1); });
  }

  function moveFaqItem(i, dir) {
    const j = i + dir;
    mutateBlock('faq-item', (b) => {
      if (j < 0 || j >= b.props.items.length) return;
      [b.props.items[i], b.props.items[j]] = [b.props.items[j], b.props.items[i]];
    });
  }
</script>

{#if area === 'content'}
  {#snippet faqQuestions()}
    {#each selectedBlock.props.items ?? [] as item, i (i)}
      <span class="nav-line">
        <input value={item.q} title={ta('tip.faq.question')}
          onchange={(e) => setFaqItem(i, { q: e.target.value })} />
        <span class="row-tools">
          <button class="ghost row-tool" onclick={() => moveFaqItem(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
          <button class="ghost row-tool" onclick={() => moveFaqItem(i, 1)}
            disabled={i === (selectedBlock.props.items?.length ?? 0) - 1}>{@html ICONS.down}</button>
          <button class="ghost row-tool" title={ta('tip.faq.remove')} onclick={() => removeFaqItem(i)}>{@html ICONS.cross}</button>
        </span>
      </span>
    {/each}
    <button class="ghost action" onclick={addFaqItem}>{ta('ui.addQuestion')}</button>
    <label class="gridmenu-snap" title={ta('tip.faq.multi')}>
      <input type="checkbox" checked={Boolean(selectedBlock.props.multi)}
        onchange={(e) => setBlockProp('multi', e.target.checked)} />
      {ta('lbl.faqMulti')}
    </label>
  {/snippet}
  <MenuGroup id="faq-questions" defaultOpen title={ta('lbl.questions')} value={String(selectedBlock.props.items?.length ?? 0)} reset={groupReset('faq-questions', { multi: false })}>{@render faqQuestions()}</MenuGroup>
{:else if area === 'style'}
  {#snippet faqVariant()}
    <div class="pin-line">
      <Choice label={ta('lbl.variant')} value={variant}
        options={FAQ_VARIANT_IDS.map((v) => [v, ta(`opt.faqVariant.${v}`)])}
        onchange={(v) => setBlockProp('variant', v)} />
      <Pin id="variant" />
    </div>
  {/snippet}
  {#snippet faqCard()}
    <BoxStyle />
  {/snippet}
  {@const cardN = groupChanged({ boxStyle: undefined })}
  <MenuGroup id="faq-variant" title={ta('lbl.variant')} value={ta(`opt.faqVariant.${variant}`)} reset={groupReset('faq-variant', { variant: 'cards' })}>{@render faqVariant()}</MenuGroup>
  <!-- The card style belongs to the cards; the list's rows are bare -->
  {#if variant !== 'list'}
    <MenuGroup id="faq-card" title={ta('lbl.cardStyle')} value={cardN ? ta('menu.changed', { n: cardN }) : ta('menu.standard')} reset={groupReset('faq-card', { boxStyle: undefined })}>{@render faqCard()}</MenuGroup>
  {/if}
{/if}
