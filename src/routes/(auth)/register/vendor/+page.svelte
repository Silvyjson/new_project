<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
</script>

<AuthLayout title="Create Vendor Account" subtitle="Step 1 of 3">
  <h1>Create Vendor Account</h1>
  <p class="step">Step 1 of 3</p>
  <div class="progress"><span style="width:33%"></span></div>
  <form>
    <label>Full Name<input required /></label>
    <label>Business Name<input required /></label>
    <label>Email<input type="email" required /></label>
    <label>Phone Number<input required /></label>
    <label>Password<input type="password" required /></label>
    <label class="row"><input type="checkbox" required /> Agree to Vendor Terms</label>
    <a class="btn" href="/register/vendor/verify-id">Continue</a>
  </form>
</AuthLayout>

<style>
  .step { color:#475569; font-weight:600; } .progress{height:8px;background:#e2e8f0;border-radius:99px;margin:.5rem 0 1rem;} .progress span{display:block;height:100%;background:#2563eb;border-radius:99px;}
  form { display:grid; gap:.75rem; } label { display:grid; gap:.3rem; } input { padding:.65rem; border:1px solid #cfd8e3; border-radius:.5rem; }
  .row{display:flex; gap:.5rem; align-items:center;} .btn{text-align:center; background:#1d4ed8; color:white; text-decoration:none; padding:.65rem; border-radius:.5rem; font-weight:600;}
</style>
