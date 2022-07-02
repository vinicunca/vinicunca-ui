import type { Rule } from '@unocss/core';

import { textAligns, verticalAligns } from './align';
import { animations } from './animation';
import { backgroundStyles } from './background';
import { appearance, outline, willChange } from './behavior';
import { borders } from './border';
import { bgColors, opacity, textColors } from './color';
import { columns } from './column';
import { container } from './container';
import { divides } from './divide';
import { filters } from './filter';
import { flex } from './flex';
import { gaps } from './gap';
import { grids } from './grid';
import { overflows } from './layout';
import { lineClamps } from './line-clamp';
import { placeholders } from './placeholder';
import { alignments, boxSizing, floats, insets, justifies, orders, placements, positions, zIndexes } from './position';
import { scrolls } from './scrolls';
import { boxShadows, rings } from './shadow';
import { aspectRatio, sizes } from './size';
import { margins, paddings, spaces } from './spacing';
import { accents, appearances, backgroundBlendModes, carets, contents, cursors, displays, hyphens, imageRenderings, isolations, listStyle, mixBlendModes, objectPositions, overscrolls, pointerEvents, resizes, screenReadersAccess, scrollBehaviors, userSelects, writingModes, writingOrientations } from './static';
import { svgUtilities } from './svg';
import { tables } from './table';
import { touchActions } from './touch-actions';
import { transforms } from './transform';
import { transitions } from './transition';
import { fontSmoothings, fontStyles, fontVariantNumeric, fonts, tabSizes, textDecorations, textIndents, textOverflows, textShadows, textStrokes, textTransforms, whitespaces, wordBreaks } from './typography';
import { cssProperty, cssVariables } from './variables';

export const rules: Rule[] = [
  cssVariables,
  cssProperty,
  container,
  screenReadersAccess,
  pointerEvents,
  appearances,
  positions,
  insets,
  lineClamps,
  isolations,
  zIndexes,
  orders,
  grids,
  floats,
  margins,
  boxSizing,
  displays,
  aspectRatio,
  sizes,
  flex,
  tables,
  transforms,
  animations,
  cursors,
  touchActions,
  userSelects,
  resizes,
  scrolls,
  listStyle,
  appearance,
  columns,
  placements,
  alignments,
  justifies,
  gaps,
  spaces,
  divides,
  overflows,
  overscrolls,
  scrollBehaviors,
  textOverflows,
  whitespaces,
  wordBreaks,
  borders,
  bgColors,
  backgroundStyles,
  svgUtilities,
  objectPositions,
  paddings,
  textAligns,
  textIndents,
  verticalAligns,
  fonts,
  textTransforms,
  fontStyles,
  fontVariantNumeric,
  textColors,
  textDecorations,
  fontSmoothings,
  // TODO placeholders,
  tabSizes,
  textStrokes,
  textShadows,
  hyphens,
  writingModes,
  writingOrientations,
  carets,
  accents,
  opacity,
  backgroundBlendModes,
  mixBlendModes,
  boxShadows,
  outline,
  rings,
  imageRenderings,
  filters,
  transitions,
  willChange,
  contents,
  placeholders,
].flat(1);
