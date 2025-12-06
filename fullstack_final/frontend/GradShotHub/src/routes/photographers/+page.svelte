<script>
  import { goto } from '$app/navigation';
  import photographers from '$lib/data/photographers.json';

   // @ts-ignore
   function bookPhotographer(photo) {
    if (photo.status === 'ว่าง') {
      const params = new URLSearchParams({
        name: photo.name,
        rate: photo.rate,
        price: photo.price
      });
      goto(`/slots?${params.toString()}`);
    } else {
      alert(`${photo.name} ไม่ว่าง กรุณาเลือกช่างภาพอื่น`);
    }
  } 
</script>

<div class="container">
  <h2>เลือกช่างภาพ</h2>
  
  {#each photographers as photo}
    <div class="photographer-card" class:unavailable={photo.status !== 'ว่าง'}>
      <div class="info-row">
        <span class="name">Name: {photo.name}</span>
      </div>
      <div class="info-row">
        <span>Rate: {photo.rate}</span>
        <span class:status-available={photo.status === 'ว่าง'} class:status-unavailable={photo.status !== 'ว่าง'}>
          status: {photo.status}
        </span>
      </div>
      <div style="height: 40px; border: 1px solid #ccc; margin-top: 5px; background-color: #f0f0f0; text-align: center; line-height: 40px;">
          *ตัวอย่างภาพถ่าย*
      </div>
      
      <button 
        on:click={() => bookPhotographer(photo)} 
        disabled={photo.status !== 'ว่าง'}>
        Book
      </button>
    </div>
  {/each}
</div>

<style>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  .photographer-card {
    background-color: white;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  .photographer-card.unavailable {
    opacity: 0.6;
    background-color: #eee;
  }
  .info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .name {
    font-weight: bold;
    font-size: 1.1em;
  }
  .status-available {
    color: green;
    font-weight: bold;
  }
  .status-unavailable {
    color: red;
    font-weight: bold;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 10px;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>