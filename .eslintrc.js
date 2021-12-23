const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@praburangki/eslint-config'],

  rules: {
    'no-prototype-builtins': 'off',

    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/no-redeclare': 'off',
      },
    },
  ],
});
