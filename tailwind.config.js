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
        carton: {
          50: '#faf8f5',
          100: '#f3ede3',
          200: '#e7d9c6',
          300: '#d8c0a0',
          400: '#c9a679',
          500: '#ba8c52',
          600: '#a67543',
          700: '#8b5f39',
          800: '#724e33',
          900: '#5e412b',
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 1.5s ease-in-out infinite',
        'cell-win': 'cell-win 0.6s ease-out',
        'bounce-in': 'bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(186, 140, 82, 0.5), 0 0 10px rgba(186, 140, 82, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(186, 140, 82, 0.8), 0 0 30px rgba(186, 140, 82, 0.5)',
          },
        },
        'cell-win': {
          '0%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 rgba(186, 140, 82, 0)',
          },
          '50%': { 
            transform: 'scale(1.15)',
            boxShadow: '0 0 30px rgba(186, 140, 82, 0.9), 0 0 60px rgba(186, 140, 82, 0.6)',
          },
          '100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 15px rgba(186, 140, 82, 0.7), 0 0 30px rgba(186, 140, 82, 0.4)',
          },
        },
        'bounce-in': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
