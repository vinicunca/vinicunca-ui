import type { ExtractPropTypes } from 'vue';

import { isBoolean } from '@vinicunca/js-utilities';
import { buildProps, definePropType } from '@vinicunca/utils';
import { EVENT_UPDATE_MODEL } from '@vinicunca/constants';

import { dialogContentProps } from './dialog-content';

type DoneFn = (cancel?: boolean) => void;
export type DialogBeforeCloseFn = (done: DoneFn) => void;

export const dialogProps = buildProps({
  ...dialogContentProps,

  appendToBody: { type: Boolean, default: false },

  beforeClose: { type: definePropType<DialogBeforeCloseFn>(Function) },

  classModal: String,

  closeDelay: { type: Number, default: 0 },

  closeOnClickModal: { type: Boolean, default: true },

  closeOnPressEscape: { type: Boolean, default: true },

  destroyOnClose: { type: Boolean, default: false },

  lockScroll: { type: Boolean, default: true },

  modal: { type: Boolean, default: true },

  modelValue: { type: Boolean, default: false },

  openDelay: { type: Number, default: 0 },

  width: { type: [String, Number] },

  zIndex: { type: Number },
} as const);

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
