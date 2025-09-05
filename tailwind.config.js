/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
        'full': '9999px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0, 0%, 0%, 0.12)',
        'modal': '0 12px 36px hsla(0, 0%, 0%, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.22,1,0.36,1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '400': '400ms',
      }
    },
  },
  plugins: [],
}
