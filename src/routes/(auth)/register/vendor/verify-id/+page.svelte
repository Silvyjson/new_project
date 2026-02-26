<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
</script>

<AuthLayout title="Verify Your Identity" subtitle="Step 2 of 3">
  <h1>Verify Your Identity</h1>
  <p>Step 2 of 3 — This increases your trust score by 30%.</p>
  <div class="progress"><span style="width:66%"></span></div>
  <div class="drop">Drag and drop ID uploads (front + back)</div>
  <label>Live selfie capture (camera API placeholder)<input type="file" accept="image/*" capture="user" /></label>
  <aside class="trust">
    <h3>Trust Score Breakdown</h3>
    <p>ID Verification → 30%</p>
    <p>CAC Verification → 30%</p>
    <p>Reviews & Delivery → 40%</p>
  </aside>
  <a class="btn" href="/register/vendor/verify-cac">Submit for Verification</a>
  <p>Status: <strong>Under review</strong></p>
</AuthLayout>

<style>
  .progress{height:8px;background:#e2e8f0;border-radius:99px;margin:.5rem 0 1rem;} .progress span{display:block;height:100%;background:#2563eb;border-radius:99px;}
  .drop { border:2px dashed #94a3b8; padding:1.1rem; border-radius:.7rem; background:#f8fafc; margin-bottom:.8rem; }
  .trust { background:#eff6ff; border:1px solid #bfdbfe; border-radius:.7rem; padding:.8rem; margin:.8rem 0; }
  .btn{display:inline-block; text-decoration:none; background:#1d4ed8; color:white; padding:.65rem .9rem; border-radius:.5rem; font-weight:600;}
</style>
