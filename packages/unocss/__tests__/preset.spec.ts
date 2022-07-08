import { createGenerator } from 'unocss';
import { describe, expect, test } from 'vitest';

import { presetVinicunca } from '../src/presets/core';

const uno = createGenerator({
  presets: [
    presetVinicunca({
      brands: {
        primary: '#1976d2',
        secondary: '#9c27b0',
        success: '#2e7d32',
        info: '#0288d1',
        warning: '#ed6c02',
        danger: '#d32f2f',
      },
    }),
  ],
});

describe('preset-core', () => {
  test('preflight', async () => {
    const { css } = await uno.generate('');
    expect(css).toMatchSnapshot();
  });
});
