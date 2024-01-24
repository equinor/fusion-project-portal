import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		coverage: {
			clean: true,
			all: true,
			exclude: ['**/index.ts'],
			reportsDirectory: path.resolve(__dirname, '../../coverage'),
			reporter: [
				['json', { file: 'portal-ui.json' }],
				['text', { file: 'portal-ui.md' }],
			],
		},
	},
});
