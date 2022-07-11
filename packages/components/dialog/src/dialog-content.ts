import { buildProps } from '@vinicunca/utils';

export const dialogContentProps = buildProps({
  fullscreen: { type: Boolean, default: false },
} as const);

export const dialogContentEmits = {
  close: () => true,
};
