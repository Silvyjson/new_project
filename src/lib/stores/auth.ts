// src/lib/stores/auth.ts
import { writable, derived, type Readable } from 'svelte/store';
import { browser } from '$app/environment';
import type { UserSession, UserRole } from '$lib/utils/auth';

// ========== AUTH STATE ==========

interface AuthState {
    user: UserSession | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
    initialized: false
};

export const authStore = writable<AuthState>(initialState);

// ========== STORE ACTIONS ==========

export const authActions = {
    // Set user (after login/registration)
    setUser: (user: UserSession) => {
        authStore.update(state => ({
            ...state,
            user,
            loading: false,
            error: null,
            initialized: true
        }));

        // Persist to localStorage for SSR hydration
        if (browser) {
            localStorage.setItem('auth_user', JSON.stringify(user));
        }
    },

    // Clear user (logout)
    logout: async () => {
        // Call API to invalidate session
        try {
            await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        } catch (err) {
            // Ignore errors on logout
        }

        // Clear local state
        authStore.update(state => ({
            ...initialState,
            initialized: true
        }));

        if (browser) {
            localStorage.removeItem('auth_user');
        }
    },

    // Set loading state
    setLoading: (loading: boolean) => {
        authStore.update(state => ({ ...state, loading }));
    },

    // Set error
    setError: (error: string | null) => {
        authStore.update(state => ({ ...state, error }));
    },

    // Initialize from localStorage (client-side only)
    init: () => {
        if (!browser) return;

        try {
            const stored = localStorage.getItem('auth_user');
            if (stored) {
                const user = JSON.parse(stored) as UserSession;
                authStore.update(state => ({
                    ...state,
                    user,
                    loading: false,
                    initialized: true
                }));
            } else {
                authStore.update(state => ({ ...state, loading: false, initialized: true }));
            }
        } catch (err) {
            console.error('Failed to initialize auth:', err);
            authStore.update(state => ({ ...state, loading: false, initialized: true }));
        }
    },

    // Refresh user data from API
    refresh: async () => {
        authStore.update(state => ({ ...state, loading: true }));

        try {
            const response = await fetch('/api/auth/me', { credentials: 'include' });

            if (response.ok) {
                const user = await response.json();
                authActions.setUser(user);
                return { success: true };
            } else {
                // Not authenticated
                authActions.logout();
                return { success: false };
            }
        } catch (err) {
            authActions.setError('Failed to refresh session');
            return { success: false, error: err };
        }
    }
};

// ========== DERIVED STORES ==========

// Is user authenticated
export const isAuthenticated: Readable<boolean> = derived(
    authStore,
    $auth => $auth.user !== null && $auth.user.verified
);

// User role
export const userRole: Readable<UserRole | null> = derived(
    authStore,
    $auth => $auth.user?.role ?? null
);

// Is vendor
export const isVendor: Readable<boolean> = derived(
    userRole,
    $role => $role === 'vendor'
);

// Is buyer
export const isBuyer: Readable<boolean> = derived(
    userRole,
    $role => $role === 'buyer'
);

// Is admin
export const isAdmin: Readable<boolean> = derived(
    userRole,
    $role => $role === 'admin'
);

// Vendor profile (if vendor)
export const vendorProfile = derived(
    authStore,
    $auth => $auth.user?.role === 'vendor' ? $auth.user.vendorProfile : null
);

// Trust score (if vendor)
export const trustScore = derived(
    vendorProfile,
    $profile => $profile?.trustScore ?? null
);

// Onboarding status
export const onboardingComplete: Readable<boolean> = derived(
    authStore,
    $auth => $auth.user?.onboardingComplete ?? false
);

// Can access dashboard
export const canAccessDashboard: Readable<boolean> = derived(
    [isAuthenticated, isVendor, onboardingComplete],
    ([$auth, $isVendor, $onboarding]) => {
        if (!$auth) return false;
        if ($isVendor && !$onboarding) return false;
        return true;
    }
);

// ========== TYPE GUARDS ==========

export const isAuthInitialized = (state: AuthState): state is AuthState & { initialized: true } => {
    return state.initialized;
};

export const isAuthLoading = (state: AuthState): boolean => {
    return state.loading;
};

export const getAuthError = (state: AuthState): string | null => {
    return state.error;
};

// ========== AUTO-INIT ON CLIENT ==========

if (browser) {
    authActions.init();
}

// ========== EXPORT DEFAULT ==========

export default {
    store: authStore,
    actions: authActions,
    selectors: {
        isAuthenticated,
        userRole,
        isVendor,
        isBuyer,
        isAdmin,
        vendorProfile,
        trustScore,
        onboardingComplete,
        canAccessDashboard
    }
};