<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  const dispatch = createEventDispatcher();


  //หมวด water
  let waterSourceText = ''; 
  let waterSourceChoice = ''; 
  let waterSourceOther = ''; 
  let waterImageFile = null;
  let waterImageUrl = '';
  let Q3Answer = '';
  const options = ['เคยผ่านการบำบัดน้ำ', 'ไม่เคยผ่านการบำบัด'];
  let treatmentImageFile = null;
  let treatmentImageUrl = '';
  let treatmentMethod = ''; // ถ้าบอกว่าเคยบำบัด ให้กรอกวิธี
  let sampleTaken = '';
  let wasteManaged = '';


  let errors = {};


  function handleFileChange(e, target) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (target === 'water') {
      if (waterImageUrl) URL.revokeObjectURL(waterImageUrl);
      waterImageFile = file;
      waterImageUrl = URL.createObjectURL(file);
    } else if (target === 'treatment') {
      if (treatmentImageUrl) URL.revokeObjectURL(treatmentImageUrl);
      treatmentImageFile = file;
      treatmentImageUrl = URL.createObjectURL(file);
    }
  }


  onDestroy(() => {
    if (waterImageUrl) URL.revokeObjectURL(waterImageUrl);
    if (treatmentImageUrl) URL.revokeObjectURL(treatmentImageUrl);
  });


  function validate() {
    errors = {};


    // Q1 validation
    if (!waterSourceChoice) {
      errors.waterSourceChoice = 'โปรดเลือกแหล่งน้ำ';
    } else if (waterSourceChoice === 'อื่นๆ' && (!waterSourceOther || !waterSourceOther.trim())) {
      errors.waterSourceOther = 'โปรดระบุแหล่งน้ำ (อื่นๆ)';
    }


    // Q3 validation
    if (!Q3Answer) {
      errors.Q3Answer = 'โปรดเลือกว่าผ่านการบำบัดหรือไม่';
    } else if (Q3Answer === 'เคยผ่านการบำบัดน้ำ' && (!treatmentMethod || !treatmentMethod.trim())) {
      errors.treatmentMethod = 'โปรดระบุวิธีการบำบัด';
    }


    // other validations
    if (!sampleTaken) errors.sampleTaken = 'โปรดระบุว่ามีการเก็บตัวอย่างน้ำหรือไม่';
    if (!wasteManaged) errors.wasteManaged = 'โปรดระบุการจัดการน้ำเสีย';


    // ถ้าเลือกเคยบำบัด แต่ต้องการรูปการบำบัดให้เช็คไฟล์ด้วย (option)
    if (Q3Answer === 'เคยผ่านการบำบัดน้ำ' && !treatmentImageFile) {
   
    }


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


    // เตรียม waterSourceText ให้เป็นค่าที่จะส่ง
    if (waterSourceChoice === 'อื่นๆ') {
      waterSourceText = waterSourceOther.trim();
    } else {
      waterSourceText = waterSourceChoice;
    }


    const payload = {
      category: 'water',
      waterSourceText,
      waterSourceChoice,
      waterSourceOther,
      Q3Answer,
      treatmentMethod,
      sampleTaken,
      wasteManaged,
      waterImageFile,
      treatmentImageFile
    };


    // ส่ง payload ขึ้น parent
    dispatch('submit', payload);
  }


  export function reset() {
    waterSourceText = '';
    waterSourceChoice = '';
    waterSourceOther = '';
    if (waterImageUrl) {
      URL.revokeObjectURL(waterImageUrl);
      waterImageUrl = '';
    }
    waterImageFile = null;
    Q3Answer = '';
    treatmentMethod = '';
    if (treatmentImageUrl) {
      URL.revokeObjectURL(treatmentImageUrl);
      treatmentImageUrl = '';
    }
    treatmentImageFile = null;
    sampleTaken = '';
    wasteManaged = '';
    errors = {};
  }
</script>

<form on:submit|preventDefault={submitLocal} class="survey-water-form">
  <h3 class="section-title">ข้อกำหนดหลัก</h3>
  <div class="card">
    <p>Q1: แหล่งน้ำที่ใช้ในการปลูกทุเรียนมาจากไหน?</p>

    <div class="options-inline" role="radiogroup" aria-labelledby="q1-label" style="margin-top:8px;">
      <label><input type="radio" bind:group={waterSourceChoice} value="ลำธาร" data-field="waterSourceChoice" /> ลำธาร</label>
      <label><input type="radio" bind:group={waterSourceChoice} value="น้ำโรงงาน" data-field="waterSourceChoice" /> น้ำโรงงาน</label>
      <label><input type="radio" bind:group={waterSourceChoice} value="น้ำประปา" data-field="waterSourceChoice" /> น้ำประปา</label>
      <label><input type="radio" bind:group={waterSourceChoice} value="น้ำล้างทิ้ง" data-field="waterSourceChoice" /> น้ำล้างทิ้ง</label>
      <label><input type="radio" bind:group={waterSourceChoice} value="น้ำบาดาล" data-field="waterSourceChoice" /> น้ำบาดาล</label>
      <label><input type="radio" bind:group={waterSourceChoice} value="อื่นๆ" data-field="waterSourceChoice" /> อื่นๆ</label>
    </div>

    {#if waterSourceChoice === 'อื่นๆ'}
      <div class="extra-box" style="margin-top:8px;">
        <label for="water-other">โปรดระบุแหล่งน้ำ (อื่นๆ):</label>
        <input id="water-other" type="text" bind:value={waterSourceOther} data-field="waterSourceOther" class:field-error={errors.waterSourceOther} aria-invalid={!!errors.waterSourceOther} aria-describedby={errors.waterSourceOther ? 'err-waterSourceOther' : null} />
        {#if errors.waterSourceOther}
          <div id="err-waterSourceOther" class="error">{errors.waterSourceOther}</div>
        {/if}
      </div>
    {/if}

    {#if errors.waterSourceChoice}
      <div class="error">{errors.waterSourceChoice}</div>
    {/if}
  </div>

  <div class="card">
    <p>Q2: อัปโหลดรูปภาพแหล่งน้ำ</p>
    <input type="file" accept="image/*" on:change={(e) => handleFileChange(e, 'water')} data-field="waterImageFile" />
    {#if waterImageUrl}
      <div class="preview">
        <img src={waterImageUrl} alt="preview water" width="200" />
      </div>
    {/if}
  </div>

  <div class="card">
    <p>Q3: แหล่งน้ำผ่านการบำบัดหรือไม่?</p>
    {#each options as opt}
      <label class="radio-label">
        <input type="radio" bind:group={Q3Answer} value={opt} data-field="Q3Answer" aria-describedby={errors.Q3Answer ? 'err-Q3Answer' : null} />
        {opt}
      </label>
    {/each}

    {#if Q3Answer === 'เคยผ่านการบำบัดน้ำ'}
      <div class="extra-box" style="margin-top:8px;">
        <label for="treatment-method">โปรดระบุวิธีการบำบัด:</label>
        <textarea id="treatment-method" bind:value={treatmentMethod} rows="3" data-field="treatmentMethod" class:field-error={errors.treatmentMethod} aria-invalid={!!errors.treatmentMethod} aria-describedby={errors.treatmentMethod ? 'err-treatmentMethod' : null}></textarea>
        {#if errors.treatmentMethod}
          <div id="err-treatmentMethod" class="error">{errors.treatmentMethod}</div>
        {/if}
      </div>
    {/if}

    {#if errors.Q3Answer}
      <div id="err-Q3Answer" class="error">{errors.Q3Answer}</div>
    {/if}
  </div>

  <div class="card">
    <p>Q4: โปรดอัปโหลดรูปภาพการบำบัดน้ำ (ถ้ามี)</p>
    <input type="file" accept="image/*" on:change={(e) => handleFileChange(e, 'treatment')} data-field="treatmentImageFile" />
    {#if treatmentImageUrl}
      <div class="preview">
        <img src={treatmentImageUrl} alt="preview treatment" width="200" />
      </div>
    {/if}
    {#if errors.treatmentImageFile}
      <div class="error">{errors.treatmentImageFile}</div>
    {/if}
  </div>

  <h3 class="text-lg font-semibold mb-3">ข้อกำหนดรอง</h3>

  <div class="card">
    <p>Q5: มีการเก็บตัวอย่างน้ำมาวิเคราะห์หรือไม่?</p>
    <label><input type="radio" bind:group={sampleTaken} value="มี" data-field="sampleTaken" /> มี</label>
    <label><input type="radio" bind:group={sampleTaken} value="ไม่มี" data-field="sampleTaken" /> ไม่มี</label>
    {#if errors.sampleTaken}<div class="error">{errors.sampleTaken}</div>{/if}
  </div>

  <div class="card">
    <p>Q6: มีการจัดการน้ำเสียหรือไม่?</p>
    <label><input type="radio" bind:group={wasteManaged} value="มี" data-field="wasteManaged" /> มี</label>
    <label><input type="radio" bind:group={wasteManaged} value="ไม่แน่ใจ/ไม่มี" data-field="wasteManaged" /> ไม่แน่ใจ/ไม่มี</label>
    {#if errors.wasteManaged}<div class="error">{errors.wasteManaged}</div>{/if}
  </div>

  <div class="actions" style="margin-top:12px;">
    <button type="button" on:click={reset} class="btn-reset">รีเซ็ต</button>
    <button type="submit" class="btn-submit">ส่ง (หมวด Water)</button>
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