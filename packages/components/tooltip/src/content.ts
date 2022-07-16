import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom';
import type { ExtractPropTypes } from 'vue';

import { buildProps, definePropType } from '@vinicunca/utils';

const TOOLTIP_STRATEGIES = ['absolute', 'fixed'] as const;

const TOOLTIP_PLACEMENTS = [
  'top-start',
  'top-end',
  'top',
  'bottom-start',
  'bottom-end',
  'bottom',
  'left-start',
  'left-end',
  'left',
  'right-start',
  'right-end',
  'right',
] as const;

export const tooltipContentProps = buildProps({
  ariaLabel: String,

  arrowPadding: {
    type: definePropType<number>(Number),
    default: 5,
  },

  classContent: String,

  /**
   * Placement of tooltip content relative to reference element (when absent it refers to trigger)
   */
  placement: {
    type: definePropType<Placement>(String),
    values: TOOLTIP_PLACEMENTS,
    default: 'bottom',
  },

  /**
   * Reference element for tooltip content to set its position
   */
  reference: {
    type: definePropType<HTMLElement | VirtualElement | null>(Object),
    default: null,
  },

  offset: {
    type: Number,
    default: 8,
  },

  strategy: {
    type: definePropType<Strategy>(String),
    values: TOOLTIP_STRATEGIES,
    default: 'absolute',
  },

  showArrow: {
    type: Boolean,
    default: false,
  },
} as const);

export type TooltipContentProps = ExtractPropTypes<typeof tooltipContentProps>;
