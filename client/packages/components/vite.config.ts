import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['.config/test-setup.ts'],
	},
	resolve: {
		alias: {
			'@portal/types': path.resolve(__dirname, '../types/src/index.ts'),
			'@portal/ui': path.resolve(__dirname, '../ui/src/index.ts'),
			'@portal/utils': path.resolve(__dirname, '../utils/src/index.ts'),
		},
	},
});
