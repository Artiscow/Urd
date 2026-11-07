<script>
  /* A part inside a fold, in the row kit (0.7.30.2): a small heading over the rows that belong to it. */
  let { text } = $props();
</script>

<h4 class="row-sub">{text}</h4>

<style>
  .row-sub {
    margin: 0.35rem 0 0;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.65;
  }
</style>
