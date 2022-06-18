import type { Rule } from '@unocss/core';

import { bgColors, opacity, textColors } from './color';
import { fontSmoothings } from './typography';

export const rules: Rule[] = [
  opacity,
  bgColors,
  textColors,
  fontSmoothings,
].flat(1);
