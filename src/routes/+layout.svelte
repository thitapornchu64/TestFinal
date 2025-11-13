<script>
  let menuItems = [
    { title: "Home", href: "/" },
    { title: "ประเมิน GAP", href: "/survey" },
    { title: "สถานะ", href: "/Status" },
    { title: "Admin", href: "/farmer" },
    { title: "Profile", href: "/profile" }
  ];

  let { children } = $props()
</script>

<nav class="navbar">
  <div class="logo">🌱 DURIAN GAP</div>
  <ul class="menu">
    {#each menuItems as item}
      <li><a href={item.href}>{item.title}</a></li>
    {/each}
  </ul>
</nav>
{@render children()}

<footer class="footer">
  <p>© 2025 Durian GAP System. All Rights Reserved.</p>
</footer>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #166534, #53c04f);
  padding: 12px 24px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  color: white;
  font-family: 'Prompt', sans-serif;
}

.logo {
  font-weight: 600;
  font-size: 1.2rem;
}

.menu {
  display: flex;
  gap: 5px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 3px;
  transition: background 0.2s;
}

.menu li a:hover {
  background: rgba(255,255,255,0.2);
}
:global(*) {
    font-family: 'Prompt', sans-serif;
  }

.footer {
  text-align: center;
  padding: 5px;
  background: #14532d;
  color: white;
  margin-top: 40px;
}


</style>

