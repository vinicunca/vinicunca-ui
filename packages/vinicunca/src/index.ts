import { makeInstaller } from './make-installer';
import Components from './component';
import Plugins from './plugin';

export * from '~/components';
export * from '~/constants';
export * from './make-installer';

const installer = makeInstaller([...Components, ...Plugins]);

export const install = installer.install;
export default installer;
