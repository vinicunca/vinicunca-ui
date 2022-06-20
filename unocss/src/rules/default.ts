import type { Rule } from '@unocss/core';

import { bgColors, opacity, textColors } from './color';
import { fontSmoothings, fonts } from './typography';

export const rules: Rule[] = [
  opacity,
  bgColors,
  textColors,
  fonts,
  fontSmoothings,
].flat(1);
