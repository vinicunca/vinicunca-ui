const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@vinicunca/eslint-config'],

  rules: {
    'sonarjs/cognitive-complexity': 'off',
  },

  overrides: [
    {
      files: ['packages/unocss/**/*.*'],
      rules: {
        'sonarjs/no-nested-template-literals': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['*.spec.*'],
      rules: {
        'no-unused-expressions': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
});
