<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Harvest state
  let harvestTiming = '';    // เก็บเกี่ยวเมื่ออายุเหมาะสม / ไม่ใช่
  let harvestHygiene = '';   // การเก็บเกี่ยวถูกสุขลักษณะหรือไม่
  let sorting = '';          // มีการคัดแยก / ไม่มีการคัดแยก
  let perishCare = '';       // สำหรับผลผลิตที่เสื่อมง่าย มี/ไม่มี

  let errors = {};

  function validate() {
    errors = {};

    // ข้อกำหนดหลัก ต้องระบุ
    if (!harvestTiming) errors.harvestTiming = 'โปรดระบุว่าการเก็บเกี่ยวเป็นไปตามเกณฑ์หรือไม่';
    if (!harvestHygiene) errors.harvestHygiene = 'โปรดระบุว่าการเก็บเกี่ยวดำเนินการอย่างถูกสุขลักษณะหรือไม่';

    // ข้อกำหนดรอง — ตรวจอย่างน้อยให้เลือก (คุณสามารถปรับให้ไม่บังคับได้)
    if (!sorting) errors.sorting = 'โปรดระบุการคัดแยกผลผลิต';
    if (!perishCare) errors.perishCare = 'โปรดระบุการดูแลผลผลิตที่เสื่อมง่าย';

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
      category: 'harvest',
      harvestTiming,
      harvestHygiene,
      sorting,
      perishCare
    };

    dispatch('submit', payload);
  }

  export function reset() {
    harvestTiming = '';
    harvestHygiene = '';
    sorting = '';
    perishCare = '';
    errors = {};
  }
</script>

<form on:submit|preventDefault={submitLocal} class="survey-harvest-form">
  <div class="hq1">
    <p>Q1: เก็บเกี่ยวผลผลิตเมื่ออายุเหมาะสม มีคุณภาพ หรือเป็นไปตามข้อกำหนดของคู่ค้า</p>
    <div class="options-inline">
      <label><input type="radio" bind:group={harvestTiming} value="ใช่" data-field="harvestTiming" /> ใช่</label>
      <label><input type="radio" bind:group={harvestTiming} value="ไม่ใช่" data-field="harvestTiming" /> ไม่ใช่</label>
    </div>
    {#if errors.harvestTiming}<div class="error">{errors.harvestTiming}</div>{/if}
  </div>

  <div class="hq2">
    <p>Q2: การเก็บเกี่ยวดำเนินการอย่างถูกสุขลักษณะหรือไม่</p>
    <div class="options-inline">
      <label><input type="radio" bind:group={harvestHygiene} value="ใช่" data-field="harvestHygiene" /> ใช่</label>
      <label><input type="radio" bind:group={harvestHygiene} value="ไม่ใช่" data-field="harvestHygiene" /> ไม่ใช่</label>
    </div>
    {#if errors.harvestHygiene}<div class="error">{errors.harvestHygiene}</div>{/if}
  </div>

  <h3 class="section-title">ข้อกำหนดรอง</h3>

  <div class="hq3">
    <p>Q3: มีการคัดแยกผลผลิตที่ไม่ได้คุณภาพออกก่อนส่งจำหน่ายหรือไม่</p>
    <div class="options-inline">
      <label><input type="radio" bind:group={sorting} value="มีการคัดแยก" data-field="sorting" /> มีการคัดแยก</label>
      <label><input type="radio" bind:group={sorting} value="ไม่มีการคัดแยก" data-field="sorting" /> ไม่มีการคัดแยก</label>
    </div>
    {#if errors.sorting}<div class="error">{errors.sorting}</div>{/if}
  </div>

  <div class="hq4">
    <p>Q4: สำหรับผลผลิตที่เสื่อมคุณภาพง่าย มีวิธีการดูแล/ป้องกันก่อนการขนส่งหรือไม่</p>
    <div class="options-inline">
      <label><input type="radio" bind:group={perishCare} value="มี" data-field="perishCare" /> มี</label>
      <label><input type="radio" bind:group={perishCare} value="ไม่มี" data-field="perishCare" /> ไม่มี</label>
    </div>
    {#if errors.perishCare}<div class="error">{errors.perishCare}</div>{/if}
  </div>

  <div class="actions" style="margin-top:12px;">
    <button type="button" on:click={reset} class="btn-reset">รีเซ็ต</button>
    <button type="submit" class="btn-submit">ส่ง (หมวด Harvest)</button>
  </div>

</form>