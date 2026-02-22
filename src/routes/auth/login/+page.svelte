<h1>Login</h1>
<form>
  <label>Email <input type="email" required /></label>
  <label>Password <input type="password" required /></label>
  <button type="submit">Sign in</button>
</form>
<p>No account? <a href="/auth/register">Register</a></p>

<style>
  form { display:grid; gap:.8rem; max-width: 420px; }
  label { display:grid; gap:.3rem; }
  input { padding:.65rem; border:1px solid #ccd5e1; border-radius:.5rem; }
  button { width:max-content; padding:.6rem .9rem; background:#2165d2; color:#fff; border:0; border-radius:.5rem; }
</style>
