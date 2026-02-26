<script>
  export let title = 'Welcome to VendorHub';
  export let subtitle = 'Build trust, sell smarter, and grow your storefront.';
</script>

<section class="wrap">
  <div class="form-column">
    <div class="card">
      <slot />
    </div>
  </div>
  <aside class="brand">
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <ul>
        <li>Unique vendor links</li>
        <li>Built-in trust score</li>
        <li>Instant buy + preorder support</li>
      </ul>
    </div>
  </aside>
</section>

<style>
  .wrap { min-height: calc(100vh - 140px); display:grid; grid-template-columns: 1fr 1fr; background:#f9fafb; }
  .form-column { display:flex; align-items:center; justify-content:center; padding:1rem; }
  .card { width:100%; max-width:480px; background:#fff; border-radius:16px; box-shadow:0 12px 30px rgba(15,23,42,.08); padding:1.2rem; }
  .brand { background:linear-gradient(135deg,#1e40af,#4338ca); color:#fff; display:flex; align-items:center; justify-content:center; padding:2rem; }
  .brand h2 { font-size:2rem; margin:0; }
  .brand ul { margin-top:1rem; line-height:1.8; }
  @media (max-width: 900px) {
    .wrap { grid-template-columns: 1fr; }
    .brand { min-height: 180px; }
  }
</style>
