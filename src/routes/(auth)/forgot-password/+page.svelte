<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
  let sent = false;
</script>

<AuthLayout title="Reset your password" subtitle="We'll send reset instructions to your email.">
  <h1>Reset your password</h1>
  {#if !sent}
    <form on:submit|preventDefault={() => (sent = true)}>
      <label>Email<input type="email" required /></label>
      <button>Send Reset Link</button>
    </form>
  {:else}
    <p>Check your email for reset instructions.</p>
  {/if}
</AuthLayout>

<style>
  form { display:grid; gap:.75rem; } label { display:grid; gap:.3rem; } input { padding:.65rem; border:1px solid #cfd8e3; border-radius:.5rem; }
  button { padding:.65rem; background:#1d4ed8; border:0; border-radius:.5rem; color:white; font-weight:600; }
</style>
