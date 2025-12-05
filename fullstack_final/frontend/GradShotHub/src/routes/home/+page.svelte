<script>
  export let data;  // รับจาก +page.server.js
  let user = data.user; // ใช้ user จาก server-side load

  // @ts-ignore
  function goTo(path) {
    window.location.href = path;
  }

  function logout() {
    localStorage.removeItem("user"); 
    window.location.href = "/";
  }
</script>

<div class="container">
  {#if user}
    <h1>สวัสดี, {user.name}!</h1>
    <button on:click={() => goTo("/photographers")}>เลือกช่างภาพ</button>
    <button on:click={() => goTo("/slots")}>เลือกวันเวลา</button>
    <button on:click={() => goTo("/confirm")}>สรุป Booking</button>
    <button on:click={logout}>Logout</button>
  {/if}
</div>