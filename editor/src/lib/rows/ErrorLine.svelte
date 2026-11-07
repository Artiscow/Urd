<script>
  /* What is wrong and how to put it right, in the row kit (0.7.30.2): a line under the field it belongs to, read out when it appears. */
  let { text } = $props();
</script>

<p class="row-error" role="alert">{text}</p>

<style>
  .row-error {
    margin: 0;
    font-size: 0.8rem;
    color: #e05252;
  }
</style>
