<script>
// @ts-nocheck

  import ToolForm from '$lib/components/ToolForm.svelte'
  export let data
</script>

<h1>{data.aspect.title}</h1>
<p>เจ้าของฟาร์ม: {data.farmer.name}</p>

<ToolForm />
