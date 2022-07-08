import type { CSSEntries, CSSObject, Rule, RuleContext } from 'unocss';
import type { Theme } from '../theme';

import { CORNER_MAP, DIRECTION_MAP, GLOBAL_KEYWORDS, colorOpacityToString, colorToString, handler, hasParseableColor, parseColor } from '../utils';

export const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none', 'groove', 'ridge', 'inset', 'outset', ...GLOBAL_KEYWORDS];

export const borders: Rule[] = [
  // compound
  [/^(?:border)()(?:-(.+))?$/, handlerBorder, { autocomplete: '(border)-<directions>' }],
  [/^(?:border)-([xy])(?:-(.+))?$/, handlerBorder],
  [/^(?:border)-([rltbse])(?:-(.+))?$/, handlerBorder],
  [/^(?:border)-(block|inline)(?:-(.+))?$/, handlerBorder],
  [/^(?:border)-([bi][se])(?:-(.+))?$/, handlerBorder],

  // size
  [/^(?:border)-()(?:width|size)-(.+)$/, handlerBorderSize, { autocomplete: ['(border)-<num>', '(border)-<directions>-<num>'] }],
  [/^(?:border)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize],

  // colors
  [/^(?:border)-()(?:color-)?(.+)$/, handlerBorderColor, { autocomplete: ['(border)-$colors', '(border)-<directions>-$colors'] }],
  [/^(?:border)-([xy])-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColor],

  // opacity
  [/^(?:border)-()op(?:acity)?-?(.+)$/, handlerBorderOpacity, { autocomplete: '(border)-(op|opacity)-<percent>' }],
  [/^(?:border)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],

  // radius
  [
    /^(?:border--)?(?:rounded|rd)()(?:-(.+))?$/,
    handlerRounded,
    { autocomplete: ['(border)-(rounded|rd)', '(border)-(rounded|rd)-<num>', '(rounded|rd)', '(rounded|rd)-<num>'] },
  ],
  [/^(?:border--)?(?:rounded|rd)-([rltb])(?:-(.+))?$/, handlerRounded],
  [/^(?:border--)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
  [/^(?:border--)?(?:rounded|rd)-([bi][se])(?:-(.+))?$/, handlerRounded],
  [/^(?:border--)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded],

  // style
  [
    /^(?:border)-(?:style-)?()(.+)$/,
    handlerBorderStyle,
    {
      autocomplete: [
        '(border)-style',
        `(border)-(${borderStyles.join('|')})`,
        '(border)-<directions>-style',
        `(border)-<directions>-(${borderStyles.join('|')})`,
        `(border)-<directions>-style-(${borderStyles.join('|')})`,
        `(border)-style-(${borderStyles.join('|')})`,
      ],
    },
  ],
  [/^(?:border)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle],
];

function handlerBorder(m: string[], ctx: RuleContext): CSSEntries | undefined {
  const borderSizes = handlerBorderSize(m, ctx);
  const borderStyle = handlerBorderStyle(['', m[1], 'solid']);
  if (borderSizes && borderStyle) {
    return [
      ...borderSizes,
      ...borderStyle,
    ];
  }
}

function handlerBorderSize([_, a = '', b]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  const v = theme.lineWidth?.[b || 'DEFAULT'] ?? handler.bracket.cssvar.global.px(b || '1');
  if (a in DIRECTION_MAP && v != null) {
    return DIRECTION_MAP[a].map((dir) => [`border${dir}-width`, v]);
  }
}

export function handlerBorderStyle([_, a = '', s]: string[]): CSSEntries | undefined {
  if (borderStyles.includes(s) && a in DIRECTION_MAP) {
    return DIRECTION_MAP[a].map((dir) => [`border${dir}-style`, s]);
  }
}

function handlerBorderColor([_, a = '', c]: string[], { theme }: RuleContext<Theme>): CSSObject | undefined {
  if (a in DIRECTION_MAP && hasParseableColor(c, theme)) {
    return Object.assign(
      {},
      ...DIRECTION_MAP[a].map((i) => borderColorResolver(i)(['', c], theme)),
    );
  }
}

function borderColorResolver(direction: string) {
  return ([_, body]: string[], theme: Theme): CSSObject | undefined => {
    const data = parseColor(body, theme);

    if (!data) {
      return;
    }

    const { alpha, color, cssColor } = data;

    if (cssColor) {
      if (alpha != null) {
        return {
          [`border${direction}-color`]: colorToString(cssColor, alpha),
        };
      }
      if (direction === '') {
        return {
          '--vin-border-opacity': colorOpacityToString(cssColor),
          'border-color': colorToString(cssColor, 'var(--vin-border-opacity)'),
        };
      } else {
        return {
          // Separate this return since if `direction` is an empty string, the first key will be overwritten by the second.
          '--vin-border-opacity': colorOpacityToString(cssColor),
          [`--vin-border${direction}-opacity`]: 'var(--vin-border-opacity)',
          [`border${direction}-color`]: colorToString(cssColor, `var(--vin-border${direction}-opacity)`),
        };
      }
    } else if (color) {
      return {
        [`border${direction}-color`]: colorToString(color, alpha),
      };
    }
  };
}

function handlerBorderOpacity([_, a = '', opacity]: string[]): CSSEntries | undefined {
  const v = handler.bracket.percent(opacity);
  if (a in DIRECTION_MAP && v != null) {
    return DIRECTION_MAP[a].map((i) => [`--vin-border${i}-opacity`, v]);
  }
}

function handlerRounded([_, a = '', s]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  const v = theme.borderRadius?.[s || 'DEFAULT'] || handler.bracket.cssvar.global.fraction.rem(s || '1');
  if (a in CORNER_MAP && v != null) {
    return CORNER_MAP[a].map((i) => [`border${i}-radius`, v]);
  }
}
