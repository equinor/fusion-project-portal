import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfig from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfig()],
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
});
