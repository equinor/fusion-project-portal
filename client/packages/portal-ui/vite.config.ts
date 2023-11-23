import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
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
