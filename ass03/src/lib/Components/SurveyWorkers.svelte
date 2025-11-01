<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // หมวด workers
  let WorkersTraining = '';
  let WorkersHealth = '';
  let WorkersHygiene = '';
  let WorkersPPE = '';
  let WorkersRecord = '';
  let errors = {};

  function validate() {
    errors = {};
    if (!WorkersTraining) errors.workers_training = 'โปรดระบุว่ามีพนักงานได้รับการฝึกอบรมตามที่กำหนดหรือไม่';
    if (!WorkersHealth) errors.workers_health = 'โปรดระบุว่ามีการคัดกรองสุขภาพและการตรวจสุขภาพตามความเหมาะสมหรือไม่';
    if (!WorkersHygiene) errors.workers_hygiene = 'โปรดระบุว่าพนักงานมีการปฏิบัติสุขอนามัยส่วนบุคคลที่ดีหรือไม่';
    if (!WorkersPPE) errors.workers_ppe = 'โปรดระบุว่ามีการจัดหาและใช้อุปกรณ์ป้องกันส่วนบุคคล (PPE) ตามความจำเป็นหรือไม่';
    if (!WorkersRecord) errors.workers_record = 'โปรดระบุว่ามีการเก็บบันทึกการฝึกอบรมและสุขภาพของพนักงานหรือไม่';
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
      category: 'workers',
      WorkersTraining,
      WorkersHealth,
      WorkersHygiene,
      WorkersPPE,
      WorkersRecord
    };
    dispatch('submit', payload);
  }

  export function reset() {
    WorkersTraining = '';
    WorkersHealth = '';
    WorkersHygiene = '';
    WorkersPPE = '';
    WorkersRecord = '';
    errors = {};
  }
</script>

<form on:submit|preventDefault={submitLocal} class="survey-workers-form">
  <h3 class="section-title">ข้อกำหนดหลัก</h3>

  <div class="card">
    <p>Q1: พนักงานได้รับการฝึกอบรมเกี่ยวกับขั้นตอนความปลอดภัยและสุขอนามัยที่เกี่ยวข้องกับงานใช่หรือไม่?</p>
    <label><input type="radio" bind:group={WorkersTraining} value="ใช่" data-field="workers_training" /> ใช่</label>
    <label><input type="radio" bind:group={WorkersTraining} value="ไม่ใช่" data-field="workers_training" /> ไม่ใช่</label>
    {#if errors.workers_training}<div class="error">{errors.workers_training}</div>{/if}
  </div>

  <div class="card">
    <p>Q2: มีการคัดกรองสุขภาพพนักงาน/การตรวจสุขภาพตามความเสี่ยงของงานใช่หรือไม่?</p>
    <label><input type="radio" bind:group={WorkersHealth} value="ใช่" data-field="workers_health" /> ใช่</label>
    <label><input type="radio" bind:group={WorkersHealth} value="ไม่ใช่" data-field="workers_health" /> ไม่ใช่</label>
    {#if errors.workers_health}<div class="error">{errors.workers_health}</div>{/if}
  </div>

  <h3 class="text-lg font-semibold mb-3">ข้อกำหนดรอง</h3>

  <div class="card">
    <p>Q3: พนักงานปฏิบัติสุขอนามัยส่วนบุคคล (เช่น ล้างมือ สวมผ้าคลุมผม) อย่างเคร่งครัดใช่หรือไม่?</p>
    <label><input type="radio" bind:group={WorkersHygiene} value="ใช่" data-field="workers_hygiene" /> ใช่</label>
    <label><input type="radio" bind:group={WorkersHygiene} value="ไม่ใช่" data-field="workers_hygiene" /> ไม่ใช่</label>
    {#if errors.workers_hygiene}<div class="error">{errors.workers_hygiene}</div>{/if}
  </div>

  <div class="card">
    <p>Q4: มีการจัดหาและบังคับใช้การใช้ PPE ที่จำเป็น (เช่น ถุงมือ มาสก์ รองเท้า) ในงานที่เกี่ยวข้องใช่หรือไม่?</p>
    <label><input type="radio" bind:group={WorkersPPE} value="ใช่" data-field="workers_ppe" /> ใช่</label>
    <label><input type="radio" bind:group={WorkersPPE} value="ไม่ใช่" data-field="workers_ppe" /> ไม่ใช่</label>
    {#if errors.workers_ppe}<div class="error">{errors.workers_ppe}</div>{/if}
  </div>

  <div class="card">
    <p>Q5: มีการเก็บบันทึกการฝึกอบรม การคัดกรองสุขภาพ และการตรวจสอบความเหมาะสมของพนักงานหรือไม่?</p>
    <label><input type="radio" bind:group={WorkersRecord} value="ใช่" data-field="workers_record" /> ใช่</label>
    <label><input type="radio" bind:group={WorkersRecord} value="ไม่ใช่" data-field="workers_record" /> ไม่ใช่</label>
    {#if errors.workers_record}<div class="error">{errors.workers_record}</div>{/if}
  </div>

  <div class="actions" style="margin-top:12px;">
    <button type="button" on:click={reset} class="btn-reset">รีเซ็ต</button>
    <button type="submit" class="btn-submit">ส่ง (หมวด Workers)</button>
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