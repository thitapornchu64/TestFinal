<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; 

  let photographerName = '';
  let photographerRate = '';

  $: query = $page.url.searchParams;

  onMount(() => {
    photographerName = query.get('name') || '';
    photographerRate = query.get('rate') || '';
  });

  let selectedDate = new Date().toISOString().split('T')[0];
  // @ts-ignore
  let selectedSlot = null;
  let packageType = 'package A';
  let locationInput = ''; 
  let notesInput = '';
  let phoneInput = ''; 

  const packagePrices = {
    'package A': 2500,
    'package B': 3000,
    'package C': 2800,
    'package D': 3200,
    'package E': 4500,
    'package F': 5000
  };

 // @ts-ignore
   $: photographerPrice = packagePrices[packageType];

  const bookedSlots = ['2025-12-07 13:00']; 
  const timeGrid = [
      ['09:00','10:00','11:00','12:00'],
      ['13:00','14:00','15:00','16:00'],
      ['17:00','18:00','19:00','20:00'],
  ];

  // @ts-ignore
  function getSlotStatus(time) {
      const dateTimeString = `${selectedDate} ${time}`;
      return bookedSlots.includes(dateTimeString) ? 'booked' : 'available';
  }

  // @ts-ignore
  function handleSlotClick(time) {
      if (getSlotStatus(time) === 'available') selectedSlot = time;
      else alert('⚠️ เวลาดังกล่าวถูกจองแล้ว');
  }

  function goToNext() {
    // @ts-ignore
    if (!selectedSlot) {
      alert('กรุณาเลือกวันและเวลาที่ต้องการ');
      return;
    }
    
    const params = new URLSearchParams({
      photographerName,
      photographerRate,
      selectedDate,
      selectedSlot,
      packageType,
      photographerPrice: photographerPrice.toString(), 
      phoneInput,
      locationInput,
      notesInput
    });

    goto(`/confirm?${params.toString()}`);
  }
</script>

<div class="container">
  <h2>เลือกวันเวลา สำหรับช่างภาพ: {photographerName}</h2>
  <p>Rate: {photographerRate} | Price: {photographerPrice} บาท</p>

  <div class="input-group">
      <label for="date-input">วันที่จะไป:</label>
      <input type="date" id="date-input" bind:value={selectedDate} />
  </div>

  <div class="input-group">
      <label for="package-select">Package:</label>
      <select id="package-select" bind:value={packageType}>
          <option value="package A">Package A (ถ่ายเดี่ยว 2 ชม.)</option>
          <option value="package B">Package B (ถ่ายเดี่ยว 4 ชม.)</option>
          <option value="package C">Package C (ถ่ายกลุ่ม 2 ชม.)</option>
          <option value="package D">Package D (ถ่ายกลุ่ม 4 ชม.)</option>
          <option value="package E">Package E (ถ่ายเดี่ยวทั้งวัน)</option>
          <option value="package F">Package F (ถ่ายกลุ่มทั้งวัน)</option>
      </select>
  </div>

  <div class="time-grid">
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label>เวลานัดเจอ:</label>
    {#each timeGrid as row}
      {#each row as time}
        <div 
          class="time-slot"
          class:available={getSlotStatus(time) === 'available'}
          class:booked={getSlotStatus(time) === 'booked'}
          class:selected={selectedSlot === time}
          on:click={() => handleSlotClick(time)}
        >
          {time}
        </div>
      {/each}
    {/each}
  </div>

  <div class="legend">
      <label for="phone-input">📞 เบอร์โทรศัพท์:</label>
      <input 
          type="tel" 
          id="phone-input" 
          placeholder="เช่น 0812345678" 
          bind:value={phoneInput}/>

      <label for="location-input">📍สถานที่:</label>
      <input 
          type="text" 
          id="location-input" 
          placeholder="เช่น คณะพาณิชยศาสตร์และการบัญชี @มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต" 
          bind:value={locationInput}/>

      <label for="note-input">หมายเหตุ:</label>
      <input type="text" id="note-input" placeholder="" bind:value={notesInput}/>
  </div>

  <button class="next-button" on:click={goToNext}>
    NEXT
  </button>
</div>

<style>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  h2 {
    color: #333;
    margin-bottom: 20px;
  }
  .input-group {
      margin-bottom: 15px;
  }
  .time-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    margin-top: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  }
  .time-slot {
    padding: 10px 5px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.1s;
    user-select: none;
    text-align: center;
  }
  .available {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
  }
  .available:hover {
    background-color: #bae7ff;
  }
  .booked {
    background-color: #ffcccc;
    color: #a00;
    cursor: not-allowed;
    border: 1px solid #f5222d;
  }
  .selected {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border-color: #0056b3;
  }
  .legend {
    margin-top: 20px;
    font-size: 0.9em;
    text-align: left;
    padding-left: 10px;
  }
  .legend p { margin: 5px 0; }
  .legend-item {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
  }
  .next-button {
    margin-top: 20px;
    padding: 10px 30px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1em;
  }
</style>