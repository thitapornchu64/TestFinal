<script>
// @ts-nocheck

  import PostharvestForm from '$lib/components/PostharvestForm.svelte'
  export let data
</script>

<h1>{data.aspect.title}</h1>
<p>เจ้าของฟาร์ม: {data.farmer.name}</p>

<PostharvestForm />
