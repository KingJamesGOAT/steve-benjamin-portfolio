/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
          muted: '#F1F5F9',
        },
        electric: {
          DEFAULT: '#0052FF',
          hover: '#0045D8',
          light: '#EEF4FF',
          dark: '#003ECB',
        },
        fintech: {
          primary: '#090D16',
          secondary: '#334155',
          muted: '#64748B',
          subtle: '#94A3B8',
          border: '#E2E8F0',
          'border-light': '#F1F5F9',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'fintech-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'fintech-card': '0 4px 20px -2px rgba(9, 13, 22, 0.05)',
        'fintech-hover': '0 12px 30px -4px rgba(9, 13, 22, 0.08)',
        'electric-glow': '0 0 20px -3px rgba(0, 82, 255, 0.25)',
      },
      borderRadius: {
        'fintech': '10px',
      },
    },
  },
  plugins: [],
}
