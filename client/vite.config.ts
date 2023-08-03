import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __YANDEX_API_KEY__: JSON.stringify(process.env.VITE_YANDEX_API_KEY || ""),
  },
})
