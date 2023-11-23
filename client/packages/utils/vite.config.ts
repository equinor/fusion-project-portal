import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfig from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfig()],
	test: {
		coverage: {
			clean: true,
			all: true,
			exclude: ['**/index.ts'],
			reportsDirectory: path.resolve(__dirname, '../../coverage'),
			reporter: [
				['json', { file: 'utils.json' }],
				['text', { file: 'utils.md' }],
			],
		},
	},
	resolve: {
		alias: {
			'@portal/types': path.resolve(__dirname, '../types/src/index.ts'),
		},
	},
});
