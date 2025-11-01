<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  const dispatch = createEventDispatcher();

  //หมวด fert-chem
  let useHumanWaste = [];            // เก็บผลสุดท้ายเป็น array แบบเดิม
  let useHumanWasteChoice = '';     // เก็บค่าจาก radio (ใช้ / ไม่ใช้เลย / ไม่ทราบ)
  let useHumanWasteDetail = '';     // เก็บค่าจาก select (รายละเอียดเมื่อเลือก "ใช้")
  let useChemicalProperly = '';
  let pesticideResidue = '';
  let residueDate = '';
  let residueFile = null;
  let residueUrl = '';
  let useBannedSubstance = '';
  let exportComply = '';

  let errors = {};

  function handleFileChange(e, target) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (target === 'residue') {
      if (residueUrl) URL.revokeObjectURL(residueUrl);
      residueFile = file;
      residueUrl = URL.createObjectURL(file);
    }
  }

  onDestroy(() => {
    if (residueUrl) URL.revokeObjectURL(residueUrl);
  });

  function validate() {
    errors = {};

    // ตรวจ radio / select ของ useHumanWaste
    if (!useHumanWasteChoice) {
      errors.useHumanWaste = 'โปรดเลือกว่าจะใช้สิ่งขับถ่ายของคนเป็นปุ๋ยหรือไม่';
    } else if (useHumanWasteChoice === 'ใช้' && !useHumanWasteDetail) {
      errors.useHumanWasteDetail = 'โปรดระบุรูปแบบการใช้';
    }

    if (!useChemicalProperly) errors.useChemicalProperly = 'โปรดระบุว่าคุณใช้สารเคมีตามคำแนะนำหรือไม่';
    if (pesticideResidue !== '' && Number(pesticideResidue) > 0) {
      if (!residueDate) errors.residueDate = 'โปรดระบุวันที่ตรวจวัดสารตกค้าง';
      if (!residueFile) errors.residueFile = 'โปรดอัปโหลดหลักฐานการตรวจวัด (รูป/ไฟล์)';
    }
    if (!useBannedSubstance) errors.useBannedSubstance = 'โปรดระบุการใช้สารต้องห้ามหรือไม่';
    if (!exportComply) errors.exportComply = 'โปรดระบุการปฏิบัติตามข้อกำหนดการส่งออก (ถ้ามี)';

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

    useHumanWaste = useHumanWasteChoice === 'ใช้'
      ? [useHumanWasteChoice, useHumanWasteDetail]
      : [useHumanWasteChoice];

    const payload = {
      category: 'fert-chem',
      useHumanWaste,           // array เช่น ['ใช้','ใช้โดยตรงไม่ผ่านการหมัก'] หรือ ['ไม่ใช้เลย']
      useHumanWasteChoice,     // ตัวเลือกหลัก (optional)
      useHumanWasteDetail,     // รายละเอียด (optional)
      useChemicalProperly,
      pesticideResidue,
      residueDate,
      residueFile,
      useBannedSubstance,
      exportComply
    };

    dispatch('submit', payload);
  }

  export function reset() {
    useHumanWaste = [];
    useHumanWasteChoice = '';
    useHumanWasteDetail = '';
    useChemicalProperly = '';
    pesticideResidue = '';
    residueDate = '';
    if (residueUrl) {
      URL.revokeObjectURL(residueUrl);
      residueUrl = '';
    }
    residueFile = null;
    useBannedSubstance = '';
    exportComply = '';
    errors = {};
  }
</script>

<form on:submit|preventDefault={submitLocal} class="survey-fert-form">
  <h3 class="section-title">ข้อกำหนดหลัก</h3>
  <div class="card">
    <p>Q1: คุณใช้สิ่งขับถ่ายของคนเป็นปุ๋ยหรือไม่?</p>

    <div class="options">
      <label>
        <input type="radio" bind:group={useHumanWasteChoice} value="ใช้" data-field="useHumanWaste" /> ใช้
      </label>
      <label>
        <input type="radio" bind:group={useHumanWasteChoice} value="ไม่ใช้เลย" data-field="useHumanWaste" /> ไม่ใช้เลย
      </label>
      <label>
        <input type="radio" bind:group={useHumanWasteChoice} value="ไม่ทราบ" data-field="useHumanWaste" /> ไม่ทราบ
      </label>
    </div>

    {#if useHumanWasteChoice === 'ใช้'}
      <div class="extra-box" style="margin-top:8px;">
        <label for="hw-detail">โปรดระบุรูปแบบการใช้:</label>
        <select id="hw-detail" bind:value={useHumanWasteDetail} data-field="useHumanWasteDetail" aria-describedby={errors.useHumanWasteDetail ? 'err-useHumanWasteDetail' : null}>
          <option value="">-- โปรดเลือก --</option>
          <option value="ใช้โดยตรงไม่ผ่านการหมัก">ใช้โดยตรงไม่ผ่านการหมัก</option>
          <option value="ใช้หลังผ่านการหมัก">ใช้หลังผ่านการหมัก</option>
        </select>
        {#if errors.useHumanWasteDetail}
          <div id="err-useHumanWasteDetail" class="error">{errors.useHumanWasteDetail}</div>
        {/if}
      </div>
    {/if}

    {#if errors.useHumanWaste}
      <div class="error">{errors.useHumanWaste}</div>
    {/if}
  </div>

  <div class="card">
    <p>Q2: คุณใช้สารเคมีตามคำแนะนำ และหยุดใช้ก่อนการเก็บเกี่ยวตามฉลากหรือไม่?</p>
    <label><input type="radio" bind:group={useChemicalProperly} value="ใช่" data-field="useChemicalProperly" /> ใช่</label>
    <label><input type="radio" bind:group={useChemicalProperly} value="ไม่ใช่" data-field="useChemicalProperly" /> ไม่ใช่</label>
    {#if errors.useChemicalProperly}<div class="error">{errors.useChemicalProperly}</div>{/if}

    <p>โปรดอัปโหลดรูปภาพปุ๋ยและสารเคมีที่คุณใช้ล่าสุด</p>
    <input type="file" accept="image/*" />
  </div>

  <div class="card">
    <p>Q3: การตรวจวัดค่าสารตกค้างและปนเปื้อนจากการใช้ปุ๋ย</p>
    <p>โปรดระบุค่าสารตกค้างที่ตรวจวัดได้</p>
    <input type="number" step="0.01" min="0" placeholder="ค่าที่ตรวจวัดได้ (มก./กก.)" bind:value={pesticideResidue} data-field="pesticideResidue" />

    <p>โปรดระบุข้อมูลวันที่มีการตรวจวัดสารตกค้าง</p>
    <input type="date" bind:value={residueDate} data-field="residueDate" />
    {#if errors.residueDate}<div class="error">{errors.residueDate}</div>{/if}

    <p>โปรดอัปโหลดหลักฐานการบันทึกและป้องกันไม่ให้เกิดสารตกค้างซ้ำ</p>
    <input type="file" accept="image/*" on:change={(e) => handleFileChange(e, 'residue')} data-field="residueFile" />
    {#if residueUrl}<img src={residueUrl} alt="preview residue" width="200" />{/if}
    {#if errors.residueFile}<div class="error">{errors.residueFile}</div>{/if}
  </div>

  <div class="card">
    <p>Q4: คุณใช้วัตถุอันตรายทางการเกษตรที่ห้ามตาม พ.ร.บ. พ.ศ. 2535 หรือไม่?</p>
    <label><input type="radio" bind:group={useBannedSubstance} value="ใช้" data-field="useBannedSubstance" /> มีการใช้</label>
    <label><input type="radio" bind:group={useBannedSubstance} value="ไม่ใช้" data-field="useBannedSubstance" /> ไม่ใช้</label>
    {#if errors.useBannedSubstance}<div class="error">{errors.useBannedSubstance}</div>{/if}
  </div>

  <div class="card">
    <p>Q5: หากคุณส่งออกผลผลิต คุณปฏิบัติตามข้อกำหนดสารอันตรายของประเทศคู่ค้าหรือไม่?</p>
    <label><input type="radio" bind:group={exportComply} value="ปฏิบัติ" data-field="exportComply" /> ปฏิบัติ</label>
    <label><input type="radio" bind:group={exportComply} value="ไม่ได้ปฏิบัติ" data-field="exportComply" /> ไม่ได้ปฏิบัติ</label>
    {#if errors.exportComply}<div class="error">{errors.exportComply}</div>{/if}
  </div>

  <div class="actions" style="margin-top:12px;">
    <button type="button" on:click={reset} class="btn-reset">รีเซ็ต</button>
    <button type="submit" class="btn-submit">ส่ง (หมวด Fert-Chem)</button>
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