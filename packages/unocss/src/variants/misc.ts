import type { Variant } from 'unocss';

import { getComponent, handler } from '../utils';

export const variantSpaceAndDivide: Variant = (matcher) => {
  if (/^space-?([xy])-?(-?.+)$/.test(matcher) || /^divide-/.test(matcher)) {
    return {
      matcher,
      selector: (input) => {
        return `${input}>:not([hidden])~:not([hidden])`;
      },
    };
  }
};

export const variantSelector: Variant = {
  name: 'selector',
  match(matcher) {
    const match = matcher.match(/^selector-\[(.+?)\][:-]/);
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: () => match[1],
      };
    }
  },
};

export const variantCssLayer: Variant = {
  name: 'layer',
  match(matcher) {
    const match = matcher.match(/^layer-([_\d\w]+)[:-]/);
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        handle: (input, next) => next({
          ...input,
          parent: `${input.parent ? `${input.parent} $$ ` : ''}@layer ${match[1]}`,
        }),
      };
    }
  },
};

export const variantInternalLayer: Variant = {
  name: 'uno-layer',
  match(matcher) {
    const match = matcher.match(/^uno-layer-([_\d\w]+)[:-]/);
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        layer: match[1],
      };
    }
  },
};

export const variantScope: Variant = {
  name: 'scope',
  match(matcher) {
    const match = matcher.match(/^scope-([_\d\w]+)[:-]/);
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        selector: (s) => `.${match[1]} $$ ${s}`,
      };
    }
  },
};

export const variantVariables: Variant = {
  name: 'variables',
  match(matcher) {
    if (!matcher.startsWith('[')) {
      return;
    }

    const [match, rest] = getComponent(matcher, '[', ']', ':') ?? [];
    if (!(match && rest && rest !== '')) {
      return;
    }

    const variant = handler.bracket(match) ?? '';
    if (!(variant.startsWith('@') || variant.includes('&'))) {
      return;
    }

    return {
      matcher: rest,
      handle(input, next) {
        const updates = variant.startsWith('@')
          ? {
              parent: `${input.parent ? `${input.parent} $$ ` : ''}${variant}`,
            }
          : {
              selector: variant.replace(/&/g, input.selector),
            };
        return next({
          ...input,
          ...updates,
        });
      },
    };
  },
  multiPass: true,
};
