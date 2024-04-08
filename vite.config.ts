import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {},
  server: {
    proxy: {
      '/chat': {
        target: 'https://api.openmpy.com',
        ws: true,
      },
    },
  },
});
