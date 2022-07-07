import type { ExtractPropTypes } from 'vue';

import { isBoolean } from '@vinicunca/js-utilities';

import { buildProps } from '~/utils';
import { EVENT_UPDATE_MODEL } from '~/constants/event';

export const dialogProps = buildProps({} as const);

export type DialogProps = ExtractPropTypes<typeof dialogProps>;

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [EVENT_UPDATE_MODEL]: (value: boolean) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true,
};

export type DialogEmits = typeof dialogEmits;
