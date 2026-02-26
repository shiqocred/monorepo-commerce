import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import onlyWarn from "eslint-plugin-only-warn";

/** @type {import("eslint").Linter.Config[]} */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      turbo: turboPlugin,
      "only-warn": onlyWarn,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "warn", // nanti dihapus
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "build/**", ".next/**"],
  },
];
