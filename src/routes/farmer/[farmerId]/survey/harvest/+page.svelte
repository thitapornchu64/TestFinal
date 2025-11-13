<script>
// @ts-nocheck

  import HarvestForm from '$lib/components/HarvestForm.svelte'
  export let data
</script>

<h1>{data.aspect.title}</h1>
<p>เจ้าของฟาร์ม: {data.farmer.name}</p>

<HarvestForm />
