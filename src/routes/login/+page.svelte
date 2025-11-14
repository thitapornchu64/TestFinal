<script>
  // @ts-ignore
  export let form;

  let username = '';
  let password = '';
  let error = '';

 // @ts-ignore
   $: if (form?.error) {
    // @ts-ignore
    error = form.error;
  }

   // @ts-ignore
    function validateLogin(event) {
        // @ts-ignore
        error = '';

        if (!username && !password) {
        error = "กรุณากรอก Username และ Password";
        event.preventDefault();
        return;
        }
    
        if (!username) {
        error = "กรุณากรอก Username";
        event.preventDefault();
        return;
        }
    
        if (!password) {
        error = "กรุณากรอก Password";
        event.preventDefault();
        return;
        }
      }

</script>

<main class="background-image">
  <div class="header">
    <h1>เข้าสู่ระบบ</h1>

    <form method="POST" action="?/login" on:submit={validateLogin}>
      <div>
        <input type="text" name="username" placeholder="Username" bind:value={username} />
        <input type="password" name="password" placeholder="Password" bind:value={password} />

        {#if error}
          <div class="error">{error}</div>
        {/if}
      </div>

      <button type="submit">Login</button>
      
    </form>

    <a href="/register">Register</a>
  </div>
</main>


<style>
.background-image {
  background-image: url('images/login-bg.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;
}

.header {
  background: rgba(255,255,255,0.9);
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.header h1 {
  color: #14532d;
  margin-bottom: 24px;
  font-weight: 700;
}

.header form div {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.header input {
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.header input:focus {
  outline: none;
  border-color: #166534;
  box-shadow: 0 0 0 2px rgba(22, 101, 52, 0.2);
}

.header button {
  padding: 10px 16px;
  background-color: #166534;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.header button:hover {
  background-color: #14532d;
}

.error {
  color: #b91c1c;
  font-size: 0.9rem;
  margin-top: -8px;
}

a {
  display: block;
  margin-top: 16px;
  text-align: center;
  color: #166534;
  text-decoration: none;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
}
</style>