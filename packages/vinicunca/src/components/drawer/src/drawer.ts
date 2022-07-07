import type { ExtractPropTypes } from 'vue';

import { buildProps } from '~/utils';

export const drawerProps = buildProps({
  direction: {
    type: String,
    default: 'RTL',
    values: ['LTR', 'RTL', 'TTB', 'BTT'],
  },
  size: {
    type: [String, Number],
    default: '30%',
  },
});

export type DrawerProps = ExtractPropTypes<typeof drawerProps>;

// export const drawerEmits = dialogEmits
