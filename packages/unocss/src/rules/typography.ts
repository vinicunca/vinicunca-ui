import type { CSSObject, Rule } from 'unocss';
import type { Theme } from '../theme';

import { toArray } from '@vinicunca/js-utilities';

import { GLOBAL_KEYWORDS, colorResolver, colorableShadows, handler, makeGlobalStaticRules } from '../utils';
import { VAR_EMPTY } from './static';

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
    ([_, s]) => ({ 'font-weight': WEIGHT_MAP[s] || handler.global.number(s) }),
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
    ([_, s], { theme }) => ({ 'word-spacing': theme.wordSpacing?.[s] || handler.bracket.cssvar.global.rem(s) }),
    { autocomplete: 'word-spacing-$wordSpacing' },
  ],
];

export const tabSizes: Rule<Theme>[] = [
  [
    /^tab(?:-(.+))?$/,
    ([_, s]) => {
      const v = handler.bracket.cssvar.global.number(s || '4');
      if (v != null) {
        return {
          '-moz-tab-size': v,
          '-o-tab-size': v,
          'tab-size': v,
        };
      }
    },
  ],
];

export const textIndents: Rule<Theme>[] = [
  [
    /^indent(?:-(.+))?$/,
    ([_, s], { theme }) => ({ 'text-indent': theme.textIndent?.[s || 'DEFAULT'] || handler.bracket.cssvar.global.fraction.rem(s) }),
    { autocomplete: 'indent-$textIndent' },
  ],
];

export const textStrokes: Rule<Theme>[] = [
  // widths
  [
    /^text-stroke(?:-(.+))?$/,
    ([_, s], { theme }) => ({ '-webkit-text-stroke-width': theme.textStrokeWidth?.[s || 'DEFAULT'] || handler.bracket.cssvar.px(s) }),
    { autocomplete: 'text-stroke-$textStrokeWidth' },
  ],

  // colors
  [
    /^text-stroke-(.+)$/, colorResolver('-webkit-text-stroke-color', 'text-stroke'), { autocomplete: 'text-stroke-$colors' },
  ],
  [
    /^text-stroke-op(?:acity)?-?(.+)$/,
    ([_, opacity]) => ({ '--vin-text-stroke-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: 'text-stroke-(op|opacity)-<percent>' },
  ],
];

export const textShadows: Rule<Theme>[] = [
  [
    /^text-shadow(?:-(.+))?$/,
    ([_, s], { theme }) => {
      const v = theme.textShadow?.[s || 'DEFAULT'];
      if (v != null) {
        return {
          '--vin-text-shadow': colorableShadows(v, '--vin-text-shadow-color').join(','),
          'text-shadow': 'var(--vin-text-shadow)',
        };
      }
      return { 'text-shadow': handler.bracket.cssvar.global(s) };
    },
    { autocomplete: 'text-shadow-$textShadow' },
  ],

  // colors
  [
    /^text-shadow-color-(.+)$/, colorResolver('--vin-text-shadow-color', 'text-shadow'), { autocomplete: 'text-shadow-color-$colors' },
  ],
  [
    /^text-shadow-color-op(?:acity)?-?(.+)$/, ([_, opacity]) => ({ '--vin-text-shadow-opacity': handler.bracket.percent(opacity) }), { autocomplete: 'text-shadow-color-(op|opacity)-<percent>' },
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

const decorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy', ...GLOBAL_KEYWORDS];

export const textDecorations: Rule<Theme>[] = [
  [
    /^(?:decoration-)?(underline|overline|line-through)$/,
    ([_, s]) => ({ 'text-decoration-line': s }),
    { autocomplete: 'decoration-(underline|overline|line-through)' },
  ],

  // size
  [
    /^(?:underline|decoration)-(?:size-)?(.+)$/,
    ([_, s], { theme }) => ({ 'text-decoration-thickness': theme.lineWidth?.[s] ?? handler.bracket.cssvar.global.px(s) }),
    { autocomplete: '(underline|decoration)-<num>' },
  ],
  [
    /^(?:underline|decoration)-(auto|from-font)$/,
    ([_, s]) => ({ 'text-decoration-thickness': s }),
    { autocomplete: '(underline|decoration)-(auto|from-font)' },
  ],

  // colors
  [
    /^(?:underline|decoration)-(.+)$/,
    (match, ctx) => {
      const result = colorResolver('text-decoration-color', 'line')(match, ctx) as CSSObject | undefined;
      if (result) {
        return {
          '-webkit-text-decoration-color': result['text-decoration-color'],
          ...result,
        };
      }
    },
    { autocomplete: '(underline|decoration)-$colors' },
  ],
  [
    /^(?:underline|decoration)-op(?:acity)?-?(.+)$/,
    ([_, opacity]) => ({ '--vin-line-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: '(underline|decoration)-(op|opacity)-<percent>' },
  ],

  // offset
  [
    /^(?:underline|decoration)-offset-(.+)$/,
    ([_, s], { theme }) => ({ 'text-underline-offset': theme.lineWidth?.[s] ?? handler.auto.bracket.cssvar.global.px(s) }),
    { autocomplete: '(underline|decoration)-(offset)-<num>' },
  ],

  // style
  ...decorationStyles.map((v) => [`underline-${v}`, { 'text-decoration-style': v }] as Rule<Theme>),
  ...decorationStyles.map((v) => [`decoration-${v}`, { 'text-decoration-style': v }] as Rule<Theme>),
  ['no-underline', { 'text-decoration': 'none' }],
  ['decoration-none', { 'text-decoration': 'none' }],
];

export const whitespaces: Rule[] = [
  [
    /^(?:whitespace-|ws-)([-\w]+)$/,
    ([_, v]) => ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces', ...GLOBAL_KEYWORDS].includes(v) ? { 'white-space': v } : undefined,
    { autocomplete: '(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)' },
  ],
];

export const wordBreaks: Rule[] = [
  ['break-normal', { 'overflow-wrap': 'normal', 'word-break': 'normal' }],
  ['break-words', { 'overflow-wrap': 'break-word' }],
  ['break-all', { 'word-break': 'break-all' }],
];

export const textOverflows: Rule[] = [
  ['truncate', { 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }],
  ['text-ellipsis', { 'text-overflow': 'ellipsis' }],
  ['text-clip', { 'text-overflow': 'clip' }],
];

export const textTransforms: Rule[] = [
  ['uppercase', { 'text-transform': 'uppercase' }],
  ['lowercase', { 'text-transform': 'lowercase' }],
  ['capitalize', { 'text-transform': 'capitalize' }],
  ['case-normal', { 'text-transform': 'none' }],
  ...makeGlobalStaticRules('case', 'text-transform'),
];

export const fontStyles: Rule[] = [
  ['italic', { 'font-style': 'italic' }],
  ['not-italic', { 'font-style': 'normal' }],
  ['font-italic', { 'font-style': 'italic' }],
  ['font-not-italic', { 'font-style': 'normal' }],
  ['oblique', { 'font-style': 'oblique' }],
  ['not-oblique', { 'font-style': 'normal' }],
  ['font-oblique', { 'font-style': 'oblique' }],
  ['font-not-oblique', { 'font-style': 'normal' }],
];

export const fontVariantNumericBase = {
  '--vin-ordinal': VAR_EMPTY,
  '--vin-slashed-zero': VAR_EMPTY,
  '--vin-numeric-figure': VAR_EMPTY,
  '--vin-numeric-spacing': VAR_EMPTY,
  '--vin-numeric-fraction': VAR_EMPTY,
};
const toEntries = (entry: any) => ({
  ...entry,
  'font-variant-numeric': 'var(--vin-ordinal) var(--vin-slashed-zero) var(--vin-numeric-figure) var(--vin-numeric-spacing) var(--vin-numeric-fraction)',
});

export const fontVariantNumeric: Rule[] = [
  [/^ordinal$/, () => toEntries({ '--vin-ordinal': 'ordinal' }), { autocomplete: 'ordinal' }],
  [/^slashed-zero$/, () => toEntries({ '--vin-slashed-zero': 'slashed-zero' }), { autocomplete: 'slashed-zero' }],
  [/^lining-nums$/, () => toEntries({ '--vin-numeric-figure': 'lining-nums' }), { autocomplete: 'lining-nums' }],
  [/^oldstyle-nums$/, () => toEntries({ '--vin-numeric-figure': 'oldstyle-nums' }), { autocomplete: 'oldstyle-nums' }],
  [/^proportional-nums$/, () => toEntries({ '--vin-numeric-spacing': 'proportional-nums' }), { autocomplete: 'proportional-nums' }],
  [/^tabular-nums$/, () => toEntries({ '--vin-numeric-spacing': 'tabular-nums' }), { autocomplete: 'tabular-nums' }],
  [/^diagonal-fractions$/, () => toEntries({ '--vin-numeric-fraction': 'diagonal-fractions' }), { autocomplete: 'diagonal-fractions' }],
  [/^stacked-fractions$/, () => toEntries({ '--vin-numeric-fraction': 'stacked-fractions' }), { autocomplete: 'stacked-fractions' }],
  ['normal-nums', { 'font-variant-numeric': 'normal' }],
];
