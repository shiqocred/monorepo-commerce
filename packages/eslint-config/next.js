import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { config as baseConfig } from "./base.js";

export const nextJsConfig = defineConfig([
  ...baseConfig,
  ...nextVitals, // Sudah termasuk plugin React
  ...nextTs, // SUDAH TERMASUK plugin TypeScript (Jangan tambah tseslint lagi!)
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  globalIgnores([".next/**", "next-env.d.ts"]),
]);

export default nextJsConfig;
