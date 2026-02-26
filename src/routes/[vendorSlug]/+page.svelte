<script>
  let { data } = $props();
</script>

<h1>{data.vendorSlug} Vendor Profile</h1>
<p>This public page introduces the vendor, trust status, and delivery promise.</p>
<p><strong>Trust Score:</strong> 88 (sample)</p>
<a href="/{data.vendorSlug}/shop">Visit Shop</a>
