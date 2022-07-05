import type { Rule } from '@unocss/core';

import { GLOBAL_KEYWORDS, POSITION_MAP, colorResolver, handler, makeGlobalStaticRules } from '../utils';

export const VAR_EMPTY = ' ';

// display table included on table.ts
export const displays: Rule[] = [
  ['inline', { display: 'inline' }],
  ['block', { display: 'block' }],
  ['inline-block', { display: 'inline-block' }],
  ['contents', { display: 'contents' }],
  ['flow-root', { display: 'flow-root' }],
  ['list-item', { display: 'list-item' }],
  ['hidden', { display: 'none' }],
  [/^display-(.+)$/, ([_, c]) => ({ display: handler.bracket.cssvar.global(c) || c })],
];

export const appearances: Rule[] = [
  ['visible', { visibility: 'visible' }],
  ['invisible', { visibility: 'hidden' }],
  ['backface-visible', { 'backface-visibility': 'visible' }],
  ['backface-hidden', { 'backface-visibility': 'hidden' }],
  ...makeGlobalStaticRules('backface', 'backface-visibility'),
];

const cursorValues = ['auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out'];

export const cursors: Rule[] = [
  [/^cursor-(.+)$/, ([_, c]) => ({ cursor: handler.bracket.cssvar.global(c) })],
  ...cursorValues.map((v): Rule => [`cursor-${v}`, { cursor: v }]),
];

export const pointerEvents: Rule[] = [
  ['pointer-events-auto', { 'pointer-events': 'auto' }],
  ['pointer-events-none', { 'pointer-events': 'none' }],
  ...makeGlobalStaticRules('pointer-events'),
];

export const resizes: Rule[] = [
  ['resize-x', { resize: 'horizontal' }],
  ['resize-y', { resize: 'vertical' }],
  ['resize', { resize: 'both' }],
  ['resize-none', { resize: 'none' }],
  ...makeGlobalStaticRules('resize'),
];

export const userSelects: Rule[] = [
  ['select-auto', { 'user-select': 'auto' }],
  ['select-all', { 'user-select': 'all' }],
  ['select-text', { 'user-select': 'text' }],
  ['select-none', { 'user-select': 'none' }],
  ...makeGlobalStaticRules('select', 'user-select'),
];

export const contents: Rule[] = [
  [/^content-\[(.+)\]$/, ([_, v]) => ({ content: `"${v}"` })],
  [/^content-(\$.+)]$/, ([_, v]) => ({ content: handler.cssvar(v) })],
  ['content-empty', { content: '""' }],
  ['content-none', { content: '""' }],
];

const listStyles: Dictionary<string> = {
  'disc': 'disc',
  'circle': 'circle',
  'square': 'square',
  'decimal': 'decimal',
  'zero-decimal': 'decimal-leading-zero',
  'greek': 'lower-greek',
  'roman': 'lower-roman',
  'upper-roman': 'upper-roman',
  'alpha': 'lower-alpha',
  'upper-alpha': 'upper-alpha',
  'latin': 'lower-latin',
  'upper-latin': 'upper-latin',
};

export const listStyle: Rule[] = [
  // base
  [
    /^list-(.+?)(?:-(outside|inside))?$/,
    ([_, alias, position]) => {
      const style = listStyles[alias];
      if (style) {
        if (position) {
          return {
            'list-style-position': position,
            'list-style-type': style,
          };
        }
        return { 'list-style-type': style };
      }
    },
    { autocomplete: [`list-(${Object.keys(listStyles).join('|')})`, `list-(${Object.keys(listStyles).join('|')})-(outside|inside)`] },
  ],
  // styles
  ['list-outside', { 'list-style-position': 'outside' }],
  ['list-inside', { 'list-style-position': 'inside' }],
  ['list-none', { 'list-style-type': 'none' }],
  ...makeGlobalStaticRules('list', 'list-style-type'),
];

export const accents: Rule[] = [
  [/^accent-(.+)$/, colorResolver('accent-color', 'accent'), { autocomplete: 'accent-$colors' }],
  [
    /^accent-op(?:acity)?-?(.+)$/,
    ([_, d]) => ({ '--vin-accent-opacity': handler.bracket.percent(d) }),
    { autocomplete: ['accent-(op|opacity)', 'accent-(op|opacity)-<percent>'] },
  ],
];

export const carets: Rule[] = [
  [/^caret-(.+)$/, colorResolver('caret-color', 'caret'), { autocomplete: 'caret-$colors' }],
  [
    /^caret-op(?:acity)?-?(.+)$/,
    ([_, d]) => ({ '--vin-caret-opacity': handler.bracket.percent(d) }),
    { autocomplete: ['caret-(op|opacity)', 'caret-(op|opacity)-<percent>'] },
  ],
];

export const imageRenderings: Rule[] = [
  ['image-render-auto', { 'image-rendering': 'auto' }],
  ['image-render-edge', { 'image-rendering': 'crisp-edges' }],
  ['image-render-pixel', [
    ['-ms-interpolation-mode', 'nearest-neighbor'],
    ['image-rendering', '-webkit-optimize-contrast'],
    ['image-rendering', '-moz-crisp-edges'],
    ['image-rendering', '-o-pixelated'],
    ['image-rendering', 'pixelated'],
  ]],
];

export const overscrolls: Rule[] = [
  ['overscroll-auto', { 'overscroll-behavior': 'auto' }],
  ['overscroll-contain', { 'overscroll-behavior': 'contain' }],
  ['overscroll-none', { 'overscroll-behavior': 'none' }],
  ...makeGlobalStaticRules('overscroll', 'overscroll-behavior'),
  ['overscroll-x-auto', { 'overscroll-behavior-x': 'auto' }],
  ['overscroll-x-contain', { 'overscroll-behavior-x': 'contain' }],
  ['overscroll-x-none', { 'overscroll-behavior-x': 'none' }],
  ...makeGlobalStaticRules('overscroll-x', 'overscroll-behavior-x'),
  ['overscroll-y-auto', { 'overscroll-behavior-y': 'auto' }],
  ['overscroll-y-contain', { 'overscroll-behavior-y': 'contain' }],
  ['overscroll-y-none', { 'overscroll-behavior-y': 'none' }],
  ...makeGlobalStaticRules('overscroll-y', 'overscroll-behavior-y'),
];

export const scrollBehaviors: Rule[] = [
  ['scroll-auto', { 'scroll-behavior': 'auto' }],
  ['scroll-smooth', { 'scroll-behavior': 'smooth' }],
  ...makeGlobalStaticRules('scroll', 'scroll-behavior'),
];

export const hyphens: Rule[] = [
  ...['manual', 'auto', 'none', ...GLOBAL_KEYWORDS].map((keyword) => [`hyphens-${keyword}`, {
    '-webkit-hyphens': keyword,
    '-ms-hyphens': keyword,
    'hyphens': keyword,
  }] as Rule),
];

export const writingModes: Rule[] = [
  ['write-vertical-right', { 'writing-mode': 'vertical-rl' }],
  ['write-vertical-left', { 'writing-mode': 'vertical-lr' }],
  ['write-normal', { 'writing-mode': 'horizontal-tb' }],
  ...makeGlobalStaticRules('write', 'writing-mode'),
];

export const writingOrientations: Rule[] = [
  ['write-orient-mixed', { 'text-orientation': 'mixed' }],
  ['write-orient-sideways', { 'text-orientation': 'sideways' }],
  ['write-orient-upright', { 'text-orientation': 'upright' }],
  ...makeGlobalStaticRules('write-orient', 'text-orientation'),
];

export const screenReadersAccess: Rule[] = [
  [
    'sr-only', {
      'position': 'absolute',
      'width': '1px',
      'height': '1px',
      'padding': '0',
      'margin': '-1px',
      'overflow': 'hidden',
      'clip': 'rect(0,0,0,0)',
      'white-space': 'nowrap',
      'border-width': 0,
    },
  ],
  [
    'not-sr-only',
    {
      'position': 'static',
      'width': 'auto',
      'height': 'auto',
      'padding': '0',
      'margin': '0',
      'overflow': 'visible',
      'clip': 'auto',
      'white-space': 'normal',
    },
  ],
];

export const isolations: Rule[] = [
  ['isolate', { isolation: 'isolate' }],
  ['isolate-auto', { isolation: 'auto' }],
  ['isolation-auto', { isolation: 'auto' }],
];

export const objectPositions: Rule[] = [
  // object fit
  ['object-cover', { 'object-fit': 'cover' }],
  ['object-contain', { 'object-fit': 'contain' }],
  ['object-fill', { 'object-fit': 'fill' }],
  ['object-scale-down', { 'object-fit': 'scale-down' }],
  ['object-none', { 'object-fit': 'none' }],

  // object position
  [
    /^object-(.+)$/,
    ([_, d]) => {
      if (POSITION_MAP[d]) {
        return { 'object-position': POSITION_MAP[d] };
      }
      if (handler.bracketOfPosition(d) != null) {
        return { 'object-position': handler.bracketOfPosition(d)!.split(' ').map((e) => handler.position.fraction.auto.px.cssvar(e)).join(' ') };
      }
    },
    { autocomplete: `object-(${Object.keys(POSITION_MAP).join('|')})` },
  ],

];

export const backgroundBlendModes: Rule[] = [
  ['bg-blend-multiply', { 'background-blend-mode': 'multiply' }],
  ['bg-blend-screen', { 'background-blend-mode': 'screen' }],
  ['bg-blend-overlay', { 'background-blend-mode': 'overlay' }],
  ['bg-blend-darken', { 'background-blend-mode': 'darken' }],
  ['bg-blend-lighten', { 'background-blend-mode': 'lighten' }],
  ['bg-blend-color-dodge', { 'background-blend-mode': 'color-dodge' }],
  ['bg-blend-color-burn', { 'background-blend-mode': 'color-burn' }],
  ['bg-blend-hard-light', { 'background-blend-mode': 'hard-light' }],
  ['bg-blend-soft-light', { 'background-blend-mode': 'soft-light' }],
  ['bg-blend-difference', { 'background-blend-mode': 'difference' }],
  ['bg-blend-exclusion', { 'background-blend-mode': 'exclusion' }],
  ['bg-blend-hue', { 'background-blend-mode': 'hue' }],
  ['bg-blend-saturation', { 'background-blend-mode': 'saturation' }],
  ['bg-blend-color', { 'background-blend-mode': 'color' }],
  ['bg-blend-luminosity', { 'background-blend-mode': 'luminosity' }],
  ['bg-blend-normal', { 'background-blend-mode': 'normal' }],
  ...makeGlobalStaticRules('bg-blend', 'background-blend'),
];

export const mixBlendModes: Rule[] = [
  ['mix-blend-multiply', { 'mix-blend-mode': 'multiply' }],
  ['mix-blend-screen', { 'mix-blend-mode': 'screen' }],
  ['mix-blend-overlay', { 'mix-blend-mode': 'overlay' }],
  ['mix-blend-darken', { 'mix-blend-mode': 'darken' }],
  ['mix-blend-lighten', { 'mix-blend-mode': 'lighten' }],
  ['mix-blend-color-dodge', { 'mix-blend-mode': 'color-dodge' }],
  ['mix-blend-color-burn', { 'mix-blend-mode': 'color-burn' }],
  ['mix-blend-hard-light', { 'mix-blend-mode': 'hard-light' }],
  ['mix-blend-soft-light', { 'mix-blend-mode': 'soft-light' }],
  ['mix-blend-difference', { 'mix-blend-mode': 'difference' }],
  ['mix-blend-exclusion', { 'mix-blend-mode': 'exclusion' }],
  ['mix-blend-hue', { 'mix-blend-mode': 'hue' }],
  ['mix-blend-saturation', { 'mix-blend-mode': 'saturation' }],
  ['mix-blend-color', { 'mix-blend-mode': 'color' }],
  ['mix-blend-luminosity', { 'mix-blend-mode': 'luminosity' }],
  ['mix-blend-plus-lighter', { 'mix-blend-mode': 'plus-lighter' }],
  ['mix-blend-normal', { 'mix-blend-mode': 'normal' }],
  ...makeGlobalStaticRules('mix-blend'),
];
