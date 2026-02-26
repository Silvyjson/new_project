<script>
  const vendors = [
    { name: 'Ada Crafts', slug: 'ada-crafts', trust: 91, verified: true },
    { name: 'Kano Gadgets', slug: 'kano-gadgets', trust: 84, verified: true },
    { name: 'Fresh Farm Hub', slug: 'fresh-farm-hub', trust: 78, verified: false }
  ];
</script>

<h1>Trusted Vendors</h1>
<p>Browse vendor profiles and open each shop directly.</p>

<div class="list">
  {#each vendors as vendor}
    <article>
      <h3>{vendor.name}</h3>
      <p>Trust Score: <strong>{vendor.trust}</strong></p>
      <p>Status: {vendor.verified ? 'Verified' : 'Pending Verification'}</p>
      <a href="/{vendor.slug}">View Profile</a>
      <a href="/{vendor.slug}/shop">Open Shop</a>
    </article>
  {/each}
</div>

<style>
  .list { display:grid; gap:1rem; grid-template-columns: repeat(auto-fit,minmax(230px,1fr)); }
  article { background:white; border:1px solid #e7ebf1; border-radius:.7rem; padding:1rem; }
  a { display:inline-block; margin-right:.6rem; }
</style>
