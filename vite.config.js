import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      minVersion: 'TLSv1.2',
      key: fs.readFileSync(path.resolve(__dirname, './server.key')),  // Path to your private key
      cert: fs.readFileSync(path.resolve(__dirname, './server.crt')), // Path to your certificate
    },
    proxy: {
      // Proxy for Flask backend (now pointing to Heroku)
      '/api': {
        target: 'https://embryolisse-python-5ce7c3101a2a.herokuapp.com/api', 
        changeOrigin: true,
        secure: false, // Disable SSL verification if using self-signed certificates
      },
      // Proxy for Spring Boot backend (https://localhost:8443)
      '/api/spring': {
        target: 'https://localhost:8443',
        changeOrigin: true,
        secure: false, // Disable SSL verification for self-signed certificates
        rewrite: (path) => path.replace(/^\/api\/spring/, '/api'), // Rewrite `/api/spring` to `/api`
      },
    },
  },
});