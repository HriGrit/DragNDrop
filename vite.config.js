import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/DragNDrop/',
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      colors: {
        'background-primary':   'var(--background-primary)',
        'background-secondary': 'var(--background-secondary)',
        'sidebar-primary':      'var(--sidebar-primary)',
        'sidebar-text':         'var(--sidebar-text)',
        'btn-yellow-bg':        'var(--btn-yellow-bg)',
        'btn-yellow-border':    'var(--btn-yellow-border)',
        'btn-red-bg':           'var(--btn-red-bg)',
        'btn-red-border':       'var(--btn-red-border)',
      },
    },
  },
})
