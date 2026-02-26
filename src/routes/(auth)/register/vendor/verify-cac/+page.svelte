<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
</script>

<AuthLayout title="Verify Your Business (Optional)" subtitle="Step 3 of 3">
  <h1>Verify Your Business (Optional)</h1>
  <p>Step 3 of 3 — CAC verification adds 30% to your trust score.</p>
  <div class="progress"><span style="width:100%"></span></div>
  <form>
    <label>CAC Registration Number<input /></label>
    <label>Business Certificate Upload<input type="file" /></label>
  </form>
  <div class="actions">
    <a class="btn" href="/app/vendor/dashboard">Submit CAC</a>
    <button type="button">Skip for now</button>
  </div>
  <p class="warn">Skipping reduces your trust visibility.</p>
</AuthLayout>

<style>
  .progress{height:8px;background:#e2e8f0;border-radius:99px;margin:.5rem 0 1rem;} .progress span{display:block;height:100%;background:#2563eb;border-radius:99px;}
  form { display:grid; gap:.75rem; } label { display:grid; gap:.3rem; } input { padding:.65rem; border:1px solid #cfd8e3; border-radius:.5rem; }
  .actions{display:flex; gap:.6rem; margin-top:.8rem;} .btn{display:inline-block; text-decoration:none; background:#1d4ed8; color:white; padding:.65rem .9rem; border-radius:.5rem; font-weight:600;} button{padding:.65rem .9rem;border:1px solid #94a3b8;background:white;border-radius:.5rem;}
  .warn{color:#b45309;}
</style>
