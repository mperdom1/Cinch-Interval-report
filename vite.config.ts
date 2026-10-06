import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      publicDir: 'public',
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          output: {
            manualChunks: {
              firebase: ['firebase/app', 'firebase/database', 'firebase/messaging', 'firebase/auth', 'firebase/firestore', 'firebase/analytics'],
              xlsx: ['xlsx'],
              react: ['react', 'react-dom'],
            },
          },
        },
      }
    };
});
