/* eslint-disable @typescript-eslint/no-require-imports */
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: { "@typescript-eslint": tsPlugin, prettier: prettierPlugin },
    rules: { ...tsPlugin.configs.recommended.rules, "prettier/prettier": "error" },
  },
];
