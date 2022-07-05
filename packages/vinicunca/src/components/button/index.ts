import Button from './src/button.vue';
import ButtonGroup from './src/button-group.vue';

import { withInstall, withNoopInstall } from '~/utils';

export const VButton = withInstall(Button, { ButtonGroup });
export const VButtonGroup = withNoopInstall(ButtonGroup);
export default VButton;

export * from './src/button';
