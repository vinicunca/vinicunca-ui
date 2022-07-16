import type { ExtractPropTypes, TeleportProps, TransitionProps } from 'vue';

import { buildProps, definePropType } from '@vinicunca/utils';

import { tooltipRootProps } from './root';
import { tooltipTriggerProps } from './trigger';
import { tooltipArrowProps } from './arrow';
import { tooltipContentProps } from './content';

export const tooltipProps = buildProps({
  ...tooltipRootProps,
  ...tooltipArrowProps,
  ...tooltipTriggerProps,
  ...tooltipContentProps,

  alwaysOn: Boolean,

  fullTransition: Boolean,

  transitionProps: {
    type: definePropType<TransitionProps | null>(Object),
    default: null,
  },

  teleported: Boolean,

  to: {
    type: definePropType<TeleportProps['to']>(String),
    default: 'body',
  },
} as const);

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;
