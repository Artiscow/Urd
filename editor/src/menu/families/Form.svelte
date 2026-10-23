<script>
  /* The form block in the element menu (0.7.26.2): its Content and Style areas,
     drawn where the menu asks for one, and the settings it writes through the
     editor handle. */
  import { getContext } from 'svelte';
  import Dropdown from '../../lib/Dropdown.svelte';
  import MenuGroup from '../MenuGroup.svelte';
  import Setting from '../Setting.svelte';
  import Pin from '../Pin.svelte';
  import { ta } from '$engine/i18n.js';
  import { ICONS } from '../../lib/icons.js';
  import { makeGroupHelpers } from '../groups.js';
  const ed = getContext('urd-editor');
  const selectedBlock = $derived(ed.selectedBlock);
  const { mutateBlock, setBlockProp, setBlockProps } = ed;
  const { groupOf } = makeGroupHelpers(() => selectedBlock.props, setBlockProps);
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
  function moveFormField(i, dir) {
    const j = i + dir;
    mutateBlock('form-field', (b) => {
      if (j < 0 || j >= b.props.fields.length) return;
      [b.props.fields[i], b.props.fields[j]] = [b.props.fields[j], b.props.fields[i]];
    });
  }
</script>

{#if area === 'content'}
  {#snippet formSending()}
    <Setting key="mode">
      <div class="pin-line">
        <label title={ta('form.modeTitle')}>{ta('form.mode')}
          <Dropdown value={mode} options={modeOptions()}
            onchange={(v) => setBlockProp('mode', v)} /></label>
        <Pin id="sendMode" />
      </div>
    </Setting>
    {#if mode === 'endpoint'}
      <label title={ta('form.endpointNote')}>{ta('form.endpoint')}
        <input value={selectedBlock.props.endpoint ?? ''} placeholder={ta('form.endpointPh')}
          onchange={(e) => setBlockProp('endpoint', e.target.value.trim())} /></label>
    {:else}
      <label>{ta('form.recipient')}
        <input value={selectedBlock.props.recipient ?? ''} placeholder={ta('form.recipientPh')}
          onchange={(e) => setBlockProp('recipient', e.target.value.trim())} /></label>
      <label>{ta('form.subject')}
        <input value={selectedBlock.props.subject ?? ''} placeholder={ta('form.subjectPh')}
          onchange={(e) => setBlockProp('subject', e.target.value.trim())} /></label>
    {/if}
  {/snippet}
  {#snippet formFields()}
  {#each selectedBlock.props.fields ?? [] as field, i (field.id ?? i)}
    <span class="nav-line">
      <input value={field.label} placeholder={ta('form.fieldNamePh')}
        onchange={(e) => setFormField(i, { label: e.target.value.trim() || ta('form.fieldFallback') })} />
      <Dropdown value={field.type ?? 'text'}
        options={FORM_FIELD_TYPES.map((t) => [t, ta(`form.type${t[0].toUpperCase()}${t.slice(1)}`)])}
        onchange={(v) => setFormField(i, { type: v })} />
      <span class="row-tools">
        <button class="ghost row-tool" title={ta('tip.moveUp')} onclick={() => moveFormField(i, -1)} disabled={i === 0}>{@html ICONS.up}</button>
        <button class="ghost row-tool" title={ta('tip.moveDown')} onclick={() => moveFormField(i, 1)}
          disabled={i === (selectedBlock.props.fields?.length ?? 0) - 1}>{@html ICONS.down}</button>
        <button class="ghost row-tool" title={ta('form.removeField')} onclick={() => removeFormField(i)}>{@html ICONS.cross}</button>
      </span>
    </span>
    <label class="gridmenu-snap">
      <input type="checkbox" checked={field.required === true}
        onchange={(e) => setFormField(i, { required: e.target.checked })} />
      {ta('form.required')}
    </label>
    {#if FORM_OPTION_TYPES.has(field.type)}
      <input value={(field.options ?? []).join(', ')} placeholder={ta('form.optionsPh')}
        onchange={(e) => setFormFieldOptions(i, e.target.value)} />
    {/if}
  {/each}
  <button class="ghost action" onclick={addFormField}>{ta('form.addField')}</button>
  {/snippet}
  {#snippet formReceipt()}
    <label>{ta('lbl.buttonText')}
      <input value={selectedBlock.props.submitLabel ?? ''} placeholder={ta('form.sendDefault')}
        onchange={(e) => setBlockProp('submitLabel', e.target.value.trim() || ta('form.sendDefault'))} /></label>
    <!-- The receipt text shows after an endpoint send only; mailto mode says that the mail program has the message -->
    {#if mode === 'endpoint'}
      <label>{ta('form.receipt')}
        <input value={selectedBlock.props.successText ?? ''} placeholder={ta('form.thanksDefault')}
          onchange={(e) => setBlockProp('successText', e.target.value.trim() || ta('form.thanksDefault'))} /></label>
    {/if}
  {/snippet}
  <MenuGroup id="form-sending" title={ta('group.sending')} value={mode === 'endpoint' ? (selectedBlock.props.endpoint || ta('form.modeEndpoint')) : (selectedBlock.props.recipient || ta('form.modeMailto'))} group={groupOf('form-sending', { mode: 'mailto' })}>{@render formSending()}</MenuGroup>
  <MenuGroup id="form-fields" title={ta('form.fields')} value={String(selectedBlock.props.fields?.length ?? 0)}>{@render formFields()}</MenuGroup>
  <MenuGroup id="form-receipt" title={ta('group.buttonReceipt')} value={selectedBlock.props.submitLabel || ta('form.sendDefault')}>{@render formReceipt()}</MenuGroup>
{/if}
