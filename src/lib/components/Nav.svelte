<script>
  import { session } from '$lib/stores/session';
</script>

<nav class="nav">
  <a href="/" class="brand">VendorHub</a>

  {#if $session.isAuthenticated}
    <div class="links">
      <a href="/vendors">Shops</a>
      <a href="/app/buyer/orders">Notifications</a>
      <a href="/app/vendor/dashboard">Profile</a>
    </div>
  {:else}
    <div class="links">
      <a href="/vendors">Discover</a>
      <a href="/vendors">Shops</a>
      <a href="/faq">Blogs</a>
      <a href="/login">Login</a>
      <a href="/register" class="cta">Register</a>
    </div>
  {/if}
</nav>

<style>
  .nav { display:flex; justify-content:space-between; align-items:center; padding:1rem 1.5rem; border-bottom:1px solid #e7ebf1; background:#fff; position:sticky; top:0; z-index:10; }
  .brand { font-weight:800; color:#0d1b2a; text-decoration:none; font-size:1.1rem; }
  .links { display:flex; gap:1rem; align-items:center; }
  .links a { text-decoration:none; color:#1f2d3d; font-weight:500; }
  .cta { background:#2165d2; color:#fff !important; padding:.45rem .7rem; border-radius:.45rem; }
</style>
