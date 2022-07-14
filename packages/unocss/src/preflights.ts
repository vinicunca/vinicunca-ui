import type { Preflight, PreflightContext } from 'unocss';
import type { Theme, ThemeTokens } from './theme';

import { entriesToCss } from 'unocss';

export function preflights(): Preflight[] {
  return [
    {
      layer: 'preflights',
      getCSS(ctx: PreflightContext<Theme>) {
        const { theme } = ctx;
        if (theme.preflightBase) {
          return generateVariables(theme);
        }
      },
    },
  ];
}

function generateVariables(theme: Theme) {
  const lightTokens = theme.tokens?.light;
  const lightVariables = {
    ...remapTokenVariables('brands', lightTokens?.brands ?? {}),
    ...remapTokenVariables('textColors', lightTokens?.textColors ?? {}),
  };

  const darkTokens = theme.tokens?.dark;
  const darkVariables = {
    ...remapTokenVariables('brands', darkTokens?.brands ?? {}),
    ...remapTokenVariables('textColors', darkTokens?.textColors ?? {}),
  };

  const lightCss = entriesToCss(Object.entries(lightVariables));
  const darkCss = entriesToCss(Object.entries(darkVariables));
  const root = `
    :root {
      color-scheme: light;
      ${lightCss}
    }

    html.dark {
      color-scheme: dark;
      ${darkCss}
    }
  `;

  const globalCss = entriesToCss(Object.entries(theme.preflightBase!));
  const global = `*,::before,::after{${globalCss}}::backdrop{${globalCss}}`;

  return `${root} ${global}`;
}

function remapTokenVariables(key: 'brands' | 'textColors', token: ThemeTokens['brands' | 'textColors']) {
  const name = key === 'brands' ? 'brand' : 'text-color';
  return Object.keys(token).reduce<any>((prev, acc) => {
    const _key = `--vin-${name}-${acc}`;
    prev[_key] = token[acc];
    return prev;
  }, {});
}
