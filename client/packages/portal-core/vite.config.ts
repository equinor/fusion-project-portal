import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfig from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfig()],
	test: {
		environment: 'jsdom',
		globals: true,
		server: {
			deps: {
				fallbackCJS: true,
			},
		},
	},
	resolve: {
		alias: {
			'@equinor/portal-core': path.resolve(__dirname, '../portal-core/src/index.ts'),
			'@equinor/portal-pages': path.resolve(__dirname, '../portal-pages/src/index.ts'),
			'@equinor/portal-ui': path.resolve(__dirname, '../portal-ui/src/index.ts'),
			'@equinor/portal-utils': path.resolve(__dirname, '../portal-utils/src/index.ts'),
			'@equinor/service-message': path.resolve(__dirname, '../service-message/index.ts'),
		},
	},
});
