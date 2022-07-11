import { withInstall } from '@vinicunca/utils';

import ConfigProvider from './src/config-provider';

export const VConfigProvider = withInstall(ConfigProvider);
export default VConfigProvider;

export * from './src/config-provider';
