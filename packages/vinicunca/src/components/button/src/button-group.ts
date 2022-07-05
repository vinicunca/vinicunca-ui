import type { ExtractPropTypes } from 'vue';
import type buttonGroup from './button-group.vue';

import { buttonProps } from './button';

export const buttonGroupProps = {
  type: buttonProps.type,
} as const;

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>;

export type ButtonGroupInstance = InstanceType<typeof buttonGroup>;
