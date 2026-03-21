<script lang="ts">
    import Icon from "@iconify/svelte";
    export let shop: any = null;
</script>

<footer class="bg-surface border-t border-gray-100 pt-16 pb-12">
    <div class="container max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-12 mb-16">
            <!-- Shop Info -->
            <div class="md:col-span-2 space-y-6">
                <div class="flex items-center gap-3">
                    {#if shop?.logoUrl}
                        <img src={shop.logoUrl} alt={shop.name} class="w-10 h-10 rounded-xl object-cover" />
                    {:else}
                        <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                            <Icon icon="mdi:store" class="w-6 h-6" />
                        </div>
                    {/if}
                    <span class="text-xl font-bold text-text-main tracking-tight">{shop?.name || 'Our Shop'}</span>
                </div>
                <p class="text-body text-text-muted max-w-sm leading-relaxed">
                    {shop?.description || 'Your trusted source for premium products. We pride ourselves on quality and customer satisfaction.'}
                </p>
                <div class="flex gap-4">
                    {#each ['mdi:instagram', 'mdi:twitter', 'mdi:facebook', 'mdi:linkedin'] as social}
                        <a href="/" class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all">
                            <Icon icon={social} class="w-5 h-5" />
                        </a>
                    {/each}
                </div>
            </div>

            <!-- Links -->
            <div>
                <h4 class="font-bold text-text-main mb-6 uppercase text-xs tracking-widest">Shop</h4>
                <ul class="space-y-4">
                    {#each ['Home', 'Products', 'Collections', 'Sales'] as link}
                        <li><a href="/" class="text-sm text-text-muted hover:text-primary transition-colors">{link}</a></li>
                    {/each}
                </ul>
            </div>

            <!-- Support -->
            <div>
                <h4 class="font-bold text-text-main mb-6 uppercase text-xs tracking-widest">Support</h4>
                <ul class="space-y-4">
                    {#each ['Returns', 'Shipping Info', 'FAQs', 'Contact Us'] as link}
                        <li><a href="/" class="text-sm text-text-muted hover:text-primary transition-colors">{link}</a></li>
                    {/each}
                </ul>
            </div>
        </div>

        <div class="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-8 text-xs font-medium text-text-muted uppercase tracking-widest opacity-60">
                <span class="flex items-center gap-2"><Icon icon="mdi:lock" class="w-4 h-4" /> Secure SSL</span>
                <span class="flex items-center gap-2"><Icon icon="mdi:shield-check" class="w-4 h-4" /> Verified</span>
                <span class="flex items-center gap-2"><Icon icon="mdi:scale-balance" class="w-4 h-4" /> Protected</span>
            </div>
            
            <p class="text-[11px] text-text-muted font-medium opacity-50 uppercase tracking-widest">
                © {new Date().getFullYear()} {shop?.name || 'Vendor'}. All rights reserved. 
                <span class="ml-4 lowercase opacity-60">powered by <a href="/" class="hover:text-primary transition-colors">vendorhub</a></span>
            </p>
        </div>
    </div>
</footer>
