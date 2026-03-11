import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          green: '#10b981',     // Primary
          blue: '#309ce8',      // Secondary
          bg: '#0f172a',        // Background
          surface: '#1e293b',   // Surface/Card
          text: '#f8fafc',      // Text Primary
          textMuted: '#94a3b8'  // Text Secondary
        }
      },
      borderRadius: {
        '2xl': '16px'
      }
    }
  },
  plugins: []
} satisfies Config
