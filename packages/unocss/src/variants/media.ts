import type { Variant, VariantContext, VariantObject } from 'unocss';
import type { Theme } from '../theme';

import { variantParentMatcher } from '../utils';

export const variantPrint: Variant = variantParentMatcher('print', '@media print');

export const variantCustomMedia: VariantObject = {
  name: 'media',
  match(matcher, { theme }: VariantContext<Theme>) {
    const match = matcher.match(/^media-([_\d\w]+)[:-]/);
    if (match) {
      const media = theme.media?.[match[1]] ?? `(--${match[1]})`;
      return {
        matcher: matcher.slice(match[0].length),
        handle: (input, next) => next({
          ...input,
          parent: `${input.parent ? `${input.parent} $$ ` : ''}@media ${media}`,
        }),
      };
    }
  },
  multiPass: true,
};

export const variantContrasts: Variant[] = [
  variantParentMatcher('contrast-more', '@media (prefers-contrast: more)'),
  variantParentMatcher('contrast-less', '@media (prefers-contrast: less)'),
];

export const variantMotions: Variant[] = [
  variantParentMatcher('motion-reduce', '@media (prefers-reduced-motion: reduce)'),
  variantParentMatcher('motion-safe', '@media (prefers-reduced-motion: no-preference)'),
];

export const variantOrientations: Variant[] = [
  variantParentMatcher('landscape', '@media (orientation: landscape)'),
  variantParentMatcher('portrait', '@media (orientation: portrait)'),
];
