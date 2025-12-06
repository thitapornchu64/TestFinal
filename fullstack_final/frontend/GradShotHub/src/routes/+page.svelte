<script>
  // @ts-ignore
  import { onMount } from "svelte";

  let mode = "login"; // login หรือ register
  let name = "";
  let email = "";
  let password = "";
  let message = "";
  let messageType = ""; // success หรือ error

  function toggleMode() {
    mode = mode === "login" ? "register" : "login";
    message = "";
  }

  async function register() {
    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        message = "สมัครสมาชิกสำเร็จ! คุณสามารถล็อกอินได้ทันที";
        messageType = "success";
        mode = "login";
      } else {
        message = data.detail || "เกิดข้อผิดพลาดในการสมัคร";
        messageType = "error";
      }
    } catch (err) {
      // @ts-ignore
      message = "เกิดข้อผิดพลาด: " + err.message;
      messageType = "error";
    }
  }

  // ฟังก์ชัน Login
  async function login() {
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        message = "ล็อกอินสำเร็จ!";
        messageType = "success";
        //redirect ไปหน้าเลือกช่างภาพได้
        window.location.href = "/photographers";
      } else {
        message = data.detail || "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
        messageType = "error";
      }
    } catch (err) {
      // @ts-ignore
      message = "เกิดข้อผิดพลาด: " + err.message;
      messageType = "error";
    }
  }
</script>

<style>
  .container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    background: #f7f7f7;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  h1 { text-align: center; }
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background: #4caf50;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  button:hover { background: #45a049; }
  .message { margin: 10px 0; text-align: center; }
  .success { color: green; }
  .error { color: red; }
  .toggle { text-align: center; margin-top: 10px; cursor: pointer; color: #555; }
</style>

<div class="container">
  <h1>{mode === "login" ? "Login" : "Register"}</h1>

  {#if mode === "register"}
    <input placeholder="Name" bind:value={name}/>
  {/if}
  
  <input placeholder="Email" bind:value={email}/>
  <input type="password" placeholder="Password" bind:value={password}/>

  <button on:click={mode === "login" ? login : register}>
    {mode === "login" ? "Login" : "Register"}
  </button>

  {#if message}
    <div class="message {messageType}">
      {message}
    </div>
  {/if}

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="toggle" on:click={toggleMode}>
    {mode === "login" 
      ? "ยังไม่ได้สมัครสมาชิก? คลิกที่นี่เพื่อสมัคร" 
      : "มีบัญชีแล้ว? กลับไปล็อกอิน"}
  </div>
</div>