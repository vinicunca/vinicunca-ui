import { makeInstaller } from './make-installer';
import Plugins from './plugin';
import Components from './component';

// export * from '@vinicunca/components';
// export * from '@vinicunca/constants';

export * from './make-installer';

const installer = makeInstaller([...Components, ...Plugins]);

export const install = installer.install;
export default installer;
