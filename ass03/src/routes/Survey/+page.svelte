<script>
  import SurveyHeader from '$lib/SurveyHeader.svelte';
  import SurveyItem from '$lib/SurveyItem.svelte';
  import { aspects } from '$lib/survey.js';

  let items = $state(aspects);
  let passCount = $derived(items.filter(i => i.status === 'pass').length);
  let warnCount = $derived(items.filter(i => i.status === 'warn').length);
  let noneCount = $derived(items.filter(i => i.status === 'none').length);
</script>

<section class="wrap">
  <h1>สำรวจการเพาะปลูกทุเรียนของคุณ</h1>
  <p class="subtitle">อ้างอิงหลักเกณฑ์การประเมินมาตรฐานการเพาะปลูก GAP ทั้ง 8 ด้าน</p>

  <SurveyHeader passCount={passCount} warnCount={warnCount} noneCount={noneCount} />

 <section class="grid">
    {#each items as item (item.slug)}
      <SurveyItem {...item} />
    {/each}
  </section>
</section>

<style>
  .wrap { padding: 16px; }
  h1 { margin: 0 0 6px; }
  .subtitle { margin: 0 0 14px; color: #666; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 14px;
  }
</style>