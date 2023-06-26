import path from "path";
import { defineConfig } from "vite";
import tsconfig from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfig()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "./src/globalResources.ts"),
      output: {
        entryFileNames: `globalResources.js`,
      },
    },
  },
});
