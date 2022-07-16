import type { ExtractPropTypes, Ref } from 'vue';

import { buildProps } from '@vinicunca/utils';

export const tooltipBaseProps = buildProps({
  nowrap: Boolean,
} as const);

export type TooltipBaseProps = ExtractPropTypes<typeof tooltipBaseProps>;

export enum TOOLTIP_SIDES {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export const tooltipOppositeSide = {
  [TOOLTIP_SIDES.top]: TOOLTIP_SIDES.bottom,
  [TOOLTIP_SIDES.bottom]: TOOLTIP_SIDES.top,
  [TOOLTIP_SIDES.left]: TOOLTIP_SIDES.right,
  [TOOLTIP_SIDES.right]: TOOLTIP_SIDES.left,
} as const;

export const tooltipArrowBorders = {
  [TOOLTIP_SIDES.top]: [TOOLTIP_SIDES.left, TOOLTIP_SIDES.top],
  [TOOLTIP_SIDES.bottom]: [TOOLTIP_SIDES.bottom, TOOLTIP_SIDES.right],
  [TOOLTIP_SIDES.left]: [TOOLTIP_SIDES.bottom, TOOLTIP_SIDES.left],
  [TOOLTIP_SIDES.right]: [TOOLTIP_SIDES.top, TOOLTIP_SIDES.right],
} as const;

export interface TooltipContext {
  onClose: () => void;
  onOpenDelay: () => void;
  onOpen: () => void;
  idContent: Ref<string>;
  refTrigger: Ref<HTMLElement | null>;
}

export interface TooltipContentContext {
  refArrow: Ref<HTMLElement | null>;
}

export const TOOLTIP_OPEN = 'tooltip.open';
