import type { ExtractPropTypes } from 'vue';

import { buildProps, definePropType } from '@vinicunca/utils';

const EventHandler = {
  type: definePropType<(event: Event) => boolean | void>(Function),
} as const;

export const tooltipTriggerProps = buildProps({
  onBlur: EventHandler,

  onClick: EventHandler,

  onFocus: EventHandler,

  onMouseDown: EventHandler,

  onMouseEnter: EventHandler,

  onMouseLeave: EventHandler,
} as const);

export type TooltipTriggerProps = ExtractPropTypes<typeof tooltipTriggerProps>;
