import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfig from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfig()],
  preview: { port: 3000 },
  define: {
    'process.env': {},
  },
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      '@equinor/portal-core': path.resolve(
        __dirname,
        '../portal-core/src/index.ts'
      ),
      '@equinor/portal-pages': path.resolve(
        __dirname,
        '../portal-pages/src/index.ts'
      ),
      '@equinor/portal-ui': path.resolve(
        __dirname,
        '../portal-ui/src/index.ts'
      ),
      '@equinor/portal-utils': path.resolve(
        __dirname,
        '../portal-utils/src/index.ts'
      ),
      '@equinor/service-message': path.resolve(
        __dirname,
        '../service-message/index.ts'
      ),
    },
  },
});
