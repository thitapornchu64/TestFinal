<script>
  // Props ที่รับมาจากหน้าจอก่อนหน้า (สมมติข้อมูล)
  export let userData = {
      username: "คุณมานะ",
      email: "mana@example.com"
  };
  export let bookingDetails = {
      photographer: "สมชาย ถ่ายรูป",
      time: "2025-12-10, 10:00 - 12:00",
      location: "หอสมุดกลาง ม.A",
      package: "Package A (ถ่ายเดี่ยว 2 ชม.)",
      totalPrice: "2,500 บาท"
  };

  function confirmDone() {
      alert('✅ การจองเสร็จสมบูรณ์แล้ว!');
  }
</script>


<div class="container">
  <h2>Confirm Booking</h2>

  <div class="detail-card">
    <div class="detail-row">
      <span class="label">User:</span>
      <span class="value">{userData.username} ({userData.email})</span>
    </div>
    <div class="detail-row">
      <span class="label">Photographer:</span>
      <span class="value">{bookingDetails.photographer}</span>
    </div>
    <div class="detail-row">
      <span class="label">Time:</span>
      <span class="value">{bookingDetails.time}</span>
    </div>
    <div class="detail-row">
      <span class="label">Location:</span>
      <span class="value">{bookingDetails.location}</span>
    </div>
    <div class="detail-row">
      <span class="label">Package:</span>
      <span class="value">{bookingDetails.package}</span>
    </div>

    <div class="total-price">
      Total Price: {bookingDetails.totalPrice}
    </div>
  </div>
  
  <button on:click={confirmDone}>
    Done
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
  }
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 25px;
  }
  .detail-card {
    background-color: white;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
  .detail-row {
    display: flex;
    margin-bottom: 12px;
    border-bottom: 1px dashed #eee;
    padding-bottom: 5px;
  }
  .label {
    font-weight: bold;
    color: #555;
    min-width: 120px;
  }
  .value {
    flex-grow: 1;
    color: #000;
  }
  .total-price {
    margin-top: 20px;
    text-align: right;
    font-size: 1.5em;
    color: #d9534f;
    font-weight: bold;
    padding-top: 10px;
    border-top: 2px solid #ddd;
  }
  button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2em;
    margin-top: 25px;
  }
</style>