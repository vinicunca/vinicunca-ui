import { buildProps } from '@vinicunca/utils';

export const dialogContentProps = buildProps({
  fullscreen: { type: Boolean, default: false },

  title: { type: String, default: '' }, // TODO: might need to remove this into slots
} as const);

export const dialogContentEmits = {
  close: () => true,
};
