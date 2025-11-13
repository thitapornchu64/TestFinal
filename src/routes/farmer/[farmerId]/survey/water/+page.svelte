<script>
// @ts-nocheck

  import WaterForm from '$lib/components/WaterForm.svelte'
  export let data
</script>

<h1>{data.aspect.title}</h1>
<p>เจ้าของฟาร์ม: {data.farmer.name}</p>

<WaterForm />
