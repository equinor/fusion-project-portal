import { defineConfig, configDefaults } from 'vitest/config';
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

		coverage: {
			clean: true,
			all: true,
			exclude: ['src/assets/**', '**/index.ts'],
			reportsDirectory: path.resolve(__dirname, '../../coverage'),
			reporter: [
				['json', { file: 'portal-client.json' }],
				['text', { file: 'portal-client.md' }],
			],
		},
	},
	resolve: {
		alias: {
			'@equinor/portal-core': path.resolve(__dirname, '../portal-core/src/index.ts'),
			'@equinor/portal-pages': path.resolve(__dirname, '../portal-pages/src/index.ts'),
			'@equinor/portal-ui': path.resolve(__dirname, '../portal-ui/src/index.ts'),
			'@portal/utils': path.resolve(__dirname, '../utils/src/index.ts'),
			'@equinor/service-message': path.resolve(__dirname, '../service-message/index.ts'),
			'@equinor/notification': path.resolve(__dirname, '../notification/index.ts'),
			'@portal/types': path.resolve(__dirname, '../types/src/index.ts'),
			'@portal/core': path.resolve(__dirname, '../core/src/index.ts'),
			'@portal/ui': path.resolve(__dirname, '../ui/src/index.ts'),
			'@portal/components': path.resolve(__dirname, '../components/src/index.ts'),
		},
	},
});
