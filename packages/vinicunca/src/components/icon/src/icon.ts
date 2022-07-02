import type { ExtractPropTypes } from 'vue';
import type Icon from './icon.vue';

import { buildProps, definePropType } from '~/utils';

export const iconProps = buildProps({
  size: {
    type: definePropType<number | string>([Number, String]),
  },
  color: {
    type: String,
  },
} as const);
export type IconProps = ExtractPropTypes<typeof iconProps>;
export type IconInstance = InstanceType<typeof Icon>;
