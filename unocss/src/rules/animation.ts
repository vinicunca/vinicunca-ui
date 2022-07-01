import type { Rule } from '@unocss/core';
import type { Theme } from '../theme';

import { GLOBAL_KEYWORDS, handler, makeGlobalStaticRules } from '../utils';

export const animations: Rule<Theme>[] = [
  [
    /^(?:animate-)?keyframes-(.+)$/, ([_, name], { theme }) => {
      const kf = theme.animation?.keyframes?.[name];
      if (kf) {
        return [
        `@keyframes ${name}${kf}`,
        { animation: name },
        ];
      }
    }, { autocomplete: ['animate-keyframes-$animation.keyframes', 'keyframes-$animation.keyframes'] },
  ],

  [
    /^animate-(.+)$/, ([_, name], { theme }) => {
      const kf = theme.animation?.keyframes?.[name];
      if (kf) {
        const duration = theme.animation?.durations?.[name] ?? '1s';
        const timing = theme.animation?.timingFns?.[name] ?? 'linear';
        const count = theme.animation?.counts?.[name] ?? 1;
        const props = theme.animation?.properties?.[name];
        return [
        `@keyframes ${name}${kf}`,
        {
          animation: `${name} ${duration} ${timing} ${count}`,
          ...props,
        },
        ];
      }
      return { animation: handler.bracket.cssvar(name) };
    }, { autocomplete: 'animate-$animation.keyframes' },
  ],
  [/^animate-name-(.+)/, ([_, d]) => ({ 'animation-name': handler.bracket.cssvar(d) ?? d })],

  // timings
  [
    /^animate-duration-(.+)$/,
    ([_, d], { theme }) => ({ 'animation-duration': theme.duration?.[d || 'DEFAULT'] ?? handler.bracket.cssvar.time(d) }),
    { autocomplete: ['animate-duration', 'animate-duration-$duration'] },
  ],
  [
    /^animate-delay-(.+)$/,
    ([_, d], { theme }) => ({ 'animation-delay': theme.duration?.[d || 'DEFAULT'] ?? handler.bracket.cssvar.time(d) }),
    { autocomplete: ['animate-delay', 'animate-delay-$duration'] },
  ],
  [
    /^animate-ease(?:-(.+))?$/,
    ([_, d], { theme }) => ({ 'animation-timing-function': theme.easing?.[d || 'DEFAULT'] ?? handler.bracket.cssvar(d) }),
    { autocomplete: 'animate-delay-$easing' },
  ],

  // fill mode
  [
    /^animate-(fill-mode-|fill-|mode-)?(.+)$/,
    ([_, t, d]) => ['none', 'forwards', 'backwards', 'both', ...[t ? GLOBAL_KEYWORDS : []]].includes(d) ? { 'animation-fill-mode': d } : undefined,
    {
      autocomplete: [
        'animate-(fill|mode|fill-mode)',
        'animate-(fill|mode|fill-mode)-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)',
        'animate-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)',
      ],
    },
  ],

  // direction
  [
    /^animate-(direction-)?(.+)$/,
    ([_, t, d]) => ['normal', 'reverse', 'alternate', 'alternate-reverse', ...[t ? GLOBAL_KEYWORDS : []]].includes(d) ? { 'animation-direction': d } : undefined,
    {
      autocomplete: [
        'animate-direction',
        'animate-direction-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)',
        'animate-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)',
      ],
    },
  ],

  // others
  [
    /^animate-(?:iteration-|count-|iteration-count-)(.+)$/,
    ([_, d]) => ({ 'animation-iteration-count': handler.bracket.cssvar(d) ?? d.replace(/\-/g, ',') }),
    { autocomplete: ['animate-(iteration|count|iteration-count)', 'animate-(iteration|count|iteration-count)-<num>'] },
  ],
  [/^animate-(play-state-|play-|state-)?(.+)$/,
    ([_, t, d]) => ['paused', 'running', ...[t ? GLOBAL_KEYWORDS : []]].includes(d) ? { 'animation-play-state': d } : undefined,
    {
      autocomplete: [
        'animate-(play|state|play-state)',
        'animate-(play|state|play-state)-(paused|running|inherit|initial|revert|revert-layer|unset)',
        'animate-(paused|running|inherit|initial|revert|revert-layer|unset)',
      ],
    }],
  ['animate-none', { animation: 'none' }],
  ...makeGlobalStaticRules('animate', 'animation'),
];
