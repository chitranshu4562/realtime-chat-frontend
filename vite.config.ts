import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

import { THEME_STORAGE_KEY } from './src/lib/constants'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-theme-storage-key',
      transformIndexHtml(html) {
        return html.replaceAll(
          '__THEME_STORAGE_KEY__',
          JSON.stringify(THEME_STORAGE_KEY)
        )
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
