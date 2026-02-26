import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import { config as baseConfig } from "./base.js";

export const elysiaConfig = defineConfig([
  ...baseConfig,
  ...tseslint.configs.recommended, // Masukkan di sini karena Elysia butuh
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: true },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "require-await": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
]);

export default elysiaConfig;
