const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['@vinicunca/eslint-config'],

  rules: {
    'sonarjs/cognitive-complexity': 'off',

    // TODO: move this to eslint-config package
    'import/order': [
      'error', {
        'groups': [
          'type', 'builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'index',
        ],
        'newlines-between': 'always',
        'pathGroups': [
          {
            pattern: '~/**',
            group: 'internal',
          },
        ],
      },
    ],
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
