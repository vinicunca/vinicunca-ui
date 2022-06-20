import type { Rule } from '@unocss/core';
import type { Theme } from '../theme';

import { toArray } from '@vinicunca/js-utilities';

import { handler } from '../utils';

const WEIGHT_MAP: Dictionary<string> = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

export const fonts: Rule<Theme>[] = [
  // family
  [
    /^font-(.+)$/,
    ([_, d], { theme }) => ({ 'font-family': theme.fontFamily?.[d] || handler.bracket.cssvar.global(d) }),
    { autocomplete: 'font-$fontFamily' },
  ],

  // size
  [
    /^text-(.+)$/,
    ([_, s = 'base'], { theme }) => {
      const themed = toArray(theme.fontSize?.[s]);
      if (themed?.[0]) {
        const [size, height = '1'] = themed;
        return {
          'font-size': size,
          'line-height': height,
        };
      }

      return { 'font-size': handler.bracketOfLength.rem(s) };
    },
    { autocomplete: 'text-$fontSize' },
  ],
  [
    /^text-size-(.+)$/,
    ([_, s], { theme }) => {
      const themed = toArray(theme.fontSize?.[s]);
      const size = themed?.[0] ?? handler.bracket.cssvar.rem(s);
      if (size != null) {
        return { 'font-size': size };
      }
    },
    { autocomplete: 'text-size-$fontSize' },
  ],

  // weights
  [
    /^font-?([^-]+)$/,
    ([, s]) => ({ 'font-weight': WEIGHT_MAP[s] || handler.global.number(s) }),
    { autocomplete: `font-(100|200|300|400|500|600|700|800|900|${Object.keys(WEIGHT_MAP).join('|')})` },
  ],

  // leadings
  [
    /^(?:font-)?(?:leading|lh)-(.+)$/,
    ([_, s], { theme }) => ({ 'line-height': theme.lineHeight?.[s] || handler.bracket.cssvar.global.rem(s) }),
    { autocomplete: '(leading|lh)-$lineHeight' },
  ],

  // synthesis
  [
    /^font-synthesis-(.+)$/,
    ([_, s]) => ({ 'font-synthesis': s }),
    { autocomplete: 'font-synthesis-(none|weight|style|small-caps)' },
  ],

  // tracking
  [
    /^(?:font-)?tracking-(.+)$/,
    ([_, s], { theme }) => ({ 'letter-spacing': theme.letterSpacing?.[s] || handler.bracket.cssvar.global.rem(s) }),
    { autocomplete: 'tracking-$letterSpacing' },
  ],

  // word-spacing
  [
    /^(?:font-)?word-spacing-(.+)$/,
    ([, s], { theme }) => ({ 'word-spacing': theme.wordSpacing?.[s] || handler.bracket.cssvar.global.rem(s) }),
    { autocomplete: 'word-spacing-$wordSpacing' },
  ],
];

export const fontSmoothings: Rule[] = [
  ['antialiased', {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    'font-smoothing': 'grayscale',
  }],
  ['subpixel-antialiased', {
    '-webkit-font-smoothing': 'auto',
    '-moz-osx-font-smoothing': 'auto',
    'font-smoothing': 'auto',
  }],
];
