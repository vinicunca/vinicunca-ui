import type { Rule } from 'unocss';

import { GLOBAL_KEYWORDS } from '../utils/mappings';

const verticalAlignAlias: Dictionary<string> = {
  'mid': 'middle',
  'base': 'baseline',
  'btm': 'bottom',
  'baseline': 'baseline',
  'top': 'top',
  'middle': 'middle',
  'bottom': 'bottom',
  'text-top': 'text-top',
  'text-bottom': 'text-bottom',
  'sub': 'sub',
  'super': 'super',
  ...Object.fromEntries(GLOBAL_KEYWORDS.map((x) => [x, x])),
};

export const verticalAligns: Rule[] = [
  [
    /^(?:vertical|align)-([-\w]+)$/,
    ([_, v]) => ({ 'vertical-align': verticalAlignAlias[v] }),
    { autocomplete: `(vertical|align)-(${Object.keys(verticalAlignAlias).join('|')})` },
  ],
];

export const textAligns: Rule[] = ['center', 'left', 'right', 'justify', 'start', 'end', ...GLOBAL_KEYWORDS].map((v) => [`text-${v}`, { 'text-align': v }]);
