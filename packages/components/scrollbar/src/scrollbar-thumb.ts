import type { ExtractPropTypes } from 'vue';
import type ScrollbarThumb from './scrollbar-thumb.vue';

import { buildProps } from '@vinicunca/utils';

export const scrollbarThumbProps = buildProps({
  vertical: Boolean,

  size: String,

  move: Number,

  ratio: {
    type: Number,
    required: true,
  },

  always: Boolean,
} as const);

export type ScrollbarThumbProps = ExtractPropTypes<typeof scrollbarThumbProps>;

export type ScrollbarThumbInstance = InstanceType<typeof ScrollbarThumb>;
