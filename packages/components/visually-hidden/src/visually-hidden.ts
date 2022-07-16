import type { StyleValue } from 'vue';

import { buildProps, definePropType } from '@vinicunca/utils';

export const visualHiddenProps = buildProps({
  style: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: () => ({}),
  },
} as const);
