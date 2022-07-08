import type { CSSColorValue, Rule, RuleContext } from 'unocss';
import type { Theme } from '../theme';

import { GLOBAL_KEYWORDS, POSITION_MAP, colorOpacityToString, colorToString, handler, makeGlobalStaticRules, parseColor } from '../utils';

function bgGradientToValue(cssColor: CSSColorValue | undefined) {
  if (cssColor) {
    return colorToString(cssColor, 0);
  }

  return 'rgba(255,255,255,0)';
}

function bgGradientColorValue(mode: string, cssColor: CSSColorValue | undefined, color: string, alpha: any) {
  if (cssColor) {
    if (alpha != null) {
      return colorToString(cssColor, alpha);
    } else {
      return colorToString(cssColor, `var(--vin-${mode}-opacity, ${colorOpacityToString(cssColor)})`);
    }
  }

  return colorToString(color, alpha);
}

function bgGradientColorResolver(mode: 'from' | 'to' | 'via') {
  return ([_, body]: string[], { theme }: RuleContext<Theme>) => {
    const data = parseColor(body, theme);

    if (!data) {
      return;
    }

    const { alpha, color, cssColor } = data;

    if (!color) {
      return;
    }

    const colorString = bgGradientColorValue(mode, cssColor, color, alpha);

    switch (mode) {
      case 'from':
        return {
          '--vin-gradient-from': colorString,
          '--vin-gradient-to': bgGradientToValue(cssColor),
          '--vin-gradient-stops': 'var(--vin-gradient-from), var(--vin-gradient-to)',
        };
      case 'via':
        return {
          '--vin-gradient-to': bgGradientToValue(cssColor),
          '--vin-gradient-stops': `var(--vin-gradient-from), ${colorString}, var(--vin-gradient-to)`,
        };
      case 'to':
        return {
          '--vin-gradient-to': colorString,
        };
    }
  };
}

const bgUrlRE = /^\[url\(.+\)\]$/;
const bgLengthRE = /^\[length:.+\]$/;
const bgPositionRE = /^\[position:.+\]$/;

export const backgroundStyles: Rule[] = [
  [
    /^bg-(.+)$/,
    ([_, d]) => {
      if (bgUrlRE.test(d)) {
        return { '--vin-url': handler.bracket(d), 'background-image': 'var(--vin-url)' };
      }
      if (bgLengthRE.test(d) && handler.bracketOfLength(d) != null) {
        return { 'background-size': handler.bracketOfLength(d)!.split(' ').map((e) => handler.fraction.auto.px.cssvar(e)).join(' ') };
      }
      if (bgPositionRE.test(d) && handler.bracketOfPosition(d) != null) {
        return { 'background-position': handler.bracketOfPosition(d)!.split(' ').map((e) => handler.position.fraction.auto.px.cssvar(e)).join(' ') };
      }
    },
  ],

  // gradients
  [
    /^bg-gradient-(.+)$/,
    ([_, d]) => ({ '--vin-gradient': handler.bracket(d) }),
    {
      autocomplete: ['bg-gradient', 'bg-gradient-(from|to|via)', 'bg-gradient-(from|to|via)-$colors', 'bg-gradient-(from|to|via)-(op|opacity)', 'bg-gradient-(from|to|via)-(op|opacity)-<percent>'],
    },
  ],
  [/^(?:bg-gradient-)?stops-(\[.+\])$/, ([_, s]) => ({ '--vin-gradient-stops': handler.bracket(s) })],
  [/^(?:bg-gradient-)?from-(.+)$/, bgGradientColorResolver('from')],
  [/^(?:bg-gradient-)?via-(.+)$/, bgGradientColorResolver('via')],
  [/^(?:bg-gradient-)?to-(.+)$/, bgGradientColorResolver('to')],
  [/^(?:bg-gradient-)?from-op(?:acity)?-?(.+)$/, ([_, opacity]) => ({ '--vin-from-opacity': handler.bracket.percent(opacity) })],
  [/^(?:bg-gradient-)?via-op(?:acity)?-?(.+)$/, ([_, opacity]) => ({ '--vin-via-opacity': handler.bracket.percent(opacity) })],
  [/^(?:bg-gradient-)?to-op(?:acity)?-?(.+)$/, ([_, opacity]) => ({ '--vin-to-opacity': handler.bracket.percent(opacity) })],

  // images
  [
    /^bg-gradient-((?:repeating-)?(?:linear|radial|conic))$/,
    ([_, s]) => ({
      'background-image': `${s}-gradient(var(--vin-gradient, var(--vin-gradient-stops, rgba(255, 255, 255, 0))))`,
    }),
    { autocomplete: ['bg-gradient-repeating', 'bg-gradient-(linear|radial|conic)', 'bg-gradient-repeating-(linear|radial|conic)'] },
  ],
  // ignore any center position
  [
    /^bg-gradient-to-([rltb]{1,2})$/,
    ([_, d]) => {
      if (d in POSITION_MAP) {
        return {
          '--vin-gradient-shape': `to ${POSITION_MAP[d]}`,
          '--vin-gradient': 'var(--vin-gradient-shape), var(--vin-gradient-stops)',
          'background-image': 'linear-gradient(var(--vin-gradient))',
        };
      }
    },
    { autocomplete: `bg-gradient-to-(${Object.keys(POSITION_MAP).filter((k) => k.length <= 2 && Array.from(k).every((c) => 'rltb'.includes(c))).join('|')})` },
  ],
  [
    /^(?:bg-gradient-)?shape-(.+)$/,
    ([_, d]) => {
      const v = d in POSITION_MAP ? `to ${POSITION_MAP[d]}` : handler.bracket(d);
      if (v != null) {
        return {
          '--vin-gradient-shape': v,
          '--vin-gradient': 'var(--vin-gradient-shape), var(--vin-gradient-stops)',
        };
      }
    },
    { autocomplete: ['bg-gradient-shape', `bg-gradient-shape-(${Object.keys(POSITION_MAP).join('|')})`, `shape-(${Object.keys(POSITION_MAP).join('|')})`] },
  ],
  ['bg-none', { 'background-image': 'none' }],

  ['box-decoration-slice', { 'box-decoration-break': 'slice' }],
  ['box-decoration-clone', { 'box-decoration-break': 'clone' }],
  ...makeGlobalStaticRules('box-decoration', 'box-decoration-break'),

  // size
  ['bg-auto', { 'background-size': 'auto' }],
  ['bg-cover', { 'background-size': 'cover' }],
  ['bg-contain', { 'background-size': 'contain' }],

  // attachments
  ['bg-fixed', { 'background-attachment': 'fixed' }],
  ['bg-local', { 'background-attachment': 'local' }],
  ['bg-scroll', { 'background-attachment': 'scroll' }],

  // clips
  ['bg-clip-border', { '-webkit-background-clip': 'border-box', 'background-clip': 'border-box' }],
  ['bg-clip-content', { '-webkit-background-clip': 'content-box', 'background-clip': 'content-box' }],
  ['bg-clip-padding', { '-webkit-background-clip': 'padding-box', 'background-clip': 'padding-box' }],
  ['bg-clip-text', { '-webkit-background-clip': 'text', 'background-clip': 'text' }],
  ...GLOBAL_KEYWORDS.map((keyword) => [`bg-clip-${keyword}`, {
    '-webkit-background-clip': keyword,
    'background-clip': keyword,
  }] as Rule),

  // positions
  // skip 1 & 2 letters shortcut
  [/^bg-([-\w]{3,})$/, ([_, s]) => ({ 'background-position': POSITION_MAP[s] })],

  // repeats
  ['bg-repeat', { 'background-repeat': 'repeat' }],
  ['bg-no-repeat', { 'background-repeat': 'no-repeat' }],
  ['bg-repeat-x', { 'background-repeat': 'repeat-x' }],
  ['bg-repeat-y', { 'background-repeat': 'repeat-y' }],
  ['bg-repeat-round', { 'background-repeat': 'round' }],
  ['bg-repeat-space', { 'background-repeat': 'space' }],
  ...makeGlobalStaticRules('bg-repeat', 'background-repeat'),

  // origins
  ['bg-origin-border', { 'background-origin': 'border-box' }],
  ['bg-origin-padding', { 'background-origin': 'padding-box' }],
  ['bg-origin-content', { 'background-origin': 'content-box' }],
  ...makeGlobalStaticRules('bg-origin', 'background-origin'),
];
