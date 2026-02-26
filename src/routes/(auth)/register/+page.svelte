<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
</script>

<AuthLayout title="Join VendorHub" subtitle="Choose how you want to use VendorHub">
  <h1>Join VendorHub</h1>
  <p>Choose how you want to use VendorHub</p>
  <section class="roles">
    <article>
      <h3>🛍 Buy Products</h3>
      <p>Discover trusted vendors and shops.</p>
      <a href="/register/buyer">Continue as Buyer</a>
    </article>
    <article>
      <h3>🏪 Sell on VendorHub</h3>
      <p>Create shops and build your trust score.</p>
      <a href="/register/vendor">Continue as Vendor</a>
    </article>
  </section>
</AuthLayout>

<style>
  .roles { display:grid; gap:.8rem; }
  article { border:1px solid #dbe3ef; border-radius:.8rem; padding:1rem; transition:.2s ease; }
  article:hover { transform:translateY(-2px); border-color:#2563eb; }
  a { display:inline-block; margin-top:.45rem; text-decoration:none; color:#1d4ed8; font-weight:600; }
</style>
