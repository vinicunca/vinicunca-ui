import type { Rule } from 'unocss';
import type { Theme } from '../theme';

import { GLOBAL_KEYWORDS, handler, makeGlobalStaticRules } from '../utils';

const transitionPropertyGroup: Dictionary<string> = {
  all: 'all',
  colors: ['color', 'background-color', 'border-color', 'text-decoration-color', 'fill', 'stroke'].join(','),
  none: 'none',
  opacity: 'opacity',
  shadow: 'box-shadow',
  transform: 'transform',
};

function transitionProperty(prop: string): string | undefined {
  return handler.properties(prop) ?? transitionPropertyGroup[prop];
}

export const transitions: Rule<Theme>[] = [
  // transition
  [
    /^transition(?:-([a-z-]+(?:,[a-z-]+)*))?(?:-(\d+))?$/,
    ([_, prop, d], { theme }) => {
      const p = prop != null
        ? transitionProperty(prop)
        : [transitionPropertyGroup.colors, 'opacity', 'box-shadow', 'transform', 'filter', 'backdrop-filter'].join(',');
      if (p) {
        const duration = theme.duration?.[d || 'DEFAULT'] ?? handler.time(d || '150');
        return {
          'transition-property': p,
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': duration,
        };
      }
    },
    { autocomplete: `transition-(${Object.keys(transitionPropertyGroup).join('|')})` },
  ],

  // timings
  [
    /^(?:transition-)?duration-(.+)$/,
    ([_, d], { theme }) => ({ 'transition-duration': theme.duration?.[d || 'DEFAULT'] ?? handler.bracket.cssvar.time(d) }),
    { autocomplete: ['transition-duration-$duration', 'duration-$duration'] },
  ],

  [
    /^(?:transition-)?delay-(.+)$/,
    ([_, d], { theme }) => ({ 'transition-delay': theme.duration?.[d || 'DEFAULT'] ?? handler.bracket.cssvar.time(d) }),
    { autocomplete: ['transition-delay-$duration', 'delay-$duration'] },
  ],

  [
    /^(?:transition-)?ease(?:-(.+))?$/,
    ([_, d], { theme }) => ({ 'transition-timing-function': theme.easing?.[d || 'DEFAULT'] ?? handler.bracket.cssvar(d) }),
    { autocomplete: ['transition-ease-(linear|in|out|in-out|DEFAULT)', 'ease-(linear|in|out|in-out|DEFAULT)'] },
  ],

  // props
  [
    /^(?:transition-)?property-(.+)$/,
    ([_, v]) => ({ 'transition-property': handler.global(v) || transitionProperty(v) }),
    { autocomplete: [`transition-property-(${[...GLOBAL_KEYWORDS, ...Object.keys(transitionPropertyGroup)].join('|')})`] },
  ],

  // none
  ['transition-none', { transition: 'none' }],
  ...makeGlobalStaticRules('transition'),
];
