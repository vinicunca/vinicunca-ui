const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@vinicunca/eslint-config'],

  rules: {
    'sonarjs/cognitive-complexity': 'off',

    // TODO: REMOVE THIS
    'no-console': 'off',
  },
});
