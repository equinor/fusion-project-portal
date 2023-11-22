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
		coverage: {
			clean: true,
			all: true,
			reportsDirectory: path.resolve(__dirname, '../../coverage'),
			reporter: [
				['json', { file: 'core-coverage.json' }],
				['text', { file: 'core-coverage.md' }],
			],
		},
	},
	resolve: {
		alias: {
			'@equinor/portal-core': path.resolve(__dirname, '../portal-core/src/index.ts'),
			'@equinor/portal-ui': path.resolve(__dirname, '../portal-ui/src/index.ts'),
			'@portal/utils': path.resolve(__dirname, '../portal-utils/src/index.ts'),
			'portal-types': path.resolve(__dirname, '../types/src/index.ts'),
		},
	},
});
