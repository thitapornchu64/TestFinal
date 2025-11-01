<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  const dispatch = createEventDispatcher();

  //หมวด soil
  let RiskTaken = '';
  let SoilTreatment = '';
  let SoilLaw = '';
  let SoilTest = '';
  let SoilPrevent = '';
  let SoilMeasure = '';

  let errors = {};

  function validate() {
    errors = {};
    if (!RiskTaken) errors.RiskTaken = 'โปรดระบุความเสี่ยงของพื้นที่';
    if (!SoilTreatment) errors.SoilTreatment = 'โปรดระบุว่ามีการบำบัดดินหรือไม่';
    if (!SoilLaw) errors.SoilLaw = 'โปรดระบุการปฏิบัติตามกฎหมาย';
    if (!SoilTest) errors.SoilTest = 'โปรดระบุว่ามีการเก็บตัวอย่างดินหรือไม่';
    if (!SoilPrevent) errors.SoilPrevent = 'โปรดระบุมาตรการป้องกันผลกระทบ';
    if (!SoilMeasure || SoilMeasure.trim() === '') errors.SoilMeasure = 'โปรดระบุมาตรการป้องกันผลกระทบ';
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
      category: 'soil',
      RiskTaken,
      SoilTreatment,
      SoilLaw,
      SoilTest,
      SoilPrevent,
      SoilMeasure
    };

    dispatch('submit', payload);
  }

  export function reset() {
    RiskTaken = '';
    SoilTreatment = '';
    SoilLaw = '';
    SoilTest = '';
    SoilPrevent = '';
    SoilMeasure = '';
    errors = {};
  }
</script>

<form on:submit|preventDefault={submitLocal} class="survey-soil-form">
  <h3 class="section-title">ข้อกำหนดหลัก</h3> 
  <div class="card">
    <p>Q1: พื้นที่เพาะปลูกของคุณไม่เสี่ยงต่อการปนเปื้อนวัตถุหรือสิ่งอันตรายใช่หรือไม่?</p>
    <label><input type="radio" bind:group={RiskTaken} value="เสี่ยง" data-field="RiskTaken" /> เสี่ยง</label>
    <label><input type="radio" bind:group={RiskTaken} value="ไม่เสี่ยง" data-field="RiskTaken" /> ไม่เสี่ยง</label>
    <label><input type="radio" bind:group={RiskTaken} value="ไม่ทราบ" data-field="RiskTaken" /> ไม่ทราบ</label>
    {#if errors.RiskTaken}<div class="error">{errors.RiskTaken}</div>{/if}
  </div>

  <div class="card">
    <p>Q2: หากมีความเสี่ยง คุณมีการบำบัดให้อยู่ในระดับปลอดภัยหรือไม่?</p>
    <label><input type="radio" bind:group={SoilTreatment} value="มี" data-field="SoilTreatment" /> มี</label>
    <label><input type="radio" bind:group={SoilTreatment} value="ไม่มี" data-field="SoilTreatment" /> ไม่มี</label>
    {#if errors.SoilTreatment}<div class="error">{errors.SoilTreatment}</div>{/if}
  </div>

  <div class="card">
    <p>Q3: พื้นที่ปลูกเป็นไปตามข้อกำหนดของกฎหมายที่เกี่ยวข้องหรือไม่?</p>
    <label><input type="radio" bind:group={SoilLaw} value="มี" data-field="SoilLaw" /> มี</label>
    <label><input type="radio" bind:group={SoilLaw} value="ไม่มี" data-field="SoilLaw" /> ไม่มี</label>
    {#if errors.SoilLaw}<div class="error">{errors.SoilLaw}</div>{/if}
  </div>

  <h3 class="text-lg font-semibold mb-3">ข้อกำหนดรอง</h3>

  <div class="card">
    <p>Q4: มีการเก็บตัวอย่างดินเพื่อตรวจวิเคราะห์การปนเปื้อนในระยะเริ่มต้นหรือไม่?</p>
    <label><input type="radio" bind:group={SoilTest} value="มี" data-field="SoilTest" /> มี</label>
    <label><input type="radio" bind:group={SoilTest} value="ไม่มี" data-field="SoilTest" /> ไม่มี</label>
    {#if errors.SoilTest}<div class="error">{errors.SoilTest}</div>{/if}
  </div>

  <div class="card">
    <p>Q5: พื้นที่ปลูกใหม่ไม่ส่งผลกระทบต่อสิ่งแวดล้อม หรือมีมาตรการป้องกันผลกระทบไว้แล้วใช่หรือไม่?</p>
    <label><input type="radio" bind:group={SoilPrevent} value="มี" data-field="SoilPrevent" /> มี</label>
    <label><input type="radio" bind:group={SoilPrevent} value="ไม่มี" data-field="SoilPrevent" /> ไม่มี</label>
    {#if errors.SoilPrevent}<div class="error">{errors.SoilPrevent}</div>{/if}
  </div>

  <div class="card">
    <p>โปรดระบุมาตรการป้องกันผลกระทบของท่าน และอธิบายรายละเอียดพอสังเขป</p>
    <textarea bind:value={SoilMeasure} placeholder="เช่น มาตรการ: จัดทำบ่อพักน้ำเสียก่อนปล่อยลงสู่ธรรมชาติ" data-field="SoilMeasure" class:field-error={errors.SoilMeasure} aria-invalid={!!errors.SoilMeasure} aria-describedby={errors.SoilMeasure ? 'err-SoilMeasure' : null}></textarea>
    {#if errors.SoilMeasure}<div id="err-SoilMeasure" class="error">{errors.SoilMeasure}</div>{/if}
  </div>

  <div class="actions" style="margin-top:12px;">
    <button type="button" on:click={reset} class="btn-reset">รีเซ็ต</button>
    <button type="submit" class="btn-submit">ส่ง (หมวด Soil)</button>
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