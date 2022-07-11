import { withInstall } from '@vinicunca/utils';

import Dialog from './src/dialog.vue';

export const VDialog = withInstall(Dialog);
export default VDialog;

export * from './src/use-dialog';
export * from './src/dialog';
