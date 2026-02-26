// src/lib/utils/trustCalculator.ts

import type { TrustScoreInputs } from './auth';

// ========== TRUST SCORE BREAKDOWN ==========

export interface TrustScoreBreakdown {
    total: number;
    components: {
        verification: { score: number; max: number; items: VerificationItem[] };
        performance: { score: number; max: number; items: PerformanceItem[] };
        reliability: { score: number; max: number; items: ReliabilityItem[] };
    };
    label: string;
    color: string;
}

export interface VerificationItem {
    id: string;
    label: string;
    points: number;
    earned: boolean;
    description: string;
}

export interface PerformanceItem {
    id: string;
    label: string;
    weight: number;
    value: number;
    earned: number;
    description: string;
}

export interface ReliabilityItem {
    id: string;
    label: string;
    weight: number;
    penalty: number;
    earned: number;
    description: string;
}

// ========== CALCULATE DETAILED BREAKDOWN ==========

export const calculateTrustBreakdown = async (inputs: TrustScoreInputs): Promise<TrustScoreBreakdown> => {
    // Verification Component (40 points)
    const verificationItems: VerificationItem[] = [
        {
            id: 'id',
            label: 'ID Verification',
            points: 15,
            earned: inputs.idVerified,
            description: 'Government-issued ID verified'
        },
        {
            id: 'cac',
            label: 'CAC Verification',
            points: 15,
            earned: inputs.cacVerified,
            description: 'Business registration verified'
        },
        {
            id: 'bank',
            label: 'Bank Verification',
            points: 10,
            earned: inputs.bankVerified,
            description: 'Bank account validated'
        }
    ];

    const verificationScore = verificationItems
        .filter(item => item.earned)
        .reduce((sum, item) => sum + item.points, 0);

    // Performance Component (40 points)
    const ratingWeight = Math.min(1, inputs.reviewCount / 50);

    const performanceItems: PerformanceItem[] = [
        {
            id: 'delivery',
            label: 'Delivery Success Rate',
            weight: 15,
            value: inputs.deliveryRate,
            earned: (inputs.deliveryRate / 100) * 15,
            description: 'Percentage of orders delivered without issues'
        },
        {
            id: 'rating',
            label: 'Customer Rating',
            weight: 15,
            value: inputs.avgRating,
            earned: (inputs.avgRating / 5) * 15 * ratingWeight,
            description: `Average rating (${inputs.reviewCount} reviews)`
        },
        {
            id: 'completion',
            label: 'Order Completion Rate',
            weight: 10,
            value: inputs.orderCompletionRate,
            earned: (inputs.orderCompletionRate / 100) * 10,
            description: 'Percentage of orders not cancelled'
        }
    ];

    const performanceScore = performanceItems
        .reduce((sum, item) => sum + item.earned, 0);

    // Reliability Component (20 points)
    const responseScore = Math.max(0, 10 - (inputs.responseTimeHours / 2));

    const reliabilityItems: ReliabilityItem[] = [
        {
            id: 'disputes',
            label: 'Dispute History',
            weight: 10,
            penalty: inputs.disputeRate,
            earned: (1 - inputs.disputeRate) * 10,
            description: 'Low dispute rate indicates reliable service'
        },
        {
            id: 'response',
            label: 'Response Time',
            weight: 10,
            penalty: inputs.responseTimeHours,
            earned: responseScore,
            description: `Average response: ${inputs.responseTimeHours}h`
        }
    ];

    const reliabilityScore = reliabilityItems
        .reduce((sum, item) => sum + item.earned, 0);

    // Calculate total
    const total = Math.min(100, Math.round(verificationScore + performanceScore + reliabilityScore));

    // Get label and color
    const { getTrustScoreLabel, getTrustScoreColor } = await import('./auth');

    return {
        total,
        components: {
            verification: {
                score: Math.round(verificationScore),
                max: 40,
                items: verificationItems
            },
            performance: {
                score: Math.round(performanceScore),
                max: 40,
                items: performanceItems
            },
            reliability: {
                score: Math.round(reliabilityScore),
                max: 20,
                items: reliabilityItems
            }
        },
        label: getTrustScoreLabel(total),
        color: getTrustScoreColor(total)
    };
};

// ========== IMPROVEMENT SUGGESTIONS ==========

export interface TrustImprovement {
    id: string;
    title: string;
    description: string;
    impact: number; // Points it would add
    difficulty: 'easy' | 'medium' | 'hard';
    action: string; // CTA text
    route?: string; // Where to go to complete
}

export const getTrustImprovements = (inputs: TrustScoreInputs): TrustImprovement[] => {
    const improvements: TrustImprovement[] = [];

    if (!inputs.idVerified) {
        improvements.push({
            id: 'verify-id',
            title: 'Verify Your Identity',
            description: 'Add government ID to increase trust by 15 points',
            impact: 15,
            difficulty: 'easy',
            action: 'Upload ID',
            route: '/dashboard/settings/verification'
        });
    }

    if (!inputs.cacVerified) {
        improvements.push({
            id: 'verify-cac',
            title: 'Verify Your Business',
            description: 'Add CAC registration for +15 trust points and Verified badge',
            impact: 15,
            difficulty: 'medium',
            action: 'Upload CAC',
            route: '/dashboard/settings/verification'
        });
    }

    if (inputs.deliveryRate < 95) {
        improvements.push({
            id: 'improve-delivery',
            title: 'Improve Delivery Rate',
            description: `Current: ${inputs.deliveryRate}%. Aim for 95%+ for maximum trust`,
            impact: Math.round((95 - inputs.deliveryRate) * 0.15),
            difficulty: 'medium',
            action: 'View Tips',
            route: '/dashboard/analytics/delivery'
        });
    }

    if (inputs.reviewCount < 20) {
        improvements.push({
            id: 'get-reviews',
            title: 'Get More Reviews',
            description: 'Ask satisfied customers to leave reviews to boost your rating weight',
            impact: Math.min(15, (20 - inputs.reviewCount) * 0.5),
            difficulty: 'easy',
            action: 'Request Reviews',
            route: '/dashboard/orders'
        });
    }

    if (inputs.responseTimeHours > 4) {
        improvements.push({
            id: 'faster-response',
            title: 'Respond Faster to Messages',
            description: `Current: ${inputs.responseTimeHours}h. Responding under 2h adds up to 5 points`,
            impact: Math.max(0, Math.round(5 - (inputs.responseTimeHours / 2))),
            difficulty: 'easy',
            action: 'Enable Notifications',
            route: '/dashboard/settings/notifications'
        });
    }

    if (inputs.disputeRate > 0.05) {
        improvements.push({
            id: 'reduce-disputes',
            title: 'Reduce Disputes',
            description: 'Clear product descriptions and accurate shipping estimates help prevent disputes',
            impact: Math.round((inputs.disputeRate - 0.02) * 100),
            difficulty: 'hard',
            action: 'Review Guidelines',
            route: '/dashboard/settings/policies'
        });
    }

    // Sort by impact (highest first)
    return improvements.sort((a, b) => b.impact - a.impact);
};

// ========== TRUST SCORE HISTORY ==========

export interface TrustScoreHistory {
    date: Date;
    score: number;
    change: number;
    reason?: string;
}

export const calculateTrustTrend = (history: TrustScoreHistory[]): {
    current: number;
    change7d: number;
    change30d: number;
    trend: 'up' | 'down' | 'stable';
} => {
    if (history.length === 0) {
        return { current: 0, change7d: 0, change30d: 0, trend: 'stable' };
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const current = history[history.length - 1].score;

    const weekOld = history.find(h => h.date >= weekAgo);
    const monthOld = history.find(h => h.date >= monthAgo);

    const change7d = weekOld ? current - weekOld.score : 0;
    const change30d = monthOld ? current - monthOld.score : 0;

    const trend: 'up' | 'down' | 'stable' =
        change30d >= 5 ? 'up' :
            change30d <= -5 ? 'down' :
                'stable';

    return { current, change7d, change30d, trend };
};

// ========== EXPORT HELPERS ==========

export const formatTrustScore = (score: number): string => {
    return `${score}%`;
};

export const getTrustBadge = (score: number): string => {
    if (score >= 90) return '🏆 Elite';
    if (score >= 80) return '⭐ Verified';
    if (score >= 70) return '✓ Trusted';
    return '';
};