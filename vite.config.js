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
      // Proxy for Flask backend
      '/api/flask': {
        target: 'https://embryolisse-python-5ce7c3101a2a.herokuapp.com',
        changeOrigin: true,
        secure: false, // Disable SSL verification if using self-signed certificates
      },
      // Proxy for Spring Boot backend
      '/api/spring': {
        target: 'https://embryolisse-backend-103c79c8a16d.herokuapp.com',
        changeOrigin: true,
        secure: false, // Disable SSL verification for self-signed certificates
      },
    },
  },
});