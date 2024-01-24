import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfig from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		server: {
			deps: {
				fallbackCJS: true,
			},
		},
		setupFiles: ['.config/test-setup.ts'],
		coverage: {
			clean: true,
			all: true,
			exclude: ['**/index.ts'],
			reportsDirectory: path.resolve(__dirname, '../../coverage'),
			reporter: [
				['json', { file: 'ui.json' }],
				['text', { file: 'ui.md' }],
			],
		},
	},
	resolve: {
		alias: {
			'@portal/types': path.resolve(__dirname, '../types/src/index.ts'),
		},
	},
});
