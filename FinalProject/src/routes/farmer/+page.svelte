<!-- /farmer/+page.svelte -->
<script>
  export let data
</script>

<h1>รายชื่อเกษตรกร</h1>
<div class="grid">
  {#each data.farmers as f}
    <div class="card">
      <h2>{f.name}</h2>
      <p>จังหวัด: {f.province}</p>
      <a class="btn" href={`/farmer/${f.id}/survey`}>ดูแบบประเมิน</a>
    </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }
  .card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 12px;
    background: #fff;
  }
  .btn {
    color: white;
    background: #0078d4;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-decoration: none;
  }
</style>
