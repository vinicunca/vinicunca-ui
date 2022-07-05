import type { Theme } from './types';

import { borderRadius, lineWidth, ringWidth } from './border';
import { colors } from './color';
import { fontFamily, fontSize, letterSpacing, lineHeight, textIndent, textShadow, textStrokeWidth, wordSpacing } from './font';
import { blur, boxShadow, dropShadow } from './shadow';
import { breakpoints, spacing, verticalBreakpoints } from './layout';
import { height, maxHeight, maxWidth, width } from './size';
import { preflightBase } from './preflight';
import { duration, easing } from './transition';
import { varsBase } from './variable';

export const theme: Theme = {
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth: maxWidth,
  minHeight: maxHeight,
  inlineSize: width,
  blockSize: height,
  maxInlineSize: maxWidth,
  maxBlockSize: maxHeight,
  minInlineSize: maxWidth,
  minBlockSize: maxHeight,
  colors,
  fontFamily,
  fontSize,
  breakpoints,
  verticalBreakpoints,
  borderRadius,
  lineHeight,
  letterSpacing,
  wordSpacing,
  boxShadow,
  textIndent,
  textShadow,
  textStrokeWidth,
  blur,
  dropShadow,
  easing,
  lineWidth,
  spacing,
  duration,
  ringWidth,
  preflightBase,
  varsBase,
};
