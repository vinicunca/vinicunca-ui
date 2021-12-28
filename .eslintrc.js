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
    {
      files: '**/*.spec.cy.{ts,tsx}',
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        'no-unused-expressions': 'off',
        'cypress/no-assigning-return-values': 'error',
        'cypress/no-unnecessary-waiting': 'warn',
        'cypress/assertion-before-screenshot': 'warn',
        'cypress/no-force': 'warn',
        'cypress/no-async-tests': 'error',
      },
    },
  ],
});
