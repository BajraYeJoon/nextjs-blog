import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // rules: {
    //   "no-console": ["warn", { allow: ["warn", "error"] }],
    //   "no-debugger": "warn",
    //   "@typescript-eslint/no-unused-vars": [
    //     "error",
    //     { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    //   ],
    //   "@typescript-eslint/no-explicit-any": "warn",
    //   "no-var": "error",
    //   "prefer-const": "error",
    //   "prefer-arrow-callback": "error",
    //   "no-nested-ternary": "warn",
    //   "max-depth": ["warn", 3],
    //   "complexity": ["warn", 10],
    //   "no-duplicate-imports": "error",
    //   "react-hooks/rules-of-hooks": "error",
    //   "react-hooks/exhaustive-deps": "warn",
    // },
  },
]);

export default eslintConfig;
