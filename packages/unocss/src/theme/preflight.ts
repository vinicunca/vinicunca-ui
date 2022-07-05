import { backdropFilterBase, boxShadowsBase, filterBase, ringBase, transformBase } from '../rules';

const componentBase = {
  '--vin-overlay-color-lighter': 'rgba(0, 0, 0, 0.5)',
};

export const preflightBase = {
  ...transformBase,
  ...boxShadowsBase,
  ...ringBase,
  ...filterBase,
  ...backdropFilterBase,
  ...componentBase,
};
