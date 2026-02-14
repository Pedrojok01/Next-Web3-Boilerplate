import typescriptEslint from "@typescript-eslint/eslint-plugin";
import nextConfig from "eslint-config-next";
import cssPlugin from "eslint-plugin-css";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

const config = [
  ...nextConfig,
  {
    plugins: {
      import: importPlugin,
      "@typescript-eslint": typescriptEslint,
      prettier,
      css: cssPlugin,
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "error",

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
];

export default config;
