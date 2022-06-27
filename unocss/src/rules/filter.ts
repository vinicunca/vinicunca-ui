import type { CSSValues, Rule, RuleContext } from '@unocss/core';
import type { Theme } from '../theme';

import { colorResolver, colorableShadows, globalKeywords, handler } from '@unocss/preset-mini/utils';

import { VAR_EMPTY } from './static';

export const filterBase = {
  '--vin-blur': VAR_EMPTY,
  '--vin-brightness': VAR_EMPTY,
  '--vin-contrast': VAR_EMPTY,
  '--vin-drop-shadow': VAR_EMPTY,
  '--vin-grayscale': VAR_EMPTY,
  '--vin-hue-rotate': VAR_EMPTY,
  '--vin-invert': VAR_EMPTY,
  '--vin-saturate': VAR_EMPTY,
  '--vin-sepia': VAR_EMPTY,
};
const filterProperty = 'var(--vin-blur) var(--vin-brightness) var(--vin-contrast) var(--vin-drop-shadow) var(--vin-grayscale) var(--vin-hue-rotate) var(--vin-invert) var(--vin-saturate) var(--vin-sepia)';

export const backdropFilterBase = {
  '--vin-backdrop-blur': VAR_EMPTY,
  '--vin-backdrop-brightness': VAR_EMPTY,
  '--vin-backdrop-contrast': VAR_EMPTY,
  '--vin-backdrop-grayscale': VAR_EMPTY,
  '--vin-backdrop-hue-rotate': VAR_EMPTY,
  '--vin-backdrop-invert': VAR_EMPTY,
  '--vin-backdrop-opacity': VAR_EMPTY,
  '--vin-backdrop-saturate': VAR_EMPTY,
  '--vin-backdrop-sepia': VAR_EMPTY,
};
const backdropFilterProperty = 'var(--vin-backdrop-blur) var(--vin-backdrop-brightness) var(--vin-backdrop-contrast) var(--vin-backdrop-grayscale) var(--vin-backdrop-hue-rotate) var(--vin-backdrop-invert) var(--vin-backdrop-opacity) var(--vin-backdrop-saturate) var(--vin-backdrop-sepia)';

export const filters: Rule<Theme>[] = [
  // filters
  [
    /^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/,
    toFilter('blur', (s, theme) => theme.blur?.[s || 'DEFAULT'] || handler.bracket.cssvar.px(s)),
    { autocomplete: ['(backdrop|filter)-blur-$blur', 'blur-$blur'] },
  ],
  [
    /^(?:(backdrop-)|filter-)?brightness-(.+)$/,
    toFilter('brightness', (s) => handler.bracket.cssvar.percent(s)),
    { autocomplete: ['(backdrop|filter)-brightness-<percent>', 'brightness-<percent>'] },
  ],
  [
    /^(?:(backdrop-)|filter-)?contrast-(.+)$/,
    toFilter('contrast', (s) => handler.bracket.cssvar.percent(s)),
    { autocomplete: ['(backdrop|filter)-contrast-<percent>', 'contrast-<percent>'] },
  ],
  // drop-shadow only on filter
  [
    /^(?:filter-)?drop-shadow(?:-(.+))?$/, dropShadowResolver, {
      autocomplete: [
        'filter-drop',
        'filter-drop-shadow',
        'filter-drop-shadow-color',
        'drop-shadow',
        'drop-shadow-color',
        'filter-drop-shadow-$dropShadow',
        'drop-shadow-$dropShadow',
        'filter-drop-shadow-color-$colors',
        'drop-shadow-color-$colors',
        'filter-drop-shadow-color-(op|opacity)',
        'drop-shadow-color-(op|opacity)',
        'filter-drop-shadow-color-(op|opacity)-<percent>',
        'drop-shadow-color-(op|opacity)-<percent>',
      ],
    },
  ],
  [
    /^(?:filter-)?drop-shadow-color-(.+)$/, colorResolver('--vin-drop-shadow-color', 'drop-shadow'),
  ],
  [
    /^(?:filter-)?drop-shadow-color-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--vin-drop-shadow-opacity': handler.bracket.percent(opacity) }),
  ],
  [
    /^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/, toFilter('grayscale', percentWithDefault), { autocomplete: ['(backdrop|filter)-grayscale', '(backdrop|filter)-grayscale-<percent>', 'grayscale-<percent>'] },
  ],
  [
    /^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/, toFilter('hue-rotate', (s) => handler.bracket.cssvar.degree(s)),
  ],
  [
    /^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/, toFilter('invert', percentWithDefault), { autocomplete: ['(backdrop|filter)-invert', '(backdrop|filter)-invert-<percent>', 'invert-<percent>'] },
  ],
  // opacity only on backdrop-filter
  [
    /^(backdrop-)op(?:acity)-(.+)$/, toFilter('opacity', (s) => handler.bracket.cssvar.percent(s)), { autocomplete: ['backdrop-(op|opacity)', 'backdrop-(op|opacity)-<percent>'] },
  ],
  [
    /^(?:(backdrop-)|filter-)?saturate-(.+)$/, toFilter('saturate', (s) => handler.bracket.cssvar.percent(s)), { autocomplete: ['(backdrop|filter)-saturate', '(backdrop|filter)-saturate-<percent>', 'saturate-<percent>'] },
  ],
  [
    /^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/, toFilter('sepia', percentWithDefault), { autocomplete: ['(backdrop|filter)-sepia', '(backdrop|filter)-sepia-<percent>', 'sepia-<percent>'] },
  ],

  // base
  ['filter', { filter: filterProperty }],
  ['backdrop-filter', {
    '-webkit-backdrop-filter': backdropFilterProperty,
    'backdrop-filter': backdropFilterProperty,
  }],

  // nones
  ['filter-none', { filter: 'none' }],
  ['backdrop-filter-none', {
    '-webkit-backdrop-filter': 'none',
    'backdrop-filter': 'none',
  }],

  ...globalKeywords.map((keyword) => [`filter-${keyword}`, { filter: keyword }] as Rule),
  ...globalKeywords.map((keyword) => [`backdrop-filter-${keyword}`, {
    '-webkit-backdrop-filter': keyword,
    'backdrop-filter': keyword,
  }] as Rule),
];

function toFilter(varName: string, resolver: (str: string, theme: Theme) => string | undefined) {
  return ([_, b, s]: string[], { theme }: RuleContext<Theme>): CSSValues | undefined => {
    const value = resolver(s, theme) ?? (s === 'none' ? '0' : '');
    if (value !== '') {
      if (b) {
        return {
          [`--vin-${b}${varName}`]: `${varName}(${value})`,
          '-webkit-backdrop-filter': backdropFilterProperty,
          'backdrop-filter': backdropFilterProperty,
        };
      } else {
        return {
          [`--vin-${varName}`]: `${varName}(${value})`,
          filter: filterProperty,
        };
      }
    }
  };
}

function dropShadowResolver([_, s]: string[], { theme }: RuleContext<Theme>) {
  let v = theme.dropShadow?.[s || 'DEFAULT'];

  if (v != null) {
    const shadows = colorableShadows(v, '--vin-drop-shadow-color');
    return {
      '--vin-drop-shadow': `drop-shadow(${shadows.join(') drop-shadow(')})`,
      'filter': filterProperty,
    };
  }

  v = handler.bracket.cssvar(s);
  if (v != null) {
    return {
      '--vin-drop-shadow': `drop-shadow(${v})`,
      'filter': filterProperty,
    };
  }
}

function percentWithDefault(str?: string) {
  let v = handler.bracket.cssvar(str || '');
  if (v != null) {
    return v;
  }

  v = str ? handler.percent(str) : '1';
  if (v != null && parseFloat(v) <= 1) {
    return v;
  }
}
