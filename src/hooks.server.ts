// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.locals.session;
    const url = new URL(event.request.url);

    // Protected routes
    const protectedRoutes = [
        // '/shop',
        // '/vendor',
        // '/home',
        // '/following',
        // '/orders',
        // '/wishlist',
        // '/cart',
        // '/checkout',
        // '/notifications',
        // '/settings'
        // '/dashboard', 
    ];
    const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route));

    if (isProtected && !session?.user) {
        // Redirect to login with return URL
        return new Response(null, {
            status: 302,
            headers: {
                location: `/auth/login?returnTo=${encodeURIComponent(url.pathname)}`
            }
        });
    }

    // Role-based access control
    if (session?.user?.role === 'buyer' && url.pathname.startsWith('/dashboard')) {
        return new Response(null, {
            status: 302,
            headers: { location: '/home' }
        });
    }

    if (session?.user?.role === 'vendor' && url.pathname.startsWith('/home')) {
        return new Response(null, {
            status: 302,
            headers: { location: '/dashboard/overview' }
        });
    }

    // Onboarding check for vendors
    if (session?.user?.role === 'vendor' && !session.user.onboardingComplete) {
        const onboardingRoutes = [
            '/auth/register/vendor',
            '/auth/register/vendor/verify-id',
            '/auth/register/vendor/verify-cac'
        ];
        const isOnboarding = onboardingRoutes.some(route => url.pathname.startsWith(route));

        if (!isOnboarding && !url.pathname.startsWith('/auth')) {
            return new Response(null, {
                status: 302,
                headers: { location: '/auth/register/vendor/verify-id' }
            });
        }
    }

    return resolve(event);
};