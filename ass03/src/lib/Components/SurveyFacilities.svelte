<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // หมวด facilities
  let FacilitiesCleaning = '';
  let FacilitiesStorage = '';
  let FacilitiesWaste = '';
  let FacilitiesPest = '';
  let FacilitiesSanitation = '';
  let errors = {};

  function validate() {
    errors = {};
    if (!FacilitiesCleaning) errors.facilities_cleaning = 'โปรดระบุว่ามีการทำความสะอาดพื้นที่และอุปกรณ์ตามมาตรฐานหรือไม่';
    if (!FacilitiesStorage) errors.facilities_storage = 'โปรดระบุว่ามีพื้นที่เก็บวัสดุและผลิตภัณฑ์ที่ออกแบบไม่ให้ปนเปื้อนหรือไม่';
    if (!FacilitiesWaste) errors.facilities_waste = 'โปรดระบุว่ามีการจัดการของเสียและน้ำเสียอย่างเหมาะสมหรือไม่';
    if (!FacilitiesPest) errors.facilities_pest = 'โปรดระบุว่ามีระบบป้องกันและควบคุมศัตรูพืชหรือไม่';
    if (!FacilitiesSanitation) errors.facilities_sanitation = 'โปรดระบุว่ามีสิ่งอำนวยความสะดวกสุขาภิบาลเพียงพอสำหรับพนักงาน/ผู้ปฏิบัติงานหรือไม่';
    return Object.keys(errors).length === 0;
  }

  function submitLocal(e) {
    e.preventDefault();
    if (!validate()) {
      const first = Object.keys(errors)[0];
      setTimeout(() => {
        const el = document.querySelector(`[data-field="${first}"]`);
        if (el && typeof el.focus === 'function') el.focus();
      }, 0);
      return;
    }
    const payload = {
      category: 'facilities',
      FacilitiesCleaning,
      FacilitiesStorage,
      FacilitiesWaste,
      FacilitiesPest,
      FacilitiesSanitation
    };
    dispatch('submit', payload);
  }

  export function reset() {
    FacilitiesCleaning = '';
    FacilitiesStorage = '';
    FacilitiesWaste = '';
    FacilitiesPest = '';
    FacilitiesSanitation = '';
    errors = {};
  }
</script>

<form on:submit|preventDefault={submitLocal} class="survey-facilities-form">
  <h3 class="section-title">ข้อกำหนดหลัก</h3>

  <div class="card">
    <p>Q1: มีการทำความสะอาดพื้นที่ผลิตและอุปกรณ์เป็นประจำตามมาตรฐานใช่หรือไม่?</p>
    <label><input type="radio" bind:group={FacilitiesCleaning} value="ใช่" data-field="facilities_cleaning" /> ใช่</label>
    <label><input type="radio" bind:group={FacilitiesCleaning} value="ไม่ใช่" data-field="facilities_cleaning" /> ไม่ใช่</label>
    {#if errors.facilities_cleaning}<div class="error">{errors.facilities_cleaning}</div>{/if}
  </div>

  <div class="card">
    <p>Q2: พื้นที่เก็บวัตถุดิบและผลิตภัณฑ์ถูกออกแบบและจัดการเพื่อป้องกันการปนเปื้อนใช่หรือไม่?</p>
    <label><input type="radio" bind:group={FacilitiesStorage} value="ใช่" data-field="facilities_storage" /> ใช่</label>
    <label><input type="radio" bind:group={FacilitiesStorage} value="ไม่ใช่" data-field="facilities_storage" /> ไม่ใช่</label>
    {#if errors.facilities_storage}<div class="error">{errors.facilities_storage}</div>{/if}
  </div>

  <h3 class="text-lg font-semibold mb-3">ข้อกำหนดรอง</h3>

  <div class="card">
    <p>Q3: มีการจัดการของเสีย/น้ำเสียที่ไม่ก่อให้เกิดการปนเปื้อนต่อผลิตภัณฑ์ใช่หรือไม่?</p>
    <label><input type="radio" bind:group={FacilitiesWaste} value="ใช่" data-field="facilities_waste" /> ใช่</label>
    <label><input type="radio" bind:group={FacilitiesWaste} value="ไม่ใช่" data-field="facilities_waste" /> ไม่ใช่</label>
    {#if errors.facilities_waste}<div class="error">{errors.facilities_waste}</div>{/if}
  </div>

  <div class="card">
    <p>Q4: มีมาตรการควบคุมและป้องกันศัตรูพืช (pest control) ที่เหมาะสมใช่หรือไม่?</p>
    <label><input type="radio" bind:group={FacilitiesPest} value="ใช่" data-field="facilities_pest" /> ใช่</label>
    <label><input type="radio" bind:group={FacilitiesPest} value="ไม่ใช่" data-field="facilities_pest" /> ไม่ใช่</label>
    {#if errors.facilities_pest}<div class="error">{errors.facilities_pest}</div>{/if}
  </div>

  <div class="card">
    <p>Q5: มีสิ่งอำนวยความสะดวกด้านสุขอนามัย (ห้องน้ำ ล้างมือ เปลี่ยนเสื้อ) เพียงพอและถูกต้องตามมาตรฐานใช่หรือไม่?</p>
    <label><input type="radio" bind:group={FacilitiesSanitation} value="ใช่" data-field="facilities_sanitation" /> ใช่</label>
    <label><input type="radio" bind:group={FacilitiesSanitation} value="ไม่ใช่" data-field="facilities_sanitation" /> ไม่ใช่</label>
    {#if errors.facilities_sanitation}<div class="error">{errors.facilities_sanitation}</div>{/if}
  </div>

  <div class="actions" style="margin-top:12px;">
    <button type="button" on:click={reset} class="btn-reset">รีเซ็ต</button>
    <button type="submit" class="btn-submit">ส่ง (หมวด Facilities)</button>
  </div>

  <style>
  .error {
    color: #b91c1c; /* red-700 */
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
  .field-error {
    border-color: #fca5a5; /* subtle red */
  }
  form label { display:block; margin:6px 0; }
  input[type="text"], input[type="number"], textarea, input[type="date"] { width:50%; padding:8px; border:1px solid #ddd; border-radius:6px; }


 .card{
    background: #fff;
    border: 3px solid #e5e7eb;
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 1px 2px rgba(0,0,0,.04);
    margin-bottom: 12px;
  }
</style>

</form>

