// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // 🔵 Primary Brand Colors
        primary: {
          DEFAULT: '#1D4ED8', // Blue 700
          hover: '#1E3A8A',   // Blue 900 (Dark Blue)
          light: '#3B82F6',   // Blue 500 (For glows)
        },
        // ⚫ Dark Sections
        dark: {
          DEFAULT: '#0F172A', // Slate 900
          card: '#1E293B',    // Slate 800
        },
        // ⚪ Backgrounds
        surface: '#FFFFFF',
        background: {
          light: '#F8FAFC',   // Slate 50
        },
        // 🧊 Text Colors
        text: {
          main: '#0F172A',    // Slate 900
          muted: '#64748B',   // Slate 500
          inverse: '#FFFFFF',
        },
        // 🟢🔴 Status
        success: '#22C55E',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // 📏 Typography System
        'h1': ['56px', { lineHeight: '1.2', letterSpacing: '-1px', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        // 📐 8px Grid System
        '18': '4.5rem', // 72px
        '24': '6rem',   // 96px
      },
      borderRadius: {
        'btn': '8px',
        'card': '16px',
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(29, 78, 216, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};