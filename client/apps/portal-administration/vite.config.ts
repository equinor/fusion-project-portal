import { defineConfig } from 'vite';

const fix = `
var process = {
  env: {
    NODE_ENV: "production"
  }
};
var production = "production";

`;

export const InjectProcessPlugin = {
	name: 'rollup-plugin-metadata',
	renderChunk: (code: any) => fix + code,
};

export default defineConfig({
	appType: 'custom',
	build: {
		emptyOutDir: true,
		minify: false,
		rollupOptions: {
			plugins: [InjectProcessPlugin],
			output: {
				inlineDynamicImports: true,
			},
		},
		lib: {
			entry: './src/index.ts',
			fileName: 'app-bundle',
			formats: ['es'],
		},
	},
});
