import type { ExtractPropTypes } from 'vue';
import type ScrollbarBar from './scrollbar-bar.vue';

import { buildProps } from '@vinicunca/utils';

export const barProps = buildProps({
  always: {
    type: Boolean,
    default: true,
  },

  width: String,

  height: String,

  ratioX: {
    type: Number,
    default: 1,
  },

  ratioY: {
    type: Number,
    default: 1,
  },

} as const);

export type ScrollbarBarProps = ExtractPropTypes<typeof barProps>;

export type ScrollbarBarInstance = InstanceType<typeof ScrollbarBar>;
