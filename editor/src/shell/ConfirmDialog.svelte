<script>
  /* The confirmation and prompt dialog the editor asks with before a step that cannot be undone. Split out of App.svelte in 0.7.26.5; everything it reads and writes comes through the editor handle. */
  import { getContext } from 'svelte';

  const ed = getContext('urd-editor');
</script>

{#if ed.confirmBox}
  <!-- A click on the backdrop cancels (same as the lightbox ::backdrop).
       Closing happens on click, not pointerdown, so the click finishes
       before the dialog disappears and never hits the panel below. -->
  <!-- The backdrop is a mouse shortcut: Escape is the keyboard path and
       the Cancel button the focusable one. -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="setup-overlay"
    onpointerdown={(e) => (ed.confirmDownOnOverlay = e.target === e.currentTarget)}
    onclick={(e) => ed.confirmDownOnOverlay && e.target === e.currentTarget && ed.answerConfirm(false)}>
    <div class="setup-card">
      <h2>{ed.confirmBox.title}</h2>
      {#each ed.confirmBox.lines as line (line)}
        <p class="panel-hint confirm-line">{line}</p>
      {/each}
      {#if ed.confirmBox.prompt}
        <!-- svelte-ignore a11y_autofocus (single-field modal: focus belongs in the field) -->
        <input autofocus bind:value={ed.confirmBox.value} placeholder={ed.confirmBox.placeholder}
          onkeydown={(e) => e.key === 'Enter' && ed.confirmBox.value.trim() && ed.answerConfirm(true)} />
      {/if}
      <span class="setup-actions">
        <button class="ghost" onclick={() => ed.answerConfirm(false)}>{ed.confirmBox.cancelLabel}</button>
        <button class="primary" onclick={() => ed.answerConfirm(true)}>{ed.confirmBox.okLabel}</button>
      </span>
    </div>
  </div>
{/if}
