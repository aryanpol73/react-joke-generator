import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dev Humor Hub',
        short_name: 'HumorHub',
        description: 'Programming Joke App',
        theme_color: '#1e1e2f',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/joke-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/joke-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})