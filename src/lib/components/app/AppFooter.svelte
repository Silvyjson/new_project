<!-- src/lib/components/app/AppFooter.svelte -->
<footer class="h-[60px] bg-gray-50 border-t border-gray-200 flex items-center justify-between px-4 md:px-8">
  <div class="text-sm text-text-muted">
    © {new Date().getFullYear()} VendorHub
  </div>
  
  <div class="flex items-center gap-6 text-sm text-text-muted">
    <a href="/privacy" class="hover:text-text-main transition-colors">Privacy</a>
    <a href="/terms" class="hover:text-text-main transition-colors">Terms</a>
    <a href="/support" class="hover:text-text-main transition-colors">Contact</a>
  </div>
</footer>