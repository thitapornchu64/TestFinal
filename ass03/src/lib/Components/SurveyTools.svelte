<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  //หมวด tools
  let SoilTreatment = '';
  let SoilLaw = '';
  let SoilTest = '';
  let SoilPrevent = '';
  let SoilMeasure = '';

  let errors = {};

  function validate() {
    errors = {};
    if (!SoilTreatment) errors.tools_SoILTreatment = 'โปรดระบุว่าอุปกรณ์ไม่ก่อให้เกิดการปนเปื้อนหรือไม่';
    if (!SoilLaw) errors.tools_cleaning = 'โปรดระบุว่ามีการทำความสะอาดอุปกรณ์หลังการใช้งานหรือไม่';
    if (!SoilTest) errors.tools_separation = 'โปรดระบุการแยกภาชนะที่ใช้เก็บของเสียหรือไม่';
    if (!SoilPrevent) errors.tools_inspect = 'โปรดระบุการตรวจสอบเครื่องมืออย่างน้อยปีละครั้งหรือไม่';
    if (!SoilMeasure) errors.tools_hygiene = 'โปรดระบุว่ามีสิ่งอำนวยความสะอาดเพียงพอหรือไม่';
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
      category: 'tools',
      SoilTreatment,
      SoilLaw,
      SoilTest,
      SoilPrevent,
      SoilMeasure
    };

    dispatch('submit', payload);
  }

  export function reset() {
    SoilTreatment = '';
    SoilLaw = '';
    SoilTest = '';
    SoilPrevent = '';
    SoilMeasure = '';
    errors = {};
  }
</script>

<form on:submit|preventDefault={submitLocal} class="survey-tools-form">
  <h3 class="section-title">ข้อกำหนดหลัก</h3>
  <div class="card">
    <p>Q1: อุปกรณ์ ภาชนะบรรจุ หรือวัสดุที่สัมผัสกับผลผลิตโดยตรงทำจากวัสดุที่ไม่ก่อให้เกิดการปนเปื้อนใช่หรือไม่?</p>
    <label><input type="radio" bind:group={SoilTreatment} value="ใช่" data-field="tools_SoILTreatment" /> ใช่</label>
    <label><input type="radio" bind:group={SoilTreatment} value="ไม่ใช่" data-field="tools_SoILTreatment" /> ไม่ใช่</label>
    {#if errors.tools_SoILTreatment}<div class="error">{errors.tools_SoILTreatment}</div>{/if}
  </div>

  <div class="card">
    <p>Q2: มีการทำความสะอาดเครื่องพ่นสารเคมีและอุปกรณ์ทุกครั้งหลังใช้งาน และจัดการน้ำล้างไม่ให้ก่อให้เกิดการปนเปื้อนใช่หรือไม่?</p>
    <label><input type="radio" bind:group={SoilLaw} value="ใช่" data-field="tools_cleaning" /> ใช่</label>
    <label><input type="radio" bind:group={SoilLaw} value="ไม่ใช่" data-field="tools_cleaning" /> ไม่ใช่</label>
    {#if errors.tools_cleaning}<div class="error">{errors.tools_cleaning}</div>{/if}
  </div>

  <h3 class="text-lg font-semibold mb-3">ข้อกำหนดรอง</h3>

  <div class="card">
    <p>Q3: ภาชนะบรรจุของเสีย สารเคมี ปุ๋ย แยกจากภาชนะที่ใช้เก็บเกี่ยวใช่หรือไม่?</p>
    <label><input type="radio" bind:group={SoilTest} value="ใช่" data-field="tools_separation" /> ใช่</label>
    <label><input type="radio" bind:group={SoilTest} value="ไม่ใช่" data-field="tools_separation" /> ไม่ใช่</label>
    {#if errors.tools_separation}<div class="error">{errors.tools_separation}</div>{/if}
  </div>

  <div class="card">
    <p>Q4: มีการตรวจสอบเครื่องมือที่ต้องการความแม่นยำอย่างน้อยปีละครั้งหรือไม่?</p>
    <label><input type="radio" bind:group={SoilPrevent} value="ใช่" data-field="tools_inspect" /> ใช่</label>
    <label><input type="radio" bind:group={SoilPrevent} value="ไม่ใช่" data-field="tools_inspect" /> ไม่ใช่</label>
    {#if errors.tools_inspect}<div class="error">{errors.tools_inspect}</div>{/if}
  </div>

  <div class="card">
    <p>Q5: สถานที่ปฏิบัติงานมีสิ่งอำนวยความสะดวกด้านสุขลักษณะอย่างเพียงพอหรือไม่?</p>
    <label><input type="radio" bind:group={SoilMeasure} value="ใช่" data-field="tools_hygiene" /> ใช่</label>
    <label><input type="radio" bind:group={SoilMeasure} value="ไม่ใช่" data-field="tools_hygiene" /> ไม่ใช่</label>
    {#if errors.tools_hygiene}<div class="error">{errors.tools_hygiene}</div>{/if}
  </div>

  <div class="actions" style="margin-top:12px;">
    <button type="button" on:click={reset} class="btn-reset">รีเซ็ต</button>
    <button type="submit" class="btn-submit">ส่ง (หมวด Tools)</button>
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