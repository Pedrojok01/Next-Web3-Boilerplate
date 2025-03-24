import { defineConfig } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import cssPlugin from "eslint-plugin-css";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "plugin:css/recommended",
        "plugin:import/typescript",
        "prettier",
      ),
    ),

    plugins: {
      import: fixupPluginRules(_import),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      prettier,
      css: fixupPluginRules(cssPlugin),
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "warn",

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],

          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],

          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
