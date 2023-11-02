import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig(() => {
  return {
    server: {
        host: 'localhost',
        open: true,
        port: 3000,
      },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});