// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // For local context PWA
  compatibilityDate: '2025-07-15',
  srcDir: 'src/',
  serverDir: 'server/',
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:22897'
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'ZenTrack',
      short_name: 'ZenTrack',
      theme_color: '#0f172a',
      background_color: '#0f172a',
      display: 'standalone',
      shortcuts: [
        {
          name: 'Registrar Ánimo',
          short_name: 'Registro',
          description: 'Abre la app para un nuevo registro de ánimo',
          url: '/',
          icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }]
        },
        {
          name: 'Ver Stats',
          short_name: 'Estadísticas',
          description: 'Revisar mi bienestar semanal',
          url: '/stats',
          icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }]
        }
      ],
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  } as any
})
