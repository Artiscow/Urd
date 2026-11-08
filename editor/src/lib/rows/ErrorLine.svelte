<script>
  /* What is wrong and how to put it right, in the row kit (0.7.30.2): a line under the field it belongs to, read out when it appears.
     `tone` is 'error' for what must be put right, 'warn' for what may be wrong, and 'note' for news about the field (a place found on the map); `id` lets the field name it with aria-describedby.
     An error is read out at once; `polite` waits for a pause, for a check that runs as the owner types or a line that stands as a panel opens. */
  let { text, tone = 'error', id = undefined, polite = false } = $props();
</script>

<p class="row-error" class:warn={tone === 'warn'} class:note={tone === 'note'} {id} role={tone === 'error' && !polite ? 'alert' : 'status'}>{text}</p>

<style>
  .row-error {
    margin: 0;
    font-size: 0.8rem;
    color: #e05252;
  }

  .row-error.warn {
    color: #e2b84a;
  }

  .row-error.note {
    color: inherit;
    opacity: 0.75;
  }
</style>
