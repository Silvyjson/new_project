// src/lib/utils/auth.ts

// ========== PASSWORD UTILITIES ==========

export const calculatePasswordStrength = (password: string): {
    score: number;
    feedback: string;
    level: 'weak' | 'medium' | 'strong'
} => {
    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 12) score += 30;
    else if (password.length >= 8) score += 20;
    else {
        score += 10;
        feedback.push('Use at least 8 characters');
    }

    // Character variety
    if (/[a-z]/.test(password)) score += 15;
    else feedback.push('Add lowercase letters');

    if (/[A-Z]/.test(password)) score += 15;
    else feedback.push('Add uppercase letters');

    if (/[0-9]/.test(password)) score += 15;
    else feedback.push('Add numbers');

    if (/[^a-zA-Z0-9]/.test(password)) score += 25;
    else feedback.push('Add special characters (!@#$%^&*)');

    // Determine level
    let level: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 75) level = 'strong';
    else if (score >= 50) level = 'medium';

    return {
        score: Math.min(100, score),
        feedback: feedback.length > 0 ? feedback.slice(0, 2).join('. ') + '.' : 'Great password!',
        level
    };
};

export const validatePassword = (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (password.length > 128) return 'Password is too long';
    return null;
};

// ========== EMAIL UTILITIES ==========

export const isValidEmail = (email: string): boolean => {
    // RFC 5322 compliant regex (simplified)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
};

export const normalizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};

// ========== PHONE UTILITIES (Nigeria Focus) ==========

export const isValidNigerianPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');

    // International format: +234XXXXXXXXXX
    if (/^\+234\d{10}$/.test(cleaned)) return true;

    // Local format: 0XXXXXXXXXX
    if (/^0\d{10}$/.test(cleaned)) return true;

    // Just digits: 234XXXXXXXXXX or XXXXXXXXXX
    if (/^234\d{10}$/.test(cleaned) || /^\d{10}$/.test(cleaned)) return true;

    return false;
};

export const formatNigerianPhone = (phone: string): string => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');

    // Convert local to international
    if (/^0\d{10}$/.test(cleaned)) {
        return '+234' + cleaned.slice(1);
    }
    if (/^\d{10}$/.test(cleaned)) {
        return '+234' + cleaned;
    }
    if (/^234\d{10}$/.test(cleaned)) {
        return '+' + cleaned;
    }

    return phone; // Return as-is if already formatted
};

// ========== TRUST SCORE CALCULATOR ==========

export interface TrustScoreInputs {
    idVerified: boolean;
    cacVerified: boolean;
    bankVerified: boolean;
    deliveryRate: number;      // 0-100
    avgRating: number;          // 0-5
    reviewCount: number;        // Number of reviews
    disputeRate: number;        // 0-1 (percentage as decimal)
    responseTimeHours: number;  // Average response time
    orderCompletionRate: number; // 0-100
}

export const calculateTrustScore = (inputs: TrustScoreInputs): number => {
    let score = 0;

    // Verification Component (40 points max)
    if (inputs.idVerified) score += 15;
    if (inputs.cacVerified) score += 15;
    if (inputs.bankVerified) score += 10;

    // Performance Component (40 points max)
    // Delivery rate (15 points)
    score += (inputs.deliveryRate / 100) * 15;

    // Rating (15 points) - weighted by review count for reliability
    const ratingWeight = Math.min(1, inputs.reviewCount / 50);
    score += (inputs.avgRating / 5) * 15 * ratingWeight;

    // Order completion (10 points)
    score += (inputs.orderCompletionRate / 100) * 10;

    // Reliability Component (20 points max)
    // Dispute rate penalty (10 points)
    score += (1 - inputs.disputeRate) * 10;

    // Response time (10 points) - faster is better
    const responseScore = Math.max(0, 10 - (inputs.responseTimeHours / 2));
    score += responseScore;

    // Clamp to 0-100 and round
    return Math.min(100, Math.max(0, Math.round(score)));
};

export const getTrustScoreLabel = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Great';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
};

export const getTrustScoreColor = (score: number): string => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-yellow-500';
    return 'text-error';
};

export const getTrustScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-primary';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-error';
};

// ========== ROLE & ROUTING UTILITIES ==========

export type UserRole = 'buyer' | 'vendor' | 'admin';

export interface UserSession {
    id: string;
    email: string;
    role: UserRole;
    verified: boolean;
    onboardingComplete?: boolean;
    vendorProfile?: {
        id: string;
        slug: string;
        trustScore: number;
    };
}

export const getRedirectPath = (user: UserSession, returnTo?: string): string => {
    // If there's a return URL and user is verified, use it
    if (returnTo && user.verified) {
        return returnTo;
    }

    // Role-based defaults
    if (user.role === 'vendor') {
        if (!user.onboardingComplete) {
            return '/auth/register/vendor/verify-id';
        }
        return '/dashboard/overview';
    }

    if (user.role === 'buyer') {
        return '/home';
    }

    if (user.role === 'admin') {
        return '/admin/dashboard';
    }

    // Fallback
    return '/';
};

export const isRouteProtected = (pathname: string): boolean => {
    const protectedPrefixes = [
        '/dashboard',
        '/vendor',
        '/buyer',
        '/admin',
        '/settings',
        '/orders',
        '/messages'
    ];

    return protectedPrefixes.some(prefix => pathname.startsWith(prefix));
};

export const canAccessRoute = (user: UserSession | null, pathname: string): boolean => {
    if (!user) return !isRouteProtected(pathname);

    // Admin can access everything
    if (user.role === 'admin') return true;

    // Vendor restrictions
    if (user.role === 'vendor') {
        if (pathname.startsWith('/buyer') || pathname.startsWith('/home')) {
            return false;
        }
        // Block dashboard if onboarding incomplete
        if (pathname.startsWith('/dashboard') && !user.onboardingComplete) {
            return pathname.startsWith('/auth/register/vendor');
        }
    }

    // Buyer restrictions
    if (user.role === 'buyer') {
        if (pathname.startsWith('/vendor') || pathname.startsWith('/dashboard')) {
            return false;
        }
    }

    return true;
};

// ========== API HELPERS ==========

export const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const response = await fetch(`/api${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        credentials: 'include' // For httpOnly cookies
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `API Error: ${response.status}`);
    }

    return response.json();
};

export const uploadFile = async (
    endpoint: string,
    file: File,
    additionalData?: Record<string, string>
): Promise<{ url: string; id: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
            formData.append(key, value);
        });
    }

    const response = await fetch(`/api${endpoint}`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Upload Error: ${response.status}`);
    }

    return response.json();
};

// ========== SECURITY UTILITIES ==========

export const sanitizeInput = (input: string): string => {
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .slice(0, 1000); // Limit length
};

export const generateCsrfToken = (): string => {
    return crypto.randomUUID();
};

export const validateCsrfToken = (token: string, expected: string): boolean => {
    return token === expected && token.length > 0;
};

// ========== RATE LIMITING HELPERS ==========

export interface RateLimitConfig {
    windowMs: number; // Time window in milliseconds
    maxRequests: number; // Max requests per window
}

export const createRateLimiter = (config: RateLimitConfig) => {
    const requests = new Map<string, number[]>();

    return {
        check: (identifier: string): boolean => {
            const now = Date.now();
            const windowStart = now - config.windowMs;

            // Get or initialize request timestamps
            let timestamps = requests.get(identifier) || [];

            // Remove old timestamps outside the window
            timestamps = timestamps.filter(ts => ts > windowStart);

            // Check if under limit
            if (timestamps.length >= config.maxRequests) {
                return false; // Rate limited
            }

            // Add current request
            timestamps.push(now);
            requests.set(identifier, timestamps);

            return true; // Allowed
        },

        reset: (identifier: string) => {
            requests.delete(identifier);
        }
    };
};

// Default rate limiters
export const loginRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5
});

export const registerRateLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3
});

export const apiRateLimiter = createRateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30
});