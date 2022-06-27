import type { CSSEntries, Rule, RuleContext } from '@unocss/core';
import type { Theme } from '../theme';

import { GLOBAL_KEYWORDS, INSET_MAP, handler } from '../utils';

export const positions: Rule[] = [
  [
    /^(?:position-)?(relative|absolute|fixed|sticky)$/,
    ([_, v]) => ({ position: v }),
  ],
  [
    /^(?:position-)([-\w]+)$/,
    ([_, v]) => GLOBAL_KEYWORDS.includes(v) ? { position: v } : undefined,
  ],
  [
    /^(?:position-)?(static)$/,
    ([_, v]) => ({ position: v }),
  ],
];

function handleInsetValue(v: string, { theme }: RuleContext<Theme>): string | number | undefined {
  return theme.spacing?.[v] ?? handler.bracket.cssvar.global.auto.fraction.rem(v);
}

function handleInsetValues([_, d, v]: string[], ctx: RuleContext): CSSEntries | undefined {
  const r = handleInsetValue(v, ctx);
  if (r != null && d in INSET_MAP) {
    return INSET_MAP[d].map((i) => [i.slice(1), r]);
  }
}

export const insets: Rule[] = [
  [
    /^(?:position-)?inset-(.+)$/,
    ([_, v], ctx) => ({ inset: handleInsetValue(v, ctx) }),
    {
      autocomplete: [
        'position-inset-<directions>-$spacing',
        'position-inset-(block|inline)-$spacing',
        'position-inset-(bs|be|is|ie)-$spacing',
        'position-(top|left|right|bottom)-$spacing',
      ],
    },
  ],
  [/^(?:position-)?inset-([xy])-(.+)$/, handleInsetValues],
  [/^(?:position-)?inset-([rltbse])-(.+)$/, handleInsetValues],
  [/^(?:position-)?inset-(block|inline)-(.+)$/, handleInsetValues],
  [/^(?:position-)?inset-([bi][se])-(.+)$/, handleInsetValues],
  [
    /^(?:position-)?(top|left|right|bottom)-(.+)$/,
    ([_, d, v], ctx) => ({ [d]: handleInsetValue(v, ctx) }),
  ],
];

export const zIndexes: Rule[] = [
  [
    /^z-(.+)$/,
    ([_, v]) => ({ 'z-index': handler.bracket.cssvar.global.auto.number(v) }),
    { autocomplete: 'z-<num>' },
  ],
];
