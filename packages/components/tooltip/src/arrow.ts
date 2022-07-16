import type { CSSProperties, ExtractPropTypes } from 'vue';

import { TOOLTIP_SIDES } from '@vinicunca/tokens/tooltip';
import { buildProps, definePropType } from '@vinicunca/utils';

export const tooltipArrowProps = buildProps({
  width: {
    type: Number,
    default: 10,
  },

  height: {
    type: Number,
    default: 10,
  },

  style: {
    type: definePropType<CSSProperties | null>(Object),
    default: null,
  },
} as const);

export const tooltipArrowSideProps = buildProps({
  side: {
    type: definePropType<TOOLTIP_SIDES>(String),
    values: Object.values(TOOLTIP_SIDES),
    required: true,
  },
} as const);

export type TooltipArrowProps = ExtractPropTypes<typeof tooltipArrowProps>;
