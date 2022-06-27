import type { Rule } from '@unocss/core';
import type { Theme } from '../theme';

import { handler, resolveBreakpoints, resolveVerticalBreakpoints } from '../utils';

export const sizes: Rule<Theme>[] = [
  [
    /^(min-|max-)?([wh])-?(.+)$/,
    ([_, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme, s) }),
    {
      autocomplete: [
        '(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
        '(max|min)-(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
      ],
    },
  ],
  [
    /^(min-|max-)?(block|inline)-(.+)$/,
    ([_, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme, s) }),
    {
      autocomplete: [
        '(w|h)-(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
        '(max|min)-(w|h)-(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
      ],
    },
  ],
  [
    /^(min-|max-)?(h)-screen-(.+)$/,
    ([_, m, w, s], context) => ({ [getPropName(m, w)]: resolveVerticalBreakpoints(context)?.[s] }),
    { autocomplete: ['h-screen-$verticalBreakpoints', '(min|max)-h-screen-$verticalBreakpoints'] },
  ],
  [
    /^(min-|max-)?(w)-screen-(.+)$/,
    ([_, m, w, s], context) => ({ [getPropName(m, w)]: resolveBreakpoints(context)?.[s] }),
    { autocomplete: ['w-screen-$breakpoints', '(min|max)-w-screen-$breakpoints'] },
  ],
];

const SIZE_MAPPING: Dictionary<string> = {
  h: 'height',
  w: 'width',
  inline: 'inline-size',
  block: 'block-size',
};

function getPropName(minmax: string, hw: string) {
  return `${minmax || ''}${SIZE_MAPPING[hw]}`;
}

type SizeProps = 'width' | 'height' | 'maxWidth' | 'maxHeight' | 'minWidth' | 'minHeight' | 'inlineSize' | 'blockSize' | 'maxInlineSize' | 'maxBlockSize' | 'minInlineSize' | 'minBlockSize';

function getSizeValue(minmax: string, hw: string, theme: Theme, prop: string) {
  const str = getPropName(minmax, hw).replace(/-(\w)/g, (_, p) => p.toUpperCase()) as SizeProps;
  const v = theme[str]?.[prop];
  if (v != null) {
    return v;
  }

  switch (prop) {
    case 'fit':
    case 'max':
    case 'min':
      return `${prop}-content`;
  }

  return handler.bracket.cssvar.global.auto.fraction.rem(prop);
}

export const aspectRatio: Rule[] = [
  [
    /^aspect-(?:ratio-)?(.+)$/,
    ([_, d]: string[]) => ({ 'aspect-ratio': getAspectRatio(d) }),
    { autocomplete: ['aspect-(square|video)', 'aspect-ratio-(square|video)'] },
  ],
];

function getAspectRatio(prop: string) {
  if (/^\d+\/\d+$/.test(prop)) {
    return prop;
  }

  switch (prop) {
    case 'square': return '1/1';
    case 'video': return '16/9';
  }

  return handler.bracket.cssvar.global.auto.number(prop);
}
