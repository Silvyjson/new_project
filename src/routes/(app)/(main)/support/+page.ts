// src/routes/support/+page.ts
import type { PageLoad } from './$types';

// FAQ Data
const faqs = [
    {
        id: 'faq-1',
        category: 'buyer-protection',
        question: 'How does VendorHub protect buyers?',
        answer: 'Every payment is held in secure escrow until you confirm delivery. If the item doesn\'t arrive, is damaged, or doesn\'t match the description, you can open a dispute within 48 hours. Our neutral team reviews evidence from both parties and resolves issues fairly. You only pay when you\'re satisfied.'
    },
    {
        id: 'faq-2',
        category: 'disputes',
        question: 'What happens if a vendor does not deliver?',
        answer: 'If your order doesn\'t arrive within the promised timeframe, contact the vendor first via the shop page. If unresolved, open a dispute via WhatsApp or email within 48 hours of the expected delivery date. We\'ll review tracking info, communication, and evidence. If the vendor is at fault, you\'ll receive a full refund to your original payment method.'
    },
    {
        id: 'faq-3',
        category: 'refunds',
        question: 'How long do refunds take?',
        answer: 'Once a dispute is resolved in your favor, refunds are processed within 1-3 business days. The time it takes to appear in your account depends on your bank or payment provider (typically 3-7 business days for cards, instant for mobile money wallets).'
    },
    {
        id: 'faq-4',
        category: 'verification',
        question: 'How are vendors verified?',
        answer: 'Vendors undergo a multi-step verification: (1) Government-issued ID verification, (2) Business document review (if applicable), (3) Phone number confirmation, (4) Bank account validation, and (5) Manual review by our trust team. Verified vendors receive a blue badge and higher visibility.'
    },
    {
        id: 'faq-5',
        category: 'disputes',
        question: 'How does dispute resolution work?',
        answer: '1. You report an issue via WhatsApp or email with order details and evidence (photos, messages). 2. We notify the vendor and request their response. 3. Both parties submit evidence within 24 hours. 4. Our neutral trust team reviews all materials. 5. A decision is made within 48 hours. 6. Funds are released or refunded accordingly. All decisions are final and binding.'
    },
    {
        id: 'faq-6',
        category: 'trust-score',
        question: 'How is Trust Score calculated?',
        answer: 'Trust Score (0-100) is calculated from: (1) Delivery success rate (30%), (2) Customer review ratings (25%), (3) Order completion rate (20%), (4) Response time to messages (15%), and (5) Dispute history (10%). Scores update weekly. Higher scores mean more buyer confidence and better shop visibility.'
    },
    {
        id: 'faq-7',
        category: 'shipping',
        question: 'What if I receive the wrong or damaged item?',
        answer: 'Contact the vendor immediately via the shop page. If unresolved, open a dispute within 48 hours of delivery with photos/videos of the issue. We\'ll arrange a return label (if applicable) and process a refund or replacement once the item is verified. VendorHub covers return shipping for verified defects.'
    },
    {
        id: 'faq-8',
        category: 'account',
        question: 'How do I update my account information?',
        answer: 'Log in to your VendorHub account and go to Settings → Profile. You can update your name, email, phone number, and shipping addresses. For security, changes to email or phone require verification via OTP. If you need help, contact support via WhatsApp or email.'
    }
];

// Help Categories
const categories = [
    {
        id: 'orders-payments',
        title: 'Orders & Payments',
        icon: 'mdi:credit-card',
        description: 'Track orders, payment methods, refunds'
    },
    {
        id: 'disputes-refunds',
        title: 'Disputes & Refunds',
        icon: 'mdi:scale-balance',
        description: 'Open disputes, refund process, policies'
    },
    {
        id: 'vendor-verification',
        title: 'Vendor Verification',
        icon: 'mdi:check-decagram',
        description: 'How vendors get verified, trust badges'
    },
    {
        id: 'trust-safety',
        title: 'Trust & Safety',
        icon: 'mdi:shield-check',
        description: 'Escrow protection, fraud prevention'
    },
    {
        id: 'account-issues',
        title: 'Account Issues',
        icon: 'mdi:account',
        description: 'Login, password, profile settings'
    },
    {
        id: 'shipping-delivery',
        title: 'Shipping & Delivery',
        icon: 'mdi:package-variant-closed',
        description: 'Delivery times, tracking, issues'
    }
];

// Trust Pillars
const trustPillars = [
    {
        id: 'verified-vendors',
        title: 'Verified Vendors',
        icon: 'mdi:check-decagram',
        accent: 'success',
        description: 'Every vendor undergoes ID verification, business document review, and manual approval before receiving a verified badge.',
        features: [
            'Government ID verification',
            'Business document review',
            'Phone & bank validation',
            'Manual trust team approval'
        ]
    },
    {
        id: 'secure-payments',
        title: 'Secure Payments',
        icon: 'mdi:lock-check',
        accent: 'primary',
        description: 'Your payment is held in secure escrow until you confirm delivery. No funds release until you\'re satisfied.',
        features: [
            'Escrow payment holding',
            'Encrypted transactions',
            'Multiple payment methods',
            'Instant refund processing'
        ]
    },
    {
        id: 'trust-score',
        title: 'Trust Score System',
        icon: 'mdi:star',
        accent: 'info',
        description: 'Transparent algorithm calculates vendor reliability based on real performance metrics.',
        features: [
            'Delivery success rate tracking',
            'Customer review aggregation',
            'Response time monitoring',
            'Dispute history analysis'
        ]
    }
];

export const load: PageLoad = async () => {
    return {
        faqs,
        categories,
        trustPillars,
        contact: {
            whatsapp: {
                number: '+234 800 VENDORHUB',
                url: 'https://wa.me/234800836367482',
                responseTime: 'Under 10 minutes (business hours)'
            },
            email: {
                address: 'support@vendorhub.com',
                responseTime: '6–12 hours'
            }
        },
        disputeSteps: [
            { step: 1, title: 'Order Placed', desc: 'Payment secured in escrow' },
            { step: 2, title: 'Vendor Ships', desc: 'Tracking info uploaded' },
            { step: 3, title: 'Buyer Confirms', desc: 'You confirm delivery' },
            { step: 4, title: 'Funds Released', desc: 'Vendor receives payment' },
            { step: 5, title: 'Issue? Open Dispute', desc: 'Contact us within 48 hours' }
        ],
        meta: {
            title: 'Support & Trust Center | VendorHub',
            description: 'Get help with orders, disputes, and account issues. Your transactions are protected by VendorHub\'s secure escrow and dispute resolution system.'
        }
    };
};