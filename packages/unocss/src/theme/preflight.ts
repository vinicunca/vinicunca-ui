import type { Theme } from './types';

import { backdropFilterBase, borderSpacingBase, boxShadowsBase, filterBase, fontVariantNumericBase, ringBase, scrollSnapTypeBase, touchActionBase, transformBase } from '../rules';

export const preflightBase = {
  ...transformBase,
  ...touchActionBase,
  ...scrollSnapTypeBase,
  ...fontVariantNumericBase,
  ...borderSpacingBase,
  ...boxShadowsBase,
  ...ringBase,
  ...filterBase,
  ...backdropFilterBase,
};

export const preflightTokens: Theme['tokens'] = {
  light: {
    brands: {
      primary: '#409eff',
      success: '#67c23a',
      info: '#909399',
      warning: '#e6a23c',
      danger: '#f56c6c',
    },
    textColors: {
      primary: '#303133',
      regular: '#606266',
      secondary: '#909399',
      placeholder: '#a8abb2',
      disabled: '#c0c4cc',
    },
  },
  dark: {
    brands: {
      primary: '#409eff',
      success: '#67c23a',
      info: '#909399',
      warning: '#e6a23c',
      danger: '#f56c6c',
    },
    textColors: {
      primary: '#E5EAF3',
      regular: '#CFD3DC',
      secondary: '#A3A6AD',
      placeholder: '#8D9095',
      disabled: '#6C6E72',
    },
  },
};
