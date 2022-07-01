import type { Rule } from '@unocss/core';

import { handler } from '../utils';

const variablesAbbrMap: Dictionary<string> = {
  'backface': 'backface-visibility',
  'break': 'word-break',
  'case': 'text-transform',
  'content': 'align-content',
  'fw': 'font-weight',
  'items': 'align-items',
  'justify': 'justify-content',
  'select': 'user-select',
  'self': 'align-self',
  'vertical': 'vertical-align',
  'visible': 'visibility',
  'whitespace': 'white-space',
  'ws': 'white-space',
  'bg-blend': 'background-blend-mode',
  'bg-clip': '-webkit-background-clip',
  'bg-gradient': 'linear-gradient',
  'bg-image': 'background-image',
  'bg-origin': 'background-origin',
  'bg-position': 'background-position',
  'bg-repeat': 'background-repeat',
  'bg-size': 'background-size',
  'mix-blend': 'mix-blend-mode',
  'object': 'object-fit',
  'object-position': 'object-position',
  'write': 'writing-mode',
  'write-orient': 'text-orientation',
};

export const cssVariables: Rule[] = [
  [/^(.+?)-(\$.+)$/, ([_, name, varname]) => {
    const prop = variablesAbbrMap[name];
    if (prop) {
      return { [prop]: handler.cssvar(varname) };
    }
  }],
];

export const cssProperty: Rule[] = [
  [/^\[([\w_-]+):([^'"]+)\]$/, ([_, prop, value]) => ({ [prop]: handler.bracket(`[${value}]`) })],
];

