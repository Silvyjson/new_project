<script lang="ts">
    import Icon from "@iconify/svelte";
</script>

<footer class="bg-dark text-white py-16 border-t border-gray-800">
    <div
        class="max-w-7xl mx-auto px-4 grid md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12"
    >
        <!-- Brand Info -->
        <div>
            <div class="flex items-center gap-2 mb-4">
                <div
                    class="w-6 h-6 bg-primary rounded flex items-center justify-center text-xs font-bold"
                >
                    V
                </div>
                <span class="font-bold text-lg">VendorHub</span>
            </div>
            <p class="text-small text-gray-400">
                Empowering small vendors to sell online with trust and security.
            </p>
            <div class="flex mt-4 gap-4">
                <a
                    href="https://x.com/vendorhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-white transition-colors"
                    aria-label="X (Twitter)"
                >
                    <Icon icon="mdi:twitter" class="w-5 h-5" />
                </a>

                <a
                    href="https://instagram.com/vendorhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                >
                    <Icon icon="mdi:instagram" class="w-5 h-5" />
                </a>

                <a
                    href="https://tiktok.com/@vendorhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-white transition-colors"
                    aria-label="TikTok"
                >
                    <Icon icon="simple-icons:tiktok" class="w-5 h-5" />
                </a>
            </div>
        </div>

        <!-- Company Links -->
        <div>
            <h4 class="font-bold mb-4">Company</h4>
            <ul class="space-y-2 text-small text-gray-400">
                <li><a href="/about" class="hover:text-white">About Us</a></li>
                <li><a href="/pricing" class="hover:text-white">Pricing</a></li>
                <li><a href="/blog" class="hover:text-white">Blog</a></li>
                <!-- <li>
                    <a href="/careers" class="hover:text-white">Careers</a>
                </li> -->
            </ul>
        </div>

        <!-- Product Links -->
        <div>
            <h4 class="font-bold mb-4">Product</h4>
            <ul class="space-y-2 text-small text-gray-400">
                <li><a href="/vendors" class="hover:text-white">Vendors</a></li>
                <li><a href="/shops" class="hover:text-white">Shops</a></li>
                <li>
                    <a href="/auth/register" class="hover:text-white"
                        >Become a Vendor</a
                    >
                </li>
            </ul>
        </div>

        <!-- Support Links -->
        <div>
            <h4 class="font-bold mb-4">Support</h4>
            <ul class="space-y-2 text-small text-gray-400">
                <li>
                    <a href="/support#help" class="hover:text-white"
                        >Help Center</a
                    >
                </li>
                <li>
                    <a href="/support#contact" class="hover:text-white"
                        >Contact Support</a
                    >
                </li>
                <li>
                    <a href="/support#dispute" class="hover:text-white"
                        >Dispute Resolution</a
                    >
                </li>
            </ul>
        </div>

        <!-- Legal Links -->
        <div>
            <h4 class="font-bold mb-4">Legal</h4>
            <ul class="space-y-2 text-small text-gray-400">
                <li>
                    <a
                        href="/privacy"
                        class="hover:text-white transition-colors"
                        >Privacy Policy</a
                    >
                </li>
                <li>
                    <a href="/terms" class="hover:text-white transition-colors"
                        >Terms of Service</a
                    >
                </li>
                <li>
                    <a
                        href="/transaction"
                        class="hover:text-white transition-colors"
                        >Transaction Policy</a
                    >
                </li>
            </ul>
        </div>
    </div>

    <!-- Footer Bottom -->
    <div
        class="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-center items-center gap-4"
    >
        <p class="text-small text-gray-500">
            © {new Date().getFullYear()} VendorHub. All rights reserved.
        </p>
    </div>
</footer>
