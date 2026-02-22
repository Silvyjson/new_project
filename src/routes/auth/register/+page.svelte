<h1>Create Account</h1>
<form>
  <label>Role
    <select>
      <option>Vendor</option>
      <option>Buyer</option>
    </select>
  </label>
  <label>Business or Full Name <input required /></label>
  <label>Email <input type="email" required /></label>
  <label>Phone <input required /></label>
  <label>Password <input type="password" required /></label>
  <button type="submit">Create account</button>
</form>

<style>
  form { display:grid; gap:.8rem; max-width: 460px; }
  label { display:grid; gap:.3rem; }
  input, select { padding:.65rem; border:1px solid #ccd5e1; border-radius:.5rem; }
  button { width:max-content; padding:.6rem .9rem; background:#2165d2; color:#fff; border:0; border-radius:.5rem; }
</style>
