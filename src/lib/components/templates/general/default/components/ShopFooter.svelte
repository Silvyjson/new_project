<script>
    import Icon from "@iconify/svelte";
</script>

<footer class="bg-surface border-t border-gray-200 py-8">
    <div class="container max-w-7xl mx-auto px-4 text-center">
        <div
            class="flex justify-center gap-6 mb-2 text-xs text-text-muted opacity-80"
        >
            <span class="flex items-center gap-1"
                ><Icon icon="mdi:lock-outline" /> Secure Payments</span
            >
            <span class="flex items-center gap-1"
                ><Icon icon="mdi:shield-check-outline" /> Verified Vendors</span
            >
            <span class="flex items-center gap-1"
                ><Icon icon="mdi:scale-balance" /> Fair Dispute Resolution</span
            >
        </div>
        <p class="text-small text-text-muted">
            Powered by <a
                href="/"
                class="text-primary font-medium hover:underline">VendorHub</a
            >
        </p>
        <p class="text-small text-text-muted mt-2">
            Build your own trusted shop today <Icon
                icon="mdi:arrow-right"
                class="inline-block"
            />
        </p>
    </div>
</footer>
