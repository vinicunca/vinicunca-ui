import ConfigProvider from './src/config-provider';

import { withInstall } from '~/utils';

export const VConfigProvider = withInstall(ConfigProvider);
export default VConfigProvider;

export * from './src/config-provider';
