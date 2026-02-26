<script>
  const kpis = [
    ['Total Sales', '₦2,450,000'],
    ['Total Orders', '312'],
    ['Pending Orders', '18'],
    ['Completed Orders', '277'],
    ['Total Earnings', '₦540,000'],
    ['Trust Score', '89']
  ];
</script>

<h1>Vendor Dashboard</h1>
<p>Manage products, trust, and orders. Preview exactly what buyers see.</p>
<a class="preview" href="/ada-crafts">Preview Public Profile</a>
<a class="preview" href="/ada-crafts/shop">Preview Public Shop</a>

<div class="grid">
  {#each kpis as [label, value]}
    <article>
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  {/each}
</div>

<style>
  .preview { margin-right:.8rem; }
  .grid { margin-top:1rem; display:grid; gap:1rem; grid-template-columns: repeat(auto-fit,minmax(170px,1fr)); }
  article { background:#fff; border:1px solid #e7ebf1; border-radius:.7rem; padding:1rem; }
  p { margin:.2rem 0; color:#556070; }
</style>
