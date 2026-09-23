/**
 * Core block: form. A contact form following the ApeironLF model: by
 * default it sends through the visitor's email client (mailto, zero setup),
 * or to an optional endpoint (the owner's Apps Script or Pages Function)
 * via fetch. A honeypot field guards against bots. The settings live in a
 * config panel inside the preview (the gear, opened from Properties), with
 * a help chip (ADR-0008) and themed dropdowns (ADR-0009).
 *
 * Visitor input is NEVER set as HTML (only .value/textContent). Endpoint mode
 * requires the owner to open connect-src for the endpoint in _headers; the
 * config panel says so.
 */
import { isSpam, validate, buildMailto, buildPayload } from '../form-model.js';
// t() for visitor texts (the site language), ta() for the editor chrome and
// the seed defaults (the admin language); never called at module level.
import { t, ta, adminLocaleReady } from '../i18n.js';

/** Field type id + label KEY (looked up with ta at use time; never at module level). */
const FIELD_TYPES = [
  ['text', 'form.typeText'], ['email', 'form.typeEmail'], ['tel', 'form.typeTel'], ['textarea', 'form.typeTextarea'],
  ['select', 'form.typeSelect'], ['checkbox', 'form.typeCheckbox'], ['radio', 'form.typeRadio'], ['date', 'form.typeDate'],
];

/** Field types that carry an option list (the field's `options`). */
const OPTION_TYPES = new Set(['select', 'radio']);

const el2 = (tag, className, textContent) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent != null) node.textContent = textContent;
  return node;
};

const fieldId = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  return 'f' + [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const post = (msg) => window.parent?.postMessage(msg, location.origin);

/* ---------- Form rendering ---------- */

function fieldControl(field) {
  // A visitor-facing dropdown is a NATIVE select with color-scheme (ADR-0009
  // covers editing UI only); an empty placeholder option is what makes the
  // required check possible.
  if (field.type === 'select') {
    const control = el2('select', 'urd-form-input urd-form-select');
    const placeholder = el2('option', null, t('form.choose'));
    placeholder.value = '';
    control.appendChild(placeholder);
    for (const option of field.options ?? []) {
      const node = el2('option', null, option);
      node.value = option;
      control.appendChild(node);
    }
    control.name = field.id;
    control.dataset.fieldId = field.id;
    return control;
  }
  const control = field.type === 'textarea'
    ? el2('textarea', 'urd-form-input')
    : el2('input', 'urd-form-input');
  if (field.type !== 'textarea') {
    control.type = field.type === 'email' ? 'email'
      : field.type === 'tel' ? 'tel'
        : field.type === 'date' ? 'date'
          : field.type === 'checkbox' ? 'checkbox' : 'text';
  }
  if (field.type === 'textarea') control.rows = 4;
  control.name = field.id;
  control.id = `${field.id}-in`;
  if (field.required && field.type !== 'checkbox') control.required = true;
  control.dataset.fieldId = field.id;
  return control;
}

/** One form row for the field: structure and control vary with the type. */
function fieldRow(field, controls) {
  const star = field.required ? ' *' : '';
  // Radio group: fieldset/legend instead of a wrapping label, one radio per
  // option sharing a name. Harvesting reads the group's :checked.
  if (field.type === 'radio') {
    const row = el2('fieldset', 'urd-form-row urd-form-fieldset');
    row.appendChild(el2('legend', 'urd-form-label', field.label + star));
    for (const option of field.options ?? []) {
      const optLabel = el2('label', 'urd-form-check');
      const radio = el2('input');
      radio.type = 'radio';
      radio.name = field.id;
      radio.value = option;
      optLabel.append(radio, el2('span', null, option));
      row.appendChild(optLabel);
    }
    controls[field.id] = row;
    return row;
  }
  // Checkbox: the box comes BEFORE the label, as the convention is.
  if (field.type === 'checkbox') {
    const row = el2('label', 'urd-form-row urd-form-checkrow');
    const inner = el2('span', 'urd-form-check');
    const control = fieldControl(field);
    controls[field.id] = control;
    inner.append(control, el2('span', 'urd-form-label', field.label + star));
    row.appendChild(inner);
    return row;
  }
  const row = el2('label', 'urd-form-row');
  const control = fieldControl(field);
  controls[field.id] = control;
  row.append(el2('span', 'urd-form-label', field.label + star), control);
  return row;
}

function renderForm(host, props, ctx) {
  const fields = props.fields ?? [];
  const form = el2('form', 'urd-form-form');
  form.noValidate = true;

  const controls = {};
  for (const field of fields) {
    const row = fieldRow(field, controls);
    const error = el2('span', 'urd-form-error');
    error.dataset.for = field.id;
    row.appendChild(error);
    form.appendChild(row);
  }

  // Honeypot: hidden from humans, filled in by bots. Never visible, never tabbable.
  const honeypot = el2('input', 'urd-form-hp');
  honeypot.type = 'text';
  honeypot.name = 'website';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');
  form.appendChild(honeypot);

  const submit = el2('button', 'urd-form-submit', props.submitLabel || t('form.send'));
  submit.type = 'submit';
  form.appendChild(submit);

  const status = el2('p', 'urd-form-status');
  form.appendChild(status);

  const showErrors = (errors) => {
    for (const field of fields) {
      const cell = form.querySelector(`.urd-form-error[data-for="${field.id}"]`);
      if (cell) cell.textContent = errors[field.id] ?? '';
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.className = 'urd-form-status';
    status.textContent = '';
    // Per-type harvesting: a checkbox is boolean, a radio group reads
    // :checked, and the rest read .value.
    const values = {};
    for (const field of fields) {
      const control = controls[field.id];
      values[field.id] = field.type === 'checkbox' ? control?.checked === true
        : field.type === 'radio' ? (control?.querySelector('input:checked')?.value ?? '')
          : (control?.value ?? '');
    }

    // Spam: act as if it went through, but send nothing (do not tip off the bot).
    if (isSpam(honeypot.value)) {
      status.classList.add('ok');
      status.textContent = props.successText || t('form.thanks');
      return;
    }

    const result = validate(fields, values, {
      required: t('form.required'),
      email: t('form.invalidEmail'),
      choice: t('form.invalidChoice'),
      date: t('form.invalidDate'),
    });
    showErrors(result.errors);
    if (!result.ok) return;

    if (ctx.preview) {
      status.classList.add('ok');
      status.textContent = ta('form.previewOk');
      return;
    }

    const done = () => {
      status.classList.add('ok');
      status.textContent = props.successText || t('form.thanks');
      form.reset();
    };

    if ((props.mode ?? 'mailto') === 'endpoint' && props.endpoint) {
      submit.disabled = true;
      try {
        const res = await fetch(props.endpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(buildPayload(fields, values, { side: location.pathname })),
        });
        if (!res.ok) throw new Error(String(res.status));
        done();
      } catch {
        status.classList.add('error');
        status.textContent = t('form.sendFailed');
      } finally {
        submit.disabled = false;
      }
    } else {
      const url = buildMailto(props.recipient, props.subject || t('form.subjectDefault'), fields, values, { yes: t('form.yes') });
      if (!url) {
        status.classList.add('error');
        status.textContent = t('form.noRecipient');
        return;
      }
      window.location.href = url;
      done();
    }
  });

  host.appendChild(form);
}

/* ---------- Config panel (in the preview) ---------- */

function configPanel(el, props, ctx, createDropdown) {
  const gear = el2('button', 'urd-form-gear urd-cfg-toggle', `⚙ ${ta('form.gear')}`);
  gear.type = 'button';
  gear.title = ta('form.gearTitle');
  const panel = el2('div', 'urd-form-config');

  const label = (text) => el2('div', 'urd-form-config-label', text);
  const textInput = (value, placeholder) => {
    const input = el2('input', 'urd-form-config-input');
    input.value = value ?? '';
    if (placeholder) input.placeholder = placeholder;
    return input;
  };

  let mode = props.mode ?? 'mailto';
  const recipient = textInput(props.recipient, ta('form.recipientPh'));
  const subject = textInput(props.subject, ta('form.subjectPh'));
  const endpoint = textInput(props.endpoint, ta('form.endpointPh'));
  const submitLabel = textInput(props.submitLabel, ta('form.sendDefault'));
  const successText = textInput(props.successText, ta('form.thanksDefault'));

  const modeRow = el2('div', 'urd-form-config-row');
  const modeDd = createDropdown({
    value: mode,
    title: ta('form.modeTitle'),
    options: [['mailto', ta('form.modeMailto')], ['endpoint', ta('form.modeEndpoint')]],
    onchange: (value) => { mode = value; syncMode(); },
  });
  modeRow.appendChild(modeDd.el);

  const mailtoBox = el2('div', 'urd-form-config-box');
  mailtoBox.append(label(ta('form.recipient')), recipient, label(ta('form.subject')), subject);
  const endpointBox = el2('div', 'urd-form-config-box');
  endpointBox.append(label(ta('form.endpoint')), endpoint,
    el2('p', 'urd-form-config-note', ta('form.endpointNote')));
  const syncMode = () => {
    mailtoBox.style.display = mode === 'mailto' ? '' : 'none';
    endpointBox.style.display = mode === 'endpoint' ? '' : 'none';
  };
  syncMode();

  // Field editing: add, change name/type/required, remove. Select and radio
  // get their own option line (comma separated) right under their row;
  // changing the type re-renders the list, so the line shows only where it
  // applies.
  let fields = (props.fields ?? []).map((f) => ({ ...f, options: Array.isArray(f.options) ? [...f.options] : undefined }));
  const fieldList = el2('div', 'urd-form-fieldlist');
  const renderFields = () => {
    fieldList.replaceChildren();
    fields.forEach((field, index) => {
      const row = el2('div', 'urd-form-fieldrow');
      const name = textInput(field.label, ta('form.fieldNamePh'));
      name.addEventListener('input', () => { field.label = name.value; });
      const typeDd = createDropdown({
        value: field.type,
        options: FIELD_TYPES.map(([value, key]) => [value, ta(key)]),
        onchange: (value) => { field.type = value; renderFields(); },
      });
      const req = el2('label', 'urd-form-fieldreq');
      const reqBox = el2('input');
      reqBox.type = 'checkbox';
      reqBox.checked = field.required !== false;
      reqBox.addEventListener('change', () => { field.required = reqBox.checked; });
      req.append(reqBox, document.createTextNode(` ${ta('form.required')}`));
      const del = el2('button', 'urd-form-fielddel', '✕');
      del.type = 'button';
      del.title = ta('form.removeField');
      del.addEventListener('click', () => { fields.splice(index, 1); renderFields(); });
      row.append(name, typeDd.el, req, del);
      fieldList.appendChild(row);
      if (OPTION_TYPES.has(field.type)) {
        const opts = textInput((field.options ?? []).join(', '), ta('form.optionsPh'));
        opts.classList.add('urd-form-fieldopts');
        opts.addEventListener('input', () => {
          field.options = opts.value.split(',').map((v) => v.trim()).filter(Boolean);
        });
        fieldList.appendChild(opts);
      }
    });
  };
  renderFields();
  const addField = el2('button', 'urd-form-addfield', ta('form.addField'));
  addField.type = 'button';
  addField.addEventListener('click', () => {
    fields.push({ id: fieldId(), label: ta('form.newField'), type: 'text', required: false });
    renderFields();
  });

  const apply = el2('button', 'urd-form-apply', ta('common.apply'));
  apply.type = 'button';
  apply.addEventListener('click', () => {
    const cleaned = fields
      .map((f) => ({
        id: f.id || fieldId(),
        label: (f.label || ta('form.fieldFallback')).trim(),
        type: f.type || 'text',
        required: f.required !== false,
        // The option list follows only the types that use it, so changing
        // the type away from select or radio leaves no orphaned list.
        ...(OPTION_TYPES.has(f.type) ? { options: (f.options ?? []).filter(Boolean) } : {}),
      }))
      .filter((f) => f.label);
    post({
      type: 'urd-edit',
      sectionId: ctx.section.id,
      blockId: el.dataset.blockId,
      props: {
        recipient: recipient.value.trim(),
        subject: subject.value.trim(),
        mode,
        endpoint: endpoint.value.trim(),
        submitLabel: submitLabel.value.trim() || ta('form.sendDefault'),
        successText: successText.value.trim() || ta('form.thanksDefault'),
        fields: cleaned,
      },
      rerender: true,
    });
    close();
  });

  panel.append(
    label(ta('form.mode')), modeRow, mailtoBox, endpointBox,
    label(ta('form.fields')), fieldList, addField,
    label(ta('lbl.buttonText')), submitLabel,
    label(ta('form.receipt')), successText,
    apply,
  );

  const onOutside = (event) => {
    if (!panel.isConnected) { close(); return; }
    if (panel.contains(event.target) || event.target === gear || event.target.closest('.urd-dd-menu')) return;
    close();
  };
  function close() {
    panel.classList.remove('visible');
    document.removeEventListener('pointerdown', onOutside, true);
  }
  gear.addEventListener('click', (event) => {
    event.stopPropagation();
    if (panel.classList.toggle('visible')) {
      setTimeout(() => document.addEventListener('pointerdown', onOutside, true), 0);
    } else {
      close();
    }
  });
  return [gear, panel];
}

/* ---------- The block ---------- */

function renderFormBlock(el, props, ctx) {
  const host = el2('div', 'urd-form');
  el.appendChild(host);
  renderForm(host, props, ctx);

  if (ctx.preview && ctx.viewport !== 'mobile') {
    // The config panel (the gear) and the help chip are editor chrome: the
    // dropdown module is editor-only and loaded here, never in the visitor
    // closure.
    Promise.all([import('../dropdown.js'), import('../hint.js'), adminLocaleReady]).then(([{ createDropdown }, { attachHint }]) => {
      if (!host.isConnected || host.querySelector('.urd-hint-chip')) return;
      const [gear, panel] = configPanel(el, props, ctx, createDropdown);
      const tools = el2('div', 'urd-form-tools');
      tools.appendChild(gear);
      host.append(tools, panel);
      const chip = attachHint(tools, {
        title: ta('hintForm.title'),
        lines: [ta('hintForm.l1'), ta('hintForm.l2'), ta('hintForm.l3'), ta('hintForm.l4'), ta('hintForm.l5')],
      });
      tools.insertBefore(chip, tools.firstChild);
    });
  }
}

/**
 * The seed rule (ADR-0012): the field labels are written into props at
 * insertion time, translated ONCE with the admin language.
 */
export const defaultFormFields = () => [
  { id: 'navn', label: ta('form.fieldName'), type: 'text', required: true },
  { id: 'epost', label: ta('form.fieldEmail'), type: 'email', required: true },
  { id: 'melding', label: ta('form.fieldMessage'), type: 'textarea', required: true },
];

export const formBlock = {
  version: 1,
  // Natural height in the mobile row grid; on the desktop the push pass owns the box.
  autoGrow: true,
  label: 'Form',
  labelKey: 'blocks.form',
  defaults: () => ({
    recipient: '', subject: '', mode: 'mailto', endpoint: '',
    submitLabel: ta('form.sendDefault'), successText: ta('form.thanksDefault'), fields: defaultFormFields(),
  }),
  migrations: {},
  render: renderFormBlock,
};
