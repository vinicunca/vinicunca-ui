import type { VariantHandler, VariantHandlerContext, VariantObject } from '@unocss/core';

import { escapeRegExp } from '@unocss/core';

export function variantMatcher(name: string, handler: (input: VariantHandlerContext) => Dictionary<any>): VariantObject {
  const re = new RegExp(`^${escapeRegExp(name)}[:-]`);
  return {
    name,
    match: (input: string): VariantHandler | undefined => {
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input, next) => next({
            ...input,
            ...handler(input),
          }),
        };
      }
    },
    autocomplete: `${name}:`,
  };
}

export function variantParentMatcher(name: string, parent: string): VariantObject {
  const re = new RegExp(`^${escapeRegExp(name)}[:-]`);
  return {
    name,
    match: (input: string): VariantHandler | undefined => {
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} $$ ` : ''}${parent}`,
          }),
        };
      }
    },
    autocomplete: `${name}:`,
  };
}

