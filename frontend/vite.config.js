import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Aumenta el límite para que no salga la alerta amarilla (opcional)
    chunkSizeWarningLimit: 1000, 
    
    // 2. Optimización real: Divide el código
    rollupOptions: {
      output: {
        manualChunks: {
          // Crea un archivo separado 'vendor' con las librerías pesadas
          vendor: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
        },
      },
    },
  },
})
