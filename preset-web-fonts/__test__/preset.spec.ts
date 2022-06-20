import type { WebFontsOptions } from '../src/types';

import { createGenerator } from '@unocss/core';
import { expect, test } from 'vitest';

import { presetVinicunca } from '../../unocss/src/presets';
import { presetWebFonts } from '../src';

const options: WebFontsOptions = {
  provider: 'google',
  fonts: {
    // these will extend the default theme
    sans: [
      {
        name: 'Inter',
        weights: '100..900',
      },
    ],
    mono: ['Fira Code', 'Fira Mono:400,700'],
    // custom ones
    lobster: 'Lobster',
    lato: [
      {
        name: 'Lato',
        weights: ['400', '700'],
        italic: true,
      },
      {
        name: 'sans-serif',
        provider: 'local',
      },
    ],
  },
};

const classes = new Set([
  'font-sans',
  'font-mono',
  'font-lobster',
  'font-lato',
]);

test('web-fonts (inline: false)', async () => {
  const uno = createGenerator({
    presets: [
      presetVinicunca(),
      presetWebFonts({
        ...options,
        inlineImports: false,
      }),
    ],
  });

  const { css } = await uno.generate(classes);
  expect(css).toMatchSnapshot();
});

test('web-fonts (inline: true)', async () => {
  const uno = createGenerator({
    presets: [
      presetVinicunca(),
      presetWebFonts({
        ...options,
        inlineImports: true,
      }),
    ],
  });

  const { css } = await uno.generate(classes);
  expect(css).toContain('@font-face');
});
