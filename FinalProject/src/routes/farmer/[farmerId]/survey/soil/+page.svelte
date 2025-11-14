<script>
// @ts-nocheck

  import SoilForm from '$lib/components/SoilForm.svelte'
  export let data
</script>

<h1>{data.aspect.title}</h1>
<p>เจ้าของฟาร์ม: {data.farmer.name}</p>

<SoilForm />
