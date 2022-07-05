import type { Preflight, PreflightContext } from '@unocss/core';
import type { Theme } from './theme';
import type { PresetVinicuncaOptions } from './presets';

import { entriesToCss } from '@unocss/core';

export function preflights(options: PresetVinicuncaOptions = {}): Preflight[] {
  return [
    {
      layer: 'preflights',
      getCSS(ctx: PreflightContext<Theme>) {
        if (ctx.theme.preflightBase) {
          const _brands: any = options.brands || {};

          const brandVars = Object.keys(_brands).reduce<any>((prev, acc) => {
            const _key = `--vin-brand-${acc}`;
            prev[_key] = _brands[acc];
            return prev;
          }, {});

          const variables = {
            ...brandVars,
            ...ctx.theme.varsBase,
          };

          const rootCss = entriesToCss(Object.entries(variables));
          const root = `:root{${rootCss}}`;

          const globalCss = entriesToCss(Object.entries(ctx.theme.preflightBase));
          const global = `*,::before,::after{${globalCss}}::backdrop{${globalCss}}`;

          return `${root}; ${global}`;
        }
      },
    },
  ];
}
