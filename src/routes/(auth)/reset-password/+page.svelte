<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
</script>

<AuthLayout title="Set a new password" subtitle="Use a strong password you haven't used before.">
  <h1>Update Password</h1>
  <form>
    <label>New Password<input type="password" required /></label>
    <label>Confirm Password<input type="password" required /></label>
    <button>Update Password</button>
  </form>
  <p>On success, redirect to <a href="/login">login</a>.</p>
</AuthLayout>

<style>
  form { display:grid; gap:.75rem; } label { display:grid; gap:.3rem; } input { padding:.65rem; border:1px solid #cfd8e3; border-radius:.5rem; }
  button { padding:.65rem; background:#1d4ed8; border:0; border-radius:.5rem; color:white; font-weight:600; }
</style>
