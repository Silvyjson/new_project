<script>
    import { page } from "$app/stores";
    import { slide } from "svelte/transition";
    import Button from "../ui/Button.svelte";

    let mobileMenuOpen = false;

    const navItems = [
        { name: "Home", href: "/", exact: true },
        { name: "About", href: "/about" },
        { name: "Vendors", href: "/vendors" },
        { name: "Shops", href: "/shops" },
        { name: "Contact", href: "/contact" },
    ];

    function isActive(item) {
        const path = $page.url.pathname;

        if (item.exact) {
            return path === item.href;
        }

        return path.startsWith(item.href);
    }
</script>

<nav
    class="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-gray-200 h-20 shadow-sm"
>
    <div
        class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"
    >
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2">
            <div
                class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold"
            >
                V
            </div>
            <span class="text-xl font-bold text-text-main">VendorHub</span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8 text-sm font-medium">
            {#each navItems as item}
                <a
                    href={item.href}
                    class="group relative pb-1 transition-colors duration-300
          {isActive(item)
                        ? 'text-primary'
                        : 'text-text-muted hover:text-primary'}"
                >
                    {item.name}

                    <!-- Animated Underline -->
                    <span
                        class="absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300
            {isActive(item) ? 'w-full' : 'w-0 group-hover:w-full'}"
                    />
                </a>
            {/each}
        </div>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center gap-4">
            <Button href="/auth/login" variant="outline">Login</Button>
            <Button href="/auth/register" size="md">Get Started</Button>
        </div>

        <!-- Mobile Menu Button -->
        <button
            class="md:hidden text-text-main"
            aria-label="Toggle menu"
            on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
        >
            {#if mobileMenuOpen}
                <!-- Close Icon -->
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            {:else}
                <!-- Hamburger Icon -->
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            {/if}
        </button>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
        <div
            transition:slide={{ duration: 250 }}
            class="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-gray-100 p-6 flex flex-col gap-6 shadow-xl"
        >
            {#each navItems as item}
                <a
                    href={item.href}
                    class="text-lg font-medium transition-colors duration-200
          {isActive(item)
                        ? 'text-primary'
                        : 'text-text-main hover:text-primary'}"
                    on:click={() => (mobileMenuOpen = false)}
                >
                    {item.name}
                </a>
            {/each}

            <div class="flex flex-col gap-4 pt-4 border-t">
                <Button href="/auth/login" variant="outline">Login</Button>
                <Button href="/auth/register" size="md">Get Started</Button>
            </div>
        </div>
    {/if}
</nav>
