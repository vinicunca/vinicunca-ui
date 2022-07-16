import type { ExtractPropTypes, StyleValue } from 'vue';
import type Scrollbar from './scrollbar.vue';

import { buildProps, definePropType } from '@vinicunca/utils';
import { isNumber } from '@vinicunca/js-utilities';

export const scrollbarProps = buildProps({
  height: {
    type: [String, Number],
    default: '',
  },

  maxHeight: {
    type: [String, Number],
    default: '',
  },

  native: Boolean,

  styleWrap: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: '',
  },

  classWrap: {
    type: [String, Array],
    default: '',
  },

  classContent: {
    type: [String, Array],
    default: '',
  },

  styleContent: {
    type: [String, Array, Object],
    default: '',
  },

  noresize: Boolean,

  tag: {
    type: String,
    default: 'div',
  },

  always: Boolean,

  minSize: {
    type: Number,
    default: 20,
  },
} as const);

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>;

export const scrollbarEmits = {
  scroll: ({
    scrollTop,
    scrollLeft,
  }: {
    scrollTop: number;
    scrollLeft: number;
  }) => [scrollTop, scrollLeft].every(isNumber),
};
export type ScrollbarEmits = typeof scrollbarEmits;

export type ScrollbarInstance = InstanceType<typeof Scrollbar>;

