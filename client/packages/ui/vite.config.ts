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
		setupFiles: ['.config/test-setup.ts'],
		coverage: {
			reportsDirectory: path.resolve(__dirname, '../../coverage'),
			reporter: [['json', { file: 'ui-coverage.json' }]],
		},
	},
	resolve: {
		alias: {
			'@portal/types': path.resolve(__dirname, '../types/src/index.ts'),
		},
	},
});
