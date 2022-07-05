import type { ExtractPropTypes } from 'vue';
import type button from './button.vue';

import { buildProps } from '~/utils';

export const buttonTypes = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const;

export const buttonProps = buildProps({
  disabled: Boolean,
  icon: {
    type: String,
    default: '',
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button',
  },
  loading: Boolean,
  loadingIcon: {
    type: String,
    default: '',
  },
  link: Boolean,
  autofocus: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
} as const);

export const buttonEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;

export type ButtonType = ButtonProps['type'];
export type ButtonNativeType = ButtonProps['nativeType'];

export type ButtonInstance = InstanceType<typeof button>;
