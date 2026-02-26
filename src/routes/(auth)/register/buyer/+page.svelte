<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
  let password = '';
  $: strength = password.length > 11 ? 'Strong' : password.length > 7 ? 'Medium' : 'Weak';
</script>

<AuthLayout title="Create Buyer Account" subtitle="Create your account and start buying from trusted vendors.">
  <h1>Create Buyer Account</h1>
  <form>
    <label>Full Name<input required /></label>
    <label>Email<input type="email" required /></label>
    <label>Password<input type="password" bind:value={password} required /></label>
    <small>Password strength: <strong>{strength}</strong></small>
    <label>Confirm Password<input type="password" required /></label>
    <label class="row"><input type="checkbox" required /> I agree to Terms & Privacy</label>
    <button>Create Account</button>
  </form>
  <p>After signup, email verification is required before redirect to <code>/home</code>.</p>
</AuthLayout>

<style>
  form { display:grid; gap:.75rem; } label { display:grid; gap:.3rem; } input { padding:.65rem; border:1px solid #cfd8e3; border-radius:.5rem; }
  .row { display:flex; gap:.5rem; align-items:center; }
  button { padding:.65rem; background:#1d4ed8; border:0; border-radius:.5rem; color:white; font-weight:600; }
</style>
