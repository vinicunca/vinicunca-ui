import type { ExtractPropTypes, StyleValue } from 'vue';
import type Input from './input.vue';

import { mutable } from '@vinicunca/js-utilities';

import { buildProps, definePropType } from '~/utils';

export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean;

export const inputProps = buildProps({
  // id: { type: String, default: undefined },
  // disabled: Boolean,
  // modelValue: {
  //   type: definePropType<string | number | null | undefined>([
  //     String,
  //     Number,
  //     Object,
  //   ]),
  //   default: '',
  // },
  containerRole: { type: String, default: undefined },
  type: { type: String, default: 'text' },
  // resize: {
  //   type: String,
  //   values: ['none', 'both', 'horizontal', 'vertical'],
  // },
  // autosize: {
  //   type: definePropType<InputAutoSize>([Boolean, Object]),
  //   default: false,
  // },
  // autocomplete: {
  //   type: String,
  //   default: 'off',
  // },
  // placeholder: {
  //   type: String,
  // },
  // form: {
  //   type: String,
  //   default: '',
  // },
  // readonly: {
  //   type: Boolean,
  //   default: false,
  // },
  // clearable: {
  //   type: Boolean,
  //   default: false,
  // },
  // showPassword: {
  //   type: Boolean,
  //   default: false,
  // },
  // showWordLimit: {
  //   type: Boolean,
  //   default: false,
  // },
  // suffixIcon: {
  //   type: iconPropType,
  //   default: '',
  // },
  // prefixIcon: {
  //   type: iconPropType,
  //   default: '',
  // },
  // containerRole: {
  //   type: String,
  //   default: undefined,
  // },
  // label: {
  //   type: String,
  //   default: undefined,
  // },
  // tabindex: {
  //   type: [String, Number],
  //   default: 0,
  // },
  // validateEvent: {
  //   type: Boolean,
  //   default: true,
  // },
  inputStyle: {
    type: definePropType<StyleValue>([Object, Array, String]),
    default: () => mutable({} as const),
  },
});

export type InputProps = ExtractPropTypes<typeof inputProps>;

export const inputEmits = {
  mouseenter: (event: MouseEvent) => event instanceof MouseEvent,
  mouseleave: (event: MouseEvent) => event instanceof MouseEvent,
};

export type InputEmits = typeof inputEmits;

export type InputInstance = InstanceType<typeof Input>;
