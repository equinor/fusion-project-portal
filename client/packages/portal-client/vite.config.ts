import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfig from 'vite-tsconfig-paths';

import env from 'vite-plugin-environment';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import http from 'https';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isProduction = mode === 'prod';

	return {
		plugins: [
			react(),
			tsconfig(),
			env({ NODE_ENV: 'development' }),
			viteStaticCopy({
				targets: [
					{
						src: 'src/assets/favicon.ico',
						dest: '../../../dist/portal-client',
					},
					{
						src: 'src/assets/globalResources.js',
						dest: isProduction ? '../../../dist/portal-client' : '',
					},
					{
						src: 'src/assets/appLegacyLoader.js',
						dest: isProduction ? '../../../dist/portal-client' : '',
					},
				],
			}),
		],
		assetsInclude: ['*.svg', '*.jpg', '*.jpeg'],
		preview: { port: 3000 },
		define: {
			'process.env': {},
		},
		build: {
			assetsInlineLimit: 0,
			rollupOptions: {
				input: path.resolve(__dirname, './src/main.tsx'),
				output: {
					entryFileNames: `index.[hash].js`,
					dir: '../../dist/portal-client',
				},
			},
		},
		server: {
			proxy: {
				'/bundles/apps/resource-allocation-landingpage/resources/images/header1.png': {
					target: 'https://webserver-fusion-project-portal-test.radix.equinor.com/bundles/apps/resource-allocation-landingpage/resources/images/header1.png',
					changeOrigin: true,
					secure: false,
				},
			},
			port: 3000,
			host: true,
		},
		resolve: {
			alias: {
				'@equinor/portal-core': path.resolve(__dirname, '../portal-core/src/index.ts'),
				'@equinor/portal-pages': path.resolve(__dirname, '../portal-pages/src/index.ts'),
				'@equinor/portal-ui': path.resolve(__dirname, '../portal-ui/src/index.ts'),
				'@portal/utils': path.resolve(__dirname, '../utils/src/index.ts'),
				'@equinor/service-message': path.resolve(__dirname, '../service-message/index.ts'),
				'@equinor/notification': path.resolve(__dirname, '../notification/index.ts'),
				'@portal/types': path.resolve(__dirname, '../types/src/index.ts'),
				'@portal/core': path.resolve(__dirname, '../core/src/index.ts'),
				'@portal/ui': path.resolve(__dirname, '../ui/src/index.ts'),
				'@portal/components': path.resolve(__dirname, '../components/src/index.ts'),
			},
		},
	};
});
