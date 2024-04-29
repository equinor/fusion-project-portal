import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['.config/test-setup.ts'],
		coverage: {
			clean: true,
			all: true,
			exclude: ['**/index.ts'],
			reportsDirectory: path.resolve(__dirname, '../../coverage'),
			reporter: [
				['json', { file: 'components.json' }],
				['text', { file: 'components.md' }],
			],
		},
	},
	resolve: {
		alias: {
			'@portal/types': path.resolve(__dirname, '../types/src/index.ts'),
			'@portal/ui': path.resolve(__dirname, '../ui/src/index.ts'),
			'@portal/utils': path.resolve(__dirname, '../utils/src/index.ts'),
			'@equinor/portal-core': path.resolve(__dirname, '../portal-core/src/index.ts'),
		},
	},
});
