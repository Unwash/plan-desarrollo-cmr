const js = require("@eslint/js");
const globals = require("globals");
const { defineConfig } = require("eslint/config");
const jest = require("eslint-plugin-jest");

module.exports = defineConfig([
  // Código Node
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs"
    }
  },

  // Tests Jest
  {
    files: ["**/*.test.js", "test/**/*.js"],
    plugins: { jest },
    languageOptions: {
      globals: jest.environments.globals.globals
    },
    rules: {
      ...jest.configs.recommended.rules
    }
  }
]);