<script>
// @ts-nocheck

  import WorkerForm from '$lib/components/WorkerForm.svelte'
  export let data
</script>

<h1>{data.aspect.title}</h1>
<p>เจ้าของฟาร์ม: {data.farmer.name}</p>

<WorkerForm />
