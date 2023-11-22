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
			reportsDirectory: path.resolve(__dirname, '../../coverage'),
			reporter: [['json', { file: 'portal-ui-coverage.json' }]],
		},
	},
});
