<script>
  import { page } from '$app/stores';
  import SurveyWater from '$lib/Components/SurveyWater.svelte';
  import SurveySoil from '$lib/Components/SurveySoil.svelte';
  import SurveyFertChem from '$lib/Components/SurveyFertChem.svelte';
  import SurveyTools from '$lib/Components/SurveyTools.svelte';
  import SurveyHarvest from '$lib/Components/SurveyHarvest.svelte';
  import SurveyPostHarvest from '$lib/Components/SurveyPostHarvest.svelte';
  import SurveyFacilities from '$lib/Components/SurveyFacilities.svelte';
  import SurveyWorkers from '$lib/Components/SurveyWorkers.svelte'; 


  $: slug = $page.params.slug;

  function handleSubmitFromChild(event) {
    // event.detail จะเป็น payload ที่ component ย่อยส่งมา
    const payload = event.detail;
    console.log('รับ payload จาก child:', payload);
    // ทำการ submit ไป server หรืออื่น ๆ ต่อได้
    alert('รับข้อมูลเรียบร้อย ดู Console');
  }
</script>

<header>
  <a href="javascript:history.back()">← กลับ</a>
  <h2>แบบประเมินหมวด {slug}</h2>
</header>

{#if slug === 'water'}
  <SurveyWater on:submit={handleSubmitFromChild} />
{:else if slug === 'soil'}
  <SurveySoil on:submit={handleSubmitFromChild} />
{:else if slug === 'fert-chem'}
  <SurveyFertChem on:submit={handleSubmitFromChild} />
{:else if slug === 'tools'}
  <SurveyTools on:submit={handleSubmitFromChild} />
{:else if slug === 'harvest'}
  <SurveyHarvest on:submit={handleSubmitFromChild} />
{:else if slug === 'postharvest'}
  <SurveyPostHarvest on:submit={handleSubmitFromChild} />
{:else if slug === 'facilities'}
  <SurveyFacilities on:submit={handleSubmitFromChild} />
{:else if slug === 'workers'}
  <SurveyWorkers on:submit={handleSubmitFromChild} />


{:else}
  <p>ยังไม่มีคำถามสำหรับหมวดนี้</p>
{/if}

