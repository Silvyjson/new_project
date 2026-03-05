<!-- src/routes/+error.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import Nav from "$lib/components/homepage/Nav.svelte";
    import Footer from "$lib/components/homepage/Footer.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Common error messages based on status
    const errorMessages: Record<number, { title: string; message: string }> = {
        404: {
            title: "Oops! Page Not Found",
            message:
                "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Don't worry, we'll help you find your way back.",
        },
        500: {
            title: "Internal Server Error",
            message:
                "Something went wrong on our end. Please try again later or contact support if the problem persists.",
        },
    };

    $: errorDetail = errorMessages[$page.status] || {
        title: "Something Went Wrong",
        message:
            "An unexpected error occurred. Please try again or return to the home page.",
    };
</script>

<svelte:head>
    <title>{$page.status}: {errorDetail.title} | VendorHub</title>
</svelte:head>

<main class="min-h-screen bg-background-light flex flex-col">
    <!-- Navbar -->
    <Nav />

    <!-- Error Content -->
    <div class="flex-1 flex items-center justify-center py-12 px-4">
        <div class="container max-w-4xl mx-auto text-center">
            <div
                class="relative mb-8 flex justify-center"
                in:fade={{ duration: 600 }}
            >
                <div
                    class="relative w-full max-w-md aspect-square bg-gradient-to-br from-primary/10 to-transparent rounded-3xl flex items-center justify-center p-12"
                >
                    <svg
                        class="w-full h-full text-primary drop-shadow-xl"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                        <path
                            d="M16 16c0-1.1-.9-2-2-2a2 2 0 0 0-4 0c-1.1 0-2 .9-2 2"
                        />
                    </svg>

                    <!-- Floating 404 text -->
                    <div
                        class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <span
                            class="text-[120px] font-black text-dark/5 select-none"
                            >404</span
                        >
                    </div>

                    <!-- Decorative elements -->
                    <div
                        class="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full animate-bounce"
                    ></div>
                    <div
                        class="absolute -bottom-4 -left-4 w-8 h-8 bg-dark/10 rounded-full animate-pulse"
                    ></div>
                </div>
            </div>

            <div
                in:fly={{ y: 20, duration: 600, delay: 200, easing: cubicOut }}
                class="space-y-6"
            >
                <h1
                    class="text-[48px] md:text-[64px] font-bold text-dark leading-tight"
                >
                    <span class="text-primary">{$page.status}</span> - {errorDetail.title}
                </h1>

                <p
                    class="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed"
                >
                    {errorDetail.message}
                </p>

                <div
                    class="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                >
                    <Button
                        href="/"
                        variant="primary"
                        size="lg"
                        className="px-8 h-[52px] text-lg font-semibold shadow-lg shadow-primary/20"
                    >
                        Back to Home
                    </Button>
                    <Button
                        href="/shop"
                        variant="outline"
                        size="lg"
                        className="px-8 h-[52px] text-lg font-semibold border-2"
                    >
                        Explore Shops
                    </Button>
                </div>

                <div class="mt-16 pt-12 border-t border-gray-200">
                    <p class="text-body text-text-muted mb-4">
                        Searching for something specific?
                    </p>
                    <div class="relative max-w-md mx-auto">
                        <svg
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Find products or shops..."
                            class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all text-body bg-white shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <Footer />
</main>

<style>
    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    @keyframes pulse {
        0%,
        100% {
            transform: scale(1);
            opacity: 0.1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.2;
        }
    }

    .animate-bounce {
        animation: bounce 3s ease-in-out infinite;
    }

    .animate-pulse {
        animation: pulse 4s ease-in-out infinite;
    }
</style>
