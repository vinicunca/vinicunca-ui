import type { CSSValues, Rule, RuleContext } from '@unocss/core';
import type { Theme } from '../theme';

import { POSITION_MAP, XYZ_MAP, handler, makeGlobalStaticRules } from '../utils';

export const transformBase = {
  // transform
  '--vin-rotate': 0,
  '--vin-rotate-x': 0,
  '--vin-rotate-y': 0,
  '--vin-rotate-z': 0,
  '--vin-scale-x': 1,
  '--vin-scale-y': 1,
  '--vin-scale-z': 1,
  '--vin-skew-x': 0,
  '--vin-skew-y': 0,
  '--vin-translate-x': 0,
  '--vin-translate-y': 0,
  '--vin-translate-z': 0,
};

const transformValues = [
  'translate',
  'rotate',
  'scale',
];

const transformCpu = [
  'translateX(var(--vin-translate-x))',
  'translateY(var(--vin-translate-y))',
  'translateZ(var(--vin-translate-z))',
  'rotate(var(--vin-rotate))',
  'rotateX(var(--vin-rotate-x))',
  'rotateY(var(--vin-rotate-y))',
  'rotateZ(var(--vin-rotate-z))',
  'skewX(var(--vin-skew-x))',
  'skewY(var(--vin-skew-y))',
  'scaleX(var(--vin-scale-x))',
  'scaleY(var(--vin-scale-y))',
  'scaleZ(var(--vin-scale-z))',
].join(' ');

const transformGpu = [
  'translate3d(var(--vin-translate-x), var(--vin-translate-y), var(--vin-translate-z))',
  'rotate(var(--vin-rotate))',
  'rotateX(var(--vin-rotate-x))',
  'rotateY(var(--vin-rotate-y))',
  'rotateZ(var(--vin-rotate-z))',
  'skewX(var(--vin-skew-x))',
  'skewY(var(--vin-skew-y))',
  'scaleX(var(--vin-scale-x))',
  'scaleY(var(--vin-scale-y))',
  'scaleZ(var(--vin-scale-z))',
].join(' ');

export const transforms: Rule[] = [
  // origins
  [
    /^(?:transform-)?origin-(.+)$/,
    ([_, s]) => ({ 'transform-origin': POSITION_MAP[s] ?? handler.bracket.cssvar(s) }),
    { autocomplete: [`transform-origin-(${Object.keys(POSITION_MAP).join('|')})`, `origin-(${Object.keys(POSITION_MAP).join('|')})`] },
  ],

  // perspectives
  [
    /^(?:transform-)?perspect(?:ive)?-(.+)$/,
    ([_, s]) => {
      const v = handler.bracket.cssvar.px.numberWithUnit(s);
      if (v != null) {
        return {
          '-webkit-perspective': v,
          'perspective': v,
        };
      }
    },
  ],

  // skip 1 & 2 letters shortcut
  [/^(?:transform-)?perspect(?:ive)?-origin-(.+)$/,
    ([_, s]) => {
      const v = handler.bracket.cssvar(s) ?? (s.length >= 3 ? POSITION_MAP[s] : undefined);
      if (v != null) {
        return {
          '-webkit-perspective-origin': v,
          'perspective-origin': v,
        };
      }
    }],

  // modifiers
  [/^(?:transform-)?translate-()(.+)$/, handleTranslate],
  [/^(?:transform-)?translate-([xyz])-(.+)$/, handleTranslate],
  [/^(?:transform-)?rotate-()(.+)$/, handleRotate],
  [/^(?:transform-)?rotate-([xyz])-(.+)$/, handleRotate],
  [/^(?:transform-)?skew-([xy])-(.+)$/, handleSkew, { autocomplete: ['transform-skew-(x|y)-<percent>'] }],
  [/^(?:transform-)?scale-()(.+)$/, handleScale],
  [
    /^(?:transform-)?scale-([xyz])-(.+)$/,
    handleScale,
    { autocomplete: [`transform-(${transformValues.join('|')})-<percent>`, `transform-(${transformValues.join('|')})-(x|y|z)-<percent>`] },
  ],

  // style
  [/^(?:transform-)?preserve-3d$/, () => ({ 'transform-style': 'preserve-3d' })],
  [/^(?:transform-)?preserve-flat$/, () => ({ 'transform-style': 'flat' })],

  // base
  ['transform', { transform: transformCpu }],
  ['transform-cpu', { transform: transformCpu }],
  ['transform-gpu', { transform: transformGpu }],
  ['transform-none', { transform: 'none' }],
  ...makeGlobalStaticRules('transform'),
];

function handleTranslate([_, d, b]: string[], { theme }: RuleContext<Theme>): CSSValues | undefined {
  const v = theme.spacing?.[b] ?? handler.bracket.cssvar.fraction.rem(b);
  if (v != null) {
    return [
      ...XYZ_MAP[d].map((i): [string, string] => [`--vin-translate${i}`, v]),
      ['transform', transformCpu],
    ];
  }
}

function handleScale([_, d, b]: string[]): CSSValues | undefined {
  const v = handler.bracket.cssvar.fraction.percent(b);
  if (v != null) {
    return [
      ...XYZ_MAP[d].map((i): [string, string] => [`--vin-scale${i}`, v]),
      ['transform', transformCpu],
    ];
  }
}

function handleRotate([_, d = '', b]: string[]): CSSValues | undefined {
  const v = handler.bracket.cssvar.degree(b);
  if (v != null) {
    if (d) {
      return {
        '--vin-rotate': 0,
        [`--vin-rotate-${d}`]: v,
        'transform': transformCpu,
      };
    } else {
      return {
        '--vin-rotate-x': 0,
        '--vin-rotate-y': 0,
        '--vin-rotate-z': 0,
        '--vin-rotate': v,
        'transform': transformCpu,
      };
    }
  }
}

function handleSkew([_, d, b]: string[]): CSSValues | undefined {
  const v = handler.bracket.cssvar.degree(b);
  if (v != null) {
    return {
      [`--vin-skew-${d}`]: v,
      transform: transformCpu,
    };
  }
}
