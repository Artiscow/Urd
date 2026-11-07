<script>
  /* The FAQ block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import BoxStyle from '../BoxStyle.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import ListEditor from '../../lib/rows/ListEditor.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps } = ed;
  const { groupChanged, groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  let { area } = $props();
  const variant = $derived(selectedBlock.props.variant === 'list' ? 'list' : 'cards');

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

  /** Moves a question from one place to another, as the list editor's drag and keys do. */
  function moveFaqItem(from, to) {
    mutateBlock('faq-item', (b) => { b.props.items.splice(to, 0, ...b.props.items.splice(from, 1)); });
  }
</script>

{#if area === 'content'}
  {#snippet faqQuestions()}
    <!-- The questions, each typed here; the answers are written on the page -->
    <ListEditor items={selectedBlock.props.items ?? []} label={ta('lbl.questions')} key={(item, i) => i}
      onmove={moveFaqItem} onremove={removeFaqItem} onadd={addFaqItem} addLabel={ta('ui.addQuestion')}>
      {#snippet row(item, i)}
        <input value={item.q} title={ta('tip.faq.question')} aria-label={ta('tip.faq.question')}
          onchange={(e) => setFaqItem(i, { q: e.target.value })} />
      {/snippet}
    </ListEditor>
    <Setting key="multi" shown={ta('common.off')}>
      <SwitchRow label={ta('lbl.faqMulti')} title={ta('tip.faq.multi')} checked={Boolean(selectedBlock.props.multi)} onchange={(on) => setBlockProp('multi', on)} />
    </Setting>
  {/snippet}
  <Fold id="faq-questions" defaultOpen title={ta('lbl.questions')} value={String(selectedBlock.props.items?.length ?? 0)} group={groupOf('faq-questions', { multi: false })}>{@render faqQuestions()}</Fold>
{:else if area === 'style'}
  {#snippet faqCard()}
    <BoxStyle />
  {/snippet}
  {@const cardN = groupChanged({ boxStyle: undefined })}
  <!-- The card style belongs to the cards; the list's rows are bare -->
  {#if variant !== 'list'}
    <Fold id="faq-card" title={ta('lbl.cardStyle')} value={cardN ? ta('menu.changed', { n: cardN }) : ta('menu.standard')} group={groupOf('faq-card', { boxStyle: undefined })}>{@render faqCard()}</Fold>
  {/if}
{/if}
