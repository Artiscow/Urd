<script>
  /* What is wrong and how to put it right, under the field that names it by `id` (aria-describedby); read out at once, or at a pause with `polite`. */
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
