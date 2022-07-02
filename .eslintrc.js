const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@vinicunca/eslint-config'],

  rules: {
    'sonarjs/cognitive-complexity': 'off',
  },

  overrides: [
    {
      files: ['unocss/**/*.*'],
      rules: {
        'sonarjs/no-nested-template-literals': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
});
