import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  preview: { port: 3000 },

  server: {
    port: 3000,
    proxy: {
      '^/apps/*': {
        target: 'some-api/',
        changeOrigin: true,
        secure: false,
        configure(proxy, options) {},
        rewrite: (path) => {
          const pathArray = path.split('/');
          return `/${pathArray[2]}.js`;
        },
      },
    },
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
    },
  },
});
