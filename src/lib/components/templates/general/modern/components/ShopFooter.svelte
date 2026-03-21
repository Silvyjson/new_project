<script lang="ts">
    import Icon from "@iconify/svelte";
    import { fade } from "svelte/transition";

    export let shop: any = null;

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { platform: 'instagram', url: '#', icon: 'ri:instagram-line' },
        { platform: 'twitter', url: '#', icon: 'ri:twitter-x-line' },
        { platform: 'whatsapp', url: '#', icon: 'ri:whatsapp-line' },
        { platform: 'facebook', url: '#', icon: 'ri:facebook-box-line' }
    ];

    const footerLinks = [
        { title: 'Shop', links: [
            { name: 'Home', href: `/shop/${shop?.slug}` },
            { name: 'Products', href: `/shop/${shop?.slug}/product` },
            { name: 'Collections', href: '#' },
            { name: 'Sales', href: '#' }
        ]},
        { title: 'Support', links: [
            { name: 'Return Policy', href: '#' },
            { name: 'Shipping Info', href: '#' },
            { name: 'FAQs', href: '#' },
            { name: 'Contact Us', href: '#' }
        ]}
    ];
</script>

<footer class="relative mt-20 pb-12 pt-20 border-t border-white/5 bg-slate-950">
    <!-- Subtle glow behind footer -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

    <div class="container max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            <!-- Brand Column -->
            <div class="lg:col-span-1">
                <a href="/shop/{shop?.slug}" class="flex items-center gap-3 mb-6">
                    <img 
                        src={shop?.logoUrl} 
                        alt={shop?.name} 
                        class="w-12 h-12 rounded-2xl object-cover grayscale brightness-125"
                    />
                    <h1 class="text-2xl font-black text-white tracking-tighter">
                        {shop?.name}
                    </h1>
                </a>
                <p class="text-slate-400 text-sm leading-relaxed mb-8">
                    {shop?.description || `Welcome to ${shop?.name}. We specialize in quality ${shop?.category} and premium customer service.`}
                </p>
                <div class="flex gap-4">
                    {#each socialLinks as social}
                        <a 
                            href={social.url} 
                            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                            aria-label={social.platform}
                        >
                            <Icon icon={social.icon} class="w-5 h-5" />
                        </a>
                    {/each}
                </div>
            </div>

            <!-- Links Columns -->
            {#each footerLinks as column}
                <div>
                    <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-widest">{column.title}</h4>
                    <ul class="space-y-4">
                        {#each column.links as link}
                            <li>
                                <a 
                                    href={link.href} 
                                    class="text-slate-500 hover:text-primary-400 text-sm transition-colors"
                                >
                                    {link.name}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}

            <!-- Newsletter Column -->
            <div>
                <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
                <p class="text-slate-500 text-sm mb-6">Stay updated with our latest drops and exclusive offers.</p>
                <div class="relative">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/50 transition-all"
                    />
                    <button class="absolute right-2 top-1/2 -translate-y-1/2 text-primary-400 hover:text-white p-2">
                        <Icon icon="lucide:arrow-right" class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p class="text-xs text-slate-600">
                &copy; {currentYear} {shop?.name} - All Rights Reserved. <span class="ml-4 opacity-50">powered by <a href="/" class="text-slate-500 hover:text-primary-400 transition-colors">vendorhub</a></span>
            </p>
            <div class="flex gap-8">
                <a href="#" class="text-[10px] uppercase tracking-wider text-slate-600 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" class="text-[10px] uppercase tracking-wider text-slate-600 hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>
