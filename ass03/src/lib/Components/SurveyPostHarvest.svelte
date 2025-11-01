<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Post-Harvest (พักผลผลิต)
  let noContactWithGround = ''; // Q1: ใช่/ไม่ใช่

  let errors = {};

  function validate() {
    errors = {};
    if (!noContactWithGround) errors.noContactWithGround = 'โปรดระบุว่า ผลผลิตไม่วางสัมผัสพื้นดินโดยตรงหรือไม่';
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
      category: 'post-harvest',
      noContactWithGround
    };
    dispatch('submit', payload);
  }

  export function reset() {
    noContactWithGround = '';
    errors = {};
  }
</script>

<form on:submit|preventDefault={submitLocal} class="survey-postharvest-form">
  <h3 class="section-title">ข้อกำหนดรอง</h3>
  <div class="card">
    <p>Q1: ผลผลิตที่คัดเลือก บรรจุ หรือพัก ไม่วางสัมผัสกับพื้นดินโดยตรงใช่หรือไม่</p>
    <div class="options-inline">
      <label><input type="radio" bind:group={noContactWithGround} value="ใช่" data-field="noContactWithGround" /> ใช่</label>
      <label><input type="radio" bind:group={noContactWithGround} value="ไม่ใช่" data-field="noContactWithGround" /> ไม่ใช่</label>
    </div>
    {#if errors.noContactWithGround}<div class="error">{errors.noContactWithGround}</div>{/if}
  </div>

  <div class="actions" style="margin-top:12px;">
    <button type="button" on:click={reset} class="btn-reset">รีเซ็ต</button>
    <button type="submit" class="btn-submit">ส่ง (หมวด Post-Harvest)</button>
  </div>

<style>
  .error {
    color: #c11717; /* red-700 */
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