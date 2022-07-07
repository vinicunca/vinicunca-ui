import Dialog from './src/dialog.vue';

import { withInstall } from '~/utils';

export const VDialog = withInstall(Dialog);
export default VDialog;

export * from './src/use-dialog';
export * from './src/dialog';
