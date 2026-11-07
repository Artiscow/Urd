<script>
  /* The form block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import Fold from '../../lib/rows/Fold.svelte';
  import Setting from '../../lib/rows/Setting.svelte';
  import { ta } from '$engine/i18n.js';
  import SelectRow from '../../lib/rows/SelectRow.svelte';
  import SwitchRow from '../../lib/rows/SwitchRow.svelte';
  import ListEditor from '../../lib/rows/ListEditor.svelte';
  import { makeGroupHelpers } from '../groups.js';
  import { pinnedNow } from '../pinned.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
  /** A fold counts the settings it holds now: one of a single setting is that setting alone. */
  const pinned = pinnedNow();
  let { area } = $props();
  const mode = $derived((selectedBlock.props.mode ?? 'mailto') === 'endpoint' ? 'endpoint' : 'mailto');
  const modeOptions = () => [['mailto', ta('form.modeMailto')], ['endpoint', ta('form.modeEndpoint')]];

  /* The form block (Content): send mode, recipient or endpoint, the field
     list and the texts. The field ids follow the engine's shape (a short
     random id, like the former config panel); the option list follows only
     the types that use it. */
  const FORM_FIELD_TYPES = ['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio', 'date'];
  const FORM_OPTION_TYPES = new Set(['select', 'radio']);
  const formFieldId = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(3));
    return 'f' + [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  };
  function setFormField(i, patch) {
    mutateBlock(`edit:${selectedBlock.blockId}:field${i}`, (b) => {
      const next = { ...b.props.fields[i], ...patch };
      if (!FORM_OPTION_TYPES.has(next.type)) delete next.options;
      else next.options ??= [];
      b.props.fields[i] = next;
    });
  }
  function setFormFieldOptions(i, text) {
    setFormField(i, { options: String(text).split(',').map((v) => v.trim()).filter(Boolean) });
  }
  function addFormField() {
    mutateBlock('form-field', (b) => {
      b.props.fields ??= []; b.props.fields.push({ id: formFieldId(), label: ta('form.newField'), type: 'text', required: false });
    });
  }
  function removeFormField(i) {
    mutateBlock('form-field', (b) => { b.props.fields.splice(i, 1); });
  }
  /** Moves a field from one place to another, as the list editor's drag and keys do. */
  function moveFormField(from, to) {
    mutateBlock('form-field', (b) => { b.props.fields.splice(to, 0, ...b.props.fields.splice(from, 1)); });
  }

</script>

{#if area === 'content'}
  {#snippet formSending()}
    <Setting key="mode" pin="sendMode">
      <SelectRow label={ta('form.mode')} title={ta('form.modeTitle')} value={mode} options={modeOptions()} onchange={(v) => setBlockProp('mode', v)} />
    </Setting>
    {#if mode === 'endpoint'}
      <label title={ta('form.endpointNote')}>{ta('form.endpoint')}
        <input value={selectedBlock.props.endpoint ?? ''} placeholder={ta('form.endpointPh')}
          onchange={(e) => setBlockProp('endpoint', e.target.value.trim())} /></label>
    {:else}
      <label title={ta('tip.form.recipient')}>{ta('form.recipient')}
        <input value={selectedBlock.props.recipient ?? ''} placeholder={ta('form.recipientPh')}
          onchange={(e) => setBlockProp('recipient', e.target.value.trim())} /></label>
      <label title={ta('tip.form.subject')}>{ta('form.subject')}
        <input value={selectedBlock.props.subject ?? ''} placeholder={ta('form.subjectPh')}
          onchange={(e) => setBlockProp('subject', e.target.value.trim())} /></label>
    {/if}
  {/snippet}
  {#snippet formFields()}
    <!-- Each field as its name and its kind, whether it must be filled in, and the choices of a list -->
    <ListEditor items={selectedBlock.props.fields ?? []} label={ta('form.fields')} key={(field, i) => field.id ?? i}
      onmove={moveFormField} onremove={removeFormField} onadd={addFormField} addLabel={ta('form.addField')}>
      {#snippet row(field, i)}
        <div class="form-field-row">
          <span class="nav-line">
            <input value={field.label} placeholder={ta('form.fieldNamePh')} aria-label={ta('form.fieldNamePh')}
              onchange={(e) => setFormField(i, { label: e.target.value.trim() || ta('form.fieldFallback') })} />
            <Dropdown value={field.type ?? 'text'}
              options={FORM_FIELD_TYPES.map((t) => [t, ta(`form.type${t[0].toUpperCase()}${t.slice(1)}`)])}
              onchange={(v) => setFormField(i, { type: v })} />
          </span>
          <SwitchRow label={ta('form.required')} title={ta('tip.form.required')} checked={field.required === true} onchange={(on) => setFormField(i, { required: on })} />
          {#if FORM_OPTION_TYPES.has(field.type)}
            <input value={(field.options ?? []).join(', ')} placeholder={ta('form.optionsPh')} aria-label={ta('form.optionsPh')}
              onchange={(e) => setFormFieldOptions(i, e.target.value)} />
          {/if}
        </div>
      {/snippet}
    </ListEditor>
  {/snippet}
  {#snippet formReceipt()}
    <label title={ta('tip.form.buttonText')}>{ta('lbl.buttonText')}
      <input value={selectedBlock.props.submitLabel ?? ''} placeholder={ta('form.sendDefault')}
        onchange={(e) => setBlockProp('submitLabel', e.target.value.trim() || ta('form.sendDefault'))} /></label>
    <!-- The receipt text shows after an endpoint send only; mailto mode says that the mail program has the message -->
    {#if mode === 'endpoint'}
      <label title={ta('tip.form.receipt')}>{ta('form.receipt')}
        <input value={selectedBlock.props.successText ?? ''} placeholder={ta('form.thanksDefault')}
          onchange={(e) => setBlockProp('successText', e.target.value.trim() || ta('form.thanksDefault'))} /></label>
    {/if}
  {/snippet}
  <Fold id="form-sending" title={ta('group.sending')} value={mode === 'endpoint' ? (selectedBlock.props.endpoint || ta('form.modeEndpoint')) : (selectedBlock.props.recipient || ta('form.modeMailto'))} rows={pinned.left('sendMode') + (mode === 'endpoint' ? 1 : 2)} group={groupOf('form-sending', { mode: 'mailto' })}>{@render formSending()}</Fold>
  <Fold id="form-fields" title={ta('form.fields')} value={String(selectedBlock.props.fields?.length ?? 0)}>{@render formFields()}</Fold>
  <!-- The receipt only after a send to an address of the site's own; with an email the button's words stand alone -->
  <Fold id="form-receipt" title={ta('group.buttonReceipt')} value={selectedBlock.props.submitLabel || ta('form.sendDefault')} rows={mode === 'endpoint' ? 2 : 1}>{@render formReceipt()}</Fold>
{/if}

<style>
  .form-field-row {
    display: grid;
    gap: 4px;
    min-width: 0;
  }
</style>
