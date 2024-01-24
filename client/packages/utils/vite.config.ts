import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
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
