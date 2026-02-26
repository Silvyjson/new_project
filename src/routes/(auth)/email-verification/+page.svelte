<script>
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
  let verified = false;
</script>

<AuthLayout title="Verify your email" subtitle="Secure your account before you continue.">
  <h1>Email Verification</h1>
  {#if !verified}
    <p>Verification email sent.</p>
    <button on:click={() => (verified = true)}>Resend email</button>
  {:else}
    <p>Email verified successfully. Redirecting...</p>
  {/if}
</AuthLayout>

<style>
  button { padding:.65rem .9rem; background:#1d4ed8; border:0; border-radius:.5rem; color:white; font-weight:600; }
</style>
