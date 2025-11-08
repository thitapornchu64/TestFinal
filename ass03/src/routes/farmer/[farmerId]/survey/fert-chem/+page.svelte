<script>
// @ts-nocheck

  import FertiliForm from '$lib/components/FertiliForm.svelte'
  export let data
</script>

<h1>{data.aspect.title}</h1>
<p>เจ้าของฟาร์ม: {data.farmer.name}</p>

<FertiliForm />
