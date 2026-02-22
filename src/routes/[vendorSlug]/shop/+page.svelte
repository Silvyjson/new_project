<script>
  let { data } = $props();
  const products = [
    { name: 'Handmade Bag', price: '₦18,000', mode: 'INSTANT' },
    { name: 'Limited Fashion Set', price: '₦42,000', mode: 'PREORDER' }
  ];
</script>

<h1>{data.vendorSlug} Shop</h1>
<p>Products from this vendor only.</p>

<div class="grid">
  {#each products as item}
    <article>
      <h3>{item.name}</h3>
      <p>{item.price}</p>
      <p>Mode: <strong>{item.mode}</strong></p>
      <button>{item.mode === 'PREORDER' ? 'Preorder now' : 'Buy now'}</button>
    </article>
  {/each}
</div>

<style>
  .grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }
  article { background:#fff; border:1px solid #e7ebf1; border-radius:.8rem; padding:1rem; }
  button { background:#0d1b2a; color:#fff; border:0; padding:.5rem .8rem; border-radius:.5rem; }
</style>
