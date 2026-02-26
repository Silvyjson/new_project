<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';

  let email = '';
  let password = '';
  let remember = false;
  let showPassword = false;
  let loading = false;
  $: valid = email.includes('@') && password.length >= 8;

  async function submitForm(event) {
    event.preventDefault();
    if (!valid) return;
    loading = true;
    setTimeout(() => {
      loading = false;
      alert('Login success (routing by role: buyer -> /home, vendor -> onboarding/dashboard)');
    }, 700);
  }
</script>

<AuthLayout title="Welcome Back 👋" subtitle="Sign in to continue to VendorHub">
  <h1>Welcome Back 👋</h1>
  <p>Sign in to continue to VendorHub</p>
  <form on:submit={submitForm}>
    <label>Email<input type="email" bind:value={email} required /></label>
    <label>Password
      <div class="password-row">
        <input type={showPassword ? 'text' : 'password'} bind:value={password} required minlength="8" />
        <button type="button" on:click={() => (showPassword = !showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
      </div>
    </label>
    <label class="row"><input type="checkbox" bind:checked={remember} /> Remember me</label>
    <button disabled={!valid || loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
  </form>
  <div class="links">
    <a href="/forgot-password">Forgot password</a>
    <a href="/register">Register instead</a>
  </div>
</AuthLayout>

<style>
  h1 { margin:.2rem 0; }
  form { display:grid; gap:.8rem; }
  label { display:grid; gap:.35rem; }
  input { padding:.65rem; border:1px solid #cfd8e3; border-radius:.5rem; }
  input:focus { outline:2px solid #bfdbfe; }
  button { padding:.65rem .9rem; border:0; border-radius:.5rem; background:#1d4ed8; color:#fff; font-weight:600; }
  button:disabled { opacity:.5; }
  .password-row { display:grid; grid-template-columns: 1fr auto; gap:.5rem; }
  .row { grid-template-columns: auto 1fr; align-items:center; }
  .links { margin-top:.8rem; display:flex; justify-content:space-between; }
</style>
