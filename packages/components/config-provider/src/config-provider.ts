import type { ExtractPropTypes } from 'vue';
import type { VinicuncaTheme } from '@vinicunca/tokens';

import { defineComponent, renderSlot } from 'vue';
import { buildProps, definePropType } from '@vinicunca/utils';
import { provideGlobalConfig } from '@vinicunca/composables/use-global-config';

export const configProviderProps = buildProps({
  theme: {
    type: definePropType<VinicuncaTheme>(Object),
  },

  zIndex: Number,
} as const);

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;

const ConfigProvider = defineComponent({
  name: 'VConfigProvider',

  props: configProviderProps,

  setup(props, { slots }) {
    const config = provideGlobalConfig({ config: props });
    return () => renderSlot(slots, 'default', { config: config?.value });
  },
});
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>;

export default ConfigProvider;
