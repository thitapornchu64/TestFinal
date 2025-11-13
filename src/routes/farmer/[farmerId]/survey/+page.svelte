<script>
// @ts-nocheck

  import SurveyItem from '$lib/SurveyItem.svelte'
  export let data
</script>

<h1>แบบประเมินของ {data.farmer.name}</h1>
<p>จังหวัด: {data.farmer.province}</p>

<div class="grid">
  {#each data.farmer.surveys as s}
    <SurveyItem {...s} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
</style>
