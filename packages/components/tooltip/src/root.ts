import type { ExtractPropTypes } from 'vue';

import { buildProps, definePropType } from '@vinicunca/utils';

type StateUpdater = (state: boolean) => void;

export const tooltipRootProps = buildProps({
  'delayDuration': {
    type: Number,
    default: 300,
  },

  'defaultOpen': Boolean,

  'open': {
    type: Boolean,
    default: undefined,
  },

  'onOpenChange': {
    type: definePropType<StateUpdater>(Function),
  },

  'onUpdate:open': {
    type: definePropType<StateUpdater>(Function),
  },
} as const);

export type TooltipRootProps = ExtractPropTypes<typeof tooltipRootProps>;
