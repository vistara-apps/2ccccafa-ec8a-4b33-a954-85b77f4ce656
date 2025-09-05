/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(230, 20%, 15%)',
        accent: 'hsl(12, 90%, 55%)',
        primary: 'hsl(240, 80%, 50%)',
        surface: 'hsl(230, 20%, 20%)',
        textPrimary: 'hsl(230, 20%, 90%)',
        textSecondary: 'hsl(230, 20%, 70%)',
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(0, 0%, 0%, 0.12)',
        modal: '0 12px 36px hsla(0, 0%, 0%, 0.25)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: {
        display: {
          fontSize: '2.25rem',
          fontWeight: '600',
          lineHeight: '1.2',
          color: 'hsl(230, 20%, 90%)',
        },
        heading: {
          fontSize: '1.5rem',
          fontWeight: '700',
          lineHeight: '1.3',
          color: 'hsl(230, 20%, 90%)',
        },
        subheading: {
          fontSize: '1.25rem',
          fontWeight: '600',
          lineHeight: '1.4',
          color: 'hsl(230, 20%, 90%)',
        },
        body: {
          fontSize: '1rem',
          lineHeight: '1.75',
          color: 'hsl(230, 20%, 70%)',
        },
        caption: {
          fontSize: '0.875rem',
          color: 'hsl(230, 20%, 70%)',
        },
      },
    },
  },
  plugins: [],
};
