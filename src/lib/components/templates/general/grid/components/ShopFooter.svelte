<script lang="ts">
  import Icon from "@iconify/svelte";
  export let shop: any = null;
  const year = new Date().getFullYear();
</script>

<footer class="bg-white border-t-2 border-slate-900 mt-20 pt-16 pb-8">
  <div class="container max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <!-- Site Info -->
      <div class="space-y-6">
        <a href="/shop/{shop?.slug}" class="flex items-center gap-3">
          <div class="w-10 h-10 border-2 border-slate-900 bg-slate-100 p-1 flex items-center justify-center">
             <img src={shop?.logoUrl} alt="" class="w-full h-full object-cover grayscale" />
          </div>
          <span class="font-black text-xl tracking-tighter uppercase">{shop?.name}</span>
        </a>
        <p class="text-slate-500 text-xs font-medium leading-relaxed uppercase tracking-wider">
          {shop?.description || `Premium ${shop?.category} store providing quality products and reliable service to our customers globally.`}
        </p>
      </div>

      <!-- Links 1 -->
      <div>
        <h4 class="font-black text-xs uppercase tracking-widest mb-8 text-slate-400">Products</h4>
        <ul class="space-y-4">
          <li><a href="/shop/{shop?.slug}/product" class="text-xs font-black hover:text-slate-500 transition-colors uppercase">All Items</a></li>
          <li><a href="#" class="text-xs font-black hover:text-slate-500 transition-colors uppercase">Featured</a></li>
          <li><a href="#" class="text-xs font-black hover:text-slate-500 transition-colors uppercase">New Arrivals</a></li>
        </ul>
      </div>

      <!-- Links 2 -->
      <div>
        <h4 class="font-black text-xs uppercase tracking-widest mb-8 text-slate-400">Information</h4>
        <ul class="space-y-4">
          <li><a href="#" class="text-xs font-black hover:text-slate-500 transition-colors uppercase">Return Policy</a></li>
          <li><a href="#" class="text-xs font-black hover:text-slate-500 transition-colors uppercase">Contact Us</a></li>
          <li><a href="#" class="text-xs font-black hover:text-slate-500 transition-colors uppercase">Refunds</a></li>
        </ul>
      </div>

      <!-- Socials -->
      <div>
        <h4 class="font-black text-xs uppercase tracking-widest mb-8 text-slate-400">Newsletter</h4>
        <div class="border-2 border-slate-900 flex h-12">
          <input type="email" placeholder="JOIN" class="bg-white px-4 text-xs font-bold w-full uppercase focus:outline-none" />
          <button class="bg-slate-900 text-white px-4 hover:bg-slate-800 transition-colors">
            <Icon icon="lucide:arrow-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="border-t-2 border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
        &copy; {year} {shop?.name} / ALL RIGHTS RESERVED.
        <span class="ml-4 opacity-50 lowercase font-bold tracking-normal">powered by <a href="/" class="hover:text-slate-900 transition-colors">vendorhub</a></span>
      </p>
      <div class="flex gap-6">
        <a href="#" class="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors">Instagram</a>
        <a href="#" class="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors">Twitter</a>
        <a href="#" class="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors">Facebook</a>
      </div>
    </div>
  </div>
</footer>
