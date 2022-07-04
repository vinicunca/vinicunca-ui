import type { ExtractPropTypes } from 'vue';
import type Icon from './icon.vue';

import { buildProps } from '~/utils';

export const iconProps = buildProps({
  name: String,
} as const);

export type IconProps = ExtractPropTypes<typeof iconProps>;
export type IconInstance = InstanceType<typeof Icon>;
