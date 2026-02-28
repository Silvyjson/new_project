<script>
  export let role = "buyer";
</script>

<!-- src/lib/components/app/AppFooter.svelte -->
<footer
  class="h-[60px] bg-gray-50 border-t border-gray-200 py-2 px-4 md:py-0 md:px-8"
>
  <div
    class="max-w-8xl mx-auto w-full h-full flex flex-col md:flex-row items-center justify-between"
  >
    <div class="text-sm text-text-muted">
      © {new Date().getFullYear()} VendorHub {role === "vendor"
        ? ""
        : "for Business"}
    </div>

    <div class="flex items-center gap-6 text-sm text-text-muted">
      <a href="/about" class="hover:text-text-main transition-colors">About</a>
      <a href="/privacy" class="hover:text-text-main transition-colors"
        >Privacy</a
      >
      <a href="/terms" class="hover:text-text-main transition-colors">Terms</a>
      <a href="/support" class="hover:text-text-main transition-colors"
        >Contact</a
      >
    </div>
  </div>
</footer>
