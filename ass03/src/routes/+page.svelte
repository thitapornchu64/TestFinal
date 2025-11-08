<script>
  // หน้า register หรือ login
</script>

<section class="home">
  <!-- ส่วนภาพด้านบน -->
  <div class="hero">
    <img src="/images/durianHome.jpg" alt="" />
    <div class="overlay">
      <h1>ยินดีต้อนรับสู่ระบบประเมิน GAP</h1>
      <p>ติดตามและประเมินมาตรฐานการจัดการเกษตรอย่างมืออาชีพ</p>
      <div class="buttons">
        <a href="/register" class="btn">ลงทะเบียน</a>
        <a href="/login" class="btn outline">เข้าสู่ระบบ</a>
      </div>
    </div>
  </div>
</section>

<style>
  .home {
    font-family: sans-serif;
  }

  .hero {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 32px;
  }

  .hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    text-align: center;
    padding: 0 16px;
  }

  .overlay h1 {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  .overlay p {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }

  .buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn {
    background-color: #3b82f6;
    color: #fff;
    padding: 10px 18px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s;
  }

  .btn:hover {
    background-color: #2563eb;
  }

  .btn.outline {
    background: transparent;
    border: 2px solid #fff;
    color: #fff;
  }

  .btn.outline:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>




